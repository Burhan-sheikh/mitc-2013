import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import MobileNav from '@components/layout/MobileNav';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-custom py-12">
        <h1 className="text-3xl font-bold mb-4">About Mateen IT Corp.</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mb-6">
          Based in Maisuma, Srinagar, MITC is Kashmir's premier store for laptops, computers, and business IT solutions. Since 2013, we have delivered the best devices for professionals, students, and businesses. Our mission: to make technology accessible, hassle-free, and future-ready for every customer.
        </p>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Our Team</h2>
          <ul className="flex flex-col gap-2">
            <li>Owner: Mateen Mohammad</li>
            <li>Lead Sales: Imran Shaikh</li>
            <li>Support: Zainab Wani</li>
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Business Hours</h2>
          <p className="mb-1">Monday - Saturday: 10:00 AM – 8:00 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
