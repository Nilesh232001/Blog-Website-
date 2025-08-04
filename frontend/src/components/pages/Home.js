import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { FiClock, FiUser, FiEye, FiHeart, FiTag } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import PostCard from '../posts/PostCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import './Home.css';

const Home = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const query = searchParams.get('q');
    setSearchQuery(query || '');
    setCurrentPage(1);
    fetchPosts(query, 1);
  }, [searchParams]);

  const fetchPosts = async (query = '', page = 1) => {
    setLoading(true);
    try {
      const endpoint = query ? '/api/posts/search' : '/api/posts';
      const params = query ? { q: query, page } : { page };
      
      const response = await axios.get(endpoint, { params });
      
      setPosts(response.data.posts);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setTotalPosts(response.data.totalPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchPosts(searchQuery, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="container">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="container">
        {/* Hero Section */}
        {!searchQuery && currentPage === 1 && (
          <section className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">
                Welcome to <span className="text-primary">BlogHub</span>
              </h1>
              <p className="hero-subtitle">
                Discover amazing stories, share your thoughts, and connect with writers from around the world.
              </p>
            </div>
          </section>
        )}

        {/* Search Results Header */}
        {searchQuery && (
          <section className="search-header">
            <h2 className="search-title">
              Search Results for "{searchQuery}"
            </h2>
            <p className="search-count">
              {totalPosts} {totalPosts === 1 ? 'post' : 'posts'} found
            </p>
          </section>
        )}

        {/* Posts Grid */}
        <section className="posts-section">
          {posts.length === 0 ? (
            <div className="no-posts">
              <div className="no-posts-content">
                <h3>No posts found</h3>
                <p>
                  {searchQuery 
                    ? `No posts match your search for "${searchQuery}"`
                    : 'No posts have been published yet.'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="posts-grid">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <section className="pagination-section">
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              <div className="pagination-pages">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            
            <div className="pagination-info">
              Page {currentPage} of {totalPages} • {totalPosts} total posts
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Home; 