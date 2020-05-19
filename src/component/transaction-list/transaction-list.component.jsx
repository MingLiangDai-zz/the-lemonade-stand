import React from "react";
import "./transaction-list.styles.scss";
import TableEntry from "../table-entry/table-entry.compoennt";
const TransactionList = ({ transactions }) => (
  <div className="transaction-list">
    <h3>Transactions: </h3>

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
);

export default TransactionList;
