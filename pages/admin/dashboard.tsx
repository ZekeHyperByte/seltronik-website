import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, FaBox, FaEnvelope, FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaEye, 
  FaBars, FaTimes, FaCheck, FaReply, FaArchive, FaEnvelopeOpen, 
  FaSearch, FaFilter, FaWhatsapp, FaPhone, FaBuilding, FaCalendar,
  FaChevronLeft, FaChevronRight, FaExclamationTriangle
} from 'react-icons/fa';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { productService, statsService, contactService, Product } from '../../lib/supabase';
import { ContactMessage, ContactStats } from '../../services/contactService';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/authService';
import Modal from '../../components/Modal';

type TabType = 'overview' | 'products' | 'contacts';
type MessageStatus = 'unread' | 'read' | 'replied' | 'archived';

const AdminDashboard = () => {
  const { isAuthenticated, isAdmin, loading: authLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  
  // Contacts state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [contactStats, setContactStats] = useState<ContactStats>({
    total: 0, unread: 0, read: 0, replied: 0, archived: 0
  });
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [messageFilter, setMessageFilter] = useState<MessageStatus | 'all'>('all');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  
  // Dashboard stats
  const [dashboardStats, setDashboardStats] = useState({
    products: 0,
    messages: 0
  });
  
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || !isAdmin) {
        router.push('/admin/login');
      } else {
        loadData();
      }
    }
  }, [authLoading, isAuthenticated, isAdmin, router]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsData, statsData, messagesData, contactStatsData] = await Promise.all([
        productService.getAll(),
        statsService.getDashboardStats(),
        contactService.getAll(),
        contactService.getStats()
      ]);

      setProducts(productsData);
      setDashboardStats(statsData);
      setMessages(messagesData);
      setContactStats(contactStatsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        await productService.delete(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Gagal menghapus produk');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleViewMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    setAdminNotes(message.admin_notes || '');
    setIsMessageModalOpen(true);
    
    // Mark as read if unread
    if (message.status === 'unread' && message.id) {
      try {
        await contactService.markAsRead(message.id);
        setMessages(messages.map(m => 
          m.id === message.id ? { ...m, status: 'read' as MessageStatus } : m
        ));
        const stats = await contactService.getStats();
        setContactStats(stats);
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
    }
  };

  const handleUpdateMessageStatus = async (status: MessageStatus) => {
    if (!selectedMessage?.id) return;
    
    try {
      await contactService.updateStatus(selectedMessage.id, status, adminNotes);
      setMessages(messages.map(m => 
        m.id === selectedMessage.id ? { ...m, status, admin_notes: adminNotes } : m
      ));
      const stats = await contactService.getStats();
      setContactStats(stats);
      setIsMessageModalOpen(false);
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const handleDeleteMessage = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
      try {
        await contactService.delete(id);
        setMessages(messages.filter(m => m.id !== id));
        const stats = await contactService.getStats();
        setContactStats(stats);
        setIsMessageModalOpen(false);
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const filteredMessages = messageFilter === 'all' 
    ? messages 
    : messages.filter(m => m.status === messageFilter);

  const menuItems = [
    { id: 'overview' as TabType, name: 'Dashboard', icon: FaHome },
    { id: 'products' as TabType, name: 'Produk', icon: FaBox },
    { id: 'contacts' as TabType, name: 'Pesan Kontak', icon: FaEnvelope },
  ];

  const getCategoryName = (category: string) => {
    const categories: { [key: string]: string } = {
      'pedestrian': 'Lampu Penyebrangan',
      'warning': 'Warning Light',
      'traffic': 'Traffic Light',
      'street': 'Lampu Jalan',
      'highway': 'Jalan Tol',
      'city': 'Jalan Kota',
      'smartcity': 'Smart City',
      'government': 'Pemerintah'
    };
    return categories[category] || category;
  };

  const getStatusBadge = (status: MessageStatus) => {
    const styles = {
      unread: 'bg-red-100 text-red-800 border-red-200',
      read: 'bg-blue-100 text-blue-800 border-blue-200',
      replied: 'bg-green-100 text-green-800 border-green-200',
      archived: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    const labels = {
      unread: 'Belum Dibaca',
      read: 'Dibaca',
      replied: 'Dibalas',
      archived: 'Diarsipkan'
    };
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getSubjectLabel = (subject: string) => {
    const labels: { [key: string]: string } = {
      'konsultasi': 'Konsultasi Produk',
      'penawaran': 'Permintaan Penawaran',
      'kerjasama': 'Kerjasama Bisnis',
      'support': 'Technical Support',
      'lainnya': 'Lainnya'
    };
    return labels[subject] || subject;
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-seltronik-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-seltronik-yellow mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Seltronik</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
          {/* Logo */}
          <div className="flex items-center justify-center h-16 bg-seltronik-red">
            <span className="text-white text-xl font-bold">Seltronik Admin</span>
          </div>

          {/* Navigation */}
          <nav className="mt-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${
                  activeTab === item.id ? 'bg-gray-100 dark:bg-gray-700 border-r-4 border-seltronik-red' : ''
                }`}
              >
                <item.icon className="mr-3 text-gray-600 dark:text-gray-300" />
                <span className="text-gray-700 dark:text-gray-200">{item.name}</span>
                {item.id === 'contacts' && contactStats.unread > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {contactStats.unread}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
            >
              <FaSignOutAlt className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:ml-64 p-4 lg:p-8 laptop:p-4">
          {/* Mobile Header */}
          <div className="lg:hidden flex justify-between items-center mb-8">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
            <span className="text-xl font-bold text-seltronik-red">Seltronik Admin</span>
          </div>

          {/* Header */}
          <div className="mb-8 laptop:mb-4">
            <h1 className="text-2xl lg:text-3xl laptop:text-xl font-bold text-gray-900 dark:text-white">
              {menuItems.find(item => item.id === activeTab)?.name || 'Dashboard'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Kelola konten website Seltronik
            </p>
          </div>

          {/* Content */}
          {activeTab === 'overview' && (
            <div>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 laptop:gap-3 mb-8 laptop:mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 laptop:p-4"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-500 p-3 rounded-lg">
                      <FaBox className="text-white text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Total Produk</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{products.length}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 laptop:p-4"
                >
                  <div className="flex items-center">
                    <div className="bg-red-500 p-3 rounded-lg">
                      <FaEnvelope className="text-white text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Pesan Baru</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{contactStats.unread}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 laptop:p-4"
                >
                  <div className="flex items-center">
                    <div className="bg-green-500 p-3 rounded-lg">
                      <FaCheck className="text-white text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Pesan Dibalas</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{contactStats.replied}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 laptop:p-4"
                >
                  <div className="flex items-center">
                    <div className="bg-purple-500 p-3 rounded-lg">
                      <FaEnvelopeOpen className="text-white text-xl" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Total Pesan</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{contactStats.total}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 laptop:p-4">
                <h2 className="text-xl laptop:text-base font-bold text-gray-900 dark:text-white mb-4 laptop:mb-3">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab('products')}
                    className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                  >
                    <FaPlus className="mr-3 text-blue-600" />
                    <span className="text-blue-700 dark:text-blue-300">Tambah Produk</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('contacts')}
                    className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
                  >
                    <FaEnvelope className="mr-3 text-red-600" />
                    <span className="text-red-700 dark:text-red-300">Lihat Pesan</span>
                  </button>
                  <Link
                    href="/"
                    target="_blank"
                    className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <FaEye className="mr-3 text-gray-600" />
                    <span className="text-gray-700 dark:text-gray-300">Lihat Website</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Produk</h2>
                <Link
                  href="/admin/products/add"
                  className="bg-seltronik-red text-white px-4 py-2 rounded-lg hover:bg-seltronik-red-hover transition-colors duration-200 flex items-center"
                >
                  <FaPlus className="mr-2" />
                  Tambah Produk
                </Link>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
                <table className="w-full min-w-max">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Produk</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Kategori</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {loading ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-300">
                          Loading...
                        </td>
                      </tr>
                    ) : products.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-300">
                          Belum ada produk. <Link href="/admin/products/add" className="text-seltronik-red hover:underline">Tambah produk pertama</Link>
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-300 truncate max-w-xs">{product.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {getCategoryName(product.category)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Aktif
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link href={`/admin/products/edit/${product.id}`}>
                              <button 
                                className="text-blue-600 hover:text-blue-900 mr-3"
                                title="Edit produk"
                              >
                                <FaEdit />
                              </button>
                            </Link>
                            <button 
                              onClick={() => product.id && handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Hapus produk"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div>
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { id: 'all', label: 'Semua', count: contactStats.total },
                  { id: 'unread', label: 'Belum Dibaca', count: contactStats.unread },
                  { id: 'read', label: 'Dibaca', count: contactStats.read },
                  { id: 'replied', label: 'Dibalas', count: contactStats.replied },
                  { id: 'archived', label: 'Diarsipkan', count: contactStats.archived }
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setMessageFilter(filter.id as MessageStatus | 'all')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      messageFilter === filter.id
                        ? 'bg-seltronik-red text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {filter.label}
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      messageFilter === filter.id ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-600'
                    }`}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Messages Table */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
                <table className="w-full min-w-max">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pengirim</th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subjek</th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tanggal</th>
                      <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-300">
                          Loading...
                        </td>
                      </tr>
                    ) : filteredMessages.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-300">
                          <FaEnvelopeOpen className="mx-auto text-4xl mb-2 opacity-50" />
                          <p>Tidak ada pesan {messageFilter !== 'all' ? 'dengan status ini' : ''}</p>
                        </td>
                      </tr>
                    ) : (
                      filteredMessages.map((message) => (
                        <tr 
                          key={message.id} 
                          className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${
                            message.status === 'unread' ? 'bg-red-50/50 dark:bg-red-900/10' : ''
                          }`}
                          onClick={() => handleViewMessage(message)}
                        >
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                message.status === 'unread' ? 'bg-red-500' : 'bg-transparent'
                              }`} />
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{message.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{message.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{getSubjectLabel(message.subject)}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">{message.message}</div>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(message.status as MessageStatus)}
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {message.created_at && new Date(message.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              className="text-blue-600 hover:text-blue-900"
                              title="Lihat detail"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewMessage(message);
                              }}
                            >
                              <FaEye />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Detail Modal */}
      <Modal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        title="Detail Pesan"
        subtitle="Klik di luar area ini, tekan ESC, atau klik X untuk menutup"
        enableAnimation={true}
      >
        {selectedMessage && (
          <div className="space-y-6">
            {/* Message Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b dark:border-gray-700">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{selectedMessage.name}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                  <span>{selectedMessage.email}</span>
                  {selectedMessage.phone && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FaPhone className="text-xs" /> {selectedMessage.phone}
                      </span>
                    </>
                  )}
                </div>
                {selectedMessage.company && (
                  <div className="flex items-center gap-1 mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <FaBuilding className="text-xs" /> {selectedMessage.company}
                  </div>
                )}
              </div>
              <div className="text-right">
                {getStatusBadge(selectedMessage.status as MessageStatus)}
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <FaCalendar className="inline mr-1" />
                  {selectedMessage.created_at && new Date(selectedMessage.created_at).toLocaleString('id-ID')}
                </div>
              </div>
            </div>

            {/* Subject */}
            <div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Subjek</span>
              <p className="text-gray-900 dark:text-white font-medium mt-1">
                {getSubjectLabel(selectedMessage.subject)}
              </p>
            </div>

            {/* Message */}
            <div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Pesan</span>
              <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
            </div>

            {/* Admin Notes */}
            <div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Catatan Admin</span>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Tambahkan catatan internal..."
                rows={3}
                className="w-full mt-2 px-3 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t dark:border-gray-700">
              {selectedMessage.status !== 'replied' && (
                <button
                  onClick={() => handleUpdateMessageStatus('replied')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FaReply /> Tandai Dibalas
                </button>
              )}
              {selectedMessage.status !== 'archived' && (
                <button
                  onClick={() => handleUpdateMessageStatus('archived')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <FaArchive /> Arsipkan
                </button>
              )}
              {selectedMessage.status === 'archived' && (
                <button
                  onClick={() => handleUpdateMessageStatus('read')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <FaEnvelopeOpen /> Buka Arsip
                </button>
              )}
              <a
                href={`https://wa.me/${selectedMessage.phone?.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaWhatsapp /> Hubungi WA
              </a>
              <a
                href={`mailto:${selectedMessage.email}`}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaEnvelope /> Balas Email
              </a>
              <button
                onClick={() => selectedMessage.id && handleDeleteMessage(selectedMessage.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors ml-auto"
              >
                <FaTrash /> Hapus
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default AdminDashboard;
