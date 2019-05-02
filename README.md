# Tutorial. Reshadow Tunes — Media Gallery with Reshadow

In this tutorial we will set up Webpack, Babel and PostCSS to use Reshadow for markup.
To demonstrate you great abilities of Reshadow library we've prepared a prototype of media catalog like iTunes: Reshadow Tunes.
In fact it will be very close to iTunes music library because we'll use [iTunes Search API](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/) to provide our example with beautiful and interesting content close to real life.
The tutorial will fit to you if you'd like to start working with Reshadow and don't want to use Reshadow's Create React App template.

## What is Reshadow?

Reshadow is a library to provide your components (written on any framework) with styles.
It's very flexible and prevents you from breaking components around you while you're styling one of them.
Learn more at the [official Reshadow website](https://reshadow.dev/).

## Initial setup

Of course we will use GIT for version control.
To be able to compare your source code with working copy of the tutorial clone original repo:

```sh
git clone https://github.com/quasiyoke/reshadow-example-tunes.git
```

Now checkout initial commit to start almost from scratch:

```sh
cd reshadow-example-tunes
git checkout 00-initial
```

The project directory contains only default `.gitignore` file for Node.js, readme, docs directory and license — no source code:

```sh
$ ls -a .
.  ..  docs  .git  .gitignore  LICENSE  README.md
```

We need Node.js and `npm` to work on the project:

```sh
$ node -v
v11.10.0
$ npm -v
6.7.0
```

First of all, we'll create `package.json` file with `npm`:

```sh
$ npm init
package-name: reshadow-example-tunes
version: 0.1.0
description: Catalog of media assets
entrypoint: index.js
test command:
git repository:
keywords:
author:
license: MIT
```

`npm` will save your answers to the `package.json` file.
To compare your `package.json` file with the working copy at the revision `01-package.json`, use the following GIT command:

```sh
git diff 01-package.json -- package.json
```

## Setup webpack

We will use webpack to create compact bundles from your source code.
In the end of the chapter we'll have a blank browser page ready for showing our application inside it.

Run `npm` to install webpack:

```sh
npm install --save-dev \
  webpack@4.30.0 \
  webpack-cli@3.3.1 \
  webpack-merge@4.2.1 \
  webpack-dev-server@3.3.1 \
  html-webpack-plugin@3.2.0
```

Create `webpack.config.js`:

```js
const path = require('path');
const merge = require('webpack-merge');
const parts = require('./config/webpackParts');

const PATHS = {
  template: path.resolve(__dirname, 'src/index.html'),
};

module.exports = merge([
  parts.page({
    template: PATHS.template,
    title: 'Reshadow Tunes',
  }),
  parts.devServer(),
]);
```

In the `config/webpackParts.js`:

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.devServer = () => ({
  devServer: {
    overlay: true,
  },
});

exports.page = ({
  template,
  title,
} = {}) => ({
  plugins: [
    new HtmlWebpackPlugin({
      template,
      title,
    }),
  ],
});
```

- `page` part of the config gives us a simple HTML page to include resulting JS and CSS into it,
- `devServer` part of the config allows us to use local web server with hot reloading which helps to see changes in the page immediately as you save the file.

Create `src/index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <main></main>
  </body>
</html>
```

In `package.json`:

```js
{
  /* ... */
  "scripts": {
    "build": "NODE_ENV=production webpack --env production",
    "build:dev": "webpack",
    "dev": "webpack-dev-server --inline --hot"
  },
  /* ... */
}
```

These lines allow you to use `npm run build` command to prepare your source code for production in the `dist` directory and `npm run dev` to run development server easily.

In `.gitignore`:

```
...
dist/
```

We've added that line to prevent `dist` directory intended for built files from being committed into our repository.

Create your project's source code stub:

```sh
touch src/index.js
```

After that you're finally able to look at the empty building yard for your project: blank page in the browser built by webpack!

Run `npm run dev` and go to http://127.0.0.1:8080 in the browser.
You should be able to see something like this screenshot:

![](./docs/blank-page.png)

If you're stuck or don't want to manually setup webpack checkout this tag:

```sh
git reset --hard 02-webpack
npm install
```

## Setup React

React and `react-dom` are very popular libraries to project "pure" data on browser DOM markup and manipulate them with JavaScript after that.

React will also provide us with a comfortable way to organize web page's code in _components_.
In this chapter we'll create application stub separating page layout from primary page content.

Let's install React!

```sh
npm install --save \
  react@16.8.6 \
  react-dom@16.8.6 \
  react-hot-loader@4.8.4
```

`react-hot-loader` package is very cozy for hot updating your application's code without missing its runtime state.

We will use Babel to transpile modern JavaScript syntax into widely supported by browsers language and use React's comfortable way to write markup called "JSX".
So execute:

```sh
npm install --save-dev \
  @babel/core@7.4.4 \
  @babel/preset-env@7.4.4 \
  @babel/preset-react@7.0.0 \
  @babel/plugin-proposal-class-properties@7.4.4 \
  babel-loader@8.0.5
```

In `config/webpackParts.js`:

```js
/* ... */
exports.js = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
});
```

In `webpack.config.js`:

```js
/* ... */
module.exports = merge([
  /* ... */
  parts.js(),
]);
```

Create `babel.config.js`:

```js
module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    'react-hot-loader/babel',
  ],
  presets: [
    '@babel/preset-react',
    '@babel/env',
  ],
};
```

Now let's write simple React app to check that our setup does its job.
In `src/index.js`:

```js
import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';

ReactDom.render(
  <App />,
  document.querySelector('main'),
);
```

That code renders `<App>` component in the `<main>` tag of our `index.html`.
Let's write that `<App>` component in `src/components/App/index.js`:

```js
import React from 'react';
import { hot } from 'react-hot-loader/root';
import Page from '../Page';

const App = () => (
  <Page>
    Hello, everyone!
  </Page>
);

export default hot(App);
```

`<Page>` component should be able to display any its content inside itself.
Let's write it in `src/components/Page/index.js`:

```js
import React from 'react';
import Header from '../Header'
import Footer from '../Footer'

export default ({
  children,
}) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);
```

Now write `<Header>` component in `src/components/Header/index.js`:

```js
import React from 'react';

export default () => (
  <header>
    <h1>Reshadow Tunes</h1>
  </header>
);
```

And finally `<Footer>` component in `src/components/Footer/index.js`:

```js
import React from 'react';

export default () => (
  <footer>
    ;)
  </footer>
);
```

If you restart `npm run dev` you should see something like that:

![](./docs/react-app-stub.png)

Try to change the text inside `<h1>` tag without restarting the development server.
You'll see the changes in browser immediately after saving.

If you have stuck or don't want to manually setup Babel for JSX check out `03-react` tag:

```sh
git reset --hard 03-react
npm install
```

## Finally, configure Reshadow

So, we've done pretty typical webpack and Babel setup and now we need to plug in Reshadow and PostCSS here to provide our app with glamorous styling.

Our goal will be to do a stylish redesign of the logo of our future app.

Install `reshadow`, PostCSS and several tools to bind them with webpack.

```sh
npm install --save reshadow@0.0.1-alpha.11
npm install --save-dev \
  css-loader@2.1.1 \
  mini-css-extract-plugin@0.6.0
```

In `babel.config.js`:

```js
module.exports = {
  plugins: [
    ['reshadow/babel', {
      files: /\.css$/,
      postcss: true,
    }],
    /* ... */
  ],
  /* ... */
};
```

Rewrite `js` part in `config/webpackParts.js`:

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* ... */

exports.js = () => ({
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.js$/,
        use: [
          'reshadow/webpack/loader',
          'babel-loader',
        ],
      },
    ],
  },
});
/* ... */
```

Now lets add some styles for our header.
In `src/components/Header/index.js`:

```js
import React from 'react';
import styled from 'reshadow';
import styles from './styles.css';

export default () => styled(styles)(
  <header>
    <h1>Reshadow Tunes</h1>
  </header>
);
```

Reshadow's `styled` function connects your virtual DOM with styles from `styles.css`.
Now we need to write that CSS in `src/components/Header/styles.css`:

```css
header {
  padding: 16px 20px;
}

h1 {
  margin: 0;
  font-family: sans-serif;
  color: #689d99;

  &::first-letter {
    color: #236863;
  }
}
```

Header's CSS makes its text of turquoise color and specifies font for it.

If you look in the browser now you should see something like that:

![](./docs/reshadow.png)

You're able to generate your production static files by launching `npm run build`:

```sh
$ npm run build
$ ls dist
index.html  main.css  main.js
```

If you open `dist/index.html` in your favorite browser, you'll see our site ready for publishing in the web.
So at any moment you can stop development and publish minimezed production version of your work.

Reshadow is a fresh look at "CSS-in-JS" approach.
People are often afraid that "CSS-in-JS" assumes that their styles will be incapsulated right in JavaScript.
Not in the case of Reshadow.
Open `dist/main.css`:

```css
.___header_2fpe8_1{padding:16px 20px}.___h1_2fpe8_1{margin:0;font-family:sans-serif;color:#689d99}.___h1_2fpe8_1:first-letter{color:#236863}
```

As you can see all styles we have now were minified and saved in static CSS file, so we'll use good old approach on delivering stylesheets combined with progressive developer experience brought by Reshadow.

If you've stuck you're able to check out `03-reshadow` GIT tag:

```sh
git reset --hard 03-reshadow
npm install
```

## How to keep footer at the bottom of the screen with Reshadow?

There's a great tradition on the web to stick the footer of the page to the bottom of the viewport when the page contains a small amount of content.
Look around you and you'll see lots of examples of this pattern.

Our goal is to make a footer of our app stick to the bottom of the screen.

Add `styles.css` to the `Page` component the same way we did it for `Header`.
In `src/components/Page/index.js`:

```js
/* ... */
import styled from 'reshadow';
import styles from './styles.css';

export default ({
  children,
}) => styled(styles)(
  <>
    <Header />
    <content>
      {children}
    </content>
    <Footer />
  </>
);
```

Look, we've added `<content>` "HTML tag" which doesn't exist in the HTML spec!
In real life it won't be situated in the browser DOM.
Reshadow replaces every "non-existing" tag by `<div>` by default.
Such tags allow you to write your CSS selector in extremely short, cozy and semantic manner.
Check out `<content>` tag in `<Page>` component's stylesheet.
In `src/components/Page/styles.css`:

```css
:global(html), :global(body) {
  margin: 0;
  height: 100%;
  background: #000;
  font: 16px/1.3 sans-serif;
  color: #fff;
}

:global(main) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

content {
  padding: 0 20px;
  flex: 1 0 auto;
}
```

Add `styles.css` to the `Footer` component the same way we did it for `Page`.
In `src/compoenents/Footer/styles.css`:

```css
footer {
  padding: 16px 20px;
  text-align: center;
}
```

The result should look like this:

![](./docs/sticky-footer.png)

If you do some experiments with that layout you'll see that footer will always be situated at the bottom of the viewport and the page will work properly when window is too small.

Press F12 and explore the way Reshadow has applied your styles to the DOM in inspector.
Check out that `<content>` tag turned out to be a `<div>` DOM node.
Explore the way styles were matched to `<header>`: Reshadow has scoped your CSS rules using unique `className` for your elements.

![](./docs/content-inspector.png)

If you've stuck you're able to check out `04-sticky-footer` GIT tag:

```sh
git reset --hard 04-sticky-footer
npm install
```

## Connecting to the API

We will start developing business logic of our app with preparations to making a request to the [iTunes Search API](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/).
We'll make `Catalog` React component which will take user-entered search request to the API and handle it.

Put `Catalog` component into the `App`.
In `src/components/App/index.js`:

```js
/* ... */

import Catalog from '../Catalog';

/* ... */

<Page>
  <Catalog />
</Page>

/* ... */
```

## Creating Snippets

## Meet Modifiers — a Way to Customize your Components

## Light Theme for Reshadow Tunes

## Conclusion




*** Primary color:

   SHADE 0 = #236863 = RGB( 35,104, 99) = RGBA( 35,104, 99,1) = RGB0(0.137,0.408,0.388)
   SHADE 1 = #689d99 = RGB(104,157,153) = RGBA(104,157,153,1) = RGB0(0.408,0.616,0.6)
   SHADE 2 = #41837e = RGB( 65,131,126) = RGBA( 65,131,126,1) = RGB0(0.255,0.514,0.494)
   SHADE 3 = #0d4e4a = RGB( 13, 78, 74) = RGBA( 13, 78, 74,1) = RGB0(0.051,0.306,0.29)
   SHADE 4 = #003430 = RGB(  0, 52, 48) = RGBA(  0, 52, 48,1) = RGB0(0,0.204,0.188)

