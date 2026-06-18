import { Component, OnInit, signal, ViewChild, ElementRef, AfterViewChecked, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Message } from '../../shared/models/message.model';
import { userList, Users } from '../../shared/models/users-mock';

@Component({
  selector: 'app-room',
  imports: [CommonModule, FormsModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent implements OnInit, AfterViewChecked, OnDestroy {
  private route = inject(ActivatedRoute);
  private routeSub!: Subscription;
  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  roomName = '';
  messages = signal<Message[]>([]);
  inputValue = '';
  usersInRoom: Users[] = userList;

  private roomMessages = new Map<string, Message[]>();

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const name = params.get('roomName') ?? '';
      if (this.roomName && this.roomName !== name) {
        this.roomMessages.set(this.roomName, this.messages());
      }
      this.roomName = name;
      this.messages.set(this.roomMessages.get(name) ?? []);
      this.inputValue = '';
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.messagesEnd?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  sendMessage(): void {
    const trimmed = this.inputValue.trim();
    if (!trimmed) return;

    this.messages.update((prev) => [
      ...prev,
      {
        content: trimmed,
        senderUsername: 'Εγώ',
        senderPfp: '',
        timestamp: new Date(),
        isOwn: true,
      },
    ]);
    this.roomMessages.set(this.roomName, this.messages());
    this.inputValue = '';
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' });
  }
}
