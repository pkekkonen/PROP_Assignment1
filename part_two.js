
// Paulina Lagebjer Kekkonen (pala7490) and Ida Söderberg (idso0102)

createClass = function(className, superClassList) {
	var newClass = {};
	newClass.className = className;
	newClass.isClass = true;

	var superClasses = (superClassList != null? superClassList : []);

	Object.defineProperty(newClass, "superClasses", { 
		get : function() { 
				var newArray = superClasses.slice();
				return newArray; },
		set : function(classToAdd) { 

				if(!classToAdd.hasOwnProperty("isClass")){
					throw "This parameter is not a class.";
				} else if(newClass === classToAdd) {
					throw "Cannot add class as superclass to itself.";	
				} else if(searchAfterSuperClass(newClass.superClasses, classToAdd.className)) {
					throw "Not adding  " + classToAdd.className + " as a superclass since it already is.";
				
				} else if(searchAfterSuperClass(classToAdd.superClasses, newClass.className)) {
					throw "Cannot add " + classToAdd.className + " as a superclass since it will cause circular inheritance.";
				} else {
					superClasses.push(classToAdd);
				}}

	});

	newClass.getSuperClassList = function() {
		var newArray = this.superClasses.slice();
		return newArray;
	}

	newClass.addSuperClass = function(classToAdd) {
		this.superClasses = classToAdd;


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


