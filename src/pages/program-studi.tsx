"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon, BookOpenIcon, Users, Award, Calendar } from "lucide-react";

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

const programData = {
  overview: {
    title: "Penerimaan Mahasiswa Baru",
    subtitle: "Tahun Akademik 2024-2025",
    description:
      "Matana University dengan bangga membuka penerimaan mahasiswa baru untuk berbagai program pendidikan. Bergabunglah dengan ribuan alumni kami yang telah sukses di industri. Kami menawarkan lingkungan belajar yang inovatif, dosen berpengalaman, dan fasilitas modern untuk mendukung perjalanan akademik Anda.",
    image: "/matana-logo-removebg-preview.png",
  },
  curriculum: [
    {
      semester: "Program Sarjana (S1)",
      courses: [
        {
          code: "FT",
          name: "Teknik Informatika",
          credits: 4,
          description: "Program unggulan dengan fokus pada software development dan AI",
        },
        {
          code: "BS",
          name: "Bisnis Manajemen",
          credits: 4,
          description: "Mempersiapkan pemimpin bisnis untuk era digital",
        },
        {
          code: "KM",
          name: "Komunikasi & Media",
          credits: 4,
          description: "Program kreatif untuk profesional komunikasi modern",
        },
      ],
    },
    {
      semester: "Program Pascasarjana (S2)",
      courses: [
        {
          code: "MM",
          name: "Magister Manajemen",
          credits: 3,
          description: "Program untuk profesional yang ingin mengembangkan karir",
        },
        {
          code: "MSI",
          name: "Magister Sistem Informasi",
          credits: 3,
          description: "Khusus untuk IT professionals yang ingin level up",
        },
        {
          code: "MKB",
          name: "Magister Keamanan Bisnis",
          credits: 3,
          description: "Program spesialisasi untuk menjaga aset digital perusahaan",
        },
      ],
    },
  ],
  requirements: [
    {
      title: "Persyaratan Umum",
      items: [
        "Warga Negara Indonesia atau Internasional",
        "Memiliki ijazah pendidikan sebelumnya yang diakui",
        "Lulus seleksi akademik dan wawancara",
        "Surat rekomendasi dari guru/dosen",
        "Portofolio atau prestasi akademik yang menonjol",
        "Kesiapan untuk belajar dalam lingkungan multikultural",
      ],
    },
    {
      title: "Keuntungan Menjadi Mahasiswa Matana",
      items: [
        "Akses ke perpustakaan digital dengan ribuan resource",
        "Bimbingan akademik dari dosen berpengalaman",
        "Program magang di perusahaan terkemuka",
        "Jaringan alumni yang kuat dan aktif",
        "Beasiswa penuh dan parsial tersedia",
        "Fasilitas kampus modern dengan teknologi terkini",
      ],
    },
  ],
  faq: [
    {
      question: "Kapan pendaftaran dibuka dan ditutup?",
      answer:
        "Pendaftaran dibuka secara bergelombang mulai dari Januari hingga Agustus. Setiap gelombang memiliki waktu yang berbeda. Hubungi admission office kami untuk jadwal lengkap dan cara mendaftar.",
    },
    {
      question: "Berapa biaya pendaftaran?",
      answer:
        "Biaya pendaftaran berkisar dari Rp 250.000 hingga Rp 500.000 tergantung program pilihan. Biaya ini tidak termasuk dalam SPP dan dapat dikembalikan jika diterima.",
    },
    {
      question: "Apakah ada beasiswa yang tersedia untuk siswa berprestasi?",
      answer:
        "Ya, kami menawarkan beasiswa penuh (100%), setengah (50%), dan seperempat (25%) untuk siswa berprestasi akademik tinggi. Ada juga beasiswa prestasi non-akademik seperti olahraga dan seni.",
    },
    {
      question: "Bagaimana proses seleksi masuk?",
      answer:
        "Proses seleksi meliputi: review dokumen akademik, tes tertulis (untuk program tertentu), wawancara dengan panel penguji, dan pengumuman hasil seleksi. Total waktu proses sekitar 2-3 minggu.",
    },
    {
      question: "Apakah ada program transfer untuk siswa dari universitas lain?",
      answer:
        "Ya, kami menerima transfer siswa dari universitas lain. Proses dan persyaratan sama seperti penerimaan regular, dengan penilaian kredit yang telah diambil sebelumnya.",
    },
    {
      question: "Bagaimana cara mendapatkan informasi lebih lanjut?",
      answer:
        "Anda dapat menghubungi Admission Office kami melalui WhatsApp, email, atau mengunjungi open house yang kami selenggarakan setiap bulan. Tim kami siap membantu menjawab semua pertanyaan Anda.",
    },
  ],
};

export default function ProgramStudi() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        className="pt-28 pb-12 px-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              variants={itemVariants}
            >
              {programData.overview.title}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-blue-100 mb-6"
              variants={itemVariants}
            >
              {programData.overview.subtitle}
            </motion.p>
            <motion.p
              className="text-lg text-blue-100 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              {programData.overview.description}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Tabs Section */}
          <div className="w-full mb-12">
            {/* Tab Buttons */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
              <button
                onClick={() => setSelectedTab(0)}
                className={`px-4 py-2 font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                  selectedTab === 0
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <BookOpenIcon size={20} />
                Program Studi
              </button>
              <button
                onClick={() => setSelectedTab(1)}
                className={`px-4 py-2 font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                  selectedTab === 1
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Award size={20} />
                Informasi
              </button>
              <button
                onClick={() => setSelectedTab(2)}
                className={`px-4 py-2 font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                  selectedTab === 2
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Users size={20} />
                FAQ
              </button>
            </div>

            {/* Kurikulum Tab */}
            {selectedTab === 0 && (
              <div className="space-y-8">
                {programData.curriculum.map((semester, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="bg-blue-50 px-6 py-4 border-l-4 border-blue-600">
                      <h3 className="text-xl font-bold text-gray-900">
                        {semester.semester}
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {semester.courses.map((course, courseIdx) => (
                          <motion.div
                            key={courseIdx}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
                            whileHover={{ y: -5 }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-gray-900">
                                {course.code}
                              </h4>
                              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                                Tahun {course.credits}
                              </span>
                            </div>
                            <h5 className="font-semibold text-gray-800 mb-2">
                              {course.name}
                            </h5>
                            <p className="text-sm text-gray-600">
                              {course.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Persyaratan Tab */}
            {selectedTab === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {programData.requirements.map((requirement, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className="bg-white rounded-lg shadow-md p-8"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      {idx === 0 ? <Calendar size={28} /> : <Award size={28} />}
                      {requirement.title}
                    </h3>
                    <ul className="space-y-4">
                      {requirement.items.map((item, itemIdx) => (
                        <motion.li
                          key={itemIdx}
                          className="flex gap-3 items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (idx * 6 + itemIdx) * 0.05 }}
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                            ✓
                          </span>
                          <span className="text-gray-700">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            )}

            {/* FAQ Tab */}
            {selectedTab === 2 && (
              <div className="space-y-4">
                {programData.faq.map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Disclosure>
                      <DisclosureButton className="w-full flex justify-between items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group">
                        <h4 className="text-left font-semibold text-gray-900 text-lg">
                          {faq.question}
                        </h4>
                        <ChevronDownIcon
                          className="w-6 h-6 text-gray-600 transition-transform group-data-[open]:rotate-180"
                          aria-hidden="true"
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="px-6 py-4 text-gray-700 bg-gray-50 rounded-b-lg">
                        {faq.answer}
                      </DisclosurePanel>
                    </Disclosure>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* CTA Section */}
          <motion.section
            className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-12 text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Jangan Lewatkan Kesempatan Emas Ini!
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Daftarkan diri Anda sekarang juga. Matana University menanti untuk menjadi bagian dari perjalanan kesuksesan Anda. Hubungi kami dan dapatkan informasi lengkap tentang program yang sesuai dengan impian Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Daftar Sekarang
              </motion.button>
              <motion.button
                className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hubungi Kami
              </motion.button>
            </div>
          </motion.section>
        </div>
      </section>
    </div>
  );
}
