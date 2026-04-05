import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ children, sidebarItems, shopName, onLogout }) => {
  return (
    <div className="flex h-screen">
      <Sidebar items={sidebarItems} />
      <div className="flex-1 flex flex-col">
        <Topbar shopName={shopName} onLogout={onLogout} />
        <main className="flex-1 p-4 bg-gray-50 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  sidebarItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ).isRequired,
  shopName: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Layout;