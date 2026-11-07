import { ConsultationFormData, FormValidationResult } from '../types';

export const BOUTIQUE_PHONE = '919361602235';
export const BOUTIQUE_DISPLAY_PHONE = '+91 93616 02235';
export const BOUTIQUE_ADDRESS = 'Mambakkam – Medavakkam Main Road, Medavakkam, Tamil Nadu 600100';

export function validateConsultationForm(data: ConsultationFormData): FormValidationResult {
  const errors: Partial<Record<keyof ConsultationFormData, string>> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  // Clean phone number (digits only)
  const digitsOnly = data.phoneNumber.replace(/\D/g, '');
  if (!digitsOnly || digitsOnly.length < 10) {
    errors.phoneNumber = 'Please provide a valid 10-digit mobile number.';
  }

  if (!data.serviceCategory) {
    errors.serviceCategory = 'Please select a design service.';
  }

  if (!data.preferredDate) {
    errors.preferredDate = 'Please select a preferred date for your fitting or consultation.';
  }

  if (!data.preferredTimeSlot) {
    errors.preferredTimeSlot = 'Please choose a preferred time slot.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatBookingDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
      }
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

export function buildWhatsAppLink(
  data: Partial<ConsultationFormData>,
  phone: string = BOUTIQUE_PHONE
): string {
  const name = data.fullName?.trim() || 'Guest';
  const service = data.serviceCategory || 'Bespoke Tailoring & Stitching';
  const dateFormatted = data.preferredDate ? formatBookingDate(data.preferredDate) : 'Upcoming Date';
  const time = data.preferredTimeSlot || 'Flexible';
  const notes = data.notes?.trim() ? `\n• Notes: ${data.notes.trim()}` : '';
  const fabric = data.hasOwnFabric ? `\n• Fabric Status: ${
    data.hasOwnFabric === 'yes' ? 'Have own fabric' :
    data.hasOwnFabric === 'no' ? 'Need fabric sourcing' : 'Consultation needed'
  }` : '';

  const message = `Hello Ayelin Boutique team,\n\nI would like to book a consultation for ${service}.\n\n• Name: ${name}\n• Preferred Date: ${dateFormatted}\n• Preferred Slot: ${time}${fabric}${notes}\n\nKindly confirm availability. Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildQuickWhatsAppInquiry(
  subject: string,
  phone: string = BOUTIQUE_PHONE
): string {
  const message = `Hello Ayelin Boutique,\n\nI am interested in inquiring about "${subject}". Could you please share more details regarding custom design, tailoring options, and appointment availability?\n\nThank you!`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getServiceTimeline(serviceId: string): string {
  switch (serviceId) {
    case 'blouse':
      return '3 to 7 working days (Express available)';
    case 'bridal':
      return '14 to 25 working days with 2 trial fittings';
    case 'lehenga':
      return '10 to 20 working days';
    case 'anarkali':
      return '5 to 10 working days';
    case 'gowns':
      return '7 to 14 working days';
    case 'mom-daughter':
      return '10 to 15 working days';
    case 'kids':
      return '4 to 7 working days';
    case 'embroidery':
      return '5 to 12 working days depending on aari/zardosi density';
    default:
      return '5 to 10 working days';
  }
}
