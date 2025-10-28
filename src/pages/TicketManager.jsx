import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function TicketManager() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    status: "open",
  });

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("ticketapp_session"));
    if (!session) {
      toast.error("Unauthorized — please log in again.");
      navigate("/auth/login");
      return;
    }
    const stored = JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];
    setTickets(stored);
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ id: null, title: "", description: "", status: "open" });
  };

  const saveTickets = (updated) => {
    localStorage.setItem("ticketapp_tickets", JSON.stringify(updated));
    setTickets(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Title is required.");
      return;
    }

    if (!["open", "in_progress", "closed"].includes(formData.status)) {
      toast.error("Invalid status value.");
      return;
    }

    if (formData.id) {
      // Update
      const updated = tickets.map((t) =>
        t.id === formData.id ? { ...formData } : t
      );
      saveTickets(updated);
      toast.success("Ticket updated successfully!");
    } else {
      // Create
      const newTicket = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      saveTickets([...tickets, newTicket]);
      toast.success("Ticket created!");
    }
    resetForm();
  };

  const handleEdit = (ticket) => {
    setFormData(ticket);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      const updated = tickets.filter((t) => t.id !== id);
      saveTickets(updated);
      toast.success("Ticket deleted!");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-700";
      case "in_progress":
        return "bg-amber-100 text-amber-700";
      case "closed":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <Toaster />
      <header className="max-w-[1440px] mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">🎟️ Ticket Manager</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          ← Back to Dashboard
        </button>
      </header>

      <main className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-8">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold">
            {formData.id ? "Edit Ticket" : "Create Ticket"}
          </h2>

          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full border p-2 rounded-md"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description (optional)"
            className="w-full border p-2 rounded-md"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <select
            name="status"
            className="w-full border p-2 rounded-md"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              {formData.id ? "Update" : "Create"}
            </button>
            {formData.id && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Ticket List */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Tickets</h2>
          {tickets.length === 0 ? (
            <p className="text-gray-500 text-center">No tickets yet.</p>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{ticket.title}</h3>
                    <span
                      className={`text-sm px-2 py-1 rounded-full font-medium ${getStatusColor(
                        ticket.status
                      )}`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  {ticket.description && (
                    <p className="text-gray-600 mt-2">{ticket.description}</p>
                  )}
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      onClick={() => handleEdit(ticket)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ticket.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-4 mt-12">
        <p>© {new Date().getFullYear()} TicketApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
