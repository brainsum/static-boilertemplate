# BRAINSUM Static Boilertemplate

Created by: [Krisztian Pinter](kpinter@brainsum.com)
Created for: [BRAINSUM Frontend Wiki](http://wiki.brainsum.com/books/frontend-development)
Created in: 2018.
Updated on: 2019.01.09.

## Table of Contents

* About

* Installation

* Usage

* Structure

* Coding Standards

## About

This is a sample mini project for BRAINSUM's frontend coding standard and
recommended configurates, tools and syntax schemes.
However tha main purpose is demonstate code related issues and solutions, it's a
working one-page mini site too based on HTML5 boilertemplate and
[Stellar](https://html5up.net/stellar) by [@ajlkn](https://twitter.com/ajlkn)
for [HTML5 UP](https://html5up.net).

## Installation

Currently we use NPM as node.js package manager, so you can install it easily
with Git clone and npm install:

```bash
git clone git@github.com:brainsum/static-boilertemplate.git
cd static-boilertemplate
npm install
```

## Usage

### Gulp.js (ES5) version

git branch: `master`

After installation, please create a virtual host for this directory and change
to that in `gulpfile.js` (in browser-sync task).

Afterwards you can run several gulp tasks from package.json. The easiest is the:

```bash
npm start
```

It will run the default `gulp` task. It will compile all sass and js, create
source maps, watching and start browser-sync for automatic browser reloadm after
changes in `localhost:3000`. But you can choose some others too:

* `npm sass-dev`: compile sass files and create source maps

* `npm reload`: a stand-alone browser-sync task

* `npm sass-prod`: you must run it, before add git commit! (compiling, linting,
  no source maps, but create minified, cleaned and sorted css)

* `npm sass-lint`: only for linting sass files

* `npm js`: combine all js files and linting them

### Laravel Mix (ES6 with webpack) version

@TODO

### React (ES6) version'?'

@TODO

## Structure

We can divide the directory structure into three parts: _`root`_, `sources` and
`public`. You can find all config files, README file, package files and
`node_modules` directory in the _root_. The `sources` directory contains all
Sass (scss), JavaScript and image source files. These files don't use in
production, only for us for development. The `public` directory contains all
files and directories what actually need for the site, like compiled css and
JavaScript files, webfonts, optimized images, vendor libraries* and html files.

When we need a third party (vendor) library/module/plugin, like jQuery, we
install it via npm to `node_modules` and copy the required (minified) files to
`public/vendors` subdirectory with building tool automagically (no need any
manual activity). In this way we don't touch them and we can update them easily
in the future (except they got breaking change updates).

The source Sass files structured by [SMACSS](https://smacss.com/book/categorizing)
and [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
into seven category folders. Plus there is a `noscript.scss` for preloading.
More details in our Wiki (@TODO), in this README's Coding Styles section and in
the Sass files as comments.

## Coding Standards

### General Rules

As Drupal Development Studio, we focus for Drupal websites, therefore we try
to use Drupal coding standards and linting tools whenever just we can. In this
way we can drastically reduce faults, warnings and inconsistent codes from
multiple standards what we have to memorize. One rule for them all: _Drupal way_.

First of all, we use Drupal's [.editorconfig](https://github.com/brainsum/static-boilertemplate/blob/master/.editorconfig)
for basic code styling.

All comments in Sass, PHP and JavaScript files must be in [Doxygen](https://www.drupal.org/docs/develop/standards/css/css-formatting-guidelines#comments)
format. See details in our Wiki.

### HTML

@in-progress...

### SASS/CSS Coding Standard

#### SASS/CSS Coding Style

Coding Style is based on [Drupal's CSS Coding Standard](https://www.drupal.org/docs/develop/standards/css).
We must use Doxygen comments, [SMACSS](https://smacss.com/book/categorizing)
architecture and [BEM](http://getbem.com) or [BEMIT](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) syntax schemes. In this boilertemplate we used [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
for structure Sass too as it's working perfectly with SMACSS. Details in Wiki.

#### SASS/CSS Linting Tools

All rules checked by [Stylelint](https://stylelint.io) from Drupal 8's core
(removed all rules that needed only for Drupal projects). There are Stylelint
plugin for all popular IDE/code editor, but there is linting task in builder
tool too. Some rules can be fixed via CLI, but the most need manual work.

Another tool: [CSSComb](http://csscomb.com/). However it's a dead project (only
maintained, but no new features), only a few rules supported (Stylelint has more
than 160 + plugins), but it can autofix everything and sorting CSS rules.
Recommended to run it before commit a Sass file. It has IDE/code editor plugins
too. CSSComb config based on Drupal's [CSSCombx](https://github.com/drugan/csscombx)
config, but updated to latest version and added new css properties.

Currently there aren't a "perfect" tool, so thgere are some caveats:

* **stylelint-no-browser-hacks** Stylelint plugin has been removed because it
  has incompatibility issue with Sass variables (originally its developed for
  vanilla CSS).

* **no-unknown-animations** Stylelint rule has been reomved because it's not
  support Sass `@mixin`, `@import` rules (they must be same file and same level).

* **CSSComb** doesn't support multiline property values (after it we need
  realign them).

* **CSSComb** could fail when a file started it comment blocks (temporary need
  to remove them, then paste back).

* However **Stylelint** has sorting plugins, they can't make any changes in
  files, only warning us for wrong order, so we need still use CSSComb for that.

* There are some new/edge css properties what **CCSComb** currently doesn't
  support, You must add them to `.csscomb.json` and rerun CSSComb, othervise
  there will be an empty newline, what will be cause an error/warning in
  Stylelint (and css coding standard).

### JavaScript Coding Standard

#### JavaScript Coding Style and Tool

JavaScript coding style based on [Drupal's JavaScript coding standard](https://www.drupal.org/docs/develop/standards/javascript).
For linting we use **[ESlint](https://eslint.org)**. The ESlint config based on
[Drupal's core ESlint config](https://www.drupal.org/docs/develop/standards/javascript/eslint-settings),
witch is based on Airbnb's React ESlint config.

#### For Gulp.js and ES5 version

Because there isn't any React, Drupal and ES6, we removed all rules that related
directly to them and switched to `airbnb-base/legacy` config for ES5 (and below).
