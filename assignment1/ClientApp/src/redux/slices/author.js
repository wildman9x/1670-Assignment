import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";

const authorsAdapter = createEntityAdapter({
  selectId: (author) => author.id,
});

const initialState = authorsAdapter.getInitialState({
  loading: false,
});

export const authorSelector = authorsAdapter.getSelectors(
  (state) => state.author
);

export const authorSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthors.fulfilled, (state, action) => {
      authorsAdapter.setAll(state, action.payload);
      state.loading = false;
    });
    builder.addCase(createAuthor.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getAuthor.fulfilled, (state, action) => {
      authorsAdapter.upsertOne(state, action.payload);
      state.loading = false;
    });
    builder.addMatcher(
      isAnyOf(fetchAuthors.pending, createAuthor.pending, getAuthor.pending),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(fetchAuthors.rejected, createAuthor.rejected, getAuthor.rejected),
      (state) => {
        state.loading = true;
      }
    );
  },
});

export default authorSlice.reducer;

export const fetchAuthors = createAsyncThunk(
  "authors/fetchAuthors",
  async () => {
    const response = await fetch("/api/Author");
    const data = await response.json();
    return data;
  }
);

export const createAuthor = createAsyncThunk(
  "authors/addAuthor",
  async (author) => {
    const response = await fetch("/api/Author", {
      method: "POST",
      body: JSON.stringify(author),
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }
);

export const getAuthor = createAsyncThunk("authors/getAuthor", async (id) => {
  const response = await fetch("/api/Author/" + id);
  const data = await response.json();
  return data;
});
