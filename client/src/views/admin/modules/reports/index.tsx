import { Outlet } from "react-router-dom";

const ReportScreen = () => {
  return (
    <section className="px-[32px] py-8">
      <Outlet />
    </section>
  );
};

export default ReportScreen;
