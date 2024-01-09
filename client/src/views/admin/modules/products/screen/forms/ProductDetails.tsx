/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/components/Container";
import Field from "@/components/Field";
import Form from "@/components/Form";
import GridStack from "@/components/GridStack";
import Select from "@/components/Select";
import TableHeader from "@/components/Table/parts/TableHeader";
import { ProductCategory, Products } from "@/views/admin/interface/model";
import modelValidation from "@/views/admin/validation/model.validation";
import productCategoryApi from "../../api/productCategory.api";
import { useQuery } from "@tanstack/react-query";
import productsApi from "../../api/products.api";
import { Link, useParams } from "react-router-dom";
import LoadingScreen from "@/views/utils/LoadingScreen";
import fileApi from "@/service/api/file.api";
import Button from "@/components/Button";

const ProductDetails = () => {
  const { id } = useParams();

  // Queries
  const query = useQuery({
    queryFn: async () => await productsApi.fetchById(id || ""),
    queryKey: [`products-${id}`],
  });

  const imageQuery = useQuery({
    queryFn: async () =>
      await fileApi.fetchImage(
        `/products/${query?.data?.payload?.productsImg}`
      ),
    queryKey: [`product-${id}-img`],
    enabled: !!query?.data?.payload?.productsImg,
  });

  const categoryQuery = useQuery({
    queryFn: async () => await productCategoryApi.fetchAll(),
    queryKey: ["productCategory-list"],
  });

  // Functions
  const convertToCategoryOption = (data: any) =>
    data?.payload?.map((fields: ProductCategory) => ({
      title: fields.code,
      value: fields._id,
    }));

  if (
    query.isLoading ||
    query.error ||
    imageQuery.isLoading ||
    imageQuery.isError
  )
    return <LoadingScreen />;

  return (
    <div className="overflow-hidden">
      <TableHeader title="View Product" current=""></TableHeader>

      <Container className="my-8 mx-auto border-t border-gray-300 py-4">
        <Form<Products>
          onSubmit={() => {}}
          validation={modelValidation.files.product as any}>
          <div>
            <label className="w-[500px] h-[350px] mx-auto border rounded-[5px] mb-4 mt-2 p-4 flex justify-center items-center flex-col gap-4">
              <img
                src={imageQuery?.data as string}
                className="w-full h-full object-cover rounded-[5px] cursor-pointer"
              />
            </label>
          </div>

          <GridStack columns={2} gap={32} className="mb-4">
            <Field
              default={query?.data?.payload?.code}
              name="code"
              title="Code"
              placeholder="Enter Category Code"
              required
              disabled={true}
            />

            <Field
              default={query?.data?.payload?.name}
              name="name"
              title="Name"
              placeholder="Enter Category Code"
              required
              disabled={true}
            />

            <Select
              disabled={true}
              default={query?.data?.payload?.category}
              title="Category"
              name="category"
              placeholder={
                categoryQuery?.isLoading ? "Loading" : "Select Category"
              }
              option={convertToCategoryOption(categoryQuery?.data)}
            />

            <Field
              name="cost"
              title="Cost"
              placeholder="Enter Category Cost"
              default={query?.data?.payload?.cost}
              required
              disabled={true}
            />

            <Field
              default={query?.data?.payload?.price}
              name="price"
              title="Price"
              placeholder="Enter price"
              required
              disabled={true}
            />
            <Field
              default={query?.data?.payload?.quantity}
              name="quantity"
              title="Quantity"
              placeholder="Enter quantity"
              required
              disabled={true}
            />
          </GridStack>
        </Form>

        <GridStack columns={2}>
          <div></div>
          <Link to={"/products"} className="w-full">
            <Button
              className="w-full hover:btn-error hover:text-white"
              title="Go back"
              type="button"
            />
          </Link>
        </GridStack>
      </Container>
    </div>
  );
};

export default ProductDetails;
