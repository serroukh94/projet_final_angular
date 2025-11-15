import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @HostBinding('class.is-highlighted') highlighted = false;

  @HostListener('mouseenter') onEnter() {
    this.highlighted = true;
  }

  @HostListener('mouseleave') onLeave() {
    this.highlighted = false;
  }
}
