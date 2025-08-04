import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiUser, FiEye, FiHeart, FiTag } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import './PostCard.css';

const PostCard = ({ post }) => {
  return (
    <article className="post-card">
      {post.featuredImage && (
        <div className="post-image">
          <img src={post.featuredImage} alt={post.title} />
        </div>
      )}
      
      <div className="post-content">
        <div className="post-meta">
          <div className="post-author">
            <FiUser className="meta-icon" />
            <span>{post.author?.username || 'Anonymous'}</span>
          </div>
          <div className="post-date">
            <FiClock className="meta-icon" />
            <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
          </div>
        </div>

        <h2 className="post-title">
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </h2>

        <p className="post-excerpt">
          {post.excerpt || post.content.substring(0, 150) + '...'}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="post-tag">
                <FiTag className="tag-icon" />
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="post-tag-more">+{post.tags.length - 3} more</span>
            )}
          </div>
        )}

        <div className="post-stats">
          <div className="post-stat">
            <FiEye className="stat-icon" />
            <span>{post.views || 0} views</span>
          </div>
          <div className="post-stat">
            <FiHeart className="stat-icon" />
            <span>{post.likes?.length || 0} likes</span>
          </div>
          <div className="post-read-time">
            {post.readTime || 1} min read
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard; 