# grepand (shortcut for grep matching word with AND)

Reads one or more newline separated lines from file, 
each line containing one or more space separated words,
and searches a folder of files, alerting if all words of line match.
Similar to *grep -f* param, but match **all** words of one line (means target line has to match **all** words, not only one of them).

Note: for using *grep* multiple strings, check this [guide](https://phoenixnap.com/kb/grep-multiple-strings) instead.

# Requirements
Install [Node.js](https://nodejs.org/en/download/)

# How to install
```
npm install
```

# Preparations before first run
(1)
first create file *wishlist*, simple text file with a search per line,
each line containing the words you need to search, e.g.:

```wishlist
albert camus erste mensch epub
arthur miller zeitkurven
```

(2)
create a folder *target* and put all files you want to search in it.

Note: It's ok if the files are larger, just avoid avoid large files without newlines,
because *grepand* works line-based, also avoid binary files (for obvious reasons).

# How to run
```
node grepand.js 
```

or run and write output to additional logfile
```
node grepand.js | tee grepand.log 
```

