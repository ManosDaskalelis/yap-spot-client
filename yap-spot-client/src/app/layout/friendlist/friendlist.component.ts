import { Component, OnInit, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Users, userList } from '../../shared/models/users-mock';

@Component({
  selector: 'app-friendlist',
  imports: [],
  templateUrl: './friendlist.component.html',
  styleUrl: './friendlist.component.css',
})
export class FriendlistComponent implements OnInit {
  private router = inject(Router);
  usersOnline = signal<number | null>(null);
  foundUsers = signal<Users[]>([]);

  users: Users[] = userList;

  ngOnInit(): void {
    this.showOnline();
  }

  showOnline() {
    let count = 0;
    this.users.forEach((u) => {
      if (u.status === 'online' || u.status === 'away') {
        count++;
        this.usersOnline.set(count);
      }
    });
  }

  goToDm(username: string): void {
    this.router.navigate(['/dm', username]);
  }

  findUser(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (!value) {
      this.foundUsers.set([]);
      return;
    }
    this.foundUsers.set(
      this.users.filter((u) => u.username.toLowerCase().includes(value.toLowerCase()))
    );
    return this.foundUsers;
  }
}
