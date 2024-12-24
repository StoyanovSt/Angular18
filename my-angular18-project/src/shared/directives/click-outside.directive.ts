import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[clickOutsideDirectiveSelector]',
  standalone: true,
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {
  @Output() clickedOutside = new EventEmitter<void>();
  documentClickSubscription: Subscription | undefined;

  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    this.documentClickSubscription = fromEvent(this.document, 'click')
      .pipe(filter((event) => !this.isInside(event.target as HTMLElement)))
      .subscribe(() => {
        this.clickedOutside.emit();
      });
  }

  private isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck === this.elementRef.nativeElement ||
      this.elementRef.nativeElement.contains(elementToCheck)
    );
  }

  ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe();
  }
}
