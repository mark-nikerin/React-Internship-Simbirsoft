import React from "react";
import Auth from "../components/Admin/Auth";
import Menu from "../components/Admin/Menu";
import HeaderPanel from "../components/Admin/HeaderPanel";
import Footer from "../components/Admin/Footer"
import Orders from "../components/Admin/Orders";
import "./admin.css";

const AdminPage = () => {
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  const handleAuthorize = () => {
    setIsAuthorized(true);
  };

  return (
    <>
      {isAuthorized ? (
        <div className="admin">
          <Menu />
          <div className="page-content">
            <HeaderPanel />
            <Orders />
            <Footer />
          </div>
        </div>
      ) : (
        <Auth onAuthorize={handleAuthorize} />
      )}
    </>
  );
};

export default AdminPage;
