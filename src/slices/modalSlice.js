/* eslint-disable no-param-reassign */
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
});

export const { showModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
