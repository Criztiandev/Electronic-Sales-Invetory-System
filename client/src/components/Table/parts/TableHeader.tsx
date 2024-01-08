import BreadCrumbs from "@/components/BreadCrumbs";
import Container from "@/components/Container";
import FlexStack from "@/components/FlexStack";
import Heading from "@/components/Heading";
import { BaseProps, BreadCrumbsItems } from "@/interface/component";

interface Props extends BaseProps {
  title: string;
  current: string;
  options?: BreadCrumbsItems[];
}

const TableHeader = (props: Props) => {
  return (
    <FlexStack
      dir="row"
      justifyContent="between"
      alignItems="center"
      className="w-full mb-8">
      <Container>
        <Heading level={2} className="capitalize">
          {props.title}
        </Heading>
        <BreadCrumbs
          items={[
            {
              title: "Home",
              path: props?.current,
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
              ),
            },
            ...(props.options || []),
          ]}
        />
      </Container>
      {props.children}
    </FlexStack>
  );
};

export default TableHeader;
