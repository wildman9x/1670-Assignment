import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import { getAuthor } from "./author";
import { getGenre } from "./genre";
import { getPublisher } from "./publisher";

const booksAdapter = createEntityAdapter({
  selectId: (book) => book.id,
});

const initialState = booksAdapter.getInitialState({
  loading: false,
});

export const booksSelector = booksAdapter.getSelectors((state) => state.book);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      booksAdapter.setAll(state, action.payload);
      state.loading = false;
    });
    builder.addCase(createBook.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getBook.fulfilled, (state, action) => {
      booksAdapter.upsertOne(state, action.payload);
      state.loading = false;
    });
    builder.addMatcher(
      isAnyOf(fetchBook.pending, createBook.pending, getBook.pending),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(fetchBook.rejected, createBook.rejected, getBook.rejected),
      (state) => {
        state.loading = true;
      }
    );
  },
});

export default bookSlice.reducer;

export const fetchBook = createAsyncThunk(
  "book/fetchBook",
  async (_, { dispatch }) => {
    const response = await fetch("/api/Book");
    const data = await response.json();
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    const authors = data
      .reduce((acc, book) => {
        return [...acc, ...book.authorsId];
      }, [])
      .map((author) => author.authorId);
    const uniqueAuthors = [...new Set(authors)];
    const genres = data
      .reduce((acc, book) => {
        return [...acc, ...book.genresId];
      }, [])
      .map((genre) => genre.genreId);
    const uniqueGenres = [...new Set(genres)];
    const publishers = data.map((book) => book.publisherId);
    const uniquePublishers = [...new Set(publishers)];

    await Promise.all(uniqueAuthors.map((id) => dispatch(getAuthor(id))));
    await Promise.all(uniqueGenres.map((id) => dispatch(getGenre(id))));
    await Promise.all(uniquePublishers.map((id) => dispatch(getPublisher(id))));

    return data;
  }
);

export const createBook = createAsyncThunk(
  "book/createBook",
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

export const getBook = createAsyncThunk(
  "book/getBook",
  async (id, { getState }) => {
    const storedAuthor = booksSelector.selectById(getState(), id);
    if (storedAuthor) {
      return storedAuthor;
    }
    const response = await fetch("/api/Author/" + id);
    const data = await response.json();
    return data;
  }
);
