import React, { useState, useEffect } from 'react';
import { bookService, uploadService } from '../../services/api';
import { Plus, Edit2, Trash2, BookOpen, ExternalLink, Download, FileText, Upload, Search, X, Check } from 'lucide-react';
import Loading from '../ui/Loading';

export default function BookManager() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState(null);

  const initialForm = {
    title: '',
    title_hindi: '',
    author: '',
    publisher: '',
    description: '',
    category_id: '',
    class_grade: 'Class 10',
    subject: '',
    link_type: 'external',
    external_url: '',
    pdf_file_url: '',
    is_public_domain: 1
  };

  const [formData, setFormData] = useState(initialForm);

  const loadData = async () => {
    setLoading(true);
    try {
      const [catsRes, booksRes] = await Promise.all([
        bookService.getCategories(),
        bookService.getAll({ limit: 100, search: searchTerm, category: selectedCategory })
      ]);
      if (catsRes.success) setCategories(catsRes.data);
      if (booksRes.success) setBooks(booksRes.data);
    } catch (err) {
      console.error('Error fetching books data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchTerm, selectedCategory]);

  const openCreateModal = () => {
    setEditingBook(null);
    setFormData({
      ...initialForm,
      category_id: categories[0]?.id || ''
    });
    setShowModal(true);
  };

  const openEditModal = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title || '',
      title_hindi: book.title_hindi || '',
      author: book.author || '',
      publisher: book.publisher || '',
      description: book.description || '',
      category_id: book.category_id || '',
      class_grade: book.class_grade || 'Class 10',
      subject: book.subject || '',
      link_type: book.link_type || 'external',
      external_url: book.external_url || '',
      pdf_file_url: book.pdf_file_url || '',
      is_public_domain: book.is_public_domain ? 1 : 0
    });
    setShowModal(true);
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadService.uploadPdf(file);
      if (res.success && res.data.url) {
        setFormData((prev) => ({
          ...prev,
          pdf_file_url: res.data.url,
          link_type: 'pdf'
        }));
        setMessage({ type: 'success', text: 'Book PDF uploaded successfully!' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'File upload failed' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        const res = await bookService.update(editingBook.id, formData);
        if (res.success) {
          setMessage({ type: 'success', text: 'Book catalog updated successfully!' });
        }
      } else {
        const res = await bookService.create(formData);
        if (res.success) {
          setMessage({ type: 'success', text: 'New book added to library!' });
        }
      }
      setShowModal(false);
      loadData();
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to save book' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book from the digital catalog?')) return;
    try {
      const res = await bookService.delete(id);
      if (res.success) {
        setMessage({ type: 'success', text: 'Book removed successfully!' });
        loadData();
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete book' });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-brand-orange" />
            <span>Manage Digital Library Catalog</span>
          </h2>
          <p className="text-xs text-slate-500">
            Add curriculum books, NCERT links, MP Board syllabi, and public domain granths.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center space-x-2 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md hover:opacity-95 transition-all self-stretch sm:self-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Book / E-Resource</span>
        </button>
      </div>

      {/* Message feedback */}
      {message && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold flex items-center justify-between ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by book title or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <span className="text-xs text-slate-500 whitespace-nowrap">
            Total: <strong>{books.length}</strong> items
          </span>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <Loading text="Loading library catalog..." />
        ) : books.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            No books found. Click "Add New Book" to start cataloging.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-100 uppercase text-slate-400 font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Book Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Grade / Subject</th>
                  <th className="py-3.5 px-4">Access Type</th>
                  <th className="py-3.5 px-4">Views</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {books.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 max-w-xs">
                      <div className="font-bold text-slate-900 line-clamp-1">{b.title}</div>
                      {b.title_hindi && (
                        <div className="font-hindi text-[11px] text-slate-500 line-clamp-1">
                          {b.title_hindi}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                        {b.category_name || 'General'}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-slate-600">
                      <div>{b.class_grade || 'All'}</div>
                      <div className="text-[10px] text-slate-400">{b.subject || 'General'}</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {b.link_type === 'pdf' ? (
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">
                          PDF File
                        </span>
                      ) : (
                        <a
                          href={b.external_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-orange hover:underline font-semibold inline-flex items-center space-x-1"
                        >
                          <span>Official Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-slate-500 font-medium">
                      {b.view_count || 0}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(b)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-brand-orange hover:bg-orange-50 transition-colors"
                        title="Edit Book"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Book"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Book Add / Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-heading font-extrabold text-lg text-slate-900">
                {editingBook ? 'Edit Book Details' : 'Add Book / E-Resource to Library'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Book Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. NCERT Class 10 Mathematics"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Book Title (Hindi)
                </label>
                <input
                  type="text"
                  value={formData.title_hindi}
                  onChange={(e) => setFormData({ ...formData, title_hindi: e.target.value })}
                  placeholder="उदा. कक्षा 10 गणित"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-hindi focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none bg-white"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.name_hindi || ''})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Class / Grade
                  </label>
                  <input
                    type="text"
                    value={formData.class_grade}
                    onChange={(e) => setFormData({ ...formData, class_grade: e.target.value })}
                    placeholder="e.g. Class 10, Class 12, All"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject / Stream
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Science, Mathematics, Sanskrit"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Publisher / Authority
                  </label>
                  <input
                    type="text"
                    value={formData.publisher}
                    onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                    placeholder="e.g. NCERT, MPBSE, Gita Press"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Access Delivery Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`p-3 rounded-xl border cursor-pointer flex items-center space-x-2 text-xs font-semibold ${formData.link_type === 'external' ? 'border-brand-orange bg-orange-50 text-brand-orange' : 'border-slate-200 text-slate-600'}`}>
                    <input
                      type="radio"
                      name="link_type"
                      checked={formData.link_type === 'external'}
                      onChange={() => setFormData({ ...formData, link_type: 'external' })}
                      className="hidden"
                    />
                    <ExternalLink className="w-4 h-4" />
                    <span>Official Portal Link</span>
                  </label>

                  <label className={`p-3 rounded-xl border cursor-pointer flex items-center space-x-2 text-xs font-semibold ${formData.link_type === 'pdf' ? 'border-brand-orange bg-orange-50 text-brand-orange' : 'border-slate-200 text-slate-600'}`}>
                    <input
                      type="radio"
                      name="link_type"
                      checked={formData.link_type === 'pdf'}
                      onChange={() => setFormData({ ...formData, link_type: 'pdf' })}
                      className="hidden"
                    />
                    <Download className="w-4 h-4" />
                    <span>Upload PDF File</span>
                  </label>
                </div>
              </div>

              {formData.link_type === 'external' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Website URL *
                  </label>
                  <input
                    type="url"
                    required={formData.link_type === 'external'}
                    value={formData.external_url}
                    onChange={(e) => setFormData({ ...formData, external_url: e.target.value })}
                    placeholder="https://ncert.nic.in/textbook.php"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Upload PDF Document
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfUpload}
                      className="text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-brand-orange hover:file:bg-orange-100"
                    />
                    {uploading && <span className="text-xs text-brand-orange animate-pulse">Uploading PDF...</span>}
                  </div>
                  {formData.pdf_file_url && (
                    <p className="text-[11px] text-emerald-600 mt-1 truncate">
                      File Path: {formData.pdf_file_url}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description / Overview
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of syllabus or book topics covered..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none resize-none"
                ></textarea>
              </div>

              <div className="flex items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_public_domain === 1}
                    onChange={(e) => setFormData({ ...formData, is_public_domain: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 rounded text-brand-orange focus:ring-brand-orange"
                  />
                  <span className="text-xs text-slate-600">
                    Verified Copyright-Free / Public Domain educational material
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-orange to-brand-red hover:opacity-95 shadow-md"
                >
                  {editingBook ? 'Save Changes' : 'Add to Catalog'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
