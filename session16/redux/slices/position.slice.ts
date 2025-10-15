import { getAllPosition } from "@/apis/position.api";
import { Position } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  data: Position[];
  status: "ILDE" | "PENDING" | "FULFILLED" | "FAILED";
  error: string | undefined;
};

const initialState: InitialState = {
  data: [],
  status: "ILDE",
  error: undefined,
};

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllPosition.pending, (state, action) => {
        // Cập nhật lại giá trị của state
        state.status = "PENDING";
      })
      .addCase(getAllPosition.fulfilled, (state, action) => {
        // action lấy từ?
        state.status = "FULFILLED";
        state.data = action.payload.data;
      })
      .addCase(getAllPosition.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.error.message;
      });
  },
});

export default positionSlice.reducer;