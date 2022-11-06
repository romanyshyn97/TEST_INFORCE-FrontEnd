import logo from "../../resources/logo.png";
import { Link } from "react-router-dom";
import "./AppHeader.scss";

const AppHeader = () => {
  return (
    <header className="main-header">
      <div className="main-header_logo">
        <Link to="/">
        <img src={logo} alt="" />
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
