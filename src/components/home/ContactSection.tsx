"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Building2,
  MessageCircle,
  X,
  ExternalLink,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "@/context/DataContext";
import { useToast } from "@/context/ToastContext";
import ScrollFloat from "@/components/ui/ScrollFloat";
import AnimatedContent from "@/components/ui/AnimatedContent";
import FadeContent from "@/components/ui/FadeContent";

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid academic/work email"),
  institution: z.string().min(2, "Please state your institution or organization"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  inquiryType: z.enum([
    "Research Collaboration",
    "Postgraduate / Ph.D. Supervision",
    "Invited Keynote / Lecture",
    "Industry Joint Proposal",
    "General Inquiry",
  ]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const { profile } = useData();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    formData: ContactFormData;
    whatsappUrl: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiryType: "Research Collaboration",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    const waText = 
`*Academic Inquiry for Dr. Josephine Selle Jeyanathan*

*From:* ${data.fullName}
*Email:* ${data.email}
*Institution:* ${data.institution}
*Nature of Inquiry:* ${data.inquiryType}
*Subject:* ${data.subject}

*Details:*
${data.message}`;

    const waUrl = `https://wa.me/919940706395?text=${encodeURIComponent(waText)}`;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.warn("Contact dispatch notification:", err);
    } finally {
      setIsSubmitting(false);
      setSubmittedData({
        formData: data,
        whatsappUrl: waUrl,
      });
      setIsModalOpen(true);
      showToast(
        "Inquiry Transmitted",
        "Your academic inquiry has been registered for drjjosephine@gmail.com.",
        "success"
      );
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  return (
    <section id="contact" className="py-20 border-b border-border/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
              <Mail className="w-3.5 h-3.5" />
              <span>Academic Inquiries</span>
            </div>
            <ScrollFloat
              tag="h2"
              textClassName="text-2xl sm:text-4xl font-extrabold text-heading"
              effect="float"
              direction="up"
            >
              Research Collaboration & Contact
            </ScrollFloat>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
            Open for interdisciplinary funded research partnerships, joint international grant proposals, and keynote lectures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards */}
          <AnimatedContent
            distance={40}
            direction="horizontal"
            duration={0.8}
            threshold={0.1}
            className="lg:col-span-5 space-y-6"
          >
            <div className="academic-card p-6 space-y-5">
              <h3 className="text-lg font-bold text-heading">
                Direct Academic Coordinates
              </h3>

              <div className="space-y-4">
                {/* Email Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
                      Email Address
                    </span>
                    <a
                      href="mailto:drjjosephine@gmail.com"
                      className="text-sm font-bold text-heading hover:text-primary transition-colors"
                    >
                      drjjosephine@gmail.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp & Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-[#25D366]/10 text-[#25D366] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
                      WhatsApp & Mobile
                    </span>
                    <a
                      href="tel:+919940706395"
                      className="text-sm font-bold text-heading hover:text-primary transition-colors block"
                    >
                      +91-994-070-6395
                    </a>
                    <a
                      href="https://wa.me/919940706395"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#25D366] font-semibold hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Institution */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
                      Department & Institution
                    </span>
                    <p className="text-xs font-semibold text-heading leading-snug">
                      {profile.department}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {profile.institution}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
                      Location
                    </span>
                    <p className="text-xs font-medium text-heading">
                      {profile.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Note on Data Privacy */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground leading-relaxed">
              <p className="font-semibold text-heading">Academic Information Governance:</p>
              In adherence to international academic best practices, institutional communication channels are published. Sensitive personal documentation is protected.
            </div>
          </AnimatedContent>

          {/* Right Column: Contact Form */}
          <FadeContent
            effect="focus"
            blur={6}
            duration={0.9}
            threshold={0.1}
            className="lg:col-span-7"
          >
            <div className="academic-card p-6 sm:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-heading">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register("fullName")}
                      placeholder="Dr. / Prof. / Scholar Name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-card-foreground outline-none focus:border-primary transition-colors"
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-500 font-medium">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-heading">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="name@university.edu"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-card-foreground outline-none focus:border-primary transition-colors"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 font-medium">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Institution */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-heading">
                      Affiliated Institution *
                    </label>
                    <input
                      type="text"
                      {...register("institution")}
                      placeholder="University / Organization"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-card-foreground outline-none focus:border-primary transition-colors"
                    />
                    {errors.institution && (
                      <p className="text-[11px] text-rose-500 font-medium">
                        {errors.institution.message}
                      </p>
                    )}
                  </div>

                  {/* Inquiry Type */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-heading">
                      Nature of Inquiry
                    </label>
                    <select
                      {...register("inquiryType")}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-card-foreground outline-none focus:border-primary transition-colors"
                    >
                      <option value="Research Collaboration">Research Collaboration</option>
                      <option value="Postgraduate / Ph.D. Supervision">Postgraduate / Ph.D. Supervision</option>
                      <option value="Invited Keynote / Lecture">Invited Keynote / Lecture</option>
                      <option value="Industry Joint Proposal">Industry Joint Proposal</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-heading">
                    Subject *
                  </label>
                  <input
                    type="text"
                    {...register("subject")}
                    placeholder="e.g. Joint Grant Proposal in Diabetic Foot Thermography"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-card-foreground outline-none focus:border-primary transition-colors"
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-rose-500 font-medium">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-heading">
                    Collaboration Details *
                  </label>
                  <textarea
                    rows={4}
                    {...register("message")}
                    placeholder="Outline research synergy, proposed scope, or event specifics..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-card-foreground outline-none focus:border-primary transition-colors resize-none leading-relaxed"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-500 font-medium">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-button text-white text-xs sm:text-sm font-semibold hover:opacity-95 shadow-soft transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmit Academic Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </FadeContent>
        </div>
      </div>

      {/* PROFESSIONAL ACKNOWLEDGMENT & CONFIRMATION POP-UP MODAL */}
      <AnimatePresence>
        {isModalOpen && submittedData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 text-card-foreground"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-5 right-5 p-2 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground hover:text-heading transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Crest & Badge */}
              <div className="text-center space-y-3 pt-2">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Inquiry Registered Successfully</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-heading tracking-tight">
                    Thank You for Reviewing My Academic Portfolio
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                    We sincerely appreciate your review of Dr. Josephine Selle Jeyanathan&apos;s research portfolio, funded grants, and academic accomplishments.
                  </p>
                </div>
              </div>

              {/* Inquiry Details Summary Card */}
              <div className="rounded-2xl bg-muted/50 border border-border/80 p-4 sm:p-5 space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-3 border-b border-border/60">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                      Target Email
                    </span>
                    <span className="font-semibold text-primary">
                      drjjosephine@gmail.com
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                      Direct WhatsApp Dispatch
                    </span>
                    <span className="font-semibold text-heading">
                      +91-994-070-6395
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                    Scope of Collaboration
                  </span>
                  <p className="font-bold text-heading">
                    {submittedData.formData.inquiryType}: {submittedData.formData.subject}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    From: {submittedData.formData.fullName} • {submittedData.formData.institution}
                  </p>
                </div>

                {/* Professional Response Assurance */}
                <div className="p-3 rounded-xl bg-card border border-primary/20 text-xs flex items-start gap-2.5 text-card-foreground">
                  <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    <strong className="text-heading">Response Commitment:</strong> Dr. Josephine will review your correspondence and transmit an official response to <span className="font-bold text-primary">{submittedData.formData.email}</span> shortly.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                {/* 1. Direct WhatsApp Notification Button */}
                <a
                  href={submittedData.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify Dr. Josephine via WhatsApp (+91-994-070-6395)</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>

                {/* 2. Direct Mail Client Fallback */}
                <a
                  href={`mailto:drjjosephine@gmail.com?subject=${encodeURIComponent(
                    `[Academic Portfolio Inquiry] ${submittedData.formData.subject}`
                  )}&body=${encodeURIComponent(
                    `From: ${submittedData.formData.fullName} (${submittedData.formData.institution})\nEmail: ${submittedData.formData.email}\nScope: ${submittedData.formData.inquiryType}\n\nCollaboration Details:\n${submittedData.formData.message}`
                  )}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-card border border-border hover:bg-muted text-heading font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  <span>Open in Mail Client (drjjosephine@gmail.com)</span>
                </a>

                {/* 3. Close & Return */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full py-2.5 text-center text-xs font-semibold text-muted-foreground hover:text-heading transition-colors pt-1"
                >
                  Close & Return to Portfolio
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
