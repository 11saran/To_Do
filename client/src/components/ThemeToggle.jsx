// import React from "react";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "../contexts/ThemeContext";

// export const ThemeToggle = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     <button
//       onClick={toggleTheme}
//       className="relative p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-200 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-lg hover:shadow-xl transform hover:scale-105"
//       aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
//     >
//       <div className="relative">
//         {theme === "light" ? (
//           <Moon className="w-5 h-5 transition-transform duration-300 rotate-0" />
//         ) : (
//           <Sun className="w-5 h-5 transition-transform duration-300 rotate-180" />
//         )}
//       </div>
//     </button>
//   );
// };
