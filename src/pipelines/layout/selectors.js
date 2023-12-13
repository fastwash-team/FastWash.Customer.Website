import { createSelector } from "@reduxjs/toolkit";

const layout = (state = {}) => state.layout;

export const getBackgroundLoaderState = createSelector(
  layout,
  (el) => el.backgroundLoader
);
