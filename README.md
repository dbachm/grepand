# grepand (shortcut for grep matching word with AND)

grep folder of files with lines of wishlist (each line space separated, matching only lines having all words of line)

If you only need to match with OR instead of AND, use grep regexp instead, e.g. see link:
[How to Grep for Multiple Strings, Patterns or Words](https://phoenixnap.com/kb/grep-multiple-strings)

# Requirements
Install [Node.js](https://nodejs.org/en/download/)

# How to install
```
npm install
```

# Preparations before first run
(1)
first create file 'wishlist', simple text file with a search per line,
each line containing the words you need to search, e.g.:

```wishlist
albert camus erste mensch epub
arthur miller zeitkurven
```

(2)
create a folder 'target' and put all files you want to grep in it.

Note: It's ok if the files are larger, just avoid avoid large files without newlines,
because grepand works line-based, also avoid binary files (for obvious reasons).

# How to run
```
node search.js 
```

or run and write output to additional logfile
```
node search.js | tee search.log 
```

