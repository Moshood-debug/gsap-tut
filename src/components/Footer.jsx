"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Footer = () => {
  const footerRef = useRef();

  console.log("Footer rendereds", footerRef.current);

  useGSAP(() => {
    gsap.from(".footer-item", {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      className="radial-gradient text-white px-6 py-12 mt-20"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="footer-item">
          <h3 className="text-lg font-bold mb-2">About Us</h3>
          <p className="text-sm text-gray-300">
            We mix cocktails, vibes, and unforgettable moments. Join us at the
            bar.
          </p>
        </div>
        <div className="footer-item">
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#home" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#menu" className="hover:text-white">
                Menu
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-item">
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-xl">
            <a href="#" className="hover:text-pink-500">
              🐦
            </a>
            <a href="#" className="hover:text-blue-500">
              📘
            </a>
            <a href="#" className="hover:text-purple-500">
              📸
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Martini Lounge. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
