import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wtf2PriceFormatComponent } from './wtf2-price-format.component';
import { CustomCurrencyPipe } from './custom-currency.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [Wtf2PriceFormatComponent, CustomCurrencyPipe],
    exports: [Wtf2PriceFormatComponent],
})
export class Wtf2PriceFormatModule {}
