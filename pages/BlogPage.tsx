
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { FaTwitter, FaLinkedin, FaTelegram } from 'react-icons/fa';
import { fetchBlogPosts } from '../lib/api';
import type { BlogPost } from '../types';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await fetchBlogPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  return (
    <div className="bg-light-grey py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-poppins text-4xl font-bold text-deep-navy">News & Insights</h1>
          <p className="mt-4 text-lg text-gray-600">Your source for Bitcoin education, student stories, and Africa's crypto future.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             <p className="col-span-full text-center">Loading posts...</p>
          ) : error ? (
            <p className="col-span-full text-center text-red-500">{error}</p>
          ) : (
            posts.map((post) => (
              <Card key={post.id}>
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500">Image coming soon</span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span className="font-semibold bg-light-grey text-deep-navy px-2 py-1 rounded">{post.category}</span>
                  </div>
                  <h3 className="font-poppins text-xl font-bold mb-2 h-16">{post.title}</h3>
                  <p className="text-gray-600 mb-4 h-24 overflow-hidden">{post.excerpt}</p>
                  <div className="border-t pt-4 flex justify-between items-center">
                    <p className="text-sm font-semibold">By {post.author}</p>
                    <div className="flex space-x-3 text-gray-600">
                        <a href="#" className="hover:text-bitcoin-orange"><FaTwitter size={20}/></a>
                        <a href="#" className="hover:text-bitcoin-orange"><FaLinkedin size={20}/></a>
                        <a href="#" className="hover:text-bitcoin-orange"><FaTelegram size={20}/></a>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
