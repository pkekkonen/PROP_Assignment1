// https://ilearn2.dsv.su.se/mod/forum/discuss.php?d=45930
// ^ ang. den förvirrande meningen i uppgiftsbeskr.


var templateClass = {};

createClass = function(className, superClassList) {
	var newClass = Object.create(templateClass); // men också class
	newClass.className = className;
	newClass.isClass = true;

	newClass.getSuperClassList = function() {};

	var setSuperClassList = function(classToSet, superClassList) {
		classToSet.getSuperClassList = function() {
			return (superClassList != null? superClassList: []);
		}
	}

	newClass.addSuperClass = function(classToAdd) {
		if(!classToAdd.hasOwnProperty("isClass"))
			return;
		if(!searchAfterSuperClass(this.getSuperClassList(), classToAdd.className))
			if(!searchAfterSuperClass(classToAdd.getSuperClassList(), this.className)) 
				setSuperClassList(this, this.getSuperClassList().push(classToAdd));
	}

	setSuperClassList(newClass, superClassList);
	return newClass;
}

templateClass.new = function() {
	var obj = {};
	obj.class = this;

//ska vara instansobjekten som har detta, inte klasserna
	obj.call = function(funcName, parameters) {
		if(this.hasOwnProperty(funcName))  //ska inte använda proto utan kolla vilken dess klass är?
			return this[funcName](parameters);
		 if(this.class.hasOwnProperty(funcName))
			return this.class[funcName](parameters);
		return searchAfterFunction(this.class.getSuperClassList(), funcName, parameters);
	}	
	return obj;
}

searchAfterFunction = function(superClassList, funcName, parameters) {
	for(var i = 0; i < superClassList.length; i++){
		var currentSuperClass = superClassList[i];
		if(currentSuperClass.hasOwnProperty(funcName)) {
			var result = currentSuperClass[funcName](parameters);
			if (result != undefined){
				return result;
			}
		}
		var result = searchAfterFunction(currentSuperClass.getSuperClassList(), funcName, parameters);
		if(result !== undefined){
			return result;
		}
	}
	return undefined;
}

searchAfterSuperClass = function(superClassList, searchedClassName) {

	for(var i = 0; i < superClassList.length; i++) {
		var currentClass = superClassList[i];
		if(currentClass.className === searchedClassName)
			return true;
		var result = searchAfterSuperClass(currentClass.getSuperClassList(), searchedClassName);
		if(result === true)
			return result;
	}

	return false;
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
console.log("’result’ is assigned ’func0: hello’  "+result);
//where ’result’ is assigned ’func0: hello’.

class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };
class1 = createClass("Class1", [class0]);
class2 = createClass("Class2", []);
class3 = createClass("Class3", [class2, class1]);
obj3 = class3.new();
obj3.name = "obj3";
result = obj3.call("func", ["hello"]);
console.log("’result’ is assigned ’func0: hello’  "+result);
//where ’result’ is assigned ’func0: hello’.


//in the object’s own class:
class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };
var obj0 = class0.new();
result = obj0.call("func", ["hello"]);
console.log("’result’ is assigned ’func0: hello’  "+result);
//where ’result’ is assigned ’func0: hello’.
