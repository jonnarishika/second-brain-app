'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F5F3EF]">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements with Parallax */}
        <motion.div
          style={{ y: y2 }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#E5E1D8] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#D4CFC4] rounded-full blur-3xl" />
        </motion.div>

        <motion.div
          style={{ y: y1, opacity }}
          className="relative z-10 text-center px-8 max-w-5xl"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-8"
          >
            <div className="px-4 py-2 bg-white border border-[#E5E1D8] rounded-full text-[13px] text-[#6B6B6B] font-light">
              AI-Powered Knowledge Management
            </div>
          </motion.div>

          {/* Main Heading with Stagger */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[72px] font-normal text-[#1A1A1A] tracking-tight leading-[1.1] mb-6"
          >
            Your Second Brain
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[20px] text-[#6B6B6B] font-light max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Capture, organize, and intelligently surface your knowledge with AI-powered summarization and auto-tagging
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-4 justify-center"
          >
            <Link
              href="/add"
              className="group px-8 py-4 bg-[#1A1A1A] text-[#FDFCFA] text-[15px] font-normal rounded-full hover:bg-[#2D2D2D] transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Get started
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link
              href="/dashboards"
              className="px-8 py-4 bg-white border border-[#E5E1D8] text-[#1A1A1A] text-[15px] font-normal rounded-full hover:border-[#1A1A1A] transition-all duration-300"
            >
              View your thoughts
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[13px] text-[#A8A8A8] font-light">Scroll to explore</span>
            <svg className="w-6 h-6 text-[#A8A8A8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section with Scroll Animations */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-[48px] font-normal text-[#1A1A1A] mb-4">
              Built for thoughtful minds
            </h2>
            <p className="text-[17px] text-[#6B6B6B] font-light max-w-2xl mx-auto">
              Every feature designed to help you think clearly and capture insights effortlessly
            </p>
          </motion.div>

          {/* Feature Cards with Stagger */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '',
                title: 'AI Summarization',
                description: 'Automatically generate concise summaries of your notes using state-of-the-art language models',
                delay: 0.2
              },
              {
                icon: '',
                title: 'Smart Tagging',
                description: 'Intelligent auto-tagging organizes your knowledge without manual categorization',
                delay: 0.4
              },
              {
                icon: '',
                title: 'Semantic Search',
                description: 'Find exactly what you need with relevance-scored search across all your knowledge',
                delay: 0.6
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white border border-[#E5E1D8] rounded-[24px] p-8 hover:border-[#D4CFC4] hover:shadow-lg transition-all duration-300"
              >
                <div className="text-[48px] mb-4">{feature.icon}</div>
                <h3 className="text-[20px] font-normal text-[#1A1A1A] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[15px] text-[#6B6B6B] font-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Counter Animation */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { value: '100%', label: 'Open Source' },
              { value: 'AI', label: 'Powered' },
              { value: '∞', label: 'Possibilities' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-[64px] font-normal text-[#1A1A1A] mb-2">
                  {stat.value}
                </div>
                <div className="text-[15px] text-[#6B6B6B] font-light tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-[56px] font-normal text-[#1A1A1A] mb-6 leading-tight">
            Start building your<br />second brain today
          </h2>
          <p className="text-[17px] text-[#6B6B6B] font-light mb-10">
            No ads. No tracking. Just genuinely helpful AI.
          </p>
          <Link
            href="/add"
            className="inline-block px-10 py-5 bg-[#1A1A1A] text-[#FDFCFA] text-[16px] font-normal rounded-full hover:bg-[#2D2D2D] transition-all duration-300 hover:scale-105"
          >
            Begin capturing thoughts
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E1D8] py-12 px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-[14px] text-[#6B6B6B] font-light">
            © 2026 Second Brain. Built with Next.js & AI.
          </div>
          <div className="flex gap-8">
            <Link href="/docs" className="text-[14px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
              Documentation
            </Link>
            <Link href="/dashboards" className="text-[14px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
              Dashboard
            </Link>
            <Link href="/developer" className="text-[14px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
              Developer API
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}