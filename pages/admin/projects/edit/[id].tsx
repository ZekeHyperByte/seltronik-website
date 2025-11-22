import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSave, FaPlus, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { projectService, storageService, Project } from '../../../../lib/supabase';

const EditProject = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const [project, setProject] = useState<Project | null>(null);
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([]);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const data = await projectService.getById(parseInt(id as string));
          setProject(data);
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      };
      fetchProject();
    }
  }, [id]);

  const categories = [
    { id: 'highway', name: 'Jalan Tol' },
    { id: 'city', name: 'Jalan Kota' },
    { id: 'smartcity', name: 'Smart City' },
    { id: 'government', name: 'Pemerintah' }
  ];

  const handleInputChange = (field: string, value: string) => {
    if (project) {
      setProject({ ...project, [field]: value });
    }
  };

  const handleTestimonialChange = (field: string, value: string) => {
    if (project) {
      setProject({
        ...project,
        testimonial: {
          ...project.testimonial!,
          [field]: value
        }
      });
    }
  };

  const handleStatsChange = (field: string, value: string) => {
    if (project) {
      setProject({
        ...project,
        stats: {
          ...project.stats!,
          [field]: value
        }
      });
    }
  };

  const handleScopeChange = (index: number, value: string) => {
    if (project) {
      const newScope = [...project.scope];
      newScope[index] = value;
      setProject({ ...project, scope: newScope });
    }
  };

  const addScope = () => {
    if (project) {
      setProject({ ...project, scope: [...project.scope, ''] });
    }
  };

  const removeScope = (index: number) => {
    if (project && project.scope.length > 1) {
      const newScope = project.scope.filter((_, i) => i !== index);
      setProject({ ...project, scope: newScope });
    }
  };

  const handleImageChange = (index: number, value: string) => {
    if (project) {
      const newImages = [...project.images];
      newImages[index] = value;
      setProject({ ...project, images: newImages });
    }
  };

  const addImage = () => {
    if (project) {
      setProject({ ...project, images: [...project.images, ''] });
    }
  };

  const removeImage = (index: number) => {
    if (project && project.images.length > 1) {
      const newImages = project.images.filter((_, i) => i !== index);
      setProject({ ...project, images: newImages });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (project) {
      try {
        const imageUrls = await Promise.all(
          imageFiles.map(async (file, index) => {
            if (file) {
              // If there's a new file, first delete the old one if it exists
              const oldImageUrl = project.images[index];
              if (oldImageUrl) {
                await storageService.deleteFile(oldImageUrl);
              }
              // Now, upload the new file
              return storageService.uploadFile(file);
            }
            // If no new file, keep the existing image URL
            return Promise.resolve(project.images[index]);
          })
        );

        await projectService.update(project.id!, {
          ...project,
          scope: project.scope.filter(s => s.trim() !== ''),
          images: imageUrls.filter(url => url !== ''),
          stats: {
            units: parseInt(project.stats?.units?.toString() || '0') || 0,
            duration: project.stats?.duration || '',
            value: project.stats?.value || ''
          }
        });
        router.push('/admin/dashboard');
      } catch (error) {
        console.error('Error updating project:', error);
        alert('Gagal memperbarui proyek: ' + (error as Error).message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isAuthenticated || !project) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Edit Proyek - Admin Seltronik</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Link
                href="/admin/dashboard"
                className="mr-4 p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <FaArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Proyek</h1>
                <p className="text-gray-600 dark:text-gray-300">Perbarui detail proyek</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Informasi Dasar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Judul Proyek *
                    </label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                      placeholder="Contoh: Tol Trans Jawa - Seksi 1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Klien *
                    </label>
                    <input
                      type="text"
                      value={project.client}
                      onChange={(e) => handleInputChange('client', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                      placeholder="Contoh: PT. Jasa Marga (Persero) Tbk"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Lokasi *
                    </label>
                    <input
                      type="text"
                      value={project.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                      placeholder="Contoh: Jakarta - Cikampek"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tahun *
                    </label>
                    <input
                      type="text"
                      value={project.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                      placeholder="Contoh: 2023"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Kategori *
                    </label>
                    <select
                      value={project.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                      required
                    >
                      <option value="">Pilih Kategori</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deskripsi *
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                    placeholder="Deskripsi lengkap proyek..."
                    required
                  />
                </div>
              </div>

              {/* Scope of Work */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Lingkup Pekerjaan</h2>
                  <button
                    type="button"
                    onClick={addScope}
                    className="flex items-center px-3 py-2 text-sm bg-seltronik-red text-white rounded-lg hover:bg-seltronik-red-hover"
                  >
                    <FaPlus className="mr-2" />
                    Tambah Item
                  </button>
                </div>
                
                <div className="space-y-3">
                  {project.scope.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleScopeChange(index, e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                        placeholder="Contoh: Instalasi 500+ unit lampu jalan LED"
                      />
                      {project.scope.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeScope(index)}
                          className="p-3 text-red-600 hover:text-red-800"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Statistics */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Statistik Proyek</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Jumlah Unit
                    </label>
                    <input
                      type="number"
                      value={project.stats?.units}
                      onChange={(e) => handleStatsChange('units', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                      placeholder="500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Durasi
                    </label>
                    <input
                      type="text"
                      value={project.stats?.duration}
                      onChange={(e) => handleStatsChange('duration', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                      placeholder="6 bulan"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nilai Proyek
                    </label>
                    <input
                      type="text"
                      value={project.stats?.value}
                      onChange={(e) => handleStatsChange('value', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                      placeholder="Rp 15 Miliar"
                    />
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Testimoni (Opsional)</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Testimoni
                    </label>
                    <textarea
                      value={project.testimonial?.text}
                      onChange={(e) => handleTestimonialChange('text', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                      placeholder="Testimoni dari klien..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nama
                      </label>
                      <input
                        type="text"
                        value={project.testimonial?.author}
                        onChange={(e) => handleTestimonialChange('author', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                        placeholder="Ir. Budi Santoso"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Jabatan
                      </label>
                      <input
                        type="text"
                        value={project.testimonial?.position}
                        onChange={(e) => handleTestimonialChange('position', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                        placeholder="Project Manager - Jasa Marga"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Gambar Proyek</h2>
                  <button
                    type="button"
                    onClick={addImage}
                    className="flex items-center px-3 py-2 text-sm bg-seltronik-red text-white rounded-lg hover:bg-seltronik-red-hover"
                  >
                    <FaPlus className="mr-2" />
                    Tambah Gambar
                  </button>
                </div>
                
                <div className="space-y-3">
                  {project.images.map((image, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="file"
                        onChange={(e) => {
                          const newImageFiles = [...imageFiles];
                          newImageFiles[index] = e.target.files ? e.target.files[0] : null;
                          setImageFiles(newImageFiles);
                        }}
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                      />
                      {project.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="p-3 text-red-600 hover:text-red-800"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center px-6 py-3 bg-seltronik-red text-white rounded-lg hover:bg-seltronik-red-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaSave className="mr-2" />
                  {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default EditProject;
