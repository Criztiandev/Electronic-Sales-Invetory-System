import Container from "@/components/Container";
import Table from "@/components/Table";
import categoryConfig from "@/views/admin/config/tables/category.config";
import { Sales } from "@/views/admin/interface/model";

const SalesTable = () => {
  const { name, base, columns } = categoryConfig.salesTable;

  return (
    <Container>
      <Table>
        {/* Table Header */}
        <Table.Header title="Sales" current={`/${base}`}>
          <Container className="flex gap-4"></Container>
        </Table.Header>
        <Table.Panel name={name}></Table.Panel>
        <Table.Content<Sales> id={name} columns={columns} />
      </Table>
    </Container>
  );
};

export default SalesTable;
