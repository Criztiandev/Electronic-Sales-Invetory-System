import Container from "@/components/Container";
import Table from "@/components/Table";
import tableConfig from "@/views/admin/config/tables/files.config";
import { StocksManagementAdjustment } from "@/views/admin/interface/model";

const StockManagementTableAdjustment = () => {
  const { name, base, columns } = tableConfig.StocksManagementAdjustment;

  return (
    <Container>
      <Table>
        {/* Table Header */}
        <Table.Header
          title="Stocks Adjustment"
          current={`/${base}`}
          options={[{ title: "Adjustment", path: `/${base}/adjustment` }]}>
          <Container className="flex gap-4"></Container>
        </Table.Header>
        <Table.Panel name={name}></Table.Panel>
        <Table.Content<StocksManagementAdjustment>
          id={name}
          columns={columns}
        />
      </Table>
    </Container>
  );
};

export default StockManagementTableAdjustment;
