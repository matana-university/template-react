"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart, CheckCircle, AlertCircle, Loader } from "lucide-react";
import type { FormData, Notification } from "@/lib/types";
import {
  EMAIL_REGEX,
  WHATSAPP_MIN_DIGITS,
  WHATSAPP_MAX_DIGITS,
} from "@/lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function HeroSection() {
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    email: "",
    whatsapp: "",
    kota: "",
    pekerjaan: "",
    institusi: "",
  });

  const [notification, setNotification] = useState<Notification>({
    type: null,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validasi form
  const validateForm = (): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!formData.nama.trim()) {
      errors.push("Nama lengkap harus diisi");
    }

    if (!formData.email.trim()) {
      errors.push("Email harus diisi");
    } else if (!EMAIL_REGEX.test(formData.email)) {
      errors.push("Format email tidak valid");
    }
    if (!formData.whatsapp.trim()) {
      errors.push("Nomor WhatsApp harus diisi");
    } else {
      const cleaned = formData.whatsapp.replace(/[\s\-+]/g, "");
      if (cleaned.length < WHATSAPP_MIN_DIGITS || cleaned.length > WHATSAPP_MAX_DIGITS) {
        errors.push(`Format nomor WhatsApp tidak valid (harus ${WHATSAPP_MIN_DIGITS}-${WHATSAPP_MAX_DIGITS} digit)`);
      }
    }

    if (!formData.kota.trim()) {
      errors.push("Kota domisili harus diisi");
    }

    if (!formData.pekerjaan.trim()) {
      errors.push("Pekerjaan harus diisi");
    }

    if (!formData.institusi.trim()) {
      errors.push("Institusi/Perusahaan harus diisi");
    }

    return { valid: errors.length === 0, errors };
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi form
    const { valid, errors } = validateForm();

    if (!valid) {
      setNotification({
        type: "error",
        message: errors.join(", "),
      });
      return;
    }

    setIsSubmitting(true);
    setNotification({ type: "loading", message: "Mengirim data..." });

    try {
      // Google Apps Script URL - terhubung langsung ke Google Sheets
      const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

      if (!GOOGLE_SCRIPT_URL) {
        throw new Error("Server configuration error");
      }

      // Submit ke Google Sheets via Apps Script
      const formDataParams = new URLSearchParams();
      formDataParams.append("nama", formData.nama);
      formDataParams.append("email", formData.email);
      formDataParams.append("whatsapp", formData.whatsapp);
      formDataParams.append("kota", formData.kota);
      formDataParams.append("pekerjaan", formData.pekerjaan);
      formDataParams.append("institusi", formData.institusi);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formDataParams,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const result = await response.json();

      if (result.success) {
        setNotification({
          type: "success",
          message:
            "Terima kasih! Data Anda telah berhasil dikirim. Kami akan segera menghubungi Anda.",
        });

        // Reset form
        setFormData({
          nama: "",
          email: "",
          whatsapp: "",
          kota: "",
          pekerjaan: "",
          institusi: "",
        });

        // Hide notification setelah 5 detik
        setTimeout(() => {
          setNotification({ type: null, message: "" });
        }, 5000);
      } else {
        setNotification({
          type: "error",
          message:
            result.message ||
            "Terjadi kesalahan saat mengirim data. Silakan coba lagi.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setNotification({
        type: "error",
        message: "Gagal terhubung ke server. Periksa koneksi internet Anda.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Format WhatsApp dengan separator
    if (e.target.name === "whatsapp") {
      // Hanya terima angka
      value = value.replace(/\D/g, "");

      // Format: +62 812-3456-7890
      if (value.length > 0) {
        if (!value.startsWith("62") && !value.startsWith("0")) {
          // Jika tidak dimulai dengan 62 atau 0, tambahkan 62
          if (value.startsWith("+")) {
            value = value.slice(1);
          }
        }

        // Format dengan separator
        if (value.length <= 2) {
          value = "+62 " + value;
        } else if (value.length <= 5) {
          value = "+62 " + value.slice(2) + " " + value.slice(2);
        } else if (value.length <= 8) {
          value = "+62 " + value.slice(2, 5) + "-" + value.slice(5);
        } else {
          value =
            "+62 " +
            value.slice(2, 5) +
            "-" +
            value.slice(5, 8) +
            "-" +
            value.slice(8, 12);
        }
      }
    }

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };
  const testimonials = [
    {
      text: "Matana University memberikan pengalaman belajar yang luar biasa. Dosen berkualitas dan fasilitas lengkap membuat saya berkembang pesat.",
      stars: 5,
      position: "top-12 -left-20",
    },
    {
      text: "Program-program di Matana sangat relevan dengan dunia industri. Saya sudah siap bekerja sebelum lulus.",
      stars: 5,
      position: "top-56 -right-16",
    },
    {
      text: "Lingkungan belajar yang mendukung dan komunitas yang solid. Matana bukan hanya tempat belajar, tapi keluarga besar.",
      stars: 5,
      position: "bottom-12 left-0",
    },
  ];

  return (
    <section className="min-h-screen bg-white pt-32 pb-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content & Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl lg:text-6xl font-bold text-blue-600 leading-tight">
                Wujudkan Masa Depan Cemerlang Bersama Matana University
              </h1>
            </motion.div>{" "}
            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Daftar sekarang dan jadilah bagian dari komunitas mahasiswa Matana University. Kami akan segera menghubungi Anda untuk informasi lebih lanjut tentang program pendidikan kami.
            </motion.p>
            {/* Notification */}
            {notification.type && (
              <motion.div
                variants={itemVariants}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-2xl flex items-start gap-3 ${
                  notification.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : notification.type === "error"
                    ? "bg-red-50 border border-red-200"
                    : "bg-blue-50 border border-blue-200"
                }`}
              >
                {notification.type === "success" && (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                )}
                {notification.type === "error" && (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                {notification.type === "loading" && (
                  <Loader className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5 animate-spin" />
                )}
                <p
                  className={`text-sm font-medium ${
                    notification.type === "success"
                      ? "text-green-800"
                      : notification.type === "error"
                      ? "text-red-800"
                      : "text-blue-800"
                  }`}
                >
                  {notification.message}
                </p>
              </motion.div>
            )}
            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              variants={containerVariants}
              className="space-y-4"
            >
              <motion.div variants={itemVariants}>
                <input
                  type="text"
                  name="nama"
                  placeholder="Nama Lengkap"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-black placeholder-gray-500"
                />
              </motion.div>{" "}
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-black placeholder-gray-500"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <input
                    type="text"
                    name="whatsapp"
                    placeholder="WhatsApp (62 812-3456-7890)"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    maxLength={20}
                    inputMode="numeric"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-black placeholder-gray-500"
                  />
                </motion.div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <input
                    type="text"
                    name="kota"
                    placeholder="Kota Domisili"
                    value={formData.kota}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-black placeholder-gray-500"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <input
                    type="text"
                    name="pekerjaan"
                    placeholder="Pekerjaan"
                    value={formData.pekerjaan}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-black placeholder-gray-500"
                  />
                </motion.div>
              </div>
              <motion.div variants={itemVariants}>
                <input
                  type="text"
                  name="institusi"
                  placeholder="Nama Institusi/Perusahaan"
                  value={formData.institusi}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-black placeholder-gray-500"
                />
              </motion.div>{" "}
              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 text-white font-semibold rounded-2xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-400 hover:bg-orange-500 hover:shadow-xl transform hover:scale-105"
                }`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Submit
                  </>
                )}
              </motion.button>
            </motion.form>
          </motion.div>{" "}
          {/* Right Column - Hero Image & Testimonials */}
          <div className="relative h-full min-h-screen flex items-center justify-center pt-8 pb-8">
            {/* Orange Blob Background */}
            <motion.div
              className="absolute w-80 h-80 bg-orange-400 rounded-full opacity-40 blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, 30, 0] }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            />{" "}
            {/* Hero Image */}
            <motion.div
              className="relative z-10"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <img
                src="/asset2-removebg-preview.png"
                alt="Professional team"
                className="w-full max-w-2xl h-auto object-contain"
              />

              {/* Decorative Heart - Bottom Right */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center shadow-lg z-20"
                animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart className="w-8 h-8 text-white fill-white" />
              </motion.div>

              {/* Decorative Heart - Top Right */}
              <motion.div
                className="absolute -top-8 -right-8 w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center shadow-lg z-20"
                animate={{ scale: [1, 1.2, 1], rotate: [0, -20, 0] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.5,
                }}
              >
                <Heart className="w-6 h-6 text-white fill-white" />
              </motion.div>
            </motion.div>{" "}
            {/* Floating Testimonials */}
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`absolute ${testimonial.position} w-72 bg-white rounded-2xl p-4 shadow-xl border border-gray-100`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                }}
              >
                <div className="flex gap-1 mb-2">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        delay: i * 0.1,
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-gray-700 text-xs leading-relaxed">
                  {testimonial.text}
                </p>
                <motion.div
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Heart className="w-4 h-4 text-white fill-white" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
