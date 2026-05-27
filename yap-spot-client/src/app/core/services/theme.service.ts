import { Injectable, signal, computed, DOCUMENT, inject } from '@angular/core';

export type Theme = 'light-theme' | 'dark-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private document = inject(DOCUMENT);

  private _theme = signal<Theme>('dark-theme');

  readonly theme = this._theme.asReadonly();
  readonly isLight = computed(() => this._theme() === 'light-theme');

  constructor() {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) this.apply(saved);
  }

  toggle() {
    this.apply(this._theme() === 'dark-theme' ? 'light-theme' : 'dark-theme');
  }

  private apply(theme: Theme) {
    this.document.documentElement.classList.remove('light-theme', 'dark-theme');
    this.document.documentElement.classList.add(theme);
    this._theme.set(theme);
    localStorage.setItem('theme', theme);
  }
}
