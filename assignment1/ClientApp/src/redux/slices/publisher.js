import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";

const publishersAdapter = createEntityAdapter({
  selectId: (publisher) => publisher.id,
});

const initialState = publishersAdapter.getInitialState({
  loading: false,
});

export const publisherSelector = publishersAdapter.getSelectors(
  (state) => state.publisher
);

export const genreSlice = createSlice({
  name: "publisher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPublishers.fulfilled, (state, action) => {
      publishersAdapter.setAll(state, action.payload);
      state.loading = false;
    });
    builder.addCase(createPublisher.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getPublisher.fulfilled, (state, action) => {
      publishersAdapter.upsertOne(state, action.payload);
      state.loading = false;
    });
    builder.addMatcher(
      isAnyOf(
        fetchPublishers.pending,
        createPublisher.pending,
        getPublisher.pending
      ),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        fetchPublishers.rejected,
        createPublisher.rejected,
        getPublisher.rejected
      ),
      (state) => {
        state.loading = true;
      }
    );
  },
});

export default genreSlice.reducer;

export const fetchPublishers = createAsyncThunk(
  "publisher/fetchPublishers",
  async () => {
    const response = await fetch("/api/Publisher");
    const data = await response.json();
    return data;
  }
);

export const createPublisher = createAsyncThunk(
  "publisher/createPublisher",
  async (author) => {
    const response = await fetch("/api/Publisher", {
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

export const getPublisher = createAsyncThunk(
  "publisher/getPublisher",
  async (id) => {
    const response = await fetch("/api/Publisher/" + id);
    const data = await response.json();
    return data;
  }
);
