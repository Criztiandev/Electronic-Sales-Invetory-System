import Button from "@/components/Button";
import Container from "@/components/Container";
import Dropdown from "@/components/Dropdown";
import Table from "@/components/Table";
import tableConfig from "@/views/admin/config/tables/files.config";
import { Products } from "@/views/admin/interface/model";
import { Link } from "react-router-dom";
const ProductTable = () => {
  const { name, base, columns } = tableConfig.productTable;

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
