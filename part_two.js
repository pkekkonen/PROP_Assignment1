
// Paulina Lagebjer Kekkonen (pala7490) and Ida Söderberg (idso0102)

function createClass(className, superClassList) {
	var newClass = {};
	Object.defineProperty(newClass, "className", {value: className, enumerable : true});

	var superClasses = (superClassList != null? superClassList : []);

	Object.defineProperty(newClass, "superClasses", { 
		get () { 
			return superClasses.slice(); },
		set (classToAdd) { 	
			if(!classToAdd.hasOwnProperty("superClasses"))
				throw new Error("This parameter is not a class.");
			else if(newClass === classToAdd) 
				throw new Error("Cannot add a class as superclass to itself.");	
			else if(doesListContainClass(classToAdd.superClasses, newClass.className) || doesListContainClass(newClass.superClasses, classToAdd.className))
				throw new Error("Cannot add " + classToAdd.className + " as a superclass since it will cause circular inheritance.");
			else 
				superClasses.push(classToAdd);
		}

	});

	newClass.getSuperClassList = function() {
		return this.superClasses; 
	}

	newClass.addSuperClass = function(classToAdd) {
		this.superClasses = classToAdd;

	}

	newClass.new = function() {
		var obj = {};
		var ownClass = this; 
		Object.defineProperty(obj, "ownClass", {value : ownClass, enumerable : true});

		obj.call = function(funcName, parameters) {

			if(this.hasOwnProperty(funcName) && (typeof(this[funcName]) === 'function')) 
				return this[funcName](parameters);

		 	if(this.ownClass.hasOwnProperty(funcName) && (typeof(this.ownClass[funcName]) === 'function'))
				return (this.ownClass)[funcName](parameters);

			var classContainingFunc = findClassWithFunction(this.ownClass.getSuperClassList(), funcName);
			if (classContainingFunc === undefined)
				throw new Error("Cannot find the function.");
			return classContainingFunc[funcName](parameters);
		}
		
		return obj;
	}

	return newClass;
}

//namn?
function findClassWithFunction(superClassList, funcName) {
	for(var i = 0; i < superClassList.length; i++){

		var currentSuperClass = superClassList[i];
		if(currentSuperClass.hasOwnProperty(funcName) && (typeof(currentSuperClass[funcName]) === 'function')) 
			return currentSuperClass;

		var result = findClassWithFunction(currentSuperClass.getSuperClassList(), funcName);
		if(result !== undefined)
			return result;		
	}
	return undefined;
}

//namn?
function doesListContainClass(superClassList, searchedClassName) {

	for(var i = 0; i < superClassList.length; i++) {
		var currentClass = superClassList[i];
		if(currentClass.className === searchedClassName)
			return true;
		else {
			var result = doesListContainClass(currentClass.getSuperClassList(), searchedClassName);
			if(result === true) 
				return result;
		}
	}
	return false;
}


var class0 = createClass("c0", null);
var class1 = createClass("c1", null);
var class2 = createClass("c2", [class0, class1]);
var class3 = createClass("c3", null);

class2.getSuperClassList().push(class3);

console.log(class2.getSuperClassList())
console.log(class2.superClasses)

class2.superClasses.push(class3);

console.log(class2.getSuperClassList())
console.log(class2.superClasses)


//Given testkod
console.log("-----------------------\n\n")
var class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };
var class1 = createClass("Class1", [class0]);
var class2 = createClass("Class2", []);
class2.func = function(arg) { return "func2: " + arg; };
var class3 = createClass("Class3", [class1, class2]);
var obj3 = class3.new();
var result = obj3.call("func", ["hello"]);
console.log(result + "\n")

class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };
class1 = createClass("Class1", [class0]);
class2 = createClass("Class2", []);
class3 = createClass("Class3", [class2, class1]);
obj3 = class3.new();
result = obj3.call("func", ["hello"]);
console.log(result + "\n")

class0 = createClass("Class0", null);
class0.func = function(arg) { return "func0: " + arg; };
var obj0 = class0.new();
result = obj0.call("func", ["hello"]);
console.log(result + "\n")
