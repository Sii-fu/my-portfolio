import React, { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

// Predefined nice positions for 5 buttons (corners + center)
const socialPositions = [
  { top: "30%", left: "30%" },    // top-left
  { top: "30%", left: "60%" },    // top-right
  { top: "60%", left: "30%" },    // bottom-left
  { top: "60%", left: "60%" },    // bottom-right
  { top: "40%", left: "40%" },    // center
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/sifatbinasad/", icon: <FaLinkedin />, label: "LinkedIn" },
  { href: "https://github.com/sii-fu", icon: <FaGithub />, label: "GitHub" },
  { href: "https://facebook.com/siiffu", icon: <FaFacebook />, label: "Facebook" },
//   { href: "https://twitter.com/your-profile", icon: <FaTwitter />, label: "Twitter" },
  { href: "https://instagram.com/sii_fu_", icon: <FaInstagram />, label: "Instagram" },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://formspree.io/f/manjgdpb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          message: form.message,
        }),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("There was an error sending your message. Please try again later.");
      }
    } catch {
      alert("There was an error sending your message. Please try again later.");
    }
  };

  return (
    <div className="relative flex flex-row items-center justify-center min-h-[600px] py-10 bg-[var(--color-6)] font-sans ">
      {/* Social buttons at fixed positions */}
      <div className="relative w-[350px] h-[350px] min-w-[300px] min-h-[300px] mr-10">
        {socialLinks.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn flex items-center gap-2 absolute"
            style={{ ...socialPositions[i], position: 'absolute', zIndex: 2, transition: 'all 0.5s cubic-bezier(.4,2,.3,1)' }}
          >
            {link.icon}
          </a>
        ))}
      </div>
      {/* Contact form */}
      <div className="w-full max-w-xl mx-20 bg-primary/70 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-dark p-8 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-[var(--color-0)] mb-4">Contact Me</h2>
        <p className="text-lg text-light mb-6 text-center">Have a question, project, or just want to say hi? Fill out the form below and I&apos;ll get back to you!</p>
        {submitted ? (
          <div className="text-xl text-[var(--color-0)] font-semibold py-8">Thank you for reaching out! 🚀</div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg bg-[var(--color-5)] text-[var(--color-0)] border border-[var(--color-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-0)] font-milker"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="px-4 py-3 rounded-lg bg-[var(--color-5)] text-[var(--color-0)] border border-[var(--color-4)] focus:outline-none focus:ring-2 focus:ring-[var(--color-0)] font-milker resize-none"
            />
            <button
              type="submit"
              className="mt-2 bg-[var(--color-0)] text-dark font-bold py-3 rounded-lg shadow-lg hover:bg-[var(--color-1)] transition-colors duration-200"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
