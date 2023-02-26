import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";

const cartsAdapter = createEntityAdapter({
  selectId: (cart) => cart.id,
});

const initialState = cartsAdapter.getInitialState({
  loading: false,
});

export const cartSelector = cartsAdapter.getSelectors((state) => state.cart);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.entities[product.id];
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        cartsAdapter.addOne(state, product);
      }
    },
  },
  extraReducers: (builder) => {},
});

export default cartSlice.reducer;
