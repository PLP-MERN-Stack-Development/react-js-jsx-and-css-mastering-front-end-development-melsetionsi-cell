// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-center p-4 mt-10">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} React App. All rights reserved.
      </p>
    </footer>
  );
}
