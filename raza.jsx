import React, { useState, useEffect, useRef } from 'react';
import { Phone, MapPin, Clock, Zap, Home, Fan, BatteryCharging, Wrench, Factory, Menu, X, MessageCircle, Star, User } from 'lucide-react';

// --- Electric Spark Effect Component (Optimized) ---
const ElectricSparkCursor = () => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const requestRef = useRef();

  useEffect(() => {
    // Disable on very small screens to save battery/performance
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const createSpark = (x, y) => {
      const sparkCount = 2; // Reduced count for better performance
      for (let i = 0; i < sparkCount; i++) {
        sparksRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 1.0,
          color: Math.random() > 0.5 ? '#FFD700' : '#00BFFF',
          path: [{x, y}]
        });
      }
    };

    const handleMouseMove = (e) => {
      createSpark(e.clientX, e.clientY);
    };

    // Use passive listener for better scroll performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < sparksRef.current.length; i++) {
        const spark = sparksRef.current[i];
        
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.life -= 0.05;
        
        spark.x += (Math.random() - 0.5) * 5;
        spark.y += (Math.random() - 0.5) * 5;

        spark.path.push({x: spark.x, y: spark.y});
        if (spark.path.length > 5) spark.path.shift();

        if (spark.life <= 0) {
          sparksRef.current.splice(i, 1);
          i--;
          continue;
        }

        ctx.beginPath();
        ctx.moveTo(spark.path[0].x, spark.path[0].y);
        for (let j = 1; j < spark.path.length; j++) {
          ctx.lineTo(spark.path[j].x, spark.path[j].y);
        }
        ctx.strokeStyle = spark.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = spark.color;
        ctx.stroke();
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 hidden md:block"
    />
  );
};

// --- Main App Component ---
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const phoneNumber = "+919771303958";
  // Sanitizing phone number for links (removing non-digits)
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const whatsappMessage = "Hello Raza Electricals, I need a service.";

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const services = [
    {
      icon: <Home className="w-8 h-8 text-yellow-500" />,
      title: "House Wiring",
      desc: "Complete home wiring, MCB box installation, and earthing."
    },
    {
      icon: <Fan className="w-8 h-8 text-yellow-500" />,
      title: "Fan & Lights",
      desc: "Ceiling fans, LED lights, chandeliers, and fancy fitting."
    },
    {
      icon: <BatteryCharging className="w-8 h-8 text-yellow-500" />,
      title: "Inverter & UPS",
      desc: "New inverter installation, battery maintenance, and connection."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Emergency Repair",
      desc: "24/7 support for short circuits, fuse failures, and power cuts."
    },
    {
      icon: <Factory className="w-8 h-8 text-yellow-500" />,
      title: "Commercial Work",
      desc: "Office cabling, shop lighting, and heavy load management."
    },
    {
      icon: <Wrench className="w-8 h-8 text-yellow-500" />,
      title: "Appliance Setup",
      desc: "Geyser, AC point, motor starter, and switchboard repairs."
    }
  ];

  const reviews = [
    {
      name: "Rahul Kumar",
      location: "Kankarbagh",
      rating: 5,
      comment: "Raza bhai ka kaam bahut accha hai. Time par aaye aur fan wiring fix kar di."
    },
    {
      name: "Suman Singh",
      location: "Patna City",
      rating: 5,
      comment: "Professional electrician. Inverter setup was done very neatly. Highly recommended!"
    },
    {
      name: "Amit Verma",
      location: "Danapur",
      rating: 4,
      comment: "Good service at affordable rates. Kaam jaldi aur safai se kiya."
    }
  ];

  return (
    <div className="font-sans text-gray-800 relative bg-gray-50 min-h-screen">
      <ElectricSparkCursor />

      {/* Top Brand Bar */}
      <div className="bg-yellow-500 py-3 px-4 text-center shadow-sm relative z-20">
        <h1 className="text-2xl md:text-3xl font-extrabold text-black uppercase tracking-wider">
          Raza Electrical Services
        </h1>
        <p className="text-xs md:text-sm font-semibold text-gray-900 mt-1">
          Safety • Quality • Trust
        </p>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-900 text-white sticky top-0 z-40 shadow-lg border-b border-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
              <div className="bg-yellow-500 p-1.5 rounded-full mr-2">
                <Zap className="h-5 w-5 text-black" fill="black" />
              </div>
              <span className="font-bold text-xl tracking-tight">RES</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['Home', 'Services', 'Reviews', 'About', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="hover:text-yellow-400 hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-md focus:outline-none"
                aria-label="Open menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['Home', 'Services', 'Reviews', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-300 hover:text-yellow-400 hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-white py-16 md:py-24 px-4 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block p-2 px-4 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold mb-6 animate-bounce">
            ⚡ Fast & Reliable Service
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Electrical Problems? <br />
            <span className="text-yellow-500">Consider it Fixed!</span>
          </h2>
          <p className="text-gray-600 mb-10 text-lg md:text-xl max-w-2xl mx-auto">
            Professional wiring, repairs, and installation services for your home and office. 
            One call does it all.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href={`tel:${phoneNumber}`}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2 text-lg"
              aria-label="Call Now"
            >
              <Phone className="w-5 h-5" fill="currentColor" /> Call Now
            </a>
            <a 
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2 text-lg"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" fill="currentColor" /> WhatsApp
            </a>
          </div>
        </div>
        
        {/* Background decorative element */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <Zap className="absolute top-20 left-10 w-40 h-40 text-yellow-500 rotate-12" />
           <Zap className="absolute bottom-20 right-10 w-60 h-60 text-yellow-500 -rotate-12" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 inline-block relative">
              Our Services
              <div className="h-1 w-24 bg-yellow-500 absolute -bottom-4 left-1/2 transform -translate-x-1/2 rounded-full"></div>
            </h2>
            <p className="mt-6 text-gray-600">We provide a wide range of electrical solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border-t-4 border-yellow-500 group transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 inline-block relative">
              Customer Reviews
              <div className="h-1 w-24 bg-yellow-500 absolute -bottom-4 left-1/2 transform -translate-x-1/2 rounded-full"></div>
            </h2>
            <p className="mt-6 text-gray-600">See what our happy customers say about us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-3 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{review.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-200 p-2 rounded-full">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                    <p className="text-xs text-gray-500">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900 text-white px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400">Why Choose Raza Electricals?</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Raza Electrical Services has been serving the community for over <span className="font-bold text-white">10 years</span>. 
            We believe in honest pricing and high-quality work. Our technicians are experienced and follow strict safety protocols.
            From small repairs to full building contracts, we handle everything with care.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-2xl font-bold text-yellow-500">10+</h3>
              <p className="text-sm text-gray-400">Years Exp</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-2xl font-bold text-yellow-500">500+</h3>
              <p className="text-sm text-gray-400">Happy Clients</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-2xl font-bold text-yellow-500">24/7</h3>
              <p className="text-sm text-gray-400">Support</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-2xl font-bold text-yellow-500">100%</h3>
              <p className="text-sm text-gray-400">Safety</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 opacity-5 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      </section>

      {/* Contact / Footer Section */}
      <footer id="contact" className="bg-black text-white pt-16 pb-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-yellow-500 mb-4">Raza Electricals</h3>
              <p className="text-gray-400 text-sm">
                Your trusted partner for all electrical needs. Safe, Fast, and Affordable.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 p-2 rounded-full">
                  <Phone className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Call Us</p>
                  <a href={`tel:${phoneNumber}`} className="text-lg font-bold hover:text-yellow-400 transition-colors">
                    {phoneNumber}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 p-2 rounded-full">
                  <MapPin className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Location</p>
                  <p className="text-lg font-bold">Patna, Bihar</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 p-2 rounded-full">
                  <Clock className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Hours</p>
                  <p className="text-lg font-bold">Mon - Sat: 9am - 8pm</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Raza Electrical Services. All Rights Reserved.</p>
            <p className="mt-2 md:mt-0">Designed for Excellence ⚡</p>
          </div>
        </div>
      </footer>
    </div>
  );
}