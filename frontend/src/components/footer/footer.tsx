import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Logo or Brand Name */}
        <div className="footer-brand">
          <h2>RecipePlanner</h2>
          <p>Your partner for planning delicious meals</p>
        </div>

        {/* Contact Section */}
        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Email: support@recipePlanner.com</p>
        </div>

        {/* Social Media Section */}
        <div className="footer-social">
          <h3>Follow us:</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
            >
              <FontAwesomeIcon icon={faPinterest} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} RecipePlanner. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
