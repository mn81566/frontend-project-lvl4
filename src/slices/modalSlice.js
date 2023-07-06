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
      // eslint-disable-next-line
      state.isOpened = true;
      // eslint-disable-next-line
      state.type = payload.type;
      // eslint-disable-next-line
      state.extra = { channelId: payload.channelId };
    },
    closeModal: (state) => {
      // eslint-disable-next-line
      state.isOpened = false;
      // eslint-disable-next-line
      state.type = null;
      // eslint-disable-next-line
      state.extra = null;
    },
  },
  // extraReducers: (builder) => {},
});

export const { showModal, closeModal } = modalSlice.actions;
// export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);

export default modalSlice.reducer;
