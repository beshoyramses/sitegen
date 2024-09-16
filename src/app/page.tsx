"use client";

import Image from "next/image";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Page = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });
  const controls = useAnimation();

  if (inView) {
    controls.start({ opacity: 1, y: 0 });
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Floating Background Textures */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-[30px] h-[30px] bg-opacity-50 rounded-full ${
            i % 2 === 0 ? "bg-blue-500" : "bg-green-500"
          }`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            borderRadius: i % 3 === 0 ? "50%" : "30%",
          }}
          animate={{
            y: [0, Math.random() * 50 - 25, 0],
            x: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.header
        className="flex items-center justify-between px-[50px] py-5 relative max-[640px]:px-[10px]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <a href="#" className="logo flex items-center gap-5 text-xl">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          SiteGen
        </a>
        <ul className="flex gap-7 max-[800px]:hidden">
          <a href="#" className="nav-link-color">Home</a>
          <a href="#services" className="nav-link-color">Services</a>
          <a href="#contact" className="nav-link-color">Contact</a>
          <a href="/sign-in" className="nav-link-color">sign in</a>
        </ul>
        {/* Mobile Nav */}
        <nav
          className={`${
            isMobileMenuOpen ? "" : "hidden"
          } absolute top-[70px] right-[15px] border-opacity-70 p-5 opacity-background`}
        >
          <motion.ul
            className="flex gap-7 flex-col text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <a href="#" className="nav-link-color">Home</a>
            <a href="#services" className="nav-link-color">Services</a>
            <a href="#contact" className="nav-link-color">Contact</a>
            <a href="/sign-in" className="nav-link-color">sign in</a>
          </motion.ul>
        </nav>

        <button onClick={toggleMobileMenu} className="hidden max-[800px]:block">
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </motion.header>

      <div className="landing pt-[10px] flex flex-col md:flex-row px-4 md:px-[100px] items-center justify-between">
        <motion.div
          className="left text-center md:text-left mb-6 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <h1 className="text-[40px] md:text-[60px] font-bold leading-tight">
            Build Your Awesome <br /> Website
          </h1>
          <p className="text-gray-400 mt-6 mb-6 text-base md:text-lg">
            Enver studio is a digital studio that offers several services such
            as UI/UX Design to <br /> developers, we will provide the best
            service for those of you who use our services.
          </p>
          <motion.button
            className="bg-[#5454D4] text-white px-6 py-3 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Our Services
          </motion.button>
        </motion.div>
        <motion.div
          className="right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <Image src={"/man.png"} alt="landing" width={550} height={750} />
        </motion.div>
      </div>

      <div className="services mt-[150px] mb-[100px]" ref={ref} id="services">
        <h1 className="text-center text-3xl font-bold">The Service We Provide For You</h1>
        <div className="service-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 px-4 md:px-[100px]">
          <motion.div
            className="service-card bg-gray-800 p-6 rounded-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 1.5 }}
          >
            <Image src="/icon3.png" alt="service1" width={60} height={60} />
            <h3 className="text-xl font-semibold mt-4">Web Development</h3>
            <p className="text-gray-400 mt-2">
              We build responsive and functional websites tailored to your needs.
            </p>
          </motion.div>
          <motion.div
            className="service-card bg-gray-800 p-6 rounded-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 1.5 }}
          >
            <Image src="/icon3.png" alt="service2" width={60} height={60} />
            <h3 className="text-xl font-semibold mt-4">UI/UX Design</h3>
            <p className="text-gray-400 mt-2">
              Our design team ensures a great user experience with stunning visuals.
            </p>
          </motion.div>
          <motion.div
            className="service-card bg-gray-800 p-6 rounded-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 1.5 }}
          >
            <Image src="/icon3.png" alt="service3" width={60} height={60} />
            <h3 className="text-xl font-semibold mt-4">SEO Optimization</h3>
            <p className="text-gray-400 mt-2">
              We help improve your site's visibility on search engines.
            </p>
          </motion.div>
          <motion.div
            className="service-card bg-gray-800 p-6 rounded-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 1.5 }}
          >
            <Image src="/icon3.png" alt="service4" width={60} height={60} />
            <h3 className="text-xl font-semibold mt-4">Digital Marketing</h3>
            <p className="text-gray-400 mt-2">
              We create marketing strategies to enhance your online presence.
            </p>
          </motion.div>
          <motion.div
            className="service-card bg-gray-800 p-6 rounded-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 1.5 }}
          >
            <Image src="/icon3.png" alt="service5" width={60} height={60} />
            <h3 className="text-xl font-semibold mt-4">E-commerce Solutions</h3>
            <p className="text-gray-400 mt-2">
              We provide comprehensive e-commerce solutions for your business.
            </p>
          </motion.div>
          <motion.div
            className="service-card bg-gray-800 p-6 rounded-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 1.5 }}
          >
            <Image src="/icon3.png" alt="service6" width={60} height={60} />
            <h3 className="text-xl font-semibold mt-4">Content Creation</h3>
            <p className="text-gray-400 mt-2">
              Our team creates engaging content to attract and retain customers.
            </p>
          </motion.div>
        </div>
      </div>

      <h1 className="text-center text-3xl font-bold">Contact Us</h1>

      <div className="contact-us mt-[150px] mb-[100px]" id="contact">
        <motion.div
          className="contact-details mt-10 px-4 md:px-[100px] flex justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ duration: 1.5 }}
        >
          <div className="flex flex-col bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-400 mb-4">
              We would love to hear from you! Reach out through any of the following channels:
            </p>
            <div className="grid grid-cols-1 gap-4">
              <a href="mailto:info@example.com" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <Image src="/icon3.png" alt="Email" width={24} height={24} />
                <span>beshoyramses264@gmail.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <Image src="/icon3.png" alt="Phone" width={24} height={24} />
                <span>+201289465301</span>
              </a>
              <a href="https://www.linkedin.com/in/beshoy-ramses-b07a73228/" className="flex items-center gap-2 text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer">
                <Image src="/icon3.png" alt="LinkedIn" width={24} height={24} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Plans and Prices Section */}
      <div className="plans-and-prices mt-[150px] mb-[100px]" id="plans">
        <h1 className="text-center text-3xl font-bold">Our Plans and Prices (Will be Applied in the Future)</h1>
        <div className="plans grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 px-4 md:px-[100px]">
          <motion.div
            className="plan bg-gray-800 p-6 rounded-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 1.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Basic Plan</h3>
            <p className="text-gray-400 mb-4">Perfect for individuals or small businesses looking to establish an online presence.</p>
            <ul className="text-gray-400 mb-4">
              <li>10 Pages</li>
              <li>5GB Storage</li>
              <li>1 Domain</li>
              <li>Email Support</li>
            </ul>
            <p className="text-4xl font-bold mb-4">$29/month</p>
            <button className="bg-[#5454D4] text-white px-6 py-3 rounded">
              Get Started
            </button>
          </motion.div>
          <motion.div
            className="plan bg-gray-800 p-6 rounded-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 1.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Professional Plan</h3>
            <p className="text-gray-400 mb-4">Ideal for growing businesses that need additional features and support.</p>
            <ul className="text-gray-400 mb-4">
              <li>50 Pages</li>
              <li>20GB Storage</li>
              <li>5 Domains</li>
              <li>24/7 Support</li>
              <li>SEO Optimization</li>
            </ul>
            <p className="text-4xl font-bold mb-4">$59/month</p>
            <button className="bg-[#5454D4] text-white px-6 py-3 rounded">
              Get Started
            </button>
          </motion.div>
          <motion.div
            className="plan bg-gray-800 p-6 rounded-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 1.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Enterprise Plan</h3>
            <p className="text-gray-400 mb-4">For large organizations needing advanced features and custom solutions.</p>
            <ul className="text-gray-400 mb-4">
              <li>Unlimited Pages</li>
              <li>100GB Storage</li>
              <li>Unlimited Domains</li>
              <li>Priority Support</li>
              <li>Custom Integrations</li>
              <li>Dedicated Account Manager</li>
            </ul>
            <p className="text-4xl font-bold mb-4">$99/month</p>
            <button className="bg-[#5454D4] text-white px-6 py-3 rounded">
              Get Started
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Page;
