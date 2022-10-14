import { createAction, props } from "@ngrx/store";
import { AppState } from "./appstate";

export const setApiStatus=createAction(
    '[API] success or failure status',
    props<{apiStatus:AppState}>()
) 