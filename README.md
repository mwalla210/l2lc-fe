# Line2LineCloud

## About ##

Documentation provided for implemented client-side [MobX store/model](https://mobx.js.org/best/store.html) classes.

The following data types are built in and do not require implementation:

* String: A character or string of characters
* Number: An integer or floating point number
* Boolean: A logical type (true or false)
* Type[]: An ordered list of elements of data type Type
* Object: A dictionary with key-value pairs
* null: A null value
* Component: An HTML DOM renderable [React component](https://reactjs.org/docs/react-component.html) or subclass

JavaScript is a dynamically typed language, so some class attributes can be any one of the types listed above. In this case, the attribute type is denoted as Any. If the attribute is an object that must be an instance of a particular class, the attribute type is listed as the name of the class.

Class properties denoted observable are [MobX observables](https://mobx.js.org/refguide/observable-decorator.html).
Class methods denoted as actions are [MobX actions](https://mobx.js.org/refguide/action.html).
Class get methods denoted as computed are [MobX computations](https://mobx.js.org/refguide/computed-decorator.html).

## Development Guide

### Local Testing Installation ###

Install [Node](https://nodejs.org/en/download/)

Run package installer

```bash
    npm install npm -g
    npm install
```

Then copy the contents of the "custom docdash" folder into the folder 'node_modules/docdash' and replace contents.
This will set up our custom styling templates for code documentation.

### Locally Load Website ###

From your terminal run:

```bash
    npm start
```

### Additional Scripts ###

#### Doc Generating

```bash
    npm run doc
```

#### Building

```bash
    npm run build
```

## Debugging

If node packages not found during attempts to run, ensure the following is in one of your bash profiles

```bash
    export PATH="{PATH_TO_REPO}/app/node_modules/.bin:$PATH"
```
