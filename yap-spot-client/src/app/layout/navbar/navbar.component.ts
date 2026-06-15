import { Component, signal, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SecondaryNavbarComponent } from '../secondary-navbar/secondary-navbar.component';
import { NavSection } from '../../shared/models/nav-section.enum';

@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, SecondaryNavbarComponent, RouterOutlet],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly NavSection = NavSection;
  selected = signal<NavSection | null>(null);
  private router = inject(Router);

  selectFriends(): void {
    this.selected.set(NavSection.Friends);
    this.router.navigate(['/friends']);
  }
}
