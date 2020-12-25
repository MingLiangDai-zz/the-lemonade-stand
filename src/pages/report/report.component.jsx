import React from "react";

import ReportSection from "../../component/report-section/report-section.component";

import "./report.styles.scss";

import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: this.props.employees,
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      employee: "",
      showSuccess: false,
      showError: false,
      showAdd: false,
      showRemove: false,
      newEmployee: {},
    };
  }

  componentWillUnmount() {
    this.props.updateEmployees(this.state.employees);
  }

  submitReport = (e) => {
    e.preventDefault();
    const transactions = this.props.transactions;
    const {
      startDate,
      startTime,
      endDate,
      endTime,
      employee,
      employees,
    } = this.state;
    if (employee === "" || employee === "Please pick an employee") {
      this.setState({ showError: true }, () => {
        window.setTimeout(() => {
          this.setState({ showError: false });
        }, 5000);
      });
    } else {
      const validTransactions = this.findTransactions(
        transactions,
        startDate,
        startTime,
        endDate,
        endTime
      );
      const index = employees.findIndex(
        (personel) => personel.name === employee
      );
      employees[index] = { ...employees[index], sales: validTransactions };
      this.setState({ employees: employees, showSuccess: true }, () => {
        window.setTimeout(() => {
          this.setState({ showSuccess: false });
        }, 5000);
      });
    }
  };

  findTransactions = (trans, sDate, sTime, eDate, eTime) => {
    const parsedStartDate = Date.parse(sDate + " " + sTime);
    const parsedEndDate = Date.parse(eDate + " " + eTime);
    return trans.filter((tran) => {
      const tranDate = Date.parse(tran.date);
      if (tranDate >= parsedStartDate && tranDate <= parsedEndDate) {
        return tran;
      }
      return;
    });
  };

  submitEmployee = (e) => {
    e.preventDefault();
    this.setState({ showAdd: false });
    this.setState(
      { employees: [...this.state.employees, this.state.newEmployee] },
      () => this.setState({ newEmployee: {} })
    );
  };

  removeEmployee = (index) => {
    const employees = this.state.employees;
    this.setState({
      employees: employees
        .slice(0, index)
        .concat(employees.slice(index + 1, employees.length)),
    });
  };

  render() {
    return (
      <Container style={{ maxWidth: "1000px" }} className="report">
        <Alert
          show={this.state.showSuccess}
          variant="success"
          dismissible={true}
          onClose={() => this.setState({ showSuccess: false })}
        >
          <Alert.Heading>Successfully added to report!</Alert.Heading>
        </Alert>
        <Alert
          show={this.state.showError}
          variant="danger"
          dismissible={true}
          onClose={() => this.setState({ showError: false })}
        >
          <Alert.Heading>Please pick an employee!</Alert.Heading>
        </Alert>

        {/* Remove an employee /////////////////////////////////////////////////////////*/}
        <Alert
          show={this.state.showRemove}
          variant="danger"
          dismissible={true}
          onClose={() => this.setState({ showRemove: false })}
        >
          <Alert.Heading>Remove an employee</Alert.Heading>
          {this.state.employees.map((employee, index) => (
            <p
              key={employee.name}
              className="point"
              onClick={() => {
                this.removeEmployee(index);
              }}
            >
              {employee.name}
            </p>
          ))}
        </Alert>

        {/* Add an employee /////////////////////////////////////////////////////////*/}

        <Alert
          show={this.state.showAdd}
          variant="success"
          dismissible={true}
          onClose={() => this.setState({ showAdd: false })}
        >
          <Alert.Heading>Add a new employee</Alert.Heading>
          <Form onSubmit={this.submitEmployee}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter name"
                onChange={(e) =>
                  this.setState({
                    newEmployee: {
                      ...this.state.newEmployee,
                      name: e.target.value,
                    },
                  })
                }
              />
              <Form.Text className="text-muted">
                Name of the new employee
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Position</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter position"
                onChange={(e) =>
                  this.setState({
                    newEmployee: {
                      ...this.state.newEmployee,
                      position: e.target.value,
                    },
                  })
                }
              />
              <Form.Text className="text-muted">
                Position of the new employee
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Commission</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter comission in (%)"
                onChange={(e) =>
                  this.setState({
                    newEmployee: {
                      ...this.state.newEmployee,
                      commission: parseInt(e.target.value),
                    },
                  })
                }
              />
              <Form.Text className="text-muted">
                Commission rate of the new employee
              </Form.Text>
            </Form.Group>
            <Button variant="custom" type="submit">
              Add
            </Button>
          </Form>
        </Alert>
        <form onSubmit={this.submitReport}>
          <div className="inputs">
            <div>
              <span>Start Date: </span>
              <input
                id="startDate"
                type="date"
                name="startDate"
                value={this.state.startDate}
                onChange={(e) => this.setState({ startDate: e.target.value })}
                required
              />
            </div>
            <div>
              <span>Start Time: </span>
              <input
                id="startTime"
                type="time"
                name="startTime"
                value={this.state.startTime}
                onChange={(e) => this.setState({ startTime: e.target.value })}
                required
              />
            </div>
            <div>
              <span>End Date: </span>
              <input
                id="endDate"
                type="date"
                name="endDate"
                value={this.state.endDate}
                onChange={(e) => this.setState({ endDate: e.target.value })}
                required
              />
            </div>
            <div>
              <span>End Time: </span>
              <input
                id="endTime"
                type="time"
                name="endTime"
                value={this.state.endTime}
                onChange={(e) => this.setState({ endTime: e.target.value })}
                required
              />
            </div>
            <div>
              <span>Employee: </span>
              <select
                onChange={(e) => this.setState({ employee: e.target.value })}
                required
              >
                <option>Please pick an empolyee</option>
                {this.state.employees.map((employee) => (
                  <option key={employee.name}>{employee.name}</option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="custom">
                Submit Report
              </Button>
            </div>
          </div>
        </form>
        <Row>
          <Col className="mb-2">
            <Button
              className="w-100"
              variant="custom"
              onClick={() => this.setState({ showAdd: true })}
            >
              Add Employees
            </Button>
          </Col>
          <Col className="mb-2">
            <Button
              className="w-100"
              variant="custom1"
              onClick={() => this.setState({ showRemove: true })}
            >
              Remove Employees
            </Button>
          </Col>
        </Row>
        <ReportSection employees={this.state.employees} />
      </Container>
    );
  }
}

export default Report;
