import { NgZone } from '@angular/core';
import { Platform } from '@alyle/ui';

export interface RippleConfig {
  centered?: boolean;
  disabled?: boolean;
  sensitive?: boolean;
  radius?: 'containerSize' | number;
  percentageToIncrease?: number;
}

export class RippleRef {
  state = true;
  timestamp = -Date.now();
  readonly container: HTMLElement = document.createElement('span');
  end() {
    this.state = false;
    this.timestamp += Date.now();
  }
}

export class Ripple {
  private _rippleRef: RippleRef;
  private _eventHandlers: Map<string, (e: Event) => void> = new Map<string, (e: Event) => void>();
  private rippleConfig: RippleConfig = {};
  private _transitionDuration = '950ms';
  private _eventOptions = {passive: true} as any;
  constructor(
    private _ngZone: NgZone,
    private classes: any,
    private _containerElement: HTMLElement,
    private _triggerElement?: HTMLElement
  ) {
    if (Platform.isBrowser) {
      if (typeof TouchEvent === 'function' && !!TouchEvent) {
        this._eventHandlers.set('pointerdown', this.onPointerDown.bind(this));
        this._eventHandlers.set('touchend', this.onPointerLeave.bind(this));
      } else {
        this._eventHandlers.set('mousedown', this.onPointerDown.bind(this));
      }
      this._eventHandlers.set('mouseup', this.onPointerLeave.bind(this));
      this._eventHandlers.set('mouseleave', this.onPointerLeave.bind(this));
      if (!_triggerElement) {
        _triggerElement = _containerElement;
      }
      this.setTriggerElement(_triggerElement);
    }
  }

  setConfig(config: RippleConfig) {
    this.rippleConfig = config;
  }

  private get _rectContainer(): ClientRect {
    return this._containerElement.getBoundingClientRect();
  }

  private setTriggerElement(element: HTMLElement | null) {
    if (element) {
      // element.classList.add(this.stylesData[0]);
      // this._renderer.addClass(element, this.stylesData[0].id);
      this._ngZone.runOutsideAngular(() => {
        this._eventHandlers.forEach((fn, type) => element.addEventListener(type, fn, this._eventOptions));
      });
    }

    this._triggerElement = element;
  }

  private createRipple(styles: {[key: string]: number | string}) {
    this._rippleRef = new RippleRef();
    const container = this._rippleRef.container;
    container.className = this.classes.rippleContainer;
    for (const key in styles) {
      if (styles.hasOwnProperty(key)) {
        const element = styles[key];
        if (typeof element === 'number') {
          container.style[key] = `${element}px`;
        } else {
          container.style[key] = element;
        }
      }
    }
    this._containerElement.appendChild(container);
    window.getComputedStyle(container).getPropertyValue('opacity');
    container.style.transform = `scale(1)`;
  }

  private onPointerDown(event: MouseEvent) {
    if (!this.rippleConfig.disabled) {
      /**Destroy previous ripple if exist */
      this.endRipple();
      this.startRipple(event, this.rippleConfig);
    }
  }
  private onPointerLeave(event: MouseEvent) {
    if (!this.rippleConfig.disabled) {
      this.endRipple();
    }
  }

  startRipple(event: MouseEvent | PointerEvent, rippleConfig: RippleConfig) {
    const containerRect = this._rectContainer;
    let x = event.clientX,
    y = event.clientY;
    if (rippleConfig.centered) {
      x = containerRect.left + containerRect.width / 2;
      y = containerRect.top + containerRect.height / 2;
    }
    const left = x - containerRect.left;
    const top = y - containerRect.top;
    let radius = rippleConfig.radius === 'containerSize' ? maxSize(containerRect) / 2 : rippleConfig.radius || rippleRadius(x, y, containerRect);
    if (rippleConfig.percentageToIncrease) {
      radius += radius * rippleConfig.percentageToIncrease / 100;
    }
    const ripple = this.createRipple({
      left: left - radius,
      top: top - radius,
      width: radius * 2,
      height: radius * 2,
      transitionDuration: this._transitionDuration
    });
  }

  private runTimeoutOutsideZone(fn: Function, delay = 0) {
    this._ngZone.runOutsideAngular(() => setTimeout(fn, delay));
  }

  endRipple() {
    const rippleRef: RippleRef = this._rippleRef || null;
    const duration = parseFloat(this._transitionDuration);
    if (rippleRef && rippleRef.state) {
      rippleRef.end();
      this.runTimeoutOutsideZone(() => {
        rippleRef.container.style.opacity = '0';
        rippleRef.container.style.transitionDuration = '200ms';
      // }, rippleRef.timestamp < duration ? duration : 0);
      // }, rippleRef.timestamp < duration ? duration / (duration * .001 + 1) : 0);
      }, rippleRef.timestamp < duration ? duration * .15 : 0);
      this.runTimeoutOutsideZone(() => {
        rippleRef.container.parentNode.removeChild(rippleRef.container);
      // }, rippleRef.timestamp < duration ? duration * 2 : duration);
      // }, rippleRef.timestamp < duration ? duration / (duration * .001 + 1) * 2 : duration);
      }, rippleRef.timestamp < duration ? duration * 2 : duration);
    }
  }
  removeEvents() {
    if (this._triggerElement) {
      this._eventHandlers.forEach((fn, type) => {
        this._triggerElement.removeEventListener(type, fn, this._eventOptions);
      });
    }
  }

}

function rippleRadius(x: number, y: number, rect: ClientRect) {
  const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
  const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
  return Math.sqrt(distX * distX + distY * distY);
}

function maxSize(rect: ClientRect) {
  return Math.max(rect.width, rect.height);
}
