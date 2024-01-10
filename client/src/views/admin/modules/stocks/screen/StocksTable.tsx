import Button from "@/components/Button";
import Container from "@/components/Container";
import Table from "@/components/Table";
import { Link } from "react-router-dom";
import filesConfig from "@/views/admin/config/tables/files.config";
import { StocksManagement } from "../stocks";

const StocksTable = () => {
  const { name, base, columns } = filesConfig.StocksManagementTable;

  return (
    <Container>
      <Table>
        {/* Table Header */}
        <Table.Header title="Stocks" current={`/${base}`}>
          <Container className="flex gap-4">
            <Link to={"create"}>
              <Button title="Create" icon="T" dir="left" />
            </Link>
          </Container>
        </Table.Header>
        <Table.Panel name={name}></Table.Panel>
        <Table.Content<StocksManagement> id={name} columns={columns} />
      </Table>
    </Container>
  );
};

export default StocksTable;
