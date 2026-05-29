import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HeaderComponent } from './layout/header/header/header.component';
import { SignalRService } from './core/services/signal-rservice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private signalRService = inject(SignalRService);

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addUserActivityListener();
  }
  protected readonly title = signal('yap-spot-client');
}
