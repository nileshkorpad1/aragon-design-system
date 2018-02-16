/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {InjectionToken} from '@angular/core';
import {CdkAccordion} from '@angular/cdk/accordion';

/** Wtf2Accordion's display modes. */
export type Wtf2AccordionDisplayMode = 'default' | 'flat';

/**
 * Base interface for a `Wtf2Accordion`.
 * @docs-private
 */
export interface Wtf2AccordionBase extends CdkAccordion {
  /** Whether the expansion indicator should be hidden. */
  hideToggle: boolean;

  /** Display mode used for all expansion panels in the accordion. */
  displayMode: Wtf2AccordionDisplayMode;

  /** Handles keyboard events coming in from the panel headers. */
  _handleHeaderKeydown: (event: KeyboardEvent) => void;

  /** Handles focus events on the panel headers. */
  _handleHeaderFocus: (header: any) => void;
}


/**
 * Token used to provide a `Wtf2Accordion` to `Wtf2ExpansionPanel`.
 * Used primarily to avoid circular imports between `Wtf2Accordion` and `Wtf2ExpansionPanel`.
 */
export const WTF2_ACCORDION = new InjectionToken<Wtf2AccordionBase>('WTF2_ACCORDION');
