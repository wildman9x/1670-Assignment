import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
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
      console.log(existingProduct);
      if (existingProduct) {
        console.log("existing");
        existingProduct.quantity++;
      } else {
        cartsAdapter.addOne(state, {
          id: product.id,
          book: product,
          quantity: 1,
        });
      }
    },
    minusProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.entities[product.id];
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity--;
        } else {
          cartsAdapter.removeOne(state, product.id);
        }
      }
    },
  },
  extraReducers: (builder) => {},
});

export const { addProduct, minusProduct } = cartSlice.actions;
export const addToCart = createAsyncThunk(
  "cart/addProduct",
  async (product, { dispatch }) => {
    await fetch(`/api/Home/AddToCart${product.id}`, {
      method: "GET",
    });
    dispatch(addProduct(product));
  }
);

export const minusToCart = createAsyncThunk(
  "cart/minusProduct",
  async (product, { dispatch }) => {
    await fetch(`/api/Home/DecreaseCartItem/${product.id}`, {
      method: "GET",
    });
    dispatch(minusProduct(product));
  }
);

export default cartSlice.reducer;
