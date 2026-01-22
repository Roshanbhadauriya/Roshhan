
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

export const socialHandles = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/roshanbhadauriya/",
    className: "bg-linkedin",
    Icon: <FaLinkedin />,
  },
  {
    name: "Github",
    href: "https://github.com/roshanbhadauriya",
    className: "bg-github",
    Icon: <FaGithub />,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/roshan_twi",
    className: "bg-twitter",
    Icon: <FaTwitter />,
  },
  {
    name: "Gmail",
    href: "mailto:roshanbhadoriya178@gmail.com",
    className: "bg-gmail",
    Icon: <FaEnvelope />,
  },
  {
    name: "Leetcode",
    href: "https://leetcode.com/Roshan_DSA/",
    className: "bg-leetcode",
    Icon: <SiLeetcode />,
  },
];
