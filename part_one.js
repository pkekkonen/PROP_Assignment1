//obj0.addPrototype(obj1);
//The last line above should generate an error, since it would cause circular inheritance
//så vi ska preventa att man kan lägga till detta. Det ska inte få ske. Snarare än att det ska få ske och vi måste städa upp konsekvenserna så ska vi förebygga det istället


// https://ilearn2.dsv.su.se/mod/forum/discuss.php?d=61506
// "...I conclude that you can get the grade Ok if you don't try to prevent changes after creation, but to get the grade Good if you do." 
//( ^ regarding changing the prototypes list. vi måste förhindra att man kan göra det )
//"...What you could have done to solve this is implement your own kind of collection tailored to have "prototype-list" behaviour."

//Ang. circular behaviour
// https://ilearn2.dsv.su.se/mod/forum/discuss.php?d=31807
//"The text "Circular Inheritance Prevention" in the Assignment 1 text is misleading, it should be "Circular Inheritance Detection".
// The text should be: 
//Circular Inheritance Detection
//There is a risk for circular inheritance both with prototype-based and with class-based inheritance. 
//To get a grade A or B you must detect such circular inheritance to avoid infinite loops in your search for a matching function. "
//( ^ enl. Peter)

//tror vi  har tänkt fel ang. prototyperna. Tror att vi (möjligtvis jag ...) förvirrat till det för oss själva.
//tror att vårat sätt (det sätt beskrivet av uppgiften) ska ersätta det existerande sättet, dvs. den existerande implemenatationen av prototyper
// Object ska också ligga som proto i vår lista?


//create own kind of collection 
var myObject = {};
var count = 0;


myObject.create = function(prototypeList) {
	var obj = Object.create(myObject);
	obj.hasPrototypes;
	// se till att kolla att inte null 
	//och undefined? nej kan väl inte vara

	obj.getPrototypes = function() {};

	obj.setPrototypes = function(prototypes) {
		prototypes = (prototypes != null? prototypes : []);

		obj.getPrototypes = function() {
			var prototypeList = prototypes;
			console.log("hejsan   " + count +    "  längddd  " + prototypeList.length);
			count++;
			return 	(prototypeList != null ? prototypeList: []);
		}
	}


	obj.addPrototype = function(objToAdd) {
		if(searchAfterObject(this.getPrototypes(), objToAdd) === false) {
			if(!objToAdd.hasOwnProperty("hasPrototypes")) {
				if(searchAfterObject(this.getPrototypes(), this) === false) {
					console.log("HEJ  " + objToAdd.na)
					currentPrototypeList = this.getPrototypes();
					obj.setPrototypes(currentPrototypeList.push(objToAdd));

				}
			}
		}
	}

	obj.setPrototypes(prototypeList);
	return obj;


}

//utför kontroll av att det inte kommer leda till ett cirkulärt förhållande
//kolla om obj redan finns i kedjan av prototyper?


//vad ska denna returna om inte function finns?
//måste vi kolla att parametrarna stämmer (antalsmässigt etc)
myObject.call = function(funcName, parameters) {

	if(this.hasOwnProperty(funcName)) 
		return this[funcName](parameters);

	return searchAfterFunction(this.getPrototypes() ,funcName, parameters);
};


searchAfterFunction = function(protos, funcName, parameters) {

	//kan inte ens vara detta va?
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

searchAfterObject = function(protos, searchedObject) {

		console.log();


	//kan inte ens vara detta va?
	if(protos === undefined || protos === null)
		return undefined;

	for(var i = 0; i < protos.length; i++) {
		var currentProto = protos[i];

		if(currentProto === searchedObject) { 
			return true;
		} else {
			if(currentProto.hasOwnProperty("hasPrototypes")) {
				var result = search(currentProto.getPrototypes(), searchedObject);
				if(result !== undefined) {
					return result;
				}
			}

		}
	}
	return false;
}


//TESTKOD
//var obj0 = myObject.create(null);
//obj0.func = function(arg) { return "func0: " + arg; };
//var obj1 = myObject.create([obj0]);
//var obj2 = myObject.create([]);
//obj2.func = function(arg) { return "func2: " + arg; };
//var obj3 = myObject.create([obj1, obj2]);
//var result = obj3.call("func", ["hello"]) ;
//console.log("should print ’func0: hello’ ->", result);

//obj0 = myObject.create(null);
//obj1 = myObject.create([]);
//obj1.addPrototype(obj0);
//obj1.func = function(arg) { return "func1: " + arg; };
//obj2 = myObject.create([]);
//obj3 = myObject.create([obj2, obj1]);
//result = obj3.call("func", ["hello"]);
//console.log("should print ’func0: hello’ ->", result);

//obj0 = myObject.create(null);
//obj0.func = function(arg) { return "func0: " + arg; };
//result = obj0.call("func", ["hello"]);
//console.log("should print ’func0: hello’ ->", result);


//Circular
var obj1 = myObject.create(null);
var obj0 = myObject.create([obj1]);
obj1.na = "obj1";
obj0.na = "obj0";

var obj3 = {na: "hej"};
obj3.na = "obj3"
obj1.addPrototype(obj3);


var obj1list =obj1.getPrototypes();
console.log(obj1list.length);

for(var i = 0; i < obj1list.length; i ++) {
	console.log(i + " : " +obj1list.na);
}





//Test 
//obj9 = {};
//obj9.funcy = function() {console.log("hallå");};

//obj0 = myObject.create([obj9]);
//obj1 = {};
//obj1.func = function() {console.log("heeeej");};
//obj2 = obj0.create([obj0]);
//obj2.call("funcy", []);









