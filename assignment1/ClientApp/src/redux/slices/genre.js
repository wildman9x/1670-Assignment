import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";

const genresAdapter = createEntityAdapter({
  selectId: (genre) => genre.id,
});

const initialState = genresAdapter.getInitialState({
  loading: false,
});

export const genreSelector = genresAdapter.getSelectors((state) => state.genre);

export const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      genresAdapter.setAll(state, action.payload);
      state.loading = false;
    });
    builder.addCase(createGenre.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getGenre.fulfilled, (state, action) => {
      genresAdapter.upsertOne(state, action.payload);
      state.loading = false;
    });
    builder.addMatcher(
      isAnyOf(fetchGenres.pending, createGenre.pending, getGenre.pending),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(fetchGenres.rejected, createGenre.rejected, getGenre.rejected),
      (state) => {
        state.loading = true;
      }
    );
  },
});

export default genreSlice.reducer;

export const fetchGenres = createAsyncThunk("genre/fetchGenres", async () => {
  const response = await fetch("/api/Genre");
  const data = await response.json();
  return data;
});

export const createGenre = createAsyncThunk(
  "genre/createGenre",
  async (author) => {
    const response = await fetch("/api/Genre", {
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

export const getGenre = createAsyncThunk(
  "genre/getGenre",
  async (id, { getState }) => {
    const stored = genreSelector.selectById(getState(), id);
    if (stored) {
      return stored;
    }
    const response = await fetch("/api/Genre/" + id);
    const data = await response.json();
    return data;
  }
);
