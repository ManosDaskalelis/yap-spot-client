import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RoomInfo, roomInformation } from '../../shared/models/room.model';

@Component({
  selector: 'app-secondary-navbar',
  imports: [],
  templateUrl: './secondary-navbar.component.html',
  styleUrl: './secondary-navbar.component.css',
})
export class SecondaryNavbarComponent {
  private router = inject(Router);
  roomInfo: RoomInfo = roomInformation;
  generalOpen = signal(true);
  voiceOpen = signal(true);

  goToRoom(roomName: string): void {
    this.router.navigate(['/room', roomName]);
  }

  goToSettings(): void {
    this.router.navigate(['/user-settings']);
  }
}
