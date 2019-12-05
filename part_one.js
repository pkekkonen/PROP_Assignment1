
// Paulina Lagebjer Kekkonen (pala7490) and Ida Söderberg (idso0102)

var myObject = {};

myObject.create = function(prototypeList) {
	var obj = Object.create(myObject);
	Object.defineProperty(obj, "hasPrototypes", { value: true, enumerable : true});
	var prototypes = (prototypeList != null? prototypeList : []);
	Object.defineProperty(obj, "prototypes", {
		get : function(){
			return prototypes.slice();
		},
		
		set : function(objToAdd){
			if(typeof objToAdd !== 'object') 
				throw new Error("Cannot add other than objects as prototypes.");
			else if(obj === objToAdd)
				throw new Error("Cannot add object as prototype to itself.");
			else if (doesListContainObject(objToAdd.prototypes, obj) || doesListContainObject(obj.prototypes, objToAdd))
				throw new Error ("Addition of this object as a prototype will cause circular inheritance.");
			else
				prototypes.push(objToAdd);
		}
		
	});

	obj.getPrototypes = function() {
		return obj.prototypes;
	}

	obj.addPrototype = function(objToAdd) {
		this.prototypes = objToAdd;
	}
	 
	return obj;
}


myObject.call = function(funcName, parameters) { 
	
	if(this.hasOwnProperty(funcName) && (typeof (this[funcName]) === 'function')) 
		return this[funcName](parameters);

	var result = findPrototypeWithFunction(this.getPrototypes(), funcName);
	
	if(result === undefined)
		throw new Error("Could not find function.");

	return result[funcName](parameters);
};

//namn?
function findPrototypeWithFunction(prototypes, funcName) {
	for(var i = 0; i < prototypes.length; i++) {
		var currentProto = prototypes[i];

		if(currentProto.hasOwnProperty(funcName) && (typeof currentProto[funcName] === 'function'))
				return currentProto;
		
		if(currentProto.hasOwnProperty('hasPrototypes')) {
			var result = findPrototypeWithFunction(currentProto.getPrototypes(), funcName);
			if(result !== undefined)
				return result;
		}
	}
	return undefined;
}

//namn?
function doesListContainObject(prototypes, searchedObject) {

	for(var i = 0; i < prototypes.length; i++) {
		var currentProto = prototypes[i];

		if(currentProto === searchedObject)
			return true;
		if(currentProto.hasOwnProperty('hasPrototypes')) {
			var result = doesListContainObject(currentProto.getPrototypes(), searchedObject);
			if(result === true)
				return result; 
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

console.log("--------------\n\n")

//given testkod
var obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };
var obj1 = myObject.create([obj0]);
var obj2 = myObject.create([]);
obj2.func = function(arg) { return "func2: " + arg; };
var obj3 = myObject.create([obj1, obj2]);
var result = obj3.call("func", ["hello"]) ;
console.log("should print ’func0: hello’ ->", result);


obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };
obj1 = myObject.create([obj0]);
obj2 = myObject.create([]);
obj3 = myObject.create([obj2, obj1]);
obj1.addPrototype(obj3);									//ta bort denna rad om inte vill generera ett error
result = obj3.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);

obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };
result = obj0.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);
