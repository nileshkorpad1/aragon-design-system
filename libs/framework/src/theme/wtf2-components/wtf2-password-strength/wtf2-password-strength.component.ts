import { Component, OnInit, OnChanges, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'wtf2-password-strength-bar',
  templateUrl: './wtf2-password-strength.component.html',
  styleUrls: ['./wtf2-password-strength.component.scss']
})
export class Wtf2PasswordStrengthComponent implements OnChanges {

  @Input() passwordToCheck: string;
  @Input() barLabel: string;
  color: string;
  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;
  bar4: string;
  scorePer: string;

  textStrength: string;
  colorText: string;


  private colors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];

  private static measureStrength(pass: string) {
    let score = 0;


    // award every unique letter until 5 repetitions
    let letters = {};
    for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }
    // bonus points for mixing it up
    let variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass),
    };

    let variationCount = 0;
    for (let check in variations) {
      variationCount += (variations[check]) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    //check if password length is greater than 1
    if (pass.length > 1) {
      score += 5;
    }
    return Math.trunc(score);
  }

  private getColor(score: number) {
    let idx = 0;
    let scorePerc = 0;
    let textStrength = '';
    let setColor = '';
    let setColorText = '';
    if (score > 90) {
      idx = 5;
      scorePerc = 100;
      textStrength = 'Strong';
      setColor = 'success';
      setColorText = 'green';
    } else if (score > 60) {
      idx = 4;
      scorePerc = 70;
      textStrength = 'Fair';
      setColor = 'orange';
      setColorText = 'orange';
    }
    // else if (score > 40) {
    //   idx = 3;
    //   scorePerc = 60;
    //   textStrength = 'Moderate';
    //   setColor = 'accent';
    //   setColorText = 'accent';
    // }
     else if (score > 20) {
      idx = 2;
      scorePerc = 40;
      textStrength = 'Weak';
      setColor = 'warn';
      setColorText = 'warn';
    }
    else if (score > 9) {
      idx = 1;
      scorePerc = 20;
      textStrength = 'Weak';
      setColor = 'warn';
      setColorText = 'warn';
    }
    return {
      idx: idx + 1,
      col: this.colors[idx],
      color: setColor,
      score: scorePerc,
      textStrength: textStrength,
      setColorText: setColorText,
    };
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    var password = changes['passwordToCheck'].currentValue;
    //console.log(password);
    this.setBarColors(5, '#DDD', 0, '', '', '');
    if (password) {
      let c = this.getColor(Wtf2PasswordStrengthComponent.measureStrength(password));
      // console.log(c);
      this.setBarColors(c.idx, c.col, c.score, c.textStrength, c.color, c.setColorText);
    }
  }
  private setBarColors(count, col, score, textStrength, color, colorText) {
    for (let _n = 0; _n < count; _n++) {
      this['bar' + _n] = col;
      this['color'] = color;
      this['scorePer'] = score;
      this['textStrength'] = textStrength;
      this['colorText'] = colorText;
    }
  }

}
