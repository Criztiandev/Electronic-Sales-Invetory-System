import { Outlet } from "react-router-dom";

const QuotasScreen = () => {
  return (
    <section className="px-[32px] py-8">
      <Outlet />
    </section>
  );
};

export default QuotasScreen;
