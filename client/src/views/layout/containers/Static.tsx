import { BaseProps } from "@/interface/component";
import Layout from "..";

const Static = ({ ...props }: BaseProps) => {
  return (
    <div className="h-screen flex overflow-y-auto">
      <Layout.Sidebar />
      <main className="flex flex-col w-screen">
        <Layout.TopBar />
        {props.children}
      </main>
    </div>
  );
};

export default Static;
