import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  extra: null,
};

const modalSlice = createSlice({
  name: 'modalInfo',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.isOpened = true;
      state.type = payload.type;
      state.extra = { channelId: payload.channelId };
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.extra = null;
    },
  },
  // extraReducers: (builder) => {},
});

export const { showModal, closeModal } = modalSlice.actions;
// export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);

export default modalSlice.reducer;
