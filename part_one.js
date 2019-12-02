
// Paulina Lagebjer Kekkonen (pala7490) and Ida Söderberg (idso0102)

var myObject = {};

myObject.create = function(prototypeList) {
	var obj = Object.create(myObject);
	obj.hasPrototypes = true;

	var setPrototypes = function(objToSet, prototypes) {
		objToSet.getPrototypes = function() {
			return (prototypes != null? prototypes : []);
		}
	}

	obj.addPrototype = function(objToAdd) {

		if(this === objToAdd)
			throw "Cannot add object as prototype to itself.";

		else if(searchAfterPrototype(this.getPrototypes(), objToAdd)) 
			throw "Cannot add an already existing prototype as a prototype."

		else if(objToAdd.hasOwnProperty("hasPrototypes") && (searchAfterPrototype(objToAdd.getPrototypes(), this)))
			throw "Addition of this object as a prototype will cause circular inheritance.";

		else {
			var tempList = this.getPrototypes();
			tempList.push(objToAdd); 
			setPrototypes(this, tempList);
		}
	}
	 
	setPrototypes(obj, prototypeList);
	return obj;
}


myObject.call = function(funcName, parameters) {

	if(this.hasOwnProperty(funcName)) 
		return this[funcName](parameters);

	var result = searchAfterFunction(this.getPrototypes() ,funcName, parameters);
	if(result === undefined)
		throw "Could not find function.";
	return result;
};

searchAfterFunction = function(protos, funcName, parameters) {

	for(var i = 0; i < protos.length; i++) {
		var currentProto = protos[i];

		if(currentProto.hasOwnProperty(funcName)) { 
			//&& typeOf(currentProto.funcName) === 'function'. Måste kolla att det faktiskt är en funktion som vi kan anropa?
			var result = currentProto[funcName](parameters);
			if(result !== undefined)
				return result;
		} else {
			if(currentProto.hasOwnProperty("hasPrototypes")) {
				var result = searchAfterFunction(currentProto.getPrototypes(), funcName, parameters);
				if(result !== undefined) {
					return result;
				}
			}

		}
	}
	return undefined;
}

//Ändra namn?
searchAfterPrototype = function(protos, searchedObject) {

	for(var i = 0; i < protos.length; i++) {
		var currentProto = protos[i];

		if(currentProto === searchedObject) { 
			return true;
		} else {
			if(currentProto.hasOwnProperty("hasPrototypes")) {
				var result = searchAfterPrototype(currentProto.getPrototypes(), searchedObject);
				if(result === true)
					return result; 
			}

		}
	}
	return false;
}
