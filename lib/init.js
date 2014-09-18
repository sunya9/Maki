var fs = require('fs');

module.exports = function(settingsFilePath){
	fs.readFile(settingsFilePath, 'utf-8', function(err, data){
		if(err) return console.error(err);
		data = JSON.parse(data);
		return data;
	});
}