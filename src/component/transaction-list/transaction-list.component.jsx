import React from "react";
import "./transaction-list.styles.scss";

const TransactionList = ({ transactions }) => (
  <div className="transaction-list">
    <h3>Transactions: </h3>

    <table>
      <tr>
        <th>Date</th>
        <th>Items Sold</th>
        <th>Total Price</th>
      </tr>
      {transactions
        .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
        .map((transaction) => (
          <tr>
            <td key={transaction.date}>{transaction.date}</td>
            <td>
              {transaction.lemonades.map((lemonade) => (
                <p key={lemonade.name}>
                  {lemonade.name} * {lemonade.quantity}
                </p>
              ))}
            </td>
            <td>${transaction.total.toFixed(2)}</td>
          </tr>
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
    </table>
  </div>
);

export default TransactionList;
