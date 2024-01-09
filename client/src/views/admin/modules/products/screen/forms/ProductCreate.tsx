/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/Button";
import Container from "@/components/Container";
import Field from "@/components/Field";
import Form from "@/components/Form";
import GridStack from "@/components/GridStack";
import Select from "@/components/Select";
import TableHeader from "@/components/Table/parts/TableHeader";
import Text from "@/components/Text";
import queryUtils from "@/utils/query.utils";
import { ProductCategory, Products } from "@/views/admin/interface/model";
import modelValidation from "@/views/admin/validation/model.validation";
import { useRef, useState } from "react";
import productCategoryApi from "../../api/productCategory.api";
import { useQuery } from "@tanstack/react-query";
import productsApi from "../../api/products.api";
import { generateCode } from "@/utils/file.utils";
import { Link } from "react-router-dom";

const ProductCreate = () => {
  const [selectedRawImage, setSelectedRawImage] = useState<any>(); // [
  const [selectedImg, setSelectedImg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refrenceCode = generateCode();

  const mutation = queryUtils.mutation({
    mutationFn: async (payload: Products) => await productsApi.create(payload),
    invalidateKey: ["products"],
    toast: "Product Created Successfully",
    onSuccess: () => {
      setSelectedImg("");
      setSelectedRawImage(null);
      fileInputRef.current!.value = "";
    },
  });

  const categoryQuery = useQuery({
    queryFn: async () => await productCategoryApi.fetchAll(),
    queryKey: ["productCategory-list"],
  });

  const convertToCategoryOption = (data: any) => {
    const payload = data?.payload;

    return payload?.map((fields: ProductCategory) => ({
      title: fields.code,
      value: fields._id,
    }));
  };

  const toggleFileInput = () => {
    fileInputRef.current?.click();
  };

  const toggleClearFileInput = () => {
    fileInputRef.current!.value = "";
    setSelectedImg("");
  };

  const handlePreSaveImg = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    setSelectedRawImage(fileInputRef.current?.files?.[0]);
  };

  const handleSubmit = (payload: Products) => {
    // mutation.mutate(payload);

    if (selectedRawImage) {
      const imageFile = selectedRawImage;

      const formData = new FormData();
      formData.append("productsImg", imageFile);
      for (const [key, value] of Object.entries(payload)) {
        if (key !== "productsImg") {
          formData.append(key, value);
        }
      }

      mutation.mutate(formData as any);
      return;
    }

    mutation.mutate(payload);
  };

  return (
    <div className="overflow-hidden">
      <TableHeader title="Create Product" current=""></TableHeader>

      <Container className="my-8 mx-auto border-t border-gray-300 py-4">
        <Form<Products>
          onSubmit={handleSubmit}
          validation={modelValidation.files.product as any}>
          <div>
            <label className="w-[500px] h-[350px]  m-auto border rounded-[5px] mb-4 mt-2 p-4 flex justify-center items-center flex-col gap-4">
              {selectedImg ? (
                <img
                  src={selectedImg}
                  className="w-full h-full object-cover rounded-[5px] cursor-pointer"
                />
              ) : (
                <>
                  <Text as="span" className="text-[28px] font-bold">
                    Drag and Drop here
                  </Text>
                  <span className="border-2 w-[350px] border-dashed border-gray-400 "></span>
                  <Button
                    title="Select here"
                    type="button"
                    onClick={toggleFileInput}
                  />
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePreSaveImg}
                hidden
              />
            </label>
            {selectedImg && (
              <div className="flex justify-end mb-8 gap-4">
                <Button
                  title="Select Other"
                  type="button"
                  onClick={toggleFileInput}
                />
                <Button
                  title="Cancel"
                  type="button"
                  onClick={toggleClearFileInput}
                />
              </div>
            )}
          </div>

          <GridStack columns={2} gap={32} className="mb-4">
            <Field
              name="code"
              title="Code"
              placeholder="Enter Category Code"
              required
              default={`product-${refrenceCode.id}`}
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
              placeholder={
                categoryQuery?.isLoading ? "Loading" : "Select Category"
              }
              disabled={categoryQuery?.isLoading}
              option={convertToCategoryOption(categoryQuery?.data)}
            />

            <Field
              name="cost"
              title="Cost"
              placeholder="Enter  Cost"
              required
            />
            <Field
              name="price"
              title="Price"
              placeholder="Enter price"
              required
            />
            <Field
              name="quantity"
              title="Quantity"
              placeholder="Enter quantity"
              required
            />
          </GridStack>
          <GridStack columns={2} className="my-8">
            <div></div>
            <Container className="w-full flex justify-end items-center gap-4 flex-col  ">
              <Button
                className="w-full hover:btn-success hover:text-white"
                title="Create"
                type="submit"
              />
              <Link to={"/products"} className="w-full">
                <Button
                  className="w-full hover:btn-error hover:text-white"
                  title="Cancel"
                  type="button"
                />
              </Link>
            </Container>
          </GridStack>
        </Form>
      </Container>
    </div>
  );
};

export default ProductCreate;
