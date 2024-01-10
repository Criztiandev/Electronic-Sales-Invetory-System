import Button from "@/components/Button";
import Container from "@/components/Container";
import Dropdown from "@/components/Dropdown";
import Table from "@/components/Table";
import filesConfig from "@/views/admin/config/tables/files.config";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import productCategoryApi from "../../api/productCategory.api";
import { ProductCategory, Products } from "../../product";
const ProductTable = () => {
  const { name, base, columns } = filesConfig.productTable;

  const categoriesQuery = useQuery({
    queryFn: async () => await productCategoryApi.fetchAll(),
    queryKey: [`${base}-categories`],
  });

  const categoriesSelectOptions = categoriesQuery.data?.payload?.map(
    (fields: ProductCategory) => ({
      title: fields.name,
    })
  );

  return (
    <Container>
      <Table>
        {/* Table Header */}
        <Table.Header title="Products" current={`/${base}`}>
          <Container className="flex gap-4">
            <Link to={"category"}>
              <Button title="Category" icon="T" dir="left" />
            </Link>

            <Link to={"create"}>
              <Button title="Create" icon="T" dir="left" />
            </Link>
          </Container>
        </Table.Header>
        <Table.Panel name={name}>
          <Table.Filter
            title="Categories"
            options={categoriesSelectOptions}
            name={name}
            disable={categoriesQuery.isLoading}
            columnTitle="category"
          />

          <Dropdown className="dropdown-end">
            <Dropdown.Button className="btn-circle">T</Dropdown.Button>
            <Dropdown.Content className="mt-4">
              <Dropdown.Item>Print</Dropdown.Item>
              <Dropdown.Item>Excel</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </Table.Panel>
        <Table.Content<Products> id={name} columns={columns} />
      </Table>
    </Container>
  );
};

export default ProductTable;
