import { Component, OnInit } from '@angular/core';

import * as fromFiltros from '../../filter/filter.action';
import * as fromTodos from '../todo.actions';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  pendiente: number;
  filtrosValidos: fromFiltros.filtrosValidos [] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFiltros.filtrosValidos;


  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.contarPendientes( state.todos );
      console.log('this.filtroActual:', this.filtroActual);

    });
  }

  cambiarFiltro( nuevoFiltro: fromFiltros.filtrosValidos ) {
    const accion = new fromFiltros.SetFiltroAction(nuevoFiltro);
    this.store.dispatch(accion);
  }


  contarPendientes( todos: Todo[] ) {

    this.pendiente = todos.filter( iTodo => !iTodo.completado ).length;
  }

  clearCompleted() {
    const accion = new fromTodos.BorrarCompletadosAction();
    this.store.dispatch(accion);
  } 

}
