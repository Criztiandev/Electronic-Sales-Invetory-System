import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";
import { Outlet } from "react-router-dom";

const AdminEntryPoint = () => {
  return (
    <div className="h-screen flex overflow-y-auto">
      <Sidebar />
      <main className="flex flex-col w-screen  overflow-x-hidden">
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminEntryPoint;
