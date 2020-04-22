import React, { useContext } from "react";
import { ShoppingCartContext } from "../App";
import { Container } from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

const ShoppingCart: React.FC = () => {
  const { cartContents, removeFromCart } = useContext(ShoppingCartContext);

  return (
    <Container fixed>
      <div>
        <h1>Shopping Cart</h1>
        <ul>
          {Object.keys(cartContents).map((id) => (
            <li>
              {cartContents[id].product.name} x{cartContents[id].amount}:{" "}
              {cartContents[id].product.price * cartContents[id].amount}:-
              <IconButton aria-label="delete">
                <DeleteIcon onClick={() => removeFromCart!(id)} />
              </IconButton>
            </li>
          ))}
        </ul>
        <Link to="/checkout">
          <Button variant="outlined" color="primary" size="large">
            Check out
          </Button>
        </Link>
      </div>
    </Container>
  );
};
export default ShoppingCart;
