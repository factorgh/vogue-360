import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-3xl font-bold tracking-wider">
                <span>VOGUE</span>
                <span className="gold-gradient">360</span>
              </h2>
            </Link>
            <p className="text-gray-300 mb-6 font-light">
              Elevating fashion through exclusive collections and personalized styling sessions.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="hover:text-gray-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-gray-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-gray-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/booking" className="hover:text-white transition-colors">Booking</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Admin</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center">
                <Mail size={18} className="mr-2" />
                <span>contact@vogue360.com</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Vogue 360. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
