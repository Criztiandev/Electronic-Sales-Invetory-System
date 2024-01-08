import TableHeader from "@/components/Table/parts/TableHeader";
import usersApi from "@/service/api/users.api";
import LoadingScreen from "@/views/general/LoadingScreen";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

interface Props {
  base: string;
}

const UserDetailsScreen = ({ base }: Props) => {
  const location = useLocation();

  const UID: string = location.pathname.split("/").pop() || "";

  const query = useQuery({
    queryFn: async () => await usersApi.fetchUserById(UID),
    queryKey: [`user-${UID}`],
  });

  if (query.isLoading || query.isError) {
    return <LoadingScreen />;
  }

  const { data: res } = query.data || {};
  console.log(res);

  return (
    <section className="px-[32px] py-4 overflow-y-scroll h-screen">
      <TableHeader
        title={res?.payload?.userName}
        current={`/${base}`}
        className="flex justify-between items-center mb-8"
        options={[{ title: "Details", path: `/${base}/${UID}` }]}></TableHeader>
    </section>
  );
};

export default UserDetailsScreen;
