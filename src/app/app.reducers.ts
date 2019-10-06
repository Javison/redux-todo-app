import { Todo } from './todo/model/todo.model';
import { ActionReducerMap } from '@ngrx/store';

import * as fromTodo from './todo/todo.reducer';
import * as fromFiltro from './filter/filter.reducer';
import { filtrosValidos } from './filter/filter.action';


export interface AppState {
    todos: Todo[];
    filtro: filtrosValidos;
    // usuario:
}



export const appReducers: ActionReducerMap<AppState> = {
    todos: fromTodo.todoReducer,
    filtro: fromFiltro.filtroReducer
};