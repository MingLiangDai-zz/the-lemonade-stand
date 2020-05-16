import React from "react";
import "./report-section.styles.scss";

const ReportSection = ({ employees }) => {
  const reportableEmployees = employees.filter((employee) => employee.sales);

  return (
    <div className="report-section">
      <h3>Report: </h3>
      {reportableEmployees.map((employee) => (
        <div>
          <h4>{employee.name}: </h4>
          <p>
            Commission: {employee.commission}% Postion: {employee.position}
          </p>
          <table>
            <tr>
              <th>Date</th>
              <th>Items Sold</th>
              <th>Total Price</th>
              <th>Commission Earned</th>
            </tr>
            {employee.sales
              .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
              .map((sale) => (
                <tr>
                  <td>{sale.date}</td>
                  <td>
                    {sale.lemonades.map((lemonade) => (
                      <p>
                        {lemonade.name} * {lemonade.quantity}
                      </p>
                    ))}
                  </td>
                  <td>${sale.total.toFixed(2)}</td>
                  <td>
                    ${((sale.total * employee.commission) / 100).toFixed(2)}
                  </td>
                </tr>
              ))}
            <tr>
              <td>Total</td>
              <td>---</td>
              <td>
                $
                {employee.sales
                  .reduce((accul, sale) => accul + sale.total, 0)
                  .toFixed(2)}
              </td>
              <td>
                {(
                  (employee.sales.reduce(
                    (accul, sale) => accul + sale.total,
                    0
                  ) *
                    employee.commission) /
                  100
                ).toFixed(2)}
              </td>
            </tr>
          </table>
        </div>
      ))}
    </div>
  );
};
export default ReportSection;
