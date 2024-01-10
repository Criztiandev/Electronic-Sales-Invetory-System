/* eslint-disable @typescript-eslint/no-explicit-any */
import FlexStack from "@/components/FlexStack";
import Form from "@/components/Form";
import Field from "@/components/Field";
import Container from "@/components/Container";
import Button from "@/components/Button";
import TableHeader from "@/components/Table/parts/TableHeader";
import queryUtils from "@/utils/query.utils";
import filesConfig from "@/views/admin/config/tables/files.config";
import { Supplier } from "../supplier";
import supplierValidation from "../supplier.validation";
import supplierApi from "../api/supplier.api";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import LoadingScreen from "@/views/utils/LoadingScreen";

const SupplierDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { base } = filesConfig.supplierTable;

  const query = useQuery({
    queryFn: async () => supplierApi.fetchById(id || ""),
    queryKey: [`${base}-edit-${id}`],
  });

  const mutation = queryUtils.mutation({
    mutationFn: async (payload: Supplier) =>
      await supplierApi.updateById(id || "", payload),
    invalidateKey: [`${base}-edit-${id}`],
    toast: "Category Updated Successfully",
  });

  const handleSubmit = (payload: Supplier) => {
    mutation.mutate(payload);
  };

  if (query?.isLoading || query?.isError) {
    return <LoadingScreen />;
  }

  const { payload: res } = query?.data || {};

  return (
    <div>
      <TableHeader
        title="Updated Supplier"
        current={`/${base}`}
        options={[{ title: "Create", path: `/${base}/create` }]}></TableHeader>
      <Container className="my-8 mx-auto grid grid-cols-2 border-t border-gray-300 py-4">
        <div className="text-[18px] font-semibold"></div>
        <Form<Supplier>
          onSubmit={handleSubmit}
          validation={supplierValidation as any}>
          <FlexStack gap={28} className="mb-4">
            <Field
              name="name"
              title="Name"
              placeholder="Enter Supplier Name"
              default={res?.name}
              disabled={true}
            />

            <Field
              name="email"
              title="Email"
              placeholder="Enter Supplier Email"
              default={res?.email}
              disabled={true}
            />

            <Field
              type="tel"
              name="contact"
              title="Contact"
              placeholder="Enter Supplier Contact Number"
              default={res?.contact}
              disabled={true}
            />
          </FlexStack>
          <Container className="flex justify-end items-center gap-4 my-8 flex-col ">
            <Link to={`/${base}/edit/${id}`} className="w-full">
              <Button
                className="w-full hover:btn-success hover:text-white"
                title="Edit"
                type="button"
              />
            </Link>
            <Link to={`/${base}`} className="w-full">
              <Button
                className="w-full hover:btn-error hover:text-white"
                title="Cancel"
                type="button"
              />
            </Link>
          </Container>
        </Form>
      </Container>
    </div>
  );
};

export default SupplierDetails;
