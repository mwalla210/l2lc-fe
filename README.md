# Title

## About ##


## Install ##

Install [Node](https://nodejs.org/en/download/)

Run package installer

```bash
    npm install npm -g
    npm install
```

Then copy the contents of the "custom docdash" folder into the folder 'app/node_modules/docdash' and replace contents.
This will set up our custom styling templates for code documentation.

## Locally Load Website ##

From your terminal run:

```bash
    npm start
```

## Additional Scripts ##

### For Doc Generating

```bash
    npm run doc
```

### Building:

```bash
    npm run build
```

## Debugging

If node packages not found during attempts to run, ensure the following is in one of your bash profiles

```bash
    export PATH="{PATH_TO_REPO}/app/node_modules/.bin:$PATH"
```
