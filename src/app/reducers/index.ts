    import { ActionReducerMap, createSelector } from "@ngrx/store";
    import * as fromUser from "./user-reducer";

    export interface RootReducerState {
      users: fromUser.UserReducerState
    }
    // Master Reducer Contains all Reducers
    export const rootReducer : ActionReducerMap<RootReducerState> = {
      users: fromUser.UserReducer
    }

    // Selectors for Root
    export const getUserState = (state: RootReducerState) => state.users;

    // Create Users
    export const getUserloading = createSelector(getUserState, fromUser.getLoading)
    export const getUserLoaded = createSelector(getUserState, fromUser.getLoaded)
    export const getUsers = createSelector(getUserState, fromUser.getUsers)