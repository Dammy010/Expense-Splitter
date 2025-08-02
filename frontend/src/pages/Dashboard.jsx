import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [bills, setBills] = useState([]);
  const [shares, setShares] = useState(null);
  const [loadingBills, setLoadingBills] = useState(true);
  const [loadingShares, setLoadingShares] = useState(true);
  const [errorBills, setErrorBills] = useState("");
  const [errorShares, setErrorShares] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!user || !token) {
      navigate("/login");
      return;
    }

    const fetchBills = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/bills", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBills(res.data || []);
      } catch (err) {
        console.error("Failed to fetch bills:", err);
        setErrorBills("Failed to load bills. Please try again.");
      } finally {
        setLoadingBills(false);
      }
    };

    const fetchShares = async () => {
      try {
        const userName = user.name.trim();
        const res = await axios.get(`http://localhost:4000/api/shares/view/${userName}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setShares(res.data);
      } catch (err) {
        console.error("Failed to fetch shares:", err);
        setErrorShares("Failed to load shares. Please try again.");
      } finally {
        setLoadingShares(false);
      }
    };

    fetchBills();
    fetchShares();
  }, [user, navigate]);

  if (!user) return null;

  const handleSettle = () => {
    navigate("/settle");
  };

  const handleViewAllBills = () => {
    navigate("/bills");
  };

  const handleEdit = (billId) => {
    navigate(`/edit-bill/${billId}`);
  };

  const handleDelete = async (billId) => {
    const token = localStorage.getItem("token");
    const confirmed = window.confirm("Are you sure you want to delete this bill?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:4000/api/bills/${billId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBills((prev) => prev.filter((b) => b._id !== billId));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete bill. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-700">Welcome, {user.name}</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="bg-white rounded-xl shadow-md border border-gray-200 p-6 overflow-y-auto max-h-[75vh]">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Your Bills</h2>
            {loadingBills && <p className="text-blue-500 animate-pulse">Loading bills...</p>}
            {errorBills && <p className="text-red-500">{errorBills}</p>}
            {!loadingBills && bills.length === 0 && <p className="text-gray-500 italic">No bills found.</p>}
            {!loadingBills && bills.length > 0 && (
              <>
                <ul className="space-y-4">
                  {bills.slice(0, 3).map((bill) => (
                    <li
                      key={bill._id}
                      className="bg-gray-50 border border-gray-300 rounded-md p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">
                            {bill.description || "No description"}
                          </h3>
                          <p><strong>Amount:</strong> ${Number(bill.amount).toFixed(2)}</p>
                          <p><strong>Paid by:</strong> {bill.paidBy}</p>
                          <p><strong>Participants:</strong> {bill.participants.join(", ")}</p>
                          <p className="text-sm text-gray-500">
                            <strong>Date:</strong> {new Date(bill.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right space-y-2 ml-4 flex-shrink-0">
                          <button
                            onClick={() => handleEdit(bill._id)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(bill._id)}
                            className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {bills.length > 3 && (
                  <div className="mt-4 text-right">
                    <button
                      onClick={handleViewAllBills}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                    >
                      View All Bills
                    </button>
                  </div>
                )}
              </>
            )}
          </section>

          <section className="bg-white rounded-xl shadow-md border border-gray-200 p-6 overflow-y-auto max-h-[75vh]">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Your Shares</h2>
            {loadingShares && <p className="text-blue-500 animate-pulse">Loading shares...</p>}
            {errorShares && <p className="text-red-500">{errorShares}</p>}
            {!loadingShares && shares && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">You Owe</h3>
                  {shares.youOwe.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-700 space-y-1 max-h-56 overflow-auto">
                      {shares.youOwe.map((r, i) => (
                        <li key={i}>
                          Owe <strong>{r.to}</strong>: ${r.amount.toFixed(2)}{" "}
                          <span className="text-sm text-gray-500">
                            (since {new Date(r.createdAt).toLocaleDateString()})
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">You owe nothing.</p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Owed To You</h3>
                  {shares.owedToYou.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-700 space-y-1 max-h-56 overflow-auto">
                      {shares.owedToYou.map((r, i) => (
                        <li key={i}>
                          <strong>{r.from}</strong> owes you: ${r.amount.toFixed(2)}{" "}
                          <span className="text-sm text-gray-500">
                            (since {new Date(r.createdAt).toLocaleDateString()})
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">Nobody owes you anything.</p>
                  )}
                </div>
              </div>
            )}
          </section>

          <section className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-purple-600 mb-4">Settle</h2>
              <p className="text-gray-700 mb-6">
                Want to settle your balances? Click below to begin the process.
              </p>
            </div>
            <button
              onClick={handleSettle}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-300"
            >
              Settle Now
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
