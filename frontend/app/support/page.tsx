'use client';

import { ActionButton } from '@/components/dashboard-components';
import { useState } from 'react';
import { supportAPI } from '@/lib/api';
import { HelpCircle, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const supportSchema = z.object({
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Please select a category'),
  priority: z.enum(['low', 'medium', 'high']),
});

type SupportFormData = z.infer<typeof supportSchema>;

export default function SupportPage() {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupportFormData>({
    resolver: zodResolver(supportSchema),
  });

  const onSubmit = async (data: SupportFormData) => {
    try {
      setIsSubmitting(true);
      await supportAPI.createTicket(data);
      toast.success('Support ticket created successfully');
      reset();
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to create support ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqItems = [
    {
      question: 'How do I file a complaint?',
      answer: 'Go to the Complaints section, click on "File New Complaint", fill in the required details including title, description, category, and priority, then submit.',
    },
    {
      question: 'How can I pay my taxes?',
      answer: 'Navigate to the Tax Management section, view all your dues, and click "Pay Now" on the tax you want to pay. Follow the payment instructions.',
    },
    {
      question: 'How do I download receipts?',
      answer: 'Go to the Receipts section to view all your transactions. Click on any receipt to view details or download it.',
    },
    {
      question: 'How do I update my profile information?',
      answer: 'Go to My Profile section where you can view and update your personal information, contact details, and preferences.',
    },
    {
      question: 'How can I track my complaint status?',
      answer: 'Go to Complaints section and click on any complaint to view its current status, description, and any updates or comments.',
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Currently, our web portal is accessible from any device with a browser. A dedicated mobile app is coming soon!',
    },
  ];

  return (
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Support & Help</h1>
            <p className="text-slate-600 mt-2">Get assistance with any questions or issues</p>
          </div>
          <ActionButton onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4" />
            Create Support Ticket
          </ActionButton>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Create Support Ticket</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                    <input
                      {...register('subject')}
                      type="text"
                      placeholder="Brief subject of your issue"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                    <textarea
                      {...register('description')}
                      placeholder="Detailed description of your issue"
                      rows={4}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                      <select
                        {...register('category')}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select category</option>
                        <option value="technical">Technical Issue</option>
                        <option value="account">Account Help</option>
                        <option value="payment">Payment Issue</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                      <select
                        {...register('priority')}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      {errors.priority && <p className="text-red-600 text-sm mt-1">{errors.priority.message}</p>}
                    </div>
                  </div>

                  <div className="flex gap-4 justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 transition"
                    >
                      {isSubmitting ? 'Creating...' : 'Create Ticket'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Email Support</h3>
              <p className="text-slate-600">support@smartgram.local</p>
              <p className="text-sm text-slate-500 mt-1">Response within 24 hours</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Phone Support</h3>
              <p className="text-slate-600">+91-1234-5678</p>
              <p className="text-sm text-slate-500 mt-1">Mon-Fri, 9 AM - 5 PM</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Office Hours</h3>
              <p className="text-slate-600">Monday to Friday</p>
              <p className="text-sm text-slate-500 mt-1">9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <details key={idx} className="bg-white rounded-lg border border-slate-200 p-6 group">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-900">
                  {item.question}
                  <span className="transform transition group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </span>
                </summary>
                <p className="text-slate-600 mt-4">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
  );
}
