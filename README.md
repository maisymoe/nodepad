# nodepad

A text editor written with nodegui and TypeScript.

## How to build as a distributable

Currently, only Windows and MacOS work properly. Linux has issues that I can hopefully resolve soon.

```sh
# Bundle TypeScript
npm run build

# Pack to executable
npm run dist
```

## Other scripts

Note that each of these will require an existing `dist` folder, acquired by running `npm run build`.

### Start - will run the bundled code via Qode.
```sh
npm run start
```

### Inspect - will run the bundled code via Qode with a debugger port open.
```sh
npm run inspect
```