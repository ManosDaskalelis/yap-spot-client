import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './my-account-settings/my-account/my-account.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, MyAccountComponent, RouterOutlet],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  selected = signal('my-account');

  accountItems = [
    { key: 'my-account', label: 'My Account', icon: 'pi-user' },
    { key: 'privacy', label: 'Privacy', icon: 'pi-shield' },
    { key: 'security', label: 'Security', icon: 'pi-key' },
    { key: 'connections', label: 'Connections', icon: 'pi-github' },
  ];

  appItems = [
    { key: 'appearance', label: 'Appearance', icon: 'pi-moon' },
    { key: 'notifications', label: 'Notifications', icon: 'pi-bell' },
    { key: 'voice-video', label: 'Voice & Video', icon: 'pi-microphone' },
    { key: 'keybinds', label: 'Keybinds', icon: 'pi-wrench' },
    { key: 'accessibility', label: 'Accessibility', icon: 'pi-eye-slash' },
  ];

  developItems = [
    { key: 'developer', label: 'Developer', icon: 'pi-code' },
    { key: 'experiments', label: 'Experiments', icon: 'pi-sparkles' },
  ];

  navigateTo(key: string): void {
    this.selected.set(key);
    this.router.navigate([key], {relativeTo: this.route});
  }
}
