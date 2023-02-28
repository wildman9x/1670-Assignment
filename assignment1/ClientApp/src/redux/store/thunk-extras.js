import { AppDispatch } from ".";
import { RootState } from "../RootReducer";

export const thunkExtras = {};

type ThunkExtras = typeof thunkExtras;

export interface AppThunkConfig {
  extra: ThunkExtras;
  state: RootState;
  dispatch: AppDispatch;
}
