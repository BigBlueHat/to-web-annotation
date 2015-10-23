'use strict';


var context = {
  "oa" :     "http://www.w3.org/ns/oa#",
  "dc" :     "http://purl.org/dc/elements/1.1/",
  "dcterms": "http://purl.org/dc/terms/",
  "dctypes": "http://purl.org/dc/dcmitype/",
  "foaf" :   "http://xmlns.com/foaf/0.1/",
  "rdf" :    "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  "rdfs" :   "http://www.w3.org/2000/01/rdf-schema#",
  "skos" :   "http://www.w3.org/2004/02/skos/core#",

  "body" :         {"@id" : "oa:hasBody"},
  "target" :       {"@type":"@id", "@id" : "oa:hasTarget"},
  "source" :       {"@type":"@id", "@id" : "oa:hasSource"},
  "selector" :     {"@type":"@id", "@id" : "oa:hasSelector"},
  "state" :        {"@type":"@id", "@id" : "oa:hasState"},
  "scope" :        {"@type":"@id", "@id" : "oa:hasScope"},
  "annotatedBy" :  {"@type":"@id", "@id" : "oa:annotatedBy"},
  "serializedBy" : {"@type":"@id", "@id" : "oa:serializedBy"},
  "motivation" :   {"@type":"@id", "@id" : "oa:motivatedBy"},
  "stylesheet" :   {"@type":"@id", "@id" : "oa:styledBy"},
  "cached" :       {"@type":"@id", "@id" : "oa:cachedSource"},
  "conformsTo" :   {"@type":"@id", "@id" : "dcterms:conformsTo"},
  "members" :      {"@type":"@id", "@id" : "oa:membershipList", "@container": "@list"},
  "item" :         {"@type":"@id", "@id" : "oa:item"},
  "related" :      {"@type":"@id", "@id" : "skos:related"},

  "format" :       "dc:format",
  "language":      "dc:language",
  "annotatedAt" :  "oa:annotatedAt",
  "serializedAt" : "oa:serializedAt",
  "when" :         "oa:when",
  "value" :        "rdf:value",
  "start" :        "oa:start",
  "end" :          "oa:end",
  "exact" :        "oa:exact",
  "prefix" :       "oa:prefix",
  "suffix" :       "oa:suffix",
  "label" :        "rdfs:label",
  "name" :         "foaf:name",
  "mbox" :         "foaf:mbox",
  "nick" :         "foaf:nick",
  "styleClass" :   "oa:styleClass"
};

function fromAnnotatorToWebAnnotation(annotation) {
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
    "-from-annotator-": annotation,
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
  rv.ranges[0].start = annotation['-from-annotator-'].ranges[0].start;
  rv.ranges[0].end = annotation['-from-annotator-'].ranges[0].end;

  return rv;
}

exports.toWebAnnotation = toWebAnnotation;
exports.fromWebAnnotation = fromWebAnnotation;
