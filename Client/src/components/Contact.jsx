import Reveal from "./Reveal";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../validation/ContactSchema";

import {
  Phone,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";

import { FaEnvelope } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";

const Contact = () => {

    const [status, setStatus] = useState("idle"); // idle | sending | sent
    const [serverError, setServerError] = useState("");

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(contactSchema),
      defaultValues: {
        name: "",
        email: "",
        message: "",
      },
    });


    const onSubmit = async (data) => {
      try {
        setServerError("");
        setStatus("sending");

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/contact`,
          data,
        );

        if (response.data.success) {
          setStatus("sent");

          reset();

          setTimeout(() => {
            setStatus("idle");
          }, 3000);
        }
      } catch (error) {
        setServerError(
          error.response?.data?.message || "Something went wrong.",
        );

        setStatus("idle");
      }
    };

    return (
      <>
        {/* =================================================================
          CONTACT
        ================================================================= */}
        <section id="contact" className="px-6 py-24 border-t border-slate-100">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <span className="font-mono text-xs text-emerald-600">
                // 04 — contact
              </span>
              <h2 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                Let's work together
              </h2>
              <p className="mt-3 text-slate-600 max-w-xl">
                Have an internship opening, freelance project, or just want to
                say hi? My inbox is open.
              </p>
            </Reveal>

            <div className="mt-12 grid md:grid-cols-5 gap-8">
              {/* Info column */}
              <Reveal className="md:col-span-2" delay={80}>
                <div className="h-full rounded-xl border border-slate-200 bg-slate-900 text-white p-5 sm:p-6 md:p-7 flex flex-col justify-between">
                  <div>
                    <Sparkles size={20} className="text-emerald-400" />
                    <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                      Based in India, open to remote internships and freelance
                      projects worldwide.
                    </p>
                  </div>
                  <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 text-sm">
                    {/* TODO: replace placeholders with your real details */}
                    <a
                      href="mailto:sandipdolar221@gmail.com"
                      className="flex items-center gap-3 hover:text-emerald-300 transition-colors"
                    >
                      <FaEnvelope size={20} /> sandipdolar221@gmail.com
                    </a>
                    <a
                      href="tel:+917567628465"
                      className="flex items-center gap-3 hover:text-emerald-300 transition-colors"
                    >
                      <Phone size={20} /> +91 7567628465
                    </a>
                    <div className="flex items-center gap-3 text-slate-400">
                      <MapPin size={20} /> India
                    </div>
                  </div>
                  <div className="mt-8 flex items-center gap-4 pt-6 border-t border-white/10">
                    <a
                      href="https://github.com/sandipdolar"
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      <FaGithub size={19} color="white" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/sandip-dolar-94b28633b/"
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      {/* <Linkedin size={18} /> */}
                      <BsLinkedin size={19} color="white" />
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Form column */}
              <Reveal className="md:col-span-3" delay={160}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="rounded-xl border border-slate-200 p-7 space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        {...register("name")}
                        placeholder="Your name"
                        className={`w-full rounded-lg border ${errors.name ? "border-red-500 focus:ring-red-200" : "border-slate-200  focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"} px-3.5 py-2.5 text-sm outline-none  transition-all`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        {...register("email")}
                        placeholder="you@example.com"
                        className={`w-full rounded-lg border ${errors.email ? "border-red-500 focus:ring-red-200" : "border-slate-200  focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"} px-3.5 py-2.5 text-sm outline-none  transition-all`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      {...register("message")}
                      placeholder="Drop your message here..."
                      className={`w-full rounded-lg border ${errors.message ? "border-red-500 focus:ring-red-200" : "border-slate-200  focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"} px-3.5 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all resize-y`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="select-none inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 text-white px-6 py-3 text-sm font-medium hover:bg-slate-700 transition-colors disabled:opacity-60 w-full sm:w-auto"
                  >
                    {status === "sending" ? (
                      "Sending..."
                    ) : status === "sent" ? (
                      <>
                        <CheckCircle2 size={16} /> Message sent
                      </>
                    ) : (
                      <>
                        Send Message <Send size={15} />
                      </>
                    )}
                  </button>

                  {status === "sent" && (
                    <p className="text-xs text-emerald-600">
                      Thanks for reaching out — I'll get back to you soon.
                    </p>
                  )}
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </>
    );
}

export default Contact