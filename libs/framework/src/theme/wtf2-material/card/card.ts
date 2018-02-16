/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Directive,
  Input,
} from '@angular/core';


/**
 * Content of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
@Directive({
  selector: 'wtf2-card-content',
  host: {'class': 'wtf2-card-content'}
})
export class Wtf2CardContent {}

/**
 * Title of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
@Directive({
  selector: `wtf2-card-title, [wtf2-card-title], [wtf2CardTitle]`,
  host: {
    'class': 'wtf2-card-title'
  }
})
export class Wtf2CardTitle {}

/**
 * Sub-title of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
@Directive({
  selector: `wtf2-card-subtitle, [wtf2-card-subtitle], [wtf2CardSubtitle]`,
  host: {
    'class': 'wtf2-card-subtitle'
  }
})
export class Wtf2CardSubtitle {}

/**
 * Action section of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
@Directive({
  selector: 'wtf2-card-actions',
  exportAs: 'wtf2CardActions',
  host: {
    'class': 'wtf2-card-actions',
    '[class.wtf2-card-actions-align-end]': 'align === "end"',
  }
})
export class Wtf2CardActions {
  /** Position of the actions inside the card. */
  @Input() align: 'start' | 'end' = 'start';
}

/**
 * Footer of a card, needed as it's used as a selector in the API.
 * @docs-private
 */
@Directive({
  selector: 'wtf2-card-footer',
  host: {'class': 'wtf2-card-footer'}
})
export class Wtf2CardFooter {}

/**
 * Image used in a card, needed to add the wtf2- CSS styling.
 * @docs-private
 */
@Directive({
  selector: '[wtf2-card-image], [wtf2CardImage]',
  host: {'class': 'wtf2-card-image'}
})
export class Wtf2CardImage {}

/**
 * Image used in a card, needed to add the wtf2- CSS styling.
 * @docs-private
 */
@Directive({
  selector: '[wtf2-card-sm-image], [wtf2CardImageSmall]',
  host: {'class': 'wtf2-card-sm-image'}
})
export class Wtf2CardSmImage {}

/**
 * Image used in a card, needed to add the wtf2- CSS styling.
 * @docs-private
 */
@Directive({
  selector: '[wtf2-card-md-image], [wtf2CardImageMedium]',
  host: {'class': 'wtf2-card-md-image'}
})
export class Wtf2CardMdImage {}

/**
 * Image used in a card, needed to add the wtf2- CSS styling.
 * @docs-private
 */
@Directive({
  selector: '[wtf2-card-lg-image], [wtf2CardImageLarge]',
  host: {'class': 'wtf2-card-lg-image'}
})
export class Wtf2CardLgImage {}

/**
 * Large image used in a card, needed to add the wtf2- CSS styling.
 * @docs-private
 */
@Directive({
  selector: '[wtf2-card-xl-image], [wtf2CardImageXLarge]',
  host: {'class': 'wtf2-card-xl-image'}
})
export class Wtf2CardXlImage {}

/**
 * Avatar image used in a card, needed to add the wtf2- CSS styling.
 * @docs-private
 */
@Directive({
  selector: '[wtf2-card-avatar], [wtf2CardAvatar]',
  host: {'class': 'wtf2-card-avatar'}
})
export class Wtf2CardAvatar {}


/**
 * A basic content container component that adds the styles of a Material design card.
 *
 * While this component can be used alone, it also provides a number
 * of preset styles for common card sections, including:
 * - wtf2-card-title
 * - wtf2-card-subtitle
 * - wtf2-card-content
 * - wtf2-card-actions
 * - wtf2-card-footer
 */
@Component({
  moduleId: module.id,
  selector: 'wtf2-card',
  exportAs: 'wtf2Card',
  templateUrl: 'card.html',
  styleUrls: ['card.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'wtf2-card'}
})
export class Wtf2Card {}


/**
 * Component intended to be used within the `<wtf2-card>` component. It adds styles for a
 * preset header section (i.e. a title, subtitle, and avatar layout).
 * @docs-private
 */
@Component({
  moduleId: module.id,
  selector: 'wtf2-card-header',
  templateUrl: 'card-header.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'wtf2-card-header'}
})
export class Wtf2CardHeader {}


/**
 * Component intended to be used within the `<wtf2-card>` component. It adds styles for a preset
 * layout that groups an image with a title section.
 * @docs-private
 */
@Component({
  moduleId: module.id,
  selector: 'wtf2-card-title-group',
  templateUrl: 'card-title-group.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'wtf2-card-title-group'}
})
export class Wtf2CardTitleGroup {}
