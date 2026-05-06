'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { taxesAPI } from '@/lib/api';

export default function TaxesPage() {
  const [grouped, setGrouped] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isMountedRef = useRef(true);

  useEffect(() => {
    loadTaxes();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadTaxes = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('TOKEN:', token);

      const data = await taxesAPI.list();

      // 🔥 GROUP BY PROPERTY
      const groupedData: any = {};

      // Ensure data is an array
      const taxesArray = Array.isArray(data) ? data : [];

      taxesArray.forEach((tax: any) => {
        const propertyId = tax.propertyId?._id || 'unknown';

        if (!groupedData[propertyId]) {
          groupedData[propertyId] = {
            property: tax.propertyId,
            taxes: [],
          };
        }

        groupedData[propertyId].taxes.push(tax);
      });

      if (isMountedRef.current) {
        setGrouped(groupedData);
      }

    } catch (err) {
      console.error('Failed to load taxes', err);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const handlePay = async (tax: any) => {
  try {
    const token = localStorage.getItem("token");

    // 🔥 CREATE ORDER
    const orderRes = await fetch(
      "http://localhost:5000/api/payments/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: tax.amount,
        }),
      }
    );

    const order = await orderRes.json();

    // 🔥 OPEN RAZORPAY
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "SmartGram",
      description: tax.type,
      order_id: order.id,

      handler: async function (response: any) {

        // 🔥 MARK TAX PAID
        await fetch(
          `http://localhost:5000/api/taxes/${tax._id}/pay`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
            }),
          }
        );

        // 🔥 RECEIPT PAGE
        window.location.href = `/receipts?tax=${tax._id}`;
      },

      theme: {
        color: "#16a34a",
      },
    };

    const razor = new (window as any).Razorpay(options);
    razor.open();

  } catch (err) {
    console.error(err);
    alert("Payment failed");
  }
};

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h1 className="text-4xl font-bold mb-8">
        Your Taxes
      </h1>

      {Object.keys(grouped).length === 0 ? (
        <p>No taxes found</p>
      ) : (

        Object.values(grouped).map((group: any, i) => (
          <div key={i} className="mb-10">

            {/* 🔥 PROPERTY CARD */}
            <div className="bg-white p-6 rounded-2xl shadow mb-4">

              <h2 className="text-2xl font-bold text-green-700 mb-2">
                {group.property?.type || 'Property'}
              </h2>

              <p className="text-slate-600">
                📍 {group.property?.location}
              </p>

              <p className="text-slate-600">
                📐 {group.property?.area}
              </p>

            </div>

            {/* 🔥 TAXES UNDER PROPERTY */}
            <div className="space-y-4">

              {group.taxes.map((tax: any) => (
                <div
                  key={tax._id}
                  className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
                >

                  {/* LEFT */}
                  <div>
                    <p className="font-semibold text-lg">
                      {tax.type}
                    </p>

                    <p className="text-slate-600 text-sm">
                      Due: {new Date(tax.dueDate).toLocaleDateString()}
                    </p>

                    <p className="text-slate-600">
                      ₹{tax.amount}
                    </p>

                    <span
                      className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                        tax.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {tax.status.toUpperCase()}
                    </span>
                  </div>

                  {/* RIGHT */}
                  <div>

                    {tax.status === 'pending' ? (
                      <button
                        onClick={() => handlePay(tax._id)}
                        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          router.push(`/receipts?tax=${tax._id}`)
                        }
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                      >
                        View Receipt
                      </button>
                    )}

                  </div>

                </div>
              ))}

            </div>

          </div>
        ))

      )}

    </div>
  );
}