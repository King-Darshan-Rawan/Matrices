import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";

export default function Navbar({ onBellClick }) {
  const [searchBy, setSearchBy] = useState("name");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setSearchBy((prev) => (prev === "name" ? "skill" : "name"));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 shadow-md bg-orange-500 dark:bg-orange-500">
      {/* Left: Logo & Language */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="text-xl font-bold text-white">
          Matrices
        </Link>
        <Select defaultValue="en">
          <SelectItem value="en">EN</SelectItem>
          <SelectItem value="hi">HI</SelectItem>
        </Select>
      </div>

      {/* Center: Search & Toggle */}
      <div className="flex items-center gap-2">
        <Input placeholder={`Search by ${searchBy}`} className="w-64" />
        <Button variant="outline" onClick={toggleSearch}>
          {searchBy === "name" ? "Switch to Skill" : "Switch to Name"}
        </Button>
      </div>

      {/* Right: Chats, Notification, Dark Mode, Profile */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="text-white">
          Chats
        </Button>

        <Button variant="ghost" onClick={onBellClick}>
          <Bell className="h-5 w-5 text-white" />
        </Button>

        <Button variant="ghost" onClick={toggleDarkMode}>
          {darkMode ? (
            <Sun className="h-5 w-5 text-white" />
          ) : (
            <Moon className="h-5 w-5 text-white" />
          )}
        </Button>

        <div className="relative group">
          <Button variant="ghost" className="text-white">
            Profile
          </Button>
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <ul className="p-2">
              <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 cursor-pointer" onClick={() => navigate("/profile")}>
                My Profile
              </li>
              <li className="hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 cursor-pointer" onClick={() => navigate("/settings")}>
                Settings
              </li>
              <li
                className="hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 cursor-pointer"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
