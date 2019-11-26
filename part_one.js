



//tror vi  har tänkt fel ang. prototyperna. Tror att vi (möjligtvis jag ...) förvirrat till det för oss själva.
//tror att vårat sätt (det sätt beskrivet av uppgiften) ska ersätta det existerande sättet, dvs. den existerande implemenatationen av prototyper
// Object ska också ligga som proto i vår lista?

var myObject = {};

myObject.create = function(prototypeList) {
	var obj = Object.create(myObject);

	prototypes = [];
	obj.prototypes = prototypeList;
	return obj;

	// variabler? hittas inte i prototyp

};

//måste vi kolla att parametrarna stämmer (antalsmässigt etc)
myObject.call = function(funcName, parameters) {

	if(this.hasOwnProperty(funcName)) 
		return this[funcName](parameters);

	return search(this.prototypes,funcName, parameters);
};

search = function(protos, funcName, parameters) {

	if(protos === undefined || protos === null)
		return undefined;
	
	for(var i = 0; i < protos.length; i++) {
		var currentProto = protos[i];

		if(currentProto.hasOwnProperty(funcName)) { 
			//&& typeOf(currentProto.funcName) === 'function'. Måste kolla att det faktiskt är en funktion som vi kan anropa
			var result = currentProto[funcName](parameters);
			if(result !== undefined)
				return result;
		} else {
			if(currentProto.hasOwnProperty("prototypes")) {
				var result = search(currentProto.prototypes, funcName, parameters);
					if(result !== undefined) {
						return result;
				}
			}

		}
	}
	return undefined;
}


//TESTKOD
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
result = obj3.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);

obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };
result = obj0.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);


//Circular
//var obj0 = myObject.create(null);
//var obj1 = myObject.create([obj0]);
//obj0.addPrototype(obj1);

//Test 
obj9 = {};
obj9.funcy = function() {console.log("hallå");};

obj0 = myObject.create([obj9]);
obj1 = {};
obj1.func = function() {console.log("heeeej");};
obj2 = obj0.create([obj0]);
obj2.call("funcy", []);








