import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { IconBell, IconChevronDown } from "@tabler/icons-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    "Dashboard ",
    "Roster",
    "Communications",
    "CRM",
    "Contracts",
    "Settings",
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">#</span>
          <h1 className="text-lg font-semibold">
            ROSTER <span className="text-blue-600">GRID</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 text-gray-700">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className={`px-4 py-1 flex justify-center items-center rounded-full text-sm font-medium transition-all duration-200 ${
                item === "CRM"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "hover:text-blue-600"
              }`}>
              {item}
              <IconChevronDown size={18} />
            </a>
          ))}
        </nav>

        {/* Right Profile */}
        <div className="flex items-center gap-3">
          <IconBell size={18} />
          <span className="hidden sm:block font-medium text-gray-700">
            Michael
          </span>
          <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
            M
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-100 border-t flex flex-col items-start px-6 py-3 gap-3 text-gray-700 rounded-b-2xl">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className={`block w-full px-4 py-2 rounded-md font-medium ${
                item === "CRM"
                  ? "bg-blue-600 text-white"
                  : "hover:text-blue-600"
              }`}>
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
