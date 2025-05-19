import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, House, Image, LogOut, Menu, X } from "lucide-react";

import BookingsManagement from "../components/admin/BookingsManagement";
import GalleryManagement from "../components/admin/GalleryManagement";
import NotFoundPage from "./NotFoundPage";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = "Admin Dashboard | Vogue 360";

    // Check if admin is logged in
    const isAdminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (!isAdminLoggedIn) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin");
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden p-4 flex justify-between items-center bg-white border-b">
        <div className="font-semibold">
          <span>VOGUE</span>
          <span className="gold-gradient">360</span>
          <span className="ml-2 text-sm text-gray-500">Admin</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-10"
          onClick={closeSidebar}
        />
      )}

      <div className="flex h-[calc(100vh-56px)] lg:h-screen">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-0 h-full bg-white shadow-sm z-20 w-64 transform transition-transform duration-300 ease-in-out
            ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0
          `}
        >
          <div className="h-full flex flex-col">
            <div className="p-6 border-b hidden lg:block">
              <div className="font-semibold text-xl">
                <span>VOGUE</span>
                <span className="gold-gradient">360</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">Admin Dashboard</div>
            </div>

            <nav className="flex-grow py-6">
              <div className="px-6 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Menu
              </div>
              <ul>
                <li>
                  <Link
                    to="/admin/dashboard"
                    onClick={closeSidebar}
                    className={`flex items-center px-6 py-3 text-sm ${
                      location.pathname === "/admin/dashboard"
                        ? "bg-gray-100 font-medium"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <House size={18} className="mr-3" />
                    Dashboard House
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/dashboard/bookings"
                    onClick={closeSidebar}
                    className={`flex items-center px-6 py-3 text-sm ${
                      location.pathname.includes("/bookings")
                        ? "bg-gray-100 font-medium"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <Calendar size={18} className="mr-3" />
                    Manage Bookings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/dashboard/gallery"
                    onClick={closeSidebar}
                    className={`flex items-center px-6 py-3 text-sm ${
                      location.pathname.includes("/gallery")
                        ? "bg-gray-100 font-medium"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <Image size={18} className="mr-3" />
                    Manage Gallery
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="p-6 border-t">
              <button
                onClick={handleLogout}
                className="flex items-center text-red-600 text-sm"
              >
                <LogOut size={18} className="mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6"
          >
            <Routes>
              <Route index element={<AdminHome />} />
              <Route path="bookings" element={<BookingsManagement />} />
              <Route path="gallery" element={<GalleryManagement />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function AdminHome() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 shadow-sm border rounded-sm">
          <h3 className="text-lg font-medium mb-1">Total Bookings</h3>
          <p className="text-3xl font-semibold">24</p>
          <p className="text-sm text-green-600 mt-2">+12% from last month</p>
        </div>

        <div className="bg-white p-6 shadow-sm border rounded-sm">
          <h3 className="text-lg font-medium mb-1">Gallery Items</h3>
          <p className="text-3xl font-semibold">48</p>
          <p className="text-sm text-green-600 mt-2">+4 new items this week</p>
        </div>

        <div className="bg-white p-6 shadow-sm border rounded-sm">
          <h3 className="text-lg font-medium mb-1">Upcoming Sessions</h3>
          <p className="text-3xl font-semibold">8</p>
          <p className="text-sm text-gray-500 mt-2">
            Next: Tomorrow at 10:00 AM
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow-sm border rounded-sm">
          <h2 className="text-lg font-medium mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {[
              { name: "Emma Wilson", date: "July 15, 2023", time: "2:00 PM" },
              {
                name: "Michael Brown",
                date: "July 16, 2023",
                time: "11:00 AM",
              },
              { name: "Sophia Lee", date: "July 17, 2023", time: "4:00 PM" },
            ].map((booking, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <div>
                  <p className="font-medium">{booking.name}</p>
                  <p className="text-sm text-gray-500">
                    {booking.date} at {booking.time}
                  </p>
                </div>
                <Link
                  to="/admin/dashboard/bookings"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link
              to="/admin/dashboard/bookings"
              className="text-sm text-blue-600 hover:underline"
            >
              View all bookings
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 shadow-sm border rounded-sm">
          <h2 className="text-lg font-medium mb-4">Recent Gallery Updates</h2>
          <div className="space-y-4">
            {[
              { name: "Summer Collection", date: "July 10, 2023", items: 12 },
              { name: "Autumn Essentials", date: "July 5, 2023", items: 8 },
              { name: "Winter Preview", date: "June 28, 2023", items: 15 },
            ].map((collection, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <div>
                  <p className="font-medium">{collection.name}</p>
                  <p className="text-sm text-gray-500">
                    Added on {collection.date} • {collection.items} items
                  </p>
                </div>
                <Link
                  to="/admin/dashboard/gallery"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link
              to="/admin/dashboard/gallery"
              className="text-sm text-blue-600 hover:underline"
            >
              Manage gallery
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
