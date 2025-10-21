import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProfitPatterns = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">ProfitPatterns App</h1>
          <div className="w-full h-[calc(100vh-12rem)] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://datadriven-ux.shinyapps.io/profitpatterns/"
              className="w-full h-full border-0"
              title="ProfitPatterns Shiny App"
              allow="fullscreen"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfitPatterns;
