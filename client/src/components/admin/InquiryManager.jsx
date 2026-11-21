import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, Phone, Mail, Calendar, Clock, CheckCircle2, 
  AlertCircle, Search, RefreshCw, Trash2, ExternalLink, Filter, 
  Shield, PlusCircle, X, Edit3, Save, FileText
} from 'lucide-react';
import { contactService } from '../../services/api';

export default function InquiryManager() {
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, contacted: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modals state
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingNotes, setEditingNotes] = useState('');
  const [updatingNotes, setUpdatingNotes] = useState(false);

  // Manual create form state
  const [newInquiry, setNewInquiry] = useState({
    name: '',
    phone: '',
    email: '',
    inquiry_type: 'Office Walk-in / Phone Inquiry',
    message: '',
    status: 'pending',
    admin_notes: ''
  });
  const [creating, setCreating] = useState(false);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await contactService.getInquiries({
        page,
        limit: 20,
        status: statusFilter,
        search
      });
      if (res.success) {
        setInquiries(res.data.inquiries || []);
        setStats(res.data.stats || { total: 0, pending: 0, contacted: 0, resolved: 0 });
        setTotalPages(res.data.pagination?.totalPages || 1);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [page, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchInquiries();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await contactService.updateInquiryStatus(id, newStatus);
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
      }
      fetchInquiries();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setUpdatingNotes(true);
    try {
      const res = await contactService.updateInquiry(selectedInquiry.id, {
        admin_notes: editingNotes
      });
      if (res.success) {
        setSelectedInquiry((prev) => ({ ...prev, admin_notes: editingNotes }));
        setInquiries((prev) =>
          prev.map((item) => (item.id === selectedInquiry.id ? { ...item, admin_notes: editingNotes } : item))
        );
        alert('Admin remarks saved successfully!');
      }
    } catch (err) {
      alert('Failed to save notes');
    } finally {
      setUpdatingNotes(false);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!newInquiry.name.trim() || !newInquiry.phone.trim()) {
      alert('Name and 10-digit Phone are required');
      return;
    }
    setCreating(true);
    try {
      const res = await contactService.createManualInquiry(newInquiry);
      if (res.success) {
        setShowCreateModal(false);
        setNewInquiry({
          name: '',
          phone: '',
          email: '',
          inquiry_type: 'Office Walk-in / Phone Inquiry',
          message: '',
          status: 'pending',
          admin_notes: ''
        });
        fetchInquiries();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create manual inquiry');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id, ticketId) => {
    if (!window.confirm(`Are you sure you want to permanently delete inquiry ${ticketId}?`)) return;
    try {
      await contactService.deleteInquiry(id);
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
      fetchInquiries();
    } catch (err) {
      alert('Failed to delete inquiry');
    }
  };

  const openDetailModal = (inq) => {
    setSelectedInquiry(inq);
    setEditingNotes(inq.admin_notes || '');
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Stat Cards */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80 w-fit mb-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Authorized Only (केवल अधिकृत एडमिन नियंत्रण)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 flex items-center space-x-2">
            <MessageSquare className="w-6 h-6 text-brand-orange" />
            <span>Contact Desk & Inquiries (पूछताछ प्रबंधन)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            ऑनलाइन एवं ऑफलाइन प्राप्त सभी अभिभावक-छात्रा पूछताछ का पूर्ण CRUD प्रबंधन
          </p>
        </div>

        <div className="flex items-center space-x-2.5 self-start sm:self-auto">
          {/* Create Manual Inquiry Button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white hover:opacity-95 text-xs font-bold transition-all shadow-md shadow-orange-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ New Inquiry (मैन्युअल लीड जोड़ें)</span>
          </button>

          <button
            onClick={fetchInquiries}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-semibold block">Total Inquiries</span>
          <span className="text-2xl font-extrabold text-slate-900 mt-1 block">{stats.total}</span>
        </div>
        <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200/80 shadow-sm">
          <span className="text-xs text-amber-700 font-bold block">New / Pending</span>
          <span className="text-2xl font-extrabold text-amber-900 mt-1 block">{stats.pending}</span>
        </div>
        <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200/80 shadow-sm">
          <span className="text-xs text-blue-700 font-bold block">Contacted</span>
          <span className="text-2xl font-extrabold text-blue-900 mt-1 block">{stats.contacted}</span>
        </div>
        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200/80 shadow-sm">
          <span className="text-xs text-emerald-700 font-bold block">Resolved</span>
          <span className="text-2xl font-extrabold text-emerald-900 mt-1 block">{stats.resolved}</span>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All Inquiries' },
            { id: 'pending', label: 'Pending' },
            { id: 'contacted', label: 'Contacted' },
            { id: 'resolved', label: 'Resolved' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setStatusFilter(tab.id); setPage(1); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === tab.id
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, ticket..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Inquiries Table / List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-orange mb-2" />
            <span>Loading inquiries...</span>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <MessageSquare className="w-10 h-10 mx-auto text-slate-300" />
            <h4 className="text-base font-bold text-slate-700">No Inquiries Found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {search || statusFilter !== 'all' ? 'Try clearing your filters or search term.' : 'When parents or students submit the contact form, inquiries will appear here.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-extrabold">
                <tr>
                  <th className="py-3.5 px-4">Ticket & Date</th>
                  <th className="py-3.5 px-4">Name & Contact</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Message / Query</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors group">
                    {/* Ticket & Date */}
                    <td className="py-4 px-4 whitespace-nowrap cursor-pointer" onClick={() => openDetailModal(inq)}>
                      <span className="font-mono font-bold text-brand-orange block group-hover:underline">
                        {inq.ticket_id}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {inq.created_at ? new Date(inq.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                      </span>
                    </td>

                    {/* Name & Contact */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-900 block text-xs cursor-pointer hover:text-brand-orange" onClick={() => openDetailModal(inq)}>
                        {inq.name}
                      </span>
                      <div className="flex items-center space-x-2 mt-1">
                        <a
                          href={`tel:${inq.phone}`}
                          className="inline-flex items-center space-x-1 text-slate-600 hover:text-brand-orange font-mono"
                        >
                          <Phone className="w-3 h-3 text-emerald-600" />
                          <span>{inq.phone}</span>
                        </a>
                        <a
                          href={`https://wa.me/91${inq.phone.replace(/\D/g, '').slice(-10)}?text=${encodeURIComponent(`Namaste ${inq.name} ji, PM SHRI Girls School Khujner office se baat kar rahe hain aapki inquiry (Ref: ${inq.ticket_id}) ke sambandh me.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded hover:bg-emerald-100"
                        >
                          WhatsApp
                        </a>
                      </div>
                      {inq.email && (
                        <span className="text-[10px] text-slate-400 block truncate max-w-[150px] mt-0.5">
                          {inq.email}
                        </span>
                      )}
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-1 rounded-lg">
                        {inq.inquiry_type || 'General'}
                      </span>
                      {inq.admin_notes && (
                        <span className="block text-[9px] text-indigo-600 font-bold mt-1">
                          📝 Has Notes
                        </span>
                      )}
                    </td>

                    {/* Message */}
                    <td className="py-4 px-4 max-w-xs cursor-pointer" onClick={() => openDetailModal(inq)}>
                      <p className="text-slate-700 line-clamp-2 leading-relaxed">
                        {inq.message}
                      </p>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <select
                        value={inq.status || 'pending'}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className={`text-[11px] font-bold py-1 px-2.5 rounded-xl border focus:outline-none ${
                          inq.status === 'pending'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : inq.status === 'contacted'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>

                    {/* Actions: View Details / Delete */}
                    <td className="py-4 px-4 text-right whitespace-nowrap space-x-1">
                      <button
                        onClick={() => openDetailModal(inq)}
                        className="p-1.5 text-slate-500 hover:text-brand-orange rounded-lg hover:bg-orange-50 transition-colors"
                        title="View Details & Notes"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(inq.id, inq.ticket_id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete Inquiry"
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

      {/* 1. VIEW / EDIT DETAILS & REMARKS MODAL */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-extrabold text-brand-orange bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                  {selectedInquiry.ticket_id}
                </span>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                  selectedInquiry.status === 'pending'
                    ? 'bg-amber-100 text-amber-800'
                    : selectedInquiry.status === 'contacted'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {selectedInquiry.status?.toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl font-heading font-extrabold text-slate-900 mt-2">
                {selectedInquiry.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Submitted on {new Date(selectedInquiry.created_at).toLocaleString('en-IN')}
              </p>
            </div>

            {/* Contact Action Bar */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Mobile Number</span>
                <a href={`tel:${selectedInquiry.phone}`} className="text-sm font-bold text-slate-900 font-mono flex items-center space-x-1.5 hover:text-brand-orange">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{selectedInquiry.phone}</span>
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href={`https://wa.me/91${selectedInquiry.phone.replace(/\D/g, '').slice(-10)}?text=${encodeURIComponent(`Namaste ${selectedInquiry.name} ji, PM SHRI Girls School Khujner office se baat kar rahe hain aapki inquiry (Ref: ${selectedInquiry.ticket_id}) ke sambandh me.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors inline-flex items-center space-x-1"
                >
                  <span>Chat WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                >
                  Direct Call
                </a>
              </div>
            </div>

            {/* Inquiry Content */}
            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold text-slate-500 block mb-1">Subject / Category</span>
                <span className="text-xs font-semibold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl inline-block">
                  {selectedInquiry.inquiry_type || 'General Inquiry'}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 block mb-1">Message / Question</span>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Admin Internal Remarks / Notes */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                    <Edit3 className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Admin Internal Notes / Remarks (कार्यालयीन टिप्पणी)</span>
                  </label>
                  <span className="text-[10px] text-slate-400">Only visible to Admin</span>
                </div>
                <textarea
                  rows="3"
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="e.g. Called parent on 21 Nov, informed about admission documents requirement..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
                ></textarea>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleSaveNotes}
                    disabled={updatingNotes}
                    className="px-3.5 py-1.5 rounded-xl bg-brand-orange hover:bg-brand-red text-white text-xs font-bold transition-colors inline-flex items-center space-x-1.5 disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{updatingNotes ? 'Saving...' : 'Save Remarks'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedInquiry.id, selectedInquiry.ticket_id)}
                className="text-xs text-rose-600 hover:text-rose-800 font-bold inline-flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Inquiry</span>
              </button>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. CREATE MANUAL INQUIRY MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 relative space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-orange bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                Admin Lead Entry
              </span>
              <h3 className="text-xl font-heading font-extrabold text-slate-900 mt-2">
                Add Manual Inquiry (ऑफ़लाइन पूछताछ दर्ज करें)
              </h3>
              <p className="text-xs text-slate-500">
                फ़ोन कॉल अथवा कार्यालय में व्यक्तिगत उपस्थित अभिभावकों की पूछताछ दर्ज करें
              </p>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student / Parent Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newInquiry.name}
                    onChange={(e) => setNewInquiry({ ...newInquiry, name: e.target.value })}
                    placeholder="e.g. Suresh Verma"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newInquiry.phone}
                    onChange={(e) => setNewInquiry({ ...newInquiry, phone: e.target.value })}
                    placeholder="10-digit number"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={newInquiry.email}
                    onChange={(e) => setNewInquiry({ ...newInquiry, email: e.target.value })}
                    placeholder="parent@gmail.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newInquiry.inquiry_type}
                    onChange={(e) => setNewInquiry({ ...newInquiry, inquiry_type: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  >
                    <option value="Admission Inquiry">Admission Inquiry</option>
                    <option value="TC / Migration Request">TC / Migration Request</option>
                    <option value="Scholarship Inquiry">Scholarship Inquiry</option>
                    <option value="Sports / Facilities Inquiry">Sports / Facilities Inquiry</option>
                    <option value="Office Walk-in / Phone Inquiry">Office Walk-in / Phone Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Inquiry Message / Details *
                </label>
                <textarea
                  rows="3"
                  required
                  value={newInquiry.message}
                  onChange={(e) => setNewInquiry({ ...newInquiry, message: e.target.value })}
                  placeholder="अभिभावक अथवा छात्रा द्वारा पूछा गया विवरण..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Internal Remarks / Notes (Optional)
                </label>
                <input
                  type="text"
                  value={newInquiry.admin_notes}
                  onChange={(e) => setNewInquiry({ ...newInquiry, admin_notes: e.target.value })}
                  placeholder="e.g. Document copy collected"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-orange to-brand-red text-white text-xs font-bold transition-all shadow-md shadow-orange-500/20 disabled:opacity-50"
                >
                  {creating ? 'Saving...' : 'Save Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}