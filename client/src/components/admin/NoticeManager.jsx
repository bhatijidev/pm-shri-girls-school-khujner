import React, { useState, useEffect } from 'react';
import { noticeService, uploadService } from '../../services/api';
import { Plus, Edit2, Trash2, AlertCircle, FileText, Upload, Check, X, Search, Bell } from 'lucide-react';
import Loading from '../ui/Loading';

export default function NoticeManager() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);

  const initialForm = {
    title: '',
    title_hindi: '',
    content: '',
    content_hindi: '',
    category: 'general',
    is_urgent: 0,
    attachment_url: ''
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await noticeService.getAll({ limit: 50, search: searchTerm });
      if (res.success) {
        setNotices(res.data);
      }
    } catch (err) {
      console.error('Error fetching notices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [searchTerm]);

  const openCreateModal = () => {
    setEditingNotice(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const openEditModal = (notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title || '',
      title_hindi: notice.title_hindi || '',
      content: notice.content || '',
      content_hindi: notice.content_hindi || '',
      category: notice.category || 'general',
      is_urgent: notice.is_urgent ? 1 : 0,
      attachment_url: notice.attachment_url || ''
    });
    setShowModal(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadService.uploadPdf(file);
      if (res.success && res.data.url) {
        setFormData((prev) => ({ ...prev, attachment_url: res.data.url }));
        setMessage({ type: 'success', text: 'PDF attachment uploaded successfully!' });
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
      if (editingNotice) {
        const res = await noticeService.update(editingNotice.id, formData);
        if (res.success) {
          setMessage({ type: 'success', text: 'Notice updated successfully!' });
        }
      } else {
        const res = await noticeService.create(formData);
        if (res.success) {
          setMessage({ type: 'success', text: 'New notice published successfully!' });
        }
      }
      setShowModal(false);
      fetchNotices();
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to save notice' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this notice from the website?')) return;
    try {
      const res = await noticeService.delete(id);
      if (res.success) {
        setMessage({ type: 'success', text: 'Notice deleted successfully!' });
        fetchNotices();
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete notice' });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center space-x-2">
            <Bell className="w-5 h-5 text-brand-orange" />
            <span>Manage Notices & Circulars</span>
          </h2>
          <p className="text-xs text-slate-500">
            Publish urgent alerts, holiday notices, and exam schedules to the public website.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center space-x-2 bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md hover:opacity-95 transition-all self-stretch sm:self-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Notice</span>
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

      {/* Search Input */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notices by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium ml-4">
          Total: <strong>{notices.length}</strong> notices
        </span>
      </div>

      {/* Notices Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <Loading text="Loading notices..." />
        ) : notices.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            No notices found. Click "Post New Notice" to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-100 uppercase text-slate-400 font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Title & Hindi</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Published</th>
                  <th className="py-3.5 px-4">Attachment</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {notices.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6 max-w-xs sm:max-w-md">
                      <div className="font-bold text-slate-900 line-clamp-1">{n.title}</div>
                      {n.title_hindi && (
                        <div className="font-hindi text-[11px] text-slate-500 line-clamp-1">
                          {n.title_hindi}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                        {n.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {n.is_urgent === 1 ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-red-100 text-red-700 border border-red-200">
                          🔴 URGENT
                        </span>
                      ) : (
                        <span className="text-slate-400">Normal</span>
                      )}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-slate-500">
                      {new Date(n.published_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {n.attachment_url ? (
                        <a
                          href={n.attachment_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-brand-orange hover:underline font-semibold"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </a>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(n)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-brand-orange hover:bg-orange-50 transition-colors"
                        title="Edit Notice"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(n.id)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Notice"
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

      {/* Modal for Create / Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-heading font-extrabold text-lg text-slate-900">
                {editingNotice ? 'Edit School Notice' : 'Post New Circular / Notice'}
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
                  Notice Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Admission Open for Session 2025-26"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notice Title (Hindi)
                </label>
                <input
                  type="text"
                  value={formData.title_hindi}
                  onChange={(e) => setFormData({ ...formData, title_hindi: e.target.value })}
                  placeholder="उदा. सत्र 2025-26 हेतु निःशुल्क प्रवेश प्रारंभ"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-hindi focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none bg-white"
                  >
                    <option value="general">General Circular</option>
                    <option value="admission">Admission</option>
                    <option value="exam">Examination</option>
                    <option value="holiday">Holiday</option>
                    <option value="result">Result</option>
                    <option value="urgent">Urgent Announcement</option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_urgent === 1}
                      onChange={(e) => setFormData({ ...formData, is_urgent: e.target.checked ? 1 : 0 })}
                      className="w-4 h-4 rounded text-brand-orange focus:ring-brand-orange"
                    />
                    <span className="text-xs font-bold text-red-600">Mark as URGENT Alert</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notice Content (English) *
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full circular details..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notice Content (Hindi)
                </label>
                <textarea
                  rows="3"
                  value={formData.content_hindi}
                  onChange={(e) => setFormData({ ...formData, content_hindi: e.target.value })}
                  placeholder="हिंदी में विस्तृत सूचना..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-hindi focus:ring-2 focus:ring-brand-orange focus:outline-none resize-none"
                ></textarea>
              </div>

              {/* PDF Attachment Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Upload Circular Document / PDF
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-brand-orange hover:file:bg-orange-100"
                  />
                  {uploading && <span className="text-xs text-brand-orange animate-pulse">Uploading...</span>}
                </div>
                {formData.attachment_url && (
                  <p className="text-[11px] text-emerald-600 mt-1 truncate">
                    Attached: {formData.attachment_url}
                  </p>
                )}
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
                  {editingNotice ? 'Update Notice' : 'Publish Notice'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
