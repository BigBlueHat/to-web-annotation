module.exports = {
  /**
   * From http://annotatorjs.org/ JSON to Web Annotation
   **/
  from: function(annotation) {
    return {
      "@id": annotation.id,
      "@type": "oa:Annotation",
      "body": annotation.text,
      "target": {
        "@id": "#resource",
        "@type": "oa:SpecificResource",
        "source": annotation.uri,
        "selector": {
          "@id": "#selectors",
          "@type": "oa:Choice",
          "members": [
            {
              "@id": "#quote",
              "@type": "oa:TextQuoteSelector",
              "exact": annotation.quote
            },
            {
              "@id": "#position",
              "@type": "oa:TextPositionSelector",
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
  }
};
