import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout({sidebarOpen, toggleSidebar}) {
  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar}/>
      <Sidebar sidebarOpen={sidebarOpen}/>
      <Outlet />
    </div>
  );
}

export default Layout;
