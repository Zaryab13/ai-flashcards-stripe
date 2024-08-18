const Footer = () => {
  return (
    <footer className=" py-6 mt-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center md:items-start md:flex-row md:justify-center">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center md:text-left">
            <a
              href="#"
              className="text-sky-500 hover:text-black transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sky-500 hover:text-black transition-colors"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-sky-500 hover:text-black transition-colors"
            >
              Terms of Services
            </a>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} MadeEasy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
