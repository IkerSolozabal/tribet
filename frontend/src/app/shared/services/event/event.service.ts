import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private selectedEvent: any = null;

  setSelectedEvent(event: any) {
    this.selectedEvent = event;
  }

  getSelectedEvent() {
    return this.selectedEvent;
  }
}
