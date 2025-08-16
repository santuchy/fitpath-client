import React from "react";
import { Link } from "react-router";
import logo from "../../assets/fitpath-logo.png";

const Footer = () => {
  return (
    <footer className="bg-orange-50 text-gray-800">
      {/* top */}
      <div className="py-16 px-4 md:px-10 lg:px-20">
        <div className="max-w-11/12 mx-auto flex flex-col lg:flex-row justify-between items-start gap-12">
          {/* Logo + Tagline */}
          <div className="min-w-[180px]">
            <Link to="/" className="inline-flex items-center">
              <img src={logo} alt="FitPath Logo" className="w-[150px]" />
            </Link>
            <p className="mt-3 text-sm text-gray-600 max-w-xs">
              Transform your fitness journey with FitPath
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 text-sm w-full">
            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="uppercase text-[#f34e3a] font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/trainers" className="hover:text-[#f34e3a]">
                    All Trainers
                  </Link>
                </li>
                <li>
                  <Link to="/classes" className="hover:text-[#f34e3a]">
                    All Classes
                  </Link>
                </li>
                <li>
                  <Link to="/forum" className="hover:text-[#f34e3a]">
                    Community
                  </Link>
                </li>
                
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-3">
              <h3 className="uppercase text-[#f34e3a] font-semibold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" title="Coming soon" className="hover:text-[#f34e3a]">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" title="Coming soon" className="hover:text-[#f34e3a]">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Developer Contact */}
            <div className="space-y-3">
              <h3 className="uppercase text-[#f34e3a] font-semibold">Developers Contact</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.facebook.com/diprachowdhurydev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#f34e3a]"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/dipra-chowdhury/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#f34e3a]"
                  >
                    Linkedin
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/santuchy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#f34e3a]"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media (icons only: Facebook, LinkedIn, GitHub) */}
            <div className="space-y-3">
              <h3 className="uppercase text-[#f34e3a] font-semibold">Social Media</h3>
              <div className="flex space-x-3">
                {/* Facebook */}
                <a href="https://www.facebook.com/diprachowdhurydev" className="text-gray-600 hover:text-[#f34e3a]" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5">
                    <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/dipra-chowdhury/" className="text-gray-600 hover:text-[#f34e3a]" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0zM7.06 20.452H3.875V9h3.185v11.452zM5.468 7.433c-1.02 0-1.847-.828-1.847-1.848 0-1.02.827-1.847 1.847-1.847 1.02 0 1.848.827 1.848 1.847 0 1.02-.828 1.848-1.848 1.848zM20.452 20.452h-3.185v-5.569c0-1.329-.024-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.944v5.662H10.09V9h3.056v1.561h.043c.426-.806 1.47-1.654 3.027-1.654 3.236 0 4.236 2.132 4.236 4.907v6.638z"/>
                  </svg>
                </a>

                {/* GitHub */}
                <a href="https://github.com/santuchy" className="text-gray-600 hover:text-[#f34e3a]" aria-label="GitHub">
                  <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                    0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
                    1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
                    0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0
                    1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
                    0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38C13.71
                    14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="border-t border-gray-200">
        <div className="py-5 px-4 md:px-10 lg:px-20">
          <div className="max-w-11/12 mx-auto text-center text-sm text-gray-600">
            © 2025 FitPath BD. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
