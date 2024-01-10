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
import ProductViewer from "../containers/ProductViewer";
import quotasValidation from "../quotas.validation";
import Textarea from "@/components/Textarea";
import quotasApi from "../api/quotas.api";
import LoadingScreen from "@/views/utils/LoadingScreen";
import { useParams } from "react-router-dom";

interface SelectProductTable {
  _id?: string;
  name?: string;
  netUnitPrice?: number;
  stocks?: number;
  quantity?: number;
  discount?: number;
  tax: number;
  subtotal?: number;
  total?: number;
}

const { base } = categoryConfig.quotasTable;

const QuotasDetails = () => {
  const { id } = useParams();

  const quotasQuery = useQuery({
    queryFn: async () => await quotasApi.fetchAll(),
    queryKey: [`quotas-list`],
    enabled: !!id,
  });

  const quotaQueryDetails = useQuery({
    queryFn: async () => await quotasApi.fetchById(id || ""),
    queryKey: [`quotas-${id}`],
    enabled: !!id,
  });

  const mutation = queryUtils.mutation({
    mutationFn: async (payload: Quotas) => await quotasApi.create(payload),
    invalidateKey: [base],
    toast: "Quotas Created Successfully",
  });

  const handleSubmit = (payload: Quotas) => {
    mutation.mutate(payload);
  };

  if (quotasQuery?.isLoading || quotasQuery?.isError) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <TableHeader
        title="Quotas Views"
        current={`/${base}`}
        options={[{ title: "Create", path: `/${base}/create` }]}></TableHeader>
      <Container className="my-8 mx-auto border-t border-gray-300 py-4">
        <ProductViewer selectedProduct={quotasQuery.data?.payload} />

        <Form<Quotas>
          onSubmit={handleSubmit}
          validation={quotasValidation as any}>
          <GridStack columns={2} className="mb-8">
            <Field
              default={quotaQueryDetails?.data?.payload?.tax}
              type="text"
              name="tax"
              title="Tax"
            />
            <Field
              default={quotaQueryDetails?.data?.payload?.netUnitPrice}
              type="text"
              name="netUnitPrice"
              title="Net Unity Price"
            />
            <Field
              default={quotaQueryDetails?.data?.payload?.stocks}
              type="text"
              name="stocks"
              title="Stocks"
            />
            <Field
              default={quotaQueryDetails?.data?.payload?.quantity}
              type="text"
              name="quantity"
              title="Quantity"
            />
            <Field
              default={quotaQueryDetails?.data?.payload?.discount}
              type="text"
              name="discount"
              title="Discount"
            />
            <Field
              default={quotaQueryDetails?.data?.payload?.shipping}
              type="text"
              name="shipping"
              title="Shipping"
            />
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
        </Form>
      </Container>
    </div>
  );
};

export default QuotasDetails;
