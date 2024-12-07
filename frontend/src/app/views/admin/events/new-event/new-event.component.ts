import {Component} from '@angular/core';
import {Endpoints, EventLocations, EventTagsEmun, MadridLocations} from '../../../../shared/emuns/endpoints.enum';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RestService} from '../../../../shared/services/rest/rest.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

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

  constructor(private restService: RestService, private router: Router) {
  }

  eventLocations: string[] = Object.values(EventLocations) as string[];
  eventTagsEmun: string[] = Object.values(EventTagsEmun) as string[];
  availableSubLocations: any[] = [];
  selectedLocation: any = null;
  selectedSubLocation: any = null;

  tags: string[] = []; // Array para almacenar los tags
  newTag: string = ''; // Variable para el nuevo tag

  onLocationChange() {
    switch (this.selectedLocation) {
      case EventLocations.MADRID:
        this.availableSubLocations = Object.values(MadridLocations);
        break;
      default:
        this.availableSubLocations = [];
    }
  }

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


  onSubmit(form: any) {
    this.restService.post(Endpoints.EVENTS, {
      name: form.value.name,
      startDate: form.value.startDate || undefined,
      location: {
        city: this.selectedLocation || undefined,
        venue: this.selectedSubLocation || undefined
      },
      tags: this.tags.length > 0 ? this.tags : undefined
    }).pipe(
      catchError(error => {
        console.error('Error al crear el evento:', error);

        alert(error.error.error);

        return of(null);
      })
    ).subscribe(res => {
      if (res) {
        console.log("Evento", res);
        this.router.navigate(['/admin/events']);
      }
    });
  }

// Método para cancelar el formulario
  cancelForm() {
    this.router.navigate(['/admin/events']);
  }
}
