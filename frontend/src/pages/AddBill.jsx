import { useState } from 'react';
import axios from '../api/axios';

export default function AddBill() {
  const [form, setForm] = useState({ paidBy: '', amount: '', participants: '', description: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      amount: parseFloat(form.amount),
      participants: form.participants.split(',').map((p) => p.trim()),
    };
    try {
      await axios.post('/bills', payload);
      setMessage('✅ Bill added successfully!');
      setForm({ paidBy: '', amount: '', participants: '', description: '' });
    } catch (err) {
      setMessage('❌ Error adding bill. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Add a New Bill</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Paid By</label>
            <input
              name="paidBy"
              placeholder="e.g. Alice"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.paidBy}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Amount</label>
            <input
              name="amount"
              type="number"
              placeholder="e.g. 150.00"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Participants</label>
            <input
              name="participants"
              placeholder="e.g. Alice, Bob, Charlie"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.participants}
              onChange={handleChange}
              required
            />
            <p className="text-sm text-gray-500 mt-1">Comma-separated names</p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description <span className="text-gray-400">(Optional)</span></label>
            <input
              name="description"
              placeholder="e.g. Dinner at restaurant"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
            type="submit"
          >
            Add Bill
          </button>
          {message && (
            <p className="text-center text-sm mt-3 font-medium text-blue-600">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
