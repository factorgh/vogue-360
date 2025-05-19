import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  useEffect(() => {
    document.title = 'Vogue 360 - Exclusive Fashion & Styling';
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center bg-black text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80')] bg-cover bg-center opacity-50"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Redefine Your Style
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light">
              Exclusive collections and personalized styling sessions to elevate your fashion journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/gallery" className="btn-primary">
                Explore Collection
              </Link>
              <Link to="/booking" className="btn-outline text-white border-white">
                Book a Session
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-semibold mb-4">
              Featured Collection
            </motion.h2>
            <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-gray-600">
              Discover our latest arrivals, curated for those who appreciate timeless elegance with a contemporary twist.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, title: 'Autumn Essentials', image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80' },
              { id: 2, title: 'Evening Elegance', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80' },
              { id: 3, title: 'Urban Chic', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80' },
            ].map(item => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group relative overflow-hidden"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-medium">{item.title}</h3>
                    <Link to="/gallery" className="flex items-center mt-2 text-sm">
                      View Collection <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/gallery" className="btn-primary inline-flex items-center">
              View All Collections
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" 
                  alt="About Vogue 360" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute -bottom-5 -right-5 w-full h-full border-2 border-black z-0"></div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2022, Vogue 360 began with a singular vision: to create a space where fashion transcends clothing and becomes a form of self-expression and empowerment.
              </p>
              <p className="text-gray-600 mb-6">
                Our team of dedicated stylists and fashion experts curate pieces that not only follow trends but set them. We believe in sustainable practices, ethical sourcing, and the power of fashion to transform confidence.
              </p>
              <Link to="/booking" className="btn-primary inline-flex items-center">
                Book a Styling Session
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
