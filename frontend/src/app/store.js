import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import newsReducer from "../features/fianncialnews/financialnewsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    // redux dev toolで stateの名称になるため非常に重要
    news: newsReducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
// export type AppDispatch = typeof store.dispatch;