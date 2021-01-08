import React from "react";
import "./report-section.styles.scss";
import TableEntry from "../table-entry/table-entry.compoennt";
import { Card } from "react-bootstrap";
const ReportSection = ({ employees }) => {
  const reportableEmployees = employees.filter((employee) => employee.sales);

  return (
    <Card className="round shadow mb-3">
      <div className="report-section">
        <h4 className="my-2">Report: </h4>
        {reportableEmployees.map((employee) => (
          <div className="my-3">
            <h5>{employee.name}: </h5>
            <p className="mb-1">
              Commission: {employee.commission}% Postion: {employee.position}
            </p>
            <table className="ml-3">
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
    </Card>
  );
};
export default ReportSection;
