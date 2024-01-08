import Button from "@/components/Button";
import Container from "@/components/Container";
import Table from "@/components/Table";
import tableConfig from "@/views/admin/config/tables/files.config";
import { ProductCategory } from "@/views/admin/interface/model";
import { Link } from "react-router-dom";

const ProductCategory = () => {
  const { name, columns } = tableConfig.productCategory;

  return (
    <Container>
      <Table>
        {/* Table Header */}
        <Table.Header
          title="Category"
          current={`/products`}
          options={[{ title: "Category", path: `/products/category` }]}>
          <Container className="flex gap-4">
            <Link to={"create"}>
              <Button title="Create" icon="T" dir="left" />
            </Link>
          </Container>
        </Table.Header>
        <Table.Panel name={name}></Table.Panel>
        <Table.Content<ProductCategory> id={name} columns={columns} />
      </Table>
    </Container>
  );
};

export default ProductCategory;
