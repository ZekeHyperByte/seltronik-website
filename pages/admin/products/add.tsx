import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSave, FaPlus, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { productService, storageService } from '../../../lib/supabase';

const AddProduct = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    features: [''],
    specifications: {} as Record<string, string>,
    image: '',
    catalog_url: ''
  });

  const [specificationFields, setSpecificationFields] = useState<Array<{key: string, value: string}>>([
    { key: '', value: '' }
  ]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [catalogFile, setCatalogFile] = useState<File | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  const categories = [
    { id: 'pedestrian', name: 'Lampu Penyebrangan' },
    { id: 'warning', name: 'Warning Light' },
    { id: 'traffic', name: 'Traffic Light' },
    { id: 'street', name: 'Lampu Jalan' },
    { id: 'controller', name: 'Controller System' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecificationFieldChange = (index: number, field: 'key' | 'value', value: string) => {
    const newFields = [...specificationFields];
    newFields[index][field] = value;
    setSpecificationFields(newFields);
    
    // Update product specifications
    const specifications: Record<string, string> = {};
    newFields.forEach(spec => {
      if (spec.key.trim() && spec.value.trim()) {
        specifications[spec.key.trim()] = spec.value.trim();
      }
    });
    setProduct(prev => ({
      ...prev,
      specifications
    }));
  };

  const addSpecificationField = () => {
    setSpecificationFields([...specificationFields, { key: '', value: '' }]);
  };

  const removeSpecificationField = (index: number) => {
    if (specificationFields.length > 1) {
      const newFields = specificationFields.filter((_, i) => i !== index);
      setSpecificationFields(newFields);
      
      // Update product specifications
      const specifications: Record<string, string> = {};
      newFields.forEach(spec => {
        if (spec.key.trim() && spec.value.trim()) {
          specifications[spec.key.trim()] = spec.value.trim();
        }
      });
      setProduct(prev => ({
        ...prev,
        specifications
      }));
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...product.features];
    newFeatures[index] = value;
    setProduct(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setProduct(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    if (product.features.length > 1) {
      const newFeatures = product.features.filter((_, i) => i !== index);
      setProduct(prev => ({
        ...prev,
        features: newFeatures
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await storageService.uploadFile(imageFile);
      }

      let catalogUrl = '';
      if (catalogFile) {
        catalogUrl = await storageService.uploadFile(catalogFile);
      }

      const productData = {
        ...product,
        image: imageUrl,
        catalog_url: catalogUrl,
        features: product.features.filter(f => f.trim() !== ''),
        specifications: product.specifications
      };
      await productService.create(productData);
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Gagal menambahkan produk: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Tambah Produk - Admin Seltronik</title>
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tambah Produk</h1>
                <p className="text-gray-600 dark:text-gray-300">Tambahkan produk baru ke website</p>
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
                      Nama Produk *
                    </label>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                      placeholder="Contoh: SP-230D Pedestrian Light"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Kategori *
                    </label>
                    <select
                      value={product.category}
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
                    value={product.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                    placeholder="Deskripsi lengkap produk..."
                    required
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Fitur Produk</h2>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="flex items-center px-3 py-2 text-sm bg-seltronik-red text-white rounded-lg hover:bg-seltronik-red-hover"
                  >
                    <FaPlus className="mr-2" />
                    Tambah Fitur
                  </button>
                </div>
                
                <div className="space-y-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                        placeholder="Contoh: LED High Brightness"
                      />
                      {product.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="p-3 text-red-600 hover:text-red-800"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Spesifikasi Teknis</h2>
                  <button
                    type="button"
                    onClick={addSpecificationField}
                    className="flex items-center px-3 py-2 text-sm bg-seltronik-red text-white rounded-lg hover:bg-seltronik-red-hover"
                  >
                    <FaPlus className="mr-2" />
                    Tambah Spesifikasi
                  </button>
                </div>
                
                <div className="space-y-3">
                  {specificationFields.map((field, index) => (
                    <div key={index} className="grid grid-cols-5 gap-3 items-center">
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={field.key}
                          onChange={(e) => handleSpecificationFieldChange(index, 'key', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                          placeholder="Nama spesifikasi (contoh: Daya)"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) => handleSpecificationFieldChange(index, 'value', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                          placeholder="Nilai spesifikasi (contoh: 30 Watt)"
                        />
                      </div>
                      <div className="col-span-1 flex justify-center">
                        {specificationFields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSpecificationField(index)}
                            className="p-3 text-red-600 hover:text-red-800"
                          >
                            <FaTimes />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Media & Dokumen</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Gambar
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Katalog (PDF)
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setCatalogFile(e.target.files ? e.target.files[0] : null)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                    />
                  </div>
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
                  {isLoading ? 'Menyimpan...' : 'Simpan Produk'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
