import Button from "@/components/Button";
import Container from "@/components/Container";
import Table from "@/components/Table";
import tableConfig from "@/views/admin/config/tables/files.config";
import { Supplier } from "@/views/admin/interface/model";
import { Link } from "react-router-dom";
const SupplierTable = () => {
  const { name, base, columns } = tableConfig.supplierTable;

  return (
    <Container>
      <Table>
        {/* Table Header */}
        <Table.Header title="Supplier" current={`/${base}`}>
          <Container className="flex gap-4">
            <Link to={"create"}>
              <Button title="Create" icon="T" dir="left" />
            </Link>
          </Container>
        </Table.Header>
        <Table.Panel name={name}></Table.Panel>
        <Table.Content<Supplier> id={name} columns={columns} />
      </Table>
    </Container>
  );
};

export default SupplierTable;
