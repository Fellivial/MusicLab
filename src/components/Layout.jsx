import React from 'react';
import Footer from './Footer';
import { ReusableNav } from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="layout-container w-full min-h-screen flex flex-col bg-white overflow-auto">
      <ReusableNav />
      <div className="w-full min-h-screen">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

const LayoutSec = ({ children }) => {
  return (
    <div className="layout-container w-full min-h-screen flex flex-col bg-white overflow-auto">
      <div className="w-full min-h-screen">
        {children}
      </div>
    </div>
  );
};

export { Layout, LayoutSec };
