exports.defineTags = function (dictionary) {
  dictionary.defineTag('mobx', {
    isNamespace: true,
    mustHaveValue: true,
    onTagged: function (doclet, tag) {
      doclet.mobx = tag.value
    }
  })
}
