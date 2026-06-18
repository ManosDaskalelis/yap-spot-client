import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-appearance',
  imports: [],
  templateUrl: './appearance.component.html',
  styleUrl: './appearance.component.css',
})
export class AppearanceComponent {
  themeService = inject(ThemeService);
}
