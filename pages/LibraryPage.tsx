
import React, { useState, useEffect } from 'react';
import type { Course, Book } from '../types';
import { fetchCourses, fetchBooks } from '../lib/api';
import Card from '../components/Card';
import Button from '../components/Button';
import { FiSearch } from 'react-icons/fi';

const LibraryPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadLibraryContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const [fetchedCourses, fetchedBooks] = await Promise.all([
          fetchCourses(),
          fetchBooks(),
        ]);
        setCourses(fetchedCourses);
        setBooks(fetchedBooks);
      } catch (err) {
        setError('Failed to load library content. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadLibraryContent();
  }, []);

  const lowerCaseQuery = searchQuery.toLowerCase();

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(lowerCaseQuery) ||
    course.description.toLowerCase().includes(lowerCaseQuery)
  );

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(lowerCaseQuery) ||
    book.description.toLowerCase().includes(lowerCaseQuery) ||
    book.author.toLowerCase().includes(lowerCaseQuery)
  );

  return (
    <div className="bg-light-grey dark:bg-slate-900 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-poppins text-4xl font-bold text-deep-navy dark:text-white">Bitcoin Unical Library</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Your gateway to curated Bitcoin knowledge.</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses, books, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-bitcoin-orange dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {loading ? (
          <p className="text-center py-16">Loading library...</p>
        ) : error ? (
          <p className="text-center py-16 text-red-500">{error}</p>
        ) : (
          <>
            {/* Courses Section */}
            <section className="mb-16">
              <h2 className="font-poppins text-3xl font-bold text-deep-navy dark:text-white mb-8">Our Courses</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <Card key={course.id} className="flex flex-col">
                      <div className="w-full h-56 bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
                          {course.imageUrl ? (
                            <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                          ) : (
                              <span className="text-gray-500 dark:text-gray-400">Image coming soon</span>
                          )}
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <span className="inline-block self-start bg-gold-accent text-deep-navy text-xs font-semibold px-2 py-1 rounded-full mb-3">{course.level}</span>
                        <h3 className="font-poppins text-xl font-bold mb-2 dark:text-white">{course.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{course.description}</p>
                        <div className="mt-auto">
                          <Button>Start Course</Button>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500 dark:text-gray-400">No courses found matching your search.</p>
                )}
              </div>
            </section>

            {/* Books Section */}
            <section>
              <h2 className="font-poppins text-3xl font-bold text-deep-navy dark:text-white mb-8">Recommended Books</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <Card key={book.id}>
                      <div className="w-full h-72 bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
                          {book.imageUrl ? (
                            <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover" />
                          ) : (
                              <span className="text-gray-500 dark:text-gray-400">Cover coming soon</span>
                          )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-poppins text-lg font-bold truncate dark:text-white">{book.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">by {book.author}</p>
                        <a href={book.link} target="_blank" rel="noopener noreferrer" className="text-bitcoin-orange font-semibold hover:underline text-sm">
                          Learn More
                        </a>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500 dark:text-gray-400">No books found matching your search.</p>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;