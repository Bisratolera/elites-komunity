// lists.js
import { FaJsSquare, FaPython, FaJava, FaCuttlefish } from 'react-icons/fa';
import { DiRuby } from 'react-icons/di';
import { FaCloud, FaLock, FaNetworkWired, FaKey, FaBug, FaMobile, FaWifi, FaMicrochip, FaUser, FaUserShield } from 'react-icons/fa';

export const carrierTypes = ["Developer", "Ethical Hacker", "Graphics Designer", "Other"];

export const programmingLanguages = [
  { code: "J", name: "JavaScript", icon: FaJsSquare },
  { code: "P", name: "Python", icon: FaPython },
  { code: "R", name: "Ruby", icon: DiRuby },
  { code: "Jv", name: "Java", icon: FaJava },
  { code: "C", name: "C", icon: FaCuttlefish }
  // Add more languages and their icons here
];

export const EthicalHackingTypes = [
  { code: "CSA", name: "Cloud Security Assessment", icon: FaCloud },
  { code: "VA", name: "Vulnerability Assessment", icon: FaUserShield },
  { code: "PT", name: "Penetration Testing", icon: FaLock },
  { code: "SE", name: "Social Engineering", icon: FaUser },
  { code: "NS", name: "Network Scanning", icon: FaNetworkWired },
  { code: "PC", name: "Password Cracking", icon: FaKey },
  { code: "WHA", name: "Web Application Hacking", icon: FaBug },
  { code: "MHA", name: "Mobile Application Hacking", icon: FaMobile },
  { code: "WH", name: "Wireless Hacking", icon: FaWifi },
  { code: "ISA", name: "IoT Security Assessment", icon: FaMicrochip }
];

// Generate users with their icons
export const users = [
  { username: "js1234-5678", name: "Henok", carrierType: "Developer", code: "J", icon: FaJsSquare },
  { username: "py2345-6789", name: "Leul", carrierType: "Developer", code: "P", icon: FaPython },
  { username: "rb3456-7890", name: "yohannes tz", carrierType: "Developer", code: "R", icon: DiRuby },
  { username: "java4567-8901", name: "David", carrierType: "Developer", code: "Jv", icon: FaJava },
  { username: "c5678-9012", name: "Eve", carrierType: "Developer", code: "C", icon: FaCuttlefish }
];

export const gitstats = [
  { user: "henaorth16" },
  { user: "bisratolera" },
  { user: "tseehay" },
  { user: "teoflos" },
  { user: "ezoltech" },
];

const motivations = [
  "Personal growth and development",
  "Problem-solving and innovation",
  // ... other motivations
];

const personalityTraits = [
  "Creative and imaginative",
  "Curious and inquisitive",
  // ... other personality traits
];

const frustrations = [
  "Lack of time",
  "Technical difficulties",
  // ... other frustrations
];

const favoriteBrands = [
  "Apple",
  "Google",
  // ... other favorite brands
];