import { useState, useEffect, useCallback } from 'react';
import { noticeService } from '../services/api';

export const useNotices = (initialParams = {}) => {
  const [notices, setNotices] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchNotices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await noticeService.getAll(params);
      if (res.success) {
        setNotices(res.data);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notices');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  return {
    notices,
    pagination,
    loading,
    error,
    params,
    setParams,
    refetch: fetchNotices
  };
};

export const useLatestNotices = () => {
  const [latest, setLatest] = useState([]);
  const [urgent, setUrgent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchLatest = async () => {
      try {
        const [latestRes, urgentRes] = await Promise.all([
          noticeService.getLatest(),
          noticeService.getUrgent()
        ]);
        if (isMounted) {
          if (latestRes.success) setLatest(latestRes.data);
          if (urgentRes.success) setUrgent(urgentRes.data);
        }
      } catch (err) {
        console.error('Error fetching ticker notices:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchLatest();
    return () => { isMounted = false; };
  }, []);

  return { latest, urgent, loading };
};
