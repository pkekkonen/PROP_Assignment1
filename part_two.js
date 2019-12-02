// https://ilearn2.dsv.su.se/mod/forum/discuss.php?d=45930


//QUESTIONS: 
//  -  Regarding circular prevention: "The last line above should generate an error, since it would cause circular inheritance."
//     så ska addPrototype anrop som leder till cirkulärt beteende generera ett fel (och på vilket sätt). För som det är just nu 
//     så tillåts man bara inte göra det men det uppstår inget "Error"
  

createClass = function(className, superClassList) {
	var newClass = {};
	newClass.className = className;
	newClass.isClass = true;

	var setSuperClassList = function(classToSet, superClassList) {
		classToSet.getSuperClassList = function() {
			return (superClassList != null? superClassList: []);
		}
	}

	//Gör vackrare
	newClass.addSuperClass = function(classToAdd) {
		if(!classToAdd.hasOwnProperty("isClass")){
			throw "This parameter is not a class.";
		} else if(this === classToAdd) {
			throw "Cannot add class as superclass to itself.";	
		} else if(searchAfterSuperClass(this.getSuperClassList(), classToAdd.className)) {
			throw "Not adding  " + classToAdd.className+ " as a superclass since it already is.";
			
		} else if(searchAfterSuperClass(classToAdd.getSuperClassList(), this.className)) {
			throw "Cannot add " + classToAdd.className +" as a superclass since it will cause circular inheritance.";
		} else {
			var tempList = this.getSuperClassList();
			tempList.push(classToAdd); 
			setSuperClassList(this, tempList); 
		}
	}

	newClass.new = function() {
		var obj = {};
		obj.class = this;

		obj.call = function(funcName, parameters) {
			if(this.hasOwnProperty(funcName)) 
				return this[funcName](parameters);
		 	if(this.class.hasOwnProperty(funcName))
				return this.class[funcName](parameters);
			var result = searchAfterFunction(this.class.getSuperClassList(), funcName, parameters);
			if (result != undefined){
				return result;
			}
			throw "Cannot find function"
		}
		
		return obj;
	}

	setSuperClassList(newClass, superClassList);
	return newClass;
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
		if(currentClass.className === searchedClassName) {
			return true;
		} else {
		var result = searchAfterSuperClass(currentClass.getSuperClassList(), searchedClassName);
		if(result === true) 
			return result;
	}
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
console.log(result)

class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };
class1 = createClass("Class1", [class0]);
class2 = createClass("Class2", []);
class3 = createClass("Class3", [class2, class1]);
obj3 = class3.new();
result = obj3.call("func", ["hello"]);
console.log(result)

class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };
var obj0 = class0.new();
result = obj0.call("func", ["hello"]);
console.log(result)


//where ’result’ is assigned ’func0: hello’.
console.log("_----------------------------------------------------------------")

//Testkod cirkulär-del
console.log("\n\n\nCircular part \n");
var class0 = createClass("Class0", null);
var class1 = createClass("Class1", [class0]);
var class3 = createClass("Class3", [class1, class0]);
var class2 = createClass("Class2", [class3]);
var class4 = createClass("Class4", [class2]);
var class5 = createClass("Class5", [class0, class1, class2, class4]);
var class6 = createClass("Class6", [class0, class1]);
try {
	class3.addSuperClass(class5);
	class3.addSuperClass(class1);
	class3.addSuperClass(class1);
	class3.addSuperClass(class0);
	class3.addSuperClass(class6);
	class3.addSuperClass(class3);
} catch (e) {
	console.error(e);
}

console.log("class 3 längd (ska vara 4): " + class3.getSuperClassList().length);
console.log("class 4 längd (ska vara 1): " + class4.getSuperClassList().length);
console.log("class 5 längd (ska vara 4): " + class5.getSuperClassList().length);

console.log("\n\nCLASS 3 SUPERKLASSER: ")
for(var i = 0; i < class3.getSuperClassList().length; i++) 
	console.log("CurrentElement  : " + class3.getSuperClassList()[i].className);




