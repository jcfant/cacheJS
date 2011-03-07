/**
 * @author JC Fant IV
 * @version 0.1
 * @class cacheJS
 * @final
 * 
 * cacheJS is a small caching object used to persist data 
 * through the lifetime of your application. Use cacheJS to 
 * cache Ajax Results, and other types of data you are fetching.
 * 
 * caceJS also includes HTML5 client side storage for persisting 
 * data between pages. The client must support HTML5 AND JSON in 
 * order for this feature to be enabled.
 * 
 */



/**
 * Create the global ("window") version of cacheJS
 *
 * @class cacheJS
 * @public
 */

(function(global, undefined){
	function cJS () {
		/**
		 * @default keep a copy of "this" around as cachejs
		 */
		var cachejs     = this,
			cache       = {},
			baseOptions	= {
							persistStorage : true
			};

		/**
		 * Constructs a new cacheJS object with feature detection.
		 *
		 * @name init
		 * @constructor
		 * @private
		 */
		var init = function() {
				try {
					baseOptions.hasLocalStorage = 'localStorage' in window && window.localStorage !== null;
				}catch(e){
					baseOptions.hasLocalStorage = false;
				}

				baseOptions.hasJSON = (typeof JSON !== undefined);

				setUseLocal();

				return cachejs;
		};

		/**
		 * Checks features to see if localStorage is enabled.
		 *
		 * @name setUseLocal
		 * @private
		 */
		var setUseLocal = function() {
			baseOptions.useLocal = baseOptions.persistStorage && baseOptions.hasLocalStorage && baseOptions.hasJSON;
		};

		/**
		 * Checks features to see if localStorage is enabled.
		 *
		 * @name setLocal
		 * @private
		 * @param {String} key This is the key to use for this chunk of information
		 * @param {Object} object This is the value to set to the localstorage.
		 */	
		var setLocal = function(key, object) {
			var data = { obj : object };
			var value = JSON.stringify(data);
			localStorage[key] = value;
		};

		/**
		 * Checks features to see if localStorage is enabled.
		 *
		 * @name getLocal
		 * @private
		 * @param {String} key This is the key to use for this chunk of information
		 * @param {Object} object This is the value to set to the localstorage.
		 */
		var getLocal = function(key) {
			var data = localStorage.getItem(key);
			data = JSON.parse(data);
			
			return data.obj;
		};
		
		/**
		 * Get items set to the cache. If the item doesn't exist in memory, 
		 * the data is tried to be retrieved from localStorage if the 
		 * persistStorage option is set to true.
		 * 
		 * @public
		 * @name get
		 * @memberOf cacheJS
		 * @function
		 * @param {String} key The key used to retrieve data
		 * @returns {Object} the item set to the cache in memory, or the local storage version of the object
		 */
		cachejs.get = function(key){
			var item = cache[key];
			if (item === undefined && baseOptions.useLocal){
				item = cache[key] = _getLocal(key);
			}

			return item === undefined ? undefined : item;
		};
		
		/**
		 * Sets items to the cache. if persistentStorage is set to true,
		 * the item will be set to the localStorage of the browser as well.
		 * 
		 * @public
		 * @name set
		 * @memberOf cacheJS
		 * @function
		 * @param {String} key The key used to retrieve data
		 * @param {Object} the item set to the cache in memory, or the local storage version of the object
		 */
		cachejs.set = function(key, obj){
			cache[key] = obj;
			if (baseOptions.useLocal){
				setLocal(key, obj);
			}
		};
		
		/**
		 * Sets options at any time using cacheJS.options.
		 * 
		 * @public
		 * @name options
		 * @memberOf cacheJS
		 * @function
		 * @param {Object} opts Key Value pairs to be used in the options
		 */
		cachejs.options = function(opts){
			for (var key in opts){
				if (opts.hasOwnProperty(key)){
					baseOptions[key] = opts[key];
				}
			}
			setUseLocal();
		};
		
		return init();
	}
	
	global.cacheJS = new cJS();
}(this));
