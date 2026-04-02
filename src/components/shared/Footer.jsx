
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-4">
      {/* Constrain the content */}
      <div className="max-w-6xl mx-auto text-center px-4">
        <p>© {currentYear} Speedcubing Finland.</p>
      </div>
    </footer>
  );
}

export default Footer;
