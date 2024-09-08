const ra = require('remove-accents');
const fs = require('fs');
const util = require('util');
const cliProgress = require('cli-progress');
let dlines;
fs.readFile('wishlist', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    dlines = data.split(/\r?\n/).filter( n => n);
    const targetFolder = './target/';
    function toISOLocal(d) {
      var z  = n =>  ('0' + n).slice(-2);
      var zz = n => ('00' + n).slice(-3);
      var off = d.getTimezoneOffset();
      var sign = off > 0? '-' : '+';
      off = Math.abs(off);

      return d.getFullYear() + '-'
             + z(d.getMonth()+1) + '-' +
             z(d.getDate()) + 'T' +
             z(d.getHours()) + ':'  + 
             z(d.getMinutes()) + ':' +
             z(d.getSeconds()) + '.' +
             zz(d.getMilliseconds()) +
             sign + z(off/60|0) + ':' + z(off%60); 
    }

    console.log(toISOLocal(new Date()).replace('T',' ').substring(0,19), 'search started');
    fs.readdirSync(targetFolder).forEach(file => {
      doSearch(targetFolder+file);
    });
});


function doSearch(fname) {
  const target = fs.readFileSync(fname, 'utf-8');
  let tLines = null;
  tLines = target.split(/\r?\n/).filter( n => n.length > 10);
  let fo = null;
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
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
}

function matchAll(arr, line) {
  const l = ra.remove(line).toLowerCase();
  for (var i=0; i<arr.length; i++) {
    const re = new RegExp(ra.remove(arr[i]).toLowerCase(), 'gi');
    if (!l.match(re)) return false;
  }
  return true;
}
