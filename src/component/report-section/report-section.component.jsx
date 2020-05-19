import React from "react";
import "./report-section.styles.scss";
import TableEntry from "../table-entry/table-entry.compoennt";

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
            <thead>
              <tr>
                <th>Date</th>
                <th>Items Sold</th>
                <th>Total Price</th>
                <th>Commission Earned</th>
              </tr>
            </thead>
            <tbody>
              {employee.sales
                .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
                .map((sale) => (
                  <TableEntry
                    key={sale.date}
                    transaction={sale}
                    employeeCommission={employee.commission}
                  />
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
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
export default ReportSection;
