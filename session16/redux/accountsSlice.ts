import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Account {
  id: string;
  name: string;
  likes: number;
  liked: boolean;
}

interface AccountsState {
  accounts: Account[];
}

const initialState: AccountsState = {
  accounts: [
    { id: '1', name: 'Nguyen Van A', likes: 0, liked: false },
    { id: '2', name: 'Tran Thi B', likes: 0, liked: false },
    { id: '3', name: 'Le Van C', likes: 0, liked: false },
  ],
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<string>) {
      const account = state.accounts.find(acc => acc.id === action.payload);
      if (account) {
        account.liked = !account.liked;
        account.likes += account.liked ? 1 : -1;
      }
    },
  },
});

export const { toggleLike } = accountsSlice.actions;
export default accountsSlice.reducer;
