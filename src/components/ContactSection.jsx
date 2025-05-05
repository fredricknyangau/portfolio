import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.message.trim().length < 10) {
      setStatus("Message must be at least 10 characters long.");
      return;
    }

    if (
      !process.env.REACT_APP_EMAILJS_SERVICE_ID ||
      !process.env.REACT_APP_EMAILJS_TEMPLATE_ID ||
      !process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    ) {
      setStatus("Email service is not configured properly.");
      return;
    }

    setIsSending(true);
    setStatus("Sending...");

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setStatus("Failed to send message.");
      })
      .finally(() => setIsSending(false));
  };

  return (
    <motion.section
      id="contact"
      className="contact"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container max-w-xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
        <p className="mb-6">
          Please contact me directly via{" "}
          <a
            href="https://wa.me/message/HC3E6I4WF6QVC1"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline"
          >
            WhatsApp
          </a>{" "}
          or use the form below:
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              rows={5}
            />
          </div>
          <button
            type="submit"
            disabled={isSending}
            className={`w-full py-2 px-4 rounded text-white ${
              isSending ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && (
          <p
            className={`status-message ${
              status.includes("successfully")
                ? "success"
                : status === "Sending..."
                ? "sending"
                : "error"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </motion.section>
  );
};

export default ContactSection;
