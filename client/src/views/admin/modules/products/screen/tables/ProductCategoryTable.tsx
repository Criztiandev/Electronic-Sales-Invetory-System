import Button from "@/components/Button";
import Container from "@/components/Container";
import Table from "@/components/Table";
import filesConfig from "@/views/admin/config/tables/files.config";
import { Link } from "react-router-dom";
import { ProductCategory } from "../../product";

const ProductCategory = () => {
  const { name, columns } = filesConfig.productCategory;

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
