import FlexStack from "@/components/FlexStack";
import Form from "@/components/Form";
import Field from "@/components/Field";
import Container from "@/components/Container";
import Button from "@/components/Button";
import modelValidation from "@/views/admin/validation/model.validation";
import TableHeader from "@/components/Table/parts/TableHeader";
import queryUtils from "@/utils/query.utils";
import productCategoryApi from "../../api/productCategory.api";
import filesConfig from "@/views/admin/config/tables/files.config";
import { ProductCategory } from "../../product";
import { generateCode } from "@/utils/file.utils";

const ProductCategoryCreate = () => {
  const { base } = filesConfig.productCategory;

  const categoryCode = "category-" + generateCode().id;

  const mutation = queryUtils.mutation({
    mutationFn: async (payload: ProductCategory) =>
      await productCategoryApi.create(payload),
    invalidateKey: [base],
    toast: "Category Created Successfully",
  });

  const handleSubmit = (payload: ProductCategory) => {
    console.log(payload);
    mutation.mutate(payload);
  };

  return (
    <div>
      <TableHeader
        title="Categories"
        current={`/products`}
        options={[
          { title: "Category", path: `/products/category` },
          { title: "Create", path: `/products/category/create` },
        ]}></TableHeader>
      <Container className="my-8 mx-auto grid grid-cols-2 border-t border-gray-300 py-4">
        <div className="text-[18px] font-semibold"></div>
        <Form<ProductCategory>
          onSubmit={handleSubmit}
          validation={modelValidation.files.productCategory}>
          <FlexStack gap={28} className="mb-4">
            <Field
              default={categoryCode}
              name="code"
              title="Code"
              placeholder="Enter Category Code"
              disabled={true}
            />

            <Field name="name" title="Name" placeholder="Enter Category Code" />
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
