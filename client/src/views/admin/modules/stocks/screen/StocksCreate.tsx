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
import { generateCode } from "@/utils/file.utils";
import stocksValidation from "../stocks.validation";
import stocksApi from "../api/stocks.api";

const StocksCreate = () => {
  const { base } = filesConfig.StocksManagementTable;
  const StockID = "STC" + generateCode().id;

  const productsQuery = useQuery({
    queryFn: async () => await productsApi.fetchAll(),
    queryKey: ["products-list"],
  });

  const mutation = queryUtils.mutation({
    mutationFn: async (payload: StocksManagement) =>
      await stocksApi.create(payload),
    invalidateKey: [base],
    toast: "Category Created Successfully",
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

  return (
    <div>
      <TableHeader
        title="Create Stocks"
        current={`/${base}`}
        options={[{ title: "Create", path: `/${base}/create` }]}></TableHeader>
      <Container className="my-8 mx-auto border-t border-gray-300 py-4">
        <div className="text-[18px] font-semibold"></div>

        <Form<StocksManagement>
          onSubmit={handleSubmit}
          validation={stocksValidation as any}>
          <GridStack columns={2}>
            <Select
              title="Product Name"
              name="productName"
              placeholder="Select Product Name"
              option={convertProducttoOption(productsQuery.data)}
            />

            <Field
              default={StockID}
              name="code"
              title="Code"
              placeholder="Enter Code"
              disabled={true}
            />

            <Field name="date" title="Date" type="date" />

            <Field
              type="number"
              name="stocks"
              title="Stocks"
              placeholder="Enter Stocks"
            />

            <Field
              type="number"
              name="quantity"
              title="Quantity"
              placeholder="Enter Quantity"
            />

            <Select
              title="Type"
              name="type"
              placeholder="Select Type"
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
                title="Create"
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

export default StocksCreate;
