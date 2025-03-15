/**
 * ZidioLogo component
 * 
 * @param {string} className - Optional class name for the SVG element
 * @returns {JSX.Element} The ZidioLogo SVG component
 */

export default function ZidioLogo({ className = "h-6 w-6" }) {
  return (
      <img
        src="./assets/vite.svg"
        className={className}
        width="200"
        height="200"
        alt="Zidio Logo"
      />

  );
}
