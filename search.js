const ra = require('remove-accents');
const fs = require('fs');
const util = require('util');
const cliProgress = require('cli-progress');

const targetFolder = './target/';
console.log(new Date().toISOString().replace('T',' ').substring(0,19), 'search started');
fs.readdirSync(targetFolder).forEach(file => {
  doSearch(targetFolder+file);
});

function doSearch(fname) {
  const target = fs.readFileSync(fname, 'utf-8');
  let tLines = null;
  tLines = target.split(/\r?\n/).filter( n => n.length > 10);
  let fo = null;
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  fs.readFile('wishlist', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const dlines = data.split(/\r?\n/).filter( n => n);
    console.log(`search ${fname} pending ...`);
    bar.start(dlines.length, 0);
    dlines.forEach(line =>  {
      bar.increment();
      const words = line.split(' ').filter(n => n);
      //if (fname.match(/\.xml$/ig)) {
        for (const tline in tLines) {
          if (matchAll(words, tLines[tline])) {
             console.log('\rfound <'+line+'> in ', tLines[tline]);
          } 
        }
    });
    bar.stop();
    console.log('search done\n');
  });
}

function matchAll(arr, line) {
  const l = ra.remove(line).toLowerCase();
  for (var i=0; i<arr.length; i++) {
    const re = new RegExp(ra.remove(arr[i]).toLowerCase(), 'gi');
    if (!l.match(re)) return false;
  }
  return true;
}
