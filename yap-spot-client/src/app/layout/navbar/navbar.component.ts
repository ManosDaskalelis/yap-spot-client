import { Component, signal, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { SecondaryNavbarComponent } from '../secondary-navbar/secondary-navbar.component';
import { NavSection } from '../../shared/models/nav-section.enum';
import { roomInformation } from '../../shared/models/room.model';

@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, SecondaryNavbarComponent, RouterOutlet],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  readonly NavSection = NavSection;
  selected = signal<NavSection | null>(null);
  private router = inject(Router);

  ngOnInit(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      const url = (e as NavigationEnd).url;
      if (url === '/user-settings') {
        this.selected.set(null);
      }
    });
  }

  selectFriends(): void {
    this.selected.set(NavSection.Friends);
    this.router.navigate(['/friends']);
  }

  selectRooms(): void {
    this.selected.set(NavSection.Rooms);
    const firstRoom = roomInformation.chatRooms[0]?.roomName;
    if (firstRoom) {
      this.router.navigate(['/room', firstRoom]);
    }
  }
}
