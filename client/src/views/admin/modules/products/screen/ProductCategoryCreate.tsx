import { ProductCategory } from "@/views/admin/interface/model";
import FlexStack from "@/components/FlexStack";
import Form from "@/components/Form";
import Field from "@/components/Field";
import Container from "@/components/Container";
import Button from "@/components/Button";
import modelValidation from "@/views/admin/validation/model.validation";
import TableHeader from "@/components/Table/parts/TableHeader";
import categoryConfig from "@/views/admin/config/tables/category.config";
import queryUtils from "@/utils/query.utils";
import productCategoryApi from "../api/productCategory.api";

const ProductCategoryCreate = () => {
  const { base } = categoryConfig.productTable;

  const mutation = queryUtils.mutation({
    mutationFn: async (payload: ProductCategory) =>
      await productCategoryApi.create(payload),
    invalidateKey: [base],
    toast: "Category Created Successfully",
  });

  const handleSubmit = (payload: ProductCategory) => {
    mutation.mutate(payload);
  };

  return (
    <div>
      <TableHeader
        title="Categoies"
        current={`/${base}`}
        options={[
          { title: "Category", path: `/${base}/category` },
          { title: "Create", path: `/${base}/category/create` },
        ]}></TableHeader>
      <Container className="my-8 mx-auto grid grid-cols-2 border-t border-gray-300 py-4">
        <div className="text-[18px] font-semibold"></div>
        <Form<ProductCategory>
          onSubmit={handleSubmit}
          validation={modelValidation.files.productCategory}>
          <FlexStack gap={32} className="mb-4">
            <Field name="code" title="Code" placeholder="Enter Category Code" />

            <Field name="name" title="Name" placeholder="Enter Category Code" />

            <Field
              name="count"
              title="Count"
              placeholder="Enter Category Code"
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

export default ProductCategoryCreate;
