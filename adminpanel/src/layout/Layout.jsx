import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout({sidebarOpen, toggleSidebar}) {
  return (
    < >
        <Sidebar sidebarOpen={sidebarOpen}/>
        
      <Navbar toggleSidebar={toggleSidebar}/>
      
      <div className="main-content" id="main">
      <Outlet />
      </div>
    </>
  );
}

export default Layout;
