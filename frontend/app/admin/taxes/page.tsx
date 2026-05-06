'use client';

import { useEffect, useState } from 'react';

export default function AdminTaxesPage() {
  const [taxes, setTaxes] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [form, setForm] = useState({
    userId: '',
    type: '',
    amount: '',
    dueDate: '',
  });

  const token = typeof window !== 'undefined'
    ? localStorage.getItem('token')
    : null;

  // 🔥 LOAD DATA
  useEffect(() => {
    loadTaxes();
    loadUsers();
  }, []);

  const loadTaxes = async () => {
    const res = await fetch('http://localhost:5000/api/admin/taxes', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTaxes(data);
  };

  const loadUsers = async () => {
    const res = await fetch('http://localhost:5000/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUsers(data);
  };

  // 🔥 CREATE TAX
  const handleCreate = async () => {
    const res = await fetch('http://localhost:5000/api/admin/taxes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      loadTaxes();
      setForm({ userId: '', type: '', amount: '', dueDate: '' });
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Manage Taxes
      </h1>

      {/* 🔥 CREATE TAX FORM */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-xl font-semibold mb-4">
          Create Tax
        </h2>

        <select
          value={form.userId}
          onChange={(e) => setForm({ ...form, userId: e.target.value })}
          className="border p-2 mr-2"
        >
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>

        <input
          placeholder="Type (Property / Water)"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border p-2 mr-2"
        />

        <input
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="border p-2 mr-2"
        />

        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          className="border p-2 mr-2"
        />

        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create
        </button>

      </div>

      {/* 🔥 TAX LIST */}
      <div className="space-y-4">
        {taxes.map((t) => (
          <div key={t._id} className="bg-white p-4 rounded shadow">

            <p><b>User:</b> {t.userId?.name}</p>
            <p><b>Type:</b> {t.type}</p>
            <p><b>Amount:</b> ₹{t.amount}</p>
            <p><b>Status:</b> {t.status}</p>

          </div>
        ))}
      </div>

    </div>
  );
}