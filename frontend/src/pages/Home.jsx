import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const isLoggedIn = localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 text-gray-800">
      <div className="flex items-center justify-center py-20 px-4">
        <motion.div
          className="bg-white p-10 rounded-xl shadow-md text-center max-w-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Welcome to Expense Splitter
          </h1>
          <p className="text-gray-700 mb-6">
            Effortlessly split bills with friends by name. Track who owes what and settle debts with ease.
          </p>

          {isLoggedIn ? (
            <Link
              to="/add-bill"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Add a Bill
            </Link>
          ) : (
            <div className="space-x-4">
              <Link
                to="/signup"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Login
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold text-blue-600 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {['Add Bill', 'Auto-Split', 'Track & Settle'].map((title, index) => (
              <motion.div
                key={index}
                className="p-6 border rounded shadow hover:shadow-md transition"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-2">{`${index + 1}. ${title}`}</h3>
                <p>
                  {title === 'Add Bill'
                    ? 'Enter the total amount, payer name, and participants involved.'
                    : title === 'Auto-Split'
                    ? 'We automatically calculate who owes what—no math needed!'
                    : 'View share balances and settle up directly through the app.'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold text-blue-600 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Features
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              ['No Signup Required', 'Just enter your name and start splitting expenses instantly.'],
              ['Name-Based Sharing', 'Split by names instead of emails for faster, simpler use.'],
              ['Clear Summary', 'Know exactly who owes whom at a glance.'],
              ['Mobile Friendly', 'Optimized for smooth use on any device.'],
              ['Secure Data', 'All your bills and shares are safely stored in the cloud.'],
              ['One-Click Settle', 'Settle debts with ease in a single action.'],
            ].map(([title, desc], index) => (
              <motion.div
                key={title}
                className="p-6 rounded border bg-white shadow hover:shadow-md"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
