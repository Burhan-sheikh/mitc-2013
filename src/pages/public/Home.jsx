import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import MobileNav from '@components/layout/MobileNav';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-custom py-12">
        <motion.section initial={{opacity:0, y:24}} animate={{opacity:1, y:0}} transition={{duration:0.3}} className="text-center">
          <h1 className="text-gradient text-4xl md:text-5xl font-bold mb-4">Premium Laptop & Computer Store</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Shop the best laptops, computers & accessories in Srinagar. Curated for business, gaming, & professionals. <br/>
            <span className="font-semibold text-primary-600 dark:text-primary-400">Mateen IT Corp.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="/products" className="btn btn-primary text-lg w-full sm:w-auto">Browse Products</a>
            <a href="/contact" className="btn btn-secondary text-lg w-full sm:w-auto">Contact Us</a>
          </div>
        </motion.section>
        {/* ... (Featured, Stats, Reviews, Newsletter sections can be implemented here) ... */}
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
