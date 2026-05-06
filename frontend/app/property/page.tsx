'use client';

import { useEffect, useState } from 'react';
import { propertiesAPI } from '@/lib/api';

export default function PropertyPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await propertiesAPI.list();
        setProperties(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch properties', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">

      <h1 className="text-4xl font-bold mb-2">
        Property Management
      </h1>

      <p className="text-slate-500 mb-8">
        View your registered properties
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : properties.length === 0 ? (
        <p>No properties found</p>
      ) : (

        <div className="space-y-6">
          {properties.map((p) => (
            <div
              key={p._id}
              className="bg-white p-6 rounded-2xl shadow border flex justify-between"
            >
              <div>
                <h3 className="text-xl font-bold">{p.type}</h3>
                <p className="text-slate-600">Area: {p.area}</p>
                <p className="text-slate-600">Location: {p.location}</p>
              </div>

              <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full h-fit">
                Active
              </span>
            </div>
          ))}
        </div>

      )}

    </div>
  );
}