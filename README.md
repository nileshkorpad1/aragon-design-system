# Microframework

This project was generated using Angular 8, React 16.9

## Quick Start & Documentation

[Project Documentation](https://confluence.deskera.com/display/DEV/WTF2+Dev+Notes)

<p>For demo and sample controls please Visit </p>
<p>
http://192.168.0.121/staging/wtf2framework or http://114.143.142.228/staging/wtf2framework
</p>
<h2>
  <strong>Coding Standards</strong>
</h2>
<table class="relative-table wrapped" style="width: 92.25%;">
  <colgroup> <col style="width: 19.5298%;"/> <col style="width: 40.2351%;"/> <col style="width: 40.2351%;"/> </colgroup>
  <tbody>
    <tr>
      <th>Item</th>
      <th>Rules</th>
      <th>Example</th>
    </tr>
    <tr>
      <td>File Name &amp; Class Name</td>
      <td>
        <ol>
          <li>File name should be similar and also reflect the exported class name</li>
          <li>"Custom" file name should be separated by hyphen except for native angular file name which is separated by period/dot :<ol>
              <li>.component.ts</li>
              <li>.component.scss</li>
              <li>.component.html</li>
              <li>.module.ts</li>
              <li>.directive.ts</li>
              <li>.service.ts</li>
            </ol>
          </li>
          <li>All file name should be lower case.</li>
          <li>Class name should be Pascal Case</li>
        </ol>
      </td>
      <td>
        <p>File name : wtf2-button.component.ts should have class name of Wtf2ButtonComponent.</p>
        <p>Other example of file names and class name :</p>
        <table class="wrapped">
          <tbody>
            <tr>
              <th>File Name</th>
              <th>Class Name</th>
            </tr>
            <tr>
              <td>wtf2-button.module.ts</td>
              <td>Wtf2ButtonModule</td>
            </tr>
            <tr>
              <td colspan="1">wtf2-button.service.ts</td>
              <td colspan="1">
                <p>Wtf2ButtonService</p>
              </td>
            </tr>
            <tr>
              <td colspan="1">
                <p>wtf2-button.component.scss</p>
              </td>
              <td colspan="1">
                <br/>
              </td>
            </tr>
            <tr>
              <td colspan="1">wtf2-button.component.html</td>
              <td colspan="1">
                <br/>
              </td>
            </tr>
            <tr>
              <td colspan="1">wtf2-button.directive.ts</td>
              <td colspan="1">Wtf2ButtonDirective</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td>Variables &amp; Functions</td>
      <td>Variables and Functions should be Camel Case</td>
      <td>
        <p>const wtf2ActiveModal;</p>
        <p>onClick();</p>
      </td>
    </tr>
    <tr>
      <td colspan="1">Coding Convention</td>
      <td colspan="1">
        <p>All files should be set as 4 Spaces : Tab = 4 Spaces.</p>
      </td>
      <td colspan="1">
        <div class="content-wrapper">
          <p>Always beautify your codes.</p>
          <p>Add the below extension into your vs code</p>
          <p>
            <a href="https://marketplace.visualstudio.com/items?itemName=hookyqr.beautify">https://marketplace.visualstudio.com/items?itemName=hookyqr.beautify</a>
          </p>
          <p>
            <br/>
          </p>
          <p>Click on Format Document during/after you have done editing the file.</p>
          <p>
            <br/>
          </p>
          <ac:image ac:height="250">
            <ri:attachment ri:filename="Screen Shot 2018-12-26 at 10.33.35 AM.png"/>
          </ac:image>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="1">Styles</td>
      <td colspan="1">
        <p>Styles are to be defined in .scss file. Do not use inline style in .html</p>
        <p>Use Relative CSS or Nested SASS ( <ac:link>
            <ri:page ri:content-title="How to write Relative CSS and Nested SCSS"/>
          </ac:link>?)</p>
      </td>
      <td colspan="1">
        <br/>
      </td>
    </tr>
    <tr>
      <td colspan="1">Page Structure</td>
      <td colspan="1">All pages created should follow at least one of the layout provided in wireprint.</td>
      <td colspan="1">
        <br/>
      </td>
    </tr>
  </tbody>
</table>
<p>
  <br/>
</p>
<p>Code Repos</p>
<ul>
  <li>
    <a href="https://github.com/angular/angular">https://github.com/angular/angular</a>
  </li>
  <li>
    <a href="https://github.com/angular/material2">https://github.com/angular/material2</a>
  </li>
  <li>
    <a href="https://github.com/vmware/clarity/">https://github.com/vmware/clarity/</a> (not used at the moment)</li>
</ul>
<h3>Project Structure</h3>

<h4>What is the difference between parentheses, brackets and asterisks in Angular?</h4>
<ul style="margin-left: 30.0px;">
  <li>
    <p>
      <code>directiveName</code> - is the short hand form for structural directives where the long form can only be applied to <code>&lt;template&gt;</code> tags. The short form implicitely wraps the element where it's applied in a <code>&lt;template&gt;</code>.</p>
  </li>
  <li>
    <p>
      <code>[prop]="value"</code> is for object binding to properties (<code>@Input()</code> of an Angular component or directive or a property of a DOM element).<br/>There are special forms:</p>
    <ul style="margin-left: 30.0px;">
      <li>
        <code>[class.className]</code> binds to a css class to enable/disable it</li>
      <li>
        <code>[style.stylePropertyName]</code> binds to a style property</li>
      <li>
        <code>[style.stylePropertyName.px]</code> binds to a style property with a preset unit</li>
      <li>
        <code>[attr.attrName]</code> binds a value to an attribute (visible in the DOM, while properties are not visible)</li>
      <li>
        <code>[role.roleName]</code> binds to the ARIA role attribute (not yet available)</li>
    </ul>
  </li>
  <li>
    <p>
      <code>prop="{{value}}"</code> binds a value to a property. The value is stringified (aka interpolation)</p>
  </li>
  <li>
    <p>
      <code>(event)="expr"</code> binds an event handler to an <code>@Output()</code> or DOM event</p>
  </li>
  <li>
    <p>
      <code>#var</code> or <code>#var</code> has different functions depending on the context<br/>
      <br/>(In beta.17 this is changed to *ngFor="let x in y; let i=index"`)</p>
    <ul style="margin-left: 30.0px;">
      <li>On a DOM element <code>&lt;div #mydiv&gt;</code> a reference to the element</li>
      <li>On an Angular component a reference to the component</li>
      <li>On an element that is an Angular component or has an Angular directive where <code>exportAs:"ngForm"</code> is defined, <code>#myVar="ngForm"</code> creates a reference to this component or directive.</li>
    </ul>
    <p>
      <br/>All details can be found here: <a href="https://angular.io/docs/ts/latest/guide/template-syntax.html">https://angular.io/docs/ts/latest/guide/template-syntax.html</a>
    </p>
  </li>
</ul>
<p>Further Reference</p>
<ul>
  <li>
    <a href="https://angular.io/guide/styleguide">https://angular.io/guide/styleguide</a>
  </li>
  <li>
    <a href="https://stackblitz.com/angular/ooqemvjyqkb?file=src%2Fapp%2Fheroes%2Fheroes.component.ts">https://stackblitz.com/angular/ooqemvjyqkb?file=src%2Fapp%2Fheroes%2Fheroes.component.ts</a>
  </li>
  <li>
    <a href="http://192.168.0.121/staging/wtf2framework/">http://192.168.0.121/staging/wtf2framework/</a>
  </li>
</ul>

## Adding capabilities to your workspace (Making Microfrontend Application)

It supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, .etc as well as the devtools to test, and build projects as well.

Below are some plugins which you can add to your workspace:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@microframework/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `npm run affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `npm run affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `npm run dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Angular Material](https://material.angular.io/) to learn more.
