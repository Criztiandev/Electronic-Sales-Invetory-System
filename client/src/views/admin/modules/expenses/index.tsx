import { Outlet } from "react-router-dom";

const ExprensesScreen = () => {
  return (
    <section className="px-[32px] py-8">
      <Outlet />
    </section>
  );
};

export default ExprensesScreen;
