import { combineReducers } from "redux";

import { products } from "./products.reducer";
import { banners } from "./banners.reducer";
import { brands } from "./brands.reducer";
import { categories } from "./categories.reducer";
import { users } from "./users.reducer";
import { cart } from "./carts.reducer";
import { ratings } from "./ratings.reducer";

const rootReducer = combineReducers({
  products,
  banners,
  brands,
  categories,
  users,
  cart,
  ratings,
});

export default rootReducer;
