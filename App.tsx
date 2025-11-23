import React from 'react';
import ThemeLayout from './components/ThemeLayout';
import InvestmentCalculatorTool from './components/InvestmentCalculatorTool';
import SeoArticle from './utils/SeoArticle';

const App: React.FC = () => {
  return (
    <ThemeLayout>
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <main className="w-full max-w-5xl py-8 md:py-12">
            <InvestmentCalculatorTool />
            <div className="mt-16 md:mt-24">
              <SeoArticle />
            </div>
          </main>
      </div>
    </ThemeLayout>
  );
};

export default App;