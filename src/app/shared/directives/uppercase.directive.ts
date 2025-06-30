import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUppercase]',
  standalone: true
})
export class UppercaseDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event.target'])
  onInput(input: HTMLInputElement) {
    input.value = input.value.toUpperCase();
  }
}
