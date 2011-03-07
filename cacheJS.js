/*
 *
 */

(function (global, undefined) {
	global.cacheJS = function() {
		var cachejs     = this,
			cache       = {},
			baseOptions	= {
							persistStorage : true,
							hasJSON : (typeof JSON !== undefined)
			};
			
		var init = function() {
				try {
					baseOptions.hasLocalStorage = 'localStorage' in window && window.localStorage !== null;
				}catch(e){
					baseOptions.hasLocalStorage = false;
				}
				setUseLocal();
				
				return cacheJS;
		};
		
		var setUseLocal = function() {
				baseOptions.useLocal = baseOptions.persistStorage && baseOptions.hasLocalStorage;
		};
			
		var setLocal = function() {
				
		};
			
		var getLocal = function(key) {
			var data = localStorage.getItem(key);
			
		};
		
		cacheJS.dump = function(){
			console.log(baseOptions);
		};
		
		cacheJS.get = function(key){
			var item = cache[key];
			if (item === undefined && baseOptions.useLocal){
				item = cache[key] = _getLocal(key);
			}
			
			return item === undefined ? undefined : item;
		};
		
		cacheJS.set = function(key, obj){
			
		};
		
		cacheJS.options = function(opts){
			for (var key in opts){
				if (opts.hasOwnProperty(key)){
					baseOptions[key] = opts[key];
				}
			}
			setUseLocal();
		};
			
		return init();
	}();
}(this));



cacheJS.options({persistStorage : false });
console.log(cacheJS.dump());

console.log((typeof JSON === undefined));