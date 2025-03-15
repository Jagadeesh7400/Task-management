/**
 * ZidioLogo component
 * 
 * @param {string} className - Optional class name for the SVG element
 * @returns {JSX.Element} The ZidioLogo SVG component
 */

import logo from "../../assets/logo.png";

export default function ZidioLogo({ className = "h-6 w-6" }) {
  return (
    <img
      src={logo}
      className={`${className} object-contain`}
      alt="Zidio Logo"
    />
  );
}