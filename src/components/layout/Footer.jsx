import { Link } from 'react-router-dom';
import { ShoppingBag, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Products', href: '/products' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
  ];

  return (
    <footer className="glass-card mt-20 border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">MITC Store</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Your trusted partner for premium laptops and computers in Srinagar. 
              Quality products, expert service, competitive prices.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Maisuma, Srinagar, Kashmir</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>info@mitcstore.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass-card hover:scale-110 transition-transform"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            
            {/* Business Hours */}
            <div className="mt-6">
              <h4 className="font-medium mb-2 text-sm">Business Hours</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mon - Sat: 10:00 AM - 8:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Mateen IT Corp. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
