import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Client-side fast memory cache for instant transitions
const clientCache = new Map();

const getCached = (key) => {
  const item = clientCache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiresAt) {
    clientCache.delete(key);
    return null;
  }
  return item.value;
};

const setCached = (key, value, ttlMs = 45000) => {
  clientCache.set(key, { value, expiresAt: Date.now() + ttlMs });
};

export const invalidateClientCache = (prefix = '') => {
  if (!prefix) {
    clientCache.clear();
    return;
  }
  for (const k of clientCache.keys()) {
    if (k.startsWith(prefix)) clientCache.delete(k);
  }
};

// Helper for cached GET requests
const cachedGet = async (url, params = {}, ttlMs = 45000) => {
  const queryString = Object.keys(params).length ? JSON.stringify(params) : '';
  const cacheKey = `${url}?${queryString}`;
  const hit = getCached(cacheKey);
  if (hit) return hit;

  const res = await api.get(url, { params });
  if (res.data && res.data.success) {
    setCached(cacheKey, res.data, ttlMs);
  }
  return res.data;
};

// Interceptor to add JWT token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pmshri_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor to handle expired tokens and unauthorized responses cleanly
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (localStorage.getItem('pmshri_token') && !error.config?.url?.includes('/auth/login')) {
        authService.logout();
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authService = {
  login: async (username, password) => {
    const res = await api.post('/auth/login', { username, password });
    if (res.data.success && res.data.data.token) {
      localStorage.setItem('pmshri_token', res.data.data.token);
      localStorage.setItem('pmshri_user', JSON.stringify(res.data.data.user));
    }
    return res.data;
  },
  getProfile: async () => {
    const res = await api.get('/auth/profile');
    return res.data;
  },
  changePassword: async (oldPassword, newPassword) => {
    const res = await api.put('/auth/change-password', { oldPassword, newPassword });
    return res.data;
  },
  logout: () => {
    localStorage.removeItem('pmshri_token');
    localStorage.removeItem('pmshri_user');
    invalidateClientCache();
  },
  getToken: () => localStorage.getItem('pmshri_token'),
  getUser: () => {
    const userStr = localStorage.getItem('pmshri_user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

// Notices API
export const noticeService = {
  getAll: async (params = {}) => {
    return cachedGet('/notices', params, 30000);
  },
  getLatest: async () => {
    return cachedGet('/notices/latest', {}, 60000);
  },
  getUrgent: async () => {
    return cachedGet('/notices/urgent', {}, 60000);
  },
  getById: async (id) => {
    return cachedGet(`/notices/${id}`, {}, 60000);
  },
  create: async (data) => {
    invalidateClientCache('/notices');
    const res = await api.post('/notices', data);
    return res.data;
  },
  update: async (id, data) => {
    invalidateClientCache('/notices');
    const res = await api.put(`/notices/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    invalidateClientCache('/notices');
    const res = await api.delete(`/notices/${id}`);
    return res.data;
  }
};

// Books API
export const bookService = {
  getAll: async (params = {}) => {
    return cachedGet('/books', params, 45000);
  },
  getCategories: async () => {
    return cachedGet('/books/categories', {}, 120000);
  },
  getById: async (id) => {
    return cachedGet(`/books/${id}`, {}, 60000);
  },
  getByCategory: async (slug) => {
    return cachedGet(`/books/by-category/${slug}`, {}, 60000);
  },
  create: async (data) => {
    invalidateClientCache('/books');
    const res = await api.post('/books', data);
    return res.data;
  },
  update: async (id, data) => {
    invalidateClientCache('/books');
    const res = await api.put(`/books/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    invalidateClientCache('/books');
    const res = await api.delete(`/books/${id}`);
    return res.data;
  },
  getStats: async () => {
    return cachedGet('/books/stats', {}, 30000);
  }
};

// Upload API
export const uploadService = {
  uploadPdf: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post('/upload/pdf', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  }
};

export default api;
