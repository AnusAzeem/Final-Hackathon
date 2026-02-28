import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/authSlice.js";

// Redux Persist imports
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

// Persist configuration
const persistConfig = {
  key: "user", // key for localStorage
  storage, // storage type
  whitelist: ["user", "token"], // sirf ye properties persist hongi
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, userReducer);

// Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
    serializableCheck: {
      // ignore redux-persist actions
      ignoredActions: [
        "persist/PERSIST",
        "persist/REHYDRATE",
        "persist/PAUSE",
        "persist/PURGE",
        "persist/FLUSH",
        "persist/REGISTER",
      ],
    },
  }),
});

// Persistor
export const persistor = persistStore(store);
