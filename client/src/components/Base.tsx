import { Outlet } from "react-router-dom";

const Base = () => {
  return (
    <section className="px-[32px] py-8 overflow-x-hidden">
      <Outlet />
    </section>
  );
};

export default Base;
