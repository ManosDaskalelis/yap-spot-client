import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-account',
  imports: [CommonModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css',
})
export class MyAccountComponent {
  accountItems = [
    {
      key: 'my-account',
      label: 'Display Name',
      secondLabel: 'manos_d',
      icon: 'pi-user',
      btnLabel: 'Edit',
    },
    {
      key: 'email',
      label: 'Email',
      secondLabel: 'manos@yap.com',
      icon: 'pi-envelope',
      btnLabel: 'Edit',
    },
    {
      key: 'password',
      label: 'Password',
      secondLabel: 'Last changed 3 months ago',
      icon: 'pi-lock',
      btnLabel: 'Change',
    },
    {
      key: 'auth',
      label: 'Two-factor Auth',
      secondLabel: 'Enabled',
      icon: 'pi-shield',
      btnLabel: 'Manage',
    },
  ];
}
