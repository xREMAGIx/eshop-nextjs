import { combineReducers } from "redux";

import { products } from "./products.reducer";
import { banners } from "./banners.reducer";
import { brands } from "./brands.reducer";
import { categories } from "./categories.reducer";
import { users } from "./users.reducer";

const rootReducer = combineReducers({
  products,
  banners,
  brands,
  categories,
  users,
});

export default rootReducer;
