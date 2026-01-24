
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
    cardData: {
      handle: "@roshanbhadauriya",
         username:"Roshan Singh Bhadauriya",
      bio: "Software Engineer | Full Stack Developer | Tech Enthusiast",
     
    
      avatar: "https://pbs.twimg.com/profile_images/2012225306099060737/B7vYj5at_400x400.jpg", // Placeholder - might need to be replaced if broken
      banner: "https://pbs.twimg.com/profile_banners/937324647330209792/1705604544/1080x360", /// Example banner
    },
  },
  {
    name: "Github",
    href: "https://github.com/roshanbhadauriya",
    className: "bg-github",
    Icon: <FaGithub />,
    cardData: {
      handle: "@roshanbhadauriya",
         username:"Roshan Singh Bhadauriya",
      bio: "Building cool stuff | Open Source Contributor | React & Node.js",
      
      avatar: "https://avatars.githubusercontent.com/u/75900678?v=4",
      banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpqYDHVWBRF5Rwiw9B60cDAl8w_U2z6h1Zxg&s", // Example banner
    },
  },
  {
    name: "Twitter",
    
    href: "https://twitter.com/roshan_twi",
    className: "bg-twitter",
    Icon: <FaTwitter />,
    cardData: {
      handle: "@roshan_twi",
      username:"Roshan Singh Bhadauriya",
      bio: "Tweeting about Web Dev, Tech Trends, and my coding journey.",
    
      avatar: "https://pbs.twimg.com/profile_images/2012225306099060737/B7vYj5at_400x400.jpg", // Placeholder - might need to be replaced if broken
      banner: "https://pbs.twimg.com/profile_banners/937324647330209792/1705604544/1080x360", // Example banner
    },
  },
  {
    name: "Gmail",
    href: "mailto:roshanbhadoriya178@gmail.com",
    className: "bg-gmail",
    Icon: <FaEnvelope />,
    cardData: {
      handle: "roshanbhadoriya178",
      bio: "Reach out for collaborations, opportunities, or just to say hi!",
     
       avatar: "https://pbs.twimg.com/profile_images/2012225306099060737/B7vYj5at_400x400.jpg", // 
      banner: "https://pbs.twimg.com/profile_banners/1769399878233772032/1715438885/1500x500", // Example banner
      layout: "compact",
    },
  },
  {
    name: "Leetcode",
    href: "https://leetcode.com/Roshan_DSA/",
    className: "bg-leetcode",
    Icon: <SiLeetcode />,
    cardData: {
      handle: "@Roshan_DSA",
      bio: "Solving problems one algorithm at a time. Consistent Coder.",
      followers: "150+",
      following: "10",
       avatar: "https://pbs.twimg.com/profile_images/2012225306099060737/B7vYj5at_400x400.jpg", // / Leetcode default-ish
      banner: "https://pbs.twimg.com/profile_banners/1769399878233772032/1715438885/1500x500", // Example banner
      layout: "compact",
    },
  },
];
