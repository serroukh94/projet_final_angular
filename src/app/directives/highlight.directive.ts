import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @HostBinding('class.is-highlighted') highlighted = false;

  @HostListener('mouseenter') onEnter() { 
    // debug log to confirm the directive fires
    try { console.debug('[HighlightDirective] enter', (this as any)); } catch(e){}
    this.highlighted = true; 
  }
  @HostListener('mouseleave') onLeave() { 
    try { console.debug('[HighlightDirective] leave', (this as any)); } catch(e){}
    this.highlighted = false; 
  }
}
