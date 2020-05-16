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

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      transactions: [],
      show: false,
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
            render={() => <FormPage submitToReport={this.submitToReport} />}
          />
          <Route
            exact
            path="/sales/report"
            render={() => <Report transactions={this.state.transactions} />}
          />
          <Route exact path="/" component={Hero} />
        </Switch>
        <TransactionList transactions={this.state.transactions} />
      </div>
    );
  }
}

export default App;
