import {
  LyTheme,
  ProvidedInTheme,
  StyleData
} from '@alyle/ui';
import {
  ElementRef,
  Inject,
  Injectable,
  Renderer2
} from '@angular/core';

@Injectable(ProvidedInTheme)
export class LyButtonService {
  private rootClassName: string;
  private themeClassName: string;
  classes = {
    root: this.theme.createStyle(
      'rbtn',
      rootStyle,
      true
    ).id,
    outlined: this.theme.createStyle(
      'btntlnd',
      () => (
        `border: 1px solid currentColor`
      )
    ).id
  };
  constructor(
    private theme: LyTheme
  ) {
    // this.rootClassName = this.theme.createStyle('rbtn', rootStyle, true).id;
    this.themeClassName = this.theme.createStyle('btn', this.style.bind(this)).id;
  }

  applyTheme(renderer: Renderer2, elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, this.classes.root);
    renderer.addClass(elementRef.nativeElement, this.themeClassName);
  }

  private style() {
    return `font-family:${this.theme.palette.typography.fontFamily};` +
    `font-size:${this.theme.palette.typography.fontSize}px;` +
    `color:${this.theme.palette.text.default};`;
  }
}

function rootStyle() {
  return '-webkit-tap-highlight-color: transparent;' +
  'padding:0 16px;' +
  'background-color:rgba(0, 0, 0, 0);' +
  'border:none;' +
  '-moz-appearance:none;' +
  'min-height:36px;' +
  'height:36px;' +
  'margin:0;' +
  'border-radius:3px;' +
  'outline:none;' +
  'font-weight:500;' +
  'min-width:88px;' +
  'box-sizing:border-box;' +
  'position:relative;' +
  'text-align:center;' +
  'cursor:pointer;' +
  '-webkit-user-select:none;' +
  '-moz-user-select:none;' +
  '-ms-user-select:none;' +
  'user-select:none;' +
  `display:inline-flex;` +
  `justify-content:center;` +
  `align-items:center;` +
  'text-decoration-line:none;' +
  '-webkit-text-decoration-line:none;' +
  'transition:all 375ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;';
}