import { Component, signal } from '@angular/core';
import { RoomInfo, roomInformation } from '../../shared/models/room.model';

@Component({
  selector: 'app-secondary-navbar',
  imports: [],
  templateUrl: './secondary-navbar.component.html',
  styleUrl: './secondary-navbar.component.css',
})
export class SecondaryNavbarComponent {
  roomInfo: RoomInfo = roomInformation;
  generalOpen = signal(true);
  voiceOpen = signal(true);
}
