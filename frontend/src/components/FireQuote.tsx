import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FireQuoteProps {
  text: string;
  delay?: number;
}

const FireQuote: React.FC<FireQuoteProps> = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeText, 50); // سرعت تایپ
      } else {
        setIsTyping(false);
      }
    };

    const startTimeout = setTimeout(() => {
      typeText();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [text, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <span className="text-white drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]">
        {displayedText}
        {isTyping && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-0.5 sm:w-1 h-4 sm:h-6 md:h-8 bg-red-500 ml-1 align-middle"
          />
        )}
      </span>
    </motion.div>
  );
};

const FireQuoteSection: React.FC = () => {
  const mainQuote = "بزرگ‌ترین دشمن آزادی، دولت‌سالاران و چپ‌گرایان هستند که با نقاب عدالت، مالکیت خصوصی را غارت می‌کنند و انسان را به بردگی جمعی می‌کشانند. هر که حقوق مالکیت فرد را تضعیف کند، دشمن شماره یک آزادی و انسانیت است.";

  const subQuotes = [
    "سوسیالیست‌ها و دولت‌پرستان، غارتگران واقعی حقوق انسانی‌اند — بزرگ‌ترین دزدان مالکیت و آزادی.",
    "هر ایدئولوژی چپ که مالکیت خصوصی را تهدید کند، نه عدالت، بلکه بردگی نوین می‌آورد.",
    "دشمن آزادی، نه دین است و نه سنت — دشمن واقعی، دولت بزرگ و چپ‌گرایانی هستند که ثمره دسترنج تو را می‌دزدند.",
    "تورم، مالیات ظالمانه و مصادره، ابزارهای چپ و دولت‌سالاران برای نابودی آزادی‌اند — و تاریخ قاضی بی‌رحم‌شان خواهد بود.",
    "آزادی واقعی با مالکیت مطلق زنده است — و هر که این مالکیت را هدف بگیرد، دشمن آشکار انسانیت است."
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-red-950 to-black">
      {/* Background Fire Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Fire particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 30}%`,
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [1, 0.8, 0],
              scale: [1, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Broken Chain SVG */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
          >
            {/* Broken Chain Links */}
            <g stroke="#ff4444" strokeWidth="8" fill="none" strokeLinecap="round">
              {/* Left broken chain */}
              <path
                d="M 100 150 Q 120 130, 140 150 Q 160 170, 140 190 Q 120 210, 100 190"
                opacity="0.6"
              />
              <path
                d="M 100 190 Q 120 210, 140 190 Q 160 170, 140 150"
                opacity="0.4"
                strokeDasharray="5,5"
              />
              
              {/* Right broken chain */}
              <path
                d="M 300 150 Q 280 130, 260 150 Q 240 170, 260 190 Q 280 210, 300 190"
                opacity="0.6"
              />
              <path
                d="M 300 190 Q 280 210, 260 190 Q 240 170, 260 150"
                opacity="0.4"
                strokeDasharray="5,5"
              />
            </g>
            
            {/* Fire effect around chain */}
            <g opacity="0.5">
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45) * (Math.PI / 180);
                const x = 200 + Math.cos(angle) * 100;
                const y = 200 + Math.sin(angle) * 100;
                return (
                  <motion.path
                    key={i}
                    d={`M ${x} ${y} L ${x + Math.cos(angle) * 20} ${y + Math.sin(angle) * 20} L ${x + Math.cos(angle + 0.3) * 15} ${y + Math.sin(angle + 0.3) * 15} Z`}
                    fill="#ff6600"
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                );
              })}
            </g>
          </svg>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Main Quote */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block mb-4 sm:mb-6"
            >
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">🔥</span>
            </motion.div>
            
            <div className="bg-gradient-to-r from-red-900/40 via-red-800/50 to-red-900/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border-2 border-red-600/50 shadow-[0_0_30px_rgba(255,0,0,0.5)] sm:shadow-[0_0_40px_rgba(255,0,0,0.6)]">
              <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold leading-relaxed sm:leading-relaxed text-white drop-shadow-[0_0_8px_rgba(255,0,0,0.8)] sm:drop-shadow-[0_0_10px_rgba(255,0,0,0.9)] px-2 sm:px-0">
                <FireQuote text={mainQuote} delay={500} />
              </blockquote>
            </div>
          </div>

          {/* Sub Quotes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16">
            {subQuotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.5 }}
                className="bg-gradient-to-br from-red-950/60 to-red-900/40 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 border border-red-700/50 shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] transition-all duration-300"
              >
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-red-100 leading-relaxed drop-shadow-[0_0_5px_rgba(255,0,0,0.7)]">
                  {quote}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Fire Emoji Decoration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4 }}
            className="mt-12 sm:mt-16 flex justify-center gap-4 sm:gap-6"
          >
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                className="text-3xl sm:text-4xl md:text-5xl"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                🔥
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
    </section>
  );
};

export default FireQuoteSection;

