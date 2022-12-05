# grepand, short for grep and

grep folder of files with lines of wishlist (each line space separated, matching only lines having all words of line)

requirements:
wishlist contains search strings,
target contains files to search

# requirements
Install [Node.js](https://nodejs.org/en/download/)

# howto install
npm install

# preparations before first run
(1)
first create file 'wishlist', simple text file with a search per line,
each line containing the words you need to search, e.g.:

```wishlist
albert camus erste mensch epub
arthur miller zeitkurven
```

(2)
create a folder 'target' with files you want to grep.

Note: It's ok if the files are larger, just avoid avoid large files without newlines,
because grepand works line-based, also avoid binary files (for obvious reasons).

# command to run and pipe stdout to log-file
node search.js | tee debug.log 

