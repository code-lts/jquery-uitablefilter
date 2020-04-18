# Repository

https://github.com/gregwebs/jquery-uitablefilter

## What's new ?
With this version the 'column' argument has been modified to be an array of columns instead of being just one column.
Consequently, the script is now able to search in several columns. If you want the original behaviour back, you can put a simple String.
If you don't want to create any filter, just put an empty array as argument.

## Download
Download the latest version here : https://github.com/gregwebs/jquery-uitablefilter/blob/master/jquery.uitablefilter.js

## Install

```bash
npm install jquery-uitablefilter
```
or yarn

```bash
yarn add jquery-uitablefilter
```

## Example
Here is an example (see the original project README for more informations). It will search for the word 'Pepper' in #table in columns 'Price', 'Item' and 'ID'.

```js
$.uiTableFilter($('#table'), 'Pepper',  ['Price', 'Item', 'D']);
```
