import { LinkProps } from "../interface/sidebar";

const size = { minimum: "7rem", maximum: "350px" };

const MainLinks: LinkProps[] = [
  { path: "/", title: "Home", icon: "T" },
  {
    path: "/files",
    title: "Files",
    icon: "T",
    isDropdown: true,
    dropdown: [
      { path: "/products", title: "Products", icon: "T" },
      { path: "/stocks", title: "Stocks-Management", icon: "T" },
      { path: "/supplier", title: "Supplier", icon: "T" },
    ],
  },
  { path: "/quotas", title: "Quotas", icon: "T" },
  { path: "/purchase", title: "Purchase", icon: "T" },
  { path: "/sales", title: "Sales", icon: "T" },
  { path: "/expenses", title: "Expenses", icon: "T" },

  {
    path: "/reports",
    title: "Reports",
    icon: "T",
    isDropdown: true,
    dropdown: [
      { path: "/reports/profit", title: "Profit/Loss", icon: "T" },
      { path: "/reports/payment", title: "Payment", icon: "T" },
      { path: "/reports/tos", title: "Tern and Privacy", icon: "T" },
      { path: "/reports/sales-return", title: "Sales Return", icon: "T" },
      { path: "/reports/purchase-return", title: "Purchase Return", icon: "T" },
    ],
  },
  { path: "/users", title: "Users", icon: "T" },
];

const FooterLinks: LinkProps[] = [
  { path: "/about", title: "About", icon: "T" },
  { path: "/settings", title: "Settings", icon: "T" },
];

export default { size, MainLinks, FooterLinks };
