var sys = require('sys'),
    http = require('http'),
    cacheJS = require('../cacheJS').cacheJS;

	
	var setTests = [
		{
			name: "Cache a String",
			key : "string",
			value : "works",
		},
		{
			name: "Cache a Boolean",
			key : "boolean",
			value : true
		},
		{
			name: "Cache a Number",
			key : "number",
			value : 1
		},
		{
			name: "Cache an Object",
			key : "object",
			value : {
				user : "jcfant"
			}
		}
	];
	
	var testRunObj = {
		tests : 0,
		error : 0,
		success : 0
	};
	
	for (var i = 0; i < setTests.length; i++){
		var test = setTests[i];
		var set = cacheJS.set(test.key, test.value);
		var get = cacheJS.get(test.key);
		
		var pass = true;
		
		if (typeof get == "object"){
			for (var key in get){
				if (get.hasOwnProperty(key)){
					if (get[key] != test.value[key]){
						testRunObj.error +=1;
						pass = false;
					}
				}
			}
			if (pass){
				testRunObj.success +=1;
			}
		}else if (get === test.value){
			testRunObj.success +=1;
		}else{
			pass = false;
			testRunObj.error +=1;
		}
		testRunObj.tests++;
		
		if (pass){
			sys.puts("Testing: " + test.name + " SUCCESS");
		}else{
			sys.puts("Testing: " + test.name + " FAIL");
		}
	}

sys.puts("");
sys.puts("{\n\t Tests : " + testRunObj.tests + ",\n\t Success : " + testRunObj.success + ",\n\t Error : " + testRunObj.error + "\n}");
if (testRunObj.error === 0){
	sys.puts("PASS");
}else{
	sys.puts("FAIL");
}
