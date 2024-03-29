/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "@/components/Form";
import Field from "@/components/Field";
import Container from "@/components/Container";
import Button from "@/components/Button";
import TableHeader from "@/components/Table/parts/TableHeader";
import queryUtils from "@/utils/query.utils";
import { Quotas } from "../quotas";
import categoryConfig from "@/views/admin/config/tables/category.config";
import GridStack from "@/components/GridStack";
import Select from "@/components/Select";
import { useQuery } from "@tanstack/react-query";
import productsApi from "../../products/api/products.api";
import { generateCode } from "@/utils/file.utils";
import quotasValidation from "../quotas.validation";
import Textarea from "@/components/Textarea";
import supplierApi from "../../supplier/api/supplier.api";
import quotasApi from "../api/quotas.api";

const { base } = categoryConfig.quotasTable;

const QuotasCreate = () => {
  const QID = "QT-" + generateCode().id;

  const productQuery = useQuery({
    queryFn: async () => await productsApi.fetchAll(),
    queryKey: ["products-list"],
  });

  const customerQuery = useQuery({
    queryFn: async () => await supplierApi.fetchAll(),
    queryKey: ["supplier-list"],
  });

  quotasApi;

  const mutation = queryUtils.mutation({
    mutationFn: async (payload: Quotas) => await quotasApi.create(payload),
    invalidateKey: [base],
    toast: "Quotas Created Successfully",
  });

  const handleConvertToOption = (data: any) => {
    const payload = data?.payload;

    return payload?.map((fields: any) => ({
      title: fields.name,
      value: fields.name,
    }));
  };

  const handleSubmit = (payload: Quotas) => {
    mutation.mutate(payload);
  };

  return (
    <div>
      <TableHeader
        title="Create Quotas"
        current={`/${base}`}
        options={[{ title: "Create", path: `/${base}/create` }]}></TableHeader>
      <Container className="my-8 mx-auto border-t border-gray-300 py-4">
        <div className="w-[500px] h-[350px] border rounded-[5px]  mx-auto p-4 m-4 mb-8 shadow-lg"></div>

        <Form<Quotas>
          onSubmit={handleSubmit}
          validation={quotasValidation as any}>
          <GridStack columns={2}>
            <Select
              title="Products"
              name="product"
              placeholder="Select Products"
              option={handleConvertToOption(productQuery.data)}
            />
            <Field
              type="text"
              name="reference"
              title="Reference"
              default={QID}
              disabled
            />
            <Select
              title="Customer"
              name="customer"
              placeholder="Select Customer"
              option={handleConvertToOption(customerQuery.data)}
            />
            <Field type="date" name="date" title="Date" />
          </GridStack>

          <GridStack columns={2} className="mb-8">
            <Field type="text" name="tax" title="Tax" />
            <Field type="text" name="netUnitPrice" title="Net Unity Price" />
            <Field type="text" name="stocks" title="Stocks" />
            <Field type="text" name="quantity" title="Quantity" />
            <Field type="text" name="discount" title="Discount" />
            <Field type="text" name="shipping" title="Shipping" />
            <Select
              title="Status"
              name="status"
              placeholder="Select Status"
              option={[
                { title: "Pending", value: "Pending" },
                { title: "Active", value: "Active" },
                { title: "Inactive", value: "Inactive" },
              ]}
            />
          </GridStack>
          <Textarea title="Description" name="description" className="" />

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
        </Form>
      </Container>
    </div>
  );
};

export default QuotasCreate;
