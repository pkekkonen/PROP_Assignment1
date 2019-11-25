//create a object myObject with create method
//call(funkName, parametee

var myObject = {
	var prototypes = [];

};

myObject.create = function(prototypeList) {
	prototypeList = prototypes;

};


myObject.call = function(funcName, parameters) {
	//börjar söka igenom element 0 i protoypes, sedan dess grand-prototypes
	//finns den inte i det ledet så rör vi oss till element 1 etc.
	funcNameFound = false;

	//TODO: gör koll om prototypes lista finns 
	this.prototypes.forEach(proto => {
			var parentProtos = getParentPrototypes(proto);

			if(proto.hasOwnProperty(funcName) && typeOf(proto.funcName === 'function')) { //förutsätter att funcname är inskickad som String
				return //vadå?
			} else {
				var parentProto = proto.__proto__;
				while(parentProto != null) {
					if(parentProto.hasOwnProperty(funcName) && typeof(parentProto.funcName === 'function')) {
						return //vadå?
						//break;
					} else {
						
						parentProto = parentProto.__proto__;
					}
				}

				//när vi har nått null så vill vi röra oss ett steg nedåt och ett steg åt höger i dess prototypes lista förutsatt att den har en 

			}
			//kolla om proto har funktionen
			//om inte så leta uppåt i dess prototyper
		}
	);

};

//måste vi kolla typen? Checka att proto verkligen är en object??
getParentPrototypes = function(proto) { 
	var parentProtos = [];

	while(proto.__proto__ != null) {
		if(typeof(proto.__proto__) === myObject) 
			parentProtos.push(proto.__proto__);
	}

	return parentProtos;
}