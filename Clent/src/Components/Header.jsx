import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome, FaMoneyBill, FaChartLine, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { id: 1, name: "Home", icon: <FaHome />, path: "/" },
  { id: 2, name: "Transactions", icon: <FaMoneyBill />, path: "/user-transactions" },
  { id: 3, name: "Budget", icon: <FaMoneyBill />, path: "/user-budget" },
  { id: 4, name: "Expenditure", icon: <FaChartLine />, path: "/user-expenditure" },
  { id: 5, name: "Settings", icon: <FaCog />, path: "/user-settings" },
];

const Header = () => {
  const [activeItem, setActiveItem] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (itemName, path) => {
    setActiveItem(itemName);
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div>
      <div className="flex items-center gap-3 p-4">
        <GiHamburgerMenu
          className="text-3xl m-4 cursor-pointer"
          onClick={toggleMenu}
        />
        <h1 className="text-xl font-medium">Balanzio</h1>
      </div>

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-5 transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 z-50`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Balanzio</h1>
        </div>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`flex items-center gap-4 p-3 mb-3 rounded-lg cursor-pointer transition-all duration-300 ${
                activeItem === item.name
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleItemClick(item.name, item.path)}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default Header;
