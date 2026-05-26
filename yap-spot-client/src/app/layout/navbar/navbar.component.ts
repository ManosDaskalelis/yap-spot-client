import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SecondaryNavbarComponent } from '../secondary-navbar/secondary-navbar.component';
import { NavSection } from '../../shared/models/nav-section.enum';

@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, SecondaryNavbarComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly NavSection = NavSection;
  selected: NavSection | null = null;
}
