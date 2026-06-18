import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-voice-and-video-settings',
  imports: [FormsModule],
  templateUrl: './voice-and-video-settings.component.html',
  styleUrl: './voice-and-video-settings.component.css',
})
export class VoiceAndVideoSettingsComponent implements OnInit {
  currentInputVol: number = 0;
  mediaStream: MediaStream | null = null;
  errorMessage: string = '';

  ngOnInit(): void {
    // this.requestMicrophonePermission();
  }

  async requestMicrophonePermission(): Promise<void> {
    this.errorMessage = '';

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.errorMessage = 'Your browser does not support audio recording.';
      return;
    }

    try {
      // 2. Request the microphone permission
      const allowedMedia = { audio: true, video: true };
      this.mediaStream = await navigator.mediaDevices.getUserMedia(allowedMedia);

      console.log('Microphone permission granted successfully.');
      // You can now pass this.mediaStream to a MediaRecorder instance
    } catch (error: any) {
      // 3. Handle errors (Permission denied, device missing, etc.)
      this.handlePermissionError(error);
    }
  }

  private handlePermissionError(error: any): void {
    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      this.errorMessage =
        'Permission denied. Please allow microphone access in your browser settings.';
    } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      this.errorMessage = 'No microphone device found on this system.';
    } else {
      this.errorMessage = `Error accessing microphone: ${error.message}`;
    }
    console.error(error);
  }

  // Clean up the microphone stream when done or when component destroys
  stopMicrophone(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
  }
}
