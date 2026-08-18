How to turn on the sandboxel intellisense? Write this string in the start of the .js file of mod to use that:
```js
/// <reference path="./sandboxel.d.ts" />
```
**Warning:** This can only work if both files (your `mod.js` and `sandboxel.d.ts`) in the same folder and on same file level.  
**Solution:** You can enter this at the first line:
```js
/// <reference path="path to sandboxel.d.ts" />
```
