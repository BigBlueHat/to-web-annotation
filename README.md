# Transforming Annotations

Ideally, this project could hold annotation transformation stuff for lots of
formats to and from the
[Web Annotation Data Model](http://w3.org/TR/annotation-model).

Right now, it's just some early dayz code for transforming
[Annotator](http://annotatorjs.org/) JSON into
[Web Annotation's JSON-LD](http://www.w3.org/TR/annotation-model/#json-ld-context)
with the most minimal, unsmart means (read: doesn't understand graphs) sort of
way possible.

This is partly done as an experiment and partly with some hopes that bridging
the worlds of "just JSON" and "smart JSON-LD" could be possible with a defined
shape for the JSON-LD and some simple transformation code.

Only time will tell...and your issues and pull requests maybe. :wink:

## Usage

```
$ npm install
$ npm run standalone
$ open index.html # to test some Annotator JSON conversion
```

You can use the `npm run standalone` (above) to create a `dist/standalone.js`
file meant for use in a `<script/>` tag (as seen in `index.html`. This file
will create a `window.anno` object with two functions: `toWebAnnotation()` and
`fromWebAnnotation()`.

You can use the `npm run build` to create a `dist/bundle.js` file
suitable for use in a browserify world. You can then `require` whichever
conversion function you need.

# License

Apache License 2.0
