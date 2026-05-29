import { Injectable, signal } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  public onlineUsers = signal<string[]>([]);

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7274/hubs/chat')
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connected');
        this.getOnlineUsers();
      })
      .catch((err) => console.log('Error establishing SignalR connection: ' + err));
  };

  public addUserActivityListener = () => {
    this.hubConnection.on('OnlineUsers', (users: string[]) => {
      console.log('Online users:', users);
      this.onlineUsers.set(users);
    });

    this.hubConnection.on('UserOnline', (user) => {
      console.log('User came online:', user);
      this.onlineUsers.update(users => [...users, user]);
    });

    this.hubConnection.on('UserOffline', (user) => {
      console.log('User went offline:', user);
      this.onlineUsers.update(users => users.filter(u => u !== user));
    });
  }

  public getOnlineUsers = () => {
    this.hubConnection.invoke('GetOnlineUsers')
      .then(() => console.log('GetOnlineUsers invoked successfully'))
      .catch(err => console.log('Error invoking GetOnlineUsers: ', err));
  }
}
