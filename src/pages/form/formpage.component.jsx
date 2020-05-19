import React from "react";
import "./formpage.styles.scss";
import LemonadeSelection from "../../component/lemonade-seleciton/lemonade-selection.component";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

class FormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lemonades: this.props.lemonades,
      date: "",
      time: "",
      show: false,
      showAdd: false,
      showRemove: false,
      newDrink: {},
    };
  }

  componentWillUnmount() {
    this.props.updateDrinks(this.state.lemonades);
  }

  handleChange = (value, name) => {
    const index = this.state.lemonades.findIndex((item) => item.name === name);
    const lemonades = this.state.lemonades;
    lemonades[index].quantity = parseInt(value);
    this.setState({ lemonades: [...lemonades] });
  };

  submitTransaction = () => {
    const transaction = {
      date: this.state.date + " " + this.state.time,
      lemonades: this.state.lemonades.filter(
        (lemonade) => parseInt(lemonade.quantity) !== 0
      ),
      total: this.state.lemonades.reduce((accul, lemonade) => {
        const quantity = lemonade.quantity ? parseInt(lemonade.quantity) : 0;
        return accul + quantity * lemonade.price;
      }, 0),
    };
    transaction.total
      ? this.props.submitToReport(transaction)
      : this.setState({ show: true }, () => {
          window.setTimeout(() => {
            this.setState({ show: false });
          }, 5000);
        });
    const lemonades = this.state.lemonades;

    this.setState({
      lemonades: lemonades.map((lemonade) => ({ ...lemonade, quantity: 0 })),
      date: "",
      time: "",
    });
  };

  addToMenu = () => this.setState({ showAdd: true });

  submitDrink = (e) => {
    e.preventDefault();
    this.setState({ showAdd: false });
    const newDrink = { ...this.state.newDrink, quantity: 0 };
    this.setState({ lemonades: [...this.state.lemonades, newDrink] }, () =>
      this.setState({ newDrink: {} })
    );
  };

  removeDrink = (index) => {
    const lemonades = this.state.lemonades;
    this.setState({
      lemonades: lemonades
        .slice(0, index)
        .concat(lemonades.slice(index + 1, lemonades.length)),
    });
  };

  render() {
    return (
      <div className="formpage">
        <Alert
          show={this.state.show}
          variant="danger"
          dismissible={true}
          onClose={() => this.setState({ show: false })}
        >
          <Alert.Heading>No drinks sold!</Alert.Heading>
        </Alert>

        {/* Remove a drink /////////////////////////////////////////////////////////*/}
        <Alert
          show={this.state.showRemove}
          variant="danger"
          dismissible={true}
          onClose={() => this.setState({ showRemove: false })}
        >
          <Alert.Heading>
            Remove a drink (Click on the drink you want to remove)
          </Alert.Heading>
          {this.state.lemonades.map((lemonade, index) => (
            <p
              key={lemonade.name}
              className="point"
              onClick={() => {
                this.removeDrink(index);
              }}
            >
              {lemonade.name}
            </p>
          ))}
        </Alert>

        {/* Add a drink /////////////////////////////////////////////////////////*/}
        <Alert
          show={this.state.showAdd}
          variant="success"
          dismissible={true}
          onClose={() => this.setState({ showAdd: false })}
        >
          <Alert.Heading>Add a new drink to the menu</Alert.Heading>
          <Form onSubmit={this.submitDrink}>
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter URL"
                onChange={(e) =>
                  this.setState({
                    newDrink: {
                      ...this.state.newDrink,
                      imageUrl: e.target.value,
                    },
                  })
                }
              />
              <Form.Text className="text-muted">
                Image URL for the display image of the item
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter name"
                onChange={(e) =>
                  this.setState({
                    newDrink: { ...this.state.newDrink, name: e.target.value },
                  })
                }
              />
              <Form.Text className="text-muted">Name of the item</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter price"
                step="0.01"
                onChange={(e) =>
                  this.setState({
                    newDrink: {
                      ...this.state.newDrink,
                      price: parseInt(e.target.value),
                    },
                  })
                }
              />
              <Form.Text className="text-muted">Price of the item</Form.Text>
            </Form.Group>
            <Button variant="success" type="submit">
              Add
            </Button>
          </Form>
        </Alert>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.submitTransaction();
          }}
        >
          <div className="date">
            <label>Pick date: </label>
            <input
              id="date"
              type="date"
              name="date"
              value={this.state.date}
              onChange={(e) => this.setState({ date: e.target.value })}
              required
            />
            <label>Pick time of transaction:</label>
            <input
              id="time"
              type="time"
              name="time"
              value={this.state.time}
              onChange={(e) => this.setState({ time: e.target.value })}
              required
            />
          </div>
          <div className="lemonade-gallery">
            {this.state.lemonades.map((drink) => (
              <LemonadeSelection
                key={drink.name}
                drink={drink}
                handleChange={this.handleChange}
              />
            ))}
          </div>
          <div className="footer">
            <h4>
              Total: $
              {this.state.lemonades
                .reduce((accul, lemonade) => {
                  const quantity = lemonade.quantity
                    ? parseInt(lemonade.quantity)
                    : 0;
                  return accul + quantity * lemonade.price;
                }, 0)
                .toFixed(2)}
            </h4>
            <Button type="submit">Submit Transaction</Button>
            <Button
              variant="danger"
              onClick={() => this.setState({ showRemove: true })}
            >
              Remove Drinks
            </Button>
            <Button variant="success" onClick={this.addToMenu}>
              Add To Menu
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default FormPage;
