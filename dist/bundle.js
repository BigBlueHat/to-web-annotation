(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
 "@context": {
    "oa":      "http://www.w3.org/ns/oa#",
    "dc":      "http://purl.org/dc/elements/1.1/",
    "dcterms": "http://purl.org/dc/terms/",
    "dctypes": "http://purl.org/dc/dcmitype/",
    "foaf":    "http://xmlns.com/foaf/0.1/",
    "rdf":     "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfs":    "http://www.w3.org/2000/01/rdf-schema#",
    "skos":    "http://www.w3.org/2004/02/skos/core#",
    "xsd":     "http://www.w3.org/2001/XMLSchema#",
    "ldp":     "http://www.w3.org/ns/ldp#",
    "iana":    "http://www.iana.org/assignments/relation/",
    "owl":     "http://www.w3.org/2002/07/owl#",
    "as":      "http://www.w3.org/ns/activitystreams#",

    "id":      "@id",
    "type":    "@type",

    "Annotation":           "oa:Annotation",
    "Dataset":              "dctypes:Dataset",
    "Image":                "dctypes:StillImage",
    "Video":                "dctypes:MovingImage",
    "Audio":                "dctypes:Sound",
    "Text":                 "dctypes:Text",
    "EmbeddedContent":      "oa:EmbeddedContent",
    "TextualBody":          "oa:TextualBody",
    "SpecificResource":     "oa:SpecificResource",
    "FragmentSelector":     "oa:FragmentSelector",
    "TextQuoteSelector":    "oa:TextQuoteSelector",
    "TextPositionSelector": "oa:TextPositionSelector",
    "DataPositionSelector": "oa:DataPositionSelector",
    "SvgSelector":          "oa:SvgSelector",
    "TimeState":            "oa:TimeState",
    "HttpState":            "oa:HttpRequestState",
    "CssStylesheet":        "oa:CssStyle",
    "Choice":               "oa:Choice",
    "Composite":            "oa:Composite",
    "List":                 "oa:List",
    "Person":               "foaf:Person",
    "Sofware":              "prov:SoftwareAgent",
    "Organization":         "foaf:Organization",
    "Container":            "ldp:BasicContainer",
    "DirectContainer":      "ldp:DirectContainer",
    "IndirectContainer":    "ldp:IndirectContainer",
    "Collection":           "as:Collection",
    "OrderedCollection":    "as:OrderedCollection",
    "OrderedCollectionPage": "as:OrderedCollectionPage", 

    "Motivation":    "oa:Motivation",
    "bookmarking":   "oa:bookmarking",
    "classifying":   "oa:classifying",
    "commenting":    "oa:commenting",
    "describing":    "oa:describing",
    "editing":       "oa:editing",
    "highlighting":  "oa:highlighting",
    "identifying":   "oa:identifying",
    "linking":       "oa:linking",
    "moderating":    "oa:moderating",
    "questioning":   "oa:questioning",
    "replying":      "oa:replying",
    "reviewing":     "oa:reviewing",
    "tagging":       "oa:tagging",

    "body":          {"@id": "oa:hasBody"},
    "target":        {"@type": "@id", "@id": "oa:hasTarget"},
    "source":        {"@type": "@id", "@id": "oa:hasSource"},
    "selector":      {"@type": "@id", "@id": "oa:hasSelector"},
    "state":         {"@type": "@id", "@id": "oa:hasState"},
    "scope":         {"@type": "@id", "@id": "oa:hasScope"},
    "creator":       {"@type": "@id", "@id": "dcterms:creator"},
    "generator":     {"@type": "@id", "@id": "prov:generatedBy"},
    "motivation":    {"@type": "@id", "@id": "oa:motivatedBy"},
    "stylesheet":    {"@type": "@id", "@id": "oa:styledBy"},
    "cached":        {"@type": "@id", "@id": "oa:cachedSource"},
    "conformsTo":    {"@type": "@id", "@id": "dcterms:conformsTo"},
    "members":       {"@type": "@id", "@id": "oa:memberList", "@container": "@list"},
    "item":          {"@type": "@id", "@id": "oa:item"},
    "orderedItems":  {"@type": "@id", "@id": "as:items", "@container": "@list"},
    "partOf":        {"@type": "@id", "@id": "as:partOf"},
    "first":         {"@type": "@id", "@id": "as:first"},
    "last":          {"@type": "@id", "@id": "as:last"},
    "next":          {"@type": "@id", "@id": "as:next"},
    "prev":          {"@type": "@id", "@id": "as:prev"},
    "contains":      {"@type": "@id", "@id": "ldp:contains"},
    "membersIn":     {"@type": "@id", "@id": "ldp:membershipResource"},
    "memberRel":     {"@type": "@id", "@id": "ldp:hasMemberRelation"},
    "memberOfRel":   {"@type": "@id", "@id": "ldp:isMemberOfRelation"},
    "contentRel":    {"@type": "@id", "@id": "ldp:insertedContentRelation"},

    "format":        "dc:format",
    "language":      "dc:language",
    "created":       "dcterms:created",
    "generated":     "prov:generatedAtTime",
    "text":          "oa:text",
    "value":         "rdf:value",
    "start":         "oa:start",
    "end":           "oa:end",
    "exact":         "oa:exact",
    "prefix":        "oa:prefix",
    "suffix":        "oa:suffix",
    "sourceDate":    "oa:sourceDate",
    "styleClass":    "oa:styleClass",
    "label":         "rdfs:label",
    "name":          "foaf:name",
    "mbox":          "foaf:mbox",
    "nick":          "foaf:nick",
    "totalItems":    "as:totalItems"
  }
}

},{}],2:[function(require,module,exports){
var context = require('../context.json')['@context'];

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

},{"../context.json":1}],3:[function(require,module,exports){
var context = require('../context.json')['@context'];

function isReply(annotation) {
  return ('references' in annotation
    && annotation.references.length > 0);
}

function fullUrl(id) {
  return "http://hypothes.is/a/" + id;
}

module.exports = {
  /**
   * From http://hypothes.is/ JSON to Web Annotation
   **/
  from: function(annotation) {
    // TODO: remove non-JSON-LD cruft? or leave it?
    //
    // TODO: "upgrade" tags & text to separate bodies with roles
    // TODO: turn RangeSelector (xpath) into #xpointer FragmentSelector
    var creator_nick = annotation.user.replace('acct:', '')
      .replace('@hypothes.is', '');
    var targets = [];
    if ('target' in annotation) {
      annotation.target.forEach(function(target) {
        var clean_target = {
          type: 'SpecificResource',
          source: target.source,
          selector: {
            type: 'Choice',
            members: []
          }
        };
        // skip RangeSelector until its valid...
        if ('selector' in target) {
          target.selector.forEach(function(selector) {
            if (selector.type !== 'RangeSelector') {
              clean_target.selector.members.push(selector);
            }
          });
        }
        targets.push(clean_target);
      });
    }
    var rv = {
      "id":  fullUrl(annotation.id),
      "type": "Annotation",
      "creator": {
        "id": annotation.user,
        "type": "Person",
        "nick": creator_nick
      },
      "body": [
        {
          "role": (isReply(annotation) ? "replying" : "commenting"),
          "text": annotation.text,
          "format": "text/markdown"
        }
      ],
      "created": annotation.created,
      "target": (isReply(annotation)
        ? fullUrl(annotation.references[0])
        : targets),
      "@context": context
    };
    annotation.tags.forEach(function(tag) {
      rv.body.push({
        "role": "tagging",
        "text": tag
      });
    });
    return rv;
  }
};

},{"../context.json":1}],4:[function(require,module,exports){
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

},{"./from-annotator":2,"./from-hypothesis":3}]},{},[4]);
