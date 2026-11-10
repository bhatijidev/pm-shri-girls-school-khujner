import { useState, useEffect, useCallback } from 'react';
import { bookService } from '../services/api';

export const useBooks = (initialParams = {}) => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  // Fetch categories once
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await bookService.getCategories();
        if (res.success) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    fetchCats();
  }, []);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await bookService.getAll(params);
      if (res.success) {
        setBooks(res.data);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return {
    books,
    categories,
    pagination,
    loading,
    error,
    params,
    setParams,
    refetch: fetchBooks
  };
};
