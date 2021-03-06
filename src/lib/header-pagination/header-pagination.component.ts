import { Component, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'ly-header-pagination',
  templateUrl: 'header-pagination.html',
  styleUrls: [
    'header-pagination.css',
  ],
  host: {
    '(mouseenter)': 'updateAll()',
  },

})
export class LyHeaderPagination {
  _with = 150;
  _withHost: number;
  _positionX = 0;
  traslateWidth = 100;
  elementContainer: any;
  constructor(
    private elementRef: ElementRef,
  ) {

  }
  updateAll() {
    this._with = this.elementContainer.clientWidth;
    this._withHost = this.elementRef.nativeElement.clientWidth;
    /*console.log(this.elementContainer.clientWidth);*/

    /*console.log(
      'this._positionX',
      this._positionX,
      'this._withHost',
      this._withHost,
      'this._with',
      this._with,
    );*/
  }
  @ViewChild('elementContainer') _elementContainer: ElementRef;
  ngAfterContentInit() {
    this.elementContainer = this.elementRef.nativeElement.querySelector('._container_items');
    this._withHost = this.elementRef.nativeElement.clientWidth;
    /*console.log(this.elementContainer.clientWidth);*/
    this._with = this.elementContainer.clientWidth;
  }
  _to_left() {
    this.updateAll();
    this._positionX = this._positionX + this.traslateWidth;
    if (this._positionX < 0) {
      this.elementContainer.setAttribute('style', `
      left: ${this._positionX}px;
      `);
    } else {
      this._positionX = 0;
      this.elementContainer.setAttribute('style', `
      left: ${0};
      `);
    }
  }
  _to_right() {
    this.updateAll();
    this._positionX = this._positionX - this.traslateWidth;
    if (-(this._positionX) + this._withHost <= this._with) {
      this.elementContainer.setAttribute('style', `
      left: ${this._positionX}px;
      `);
    } else {
      this._positionX = -(this._with) + this._withHost;
      this.elementContainer.setAttribute('style', `
      left: ${-(this._with) + this._withHost}px;
      `);
    }
  }
}
