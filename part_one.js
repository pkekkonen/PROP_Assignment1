//create a object myObject with create method
//call(funkName, parametee

var myObject = {};

//måste se till att myObject blir proto till objektet som anropar den
myObject.create = function(prototypeList) {
	var obj = Object.create(myObject);
	prototypes = [];
	obj.prototypes = prototypeList;
	return obj;

	//this berör myObject objektet, inte objektet som anropade den

	// variabler? hittas inte i prototyp

};


myObject.call = function(funcName, parameters) {
	//börjar söka igenom element 0 i protoypes, sedan dess grand-prototypes
	//finns den inte i det ledet så rör vi oss till element 1 etc.
	search(this.prototypes,funcName, parameters);
	//TODO: gör koll om prototypes lista finns. Fast vad menar jag med det för den måste väl finnas eftersom myObject är en prototyp till objektet 
};


search = function(protos, funcName, parameters) {

	//ska först kolla i själva objektet man anropar med
	for(var i = 0; i < protos.length; i++) {
			var currentProto = protos[i];
			var parentProtos = getParentPrototypes(currentProto);

			if(currentProto.hasOwnProperty(funcName)) { //förutsätter att funcname är inskickad som String
				//&& typeOf(currentProto.funcName) === 'function'. Måste kolla att det faktiskt är en funktion som vi kan anropa
				console.log("här ");
				return currentProto[funcName](parameters); //varför returnar denna inte hela vägen??
			} else {
				parentProtos.forEach(currentParentProto =>{

					if(parentProto.hasOwnProperty(funcName)) {
						//&& typeOf(currentProto.funcName) === 'function'. Måste kolla att det faktiskt är en funktion som vi kan anropa
						return parentProto[funcName](parameters);
					}
				});
				//när vi har nått null så vill vi röra oss ett steg nedåt och ett steg åt höger i dess prototypes lista förutsatt att den har en 
				var i = parentProtos.length;
				do{ 
					i--;
					lastParenProto = parentProtos[i];
				} while (lastParentProto.__proto__ !== myObject  && i !== 0);

				var result = search(lastParenProto.prototypes);
				if(result !== undefined)
					return result;
				//om den är undefined så betyder det att den aldrig hittade någon funktion i det rekursiva anropet och det betyder att vi ska röra oss till nästa element i prototypesList

			}
			//kolla om proto har funktionen
			//om inte så leta uppåt i dess prototyper
	}

	return undefined;
}

//måste vi kolla typen? Checka att proto verkligen är en object??
getParentPrototypes = function(proto) { 
	var parentProtos = [];

	while(proto.__proto__ != null) {
			parentProtos.push(proto.__proto__);
			proto = proto.__proto__;
	}

	return parentProtos;
}

var obj1 = {};
obj1.hej = function() {console.log("hej")};
var obj2 = {};
obj2.hej = function() {console.log("hello")};
var obj3 = myObject.create([obj2]);
obj3.hej = function() {console.log("hola")};
var result = obj3.call("hej", []);

console.log();
console.log("NEXT");
var obj4 = myObject.create([obj1, obj2, obj3]);
var result = obj4.call("hej", []);
















