import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers } from '../services/userService';

interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  login: {
    username: string;
  };
  picture: {
    thumbnail: string;
  };
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  sortBy: 'name' | 'username' | null;
  sortOrder: 'asc' | 'desc';
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 10,
  sortBy: null,
  sortOrder: 'asc',
};

export const fetchUsersThunk = createAsyncThunk(
  'user/fetchUsers',
  async ({ page, resultsPerPage }: { page: number; resultsPerPage: number }) => {
    const users = await fetchUsers(page, resultsPerPage);
    return users;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSort(state, action: PayloadAction<{ sortBy: 'name' | 'username'; sortOrder: 'asc' | 'desc' }>) {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    sortUsers(state) {
      const { sortBy, sortOrder } = state;
      if (sortBy) {
        state.users.sort((a, b) => {
          const aValue = sortBy === 'name' ? `${a.name.first} ${a.name.last}` : a.login.username;
          const bValue = sortBy === 'name' ? `${b.name.first} ${b.name.last}` : b.login.username;
          if (sortOrder === 'asc') {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { setPage, setSort, sortUsers } = userSlice.actions;

export default userSlice.reducer;
