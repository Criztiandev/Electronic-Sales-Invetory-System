import { Outlet } from "react-router-dom";

const SupplierScreen = () => {
  return (
    <section className="px-[32px] py-8">
      <Outlet />
    </section>
  );
};

export default SupplierScreen;
