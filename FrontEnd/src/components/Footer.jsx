import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-center py-4 border-t border-gray-300 dark:border-gray-700 mt-auto">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} MentorMinds. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
