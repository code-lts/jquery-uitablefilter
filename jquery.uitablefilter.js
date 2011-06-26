/*
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
*/
(function($) {
  $.uiTableFilter = function(jq, phrase, column, ifHidden) {
    var elems, getText, index, last_phrase, matches, new_hidden, noMatch, phrase_length, words;
    new_hidden = false;
    if (this.last_phrase === phrase) {
      return false;
    }
    phrase_length = phrase.length;
    words = phrase.toLowerCase().split(" ");
    noMatch = function(elem) {
      elem.hide();
      return new_hidden = true;
    };
    getText = function(elem) {
      return elem.text();
    };
    matches = function(elem) {
      return elem.show();
    };
    if (column) {
      index = null;
      jq.find("thead > tr:last > th").each(function(i) {
        if ($.trim($(this).text()) === column) {
          index = i;
          return false;
        }
      });
      if (index === null) {
        throw "given column: " + column + " not found";
      }
      getText = function(elem) {
        return $(elem.find("td:eq(" + index + ")")).text();
      };
    }
    if ((words.size > 1) && (phrase.substr(0, phrase_length - 1) === this.last_phrase)) {
      if (phrase[-1] === " ") {
        this.last_phrase = phrase;
        return false;
      }
      words = words[-1];
      matches = function(elem) {};
      elems = jq.find("tbody:first > tr:visible");
    } else {
      new_hidden = true;
      elems = jq.find("tbody:first > tr");
    }
    elems.each(function() {
      var elem;
      elem = $(this);
      if ($.uiTableFilter.has_words(getText(elem), words, false)) {
        return matches(elem);
      } else {
        return noMatch(elem);
      }
    });
    last_phrase = phrase;
    if (ifHidden && new_hidden) {
      ifHidden();
    }
    return jq;
  };
  $.uiTableFilter.last_phrase = "";
  return $.uiTableFilter.has_words = function(str, words, caseSensitive) {
    var text, word, _i, _len;
    text = caseSensitive != null ? caseSensitive : {
      str: str.toLowerCase()
    };
    for (_i = 0, _len = words.length; _i < _len; _i++) {
      word = words[_i];
      if (text.indexOf(word) === -1) {
        return false;
      }
    }
    return true;
  };
})(jQuery);
