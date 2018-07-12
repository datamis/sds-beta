var fs = require('fs');
const path = require('path');
var faker = require('./index');
const homedir = require('os').homedir();



userCSVCard = function () {
  faker.locale = "fr";
    return {
        "name": faker.name.findName(),
        "username": faker.internet.userName(),
        "email": faker.internet.email(),
        "street": faker.address.streetName(true),
        "suite": faker.address.secondaryAddress(),
        "city": faker.address.city(),
        "zipcode": faker.address.zipCode(),
        "phone": faker.phone.phoneNumber()
    };
};



/// conversion json to csv
const Json2csvParser = require('json2csv').Parser;
const fields = [  "name",
                  "username",
                  "email",
                  "street",
                  "suite",
                  "city",
                  "zipcode",
                  "phone"
              ];
const opts = { fields };
const json2csvParser = new Json2csvParser({ fields , delimiter: ';'});

generateCSV_userData = function (num,dest) {
var dest = (typeof to !== 'undefined') ? to : path.join(homedir, 'sds-workspace/raw');
// generate bigDataSet as example
var bigSet = [];

for(var i = num; i >= 0; i--){
  bigSet.push(userCSVCard());
};



var CSVset = json2csvParser.parse(bigSet);
fs.writeFile(dest + '/header-userDataSet.csv', json2csvParser.parse(opts) , function() {
  console.log("header generated successfully!");
  fs.writeFile(dest + '/userDataSet.csv', CSVset , function() {
    console.log("userDataSet generated successfully!");

    console.log(CSVset);
  });
});
};
generateCSV_userData(50);
