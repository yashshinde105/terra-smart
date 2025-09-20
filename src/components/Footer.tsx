import { Link } from "react-router-dom";
import { Sprout, Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-white/10">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">AgriWatch AI</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Empowering sustainable farming through AI-powered precision agriculture 
              and advanced remote sensing technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/" 
                  className="text-primary-foreground/80 hover:text-white transition-smooth"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-primary-foreground/80 hover:text-white transition-smooth"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-primary-foreground/80 hover:text-white transition-smooth"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-primary-foreground/80 hover:text-white transition-smooth"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Crop Health Monitoring</li>
              <li>Soil Condition Tracking</li>
              <li>Pest Risk Prediction</li>
              <li>Spectral Imaging</li>
              <li>Climate Analysis</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">
                  123 AgriTech Lane<br />
                  Farm Valley, CA 94105
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">support@agriwatch.ai</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <a 
                href="#" 
                className="text-primary-foreground/60 hover:text-white transition-smooth"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/60 hover:text-white transition-smooth"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-primary-foreground/60 hover:text-white transition-smooth"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {currentYear} AgriWatch AI. All rights reserved. Built with precision agriculture in mind.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;