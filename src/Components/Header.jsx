
import { useState, useEffect, useRef } from "react";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import logo from "/roshan_logo b.png";

const Header = () => {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;

      if (window.scrollY > 50) {
        headerRef.current.classList.add("bg-white", "shadow-md");
        headerRef.current.classList.remove("bg-transparent");
      } else {
        headerRef.current.classList.remove("bg-white", "shadow-md");
        headerRef.current.classList.add("bg-transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={headerRef}
      className="sticky bg-white top-0 z-50 h-20 flex items-center justify-between px-20 py-4 transition-all duration-300 max-[600px]:px-2"
    >
      {/* Logo */}
      <div>
        <img src={logo} alt="logo" className="h-14" />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden gap-6 text-lg md:flex">
        <li className="cursor-pointer">Work Experience</li>
        <li className="cursor-pointer">Projects</li>
        <li className="cursor-pointer">Skills</li>
        <li className="cursor-pointer">Blogs</li>
      </ul>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        {!open ? (
          <HamburgerMenuIcon
            className="h-8 w-8 cursor-pointer"
            onClick={() => setOpen(true)}
          />
        ) : (
          <Cross1Icon
            className="h-8 w-8 cursor-pointer"
            onClick={() => setOpen(false)}
          />
        )}
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`absolute left-0 top-full w-full overflow-hidden bg-white transition-all duration-500 md:hidden ${
          open ? "max-h-screen py-6" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-5 text-lg">
          <li onClick={() => setOpen(false)}>Work Experience</li>
          <li onClick={() => setOpen(false)}>Projects</li>
          <li onClick={() => setOpen(false)}>Skills</li>
          <li onClick={() => setOpen(false)}>Blogs</li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
