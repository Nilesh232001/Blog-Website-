import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { FiClock, FiUser, FiEye, FiHeart, FiTag, FiMessageCircle } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import LoadingSpinner from '../ui/LoadingSpinner';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/posts/${id}`);
      setPost(response.data);
      if (isAuthenticated && user) {
        setLiked(response.data.likes.includes(user.id));
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to like posts');
      return;
    }

    try {
      const response = await axios.post(`/api/posts/${id}/like`);
      setPost(prev => ({
        ...prev,
        likes: response.data.isLiked 
          ? [...prev.likes, user.id]
          : prev.likes.filter(likeId => likeId !== user.id)
      }));
      setLiked(response.data.isLiked);
      toast.success(response.data.isLiked ? 'Post liked!' : 'Post unliked');
    } catch (error) {
      toast.error('Failed to like post');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      const response = await axios.post(`/api/posts/${id}/comments`, {
        content: comment
      });
      
      setPost(prev => ({
        ...prev,
        comments: [response.data, ...prev.comments]
      }));
      setComment('');
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="post-detail-container">
        <div className="container">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-detail-container">
        <div className="container">
          <div className="error-message">
            <h2>Post not found</h2>
            <p>The post you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <div className="container">
        <article className="post-detail">
          {/* Post Header */}
          <header className="post-header">
            <div className="post-meta">
              <div className="post-author">
                <FiUser className="meta-icon" />
                <span>{post.author?.username || 'Anonymous'}</span>
              </div>
              <div className="post-date">
                <FiClock className="meta-icon" />
                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
              </div>
              <div className="post-views">
                <FiEye className="meta-icon" />
                <span>{post.views || 0} views</span>
              </div>
            </div>

            <h1 className="post-title">{post.title}</h1>

            {post.tags && post.tags.length > 0 && (
              <div className="post-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="post-tag">
                    <FiTag className="tag-icon" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="post-image">
              <img src={post.featuredImage} alt={post.title} />
            </div>
          )}

          {/* Post Content */}
          <div className="post-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Post Actions */}
          <div className="post-actions">
            <button
              onClick={handleLike}
              className={`action-btn ${liked ? 'liked' : ''}`}
              disabled={!isAuthenticated}
            >
              <FiHeart className="action-icon" />
              <span>{post.likes?.length || 0} likes</span>
            </button>
            
            <div className="action-btn">
              <FiMessageCircle className="action-icon" />
              <span>{post.comments?.length || 0} comments</span>
            </div>
          </div>

          {/* Comments Section */}
          <section className="comments-section">
            <h3>Comments ({post.comments?.length || 0})</h3>
            
            {isAuthenticated ? (
              <form onSubmit={handleComment} className="comment-form">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="comment-input"
                  rows="3"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting || !comment.trim()}
                >
                  {submitting ? 'Posting...' : 'Post Comment'}
                </button>
              </form>
            ) : (
              <div className="login-prompt">
                <p>Please <Link to="/login">login</Link> to leave a comment.</p>
              </div>
            )}

            <div className="comments-list">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <div className="comment-header">
                      <span className="comment-author">
                        {comment.user?.username || 'Anonymous'}
                      </span>
                      <span className="comment-date">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="comment-content">{comment.content}</p>
                  </div>
                ))
              ) : (
                <p className="no-comments">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default PostDetail; 