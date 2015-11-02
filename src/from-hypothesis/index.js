var context = require('../context.json');

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
    var rv = {
      "@id": "http://hypothes.is/a/" + annotation.id,
      "@type": "oa:Annotation",
      "creator": {
        "@id": annotation.user,
        "@type": "Person",
        "nick": creator_nick
      },
      "body": [
        {
          "role": "commenting",
          "text": annotation.text
        }
      ],
      "created": annotation.created,
      "target": annotation.target,
      // TODO: where should we keep the xpath stuff in Web Annotation?
      // ...this key is ugly on purpose...
      "--original--": annotation,
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
