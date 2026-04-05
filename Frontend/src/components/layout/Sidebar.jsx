import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaBars } from 'react-icons/fa';

const SidebarItem = ({ label, onClick }) => {
  return (
    <li
      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
      onClick={onClick}
    >
      {label}
    </li>
  );
};

SidebarItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const Sidebar = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-2 text-gray-800 bg-gray-200 rounded-full m-2"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-4 font-bold text-lg">Merchant</div>
        <ul className="mt-4 space-y-2">
          {items.map((item, index) => (
            <SidebarItem key={index} label={item.label} onClick={item.onClick} />
          ))}
        </ul>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ).isRequired,
};

export default Sidebar;