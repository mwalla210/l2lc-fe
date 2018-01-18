# Mobx React Starter

## About ##

Example website using JS, React, and MobX

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

Ensure the following is in one of your bash profiles (if node packages not found when running)

```bash
    export PATH="{PATH_TO_REPO}/app/node_modules/.bin:$PATH"
```

```bash
    npm run doc
```

### For testing:

```bash
    npm run test
```

Testing will also run **prior to pushing to a remote server.**

### For Linting:

```bash
    npm run lint
```

Linting will also run **prior to commiting and/or pushing to a remote server.**

### Building:

```bash
    npm run build
```

## Watch this code live ##

You can see a live version of this code on http://codepen.io/orliph/pen/pgmGjr?editors=1010
