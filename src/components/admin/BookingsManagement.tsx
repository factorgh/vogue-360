import { useState } from 'react';
import { Calendar, Check, Clock, Mail, Phone, Search, User, X } from 'lucide-react';

// Mock data for bookings
const initialBookings = [
  {
    id: 1,
    name: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '(555) 123-4567',
    date: '2023-07-15',
    time: '2:00 PM',
    message: 'Looking for styling advice for a wedding.',
    status: 'confirmed'
  },
  {
    id: 2,
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '(555) 987-6543',
    date: '2023-07-16',
    time: '11:00 AM',
    message: 'Need help updating my professional wardrobe.',
    status: 'confirmed'
  },
  {
    id: 3,
    name: 'Sophia Lee',
    email: 'sophia@example.com',
    phone: '(555) 456-7890',
    date: '2023-07-17',
    time: '4:00 PM',
    message: 'Interested in learning about sustainable fashion options.',
    status: 'pending'
  },
  {
    id: 4,
    name: 'James Johnson',
    email: 'james@example.com',
    phone: '(555) 234-5678',
    date: '2023-07-18',
    time: '1:00 PM',
    message: 'Looking for a complete wardrobe refresh.',
    status: 'confirmed'
  },
  {
    id: 5,
    name: 'Isabella Garcia',
    email: 'isabella@example.com',
    phone: '(555) 876-5432',
    date: '2023-07-19',
    time: '3:00 PM',
    message: 'Need styling for a photoshoot.',
    status: 'pending'
  }
];

export default function BookingsManagement() {
  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<typeof initialBookings[0] | null>(null);

  const handleStatusChange = (id: number, newStatus: 'confirmed' | 'pending' | 'cancelled') => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
    
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }
  };

  const handleDeleteBooking = (id: number) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(bookings.filter(booking => booking.id !== id));
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking(null);
      }
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter;
    const matchesSearch = 
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm);
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Bookings Management</h1>
      
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm transition-colors ${
              filter === 'all'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            All Bookings
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-4 py-2 text-sm transition-colors ${
              filter === 'confirmed'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 text-sm transition-colors ${
              filter === 'pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-4 py-2 text-sm transition-colors ${
              filter === 'cancelled'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Cancelled
          </button>
        </div>
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-black focus:outline-none"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      <div className="bg-white border shadow-sm rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Session Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr 
                  key={booking.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedBooking(booking)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                        <div className="text-sm text-gray-500">{booking.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(booking.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">{booking.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBooking(booking.id);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    No bookings found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Booking Details</h2>
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <User size={18} className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Client Name</p>
                    <p className="font-medium">{selectedBooking.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail size={18} className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p>{selectedBooking.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone size={18} className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p>{selectedBooking.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar size={18} className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Session Date</p>
                    <p>{new Date(selectedBooking.date).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock size={18} className="mt-1 mr-3 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Session Time</p>
                    <p>{selectedBooking.time}</p>
                  </div>
                </div>
                
                {selectedBooking.message && (
                  <div className="pt-2">
                    <p className="text-sm text-gray-500 mb-1">Additional Information</p>
                    <p className="bg-gray-50 p-3 rounded">{selectedBooking.message}</p>
                  </div>
                )}
                
                <div className="pt-2">
                  <p className="text-sm text-gray-500 mb-2">Status</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(selectedBooking.id, 'confirmed')}
                      className={`px-3 py-2 text-sm flex items-center ${
                        selectedBooking.status === 'confirmed'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <Check size={16} className="mr-1" />
                      Confirm
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedBooking.id, 'pending')}
                      className={`px-3 py-2 text-sm flex items-center ${
                        selectedBooking.status === 'pending'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedBooking.id, 'cancelled')}
                      className={`px-3 py-2 text-sm flex items-center ${
                        selectedBooking.status === 'cancelled'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <X size={16} className="mr-1" />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
