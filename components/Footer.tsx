import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-offblack text-white py-12 border-t border-gray-900">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <p className="text-2xl font-serif font-semibold tracking-tight">
            DEV<span className="text-gray-500">.</span>PORTFOLIO
          </p>
          <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">
            Excellence in Code & Design
          </p>
        </div>

        <div className="text-center md:text-right">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Desenvolvido com React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;