import React from 'react';
import PropTypes from 'prop-types';

const Topbar = ({ shopName, onLogout }) => {
  return (
    <div className="w-full bg-gray-100 p-4 flex justify-between items-center shadow-md">
      <div className="text-lg font-bold">{shopName}</div>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

Topbar.propTypes = {
  shopName: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Topbar;