// https://ilearn2.dsv.su.se/mod/forum/discuss.php?d=45930
// ^ ang. den förvirrande meningen i uppgiftsbeskr.


var templateClass = {};

createClass = function(className, superClassList) {
	var obj = Object.create(templateClass); // men också class
	obj.className = className;
	obj.superClassList = (superClassList != null? superClassList: []);

	return obj;
}

templateClass.new = function() {
	var obj = Object.create(this);

	return obj;
}

templateClass.call = function(funcName, parameters) {
	if(this.hasOwnProperty(funcName)) {
		return this[funcName](parameters);
	} 
	return search(this.superClassList, funcName, parameters);
}

search = function(superClassList, funcName, parameters) {
	for(var i; i < superClassList.length; i++){
		var currentSuperClass = superClassList[i];
		if(currentSuperClass.hasOwnProperty(funcName)) {
			return currentSuperClass[funcName](parameters);
		}
		var result = search(currentSuperClass.superClassList, funcName, parameters);
		if(result !== undefined){
			return result;
		}
	}
	return undefined;
}

//TESTKOD
var class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };
var class1 = createClass("Class1", [class0]);
var class2 = createClass("Class2", []);
class2.func = function(arg) { return "func2: " + arg; };
var class3 = createClass("Class3", [class1, class2]);
var obj3 = class3.new();
var result = obj3.call("func", ["hello"]);
console.log(result);
//where ’result’ is assigned ’func0: hello’.

class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };
class1 = createClass("Class1", [class0]);
class2 = createClass("Class2", []);
class3 = createClass("Class3", [class2, class1]);
obj3 = class3.new();
result = obj3.call("func", ["hello"]);
console.log(result);
//where ’result’ is assigned ’func0: hello’.


//in the object’s own class:
class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };
var obj0 = class0.new();
result = obj0.call("func", ["hello"]);
console.log(result);
//where ’result’ is assigned ’func0: hello’.
