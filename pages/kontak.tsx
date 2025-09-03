import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaClock, FaFacebookF, FaInstagram, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import useGSAPAnimations from '../hooks/useGSAP';

const ContactPage = () => {
  // Apply GSAP animations
  useGSAPAnimations();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const { ref: mapRef, inView: mapInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (mapInView) {
      setShouldLoadMap(true);
    }
  }, [mapInView]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Alamat Kantor',
      content: 'Jl. PHH. Mustofa No.39 Kompleks Ruko Surapati Core Blok M 30',
      subcontent: 'Bandung, Jawa Barat 40192'
    },
    {
      icon: <FaPhone />,
      title: 'Telepon',
      content: '022-87241364',
      subcontent: 'Senin - Jumat, 08:00 - 17:00'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      content: 'sinyalektronik@outlook.com',
      subcontent: 'sales@seltronik.co.id'
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      content: '+62 811-2345-678',
      subcontent: 'Fast Response'
    }
  ];

  const officeHours = [
    { day: 'Senin - Jumat', time: '08:00 - 17:00' },
    { day: 'Sabtu', time: '08:00 - 14:00' },
    { day: 'Minggu', time: 'Tutup' }
  ];

  return (
    <Layout>
      <Toaster position="top-right" />
      
      {/* Hero Section */}
      <section className="gsap-hero bg-gradient-to-br from-seltronik-dark to-gray-900 text-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4">Hubungi Kami</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Konsultasikan kebutuhan infrastruktur lalu lintas Anda dengan tim ahli kami
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 md:py-12 -mt-6 md:-mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="gsap-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-seltronik-red text-2xl md:text-3xl mb-3 md:mb-4 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="font-bold text-base md:text-lg text-seltronik-dark dark:text-white mb-2">{info.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 font-medium text-sm md:text-base">{info.content}</p>
                {info.subcontent && (
                  <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-1">{info.subcontent}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="gsap-fade-up py-12 md:py-16 bg-gray-50 dark:bg-seltronik-dark">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="gsap-fade-up bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-seltronik-dark dark:text-white mb-6">
                Kirim Pesan
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm md:text-base">Nama Lengkap *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 border dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white text-sm md:text-base"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm md:text-base">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 border dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white text-sm md:text-base"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm md:text-base">No. Telepon *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 border dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white text-sm md:text-base"
                      placeholder="08123456789"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm md:text-base">Perusahaan</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white text-sm md:text-base"
                      placeholder="PT. Example"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm md:text-base">Subjek *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red dark:bg-gray-700 dark:text-white text-sm md:text-base"
                  >
                    <option value="">Pilih Subjek</option>
                    <option value="konsultasi">Konsultasi Produk</option>
                    <option value="penawaran">Permintaan Penawaran</option>
                    <option value="kerjasama">Kerjasama Bisnis</option>
                    <option value="support">Technical Support</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm md:text-base">Pesan *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border dark:border-gray-600 rounded-lg focus:outline-none focus:border-seltronik-red resize-none dark:bg-gray-700 dark:text-white text-sm md:text-base"
                    placeholder="Tuliskan pesan Anda di sini..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 md:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-seltronik-red text-white hover:bg-red-600 transform hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane /> Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="gsap-scale space-y-6">
              {/* Map */}
              <div ref={mapRef} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden h-64 md:h-80 lg:h-96">
                {shouldLoadMap ? (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.907095851549!2d107.59705831431712!3d-6.901674069459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e63e6e9cd6b9%3A0x2a9e24c5c1a5f63!2sJl.%20Panglima%20Polim%20Raya%2C%20Sukahaji%2C%20Kec.%20Babakan%20Ciparay%2C%20Kota%20Bandung%2C%20Jawa%20Barat%2040221!5e0!3m2!1sen!2sid!4v1647856231456!5m2!1sen!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Kantor Seltronik"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                    <div className="text-center">
                      <div className="animate-pulse mb-4">
                        <FaMapMarkerAlt className="text-4xl text-seltronik-red mx-auto" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Memuat peta...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Office Hours */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold font-heading text-seltronik-dark dark:text-white mb-6 flex items-center gap-2">
                  <FaClock className="text-seltronik-red" /> Jam Operasional
                </h3>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 md:py-3 border-b dark:border-gray-700 last:border-0"
                    >
                      <span className="font-medium text-gray-700 dark:text-gray-300 text-sm md:text-base">{schedule.day}</span>
                      <span className={`font-semibold text-sm md:text-base ${
                        schedule.time === 'Tutup' ? 'text-red-500' : 'text-seltronik-green'
                      }`}>
                        {schedule.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Social Media */}
                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t dark:border-gray-700">
                  <h4 className="font-bold text-gray-700 dark:text-white mb-4 text-sm md:text-base">Ikuti Kami</h4>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-seltronik-red hover:text-white transition-all duration-300"
                    >
                      <FaFacebookF className="text-sm md:text-base" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-seltronik-red hover:text-white transition-all duration-300"
                    >
                      <FaInstagram className="text-sm md:text-base" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-seltronik-red hover:text-white transition-all duration-300"
                    >
                      <FaLinkedinIn className="text-sm md:text-base" />
                    </a>
                    <a
                      href="https://wa.me/628112345678"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300"
                    >
                      <FaWhatsapp className="text-sm md:text-base" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="gsap-fade-up py-12 md:py-16 bg-gradient-to-r from-seltronik-red to-red-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-4">
            Butuh Respon Cepat?
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Hubungi kami langsung melalui WhatsApp untuk mendapatkan respon lebih cepat
          </p>
          <a
            href="https://wa.me/628112345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-seltronik-dark px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            <FaWhatsapp size={20} className="md:text-2xl" /> Chat WhatsApp Sekarang
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;