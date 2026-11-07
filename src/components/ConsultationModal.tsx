import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { ConsultationFormData, FormValidationResult } from '../types';
import { validateConsultationForm, buildWhatsAppLink } from '../utils/booking';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Designer Blouse Stitching',
}) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    phoneNumber: '',
    serviceCategory: initialService,
    preferredDate: '',
    preferredTimeSlot: 'Morning (10:30 AM – 1:00 PM)',
    notes: '',
    hasOwnFabric: 'yes',
  });

  const [validation, setValidation] = useState<FormValidationResult>({
    isValid: true,
    errors: {},
  });

  if (!isOpen) return null;

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
      const waLink = buildWhatsAppLink(formData);
      window.open(waLink, '_blank', 'noopener,noreferrer');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative bg-[var(--theme-bg)] border border-[var(--theme-accent)]/60 max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[var(--theme-text)] hover:text-[var(--theme-accent)] transition-colors rounded-full cursor-pointer"
          aria-label="Close consultation modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 pr-8">
          <span className="text-[11px] font-sans tracking-[0.22em] uppercase text-[var(--theme-accent-dark)] block mb-1 font-medium">
            Bespoke Consultation
          </span>
          <h3 className="font-editorial text-3xl text-[var(--theme-primary)] font-light">
            Book Atelier Fitting
          </h3>
          <p className="text-xs text-[var(--theme-text)]/75 font-sans mt-1">
            Ayelin Boutique · Mambakkam – Medavakkam Main Road, Chennai
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block text-xs font-sans uppercase tracking-[0.14em] text-[var(--theme-text)]/80 mb-1 font-medium">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Meenakshi Raman"
              className={`w-full px-4 py-2.5 bg-[var(--theme-card)] border text-sm text-[var(--theme-text)] focus:outline-none ${
                validation.errors.fullName ? 'border-red-500 bg-red-950/20' : 'border-[var(--theme-accent)]/40 focus:border-[var(--theme-primary)]'
              }`}
            />
            {validation.errors.fullName && (
              <p className="text-xs text-red-400 mt-1">{validation.errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-[0.14em] text-[var(--theme-text)]/80 mb-1 font-medium">
              WhatsApp / Mobile *
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="e.g. 98401 23456"
              className={`w-full px-4 py-2.5 bg-[var(--theme-card)] border text-sm text-[var(--theme-text)] focus:outline-none ${
                validation.errors.phoneNumber ? 'border-red-500 bg-red-950/20' : 'border-[var(--theme-accent)]/40 focus:border-[var(--theme-primary)]'
              }`}
            />
            {validation.errors.phoneNumber && (
              <p className="text-xs text-red-400 mt-1">{validation.errors.phoneNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-[0.14em] text-[var(--theme-text)]/80 mb-1 font-medium">
              Service *
            </label>
            <select
              name="serviceCategory"
              value={formData.serviceCategory}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-[var(--theme-card)] border border-[var(--theme-accent)]/40 focus:border-[var(--theme-primary)] text-sm text-[var(--theme-text)] focus:outline-none"
            >
              <option className="bg-[#0B132B] text-[#FBF8F2]" value="Designer Blouse Stitching">Designer Blouse Stitching</option>
              <option className="bg-[#0B132B] text-[#FBF8F2]" value="Bridal Wear & Trousseau">Bridal Wear & Trousseau</option>
              <option className="bg-[#0B132B] text-[#FBF8F2]" value="Lehenga Customization">Lehenga Customization</option>
              <option className="bg-[#0B132B] text-[#FBF8F2]" value="Anarkali & Ethnic Wear">Anarkali & Ethnic Wear</option>
              <option className="bg-[#0B132B] text-[#FBF8F2]" value="Party Wear Gowns">Party Wear Gowns</option>
              <option className="bg-[#0B132B] text-[#FBF8F2]" value="Kids Designer Wear">Kids' Designer Wear</option>
              <option className="bg-[#0B132B] text-[#FBF8F2]" value="Mom & Daughter Collections">Mom & Daughter Outfits</option>
              <option className="bg-[#0B132B] text-[#FBF8F2]" value="Custom Embroidery & Aari Work">Custom Embroidery & Aari Work</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans uppercase tracking-[0.14em] text-[var(--theme-text)]/80 mb-1 font-medium">
                Fitting Date *
              </label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-[var(--theme-card)] border text-sm text-[var(--theme-text)] focus:outline-none ${
                  validation.errors.preferredDate ? 'border-red-500 bg-red-950/20' : 'border-[var(--theme-accent)]/40 focus:border-[var(--theme-primary)]'
                }`}
              />
              {validation.errors.preferredDate && (
                <p className="text-xs text-red-400 mt-1">{validation.errors.preferredDate}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-sans uppercase tracking-[0.14em] text-[var(--theme-text)]/80 mb-1 font-medium">
                Time Slot *
              </label>
              <select
                name="preferredTimeSlot"
                value={formData.preferredTimeSlot}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-[var(--theme-card)] border border-[var(--theme-accent)]/40 focus:border-[var(--theme-primary)] text-sm text-[var(--theme-text)] focus:outline-none"
              >
                <option className="bg-[#0B132B] text-[#FBF8F2]" value="Morning (10:30 AM – 1:00 PM)">Morning (10:30 AM – 1:00 PM)</option>
                <option className="bg-[#0B132B] text-[#FBF8F2]" value="Afternoon (2:00 PM – 5:00 PM)">Afternoon (2:00 PM – 5:00 PM)</option>
                <option className="bg-[#0B132B] text-[#FBF8F2]" value="Evening (5:00 PM – 8:30 PM)">Evening (5:00 PM – 8:30 PM)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans uppercase tracking-[0.14em] text-[var(--theme-text)]/80 mb-1 font-medium">
              Special Notes / Blouse Pattern Details
            </label>
            <textarea
              name="notes"
              rows={2}
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g. Bringing Kanchipuram silk saree; need deep round back with aari work."
              className="w-full px-4 py-2 bg-[var(--theme-card)] border border-[var(--theme-accent)]/40 focus:border-[var(--theme-primary)] text-sm text-[var(--theme-text)] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-2 bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] text-[var(--theme-bg)] text-xs font-sans tracking-[0.2em] uppercase font-medium border border-[var(--theme-accent)]/40 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Calendar className="w-4 h-4 text-[var(--theme-accent)]" />
            <span>Confirm & Open WhatsApp Concierge</span>
          </button>
        </form>
      </div>
    </div>
  );
};
