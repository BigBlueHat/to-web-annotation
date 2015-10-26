'use strict';

var fromAnnotatorToWebAnnotation = require('./from-annotator').from;

var fromHypothesisToWebAnnotation = require('./from-hypothesis').from;

function toWebAnnotation(annotation) {
  if (undefined !== annotation.id
      && undefined !== annotation.text
      && undefined !== annotation.uri
      && undefined !== annotation.quote
      && undefined !== annotation.ranges) {
    return fromAnnotatorToWebAnnotation(annotation);
  } else if (undefined !== annotation.target
      && undefined !== annotation.text
      && undefined !== annotation.uri
      && undefined !== annotation.document
      && undefined !== annotation.user) {
    return fromHypothesisToWebAnnotation(annotation);
  } else {
    // TODO: is false the best response here?
    return false;
  }
}

function fromWebAnnotation(annotation) {
  // TODO: support more than just Annotator.js
  // TODO: ...yeah...confusing function name
  return require('./from-annotator').to;
}

exports.toWebAnnotation = toWebAnnotation;
exports.fromWebAnnotation = fromWebAnnotation;
