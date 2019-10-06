import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../todo/model/todo.model';
import { filtrosValidos } from './filter.action';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform( todos: Todo[], filtro: filtrosValidos ): Todo[] {

    console.log(todos);
    console.log(filtro);

    switch ( filtro ) {
      case 'pendientes':
        return todos.filter( iTodo => !iTodo.completado);

      case 'completados':
        return todos.filter( iTodo => iTodo.completado);
    
      default:
        return todos;
    }
    
  }



}
