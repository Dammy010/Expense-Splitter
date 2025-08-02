import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditBill() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);
  const [form, setForm] = useState({
    description: '',
    amount: '',
    paidBy: '',
    participants: '',
  });

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:4000/api/bills/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const billData = res.data;
        setBill(billData);
        setForm({
          description: billData.description,
          amount: billData.amount,
          paidBy: billData.paidBy,
          participants: billData.participants.join(', '), 
        });
      } catch (err) {
        console.error('Failed to load bill', err);
      }
    };

    fetchBill();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:4000/api/bills/${id}`, {
        ...form,
        participants: form.participants.split(',').map((p) => p.trim()),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/dashboard'); 
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  if (!bill) return <p className="p-4">Loading...</p>;

  return (
    <form onSubmit={handleUpdate} className="max-w-xl mx-auto mt-10 space-y-4 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Edit Bill</h2>

      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        placeholder="Description"
      />
      <input
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        placeholder="Amount"
      />
      <input
        name="paidBy"
        value={form.paidBy}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        placeholder="Paid By"
      />
      <input
        name="participants"
        value={form.participants}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        placeholder="Participants (comma-separated)"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Update Bill
      </button>
    </form>
  );
}
