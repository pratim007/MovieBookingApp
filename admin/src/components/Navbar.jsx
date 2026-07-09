import React, { useCallback, useEffect, useState } from 'react'
import { styles4 } from '../assets/dummyStyles'
import { Film, Ticket, List, Calendar } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ to, Icon, label }) => {
    const [open, setOpen] = useState(false);
const toggleOpen = useCallback(() => setOpen((v) => !v), []);
const close = useCallback(() => setOpen(false), []);

useEffect(() => {
  document.body.style.overflow = open ? "hidden" : "";
  const onKey = (e) => {
    if (e.key === "Escape") close();
  };
  window.addEventListener("keydown", onKey);
  return () => {
    window.removeEventListener("keydown", onKey);
    document.body.style.overflow = "";
  };
}, [open, close]);
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles4.navLinkBase} ${
          isActive ? styles4.navLinkActive : styles4.navLinkInactive
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={`${styles4.navLinkIconBase} ${
              isActive ? styles4.navLinkIconActive : styles4.navLinkIconInactive
            }`}
          />
          <span
            className={`${styles4.navLinkTextBase} ${
              isActive ? styles4.navLinkTextActive : styles4.navLinkTextInactive
            }`}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
};

const Navbar = () => {
  return (
    <nav className={styles4.navbar}>
      <div className={styles4.navbarContainer}>
        <div className={styles4.navbarFlex}>
          {/* logo */}
          <div className={styles4.logoContainer}>
            <div className={styles4.logoIcon}>
              <Film className={styles4.logoIconInner} />
            </div>
            <span className={styles4.logoText}>CINEVERSE</span>
          </div>
          {/* Desktop Links (unchanged look) */}
          <div className={styles4.desktopNav}>
            <NavItem to="/" Icon={Film} label="ADD MOVIES" />
            <NavItem to="/listmovies" Icon={List} label="LIST MOVIES" />
            {/* Dashboard */}
            <NavItem to="/dashboard" Icon={Calendar} label="DASHBOARD" />
            {/* Bookings (new) */}
            <NavItem to="/bookings" Icon={Ticket} label="BOOKINGS" />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
