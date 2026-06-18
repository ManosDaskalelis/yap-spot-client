import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-voice-and-video-settings',
  imports: [FormsModule],
  templateUrl: './voice-and-video-settings.component.html',
  styleUrl: './voice-and-video-settings.component.css',
})
export class VoiceAndVideoSettingsComponent implements OnInit, OnDestroy {
  currentInputVol: number = 0;
  mediaStream: MediaStream | null = null;
  errorMessage: string = '';
  audioDevices: MediaDeviceInfo[] = [];
  audioContext: AudioContext | null = null;
  analyser: AnalyserNode | null = null;
  volume = signal(0);
  gainNode: GainNode | undefined = undefined;
  private animationId: number = 0;

  async ngOnInit() {
    await this.requestMicrophonePermission();
  }

  startAnalyzer() {
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.gainNode = this.audioContext?.createGain();

    const source = this.audioContext.createMediaStreamSource(this.mediaStream!);
    source.connect(this.gainNode);
    this.gainNode.connect(this.analyser);

    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    const tick = () => {
      this.analyser!.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      // this.currentInputVol = Math.round((avg / 255) * 100)
      this.volume.set(Math.round((avg / 255) * 100));
      requestAnimationFrame(tick);
    };
    tick();
  }

  async requestMicrophonePermission(): Promise<void> {
    this.errorMessage = '';

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.errorMessage = 'Your browser does not support audio recording.';
      return;
    }

    try {
      const allowedMedia = { audio: true, video: false };
      this.mediaStream = await navigator.mediaDevices.getUserMedia(allowedMedia);

      const devices = await navigator.mediaDevices.enumerateDevices();
      this.startAnalyzer();
      this.audioDevices = devices.filter((d) => d.kind === 'audioinput');

      console.log('Microphone permission granted successfully.');
    } catch (error: any) {
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

  stopMicrophone(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
  }

  onVolumeChange(): void {
    if (this.gainNode) {
      this.gainNode.gain.value = this.currentInputVol / 50;
    }
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.stopMicrophone();
    this.audioContext?.close();
  }
}
