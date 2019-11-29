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

var myObject = {};

myObject.create = function(prototypeList) {
	// se till att kolla att inte null 
	//och undefined? nej kan väl inte vara
//	var prototypes = (prototypeList !== null? prototypeList : []);

	var prototypes = []; // bör inte nås utifrån

	
	this.addPrototype = function(obj) {
		prototypes.push(obj);
		prototypeList.push(obj); //obs inte båda 
		console.log(obj.name + " hej");
	}
	
	return this;

	// variabler? hittas inte i prototyp

};
	

//vad ska denna returna om inte function finns?
//måste vi kolla att parametrarna stämmer (antalsmässigt etc)
myObject.call = function(funcName, parameters) {

	if(myObject.hasOwnProperty(funcName)) {
		console.log("Här borde jag inte vara");
		return this[funcName](parameters);
	} else {console.log("searching")};
	return search(this.prototypeList,funcName, parameters);
};


search = function(protos, funcName, parameters) {

	//kan inte ens vara detta va?
	if(protos === undefined || protos === null)
		return undefined;

	for(var i = 0; i < protos.length; i++) {
		var currentProto = protos[i];
		console.log(currentProto.name);

		if(currentProto.hasOwnProperty(funcName)) { 
			//&& typeOf(currentProto.funcName) === 'function'. Måste kolla att det faktiskt är en funktion som vi kan anropa
			var result = currentProto[funcName](parameters);
			if(result !== undefined)
				return result;
		} else {
			if(currentProto.hasOwnProperty("prototypeList")) {
				var result = search(currentProto.prototypes, funcName, parameters);
				if(result !== undefined) {
					return result;
				}
			}

		}
	}
	return undefined;
}


var obj0 = myObject.create(null);
obj0.name = "obj0";
obj0.func = function(arg) { return "func0: " + arg; };
var obj1 = myObject.create([obj0]);
obj1.name = "obj1";
var obj2 = myObject.create([]);
obj2.name = "obj2";
obj2.func = function(arg) { return "func2: " + arg; };
var obj3 = myObject.create([obj1, obj2]);
obj3.addPrototype(obj0);
obj3.name = "obj3";
for (var i = 0; obj3.prototypeList != null && i < obj3.prototypeList.length ; i++){
	console.log(prototypeList[i].name + "tja");
	}
var result = obj3.call("func", ["hello"]) ;
console.log("should print ’func0: hello’ ->", result +"  1");




