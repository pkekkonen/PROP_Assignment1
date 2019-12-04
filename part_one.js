
// Paulina Lagebjer Kekkonen (pala7490) and Ida Söderberg (idso0102)

var myObject = {};
var functionFound = false; //hur göra så denna inte global?

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
		return obj.prototypes;
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
	if(result === undefined && !functionFound)
		throw "Could not find function.";

	functionFound = false;
	return result;
};

searchAfterFunction = function(protos, funcName, parameters) {
	for(var i = 0; i < protos.length; i++) {
		var currentProto = protos[i];

		if(currentProto.hasOwnProperty(funcName)) {
			//&& typeOf(currentProto.funcName) === 'function'. Måste kolla att det faktiskt är en funktion som vi kan anropa?
			//problemet är att vi inte bara kan kolla om funcname är en funktion, måste kolla att det är en funktion för just det objektet vi är i
			functionFound = true;
			return currentProto[funcName](parameters);

		} else {
			if(currentProto.hasOwnProperty("hasPrototypes")) {
				var result = searchAfterFunction(currentProto.getPrototypes(), funcName, parameters);
				if(functionFound === true) { 
					return result;
				}
			}

		}
	}
	return undefined; //returnera något annat ?
}

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


//TESTKOD
var obj0 = myObject.create(null);
var obj1 = myObject.create([obj0]);
var obj2 = myObject.create([]);
var obj3 = myObject.create([obj1]);
var obj4 = myObject.create([obj2]);
obj2.func = function(arg) { return "func2: " + arg; };
obj3.addPrototype(obj4);
obj0.name = "obj0";
obj1.name = "obj1";
obj2.name = "obj2";
obj3.name = "obj3";
var result = obj3.call("func", ["hello"]) ;
console.log("should print ’func2: hello’ ->", result);

console.log("--------------")

var obj5 = myObject.create(null);

obj4.prototypes.push(obj5);
obj4.getPrototypes().push(obj5);

console.log(obj4.prototypes)
console.log(obj4.getPrototypes())


