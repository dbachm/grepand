const ra = require('remove-accents');
const fs = require('fs');
// overload cosole.log to log file
const util = require('util');
const log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
const log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};
const cliProgress = require('cli-progress');
//const fnames = [ 'GerTai.xml', 'FrozenKernel.xml' ];
const fnames = [ 'gasby69154.json' ];

for (var i=0; i<fnames.length; i++) {
  doSearch(fnames[i]);
}

function doSearch(fname) {
  //const fname = 'Bad Robert.json';
  const target = fs.readFileSync(fname, 'utf-8');
  let tLines = null;
  tLines = target.split(/\r?\n/);

  let fo = null;
  /*if (fname.match(/\.json$/ig)) {
    fo = JSON.parse(target);
    for (var i=0; i<10; i++) {
      console.log(fo[i], typeof(fo[i]));
    }
  } else {
    tLines = target.split(/\r?\n/);
  }*/
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
      // console.log(`check line: ${line}`);
      const words = line.split(' ').filter(n => n);
      //if (fname.match(/\.xml$/ig)) {
        for (const tline in tLines) {
          if (matchAll(words, tLines[tline])) {
             console.log('\rfound '+line+' in \n', tLines[tline]);
          } 
        }
      /*} else if (fname.match(/\.json$/ig)) {
      }*/
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
