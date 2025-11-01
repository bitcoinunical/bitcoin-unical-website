import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { fetchBlogPosts } from '../lib/api';
import type { BlogPost } from '../types';

const SkeletonCard: React.FC = () => (
  <Card className="animate-pulse">
    <div className="w-full h-56 bg-slate-300 dark:bg-slate-700"></div>
    <div className="p-6">
      <div className="flex justify-between items-center mb-3">
        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/3"></div>
        <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-1/4"></div>
      </div>
      <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-full mb-2"></div>
      <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
      <div className="h-16 bg-slate-300 dark:bg-slate-700 rounded"></div>
      <div className="border-t dark:border-slate-700 mt-4 pt-4 flex justify-between items-center">
        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/2"></div>
        <div className="flex space-x-3">
            <div className="w-5 h-5 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
            <div className="w-5 h-5 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
            <div className="w-5 h-5 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
        </div>
      </div>
    </div>
  </Card>
);

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

  const getShareUrl = (network: 'twitter' | 'linkedin' | 'facebook', title: string) => {
    const url = window.location.href;
    const text = encodeURIComponent(title);
    switch(network) {
      case 'twitter': return `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      case 'linkedin': return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
      case 'facebook': return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }
  }

  return (
    <div className="bg-light-grey dark:bg-slate-900 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-poppins text-4xl font-bold text-deep-navy dark:text-white">News & Insights</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Your source for Bitcoin education, student stories, and Africa's crypto future.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          ) : error ? (
            <p className="col-span-full text-center text-red-500">{error}</p>
          ) : (
            posts.length > 0 ? (
                posts.map((post) => (
                  <Card key={post.id}>
                    <div className="w-full h-56 bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
                      {post.imageUrl ? (
                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">Image coming soon</span>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3 text-sm text-gray-500 dark:text-gray-400">
                        <span>{post.date}</span>
                        <span className="font-semibold bg-light-grey text-deep-navy px-2 py-1 rounded dark:bg-slate-700 dark:text-gray-200">{post.category}</span>
                      </div>
                      <h3 className="font-poppins text-xl font-bold mb-2 h-16 dark:text-white">{post.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 h-24 overflow-hidden">{post.excerpt}</p>
                      <div className="border-t dark:border-slate-700 pt-4 flex justify-between items-center">
                        <p className="text-sm font-semibold dark:text-gray-200">By {post.author}</p>
                        <div className="flex space-x-3 text-gray-600 dark:text-gray-400">
                            <a href={getShareUrl('twitter', post.title)} target="_blank" rel="noopener noreferrer" className="hover:text-bitcoin-orange" aria-label="Share on Twitter"><FaTwitter size={20}/></a>
                            <a href={getShareUrl('linkedin', post.title)} target="_blank" rel="noopener noreferrer" className="hover:text-bitcoin-orange" aria-label="Share on LinkedIn"><FaLinkedin size={20}/></a>
                            <a href={getShareUrl('facebook', post.title)} target="_blank" rel="noopener noreferrer" className="hover:text-bitcoin-orange" aria-label="Share on Facebook"><FaFacebook size={20}/></a>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
            ) : (
                <div className="col-span-full text-center py-12">
                    <p className="text-xl text-gray-500 dark:text-gray-400">No blog posts available at the moment. Please check back later.</p>
                </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;