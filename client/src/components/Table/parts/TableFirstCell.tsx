/* eslint-disable @typescript-eslint/no-explicit-any */
import { CellContext } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import Text from "@/components/Text";
import Container from "@/components/Container";
import Avatar from "@/components/Avatar";
import { useQuery } from "@tanstack/react-query";
import fileApi from "@/service/api/file.api";

interface CellProps<T> {
  folder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: CellContext<T, any>;
}

const FirstCell = <T,>(props: CellProps<T>) => {
  const navigate = useNavigate();

  const { getValue, row } = props.data;
  const payload = row.original as any;

  const generateQueryKey = () => {
    if (payload && props.folder && payload[`${props.folder}Img`]) {
      return [props.folder, payload[`${props.folder}Img`]];
    }
    return null;
  };

  const query = useQuery({
    queryFn: async () =>
      fileApi.fetchImage(`/${generateQueryKey()?.join("/")}`),
    queryKey: ["test"],
    enabled: !!props.folder,
  });

  return (
    <Container
      onDoubleClick={() => navigate(`${payload._id}`)}
      className="first-cell cursor-pointer flex items-center gap-4">
      <>
        {payload?.profileImg && query.isLoading ? (
          <div className="skeleton w-[24px] h-[24px] rounded-full shrink-0"></div>
        ) : (
          <Avatar
            src={query.data as string}
            alt={`profile-${payload._id}`}
            size="md"
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
