export class SVG {
    'use strict';

    namespace = 'http://www.w3.org/2000/svg';

    element: SVGElement;

    constructor (tagName: string) {
        this.element = this.createSVGElement(tagName);
    }

    createSVGElement (tagName: string): SVGElement {
        let element: SVGElement = <SVGElement>document.createElementNS(
            this.namespace, tagName);

        return element;
    }

    attr (name: string, value: any): SVGElement {
        this.element.setAttribute(name, value);

        return this.element;
    }

    attrs (_attrs: Object) {
        for (let key in _attrs) {
            this.attr(key, _attrs[key]);
        }
    }

    appendTo (element: SVGElement) {
        element.appendChild(this.element);
    }

    remove () {
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}
