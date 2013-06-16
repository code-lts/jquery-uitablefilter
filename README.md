# uiTableFilter

- jquery plugin for filtering table rows

# alternatives

This plugin is very light-weight (please [look at the source](https://github.com/gregwebs/jquery-uitablefilter/blob/master/jquery.uitablefilter.js)). I consider it finished, and have no plans to add any features. It works quickly for small data sets without consuming any extra memory (that would be needed for faster filtering).

* I have used the [DataTables](http://datatables.net/) plugin when I have greater table needs.
* I recently saw this [fancy tablequeryjs filter](https://github.com/asimihsan/tablequeryjs) plugin.
* There is a [List.js plugin](http://listjs.com/)

If you use a javascript framework which keeps the table data in memory (backbone.js, etc)
then all you have to do is add a hook to automatically re-reunder the table.
If you are using a framework like AngularJS the table will be re-rendered automatically.
So it is probably very easy to just roll your own table filter.

## download

click Download link at bottom of:
http://plugins.jquery.com/project/uiTableFilter

That link seems to be broken now.
You can simply download the [latest code from github](https://raw.github.com/gregwebs/jquery-uitablefilter/master/jquery.uitablefilter.js)


## source code

http://github.com/gregwebs/jquery-uitablefilter


## author and license

copyright Greg Weber. MIT licensed.


## Demos

### personal

http://projects.gregweber.info/demo/flavorzoom.html

### outside

http://silverwareconsulting.com/index.cfm/2008/10/2/jquery-autofiltering-table
this is a nice example that ties this plugin with the tablesorter plugin


## usage

              var t = $('table')
              $.uiTableFilter( t, phrase )
            

arguments:

    * jQuery object containing table rows
    * phrase to search for
      - If the phrase contains spaces it will be broken up into separate words that must all match a row

optional arguments:
              $.uiTableFilter( t, phrase, column, ifHidden )

    * column to limit search too (the column title in the table header)
    * ifHidden - callback to execute if one or more elements was hidden


## Warning:

* expects a thead and tbody element
