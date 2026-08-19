# Sandboxels VS Code Auto-Complete & IntelliSense

A comprehensive TypeScript declaration file (`.d.ts`) that brings smart code completion, type checking, and documentation for **550+ sandbox elements** and game APIs directly into VS Code.

## 🚀 How to Enable Auto-Complete

To activate IntelliSense in your mod, simply add this triple-slash reference to the **very first line** of your mod's `.js` file:

```javascript
/// <reference path="./sandboxel.d.ts" />
```

> ⚠️ **Important Requirement:** This works only if both your mod file (e.g., `mod.js`) and `sandboxel.d.ts` are located in the **same folder** (on the same directory level).

### 💡 Solution for Different Folders
If you want to keep `sandboxel.d.ts` in a separate folder, specify the relative path to it in the reference link. For example:

```javascript
/// <reference path="../types/sandboxel.d.ts" />
```
