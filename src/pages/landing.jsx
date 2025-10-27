export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-500 text-white text-center">
      <h1 className="text-4xl font-bold mb-4">Ticket App</h1>
      <p className="mb-8">Manage your tickets efficiently with ease.</p>
      <div className="flex gap-4">
        <button className="bg-white text-blue-600 px-6 py-2 rounded shadow hover:bg-gray-100 transition">
          Login
        </button>
        <button className="bg-gray-900 text-white px-6 py-2 rounded shadow hover:bg-gray-800 transition">
          Get Started
        </button>
      </div>
    </div>
  );
}
