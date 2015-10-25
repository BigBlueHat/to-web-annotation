'use strict';

var context = require('./context.json');

var fromAnnotatorToWebAnnotation = require('./from-annotator').from;

/**
 * From http://hypothes.is/ JSON to Web Annotation
 **/
function fromHypothesisToWebAnnotation(annotation) {
  // TODO: remove non-JSON-LD cruft? or leave it?
  //
  // TODO: "upgrade" tags & text to separate bodies with roles
  // TODO: turn RangeSelector (xpath) into #xpointer FragmentSelector
  var creator_nick = annotation.user.replace('acct:', '')
    .replace('@hypothes.is', '');
  return {
    "@id": "http://hypothes.is/a/" + annotation.id,
    "@type": "oa:Annotation",
    "creator": {
      "@id": annotation.user,
      "@type": "Person",
      "nick": creator_nick
    },
    "body": annotation.text,
    "created": annotation.created,
    "target": annotation.target,
    // TODO: where should we keep the xpath stuff in Web Annotation?
    // ...this key is ugly on purpose...
    "--original--": annotation,
    "@context": context
  };
}

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
  if (undefined === annotation['@type']
      || annotation['@type'] !== 'oa:Annotation'
      // TODO: maybe check the @context to be sure we mean `oa:Annotation`?
      || annotation['@type'] !== 'Annotation') {
    // if it's not a Web Annotation, don't change it
    return annotation;
  }
  var rv = {
    "uri": annotation.target.source,
    "quote": "",
    "text": annotation.body,
    "ranges": [{}]
  };

  var selectors = annotation.target.selector.members;
  for (var i = 0; i < selectors.length; i++) {
    if (selectors[i]['@type'] === 'oa:TextQuoteSelector') {
      rv.quote = selectors[i].exact;
    } else if (selectors[i]['@type'] === 'oa:TextPositionSelector') {
      rv.ranges[0].startOffset = selectors[i].start;
      rv.ranges[0].endOffset = selectors[i].end;
    }
  }

  // TODO: handle multiple ranges
  rv.ranges[0].start = annotation['--original--'].ranges[0].start;
  rv.ranges[0].end = annotation['--original--'].ranges[0].end;

  return rv;
}

exports.toWebAnnotation = toWebAnnotation;
exports.fromWebAnnotation = fromWebAnnotation;
