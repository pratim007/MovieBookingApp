import React ,{useEffect, useState} from 'react'
import { footerStyles } from '../assets/dummyStyles'
import { Clapperboard, Film, Star, Ticket, Popcorn, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
//import { Links } from 'react-router-dom';
const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [isVisible, setIsVisible] = useState(false);
    const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }; // for smooth scroll to top when clicking the button
  
  const links = [
    { label: "Home", href: "/" },
    { label: "Movies", href: "/movies" },
    { label: "Releases", href: "/releases" },
    { label: "Contact", href: "/contact" },
    { label: "Login", href: "/login" }
  ];
  
  const genreLinks = [
    { label: "Horror", href: "/movies" },
    { label: "Thriller", href: "/movies" },
    { label: "Action", href: "/movies" },
    { label: "Drama", href: "/movies" },
    { label: "Comedy", href: "/movies" },
  ];

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Array of icon components for the floating animation
  const floatingIcons = [Clapperboard, Film, Star, Ticket, Popcorn];
  return (
    <footer className={footerStyles.footer}>
        <div className={footerStyles.animatedBorder}>

        </div>
        <div className={footerStyles.bgContainer}>
        <div className={footerStyles.bgGlow1}></div>
        <div className={footerStyles.bgGlow2}></div>
     </div>
     {/* Floating icons - hidden on small devices to avoid overlap; still visible on md+ (tablet & desktop) */}
      <div className={footerStyles.floatingIconsContainer}>
        {[...Array(12)].map((_, i) => {
          const IconComponent = floatingIcons[i % floatingIcons.length];
          const left = (i * 23) % 100;
          const top = (i * 17) % 100;
          const dur = 6 + (i % 5);
          const delay = (i % 4) * 0.6;
          return (
            <div
              key={i}
              className={footerStyles.floatingIcon}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animation: `float ${dur}s infinite ease-in-out`,
                animationDelay: `${delay}s`
              }}
            >
              <IconComponent className="w-8 h-8" />
            </div>
          );
        })}
      </div>
      <div className={footerStyles.mainContrainer}>
        <div className={footerStyles.gridContainer}>
            <div className={footerStyles.brandContainer}>
                <div className={footerStyles.brandIconContainer}>
                    <div className="relative">
                        <div className={footerStyles.logoGlow}> </div>
                        <div className={footerStyles.logoIconContainer}>
                            <Clapperboard className={footerStyles.logoIcon} />
                        </div> 
                    </div>
                    <h2 className={footerStyles.brandTitle}>Cine <span className={footerStyles.brandTitleWhite}>Verse</span></h2>
                </div>
                
            </div>
            {/* Quick links */}
            <div>
            <h3 className={footerStyles.sectionHeader}>
                <div className={footerStyles.sectionDot}/>
                Explore
            </h3>
            <ul className={footerStyles.linksList}>
                {links.map((link) => (
                    <li key={link.label}>
                        <a href={link.href} className={footerStyles.linkItem}>
                            <span className={footerStyles.footerText}>{link.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
            </div>
            <div>
            <h3 className={footerStyles.sectionHeader}>
                <div className={footerStyles.sectionDot}/>
                Genres
            </h3>
           
            <ul className={footerStyles.linksList}>
                {genreLinks.map((link) => (
                    <li key={link.label} className={footerStyles.linkItemContainer}>
                        <a href={link.href} className={footerStyles.linkItem}>
                            <span className={footerStyles.footerText}>{link.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
            </div>
            {/* contact info */}
            <div>
                <div>
            <h3 className={footerStyles.sectionHeader}>
              <div className={footerStyles.sectionDot} />
              Contact Us
            </h3>
            <ul className={footerStyles.contactList}>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <Mail className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>contact@hexagonsservices.com</span>
              </li>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <Phone className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>+91 8299431275</span>
              </li>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <MapPin className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>Lucknow, India</span>
              </li>
            </ul>
          </div>
   
                </div>        
            </div>
        </div>
      <p className={footerStyles.footerText}>© 2026 CineBooking. All rights reserved.</p>
      {isVisible && (
        <button onClick={scrollToTop} className={footerStyles.scrollToTopButton}>
          <ArrowUp className={footerStyles.scrollToTopIcon} />
        </button>
      )}
      {!isVisible && (
        <button className={footerStyles.scrollToTopButtonHidden}>
          <ArrowUp className={footerStyles.scrollToTopIcon} />
        </button>
      )}
    
      <style>{footerStyles.customCSS}</style>
    </footer>
  )
}

export default Footer
