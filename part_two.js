
// Paulina Lagebjer Kekkonen (pala7490) and Ida Söderberg (idso0102)

createClass = function(className, superClassList) {
	var newClass = {};
	newClass.className = className;
	newClass.isClass = true;

	var setSuperClassList = function(classToSet, superClassList) {
		classToSet.getSuperClassList = function() {
			return (superClassList != null? superClassList: []);
		}
	}

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
