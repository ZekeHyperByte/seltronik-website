import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSave, FaPlus, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { productService, storageService, Product } from '../../../../lib/supabase';

const EditProduct = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
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

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const data = await productService.getById(parseInt(id as string));
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const categories = [
    { id: 'pedestrian', name: 'Lampu Penyebrangan' },
    { id: 'warning', name: 'Warning Light' },
    { id: 'traffic', name: 'Traffic Light' },
    { id: 'street', name: 'Lampu Jalan' },
    { id: 'controller', name: 'Controller System' }
  ];

  const handleInputChange = (field: string, value: string) => {
    if (product) {
      setProduct({ ...product, [field]: value });
    }
  };

  const handleSpecificationChange = (field: string, value: string) => {
    if (product) {
      setProduct({
        ...product,
        specifications: {
          ...product.specifications,
          [field]: value
        }
      });
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (product) {
      const newFeatures = [...product.features];
      newFeatures[index] = value;
      setProduct({ ...product, features: newFeatures });
    }
  };

  const addFeature = () => {
    if (product) {
      setProduct({ ...product, features: [...product.features, ''] });
    }
  };

  const removeFeature = (index: number) => {
    if (product && product.features.length > 1) {
      const newFeatures = product.features.filter((_, i) => i !== index);
      setProduct({ ...product, features: newFeatures });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (product) {
      try {
        let imageUrl = product.image;
        if (imageFile) {
          if (product.image) {
            await storageService.deleteFile(product.image);
          }
          imageUrl = await storageService.uploadFile(imageFile);
        }

        let catalog_url = product.catalog_url;
        if (catalogFile) {
          if (product.catalog_url) {
            await storageService.deleteFile(product.catalog_url);
          }
          catalog_url = await storageService.uploadFile(catalogFile);
        }

        await productService.update(product.id!, {
          ...product,
          image: imageUrl,
          catalog_url: catalog_url,
          features: product.features.filter(f => f.trim() !== ''),
        });
        router.push('/admin/dashboard');
      } catch (error) {
        console.error('Error updating product:', error);
        alert('Gagal memperbarui produk: ' + (error as Error).message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isAuthenticated || !product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Edit Produk - Admin Seltronik</title>
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Produk</h1>
                <p className="text-gray-600 dark:text-gray-300">Perbarui detail produk</p>
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
                    className="flex items-center px-3 py-2 text-sm bg-seltronik-red text-white rounded-lg hover:bg-red-600"
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
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Spesifikasi Teknis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Daya
                    </label>
                    <input
                      type="text"
                      value={product.specifications.power}
                      onChange={(e) => handleSpecificationChange('power', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                      placeholder="Contoh: 30 Watt"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tegangan
                    </label>
                    <input
                      type="text"
                      value={product.specifications.voltage}
                      onChange={(e) => handleSpecificationChange('voltage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                      placeholder="Contoh: AC 220V"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Material
                    </label>
                    <input
                      type="text"
                      value={product.specifications.material}
                      onChange={(e) => handleSpecificationChange('material', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                      placeholder="Contoh: Aluminium Die Cast"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Dimensi
                    </label>
                    <input
                      type="text"
                      value={product.specifications.dimension}
                      onChange={(e) => handleSpecificationChange('dimension', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                      placeholder="Contoh: 300 x 300 x 120 mm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Berat
                    </label>
                    <input
                      type="text"
                      value={product.specifications.weight}
                      onChange={(e) => handleSpecificationChange('weight', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                      placeholder="Contoh: 5 kg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sertifikasi
                    </label>
                    <input
                      type="text"
                      value={product.specifications.certification}
                      onChange={(e) => handleSpecificationChange('certification', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white"
                      placeholder="Contoh: SNI, CE"
                    />
                  </div>
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
                  className="flex items-center px-6 py-3 bg-seltronik-red text-white rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default EditProduct;
