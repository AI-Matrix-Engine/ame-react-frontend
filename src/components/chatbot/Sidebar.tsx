import React from "react";
import { BiPlus, BiUser, BiSolidUserCircle } from "react-icons/bi";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className={`w-64 bg-gray-900 p-4 text-white h-full z-10 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between flex-col">
        <div className="flex items-center justify-center cursor-pointer border p-2  border-gray-600">
          <BiPlus size={24} />
          <button>New Chat</button>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div>
            Chat Number 1
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;