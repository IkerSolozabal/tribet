import {Component} from '@angular/core';
import {EventLocations, EventTagsEmun} from '../../../../shared/emuns/endpoints.enum';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgForOf} from '@angular/common';

@Component({
  selector: 'app-new-event',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './new-event.component.html',
  styleUrl: './new-event.component.css'
})
export class NewEventComponent {
  eventLocations: string[] = Object.values(EventLocations) as string[];
  eventTagsEmun: string[] = Object.values(EventTagsEmun) as string[];

  tags: string[] = []; // Array para almacenar los tags
  newTag: string = ''; // Variable para el nuevo tag

  // Método para agregar un tag
  addTag() {
    if (this.newTag && !this.tags.includes(this.newTag)) {
      this.tags.push(this.newTag);
      this.newTag = ''; // Limpiar el campo de texto
      console.log('TAGS', this.tags)
    }
  }

  // Método para eliminar un tag
  removeTag(index: number) {
    this.tags.splice(index, 1);
  }

  // Método para enviar el formulario
  onSubmit(form: any) {
    console.log('Evento creado:', form.value);
    console.log('Tags:', this.tags);
    // Aquí puedes manejar la creación del evento
  }

  // Método para cancelar el formulario
  cancelForm() {
    console.log('Formulario cancelado');
    // Aquí puedes hacer lo que sea necesario, como resetear el formulario o redirigir
  }
}
