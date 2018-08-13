// node openfile.fs source_file destination

const fs = require('fs');
const path = require('path');

//https://gist.github.com/kethinov/6658166




process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});
var first_arg=process.argv[2];
var second_arg=process.argv[3];
  console.log('first arg' + ': ' + first_arg);
  console.log('second arg' + ': ' + second_arg);

function indexFileToJSON( from, to ){
  var to = (typeof to !== 'undefined') ? to : '../sds-default';
if(from == 'undefined'){
  console.log('Argument missing' + ': source_folder is ' + first_arg);
}
else{
  if(fs.existsSync(from)){
    console.log('Source_file '+ first_arg +' is found' );
    // read file

  }else{
    console.log('Source_file '+ first_arg +' is not found at : ' );
  }
}

}

var destination_folder = second_arg;
var source_file = String(first_arg);

indexFileToJSON(source_file,destination_folder);
