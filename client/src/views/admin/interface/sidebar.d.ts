export interface LinkProps {
  path: string;
  title: string;
  icon: string;
  isDropdown?: boolean;
  dropdown?: LinkProps[];
}
