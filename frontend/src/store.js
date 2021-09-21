import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  latestProductReducer,
  deleteProductReducer,
  createProductReducer,
  adminProductListReaducer,
  updateProductReducer,
} from "./Reducers/productReducer";
import { cartReducer } from "./Reducers/cartReducer";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./Reducers/userReducers";
import {
  orderAdminListReducers,
  orderCreateReducer,
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPaymentReducer,
} from "./Reducers/orderReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productAdminList: adminProductListReaducer,
  productDetails: productDetailsReducer,
  latestProduct: latestProductReducer,
  productDelete: deleteProductReducer,
  productCreate: createProductReducer,
  productUpdate: updateProductReducer,

  cart: cartReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPayment: orderPaymentReducer,
  orderDeliver: orderDeliveredReducer,
  orderListMy: orderListReducer,

  orderListAdmin: orderAdminListReducers,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
