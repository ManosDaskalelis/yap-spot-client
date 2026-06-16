import {
  Component,
  signal,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { userList, Users } from '../../shared/models/users-mock';
import { Message } from '../../shared/models/message.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dm',
  imports: [CommonModule, FormsModule],
  templateUrl: './dm.component.html',
  styleUrl: './dm.component.css',
})
export class DmComponent implements AfterViewChecked, OnInit {
  route = inject(ActivatedRoute);
  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  user: Users | undefined;
  messages = signal<Message[]>([]);

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.user = userList.find((u) => u.username === username);
    this.messages.set([
      {
        content: 'Hello',
        senderUsername: this.user?.username ?? '',
        senderPfp: this.user?.pfp ?? '',
        timestamp: new Date(),
        isOwn: false,
      },
    ]);
  }

  inputValue = '';

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  sendMessage(): void {
    const trimmed = this.inputValue.trim();
    if (!trimmed) return;

    this.messages.update((prev) => [
      ...prev,
      {
        content: trimmed,
        senderUsername: 'Εγώ',
        senderPfp: this.user?.pfp ?? '',
        timestamp: new Date(),
        isOwn: true,
      },
    ]);

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

  private scrollToBottom(): void {
    this.messagesEnd?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
