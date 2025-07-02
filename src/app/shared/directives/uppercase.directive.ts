import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUppercase]',
  standalone: true
})
export class UppercaseDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input')
  onInput() {
    const input = this.el.nativeElement;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    const uppercased = input.value.toUpperCase();
    if (input.value !== uppercased) {
      input.value = uppercased;

      input.setSelectionRange(start, end);

      const event = new Event('input', { bubbles: true });
      input.dispatchEvent(event);
    }
  }
}
