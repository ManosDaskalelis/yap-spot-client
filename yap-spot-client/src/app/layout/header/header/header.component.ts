import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { SignalRService } from '../../../core/services/signal-rservice';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  signalRService = inject(SignalRService);
  themeService = inject(ThemeService);

  public toggle() {
    this.themeService.toggle();
    this.signalRService.getOnlineUsers();
  }
}
