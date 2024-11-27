import React from "react";
import Container from "../container/Container";
import LogoutBtn from "./LogoutBtn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../logo/Logo";

function Header() {
  const userstatus = useSelector((state) => state.user.status);
  const navItem = [
    { label: "Home", path: "/", active: true },
    { label: "Login", path: "/login", active: !userstatus },
    { label: "SignUp", path: "/signup", active: !userstatus },
    { label: "AllPost", path: "/allpost", active: userstatus },
    { label: "AddPost", path: "/addpost", active: userstatus },
  ];
  return (
    <header className="sticky top-0 z-50 bg-gray-900 bg-[radial-gradient(#4B5563_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to={"/"} className="flex items-center">
              <Logo width="120px" />
            </Link>
          </div>
          <ul className="hidden md:flex items-center space-x-8">
            {navItem.map(
              (item) =>
                item.active && (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
            )}
          </ul>
          {userstatus && (
            <div className="ml-4">
              <LogoutBtn />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
