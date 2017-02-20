import {IManifest} from '../lib/manifest';

export interface IComponent {
    element: HTMLElement;
}

export class Component implements IComponent {
    element: HTMLElement;
    parent: HTMLElement;

    constructor (public manifest: IManifest) {}
    addStyle (element: HTMLElement, css: CSSStyleDeclaration) {
        for (let c in css) {
            element.style[c] = css[c];
        }
    }
    renderComponentManifests (manifests: IManifest[]) {
        if (manifests) {
            for (let i = 0; i < manifests.length; i++) {
                let component = new Component(manifests[i]);
                component.render(this.element);
            }
        }
    }
    render (parent: HTMLElement) {
        this.parent = parent;

        this.element = document.createElement('div');
        this.element.className = 'Component ' + this.manifest.component_type;
        this.element.id = this.manifest.id;

        this.renderComponentManifests(this.manifest['component_manifests']);

        this.addStyle(this.element, this.manifest.css);

        this.parent.appendChild(this.element);
    }
}
