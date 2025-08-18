import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaBox, FaProjectDiagram, FaUsers, FaCertificate, FaEnvelope, FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  const menuItems = [
    { id: 'overview', name: 'Dashboard', icon: FaHome },
    { id: 'products', name: 'Produk', icon: FaBox },
    { id: 'projects', name: 'Proyek', icon: FaProjectDiagram },
    { id: 'certificates', name: 'Sertifikat', icon: FaCertificate },
    { id: 'contacts', name: 'Kontak', icon: FaEnvelope },
  ];

  const stats = [
    { title: 'Total Produk', value: '25', color: 'bg-blue-500', icon: FaBox },
    { title: 'Total Proyek', value: '6', color: 'bg-green-500', icon: FaProjectDiagram },
    { title: 'Sertifikat', value: '8', color: 'bg-yellow-500', icon: FaCertificate },
    { title: 'Pesan Masuk', value: '12', color: 'bg-red-500', icon: FaEnvelope },
  ];

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Seltronik</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg">
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
        <div className="ml-64 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
                  >
                    <div className="flex items-center">
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <stat.icon className="text-white text-xl" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab('products')}
                    className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                  >
                    <FaPlus className="mr-3 text-blue-600" />
                    <span className="text-blue-700 dark:text-blue-300">Tambah Produk</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200"
                  >
                    <FaPlus className="mr-3 text-green-600" />
                    <span className="text-green-700 dark:text-green-300">Tambah Proyek</span>
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Produk</h2>
                <Link
                  href="/admin/products/add"
                  className="bg-seltronik-red text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center"
                >
                  <FaPlus className="mr-2" />
                  Tambah Produk
                </Link>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Produk</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Kategori</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">SP-230D Pedestrian Light</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">Unit lampu pedestrian dengan green dynamic display</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">Lampu Penyebrangan</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Aktif</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <FaEdit />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Proyek</h2>
                <Link
                  href="/admin/projects/add"
                  className="bg-seltronik-red text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center"
                >
                  <FaPlus className="mr-2" />
                  Tambah Proyek
                </Link>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Proyek</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Klien</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tahun</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Tol Trans Jawa - Seksi 1</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">Jakarta - Cikampek</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">PT. Jasa Marga</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <FaEdit />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Sertifikat</h2>
                <button className="bg-seltronik-red text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center">
                  <FaPlus className="mr-2" />
                  Tambah Sertifikat
                </button>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <p className="text-gray-600 dark:text-gray-300">Fitur manajemen sertifikat akan segera hadir.</p>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pesan Kontak</h2>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <p className="text-gray-600 dark:text-gray-300">Fitur manajemen pesan kontak akan segera hadir.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
