import { Link } from "react-router-dom";
import Container from "./Container";
import Icon from "./Icon";
import Text from "./Text";
import { BreadCrumbsItems } from "@/interface/component";

interface Props {
  items: BreadCrumbsItems[];
}

const BreadCrumbs = (props: Props) => {
  return (
    <Container className="breadcrumbs">
      <ul>
        {props.items.map((item) => (
          <li key={item.title}>
            <Link to={item.path}>
              <Icon type="svg" size={"16px"}>
                {item.icon}
              </Icon>
              <Text>{item.title}</Text>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default BreadCrumbs;
