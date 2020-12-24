import React from "react";
import "./transaction-list.styles.scss";
import { Card, Container } from "react-bootstrap";
import TableEntry from "../table-entry/table-entry.compoennt";
const TransactionList = ({ transactions }) => (
  <Container style={{ maxWidth: "1000px", color: "rgb(52, 58, 64)" }}>
    <Card className="round shadow mb-3">
      <div className="transaction-list">
        <h4 className="my-2">Transactions: </h4>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Items Sold</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {transactions
              .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
              .map((transaction) => (
                <TableEntry key={transaction.date} transaction={transaction} />
              ))}
            <tr>
              <td>Total</td>
              <td>---</td>
              <td>
                $
                {transactions
                  .reduce((accul, sale) => accul + sale.total, 0)
                  .toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </Container>
);

export default TransactionList;
