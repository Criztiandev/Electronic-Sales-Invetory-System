import Button from "@/components/Button";
import Tooltip from "@/components/Tooltip";
import sidebarConfig from "@/config/sidebar.config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isExpand, setIsExpand] = useState<boolean>(true);
  const { size, Links } = sidebarConfig;
  const currentActive = "Home";
  const navigate = useNavigate();

  const handleNavigate = (path: string) => navigate(path);

  const renderNavLinks = Links.map(({ path, title, icon }) => (
    <Tooltip key={title} title={title} active={`${isExpand}`}>
      <Button
        dir={"left"}
        title={isExpand ? title : undefined}
        icon={icon}
        className={`w-full justify-start ${
          currentActive === title ? "btn" : "btn-ghost"
        }`}
        onClick={() => handleNavigate(path)}
      />
    </Tooltip>
  ));

  return (
    <aside
      className={` bg-white sticky top-0 h-screen flex flex-col p-4 border-r shadow-md gap-4`}
      style={{ width: isExpand ? size.maximum : size.minimum }}>
      <nav className="h-full flex flex-col px-4">
        <div
          className={`flex items-center ${
            isExpand ? "justify-between" : "justify-center"
          }`}>
          {isExpand && <h2 className="font-bold text-3xl">Logo</h2>}
          <Tooltip title="Dashboard" dir="bottom" active={`${isExpand}`}>
            <Button
              dir={"left"}
              icon={"T"}
              className={`${!isExpand && "w-full"} justify-start btn-ghost `}
              onClick={() => setIsExpand((prev) => !prev)}
            />
          </Tooltip>
        </div>
        <ul className="flex flex-col my-8">{renderNavLinks}</ul>
      </nav>

      <div className="flex flex-col gap-4 px-4">
        <Tooltip title="Settings" active={`${isExpand}`}>
          <Button
            dir={"left"}
            title={isExpand ? "Settings" : undefined}
            icon={"T"}
            className={`w-full justify-start btn-ghost`}
            onClick={() => handleNavigate("/settings")}
          />
        </Tooltip>
      </div>
    </aside>
  );
};

export default Sidebar;
