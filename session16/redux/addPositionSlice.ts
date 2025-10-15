import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AddPositionState {
  success: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AddPositionState = {
  success: false,
  loading: false,
  error: null,
};

export const addPosition = createAsyncThunk(
  'addPosition/addPosition',
  async (
    { positionName, positionStatus, description, accessToken }: {
      positionName: string;
      positionStatus: string;
      description: string;
      accessToken: string;
    },
    { rejectWithValue }
  ) => {
    try {
      await axios.post(
        'https://nest-api-public.ixe-agent.io.vn/api/v1/positions',
        {
          positionName,
          positionStatus,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return true;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add failed');
    }
  }
);

const addPositionSlice = createSlice({
  name: 'addPosition',
  initialState,
  reducers: {
    resetAddPosition(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addPosition.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addPosition.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addPosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetAddPosition } = addPositionSlice.actions;
export default addPositionSlice.reducer;
