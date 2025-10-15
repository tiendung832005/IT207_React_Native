import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Position {
  id: string;
  name: string;
  [key: string]: any;
}

interface PositionsState {
  positions: Position[];
  loading: boolean;
  error: string | null;
}

const initialState: PositionsState = {
  positions: [],
  loading: false,
  error: null,
};

export const fetchPositions = createAsyncThunk(
  'positions/fetchPositions',
  async (accessToken: string, { rejectWithValue }) => {
    try {
      const res = await axios.get('https://nest-api-public.ixe-agent.io.vn/api/v1/positions', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch failed');
    }
  }
);

const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPositions.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPositions.fulfilled, (state, action) => {
        state.loading = false;
        state.positions = action.payload;
      })
      .addCase(fetchPositions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default positionsSlice.reducer;
