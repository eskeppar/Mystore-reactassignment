import React, { useContext, useEffect } from "react";
import {
  Button,
  Container,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Grid,
} from "@material-ui/core/";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ShoppingCartContext } from "../App";

interface IOrderRow {
  productId: number;
  amount: number;
}

interface IOrder {
  companyId: number;
  created: string;
  createdBy: string;
  paymentMethod: string;
  totalPrice: number;
  orderRows: IOrderRow[];
}

const Checkout: React.FC = () => {
  const { cartContents } = useContext(ShoppingCartContext);
  const history = useHistory();
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const [paymentMethod, setPaymentMethod] = React.useState("");

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setPaymentMethod(event.target.value as string);
  };

  useEffect(() => {
    let total = 0;
    Object.keys(cartContents).forEach((id) => {
      total += cartContents[id].product.price * cartContents[id].amount;
    });
    setTotalPrice(total);
  }, [cartContents]);

  const postOrder = () => {
    const created = new Date();
    const order: IOrder = {
      companyId: 5,
      created: created.toISOString(),
      createdBy: email,
      paymentMethod: paymentMethod,
      totalPrice: totalPrice,
      orderRows: [],
    };
    Object.keys(cartContents).forEach((id) => {
      const orderRow: IOrderRow = {
        amount: cartContents[id].amount,
        productId: parseInt(id, 10),
      };

      order.orderRows.push(orderRow);
    });

    axios
      .post(
        "https://medieinstitutet-wie-products.azurewebsites.net/api/orders",
        order,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res);
        history.push("/tack");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container fixed>
      <React.Fragment>
        <div>
          <h1>Check Out</h1>
          <ul>
            {Object.keys(cartContents).map((id) => (
              <li>
                {cartContents[id].product.name} x{cartContents[id].amount}:{" "}
                {cartContents[id].product.price * cartContents[id].amount}:-
              </li>
            ))}
          </ul>
        </div>
        <h4>Total: {totalPrice}:-</h4>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="E-mail"
              value={email}
              onChange={handleEmailChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl style={{ width: "200px" }}>
              <InputLabel>Betalningsmetod</InputLabel>
              <Select
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <MenuItem value={"visa"}>Visa</MenuItem>
                <MenuItem value={"mastercard"}>MasterCard</MenuItem>
                <MenuItem value={"paypal"}>PayPal</MenuItem>
              </Select>
              <FormHelperText>Välj betalningsmetod</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              style={{ marginTop: "5px" }}
              onClick={postOrder}
            >
              Buy
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    </Container>
  );
};

export default Checkout;
