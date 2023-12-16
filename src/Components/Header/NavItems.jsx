import React from "react";
import { useNavigate } from "react-router-dom";
import "./SigninHeader.css";

const NavItems = (props) => {
  const navigate = useNavigate();
  const navData = [
    { label: "Pricing", link: "/pricing" },
    { label: "Career", link: "/career" },
    { label: "Sign In", link: "/" },
  ];
  return (
    <nav className="navLinks">
      {navData.map((nav, id) => (
        <li className="link" key={id} onClick={() => navigate(nav.link)}>
          {nav.label}
        </li>
      ))}
    </nav>
  );
};
export default NavItems;
