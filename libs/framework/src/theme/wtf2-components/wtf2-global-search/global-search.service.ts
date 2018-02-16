import { Injectable, Inject, ComponentFactoryResolver } from "@angular/core";
import { Subject } from 'rxjs';
import { Wtf2GlobalSearchComponent } from './global-search.component';

@Injectable({providedIn: 'root'})
export class Wtf2GlobalSearchService {
    private componentMethodCall = new Subject<any>();
    factoryResolver;
    rootViewContainer;
    //componentMethodCallService = this.componentMethodCall.asObservable();

    constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
        this.factoryResolver = factoryResolver;
    }
    setRootViewContainerRef(viewContainerRef) {
        this.rootViewContainer = viewContainerRef;
    }
    addDynamicComponent() {
        const factory = this.factoryResolver.resolveComponentFactory(
            Wtf2GlobalSearchComponent,
        );
        console.log(this.rootViewContainer);
        const component = factory.create(this.rootViewContainer);
        var node = document.querySelector("vertical-layout-1");
        node.className =
            node.className + " rotate-layout wtf2-elevation-z24";
        var app = document.querySelector("app");
        app.setAttribute('id', 'app');
        //app.innerHTML = component.hostView.rootNodes[0].innerHTML;
        //node.insertAdjacentHTML('afterend', '<wtf2-search-bar></wtf2-search-bar>');
        // const div = this.renderer.createElement("div");
        // const text = this.renderer.createText("Hello world!");

        var g = document.createElement("wtf2-global-search-bar");
        g.setAttribute("id", "searchbar");
        g.setAttribute("class", "search-box-layout");
        g.innerHTML = component.hostView.rootNodes[0].innerHTML;
        //g.innerHTML = component.hostView.getRootNode;
        //node.appendChild(div, text);
        console.log("component", component.hostView.rootNodes[0].innerHTML);
        //console.log(this.el);
        document.getElementById("app").appendChild(g);
        //app.appendChild(component.hostView);
        //document.insert(component.hostView);
        //app.insert(component.hostView);
    }

    // private globalesearch = new Wtf2GlobalSearchComponent();
    // searchopen() {
    //     console.log("servide");
    //     this.globalesearch.searchview();
    //     //this.globalsearchcomponent.searchview();
    //     //this.componentMethodCall.next();
    //     //console.log(this.componentMethodCall.next());
    // }
}