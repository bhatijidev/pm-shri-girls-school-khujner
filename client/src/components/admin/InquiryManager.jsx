import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, Phone, Mail, Calendar, Clock, CheckCircle2, 
  AlertCircle, Search, RefreshCw, Trash2, ExternalLink, Filter, Shield
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
      fetchInquiries();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id, ticketId) => {
    if (!window.confirm(`Are you sure you want to delete inquiry ${ticketId}?`)) return;
    try {
      await contactService.deleteInquiry(id);
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      fetchInquiries();
    } catch (err) {
      alert('Failed to delete inquiry');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">New / Pending</span>;
      case 'contacted':
        return <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">Contacted</span>;
      case 'resolved':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">Resolved</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Stat Cards */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 flex items-center space-x-2">
            <MessageSquare className="w-6 h-6 text-brand-orange" />
            <span>Contact Desk & Inquiries (पूछताछ)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            वेबसाइट से प्राप्त सभी अभिभावक व छात्र पूछताछ विवरण
          </p>
        </div>

        <button
          onClick={fetchInquiries}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors shadow-sm self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
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
                  <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Ticket & Date */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-brand-orange block">
                        {inq.ticket_id}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {inq.created_at ? new Date(inq.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                      </span>
                    </td>

                    {/* Name & Contact */}
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-900 block text-xs">
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
                    </td>

                    {/* Message */}
                    <td className="py-4 px-4 max-w-xs">
                      <p className="text-slate-700 line-clamp-3 leading-relaxed">
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

                    {/* Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
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
    </div>
  );
}
