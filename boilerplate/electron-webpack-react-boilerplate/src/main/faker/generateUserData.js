var fs = require('fs');

var faker = require('./index');



/**
 * userCard
 *
 * @method faker.helpers.userCard
 */
self.userJSONCard = function () {
    return {
        "name": faker.name.findName(),
        "username": faker.internet.userName(),
        "email": faker.internet.email(),
        "address": {
            "street": faker.address.streetName(true),
            "suite": faker.address.secondaryAddress(),
            "city": faker.address.city(),
            "zipcode": faker.address.zipCode(),
            "geo": {
                "lat": faker.address.latitude(),
                "lng": faker.address.longitude()
            }
        },
        "phone": faker.phone.phoneNumber(),
        "website": faker.internet.domainName(),
        "company": {
            "name": faker.company.companyName(),
            "catchPhrase": faker.company.catchPhrase(),
            "bs": faker.company.bs()
        }
    };
};



// generate dataSet as example
fs.writeFile(__dirname + '/dataSet.json',  JSON.stringify(faker.helpers.userJSONCard()), function() {
  console.log("dataSet generated successfully!");
});
// generate bigDataSet as example
var bigSet = [];

for(var i = 20; i >= 0; i--){
  bigSet.push(faker.helpers.userCard());
};

fs.writeFile(__dirname + '/bigDataSet.json',  JSON.stringify(bigSet), function() {
  console.log("bigDataSet generated successfully!");
});
