import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToggleTodoAction, EditarTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;

  chkField: FormControl;
  txtInput: FormControl;

  editando: boolean;

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    console.log( this.todo );

    this.chkField = new FormControl( this.todo.completado );
    this.txtInput = new FormControl( this.todo.texto, Validators.required );

    this.chkField.valueChanges
      .subscribe( valor => {
        console.log(valor);
        const action = new ToggleTodoAction(this.todo.id);
        this.store.dispatch(action);
      });
  }


  editar() {
    this.editando = true;

    setTimeout( ()=>{
      this.txtInputFisico.nativeElement.select();
    }, 1);

  }

  terminarEdicion() {
    this.editando = false;
    console.log('Accion de edicion this.txtInput.value:', this.txtInput.value);
    console.log('Accion de edicion this.todo.texto:', this.todo.texto);

    if ( this.txtInput.value == this.todo.texto ){
      return;
    }
    const action = new EditarTodoAction(this.todo.id, this.txtInput.value());
    this.store.dispatch(action);
  }

  borrarTodo() {
    const accion = new BorrarTodoAction( this.todo.id );
    this.store.dispatch(accion);
  }

}
