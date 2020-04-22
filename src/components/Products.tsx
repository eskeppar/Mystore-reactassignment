import React, { useEffect, useState, useContext } from "react";
import { Grid, Container, Button, Menu, MenuItem } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../App";

const apiUrl =
  "https://medieinstitutet-wie-products.azurewebsites.net/api/products";

interface IProductCategory {
  categoryId: number;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  year: number;
  added: Date;
  productCategory: IProductCategory[];
}

const Products: React.FC = () => {
  const { addToCart } = useContext(ShoppingCartContext);
  const defaultProducts: IProduct[] = [];

  const [products, setProducts] = useState(defaultProducts);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Grid container>
        {products.map((product) => (
          <Grid item xs={12} md={3}>
            <img
              onClick={() => addToCart!(product)}
              width="300"
              height="400"
              src={product.imageUrl}
            ></img>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => addToCart!(product)}
            >
              Add to Cart +
            </Button>
            <p>{product.price} kr </p>
            <p>{product.description}</p>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;

// interface IShowProducts {
//   title: string;
//   id: number;
//   name: string;
//   price: number;
//   onChange(): any;
//   movies: string;
// }

// const initialState: IShowProducts= {
//   defaultMovies: [],
//   id: number;
// };
// export const Store = React.createContext<IState | any>(initialState);

// function reducer(state: IState, action: IAction): IState {
//   switch (action.type) {
//     case "FETCH_DATA":
//       return { ...state, defaultMovies: action.payload };
//     default:
//       return state;
//   }
// }

// export function StoreProvider(props: any): JSX.Element {
//   const [state, dispatch] = React.useReducer(reducer, initialState);
//   return (
//     <Store.Provider value={{ state, dispatch }}>
//       {props.children}
//     </Store.Provider>
//   );
// }
