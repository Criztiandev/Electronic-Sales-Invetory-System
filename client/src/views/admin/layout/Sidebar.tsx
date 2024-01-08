import { Link } from "react-router-dom";
import sidebarConfig from "../config/sidebar.config";
import { LinkProps } from "../interface/sidebar";

const Sidebar = () => {
  const { size, MainLinks, FooterLinks } = sidebarConfig;

  return (
    <aside
      className={` bg-white sticky top-0 h-screen flex flex-col p-4 border-r shadow-md gap-4`}
      style={{ width: size.maximum }}>
      <nav className="h-full flex flex-col px-4">
        <div className={`flex items-center "justify-center"`}>
          <h2 className="font-bold text-3xl p-4">AIMOZ</h2>
        </div>

        <ul className="menu my-8">
          {MainLinks.map(({ path, title, isDropdown, dropdown }: LinkProps) => (
            <>
              {isDropdown ? (
                <li className="">
                  <details>
                    <summary>{title}</summary>
                    <ul>
                      {dropdown?.map(({ title, path }) => (
                        <li>
                          <Link to={path}>{title}</Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li>
                  <Link to={path}>{title}</Link>
                </li>
              )}
            </>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-4 px-4 ">
        <ul className="menu ">
          {FooterLinks.map(
            ({ path, title, isDropdown, dropdown }: LinkProps) => (
              <>
                {isDropdown ? (
                  <li className="">
                    <details>
                      <summary>{title}</summary>
                      <ul>
                        {dropdown?.map(
                          ({ title, path, dropdown, isDropdown }) => (
                            <>
                              {isDropdown ? (
                                <li>
                                  <details>
                                    <summary>{title}</summary>
                                    <ul>
                                      {dropdown?.map(({ title, path }) => (
                                        <li>
                                          <Link to={path}>{title}</Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </details>
                                </li>
                              ) : (
                                <li>
                                  <Link to={path}>{title}</Link>
                                </li>
                              )}
                            </>
                          )
                        )}
                      </ul>
                    </details>
                  </li>
                ) : (
                  <li>
                    <Link to={path}>{title}</Link>
                  </li>
                )}
              </>
            )
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
