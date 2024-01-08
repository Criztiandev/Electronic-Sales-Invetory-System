export interface sidebarProps {
  path: string;
  title: string;
  icon: string;
}

export default {
  size: {
    minimum: "7rem",
    maximum: "350px",
  },

  Links: [
    { path: "/", title: "Home", icon: "T" },
    { path: "/products", title: "Products", icon: "T" },
    { path: "/users", title: "Users", icon: "T" },
  ],
};
