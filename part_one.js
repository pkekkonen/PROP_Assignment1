
// Paulina Lagebjer Kekkonen (pala7490) and Ida Söderberg (idso0102)

var myObject = {};

myObject.create = function(prototypeList) {
	var obj = Object.create(myObject);
	obj.hasPrototypes = true;
	var prototypes = (prototypeList != null? prototypeList : []);
	Object.defineProperty(obj, "prototypes", {
		get : function(){
			var copyPrototypes = prototypes.slice();
			return copyPrototypes;
		},
		
		set : function(objToAdd){
			if(obj === objToAdd){
				throw "Cannot add object as prototype to itself.";
			} else if (searchAfterPrototype(obj.prototypes, objToAdd)) {
				throw "Cannot add an already existing prototype as a prototype.";
			} else if (searchAfterPrototype(objToAdd.prototypes, obj)){
				throw "Addition of this object as a prototype will cause circular inheritance.";
			} else {
				prototypes.push(objToAdd);
			}
		}
		
	});

	obj.getPrototypes = function() {
		var copyPrototypes = prototypes.slice();
			return copyPrototypes;
		}

	obj.addPrototype = function(objToAdd) {
		this.prototypes = (objToAdd);
	}
	 
	return obj;
}


myObject.call = function(funcName, parameters) {

	if(this.hasOwnProperty(funcName)) 
		return this[funcName](parameters);

	var result = searchAfterFunction(this.getPrototypes(), funcName, parameters);
	if(result === undefined)
		throw "Could not find function.";
	return result;
};

searchAfterFunction = function(protos, funcName, parameters) {
	for(var i = 0; i < protos.length; i++) {
		var currentProto = protos[i];
		console.log(currentProto);

		if(currentProto.hasOwnProperty(funcName)) {
			//&& typeOf(currentProto.funcName) === 'function'. Måste kolla att det faktiskt är en funktion som vi kan anropa?
			var result = currentProto[funcName](parameters);
			if(result !== undefined)  //Nödvändig?
				console.log("hej   "+result);
				return result;
		} else {
			if(currentProto.hasOwnProperty("hasPrototypes")) {
				var result = searchAfterFunction(currentProto.getPrototypes(), funcName, parameters);
				if(result !== undefined) {
					console.log("hej2   "+result);
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
				var result = searchAfterPrototype(currentProto.getPrototypes, searchedObject);
				if(result === true)
					return result; 
			}

		}
	}
	return false;
}


//TESTKOD
var obj0 = myObject.create(null);
var obj1 = myObject.create([obj0]);
obj0.getPrototypes().push(obj1);

console.log("result  "+ obj0.getPrototypes());


