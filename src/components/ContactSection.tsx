import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Globe,
  MessageCircle,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Instagram,
} from 'lucide-react';
import {
  ConsultationFormData,
  FormValidationResult,
} from '../types';
import {
  validateConsultationForm,
  buildWhatsAppLink,
  BOUTIQUE_PHONE,
  BOUTIQUE_DISPLAY_PHONE,
  formatBookingDate,
} from '../utils/booking';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    phoneNumber: '',
    serviceCategory: preselectedService || 'Designer Blouse Stitching',
    preferredDate: '',
    preferredTimeSlot: 'Morning (10:30 AM – 1:00 PM)',
    notes: '',
    hasOwnFabric: 'yes',
  });

  const [validation, setValidation] = useState<FormValidationResult>({
    isValid: true,
    errors: {},
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validation.errors[name as keyof ConsultationFormData]) {
      setValidation((prev) => ({
        ...prev,
        errors: { ...prev.errors, [name]: undefined },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateConsultationForm(formData);
    setValidation(result);

    if (result.isValid) {
      setIsSubmitted(true);
      const waLink = buildWhatsAppLink(formData);
      window.open(waLink, '_blank', 'noopener,noreferrer');
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      phoneNumber: '',
      serviceCategory: 'Designer Blouse Stitching',
      preferredDate: '',
      preferredTimeSlot: 'Morning (10:30 AM – 1:00 PM)',
      notes: '',
      hasOwnFabric: 'yes',
    });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[var(--theme-bg)] relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.25em] uppercase text-[var(--theme-accent-dark)] mb-3">
            <span>Appointments & Inquiries</span>
            <span aria-hidden="true">·</span>
            <span>Medavakkam, Chennai</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-[var(--theme-text)] leading-[1.1]">
            Let’s Create <br />
            <span className="italic text-[var(--theme-primary)]">Something Beautiful.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--theme-text)]/75 font-sans font-light leading-relaxed">
            Visit our boutique in Medavakkam for a personalized fitting, fabric review, and styling
            session, or book your date via our quick concierge form.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Boutique Information & Live Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[var(--theme-card)] border border-[var(--theme-accent)]/30 p-8 shadow-sm">
              <span className="text-[11px] font-sans tracking-[0.22em] uppercase text-[var(--theme-accent-dark)] block mb-2 font-medium">
                Atelier Location
              </span>
              <h3 className="font-editorial text-2xl text-[var(--theme-primary)] font-normal mb-6 uppercase tracking-wider">
                AYELIN BOUTIQUE
              </h3>

              <div className="space-y-5 text-sm font-sans text-[var(--theme-text)]/85">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[var(--theme-text)]">Boutique Address:</p>
                    <p className="text-xs sm:text-sm text-[var(--theme-text)]/75 leading-relaxed mt-0.5">
                      Mambakkam – Medavakkam Main Road,<br />
                      Medavakkam, Tamil Nadu 600100.
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Ayelin+Boutique+Mambakkam+Medavakkam+Main+Road+Chennai+600100"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[var(--theme-primary)] hover:text-[var(--theme-accent-dark)] font-medium tracking-wide mt-1.5 underline"
                    >
                      <span>Get Directions on Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Phone & Click to Call */}
                <div className="flex items-start gap-3.5 pt-4 border-t border-[var(--theme-bg-subtle)]">
                  <Phone className="w-5 h-5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[var(--theme-text)]">Phone & Consultations:</p>
                    <a
                      href={`tel:${BOUTIQUE_PHONE}`}
                      className="text-sm font-medium text-[var(--theme-primary)] hover:text-[var(--theme-accent-dark)] transition-colors mt-0.5 block"
                    >
                      {BOUTIQUE_DISPLAY_PHONE}
                    </a>
                    <p className="text-[11px] text-[var(--theme-text)]/60 mt-0.5">
                      Direct line for appointments & emergency bridal inquiries
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-3.5 pt-4 border-t border-[var(--theme-bg-subtle)]">
                  <Clock className="w-5 h-5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[var(--theme-text)]">Atelier Hours:</p>
                    <p className="text-xs text-[var(--theme-text)]/75 mt-0.5">
                      Monday – Saturday: 10:00 AM – 8:30 PM
                    </p>
                    <p className="text-xs text-[var(--theme-text)]/75">
                      Sunday: By Prior Appointment
                    </p>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-3.5 pt-4 border-t border-[var(--theme-bg-subtle)]">
                  <Globe className="w-5 h-5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[var(--theme-text)]">Official Website:</p>
                    <a
                      href="https://www.ayelins.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs sm:text-sm text-[var(--theme-primary)] hover:underline mt-0.5 block"
                    >
                      https://www.ayelins.com/
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp & Instagram Action Buttons */}
              <div className="mt-8 pt-6 border-t border-[var(--theme-accent)]/30 space-y-3">
                <a
                  href={`https://wa.me/${BOUTIQUE_PHONE}?text=${encodeURIComponent(
                    'Hello Ayelin Boutique team, I am interested in inquiring about custom stitching, bridal wear, and booking a consultation.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] border border-[#25D366]/40 transition-colors flex items-center justify-center gap-2 text-xs font-sans font-medium tracking-[0.16em] uppercase"
                >
                  <MessageCircle className="w-4 h-4 text-[#128C7E]" />
                  <span>Chat on WhatsApp (+91 93616 02235)</span>
                </a>

                <a
                  href="https://www.instagram.com/ayelinboutique"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 bg-[var(--theme-card)] hover:bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] hover:text-[#FFF4D4] border border-[var(--theme-accent)]/40 hover:border-[var(--theme-accent)] transition-colors flex items-center justify-center gap-2 text-xs font-sans font-medium tracking-[0.16em] uppercase"
                >
                  <Instagram className="w-4 h-4 text-[#E1306C]" />
                  <span>Follow @ayelinboutique on Instagram</span>
                </a>
              </div>
            </div>

            {/* Interactive Location Preview Card */}
            <div className="bg-[var(--theme-primary-dark)] text-[var(--theme-bg)] p-6 border border-[var(--theme-accent)]/40 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[var(--theme-accent)]">
                  Boutique Location
                </span>
                <span className="text-[11px] text-[var(--theme-bg-subtle)]/60">South Chennai</span>
              </div>
              <p className="font-editorial text-lg text-[var(--theme-bg)]">
                Conveniently situated along the Mambakkam – Medavakkam Main Road
              </p>
              <p className="text-xs text-[var(--theme-bg-subtle)]/75 font-sans mt-2 leading-relaxed">
                Easily accessible from Velachery, Pallikaranai, Perumbakkam, Tambaram, and OMR.
                Dedicated customer parking is available.
              </p>
            </div>
          </div>

          {/* Right Column: Appointment Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-[var(--theme-card)] border border-[var(--theme-accent)]/30 p-8 sm:p-10 shadow-lg relative">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--theme-primary)]/10 border border-[var(--theme-accent)] text-[var(--theme-primary)] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-[var(--theme-accent)]" />
                  </div>
                  <h3 className="font-editorial text-3xl sm:text-4xl text-[var(--theme-text)] font-light mb-2">
                    Appointment Details Prepared
                  </h3>
                  <p className="text-sm text-[var(--theme-text)]/80 font-sans max-w-md mx-auto mb-6">
                    Thank you, <span className="font-semibold text-[var(--theme-primary)]">{formData.fullName}</span>!
                    Your consultation request for{' '}
                    <span className="font-semibold">{formData.serviceCategory}</span> on{' '}
                    <span className="font-semibold">{formatBookingDate(formData.preferredDate)}</span> (
                    {formData.preferredTimeSlot}) is queued.
                  </p>
                  <p className="text-xs text-[var(--theme-accent-dark)] font-sans mb-8">
                    A WhatsApp message has been generated. You can also chat directly with our master
                    stylist.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                      href={buildWhatsAppLink(formData)}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3.5 bg-[var(--theme-primary)] text-[var(--theme-bg)] text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-[var(--theme-primary-dark)] border border-[var(--theme-accent)]/40 cursor-pointer"
                    >
                      Open WhatsApp Confirmation
                    </a>
                    <button
                      onClick={resetForm}
                      className="px-6 py-3.5 text-xs font-sans tracking-[0.16em] uppercase text-[var(--theme-primary)] border border-[var(--theme-primary)]/30 hover:border-[var(--theme-primary)] cursor-pointer"
                    >
                      Book Another Fitting
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div>
                    <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[var(--theme-accent-dark)] block mb-1 font-medium">
                      Concierge Form
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl text-[var(--theme-text)] font-normal">
                      Schedule Your Fitting or Design Session
                    </h3>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-sans uppercase tracking-[0.14em] text-[var(--theme-text)]/80 mb-2 font-medium"
                      >
                        Full Name <span className="text-[var(--theme-primary)]">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Deepika Sundaram"
                        className={`w-full px-4 py-3 bg-[var(--theme-card)] border text-sm text-[var(--theme-text)] focus:outline-none transition-colors ${
                          validation.errors.fullName
                            ? 'border-red-500 bg-red-950/20'
                            : 'border-[var(--theme-accent)]/40 focus:border-[var(--theme-primary)]'
                        }`}
                      />
                      {validation.errors.fullName && (
                        <p className="text-xs text-red-400 mt-1.5 font-sans">
                          {validation.errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-xs font-sans uppercase tracking-[0.14em] text-[var(--theme-text)]/80 mb-2 font-medium"
                      >
                        Mobile Number <span className="text-[var(--theme-primary)]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="e.g. 98401 23456"
                        className={`w-full px-4 py-3 bg-[var(--theme-card)] border text-sm text-[var(--theme-text)] focus:outline-none transition-colors ${
                          validation.errors.phoneNumber
                            ? 'border-red-500 bg-red-950/20'
                            : 'border-[var(--theme-accent)]/40 focus:border-[var(--theme-primary)]'
                        }`}
                      />
                      {validation.errors.phoneNumber && (
                        <p className="text-xs text-red-400 mt-1.5 font-sans">
                          {validation.errors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label
                      htmlFor="serviceCategory"
                      className="block text-xs font-sans uppercase tracking-[0.14em] text-[var(--theme-text)]/80 mb-2 font-medium"
                    >
                      Design & Stitching Service <span className="text-[var(--theme-primary)]">*</span>
                    </label>
                    <select
                      id="serviceCategory"
                      name="serviceCategory"
                      value={formData.serviceCategory}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--theme-card)] border border-[var(--theme-accent)]/40 focus:border-[var(--theme-primary)] text-sm text-[var(--theme-text)] focus:outline-none"
                    >
                      <option className="bg-[#0B132B] text-[#FBF8F2]" value="Designer Blouse Stitching">Designer Blouse Stitching (Aari / Zardosi / Padded)</option>
                      <option className="bg-[#0B132B] text-[#FBF8F2]" value="Bridal Wear & Trousseau">Bridal Wear & Trousseau Customization</option>
                      <option className="bg-[#0B132B] text-[#FBF8F2]" value="Lehenga Customization">Lehenga Customization (Can-can / 360° flair)</option>
                      <option className="bg-[#0B132B] text-[#FBF8F2]" value="Anarkali & Ethnic Wear">Anarkali & Ethnic Wear</option>
                      <option className="bg-[#0B132B] text-[#FBF8F2]" value="Party Wear Gowns">Party Wear Gowns</option>
                      <option className="bg-[#0B132B] text-[#FBF8F2]" value="Kids Designer Wear">Kids' Designer Wear (Pattu Pavadai / Frocks)</option>
                      <option className="bg-[#0B132B] text-[#FBF8F2]" value="Mom & Daughter Collections">Mom & Daughter Matching Outfits</option>
                      <option className="bg-[#0B132B] text-[#FBF8F2]" value="Custom Embroidery & Aari Work">Custom Hand Embroidery / Monogramming</option>
                    </select>
                  </div>

                  {/* Preferred Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="preferredDate"
                        className="block text-xs font-sans uppercase tracking-[0.14em] text-[var(--theme-text)]/80 mb-2 font-medium"
                      >
                        Preferred Fitting Date <span className="text-[var(--theme-primary)]">*</span>
                      </label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-[var(--theme-card)] border text-sm text-[var(--theme-text)] focus:outline-none transition-colors ${
                          validation.errors.preferredDate
                            ? 'border-red-500 bg-red-950/20'
                            : 'border-[var(--theme-accent)]/40 focus:border-[var(--theme-primary)]'
                        }`}
                      />
                      {validation.errors.preferredDate && (
                        <p className="text-xs text-red-400 mt-1.5 font-sans">
                          {validation.errors.preferredDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="preferredTimeSlot"
                        className="block text-xs font-sans uppercase tracking-[0.14em] text-[var(--theme-text)]/80 mb-2 font-medium"
                      >
                        Preferred Time Slot <span className="text-[var(--theme-primary)]">*</span>
                      </label>
                      <select
                        id="preferredTimeSlot"
                        name="preferredTimeSlot"
                        value={formData.preferredTimeSlot}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--theme-card)] border border-[var(--theme-accent)]/40 focus:border-[var(--theme-primary)] text-sm text-[var(--theme-text)] focus:outline-none"
                      >
                        <option className="bg-[#0B132B] text-[#FBF8F2]" value="Morning (10:30 AM – 1:00 PM)">Morning (10:30 AM – 1:00 PM)</option>
                        <option className="bg-[#0B132B] text-[#FBF8F2]" value="Afternoon (2:00 PM – 5:00 PM)">Afternoon (2:00 PM – 5:00 PM)</option>
                        <option className="bg-[#0B132B] text-[#FBF8F2]" value="Evening (5:00 PM – 8:30 PM)">Evening (5:00 PM – 8:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Fabric Status */}
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-[0.14em] text-[var(--theme-text)]/80 mb-2 font-medium">
                      Fabric Status
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <label
                        className={`flex items-center gap-2 p-3 border text-xs cursor-pointer transition-colors ${
                          formData.hasOwnFabric === 'yes'
                            ? 'bg-[var(--theme-primary)]/10 border-[var(--theme-primary)] text-[var(--theme-primary)] font-medium'
                            : 'bg-[var(--theme-bg)] border-[var(--theme-accent)]/30 text-[var(--theme-text)]/70'
                        }`}
                      >
                        <input
                          type="radio"
                          name="hasOwnFabric"
                          value="yes"
                          checked={formData.hasOwnFabric === 'yes'}
                          onChange={handleChange}
                          className="accent-[var(--theme-primary)]"
                        />
                        <span>I have my fabric</span>
                      </label>

                      <label
                        className={`flex items-center gap-2 p-3 border text-xs cursor-pointer transition-colors ${
                          formData.hasOwnFabric === 'no'
                            ? 'bg-[var(--theme-primary)]/10 border-[var(--theme-primary)] text-[var(--theme-primary)] font-medium'
                            : 'bg-[var(--theme-bg)] border-[var(--theme-accent)]/30 text-[var(--theme-text)]/70'
                        }`}
                      >
                        <input
                          type="radio"
                          name="hasOwnFabric"
                          value="no"
                          checked={formData.hasOwnFabric === 'no'}
                          onChange={handleChange}
                          className="accent-[var(--theme-primary)]"
                        />
                        <span>Need boutique sourcing</span>
                      </label>

                      <label
                        className={`flex items-center gap-2 p-3 border text-xs cursor-pointer transition-colors ${
                          formData.hasOwnFabric === 'consultation_needed'
                            ? 'bg-[var(--theme-primary)]/10 border-[var(--theme-primary)] text-[var(--theme-primary)] font-medium'
                            : 'bg-[var(--theme-bg)] border-[var(--theme-accent)]/30 text-[var(--theme-text)]/70'
                        }`}
                      >
                        <input
                          type="radio"
                          name="hasOwnFabric"
                          value="consultation_needed"
                          checked={formData.hasOwnFabric === 'consultation_needed'}
                          onChange={handleChange}
                          className="accent-[var(--theme-primary)]"
                        />
                        <span>Need styling advice</span>
                      </label>
                    </div>
                  </div>

                  {/* Notes & Special Requests */}
                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-xs font-sans uppercase tracking-[0.14em] text-[var(--theme-text)]/80 mb-2 font-medium"
                    >
                      Design Notes or Event Date (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="e.g. Wedding muhurtham on Dec 20; need peacock zardosi back neckline with tassels."
                      className="w-full px-4 py-3 bg-[var(--theme-bg)] border border-[var(--theme-accent)]/40 focus:border-[var(--theme-primary)] text-sm text-[var(--theme-text)] focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 text-center text-xs tracking-[0.22em] uppercase font-medium bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] text-[var(--theme-bg)] border border-[var(--theme-accent)]/50 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[var(--theme-accent)]" />
                    <span>Confirm Consultation Request</span>
                  </button>

                  <p className="text-[11px] text-center text-[var(--theme-text)]/60 font-sans">
                    We will promptly confirm your slot and send location directions to your phone.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
