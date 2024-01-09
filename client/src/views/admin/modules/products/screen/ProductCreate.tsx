import Button from "@/components/Button";
import Container from "@/components/Container";
import Field from "@/components/Field";
import Form from "@/components/Form";
import GridStack from "@/components/GridStack";
import Select from "@/components/Select";
import TableHeader from "@/components/Table/parts/TableHeader";
import Text from "@/components/Text";
import productApi from "@/service/api/product.api";
import queryUtils from "@/utils/query.utils";
import { Products } from "@/views/admin/interface/model";
import modelValidation from "@/views/admin/validation/model.validation";

const ProductCreate = () => {
  const mutation = queryUtils.mutation({
    mutationFn: async (payload: Products) => await productApi.create(payload),
    invalidateKey: ["products"],
  });

  const handleSubmit = (payload: Products) => {
    console.log(payload);
    mutation.mutate(payload);
  };

  return (
    <div>
      <TableHeader title="Create Product" current=""></TableHeader>

      <Container className="my-8 mx-auto border-t border-gray-300 py-4">
        <Form<Products>
          onSubmit={() => handleSubmit}
          validation={modelValidation.files.product}>
          <div>
            <div className="w-full h-[275px] border rounded-[5px] mb-8 mt-2 p-4 flex justify-center items-center flex-col gap-4">
              <Text as="span" className="text-[28px] font-bold">
                Drag and Drop here
              </Text>
              <span className="border-2 w-[350px] border-dashed border-gray-400 "></span>
              <Button title="Select here" />
            </div>
          </div>

          <GridStack columns={2} gap={32} className="mb-4">
            <Field
              name="code"
              title="Code"
              placeholder="Enter Category Code"
              required
            />

            <Field
              name="name"
              title="Name"
              placeholder="Enter Category Code"
              required
            />

            <Select
              title="Category"
              name="category"
              placeholder="Select Categories"
              option={[{ title: "test", value: "test" }]}
            />

            <Field
              type="number"
              name="cost"
              title="Cost"
              placeholder="Enter  Cost"
              required
            />
            <Field
              name="cost"
              title="Price"
              placeholder="Enter price"
              required
            />
            <Field
              name="cost"
              title="quantity"
              placeholder="Enter quantity"
              required
            />
          </GridStack>
          <GridStack columns={2} className="my-12">
            <div></div>
            <Container className="w-full flex justify-end items-center gap-4 my-12 flex-col  ">
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

export default ProductCreate;
