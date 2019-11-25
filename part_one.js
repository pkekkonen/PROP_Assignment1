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
			if(proto.hasOwnProperty(funcName) && typeOf(proto.funcName === 'function')) { //förutsätter att funcname är inskickad som String
				
			} else {
				var parentProto = proto.__proto__;
				while(parentProto != null) {
					if(parentProto.hasOwnProperty(funcName) && typeof(parentProto.funcName === 'function')) {
						
						//break;
					} else {
						
					parentProto = parentProto.__proto__;
					}
				}

			}
			//kolla om proto har funktionen
			//om inte så leta uppåt i dess prototyper
		}
	);

};