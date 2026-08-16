
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TheProblem from './components/TheProblem';
import ContactForm from './components/ContactForm';
import Pricing from './components/Pricing';
import Download from './components/GetStarted';
import Footer from './components/footer';

function App() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col">
      {/* Premium Header/Navigation */}
      <Navbar />

      {/* Main Page Layout containing Hero Section */}
      <main className="flex-1">
        <Hero />
        <TheProblem />
        <Pricing />
        <Download />
        <Footer />
      </main>
    </div>
  );
}

export default App;
