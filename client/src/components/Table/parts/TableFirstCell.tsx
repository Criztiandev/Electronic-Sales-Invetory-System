import { CellContext } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import Text from "@/components/Text";
import Container from "@/components/Container";
import Avatar from "@/components/Avatar";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/interface/user";
import fileApi from "@/service/api/file.api";

interface CellProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: CellContext<T, any>;
}

const FirstCell = <T,>(props: CellProps<T>) => {
  const navigate = useNavigate();

  const { getValue, row } = props.data;
  const payload = row.original as User;

  const query = useQuery({
    queryFn: async () => fileApi.fetchImage(`/profile/${payload?.profileImg}`),
    queryKey: [`user-${payload._id}-img`],
    enabled: !!payload?.profileImg,
  });

  console.log(query.data);

  return (
    <Container
      onDoubleClick={() => navigate(`${payload._id}`)}
      className="first-cell cursor-pointer flex items-center gap-4">
      <>
        {payload?.profileImg && (
          <Avatar
            src={query.data as string}
            alt={`profile-${payload._id}`}
            size="sm"
          />
        )}
      </>

      <Text as="span" className="capitalize">
        {getValue() || ""}
      </Text>
    </Container>
  );
};

export default FirstCell;
