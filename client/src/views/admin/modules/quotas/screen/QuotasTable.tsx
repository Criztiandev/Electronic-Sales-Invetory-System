import Button from "@/components/Button";
import Container from "@/components/Container";
import Table from "@/components/Table";
import { Link } from "react-router-dom";
import categoryConfig from "@/views/admin/config/tables/category.config";
import { Quotas } from "../quotas";

const QuotasTable = () => {
  const { name, base, columns } = categoryConfig.quotasTable;

  return (
    <Container>
      <Table>
        {/* Table Header */}
        <Table.Header title="Quotas" current={`/${base}`}>
          <Container className="flex gap-4">
            <Link to={"create"}>
              <Button title="Create" icon="T" dir="left" />
            </Link>
          </Container>
        </Table.Header>
        <Table.Panel name={name}></Table.Panel>
        <Table.Content<Quotas> id={name} columns={columns} />
      </Table>
    </Container>
  );
};

export default QuotasTable;
