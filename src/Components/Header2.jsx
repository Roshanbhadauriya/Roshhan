import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";
import { socialHandles } from "../data/socials.jsx";
import logo from "/roshan_logo b.png";

export default function Header2() {
  const getSocialLink = (name) => {
    return socialHandles.find(s => s.name.toLowerCase() === name.toLowerCase())?.href || "#";
  }

  return (
    <nav className="flex items-center justify-between px-6 py-8 md:px-12 lg:px-24 w-full bg-brand-bg text-brand-text font-brand-sans border-b border-gray-100/50">
      <div className="flex items-center gap-3">
        <img 
          src={logo}
          alt="logo" 
          className="h-10"
        />
      </div>
      
      <div className="flex items-center gap-6 text-brand-accent">
        <a href={getSocialLink("twitter")} className="hover:text-brand-text transition-colors" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={18} />
        </a>
        <a href={getSocialLink("github")} className="hover:text-brand-text transition-colors" target="_blank" rel="noopener noreferrer">
          <FaGithub size={18} />
        </a>
        <a href={getSocialLink("linkedin")} className="hover:text-brand-text transition-colors" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={18} />
        </a>
      </div>
    </nav>
  );
}
