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
          source: target.source,
          selector: []
        };
        // skip RangeSelector until its valid...
        if ('selector' in target) {
          target.selector.forEach(function(selector) {
            if (selector.type !== 'RangeSelector') {
              clean_target.selector.push(selector);
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
