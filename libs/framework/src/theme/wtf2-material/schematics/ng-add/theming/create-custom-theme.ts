/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/** Create custom theme for the given application configuration. */
export function createCustomTheme(name: string = 'app') {
return `
// Custom Theming for Angular Material
// For more inFormation: https://material.angular.io/guide/theming
@import '~@angular/material/theming';
// Plus imports for other components in your app.

// Include the common styles for Angular Material. We include this here so that you only
// have to load a single css file for Angular Material in your app.
// Be sure that you only ever include this mixin once!
@include wtf2-core();

// Define the palettes for your theme using the Material Design palettes available in palette.scss
// (imported above). For each palette, you can optionally specify a default, lighter, and darker
// hue. Available color palettes: https://material.io/design/color/
$${name}-primary: wtf2-palette($wtf2-indigo);
$${name}-accent: wtf2-palette($wtf2-pink, A200, A100, A400);

// The warn palette is optional (defaults to red).
$${name}-warn: wtf2-palette($wtf2-red);

// Create the theme object (a Sass map containing all of the palettes).
$${name}-theme: wtf2-light-theme($${name}-primary, $${name}-accent, $${name}-warn);

// Include theme styles for core and each component used in your app.
// Alternatively, you can import and @include the theme mixins for each component
// that you are using.
@include wtf2-theme($${name}-theme);

`;
}
