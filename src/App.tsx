import React, { useEffect, useState } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Products, { IProduct } from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import NavMenu from "./components/NavMenu";
import Checkout from "./components/Checkout";
import "./App.css";

interface ICartItem {
  product: IProduct;
  amount: number;
}

interface ICartContents {
  [id: string]: ICartItem;
}

interface IShoppingCartContext {
  cartContents: ICartContents;
  addToCart: ((arg0: IProduct) => void) | null;
  removeFromCart: ((arg0: string) => void) | null;
}

export const ShoppingCartContext = React.createContext({
  cartContents: {},
  addToCart: null,
  removeFromCart: null,
} as IShoppingCartContext);

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((value) => ++value);
}

const App: React.FC = () => {
  const [cartContents, setCartContents] = useState({} as ICartContents);
  const forceUpdate = useForceUpdate();

  const addToCart = (product: IProduct) => {
    if (cartContents[product.id]) {
      cartContents[product.id].amount += 1;
    } else {
      cartContents[product.id] = {
        amount: 1,
        product,
      };
    }

    setCartContents(cartContents);
  };

  const removeFromCart = (id: string) => {
    if (cartContents[id].amount > 1) {
      cartContents[id].amount -= 1;
    } else {
      delete cartContents[id];
    }

    setCartContents(cartContents);
    forceUpdate();
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cartContents, addToCart, removeFromCart }}
    >
      <Router>
        <NavMenu />
        <Switch>
          <Route path="/cart">
            <ShoppingCart />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/tack">
            <h1>Tack för din beställning!</h1>
          </Route>
          <Route path="/">
            <Products />
          </Route>
        </Switch>
      </Router>
    </ShoppingCartContext.Provider>
  );
};

export default App;

// export default function App(): any React.Element () => {
//  const { state, dispatch } = React.useContext(Products);

// interface IMovie {
//   id: number,
// }

//   React.useEffect(() => {
//     state.movies.length === 0 && showproductsAction();
//   });

//   const showproductsAction = async () => {
//   const apiUrl ="https://medieinstitutet-wie-products.azurewebsites.net/api/products"
//       const data = await axios(apiUrl);
//       const dataJSON = data.json();
//       return dispatch({
//         type: "FETCH_DATA",
//         payload: dataJSON
//       })
//     }

//   return (

//     <React.Fragment>

//       <div> {products.map}> </div>
//     </>
//   );
// };

//   return (
//     <React.Fragment>
//       <h1> Eriks Store </h1>
//       <section>
//         {state.movies.map((movie: any) => {
//           return (
//             <section key={movie.id}>
//               <img
//                 src={movie.image.medium}
//                 alt={`defaultMovies ${movie.name}`}
//               />
//               <div>{movie.name}</div>
//               <section>Movie: {movie.name}</section>
//             </section>
//           );
//         })}
//       </section>
//     </React.Fragment>
//   );
// }

// export default function (): JSX.Element {
//   const store = React.useContext(Store);
//   return (
//     <React.Fragment>
//       {console.log(store)}
//       <h1> Eriks Store </h1>
//     </React.Fragment>
//   );
// }
