import React, { Component } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { styles } from '../styles';
import { PhoneCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: { name: '', email: '', message: '' },
      loading: false,
      sent: false,
    };
    this.formRef = React.createRef();
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      form: { ...prevState.form, [name]: value }
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const { form } = this.state;

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      'template_7rkkl05',
      {
        from_name: form.name,
        reply_to: form.email,
        to_email: 'a6833351@gmail.com',
        message_html: form.message,
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(
      () => {
        this.setState({ loading: false, sent: true, form: { name: '', email: '', message: '' } });
        setTimeout(() => this.setState({ sent: false }), 5000);
      },
      (error) => {
        this.setState({ loading: false });
        console.error('EmailJS error:', error);
        alert('Something went wrong. Please try again.');
      }
    );
  };

  render() {
    const { form, loading, sent } = this.state;

    return (
      <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">

        {/* Form */}
        <motion.div
          variants={slideIn('left', 'tween', 0.2, 1)}
          className="flex-[0.75] rounded-2xl relative overflow-hidden"
        >
          {/* Glass card */}
          <div className="relative p-8 rounded-2xl bg-[rgba(10,10,40,0.7)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] shadow-2xl shadow-blue-900/40">

            {/* Glow accent */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            <p className="text-purple-300 text-sm font-medium tracking-widest uppercase mb-1">
              Get in touch
            </p>
            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8">
              Contact.
            </h3>

            <form ref={this.formRef} onSubmit={this.handleSubmit} className="flex flex-col gap-5">

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={this.handleChange}
                  required
                  placeholder="What's your name?"
                  className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white placeholder:text-purple-300/40 text-sm outline-none focus:border-purple-500 focus:bg-[rgba(255,255,255,0.08)] transition-all duration-200"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={this.handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white placeholder:text-purple-300/40 text-sm outline-none focus:border-purple-500 focus:bg-[rgba(255,255,255,0.08)] transition-all duration-200"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  rows={6}
                  name="message"
                  value={form.message}
                  onChange={this.handleChange}
                  required
                  placeholder="What would you like to say?"
                  className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white placeholder:text-purple-300/40 text-sm outline-none focus:border-purple-500 focus:bg-[rgba(255,255,255,0.08)] transition-all duration-200 resize-none"
                />
              </div>

              {/* Success message */}
              {sent && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Message sent! I'll get back to you soon.
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-700/30 transition-all duration-200 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending...
                  </span>
                ) : "Send Message"}
              </button>

            </form>
          </div>
        </motion.div>

        {/* Phone 3D */}
        <motion.div
          variants={slideIn('right', 'tween', 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] relative flex items-center justify-center"
        >
          <PhoneCanvas />
        </motion.div>

      </div>
    );
  }
}

export default SectionWrapper(Contact, 'contact');
