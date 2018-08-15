// node openfile.fs source_folder destination
//const fs = require('fs');
const fs = require('fs-extra')
const path = require('path');

const frst = require('firstline');

//https://gist.github.com/kethinov/6658166
var csvParser = require('csv-parser');

var readline = require('readline');
var csv2json = require('csv2json');


const homedir = require('os').homedir();
var async = require("async");




process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});
var first_arg=process.argv[2];
var second_arg=process.argv[3];
var third_arg=process.argv[4];
console.log('first arg' + ': ' + first_arg);
console.log('second arg' + ': ' + second_arg);
function indexFilesToJSON( from, to ){
  var to = (typeof to !== 'undefined') ? to : '../sds-default';
  if(from == 'undefined'){
    console.log('Argument missing' + ': source_folder is ' + first_arg);
  }
  else{
    console.log('Source_folder is' + first_arg);
    var list=[];
    var ext = ['.csv','.json'];
    walkIn(from,list,ext);
    for( i in list){
      console.log(path.dirname(list[i])+' -> '+path.basename(list[i]))

    }
  }

}


//with pattern
function indexFilesToJSONfromPattern( from, pattern,to ){
  var to = (typeof to !== 'undefined') ? to : path.join(homedir, 'sds-workspace/seeds');
  if(from == 'undefined'){
    console.log('Argument missing' + ': source_folder is ' + first_arg);
  }
  else{
    if(pattern == 'undefined'){
      console.log('Pattern is missing' + first_arg);
    }
    console.log('Source_folder is' + first_arg);
    var list=[];
    //var ext = ['.csv','.json'];
    var ext = ['.csv'];

    var patternFolder = path.basename(pattern).replace(/\.[^/.]+$/, "");

    var dir = to +'/'+patternFolder;
    var patternJSONFilePath = dir + '/' + patternFolder + '.json'
    // With a callback:
    fs.ensureDir(dir, err => {
      console.log(err) // => null
      // dir has now been created, including the directory it is to be placed in
      fs.createReadStream(pattern)
      .pipe(csv2json({
        // Defaults to comma.
        separator: ';'
      }))
      .pipe(fs.createWriteStream(patternJSONFilePath));

      walkInPattern(from,list,ext,pattern);
      for( i in list){
        console.log(path.dirname(list[i])+' -> '+path.basename(list[i]))

      }
    });


  }

}

function csvHeader(headerFile,Hfile,callback) {
  console.log('-->csvHeader(), file : '+ Hfile+ ' type : '+typeof(Hfile));
  //var headerFile='';
  // extract header
  var myHeaderInterface = readline.createInterface({
    input: fs.createReadStream(Hfile)
  });
  var count = 0;
  myHeaderInterface.on('close', function() {
    console.log('close header file');
    process.exit(0);
  });
  myHeaderInterface.on('line', function (line) {
    headerFile = line;
    console.log('line : '+line);

    if(count!=0){
      myHeaderInterface.close();
    }else{
      callback(headerFile) ;
    }
    count++;

  });

}
////



const csvheadersList = function(dir,filelist) {
  console.log('-->csvHeaderList()');
  files = fs.readdirSync(dir);
  filelist = filelist || [];
  var count=0;
  var nFiles = 0;
  files.forEach(function(file) {
    console.log(file);
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = csvheadersList(path.join(dir, file),filelist);
    }
    else {
      var headerPattern='';
      var myHeaderInterface = readline.createInterface({
        input: fs.createReadStream(path.join(dir, file))
      });

      myHeaderInterface.once('line', function (line) {
        headerFile = line;
        console.log('line : '+line);
        //console.log('include : '+filelist.includes(headerFile));
        if(filelist.length!=0){
          for(var j in filelist){
            console.log("filelist "+ filelist[j]);
            if(filelist[j] == headerFile){
              console.log("meme entete "+count);
            }
            else{
              console.log("entete "+count+ ' filelist.length : '+filelist.length);
              count++;
              filelist.push(headerFile);
            }
          }
        }else{
          console.log('premiere entree');
          filelist.push(headerFile);
        }

      });
    }
    nFiles++;
    if(nFiles == files.length){
      return filelist;
    }
  });

};


function getAlbumsTotal(list, params){
    var promises = list.map(function (item) { // return array of promises
        // return the promise:
        return api.getArtistAlbums(item, params)
            .then(function(data) {
                // return the array of album IDs:
                return Array.from(data.body.items, function (alb) {
                    return alb.id;
                });
            }, function(err) {
                console.error(err);
            });
    });
    Promise.all(promises).then(function (albums) { // albums is 2D array
        albums = [].concat.apply([], albums); // flatten the array
        console.log(albums);
        //do something with the finalized list of albums here
    });
}

function printTab(List){
  // console.log('printTab - size : ' + List.length);
  console.log('printTab - ');
  for (var i in List){
    console.log('f ' + i + ' : ' + List[i]);
  }
}

function csvList(dir,filelist,callback) {
  console.log('-->csvList()');
  var count=0;
  var list=[];
  var ext = ['.csv'];
  walkIn(dir,list,ext);
  //////////////////////////////////////
  var headerList = [];
  console.log('list.length'+list.length);
  var count=0;
  for( i in list){
    console.log(path.dirname(list[i])+' -> '+path.basename(list[i]))
    var item = list[i];
    var headerPattern='';
    var myHeaderInterface = readline.createInterface({
      input: fs.createReadStream(item)
    });
    myHeaderInterface.once('line', function (line) {
      console.log('line : '+line);
      headerPattern=line;
    }).on('close', function(){
      headerList.push(headerPattern);
      console.log('########### '+item);
    //  callback();
    });
    count=i;
  }
  // var headerList = [];
  // async.eachSeries(list,function(item, callback) {
  //   var headerPattern='';
  //   var myHeaderInterface = readline.createInterface({
  //     input: fs.createReadStream(item)
  //   });
  //   myHeaderInterface.once('line', function (line) {
  //     console.log('line : '+line);
  //     headerPattern=line;
  //   }).on('close', function(){
  //     headerList.push(headerPattern);
  //     console.log('########### '+item);
  //     callback();
  //   });
  //
  // });
  if(count==list.length){
    callback();
  }

};

////
const walkIn = function(dir, filelist,extensionList) {
  console.log('--> walkIn');
  files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkIn(path.join(dir, file), filelist,extensionList);
    }
    else {
      for(var i in extensionList){
        if(path.extname(file) == extensionList[i]){
          filelist.push(path.join(dir, file));
        }
      }
    }
  });

  return filelist;
};

const walkInPattern = function(dir, filelist,extensionList, pattern) {
  console.log('-->walkInPattern()');
  files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkInPattern(path.join(dir, file), filelist,extensionList,pattern);
    }
    else {

      for(var i in extensionList){
        if(path.extname(file) == extensionList[i]){
          //pattern condition
          console.log('-->walkInPattern() - dir : '+dir+' file : '+file);
          var myInterface = readline.createInterface({
            input: fs.createReadStream(path.join(dir, file))
          });
          var myPattern = readline.createInterface({
            input: fs.createReadStream(pattern)
          });

          var lineno = 0;
          var header_file= '';
          var myPattern_header = 'he';
          myInterface.once('line', function (line) {
            console.log('->interface ');
            header_file=line;
            console.log(header_file +' '+header_file.length +' '+typeof(header_file));
            myPattern.once('line', function (line) {
                console.log('--> pattern ');
              myPattern_header=line;
              console.log(myPattern_header + ' ' + myPattern_header.length+' '+typeof(myPattern_header));
              if(myPattern_header == header_file){
                console.log("meme entete : "+header_file);
                filelist.push(path.join(dir, file));
              }
            });
          });
        }
      }
    }
  });
  return filelist;
};

var destination_folder = third_arg;
var source_folder = String(first_arg);
var pattern_file = String(second_arg);
//indexFilesToJSON(source_folder,destination_folder);


//indexFilesToJSONfromPattern(source_folder,pattern_file,destination_folder)

///////////////////////////////////////////////////////////////////////////////////////
function indexFilesToJSONfromAnyPattern(source,destination){
  var headerList = [];
  csvList(source,headerList,function(headerList){
      console.log('csvList - End');
      printTab(headerList);
  });





}
indexFilesToJSONfromAnyPattern(source_folder,destination_folder);
