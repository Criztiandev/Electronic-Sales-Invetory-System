/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "@/components/Form";
import Field from "@/components/Field";
import Container from "@/components/Container";
import Button from "@/components/Button";
import TableHeader from "@/components/Table/parts/TableHeader";
import queryUtils from "@/utils/query.utils";
import filesConfig from "@/views/admin/config/tables/files.config";
import { StocksManagement } from "../stocks";
import { useQuery } from "@tanstack/react-query";
import productsApi from "../../products/api/products.api";
import { Products } from "../../products/product";
import Select from "@/components/Select";
import GridStack from "@/components/GridStack";
import stocksValidation from "../stocks.validation";
import stocksApi from "../api/stocks.api";
import { useParams } from "react-router-dom";
import LoadingScreen from "@/views/utils/LoadingScreen";

const StocksEdit = () => {
  const { id } = useParams();

  const query = useQuery({
    queryFn: async () => await stocksApi.fetchById(id),
    queryKey: [`products-${id}`],
  });

  const { base } = filesConfig.StocksManagementTable;

  const productsQuery = useQuery({
    queryFn: async () => await productsApi.fetchAll(),
    queryKey: [base],
  });

  const mutation = queryUtils.mutation({
    mutationFn: async (payload: StocksManagement) =>
      await stocksApi?.updateById(id, payload),
    invalidateKey: [`products-${id}`],
    toast: "Category Updated Successfully",
  });

  const handleSubmit = (payload: StocksManagement) => {
    mutation.mutate(payload);
  };

  const convertProducttoOption = (data: any) => {
    const payload = data?.payload;

    return payload?.map((fields: Products) => ({
      title: fields.name,
      value: fields.name,
    }));
  };

  if (query?.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <TableHeader
        title="Update Stocks"
        current={`/${base}`}
        options={[{ title: "Create", path: `/${base}/create` }]}></TableHeader>
      <Container className="my-8 mx-auto border-t border-gray-300 py-4">
        <div className="text-[18px] font-semibold"></div>

        <Form<StocksManagement>
          onSubmit={handleSubmit}
          validation={stocksValidation as any}>
          <GridStack columns={2}>
            <Select
              default={query?.data?.payload?.productName}
              title="Product Name"
              name="productName"
              placeholder="Select Product Name"
              disabled={query?.isLoading}
              option={convertProducttoOption(productsQuery.data)}
            />

            <Field
              default={query?.data?.payload?.code}
              name="code"
              title="Code"
              placeholder="Enter Code"
              disabled={true}
            />

            <Field
              default={query?.data?.payload?.date}
              name="date"
              title="Date"
              type="date"
              disabled={query?.isLoading}
            />

            <Field
              default={query?.data?.payload?.stocks}
              type="number"
              name="stocks"
              title="Stocks"
              disabled={query?.isLoading}
              placeholder="Enter Stocks"
            />

            <Field
              default={query?.data?.payload?.quantity}
              type="number"
              name="quantity"
              title="Quantity"
              disabled={query?.isLoading}
              placeholder="Enter Quantity"
            />

            <Select
              default={query?.data?.payload?.type}
              title="Type"
              name="type"
              placeholder="Select Type"
              disabled={query?.isLoading}
              option={[
                { title: "Addition", value: "addition" },
                { title: "Subtration", value: "subtraction" },
              ]}
            />
          </GridStack>
          <GridStack columns={2}>
            <div></div>
            <Container className="flex justify-end items-center gap-4 my-8 flex-col ">
              <Button
                className="w-full hover:btn-success hover:text-white"
                title="Update"
                type="submit"
              />
              <Button
                className="w-full hover:btn-error hover:text-white"
                title="Cancel"
                type="button"
              />
            </Container>
          </GridStack>
        </Form>
      </Container>
    </div>
  );
};

export default StocksEdit;
