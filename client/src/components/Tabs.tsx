import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

interface ItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  currentID: number | string;
  title: string;
  active: boolean;
}

interface ContentProps extends Props {
  active: boolean;
}

const Tabs = (props: Props) => {
  return <div {...props}>{props.children}</div>;
};

const Item = (props: ItemProps) => {
  return (
    <button
      {...props}
      key={props.currentID}
      className={`
      ${props.className ? props.className : null}
      ${props.active ? "border-b border-black" : null}`}>
      {props.title}
    </button>
  );
};

const Content = ({ active, ...props }: ContentProps) => {
  return <>{active ? <div {...props}>{props.children}</div> : null}</>;
};

Item.Content = Content;

Tabs.Header = Tabs;
Tabs.Main = Tabs;
Tabs.Item = Item;

export default Tabs;
