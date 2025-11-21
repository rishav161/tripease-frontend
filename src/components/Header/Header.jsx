import React, { useRef, useEffect, useContext, useState } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/images/logo.png";
import "./header.css";

const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, dispatch } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  // Check if current page is login or register
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setShowDropdown(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const stickyHeaderFunc = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 80) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    };

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("scroll", stickyHeaderFunc);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>

            {/* menu start - only show when logged in */}
            {user && (
              <div className="navigation">
                <ul className="menu d-flex align-items-center gap-5">
                  {nav__links.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink to={item.path} className="nav__link">
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* menu end */}

            <div className="nav__right d-flex align-items-center gap-4">
              {user ? (
                <div className="user__profile__wrapper" ref={profileRef}>
                  <div 
                    className="user__profile d-flex align-items-center gap-2" 
                    onClick={toggleDropdown}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="user__avatar">
                      <i className="ri-user-line"></i>
                    </div>
                    <span className="user__name">{user.username}</span>
                    <i className={`ri-arrow-${showDropdown ? 'up' : 'down'}-s-line`}></i>
                  </div>

                  {showDropdown && (
                    <div className="profile__dropdown">
                      <div className="dropdown__header">
                        <h6>{user.username}</h6>
                        <p>{user.email}</p>
                      </div>
                      <div className="dropdown__divider"></div>
                      <button className="dropdown__item" onClick={handleLogout}>
                        <i className="ri-logout-box-line"></i>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Only show buttons if NOT on login/register page
                !isAuthPage && (
                  <div className="nav__btns d-flex align-items-center gap-3">
                    <Button className="btn btn-secondary">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn btn-warning">
                      <Link to="/register">Register</Link>
                    </Button>
                  </div>
                )
              )}
            </div>

            <span className="mobile__menu">
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
