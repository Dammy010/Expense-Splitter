import { useState } from 'react';
import axios from '../api/axios';

export default function ViewShares() {
  const [name, setName] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.get(`/shares/view/${name}`);
      setResult(data);
    } catch (err) {
      setResult(null);
      setError('No shares found for that name.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">View Your Shares</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            type="submit"
          >
            Check
          </button>
        </form>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        {result && (
          <div className="mt-6 text-left">
            <h3 className="font-bold text-lg mb-2 text-blue-600">You Owe:</h3>
            {result.youOwe.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {result.youOwe.map((r, i) => (
                  <li key={i}>
                    <span className="font-medium">{r.to}</span>: ${r.amount.toFixed(2)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">You owe nothing.</p>
            )}

            <h3 className="font-bold text-lg mt-6 mb-2 text-green-600">Owed To You:</h3>
            {result.owedToYou.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {result.owedToYou.map((r, i) => (
                  <li key={i}>
                    <span className="font-medium">{r.from}</span>: ${r.amount.toFixed(2)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Nobody owes you anything.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
