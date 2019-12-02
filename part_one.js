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





//Questions:
// - vad ska denna returna om inte function finns?
// - måste vi kolla att parametrarna stämmer (antalsmässigt etc)
// - Måste kolla att det faktiskt är en funktion som vi kan anropa
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
		if(searchAfterObject(this.getPrototypes(), objToAdd) === false) {
			if((!objToAdd.hasOwnProperty("hasPrototypes")) ||(objToAdd.hasOwnProperty("hasPrototypes") && (searchAfterObject(objToAdd.getPrototypes(), this) === false))) {
				var tempList = this.getPrototypes();
				tempList.push(objToAdd); //viktigt att skapa tempList snarare än skicka direkt
				setPrototypes(this, tempList);
			}
		} else {
			throw "Cannot add this object as a prototype since it will cause circular inheritance.";
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

//gör om så skickar in de två objekten och se om addition av obj2 till obj1 leder till circular (slippa flera if satser)
searchAfterObject = function(protos, searchedObject) {

	for(var i = 0; i < protos.length; i++) {
		var currentProto = protos[i];

		if(currentProto === searchedObject) { 
			return true;
		} else {
			if(currentProto.hasOwnProperty("hasPrototypes")) {
				var result = searchAfterObject(currentProto.getPrototypes(), searchedObject);
				if(result === true)
					return result; 
			}

		}
	}
	return false;
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


console.log("-------------------------------------------------------------------------------------")
//Circular
var obj1 = myObject.create(null);
var obj0 = myObject.create([obj1]);
obj1.na = "obj1";
obj0.na = "obj0";


console.log("LISTA  " + obj0.na)
var obj0list =obj0.getPrototypes();
console.log("längd  " + obj0list.length);

for(var i = 0; i < obj0list.length; i ++) {
	console.log("l   " + i + " : " +obj0list[i].na);
}
console.log("SLUT PÅ LISTA")

console.log();



var obj3 = myObject.create([obj0, obj1]);
obj3.na = "obj3"
obj0.addPrototype(obj3);

console.log("LISTA IGEN2  "+ obj0.na)

var obj0list2 =obj0.getPrototypes();
console.log("lista längd  ::" + obj0list2.length);

for(var i = 0; i < obj0list2.length; i ++) {
	console.log("l  " + i + " : " +obj0list2[i].na);
}

console.log("SLUT PÅ LISTA IGEN!")


console.log();
console.log("LISTA OBJ3  " +obj3.na)

var obj3list =obj3.getPrototypes();
console.log("lista längd  " + obj3list.length);

for(var i = 0; i < obj3list.length; i ++) {
	console.log("l  " + i + " : " +obj3list[i].na);
}

console.log("SLUT PÅ LISTA IGEN")

console.log()
console.log()

var obj9 = myObject.create(null);
obj9.na = "obj9"
//setPrototypes(obj9, [obj1, obj0]);


console.log();
console.log("LISTA OBJ9  " +obj9.na)

var obj9list =obj9.getPrototypes();
console.log("lista längd  " + obj9list.length);

for(var i = 0; i < obj9list.length; i ++) {
	console.log("l  " + i + " : " +obj9list[i].na);
}

console.log("SLUT PÅ LISTA IGEN")

console.log("-------------------------------------------------------------------------------------")

var o1 = myObject.create(null);
o1.name = "o1"
var o2 = {name: "o2"}
var o3 = {name: "o3"}
var o4 = myObject.create([o2, o1]);
o4.name = "o4"
try {
o1.addPrototype(o4);
o1.addPrototype(o2);
o4.addPrototype(o2);
o4.addPrototype(o3);
o4.addPrototype(o4);
} catch(e) {
	console.error(e);
}

console.log("\n\nO1 längd : (ska vara 1 ) " + o1.getPrototypes().length + "\n")

for(var i = 0; i < o1.getPrototypes().length; i ++) {
	console.log("Element  " + i + " : " + o1.getPrototypes()[i].name);
}
try {
o4.addPrototype(o1);
} catch(e) {
	console.error(e);
}
console.log("\n\nO4 längd : (ska vara 3 ) " + o4.getPrototypes().length + "\n")

for(var i = 0; i < o4.getPrototypes().length; i ++) {
	console.log("Element  " + i + " : " + o4.getPrototypes()[i].name);
}
//Test 
//obj9 = {};
//obj9.funcy = function() {console.log("hallå");};

//obj0 = myObject.create([obj9]);
//obj1 = {};
//obj1.func = function() {console.log("heeeej");};
//obj2 = obj0.create([obj0]);
//obj2.call("funcy", []);









