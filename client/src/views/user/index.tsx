import Sidebar from "./layout/Sidebar";
import TopBar from "./layout/TopBar";
import { Outlet } from "react-router-dom";

const UserEntyPoint = () => {
  return (
    <div className="h-screen flex overflow-y-auto">
      <Sidebar />
      <main className="flex flex-col w-screen overflow-x-hidden">
        <TopBar />
        <Outlet />
      </main>
    </div>
  );
};

export default UserEntyPoint;
