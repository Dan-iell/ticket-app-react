import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("ticketapp_session"));
    if (!session) {
      toast.error("Your session has expired — please log in again.");
      navigate("/auth/login");
      return;
    }

    setUser(session);
    const storedTickets =
      JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];
    setTickets(storedTickets);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/"), 1000);
  };

  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "open").length;
  const resolvedTickets = tickets.filter((t) => t.status === "closed").length;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Toaster />
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center p-6">
          <h1 className="text-2xl font-bold text-blue-700">
            🎟️ TicketApp Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <Link
              to="/tickets"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Manage Tickets
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="flex-1 flex flex-col items-center justify-start py-12 px-6">
        <div className="max-w-[1440px] w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Welcome, {user?.name || "User"} 👋
          </h2>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-xl p-6 border-t-4 border-blue-600 text-center">
              <h3 className="text-xl font-semibold text-gray-700">
                Total Tickets
              </h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {totalTickets}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 border-t-4 border-green-500 text-center">
              <h3 className="text-xl font-semibold text-gray-700">
                Open Tickets
              </h3>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {openTickets}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 border-t-4 border-gray-500 text-center">
              <h3 className="text-xl font-semibold text-gray-700">
                Resolved Tickets
              </h3>
              <p className="text-3xl font-bold text-gray-700 mt-2">
                {resolvedTickets}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-4 mt-12">
        <p>© {new Date().getFullYear()} TicketApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
