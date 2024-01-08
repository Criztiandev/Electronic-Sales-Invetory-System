import { Outlet } from "react-router-dom";

const UserScreen = () => {
  return (
    <section className="px-[32px] py-8">
      <Outlet />
    </section>
  );
};

export default UserScreen;
