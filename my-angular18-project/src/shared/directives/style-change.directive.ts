import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appStyleChange]',
  standalone: true,
})
export class StyleChangeDirective implements OnInit {
  @Input() appStyleChange: {
    [key: string]: string
  } | null = null;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    if (this.appStyleChange) {
      for (const key in this.appStyleChange) {
        this.renderer.setStyle(this.el.nativeElement, key, this.appStyleChange[key]);
      }
    }
  }
}
