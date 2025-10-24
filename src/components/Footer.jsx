const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} CineTrack. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
