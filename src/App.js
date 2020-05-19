import React from "react";
import "./App.css";
import FormPage from "./pages/form/formpage.component";
import Report from "./pages/report/report.component";
import { Switch, Route } from "react-router-dom";
import Header from "./component/header/header.component";
import TransactionList from "./component/transaction-list/transaction-list.component";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import Hero from "./component/hero/hero.component";

import { LEMONADE_DATA } from "./data-files/lemonade-data";
import { EMPLOYEE_DATA } from "./data-files/employee-data";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      transactions: [],
      show: false,
      employees: EMPLOYEE_DATA,
      lemonades: LEMONADE_DATA,
    };
  }

  submitToReport = (transaction) => {
    this.setState({ transactions: [...this.state.transactions, transaction] });
    this.setState({ show: true }, () => {
      window.setTimeout(() => {
        this.setState({ show: false });
      }, 5000);
    });
  };

  updateDrinks = (newLemonades) => {
    this.setState({ lemonades: newLemonades }, () => console.log(this.state));
  };
  updateEmployees = (newEmployees) => {
    this.setState({ employees: newEmployees }, () => console.log(this.state));
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Alert
          show={this.state.show}
          variant="success"
          dismissible={true}
          onClose={() => this.setState({ show: false })}
        >
          <Alert.Heading>Successfully saved transaction!</Alert.Heading>
        </Alert>
        <Switch>
          <Route
            exact
            path="/sales/form"
            render={() => (
              <FormPage
                submitToReport={this.submitToReport}
                lemonades={this.state.lemonades}
                updateDrinks={this.updateDrinks}
              />
            )}
          />
          <Route
            exact
            path="/sales/report"
            render={() => (
              <Report
                transactions={this.state.transactions}
                employees={this.state.employees}
                updateEmployees={this.updateEmployees}
              />
            )}
          />
          <Route exact path="/" component={Hero} />
        </Switch>
        <TransactionList transactions={this.state.transactions} />
      </div>
    );
  }
}

export default App;
