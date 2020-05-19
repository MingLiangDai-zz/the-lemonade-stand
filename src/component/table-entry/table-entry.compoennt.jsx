import React from "react";

const TableEntry = ({ transaction, employeeCommission }) => {
  return (
    <tr>
      <td>{transaction.date}</td>
      <td>
        {transaction.lemonades.map((lemonade) => (
          <p>
            {lemonade.name} * {lemonade.quantity}
          </p>
        ))}
      </td>
      <td>${transaction.total.toFixed(2)}</td>
      {employeeCommission ? (
        <td>${((transaction.total * employeeCommission) / 100).toFixed(2)}</td>
      ) : (
        <></>
      )}
    </tr>
  );
};

export default TableEntry;
