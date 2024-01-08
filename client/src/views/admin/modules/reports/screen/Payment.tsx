import Button from "@/components/Button";
import Container from "@/components/Container";
import Field from "@/components/Field";
import FlexStack from "@/components/FlexStack";
import Form from "@/components/Form";

import Table from "@/components/Table";
import categoryConfig from "@/views/admin/config/tables/category.config";
import { Purchase } from "@/views/admin/interface/model";

const PaymentTable = () => {
  const { name, base, columns } = categoryConfig.purchaseTable;

  return (
    <Container>
      <Table>
        {/* Table Header */}
        <Table.Header title="Payment Record" current={`/${base}`}>
          <Form>
            <FlexStack dir="row">
              <Field type="date" name="startDate" placeholder="Date start" />
              <Field type="date" name="startDate" placeholder="Date start" />
              <Button title="Filter" />
            </FlexStack>
          </Form>
        </Table.Header>
        <Table.Panel name={name}>
          <Table.Filter
            columnTitle="payment"
            name="payment"
            title="Payment"
            options={[{ title: "Paid" }, { title: "Unpaid" }]}
          />

          <Table.Filter
            name="method"
            title="Method"
            columnTitle="method"
            options={[{ title: "Cash" }, { title: "Bank" }]}
          />
        </Table.Panel>
        <Table.Content<Purchase> id={name} columns={columns} />
      </Table>
    </Container>
  );
};

export default PaymentTable;
