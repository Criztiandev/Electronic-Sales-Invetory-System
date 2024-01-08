import Button from "@/components/Button";
import Container from "@/components/Container";
import Table from "@/components/Table";
import tableConfig from "@/views/admin/config/tables/files.config";
import { StocksManagement } from "@/views/admin/interface/model";
import { Link } from "react-router-dom";
const StockManagementTable = () => {
  const { name, base, columns } = tableConfig.StocksManagementTable;

  return (
    <Container>
      <Table>
        {/* Table Header */}
        <Table.Header title="Stocks Management" current={`/${base}`}>
          <Container className="flex gap-4">
            <Link to={"adjustment"}>
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

export default StockManagementTable;
