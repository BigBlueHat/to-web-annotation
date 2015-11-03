'use strict';

var fromAnnotatorToWebAnnotation = require('./from-annotator').from;

var fromHypothesisToWebAnnotation = require('./from-hypothesis').from;

function toWebAnnotation(annotation) {
  if ('id' in annotation
      && 'text' in annotation
      && 'uri' in annotation
      && 'quote' in annotation
      && 'ranges' in annotation) {
    return fromAnnotatorToWebAnnotation(annotation);
  } else if ('target' in annotation
      && 'text' in annotation
      && 'uri' in annotation
      && 'user' in annotation) {
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
