'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TaxesPage() {
  const [taxes, setTaxes] = useState([
    {
      id: 1,
      name: 'Property Tax',
      amount: 2500,
      status: 'paid',
      dueDate: '29/5/2026',
    },
    {
      id: 2,
      name: 'Water Tax',
      amount: 500,
      status: 'pending',
      dueDate: '24/4/2026',
    },
  ]);

  const [receipt, setReceipt] = useState<any>(null);

  const handlePay = (id: number) => {
    const updated = taxes.map((tax) =>
      tax.id === id ? { ...tax, status: 'paid' } : tax
    );

    setTaxes(updated);

    const paidTax = updated.find((tax) => tax.id === id);

    setReceipt({
      id: `TXN${Date.now()}`,
      name: paidTax?.name,
      amount: paidTax?.amount,
      date: new Date().toLocaleDateString(),
    });
  };

  const handleReceipt = (tax: any) => {
    setReceipt({
      id: `TXN${tax.id}${Date.now()}`,
      name: tax.name,
      amount: tax.amount,
      date: new Date().toLocaleDateString(),
    });
  };

  const total = taxes.reduce((sum, tax) => sum + tax.amount, 0);

  const pending = taxes
    .filter((tax) => tax.status === 'pending')
    .reduce((sum, tax) => sum + tax.amount, 0);

  const paidCount = taxes.filter((tax) => tax.status === 'paid').length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              SG
            </div>

            <h1 className="text-green-700 font-bold text-xl">
              GramConnect
            </h1>
          </div>

          <Link
            href="/"
            className="text-sm font-medium text-slate-700 hover:text-green-700"
          >
            Back to Home
          </Link>

        </div>
      </div>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-6 py-10 flex-1 w-full">

        <h2 className="text-4xl font-bold text-slate-900 mb-2">
          Online Tax Payment
        </h2>

        <p className="text-slate-500 mb-8">
          View and pay your taxes and dues
        </p>

        {/* Top Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-2xl p-6 shadow border">
            <p className="text-slate-500 mb-2">Total Dues</p>
            <h3 className="text-4xl font-bold">₹{total}</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow border">
            <p className="text-slate-500 mb-2">Pending Amount</p>
            <h3 className="text-4xl font-bold text-orange-600">
              ₹{pending}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow border">
            <p className="text-slate-500 mb-2">Paid Taxes</p>
            <h3 className="text-4xl font-bold text-green-600">
              {paidCount}
            </h3>
          </div>

        </div>

        {/* Tax Cards */}
        <div className="space-y-6">

          {taxes.map((tax) => (
            <div
              key={tax.id}
              className="bg-white rounded-2xl p-6 shadow border flex justify-between items-center"
            >
              <div>
                <h3 className="text-2xl font-bold mb-3">
                  {tax.name}
                </h3>

                <p className="text-slate-600 mb-1">
                  <b>Amount:</b> ₹{tax.amount}
                </p>

                <p className="text-slate-600 mb-4">
                  <b>Due Date:</b> {tax.dueDate}
                </p>

                {tax.status === 'paid' ? (
                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
                    PAID
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm">
                    PENDING
                  </span>
                )}

              </div>

              <div className="flex flex-col gap-3">

                {tax.status === 'pending' ? (
                  <button
                    onClick={() => handlePay(tax.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
                  >
                    Pay Now
                  </button>
                ) : (
                  <button
                    onClick={() => handleReceipt(tax)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                  >
                    View Receipt
                  </button>
                )}

                <button
                  onClick={() => handleReceipt(tax)}
                  className="bg-slate-200 hover:bg-slate-300 px-6 py-3 rounded-xl"
                >
                  Download Receipt
                </button>

              </div>
            </div>
          ))}

        </div>

        {/* SAME PAGE RECEIPT */}
        {receipt && (
          <div className="bg-white rounded-2xl shadow border p-8 mt-10">

            <h2 className="text-3xl font-bold text-green-700 mb-6">
              Payment Receipt
            </h2>

            <div className="space-y-3 text-slate-700 text-lg">
              <p>
                <b>Transaction ID:</b> {receipt.id}
              </p>

              <p>
                <b>Tax Name:</b> {receipt.name}
              </p>

              <p>
                <b>Amount Paid:</b> ₹{receipt.amount}
              </p>

              <p>
                <b>Date:</b> {receipt.date}
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Print Receipt
            </button>

          </div>
        )}

      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-white text-center py-4 text-sm">
        © 2024 GramConnect - Digital Grampanchayat Management System
      </div>

    </div>
  );
}