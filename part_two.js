// https://ilearn2.dsv.su.se/mod/forum/discuss.php?d=45930
// ^ ang. den förvirrande meningen i uppgiftsbeskr.


var templateClass = {};

createClass = function(className, superClassList) {
	var obj = Object.create(templateClass);
	obj.className = className;
	obj.superClassList = (superClassList !== null? superClassList: []);

	return obj;
}

templateClass.new = function() {
	var obj = Object.create(this);

	return obj;
}

templateClass.call = function(funcName, parameters) {

}