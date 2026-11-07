import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateConsultationForm,
  buildWhatsAppLink,
  buildQuickWhatsAppInquiry,
  formatBookingDate,
  getServiceTimeline,
  BOUTIQUE_PHONE
} from './booking';
import { ConsultationFormData } from '../types';

test('validateConsultationForm catches empty required fields', () => {
  const emptyForm: ConsultationFormData = {
    fullName: '',
    phoneNumber: '',
    serviceCategory: '',
    preferredDate: '',
    preferredTimeSlot: '',
    notes: '',
    hasOwnFabric: 'consultation_needed',
  };

  const result = validateConsultationForm(emptyForm);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.phoneNumber);
  assert.ok(result.errors.serviceCategory);
  assert.ok(result.errors.preferredDate);
  assert.ok(result.errors.preferredTimeSlot);
});

test('validateConsultationForm succeeds with valid inputs', () => {
  const validForm: ConsultationFormData = {
    fullName: 'Ananya Ramesh',
    phoneNumber: '9840123456',
    serviceCategory: 'Designer Blouse Stitching',
    preferredDate: '2026-12-15',
    preferredTimeSlot: 'Morning (10:30 AM - 1:00 PM)',
    notes: 'Need peacock aari work on raw silk blouse',
    hasOwnFabric: 'yes',
  };

  const result = validateConsultationForm(validForm);
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('buildWhatsAppLink generates valid WhatsApp URL with encoded message', () => {
  const form: ConsultationFormData = {
    fullName: 'Priya Sundaram',
    phoneNumber: '9876543210',
    serviceCategory: 'Bridal Blouse Stitching',
    preferredDate: '2026-11-20',
    preferredTimeSlot: 'Evening (5:00 PM - 8:30 PM)',
    notes: 'Urgent reception blouse',
    hasOwnFabric: 'yes',
  };

  const url = buildWhatsAppLink(form);
  assert.ok(url.startsWith(`https://wa.me/${BOUTIQUE_PHONE}?text=`));
  assert.ok(url.includes('Priya%20Sundaram'));
  assert.ok(url.includes('Bridal%20Blouse%20Stitching'));
});

test('buildQuickWhatsAppInquiry generates targeted inquiry link', () => {
  const url = buildQuickWhatsAppInquiry('Peacock Zardosi Bridal Blouse');
  assert.ok(url.startsWith(`https://wa.me/${BOUTIQUE_PHONE}?text=`));
  assert.ok(url.includes('Peacock%20Zardosi%20Bridal%20Blouse'));
});

test('formatBookingDate formats ISO date correctly', () => {
  const formatted = formatBookingDate('2026-12-25');
  assert.ok(formatted.includes('Dec'));
  assert.ok(formatted.includes('25'));
  assert.ok(formatted.includes('2026'));
});

test('getServiceTimeline returns expected timeline estimates', () => {
  assert.ok(getServiceTimeline('blouse').includes('days'));
  assert.ok(getServiceTimeline('bridal').includes('working days'));
});
