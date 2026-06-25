import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-black sticky top-0 z-10 text-white flex items-center justify-between px-8 py-4 h-18">
      
        <Link to="/" className="text-red-400 text-2xl font-bold ">INDEX MOVIES</Link>
      
      <div>
        <Link to="/" className="text-xl m-2">HOME</Link>
        <Link to="/favorite" className="text-xl m-2">FAVORITE</Link>
      </div>
    </div>
  );
}

export default Navbar;
