import { useState } from "react";
import PropTypes from "prop-types";

import { AnimatePresence, motion } from "framer-motion";

import { NavLink, useNavigate } from "react-router-dom";

import "./Header.css";
import {
  BadgeSwissFranc,
  Beef,
  Files,
  LayoutGrid,
  LogOut,
  Menu,
  MessagesSquare,
  Settings,
  ShoppingCart,
  UserRoundPen,
  Users,
  UtensilsCrossed,
} from "lucide-react";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <LayoutGrid />,
  },
  {
    path: "/products",
    name: "Products",
    icon: <Beef />,
  },
  {
    path: "/orders",
    name: "Orders",
    icon: <ShoppingCart />,
  },
  {
    path: "/vendors",
    name: "Vendors",
    icon: <UtensilsCrossed />,
  },
  {
    path: "/users",
    name: "Users",
    icon: <Users />,
  },
  {
    path: "/transactions",
    name: "Transactions",
    icon: <BadgeSwissFranc />,
  },
  {
    path: "/reports",
    name: "Reports",
    icon: <Files />,
  },
  {
    path: "/messages",
    name: "Messages",
    icon: <MessagesSquare />,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: <UserRoundPen />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <Settings />,
  },
  {
    path: "/login",
    name: "Logout",
    icon: <LogOut />,
    logout: true, // Add a flag to identify the logout route
  },
];

export default function Header({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "auto",
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("userDetails");

    navigate("/login");
  };

  return (
    <div>
      <div className="main_container">
        <motion.div
          animate={{
            minWidth: isOpen ? "250px" : "60px",
            transition: {
              duration: 0.2,
              type: "spring",
              damping: 10,
            },
          }}
          className="sidebar"
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  className="logo"
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                >
                  Admin Panel
                </motion.h1>
              )}
            </AnimatePresence>
            <div className="bars">
              <Menu onClick={toggle} />
            </div>
          </div>

          <section className="routes">
            {routes.map((route) => (
              <NavLink
                to={route.path}
                key={route.name}
                className="link"
                activeClassName="active"
                onClick={route.logout ? handleLogout : undefined} // Add click handler for logout
              >
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="link_text"
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            ))}
          </section>
        </motion.div>
        <main style={{ minWidth: isOpen ? "85vw" : "95vw" }}>{children}</main>
      </div>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};
