#!/usr/bin/env node

var program = require('commander');
var UkrposhtaApi = require('ukrposhta-api').UkrposhtaApi;
var humanize = require("underscore.string/humanize");
var lpad = require("underscore.string/lpad");

program
  .version('0.1.1')
  .usage('[options] <barcode>')
  .option('-l, --language [name]', 'Use localization of API requests [uk]', 'uk')
  .option('-k, --key [user key]', 'Use user key to access API intead of test one')
  .parse(process.argv);

var urkposhtaApiClient = new UkrposhtaApi({
	language: program.language,
	userKey: program.key
});

var barcode = program.args[0];

urkposhtaApiClient.getBarcodeInfo(barcode).then(printBarcodeInfo, printError);

function printBarcodeInfo (barcodeInfo) {
	Object.keys(barcodeInfo).forEach(function(property) {
		var label = lpad(humanize(property), 20),
			value = barcodeInfo[property] || '-';
		console.log(label + ': ' + value);
	});
}

function printError (err) {
	console.error(err);
}
