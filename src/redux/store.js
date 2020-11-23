import { createStore, combineReducers } from "redux";
import authReducer from "./authReducer";
import mainReducer from "./mainReducer";
import { AsyncStorage } from "react-native";
import { persistReducer, persistStore } from "redux-persist";


const reducer = combineReducers({
  auth: authReducer,
  main: mainReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);

let persistor = persistStore(store);

export { store, persistor };
