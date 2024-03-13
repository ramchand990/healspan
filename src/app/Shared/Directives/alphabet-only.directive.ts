import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphabetOnly]'
})
export class AlphabetOnlyDirective {

  key:any;
  constructor() { }
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    this.key = event.keyCode;
      // console.log(this.key);
    // if ((this.key >= 15 && this.key <= 64) || (this.key >= 123) || (this.key >= 96 && this.key <= 105)) {
    //   event.preventDefault();
    // }

    if ((this.key >= 15 && this.key <= 31) || (this.key >= 33 && this.key <= 36) || (this.key >= 40 &&  this.key <= 64) || (this.key >= 123 && this.key <=189)||(this.key >= 191) || (this.key >= 96 && this.key <= 105)) {
      event.preventDefault();
    }
  } 
}
