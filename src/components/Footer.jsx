import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#0A0A0A] text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-2">
            EduGate-Learnify
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            EduGate-Learnify is a modern learning platform offering interactive
            courses to boost your skills and career.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-400 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:underline text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="hover:underline text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:underline text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:underline text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-400 mb-3">
            Contact Us
          </h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Mail size={16} /> mh1351448@gmail.com
            </li>
            <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Phone size={16} /> 01013932585
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-400 mb-3">
            Follow Us
          </h3>
          <div className="flex gap-4 mt-2 text-gray-600 dark:text-gray-300">
            <a
              href="#"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400 py-4">
        © {new Date().getFullYear()} EduGate-Learnify.  All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
