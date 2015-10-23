'use strict';


var context = {
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
};

/**
 * From http://annotatorjs.org/ JSON to Web Annotation
 **/
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
    "--original--": annotation,
    "@context": context
  };
}

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
