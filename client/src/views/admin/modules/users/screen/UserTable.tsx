import Button from "@/components/Button";
import Container from "@/components/Container";
import Table from "@/components/Table";
import categoryConfig from "@/views/admin/config/tables/category.config";
import { Quotas } from "@/views/admin/interface/model";
import { Link } from "react-router-dom";

const UserTable = () => {
  const { name, base, columns } = categoryConfig.quotasTable;

  return (
    <Container>
      <Table>
        {/* Table Header */}
        <Table.Header title="Users" current={`/${base}`}>
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

export default UserTable;
