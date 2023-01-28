import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../custom-hooks/useUser";
import navBarItems from "./navbarItems";
import { getAuth, signOut } from "firebase/auth";

function NavBar() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        {navBarItems.map((navItem) => (
          <li key={navItem.item}>
            <Link to={navItem.path}>{navItem.item}</Link>
          </li>
        ))}
      </ul>
      <div className="nav-right">
        {user ? (
          <button onClick={() => signOut(getAuth())}>Log Out</button>
        ) : (
          <button onClick={() => navigate("/login")}>Log In</button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
