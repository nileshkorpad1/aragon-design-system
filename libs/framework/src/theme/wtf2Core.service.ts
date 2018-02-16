import { InjectionToken } from '@angular/core';

export interface Wtf2ThemeOptions {
  name: string;
}

export const WTF2_THEME_OPTIONS = new InjectionToken<Wtf2ThemeOptions>('Wtf2 Theme Options');
/**
 * We're providing browser apis with tokens to improve testing capabilities.
 * */
export const WTF2_WINDOW = new InjectionToken<Window>('Window');
export const WTF2_DOCUMENT = new InjectionToken<Document>('Document');
