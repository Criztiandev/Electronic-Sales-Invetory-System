/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/Button";
import Field from "@/components/Field";
import FlexStack from "@/components/FlexStack";
import Form from "@/components/Form";
import { registerSchema } from "@/service/validation/auth.validation";

const ProfitLoss = () => {
  const MockData = [
    { title: "Sales", Ammount: "5000.00", Sales: "5 Sales" },
    { title: "Sales", Ammount: "5000.00", Sales: "5 Sales" },
    { title: "Sales", Ammount: "5000.00", Sales: "5 Sales" },
    { title: "Sales", Ammount: "5000.00", Sales: "5 Sales" },
    { title: "Sales", Ammount: "5000.00", Sales: "5 Sales" },
    { title: "Sales", Ammount: "5000.00", Sales: "5 Sales" },
    { title: "Sales", Ammount: "5000.00", Sales: "5 Sales" },
    { title: "Sales", Ammount: "5000.00", Sales: "5 Sales" },
  ];

  return (
    <div>
      <div className="p-4 shadow-md mb-4 rounded-[5px] border">
        <Form<any> onSubmit={() => {}} validation={registerSchema}>
          <FlexStack dir="row" alignItems="end">
            <Field type="date" name="startDate" title="Start Date" />
            <Field type="date" name="endDate" title="End Date" />
            <Button title="Filter" />
          </FlexStack>
        </Form>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {MockData.map(({ title, Ammount, Sales }) => (
          <div className="card card-side flex items-center justify-center bg-base-100 shadow-md border px-8">
            <div className="btn w-[64px] h-[64px]">{title}</div>
            <div className="card-body">
              <h2 className="card-title">{Ammount}</h2>
              <p>{Sales}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfitLoss;
