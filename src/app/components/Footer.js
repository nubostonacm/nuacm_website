import { FaLinkedin, FaInstagram, FaDiscord } from "react-icons/fa";

const Footer = () => {
    return (
      <footer className="bg-black text-white p-2 bottom-0 left-0 w-full z-10 shadow-md border-t border-celestial-blue">
        <div className="container mx-auto text-center">
          <p className="mb-2">Connect with us on:</p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.linkedin.com/company/neu-acm/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-tiffany-blue"
            >
              <FaLinkedin size={28} />
            </a>
            <a
              href="https://discord.gg/BU6yggFGFE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-tiffany-blue"
            >
              <FaDiscord size={28} />
            </a>
            <a
              href="https://www.instagram.com/northeasternacm/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-tiffany-blue"
            >
              <FaInstagram size={28} />
            </a>
          </div>
          <br></br>
          <div>
          <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdhdujd33N3DV40SqXa8NKmrvHJCS1CmIBOWGDmnjKR77eonA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-tiffany-blue"
            >
              Join our Newletter
            </a>
            </div>
          <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} ACM @ Northeastern</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  