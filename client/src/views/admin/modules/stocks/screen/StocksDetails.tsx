/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "@/components/Form";
import Container from "@/components/Container";
import Button from "@/components/Button";
import TableHeader from "@/components/Table/parts/TableHeader";
import filesConfig from "@/views/admin/config/tables/files.config";
import { StocksManagement } from "../stocks";
import { useQuery } from "@tanstack/react-query";
import GridStack from "@/components/GridStack";

import stocksApi from "../api/stocks.api";
import LoadingScreen from "@/views/utils/LoadingScreen";
import { Link, useParams } from "react-router-dom";
import Heading from "@/components/Heading";

const StocksDetails = () => {
  const { id } = useParams();
  const { base } = filesConfig.StocksManagementTable;

  const query = useQuery({
    queryFn: async () => await stocksApi.fetchById(id),
    queryKey: [`products-${id}`],
  });

  if (query.isLoading) {
    return <LoadingScreen />;
  }

  const { payload } = query?.data || {};

  return (
    <div>
      <TableHeader
        title="Stocks Details"
        current={`/${base}`}
        options={[{ title: "Create", path: `/${base}/create` }]}></TableHeader>
      <Container className="my-8 mx-auto border-t border-gray-300 py-4">
        <div className="text-[18px] font-semibold"></div>

        <Form<StocksManagement> onSubmit={() => {}} validation={{} as any}>
          <GridStack columns={2}>
            <div>
              <Heading level={3} className="mb-3">
                Product Name
              </Heading>
              <div className="input input-bordered flex justify-start items-center">
                {payload?.productName}
              </div>
            </div>

            <div>
              <Heading level={3} className="mb-3">
                Date
              </Heading>
              <div className="input input-bordered flex justify-start items-center">
                {payload?.date}
              </div>
            </div>

            <div>
              <Heading level={3} className="mb-3">
                Code
              </Heading>
              <div className="input input-bordered flex justify-start items-center">
                {payload?.code}
              </div>
            </div>

            <div>
              <Heading level={3} className="mb-3">
                Stocks
              </Heading>
              <div className="input input-bordered flex justify-start items-center">
                {payload?.stocks}
              </div>
            </div>

            <div>
              <Heading level={3} className="mb-3">
                Quantity
              </Heading>
              <div className="input input-bordered flex justify-start items-center">
                {payload?.quantity}
              </div>
            </div>

            <div>
              <Heading level={3} className="mb-3">
                Type
              </Heading>
              <div className="capitalize input input-bordered flex justify-start items-center">
                {payload?.type}
              </div>
            </div>
          </GridStack>
          <GridStack columns={2}>
            <div></div>
            <Container className="flex justify-end items-center gap-4 my-8 flex-col ">
              <Link to={"/stocks"} className="w-full">
                <Button
                  className="w-full hover:btn-error hover:text-white"
                  title="Go back"
                  type="button"
                />
              </Link>
            </Container>
          </GridStack>
        </Form>
      </Container>
    </div>
  );
};

export default StocksDetails;
