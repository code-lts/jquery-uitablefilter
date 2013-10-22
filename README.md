#Original script
https://github.com/gregwebs/jquery-uitablefilter
#What's new ?
With this version the 'column' argument has been modified to be an array of columns instead of being just one column.
Consequently, the script is now able to search in several columns. If you want the original behaviour back, put an array with only one entry.
If you don't want to create any filter, just put an emptyarray as argument.
#Example
Here is an example (see the original project README for more informations). It will search the word 'Pepper' in #table in columns 'Price', 'Item' and 'ID'.
			$.uiTableFilter( $("#table"), "Pepper",  ["Price", "Item", "D"]);