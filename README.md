## Wedding landing page.

Landing page for Elisha & Teejay's Wedding.

## Libraries/OS code samples used.

The following libraries or OS code samples were used/extended to make this site.

- Horizontal Timeline: https://codyhouse.co/gem/horizontal-timeline/
- CountdownJS: http://countdownjs.org/

## Languages.

The site is built using the following tools/plugins/languages:

- Pug for HTML templating.
- Sass for CSS style-sheets.
- Minifier for JS minification.
- JQuery + Javascript.

## Building site.

To build the site the Pug and Sass templates must be transpiled into HTML and CSS
respectively.

You can watch both sources for changes whilst developing with the following
commands:

##### Pug:

```bash
pug --watch pug/index.pug -o docs/
```

Using the above command a minified `index.html` file will be compiled to the docs
folder.

##### Sass:

```bash
sass --watch sass/style.sass:docs/css/style.min.css --style compressed
```

Using the above command, the output will be compressed.

##### Javascript.

```bash
minify docs/js
```

Using the above command, all JavaScript files in the directory will be minified.