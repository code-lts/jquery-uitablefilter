###
 * Copyright (c) 2008 Greg Weber greg at gregweber.info
 * Dual licensed under the MIT and GPLv2 licenses just as jQuery is:
 * http://jquery.org/license
 *
 * documentation at http://gregweber.info/projects/uitablefilter
 *
 * allows table rows to be filtered (made invisible)
 * <code>
 * t = $('table')
 * $.uiTableFilter( t, phrase )
 * </code>
 * arguments:
 *   jQuery object containing table rows
 *   phrase to search for
 *   optional arguments:
 *     column to limit search too (the column title in the table header)
 *     ifHidden - callback to execute if one or more elements was hidden
###
(($) ->
  $.uiTableFilter = (jq, phrase, column, ifHidden) ->
    new_hidden = false;
    return false if this.last_phrase == phrase

    phrase_length = phrase.length
    words = phrase.toLowerCase().split(" ")

    noMatch = (elem) -> elem.hide(); new_hidden = true
    # these function pointers may change
    getText = (elem) -> elem.text()
    matches = (elem) -> elem.show()

    if column
      index = null
      jq.find("thead > tr:last > th").each( (i) ->
        if $.trim($(this).text()) == column
          index = i
          return false
      )
      if index == null
        throw("given column: " + column + " not found")

      getText = (elem) -> $(elem.find( ("td:eq(" + index + ")") )).text()

    # if added one letter to last time,
    # just check newest word and only need to hide
    if (words.size > 1) && (phrase.substr(0, phrase_length - 1) == this.last_phrase)
      if phrase[-1] == " "
        this.last_phrase = phrase
        return false

      words = words[-1] # just search for the newest word

      # only hide visible rows
      matches = (elem) ->
      elems = jq.find("tbody:first > tr:visible")
    else
      new_hidden = true
      elems = jq.find("tbody:first > tr")

    elems.each(->
      elem = $(this)
      if $.uiTableFilter.has_words( getText(elem), words, false )
        matches(elem)
      else
        noMatch(elem)
    )

    last_phrase = phrase
    ifHidden() if ifHidden && new_hidden
    return jq

  # caching for speedup
  $.uiTableFilter.last_phrase = ""

  # not jQuery dependent
  # "" [""] -> Boolean
  # "" [""] Boolean -> Boolean
  $.uiTableFilter.has_words = ( str, words, caseSensitive ) ->
    text = caseSensitive ? str : str.toLowerCase()
    for word in words
      return false if text.indexOf(word) == -1
    return true;
)(jQuery)
