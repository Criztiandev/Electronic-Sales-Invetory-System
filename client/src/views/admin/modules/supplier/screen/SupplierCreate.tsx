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

const SupplierCreate = () => {
  const { base } = filesConfig.supplierTable;

  const mutation = queryUtils.mutation({
    mutationFn: async (payload: Supplier) => await supplierApi.create(payload),
    invalidateKey: [base],
    toast: "Category Created Successfully",
  });

  const handleSubmit = (payload: Supplier) => {
    mutation.mutate(payload);
  };

  return (
    <div>
      <TableHeader
        title="Create Supplier"
        current={`/${base}`}
        options={[{ title: "Create", path: `/${base}/create` }]}></TableHeader>
      <Container className="my-8 mx-auto grid grid-cols-2 border-t border-gray-300 py-4">
        <div className="text-[18px] font-semibold"></div>
        <Form<Supplier>
          onSubmit={handleSubmit}
          validation={supplierValidation as any}>
          <FlexStack gap={28} className="mb-4">
            <Field name="name" title="Name" placeholder="Enter Supplier Name" />

            <Field
              name="email"
              title="Email"
              placeholder="Enter Supplier Email"
            />

            <Field
              type="tel"
              name="contact"
              title="Contact"
              placeholder="Enter Supplier Contact Number"
            />
          </FlexStack>
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

export default SupplierCreate;
