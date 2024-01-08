import { LinkProps } from "../interface/sidebar";

const size = { minimum: "7rem", maximum: "350px" };

const MainLinks: LinkProps[] = [{ path: "/", title: "Dashboard", icon: "T" }];

const FooterLinks: LinkProps[] = [
  { path: "/about", title: "About", icon: "T" },
  { path: "/settings", title: "Settings", icon: "T" },
];

export default { size, MainLinks, FooterLinks };
