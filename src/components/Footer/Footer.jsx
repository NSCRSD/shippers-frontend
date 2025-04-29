import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import { images } from '../../constants';

const Footer = () => {
  return (
    <footer className="bg-[#010025] text-white px-6 py-10 md:px-16">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:justify-between gap-10 mb-10">
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
            <div className="w-20 h-20">
              <img src={images.shippersLogo} alt="logo" className="w-full h-full" />
            </div>
        </div>

        {/* Navigation + Contact */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-10 text-sm">
          {/* Company Info */}
          <div>
            <h4 className="font-bold text-lg mb-3">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/home">About Us</a></li>
              <li><a href="/home">Services</a></li>
              <li><a href="/home">FAQ</a></li>
              <li><a href="/home">Testimonials</a></li>
              <li><a href="/home">Careers</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-3">Address</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <MdEmail className="text-lg" />
                <span>Info@X-Freight.Com</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-lg" />
                <span>833.HAVETWD (428-3893)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-600 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4">
        <p className="text-center">{`@ ${new Date().getFullYear()} Nigerian Shippers' Council. All rights reserved.`}</p>
        <div className="flex gap-4 text-lg">
          <FaFacebookF className="hover:text-white cursor-pointer" />
          <FaInstagram className="hover:text-white cursor-pointer" />
          <FaLinkedinIn className="hover:text-white cursor-pointer" />
          <FaTwitter className="hover:text-white cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}

export default Footer
