import Container from "@/components/Container";

import Button from "@/components/Button";

interface SelectProductTable {
  _id?: string;
  product?: string;
  netUnitPrice?: number;
  stocks?: number;
  quantity?: number;
  discount?: number;
  tax: number;
  subtotal?: number;
  total?: number;
}

interface Props {
  selectedProduct: SelectProductTable[];
}

const ProductViewer = (props: Props) => {
  return (
    <Container className="mb-8">
      <Container className="h-[300px] border rounded-[5px] mb-4">
        <table className="table table-lg table-zebra">
          {/* head */}
          <thead className="bg-slate-500 text-white">
            <tr>
              <th></th>
              <th>Product</th>
              <th>Net Unit Price</th>
              <th>Stocks</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Tax</th>
              <th>Subtotal</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.selectedProduct.map((payload, index) => {
              return (
                <tr className="place-items-center">
                  <th>{index + 1}</th>
                  <td>{payload?.product}</td>
                  <td>{payload?.netUnitPrice}</td>
                  <td>{payload?.stocks}</td>
                  <td>{payload?.quantity}</td>
                  <td>{payload?.discount}</td>
                  <td>{payload?.tax}</td>
                  <td>{payload?.subtotal}</td>
                  <td>{payload?.total}</td>
                  <td>
                    <Button title="Delete" className="btn-sm" />
                  </td>
                </tr>
              );
            })}
            {/* row 2 */}
          </tbody>
        </table>
      </Container>
    </Container>
  );
};

export default ProductViewer;
