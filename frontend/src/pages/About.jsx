export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 py-16 px-4 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6">About Expense Splitter</h1>
        <p className="text-lg text-gray-700 mb-4">
          <span className="font-semibold">Expense Splitter</span> helps friends easily track and split bills
          without needing to create accounts or remember passwords. Simply input participants' names and the amount spent—
          and let the app calculate who owes whom!
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Whether you're managing a group dinner, a trip, or a shared subscription, this tool ensures transparency and makes settling up painless.
        </p>
        <p className="text-md text-gray-500 mt-8 italic">
          Built with ❤️ using the MERN stack. Your data is never saved or shared.
        </p>
      </div>
    </div>
  );
}
