import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface PositionDetail {
  id: string;
  name: string;
  [key: string]: any;
}

interface PositionDetailState {
  detail: PositionDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: PositionDetailState = {
  detail: null,
  loading: false,
  error: null,
};

export const fetchPositionDetail = createAsyncThunk(
  'positionDetail/fetchPositionDetail',
  async (
    { id, accessToken }: { id: string; accessToken: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get(`https://nest-api-public.ixe-agent.io.vn/api/v1/positions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch failed');
    }
  }
);

const positionDetailSlice = createSlice({
  name: 'positionDetail',
  initialState,
  reducers: {
    clearDetail(state) {
      state.detail = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPositionDetail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPositionDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(fetchPositionDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDetail } = positionDetailSlice.actions;
export default positionDetailSlice.reducer;
