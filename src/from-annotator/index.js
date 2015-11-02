var context = require('../context.json');

module.exports = {
  /**
   * From http://annotatorjs.org/ JSON to Web Annotation
   **/
  from: function(annotation) {
    return {
      // TODO: Yeah...this is bad...make base url configurable?
      "id": location.href + annotation.id,
      "type": "Annotation",
      "body": annotation.text,
      "target": {
        "id": "#resource",
        "type": "SpecificResource",
        "source": annotation.uri,
        "selector": {
          "id": "#selectors",
          "type": "Choice",
          "members": [
            {
              "id": "#quote",
              "type": "TextQuoteSelector",
              "exact": annotation.quote
            },
            {
              "id": "#position",
              "type": "TextPositionSelector",
              // TODO: handle multiple ranges
              "start": annotation.ranges[0].startOffset,
              "end": annotation.ranges[0].endOffset
            }
          ]
        }
      },
      // TODO: where should we keep the xpath stuff in Web Annotation?
      // ...this key is ugly on purpose...
      "--original--": annotation,
      "@context": context
    };
  },
  /**
   * From Web Annotation to http://annotatorjs.org/
   *
   * TODO: give this a better function name?
   **/
  to: function(annotation) {
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
};
