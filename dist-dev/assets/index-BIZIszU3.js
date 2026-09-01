//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
		var key = null;
		void 0 !== maybeKey && (key = "" + maybeKey);
		void 0 !== config.key && (key = "" + config.key);
		if ("key" in config) {
			maybeKey = {};
			for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
		} else maybeKey = config;
		config = maybeKey.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== config ? config : null,
			props: maybeKey
		};
	}
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.jsx = jsxProd;
	exports.jsxs = jsxProd;
}));
//#endregion
//#region node_modules/react/jsx-runtime.js
var require_jsx_runtime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_production();
}));
//#endregion
//#region node_modules/react/cjs/react.production.js
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_PORTAL_TYPE = Symbol.for("react.portal");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
	var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
	var REACT_CONTEXT_TYPE = Symbol.for("react.context");
	var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
	var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
	var REACT_MEMO_TYPE = Symbol.for("react.memo");
	var REACT_LAZY_TYPE = Symbol.for("react.lazy");
	var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ReactNoopUpdateQueue = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	};
	var assign = Object.assign;
	var emptyObject = {};
	function Component(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	Component.prototype.isReactComponent = {};
	Component.prototype.setState = function(partialState, callback) {
		if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, partialState, callback, "setState");
	};
	Component.prototype.forceUpdate = function(callback) {
		this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
	};
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	function PureComponent(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = !0;
	var isArrayImpl = Array.isArray;
	function noop() {}
	var ReactSharedInternals = {
		H: null,
		A: null,
		T: null,
		S: null
	};
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function ReactElement(type, key, props) {
		var refProp = props.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== refProp ? refProp : null,
			props
		};
	}
	function cloneAndReplaceKey(oldElement, newKey) {
		return ReactElement(oldElement.type, newKey, oldElement.props);
	}
	function isValidElement(object) {
		return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function escape(key) {
		var escaperLookup = {
			"=": "=0",
			":": "=2"
		};
		return "$" + key.replace(/[=:]/g, function(match) {
			return escaperLookup[match];
		});
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
		return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function resolveThenable(thenable) {
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default: switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
				"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
			}, function(error) {
				"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			})), thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
			}
		}
		throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		var type = typeof children;
		if ("undefined" === type || "boolean" === type) children = null;
		var invokeCallback = !1;
		if (null === children) invokeCallback = !0;
		else switch (type) {
			case "bigint":
			case "string":
			case "number":
				invokeCallback = !0;
				break;
			case "object": switch (children.$$typeof) {
				case REACT_ELEMENT_TYPE:
				case REACT_PORTAL_TYPE:
					invokeCallback = !0;
					break;
				case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
			}
		}
		if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
			return c;
		})) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
		invokeCallback = 0;
		var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
		if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if ("object" === type) {
			if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
			array = String(children);
			throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
		}
		return invokeCallback;
	}
	function mapChildren(children, func, context) {
		if (null == children) return children;
		var result = [], count = 0;
		mapIntoArray(children, result, "", "", function(child) {
			return func.call(context, child, count++);
		});
		return result;
	}
	function lazyInitializer(payload) {
		if (-1 === payload._status) {
			var ctor = payload._result;
			ctor = ctor();
			ctor.then(function(moduleObject) {
				if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
			}, function(error) {
				if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
			});
			-1 === payload._status && (payload._status = 0, payload._result = ctor);
		}
		if (1 === payload._status) return payload._result.default;
		throw payload._result;
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
		if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
			var event = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
				error
			});
			if (!window.dispatchEvent(event)) return;
		} else if ("object" === typeof process && "function" === typeof process.emit) {
			process.emit("uncaughtException", error);
			return;
		}
		console.error(error);
	};
	var Children = {
		map: mapChildren,
		forEach: function(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		},
		count: function(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		},
		toArray: function(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		},
		only: function(children) {
			if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
	};
	exports.Activity = REACT_ACTIVITY_TYPE;
	exports.Children = Children;
	exports.Component = Component;
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.Profiler = REACT_PROFILER_TYPE;
	exports.PureComponent = PureComponent;
	exports.StrictMode = REACT_STRICT_MODE_TYPE;
	exports.Suspense = REACT_SUSPENSE_TYPE;
	exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
	exports.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(size) {
			return ReactSharedInternals.H.useMemoCache(size);
		}
	};
	exports.cache = function(fn) {
		return function() {
			return fn.apply(null, arguments);
		};
	};
	exports.cacheSignal = function() {
		return null;
	};
	exports.cloneElement = function(element, config, children) {
		if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
		var props = assign({}, element.props), key = element.key;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
		var propName = arguments.length - 2;
		if (1 === propName) props.children = children;
		else if (1 < propName) {
			for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		return ReactElement(element.type, key, props);
	};
	exports.createContext = function(defaultValue) {
		defaultValue = {
			$$typeof: REACT_CONTEXT_TYPE,
			_currentValue: defaultValue,
			_currentValue2: defaultValue,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		};
		defaultValue.Provider = defaultValue;
		defaultValue.Consumer = {
			$$typeof: REACT_CONSUMER_TYPE,
			_context: defaultValue
		};
		return defaultValue;
	};
	exports.createElement = function(type, config, children) {
		var propName, props = {}, key = null;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
		var childrenLength = arguments.length - 2;
		if (1 === childrenLength) props.children = children;
		else if (1 < childrenLength) {
			for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
		return ReactElement(type, key, props);
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(render) {
		return {
			$$typeof: REACT_FORWARD_REF_TYPE,
			render
		};
	};
	exports.isValidElement = isValidElement;
	exports.lazy = function(ctor) {
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: {
				_status: -1,
				_result: ctor
			},
			_init: lazyInitializer
		};
	};
	exports.memo = function(type, compare) {
		return {
			$$typeof: REACT_MEMO_TYPE,
			type,
			compare: void 0 === compare ? null : compare
		};
	};
	exports.startTransition = function(scope) {
		var prevTransition = ReactSharedInternals.T, currentTransition = {};
		ReactSharedInternals.T = currentTransition;
		try {
			var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
			null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
			"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
		} catch (error) {
			reportGlobalError(error);
		} finally {
			null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
		}
	};
	exports.unstable_useCacheRefresh = function() {
		return ReactSharedInternals.H.useCacheRefresh();
	};
	exports.use = function(usable) {
		return ReactSharedInternals.H.use(usable);
	};
	exports.useActionState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useActionState(action, initialState, permalink);
	};
	exports.useCallback = function(callback, deps) {
		return ReactSharedInternals.H.useCallback(callback, deps);
	};
	exports.useContext = function(Context) {
		return ReactSharedInternals.H.useContext(Context);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(value, initialValue) {
		return ReactSharedInternals.H.useDeferredValue(value, initialValue);
	};
	exports.useEffect = function(create, deps) {
		return ReactSharedInternals.H.useEffect(create, deps);
	};
	exports.useEffectEvent = function(callback) {
		return ReactSharedInternals.H.useEffectEvent(callback);
	};
	exports.useId = function() {
		return ReactSharedInternals.H.useId();
	};
	exports.useImperativeHandle = function(ref, create, deps) {
		return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
	};
	exports.useInsertionEffect = function(create, deps) {
		return ReactSharedInternals.H.useInsertionEffect(create, deps);
	};
	exports.useLayoutEffect = function(create, deps) {
		return ReactSharedInternals.H.useLayoutEffect(create, deps);
	};
	exports.useMemo = function(create, deps) {
		return ReactSharedInternals.H.useMemo(create, deps);
	};
	exports.useOptimistic = function(passthrough, reducer) {
		return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
	};
	exports.useReducer = function(reducer, initialArg, init) {
		return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
	};
	exports.useRef = function(initialValue) {
		return ReactSharedInternals.H.useRef(initialValue);
	};
	exports.useState = function(initialState) {
		return ReactSharedInternals.H.useState(initialState);
	};
	exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
		return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	};
	exports.useTransition = function() {
		return ReactSharedInternals.H.useTransition();
	};
	exports.version = "19.2.8";
}));
//#endregion
//#region node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_production();
}));
//#endregion
//#region node_modules/prop-types/lib/ReactPropTypesSecret.js
/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_ReactPropTypesSecret = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
}));
//#endregion
//#region node_modules/prop-types/factoryWithThrowingShims.js
/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_factoryWithThrowingShims = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ReactPropTypesSecret = require_ReactPropTypesSecret();
	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;
	module.exports = function() {
		function shim(props, propName, componentName, location, propFullName, secret) {
			if (secret === ReactPropTypesSecret) return;
			var err = /* @__PURE__ */ new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
			err.name = "Invariant Violation";
			throw err;
		}
		shim.isRequired = shim;
		function getShim() {
			return shim;
		}
		var ReactPropTypes = {
			array: shim,
			bigint: shim,
			bool: shim,
			func: shim,
			number: shim,
			object: shim,
			string: shim,
			symbol: shim,
			any: shim,
			arrayOf: getShim,
			element: shim,
			elementType: shim,
			instanceOf: getShim,
			node: shim,
			objectOf: getShim,
			oneOf: getShim,
			oneOfType: getShim,
			shape: getShim,
			exact: getShim,
			checkPropTypes: emptyFunctionWithReset,
			resetWarningCache: emptyFunction
		};
		ReactPropTypes.PropTypes = ReactPropTypes;
		return ReactPropTypes;
	};
}));
//#endregion
//#region node_modules/prop-types/index.js
var require_prop_types = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_factoryWithThrowingShims()();
}));
//#endregion
//#region node_modules/react-fast-compare/index.js
var require_react_fast_compare = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hasElementType = typeof Element !== "undefined";
	var hasMap = typeof Map === "function";
	var hasSet = typeof Set === "function";
	var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
	function equal(a, b) {
		if (a === b) return true;
		if (a && b && typeof a == "object" && typeof b == "object") {
			if (a.constructor !== b.constructor) return false;
			var length, i, keys;
			if (Array.isArray(a)) {
				length = a.length;
				if (length != b.length) return false;
				for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;
				return true;
			}
			var it;
			if (hasMap && a instanceof Map && b instanceof Map) {
				if (a.size !== b.size) return false;
				it = a.entries();
				while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;
				it = a.entries();
				while (!(i = it.next()).done) if (!equal(i.value[1], b.get(i.value[0]))) return false;
				return true;
			}
			if (hasSet && a instanceof Set && b instanceof Set) {
				if (a.size !== b.size) return false;
				it = a.entries();
				while (!(i = it.next()).done) if (!b.has(i.value[0])) return false;
				return true;
			}
			if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
				length = a.length;
				if (length != b.length) return false;
				for (i = length; i-- !== 0;) if (a[i] !== b[i]) return false;
				return true;
			}
			if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
			if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === "function" && typeof b.valueOf === "function") return a.valueOf() === b.valueOf();
			if (a.toString !== Object.prototype.toString && typeof a.toString === "function" && typeof b.toString === "function") return a.toString() === b.toString();
			keys = Object.keys(a);
			length = keys.length;
			if (length !== Object.keys(b).length) return false;
			for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
			if (hasElementType && a instanceof Element) return false;
			for (i = length; i-- !== 0;) {
				if ((keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") && a.$$typeof) continue;
				if (!equal(a[keys[i]], b[keys[i]])) return false;
			}
			return true;
		}
		return a !== a && b !== b;
	}
	module.exports = function isEqual(a, b) {
		try {
			return equal(a, b);
		} catch (error) {
			if ((error.message || "").match(/stack|recursion/i)) {
				console.warn("react-fast-compare cannot handle circular refs");
				return false;
			}
			throw error;
		}
	};
}));
//#endregion
//#region node_modules/invariant/browser.js
/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_browser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Use invariant() to assert state which your program assumes to be true.
	*
	* Provide sprintf-style format (only %s is supported) and arguments
	* to provide information about what broke and what you were
	* expecting.
	*
	* The invariant message will be stripped in production, but the invariant
	* will remain to ensure logic does not differ in production.
	*/
	var invariant = function(condition, format, a, b, c, d, e, f) {
		if (!condition) {
			var error;
			if (format === void 0) error = /* @__PURE__ */ new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
			else {
				var args = [
					a,
					b,
					c,
					d,
					e,
					f
				];
				var argIndex = 0;
				error = new Error(format.replace(/%s/g, function() {
					return args[argIndex++];
				}));
				error.name = "Invariant Violation";
			}
			error.framesToPop = 1;
			throw error;
		}
	};
	module.exports = invariant;
}));
//#endregion
//#region node_modules/shallowequal/index.js
var require_shallowequal = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function shallowEqual(objA, objB, compare, compareContext) {
		var ret = compare ? compare.call(compareContext, objA, objB) : void 0;
		if (ret !== void 0) return !!ret;
		if (objA === objB) return true;
		if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) return false;
		var keysA = Object.keys(objA);
		var keysB = Object.keys(objB);
		if (keysA.length !== keysB.length) return false;
		var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
		for (var idx = 0; idx < keysA.length; idx++) {
			var key = keysA[idx];
			if (!bHasOwnProperty(key)) return false;
			var valueA = objA[key];
			var valueB = objB[key];
			ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
			if (ret === false || ret === void 0 && valueA !== valueB) return false;
		}
		return true;
	};
}));
//#endregion
//#region node_modules/vite-react-ssg/node_modules/react-helmet-async/lib/index.module.js
var import_jsx_runtime = require_jsx_runtime();
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types());
var import_react_fast_compare = /* @__PURE__ */ __toESM(require_react_fast_compare());
var import_browser = /* @__PURE__ */ __toESM(require_browser());
var import_shallowequal = /* @__PURE__ */ __toESM(require_shallowequal());
function a() {
	return a = Object.assign || function(t) {
		for (var e = 1; e < arguments.length; e++) {
			var r = arguments[e];
			for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
		}
		return t;
	}, a.apply(this, arguments);
}
function s(t, e) {
	t.prototype = Object.create(e.prototype), t.prototype.constructor = t, c(t, e);
}
function c(t, e) {
	return c = Object.setPrototypeOf || function(t, e) {
		return t.__proto__ = e, t;
	}, c(t, e);
}
function u(t, e) {
	if (null == t) return {};
	var r, n, i = {}, o = Object.keys(t);
	for (n = 0; n < o.length; n++) e.indexOf(r = o[n]) >= 0 || (i[r] = t[r]);
	return i;
}
var l = {
	BASE: "base",
	BODY: "body",
	HEAD: "head",
	HTML: "html",
	LINK: "link",
	META: "meta",
	NOSCRIPT: "noscript",
	SCRIPT: "script",
	STYLE: "style",
	TITLE: "title",
	FRAGMENT: "Symbol(react.fragment)"
};
var p = { rel: [
	"amphtml",
	"canonical",
	"alternate"
] };
var f = { type: ["application/ld+json"] };
var d = {
	charset: "",
	name: ["robots", "description"],
	property: [
		"og:type",
		"og:title",
		"og:url",
		"og:image",
		"og:image:alt",
		"og:description",
		"twitter:url",
		"twitter:title",
		"twitter:description",
		"twitter:image",
		"twitter:image:alt",
		"twitter:card",
		"twitter:site"
	]
};
var h = Object.keys(l).map(function(t) {
	return l[t];
});
var m = {
	accesskey: "accessKey",
	charset: "charSet",
	class: "className",
	contenteditable: "contentEditable",
	contextmenu: "contextMenu",
	"http-equiv": "httpEquiv",
	itemprop: "itemProp",
	tabindex: "tabIndex"
};
var y = Object.keys(m).reduce(function(t, e) {
	return t[m[e]] = e, t;
}, {});
var T = function(t, e) {
	for (var r = t.length - 1; r >= 0; r -= 1) {
		var n = t[r];
		if (Object.prototype.hasOwnProperty.call(n, e)) return n[e];
	}
	return null;
};
var g = function(t) {
	var e = T(t, l.TITLE), r = T(t, "titleTemplate");
	if (Array.isArray(e) && (e = e.join("")), r && e) return r.replace(/%s/g, function() {
		return e;
	});
	var n = T(t, "defaultTitle");
	return e || n || void 0;
};
var b = function(t) {
	return T(t, "onChangeClientState") || function() {};
};
var v = function(t, e) {
	return e.filter(function(e) {
		return void 0 !== e[t];
	}).map(function(e) {
		return e[t];
	}).reduce(function(t, e) {
		return a({}, t, e);
	}, {});
};
var A = function(t, e) {
	return e.filter(function(t) {
		return void 0 !== t[l.BASE];
	}).map(function(t) {
		return t[l.BASE];
	}).reverse().reduce(function(e, r) {
		if (!e.length) for (var n = Object.keys(r), i = 0; i < n.length; i += 1) {
			var o = n[i].toLowerCase();
			if (-1 !== t.indexOf(o) && r[o]) return e.concat(r);
		}
		return e;
	}, []);
};
var C = function(t, e, r) {
	var n = {};
	return r.filter(function(e) {
		return !!Array.isArray(e[t]) || (void 0 !== e[t] && console && "function" == typeof console.warn && console.warn("Helmet: " + t + " should be of type \"Array\". Instead found type \"" + typeof e[t] + "\""), !1);
	}).map(function(e) {
		return e[t];
	}).reverse().reduce(function(t, r) {
		var i = {};
		r.filter(function(t) {
			for (var r, o = Object.keys(t), a = 0; a < o.length; a += 1) {
				var s = o[a], c = s.toLowerCase();
				-1 === e.indexOf(c) || "rel" === r && "canonical" === t[r].toLowerCase() || "rel" === c && "stylesheet" === t[c].toLowerCase() || (r = c), -1 === e.indexOf(s) || "innerHTML" !== s && "cssText" !== s && "itemprop" !== s || (r = s);
			}
			if (!r || !t[r]) return !1;
			var u = t[r].toLowerCase();
			return n[r] || (n[r] = {}), i[r] || (i[r] = {}), !n[r][u] && (i[r][u] = !0, !0);
		}).reverse().forEach(function(e) {
			return t.push(e);
		});
		for (var o = Object.keys(i), s = 0; s < o.length; s += 1) {
			var c = o[s];
			n[c] = a({}, n[c], i[c]);
		}
		return t;
	}, []).reverse();
};
var O = function(t, e) {
	if (Array.isArray(t) && t.length) {
		for (var r = 0; r < t.length; r += 1) if (t[r][e]) return !0;
	}
	return !1;
};
var S = function(t) {
	return Array.isArray(t) ? t.join("") : t;
};
var E = function(t, e) {
	return Array.isArray(t) ? t.reduce(function(t, r) {
		return function(t, e) {
			for (var r = Object.keys(t), n = 0; n < r.length; n += 1) if (e[r[n]] && e[r[n]].includes(t[r[n]])) return !0;
			return !1;
		}(r, e) ? t.priority.push(r) : t.default.push(r), t;
	}, {
		priority: [],
		default: []
	}) : { default: t };
};
var I = function(t, e) {
	var r;
	return a({}, t, ((r = {})[e] = void 0, r));
};
var P = [
	l.NOSCRIPT,
	l.SCRIPT,
	l.STYLE
];
var w = function(t, e) {
	return void 0 === e && (e = !0), !1 === e ? String(t) : String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var x = function(t) {
	return Object.keys(t).reduce(function(e, r) {
		var n = void 0 !== t[r] ? r + "=\"" + t[r] + "\"" : "" + r;
		return e ? e + " " + n : n;
	}, "");
};
var L = function(t, e) {
	return void 0 === e && (e = {}), Object.keys(t).reduce(function(e, r) {
		return e[m[r] || r] = t[r], e;
	}, e);
};
var j = function(e, r) {
	return r.map(function(r, n) {
		var i, o = ((i = { key: n })["data-rh"] = !0, i);
		return Object.keys(r).forEach(function(t) {
			var e = m[t] || t;
			"innerHTML" === e || "cssText" === e ? o.dangerouslySetInnerHTML = { __html: r.innerHTML || r.cssText } : o[e] = r[t];
		}), import_react.createElement(e, o);
	});
};
var M = function(e, r, n) {
	switch (e) {
		case l.TITLE: return {
			toComponent: function() {
				return n = r.titleAttributes, (i = { key: e = r.title })["data-rh"] = !0, o = L(n, i), [import_react.createElement(l.TITLE, o, e)];
				var e, n, i, o;
			},
			toString: function() {
				return function(t, e, r, n) {
					var i = x(r), o = S(e);
					return i ? "<" + t + " data-rh=\"true\" " + i + ">" + w(o, n) + "</" + t + ">" : "<" + t + " data-rh=\"true\">" + w(o, n) + "</" + t + ">";
				}(e, r.title, r.titleAttributes, n);
			}
		};
		case "bodyAttributes":
		case "htmlAttributes": return {
			toComponent: function() {
				return L(r);
			},
			toString: function() {
				return x(r);
			}
		};
		default: return {
			toComponent: function() {
				return j(e, r);
			},
			toString: function() {
				return function(t, e, r) {
					return e.reduce(function(e, n) {
						var i = Object.keys(n).filter(function(t) {
							return !("innerHTML" === t || "cssText" === t);
						}).reduce(function(t, e) {
							var i = void 0 === n[e] ? e : e + "=\"" + w(n[e], r) + "\"";
							return t ? t + " " + i : i;
						}, ""), o = n.innerHTML || n.cssText || "", a = -1 === P.indexOf(t);
						return e + "<" + t + " data-rh=\"true\" " + i + (a ? "/>" : ">" + o + "</" + t + ">");
					}, "");
				}(e, r, n);
			}
		};
	}
};
var k = function(t) {
	var e = t.baseTag, r = t.bodyAttributes, n = t.encode, i = t.htmlAttributes, o = t.noscriptTags, a = t.styleTags, s = t.title, c = void 0 === s ? "" : s, u = t.titleAttributes, h = t.linkTags, m = t.metaTags, y = t.scriptTags, T = {
		toComponent: function() {},
		toString: function() {
			return "";
		}
	};
	if (t.prioritizeSeoTags) {
		var g = function(t) {
			var e = t.linkTags, r = t.scriptTags, n = t.encode, i = E(t.metaTags, d), o = E(e, p), a = E(r, f);
			return {
				priorityMethods: {
					toComponent: function() {
						return [].concat(j(l.META, i.priority), j(l.LINK, o.priority), j(l.SCRIPT, a.priority));
					},
					toString: function() {
						return M(l.META, i.priority, n) + " " + M(l.LINK, o.priority, n) + " " + M(l.SCRIPT, a.priority, n);
					}
				},
				metaTags: i.default,
				linkTags: o.default,
				scriptTags: a.default
			};
		}(t);
		T = g.priorityMethods, h = g.linkTags, m = g.metaTags, y = g.scriptTags;
	}
	return {
		priority: T,
		base: M(l.BASE, e, n),
		bodyAttributes: M("bodyAttributes", r, n),
		htmlAttributes: M("htmlAttributes", i, n),
		link: M(l.LINK, h, n),
		meta: M(l.META, m, n),
		noscript: M(l.NOSCRIPT, o, n),
		script: M(l.SCRIPT, y, n),
		style: M(l.STYLE, a, n),
		title: M(l.TITLE, {
			title: c,
			titleAttributes: u
		}, n)
	};
};
var H = [];
var N = function(t, e) {
	var r = this;
	void 0 === e && (e = "undefined" != typeof document), this.instances = [], this.value = {
		setHelmet: function(t) {
			r.context.helmet = t;
		},
		helmetInstances: {
			get: function() {
				return r.canUseDOM ? H : r.instances;
			},
			add: function(t) {
				(r.canUseDOM ? H : r.instances).push(t);
			},
			remove: function(t) {
				var e = (r.canUseDOM ? H : r.instances).indexOf(t);
				(r.canUseDOM ? H : r.instances).splice(e, 1);
			}
		}
	}, this.context = t, this.canUseDOM = e, e || (t.helmet = k({
		baseTag: [],
		bodyAttributes: {},
		encodeSpecialCharacters: !0,
		htmlAttributes: {},
		linkTags: [],
		metaTags: [],
		noscriptTags: [],
		scriptTags: [],
		styleTags: [],
		title: "",
		titleAttributes: {}
	}));
};
var R = import_react.createContext({});
var D = import_prop_types.default.shape({
	setHelmet: import_prop_types.default.func,
	helmetInstances: import_prop_types.default.shape({
		get: import_prop_types.default.func,
		add: import_prop_types.default.func,
		remove: import_prop_types.default.func
	})
});
var U = "undefined" != typeof document;
var q = /*#__PURE__*/ function(e) {
	function r(t) {
		var n;
		return (n = e.call(this, t) || this).helmetData = new N(n.props.context, r.canUseDOM), n;
	}
	return s(r, e), r.prototype.render = function() {
		/*#__PURE__*/ return import_react.createElement(R.Provider, { value: this.helmetData.value }, this.props.children);
	}, r;
}(import_react.Component);
q.canUseDOM = U, q.propTypes = {
	context: import_prop_types.default.shape({ helmet: import_prop_types.default.shape() }),
	children: import_prop_types.default.node.isRequired
}, q.defaultProps = { context: {} }, q.displayName = "HelmetProvider";
var Y = function(t, e) {
	var r, n = document.head || document.querySelector(l.HEAD), i = n.querySelectorAll(t + "[data-rh]"), o = [].slice.call(i), a = [];
	return e && e.length && e.forEach(function(e) {
		var n = document.createElement(t);
		for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && ("innerHTML" === i ? n.innerHTML = e.innerHTML : "cssText" === i ? n.styleSheet ? n.styleSheet.cssText = e.cssText : n.appendChild(document.createTextNode(e.cssText)) : n.setAttribute(i, void 0 === e[i] ? "" : e[i]));
		n.setAttribute("data-rh", "true"), o.some(function(t, e) {
			return r = e, n.isEqualNode(t);
		}) ? o.splice(r, 1) : a.push(n);
	}), o.forEach(function(t) {
		return t.parentNode.removeChild(t);
	}), a.forEach(function(t) {
		return n.appendChild(t);
	}), {
		oldTags: o,
		newTags: a
	};
};
var B = function(t, e) {
	var r = document.getElementsByTagName(t)[0];
	if (r) {
		for (var n = r.getAttribute("data-rh"), i = n ? n.split(",") : [], o = [].concat(i), a = Object.keys(e), s = 0; s < a.length; s += 1) {
			var c = a[s], u = e[c] || "";
			r.getAttribute(c) !== u && r.setAttribute(c, u), -1 === i.indexOf(c) && i.push(c);
			var l = o.indexOf(c);
			-1 !== l && o.splice(l, 1);
		}
		for (var p = o.length - 1; p >= 0; p -= 1) r.removeAttribute(o[p]);
		i.length === o.length ? r.removeAttribute("data-rh") : r.getAttribute("data-rh") !== a.join(",") && r.setAttribute("data-rh", a.join(","));
	}
};
var K = function(t, e) {
	var r = t.baseTag, n = t.htmlAttributes, i = t.linkTags, o = t.metaTags, a = t.noscriptTags, s = t.onChangeClientState, c = t.scriptTags, u = t.styleTags, p = t.title, f = t.titleAttributes;
	B(l.BODY, t.bodyAttributes), B(l.HTML, n), function(t, e) {
		void 0 !== t && document.title !== t && (document.title = S(t)), B(l.TITLE, e);
	}(p, f);
	var d = {
		baseTag: Y(l.BASE, r),
		linkTags: Y(l.LINK, i),
		metaTags: Y(l.META, o),
		noscriptTags: Y(l.NOSCRIPT, a),
		scriptTags: Y(l.SCRIPT, c),
		styleTags: Y(l.STYLE, u)
	}, h = {}, m = {};
	Object.keys(d).forEach(function(t) {
		var e = d[t], r = e.newTags, n = e.oldTags;
		r.length && (h[t] = r), n.length && (m[t] = d[t].oldTags);
	}), e && e(), s(t, h, m);
};
var _ = null;
var z = /*#__PURE__*/ function(t) {
	function e() {
		for (var e, r = arguments.length, n = new Array(r), i = 0; i < r; i++) n[i] = arguments[i];
		return (e = t.call.apply(t, [this].concat(n)) || this).rendered = !1, e;
	}
	s(e, t);
	var r = e.prototype;
	return r.shouldComponentUpdate = function(t) {
		return !(0, import_shallowequal.default)(t, this.props);
	}, r.componentDidUpdate = function() {
		this.emitChange();
	}, r.componentWillUnmount = function() {
		this.props.context.helmetInstances.remove(this), this.emitChange();
	}, r.emitChange = function() {
		var t, e, r = this.props.context, n = r.setHelmet, i = null, o = (t = r.helmetInstances.get().map(function(t) {
			var e = a({}, t.props);
			return delete e.context, e;
		}), {
			baseTag: A(["href"], t),
			bodyAttributes: v("bodyAttributes", t),
			defer: T(t, "defer"),
			encode: T(t, "encodeSpecialCharacters"),
			htmlAttributes: v("htmlAttributes", t),
			linkTags: C(l.LINK, ["rel", "href"], t),
			metaTags: C(l.META, [
				"name",
				"charset",
				"http-equiv",
				"property",
				"itemprop"
			], t),
			noscriptTags: C(l.NOSCRIPT, ["innerHTML"], t),
			onChangeClientState: b(t),
			scriptTags: C(l.SCRIPT, ["src", "innerHTML"], t),
			styleTags: C(l.STYLE, ["cssText"], t),
			title: g(t),
			titleAttributes: v("titleAttributes", t),
			prioritizeSeoTags: O(t, "prioritizeSeoTags")
		});
		q.canUseDOM ? (e = o, _ && cancelAnimationFrame(_), e.defer ? _ = requestAnimationFrame(function() {
			K(e, function() {
				_ = null;
			});
		}) : (K(e), _ = null)) : k && (i = k(o)), n(i);
	}, r.init = function() {
		this.rendered || (this.rendered = !0, this.props.context.helmetInstances.add(this), this.emitChange());
	}, r.render = function() {
		return this.init(), null;
	}, e;
}(import_react.Component);
z.propTypes = { context: D.isRequired }, z.displayName = "HelmetDispatcher";
var F = ["children"];
var G = ["children"];
var W = /*#__PURE__*/ function(e) {
	function r() {
		return e.apply(this, arguments) || this;
	}
	s(r, e);
	var o = r.prototype;
	return o.shouldComponentUpdate = function(t) {
		return !(0, import_react_fast_compare.default)(I(this.props, "helmetData"), I(t, "helmetData"));
	}, o.mapNestedChildrenToProps = function(t, e) {
		if (!e) return null;
		switch (t.type) {
			case l.SCRIPT:
			case l.NOSCRIPT: return { innerHTML: e };
			case l.STYLE: return { cssText: e };
			default: throw new Error("<" + t.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
		}
	}, o.flattenArrayTypeChildren = function(t) {
		var e, r = t.child, n = t.arrayTypeChildren;
		return a({}, n, ((e = {})[r.type] = [].concat(n[r.type] || [], [a({}, t.newChildProps, this.mapNestedChildrenToProps(r, t.nestedChildren))]), e));
	}, o.mapObjectTypeChildren = function(t) {
		var e, r, n = t.child, i = t.newProps, o = t.newChildProps, s = t.nestedChildren;
		switch (n.type) {
			case l.TITLE: return a({}, i, ((e = {})[n.type] = s, e.titleAttributes = a({}, o), e));
			case l.BODY: return a({}, i, { bodyAttributes: a({}, o) });
			case l.HTML: return a({}, i, { htmlAttributes: a({}, o) });
			default: return a({}, i, ((r = {})[n.type] = a({}, o), r));
		}
	}, o.mapArrayTypeChildrenToProps = function(t, e) {
		var r = a({}, e);
		return Object.keys(t).forEach(function(e) {
			var n;
			r = a({}, r, ((n = {})[e] = t[e], n));
		}), r;
	}, o.warnOnInvalidChildren = function(t, e) {
		return (0, import_browser.default)(h.some(function(e) {
			return t.type === e;
		}), "function" == typeof t.type ? "You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information." : "Only elements types " + h.join(", ") + " are allowed. Helmet does not support rendering <" + t.type + "> elements. Refer to our API for more information."), (0, import_browser.default)(!e || "string" == typeof e || Array.isArray(e) && !e.some(function(t) {
			return "string" != typeof t;
		}), "Helmet expects a string as a child of <" + t.type + ">. Did you forget to wrap your children in braces? ( <" + t.type + ">{``}</" + t.type + "> ) Refer to our API for more information."), !0;
	}, o.mapChildrenToProps = function(e, r) {
		var n = this, i = {};
		return import_react.Children.forEach(e, function(t) {
			if (t && t.props) {
				var e = t.props, o = e.children, a = u(e, F), s = Object.keys(a).reduce(function(t, e) {
					return t[y[e] || e] = a[e], t;
				}, {}), c = t.type;
				switch ("symbol" == typeof c ? c = c.toString() : n.warnOnInvalidChildren(t, o), c) {
					case l.FRAGMENT:
						r = n.mapChildrenToProps(o, r);
						break;
					case l.LINK:
					case l.META:
					case l.NOSCRIPT:
					case l.SCRIPT:
					case l.STYLE:
						i = n.flattenArrayTypeChildren({
							child: t,
							arrayTypeChildren: i,
							newChildProps: s,
							nestedChildren: o
						});
						break;
					default: r = n.mapObjectTypeChildren({
						child: t,
						newProps: r,
						newChildProps: s,
						nestedChildren: o
					});
				}
			}
		}), this.mapArrayTypeChildrenToProps(i, r);
	}, o.render = function() {
		var e = this.props, r = e.children, n = u(e, G), i = a({}, n), o = n.helmetData;
		return r && (i = this.mapChildrenToProps(r, i)), !o || o instanceof N || (o = new N(o.context, o.instances)), o ? /*#__PURE__*/ import_react.createElement(z, a({}, i, {
			context: o.value,
			helmetData: void 0
		})) : /*#__PURE__*/ import_react.createElement(R.Consumer, null, function(e) {
			/*#__PURE__*/ return import_react.createElement(z, a({}, i, { context: e }));
		});
	}, r;
}(import_react.Component);
W.propTypes = {
	base: import_prop_types.default.object,
	bodyAttributes: import_prop_types.default.object,
	children: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.node), import_prop_types.default.node]),
	defaultTitle: import_prop_types.default.string,
	defer: import_prop_types.default.bool,
	encodeSpecialCharacters: import_prop_types.default.bool,
	htmlAttributes: import_prop_types.default.object,
	link: import_prop_types.default.arrayOf(import_prop_types.default.object),
	meta: import_prop_types.default.arrayOf(import_prop_types.default.object),
	noscript: import_prop_types.default.arrayOf(import_prop_types.default.object),
	onChangeClientState: import_prop_types.default.func,
	script: import_prop_types.default.arrayOf(import_prop_types.default.object),
	style: import_prop_types.default.arrayOf(import_prop_types.default.object),
	title: import_prop_types.default.string,
	titleAttributes: import_prop_types.default.object,
	titleTemplate: import_prop_types.default.string,
	prioritizeSeoTags: import_prop_types.default.bool,
	helmetData: import_prop_types.default.object
}, W.defaultProps = {
	defer: !0,
	encodeSpecialCharacters: !0,
	prioritizeSeoTags: !1
}, W.displayName = "Helmet";
//#endregion
//#region node_modules/react-dom/cjs/react-dom.production.js
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function formatProdErrorMessage(code) {
		var url = "https://react.dev/errors/" + code;
		if (1 < arguments.length) {
			url += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var i = 2; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
		}
		return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function noop() {}
	var Internals = {
		d: {
			f: noop,
			r: function() {
				throw Error(formatProdErrorMessage(522));
			},
			D: noop,
			C: noop,
			L: noop,
			m: noop,
			X: noop,
			S: noop,
			M: noop
		},
		p: 0,
		findDOMNode: null
	};
	var REACT_PORTAL_TYPE = Symbol.for("react.portal");
	function createPortal$1(children, containerInfo, implementation) {
		var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
		return {
			$$typeof: REACT_PORTAL_TYPE,
			key: null == key ? null : "" + key,
			children,
			containerInfo,
			implementation
		};
	}
	var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function getCrossOriginStringAs(as, input) {
		if ("font" === as) return "";
		if ("string" === typeof input) return "use-credentials" === input ? input : "";
	}
	exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
	exports.createPortal = function(children, container) {
		var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
		if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType) throw Error(formatProdErrorMessage(299));
		return createPortal$1(children, container, null, key);
	};
	exports.flushSync = function(fn) {
		var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
		try {
			if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
		} finally {
			ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
		}
	};
	exports.preconnect = function(href, options) {
		"string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
	};
	exports.prefetchDNS = function(href) {
		"string" === typeof href && Internals.d.D(href);
	};
	exports.preinit = function(href, options) {
		if ("string" === typeof href && options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
			"style" === as ? Internals.d.S(href, "string" === typeof options.precedence ? options.precedence : void 0, {
				crossOrigin,
				integrity,
				fetchPriority
			}) : "script" === as && Internals.d.X(href, {
				crossOrigin,
				integrity,
				fetchPriority,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0
			});
		}
	};
	exports.preinitModule = function(href, options) {
		if ("string" === typeof href) if ("object" === typeof options && null !== options) {
			if (null == options.as || "script" === options.as) {
				var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
				Internals.d.M(href, {
					crossOrigin,
					integrity: "string" === typeof options.integrity ? options.integrity : void 0,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0
				});
			}
		} else options ?? Internals.d.M(href);
	};
	exports.preload = function(href, options) {
		if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
			Internals.d.L(href, as, {
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0,
				type: "string" === typeof options.type ? options.type : void 0,
				fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
				referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
				imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
				imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
				media: "string" === typeof options.media ? options.media : void 0
			});
		}
	};
	exports.preloadModule = function(href, options) {
		if ("string" === typeof href) if (options) {
			var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
			Internals.d.m(href, {
				as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0
			});
		} else Internals.d.m(href);
	};
	exports.requestFormReset = function(form) {
		Internals.d.r(form);
	};
	exports.unstable_batchedUpdates = function(fn, a) {
		return fn(a);
	};
	exports.useFormState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useFormState(action, initialState, permalink);
	};
	exports.useFormStatus = function() {
		return ReactSharedInternals.H.useHostTransitionStatus();
	};
	exports.version = "19.2.8";
}));
//#endregion
//#region node_modules/react-dom/index.js
var require_react_dom = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function checkDCE() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") return;
		try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
		} catch (err) {
			console.error(err);
		}
	}
	checkDCE();
	module.exports = require_react_dom_production();
}));
//#endregion
//#region node_modules/@remix-run/router/dist/router.js
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
/**
* @remix-run/router v1.23.3
*
* Copyright (c) Remix Software Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license MIT
*/
function _extends$2() {
	return _extends$2 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$2.apply(null, arguments);
}
/**
* Actions represent the type of change to a location value.
*/
var Action;
(function(Action) {
	/**
	* A POP indicates a change to an arbitrary index in the history stack, such
	* as a back or forward navigation. It does not describe the direction of the
	* navigation, only that the current index changed.
	*
	* Note: This is the default action for newly created history objects.
	*/
	Action["Pop"] = "POP";
	/**
	* A PUSH indicates a new entry being added to the history stack, such as when
	* a link is clicked and a new page loads. When this happens, all subsequent
	* entries in the stack are lost.
	*/
	Action["Push"] = "PUSH";
	/**
	* A REPLACE indicates the entry at the current index in the history stack
	* being replaced by a new one.
	*/
	Action["Replace"] = "REPLACE";
})(Action || (Action = {}));
var PopStateEventType = "popstate";
/**
* Browser history stores the location in regular URLs. This is the standard for
* most web apps, but it requires some configuration on the server to ensure you
* serve the same app at multiple URLs.
*
* @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createbrowserhistory
*/
function createBrowserHistory(options) {
	if (options === void 0) options = {};
	function createBrowserLocation(window, globalHistory) {
		let { pathname, search, hash } = window.location;
		return createLocation("", {
			pathname,
			search,
			hash
		}, globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
	}
	function createBrowserHref(window, to) {
		return typeof to === "string" ? to : createPath(to);
	}
	return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
function invariant(value, message) {
	if (value === false || value === null || typeof value === "undefined") throw new Error(message);
}
function warning(cond, message) {
	if (!cond) {
		if (typeof console !== "undefined") console.warn(message);
		try {
			throw new Error(message);
		} catch (e) {}
	}
}
function createKey() {
	return Math.random().toString(36).substr(2, 8);
}
/**
* For browser-based histories, we combine the state and key into an object
*/
function getHistoryState(location, index) {
	return {
		usr: location.state,
		key: location.key,
		idx: index
	};
}
/**
* Creates a Location object with a unique key from the given Path
*/
function createLocation(current, to, state, key) {
	if (state === void 0) state = null;
	return _extends$2({
		pathname: typeof current === "string" ? current : current.pathname,
		search: "",
		hash: ""
	}, typeof to === "string" ? parsePath(to) : to, {
		state,
		key: to && to.key || key || createKey()
	});
}
/**
* Creates a string URL path from the given pathname, search, and hash components.
*/
function createPath(_ref) {
	let { pathname = "/", search = "", hash = "" } = _ref;
	if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
	if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
	return pathname;
}
/**
* Parses a string URL path into its separate pathname, search, and hash components.
*/
function parsePath(path) {
	let parsedPath = {};
	if (path) {
		let hashIndex = path.indexOf("#");
		if (hashIndex >= 0) {
			parsedPath.hash = path.substr(hashIndex);
			path = path.substr(0, hashIndex);
		}
		let searchIndex = path.indexOf("?");
		if (searchIndex >= 0) {
			parsedPath.search = path.substr(searchIndex);
			path = path.substr(0, searchIndex);
		}
		if (path) parsedPath.pathname = path;
	}
	return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
	if (options === void 0) options = {};
	let { window = document.defaultView, v5Compat = false } = options;
	let globalHistory = window.history;
	let action = Action.Pop;
	let listener = null;
	let index = getIndex();
	if (index == null) {
		index = 0;
		globalHistory.replaceState(_extends$2({}, globalHistory.state, { idx: index }), "");
	}
	function getIndex() {
		return (globalHistory.state || { idx: null }).idx;
	}
	function handlePop() {
		action = Action.Pop;
		let nextIndex = getIndex();
		let delta = nextIndex == null ? null : nextIndex - index;
		index = nextIndex;
		if (listener) listener({
			action,
			location: history.location,
			delta
		});
	}
	function push(to, state) {
		action = Action.Push;
		let location = createLocation(history.location, to, state);
		if (validateLocation) validateLocation(location, to);
		index = getIndex() + 1;
		let historyState = getHistoryState(location, index);
		let url = history.createHref(location);
		try {
			globalHistory.pushState(historyState, "", url);
		} catch (error) {
			if (error instanceof DOMException && error.name === "DataCloneError") throw error;
			window.location.assign(url);
		}
		if (v5Compat && listener) listener({
			action,
			location: history.location,
			delta: 1
		});
	}
	function replace(to, state) {
		action = Action.Replace;
		let location = createLocation(history.location, to, state);
		if (validateLocation) validateLocation(location, to);
		index = getIndex();
		let historyState = getHistoryState(location, index);
		let url = history.createHref(location);
		globalHistory.replaceState(historyState, "", url);
		if (v5Compat && listener) listener({
			action,
			location: history.location,
			delta: 0
		});
	}
	function createURL(to) {
		let base = window.location.origin !== "null" ? window.location.origin : window.location.href;
		let href = typeof to === "string" ? to : createPath(to);
		href = href.replace(/ $/, "%20");
		invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
		return new URL(href, base);
	}
	let history = {
		get action() {
			return action;
		},
		get location() {
			return getLocation(window, globalHistory);
		},
		listen(fn) {
			if (listener) throw new Error("A history only accepts one active listener");
			window.addEventListener(PopStateEventType, handlePop);
			listener = fn;
			return () => {
				window.removeEventListener(PopStateEventType, handlePop);
				listener = null;
			};
		},
		createHref(to) {
			return createHref(window, to);
		},
		createURL,
		encodeLocation(to) {
			let url = createURL(to);
			return {
				pathname: url.pathname,
				search: url.search,
				hash: url.hash
			};
		},
		push,
		replace,
		go(n) {
			return globalHistory.go(n);
		}
	};
	return history;
}
var ResultType;
(function(ResultType) {
	ResultType["data"] = "data";
	ResultType["deferred"] = "deferred";
	ResultType["redirect"] = "redirect";
	ResultType["error"] = "error";
})(ResultType || (ResultType = {}));
var immutableRouteKeys = /* @__PURE__ */ new Set([
	"lazy",
	"caseSensitive",
	"path",
	"id",
	"index",
	"children"
]);
function isIndexRoute$1(route) {
	return route.index === true;
}
function convertRoutesToDataRoutes$1(routes, mapRouteProperties, parentPath, manifest) {
	if (parentPath === void 0) parentPath = [];
	if (manifest === void 0) manifest = {};
	return routes.map((route, index) => {
		let treePath = [...parentPath, String(index)];
		let id = typeof route.id === "string" ? route.id : treePath.join("-");
		invariant(route.index !== true || !route.children, "Cannot specify children on an index route");
		invariant(!manifest[id], "Found a route id collision on id \"" + id + "\".  Route id's must be globally unique within Data Router usages");
		if (isIndexRoute$1(route)) {
			let indexRoute = _extends$2({}, route, mapRouteProperties(route), { id });
			manifest[id] = indexRoute;
			return indexRoute;
		} else {
			let pathOrLayoutRoute = _extends$2({}, route, mapRouteProperties(route), {
				id,
				children: void 0
			});
			manifest[id] = pathOrLayoutRoute;
			if (route.children) pathOrLayoutRoute.children = convertRoutesToDataRoutes$1(route.children, mapRouteProperties, treePath, manifest);
			return pathOrLayoutRoute;
		}
	});
}
/**
* Matches the given routes to a location and returns the match data.
*
* @see https://reactrouter.com/v6/utils/match-routes
*/
function matchRoutes(routes, locationArg, basename) {
	if (basename === void 0) basename = "/";
	return matchRoutesImpl(routes, locationArg, basename, false);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
	let pathname = stripBasename((typeof locationArg === "string" ? parsePath(locationArg) : locationArg).pathname || "/", basename);
	if (pathname == null) return null;
	let branches = flattenRoutes(routes);
	rankRouteBranches(branches);
	let matches = null;
	let decoded = decodePath(pathname);
	for (let i = 0; matches == null && i < branches.length; ++i) matches = matchRouteBranch(branches[i], decoded, allowPartial);
	return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
	let { route, pathname, params } = match;
	return {
		id: route.id,
		pathname,
		params,
		data: loaderData[route.id],
		handle: route.handle
	};
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
	if (branches === void 0) branches = [];
	if (parentsMeta === void 0) parentsMeta = [];
	if (parentPath === void 0) parentPath = "";
	let flattenRoute = (route, index, relativePath) => {
		let meta = {
			relativePath: relativePath === void 0 ? route.path || "" : relativePath,
			caseSensitive: route.caseSensitive === true,
			childrenIndex: index,
			route
		};
		if (meta.relativePath.startsWith("/")) {
			invariant(meta.relativePath.startsWith(parentPath), "Absolute route path \"" + meta.relativePath + "\" nested under path " + ("\"" + parentPath + "\" is not valid. An absolute child route path ") + "must start with the combined path of all its parent routes.");
			meta.relativePath = meta.relativePath.slice(parentPath.length);
		}
		let path = joinPaths([parentPath, meta.relativePath]);
		let routesMeta = parentsMeta.concat(meta);
		if (route.children && route.children.length > 0) {
			invariant(route.index !== true, "Index routes must not have child routes. Please remove " + ("all child routes from route path \"" + path + "\"."));
			flattenRoutes(route.children, branches, routesMeta, path);
		}
		if (route.path == null && !route.index) return;
		branches.push({
			path,
			score: computeScore(path, route.index),
			routesMeta
		});
	};
	routes.forEach((route, index) => {
		var _route$path;
		if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) flattenRoute(route, index);
		else for (let exploded of explodeOptionalSegments(route.path)) flattenRoute(route, index, exploded);
	});
	return branches;
}
/**
* Computes all combinations of optional path segments for a given path,
* excluding combinations that are ambiguous and of lower priority.
*
* For example, `/one/:two?/three/:four?/:five?` explodes to:
* - `/one/three`
* - `/one/:two/three`
* - `/one/three/:four`
* - `/one/three/:five`
* - `/one/:two/three/:four`
* - `/one/:two/three/:five`
* - `/one/three/:four/:five`
* - `/one/:two/three/:four/:five`
*/
function explodeOptionalSegments(path) {
	let segments = path.split("/");
	if (segments.length === 0) return [];
	let [first, ...rest] = segments;
	let isOptional = first.endsWith("?");
	let required = first.replace(/\?$/, "");
	if (rest.length === 0) return isOptional ? [required, ""] : [required];
	let restExploded = explodeOptionalSegments(rest.join("/"));
	let result = [];
	result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
	if (isOptional) result.push(...restExploded);
	return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
	branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
}
var paramRe = /^:[\w-]+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;
var isSplat = (s) => s === "*";
function computeScore(path, index) {
	let segments = path.split("/");
	let initialScore = segments.length;
	if (segments.some(isSplat)) initialScore += splatPenalty;
	if (index) initialScore += indexRouteValue;
	return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
	return a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]) ? a[a.length - 1] - b[b.length - 1] : 0;
}
function matchRouteBranch(branch, pathname, allowPartial) {
	if (allowPartial === void 0) allowPartial = false;
	let { routesMeta } = branch;
	let matchedParams = {};
	let matchedPathname = "/";
	let matches = [];
	for (let i = 0; i < routesMeta.length; ++i) {
		let meta = routesMeta[i];
		let end = i === routesMeta.length - 1;
		let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
		let match = matchPath({
			path: meta.relativePath,
			caseSensitive: meta.caseSensitive,
			end
		}, remainingPathname);
		let route = meta.route;
		if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) match = matchPath({
			path: meta.relativePath,
			caseSensitive: meta.caseSensitive,
			end: false
		}, remainingPathname);
		if (!match) return null;
		Object.assign(matchedParams, match.params);
		matches.push({
			params: matchedParams,
			pathname: joinPaths([matchedPathname, match.pathname]),
			pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
			route
		});
		if (match.pathnameBase !== "/") matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
	}
	return matches;
}
/**
* Performs pattern matching on a URL pathname and returns information about
* the match.
*
* @see https://reactrouter.com/v6/utils/match-path
*/
function matchPath(pattern, pathname) {
	if (typeof pattern === "string") pattern = {
		path: pattern,
		caseSensitive: false,
		end: true
	};
	let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
	let match = pathname.match(matcher);
	if (!match) return null;
	let matchedPathname = match[0];
	let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
	let captureGroups = match.slice(1);
	return {
		params: compiledParams.reduce((memo, _ref, index) => {
			let { paramName, isOptional } = _ref;
			if (paramName === "*") {
				let splatValue = captureGroups[index] || "";
				pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
			}
			const value = captureGroups[index];
			if (isOptional && !value) memo[paramName] = void 0;
			else memo[paramName] = (value || "").replace(/%2F/g, "/");
			return memo;
		}, {}),
		pathname: matchedPathname,
		pathnameBase,
		pattern
	};
}
function compilePath(path, caseSensitive, end) {
	if (caseSensitive === void 0) caseSensitive = false;
	if (end === void 0) end = true;
	warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*") + "\" because the `*` character must ") + "always follow a `/` in the pattern. To get rid of this warning, " + ("please change the route path to \"" + path.replace(/\*$/, "/*") + "\"."));
	let params = [];
	let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
		params.push({
			paramName,
			isOptional: isOptional != null
		});
		return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
	});
	if (path.endsWith("*")) {
		params.push({ paramName: "*" });
		regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
	} else if (end) regexpSource += "\\/*$";
	else if (path !== "" && path !== "/") regexpSource += "(?:(?=\\/|$))";
	return [new RegExp(regexpSource, caseSensitive ? void 0 : "i"), params];
}
function decodePath(value) {
	try {
		return value.split("/").map((v) => decodeURIComponent(v).replace(/\//g, "%2F")).join("/");
	} catch (error) {
		warning(false, "The URL path \"" + value + "\" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent " + ("encoding (" + error + ")."));
		return value;
	}
}
/**
* @private
*/
function stripBasename(pathname, basename) {
	if (basename === "/") return pathname;
	if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) return null;
	let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
	let nextChar = pathname.charAt(startIndex);
	if (nextChar && nextChar !== "/") return null;
	return pathname.slice(startIndex) || "/";
}
var ABSOLUTE_URL_REGEX$1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX$1.test(url);
/**
* Returns a resolved path object relative to the given pathname.
*
* @see https://reactrouter.com/v6/utils/resolve-path
*/
function resolvePath(to, fromPathname) {
	if (fromPathname === void 0) fromPathname = "/";
	let { pathname: toPathname, search = "", hash = "" } = typeof to === "string" ? parsePath(to) : to;
	let pathname;
	if (toPathname) {
		if (isAbsoluteUrl(toPathname)) pathname = toPathname;
		else {
			if (toPathname.includes("//")) {
				let oldPathname = toPathname;
				toPathname = removeDoubleSlashes(toPathname);
				warning(false, "Pathnames cannot have embedded double slashes - normalizing " + (oldPathname + " -> " + toPathname));
			}
			if (toPathname.startsWith("/")) pathname = resolvePathname(toPathname.substring(1), "/");
			else pathname = resolvePathname(toPathname, fromPathname);
		}
	} else pathname = fromPathname;
	return {
		pathname,
		search: normalizeSearch(search),
		hash: normalizeHash(hash)
	};
}
function resolvePathname(relativePath, fromPathname) {
	let segments = fromPathname.replace(/\/+$/, "").split("/");
	relativePath.split("/").forEach((segment) => {
		if (segment === "..") {
			if (segments.length > 1) segments.pop();
		} else if (segment !== ".") segments.push(segment);
	});
	return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
	return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + "a string in <Link to=\"...\"> and the router will parse it for you.";
}
/**
* @private
*
* When processing relative navigation we want to ignore ancestor routes that
* do not contribute to the path, such that index/pathless layout routes don't
* interfere.
*
* For example, when moving a route element into an index route and/or a
* pathless layout route, relative link behavior contained within should stay
* the same.  Both of the following examples should link back to the root:
*
*   <Route path="/">
*     <Route path="accounts" element={<Link to=".."}>
*   </Route>
*
*   <Route path="/">
*     <Route path="accounts">
*       <Route element={<AccountsLayout />}>       // <-- Does not contribute
*         <Route index element={<Link to=".."} />  // <-- Does not contribute
*       </Route
*     </Route>
*   </Route>
*/
function getPathContributingMatches(matches) {
	return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function getResolveToMatches(matches, v7_relativeSplatPath) {
	let pathMatches = getPathContributingMatches(matches);
	if (v7_relativeSplatPath) return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
	return pathMatches.map((match) => match.pathnameBase);
}
/**
* @private
*/
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
	if (isPathRelative === void 0) isPathRelative = false;
	let to;
	if (typeof toArg === "string") to = parsePath(toArg);
	else {
		to = _extends$2({}, toArg);
		invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
		invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
		invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
	}
	let isEmptyPath = toArg === "" || to.pathname === "";
	let toPathname = isEmptyPath ? "/" : to.pathname;
	let from;
	if (toPathname == null) from = locationPathname;
	else {
		let routePathnameIndex = routePathnames.length - 1;
		if (!isPathRelative && toPathname.startsWith("..")) {
			let toSegments = toPathname.split("/");
			while (toSegments[0] === "..") {
				toSegments.shift();
				routePathnameIndex -= 1;
			}
			to.pathname = toSegments.join("/");
		}
		from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
	}
	let path = resolvePath(to, from);
	let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
	let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
	if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) path.pathname += "/";
	return path;
}
var removeDoubleSlashes = (path) => path.replace(/\/\/+/g, "/");
/**
* @private
*/
var joinPaths = (paths) => removeDoubleSlashes(paths.join("/"));
/**
* @private
*/
var normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
/**
* @private
*/
var normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
/**
* @private
*/
var normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
/**
* @private
* Utility class we use to hold auto-unwrapped 4xx/5xx Response bodies
*
* We don't export the class for public use since it's an implementation
* detail, but we export the interface above so folks can build their own
* abstractions around instances via isRouteErrorResponse()
*/
var ErrorResponseImpl = class {
	constructor(status, statusText, data, internal) {
		if (internal === void 0) internal = false;
		this.status = status;
		this.statusText = statusText || "";
		this.internal = internal;
		if (data instanceof Error) {
			this.data = data.toString();
			this.error = data;
		} else this.data = data;
	}
};
/**
* Check if the given error is an ErrorResponse generated from a 4xx/5xx
* Response thrown from an action/loader
*/
function isRouteErrorResponse(error) {
	return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
var validMutationMethodsArr = [
	"post",
	"put",
	"patch",
	"delete"
];
var validMutationMethods = new Set(validMutationMethodsArr);
var validRequestMethodsArr = ["get", ...validMutationMethodsArr];
var validRequestMethods = new Set(validRequestMethodsArr);
var redirectStatusCodes = /* @__PURE__ */ new Set([
	301,
	302,
	303,
	307,
	308
]);
var redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308]);
var IDLE_NAVIGATION = {
	state: "idle",
	location: void 0,
	formMethod: void 0,
	formAction: void 0,
	formEncType: void 0,
	formData: void 0,
	json: void 0,
	text: void 0
};
var IDLE_FETCHER = {
	state: "idle",
	data: void 0,
	formMethod: void 0,
	formAction: void 0,
	formEncType: void 0,
	formData: void 0,
	json: void 0,
	text: void 0
};
var IDLE_BLOCKER = {
	state: "unblocked",
	proceed: void 0,
	reset: void 0,
	location: void 0
};
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var defaultMapRouteProperties = (route) => ({ hasErrorBoundary: Boolean(route.hasErrorBoundary) });
var TRANSITIONS_STORAGE_KEY = "remix-router-transitions";
/**
* Create a router and listen to history POP navigations
*/
function createRouter(init) {
	const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : void 0;
	const isBrowser = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
	const isServer = !isBrowser;
	invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
	let mapRouteProperties;
	if (init.mapRouteProperties) mapRouteProperties = init.mapRouteProperties;
	else if (init.detectErrorBoundary) {
		let detectErrorBoundary = init.detectErrorBoundary;
		mapRouteProperties = (route) => ({ hasErrorBoundary: detectErrorBoundary(route) });
	} else mapRouteProperties = defaultMapRouteProperties;
	let manifest = {};
	let dataRoutes = convertRoutesToDataRoutes$1(init.routes, mapRouteProperties, void 0, manifest);
	let inFlightDataRoutes;
	let basename = init.basename || "/";
	let dataStrategyImpl = init.dataStrategy || defaultDataStrategy;
	let patchRoutesOnNavigationImpl = init.patchRoutesOnNavigation;
	let future = _extends$2({
		v7_fetcherPersist: false,
		v7_normalizeFormMethod: false,
		v7_partialHydration: false,
		v7_prependBasename: false,
		v7_relativeSplatPath: false,
		v7_skipActionErrorRevalidation: false
	}, init.future);
	let unlistenHistory = null;
	let subscribers = /* @__PURE__ */ new Set();
	let savedScrollPositions = null;
	let getScrollRestorationKey = null;
	let getScrollPosition = null;
	let initialScrollRestored = init.hydrationData != null;
	let initialMatches = matchRoutes(dataRoutes, init.history.location, basename);
	let initialMatchesIsFOW = false;
	let initialErrors = null;
	if (initialMatches == null && !patchRoutesOnNavigationImpl) {
		let error = getInternalRouterError(404, { pathname: init.history.location.pathname });
		let { matches, route } = getShortCircuitMatches(dataRoutes);
		initialMatches = matches;
		initialErrors = { [route.id]: error };
	}
	if (initialMatches && !init.hydrationData) {
		if (checkFogOfWar(initialMatches, dataRoutes, init.history.location.pathname).active) initialMatches = null;
	}
	let initialized;
	if (!initialMatches) {
		initialized = false;
		initialMatches = [];
		if (future.v7_partialHydration) {
			let fogOfWar = checkFogOfWar(null, dataRoutes, init.history.location.pathname);
			if (fogOfWar.active && fogOfWar.matches) {
				initialMatchesIsFOW = true;
				initialMatches = fogOfWar.matches;
			}
		}
	} else if (initialMatches.some((m) => m.route.lazy)) initialized = false;
	else if (!initialMatches.some((m) => m.route.loader)) initialized = true;
	else if (future.v7_partialHydration) {
		let loaderData = init.hydrationData ? init.hydrationData.loaderData : null;
		let errors = init.hydrationData ? init.hydrationData.errors : null;
		if (errors) {
			let idx = initialMatches.findIndex((m) => errors[m.route.id] !== void 0);
			initialized = initialMatches.slice(0, idx + 1).every((m) => !shouldLoadRouteOnHydration(m.route, loaderData, errors));
		} else initialized = initialMatches.every((m) => !shouldLoadRouteOnHydration(m.route, loaderData, errors));
	} else initialized = init.hydrationData != null;
	let router;
	let state = {
		historyAction: init.history.action,
		location: init.history.location,
		matches: initialMatches,
		initialized,
		navigation: IDLE_NAVIGATION,
		restoreScrollPosition: init.hydrationData != null ? false : null,
		preventScrollReset: false,
		revalidation: "idle",
		loaderData: init.hydrationData && init.hydrationData.loaderData || {},
		actionData: init.hydrationData && init.hydrationData.actionData || null,
		errors: init.hydrationData && init.hydrationData.errors || initialErrors,
		fetchers: /* @__PURE__ */ new Map(),
		blockers: /* @__PURE__ */ new Map()
	};
	let pendingAction = Action.Pop;
	let pendingPreventScrollReset = false;
	let pendingNavigationController;
	let pendingViewTransitionEnabled = false;
	let appliedViewTransitions = /* @__PURE__ */ new Map();
	let removePageHideEventListener = null;
	let isUninterruptedRevalidation = false;
	let isRevalidationRequired = false;
	let cancelledDeferredRoutes = [];
	let cancelledFetcherLoads = /* @__PURE__ */ new Set();
	let fetchControllers = /* @__PURE__ */ new Map();
	let incrementingLoadId = 0;
	let pendingNavigationLoadId = -1;
	let fetchReloadIds = /* @__PURE__ */ new Map();
	let fetchRedirectIds = /* @__PURE__ */ new Set();
	let fetchLoadMatches = /* @__PURE__ */ new Map();
	let activeFetchers = /* @__PURE__ */ new Map();
	let deletedFetchers = /* @__PURE__ */ new Set();
	let activeDeferreds = /* @__PURE__ */ new Map();
	let blockerFunctions = /* @__PURE__ */ new Map();
	let unblockBlockerHistoryUpdate = void 0;
	function initialize() {
		unlistenHistory = init.history.listen((_ref) => {
			let { action: historyAction, location, delta } = _ref;
			if (unblockBlockerHistoryUpdate) {
				unblockBlockerHistoryUpdate();
				unblockBlockerHistoryUpdate = void 0;
				return;
			}
			warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
			let blockerKey = shouldBlockNavigation({
				currentLocation: state.location,
				nextLocation: location,
				historyAction
			});
			if (blockerKey && delta != null) {
				let nextHistoryUpdatePromise = new Promise((resolve) => {
					unblockBlockerHistoryUpdate = resolve;
				});
				init.history.go(delta * -1);
				updateBlocker(blockerKey, {
					state: "blocked",
					location,
					proceed() {
						updateBlocker(blockerKey, {
							state: "proceeding",
							proceed: void 0,
							reset: void 0,
							location
						});
						nextHistoryUpdatePromise.then(() => init.history.go(delta));
					},
					reset() {
						let blockers = new Map(state.blockers);
						blockers.set(blockerKey, IDLE_BLOCKER);
						updateState({ blockers });
					}
				});
				return;
			}
			return startNavigation(historyAction, location);
		});
		if (isBrowser) {
			restoreAppliedTransitions(routerWindow, appliedViewTransitions);
			let _saveAppliedTransitions = () => persistAppliedTransitions(routerWindow, appliedViewTransitions);
			routerWindow.addEventListener("pagehide", _saveAppliedTransitions);
			removePageHideEventListener = () => routerWindow.removeEventListener("pagehide", _saveAppliedTransitions);
		}
		if (!state.initialized) startNavigation(Action.Pop, state.location, { initialHydration: true });
		return router;
	}
	function dispose() {
		if (unlistenHistory) unlistenHistory();
		if (removePageHideEventListener) removePageHideEventListener();
		subscribers.clear();
		pendingNavigationController && pendingNavigationController.abort();
		state.fetchers.forEach((_, key) => deleteFetcher(key));
		state.blockers.forEach((_, key) => deleteBlocker(key));
	}
	function subscribe(fn) {
		subscribers.add(fn);
		return () => subscribers.delete(fn);
	}
	function updateState(newState, opts) {
		if (opts === void 0) opts = {};
		state = _extends$2({}, state, newState);
		let completedFetchers = [];
		let deletedFetchersKeys = [];
		if (future.v7_fetcherPersist) state.fetchers.forEach((fetcher, key) => {
			if (fetcher.state === "idle") {
				if (deletedFetchers.has(key)) deletedFetchersKeys.push(key);
				else completedFetchers.push(key);
			}
		});
		deletedFetchers.forEach((key) => {
			if (!state.fetchers.has(key) && !fetchControllers.has(key)) deletedFetchersKeys.push(key);
		});
		[...subscribers].forEach((subscriber) => subscriber(state, {
			deletedFetchers: deletedFetchersKeys,
			viewTransitionOpts: opts.viewTransitionOpts,
			flushSync: opts.flushSync === true
		}));
		if (future.v7_fetcherPersist) {
			completedFetchers.forEach((key) => state.fetchers.delete(key));
			deletedFetchersKeys.forEach((key) => deleteFetcher(key));
		} else deletedFetchersKeys.forEach((key) => deletedFetchers.delete(key));
	}
	function completeNavigation(location, newState, _temp) {
		var _location$state, _location$state2;
		let { flushSync } = _temp === void 0 ? {} : _temp;
		let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location.state) == null ? void 0 : _location$state._isRedirect) !== true;
		let actionData;
		if (newState.actionData) {
			if (Object.keys(newState.actionData).length > 0) actionData = newState.actionData;
			else actionData = null;
		} else if (isActionReload) actionData = state.actionData;
		else actionData = null;
		let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData;
		let blockers = state.blockers;
		if (blockers.size > 0) {
			blockers = new Map(blockers);
			blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER));
		}
		let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location.state) == null ? void 0 : _location$state2._isRedirect) !== true;
		if (inFlightDataRoutes) {
			dataRoutes = inFlightDataRoutes;
			inFlightDataRoutes = void 0;
		}
		if (isUninterruptedRevalidation);
		else if (pendingAction === Action.Pop);
		else if (pendingAction === Action.Push) init.history.push(location, location.state);
		else if (pendingAction === Action.Replace) init.history.replace(location, location.state);
		let viewTransitionOpts;
		if (pendingAction === Action.Pop) {
			let priorPaths = appliedViewTransitions.get(state.location.pathname);
			if (priorPaths && priorPaths.has(location.pathname)) viewTransitionOpts = {
				currentLocation: state.location,
				nextLocation: location
			};
			else if (appliedViewTransitions.has(location.pathname)) viewTransitionOpts = {
				currentLocation: location,
				nextLocation: state.location
			};
		} else if (pendingViewTransitionEnabled) {
			let toPaths = appliedViewTransitions.get(state.location.pathname);
			if (toPaths) toPaths.add(location.pathname);
			else {
				toPaths = /* @__PURE__ */ new Set([location.pathname]);
				appliedViewTransitions.set(state.location.pathname, toPaths);
			}
			viewTransitionOpts = {
				currentLocation: state.location,
				nextLocation: location
			};
		}
		updateState(_extends$2({}, newState, {
			actionData,
			loaderData,
			historyAction: pendingAction,
			location,
			initialized: true,
			navigation: IDLE_NAVIGATION,
			revalidation: "idle",
			restoreScrollPosition: getSavedScrollPosition(location, newState.matches || state.matches),
			preventScrollReset,
			blockers
		}), {
			viewTransitionOpts,
			flushSync: flushSync === true
		});
		pendingAction = Action.Pop;
		pendingPreventScrollReset = false;
		pendingViewTransitionEnabled = false;
		isUninterruptedRevalidation = false;
		isRevalidationRequired = false;
		cancelledDeferredRoutes = [];
	}
	async function navigate(to, opts) {
		if (typeof to === "number") {
			init.history.go(to);
			return;
		}
		let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, to, future.v7_relativeSplatPath, opts == null ? void 0 : opts.fromRouteId, opts == null ? void 0 : opts.relative);
		let { path, submission, error } = normalizeNavigateOptions(future.v7_normalizeFormMethod, false, normalizedPath, opts);
		let currentLocation = state.location;
		let nextLocation = createLocation(state.location, path, opts && opts.state);
		nextLocation = _extends$2({}, nextLocation, init.history.encodeLocation(nextLocation));
		let userReplace = opts && opts.replace != null ? opts.replace : void 0;
		let historyAction = Action.Push;
		if (userReplace === true) historyAction = Action.Replace;
		else if (userReplace === false);
		else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) historyAction = Action.Replace;
		let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : void 0;
		let flushSync = (opts && opts.flushSync) === true;
		let blockerKey = shouldBlockNavigation({
			currentLocation,
			nextLocation,
			historyAction
		});
		if (blockerKey) {
			updateBlocker(blockerKey, {
				state: "blocked",
				location: nextLocation,
				proceed() {
					updateBlocker(blockerKey, {
						state: "proceeding",
						proceed: void 0,
						reset: void 0,
						location: nextLocation
					});
					navigate(to, opts);
				},
				reset() {
					let blockers = new Map(state.blockers);
					blockers.set(blockerKey, IDLE_BLOCKER);
					updateState({ blockers });
				}
			});
			return;
		}
		return await startNavigation(historyAction, nextLocation, {
			submission,
			pendingError: error,
			preventScrollReset,
			replace: opts && opts.replace,
			enableViewTransition: opts && opts.viewTransition,
			flushSync
		});
	}
	function revalidate() {
		interruptActiveLoads();
		updateState({ revalidation: "loading" });
		if (state.navigation.state === "submitting") return;
		if (state.navigation.state === "idle") {
			startNavigation(state.historyAction, state.location, { startUninterruptedRevalidation: true });
			return;
		}
		startNavigation(pendingAction || state.historyAction, state.navigation.location, {
			overrideNavigation: state.navigation,
			enableViewTransition: pendingViewTransitionEnabled === true
		});
	}
	async function startNavigation(historyAction, location, opts) {
		pendingNavigationController && pendingNavigationController.abort();
		pendingNavigationController = null;
		pendingAction = historyAction;
		isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
		saveScrollPosition(state.location, state.matches);
		pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
		pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true;
		let routesToUse = inFlightDataRoutes || dataRoutes;
		let loadingNavigation = opts && opts.overrideNavigation;
		let matches = opts != null && opts.initialHydration && state.matches && state.matches.length > 0 && !initialMatchesIsFOW ? state.matches : matchRoutes(routesToUse, location, basename);
		let flushSync = (opts && opts.flushSync) === true;
		if (matches && state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
			completeNavigation(location, { matches }, { flushSync });
			return;
		}
		let fogOfWar = checkFogOfWar(matches, routesToUse, location.pathname);
		if (fogOfWar.active && fogOfWar.matches) matches = fogOfWar.matches;
		if (!matches) {
			let { error, notFoundMatches, route } = handleNavigational404(location.pathname);
			completeNavigation(location, {
				matches: notFoundMatches,
				loaderData: {},
				errors: { [route.id]: error }
			}, { flushSync });
			return;
		}
		pendingNavigationController = new AbortController();
		let request = createClientSideRequest(init.history, location, pendingNavigationController.signal, opts && opts.submission);
		let pendingActionResult;
		if (opts && opts.pendingError) pendingActionResult = [findNearestBoundary(matches).route.id, {
			type: ResultType.error,
			error: opts.pendingError
		}];
		else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
			let actionResult = await handleAction(request, location, opts.submission, matches, fogOfWar.active, {
				replace: opts.replace,
				flushSync
			});
			if (actionResult.shortCircuited) return;
			if (actionResult.pendingActionResult) {
				let [routeId, result] = actionResult.pendingActionResult;
				if (isErrorResult(result) && isRouteErrorResponse(result.error) && result.error.status === 404) {
					pendingNavigationController = null;
					completeNavigation(location, {
						matches: actionResult.matches,
						loaderData: {},
						errors: { [routeId]: result.error }
					});
					return;
				}
			}
			matches = actionResult.matches || matches;
			pendingActionResult = actionResult.pendingActionResult;
			loadingNavigation = getLoadingNavigation(location, opts.submission);
			flushSync = false;
			fogOfWar.active = false;
			request = createClientSideRequest(init.history, request.url, request.signal);
		}
		let { shortCircuited, matches: updatedMatches, loaderData, errors } = await handleLoaders(request, location, matches, fogOfWar.active, loadingNavigation, opts && opts.submission, opts && opts.fetcherSubmission, opts && opts.replace, opts && opts.initialHydration === true, flushSync, pendingActionResult);
		if (shortCircuited) return;
		pendingNavigationController = null;
		completeNavigation(location, _extends$2({ matches: updatedMatches || matches }, getActionDataForCommit(pendingActionResult), {
			loaderData,
			errors
		}));
	}
	async function handleAction(request, location, submission, matches, isFogOfWar, opts) {
		if (opts === void 0) opts = {};
		interruptActiveLoads();
		updateState({ navigation: getSubmittingNavigation(location, submission) }, { flushSync: opts.flushSync === true });
		if (isFogOfWar) {
			let discoverResult = await discoverRoutes(matches, location.pathname, request.signal);
			if (discoverResult.type === "aborted") return { shortCircuited: true };
			else if (discoverResult.type === "error") {
				let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
				return {
					matches: discoverResult.partialMatches,
					pendingActionResult: [boundaryId, {
						type: ResultType.error,
						error: discoverResult.error
					}]
				};
			} else if (!discoverResult.matches) {
				let { notFoundMatches, error, route } = handleNavigational404(location.pathname);
				return {
					matches: notFoundMatches,
					pendingActionResult: [route.id, {
						type: ResultType.error,
						error
					}]
				};
			} else matches = discoverResult.matches;
		}
		let result;
		let actionMatch = getTargetMatch(matches, location);
		if (!actionMatch.route.action && !actionMatch.route.lazy) result = {
			type: ResultType.error,
			error: getInternalRouterError(405, {
				method: request.method,
				pathname: location.pathname,
				routeId: actionMatch.route.id
			})
		};
		else {
			result = (await callDataStrategy("action", state, request, [actionMatch], matches, null))[actionMatch.route.id];
			if (request.signal.aborted) return { shortCircuited: true };
		}
		if (isRedirectResult(result)) {
			let replace;
			if (opts && opts.replace != null) replace = opts.replace;
			else replace = normalizeRedirectLocation(result.response.headers.get("Location"), new URL(request.url), basename, init.history) === state.location.pathname + state.location.search;
			await startRedirectNavigation(request, result, true, {
				submission,
				replace
			});
			return { shortCircuited: true };
		}
		if (isDeferredResult(result)) throw getInternalRouterError(400, { type: "defer-action" });
		if (isErrorResult(result)) {
			let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
			if ((opts && opts.replace) !== true) pendingAction = Action.Push;
			return {
				matches,
				pendingActionResult: [boundaryMatch.route.id, result]
			};
		}
		return {
			matches,
			pendingActionResult: [actionMatch.route.id, result]
		};
	}
	async function handleLoaders(request, location, matches, isFogOfWar, overrideNavigation, submission, fetcherSubmission, replace, initialHydration, flushSync, pendingActionResult) {
		let loadingNavigation = overrideNavigation || getLoadingNavigation(location, submission);
		let activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation);
		let shouldUpdateNavigationState = !isUninterruptedRevalidation && (!future.v7_partialHydration || !initialHydration);
		if (isFogOfWar) {
			if (shouldUpdateNavigationState) {
				let actionData = getUpdatedActionData(pendingActionResult);
				updateState(_extends$2({ navigation: loadingNavigation }, actionData !== void 0 ? { actionData } : {}), { flushSync });
			}
			let discoverResult = await discoverRoutes(matches, location.pathname, request.signal);
			if (discoverResult.type === "aborted") return { shortCircuited: true };
			else if (discoverResult.type === "error") {
				let boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id;
				return {
					matches: discoverResult.partialMatches,
					loaderData: {},
					errors: { [boundaryId]: discoverResult.error }
				};
			} else if (!discoverResult.matches) {
				let { error, notFoundMatches, route } = handleNavigational404(location.pathname);
				return {
					matches: notFoundMatches,
					loaderData: {},
					errors: { [route.id]: error }
				};
			} else matches = discoverResult.matches;
		}
		let routesToUse = inFlightDataRoutes || dataRoutes;
		let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, activeSubmission, location, future.v7_partialHydration && initialHydration === true, future.v7_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult);
		cancelActiveDeferreds((routeId) => !(matches && matches.some((m) => m.route.id === routeId)) || matchesToLoad && matchesToLoad.some((m) => m.route.id === routeId));
		pendingNavigationLoadId = ++incrementingLoadId;
		if (matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
			let updatedFetchers = markFetchRedirectsDone();
			completeNavigation(location, _extends$2({
				matches,
				loaderData: {},
				errors: pendingActionResult && isErrorResult(pendingActionResult[1]) ? { [pendingActionResult[0]]: pendingActionResult[1].error } : null
			}, getActionDataForCommit(pendingActionResult), updatedFetchers ? { fetchers: new Map(state.fetchers) } : {}), { flushSync });
			return { shortCircuited: true };
		}
		if (shouldUpdateNavigationState) {
			let updates = {};
			if (!isFogOfWar) {
				updates.navigation = loadingNavigation;
				let actionData = getUpdatedActionData(pendingActionResult);
				if (actionData !== void 0) updates.actionData = actionData;
			}
			if (revalidatingFetchers.length > 0) updates.fetchers = getUpdatedRevalidatingFetchers(revalidatingFetchers);
			updateState(updates, { flushSync });
		}
		revalidatingFetchers.forEach((rf) => {
			abortFetcher(rf.key);
			if (rf.controller) fetchControllers.set(rf.key, rf.controller);
		});
		let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((f) => abortFetcher(f.key));
		if (pendingNavigationController) pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations);
		let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(state, matches, matchesToLoad, revalidatingFetchers, request);
		if (request.signal.aborted) return { shortCircuited: true };
		if (pendingNavigationController) pendingNavigationController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
		revalidatingFetchers.forEach((rf) => fetchControllers.delete(rf.key));
		let redirect = findRedirect(loaderResults);
		if (redirect) {
			await startRedirectNavigation(request, redirect.result, true, { replace });
			return { shortCircuited: true };
		}
		redirect = findRedirect(fetcherResults);
		if (redirect) {
			fetchRedirectIds.add(redirect.key);
			await startRedirectNavigation(request, redirect.result, true, { replace });
			return { shortCircuited: true };
		}
		let { loaderData, errors } = processLoaderData(state, matches, loaderResults, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds);
		activeDeferreds.forEach((deferredData, routeId) => {
			deferredData.subscribe((aborted) => {
				if (aborted || deferredData.done) activeDeferreds.delete(routeId);
			});
		});
		if (future.v7_partialHydration && initialHydration && state.errors) errors = _extends$2({}, state.errors, errors);
		let updatedFetchers = markFetchRedirectsDone();
		let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
		let shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
		return _extends$2({
			matches,
			loaderData,
			errors
		}, shouldUpdateFetchers ? { fetchers: new Map(state.fetchers) } : {});
	}
	function getUpdatedActionData(pendingActionResult) {
		if (pendingActionResult && !isErrorResult(pendingActionResult[1])) return { [pendingActionResult[0]]: pendingActionResult[1].data };
		else if (state.actionData) {
			if (Object.keys(state.actionData).length === 0) return null;
			else return state.actionData;
		}
	}
	function getUpdatedRevalidatingFetchers(revalidatingFetchers) {
		revalidatingFetchers.forEach((rf) => {
			let fetcher = state.fetchers.get(rf.key);
			let revalidatingFetcher = getLoadingFetcher(void 0, fetcher ? fetcher.data : void 0);
			state.fetchers.set(rf.key, revalidatingFetcher);
		});
		return new Map(state.fetchers);
	}
	function fetch(key, routeId, href, opts) {
		if (isServer) throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
		abortFetcher(key);
		let flushSync = (opts && opts.flushSync) === true;
		let routesToUse = inFlightDataRoutes || dataRoutes;
		let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, href, future.v7_relativeSplatPath, routeId, opts == null ? void 0 : opts.relative);
		let matches = matchRoutes(routesToUse, normalizedPath, basename);
		let fogOfWar = checkFogOfWar(matches, routesToUse, normalizedPath);
		if (fogOfWar.active && fogOfWar.matches) matches = fogOfWar.matches;
		if (!matches) {
			setFetcherError(key, routeId, getInternalRouterError(404, { pathname: normalizedPath }), { flushSync });
			return;
		}
		let { path, submission, error } = normalizeNavigateOptions(future.v7_normalizeFormMethod, true, normalizedPath, opts);
		if (error) {
			setFetcherError(key, routeId, error, { flushSync });
			return;
		}
		let match = getTargetMatch(matches, path);
		let preventScrollReset = (opts && opts.preventScrollReset) === true;
		if (submission && isMutationMethod(submission.formMethod)) {
			handleFetcherAction(key, routeId, path, match, matches, fogOfWar.active, flushSync, preventScrollReset, submission);
			return;
		}
		fetchLoadMatches.set(key, {
			routeId,
			path
		});
		handleFetcherLoader(key, routeId, path, match, matches, fogOfWar.active, flushSync, preventScrollReset, submission);
	}
	async function handleFetcherAction(key, routeId, path, match, requestMatches, isFogOfWar, flushSync, preventScrollReset, submission) {
		interruptActiveLoads();
		fetchLoadMatches.delete(key);
		function detectAndHandle405Error(m) {
			if (!m.route.action && !m.route.lazy) {
				setFetcherError(key, routeId, getInternalRouterError(405, {
					method: submission.formMethod,
					pathname: path,
					routeId
				}), { flushSync });
				return true;
			}
			return false;
		}
		if (!isFogOfWar && detectAndHandle405Error(match)) return;
		updateFetcherState(key, getSubmittingFetcher(submission, state.fetchers.get(key)), { flushSync });
		let abortController = new AbortController();
		let fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
		if (isFogOfWar) {
			let discoverResult = await discoverRoutes(requestMatches, new URL(fetchRequest.url).pathname, fetchRequest.signal, key);
			if (discoverResult.type === "aborted") return;
			else if (discoverResult.type === "error") {
				setFetcherError(key, routeId, discoverResult.error, { flushSync });
				return;
			} else if (!discoverResult.matches) {
				setFetcherError(key, routeId, getInternalRouterError(404, { pathname: path }), { flushSync });
				return;
			} else {
				requestMatches = discoverResult.matches;
				match = getTargetMatch(requestMatches, path);
				if (detectAndHandle405Error(match)) return;
			}
		}
		fetchControllers.set(key, abortController);
		let originatingLoadId = incrementingLoadId;
		let actionResult = (await callDataStrategy("action", state, fetchRequest, [match], requestMatches, key))[match.route.id];
		if (fetchRequest.signal.aborted) {
			if (fetchControllers.get(key) === abortController) fetchControllers.delete(key);
			return;
		}
		if (future.v7_fetcherPersist && deletedFetchers.has(key)) {
			if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
				updateFetcherState(key, getDoneFetcher(void 0));
				return;
			}
		} else {
			if (isRedirectResult(actionResult)) {
				fetchControllers.delete(key);
				if (pendingNavigationLoadId > originatingLoadId) {
					updateFetcherState(key, getDoneFetcher(void 0));
					return;
				} else {
					fetchRedirectIds.add(key);
					updateFetcherState(key, getLoadingFetcher(submission));
					return startRedirectNavigation(fetchRequest, actionResult, false, {
						fetcherSubmission: submission,
						preventScrollReset
					});
				}
			}
			if (isErrorResult(actionResult)) {
				setFetcherError(key, routeId, actionResult.error);
				return;
			}
		}
		if (isDeferredResult(actionResult)) throw getInternalRouterError(400, { type: "defer-action" });
		let nextLocation = state.navigation.location || state.location;
		let revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal);
		let routesToUse = inFlightDataRoutes || dataRoutes;
		let matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
		invariant(matches, "Didn't find any matches after fetcher action");
		let loadId = ++incrementingLoadId;
		fetchReloadIds.set(key, loadId);
		let loadFetcher = getLoadingFetcher(submission, actionResult.data);
		state.fetchers.set(key, loadFetcher);
		let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, submission, nextLocation, false, future.v7_skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, [match.route.id, actionResult]);
		revalidatingFetchers.filter((rf) => rf.key !== key).forEach((rf) => {
			let staleKey = rf.key;
			let existingFetcher = state.fetchers.get(staleKey);
			let revalidatingFetcher = getLoadingFetcher(void 0, existingFetcher ? existingFetcher.data : void 0);
			state.fetchers.set(staleKey, revalidatingFetcher);
			abortFetcher(staleKey);
			if (rf.controller) fetchControllers.set(staleKey, rf.controller);
		});
		updateState({ fetchers: new Map(state.fetchers) });
		let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((rf) => abortFetcher(rf.key));
		abortController.signal.addEventListener("abort", abortPendingFetchRevalidations);
		let { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(state, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
		if (abortController.signal.aborted) return;
		abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
		fetchReloadIds.delete(key);
		fetchControllers.delete(key);
		revalidatingFetchers.forEach((r) => fetchControllers.delete(r.key));
		let redirect = findRedirect(loaderResults);
		if (redirect) return startRedirectNavigation(revalidationRequest, redirect.result, false, { preventScrollReset });
		redirect = findRedirect(fetcherResults);
		if (redirect) {
			fetchRedirectIds.add(redirect.key);
			return startRedirectNavigation(revalidationRequest, redirect.result, false, { preventScrollReset });
		}
		let { loaderData, errors } = processLoaderData(state, matches, loaderResults, void 0, revalidatingFetchers, fetcherResults, activeDeferreds);
		if (state.fetchers.has(key)) {
			let doneFetcher = getDoneFetcher(actionResult.data);
			state.fetchers.set(key, doneFetcher);
		}
		abortStaleFetchLoads(loadId);
		if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
			invariant(pendingAction, "Expected pending action");
			pendingNavigationController && pendingNavigationController.abort();
			completeNavigation(state.navigation.location, {
				matches,
				loaderData,
				errors,
				fetchers: new Map(state.fetchers)
			});
		} else {
			updateState({
				errors,
				loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors),
				fetchers: new Map(state.fetchers)
			});
			isRevalidationRequired = false;
		}
	}
	async function handleFetcherLoader(key, routeId, path, match, matches, isFogOfWar, flushSync, preventScrollReset, submission) {
		let existingFetcher = state.fetchers.get(key);
		updateFetcherState(key, getLoadingFetcher(submission, existingFetcher ? existingFetcher.data : void 0), { flushSync });
		let abortController = new AbortController();
		let fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
		if (isFogOfWar) {
			let discoverResult = await discoverRoutes(matches, new URL(fetchRequest.url).pathname, fetchRequest.signal, key);
			if (discoverResult.type === "aborted") return;
			else if (discoverResult.type === "error") {
				setFetcherError(key, routeId, discoverResult.error, { flushSync });
				return;
			} else if (!discoverResult.matches) {
				setFetcherError(key, routeId, getInternalRouterError(404, { pathname: path }), { flushSync });
				return;
			} else {
				matches = discoverResult.matches;
				match = getTargetMatch(matches, path);
			}
		}
		fetchControllers.set(key, abortController);
		let originatingLoadId = incrementingLoadId;
		let result = (await callDataStrategy("loader", state, fetchRequest, [match], matches, key))[match.route.id];
		if (isDeferredResult(result)) result = await resolveDeferredData(result, fetchRequest.signal, true) || result;
		if (fetchControllers.get(key) === abortController) fetchControllers.delete(key);
		if (fetchRequest.signal.aborted) return;
		if (deletedFetchers.has(key)) {
			updateFetcherState(key, getDoneFetcher(void 0));
			return;
		}
		if (isRedirectResult(result)) {
			if (pendingNavigationLoadId > originatingLoadId) {
				updateFetcherState(key, getDoneFetcher(void 0));
				return;
			} else {
				fetchRedirectIds.add(key);
				await startRedirectNavigation(fetchRequest, result, false, { preventScrollReset });
				return;
			}
		}
		if (isErrorResult(result)) {
			setFetcherError(key, routeId, result.error);
			return;
		}
		invariant(!isDeferredResult(result), "Unhandled fetcher deferred data");
		updateFetcherState(key, getDoneFetcher(result.data));
	}
	/**
	* Utility function to handle redirects returned from an action or loader.
	* Normally, a redirect "replaces" the navigation that triggered it.  So, for
	* example:
	*
	*  - user is on /a
	*  - user clicks a link to /b
	*  - loader for /b redirects to /c
	*
	* In a non-JS app the browser would track the in-flight navigation to /b and
	* then replace it with /c when it encountered the redirect response.  In
	* the end it would only ever update the URL bar with /c.
	*
	* In client-side routing using pushState/replaceState, we aim to emulate
	* this behavior and we also do not update history until the end of the
	* navigation (including processed redirects).  This means that we never
	* actually touch history until we've processed redirects, so we just use
	* the history action from the original navigation (PUSH or REPLACE).
	*/
	async function startRedirectNavigation(request, redirect, isNavigation, _temp2) {
		let { submission, fetcherSubmission, preventScrollReset, replace } = _temp2 === void 0 ? {} : _temp2;
		if (redirect.response.headers.has("X-Remix-Revalidate")) isRevalidationRequired = true;
		let location = redirect.response.headers.get("Location");
		invariant(location, "Expected a Location header on the redirect Response");
		location = normalizeRedirectLocation(location, new URL(request.url), basename, init.history);
		let redirectLocation = createLocation(state.location, location, { _isRedirect: true });
		if (isBrowser) {
			let isDocumentReload = false;
			if (redirect.response.headers.has("X-Remix-Reload-Document")) isDocumentReload = true;
			else if (ABSOLUTE_URL_REGEX.test(location)) {
				const url = init.history.createURL(location);
				isDocumentReload = url.origin !== routerWindow.location.origin || stripBasename(url.pathname, basename) == null;
			}
			if (isDocumentReload) {
				if (replace) routerWindow.location.replace(location);
				else routerWindow.location.assign(location);
				return;
			}
		}
		pendingNavigationController = null;
		let redirectHistoryAction = replace === true || redirect.response.headers.has("X-Remix-Replace") ? Action.Replace : Action.Push;
		let { formMethod, formAction, formEncType } = state.navigation;
		if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) submission = getSubmissionFromNavigation(state.navigation);
		let activeSubmission = submission || fetcherSubmission;
		if (redirectPreserveMethodStatusCodes.has(redirect.response.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod)) await startNavigation(redirectHistoryAction, redirectLocation, {
			submission: _extends$2({}, activeSubmission, { formAction: location }),
			preventScrollReset: preventScrollReset || pendingPreventScrollReset,
			enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
		});
		else await startNavigation(redirectHistoryAction, redirectLocation, {
			overrideNavigation: getLoadingNavigation(redirectLocation, submission),
			fetcherSubmission,
			preventScrollReset: preventScrollReset || pendingPreventScrollReset,
			enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0
		});
	}
	async function callDataStrategy(type, state, request, matchesToLoad, matches, fetcherKey) {
		let results;
		let dataResults = {};
		try {
			results = await callDataStrategyImpl(dataStrategyImpl, type, state, request, matchesToLoad, matches, fetcherKey, manifest, mapRouteProperties);
		} catch (e) {
			matchesToLoad.forEach((m) => {
				dataResults[m.route.id] = {
					type: ResultType.error,
					error: e
				};
			});
			return dataResults;
		}
		for (let [routeId, result] of Object.entries(results)) if (isRedirectDataStrategyResultResult(result)) {
			let response = result.result;
			dataResults[routeId] = {
				type: ResultType.redirect,
				response: normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename, future.v7_relativeSplatPath)
			};
		} else dataResults[routeId] = await convertDataStrategyResultToDataResult(result);
		return dataResults;
	}
	async function callLoadersAndMaybeResolveData(state, matches, matchesToLoad, fetchersToLoad, request) {
		let currentMatches = state.matches;
		let loaderResultsPromise = callDataStrategy("loader", state, request, matchesToLoad, matches, null);
		let fetcherResultsPromise = Promise.all(fetchersToLoad.map(async (f) => {
			if (f.matches && f.match && f.controller) {
				let result = (await callDataStrategy("loader", state, createClientSideRequest(init.history, f.path, f.controller.signal), [f.match], f.matches, f.key))[f.match.route.id];
				return { [f.key]: result };
			} else return Promise.resolve({ [f.key]: {
				type: ResultType.error,
				error: getInternalRouterError(404, { pathname: f.path })
			} });
		}));
		let loaderResults = await loaderResultsPromise;
		let fetcherResults = (await fetcherResultsPromise).reduce((acc, r) => Object.assign(acc, r), {});
		await Promise.all([resolveNavigationDeferredResults(matches, loaderResults, request.signal, currentMatches, state.loaderData), resolveFetcherDeferredResults(matches, fetcherResults, fetchersToLoad)]);
		return {
			loaderResults,
			fetcherResults
		};
	}
	function interruptActiveLoads() {
		isRevalidationRequired = true;
		cancelledDeferredRoutes.push(...cancelActiveDeferreds());
		fetchLoadMatches.forEach((_, key) => {
			if (fetchControllers.has(key)) cancelledFetcherLoads.add(key);
			abortFetcher(key);
		});
	}
	function updateFetcherState(key, fetcher, opts) {
		if (opts === void 0) opts = {};
		state.fetchers.set(key, fetcher);
		updateState({ fetchers: new Map(state.fetchers) }, { flushSync: (opts && opts.flushSync) === true });
	}
	function setFetcherError(key, routeId, error, opts) {
		if (opts === void 0) opts = {};
		let boundaryMatch = findNearestBoundary(state.matches, routeId);
		deleteFetcher(key);
		updateState({
			errors: { [boundaryMatch.route.id]: error },
			fetchers: new Map(state.fetchers)
		}, { flushSync: (opts && opts.flushSync) === true });
	}
	function getFetcher(key) {
		activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1);
		if (deletedFetchers.has(key)) deletedFetchers.delete(key);
		return state.fetchers.get(key) || IDLE_FETCHER;
	}
	function deleteFetcher(key) {
		let fetcher = state.fetchers.get(key);
		if (fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))) abortFetcher(key);
		fetchLoadMatches.delete(key);
		fetchReloadIds.delete(key);
		fetchRedirectIds.delete(key);
		if (future.v7_fetcherPersist) deletedFetchers.delete(key);
		cancelledFetcherLoads.delete(key);
		state.fetchers.delete(key);
	}
	function deleteFetcherAndUpdateState(key) {
		let count = (activeFetchers.get(key) || 0) - 1;
		if (count <= 0) {
			activeFetchers.delete(key);
			deletedFetchers.add(key);
			if (!future.v7_fetcherPersist) deleteFetcher(key);
		} else activeFetchers.set(key, count);
		updateState({ fetchers: new Map(state.fetchers) });
	}
	function abortFetcher(key) {
		let controller = fetchControllers.get(key);
		if (controller) {
			controller.abort();
			fetchControllers.delete(key);
		}
	}
	function markFetchersDone(keys) {
		for (let key of keys) {
			let doneFetcher = getDoneFetcher(getFetcher(key).data);
			state.fetchers.set(key, doneFetcher);
		}
	}
	function markFetchRedirectsDone() {
		let doneKeys = [];
		let updatedFetchers = false;
		for (let key of fetchRedirectIds) {
			let fetcher = state.fetchers.get(key);
			invariant(fetcher, "Expected fetcher: " + key);
			if (fetcher.state === "loading") {
				fetchRedirectIds.delete(key);
				doneKeys.push(key);
				updatedFetchers = true;
			}
		}
		markFetchersDone(doneKeys);
		return updatedFetchers;
	}
	function abortStaleFetchLoads(landedId) {
		let yeetedKeys = [];
		for (let [key, id] of fetchReloadIds) if (id < landedId) {
			let fetcher = state.fetchers.get(key);
			invariant(fetcher, "Expected fetcher: " + key);
			if (fetcher.state === "loading") {
				abortFetcher(key);
				fetchReloadIds.delete(key);
				yeetedKeys.push(key);
			}
		}
		markFetchersDone(yeetedKeys);
		return yeetedKeys.length > 0;
	}
	function getBlocker(key, fn) {
		let blocker = state.blockers.get(key) || IDLE_BLOCKER;
		if (blockerFunctions.get(key) !== fn) blockerFunctions.set(key, fn);
		return blocker;
	}
	function deleteBlocker(key) {
		state.blockers.delete(key);
		blockerFunctions.delete(key);
	}
	function updateBlocker(key, newBlocker) {
		let blocker = state.blockers.get(key) || IDLE_BLOCKER;
		invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
		let blockers = new Map(state.blockers);
		blockers.set(key, newBlocker);
		updateState({ blockers });
	}
	function shouldBlockNavigation(_ref2) {
		let { currentLocation, nextLocation, historyAction } = _ref2;
		if (blockerFunctions.size === 0) return;
		if (blockerFunctions.size > 1) warning(false, "A router only supports one blocker at a time");
		let entries = Array.from(blockerFunctions.entries());
		let [blockerKey, blockerFunction] = entries[entries.length - 1];
		let blocker = state.blockers.get(blockerKey);
		if (blocker && blocker.state === "proceeding") return;
		if (blockerFunction({
			currentLocation,
			nextLocation,
			historyAction
		})) return blockerKey;
	}
	function handleNavigational404(pathname) {
		let error = getInternalRouterError(404, { pathname });
		let { matches, route } = getShortCircuitMatches(inFlightDataRoutes || dataRoutes);
		cancelActiveDeferreds();
		return {
			notFoundMatches: matches,
			route,
			error
		};
	}
	function cancelActiveDeferreds(predicate) {
		let cancelledRouteIds = [];
		activeDeferreds.forEach((dfd, routeId) => {
			if (!predicate || predicate(routeId)) {
				dfd.cancel();
				cancelledRouteIds.push(routeId);
				activeDeferreds.delete(routeId);
			}
		});
		return cancelledRouteIds;
	}
	function enableScrollRestoration(positions, getPosition, getKey) {
		savedScrollPositions = positions;
		getScrollPosition = getPosition;
		getScrollRestorationKey = getKey || null;
		if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
			initialScrollRestored = true;
			let y = getSavedScrollPosition(state.location, state.matches);
			if (y != null) updateState({ restoreScrollPosition: y });
		}
		return () => {
			savedScrollPositions = null;
			getScrollPosition = null;
			getScrollRestorationKey = null;
		};
	}
	function getScrollKey(location, matches) {
		if (getScrollRestorationKey) return getScrollRestorationKey(location, matches.map((m) => convertRouteMatchToUiMatch(m, state.loaderData))) || location.key;
		return location.key;
	}
	function saveScrollPosition(location, matches) {
		if (savedScrollPositions && getScrollPosition) {
			let key = getScrollKey(location, matches);
			savedScrollPositions[key] = getScrollPosition();
		}
	}
	function getSavedScrollPosition(location, matches) {
		if (savedScrollPositions) {
			let key = getScrollKey(location, matches);
			let y = savedScrollPositions[key];
			if (typeof y === "number") return y;
		}
		return null;
	}
	function checkFogOfWar(matches, routesToUse, pathname) {
		if (patchRoutesOnNavigationImpl) {
			if (!matches) return {
				active: true,
				matches: matchRoutesImpl(routesToUse, pathname, basename, true) || []
			};
			else if (Object.keys(matches[0].params).length > 0) return {
				active: true,
				matches: matchRoutesImpl(routesToUse, pathname, basename, true)
			};
		}
		return {
			active: false,
			matches: null
		};
	}
	async function discoverRoutes(matches, pathname, signal, fetcherKey) {
		if (!patchRoutesOnNavigationImpl) return {
			type: "success",
			matches
		};
		let partialMatches = matches;
		while (true) {
			let isNonHMR = inFlightDataRoutes == null;
			let routesToUse = inFlightDataRoutes || dataRoutes;
			let localManifest = manifest;
			try {
				await patchRoutesOnNavigationImpl({
					signal,
					path: pathname,
					matches: partialMatches,
					fetcherKey,
					patch: (routeId, children) => {
						if (signal.aborted) return;
						patchRoutesImpl(routeId, children, routesToUse, localManifest, mapRouteProperties);
					}
				});
			} catch (e) {
				return {
					type: "error",
					error: e,
					partialMatches
				};
			} finally {
				if (isNonHMR && !signal.aborted) dataRoutes = [...dataRoutes];
			}
			if (signal.aborted) return { type: "aborted" };
			let newMatches = matchRoutes(routesToUse, pathname, basename);
			if (newMatches) return {
				type: "success",
				matches: newMatches
			};
			let newPartialMatches = matchRoutesImpl(routesToUse, pathname, basename, true);
			if (!newPartialMatches || partialMatches.length === newPartialMatches.length && partialMatches.every((m, i) => m.route.id === newPartialMatches[i].route.id)) return {
				type: "success",
				matches: null
			};
			partialMatches = newPartialMatches;
		}
	}
	function _internalSetRoutes(newRoutes) {
		manifest = {};
		inFlightDataRoutes = convertRoutesToDataRoutes$1(newRoutes, mapRouteProperties, void 0, manifest);
	}
	function patchRoutes(routeId, children) {
		let isNonHMR = inFlightDataRoutes == null;
		patchRoutesImpl(routeId, children, inFlightDataRoutes || dataRoutes, manifest, mapRouteProperties);
		if (isNonHMR) {
			dataRoutes = [...dataRoutes];
			updateState({});
		}
	}
	router = {
		get basename() {
			return basename;
		},
		get future() {
			return future;
		},
		get state() {
			return state;
		},
		get routes() {
			return dataRoutes;
		},
		get window() {
			return routerWindow;
		},
		initialize,
		subscribe,
		enableScrollRestoration,
		navigate,
		fetch,
		revalidate,
		createHref: (to) => init.history.createHref(to),
		encodeLocation: (to) => init.history.encodeLocation(to),
		getFetcher,
		deleteFetcher: deleteFetcherAndUpdateState,
		dispose,
		getBlocker,
		deleteBlocker,
		patchRoutes,
		_internalFetchControllers: fetchControllers,
		_internalActiveDeferreds: activeDeferreds,
		_internalSetRoutes
	};
	return router;
}
function isSubmissionNavigation(opts) {
	return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
}
function normalizeTo(location, matches, basename, prependBasename, to, v7_relativeSplatPath, fromRouteId, relative) {
	let contextualMatches;
	let activeRouteMatch;
	if (fromRouteId) {
		contextualMatches = [];
		for (let match of matches) {
			contextualMatches.push(match);
			if (match.route.id === fromRouteId) {
				activeRouteMatch = match;
				break;
			}
		}
	} else {
		contextualMatches = matches;
		activeRouteMatch = matches[matches.length - 1];
	}
	let path = resolveTo(to ? to : ".", getResolveToMatches(contextualMatches, v7_relativeSplatPath), stripBasename(location.pathname, basename) || location.pathname, relative === "path");
	if (to == null) {
		path.search = location.search;
		path.hash = location.hash;
	}
	if ((to == null || to === "" || to === ".") && activeRouteMatch) {
		let nakedIndex = hasNakedIndexQuery(path.search);
		if (activeRouteMatch.route.index && !nakedIndex) path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
		else if (!activeRouteMatch.route.index && nakedIndex) {
			let params = new URLSearchParams(path.search);
			let indexValues = params.getAll("index");
			params.delete("index");
			indexValues.filter((v) => v).forEach((v) => params.append("index", v));
			let qs = params.toString();
			path.search = qs ? "?" + qs : "";
		}
	}
	if (prependBasename && basename !== "/") path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
	return createPath(path);
}
function normalizeNavigateOptions(normalizeFormMethod, isFetcher, path, opts) {
	if (!opts || !isSubmissionNavigation(opts)) return { path };
	if (opts.formMethod && !isValidMethod(opts.formMethod)) return {
		path,
		error: getInternalRouterError(405, { method: opts.formMethod })
	};
	let getInvalidBodyError = () => ({
		path,
		error: getInternalRouterError(400, { type: "invalid-body" })
	});
	let rawFormMethod = opts.formMethod || "get";
	let formMethod = normalizeFormMethod ? rawFormMethod.toUpperCase() : rawFormMethod.toLowerCase();
	let formAction = stripHashFromPath(path);
	if (opts.body !== void 0) {
		if (opts.formEncType === "text/plain") {
			if (!isMutationMethod(formMethod)) return getInvalidBodyError();
			let text = typeof opts.body === "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? Array.from(opts.body.entries()).reduce((acc, _ref3) => {
				let [name, value] = _ref3;
				return "" + acc + name + "=" + value + "\n";
			}, "") : String(opts.body);
			return {
				path,
				submission: {
					formMethod,
					formAction,
					formEncType: opts.formEncType,
					formData: void 0,
					json: void 0,
					text
				}
			};
		} else if (opts.formEncType === "application/json") {
			if (!isMutationMethod(formMethod)) return getInvalidBodyError();
			try {
				let json = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
				return {
					path,
					submission: {
						formMethod,
						formAction,
						formEncType: opts.formEncType,
						formData: void 0,
						json,
						text: void 0
					}
				};
			} catch (e) {
				return getInvalidBodyError();
			}
		}
	}
	invariant(typeof FormData === "function", "FormData is not available in this environment");
	let searchParams;
	let formData;
	if (opts.formData) {
		searchParams = convertFormDataToSearchParams(opts.formData);
		formData = opts.formData;
	} else if (opts.body instanceof FormData) {
		searchParams = convertFormDataToSearchParams(opts.body);
		formData = opts.body;
	} else if (opts.body instanceof URLSearchParams) {
		searchParams = opts.body;
		formData = convertSearchParamsToFormData(searchParams);
	} else if (opts.body == null) {
		searchParams = new URLSearchParams();
		formData = new FormData();
	} else try {
		searchParams = new URLSearchParams(opts.body);
		formData = convertSearchParamsToFormData(searchParams);
	} catch (e) {
		return getInvalidBodyError();
	}
	let submission = {
		formMethod,
		formAction,
		formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
		formData,
		json: void 0,
		text: void 0
	};
	if (isMutationMethod(submission.formMethod)) return {
		path,
		submission
	};
	let parsedPath = parsePath(path);
	if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) searchParams.append("index", "");
	parsedPath.search = "?" + searchParams;
	return {
		path: createPath(parsedPath),
		submission
	};
}
function getLoaderMatchesUntilBoundary(matches, boundaryId, includeBoundary) {
	if (includeBoundary === void 0) includeBoundary = false;
	let index = matches.findIndex((m) => m.route.id === boundaryId);
	if (index >= 0) return matches.slice(0, includeBoundary ? index + 1 : index);
	return matches;
}
function getMatchesToLoad(history, state, matches, submission, location, initialHydration, skipActionErrorRevalidation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, deletedFetchers, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionResult) {
	let actionResult = pendingActionResult ? isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : pendingActionResult[1].data : void 0;
	let currentUrl = history.createURL(state.location);
	let nextUrl = history.createURL(location);
	let boundaryMatches = matches;
	if (initialHydration && state.errors) boundaryMatches = getLoaderMatchesUntilBoundary(matches, Object.keys(state.errors)[0], true);
	else if (pendingActionResult && isErrorResult(pendingActionResult[1])) boundaryMatches = getLoaderMatchesUntilBoundary(matches, pendingActionResult[0]);
	let actionStatus = pendingActionResult ? pendingActionResult[1].statusCode : void 0;
	let shouldSkipRevalidation = skipActionErrorRevalidation && actionStatus && actionStatus >= 400;
	let navigationMatches = boundaryMatches.filter((match, index) => {
		let { route } = match;
		if (route.lazy) return true;
		if (route.loader == null) return false;
		if (initialHydration) return shouldLoadRouteOnHydration(route, state.loaderData, state.errors);
		if (isNewLoader(state.loaderData, state.matches[index], match) || cancelledDeferredRoutes.some((id) => id === match.route.id)) return true;
		let currentRouteMatch = state.matches[index];
		let nextRouteMatch = match;
		return shouldRevalidateLoader(match, _extends$2({
			currentUrl,
			currentParams: currentRouteMatch.params,
			nextUrl,
			nextParams: nextRouteMatch.params
		}, submission, {
			actionResult,
			actionStatus,
			defaultShouldRevalidate: shouldSkipRevalidation ? false : isRevalidationRequired || currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search || currentUrl.search !== nextUrl.search || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
		}));
	});
	let revalidatingFetchers = [];
	fetchLoadMatches.forEach((f, key) => {
		if (initialHydration || !matches.some((m) => m.route.id === f.routeId) || deletedFetchers.has(key)) return;
		let fetcherMatches = matchRoutes(routesToUse, f.path, basename);
		if (!fetcherMatches) {
			revalidatingFetchers.push({
				key,
				routeId: f.routeId,
				path: f.path,
				matches: null,
				match: null,
				controller: null
			});
			return;
		}
		let fetcher = state.fetchers.get(key);
		let fetcherMatch = getTargetMatch(fetcherMatches, f.path);
		let shouldRevalidate = false;
		if (fetchRedirectIds.has(key)) shouldRevalidate = false;
		else if (cancelledFetcherLoads.has(key)) {
			cancelledFetcherLoads.delete(key);
			shouldRevalidate = true;
		} else if (fetcher && fetcher.state !== "idle" && fetcher.data === void 0) shouldRevalidate = isRevalidationRequired;
		else shouldRevalidate = shouldRevalidateLoader(fetcherMatch, _extends$2({
			currentUrl,
			currentParams: state.matches[state.matches.length - 1].params,
			nextUrl,
			nextParams: matches[matches.length - 1].params
		}, submission, {
			actionResult,
			actionStatus,
			defaultShouldRevalidate: shouldSkipRevalidation ? false : isRevalidationRequired
		}));
		if (shouldRevalidate) revalidatingFetchers.push({
			key,
			routeId: f.routeId,
			path: f.path,
			matches: fetcherMatches,
			match: fetcherMatch,
			controller: new AbortController()
		});
	});
	return [navigationMatches, revalidatingFetchers];
}
function shouldLoadRouteOnHydration(route, loaderData, errors) {
	if (route.lazy) return true;
	if (!route.loader) return false;
	let hasData = loaderData != null && loaderData[route.id] !== void 0;
	let hasError = errors != null && errors[route.id] !== void 0;
	if (!hasData && hasError) return false;
	if (typeof route.loader === "function" && route.loader.hydrate === true) return true;
	return !hasData && !hasError;
}
function isNewLoader(currentLoaderData, currentMatch, match) {
	let isNew = !currentMatch || match.route.id !== currentMatch.route.id;
	let isMissingData = currentLoaderData[match.route.id] === void 0;
	return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
	let currentPath = currentMatch.route.path;
	return currentMatch.pathname !== match.pathname || currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"];
}
function shouldRevalidateLoader(loaderMatch, arg) {
	if (loaderMatch.route.shouldRevalidate) {
		let routeChoice = loaderMatch.route.shouldRevalidate(arg);
		if (typeof routeChoice === "boolean") return routeChoice;
	}
	return arg.defaultShouldRevalidate;
}
function patchRoutesImpl(routeId, children, routesToUse, manifest, mapRouteProperties) {
	var _childrenToPatch;
	let childrenToPatch;
	if (routeId) {
		let route = manifest[routeId];
		invariant(route, "No route found to patch children into: routeId = " + routeId);
		if (!route.children) route.children = [];
		childrenToPatch = route.children;
	} else childrenToPatch = routesToUse;
	let newRoutes = convertRoutesToDataRoutes$1(children.filter((newRoute) => !childrenToPatch.some((existingRoute) => isSameRoute(newRoute, existingRoute))), mapRouteProperties, [
		routeId || "_",
		"patch",
		String(((_childrenToPatch = childrenToPatch) == null ? void 0 : _childrenToPatch.length) || "0")
	], manifest);
	childrenToPatch.push(...newRoutes);
}
function isSameRoute(newRoute, existingRoute) {
	if ("id" in newRoute && "id" in existingRoute && newRoute.id === existingRoute.id) return true;
	if (!(newRoute.index === existingRoute.index && newRoute.path === existingRoute.path && newRoute.caseSensitive === existingRoute.caseSensitive)) return false;
	if ((!newRoute.children || newRoute.children.length === 0) && (!existingRoute.children || existingRoute.children.length === 0)) return true;
	return newRoute.children.every((aChild, i) => {
		var _existingRoute$childr;
		return (_existingRoute$childr = existingRoute.children) == null ? void 0 : _existingRoute$childr.some((bChild) => isSameRoute(aChild, bChild));
	});
}
/**
* Execute route.lazy() methods to lazily load route modules (loader, action,
* shouldRevalidate) and update the routeManifest in place which shares objects
* with dataRoutes so those get updated as well.
*/
async function loadLazyRouteModule(route, mapRouteProperties, manifest) {
	if (!route.lazy) return;
	let lazyRoute = await route.lazy();
	if (!route.lazy) return;
	let routeToUpdate = manifest[route.id];
	invariant(routeToUpdate, "No route found in manifest");
	let routeUpdates = {};
	for (let lazyRouteProperty in lazyRoute) {
		let isPropertyStaticallyDefined = routeToUpdate[lazyRouteProperty] !== void 0 && lazyRouteProperty !== "hasErrorBoundary";
		warning(!isPropertyStaticallyDefined, "Route \"" + routeToUpdate.id + "\" has a static property \"" + lazyRouteProperty + "\" defined but its lazy function is also returning a value for this property. " + ("The lazy route property \"" + lazyRouteProperty + "\" will be ignored."));
		if (!isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty)) routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty];
	}
	Object.assign(routeToUpdate, routeUpdates);
	Object.assign(routeToUpdate, _extends$2({}, mapRouteProperties(routeToUpdate), { lazy: void 0 }));
}
async function defaultDataStrategy(_ref4) {
	let { matches } = _ref4;
	let matchesToLoad = matches.filter((m) => m.shouldLoad);
	return (await Promise.all(matchesToLoad.map((m) => m.resolve()))).reduce((acc, result, i) => Object.assign(acc, { [matchesToLoad[i].route.id]: result }), {});
}
async function callDataStrategyImpl(dataStrategyImpl, type, state, request, matchesToLoad, matches, fetcherKey, manifest, mapRouteProperties, requestContext) {
	let loadRouteDefinitionsPromises = matches.map((m) => m.route.lazy ? loadLazyRouteModule(m.route, mapRouteProperties, manifest) : void 0);
	let results = await dataStrategyImpl({
		matches: matches.map((match, i) => {
			let loadRoutePromise = loadRouteDefinitionsPromises[i];
			let shouldLoad = matchesToLoad.some((m) => m.route.id === match.route.id);
			let resolve = async (handlerOverride) => {
				if (handlerOverride && request.method === "GET" && (match.route.lazy || match.route.loader)) shouldLoad = true;
				return shouldLoad ? callLoaderOrAction(type, request, match, loadRoutePromise, handlerOverride, requestContext) : Promise.resolve({
					type: ResultType.data,
					result: void 0
				});
			};
			return _extends$2({}, match, {
				shouldLoad,
				resolve
			});
		}),
		request,
		params: matches[0].params,
		fetcherKey,
		context: requestContext
	});
	try {
		await Promise.all(loadRouteDefinitionsPromises);
	} catch (e) {}
	return results;
}
async function callLoaderOrAction(type, request, match, loadRoutePromise, handlerOverride, staticContext) {
	let result;
	let onReject;
	let runHandler = (handler) => {
		let reject;
		let abortPromise = new Promise((_, r) => reject = r);
		onReject = () => reject();
		request.signal.addEventListener("abort", onReject);
		let actualHandler = (ctx) => {
			if (typeof handler !== "function") return Promise.reject(/* @__PURE__ */ new Error("You cannot call the handler for a route which defines a boolean " + ("\"" + type + "\" [routeId: " + match.route.id + "]")));
			return handler({
				request,
				params: match.params,
				context: staticContext
			}, ...ctx !== void 0 ? [ctx] : []);
		};
		let handlerPromise = (async () => {
			try {
				return {
					type: "data",
					result: await (handlerOverride ? handlerOverride((ctx) => actualHandler(ctx)) : actualHandler())
				};
			} catch (e) {
				return {
					type: "error",
					result: e
				};
			}
		})();
		return Promise.race([handlerPromise, abortPromise]);
	};
	try {
		let handler = match.route[type];
		if (loadRoutePromise) {
			if (handler) {
				let handlerError;
				let [value] = await Promise.all([runHandler(handler).catch((e) => {
					handlerError = e;
				}), loadRoutePromise]);
				if (handlerError !== void 0) throw handlerError;
				result = value;
			} else {
				await loadRoutePromise;
				handler = match.route[type];
				if (handler) result = await runHandler(handler);
				else if (type === "action") {
					let url = new URL(request.url);
					let pathname = url.pathname + url.search;
					throw getInternalRouterError(405, {
						method: request.method,
						pathname,
						routeId: match.route.id
					});
				} else return {
					type: ResultType.data,
					result: void 0
				};
			}
		} else if (!handler) {
			let url = new URL(request.url);
			throw getInternalRouterError(404, { pathname: url.pathname + url.search });
		} else result = await runHandler(handler);
		invariant(result.result !== void 0, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ("\"" + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
	} catch (e) {
		return {
			type: ResultType.error,
			result: e
		};
	} finally {
		if (onReject) request.signal.removeEventListener("abort", onReject);
	}
	return result;
}
async function convertDataStrategyResultToDataResult(dataStrategyResult) {
	let { result, type } = dataStrategyResult;
	if (isResponse(result)) {
		let data;
		try {
			let contentType = result.headers.get("Content-Type");
			if (contentType && /\bapplication\/json\b/.test(contentType)) {
				if (result.body == null) data = null;
				else data = await result.json();
			} else data = await result.text();
		} catch (e) {
			return {
				type: ResultType.error,
				error: e
			};
		}
		if (type === ResultType.error) return {
			type: ResultType.error,
			error: new ErrorResponseImpl(result.status, result.statusText, data),
			statusCode: result.status,
			headers: result.headers
		};
		return {
			type: ResultType.data,
			data,
			statusCode: result.status,
			headers: result.headers
		};
	}
	if (type === ResultType.error) {
		if (isDataWithResponseInit(result)) {
			var _result$init3, _result$init4;
			if (result.data instanceof Error) {
				var _result$init, _result$init2;
				return {
					type: ResultType.error,
					error: result.data,
					statusCode: (_result$init = result.init) == null ? void 0 : _result$init.status,
					headers: (_result$init2 = result.init) != null && _result$init2.headers ? new Headers(result.init.headers) : void 0
				};
			}
			return {
				type: ResultType.error,
				error: new ErrorResponseImpl(((_result$init3 = result.init) == null ? void 0 : _result$init3.status) || 500, void 0, result.data),
				statusCode: isRouteErrorResponse(result) ? result.status : void 0,
				headers: (_result$init4 = result.init) != null && _result$init4.headers ? new Headers(result.init.headers) : void 0
			};
		}
		return {
			type: ResultType.error,
			error: result,
			statusCode: isRouteErrorResponse(result) ? result.status : void 0
		};
	}
	if (isDeferredData(result)) {
		var _result$init5, _result$init6;
		return {
			type: ResultType.deferred,
			deferredData: result,
			statusCode: (_result$init5 = result.init) == null ? void 0 : _result$init5.status,
			headers: ((_result$init6 = result.init) == null ? void 0 : _result$init6.headers) && new Headers(result.init.headers)
		};
	}
	if (isDataWithResponseInit(result)) {
		var _result$init7, _result$init8;
		return {
			type: ResultType.data,
			data: result.data,
			statusCode: (_result$init7 = result.init) == null ? void 0 : _result$init7.status,
			headers: (_result$init8 = result.init) != null && _result$init8.headers ? new Headers(result.init.headers) : void 0
		};
	}
	return {
		type: ResultType.data,
		data: result
	};
}
function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename, v7_relativeSplatPath) {
	let location = response.headers.get("Location");
	invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header");
	if (!ABSOLUTE_URL_REGEX.test(location)) {
		let trimmedMatches = matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1);
		location = normalizeTo(new URL(request.url), trimmedMatches, basename, true, location, v7_relativeSplatPath);
		response.headers.set("Location", location);
	}
	return response;
}
function normalizeRedirectLocation(location, currentUrl, basename, historyInstance) {
	let invalidProtocols = [
		"about:",
		"blob:",
		"chrome:",
		"chrome-untrusted:",
		"content:",
		"data:",
		"devtools:",
		"file:",
		"filesystem:",
		"javascript:"
	];
	if (ABSOLUTE_URL_REGEX.test(location)) {
		let normalizedLocation = location;
		let url = normalizedLocation.startsWith("//") ? new URL(currentUrl.protocol + normalizedLocation) : new URL(normalizedLocation);
		if (invalidProtocols.includes(url.protocol)) throw new Error("Invalid redirect location");
		let isSameBasename = stripBasename(url.pathname, basename) != null;
		if (url.origin === currentUrl.origin && isSameBasename) return removeDoubleSlashes(url.pathname) + url.search + url.hash;
	}
	try {
		let url = historyInstance.createURL(location);
		if (invalidProtocols.includes(url.protocol)) throw new Error("Invalid redirect location");
	} catch (e) {}
	return location;
}
function createClientSideRequest(history, location, signal, submission) {
	let url = history.createURL(stripHashFromPath(location)).toString();
	let init = { signal };
	if (submission && isMutationMethod(submission.formMethod)) {
		let { formMethod, formEncType } = submission;
		init.method = formMethod.toUpperCase();
		if (formEncType === "application/json") {
			init.headers = new Headers({ "Content-Type": formEncType });
			init.body = JSON.stringify(submission.json);
		} else if (formEncType === "text/plain") init.body = submission.text;
		else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) init.body = convertFormDataToSearchParams(submission.formData);
		else init.body = submission.formData;
	}
	return new Request(url, init);
}
function convertFormDataToSearchParams(formData) {
	let searchParams = new URLSearchParams();
	for (let [key, value] of formData.entries()) searchParams.append(key, typeof value === "string" ? value : value.name);
	return searchParams;
}
function convertSearchParamsToFormData(searchParams) {
	let formData = new FormData();
	for (let [key, value] of searchParams.entries()) formData.append(key, value);
	return formData;
}
function processRouteLoaderData(matches, results, pendingActionResult, activeDeferreds, skipLoaderErrorBubbling) {
	let loaderData = {};
	let errors = null;
	let statusCode;
	let foundError = false;
	let loaderHeaders = {};
	let pendingError = pendingActionResult && isErrorResult(pendingActionResult[1]) ? pendingActionResult[1].error : void 0;
	matches.forEach((match) => {
		if (!(match.route.id in results)) return;
		let id = match.route.id;
		let result = results[id];
		invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");
		if (isErrorResult(result)) {
			let error = result.error;
			if (pendingError !== void 0) {
				error = pendingError;
				pendingError = void 0;
			}
			errors = errors || {};
			if (skipLoaderErrorBubbling) errors[id] = error;
			else {
				let boundaryMatch = findNearestBoundary(matches, id);
				if (errors[boundaryMatch.route.id] == null) errors[boundaryMatch.route.id] = error;
			}
			loaderData[id] = void 0;
			if (!foundError) {
				foundError = true;
				statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
			}
			if (result.headers) loaderHeaders[id] = result.headers;
		} else if (isDeferredResult(result)) {
			activeDeferreds.set(id, result.deferredData);
			loaderData[id] = result.deferredData.data;
			if (result.statusCode != null && result.statusCode !== 200 && !foundError) statusCode = result.statusCode;
			if (result.headers) loaderHeaders[id] = result.headers;
		} else {
			loaderData[id] = result.data;
			if (result.statusCode && result.statusCode !== 200 && !foundError) statusCode = result.statusCode;
			if (result.headers) loaderHeaders[id] = result.headers;
		}
	});
	if (pendingError !== void 0 && pendingActionResult) {
		errors = { [pendingActionResult[0]]: pendingError };
		loaderData[pendingActionResult[0]] = void 0;
	}
	return {
		loaderData,
		errors,
		statusCode: statusCode || 200,
		loaderHeaders
	};
}
function processLoaderData(state, matches, results, pendingActionResult, revalidatingFetchers, fetcherResults, activeDeferreds) {
	let { loaderData, errors } = processRouteLoaderData(matches, results, pendingActionResult, activeDeferreds, false);
	revalidatingFetchers.forEach((rf) => {
		let { key, match, controller } = rf;
		let result = fetcherResults[key];
		invariant(result, "Did not find corresponding fetcher result");
		if (controller && controller.signal.aborted) return;
		else if (isErrorResult(result)) {
			let boundaryMatch = findNearestBoundary(state.matches, match == null ? void 0 : match.route.id);
			if (!(errors && errors[boundaryMatch.route.id])) errors = _extends$2({}, errors, { [boundaryMatch.route.id]: result.error });
			state.fetchers.delete(key);
		} else if (isRedirectResult(result)) invariant(false, "Unhandled fetcher revalidation redirect");
		else if (isDeferredResult(result)) invariant(false, "Unhandled fetcher deferred data");
		else {
			let doneFetcher = getDoneFetcher(result.data);
			state.fetchers.set(key, doneFetcher);
		}
	});
	return {
		loaderData,
		errors
	};
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
	let mergedLoaderData = _extends$2({}, newLoaderData);
	for (let match of matches) {
		let id = match.route.id;
		if (newLoaderData.hasOwnProperty(id)) {
			if (newLoaderData[id] !== void 0) mergedLoaderData[id] = newLoaderData[id];
		} else if (loaderData[id] !== void 0 && match.route.loader) mergedLoaderData[id] = loaderData[id];
		if (errors && errors.hasOwnProperty(id)) break;
	}
	return mergedLoaderData;
}
function getActionDataForCommit(pendingActionResult) {
	if (!pendingActionResult) return {};
	return isErrorResult(pendingActionResult[1]) ? { actionData: {} } : { actionData: { [pendingActionResult[0]]: pendingActionResult[1].data } };
}
function findNearestBoundary(matches, routeId) {
	return (routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [...matches]).reverse().find((m) => m.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes) {
	let route = routes.length === 1 ? routes[0] : routes.find((r) => r.index || !r.path || r.path === "/") || { id: "__shim-error-route__" };
	return {
		matches: [{
			params: {},
			pathname: "",
			pathnameBase: "",
			route
		}],
		route
	};
}
function getInternalRouterError(status, _temp5) {
	let { pathname, routeId, method, type, message } = _temp5 === void 0 ? {} : _temp5;
	let statusText = "Unknown Server Error";
	let errorMessage = "Unknown @remix-run/router error";
	if (status === 400) {
		statusText = "Bad Request";
		if (method && pathname && routeId) errorMessage = "You made a " + method + " request to \"" + pathname + "\" but " + ("did not provide a `loader` for route \"" + routeId + "\", ") + "so there is no way to handle the request.";
		else if (type === "defer-action") errorMessage = "defer() is not supported in actions";
		else if (type === "invalid-body") errorMessage = "Unable to encode submission body";
	} else if (status === 403) {
		statusText = "Forbidden";
		errorMessage = "Route \"" + routeId + "\" does not match URL \"" + pathname + "\"";
	} else if (status === 404) {
		statusText = "Not Found";
		errorMessage = "No route matches URL \"" + pathname + "\"";
	} else if (status === 405) {
		statusText = "Method Not Allowed";
		if (method && pathname && routeId) errorMessage = "You made a " + method.toUpperCase() + " request to \"" + pathname + "\" but " + ("did not provide an `action` for route \"" + routeId + "\", ") + "so there is no way to handle the request.";
		else if (method) errorMessage = "Invalid request method \"" + method.toUpperCase() + "\"";
	}
	return new ErrorResponseImpl(status || 500, statusText, new Error(errorMessage), true);
}
function findRedirect(results) {
	let entries = Object.entries(results);
	for (let i = entries.length - 1; i >= 0; i--) {
		let [key, result] = entries[i];
		if (isRedirectResult(result)) return {
			key,
			result
		};
	}
}
function stripHashFromPath(path) {
	let parsedPath = typeof path === "string" ? parsePath(path) : path;
	return createPath(_extends$2({}, parsedPath, { hash: "" }));
}
function isHashChangeOnly(a, b) {
	if (a.pathname !== b.pathname || a.search !== b.search) return false;
	if (a.hash === "") return b.hash !== "";
	else if (a.hash === b.hash) return true;
	else if (b.hash !== "") return true;
	return false;
}
function isRedirectDataStrategyResultResult(result) {
	return isResponse(result.result) && redirectStatusCodes.has(result.result.status);
}
function isDeferredResult(result) {
	return result.type === ResultType.deferred;
}
function isErrorResult(result) {
	return result.type === ResultType.error;
}
function isRedirectResult(result) {
	return (result && result.type) === ResultType.redirect;
}
function isDataWithResponseInit(value) {
	return typeof value === "object" && value != null && "type" in value && "data" in value && "init" in value && value.type === "DataWithResponseInit";
}
function isDeferredData(value) {
	let deferred = value;
	return deferred && typeof deferred === "object" && typeof deferred.data === "object" && typeof deferred.subscribe === "function" && typeof deferred.cancel === "function" && typeof deferred.resolveData === "function";
}
function isResponse(value) {
	return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isValidMethod(method) {
	return validRequestMethods.has(method.toLowerCase());
}
function isMutationMethod(method) {
	return validMutationMethods.has(method.toLowerCase());
}
async function resolveNavigationDeferredResults(matches, results, signal, currentMatches, currentLoaderData) {
	let entries = Object.entries(results);
	for (let index = 0; index < entries.length; index++) {
		let [routeId, result] = entries[index];
		let match = matches.find((m) => (m == null ? void 0 : m.route.id) === routeId);
		if (!match) continue;
		let currentMatch = currentMatches.find((m) => m.route.id === match.route.id);
		let isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== void 0;
		if (isDeferredResult(result) && isRevalidatingLoader) await resolveDeferredData(result, signal, false).then((result) => {
			if (result) results[routeId] = result;
		});
	}
}
async function resolveFetcherDeferredResults(matches, results, revalidatingFetchers) {
	for (let index = 0; index < revalidatingFetchers.length; index++) {
		let { key, routeId, controller } = revalidatingFetchers[index];
		let result = results[key];
		if (!matches.find((m) => (m == null ? void 0 : m.route.id) === routeId)) continue;
		if (isDeferredResult(result)) {
			invariant(controller, "Expected an AbortController for revalidating fetcher deferred result");
			await resolveDeferredData(result, controller.signal, true).then((result) => {
				if (result) results[key] = result;
			});
		}
	}
}
async function resolveDeferredData(result, signal, unwrap) {
	if (unwrap === void 0) unwrap = false;
	if (await result.deferredData.resolveData(signal)) return;
	if (unwrap) try {
		return {
			type: ResultType.data,
			data: result.deferredData.unwrappedData
		};
	} catch (e) {
		return {
			type: ResultType.error,
			error: e
		};
	}
	return {
		type: ResultType.data,
		data: result.deferredData.data
	};
}
function hasNakedIndexQuery(search) {
	return new URLSearchParams(search).getAll("index").some((v) => v === "");
}
function getTargetMatch(matches, location) {
	let search = typeof location === "string" ? parsePath(location).search : location.search;
	if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) return matches[matches.length - 1];
	let pathMatches = getPathContributingMatches(matches);
	return pathMatches[pathMatches.length - 1];
}
function getSubmissionFromNavigation(navigation) {
	let { formMethod, formAction, formEncType, text, formData, json } = navigation;
	if (!formMethod || !formAction || !formEncType) return;
	if (text != null) return {
		formMethod,
		formAction,
		formEncType,
		formData: void 0,
		json: void 0,
		text
	};
	else if (formData != null) return {
		formMethod,
		formAction,
		formEncType,
		formData,
		json: void 0,
		text: void 0
	};
	else if (json !== void 0) return {
		formMethod,
		formAction,
		formEncType,
		formData: void 0,
		json,
		text: void 0
	};
}
function getLoadingNavigation(location, submission) {
	if (submission) return {
		state: "loading",
		location,
		formMethod: submission.formMethod,
		formAction: submission.formAction,
		formEncType: submission.formEncType,
		formData: submission.formData,
		json: submission.json,
		text: submission.text
	};
	else return {
		state: "loading",
		location,
		formMethod: void 0,
		formAction: void 0,
		formEncType: void 0,
		formData: void 0,
		json: void 0,
		text: void 0
	};
}
function getSubmittingNavigation(location, submission) {
	return {
		state: "submitting",
		location,
		formMethod: submission.formMethod,
		formAction: submission.formAction,
		formEncType: submission.formEncType,
		formData: submission.formData,
		json: submission.json,
		text: submission.text
	};
}
function getLoadingFetcher(submission, data) {
	if (submission) return {
		state: "loading",
		formMethod: submission.formMethod,
		formAction: submission.formAction,
		formEncType: submission.formEncType,
		formData: submission.formData,
		json: submission.json,
		text: submission.text,
		data
	};
	else return {
		state: "loading",
		formMethod: void 0,
		formAction: void 0,
		formEncType: void 0,
		formData: void 0,
		json: void 0,
		text: void 0,
		data
	};
}
function getSubmittingFetcher(submission, existingFetcher) {
	return {
		state: "submitting",
		formMethod: submission.formMethod,
		formAction: submission.formAction,
		formEncType: submission.formEncType,
		formData: submission.formData,
		json: submission.json,
		text: submission.text,
		data: existingFetcher ? existingFetcher.data : void 0
	};
}
function getDoneFetcher(data) {
	return {
		state: "idle",
		formMethod: void 0,
		formAction: void 0,
		formEncType: void 0,
		formData: void 0,
		json: void 0,
		text: void 0,
		data
	};
}
function restoreAppliedTransitions(_window, transitions) {
	try {
		let sessionPositions = _window.sessionStorage.getItem(TRANSITIONS_STORAGE_KEY);
		if (sessionPositions) {
			let json = JSON.parse(sessionPositions);
			for (let [k, v] of Object.entries(json || {})) if (v && Array.isArray(v)) transitions.set(k, new Set(v || []));
		}
	} catch (e) {}
}
function persistAppliedTransitions(_window, transitions) {
	if (transitions.size > 0) {
		let json = {};
		for (let [k, v] of transitions) json[k] = [...v];
		try {
			_window.sessionStorage.setItem(TRANSITIONS_STORAGE_KEY, JSON.stringify(json));
		} catch (error) {
			warning(false, "Failed to save applied view transitions in sessionStorage (" + error + ").");
		}
	}
}
//#endregion
//#region node_modules/react-router/dist/index.js
/**
* React Router v6.30.4
*
* Copyright (c) Remix Software Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license MIT
*/
function _extends$1() {
	return _extends$1 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$1.apply(null, arguments);
}
var DataRouterContext = /*#__PURE__*/ import_react.createContext(null);
var DataRouterStateContext = /*#__PURE__*/ import_react.createContext(null);
/**
* A Navigator is a "location changer"; it's how you get to different locations.
*
* Every history instance conforms to the Navigator interface, but the
* distinction is useful primarily when it comes to the low-level `<Router>` API
* where both the location and a navigator must be provided separately in order
* to avoid "tearing" that may occur in a suspense-enabled app if the action
* and/or location were to be read directly from the history instance.
*/
var NavigationContext = /*#__PURE__*/ import_react.createContext(null);
var LocationContext = /*#__PURE__*/ import_react.createContext(null);
var RouteContext = /*#__PURE__*/ import_react.createContext({
	outlet: null,
	matches: [],
	isDataRoute: false
});
var RouteErrorContext = /*#__PURE__*/ import_react.createContext(null);
/**
* Returns true if this component is a descendant of a `<Router>`.
*
* @see https://reactrouter.com/v6/hooks/use-in-router-context
*/
function useInRouterContext() {
	return import_react.useContext(LocationContext) != null;
}
/**
* Returns the current location object, which represents the current URL in web
* browsers.
*
* Note: If you're using this it may mean you're doing some of your own
* "routing" in your app, and we'd like to know what your use case is. We may
* be able to provide something higher-level to better suit your needs.
*
* @see https://reactrouter.com/v6/hooks/use-location
*/
function useLocation() {
	!useInRouterContext() && invariant(false);
	return import_react.useContext(LocationContext).location;
}
var OutletContext = /*#__PURE__*/ import_react.createContext(null);
/**
* Returns the element for the child route at this level of the route
* hierarchy. Used internally by `<Outlet>` to render child routes.
*
* @see https://reactrouter.com/v6/hooks/use-outlet
*/
function useOutlet(context) {
	let outlet = import_react.useContext(RouteContext).outlet;
	if (outlet) return /*#__PURE__*/ import_react.createElement(OutletContext.Provider, { value: context }, outlet);
	return outlet;
}
/**
* Returns an object of key/value pairs of the dynamic params from the current
* URL that were matched by the route path.
*
* @see https://reactrouter.com/v6/hooks/use-params
*/
function useParams() {
	let { matches } = import_react.useContext(RouteContext);
	let routeMatch = matches[matches.length - 1];
	return routeMatch ? routeMatch.params : {};
}
function useRoutesImpl(routes, locationArg, dataRouterState, future) {
	!useInRouterContext() && invariant(false);
	let { navigator } = import_react.useContext(NavigationContext);
	let { matches: parentMatches } = import_react.useContext(RouteContext);
	let routeMatch = parentMatches[parentMatches.length - 1];
	let parentParams = routeMatch ? routeMatch.params : {};
	routeMatch && routeMatch.pathname;
	let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
	routeMatch && routeMatch.route;
	let locationFromContext = useLocation();
	let location;
	if (locationArg) {
		var _parsedLocationArg$pa;
		let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
		!(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) && invariant(false);
		location = parsedLocationArg;
	} else location = locationFromContext;
	let pathname = location.pathname || "/";
	let remainingPathname = pathname;
	if (parentPathnameBase !== "/") {
		let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
		remainingPathname = "/" + pathname.replace(/^\//, "").split("/").slice(parentSegments.length).join("/");
	}
	let matches = matchRoutes(routes, { pathname: remainingPathname });
	let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
		params: Object.assign({}, parentParams, match.params),
		pathname: joinPaths([parentPathnameBase, navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname]),
		pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([parentPathnameBase, navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase])
	})), parentMatches, dataRouterState, future);
	if (locationArg && renderedMatches) return /*#__PURE__*/ import_react.createElement(LocationContext.Provider, { value: {
		location: _extends$1({
			pathname: "/",
			search: "",
			hash: "",
			state: null,
			key: "default"
		}, location),
		navigationType: Action.Pop
	} }, renderedMatches);
	return renderedMatches;
}
function DefaultErrorComponent() {
	let error = useRouteError();
	let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
	let stack = error instanceof Error ? error.stack : null;
	return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement("h2", null, "Unexpected Application Error!"), /*#__PURE__*/ import_react.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /*#__PURE__*/ import_react.createElement("pre", { style: {
		padding: "0.5rem",
		backgroundColor: "rgba(200,200,200, 0.5)"
	} }, stack) : null, null);
}
var defaultErrorElement = /*#__PURE__*/ import_react.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends import_react.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: props.location,
			revalidation: props.revalidation,
			error: props.error
		};
	}
	static getDerivedStateFromError(error) {
		return { error };
	}
	static getDerivedStateFromProps(props, state) {
		if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") return {
			error: props.error,
			location: props.location,
			revalidation: props.revalidation
		};
		return {
			error: props.error !== void 0 ? props.error : state.error,
			location: state.location,
			revalidation: props.revalidation || state.revalidation
		};
	}
	componentDidCatch(error, errorInfo) {
		console.error("React Router caught the following error during render", error, errorInfo);
	}
	render() {
		return this.state.error !== void 0 ? /*#__PURE__*/ import_react.createElement(RouteContext.Provider, { value: this.props.routeContext }, /*#__PURE__*/ import_react.createElement(RouteErrorContext.Provider, {
			value: this.state.error,
			children: this.props.component
		})) : this.props.children;
	}
};
function RenderedRoute(_ref) {
	let { routeContext, match, children } = _ref;
	let dataRouterContext = import_react.useContext(DataRouterContext);
	if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
	return /*#__PURE__*/ import_react.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState, future) {
	var _dataRouterState;
	if (parentMatches === void 0) parentMatches = [];
	if (dataRouterState === void 0) dataRouterState = null;
	if (future === void 0) future = null;
	if (matches == null) {
		var _future;
		if (!dataRouterState) return null;
		if (dataRouterState.errors) matches = dataRouterState.matches;
		else if ((_future = future) != null && _future.v7_partialHydration && parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) matches = dataRouterState.matches;
		else return null;
	}
	let renderedMatches = matches;
	let errors = (_dataRouterState = dataRouterState) == null ? void 0 : _dataRouterState.errors;
	if (errors != null) {
		let errorIndex = renderedMatches.findIndex((m) => m.route.id && (errors == null ? void 0 : errors[m.route.id]) !== void 0);
		!(errorIndex >= 0) && invariant(false);
		renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
	}
	let renderFallback = false;
	let fallbackIndex = -1;
	if (dataRouterState && future && future.v7_partialHydration) for (let i = 0; i < renderedMatches.length; i++) {
		let match = renderedMatches[i];
		if (match.route.HydrateFallback || match.route.hydrateFallbackElement) fallbackIndex = i;
		if (match.route.id) {
			let { loaderData, errors } = dataRouterState;
			let needsToRunLoader = match.route.loader && loaderData[match.route.id] === void 0 && (!errors || errors[match.route.id] === void 0);
			if (match.route.lazy || needsToRunLoader) {
				renderFallback = true;
				if (fallbackIndex >= 0) renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
				else renderedMatches = [renderedMatches[0]];
				break;
			}
		}
	}
	return renderedMatches.reduceRight((outlet, match, index) => {
		let error;
		let shouldRenderHydrateFallback = false;
		let errorElement = null;
		let hydrateFallbackElement = null;
		if (dataRouterState) {
			error = errors && match.route.id ? errors[match.route.id] : void 0;
			errorElement = match.route.errorElement || defaultErrorElement;
			if (renderFallback) {
				if (fallbackIndex < 0 && index === 0) {
					warningOnce("route-fallback", false, "No `HydrateFallback` element provided to render during initial hydration");
					shouldRenderHydrateFallback = true;
					hydrateFallbackElement = null;
				} else if (fallbackIndex === index) {
					shouldRenderHydrateFallback = true;
					hydrateFallbackElement = match.route.hydrateFallbackElement || null;
				}
			}
		}
		let matches = parentMatches.concat(renderedMatches.slice(0, index + 1));
		let getChildren = () => {
			let children;
			if (error) children = errorElement;
			else if (shouldRenderHydrateFallback) children = hydrateFallbackElement;
			else if (match.route.Component) children = /*#__PURE__*/ import_react.createElement(match.route.Component, null);
			else if (match.route.element) children = match.route.element;
			else children = outlet;
			return /*#__PURE__*/ import_react.createElement(RenderedRoute, {
				match,
				routeContext: {
					outlet,
					matches,
					isDataRoute: dataRouterState != null
				},
				children
			});
		};
		return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /*#__PURE__*/ import_react.createElement(RenderErrorBoundary, {
			location: dataRouterState.location,
			revalidation: dataRouterState.revalidation,
			component: errorElement,
			error,
			children: getChildren(),
			routeContext: {
				outlet: null,
				matches,
				isDataRoute: true
			}
		}) : getChildren();
	}, null);
}
var DataRouterStateHook$1 = /*#__PURE__*/ function(DataRouterStateHook) {
	DataRouterStateHook["UseBlocker"] = "useBlocker";
	DataRouterStateHook["UseLoaderData"] = "useLoaderData";
	DataRouterStateHook["UseActionData"] = "useActionData";
	DataRouterStateHook["UseRouteError"] = "useRouteError";
	DataRouterStateHook["UseNavigation"] = "useNavigation";
	DataRouterStateHook["UseRouteLoaderData"] = "useRouteLoaderData";
	DataRouterStateHook["UseMatches"] = "useMatches";
	DataRouterStateHook["UseRevalidator"] = "useRevalidator";
	DataRouterStateHook["UseNavigateStable"] = "useNavigate";
	DataRouterStateHook["UseRouteId"] = "useRouteId";
	return DataRouterStateHook;
}(DataRouterStateHook$1 || {});
function useDataRouterState(hookName) {
	let state = import_react.useContext(DataRouterStateContext);
	!state && invariant(false);
	return state;
}
function useRouteContext(hookName) {
	let route = import_react.useContext(RouteContext);
	!route && invariant(false);
	return route;
}
function useCurrentRouteId(hookName) {
	let route = useRouteContext(hookName);
	let thisRoute = route.matches[route.matches.length - 1];
	!thisRoute.route.id && invariant(false);
	return thisRoute.route.id;
}
/**
* Returns the nearest ancestor Route error, which could be a loader/action
* error or a render error.  This is intended to be called from your
* ErrorBoundary/errorElement to display a proper error message.
*/
function useRouteError() {
	var _state$errors;
	let error = import_react.useContext(RouteErrorContext);
	let state = useDataRouterState(DataRouterStateHook$1.UseRouteError);
	let routeId = useCurrentRouteId(DataRouterStateHook$1.UseRouteError);
	if (error !== void 0) return error;
	return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}
var alreadyWarned$1 = {};
function warningOnce(key, cond, message) {
	if (!cond && !alreadyWarned$1[key]) alreadyWarned$1[key] = true;
}
var logDeprecation = (flag, msg, link) => ("" + msg + ("You can use the `" + flag + "` future flag to opt-in early. ") + ("For more information, see " + link + "."), void 0);
function logV6DeprecationWarnings(renderFuture, routerFuture) {
	if ((renderFuture == null ? void 0 : renderFuture.v7_startTransition) === void 0) logDeprecation("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition");
	if ((renderFuture == null ? void 0 : renderFuture.v7_relativeSplatPath) === void 0 && (!routerFuture || routerFuture.v7_relativeSplatPath === void 0)) logDeprecation("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
	if (routerFuture) {
		if (routerFuture.v7_fetcherPersist === void 0) logDeprecation("v7_fetcherPersist", "The persistence behavior of fetchers is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist");
		if (routerFuture.v7_normalizeFormMethod === void 0) logDeprecation("v7_normalizeFormMethod", "Casing of `formMethod` fields is being normalized to uppercase in v7", "https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod");
		if (routerFuture.v7_partialHydration === void 0) logDeprecation("v7_partialHydration", "`RouterProvider` hydration behavior is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_partialhydration");
		if (routerFuture.v7_skipActionErrorRevalidation === void 0) logDeprecation("v7_skipActionErrorRevalidation", "The revalidation behavior after 4xx/5xx `action` responses is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation");
	}
}
/**
* Renders the child route's element, if there is one.
*
* @see https://reactrouter.com/v6/components/outlet
*/
function Outlet(props) {
	return useOutlet(props.context);
}
/**
* Provides location context for the rest of the app.
*
* Note: You usually won't render a `<Router>` directly. Instead, you'll render a
* router that is more specific to your environment such as a `<BrowserRouter>`
* in web browsers or a `<StaticRouter>` for server rendering.
*
* @see https://reactrouter.com/v6/router-components/router
*/
function Router(_ref5) {
	let { basename: basenameProp = "/", children = null, location: locationProp, navigationType = Action.Pop, navigator, static: staticProp = false, future } = _ref5;
	useInRouterContext() && invariant(false);
	let basename = basenameProp.replace(/^\/*/, "/");
	let navigationContext = import_react.useMemo(() => ({
		basename,
		navigator,
		static: staticProp,
		future: _extends$1({ v7_relativeSplatPath: false }, future)
	}), [
		basename,
		future,
		navigator,
		staticProp
	]);
	if (typeof locationProp === "string") locationProp = parsePath(locationProp);
	let { pathname = "/", search = "", hash = "", state = null, key = "default" } = locationProp;
	let locationContext = import_react.useMemo(() => {
		let trailingPathname = stripBasename(pathname, basename);
		if (trailingPathname == null) return null;
		return {
			location: {
				pathname: trailingPathname,
				search,
				hash,
				state,
				key
			},
			navigationType
		};
	}, [
		basename,
		pathname,
		search,
		hash,
		state,
		key,
		navigationType
	]);
	if (locationContext == null) return null;
	return /*#__PURE__*/ import_react.createElement(NavigationContext.Provider, { value: navigationContext }, /*#__PURE__*/ import_react.createElement(LocationContext.Provider, {
		children,
		value: locationContext
	}));
}
var AwaitRenderStatus = /*#__PURE__*/ function(AwaitRenderStatus) {
	AwaitRenderStatus[AwaitRenderStatus["pending"] = 0] = "pending";
	AwaitRenderStatus[AwaitRenderStatus["success"] = 1] = "success";
	AwaitRenderStatus[AwaitRenderStatus["error"] = 2] = "error";
	return AwaitRenderStatus;
}(AwaitRenderStatus || {});
new Promise(() => {});
import_react.Component;
function mapRouteProperties(route) {
	let updates = { hasErrorBoundary: route.ErrorBoundary != null || route.errorElement != null };
	if (route.Component) Object.assign(updates, {
		element: /*#__PURE__*/ import_react.createElement(route.Component),
		Component: void 0
	});
	if (route.HydrateFallback) Object.assign(updates, {
		hydrateFallbackElement: /*#__PURE__*/ import_react.createElement(route.HydrateFallback),
		HydrateFallback: void 0
	});
	if (route.ErrorBoundary) Object.assign(updates, {
		errorElement: /*#__PURE__*/ import_react.createElement(route.ErrorBoundary),
		ErrorBoundary: void 0
	});
	return updates;
}
//#endregion
//#region node_modules/react-router-dom/dist/index.js
/**
* React Router DOM v6.30.4
*
* Copyright (c) Remix Software Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license MIT
*/
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
var REACT_ROUTER_VERSION = "6";
try {
	window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e) {}
function createBrowserRouter(routes, opts) {
	return createRouter({
		basename: opts == null ? void 0 : opts.basename,
		future: _extends({}, opts == null ? void 0 : opts.future, { v7_prependBasename: true }),
		history: createBrowserHistory({ window: opts == null ? void 0 : opts.window }),
		hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
		routes,
		mapRouteProperties,
		dataStrategy: opts == null ? void 0 : opts.dataStrategy,
		patchRoutesOnNavigation: opts == null ? void 0 : opts.patchRoutesOnNavigation,
		window: opts == null ? void 0 : opts.window
	}).initialize();
}
function parseHydrationData() {
	var _window;
	let state = (_window = window) == null ? void 0 : _window.__staticRouterHydrationData;
	if (state && state.errors) state = _extends({}, state, { errors: deserializeErrors(state.errors) });
	return state;
}
function deserializeErrors(errors) {
	if (!errors) return null;
	let entries = Object.entries(errors);
	let serialized = {};
	for (let [key, val] of entries) if (val && val.__type === "RouteErrorResponse") serialized[key] = new ErrorResponseImpl(val.status, val.statusText, val.data, val.internal === true);
	else if (val && val.__type === "Error") {
		if (val.__subType) {
			let ErrorConstructor = window[val.__subType];
			if (typeof ErrorConstructor === "function") try {
				let error = new ErrorConstructor(val.message);
				error.stack = "";
				serialized[key] = error;
			} catch (e) {}
		}
		if (serialized[key] == null) {
			let error = new Error(val.message);
			error.stack = "";
			serialized[key] = error;
		}
	} else serialized[key] = val;
	return serialized;
}
var ViewTransitionContext = /*#__PURE__*/ import_react.createContext({ isTransitioning: false });
var FetchersContext = /*#__PURE__*/ import_react.createContext(/* @__PURE__ */ new Map());
var startTransitionImpl = import_react.startTransition;
var flushSyncImpl = import_react_dom.flushSync;
function startTransitionSafe(cb) {
	if (startTransitionImpl) startTransitionImpl(cb);
	else cb();
}
function flushSyncSafe(cb) {
	if (flushSyncImpl) flushSyncImpl(cb);
	else cb();
}
var Deferred = class {
	constructor() {
		this.status = "pending";
		this.promise = new Promise((resolve, reject) => {
			this.resolve = (value) => {
				if (this.status === "pending") {
					this.status = "resolved";
					resolve(value);
				}
			};
			this.reject = (reason) => {
				if (this.status === "pending") {
					this.status = "rejected";
					reject(reason);
				}
			};
		});
	}
};
/**
* Given a Remix Router instance, render the appropriate UI
*/
function RouterProvider(_ref) {
	let { fallbackElement, router, future } = _ref;
	let [state, setStateImpl] = import_react.useState(router.state);
	let [pendingState, setPendingState] = import_react.useState();
	let [vtContext, setVtContext] = import_react.useState({ isTransitioning: false });
	let [renderDfd, setRenderDfd] = import_react.useState();
	let [transition, setTransition] = import_react.useState();
	let [interruption, setInterruption] = import_react.useState();
	let fetcherData = import_react.useRef(/* @__PURE__ */ new Map());
	let { v7_startTransition } = future || {};
	let optInStartTransition = import_react.useCallback((cb) => {
		if (v7_startTransition) startTransitionSafe(cb);
		else cb();
	}, [v7_startTransition]);
	let setState = import_react.useCallback((newState, _ref2) => {
		let { deletedFetchers, flushSync, viewTransitionOpts } = _ref2;
		newState.fetchers.forEach((fetcher, key) => {
			if (fetcher.data !== void 0) fetcherData.current.set(key, fetcher.data);
		});
		deletedFetchers.forEach((key) => fetcherData.current.delete(key));
		let isViewTransitionUnavailable = router.window == null || router.window.document == null || typeof router.window.document.startViewTransition !== "function";
		if (!viewTransitionOpts || isViewTransitionUnavailable) {
			if (flushSync) flushSyncSafe(() => setStateImpl(newState));
			else optInStartTransition(() => setStateImpl(newState));
			return;
		}
		if (flushSync) {
			flushSyncSafe(() => {
				if (transition) {
					renderDfd && renderDfd.resolve();
					transition.skipTransition();
				}
				setVtContext({
					isTransitioning: true,
					flushSync: true,
					currentLocation: viewTransitionOpts.currentLocation,
					nextLocation: viewTransitionOpts.nextLocation
				});
			});
			let t = router.window.document.startViewTransition(() => {
				flushSyncSafe(() => setStateImpl(newState));
			});
			t.finished.finally(() => {
				flushSyncSafe(() => {
					setRenderDfd(void 0);
					setTransition(void 0);
					setPendingState(void 0);
					setVtContext({ isTransitioning: false });
				});
			});
			flushSyncSafe(() => setTransition(t));
			return;
		}
		if (transition) {
			renderDfd && renderDfd.resolve();
			transition.skipTransition();
			setInterruption({
				state: newState,
				currentLocation: viewTransitionOpts.currentLocation,
				nextLocation: viewTransitionOpts.nextLocation
			});
		} else {
			setPendingState(newState);
			setVtContext({
				isTransitioning: true,
				flushSync: false,
				currentLocation: viewTransitionOpts.currentLocation,
				nextLocation: viewTransitionOpts.nextLocation
			});
		}
	}, [
		router.window,
		transition,
		renderDfd,
		fetcherData,
		optInStartTransition
	]);
	import_react.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
	import_react.useEffect(() => {
		if (vtContext.isTransitioning && !vtContext.flushSync) setRenderDfd(new Deferred());
	}, [vtContext]);
	import_react.useEffect(() => {
		if (renderDfd && pendingState && router.window) {
			let newState = pendingState;
			let renderPromise = renderDfd.promise;
			let transition = router.window.document.startViewTransition(async () => {
				optInStartTransition(() => setStateImpl(newState));
				await renderPromise;
			});
			transition.finished.finally(() => {
				setRenderDfd(void 0);
				setTransition(void 0);
				setPendingState(void 0);
				setVtContext({ isTransitioning: false });
			});
			setTransition(transition);
		}
	}, [
		optInStartTransition,
		pendingState,
		renderDfd,
		router.window
	]);
	import_react.useEffect(() => {
		if (renderDfd && pendingState && state.location.key === pendingState.location.key) renderDfd.resolve();
	}, [
		renderDfd,
		transition,
		state.location,
		pendingState
	]);
	import_react.useEffect(() => {
		if (!vtContext.isTransitioning && interruption) {
			setPendingState(interruption.state);
			setVtContext({
				isTransitioning: true,
				flushSync: false,
				currentLocation: interruption.currentLocation,
				nextLocation: interruption.nextLocation
			});
			setInterruption(void 0);
		}
	}, [vtContext.isTransitioning, interruption]);
	import_react.useEffect(() => {}, []);
	let navigator = import_react.useMemo(() => {
		return {
			createHref: router.createHref,
			encodeLocation: router.encodeLocation,
			go: (n) => router.navigate(n),
			push: (to, state, opts) => router.navigate(to, {
				state,
				preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
			}),
			replace: (to, state, opts) => router.navigate(to, {
				replace: true,
				state,
				preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
			})
		};
	}, [router]);
	let basename = router.basename || "/";
	let dataRouterContext = import_react.useMemo(() => ({
		router,
		navigator,
		static: false,
		basename
	}), [
		router,
		navigator,
		basename
	]);
	let routerFuture = import_react.useMemo(() => ({ v7_relativeSplatPath: router.future.v7_relativeSplatPath }), [router.future.v7_relativeSplatPath]);
	import_react.useEffect(() => logV6DeprecationWarnings(future, router.future), [future, router.future]);
	return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, /*#__PURE__*/ import_react.createElement(DataRouterContext.Provider, { value: dataRouterContext }, /*#__PURE__*/ import_react.createElement(DataRouterStateContext.Provider, { value: state }, /*#__PURE__*/ import_react.createElement(FetchersContext.Provider, { value: fetcherData.current }, /*#__PURE__*/ import_react.createElement(ViewTransitionContext.Provider, { value: vtContext }, /*#__PURE__*/ import_react.createElement(Router, {
		basename,
		location: state.location,
		navigationType: state.historyAction,
		navigator,
		future: routerFuture
	}, state.initialized || router.future.v7_partialHydration ? /*#__PURE__*/ import_react.createElement(MemoizedDataRoutes, {
		routes: router.routes,
		future: router.future,
		state
	}) : fallbackElement))))), null);
}
var MemoizedDataRoutes = /*#__PURE__*/ import_react.memo(DataRoutes);
function DataRoutes(_ref3) {
	let { routes, future, state } = _ref3;
	return useRoutesImpl(routes, void 0, state, future);
}
typeof window !== "undefined" && typeof window.document !== "undefined" && window.document.createElement;
var DataRouterHook;
(function(DataRouterHook) {
	DataRouterHook["UseScrollRestoration"] = "useScrollRestoration";
	DataRouterHook["UseSubmit"] = "useSubmit";
	DataRouterHook["UseSubmitFetcher"] = "useSubmitFetcher";
	DataRouterHook["UseFetcher"] = "useFetcher";
	DataRouterHook["useViewTransitionState"] = "useViewTransitionState";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function(DataRouterStateHook) {
	DataRouterStateHook["UseFetcher"] = "useFetcher";
	DataRouterStateHook["UseFetchers"] = "useFetchers";
	DataRouterStateHook["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
//#endregion
//#region \0vite/preload-helper.js
var scriptRel = "modulepreload";
var assetsURL = function(dep, importerUrl) {
	return new URL(dep, importerUrl).href;
};
var seen = {};
var __vitePreload = function preload(baseModule, deps, importerUrl) {
	let promise = Promise.resolve();
	if (deps && deps.length > 0) {
		const links = document.getElementsByTagName("link");
		const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
		const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
		function allSettled(promises) {
			return Promise.all(promises.map((p) => Promise.resolve(p).then((value) => ({
				status: "fulfilled",
				value
			}), (reason) => ({
				status: "rejected",
				reason
			}))));
		}
		function importMetaResolve(specifier) {
			if (import.meta.resolve) return import.meta.resolve(specifier);
			return new URL(
				specifier,
				/** #__KEEP__ */
				import.meta.url
			).href;
		}
		promise = allSettled(deps.map((dep) => {
			dep = assetsURL(dep, importerUrl);
			dep = importMetaResolve(dep);
			if (dep in seen) return;
			seen[dep] = true;
			const isCss = dep.endsWith(".css");
			for (let i = links.length - 1; i >= 0; i--) {
				const link = links[i];
				if (link.href === dep && (!isCss || link.rel === "stylesheet")) return;
			}
			const link = document.createElement("link");
			link.rel = isCss ? "stylesheet" : scriptRel;
			if (!isCss) link.as = "script";
			link.crossOrigin = "";
			link.href = dep;
			if (cspNonce) link.setAttribute("nonce", cspNonce);
			document.head.appendChild(link);
			if (isCss) return new Promise((res, rej) => {
				link.addEventListener("load", res);
				link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
			});
		}));
	}
	function handlePreloadError(err) {
		const e = new Event("vite:preloadError", { cancelable: true });
		e.payload = err;
		window.dispatchEvent(e);
		if (!e.defaultPrevented) throw err;
	}
	return promise.then((res) => {
		for (const item of res || []) {
			if (item.status !== "rejected") continue;
			handlePreloadError(item.reason);
		}
		return baseModule().catch(handlePreloadError);
	});
};
//#endregion
//#region node_modules/vite-react-ssg/dist/shared/vite-react-ssg.C1RTs5UA.mjs
var CopyReactDOM = { ...import_react_dom };
var { version, render: reactRender, hydrate: reactHydrate } = CopyReactDOM;
var isReact18 = Number((version || "").split(".")[0]) > 17;
var isReact19 = Number((version || "").split(".")[0]) > 18;
function render(app, container, renderOptions = {}) {
	const { useLegacyRender } = renderOptions;
	if (useLegacyRender || !isReact18) reactRender(app, container);
	else if (isReact19) __vitePreload(async () => {
		const { default: { createRoot } } = await import("./client-5fd-FNW-.js").then((m) => /* @__PURE__ */ __toESM(m.default, 1));
		return { default: { createRoot } };
	}, [], import.meta.url).then(({ default: { createRoot } }) => {
		const root = createRoot(container);
		import_react.startTransition(() => {
			root.render(app);
		});
	});
	else {
		CopyReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = true;
		const { createRoot } = CopyReactDOM;
		if (!createRoot) throw new Error("createRoot not found");
		const root = createRoot(container);
		CopyReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = false;
		import_react.startTransition(() => {
			root.render(app);
		});
	}
}
function hydrate(app, container, renderOptions = {}) {
	const { useLegacyRender } = renderOptions;
	if (useLegacyRender || !isReact18) reactHydrate(app, container);
	else if (isReact19) __vitePreload(async () => {
		const { default: { hydrateRoot } } = await import("./client-5fd-FNW-.js").then((m) => /* @__PURE__ */ __toESM(m.default, 1));
		return { default: { hydrateRoot } };
	}, [], import.meta.url).then(({ default: { hydrateRoot } }) => {
		import_react.startTransition(() => {
			hydrateRoot(container, app);
		});
	});
	else {
		CopyReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = true;
		const { hydrateRoot } = CopyReactDOM;
		if (!hydrateRoot) throw new Error("hydrateRoot not found");
		import_react.startTransition(() => {
			hydrateRoot(container, app);
			CopyReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = false;
		});
	}
}
function documentReady(_passThrough) {
	if (document.readyState === "loading") return new Promise((resolve) => {
		document.addEventListener("DOMContentLoaded", () => resolve(_passThrough));
	});
	return Promise.resolve(_passThrough);
}
function deserializeState(state) {
	try {
		return JSON.parse(state || "{}");
	} catch (error) {
		console.error("[SSG] On state deserialization -", error, state);
		return {};
	}
}
//#endregion
//#region node_modules/vite-react-ssg/dist/shared/vite-react-ssg.BhGKpaqQ.mjs
function joinUrlSegments(a, b) {
	if (!a || !b) return a || b || "";
	if (a[a.length - 1] === "/") a = a.substring(0, a.length - 1);
	if (b[0] !== "/") b = `/${b}`;
	return a + b;
}
function stripBase(path, base) {
	if (path === base) return "/";
	const devBase = withTrailingSlash(base);
	return path.startsWith(devBase) ? path.slice(devBase.length - 1) : path;
}
function withTrailingSlash(path) {
	if (path[path.length - 1] !== "/") return `${path}/`;
	return path;
}
function withLeadingSlash(path) {
	if (path[0] !== "/") return `/${path}`;
	return path;
}
function convertRoutesToDataRoutes(routes, mapRouteProperties, parentPath = []) {
	return routes.map((route, index) => {
		const treePath = [...parentPath, String(index)];
		const id = typeof route.id === "string" ? route.id : treePath.join("-");
		route.id = id;
		if (isIndexRoute(route)) return {
			...route,
			...mapRouteProperties(route),
			id
		};
		else {
			const pathOrLayoutRoute = {
				...route,
				...mapRouteProperties(route),
				id,
				children: void 0
			};
			if (route.children) pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties, treePath);
			return pathOrLayoutRoute;
		}
	});
}
function isIndexRoute(route) {
	return route.index === true;
}
//#endregion
//#region node_modules/vite-react-ssg/dist/index.mjs
function ViteReactSSG(routerOptions, fn, options = {}) {
	const { transformState, rootContainer = "#root", ssrWhenDev, getStyleCollector = null } = options;
	const isClient = typeof window !== "undefined";
	const BASE_URL = routerOptions.basename ?? "/";
	const { v7_startTransition = true, ...routerFeature } = routerOptions.future ?? {};
	async function createRoot(client = false, routePath) {
		const createRouter = routerOptions.customCreateRouter ?? createBrowserRouter;
		const browserRouter = client ? createRouter(convertRoutesToDataRoutes(routerOptions.routes, transformStaticLoaderRoute), {
			basename: BASE_URL,
			future: routerFeature
		}) : void 0;
		const appRenderCallbacks = [];
		const onSSRAppRendered = client ? () => {} : (cb) => appRenderCallbacks.push(cb);
		const triggerOnSSRAppRendered = () => {
			return Promise.all(appRenderCallbacks.map((cb) => cb()));
		};
		const context = {
			isClient,
			routes: routerOptions.routes,
			router: browserRouter,
			routerOptions,
			onSSRAppRendered,
			triggerOnSSRAppRendered,
			initialState: {},
			transformState,
			routePath,
			base: BASE_URL,
			getStyleCollector,
			routerType: "remix"
		};
		if (client) {
			await documentReady();
			context.initialState = transformState?.(window.__INITIAL_STATE__ || {}) || deserializeState(window.__INITIAL_STATE__);
		}
		await fn?.(context);
		const initialState = context.initialState;
		return {
			...context,
			initialState
		};
	}
	if (isClient) (async () => {
		const container = typeof rootContainer === "string" ? document.querySelector(rootContainer) : rootContainer;
		if (!container) {
			if (typeof $jsdom === "undefined") console.warn("[vite-react-ssg] Root container not found.");
			return;
		}
		const lazeMatches = matchRoutes(routerOptions.routes, window.location, BASE_URL)?.filter((m) => m.route.lazy);
		if (lazeMatches && lazeMatches?.length > 0) await Promise.all(lazeMatches.map(async (m) => {
			const routeModule = await m.route.lazy();
			Object.assign(m.route, {
				...routeModule,
				lazy: void 0
			});
		}));
		const context = await createRoot(true);
		window.__VITE_REACT_SSG_CONTEXT__ = context;
		const { router } = context;
		const app = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(q, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouterProvider, {
			router,
			future: { v7_startTransition }
		}) });
		if (!(document.querySelector("[data-server-rendered=true]") !== null)) render(app, container, options);
		else hydrate(app, container, options);
	})();
	return createRoot;
	function transformStaticLoaderRoute(route) {
		if (!(document.querySelector("[data-server-rendered=true]") !== null)) return route;
		const loader = async ({ request }) => {
			{
				if (!window.__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__) {
					const manifestUrl = joinUrlSegments(BASE_URL, `static-loader-data-manifest-${window.__VITE_REACT_SSG_HASH__}.json`);
					window.__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__ = await (await fetch(withLeadingSlash(manifestUrl))).json();
				}
				const { url } = request;
				let { pathname } = new URL(url);
				if (BASE_URL !== "/") pathname = stripBase(pathname, BASE_URL);
				const dataFilePath = window.__VITE_REACT_SSG_STATIC_LOADER_MANIFEST__?.[pathname];
				if (!dataFilePath) return null;
				if (!window.__VITE_REACT_SSG_STATIC_LOADER_DATA__) window.__VITE_REACT_SSG_STATIC_LOADER_DATA__ = {};
				if (!window.__VITE_REACT_SSG_STATIC_LOADER_DATA__[pathname]) {
					const dataUrl = joinUrlSegments(BASE_URL, dataFilePath);
					window.__VITE_REACT_SSG_STATIC_LOADER_DATA__[pathname] = await (await fetch(withLeadingSlash(dataUrl))).json();
				}
				return window.__VITE_REACT_SSG_STATIC_LOADER_DATA__[pathname]?.[route.id] ?? null;
			}
		};
		route.loader = loader;
		return route;
	}
}
//#endregion
//#region src/generated/site-data.ts
var SITE_DATA = {
	"meta": {
		"siteName": "あかちゃんマニュアル",
		"siteLastVerified": "2026-08-15",
		"hojokinUrl": "https://TOSUKUi.github.io/shinagawa-hojokin/",
		"disclaimer": "このサイトの内容は AI がまとめたものです。医療・法律のアドバイスではありません。医療については必ずかかりつけの医師・助産師・保健センターに相談し、各項目の最終確認日と元ソース（一次情報）を必ず確認してください。"
	},
	"chapters": [
		{
			"slug": "day-of-birth",
			"title": "出産直前から直後までやる手続き",
			"order": 1,
			"lastVerified": "2026-08-15",
			"sources": [
				{
					"name": "品川区（出生届）",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-koseki/procedure-koseki-todokede/hpg000001411.html"
				},
				{
					"name": "品川区（国保加入）",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-kenkouhoken/procedure-kenkouhoken-todokede/hpg000001509.html"
				},
				{
					"name": "品川区（児童手当）",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-iryohizyosei/hpg000027168.html"
				},
				{
					"name": "品川区（妊娠届）",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-service/hpg000000783.html"
				},
				{
					"name": "品川区（妊婦のための支援給付）",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/20230120091157.html"
				},
				{
					"name": "厚労省ボッセイナビ（出産手当金）",
					"url": "https://www.bosei-navi.mhlw.go.jp/glossary/provide02.html"
				},
				{
					"name": "厚労省ボッセイナビ（出産育児一時金）",
					"url": "https://www.bosei-navi.mhlw.go.jp/glossary/provide03.html"
				}
			],
			"must": [],
			"description": "赤ちゃんが生まれた直後、期限のある手続きがいくつもあります",
			"sections": [
				{
					"level": 1,
					"heading": "",
					"anchor": "top",
					"blocks": [{
						"kind": "paragraph",
						"inline": [{
							"text": "赤ちゃんが生まれた直後、期限のある手続きがいくつもあります。出生届、国民健康保険の加入、児童手当などの給付の申請。どこで、いつまでに、何をすればよいのか、金額もあわせて順に説明しています。品川区では、いくつか出生届と同じ日に済ませられます。",
							"bold": false
						}]
					}],
					"sources": [{
						"name": "品川区（出生届）",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-koseki/procedure-koseki-todokede/hpg000001411.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "出産直前の準備：妊娠届と親子健康手帳",
					"anchor": "出産直前の準備-妊娠届と親子健康手帳",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "品川区にお住まいで医療機関で妊娠の診断を受けた方は「妊娠届」を提出します（区役所健康課・保健センター・各地域センター、電子申請も可）。受付は平日午前8時30分から午後5時（土曜・日曜・祝日・年末年始は休）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "手続きには ①妊婦の個人番号（マイナンバー）を確認できるもの ②届出者（代理人を含む）の本人確認できるもの（顔写真付き官公署発行は1点、健康保険証・年金手帳等は2点）③世帯が異なる代理人の場合のみ委任状、が必要です。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "届出すると親子健康手帳（母子健康手帳）のほか、妊婦健康診査・超音波検査・妊婦子宮頸がん検診・新生児聴覚検査・産婦健康診査・1か月児健康診査・妊婦歯科健康診査の各受診票が交付され、都内契約医療機関で健診費用の一部助成が受けられます。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "品川区では令和4年4月から「母子健康手帳」の表記を「親子健康手帳（母子健康手帳）」に変更しています（父親の育児参加を意識した命名）。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "品川区（妊娠届）",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-service/hpg000000783.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "出産当日〜直後の動き方（品川区の「同日にできる手続き」）",
					"anchor": "出産当日-直後の動き方-品川区の-同日にできる手続き",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "届書（出生届）は病院に用意されているので、事前に取りに来る必要はありません（病院から依頼があった場合を除く）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "出産の日の時点で用意しておくとよいもの：出生届（届書の右側には出生証明書が付いていて、医師・助産師が証明する形式）、親子健康手帳（母子健康手帳）（里帰り出産等で手元にない場合は無くても手続き可能）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "命名は常用漢字、人名用漢字、ひらがな、カタカナで。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "品川区では出生届と同日に、次の手続きができます（品川区にお住まいの方）：",
									"bold": false
								}],
								"children": [
									{
										"inline": [{
											"text": "児童に関する手当・子どもの医療費助成の確認（子育て応援課）",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "子どもの国民健康保険の加入（国保医療年金課）",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "出産育児一時金の申請（子どもの母が国民健康保険加入の場合）（国保医療年金課）",
											"bold": false
										}],
										"children": []
									}
								]
							}
						]
					}],
					"sources": [{
						"name": "品川区（出生届）",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-koseki/procedure-koseki-todokede/hpg000001411.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "出生届（戸籍届出）",
					"anchor": "出生届-戸籍届出",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "届出期間：生まれた日を含め14日以内。国外で生まれた場合は3カ月以内（届出はお問い合わせ）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "届出人：父または母。来庁できなくても父または母の署名が必要です。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "届出地：父・母の本籍地、届出人の所在地、出生地のいずれかの区市役所・町村役場（つまり品川区外に住んでいても、品川区内で生まれたら品川区に届出できます）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "届出に必要なもの：出生届（A3の用紙で印刷、感熱紙は不可。署名は本人が自署。令和3年9月1日より押印は任意）、出生証明書、親子健康手帳（母子健康手帳）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "お問い合わせ：戸籍住民課戸籍住民担当（戸籍届出）電話 03-5742-6657（FAX 03-5709-7625）。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "品川区（出生届）",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-koseki/procedure-koseki-todokede/hpg000001411.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "国民健康保険への加入",
					"anchor": "国民健康保険への加入",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "14日以内に届出をします（「14日以内に届出をしてください」）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "子どもが生まれたときの届出に必要なもの：申請者の本人確認できるもの。また世帯主および加入される方全員のマイナンバーの記載が必要なので、マイナンバーのわかるものを持ちます。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "出生による加入は、一部の例外を除き住民登録の手続きが完了していることが前提です（住民異動係にて住民登録）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "資格の取得日は資格が発生した日までさかのぼります。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "届出先：区役所 国保医療年金課資格係、または品川第一・大崎第一・大井第一・荏原第一・荏原第四・八潮の各地域センター。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "お問い合わせ：国保医療年金課資格係 電話 03-5742-6676（FAX 03-5742-6876）。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "品川区（国保加入）",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-kenkouhoken/procedure-kenkouhoken-todokede/hpg000001509.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "出産育児一時金（出産支援の給付）",
					"anchor": "出産育児一時金-出産支援の給付",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "会社の健康保険、公務員等の共済組合等の被保険者および被扶養者の出産時に支給されます。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "支給額：一児の出産につき50万円。産科医療補償制度に加入されていない医療機関等で出産された場合は48万8千円。多胎児を出産したときは胎児数分だけ支給されます。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "詳細及び申請手続きは、加入している健康保険（協会けんぽ、健康保険組合）窓口、市区町村担当窓口へ確認します。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "品川区の場合、子どもの母が国民健康保険加入者なら、出生届と同日に国保医療年金課で出産育児一時金の申請ができます。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "厚労省ボッセイナビ（出産育児一時金）",
						"url": "https://www.bosei-navi.mhlw.go.jp/glossary/provide03.html"
					}, {
						"name": "品川区（出生届）",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-koseki/procedure-koseki-todokede/hpg000001411.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "出産手当金（会社員の場合、健康保険から）",
					"anchor": "出産手当金-会社員の場合-健康保険から",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "出産手当金とは、女性労働者が出産のため会社等を休み、その間に給料の支払いを受けなかった場合に、仕事を休んだ期間を対象として健康保険から支給されるものです。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "対象期間：出産の日（実際の出産が予定日後のときは出産予定日）以前42日（多胎妊娠の場合98日）から出産の翌日以後56日目までの範囲内で、会社を休んだ期間。出産予定日より遅れた場合、その遅れた期間も含みます。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "支給額：1日につき被保険者の標準報酬日額の3分の2に相当する額（1円未満四捨五入）。標準報酬日額は標準報酬月額の30分の1（10円未満四捨五入）。給与の支払いがある日に給与が給付額より少ない場合は差額が支給されます。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "対象者：会社の健康保険、公務員等の共済組合の被保険者本人。申請手続きは、勤務先の健康保険担当者、加入している健康保険（協会けんぽ、健康保険組合）窓口で確認します。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "厚労省ボッセイナビ（出産手当金）",
						"url": "https://www.bosei-navi.mhlw.go.jp/glossary/provide02.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "妊婦のための支援給付（品川区実施、妊娠時5万円＋出産後5万円）",
					"anchor": "妊婦のための支援給付-品川区実施-妊娠時5万円-出産後5万円",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "妊娠届出後と出生届出後に面談を受けた方はそれぞれ5万円の給付金を申請できます（旧：出産・子育て応援事業）。申請者・口座名義人は妊産婦のみ。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "妊婦支援給付金（妊娠時）5万円（現金）：令和7年4月1日以降に妊娠届出・妊婦給付認定の申請をし、助産師・保健師等の面談を受けた妊婦の方。申請期限は胎児の心拍が確認されてから2年間。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "妊婦支援給付金（出産後）お子さん1人当たり5万円：令和7年4月1日以降に出産し、「すくすく赤ちゃん訪問」を受け、胎児の数の届け出をした産婦の方。申請期限は出産予定日の8週間前から2年間。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "申請は「妊婦相談（初回面談）」か「すくすく赤ちゃん訪問」で配布する案内に記載の二次元コード（QRコード）から。給付は妊産婦名義の銀行口座に振り込まれ、給付申請後2〜3カ月程度を予定。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "流産や人工妊娠中絶、死産、出産後にお子様が亡くなられた方も交付対象です（胎児心拍確認後の流産等であれば面談前でも妊娠時・出産後計10万円の対象）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "東京都「赤ちゃんファースト」10万円分は別途申請が必要です。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "お問い合わせ：品川区妊婦のための支援給付事業コールセンター 03-6731-6732（祝日を除く月曜〜金曜 午前8時30分〜午後5時15分）。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "品川区（妊婦のための支援給付）",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/20230120091157.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "児童手当（出生直後に申請）",
					"anchor": "児童手当-出生直後に申請",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "品川区在住で高校卒業まで（18歳誕生日後の最初の3月31日まで）の児童を養育している方のうち、生計中心者（所得の高い方）が対象になります。生計中心者が公務員（国立大学法人、独立行政法人等を除く）の場合は勤務先に申請します。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "手当額（児童1人あたりの月額）：0歳〜3歳未満 15,000円／3歳〜高校生年代（第1子・第2子）10,000円／第3子（0歳〜高校生年代）30,000円。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "支給は原則として隔月（偶数月）に年6回、各支給月の10日頃に指定口座へ振り込み。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "申請は出生日や転入した日の翌日から15日以内（15日特例）。初めてお子さんが生まれたときは、出生により受給資格が生じた日の翌日から15日以内にお住まいの区市町村へ申請が必要です。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "窓口：子育て応援課 手当医療助成担当（品川区役所 本庁舎7階）。電話 03-5742-6721。郵送先：〒140-8715 品川区広町2-1-36 品川区役所 子育て応援課 手当医療助成担当。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "品川区（児童手当）",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-iryohizyosei/hpg000027168.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "出生後の手続きチェックリスト",
					"anchor": "出生後の手続きチェックリスト",
					"blocks": [{
						"kind": "checklist",
						"id": "birth-registration",
						"items": [
							{
								"text": "出生届：生まれた日を含め14日以内に届出をします",
								"done": false
							},
							{
								"text": "国民健康保険への加入：14日以内に届出をします",
								"done": false
							},
							{
								"text": "児童手当の申請：出生日の翌日から15日以内（15日特例）に申請します",
								"done": false
							},
							{
								"text": "出産育児一時金の申請：子どもの母が国民健康保険加入の場合は出生届と同日に申請できます",
								"done": false
							}
						]
					}],
					"sources": [
						{
							"name": "品川区（出生届）",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-koseki/procedure-koseki-todokede/hpg000001411.html"
						},
						{
							"name": "品川区（国保加入）",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-kenkouhoken/procedure-kenkouhoken-todokede/hpg000001509.html"
						},
						{
							"name": "品川区（児童手当）",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-iryohizyosei/hpg000027168.html"
						},
						{
							"name": "厚労省ボッセイナビ（出産育児一時金）",
							"url": "https://www.bosei-navi.mhlw.go.jp/glossary/provide03.html"
						}
					],
					"mustIds": []
				}
			]
		},
		{
			"slug": "newborn-care",
			"title": "新生児のお世話の基本",
			"order": 2,
			"lastVerified": "2026-08-15",
			"sources": [
				{
					"name": "こども家庭庁-赤ちゃんが安全に眠れるように（SIDS）",
					"url": "https://www.cfa.go.jp/policies/boshihoken/kenkou/sids"
				},
				{
					"name": "こども家庭庁-SIDS普及啓発ポスター(PDF)",
					"url": "https://www.cfa.go.jp/assets/contents/node/basic_page/field_ref_resources/ff38becb-bbd1-41f3-a95e-3a22ddac09d8/38227daf/20241211_policies_boshihoken_143.pdf"
				},
				{
					"name": "日本小児科学会-乳児の安全な睡眠環境の確保について（2024年改訂見解）",
					"url": "https://www.jpeds.or.jp/society-activities/column/proposals-assertions/50160.html"
				},
				{
					"name": "厚労省-乳幼児突然死症候群（SIDS）対策に関する検討会報告",
					"url": "https://www.mhlw.go.jp/www1/houdou/1006/h0601-2.html"
				},
				{
					"name": "厚労省-政策レポート「１１月は『乳幼児突然死症候群（ＳＩＤＳ）』の対策強化月間です」",
					"url": "https://www.mhlw.go.jp/seisaku/2010/11/02.html"
				},
				{
					"name": "政府広報オンライン-SIDSの発症リスクを低くする3つのポイント",
					"url": "https://www.gov-online.go.jp/article/201710/entry-8129.html"
				},
				{
					"name": "品川区-赤ちゃんのお世話実演動画のご紹介",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/hpg000000789.html"
				},
				{
					"name": "品川区-すくすく赤ちゃん訪問事業",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/hpg000022461.html"
				},
				{
					"name": "品川区-産婦健康診査・1カ月児健康診査",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/20260213150439.html"
				},
				{
					"name": "品川区-休日・夜間の診療",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/kenkou-byouki/kenkou-byouki-kyuzitsu/index.html"
				},
				{
					"name": "NCCHD-変形性斜頭症に対するヘルメット療法 研究情報(PDF)",
					"url": "https://www.ncchd.go.jp/center/information/epidemiology/pdf/hp2021-203.pdf"
				},
				{
					"name": "NCCHD-形成外科（赤ちゃんの頭のかたち外来）",
					"url": "https://www.ncchd.go.jp/hospital/about/section/geka/keisei.html"
				},
				{
					"name": "京都大学医学部附属病院-赤ちゃんの頭のかたち外来",
					"url": "https://keisei.kuhp.kyoto-u.ac.jp/ja/contents/babyhead"
				},
				{
					"name": "日本小児整形外科学会-股関節脱臼",
					"url": "https://www.jpoa.org/disease/dislocation"
				},
				{
					"name": "日本小児整形外科学会-赤ちゃんの股関節脱臼（正しい知識と早期発見のために）",
					"url": "https://www.jpoa.org/news/topics/1585"
				},
				{
					"name": "日本小児科学会-こどもの救急(ONLINE-QQ)",
					"url": "https://kodomo-qq.jp/index.php?pname=hatsunetsu"
				},
				{
					"name": "神戸大学-こどもの発熱とその対応",
					"url": "https://www.med.kobe-u.ac.jp/pediat/pdf/sirato22.pdf"
				},
				{
					"name": "こども家庭庁-赤ちゃんが泣きやまない",
					"url": "https://www.cfa.go.jp/policies/jidougyakutai/nakiyamanai"
				},
				{
					"name": "こども家庭庁「児童相談所虐待対応ダイヤル『189』について」",
					"url": "https://www.cfa.go.jp/policies/jidougyakutai/gyakutai-taiou-dial"
				}
			],
			"must": [
				"sids",
				"sleep-risk",
				"head-shape",
				"hip"
			],
			"description": "生後1か月は、赤ちゃんの寝かせ方が一番大事です",
			"sections": [
				{
					"level": 1,
					"heading": "",
					"anchor": "top",
					"blocks": [{
						"kind": "paragraph",
						"inline": [{
							"text": "生後1か月は、赤ちゃんの寝かせ方が一番大事です。SIDS予防のための安全な睡眠、うつ伏せ寝や添い寝のリスク、沐浴、頭の形のゆがみ、股関節の確認、発熱で受診する目安、泣き止まない時の対処まで説明しています。",
							"bold": false
						}]
					}],
					"sources": [{
						"name": "こども家庭庁-赤ちゃんが安全に眠れるように（SIDS）",
						"url": "https://www.cfa.go.jp/policies/boshihoken/kenkou/sids"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "SIDS（乳幼児突然死症候群）とは",
					"anchor": "sids-乳幼児突然死症候群-とは",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "こども家庭庁の説明では、SIDSは「それまで大きな異常のきざしがないのに、乳幼児が睡眠中に亡くなってしまう」原因不明の病気で、",
										"bold": false
									},
									{
										"text": "うつぶせ寝・あおむけ寝のどちらの体勢でも起こりますが、あおむけに寝かせたほうが発症率が低い",
										"bold": true
									},
									{
										"text": "ことが研究でわかっています。「医学上の理由でうつぶせ寝を勧められている場合以外は、赤ちゃんの顔が見えるあおむけに寝かせましょう」（睡眠中の窒息事故の予防にも有効とされています）。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "令和6年（2024年）にSIDSで亡くなった乳児は55名で、乳児期の死亡原因としては第3位",
									"bold": true
								}, {
									"text": "（こども家庭庁）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [
									{
										"text": "厚労省は",
										"bold": false
									},
									{
										"text": "平成11年度から11月を「乳幼児突然死症候群(SIDS)」の対策強化月間",
										"bold": true
									},
									{
										"text": "と定めています。SIDS発症の危険性を低くする3つのポイントは「(1)1歳になるまでは、寝かせる時はあおむけに寝かせる (2)無理のない範囲で母乳育児を (3)たばこはやめる」（こども家庭庁のページでも「母乳で育てられている赤ちゃんのほうが、SIDSの発生率が低い」ことを挙げています）。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "厚労省のSIDS対策検討会報告では、危険因子の可能性が疑われている育児環境因子として「1）うつ伏せ寝 2）人工栄養哺育 3）保護者等の習慣的喫煙 4）児の暖めすぎ」が挙げられており、平成9年度に全国規模の調査研究で各要因のオッズ比が求められています。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "こども家庭庁-赤ちゃんが安全に眠れるように（SIDS）",
							"url": "https://www.cfa.go.jp/policies/boshihoken/kenkou/sids"
						},
						{
							"name": "政府広報オンライン-SIDSの発症リスクを低くする3つのポイント",
							"url": "https://www.gov-online.go.jp/article/201710/entry-8129.html"
						},
						{
							"name": "厚労省-乳幼児突然死症候群（SIDS）対策に関する検討会報告",
							"url": "https://www.mhlw.go.jp/www1/houdou/1006/h0601-2.html"
						},
						{
							"name": "厚労省-政策レポート「１１月は「乳幼児突然死症候群（ＳＩＤＳ）」の対策強化月間です」",
							"url": "https://www.mhlw.go.jp/seisaku/2010/11/02.html"
						}
					],
					"mustIds": ["sids"]
				},
				{
					"level": 2,
					"heading": "安全な睡眠環境のポイント",
					"anchor": "安全な睡眠環境のポイント",
					"blocks": [{
						"kind": "paragraph",
						"inline": [{
							"text": "こども家庭庁のリーフレット「赤ちゃんが安全に眠れるように ～1歳未満の赤ちゃんを育てるみなさまへ～」では、睡眠中の窒息のリスクを下げる5つのポイントを挙げています。",
							"bold": false
						}]
					}],
					"sources": [{
						"name": "こども家庭庁-赤ちゃんが安全に眠れるように（SIDS）",
						"url": "https://www.cfa.go.jp/policies/boshihoken/kenkou/sids"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "寝る場所・寝具",
					"anchor": "寝る場所・寝具",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "寝具は硬めで平坦なもの",
									"bold": true
								}, {
									"text": "：「柔らかいクッションや傾斜のあるマットレスは避け、身体が沈まない硬めで平坦な布団やマットレスを使いましょう」。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "寝床には物を置かない",
									"bold": true
								}, {
									"text": "：こども家庭庁の啓発ポスターでは「枕やタオル、衣服、よだれ掛け、ぬいぐるみなどは近くにおかないようにしましょう。下に敷くふとん・マットレスはかた（い）ものを」。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "赤ちゃん専用の寝床",
									"bold": true
								}, {
									"text": "：「できるだけベビーベッドを使用し、国が定めた安全基準の検査に合格した製品であることを示す、PSCマークが貼付されたベビーベッドを選びましょう」。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "温度調整は着るものや空調で",
									"bold": true
								}, {
									"text": "：「掛け布団は赤ちゃんの顔にかかると窒息のリスクがあります。1歳になるまでは掛け布団は使わず、スリーパーなどの着るものや空調で寒さを調整」。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "こども家庭庁-赤ちゃんが安全に眠れるように（SIDS）",
						"url": "https://www.cfa.go.jp/policies/boshihoken/kenkou/sids"
					}, {
						"name": "こども家庭庁-SIDS普及啓発ポスター(PDF)",
						"url": "https://www.cfa.go.jp/assets/contents/node/basic_page/field_ref_resources/ff38becb-bbd1-41f3-a95e-3a22ddac09d8/38227daf/20241211_policies_boshihoken_143.pdf"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "喫煙・暖めすぎ",
					"anchor": "喫煙・暖めすぎ",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [{
								"text": "政府広報オンライン（SIDSの3つのポイント）では「乳幼児の周囲で誰かがたばこを吸うことは、SIDSの発生率を高くすることがわかっている」とし、妊婦自身の喫煙や、周囲の人が吸ったたばこの副流煙を吸う「受動喫煙」も注意が必要です。",
								"bold": false
							}],
							"children": []
						}, {
							"inline": [{
								"text": "厚労省の検討会報告では「保護者等の習慣的喫煙」「児の暖めすぎ（厚着・重い布団）」も危険因子として挙げられています。",
								"bold": false
							}],
							"children": []
						}]
					}],
					"sources": [{
						"name": "政府広報オンライン-SIDSの発症リスクを低くする3つのポイント",
						"url": "https://www.gov-online.go.jp/article/201710/entry-8129.html"
					}, {
						"name": "厚労省-乳幼児突然死症候群（SIDS）対策に関する検討会報告",
						"url": "https://www.mhlw.go.jp/www1/houdou/1006/h0601-2.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "うつ伏せ寝・添い寝のリスク",
					"anchor": "うつ伏せ寝・添い寝のリスク",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "日本小児科学会の2024年改訂リーフレットに関する見解では、わが国で0歳児の死亡は年間1,500～2,000件生じており、「不慮の事故」の大半が睡眠中の窒息事故であるとし、米国のレジストリ研究を引用して「乳児突然死の",
										"bold": false
									},
									{
										"text": "72%は『安全でない睡眠環境』で発生",
										"bold": true
									},
									{
										"text": "しており、窒息（確定および疑い）例の",
										"bold": false
									},
									{
										"text": "74%は柔らかな寝具（soft-bedding）が関与",
										"bold": true
									},
									{
										"text": "する」と報告されています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "同室別床（同じ部屋で別々の寝床）",
										"bold": true
									},
									{
										"text": "：日本小児科学会の見解が引用する米国小児科学会（AAP）の推奨では、「少なくとも最初の6ヶ月間は、乳児が両親の部屋で、両親のベッドの近くであるが乳児用に設計された別の面（surface）で寝ることが推奨される」とされ、これにより",
										"bold": false
									},
									{
										"text": "SIDSのリスクを最大50%まで減少",
										"bold": true
									},
									{
										"text": "させるとのエビデンスがあるとされています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "添い寝の危険",
										"bold": true
									},
									{
										"text": "：同見解では「添い寝によって覆い被さりや挟み込みが直接死因となり死亡する",
										"bold": false
									},
									{
										"text": "月齢4以下の乳児が多い",
										"bold": true
									},
									{
										"text": "」とされています。こども家庭庁のページでも「大人の身体で赤ちゃんに覆い被さったり、口や鼻を塞いでしまったりする危険がある添い寝には注意をしましょう」とし、特に危険なケースとして ",
										"bold": false
									},
									{
										"text": "①添い寝している人が眠気を引き起こしたり注意力を低下させる薬を服用している場合 ②添い寝している人が飲酒をした場合 ③赤ちゃんが早産や低出生体重で生まれた場合",
										"bold": true
									},
									{
										"text": " を挙げています。",
										"bold": false
									}
								],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "日本小児科学会-乳児の安全な睡眠環境の確保について（2024年改訂見解）",
						"url": "https://www.jpeds.or.jp/society-activities/column/proposals-assertions/50160.html"
					}, {
						"name": "こども家庭庁-赤ちゃんが安全に眠れるように（SIDS）",
						"url": "https://www.cfa.go.jp/policies/boshihoken/kenkou/sids"
					}],
					"mustIds": ["sleep-risk"]
				},
				{
					"level": 2,
					"heading": "沐浴・お風呂のポイント",
					"anchor": "沐浴・お風呂のポイント",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [
								{
									"text": "品川区の公式ページ「赤ちゃんのお世話実演動画のご紹介」では、抱っこ・おむつ交換・",
									"bold": false
								},
								{
									"text": "入浴（沐浴）・お着替え",
									"bold": true
								},
								{
									"text": "のやり方を、公益財団法人母子衛生研究会の動画で段階的に紹介しています。沐浴のポイントとして、動画紹介文に「赤ちゃんの",
									"bold": false
								},
								{
									"text": "沐浴後は保湿ケアをしっかりしましょう",
									"bold": true
								},
								{
									"text": "」と明記されています。",
									"bold": false
								}
							],
							"children": []
						}, {
							"inline": [
								{
									"text": "品川区では、区内在住の",
									"bold": false
								},
								{
									"text": "生後4カ月になる前までの",
									"bold": true
								},
								{
									"text": "赤ちゃんのご家庭を助産師・保健師・児童センター職員などが訪問する「",
									"bold": false
								},
								{
									"text": "すくすく赤ちゃん訪問事業",
									"bold": true
								},
								{
									"text": "」があり、実施要綱では訪問を「生後4か月以内に1回」としています。沐浴の手順や頻度、体調に応じた対応（機嫌・体調が良くない時は湯船に入らず体拭きで代用する等の判断）は、この訪問や各保健センター（品川 03-3474-2225／大井 03-3772-2666／荏原 03-3788-7013）の相談で個別に確認できます。",
									"bold": false
								}
							],
							"children": []
						}]
					}],
					"sources": [{
						"name": "品川区-赤ちゃんのお世話実演動画のご紹介",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/hpg000000789.html"
					}, {
						"name": "品川区-すくすく赤ちゃん訪問事業",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/hpg000022461.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "頭の形：向き癖・後頭部の偏平（絶壁）への対処",
					"anchor": "頭の形-向き癖・後頭部の偏平-絶壁-への対処",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "国立成育医療研究センター（NCCHD）の研究情報では「",
										"bold": false
									},
									{
										"text": "変形性斜頭症",
										"bold": true
									},
									{
										"text": "とは、胎生期や生後の外圧による乳児頭蓋の変形で、後頭部の平坦化を主徴とするものです。治療として、",
										"bold": false
									},
									{
										"text": "体位変換などの理学療法",
										"bold": true
									},
									{
										"text": "や、ヘルメット治療の有効性が示されており、当院では、2011年に『赤ちゃんの頭のかたち外来』を開設し、ヘルメット治療を施行しています」とされています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "京都大学医学部附属病院「赤ちゃんの頭のかたち外来」では、「変形性斜頭・短頭の治療コンセプトは『",
										"bold": false
									},
									{
										"text": "除圧",
										"bold": true
									},
									{
										"text": "』であり、平坦な部分にかかる圧力を除去することが重要です。変形の主な原因が『向き癖』であるため、",
										"bold": false
									},
									{
										"text": "積極的な体位変換（＝向き癖の修正）などの理学療法",
										"bold": true
									},
									{
										"text": "をおこなうことによって頭の変形が改善することがあります。中等症以上の変形では、体位変換だけでは改善がむずかしいことがあり、ヘルメット治療が勧められます」とされています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "実務的な体位変換の工夫：寝かせるたびに",
										"bold": false
									},
									{
										"text": "頭の向きを左右交互に変える",
										"bold": true
									},
									{
										"text": "こと、ベビーベッドの",
										"bold": false
									},
									{
										"text": "頭側・足側を入れ替えて",
										"bold": true
									},
									{
										"text": "寝かせること（赤ちゃんは光や音のある方向に顔を向けるため）。また、赤ちゃんが",
										"bold": false
									},
									{
										"text": "起きている時間",
										"bold": true
									},
									{
										"text": "に、大人が見守りながらうつ伏せで過ごす「",
										"bold": false
									},
									{
										"text": "タミータイム（うつぶせ遊び）",
										"bold": true
									},
									{
										"text": "」を取り入れると、後頭部への圧力がかかる時間を減らせるほか、首や背中の筋肉の発達にも役立るとされています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "ゆがみが改善しない場合・急速に変化した場合は、NCCHDや各病院の「赤ちゃんの頭のかたち外来」（LEDスキャナーによる採型データに基づくヘルメットによる形状誘導療法の導入など）での診断が受けられます。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "NCCHD-変形性斜頭症に対するヘルメット療法 研究情報(PDF)",
							"url": "https://www.ncchd.go.jp/center/information/epidemiology/pdf/hp2021-203.pdf"
						},
						{
							"name": "京都大学医学部附属病院-赤ちゃんの頭のかたち外来",
							"url": "https://keisei.kuhp.kyoto-u.ac.jp/ja/contents/babyhead"
						},
						{
							"name": "NCCHD-形成外科（赤ちゃんの頭のかたち外来）",
							"url": "https://www.ncchd.go.jp/hospital/about/section/geka/keisei.html"
						}
					],
					"mustIds": ["head-shape"]
				},
				{
					"level": 2,
					"heading": "股関節：股関節発育不良（DDH）の観察",
					"anchor": "股関節-股関節発育不良-ddh-の観察",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "日本小児整形外科学会の「股関節脱臼」ページでは、先天性（発育性）股関節脱臼で気になる所見として「",
										"bold": false
									},
									{
										"text": "○股関節の開きが硬い ○太ももやお尻のしわの左右差 ○脚の長さがちがう ○歩き方がおかしい",
										"bold": true
									},
									{
										"text": "」を挙げており、歩き始めてから発見されることもあるとしています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "日本小児整形外科学会（日本小児整形外科学会・日本整形外科超音波学会からの正しい情報を集めた解説）では、日常のケアとして ",
										"bold": false
									},
									{
										"text": "コアラ抱っこ（脚が伸びた状態ではなく、お股を開いた状態のたて抱っこ）",
										"bold": true
									},
									{
										"text": " を心がけること、よこ抱っこやスリングを使う場合は",
										"bold": false
									},
									{
										"text": "お股が開くように注意",
										"bold": true
									},
									{
										"text": "すること、",
										"bold": false
									},
									{
										"text": "おむつの当て方",
										"bold": true
									},
									{
										"text": "（おむつが低い（足先方向にずれた）位置だとサイドギャザーで太ももが開けなくなるため、股関節が自然に開く位置に当てる）ことが紹介されています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "おむつ替え時",
										"bold": true
									},
									{
										"text": "にあぐらの姿勢（仰向けで脚を立ててひざを内側に寄せるM字）にして、",
										"bold": false
									},
									{
										"text": "股関節の開きの左右差",
										"bold": true
									},
									{
										"text": "や",
										"bold": false
									},
									{
										"text": "太もものしわ・脚の長さの左右差",
										"bold": true
									},
									{
										"text": "を観察するとよいとされています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "品川区の「1カ月児健康診査」は",
										"bold": false
									},
									{
										"text": "生後28日目～41日目",
										"bold": true
									},
									{
										"text": "に受診する制度で「身体発育状況、栄養状態、疾病及び異常の有無」などが診られます。股関節の開き（開排）が気になる場合は、この健診の場で医師・保健師に相談します。国立成育医療研究センターの乳幼児健康診査 身体診察マニュアルでは、発育性股関節形成不全の所見として「股関節開排制限」を仰臥位で確認する診察法が定義されています。",
										"bold": false
									}
								],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "日本小児整形外科学会-股関節脱臼",
							"url": "https://www.jpoa.org/disease/dislocation"
						},
						{
							"name": "日本小児整形外科学会-赤ちゃんの股関節脱臼（正しい知識と早期発見のために）",
							"url": "https://www.jpoa.org/news/topics/1585"
						},
						{
							"name": "品川区-産婦健康診査・1カ月児健康診査",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/20260213150439.html"
						}
					],
					"mustIds": ["hip"]
				},
				{
					"level": 2,
					"heading": "発熱：受診の目安（生後3か月未満は早めに）",
					"anchor": "発熱-受診の目安-生後3か月未満は早めに",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "日本小児科学会（厚生労働省研究班監修）の「こどもの救急（ONLINE-QQ）」では、発熱（38℃以上）が「気になる症状」として扱われており、「",
										"bold": false
									},
									{
										"text": "生後3か月未満である",
										"bold": true
									},
									{
										"text": "」が「受診が必要」とされる判定項目の一つとして挙げられています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "神戸大学医学部附属病院の小児科講座の資料でも注意が必要な発熱として「",
										"bold": false
									},
									{
										"text": "乳児期早期（とくに3ヶ月未満）の発熱",
										"bold": true
									},
									{
										"text": "」を挙げ、「生後3カ月未満の発熱に関しては免疫能が未熟、症状が出にくいなどの点から慎重に対応しなければならない」「3ヶ月未満の発熱の場合は入院が必要となることが多い」とされています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "品川区の時間外の相談・受診窓口：子供の健康相談室（小児救急相談）",
										"bold": false
									},
									{
										"text": "#8000",
										"bold": true
									},
									{
										"text": "（IP電話等は 03-5285-8898）、24時間対応の医療機関案内「ひまわり」",
										"bold": false
									},
									{
										"text": "03-5272-0303",
										"bold": true
									},
									{
										"text": "、救急車の要否が迷う時は東京消防庁救急相談センター ",
										"bold": false
									},
									{
										"text": "#7119",
										"bold": true
									},
									{
										"text": "（IP電話は 03-3212-2323）。",
										"bold": false
									}
								],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "日本小児科学会-こどもの救急(ONLINE-QQ)",
							"url": "https://kodomo-qq.jp/index.php?pname=hatsunetsu"
						},
						{
							"name": "神戸大学-こどもの発熱とその対応",
							"url": "https://www.med.kobe-u.ac.jp/pediat/pdf/sirato22.pdf"
						},
						{
							"name": "品川区-休日・夜間の診療",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/kenkou-byouki/kenkou-byouki-kyuzitsu/index.html"
						}
					],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "ぐずり・泣きやまないときの対応",
					"anchor": "ぐずり・泣きやまないときの対応",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "こども家庭庁の「赤ちゃんが泣きやまない～泣きへの理解と対処のために～」では、",
										"bold": false
									},
									{
										"text": "首や体をしっかり支えた状態での「高い高い」や「横向き抱っこ」をして揺らすのは通常のあやしであり、これらでは「乳幼児揺さぶられ症候群」にはならない",
										"bold": true
									},
									{
										"text": "とされており、危険なのは「頭が前後に激しく揺さぶられる状態」です。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "「動画で紹介されている赤ちゃんの泣きへの対処法や、そのほか思いつく方法をすべて試してみましたが、それでも泣きやまない」という質問に対し、同ページでは「",
										"bold": false
									},
									{
										"text": "いろいろ試して、それでも泣きやまないことに（問題はありません）。もし泣きやまないことにイライラしそうなときは、",
										"bold": true
									},
									{
										"text": "」と続き、育児で不安なことや気になることがあったら「",
										"bold": false
									},
									{
										"text": "1人で悩まず、お住まいの市町村窓口やお近くの児童相談所にご相談ください」",
										"bold": true
									},
									{
										"text": "としています。児童相談所の虐待対応ダイヤルは全国共通3桁ダイヤル ",
										"bold": false
									},
									{
										"text": "189（いちはやく）",
										"bold": true
									},
									{
										"text": " で、お住まいの地域の児童相談所に電話がつながります（こども家庭庁）。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "パパ・家族への引き継ぎ：ぐずりが続き自分がイライラしそうな時は、抱っこ交代や赤ちゃんを安全な場所に預けていったん離れることが、乳幼児揺さぶられ症候群の予防の観点から重要です。品川区では",
										"bold": false
									},
									{
										"text": "すくすく赤ちゃん訪問事業",
										"bold": true
									},
									{
										"text": "（生後4カ月になる前までに助産師・保健師が訪問）や各保健センターの予約制乳幼児健康相談で、育児の困りごとを相談できます。",
										"bold": false
									}
								],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "こども家庭庁-赤ちゃんが泣きやまない",
							"url": "https://www.cfa.go.jp/policies/jidougyakutai/nakiyamanai"
						},
						{
							"name": "こども家庭庁-児童相談所虐待対応ダイヤル「189」について",
							"url": "https://www.cfa.go.jp/policies/jidougyakutai/gyakutai-taiou-dial"
						},
						{
							"name": "品川区-すくすく赤ちゃん訪問事業",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/hpg000022461.html"
						}
					],
					"mustIds": []
				}
			]
		},
		{
			"slug": "vaccines",
			"title": "予防接種：いつ打つか・費用・忘れたらどうするか",
			"order": 3,
			"lastVerified": "2026-08-15",
			"sources": [
				{
					"name": "品川区-こどもの予防接種",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000033448.html"
				},
				{
					"name": "品川区-【品川区の予防接種】",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/20240306170455.html"
				},
				{
					"name": "品川区-里帰り出産等の理由により23区の契約医療機関以外で定期予防接種を受ける方",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000024752.html"
				},
				{
					"name": "品川区-子どもの予防接種関係",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-siryo/kuseizyoho-siryo-shinseisyo/hpg000024757.html"
				},
				{
					"name": "品川区-RSウイルス 定期予防接種",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/20230228094752.html"
				},
				{
					"name": "厚労省-予防接種・ワクチン情報",
					"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/yobou-sesshu/index.html"
				},
				{
					"name": "厚労省-5種混合ワクチン",
					"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/yobou-sesshu/vaccine/dpt-ipv-hib/index.html"
				},
				{
					"name": "厚労省-ロタウイルスワクチン",
					"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/yobou-sesshu/vaccine/rota/index.html"
				},
				{
					"name": "厚労省-子どもの肺炎球菌ワクチン",
					"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/yobou-sesshu/vaccine/pneumococcus-child/index.html"
				},
				{
					"name": "厚労省-BCGワクチン",
					"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/yobou-sesshu/vaccine/bcg/index.html"
				},
				{
					"name": "厚労省-MRワクチン",
					"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/yobou-sesshu/vaccine/mr/index.html"
				},
				{
					"name": "厚労省-日本脳炎ワクチン",
					"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/yobou-sesshu/vaccine/japanese-encephalitis/index.html"
				},
				{
					"name": "Pfizer-FAQで学ぶワクチン（接種前に熱がある場合）",
					"url": "https://www.pfizervaccines.jp/learn/faq/17"
				}
			],
			"must": ["vaccines"],
			"description": "予防接種は2か月から始まり、2歳まで続きます",
			"sections": [
				{
					"level": 1,
					"heading": "",
					"anchor": "top",
					"blocks": [{
						"kind": "paragraph",
						"inline": [{
							"text": "予防接種は2か月から始まり、2歳まで続きます。どのワクチンをどの月齢に打つか、どれが無料でどれが有料か、品川区での予約方法、忘れた時の相談先を説明しています。接種した日の夜、赤ちゃんの様子をどう見たらよいかも載せています。",
							"bold": false
						}]
					}],
					"sources": [{
						"name": "品川区-こどもの予防接種",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000033448.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "0〜2歳の予防接種スケジュール",
					"anchor": "0-2歳の予防接種スケジュール",
					"blocks": [
						{
							"kind": "diagram",
							"name": "vaccine-schedule"
						},
						{
							"kind": "paragraph",
							"inline": [{
								"text": "下表は品川区公式ページ「こどもの予防接種」（更新日：令和8年4月1日）の「予防接種スケジュール」表と、厚生労働省の各ワクチン公式ページの標準スケジュールに基づく。品川区では「予防接種を受ける時期になりましたら、予防接種予診票（接種券）をご自宅に送付します」とされている。",
								"bold": false
							}]
						},
						{
							"kind": "table",
							"headers": [
								"予診票送付時期",
								"ワクチン",
								"回数",
								"接種方法（品川区ページの記載）"
							],
							"rows": [
								[
									"出生前（妊娠届提出後）",
									"RSウイルス",
									"1回",
									"妊娠28週0日～36週6日の間に1回（妊婦本人）"
								],
								[
									"生後2カ月",
									"五種混合（ジフテリア・百日せき・破傷風・不活化ポリオ・Hib）",
									"3回",
									"生後2カ月から20日以上の間隔で3回（標準は20～56日の間隔）"
								],
								[
									"生後2カ月",
									"小児用肺炎球菌",
									"最大3回",
									"開始が生後2カ月～6カ月の方は3回（生後24カ月まで）ほか、開始年齢により異なる"
								],
								[
									"生後2カ月",
									"B型肝炎",
									"3回",
									"27日以上間隔で2回、1回目から139日以上間隔で3回目（1歳誕生日の前日まで。標準は生後2～8カ月に3回）"
								],
								[
									"生後2カ月",
									"ロタウイルス（経口）",
									"2〜3回",
									"ロタリックス：生後6週0日～24週0日に2回。ロタテック：生後6週0日～32週0日に3回。1回目は生後14週6日までに開始"
								],
								[
									"生後5カ月",
									"BCG（結核）",
									"1回",
									"満1歳誕生日の前日まで1回（標準は生後5～8カ月）"
								],
								[
									"1歳",
									"五種混合",
									"1回",
									"初回3回完了後、3回目から6か月以上あけて1回（厚労省の標準）"
								],
								[
									"1歳",
									"小児用肺炎球菌",
									"1回",
									"最後の初回接種から60日以上あけて、生後12か月以降に1回（厚労省の標準）"
								],
								[
									"1歳",
									"MR（麻しん・風しん）",
									"1回",
									"1歳～2歳誕生日の前日までに1回"
								],
								[
									"1歳",
									"水痘（水ぼうそう）",
									"2回",
									"1歳～3歳誕生日の前日までに3カ月以上あけて2回（標準は1回目生後12～15カ月、2回目は1回目から6カ月～1年）"
								],
								[
									"3歳・4歳",
									"日本脳炎",
									"3回",
									"3歳で6～28日間の間隔で2回、4歳で1期初回完了後6か月以上あけて1回（7歳6か月前日まで）※3歳以降のため言及のみ"
								]
							]
						},
						{
							"kind": "paragraph",
							"inline": [{
								"text": "※2歳以降は、9歳で日本脳炎2期1回、11歳で二種混合（DT）2期1回、年長でMR2期1回、小学6年（女子）でHPVが品川区の送付表にある。",
								"bold": false
							}]
						}
					],
					"sources": [
						{
							"name": "品川区-こどもの予防接種",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000033448.html"
						},
						{
							"name": "厚労省-予防接種・ワクチン情報",
							"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/yobou-sesshu/index.html"
						},
						{
							"name": "品川区-こどもの予防接種",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000033448.html"
						},
						{
							"name": "厚労省-ロタウイルスワクチン",
							"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/yobou-sesshu/vaccine/rota/index.html"
						},
						{
							"name": "厚労省-BCGワクチン",
							"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/yobou-sesshu/vaccine/bcg/index.html"
						},
						{
							"name": "厚労省-MRワクチン",
							"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/yobou-sesshu/vaccine/mr/index.html"
						},
						{
							"name": "厚労省-日本脳炎ワクチン",
							"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/yobou-sesshu/vaccine/japanese-encephalitis/index.html"
						},
						{
							"name": "厚労省-5種混合ワクチン",
							"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/yobou-sesshu/vaccine/dpt-ipv-hib/index.html"
						},
						{
							"name": "厚労省-子どもの肺炎球菌ワクチン",
							"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/yobou-sesshu/vaccine/pneumococcus-child/index.html"
						}
					],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "接種したらチェック（todo）",
					"anchor": "接種したらチェック-todo",
					"blocks": [{
						"kind": "paragraph",
						"inline": [{
							"text": "打ち終わったワクチンにチェックを入れられます。チェックはこの端末に保存され、次回も残ります。",
							"bold": false
						}]
					}, {
						"kind": "checklist",
						"id": "vaccines",
						"items": [
							{
								"text": "五種混合 1回目（生後2カ月〜）",
								"done": false
							},
							{
								"text": "小児用肺炎球菌 1回目（生後2カ月〜）",
								"done": false
							},
							{
								"text": "B型肝炎 1回目（生後2カ月〜）",
								"done": false
							},
							{
								"text": "ロタウイルス 1回目（生後2カ月〜）",
								"done": false
							},
							{
								"text": "五種混合 2回目（生後3〜4カ月）",
								"done": false
							},
							{
								"text": "小児用肺炎球菌 2回目（生後3〜4カ月）",
								"done": false
							},
							{
								"text": "B型肝炎 2回目（生後3〜4カ月）",
								"done": false
							},
							{
								"text": "ロタウイルス 2回目（生後3〜4カ月）",
								"done": false
							},
							{
								"text": "五種混合 3回目（生後4〜5カ月）",
								"done": false
							},
							{
								"text": "小児用肺炎球菌 3回目（生後4〜5カ月）",
								"done": false
							},
							{
								"text": "B型肝炎 3回目（生後5カ月〜）",
								"done": false
							},
							{
								"text": "ロタウイルス 3回目（ロタテックの場合のみ・生後4〜6カ月）",
								"done": false
							},
							{
								"text": "BCG（生後5〜8カ月）",
								"done": false
							},
							{
								"text": "五種混合 追加（1歳〜）",
								"done": false
							},
							{
								"text": "小児用肺炎球菌 追加（1歳〜）",
								"done": false
							},
							{
								"text": "MR（麻しん・風しん）（1歳〜2歳誕生日前日まで）",
								"done": false
							},
							{
								"text": "水痘 1回目（生後12〜15カ月）",
								"done": false
							},
							{
								"text": "水痘 2回目（1歳〜3歳）",
								"done": false
							},
							{
								"text": "日本脳炎 1期初回 1回目（3歳）",
								"done": false
							},
							{
								"text": "日本脳炎 1期初回 2回目（3歳）",
								"done": false
							},
							{
								"text": "日本脳炎 1期追加（4歳）",
								"done": false
							}
						]
					}],
					"sources": [{
						"name": "品川区-こどもの予防接種",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000033448.html"
					}, {
						"name": "厚労省-予防接種・ワクチン情報",
						"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/yobou-sesshu/index.html"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "生後月齢ごとの目安（0〜2歳）",
					"anchor": "生後月齢ごとの目安-0-2歳",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "生後2か月",
									"bold": true
								}, {
									"text": "：五種混合1回目・小児用肺炎球菌1回目・B型肝炎1回目・ロタウイルス1回目（経口）。4つは同じ日に同時接種が可能とされています。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "生後3か月・4か月頃",
									"bold": true
								}, {
									"text": "：五種混合2・3回目・肺炎球菌2・3回目・B型肝炎2・3回目（各ワクチンの間隔ルールに従い、おおむね1か月おき）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "生後5～8か月",
									"bold": true
								}, {
									"text": "：BCGを1回。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "生後12か月～",
									"bold": true
								}, {
									"text": "：五種混合1期追加（3回目から6か月以上）、肺炎球菌追加（3回目から60日以上）、MR1期（2歳誕生日の前日まで）、水痘1回目（生後12～15カ月）。水痘2回目は1回目から6か月～1年あけて1歳～3歳の間に。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "3歳",
									"bold": true
								}, {
									"text": "：日本脳炎1期初回2回（本章は対象外のため言及のみ。品川区では3歳で予診票送付）。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "品川区-こどもの予防接種",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000033448.html"
					}, {
						"name": "厚労省-予防接種・ワクチン情報",
						"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/yobou-sesshu/index.html"
					}],
					"mustIds": ["vaccines"]
				},
				{
					"level": 2,
					"heading": "定期（I）・任意（II）：どこが無料で、どこにお金がかかるか",
					"anchor": "定期-i-・任意-ii-どこが無料で-どこにお金がかかるか",
					"blocks": [{
						"kind": "paragraph",
						"inline": [{
							"text": "定期（I類）＝原則無料、任意（II類）＝原則自己負担（品川区が一部助成）",
							"bold": true
						}, {
							"text": " です。以下で詳しく説明します。",
							"bold": false
						}]
					}, {
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "定期予防接種（I類）",
									"bold": true
								}, {
									"text": "：予防接種法に基づき市町村（品川区）が実施・費用を負担する接種。品川区は対象者へ個別に予診票（接種券）を郵送し、区内契約医療機関で接種する仕組み。里帰り出産等で23区の契約医療機関以外で定期接種を受けた場合も、品川区は「接種費用の一部または全額を払い戻す」制度を持つ、と公式ページに明記されている（定期接種の費用は区が負う）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "品川区ページは「接種期間を超えての接種は原則として全額自己負担となりますので、ご注意ください」と記載しており、対象年齢（期間）内の定期接種は区民に無料であることが分かる。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "任意予防接種（II類）",
									"bold": true
								}, {
									"text": "：保護者の判断で受けるもので、品川区ページは「任意接種（保護者の判断で接種するかどうか決めるもの）」と定義。原則自己負担だが、品川区は一部を助成。",
									"bold": false
								}],
								"children": [
									{
										"inline": [{
											"text": "MRワクチン",
											"bold": true
										}, {
											"text": "：定期の対象年齢を過ぎて任意接種した2歳から19歳未満は「全額助成＝無料（2回まで）」（定期予防接種を受けられなかった回数のみ）。",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "インフルエンザ",
											"bold": true
										}, {
											"text": "：生後6カ月～高校3年生相当、接種期間10月1日～翌年1月31日。皮下接種は1回2,000円助成（12歳以下は2回まで、13歳以上は1回まで）、経鼻接種（フルミスト）は4,000円助成（2歳以上18歳以下、1回で完了）。",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [
											{
												"text": "おたふくかぜ",
												"bold": true
											},
											{
												"text": "：1歳～年長相当で",
												"bold": false
											},
											{
												"text": "1回あたり3,000円助成（2回まで）",
												"bold": true
											},
											{
												"text": "（品川区の任意接種費用助成の一環）。",
												"bold": false
											}
										],
										"children": []
									}
								]
							}
						]
					}],
					"sources": [{
						"name": "品川区-こどもの予防接種",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000033448.html"
					}, {
						"name": "品川区-里帰り出産等の理由により23区の契約医療機関以外で定期予防接種を受ける方",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000024752.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "品川区での接種方法",
					"anchor": "品川区での接種方法",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "品川区は「予防接種を受ける時期になりましたら、予防接種予診票（接種券）をご自宅に送付します。予診票が届きましたら、親子健康手帳（母子健康手帳）と一緒に実施医療機関に持参し、予防接種を受けましょう」と案内。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "接種場所",
									"bold": true
								}, {
									"text": "：品川区内の契約医療機関（小児科等）。リストは区ページの「こどもの予防接種契約医療機関一覧表（PDF）」。接種は医療機関への予約（「医療機関に接種予約のうえ…接種を受けます」と区ページに案内）が必要。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "持ち物",
									"bold": true
								}, {
									"text": "：予防接種予診票（接種券）＋親子健康手帳（母子健康手帳）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "保護者が同伴できない場合",
									"bold": true
								}, {
									"text": "：普段からお子さんの健康状態をよく知っている方が、保護者が記入した「委任状」を持参すれば同伴可能（同伴者は「委任状」と「予診票」を持参し、医師診察後の同意時に署名）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "予診票を紛失・転入した方",
									"bold": true
								}, {
									"text": "：前の住所地の予診票は使えず、品川区電子申請サービスでの「こどもの予防接種予診票交付申請」が必要（母子健康手帳の出生届出済証明のページと予防接種記録のページの画像を添付）。3～4営業日で郵送。急ぎの場合は母子健康手帳を持って窓口で即時発行（品川区保健予防課〈区役所7F 広町2-1-36〉、品川・大井・荏原の各保健センター。いずれも午前8時30分～午後5時、土日祝・年末年始を除く。荏原保健センターは仮移転先 西五反田6-6-6）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "23区外で定期接種（里帰り出産・入院等）",
									"bold": true
								}, {
									"text": "：事前に「予防接種依頼書交付申請」をして予防接種依頼書を受領し、接種後に費用の一部または全額の払い戻し（助成申請）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "問い合わせ",
									"bold": true
								}, {
									"text": "：品川区保健予防課（予防接種担当）電話 03-5742-9152（FAX 03-5742-6013）、品川保健センター 03-3474-2225、大井保健センター 03-3772-2666、荏原保健センター 03-3788-7013。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "品川区-こどもの予防接種",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000033448.html"
						},
						{
							"name": "品川区-【品川区の予防接種】",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/20240306170455.html"
						},
						{
							"name": "品川区-RSウイルス 定期予防接種",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/20230228094752.html"
						},
						{
							"name": "品川区-子どもの予防接種関係",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-siryo/kuseizyoho-siryo-shinseisyo/hpg000024757.html"
						},
						{
							"name": "品川区-里帰り出産等の理由により23区の契約医療機関以外で定期予防接種を受ける方",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000024752.html"
						}
					],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "接種を忘れた・遅れた場合",
					"anchor": "接種を忘れた・遅れた場合",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "期間内の接種を逃したとき",
									"bold": true
								}, {
									"text": "：品川区ページは「接種期間を超えての接種は原則として全額自己負担となりますので、ご注意ください」と案内しているため、対象期間内に受けることが原則。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "長期療養の特別の事情がある場合",
									"bold": true
								}, {
									"text": "：品川区ページは「長期療養を必要とする疾病にかかった等の特別の事情により、やむを得ず定期予防接種の対象期間内にその予防接種を受けることができなかったと認められた方は、対象年齢を過ぎていても、特別な事情がなくなった日から2年間は、接種できなかった予防接種を定期接種として受けられる」という趣旨で案内（長期療養特例）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "予診票が間に合わなかった・失くした",
									"bold": true
								}, {
									"text": "：品川区電子申請サービスで交付申請（母子健康手帳の画像データが必要）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "MR（麻しん・風しん）を定期の対象年齢で受けそこねた場合",
									"bold": true
								}, {
									"text": "：2歳から19歳未満の任意接種を品川区が全額助成（＝無料、2回まで）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "相談先",
									"bold": true
								}, {
									"text": "：接種可否・追いつき（キャッチアップ）の時期の相談は品川区保健予防課（予防接種担当）03-5742-9152、または品川・大井・荏原の各保健センター（電話番号は前節）。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "品川区-こどもの予防接種",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000033448.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "接種前後の注意",
					"anchor": "接種前後の注意",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "発熱・体調が心配な場合",
										"bold": true
									},
									{
										"text": "：厚生労働省の各ワクチン公式ページ（予防接種ガイドライン）では、「明らかな発熱を呈している方」「重篤な急性疾患にかかっていることが明らかな方」「その予防接種の成分でアナフィラキシーを起こしたことがある方」などが",
										"bold": false
									},
									{
										"text": "接種不適当者",
										"bold": true
									},
									{
										"text": "として挙げられ、接種を行わないこととされている。また、接種の判断に注意を要する",
										"bold": false
									},
									{
										"text": "接種要注意者",
										"bold": true
									},
									{
										"text": "も定められており、接種判断は接種医療機関の医師が行う。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "当日朝",
									"bold": true
								}, {
									"text": "：自宅で一度検温してから受診するよう推奨（医療機関でも検温）。厚労省は37.5℃以上を発熱のひとつの目安とする一方、体温調節機能が未熟な小児・幼児は37.5℃以上でも元気になることがよくあるため、接種に不安がある場合はお子さんの様子を知っている医師に相談する、とされている。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "接種後",
									"bold": true
								}, {
									"text": "：発熱や接種部位の発赤・腫れなどの副反応が出ることがある。気になる変化・症状がある場合は接種した医療機関に相談。定期予防接種の副反応については「予防接種健康被害救済制度」（健康被害が接種によるものであると厚生労働大臣が認定したとき給付を受けることができる制度）がある、と品川区ページも案内している。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "厚労省-5種混合ワクチン",
							"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/kekkaku-kansenshou/yobou-sesshu/vaccine/dpt-ipv-hib/index.html"
						},
						{
							"name": "Pfizer-FAQで学ぶワクチン（接種前に熱がある場合）",
							"url": "https://www.pfizervaccines.jp/learn/faq/17"
						},
						{
							"name": "品川区-こどもの予防接種",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000033448.html"
						},
						{
							"name": "品川区-RSウイルス 定期予防接種",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/20230228094752.html"
						}
					],
					"mustIds": []
				}
			]
		},
		{
			"slug": "checkups",
			"title": "健診と、受診すべきサイン",
			"order": 4,
			"lastVerified": "2026-08-15",
			"sources": [
				{
					"name": "品川区-乳幼児の健康診査・相談",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"
				},
				{
					"name": "品川区-産婦健康診査・1カ月児健康診査",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/20260213150439.html"
				},
				{
					"name": "品川区-休日・夜間の診療",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/kenkou-byouki/kenkou-byouki-kyuzitsu/index.html"
				},
				{
					"name": "厚労省-乳幼児に対する健康診査の実施について(平成10年児発第285号)",
					"url": "https://www.mhlw.go.jp/web/t_doc?dataId=00ta9663&dataType=1&pageNo=1"
				},
				{
					"name": "NCCHD-乳幼児健康診査 身体診察マニュアル",
					"url": "https://www.ncchd.go.jp/center/activity/kokoro_jigyo/manual.pdf"
				},
				{
					"name": "NCCHD-斜視",
					"url": "https://www.ncchd.go.jp/hospital/sickness/children/019.html"
				},
				{
					"name": "NCCHD-眼科",
					"url": "https://www.ncchd.go.jp/hospital/about/section/geka/ganka.html"
				},
				{
					"name": "AMED-視覚聴覚二重障害の医療 診療マニュアル",
					"url": "https://dbmedj.org/manual/chapter/ch3-2/index.html"
				},
				{
					"name": "日本産婦人科医会-視覚スクリーニングの実際",
					"url": "https://www.jaog.or.jp/note/%EF%BC%884%EF%BC%89%E8%A6%96%E8%A6%9A%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E3%81%AE%E5%AE%9F%E9%9A%9B"
				},
				{
					"name": "日本小児科学会-こどもの救急(ONLINE-QQ)",
					"url": "https://kodomo-qq.jp/index.php?pname=hatsunetsu"
				},
				{
					"name": "神戸大学-こどもの発熱とその対応",
					"url": "https://www.med.kobe-u.ac.jp/pediat/pdf/sirato22.pdf"
				}
			],
			"must": ["eyes"],
			"description": "品川区では、1か月、4か月、6〜7か月、9〜10か月、1歳6か月、3歳に健診があります",
			"sections": [
				{
					"level": 1,
					"heading": "",
					"anchor": "top",
					"blocks": [{
						"kind": "paragraph",
						"inline": [{
							"text": "品川区では、1か月、4か月、6〜7か月、9〜10か月、1歳6か月、3歳に健診があります。いつどこへ行き、何を調べるのか、目や発熱で受診すべきサインまで説明しています。",
							"bold": false
						}]
					}],
					"sources": [{
						"name": "品川区-乳幼児の健康診査・相談",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "品川区の乳幼児健診スケジュール",
					"anchor": "品川区の乳幼児健診スケジュール",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "品川区の公式ページ（更新日：令和7年5月7日）の健診スケジュールは以下のとおりです。",
									"bold": false
								}],
								"children": [
									{
										"inline": [{
											"text": "1カ月児健診",
											"bold": true
										}, {
											"text": "：生後28日～41日目まで",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "4カ月児健診",
											"bold": true
										}, {
											"text": "：4カ月頃（各保健センター、午前）",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "6～7カ月児健診",
											"bold": true
										}, {
											"text": "：6～7カ月の間（都内契約医療機関）",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "9～10カ月児健診",
											"bold": true
										}, {
											"text": "：9～10カ月の間（都内契約医療機関）",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "1歳6カ月児健診",
											"bold": true
										}, {
											"text": "：1歳7カ月前後（各保健センター、午後）",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "3歳児健診",
											"bold": true
										}, {
											"text": "：3歳4カ月前後（各保健センター、午後、目の検査（屈折検査）も実施）",
											"bold": false
										}],
										"children": []
									}
								]
							},
							{
								"inline": [{
									"text": "実施場所は品川・大井・荏原の3つの保健センター。「お住まいの地域によって、管轄の保健センターが異なります」（管轄一覧表を区サイトで確認）。管轄外の保健センターでも受診できます。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "予約・案内：「案内通知は、受診日の前月上旬に郵送します。予約制のため人数制限がありますので、希望に添えない場合があります」。受診日の変更は案内通知到着後に管轄保健センターへ連絡します。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [
									{
										"text": "持ち物：区ページで持ち物の明示があるのは6～7カ月健診で「医療機関にお問い合わせの上、",
										"bold": false
									},
									{
										"text": "親子健康手帳（母子健康手帳）と受診票",
										"bold": true
									},
									{
										"text": "を持参し、ご受診ください」。厚労省の乳幼児健康診査実施要綱では健診時に「母子健康手帳の内容を参考とし、それまでの発達状況等を保護者の記録も含めて確認」することとされています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "6～7カ月・9～10カ月の受診票は4カ月児健診で配布されます（「4カ月児健診で、6～7カ月児健診受診票・9～10カ月児健診受診票を配布します」）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "健診の費用は区ページに明記されていません。厚労省の実施要綱では委託医療機関は健診の費用を健康診査票により市町村に請求する仕組み（公費で決済される仕組み）です。自己負担の有無は区に確認してください。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "保健センターの電話（品川区公式ページより）：",
									"bold": false
								}],
								"children": [
									{
										"inline": [{
											"text": "品川保健センター 03-3474-2225（北品川3-11-22）",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "大井保健センター 03-3772-2666（大井2-27-20）",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "荏原保健センター 03-3788-7013（荏原2-9-6）",
											"bold": false
										}],
										"children": []
									}
								]
							},
							{
								"inline": [{
									"text": "保健センターでは、予約制の乳幼児健康相談・発達健診・心理相談（「ことばが遅い、落ち着きがないなどの相談」）も実施しています。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "品川区-乳幼児の健康診査・相談",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"
					}, {
						"name": "厚労省-乳幼児に対する健康診査の実施について(平成10年児発第285号)",
						"url": "https://www.mhlw.go.jp/web/t_doc?dataId=00ta9663&dataType=1&pageNo=1"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "1か月児健診（生後28日～41日目）と産婦健診",
					"anchor": "1か月児健診-生後28日-41日目-と産婦健診",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "品川区では「1か月児健康診査の公費助成を実施しています」。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [
									{
										"text": "受診時期と回数：",
										"bold": false
									},
									{
										"text": "生後28日目～41日目までに1回",
										"bold": true
									},
									{
										"text": "（区ページでは「1カ月児健診：生後28日～41日目まで」）。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "対象：品川区に住民登録があり、受診結果の区への提出に同意する方。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "内容（区ページ原文）：「身体発育状況、栄養状態、疾病及び異常の有無、新生児聴覚検査、先天性代謝異常検査の実施状況の確認、ビタミンK2投与の実施状況の確認及び必要に応じて投与、育児上問題となる事項」。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [
									{
										"text": "費用：",
										"bold": false
									},
									{
										"text": "6,000円を上限に公費助成",
										"bold": true
									},
									{
										"text": "（「6,000円を上限に助成します。上限を超えた場合…は自己負担となります」）。受診票は母子健康手帳交付時に渡す「親と子の保健バック」に入っています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "母体の「産婦健康診査」も対象：産後概ね2週間と概ね1カ月の",
										"bold": false
									},
									{
										"text": "合計2回",
										"bold": true
									},
									{
										"text": "（原則、出産後2か月以内）まで、1回につき",
										"bold": false
									},
									{
										"text": "5,000円を上限",
										"bold": true
									},
									{
										"text": "に助成。内容は問診・診察・体重測定・血圧測定・尿検査・母体の回復状況・乳房の状態の確認と、心の健康のためのアンケートです。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "問い合わせ：1か月児健診は品川保健センター 保健事業係 03-3474-2221、産婦健診は健康課 保健衛生担当 03-5742-6745。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "品川区-産婦健康診査・1カ月児健康診査",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/20260213150439.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "健診で見る項目",
					"anchor": "健診で見る項目",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "厚労省の乳幼児健康診査実施要綱（母子保健法第12・13条に基づく）で、",
										"bold": false
									},
									{
										"text": "1歳6か月児",
										"bold": true
									},
									{
										"text": "（満1歳6か月を超え満2歳に達しない幼児）の一般健康診査項目は、①身体発育状況 ②栄養状態 ③脊柱及び胸郭の疾病及び異常の有無 ④皮膚の疾病の有無 ⑤四肢運動障害の有無 ⑥精神発達の状況 ⑦言語障害の有無 ⑧予防接種の実施状況 ⑨育児上問題となる事項（生活習慣の自立、社会性の発達、しつけ、食事、事故等）⑩その他の疾病及び異常の有無。目的は「運動機能、視聴覚等の障害、精神発達の遅滞等障害を持った児童を早期に発見」することです。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "股関節",
									"bold": true
								}, {
									"text": "：国立成育医療研究センター（NCCHD）の乳幼児健康診査 身体診察マニュアルでは、発育性股関節形成不全（先天性股関節脱臼）の所見として「股関節開排制限」を診ており、仰臥位で股関節・膝関節を90度～100度に曲げ、股関節を開いたときの床からの角度が20度以上ある場合を陽性とします。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "心雑音",
									"bold": true
								}, {
									"text": "：同マニュアルでは「顔面蒼白や眼瞼結膜の蒼白がある場合や明らかな頻脈、心尖部および心基部の収縮期雑音が聴取される場合には、精密検査のため医療機関を紹介する」とされています。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "聴覚",
									"bold": true
								}, {
									"text": "：母子健康手帳に新生児聴覚スクリーニングの結果が記載されているか確認し、「両耳リファー」などの記載がある場合は精密聴覚検査機関の受診を確認します。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "1か月児健診",
									"bold": true
								}, {
									"text": "では、新生児聴覚検査・先天性代謝異常検査（マススクリーニング）の結果確認と、必要に応じたビタミンK2の投与も行われます（品川区ページ）。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "厚労省-乳幼児に対する健康診査の実施について(平成10年児発第285号)",
							"url": "https://www.mhlw.go.jp/web/t_doc?dataId=00ta9663&dataType=1&pageNo=1"
						},
						{
							"name": "NCCHD-乳幼児健康診査 身体診察マニュアル",
							"url": "https://www.ncchd.go.jp/center/activity/kokoro_jigyo/manual.pdf"
						},
						{
							"name": "品川区-産婦健康診査・1カ月児健康診査",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/20260213150439.html"
						}
					],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "目の問題：レッドリフレックスと斜視・弱視の早期発見",
					"anchor": "目の問題-レッドリフレックスと斜視・弱視の早期発見",
					"blocks": [{
						"kind": "paragraph",
						"inline": [{
							"text": "乳幼児の目は0〜2歳の感受性の高い時期に病気が起こると回復しにくい弱視になりやすいため、公的ガイドでは早期発見が強調されています。",
							"bold": false
						}]
					}],
					"sources": [{
						"name": "NCCHD-眼科",
						"url": "https://www.ncchd.go.jp/hospital/about/section/geka/ganka.html"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "レッドリフレックス（赤反射）チェック",
					"anchor": "レッドリフレックス-赤反射-チェック",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "NCCHDの乳幼児健康診査 身体診察マニュアル（コラム3）の定義：「直像鏡（検影器）を使用して眼底からの反射を瞳孔から観察する方法であり、角膜混濁、白内障、網膜芽細胞腫、網膜剥離などの疑いのある児を簡便に検出できる有効な方法である。両眼から同じ大きさの黄橙色の明るい反射が観察できれば正常である」。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "判定：「左右眼いずれかでも反射が観察できない児は、早急に眼科での精密検査を勧告する」。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "日本産婦人科医会の研修ノート（新生児・乳幼児の視覚スクリーニング）でも、1か月児健診・乳幼児健診での診察項目として「Red reflex 法」が挙げられており、「片方の反射が暗い場合には、強度の屈折異常が疑われる。片方の反射がない場合には、そちらの眼に白内障などの器質的疾患がある可能性が高い」としています。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "NCCHD-乳幼児健康診査 身体診察マニュアル",
						"url": "https://www.ncchd.go.jp/center/activity/kokoro_jigyo/manual.pdf"
					}, {
						"name": "日本産婦人科医会-視覚スクリーニングの実際",
						"url": "https://www.jaog.or.jp/note/%EF%BC%884%EF%BC%89%E8%A6%96%E8%A6%9A%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E3%81%AE%E5%AE%9F%E9%9A%9B"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "斜視・弱視の早期発見の重要性",
					"anchor": "斜視・弱視の早期発見の重要性",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "NCCHDの斜視の解説（ページ原文）：「視覚刺激に対する感受性の高い乳幼児期に斜視が起こると、斜視の眼に抑制がかかって視力の発達が阻害されて弱視になります。また両眼で物を同時に見て奥行き感や立体感をとらえる能力、すなわち両眼視機能…が発達しません」。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "「斜視の症状として視線のずれのほか、頭位異常（頭をかしげている、顔を曲げている、顎を上げている等）や片目つぶりが目立つことがあります。気になる症状があれば、ぜひ早めに眼科を受診してください」。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "「乳児内斜視など早期に発症する斜視は、両眼視機能の発達が阻害されやすく、両眼視を獲得するためには早期に診断して眼位を矯正する治療（手術、眼鏡、プリズム治療）を行う必要があります」。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "NCCHD眼科ページでは「とくに0～2歳は視覚刺激への感受性が高いため、目の病気が起こると高度の弱視になってしまいます」としています。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "NCCHD-斜視",
						"url": "https://www.ncchd.go.jp/hospital/sickness/children/019.html"
					}, {
						"name": "NCCHD-眼科",
						"url": "https://www.ncchd.go.jp/hospital/about/section/geka/ganka.html"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "発見されやすい年齢とサイン",
					"anchor": "発見されやすい年齢とサイン",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [{
								"text": "厚生労働科学研究（AMED）の診療マニュアル（視覚異常の早期発見と眼科健診）より：",
								"bold": false
							}],
							"children": [
								{
									"inline": [
										{
											"text": "固視・追視（物をじっと見つめたり、目で追うしぐさ）がはっきり観察されるようになるのは",
											"bold": false
										},
										{
											"text": "生後2か月頃",
											"bold": true
										},
										{
											"text": "。親御さんの顔を見ない、視線が合わない、表情や反応が乏しければ両眼の眼疾患を疑います。",
											"bold": false
										}
									],
									"children": []
								},
								{
									"inline": [{
										"text": "生後3か月以降",
										"bold": true
									}, {
										"text": "になると、見る反応が乏しい、目の揺れ（眼振）、目の動きの異常、片目の視線がずれている（斜視）、顔を曲げて見る（頭位異常）などの異常サインがはっきりしてきます。",
										"bold": false
									}],
									"children": []
								},
								{
									"inline": [
										{
											"text": "乳児内斜視が顕性化するのは",
											"bold": false
										},
										{
											"text": "生後2～4か月頃",
											"bold": true
										},
										{
											"text": "で、「2～3カ月放置すると、両眼視機能（立体視）獲得するチャンスが極めて少なくなります」。",
											"bold": false
										}
									],
									"children": []
								},
								{
									"inline": [
										{
											"text": "「弱視の有病率は約2%」で、3歳児健診の眼科健診（視力検査で",
											"bold": false
										},
										{
											"text": "左右眼いずれかでも0.5が確認できなかった児",
											"bold": true
										},
										{
											"text": "は眼科精密検査が勧告）で発見されれば、矯正眼鏡と弱視訓練によって就学までに治癒することが多いとされています。視覚の感受性期間は6～8歳までで、過ぎると不可逆的な視力障害となります。",
											"bold": false
										}
									],
									"children": []
								}
							]
						}, {
							"inline": [{
								"text": "品川区の3歳児健診では「目の検査（屈折検査）も実施しています」（品川区公式ページ）。",
								"bold": false
							}],
							"children": []
						}]
					}],
					"sources": [{
						"name": "AMED-視覚聴覚二重障害の医療 診療マニュアル",
						"url": "https://dbmedj.org/manual/chapter/ch3-2/index.html"
					}, {
						"name": "品川区-乳幼児の健康診査・相談",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"
					}],
					"mustIds": ["eyes"]
				},
				{
					"level": 2,
					"heading": "気になる症状：発熱と受診の目安",
					"anchor": "気になる症状-発熱と受診の目安",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [
								{
									"text": "日本小児科学会（厚生労働省研究班監修）の「こどもの救急（ONLINE-QQ）」では、",
									"bold": false
								},
								{
									"text": "発熱（38℃以上）",
									"bold": true
								},
								{
									"text": "が「気になる症状」として扱われており、その判定項目に「",
									"bold": false
								},
								{
									"text": "生後3か月未満である",
									"bold": true
								},
								{
									"text": "」が「受診が必要」とされる項目の一つとして挙げられています（元気がなくぐったりしている、呼吸があらく苦しそう、顔色・皮膚色が悪い、ずっとうとうとしている と並ぶ）。",
									"bold": false
								}
							],
							"children": []
						}, {
							"inline": [
								{
									"text": "神戸大学医学部附属病院の小児科講座の資料（こどもの発熱とその対応）でも、注意が必要な発熱として「",
									"bold": false
								},
								{
									"text": "乳児期早期（とくに3ヶ月未満）の発熱",
									"bold": true
								},
								{
									"text": "」を挙げ、「生後3カ月未満の発熱に関しては免疫能が未熟、症状が出にくいなどの点から慎重に対応しなければならない」「3ヶ月未満の発熱の場合は入院が必要となることが多い」としています。",
									"bold": false
								}
							],
							"children": []
						}]
					}],
					"sources": [{
						"name": "日本小児科学会-こどもの救急(ONLINE-QQ)",
						"url": "https://kodomo-qq.jp/index.php?pname=hatsunetsu"
					}, {
						"name": "神戸大学-こどもの発熱とその対応",
						"url": "https://www.med.kobe-u.ac.jp/pediat/pdf/sirato22.pdf"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "品川区の時間外の救急・相談窓口",
					"anchor": "品川区の時間外の救急・相談窓口",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "子供の健康相談室（小児救急相談）#8000",
									"bold": true
								}, {
									"text": "（IP電話などは03-5285-8898）：小児科医師・看護師が電話で相談に応じます。受付は平日（休日・年末年始を除く）18時～翌8時、土日祝・年末年始は8時～翌8時。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "品川区こども夜間救急室",
									"bold": true
								}, {
									"text": "（昭和医科大学病院 中央棟4階、旗の台1-5-8）電話 03-3784-8181：平日夜間20時～23時（受付22時30分まで）、第2・第4土曜日夜間17時～22時（受付21時まで）。外傷には対応できません。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "第1・第3・第5土曜日夜間（17時～22時）は品川区医師会休日診療所（内科・小児科、北品川3-7-25、03-3450-7650）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "24時間対応の医療機関案内「ひまわり」03-5272-0303、救急車の要否が迷うときは東京消防庁救急相談センター #7119（IP電話は03-3212-2323）。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "品川区-休日・夜間の診療",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/kenkou-byouki/kenkou-byouki-kyuzitsu/index.html"
					}],
					"mustIds": []
				}
			]
		},
		{
			"slug": "complementary-feeding",
			"title": "離乳食",
			"order": 5,
			"lastVerified": "2026-08-15",
			"sources": [
				{
					"name": "こども家庭庁「授乳や離乳について」（『授乳・離乳の支援ガイド』(平成31(2019)年3月) を掲載する公式ページ）",
					"url": "https://www.cfa.go.jp/policies/boshihoken/junyuu"
				},
				{
					"name": "『授乳・離乳の支援ガイド』2019年3月 全文PDF（石川県ホームページの公式PDFミラー。こども家庭庁の掲載PDFと同一文書）",
					"url": "https://www.pref.ishikawa.lg.jp/kosodate/syokuiku/2018/documents/jyunyuurinyuunosiengaido201903.pdf"
				},
				{
					"name": "厚生労働省「はちみつを与えるのは1歳を過ぎてから」（乳児ボツリヌス症）",
					"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000161461.html"
				},
				{
					"name": "消費者庁「食品による子どもの窒息・誤嚥(ごえん)事故に注意!」（硬い豆やナッツ類は5歳以下には食べさせないで）",
					"url": "https://www.caa.go.jp/policies/policy/consumer_safety/caution/caution_047"
				},
				{
					"name": "消費者庁「はちみつに含まれる菌による乳児ボツリヌス症に注意してください」",
					"url": "https://www.caa.go.jp/policies/policy/consumer_safety/food_safety/food_safety_portal/microorganism_virus/contents_001"
				},
				{
					"name": "日本小児科学会「食品による窒息 子どもを守るためにできること」（2025年8月31日改訂 Ver.3）",
					"url": "https://www.jpeds.or.jp/society-activities/column/proposals-assertions/50123.html"
				},
				{
					"name": "国立成育医療研究センター「食物アレルギー 診療の手引き・発症予防」",
					"url": "https://www.foodallergy.jp/care-guide/prevention-onset"
				},
				{
					"name": "国立成育医療研究センター「鶏卵の摂取開始時期について」",
					"url": "https://www.ncchd.go.jp/hospital/about/section/allergy/keiran_sessyu.html"
				},
				{
					"name": "日本アレルギー学会「ピーナッツアレルギーに関するコンセンサスステートメント」",
					"url": "https://www.jsaweb.jp/modules/news_topics/index.php?content_id=217"
				},
				{
					"name": "国民生活センター「2020年度 消費者から見た事故の防止（縮刷版）」",
					"url": "https://www.kokusen.go.jp/mimamori/pdf/support_FY2020all.pdf"
				}
			],
			"must": [],
			"description": "離乳食は、生後5〜6か月頃から始めます",
			"sections": [
				{
					"level": 1,
					"heading": "",
					"anchor": "top",
					"blocks": [{
						"kind": "paragraph",
						"inline": [{
							"text": "離乳食は、生後5〜6か月頃から始めます。進め方の目安、鉄分のとり方、食物アレルギー、窒息の予防まで説明しています。",
							"bold": false
						}]
					}],
					"sources": [{
						"name": "こども家庭庁「授乳や離乳について」（『授乳・離乳の支援ガイド』）",
						"url": "https://www.cfa.go.jp/policies/boshihoken/junyuu"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "離乳とは",
					"anchor": "離乳とは",
					"blocks": [{
						"kind": "paragraph",
						"inline": [{
							"text": "「離乳」とは、母乳または育児用ミルクなどの乳汁だけでは不足してくるエネルギーや栄養素を補うために、乳汁から幼児食に移行する過程をいいます。その間に与えられる食事を離乳食といい、この時期に「吸って飲む」ことではなく「噛んで食べる」力が育っていきます。",
							"bold": false
						}]
					}],
					"sources": [{
						"name": "授乳・離乳の支援ガイド(平成31(2019)年3月)",
						"url": "https://www.pref.ishikawa.lg.jp/kosodate/syokuiku/2018/documents/jyunyuurinyuunosiengaido201903.pdf"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "開始時期（いつから始めるか）",
					"anchor": "開始時期-いつから始めるか",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "厚生労働省の「授乳・離乳の支援ガイド」(2019年改定) では、離乳開始は",
										"bold": false
									},
									{
										"text": "生後5〜6か月頃",
										"bold": true
									},
									{
										"text": "が適切とされています。ただし、子どもの成長・発達は個人差があるため、月齢はあくまで目安として、お子さんの「食べたい」サインを見ながら進めることが重要とされています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "離乳開始の目安（お子さんの発達状況）：",
									"bold": false
								}],
								"children": [
									{
										"inline": [{
											"text": "首がすわり、寝返りがうてる",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "支えがあると5秒以上すわる",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "スプーンなどを口に入れても舌で押し出すことが少なくなってきた",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "食べ物に興味を示す",
											"bold": false
										}],
										"children": []
									}
								]
							},
							{
								"inline": [{
									"text": "離乳の開始とは、なめらかにすりつぶした状態の食物を初めて与えたときを指します。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "授乳・離乳の支援ガイド(平成31(2019)年3月)",
						"url": "https://www.pref.ishikawa.lg.jp/kosodate/syokuiku/2018/documents/jyunyuurinyuunosiengaido201903.pdf"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "注：離乳のガイドは2023年に改定されました",
					"anchor": "注-離乳のガイドは2023年に改定されました",
					"blocks": [{
						"kind": "paragraph",
						"inline": [
							{
								"text": "本マニュアルの調査時点（2026年8月）において、公式に存在する最新版は",
								"bold": false
							},
							{
								"text": "2019年3月（平成31年）改定",
								"bold": true
							},
							{
								"text": "の「授乳・離乳の支援ガイド」です（こども家庭庁のページにPDFが掲載されています）。「2023年改定版」という改訂は確認できませんでした。",
								"bold": false
							}
						]
					}],
					"sources": [{
						"name": "こども家庭庁「授乳や離乳について」",
						"url": "https://www.cfa.go.jp/policies/boshihoken/junyuu"
					}, {
						"name": "授乳・離乳の支援ガイド(2019年3月)",
						"url": "https://www.pref.ishikawa.lg.jp/kosodate/syokuiku/2018/documents/jyunyuurinyuunosiengaido201903.pdf"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "進め方の目安（初期・中期・後期・完了期）",
					"anchor": "進め方の目安-初期・中期・後期・完了期",
					"blocks": [{
						"kind": "table",
						"headers": [
							"時期",
							"月齢",
							"1日の回数",
							"食形態の目安",
							"穀類の量（2019年ガイド目安表）"
						],
						"rows": [
							[
								"離乳初期",
								"生後5〜6か月頃",
								"1日1回",
								"なめらかにすりつぶした状態（ポタージュ状→ヨーグルト状）",
								"1さじずつ開始し50〜80g（つぶしがゆか全がゆ）"
							],
							[
								"離乳中期",
								"生後7〜8か月頃",
								"1日2回",
								"舌でつぶせる硬さ",
								"全がゆ90g→軟飯80g"
							],
							[
								"離乳後期",
								"生後9〜11か月頃",
								"1日3回",
								"歯ぐきでつぶせる硬さ",
								"軟飯90g→ご飯80g"
							],
							[
								"離乳完了期",
								"生後12〜18か月頃",
								"1日3回＋おやつ1〜2回",
								"歯ぐきで噛める硬さ",
								"ご飯80g"
							]
						]
					}, {
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "量はあくまで目安です。子どもの食欲や成長・発達の状況に応じて、1日の回数を調整してください。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "新しい食品を始めるときは、離乳食用のスプーンで1さじずつ与え、子どもの様子を見ながら量を増やします。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "2019年改定版の目安表では、「又は卵」の行は離乳初期に「卵黄1個」、離乳中期に「全卵1/3」、離乳後期に「全卵1/2」、離乳完了期に「全卵1/2〜2/3」とされています。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "授乳・離乳の支援ガイド(2019年3月)",
						"url": "https://www.pref.ishikawa.lg.jp/kosodate/syokuiku/2018/documents/jyunyuurinyuunosiengaido201903.pdf"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "鉄分は先に（母乳育児と鉄）",
					"anchor": "鉄分は先に-母乳育児と鉄",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "2019年改定版の「授乳・離乳の支援ガイド」では、母乳育児の場合、生後6か月の時点でヘモグロビン濃度が低く",
										"bold": false
									},
									{
										"text": "鉄欠乏を生じやすい",
										"bold": true
									},
									{
										"text": "との報告があるとして、離乳開始の適切な時期とあわせて、鉄（およびビタミンD）を含む食品を意識的に取り入れることが重要とされています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "離乳中期以降は、赤身の肉・魚やレバーなどのヘム鉄を含む食品を活用すると、効率よく鉄を補えます。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "離乳開始はアレルギーの心配が少ないおかゆ（米）から始めるのが基本ですが、離乳の進行に伴って鉄を含む食品（赤身肉・レバー・赤身の魚など）を積極的に取り入れてください。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "授乳・離乳の支援ガイド(2019年3月)",
						"url": "https://www.pref.ishikawa.lg.jp/kosodate/syokuiku/2018/documents/jyunyuurinyuunosiengaido201903.pdf"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "食物アレルギーと早期摂取（ピーナッツ・卵）",
					"anchor": "食物アレルギーと早期摂取-ピーナッツ・卵",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "「授乳・離乳の支援ガイド」(2019年) は、食物アレルギーの発症を心配して離乳の開始や特定の食物の摂取開始を",
										"bold": false
									},
									{
										"text": "遅らせても予防効果があるという科学的根拠はない",
										"bold": true
									},
									{
										"text": "としています。生後5〜6か月頃から離乳を始めるように情報提供し、食物アレルギーが疑われる症状がみられた場合は自己判断で対応せず、必ず医師の診断に基づいて進めることが必要です。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "ピーナッツ",
										"bold": true
									},
									{
										"text": "：国立成育医療研究センター（食物アレルギー 診療の手引き）は、ピーナッツの摂取開始の遅延がアレルギー発症のリスクを高める可能性があることから、乳児期早期（",
										"bold": false
									},
									{
										"text": "生後4〜10か月",
										"bold": true
									},
									{
										"text": "）にピーナッツを含む食品の摂取を開始することが推奨されるとしています。日本アレルギー学会のコンセンサスステートメント（ピーナッツアレルギーの多い国での研究をもとに）は、乳児期の早期（",
										"bold": false
									},
									{
										"text": "4〜11か月",
										"bold": true
									},
									{
										"text": "）にピーナッツを含む食品の摂取を開始することを推奨しています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "卵",
										"bold": true
									},
									{
										"text": "：アトピー性皮膚炎のある乳児では、鶏卵の摂取が遅いほど鶏卵アレルギーを発症するリスクが高まるため、アトピー性皮膚炎を寛解（落ち着かせる）させたうえで、",
										"bold": false
									},
									{
										"text": "医師の管理のもと",
										"bold": true
									},
									{
										"text": "生後6か月から鶏卵の微量摂取を開始することを推奨しています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "アトピー性皮膚炎が強い場合",
									"bold": true
								}, {
									"text": "：乳児期のアトピー性皮膚炎や食物アレルギーの管理に精通している医師の診療を受けることを推奨されています。湿疹が強い、食物アレルギーが疑われる症状がある場合は、離乳の進め方について医師に相談してください。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "国立成育医療研究センター「発症予防」",
							"url": "https://www.foodallergy.jp/care-guide/prevention-onset"
						},
						{
							"name": "国立成育医療研究センター「鶏卵の摂取開始時期について」",
							"url": "https://www.ncchd.go.jp/hospital/about/section/allergy/keiran_sessyu.html"
						},
						{
							"name": "日本アレルギー学会「ピーナッツアレルギーに関するコンセンサスステートメント」",
							"url": "https://www.jsaweb.jp/modules/news_topics/index.php?content_id=217"
						},
						{
							"name": "授乳・離乳の支援ガイド(2019年3月)",
							"url": "https://www.pref.ishikawa.lg.jp/kosodate/syokuiku/2018/documents/jyunyuurinyuunosiengaido201903.pdf"
						}
					],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "窒息の予防",
					"anchor": "窒息の予防",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "食品による窒息は未就学児、",
										"bold": false
									},
									{
										"text": "特に5歳以下",
										"bold": true
									},
									{
										"text": "で多いとされています。消費者庁の注意喚起（厚生労働省の人口動態調査を引用、平成26年度〜令和元年度の6年間）では、食品の誤嚥による窒息で14歳以下の子どもが80名死亡しており、そのうち5歳以下が73名で9割を占めていました。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "硬い豆やナッツ類は、5歳以下の子どもには食べさせないで",
									"bold": true
								}, {
									"text": "ください（消費者庁）。ナッツ類を与える場合はあらかじめ1/4に切り、よく噛んで食べるよう見守ってください。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "離乳食は子どもの噛む・飲み込む力に合った固さで。離乳初期は飲み込むだけで、舌や歯ぐきで噛んだりつぶしたりすることはできません。中期は舌でつぶせる固さ、後期は歯ぐきでつぶせる固さのものから進めてください。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "市販のベビーフードや零食に表示された対象月齢はメーカーの目安です。『授乳・離乳の支援ガイド』でも、子どもに合わせる月齢や固さのものを選び、与える前に一口食べて味や固さを確認し、食べ方で固さの適切さを確かめるよう指摘されています。子どもの噛む・飲み込む力に合わせて選んでください。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "窒息予防のポイント（日本小児科学会）：",
									"bold": false
								}],
								"children": [
									{
										"inline": [{
											"text": "食品を小さく切り、食べやすい大きさにする（丸い食品は1/4程度に切る）",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "一口を無理なく食べられる量にし、よく噛んでから飲み込ませる",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "姿勢良く座らせ、食べることに集中させる",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "食事中は遊ばせず、目を離さない",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "詰まってしまったときの応急処置の方法を日頃から確認しておく",
											"bold": false
										}],
										"children": []
									}
								]
							}
						]
					}],
					"sources": [
						{
							"name": "日本小児科学会「食品による窒息 子どもを守るためにできること」",
							"url": "https://www.jpeds.or.jp/society-activities/column/proposals-assertions/50123.html"
						},
						{
							"name": "消費者庁「食品による子どもの窒息・誤嚥事故に注意!」",
							"url": "https://www.caa.go.jp/policies/policy/consumer_safety/caution/caution_047"
						},
						{
							"name": "国民生活センター「2020年度 縮刷版」",
							"url": "https://www.kokusen.go.jp/mimamori/pdf/support_FY2020all.pdf"
						},
						{
							"name": "授乳・離乳の支援ガイド(2019年3月)",
							"url": "https://www.pref.ishikawa.lg.jp/kosodate/syokuiku/2018/documents/jyunyuurinyuunosiengaido201903.pdf"
						}
					],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "与えてはいけないもの（注意点）",
					"anchor": "与えてはいけないもの-注意点",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "はちみつ",
									"bold": true
								}, {
									"text": "：1歳未満の赤ちゃんには与えないでください（乳児ボツリヌス症の予防のため）。詳細は07章「やってはいけないこと」を参照してください。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "牛乳を飲む場合",
									"bold": true
								}, {
									"text": "：鉄欠乏性貧血の予防の観点から、飲用として与えるのは1歳を過ぎてからが望ましいとされています。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "調味料（塩・砂糖）",
									"bold": true
								}, {
									"text": "：離乳の開始時期は調味料は必要ありません。離乳の進行に応じて、食塩や砂糖などの調味料を使用する場合は、それぞれの食品のもつ味を生かしながら、薄味でおいしく調理し、油脂類も少量の使用とします。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "硬い豆・ナッツ類",
									"bold": true
								}, {
									"text": "：5歳以下の子どもには食べさせないでください（上記「窒息の予防」を参照）。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "厚生労働省「はちみつを与えるのは1歳を過ぎてから」",
							"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000161461.html"
						},
						{
							"name": "消費者庁「はちみつに含まれる菌による乳児ボツリヌス症に注意してください」",
							"url": "https://www.caa.go.jp/policies/policy/consumer_safety/food_safety/food_safety_portal/microorganism_virus/contents_001"
						},
						{
							"name": "授乳・離乳の支援ガイド(2019年3月)",
							"url": "https://www.pref.ishikawa.lg.jp/kosodate/syokuiku/2018/documents/jyunyuurinyuunosiengaido201903.pdf"
						},
						{
							"name": "消費者庁「食品による子どもの窒息・誤嚥事故に注意!」",
							"url": "https://www.caa.go.jp/policies/policy/consumer_safety/caution/caution_047"
						}
					],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "母乳・育児用ミルクの役割",
					"anchor": "母乳・育児用ミルクの役割",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "離乳は「離乳食に完全に切り替える」ことではなく、",
										"bold": false
									},
									{
										"text": "母乳または育児用ミルクなどの乳汁栄養から幼児食に移行する過程",
										"bold": true
									},
									{
										"text": "です。離乳食が始まっても、母乳・育児用ミルクは引き続き大切な栄養源であり、離乳の進み方に合わせて回数を減らしていきます。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "離乳初期は離乳食を1さじずつ始め、母乳・育児用ミルクは飲みたいだけ飲ませます。離乳が進むにつれ、1日2回食・3回食と食事のリズムをつけていき、1歳を過ぎた頃には離乳食が1日の食事の中心になっていきます。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "母乳育児の場合、離乳開始の時期にあわせて鉄とビタミンDを含む食品を意識的に取り入れることが重要です。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "離乳完了期（12か月頃）から1歳を過ぎた頃には、離乳食が1日の食事の中心となり、母乳・育児用ミルクは補助的な役割に変わっていきます。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "授乳・離乳の支援ガイド(2019年3月)",
						"url": "https://www.pref.ishikawa.lg.jp/kosodate/syokuiku/2018/documents/jyunyuurinyuunosiengaido201903.pdf"
					}],
					"mustIds": []
				}
			]
		},
		{
			"slug": "safety",
			"title": "事故の予防：家と車の中",
			"order": 6,
			"lastVerified": "2026-08-15",
			"sources": [
				{
					"name": "警察庁-子供を守るチャイルドシート",
					"url": "https://www.npa.go.jp/bureau/traffic/anzen/childseat.html"
				},
				{
					"name": "NASVA-チャイルドシートの使い方",
					"url": "https://www.nasva.go.jp/mamoru/assessment_child/how_to.html"
				},
				{
					"name": "政府広報-赤ちゃんやこどもを誤飲・窒息事故から守る",
					"url": "https://www.gov-online.go.jp/article/202408/entry-6450.html"
				},
				{
					"name": "政府広報-家の中の思わぬ危険。乳幼児のやけど事故にご注意を！（やけどの初期対応）",
					"url": "https://www.gov-online.go.jp/article/201802/entry-9262.html"
				},
				{
					"name": "こどもの救急-窒息",
					"url": "https://kodomo-qq.jp/jiko/index.php?pname=jiko_chissoku"
				},
				{
					"name": "日本医師会-気道異物除去の手順",
					"url": "https://www.med.or.jp/99/kido.html"
				},
				{
					"name": "日本小児科学会-食品による窒息 子どもを守るためにできること",
					"url": "https://www.jpeds.or.jp/society-activities/column/proposals-assertions/50123.html"
				},
				{
					"name": "消費者庁-こどもの事故防止ハンドブック（窒息・誤飲）",
					"url": "https://www.cfa.go.jp/policies/child-safety-actions/handbook/content-1"
				},
				{
					"name": "消費者庁-こどもの事故防止ハンドブック（やけど）",
					"url": "https://www.cfa.go.jp/policies/child-safety-actions/handbook/content-3"
				},
				{
					"name": "消費者庁-こどもの事故防止ハンドブック（転落・転倒）",
					"url": "https://www.cfa.go.jp/policies/child-safety-actions/handbook/content-4"
				},
				{
					"name": "こども家庭庁-水の危険は近くにあります",
					"url": "https://www.cfa.go.jp/policies/child-safety-actions/cases/dekisui"
				},
				{
					"name": "消費者庁-御家庭内での子どもの溺水事故に御注意ください",
					"url": "https://www.caa.go.jp/policies/policy/consumer_safety/caution/caution_052"
				},
				{
					"name": "消費者庁-子どもの水の事故を防ごう！",
					"url": "https://www.caa.go.jp/policies/policy/consumer_safety/caution/caution_062"
				},
				{
					"name": "消費者庁-子どもの転落事故に注意!",
					"url": "https://www.caa.go.jp/policies/policy/consumer_safety/caution/caution_061"
				},
				{
					"name": "国民生活センター-入浴・沐浴に伴う乳児の落下事故に注意",
					"url": "https://www.kokusen.go.jp/news/data/n-20251217_1.html"
				},
				{
					"name": "消費者庁-Vol.524 真夏でなくても車内での熱中症に注意しましょう!",
					"url": "https://www.caa.go.jp/policies/policy/consumer_safety/child/project_001/mail/20201008"
				},
				{
					"name": "JAF-真夏の車内温度（JAFユーザーテスト）",
					"url": "https://jaf.or.jp/common/safety-drive/car-learning/user-test/temperature/summer"
				},
				{
					"name": "こども家庭庁-みんなで見守り「こどもの熱中症」を防ぎましょう！",
					"url": "https://www.cfa.go.jp/policies/child-safety-actions/cases/netchusho"
				},
				{
					"name": "日本中毒情報センター-中毒１１０番・電話サービス",
					"url": "https://www.j-poison-ic.jp/110serviece"
				},
				{
					"name": "消費者庁-消費者白書 COLUMN 住環境における高齢者の事故（入浴時の注意ポイント）",
					"url": "https://www.caa.go.jp/policies/policy/consumer_research/white_paper/2023/white_paper_column_02.html"
				}
			],
			"must": [
				"carseat",
				"choking",
				"accident"
			],
			"description": "赤ちゃんが生まれたあと、危険な場所は浴槽、階段、小さな物、車の中です",
			"sections": [
				{
					"level": 1,
					"heading": "",
					"anchor": "top",
					"blocks": [{
						"kind": "paragraph",
						"inline": [{
							"text": "赤ちゃんが生まれたあと、危険な場所は浴槽、階段、小さな物、車の中です。窒息、転落、やけど、溺水、熱中症、誤飲——それぞれをどう防ぎ、起きた時はどう対処するかを、具体的な数字で説明しています。チャイルドシートの決まりもまとめています。",
							"bold": false
						}]
					}],
					"sources": [{
						"name": "こども家庭庁-水の危険は近くにあります",
						"url": "https://www.cfa.go.jp/policies/child-safety-actions/cases/dekisui"
					}, {
						"name": "消費者庁-御家庭内での子どもの溺水事故に御注意ください",
						"url": "https://www.caa.go.jp/policies/policy/consumer_safety/caution/caution_052"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "チャイルドシート：義務と正しい装着",
					"anchor": "チャイルドシート-義務と正しい装着",
					"blocks": [],
					"sources": [],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "使用義務（道路交通法）",
					"anchor": "使用義務-道路交通法",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "道路交通法第71条の3第3項で、自動車の運転者は",
										"bold": false
									},
									{
										"text": "チャイルドシート（幼児用補助装置）を使用しない6歳未満の幼児を乗せて運転してはならない",
										"bold": true
									},
									{
										"text": "と定められています（平成12年4月1日から義務化）。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "警察庁の統計（令和7年中）では、自動車同乗中の死傷した6歳未満幼児のチャイルドシート使用者率は",
										"bold": false
									},
									{
										"text": "83.5％",
										"bold": true
									},
									{
										"text": "（前年比+2.5ポイント、近年は横ばい）。年齢別では",
										"bold": false
									},
									{
										"text": "1歳未満93.2％、1～4歳84.8％、5歳66.7％",
										"bold": true
									},
									{
										"text": "で、5歳が最も低くなっています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "警察庁は「チャイルドシートを使用していても、車両への取付け固定が不十分だったり、正しく座らせなかった場合には、交通事故時にチャイルドシートがシートベルトから分離してしまったり、幼児がチャイルドシートから飛び出してしまうなど、本来の機能が発揮できない」と警告しています。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "警察庁-子供を守るチャイルドシート",
						"url": "https://www.npa.go.jp/bureau/traffic/anzen/childseat.html"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "装着のポイント（乳児は後部座席・後ろ向き）",
					"anchor": "装着のポイント-乳児は後部座席・後ろ向き",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "独立行政法人自動車事故対策機構（NASVA）のチャイルドシート使い分けでは、",
										"bold": false
									},
									{
										"text": "乳児用（ベビーシート）は体重10kg未満又は13kg未満、身長70cm以下で新生児から1歳くらいまで",
										"bold": true
									},
									{
										"text": "の対象とし、「",
										"bold": false
									},
									{
										"text": "後ろ向き",
										"bold": true
									},
									{
										"text": "」と「ベッド型」があるとしています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "後部座席への設置が推奨されています。前方座席のエアバッグは成人の体型を前提に設計されており、子どもにはかえって被害を及ぼすおそれがあるためです。やむを得ず助手席に置く場合はシートを最大まで後方に下げます。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "取り付けは座席に体重をかけて沈み込み、シートベルトの緩みを取ることがポイントです。ISOFIX対応品は取付けが確実に行いやすく、警察庁や業界団体が普及啓発を行っています。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "NASVA-チャイルドシートの使い方",
						"url": "https://www.nasva.go.jp/mamoru/assessment_child/how_to.html"
					}, {
						"name": "警察庁-子供を守るチャイルドシート",
						"url": "https://www.npa.go.jp/bureau/traffic/anzen/childseat.html"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "正しく使わなければ意味がない",
					"anchor": "正しく使わなければ意味がない",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [
								{
									"text": "国土交通省のチャイルドシート着用効果の分析では、「着用時と非着用時とでは致死率、死亡重傷率に大きな差がある」とされています。警察庁のデータでも、取付けが適切だった割合は",
									"bold": false
								},
								{
									"text": "74.8％",
									"bold": true
								},
								{
									"text": "、正しく着座できていた割合は",
									"bold": false
								},
								{
									"text": "55.6％",
									"bold": true
								},
								{
									"text": "にすぎず、不適切な使用が重大事故につながりやすいことが示されています。",
									"bold": false
								}
							],
							"children": []
						}]
					}],
					"sources": [{
						"name": "警察庁-子供を守るチャイルドシート",
						"url": "https://www.npa.go.jp/bureau/traffic/anzen/childseat.html"
					}],
					"mustIds": ["carseat"]
				},
				{
					"level": 2,
					"heading": "誤飲・窒息：何が危険で、万一はどうする",
					"anchor": "誤飲・窒息-何が危険で-万一はどうする",
					"blocks": [],
					"sources": [],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "危険なもの（小物・食品）",
					"anchor": "危険なもの-小物・食品",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "政府広報オンラインの解説：「",
										"bold": false
									},
									{
										"text": "3歳のこどもの口の直径はおよそ4cmで、ほぼトイレットペーパーの芯ぐらいの大きさ。それより小さな物は飲み込んでしまう危険を常に考えたほうがいい",
										"bold": true
									},
									{
										"text": "」。スーパーボールなど",
										"bold": false
									},
									{
										"text": "6mmから2cmのおもちゃ",
										"bold": true
									},
									{
										"text": "は特に気道をふさぎやすく窒息のおそれが高まる、としています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "こどもの救急（ONLINE-QQ、日本小児科学会）が窒息の原因になりやすいものとして挙げる例：食品（",
										"bold": false
									},
									{
										"text": "こんにゃくゼリー、ピーナッツなどの豆類、野菜スティック、アメ、キャラメル、ポップコーン、甘栗",
										"bold": true
									},
									{
										"text": "）、日用品（",
										"bold": false
									},
									{
										"text": "柔らかい布団",
										"bold": true
									},
									{
										"text": "）、おもちゃの部品、",
										"bold": false
									},
									{
										"text": "硬貨（小銭）、ボタン電池",
										"bold": true
									},
									{
										"text": "。コンビニ袋を頭にかぶる遊び、電気コードやカーテン・ブラインドのヒモを首に巻くことも窒息の原因になりうるとしています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "ボタン電池",
										"bold": true
									},
									{
										"text": "は粘膜に触れるとタンパク質を溶かす液体が出て体内で化学やけど（化学熱傷）を引き起こし、胃や食道の壁を短時間で傷つけて穴をあけることがあります。誤飲の疑いがある場合は",
										"bold": false
									},
									{
										"text": "無理に吐かせず、受診するまで何も飲ませない",
										"bold": true
									},
									{
										"text": "よう呼びかけられています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "消費者庁・こども家庭庁のハンドブックでも、0～3歳くらいの「医薬品・洗剤・化粧品の誤飲」、0～5歳くらいの「ボタン電池・吸水ボール・磁石の誤飲」、0～6歳くらいの「食事中に食べ物で窒息」が注意項目として扱われています。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "政府広報-赤ちゃんやこどもを誤飲・窒息事故から守る",
							"url": "https://www.gov-online.go.jp/article/202408/entry-6450.html"
						},
						{
							"name": "こどもの救急-窒息",
							"url": "https://kodomo-qq.jp/jiko/index.php?pname=jiko_chissoku"
						},
						{
							"name": "消費者庁-こどもの事故防止ハンドブック（窒息・誤飲）",
							"url": "https://www.cfa.go.jp/policies/child-safety-actions/handbook/content-1"
						}
					],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "食べ物の切り方・姿勢",
					"anchor": "食べ物の切り方・姿勢",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [
								{
									"text": "日本小児科学会「食品による窒息 子どもを守るためにできること」は、食品による窒息は",
									"bold": false
								},
								{
									"text": "未就学児（特に5歳以下）",
									"bold": true
								},
								{
									"text": "で多いことを示し、丸い・滑りやすい・硬い・粘着性の食品を小さく・やわらかくし、食事中は姿勢を正して目を離さないことなどを呼びかけています。",
									"bold": false
								}
							],
							"children": []
						}]
					}],
					"sources": [{
						"name": "日本小児科学会-食品による窒息 子どもを守るためにできること",
						"url": "https://www.jpeds.or.jp/society-activities/column/proposals-assertions/50123.html"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "窒息時の応急処置（ハイムリック法は1歳以上のみ）",
					"anchor": "窒息時の応急処置-ハイムリック法は1歳以上のみ",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [
								{
									"text": "こどもの救急（ONLINE-QQ）の公式手順：「突然声が出なくなった、首をおさえ苦しそうにしている、唇が紫色になった」場合は窒息を疑います。",
									"bold": false
								},
								{
									"text": "1歳未満の乳児には「胸部突き上げ法」と「背部叩打法」を数回ずつ交互に",
									"bold": true
								},
								{
									"text": "行います。",
									"bold": false
								},
								{
									"text": "意識がある1歳以上の幼児には「腹部突き上げ法」（ハイムリック法）",
									"bold": true
								},
								{
									"text": "を行います。いずれも意識がない場合は心肺蘇生（CPR）を行いながら119番通報し救急車を呼びます。",
									"bold": false
								}
							],
							"children": []
						}, {
							"inline": [
								{
									"text": "日本医師会救急蘇生法でも「",
									"bold": false
								},
								{
									"text": "乳児では腹部突き上げ法は行いません",
									"bold": true
								},
								{
									"text": "」と明記されています。腹部突き上げ法は腹部の内臓を傷める可能性があるため、実施した場合は救急隊にその旨を伝えるよう呼びかけられています。",
									"bold": false
								}
							],
							"children": []
						}]
					}],
					"sources": [{
						"name": "こどもの救急-窒息",
						"url": "https://kodomo-qq.jp/jiko/index.php?pname=jiko_chissoku"
					}, {
						"name": "日本医師会-気道異物除去の手順",
						"url": "https://www.med.or.jp/99/kido.html"
					}],
					"mustIds": ["choking"]
				},
				{
					"level": 2,
					"heading": "転落：ベッド・階段・窓",
					"anchor": "転落-ベッド・階段・窓",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "こども家庭庁・消費者庁の事故防止ハンドブック（転落・転倒、1歳以上）：「",
										"bold": false
									},
									{
										"text": "窓に補助錠やストッパーをつけて、大きく開かないようにしましょう。窓の近くにベッドやソファなど踏み台になるものは置かない",
										"bold": true
									},
									{
										"text": "」ように、としています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "消費者庁は「子どもの転落事故に注意！〜落ちるまではあっという間です〜」と注意喚起しています。調査では、",
										"bold": false
									},
									{
										"text": "乳幼児の育児経験がある消費者の約4割が子育て中に転落事故の経験があり、その約3割が医療機関を受診",
										"bold": true
									},
									{
										"text": "した経験がある、としています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "消費者庁・国民生活センターには、ベビーゲート（ベビードア）が取り付けられていなかったり、付けていても閉め忘れていたりしたことで、子どもが",
										"bold": false
									},
									{
										"text": "階段から転落",
										"bold": true
									},
									{
										"text": "した事故情報が寄せられており、取り付け位置の確認と「閉まっている」ことの確認が呼びかけられています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "抱っこ中・高い位置からの落下：国民生活センターの注意喚起では、",
										"bold": false
									},
									{
										"text": "浴槽の蓋や洗濯機の上などに乳児を寝かせたまま目を離した際の落下",
										"bold": true
									},
									{
										"text": "で頭部を受傷する事故（骨折や頭蓋内損傷を負った事故の約4割は洗濯機からの落下）が発生しており、乳児を浴槽の蓋や洗濯機の上に寝かせないよう呼びかけられています。",
										"bold": false
									}
								],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "こども家庭庁-水の危険は近くにあります",
							"url": "https://www.cfa.go.jp/policies/child-safety-actions/cases/dekisui"
						},
						{
							"name": "消費者庁-こどもの事故防止ハンドブック（転落・転倒）",
							"url": "https://www.cfa.go.jp/policies/child-safety-actions/handbook/content-4"
						},
						{
							"name": "消費者庁-子どもの転落事故に注意!",
							"url": "https://www.caa.go.jp/policies/policy/consumer_safety/caution/caution_061"
						},
						{
							"name": "国民生活センター-入浴・沐浴に伴う乳児の落下事故に注意",
							"url": "https://www.kokusen.go.jp/news/data/n-20251217_1.html"
						}
					],
					"mustIds": ["accident"]
				},
				{
					"level": 2,
					"heading": "やけど：入浴と熱いもの",
					"anchor": "やけど-入浴と熱いもの",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "消費者庁の入浴安全の指針（「入浴事故を防ぐための5ヵ条」）では、「",
										"bold": false
									},
									{
										"text": "湯温は41度以下、湯につかる時間は10分まで",
										"bold": true
									},
									{
										"text": "」が目安とされています（入浴前に脱衣所・浴室を暖める、浴槽から急に立ち上がらない、食後すぐやアルコールが抜けるまでの入浴を控える、入浴前に同居者へ一声かける、と並ぶ）。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "消費者庁・こども家庭庁のハンドブック（やけど）：床に置くタイプの暖房器具は子どもの手が届かないよう安全柵などで囲む、湯たんぽや電気カーペットは同じ場所が長時間触れて低温やけどになることに注意、とされています。炊飯器や電気ケトルなど、高温の蒸気や転倒して熱湯に触れるおそれのある製品は、乳幼児の行動範囲で使用しないよう行政が呼びかけています。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [
									{
										"text": "子どものやけどの初期対応として、政府広報は「",
										"bold": false
									},
									{
										"text": "すぐに10分以上冷やす",
										"bold": true
									},
									{
										"text": "。刺激を避けるため、",
										"bold": false
									},
									{
										"text": "容器に溜めた水で冷やすか、水道水・シャワーを直接当てない",
										"bold": true
									},
									{
										"text": "。服の上から熱湯などがかかった場合は、脱がさずに服の上から冷やす」と示しています。",
										"bold": false
									}
								],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "消費者庁-消費者白書 COLUMN 住環境における高齢者の事故（入浴時の注意ポイント）",
							"url": "https://www.caa.go.jp/policies/policy/consumer_research/white_paper/2023/white_paper_column_02.html"
						},
						{
							"name": "消費者庁-こどもの事故防止ハンドブック（やけど）",
							"url": "https://www.cfa.go.jp/policies/child-safety-actions/handbook/content-3"
						},
						{
							"name": "政府広報-家の中の思わぬ危険。乳幼児のやけど事故にご注意を！（やけどの初期対応）",
							"url": "https://www.gov-online.go.jp/article/201802/entry-9262.html"
						}
					],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "溺水：浴槽・桶・便座・おむつ替え台",
					"anchor": "溺水-浴槽・桶・便座・おむつ替え台",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "消費者庁（厚生労働省「人口動態調査」を踏まえた注意喚起）：「子どもが浴室で溺水し死亡する事故が多く発生しています」「",
										"bold": false
									},
									{
										"text": "子どもは声や音を出さず静かに溺れる",
										"bold": true
									},
									{
										"text": "こともあります」。対策として、",
										"bold": false
									},
									{
										"text": "入浴後は浴槽の水を抜く",
										"bold": true
									},
									{
										"text": "ことを習慣にし、子どもだけで浴室に入れないよう",
										"bold": false
									},
									{
										"text": "ベビーゲートなどを設置する",
										"bold": true
									},
									{
										"text": "こと、浴室等の水回りの環境づくり（桶・洗面器など一時的に残る水はこまめに抜く）が呼びかけられています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "消費者庁「子どもの水の事故を防ごう！」（世界溺水防止デー 7月25日）：厚生労働省「人口動態調査」によると、",
										"bold": false
									},
									{
										"text": "0～1歳では浴槽での溺死が最も多い",
										"bold": true
									},
									{
										"text": "、より活動的になる5歳以上では自然水域での溺死が最多、としています。「",
										"bold": false
									},
									{
										"text": "少しの時間、少しの水量と油断せず",
										"bold": true
									},
									{
										"text": "、子どもの見守りと合わせて溺水事故が起こらない環境づくりを」と呼びかけています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "こども家庭庁（令和元年～5年の5年間）：14歳以下のこどもの不慮の溺死・溺水による死亡は不慮の事故の中でも死因の上位を占め、10～14歳では最も多い、5～9歳では交通事故に次いで多い、としています。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "消費者庁-御家庭内での子どもの溺水事故に御注意ください",
							"url": "https://www.caa.go.jp/policies/policy/consumer_safety/caution/caution_052"
						},
						{
							"name": "消費者庁-子どもの水の事故を防ごう！",
							"url": "https://www.caa.go.jp/policies/policy/consumer_safety/caution/caution_062"
						},
						{
							"name": "こども家庭庁-水の危険は近くにあります",
							"url": "https://www.cfa.go.jp/policies/child-safety-actions/cases/dekisui"
						}
					],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "熱中症：車内放置と外出時の水分",
					"anchor": "熱中症-車内放置と外出時の水分",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "消費者庁（JAFのテスト紹介）：10月で最高気温約27度の比較的過ごしやすい気候でも、",
										"bold": false
									},
									{
										"text": "日が射すと車内温度は約48度、ダッシュボードは65度を超える",
										"bold": true
									},
									{
										"text": "ことがあります。エアコンで適温（25度程度）にした後にエンジンを停止・締め切った状態でも、",
										"bold": false
									},
									{
										"text": "約1時間後の車内温度は50度以上（51.3度）",
										"bold": true
									},
									{
										"text": "に達します。「",
										"bold": false
									},
									{
										"text": "たとえ数分であっても、車内に子どもを残すことは絶対しない",
										"bold": true
									},
									{
										"text": "」よう呼びかけています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "JAFユーザーテスト：夏場で",
										"bold": false
									},
									{
										"text": "エアコン停止からわずか15分で熱中症指数（WBGT）が危険レベルに達した",
										"bold": true
									},
									{
										"text": "、とされています。「乳幼児は体温調節機能が未発達で、高温下では短時間で体温が上昇し、死に至ることがある。寝ているからという理由で車内に子どもを残すのは大変危険である」としています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "こども家庭庁：「",
										"bold": false
									},
									{
										"text": "短時間であっても絶対に車内をこどもだけにせず、降ろし忘れにも注意",
										"bold": true
									},
									{
										"text": "」「乳幼児は自分の力で移動することができず、『寝ているから』『ちょっとの時間だから』と放置することは危険です。特に、車内に置き去りにすることは絶対にやめましょう」としています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "外出時は、子どもは身長が低い分、地面からの輻射熱を大人より強く受けるとされています。遊びに夢中になっているとのどの渇きなどの熱中症のサインに気づきにくいので、大人が見守りながら",
										"bold": false
									},
									{
										"text": "休憩と水分補給",
										"bold": true
									},
									{
										"text": "を勧めることが、こども家庭庁・消費者庁の呼びかけです。",
										"bold": false
									}
								],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "消費者庁-Vol.524 真夏でなくても車内での熱中症に注意しましょう!",
							"url": "https://www.caa.go.jp/policies/policy/consumer_safety/child/project_001/mail/20201008"
						},
						{
							"name": "JAF-真夏の車内温度（JAFユーザーテスト）",
							"url": "https://jaf.or.jp/common/safety-drive/car-learning/user-test/temperature/summer"
						},
						{
							"name": "こども家庭庁-みんなで見守り「こどもの熱中症」を防ぎましょう！",
							"url": "https://www.cfa.go.jp/policies/child-safety-actions/cases/netchusho"
						}
					],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "誤飲（薬・洗剤）と中毒110番",
					"anchor": "誤飲-薬・洗剤-と中毒110番",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [
								{
									"text": "医薬品・洗剤・化粧品は子どもの手の届かない場所に保管し、",
									"bold": false
								},
								{
									"text": "飲料用ペットボトルへの移し替えはしない",
									"bold": true
								},
								{
									"text": "（誤飲事故が多い）ことが、国民生活センター・消費者庁ハンドブックで呼びかけられています。",
									"bold": false
								}
							],
							"children": []
						}, {
							"inline": [
								{
									"text": "医薬品・洗剤などの誤飲（急性中毒）が起きた場合は、公益財団法人日本中毒情報センターの",
									"bold": false
								},
								{
									"text": "中毒110番",
									"bold": true
								},
								{
									"text": "へ電話で応急処置などの情報を得られます。",
									"bold": false
								}
							],
							"children": [{
								"inline": [{
									"text": "大阪中毒110番：072-727-2499（365日・24時間対応、情報提供料無料）",
									"bold": true
								}],
								"children": []
							}, {
								"inline": [{
									"text": "つくば中毒110番：029-852-9999（一般専用電話・365日24時間対応、情報提供料無料）",
									"bold": false
								}],
								"children": []
							}]
						}]
					}, {
						"kind": "callout",
						"tone": "warning",
						"inline": [
							{
								"text": "中毒110番は、化学物質（たばこ・家庭用品など）・医薬品・動植物の毒などによる",
								"bold": false
							},
							{
								"text": "急性中毒",
								"bold": true
							},
							{
								"text": "への情報提供が対象です。ビー玉・小石などの異物誤飲は相談の対象外なので、その場合は直ちに医療機関へ。",
								"bold": false
							}
						]
					}],
					"sources": [{
						"name": "日本中毒情報センター-中毒１１０番・電話サービス",
						"url": "https://www.j-poison-ic.jp/110serviece"
					}, {
						"name": "消費者庁-こどもの事故防止ハンドブック（窒息・誤飲）",
						"url": "https://www.cfa.go.jp/policies/child-safety-actions/handbook/content-1"
					}],
					"mustIds": []
				}
			]
		},
		{
			"slug": "dos-and-donts",
			"title": "やってはいけないこと",
			"order": 7,
			"lastVerified": "2026-08-15",
			"sources": [
				{
					"name": "こども家庭庁「【動画】赤ちゃんが泣きやまない〜泣きへの理解と対処のために〜」（乳幼児揺さぶられ症候群の発生予防の啓発動画。厚労省制作）",
					"url": "https://www.cfa.go.jp/policies/jidougyakutai/nakiyamanai"
				},
				{
					"name": "東京都福祉局「育児のしおり」（国立成育医療研究センター研究所 成育社会医学研究部作成の冊子に基づく。揺さぶられ予防の具体的な対処を掲載）",
					"url": "https://www.fukushi.metro.tokyo.lg.jp/documents/d/fukushi/ikujinosiori"
				},
				{
					"name": "厚生労働省「ハチミツを与えるのは１歳を過ぎてから。」（乳児ボツリヌス症）",
					"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000161461.html"
				},
				{
					"name": "消費者庁「ハチミツによる乳児のボツリヌス症」",
					"url": "https://www.caa.go.jp/policies/policy/consumer_safety/food_safety/food_safety_portal/microorganism_virus/contents_001"
				},
				{
					"name": "こども家庭庁「赤ちゃんが安全に眠れるように 〜1歳未満の赤ちゃんを育てるみなさまへ〜」（SIDS対策）",
					"url": "https://www.cfa.go.jp/policies/boshihoken/kenkou/sids"
				},
				{
					"name": "日本小児科学会「乳児の安全な睡眠環境の確保について 2024年改訂」（「寝ている赤ちゃんの安全な睡眠環境の確保についての提言」）",
					"url": "https://www.jpeds.or.jp/society-activities/column/proposals-assertions/50160.html"
				},
				{
					"name": "消費者庁「Vol.607 就寝時の窒息事故に気を付けましょう」",
					"url": "https://www.caa.go.jp/policies/policy/consumer_safety/child/project_001/mail/20221028"
				},
				{
					"name": "こども家庭庁「こどもの事故防止ハンドブック」（転落・転倒事故）",
					"url": "https://www.cfa.go.jp/policies/child-safety-actions/handbook/content-4"
				},
				{
					"name": "NPO法人SIDS家族の会「SIDSを少なくするために」",
					"url": "https://sids.gr.jp/campaign_sids.html"
				},
				{
					"name": "一般社団法人 日本耳鼻咽喉科頭頸部外科学会「耳垢」（FAQ）",
					"url": "https://www.jibika.or.jp/modules/disease_kids/index.php?content_id=2"
				},
				{
					"name": "国立成育医療研究センター e-ヘルスネット「卒乳時期とむし歯の関係」",
					"url": "https://kennet.mhlw.go.jp/information//information/teeth/h-02-014.html"
				},
				{
					"name": "日本小児歯科学会「産まれてから2歳頃まで」（Q&A）",
					"url": "https://www.jspd.or.jp/question/2years_old"
				},
				{
					"name": "品川区「乳幼児の健康診査・相談」（1歳6か月児健康診査を含む健診一覧）",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"
				},
				{
					"name": "こども家庭庁「体罰等によらない子育てのために〜みんなで育児を支える社会に〜」（改正児童福祉法の紹介）",
					"url": "https://www.cfa.go.jp/policies/jidougyakutai/taibatsu"
				},
				{
					"name": "厚生労働省「児童虐待に関する法令・指針等一覧」",
					"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kodomo/kodomo_kosodate/dv/hourei.html"
				}
			],
			"must": ["no-shaking", "honey"],
			"description": "揺さぶり、はちみつ、添い寝、綿棒、寝かしたままの授乳",
			"sections": [
				{
					"level": 1,
					"heading": "",
					"anchor": "top",
					"blocks": [{
						"kind": "paragraph",
						"inline": [{
							"text": "揺さぶり、はちみつ、添い寝、綿棒、寝かしたままの授乳。どれも公的機関が根拠を示して注意していることです。根拠のないしきたりや風説は載せていません。",
							"bold": false
						}]
					}],
					"sources": [{
						"name": "日本小児科学会「乳児の安全な睡眠環境の確保について 2024年改訂」",
						"url": "https://www.jpeds.or.jp/society-activities/column/proposals-assertions/50160.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "赤ちゃんを激しく揺さぶらない（乳幼児揺さぶられ症候群）",
					"anchor": "赤ちゃんを激しく揺さぶらない-乳幼児揺さぶられ症候群",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [
								{
									"text": "赤ちゃんは首の筋肉が弱く、身体に対する頭の割合が大きいので、激しく揺さぶられると外傷が見えていなくても脳に大きな衝撃が伝わります。こども家庭庁は、虐待防止の観点から、泣きやませるために",
									"bold": false
								},
								{
									"text": "激しく揺さぶったり、口をふさいだりしてはいけない",
									"bold": true
								},
								{
									"text": "ことを、動画「赤ちゃんが泣きやまない〜泣きへの理解と対処のために〜」（厚生労働省制作）で呼びかけています。",
									"bold": false
								}
							],
							"children": []
						}, {
							"inline": [{
								"text": "揺さぶられた赤ちゃんに嘔吐・ぐったり・けいれんなどの症状がみられた場合は、迷わずすぐに小児科を受診してください。",
								"bold": false
							}],
							"children": []
						}]
					}],
					"sources": [{
						"name": "こども家庭庁「赤ちゃんが泣きやまない」",
						"url": "https://www.cfa.go.jp/policies/jidougyakutai/nakiyamanai"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "泣き止まないときの対処（一旦離れる）",
					"anchor": "泣き止まないときの対処-一旦離れる",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [
								{
									"text": "育児のしおり（国立成育医療研究センター研究所 成育社会医学研究部作成）では、泣きやまず強いストレスを感じたときは、",
									"bold": false
								},
								{
									"text": "赤ちゃんを安全な場所に寝かせて、大人がその場から一旦離れる",
									"bold": true
								},
								{
									"text": "ことが勧められています。深呼吸をする、安全な所に赤ちゃんを寝かせて一旦離れる、誰かと言葉をかわすなどの気分転換を。泣くことは赤ちゃんにとって正常な連絡手段であり、泣いているのは誰が悪いことでもありません。",
									"bold": false
								}
							],
							"children": []
						}, {
							"inline": [{
								"text": "パートナーや周囲に「ちょっとお願い」と声をかけるのも有効です。一人で抱え込まず、こども家庭庁の動画「赤ちゃんが泣きやまない」を事前に視聴しておくことも勧められています。",
								"bold": false
							}],
							"children": []
						}]
					}, {
						"kind": "flow",
						"id": "crying-response",
						"nodes": [
							{
								"id": "f1",
								"text": "赤ちゃんが泣きやまず、強いストレスを感じていますか",
								"choices": [{
									"label": "はい",
									"nextId": "f2"
								}, {
									"label": "いいえ",
									"nextId": "f5"
								}]
							},
							{
								"id": "f2",
								"text": "赤ちゃんを安全な場所に寝かせて、大人がその場から一旦離れる",
								"choices": [{
									"label": "嘔吐・ぐったり・けいれんなどの症状がみられた場合",
									"nextId": "f3"
								}, {
									"label": "症状がみられない場合",
									"nextId": "f4"
								}]
							},
							{
								"id": "f3",
								"text": "迷わずすぐに小児科を受診する",
								"choices": []
							},
							{
								"id": "f4",
								"text": "泣くことは赤ちゃんにとって正常な連絡手段であり、泣いているのは誰が悪いことでもありません。パートナーや周囲に「ちょっとお願い」と声をかけるのも有効です",
								"choices": []
							},
							{
								"id": "f5",
								"text": "泣くことは赤ちゃんにとって正常な連絡手段であり、泣いているのは誰が悪いことでもありません",
								"choices": []
							}
						]
					}],
					"sources": [{
						"name": "東京都福祉局「育児のしおり」（国立成育医療研究センター研究所 成育社会医学研究部作成）",
						"url": "https://www.fukushi.metro.tokyo.lg.jp/documents/d/fukushi/ikujinosiori"
					}, {
						"name": "こども家庭庁「赤ちゃんが泣きやまない」",
						"url": "https://www.cfa.go.jp/policies/jidougyakutai/nakiyamanai"
					}],
					"mustIds": ["no-shaking"]
				},
				{
					"level": 2,
					"heading": "はちみつは1歳まで与えない（乳児ボツリヌス症）",
					"anchor": "はちみつは1歳まで与えない-乳児ボツリヌス症",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "1歳未満の赤ちゃんにははちみつを与えないでください。",
									"bold": true
								}, {
									"text": " 1歳未満の赤ちゃんがはちみつを食べることによって乳児ボツリヌス症にかかることがあります。1歳未満は腸内細菌の環境が整っておらず、はちみつに混入しうるボツリヌス菌が増殖して毒素を作るおそれがあるためです。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "ボツリヌス菌は熱に強いので、通常の加熱や調理では死にません。",
									"bold": true
								}, {
									"text": " 1歳未満の赤ちゃんにははちみつだけでなく、はちみつを含む食品（はちみつ入りのお菓子・調味料など）も与えないようにしてください。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "1歳以上になると離乳食等により腸内環境が整うため、はちみつを避ける必要はありません。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "乳児のお世話をする祖父母・同居のご家族など周囲の方にも「1歳までははちみつNG」を共有しておいてください。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "厚生労働省「ハチミツを与えるのは１歳を過ぎてから。」",
						"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000161461.html"
					}, {
						"name": "消費者庁「ハチミツによる乳児のボツリヌス症」",
						"url": "https://www.caa.go.jp/policies/policy/consumer_safety/food_safety/food_safety_portal/microorganism_virus/contents_001"
					}],
					"mustIds": ["honey"]
				},
				{
					"level": 2,
					"heading": "ソファでの添い寝・同じ寝具での添い寝をしない（SIDS・窒息リスク）",
					"anchor": "ソファでの添い寝・同じ寝具での添い寝をしない-sids・窒息リスク",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "SIDS（乳幼児突然死症候群）",
									"bold": true
								}, {
									"text": "は、何の予兆や既往歴もないまま乳幼児が睡眠中に亡くなる原因不明の病気で、窒息などの事故とは異なります。令和6年には55名の乳児がSIDSで亡くなっており、乳児期の死亡原因としては第3位とされています（こども家庭庁）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [
									{
										"text": "SIDSの発症リスクを低くするための3原則（こども家庭庁）：",
										"bold": false
									},
									{
										"text": "①1歳になるまでは「あおむけ」に寝かせる ②無理のない範囲で母乳育児をする ③たばこをやめる（赤ちゃんの周囲での喫煙・受動喫煙もSIDSの発生要因）",
										"bold": true
									},
									{
										"text": "。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "添い寝は、大人の身体で赤ちゃんに覆い被さったり口や鼻を塞いでしまったりする危険があるため注意が必要です。とくに、添い寝している人が",
										"bold": false
									},
									{
										"text": "眠気を引き起こす・注意力を低下させる薬を服用している場合、飲酒をした場合、赤ちゃんが早産や低出生体重で生まれた場合",
										"bold": true
									},
									{
										"text": "は特に危険とされています（こども家庭庁）。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "日本小児科学会の2024年改訂提言では、乳児突然死230事例のうち61%で「親と共寝（添い寝）」が記録されており、添い寝による覆い被さり・挟み込みが乳児の窒息死に関与する懸念が示されています。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "ソファでの添い寝・就寝は特に避けてください。",
									"bold": true
								}, {
									"text": " ソファは沈み込む座面で、転落したり、身体の隙間に沈み込んで顔が寝具に埋もれて窒息する事故が報告されています。こども家庭庁の事故防止ハンドブックも「2歳になるまでは、できるだけ大人用ベッドは使わないようにしましょう。またソファで寝かせないようにしましょう」としています。日中の短い昼寝でもソファに寝かせたまま離れないようにしてください。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "こども家庭庁「赤ちゃんが安全に眠れるように」",
							"url": "https://www.cfa.go.jp/policies/boshihoken/kenkou/sids"
						},
						{
							"name": "日本小児科学会「乳児の安全な睡眠環境の確保について 2024年改訂」",
							"url": "https://www.jpeds.or.jp/society-activities/column/proposals-assertions/50160.html"
						},
						{
							"name": "消費者庁「Vol.607 就寝時の窒息事故に気を付けましょう」",
							"url": "https://www.caa.go.jp/policies/policy/consumer_safety/child/project_001/mail/20221028"
						},
						{
							"name": "こども家庭庁「こどもの事故防止ハンドブック」（転落・転倒事故）",
							"url": "https://www.cfa.go.jp/policies/child-safety-actions/handbook/content-4"
						}
					],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "赤ちゃんを長時間一人にしない",
					"anchor": "赤ちゃんを長時間一人にしない",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [{
								"text": "添い寝・睡眠中の事故を予防する観点から、SIDS対策の支援団体（NPO法人SIDS家族の会）は、よく眠っているからといって長い時間赤ちゃんを一人にしないことを呼びかけています。",
								"bold": false
							}],
							"children": []
						}, {
							"inline": [{
								"text": "1歳までの就寝環境は、大人がすぐそばにいる場所で寝かせて、転落しないよう柵を上げたベビーベッドや転落防止の整った環境にすること、寝ている赤ちゃんの顔の近くに口鼻を覆うもの（掛け布団・ぬいぐるみ・衣類・スタイ）を置かないことが、消費者庁・こども家庭庁で共通に案内されています。",
								"bold": false
							}],
							"children": []
						}]
					}],
					"sources": [{
						"name": "NPO法人SIDS家族の会「SIDSを少なくするために」",
						"url": "https://sids.gr.jp/campaign_sids.html"
					}, {
						"name": "消費者庁「Vol.607 就寝時の窒息事故に気を付けましょう」",
						"url": "https://www.caa.go.jp/policies/policy/consumer_safety/child/project_001/mail/20221028"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "綿棒で耳の奥まで掃除しない",
					"anchor": "綿棒で耳の奥まで掃除しない",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [
								{
									"text": "一般社団法人 日本耳鼻咽喉科頭頸部外科学会は、",
									"bold": false
								},
								{
									"text": "家庭で綿棒や耳かきを使って耳掃除することは常に危険を伴う",
									"bold": true
								},
								{
									"text": "としています。奥までいじりすぎると耳垢を押し込んで「耳垢栓塞（耳垢が詰まる状態）」となり、強く拭くと外耳道を傷つけて",
									"bold": false
								},
								{
									"text": "外耳炎",
									"bold": true
								},
								{
									"text": "を起こすことがあります。耳掃除中に赤ちゃんが動いたり他人と接触したりすると",
									"bold": false
								},
								{
									"text": "鼓膜を破ってしまう",
									"bold": true
								},
								{
									"text": "事故もあります。",
									"bold": false
								}
							],
							"children": []
						}, {
							"inline": [{
								"text": "耳垢には細菌やカビの繁殖を防いだり、外耳道の皮膚を保護する役割があるため、奥まで取り切ろうとしないこと。見える範囲（耳の入口付近）をそっと拭う程度にとどめ、耳垢の詰まりが気になる・耳を触って泣くなどの場合は耳鼻咽喉科に相談してください。",
								"bold": false
							}],
							"children": []
						}]
					}],
					"sources": [{
						"name": "一般社団法人 日本耳鼻咽喉科頭頸部外科学会「耳垢」",
						"url": "https://www.jibika.or.jp/modules/disease_kids/index.php?content_id=2"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "就寝中の授乳・ミルクに注意（乳歯のむし歯・哺乳びんむし歯）",
					"anchor": "就寝中の授乳・ミルクに注意-乳歯のむし歯・哺乳びんむし歯",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "就寝しながらの授乳はむし歯発生のリスク",
									"bold": true
								}, {
									"text": "です。就寝中は唾液の分泌が減少し、むし歯の原因菌にとって好ましい環境が維持されるためです（国立成育医療研究センター e-ヘルスネット）。母乳・育児用ミルクだけであれば大きなリスクではありませんが、離乳食が始まって砂糖を含む食品や果汁を摂り始めると、授乳によるむし歯リスクが高まります。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [
									{
										"text": "乳歯が生え始めたら、",
										"bold": false
									},
									{
										"text": "哺乳びんに甘い飲み物（ジュース・乳酸菌飲料・甘味飲料）を入れること、寝ながらの授乳は控える",
										"bold": true
									},
									{
										"text": "ようにすることが案内されています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "母乳か粉ミルクかの差より、哺乳時間や哺乳姿勢、歯の清潔保持のほうがむし歯予防では重要とされています（日本小児歯科学会）。歯が生え始めたらガーゼや赤ちゃん用歯ブラシで歯や歯ぐきを清潔に保ちましょう。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [
									{
										"text": "品川区では保健センターで",
										"bold": false
									},
									{
										"text": "1歳6か月児健康診査",
										"bold": true
									},
									{
										"text": "（予約制）が行われています。授乳状況や歯・口まわりのケアの気になることは、健診や保健センターで相談してください。区では",
										"bold": false
									},
									{
										"text": "2歳児歯科健診",
										"bold": true
									},
									{
										"text": "（フッ化物塗布 880円・予約制）も別途実施しています。",
										"bold": false
									}
								],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "国立成育医療研究センター e-ヘルスネット「卒乳時期とむし歯の関係」",
							"url": "https://kennet.mhlw.go.jp/information//information/teeth/h-02-014.html"
						},
						{
							"name": "日本小児歯科学会「産まれてから2歳頃まで」",
							"url": "https://www.jspd.or.jp/question/2years_old"
						},
						{
							"name": "品川区「乳幼児の健康診査・相談」",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"
						}
					],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "叩く・ぶつけるなどの体罰は法律で禁止",
					"anchor": "叩く・ぶつけるなどの体罰は法律で禁止",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [
								{
									"text": "令和元年6月に児童福祉法・児童虐待防止法が改正され、",
									"bold": false
								},
								{
									"text": "親権者等は、児童のしつけに際して体罰を加えてはならない",
									"bold": true
								},
								{
									"text": "ことが法定化され、令和2年4月に施行されました（こども家庭庁）。",
									"bold": false
								}
							],
							"children": []
						}, {
							"inline": [{
								"text": "体罰禁止の趣旨や虐待防止対策は、厚生労働省（こども家庭庁に移管）の「児童虐待に関する法令・指針等一覧」等で整理されています。叩く・叩きつける・ぶつける・投げつけるなどの行為は、しつけを名目にしても禁止されています。",
								"bold": false
							}],
							"children": []
						}]
					}],
					"sources": [{
						"name": "こども家庭庁「体罰等によらない子育てのために」",
						"url": "https://www.cfa.go.jp/policies/jidougyakutai/taibatsu"
					}, {
						"name": "厚生労働省「児童虐待に関する法令・指針等一覧」",
						"url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kodomo/kodomo_kosodate/dv/hourei.html"
					}],
					"mustIds": []
				}
			]
		},
		{
			"slug": "dads-mindset",
			"title": "パパの心構え：パートナーの観察と育児の分担",
			"order": 8,
			"lastVerified": "2026-08-15",
			"sources": [
				{
					"name": "こども家庭庁 健やか親子21 テーマ2 妊産婦の健康（2024-03 PDF）",
					"url": "https://sukoyaka21.cfa.go.jp/wp-content/uploads/2024/03/thema2_202403.pdf"
				},
				{
					"name": "厚生労働省 こころの耳（産褥期うつ病 用語解説）",
					"url": "https://kokoro.mhlw.go.jp/glossaries/word-1566"
				},
				{
					"name": "日本家族計画協会（JFPA）健康チャンネル（NCCHD 研究紹介）",
					"url": "https://www.jfpa.or.jp/jfpa_ic/post_136"
				},
				{
					"name": "国立成育医療研究センター（父親の産前・産後うつ リスク要因 プレスリリース）",
					"url": "https://www.ncchd.go.jp/press/2023/0901.html"
				},
				{
					"name": "厚生労働省 父親の仕事と育児両立読本（パンフレット）",
					"url": "https://www.mhlw.go.jp/bunya/koyoukintou/pamphlet/09.html"
				},
				{
					"name": "国立成育医療研究センター（父親支援マニュアル プレスリリース）",
					"url": "https://www.ncchd.go.jp/press/2025/0130.html"
				},
				{
					"name": "品川区（妊娠・出産・子育てに関するご相談）",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/kenkou-byouki/20240524161540.html"
				},
				{
					"name": "品川区（子育てネウボラ相談）",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-kateisoudan/hpg000000505.html"
				}
			],
			"must": ["postpartum"],
			"description": "出産は、パパの生活と心も変えます",
			"sections": [
				{
					"level": 1,
					"heading": "",
					"anchor": "top",
					"blocks": [{
						"kind": "paragraph",
						"inline": [{
							"text": "出産は、パパの生活と心も変えます。産後は、母も父も心の不調になりやすい時期です。国や自治体も、サインを知っておくことを勧めています。育児の分担と相談先は、遅くなる前に決めておきましょう。",
							"bold": false
						}]
					}],
					"sources": [{
						"name": "こども家庭庁 健やか親子21 テーマ2 妊産婦の健康（2024-03 PDF）",
						"url": "https://sukoyaka21.cfa.go.jp/wp-content/uploads/2024/03/thema2_202403.pdf"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "産後うつ（母）のサインを知る",
					"anchor": "産後うつ-母-のサインを知る",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "産後うつ病（産褥期うつ病）は、分娩後 6〜8 週程度の産褥期に起こりやすいうつ病です。急激な身体的変化・ホルモン変化に加え、育児という心理社会的変化が同時に起こるため、時に自殺や無理心中などのおそれも指摘されています。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [
									{
										"text": "こども家庭庁の「健やか親子21」では、「産後うつ病の可能性のある方は",
										"bold": false
									},
									{
										"text": "約 10人に1人",
										"bold": true
									},
									{
										"text": "」（令和4年度 母子保健事業の実施状況等について）とされています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [
									{
										"text": "同じ資料で挙げられている主なリスク因子は「",
										"bold": false
									},
									{
										"text": "サポート不足",
										"bold": true
									},
									{
										"text": "」「妊娠中のうつ症状や不安」「精神疾患の既往」で、家族からのサポート不足が明確なリスク因子として位置づけられています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "産後 4 週間頃は、母親が安心して身体を回復させながら育児を行うことが心の状態にとってとても大切です（パパが負担を分担する絶好の時期でもあります）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "妻が「気分が重い、なぜだか涙が出てしまう、赤ちゃんをかわいいと思えない、何もする気がならない、眠れない、急にイライラする」といった状態が続いているなら、「疲れているだけ」とは思わず気にかけましょう。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "厚生労働省は「育児を抱え込ませない社会的サポートが重要です」としています。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "こども家庭庁 健やか親子21 テーマ2 妊産婦の健康（2024-03 PDF）",
						"url": "https://sukoyaka21.cfa.go.jp/wp-content/uploads/2024/03/thema2_202403.pdf"
					}, {
						"name": "厚生労働省 こころの耳（産褥期うつ病 用語解説）",
						"url": "https://kokoro.mhlw.go.jp/glossaries/word-1566"
					}],
					"mustIds": ["postpartum"]
				},
				{
					"level": 3,
					"heading": "パパが観察できるサインと声かけ",
					"anchor": "パパが観察できるサインと声かけ",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "上記のサインが 2 週間ほど続く、または日常生活に支障が出る程度なら「気のせい」と思わず、本人に直接声をかけます。ポイントは、体調や悩みを抱えていないかなど、",
										"bold": false
									},
									{
										"text": "コミュニケーションをとって確認する",
										"bold": true
									},
									{
										"text": "ことです。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "「おかしいよ」のような評価の言葉ではなく、体調と悩みを確認する問いかけ（体調はどう？ 何か心配事は？ 今夜は全部私がやるから休んで）を、毎日短い時間をつくって続けるのがポイントです。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "妻だけでなく、ご家族やパートナーからの相談も品川区の保健センターが受け付けています（保健師・助産師・栄養士・歯科衛生士が対応）。電話だけでなく、乳幼児健診などの母子保健事業に来所した際にも相談できます。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "こども家庭庁 健やか親子21 テーマ2 妊産婦の健康（2024-03 PDF）",
						"url": "https://sukoyaka21.cfa.go.jp/wp-content/uploads/2024/03/thema2_202403.pdf"
					}, {
						"name": "品川区（妊娠・出産・子育てに関するご相談）",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/kenkou-byouki/20240524161540.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "パパも産後うつになる",
					"anchor": "パパも産後うつになる",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [
									{
										"text": "父親も対象です。国立成育医療研究センターによると、父親の産前・産後のうつ病発症率は",
										"bold": false
									},
									{
										"text": "約 10％前後",
										"bold": true
									},
									{
										"text": "とされ、",
										"bold": false
									},
									{
										"text": "母親と同様な頻度",
										"bold": true
									},
									{
										"text": "で起こります。母親だけでなく父親も両親学級などに参加して準備することが勧められています。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "国立成育医療研究センターの研究（2023 年発表）では、父親の産前・産後期のうつ病のリスク要因は「強い不安」「こども時代の困難な体験」「パートナーの妊娠前のうつ病既往」「家族関係の問題」などで、母親の一般的なリスク要因と共通しています。「周囲や家族のサポート不足」がある場合、リスクは約 2 倍になるとされています。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "一般社団法人日本家族計画協会（JFPA）は、父親向けのメンタルヘルス教材「パパコト『頑張りすぎちゃうお父さんへ』」も公開しています。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "パパ自身に同じサイン（気分の落ち込み・イライラ・不眠・育児への関心低下）が 2 週間ほど続くなら、妻と同様に相談窓口の利用を勧めます。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "国立成育医療研究センター（父親の産前・産後うつ リスク要因 プレスリリース）",
						"url": "https://www.ncchd.go.jp/press/2023/0901.html"
					}, {
						"name": "日本家族計画協会（JFPA）健康チャンネル（NCCHD 研究紹介）",
						"url": "https://www.jfpa.or.jp/jfpa_ic/post_136"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "父親支援は行政の正式な事業になっている",
					"anchor": "父親支援は行政の正式な事業になっている",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [{
								"text": "国立成育医療研究センターが 2025 年に「支援者のための父親支援マニュアル」を公開しました（日本初・自治体向け）。こども家庭庁の研究班として作成され、「すべての父親を対象にした取り組み」を既存の母子保健・子育て支援事業に追加できることがポイントです。自治体の父親支援（父親向け教室・健診問診票の父親記入欄など）を見かけたら利用するのがおすすめです。",
								"bold": false
							}],
							"children": []
						}]
					}],
					"sources": [{
						"name": "国立成育医療研究センター（父親支援マニュアル プレスリリース）",
						"url": "https://www.ncchd.go.jp/press/2025/0130.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "相談先（品川区）",
					"anchor": "相談先-品川区",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "品川区の区保健センター（品川・大井・荏原）は、妊娠・出産・子育てに関する相談を保健師・助産師などの専門職が受け付けています。妊婦・母親だけでなく、ご家族やパートナーからのご相談も受付けています。",
									"bold": false
								}],
								"children": [
									{
										"inline": [{
											"text": "品川保健センター 電話：03-3474-2903",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "大井保健センター 電話：03-3772-2666",
											"bold": false
										}],
										"children": []
									},
									{
										"inline": [{
											"text": "荏原保健センター 電話：03-3788-7016",
											"bold": false
										}],
										"children": []
									}
								]
							},
							{
								"inline": [{
									"text": "「子育てネウボラ相談」は、13 の児童センターで保健師・看護師・教員・保育士などの資格を持つ相談員が対応します（月〜土 午前 10 時〜午後 4 時、各センターで曜日違い・予約制。対象は区内在住の乳幼児の保護者）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "心の状態が心配な場合は、厚生労働省の相談サイト「こころの耳」にも電話・メール・SNS 相談窓口があります。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "品川区（妊娠・出産・子育てに関するご相談）",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/kenkou-byouki/20240524161540.html"
						},
						{
							"name": "品川区（子育てネウボラ相談）",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-kateisoudan/hpg000000505.html"
						},
						{
							"name": "厚生労働省 こころの耳（産褥期うつ病 用語解説）",
							"url": "https://kokoro.mhlw.go.jp/glossaries/word-1566"
						}
					],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "育児の分担：パパが担えること",
					"anchor": "育児の分担-パパが担えること",
					"blocks": [{
						"kind": "paragraph",
						"inline": [{
							"text": "パパが担えることの例（厚生労働省「父親の仕事と育児両立読本」が示す父親の育児関わり方の方向性）：",
							"bold": false
						}]
					}, {
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "沐浴（赤ちゃんをいつどこに寝かせるか、着替え場所、お風呂の準備から片づけまで含めて事前確認）",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "授乳の補助（ミルクのあげ方、哺乳瓶の洗浄・消毒）",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "寝かしつけ（穏やかな言葉かけ、抱き方の事前確認）",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "おむつ替え、掃除、洗濯",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "買い物、料理（テイクアウト・宅配も活用）",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "事務手続き（役所の手続きはパパがやる候補）",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "保育所の送迎",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "両親学級などで事前に練習しておくと、実際に担いやすいとされています。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "厚生労働省 父親の仕事と育児両立読本（パンフレット）",
						"url": "https://www.mhlw.go.jp/bunya/koyoukintou/pamphlet/09.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "夫婦のコミュニケーション：責めない、抱え込まない",
					"anchor": "夫婦のコミュニケーション-責めない-抱え込まない",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "産前は「誰がどのようにサポートできるのか」をあらかじめ相談しておくことが勧められています。準備していてもうまくいかないことがある前提で、家族・子育て経験者・助産師や保健師などの専門職に相談しながら対応します。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "育児環境の確認リスト（産後は自宅で過ごすか、赤ちゃんの部屋・場所、上の子の育児、入院中の交通手段、育児用品、予防接種の予定、パパママの職場復帰タイミングなど）を、妊娠中から夫婦で共有しておくと、産後の駆け引きが減ります。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [
									{
										"text": "産後直後は一時的な気分の変動（マタニティブルーズと呼ばれるもの）もよくあります。「育児向きにならない」と責めるのは逆効果で、公的な指針の核心は「",
										"bold": false
									},
									{
										"text": "ひとりで抱え込まない",
										"bold": true
									},
									{
										"text": "」ことです（厚労省は「育児を抱え込ませない社会的サポートが重要です」としています）。不調のサインが見えたら、上の相談先へ早めに相談します。",
										"bold": false
									}
								],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "こども家庭庁 健やか親子21 テーマ2 妊産婦の健康（2024-03 PDF）",
						"url": "https://sukoyaka21.cfa.go.jp/wp-content/uploads/2024/03/thema2_202403.pdf"
					}, {
						"name": "厚生労働省 こころの耳（産褥期うつ病 用語解説）",
						"url": "https://kokoro.mhlw.go.jp/glossaries/word-1566"
					}],
					"mustIds": []
				}
			]
		},
		{
			"slug": "procedures",
			"title": "品川区の給付と手続き：早見表",
			"order": 9,
			"lastVerified": "2026-08-15",
			"sources": [
				{
					"name": "すこやか医療費",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-iryohizyosei/hpg000017744.html"
				},
				{
					"name": "保育園等保育料一覧（令和7年9月1日施行）",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-hoyou/kodomo-hoyou-hoikuen/hpg000028019.html"
				},
				{
					"name": "児童手当",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-iryohizyosei/hpg000027168.html"
				},
				{
					"name": "妊婦支援給付",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/20230120091157.html"
				},
				{
					"name": "出産一時金",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-kenkouhoken/procedure-kenkouhoken-hokenkyuuhu/hpg000001524.html"
				},
				{
					"name": "入園手続",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-hoyou/kodomo-hoyou-hoikuen/hpg000027973.html"
				},
				{
					"name": "しながわほじょきん",
					"url": "https://TOSUKUi.github.io/shinagawa-hojokin/"
				},
				{
					"name": "出生届",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-koseki/procedure-koseki-todokede/hpg000001411.html"
				},
				{
					"name": "産婦・1カ月児健診",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/20260213150439.html"
				},
				{
					"name": "予防接種",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000033448.html"
				},
				{
					"name": "乳幼児健診",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"
				},
				{
					"name": "家庭あんしんセンター",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-kateisoudan/hpg000000504.html"
				},
				{
					"name": "品川区役所",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/shisetsu/shisetsu-kuyakusyo/shisetsu-kuyakusyo-shinagawakuyakusyo/index.html"
				}
			],
			"must": [],
			"description": "品川区の育児の支援：医療費助成、児童手当、妊婦のための支援給付、出産育児一時金、保育園",
			"sections": [
				{
					"level": 1,
					"heading": "",
					"anchor": "top",
					"blocks": [{
						"kind": "paragraph",
						"inline": [{
							"text": "品川区の育児の支援：医療費助成、児童手当、妊婦のための支援給付、出産育児一時金、保育園。赤ちゃんの月齢の順にまとめているので、今やるべき手続きがすぐに分かります。問い合わせ先も載せています。",
							"bold": false
						}]
					}],
					"sources": [{
						"name": "品川区役所",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/shisetsu/shisetsu-kuyakusyo/shisetsu-kuyakusyo-shinagawakuyakusyo/index.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "品川区の主な育児支援制度",
					"anchor": "品川区の主な育児支援制度",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "子どもすこやか医療費助成",
									"bold": true
								}, {
									"text": "：子どもが医療機関を受診した際の窓口医療費（保険診療分）を区が助成する制度。対象は「0歳～18歳（高校3年生相当年齢、18歳に達した日以後の最初の3月31日まで）」で、受給要件は「子どもの住所が品川区にあること」「子どもが健康保険に加入していること」。未就学児は「乳幼児医療証（マル乳）」（0歳から6歳に達する日以後最初の3月31日まで）を使い、都内の医療機関の窓口で「窓口での医療費自己負担分の支払いが不要になります」。有効期間は毎年9月30日までで、毎年9月下旬頃までに新しい医療証が郵送されます（更新の手続きは不要）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "児童手当",
									"bold": true
								}, {
									"text": "：0歳～3歳未満は月額15,000円、3歳～高校生年代は第1子・第2子が月額10,000円、第3子（0歳～高校生年代）は月額30,000円。令和6年10月分から所得制限等が撤廃されています。原則隔月（偶数月）に年6回、各支給月の10日頃に入金。品川区では子育て応援課手当医療助成担当（区役所本庁舎7階、電話03-5742-6721）へ郵送または電子申請で申請します。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "妊婦のための支援給付事業（妊娠・出産時の支援給付）",
									"bold": true
								}, {
									"text": "：区独自の「出生時支援金」に相当する現行制度です。「妊娠届出後と出生届出後に面談を受けた方はそれぞれ5万円の給付金を申請できます」（合計10万円）。妊娠時分は妊娠届出後の「妊婦相談（初回面談）」で、出産後分は出生後の「すくすく赤ちゃん訪問」で受け、二次元コードから申請します。申請期限は妊娠時分が「胎児の心拍が確認されてから2年間」、出産後分が「出産予定日の8週間前から2年間」。なお「東京都赤ちゃんファースト10万円分は、別途申請が必要です」。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "出産育児一時金（国民健康保険加入者）",
									"bold": true
								}, {
									"text": "：品川区国民健康保険に加入して出産した場合は「出生児1人につき50万円支給」。妊娠4カ月（85日）以上の死産・流産・人工妊娠中絶でも支給。申請は出産日の翌日から2年間。窓口での差額負担を減らす「直接支払制度」または「受取代理制度」（出産前、出産予定日の2カ月前から受付）を利用できます。担当は国保医療年金課給付係（電話03-5742-6677）。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "すこやか医療費",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-iryohizyosei/hpg000017744.html"
						},
						{
							"name": "児童手当",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-iryohizyosei/hpg000027168.html"
						},
						{
							"name": "妊婦支援給付",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/20230120091157.html"
						},
						{
							"name": "出産一時金",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-kenkouhoken/procedure-kenkouhoken-hokenkyuuhu/hpg000001524.html"
						}
					],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "申請のタイミングと窓口",
					"anchor": "申請のタイミングと窓口",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [{
								"text": "子どもすこやか医療費助成",
								"bold": true
							}, {
								"text": "：子どもが生まれたとき、または品川区へ転入したときに申請。「異動日(出生日・転入日)から6カ月以内に申請すると異動日から資格が発生します。ただし、6カ月を過ぎて申請した場合は、申請した日からの資格となります」。窓口（子育て応援課、本庁舎7階、電話03-5742-9174）・郵送・電子申請のいずれも可能。",
								"bold": false
							}],
							"children": []
						}, {
							"inline": [
								{
									"text": "児童手当",
									"bold": true
								},
								{
									"text": "：初めての子の出生により受給資格が生じた日の翌日から",
									"bold": false
								},
								{
									"text": "15日以内",
									"bold": true
								},
								{
									"text": "に申請（15日特例：出生日・転入日が月末に近い場合、翌月になっても15日以内ならその翌月分から支給）。窓口・郵送・電子申請（マイナンバーカードで電子署名）のいずれも可能。",
									"bold": false
								}
							],
							"children": []
						}]
					}],
					"sources": [{
						"name": "すこやか医療費",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-iryohizyosei/hpg000017744.html"
					}, {
						"name": "児童手当",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-iryohizyosei/hpg000027168.html"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "保育の申し込み（認可保育園）",
					"anchor": "保育の申し込み-認可保育園",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "申請方法は3つ：「電子申請（マイナポータル）」「郵送（簡易書留）」「区役所の保育入園調整課入園相談担当窓口」（窓口受付は平日午前8時30分～午後5時）。電子申請の締め切りは「申請締切日の午後11時59分まで」。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [
									{
										"text": "利用開始の1〜3か月前に申請する形です（令和8年度入園選考予定から）。例：令和8年9月入園は",
										"bold": false
									},
									{
										"text": "申請締切日8月3日（月）",
										"bold": true
									},
									{
										"text": "、結果発表日8月21日（金）。令和8年5月入園なら締切4月3日（金）。4月入園は年明け前の1次（令和9年度は",
										"bold": false
									},
									{
										"text": "11月20日（金）",
										"bold": true
									},
									{
										"text": "締切）と2月9日（火）締切の2次があり、締切から約3週間後に結果発表です。",
										"bold": false
									}
								],
								"children": []
							},
							{
								"inline": [{
									"text": "年度途中の入園は「5月から翌年の2月まで」で「3月入園は受付していません」。「ご提出いただいた申請書は、原則として当該年度2月入園の利用調整まで有効となります。翌年度4月入園を希望する場合は、改めて入園申請が必要です」。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "マイナンバーは「保育支給認定申請書 兼 保育所等利用希望申請書」への記載が必要。提出時は「番号確認」と「本人確認」の書類（マイナンバーカードや個人番号通知カード等、写真付き本人確認書類1点など）が必要です。「原則、申請書にはマイナンバーの記入が必要ですが、未記入であっても受け付けます」。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "出産予定での申請は「2月および4月入園の1次利用調整のみ」可能です。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "お問い合わせ：保育入園調整課入園相談担当 電話03-5742-6725（FAX 03-5742-6350）。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "入園手続",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-hoyou/kodomo-hoyou-hoikuen/hpg000027973.html"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "保育料（品川区）",
					"anchor": "保育料-品川区",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [{
								"text": "品川区が公表する「保育園等保育料一覧（令和7年9月1日施行）」によると、令和7年9月1日より保育料は第1子以降すべて無償（品川区内の認可保育園では食材料費の保護者負担もなし）。延長保育料等は収入階層別に別途かかるため、詳細は区公式ページで確認してください。",
								"bold": false
							}],
							"children": []
						}, {
							"inline": [{
								"text": "区の妊娠・出産・産後の支援制度とTODO一覧を整理した姉妹サイト「しながわほじょきん」も参照できます。",
								"bold": false
							}],
							"children": []
						}]
					}],
					"sources": [{
						"name": "品川区-保育園等保育料一覧（令和7年9月1日施行）",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-hoyou/kodomo-hoyou-hoikuen/hpg000028019.html"
					}, {
						"name": "しながわほじょきん",
						"url": "https://TOSUKUi.github.io/shinagawa-hojokin/"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "年齢月齢別の手続き早見",
					"anchor": "年齢月齢別の手続き早見",
					"blocks": [],
					"sources": [],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "0 か月（生まれた直後）",
					"anchor": "0-か月-生まれた直後",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "出生届",
									"bold": true
								}, {
									"text": "：「生まれた日を含め14日以内」に、父・母の本籍地／届出人の所在地／出生地のいずれかの区市役所・町村役場に届出。届出人は父または母（署名は本人が自署必要、押印は任意）。届書は「病院に用意されています」。品川区では、出生届の提出と同日に「児童に関する手当・子どもの医療費助成」（子育て応援課）や「子どもの国民健康保険の加入」（国保医療年金課）の手続きも可能です。お問い合わせ：戸籍住民課戸籍住民担当 電話03-5742-6657。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "国民健康保険に加入",
									"bold": true
								}, {
									"text": "：国保加入世帯は、出生届と同日に子どもの国保加入手続きができる（国保医療年金課）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "医療証（子どもすこやか医療費助成）は上記「申請のタイミング」のとおり、出生日から6カ月以内に申請。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [{
						"name": "出生届",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-koseki/procedure-koseki-todokede/hpg000001411.html"
					}, {
						"name": "すこやか医療費",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-iryohizyosei/hpg000017744.html"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "1〜2 か月",
					"anchor": "1-2-か月",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [{
								"text": "1か月児健康診査",
								"bold": true
							}, {
								"text": "：「生後28日目～41日目までに1回」。品川区では公費助成（6,000円を上限）を行い、助産師等による育児相談・授乳相談も可能です。お問い合わせ：品川保健センター 保健事業係 電話03-3474-2221。",
								"bold": false
							}],
							"children": []
						}, {
							"inline": [{
								"text": "予防接種開始",
								"bold": true
							}, {
								"text": "：品川区では「生後2カ月の接種開始にあわせて、はじめの予防接種予診票（接種券）をご自宅に送付します」。届くのは「誕生月の翌月末または翌々月の中旬」（例：4月前半生まれ→5月末発送）。対象は五種混合（1期初回3回）、小児用肺炎球菌、B型肝炎、ロタウイルス。",
								"bold": false
							}],
							"children": []
						}]
					}],
					"sources": [{
						"name": "産婦・1カ月児健診",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/20260213150439.html"
					}, {
						"name": "予防接種",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000033448.html"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "3 か月以降（BCG）",
					"anchor": "3-か月以降-bcg",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [{
								"text": "BCG",
								"bold": true
							}, {
								"text": "：品川区の公式スケジュールでは、予診票は「生後5カ月」に送付され、接種は「満1歳誕生日の前日まで 1回（標準的には、生後5カ月～8カ月）」です（※「生後3カ月」ではなく、公式は5〜8カ月が標準の記載）。",
								"bold": false
							}],
							"children": []
						}, {
							"inline": [{
								"text": "予診票が届いたら、親子健康手帳（母子健康手帳）と一緒に実施医療機関（区内契約医療機関）に持参して接種します。",
								"bold": false
							}],
							"children": []
						}]
					}],
					"sources": [{
						"name": "予防接種",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000033448.html"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "1 歳",
					"anchor": "1-歳",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [{
								"text": "予防接種（1歳の予診票）",
								"bold": true
							}, {
								"text": "：五種混合（1期追加1回）、小児用肺炎球菌（追加1回）、MR（麻しん・風しん）1期（1歳～2歳誕生日の前日までに1回）、水痘（1歳～3歳誕生日の前日までに、3カ月以上あけて2回）。",
								"bold": false
							}],
							"children": []
						}, {
							"inline": [{
								"text": "1歳6カ月児健診",
								"bold": true
							}, {
								"text": "：保健センターでの集団健診（1歳7カ月前後。案内通知は受診日の前月上旬に郵送）。",
								"bold": false
							}],
							"children": []
						}]
					}],
					"sources": [{
						"name": "予防接種",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000033448.html"
					}, {
						"name": "乳幼児健診",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"
					}],
					"mustIds": []
				},
				{
					"level": 3,
					"heading": "2 歳",
					"anchor": "2-歳",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [{
							"inline": [{
								"text": "2歳児歯科健診",
								"bold": true
							}, {
								"text": "：品川・大井・荏原の各保健センターで月2〜3回実施（予約制、案内通知は受診日の前月上旬に郵送）。希望者はフッ化物塗布（880円）の予防処置も予約可能。",
								"bold": false
							}],
							"children": []
						}, {
							"inline": [{
								"text": "MR（麻しん・風しん）2期は「小学校に入る前年度の3月31日までに1回」（年長の4月に予診票送付）。",
								"bold": false
							}],
							"children": []
						}]
					}],
					"sources": [{
						"name": "乳幼児健診",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"
					}, {
						"name": "予防接種",
						"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000033448.html"
					}],
					"mustIds": []
				},
				{
					"level": 2,
					"heading": "常用の問い合わせ先",
					"anchor": "常用の問い合わせ先",
					"blocks": [{
						"kind": "list",
						"ordered": false,
						"items": [
							{
								"inline": [{
									"text": "品川区役所（代表）",
									"bold": true
								}, {
									"text": "：電話03-3777-1111。開庁時間：月曜日～金曜日 午前8時30分～午後5時（火曜は一部窓口午後7時まで、第2・4日曜は一部窓口で午前8時30分～午後5時まで開庁）。休業日は土・日（日曜開庁日を除く）・祝日・年末年始（12月29日～1月3日）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "保育入園調整課入園相談担当",
									"bold": true
								}, {
									"text": "：電話03-5742-6725（FAX 03-5742-6350）。区役所第二庁舎7階。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "子育て応援課手当医療助成担当",
									"bold": true
								}, {
									"text": "：電話03-5742-9174（医療費助成）・03-5742-6721（児童手当等）、FAX 03-5742-6387。本庁舎7階、平日午前8時30分～午後5時。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "国保医療年金課給付係",
									"bold": true
								}, {
									"text": "（出産育児一時金など）：電話03-5742-6677（FAX 03-5742-6876）。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "家庭あんしんセンター",
									"bold": true
								}, {
									"text": "（子育て支援センター・相談・一時預かり）：品川区平塚2-12-2、電話03-5749-1032。開館：月曜～土曜 午前9時～午後6時。「子育てのこと、子どもの発達、性格などちょっと気がかりなことや心配なことを相談できます」。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "母子保健・健診・予防接種（健康課）",
									"bold": true
								}, {
									"text": "：健康課保健衛生担当 電話03-5742-6745（FAX 03-5742-6883）。予防接種は品川区保健予防課 電話03-5742-9152（FAX 03-5742-6013）。保健センター：品川03-3474-2225／大井03-3772-2666／荏原03-3788-7013。",
									"bold": false
								}],
								"children": []
							},
							{
								"inline": [{
									"text": "妊婦のための支援給付事業コールセンター",
									"bold": true
								}, {
									"text": "：電話03-6731-6732（祝日を除く月曜～金曜 午前8時30分～午後5時15分）。",
									"bold": false
								}],
								"children": []
							}
						]
					}],
					"sources": [
						{
							"name": "品川区役所",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/shisetsu/shisetsu-kuyakusyo/shisetsu-kuyakusyo-shinagawakuyakusyo/index.html"
						},
						{
							"name": "入園手続",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-hoyou/kodomo-hoyou-hoikuen/hpg000027973.html"
						},
						{
							"name": "すこやか医療費",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-iryohizyosei/hpg000017744.html"
						},
						{
							"name": "出産一時金",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-kenkouhoken/procedure-kenkouhoken-hokenkyuuhu/hpg000001524.html"
						},
						{
							"name": "家庭あんしんセンター",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-kateisoudan/hpg000000504.html"
						},
						{
							"name": "産婦・1カ月児健診",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/20260213150439.html"
						},
						{
							"name": "予防接種",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000033448.html"
						},
						{
							"name": "妊婦支援給付",
							"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/20230120091157.html"
						}
					],
					"mustIds": []
				}
			]
		}
	],
	"mustItems": [
		{
			"id": "sids",
			"label": "SIDS 予防（仰向け寝・固めのマットレス・枕なし・喫煙回避）",
			"chapterSlug": "newborn-care",
			"chapterTitle": "新生児のお世話の基本",
			"anchor": "sids-乳幼児突然死症候群-とは",
			"canonical": true
		},
		{
			"id": "sleep-risk",
			"label": "うつ伏せ寝・添い寝のリスク",
			"chapterSlug": "newborn-care",
			"chapterTitle": "新生児のお世話の基本",
			"anchor": "うつ伏せ寝・添い寝のリスク",
			"canonical": true
		},
		{
			"id": "head-shape",
			"label": "頭の形（向き癖への対処・タミータイムは起きている時のみ）",
			"chapterSlug": "newborn-care",
			"chapterTitle": "新生児のお世話の基本",
			"anchor": "頭の形-向き癖・後頭部の偏平-絶壁-への対処",
			"canonical": true
		},
		{
			"id": "hip",
			"label": "股関節脱臼のチェック（おむつ替え時の開排）",
			"chapterSlug": "newborn-care",
			"chapterTitle": "新生児のお世話の基本",
			"anchor": "股関節-股関節発育不良-ddh-の観察",
			"canonical": true
		},
		{
			"id": "vaccines",
			"label": "定期予防接種の漏れ防止（スケジュール管理・品川区の助成）",
			"chapterSlug": "vaccines",
			"chapterTitle": "予防接種：いつ打つか・費用・忘れたらどうするか",
			"anchor": "生後月齢ごとの目安-0-2歳",
			"canonical": true
		},
		{
			"id": "eyes",
			"label": "目の問題（斜視・弱視は早期発見が決め手）",
			"chapterSlug": "checkups",
			"chapterTitle": "健診と、受診すべきサイン",
			"anchor": "発見されやすい年齢とサイン",
			"canonical": true
		},
		{
			"id": "carseat",
			"label": "チャイルドシート常時着用（乳児は後ろ向き）",
			"chapterSlug": "safety",
			"chapterTitle": "事故の予防：家と車の中",
			"anchor": "正しく使わなければ意味がない",
			"canonical": true
		},
		{
			"id": "choking",
			"label": "誤飲・窒息予防（小さな物・コード・ビニール袋）",
			"chapterSlug": "safety",
			"chapterTitle": "事故の予防：家と車の中",
			"anchor": "窒息時の応急処置-ハイムリック法は1歳以上のみ",
			"canonical": true
		},
		{
			"id": "accident",
			"label": "転落・やけど・溺水・熱中症予防",
			"chapterSlug": "safety",
			"chapterTitle": "事故の予防：家と車の中",
			"anchor": "転落-ベッド・階段・窓",
			"canonical": true
		},
		{
			"id": "no-shaking",
			"label": "揺さぶり禁止（泣き止まない時の対処法）",
			"chapterSlug": "dos-and-donts",
			"chapterTitle": "やってはいけないこと",
			"anchor": "泣き止まないときの対処-一旦離れる",
			"canonical": true
		},
		{
			"id": "honey",
			"label": "はちみつは 1 歳まで禁止（乳児ボツリヌス症）",
			"chapterSlug": "dos-and-donts",
			"chapterTitle": "やってはいけないこと",
			"anchor": "はちみつは1歳まで与えない-乳児ボツリヌス症",
			"canonical": true
		},
		{
			"id": "postpartum",
			"label": "産後うつのサインと相談窓口",
			"chapterSlug": "dads-mindset",
			"chapterTitle": "パパの心構え：パートナーの観察と育児の分担",
			"anchor": "産後うつ-母-のサインを知る",
			"canonical": true
		}
	],
	"searchIndex": [
		{
			"slug": "day-of-birth",
			"title": "出産直前から直後までやる手続き",
			"order": 1,
			"fullText": "赤ちゃんが生まれた直後、期限のある手続きがいくつもあります。出生届、国民健康保険の加入、児童手当などの給付の申請。どこで、いつまでに、何をすればよいのか、金額もあわせて順に説明しています。品川区では、いくつか出生届と同じ日に済ませられます。\n品川区（出生届）\n出産直前の準備：妊娠届と親子健康手帳\n品川区にお住まいで医療機関で妊娠の診断を受けた方は「妊娠届」を提出します（区役所健康課・保健センター・各地域センター、電子申請も可）。受付は平日午前8時30分から午後5時（土曜・日曜・祝日・年末年始は休）。\n\n手続きには ①妊婦の個人番号（マイナンバー）を確認できるもの ②届出者（代理人を含む）の本人確認できるもの（顔写真付き官公署発行は1点、健康保険証・年金手帳等は2点）③世帯が異なる代理人の場合のみ委任状、が必要です。\n\n届出すると親子健康手帳（母子健康手帳）のほか、妊婦健康診査・超音波検査・妊婦子宮頸がん検診・新生児聴覚検査・産婦健康診査・1か月児健康診査・妊婦歯科健康診査の各受診票が交付され、都内契約医療機関で健診費用の一部助成が受けられます。\n\n品川区では令和4年4月から「母子健康手帳」の表記を「親子健康手帳（母子健康手帳）」に変更しています（父親の育児参加を意識した命名）。\n\n品川区（妊娠届）\n出産当日〜直後の動き方（品川区の「同日にできる手続き」）\n届書（出生届）は病院に用意されているので、事前に取りに来る必要はありません（病院から依頼があった場合を除く）。\n\n出産の日の時点で用意しておくとよいもの：出生届（届書の右側には出生証明書が付いていて、医師・助産師が証明する形式）、親子健康手帳（母子健康手帳）（里帰り出産等で手元にない場合は無くても手続き可能）。\n\n命名は常用漢字、人名用漢字、ひらがな、カタカナで。\n\n品川区では出生届と同日に、次の手続きができます（品川区にお住まいの方）：\n児童に関する手当・子どもの医療費助成の確認（子育て応援課）\n子どもの国民健康保険の加入（国保医療年金課）\n出産育児一時金の申請（子どもの母が国民健康保険加入の場合）（国保医療年金課）\n品川区（出生届）\n出生届（戸籍届出）\n届出期間：生まれた日を含め14日以内。国外で生まれた場合は3カ月以内（届出はお問い合わせ）。\n\n届出人：父または母。来庁できなくても父または母の署名が必要です。\n\n届出地：父・母の本籍地、届出人の所在地、出生地のいずれかの区市役所・町村役場（つまり品川区外に住んでいても、品川区内で生まれたら品川区に届出できます）。\n\n届出に必要なもの：出生届（a3の用紙で印刷、感熱紙は不可。署名は本人が自署。令和3年9月1日より押印は任意）、出生証明書、親子健康手帳（母子健康手帳）。\n\nお問い合わせ：戸籍住民課戸籍住民担当（戸籍届出）電話 03-5742-6657（fax 03-5709-7625）。\n\n品川区（出生届）\n国民健康保険への加入\n14日以内に届出をします（「14日以内に届出をしてください」）。\n\n子どもが生まれたときの届出に必要なもの：申請者の本人確認できるもの。また世帯主および加入される方全員のマイナンバーの記載が必要なので、マイナンバーのわかるものを持ちます。\n\n出生による加入は、一部の例外を除き住民登録の手続きが完了していることが前提です（住民異動係にて住民登録）。\n\n資格の取得日は資格が発生した日までさかのぼります。\n\n届出先：区役所 国保医療年金課資格係、または品川第一・大崎第一・大井第一・荏原第一・荏原第四・八潮の各地域センター。\n\nお問い合わせ：国保医療年金課資格係 電話 03-5742-6676（fax 03-5742-6876）。\n\n品川区（国保加入）\n出産育児一時金（出産支援の給付）\n会社の健康保険、公務員等の共済組合等の被保険者および被扶養者の出産時に支給されます。\n\n支給額：一児の出産につき50万円。産科医療補償制度に加入されていない医療機関等で出産された場合は48万8千円。多胎児を出産したときは胎児数分だけ支給されます。\n\n詳細及び申請手続きは、加入している健康保険（協会けんぽ、健康保険組合）窓口、市区町村担当窓口へ確認します。\n\n品川区の場合、子どもの母が国民健康保険加入者なら、出生届と同日に国保医療年金課で出産育児一時金の申請ができます。\n\n厚労省ボッセイナビ（出産育児一時金）\n品川区（出生届）\n出産手当金（会社員の場合、健康保険から）\n出産手当金とは、女性労働者が出産のため会社等を休み、その間に給料の支払いを受けなかった場合に、仕事を休んだ期間を対象として健康保険から支給されるものです。\n\n対象期間：出産の日（実際の出産が予定日後のときは出産予定日）以前42日（多胎妊娠の場合98日）から出産の翌日以後56日目までの範囲内で、会社を休んだ期間。出産予定日より遅れた場合、その遅れた期間も含みます。\n\n支給額：1日につき被保険者の標準報酬日額の3分の2に相当する額（1円未満四捨五入）。標準報酬日額は標準報酬月額の30分の1（10円未満四捨五入）。給与の支払いがある日に給与が給付額より少ない場合は差額が支給されます。\n\n対象者：会社の健康保険、公務員等の共済組合の被保険者本人。申請手続きは、勤務先の健康保険担当者、加入している健康保険（協会けんぽ、健康保険組合）窓口で確認します。\n\n厚労省ボッセイナビ（出産手当金）\n妊婦のための支援給付（品川区実施、妊娠時5万円＋出産後5万円）\n妊娠届出後と出生届出後に面談を受けた方はそれぞれ5万円の給付金を申請できます（旧：出産・子育て応援事業）。申請者・口座名義人は妊産婦のみ。\n\n妊婦支援給付金（妊娠時）5万円（現金）：令和7年4月1日以降に妊娠届出・妊婦給付認定の申請をし、助産師・保健師等の面談を受けた妊婦の方。申請期限は胎児の心拍が確認されてから2年間。\n\n妊婦支援給付金（出産後）お子さん1人当たり5万円：令和7年4月1日以降に出産し、「すくすく赤ちゃん訪問」を受け、胎児の数の届け出をした産婦の方。申請期限は出産予定日の8週間前から2年間。\n\n申請は「妊婦相談（初回面談）」か「すくすく赤ちゃん訪問」で配布する案内に記載の二次元コード（qrコード）から。給付は妊産婦名義の銀行口座に振り込まれ、給付申請後2〜3カ月程度を予定。\n\n流産や人工妊娠中絶、死産、出産後にお子様が亡くなられた方も交付対象です（胎児心拍確認後の流産等であれば面談前でも妊娠時・出産後計10万円の対象）。\n\n東京都「赤ちゃんファースト」10万円分は別途申請が必要です。\n\nお問い合わせ：品川区妊婦のための支援給付事業コールセンター 03-6731-6732（祝日を除く月曜〜金曜 午前8時30分〜午後5時15分）。\n\n品川区（妊婦のための支援給付）\n児童手当（出生直後に申請）\n品川区在住で高校卒業まで（18歳誕生日後の最初の3月31日まで）の児童を養育している方のうち、生計中心者（所得の高い方）が対象になります。生計中心者が公務員（国立大学法人、独立行政法人等を除く）の場合は勤務先に申請します。\n\n手当額（児童1人あたりの月額）：0歳〜3歳未満 15,000円／3歳〜高校生年代（第1子・第2子）10,000円／第3子（0歳〜高校生年代）30,000円。\n\n支給は原則として隔月（偶数月）に年6回、各支給月の10日頃に指定口座へ振り込み。\n\n申請は出生日や転入した日の翌日から15日以内（15日特例）。初めてお子さんが生まれたときは、出生により受給資格が生じた日の翌日から15日以内にお住まいの区市町村へ申請が必要です。\n\n窓口：子育て応援課 手当医療助成担当（品川区役所 本庁舎7階）。電話 03-5742-6721。郵送先：〒140-8715 品川区広町2-1-36 品川区役所 子育て応援課 手当医療助成担当。\n\n品川区（児童手当）\n出生後の手続きチェックリスト\n出生届：生まれた日を含め14日以内に届出をします\n国民健康保険への加入：14日以内に届出をします\n児童手当の申請：出生日の翌日から15日以内（15日特例）に申請します\n出産育児一時金の申請：子どもの母が国民健康保険加入の場合は出生届と同日に申請できます\n品川区（出生届）\n品川区（国保加入）\n品川区（児童手当）\n厚労省ボッセイナビ（出産育児一時金）",
			"sections": [
				{
					"anchor": "top",
					"heading": "",
					"text": "赤ちゃんが生まれた直後、期限のある手続きがいくつもあります。出生届、国民健康保険の加入、児童手当などの給付の申請。どこで、いつまでに、何をすればよいのか、金額もあわせて順に説明しています。品川区では、いくつか出生届と同じ日に済ませられます。\n品川区（出生届）"
				},
				{
					"anchor": "出産直前の準備-妊娠届と親子健康手帳",
					"heading": "出産直前の準備：妊娠届と親子健康手帳",
					"text": "出産直前の準備：妊娠届と親子健康手帳\n品川区にお住まいで医療機関で妊娠の診断を受けた方は「妊娠届」を提出します（区役所健康課・保健センター・各地域センター、電子申請も可）。受付は平日午前8時30分から午後5時（土曜・日曜・祝日・年末年始は休）。\n\n手続きには ①妊婦の個人番号（マイナンバー）を確認できるもの ②届出者（代理人を含む）の本人確認できるもの（顔写真付き官公署発行は1点、健康保険証・年金手帳等は2点）③世帯が異なる代理人の場合のみ委任状、が必要です。\n\n届出すると親子健康手帳（母子健康手帳）のほか、妊婦健康診査・超音波検査・妊婦子宮頸がん検診・新生児聴覚検査・産婦健康診査・1か月児健康診査・妊婦歯科健康診査の各受診票が交付され、都内契約医療機関で健診費用の一部助成が受けられます。\n\n品川区では令和4年4月から「母子健康手帳」の表記を「親子健康手帳（母子健康手帳）」に変更しています（父親の育児参加を意識した命名）。\n\n品川区（妊娠届）"
				},
				{
					"anchor": "出産当日-直後の動き方-品川区の-同日にできる手続き",
					"heading": "出産当日〜直後の動き方（品川区の「同日にできる手続き」）",
					"text": "出産当日〜直後の動き方（品川区の「同日にできる手続き」）\n届書（出生届）は病院に用意されているので、事前に取りに来る必要はありません（病院から依頼があった場合を除く）。\n\n出産の日の時点で用意しておくとよいもの：出生届（届書の右側には出生証明書が付いていて、医師・助産師が証明する形式）、親子健康手帳（母子健康手帳）（里帰り出産等で手元にない場合は無くても手続き可能）。\n\n命名は常用漢字、人名用漢字、ひらがな、カタカナで。\n\n品川区では出生届と同日に、次の手続きができます（品川区にお住まいの方）：\n児童に関する手当・子どもの医療費助成の確認（子育て応援課）\n子どもの国民健康保険の加入（国保医療年金課）\n出産育児一時金の申請（子どもの母が国民健康保険加入の場合）（国保医療年金課）\n品川区（出生届）"
				},
				{
					"anchor": "出生届-戸籍届出",
					"heading": "出生届（戸籍届出）",
					"text": "出生届（戸籍届出）\n届出期間：生まれた日を含め14日以内。国外で生まれた場合は3カ月以内（届出はお問い合わせ）。\n\n届出人：父または母。来庁できなくても父または母の署名が必要です。\n\n届出地：父・母の本籍地、届出人の所在地、出生地のいずれかの区市役所・町村役場（つまり品川区外に住んでいても、品川区内で生まれたら品川区に届出できます）。\n\n届出に必要なもの：出生届（a3の用紙で印刷、感熱紙は不可。署名は本人が自署。令和3年9月1日より押印は任意）、出生証明書、親子健康手帳（母子健康手帳）。\n\nお問い合わせ：戸籍住民課戸籍住民担当（戸籍届出）電話 03-5742-6657（fax 03-5709-7625）。\n\n品川区（出生届）"
				},
				{
					"anchor": "国民健康保険への加入",
					"heading": "国民健康保険への加入",
					"text": "国民健康保険への加入\n14日以内に届出をします（「14日以内に届出をしてください」）。\n\n子どもが生まれたときの届出に必要なもの：申請者の本人確認できるもの。また世帯主および加入される方全員のマイナンバーの記載が必要なので、マイナンバーのわかるものを持ちます。\n\n出生による加入は、一部の例外を除き住民登録の手続きが完了していることが前提です（住民異動係にて住民登録）。\n\n資格の取得日は資格が発生した日までさかのぼります。\n\n届出先：区役所 国保医療年金課資格係、または品川第一・大崎第一・大井第一・荏原第一・荏原第四・八潮の各地域センター。\n\nお問い合わせ：国保医療年金課資格係 電話 03-5742-6676（fax 03-5742-6876）。\n\n品川区（国保加入）"
				},
				{
					"anchor": "出産育児一時金-出産支援の給付",
					"heading": "出産育児一時金（出産支援の給付）",
					"text": "出産育児一時金（出産支援の給付）\n会社の健康保険、公務員等の共済組合等の被保険者および被扶養者の出産時に支給されます。\n\n支給額：一児の出産につき50万円。産科医療補償制度に加入されていない医療機関等で出産された場合は48万8千円。多胎児を出産したときは胎児数分だけ支給されます。\n\n詳細及び申請手続きは、加入している健康保険（協会けんぽ、健康保険組合）窓口、市区町村担当窓口へ確認します。\n\n品川区の場合、子どもの母が国民健康保険加入者なら、出生届と同日に国保医療年金課で出産育児一時金の申請ができます。\n\n厚労省ボッセイナビ（出産育児一時金）\n品川区（出生届）"
				},
				{
					"anchor": "出産手当金-会社員の場合-健康保険から",
					"heading": "出産手当金（会社員の場合、健康保険から）",
					"text": "出産手当金（会社員の場合、健康保険から）\n出産手当金とは、女性労働者が出産のため会社等を休み、その間に給料の支払いを受けなかった場合に、仕事を休んだ期間を対象として健康保険から支給されるものです。\n\n対象期間：出産の日（実際の出産が予定日後のときは出産予定日）以前42日（多胎妊娠の場合98日）から出産の翌日以後56日目までの範囲内で、会社を休んだ期間。出産予定日より遅れた場合、その遅れた期間も含みます。\n\n支給額：1日につき被保険者の標準報酬日額の3分の2に相当する額（1円未満四捨五入）。標準報酬日額は標準報酬月額の30分の1（10円未満四捨五入）。給与の支払いがある日に給与が給付額より少ない場合は差額が支給されます。\n\n対象者：会社の健康保険、公務員等の共済組合の被保険者本人。申請手続きは、勤務先の健康保険担当者、加入している健康保険（協会けんぽ、健康保険組合）窓口で確認します。\n\n厚労省ボッセイナビ（出産手当金）"
				},
				{
					"anchor": "妊婦のための支援給付-品川区実施-妊娠時5万円-出産後5万円",
					"heading": "妊婦のための支援給付（品川区実施、妊娠時5万円＋出産後5万円）",
					"text": "妊婦のための支援給付（品川区実施、妊娠時5万円＋出産後5万円）\n妊娠届出後と出生届出後に面談を受けた方はそれぞれ5万円の給付金を申請できます（旧：出産・子育て応援事業）。申請者・口座名義人は妊産婦のみ。\n\n妊婦支援給付金（妊娠時）5万円（現金）：令和7年4月1日以降に妊娠届出・妊婦給付認定の申請をし、助産師・保健師等の面談を受けた妊婦の方。申請期限は胎児の心拍が確認されてから2年間。\n\n妊婦支援給付金（出産後）お子さん1人当たり5万円：令和7年4月1日以降に出産し、「すくすく赤ちゃん訪問」を受け、胎児の数の届け出をした産婦の方。申請期限は出産予定日の8週間前から2年間。\n\n申請は「妊婦相談（初回面談）」か「すくすく赤ちゃん訪問」で配布する案内に記載の二次元コード（qrコード）から。給付は妊産婦名義の銀行口座に振り込まれ、給付申請後2〜3カ月程度を予定。\n\n流産や人工妊娠中絶、死産、出産後にお子様が亡くなられた方も交付対象です（胎児心拍確認後の流産等であれば面談前でも妊娠時・出産後計10万円の対象）。\n\n東京都「赤ちゃんファースト」10万円分は別途申請が必要です。\n\nお問い合わせ：品川区妊婦のための支援給付事業コールセンター 03-6731-6732（祝日を除く月曜〜金曜 午前8時30分〜午後5時15分）。\n\n品川区（妊婦のための支援給付）"
				},
				{
					"anchor": "児童手当-出生直後に申請",
					"heading": "児童手当（出生直後に申請）",
					"text": "児童手当（出生直後に申請）\n品川区在住で高校卒業まで（18歳誕生日後の最初の3月31日まで）の児童を養育している方のうち、生計中心者（所得の高い方）が対象になります。生計中心者が公務員（国立大学法人、独立行政法人等を除く）の場合は勤務先に申請します。\n\n手当額（児童1人あたりの月額）：0歳〜3歳未満 15,000円／3歳〜高校生年代（第1子・第2子）10,000円／第3子（0歳〜高校生年代）30,000円。\n\n支給は原則として隔月（偶数月）に年6回、各支給月の10日頃に指定口座へ振り込み。\n\n申請は出生日や転入した日の翌日から15日以内（15日特例）。初めてお子さんが生まれたときは、出生により受給資格が生じた日の翌日から15日以内にお住まいの区市町村へ申請が必要です。\n\n窓口：子育て応援課 手当医療助成担当（品川区役所 本庁舎7階）。電話 03-5742-6721。郵送先：〒140-8715 品川区広町2-1-36 品川区役所 子育て応援課 手当医療助成担当。\n\n品川区（児童手当）"
				},
				{
					"anchor": "出生後の手続きチェックリスト",
					"heading": "出生後の手続きチェックリスト",
					"text": "出生後の手続きチェックリスト\n出生届：生まれた日を含め14日以内に届出をします\n国民健康保険への加入：14日以内に届出をします\n児童手当の申請：出生日の翌日から15日以内（15日特例）に申請します\n出産育児一時金の申請：子どもの母が国民健康保険加入の場合は出生届と同日に申請できます\n品川区（出生届）\n品川区（国保加入）\n品川区（児童手当）\n厚労省ボッセイナビ（出産育児一時金）"
				}
			]
		},
		{
			"slug": "newborn-care",
			"title": "新生児のお世話の基本",
			"order": 2,
			"fullText": "生後1か月は、赤ちゃんの寝かせ方が一番大事です。sids予防のための安全な睡眠、うつ伏せ寝や添い寝のリスク、沐浴、頭の形のゆがみ、股関節の確認、発熱で受診する目安、泣き止まない時の対処まで説明しています。\nこども家庭庁-赤ちゃんが安全に眠れるように（sids）\nsids（乳幼児突然死症候群）とは\nこども家庭庁の説明では、sidsは「それまで大きな異常のきざしがないのに、乳幼児が睡眠中に亡くなってしまう」原因不明の病気で、うつぶせ寝・あおむけ寝のどちらの体勢でも起こりますが、あおむけに寝かせたほうが発症率が低いことが研究でわかっています。「医学上の理由でうつぶせ寝を勧められている場合以外は、赤ちゃんの顔が見えるあおむけに寝かせましょう」（睡眠中の窒息事故の予防にも有効とされています）。\n\n令和6年（2024年）にsidsで亡くなった乳児は55名で、乳児期の死亡原因としては第3位（こども家庭庁）。\n\n厚労省は平成11年度から11月を「乳幼児突然死症候群(sids)」の対策強化月間と定めています。sids発症の危険性を低くする3つのポイントは「(1)1歳になるまでは、寝かせる時はあおむけに寝かせる (2)無理のない範囲で母乳育児を (3)たばこはやめる」（こども家庭庁のページでも「母乳で育てられている赤ちゃんのほうが、sidsの発生率が低い」ことを挙げています）。\n\n厚労省のsids対策検討会報告では、危険因子の可能性が疑われている育児環境因子として「1）うつ伏せ寝 2）人工栄養哺育 3）保護者等の習慣的喫煙 4）児の暖めすぎ」が挙げられており、平成9年度に全国規模の調査研究で各要因のオッズ比が求められています。\n\nこども家庭庁-赤ちゃんが安全に眠れるように（sids）\n政府広報オンライン-sidsの発症リスクを低くする3つのポイント\n厚労省-乳幼児突然死症候群（sids）対策に関する検討会報告\n厚労省-政策レポート「１１月は「乳幼児突然死症候群（ｓｉｄｓ）」の対策強化月間です」\n安全な睡眠環境のポイント\nこども家庭庁のリーフレット「赤ちゃんが安全に眠れるように ～1歳未満の赤ちゃんを育てるみなさまへ～」では、睡眠中の窒息のリスクを下げる5つのポイントを挙げています。\nこども家庭庁-赤ちゃんが安全に眠れるように（sids）\n寝る場所・寝具\n寝具は硬めで平坦なもの：「柔らかいクッションや傾斜のあるマットレスは避け、身体が沈まない硬めで平坦な布団やマットレスを使いましょう」。\n\n寝床には物を置かない：こども家庭庁の啓発ポスターでは「枕やタオル、衣服、よだれ掛け、ぬいぐるみなどは近くにおかないようにしましょう。下に敷くふとん・マットレスはかた（い）ものを」。\n\n赤ちゃん専用の寝床：「できるだけベビーベッドを使用し、国が定めた安全基準の検査に合格した製品であることを示す、pscマークが貼付されたベビーベッドを選びましょう」。\n\n温度調整は着るものや空調で：「掛け布団は赤ちゃんの顔にかかると窒息のリスクがあります。1歳になるまでは掛け布団は使わず、スリーパーなどの着るものや空調で寒さを調整」。\n\nこども家庭庁-赤ちゃんが安全に眠れるように（sids）\nこども家庭庁-sids普及啓発ポスター(pdf)\n喫煙・暖めすぎ\n政府広報オンライン（sidsの3つのポイント）では「乳幼児の周囲で誰かがたばこを吸うことは、sidsの発生率を高くすることがわかっている」とし、妊婦自身の喫煙や、周囲の人が吸ったたばこの副流煙を吸う「受動喫煙」も注意が必要です。\n\n厚労省の検討会報告では「保護者等の習慣的喫煙」「児の暖めすぎ（厚着・重い布団）」も危険因子として挙げられています。\n\n政府広報オンライン-sidsの発症リスクを低くする3つのポイント\n厚労省-乳幼児突然死症候群（sids）対策に関する検討会報告\nうつ伏せ寝・添い寝のリスク\n日本小児科学会の2024年改訂リーフレットに関する見解では、わが国で0歳児の死亡は年間1,500～2,000件生じており、「不慮の事故」の大半が睡眠中の窒息事故であるとし、米国のレジストリ研究を引用して「乳児突然死の72%は『安全でない睡眠環境』で発生しており、窒息（確定および疑い）例の74%は柔らかな寝具（soft-bedding）が関与する」と報告されています。\n\n同室別床（同じ部屋で別々の寝床）：日本小児科学会の見解が引用する米国小児科学会（aap）の推奨では、「少なくとも最初の6ヶ月間は、乳児が両親の部屋で、両親のベッドの近くであるが乳児用に設計された別の面（surface）で寝ることが推奨される」とされ、これによりsidsのリスクを最大50%まで減少させるとのエビデンスがあるとされています。\n\n添い寝の危険：同見解では「添い寝によって覆い被さりや挟み込みが直接死因となり死亡する月齢4以下の乳児が多い」とされています。こども家庭庁のページでも「大人の身体で赤ちゃんに覆い被さったり、口や鼻を塞いでしまったりする危険がある添い寝には注意をしましょう」とし、特に危険なケースとして ①添い寝している人が眠気を引き起こしたり注意力を低下させる薬を服用している場合 ②添い寝している人が飲酒をした場合 ③赤ちゃんが早産や低出生体重で生まれた場合 を挙げています。\n\n日本小児科学会-乳児の安全な睡眠環境の確保について（2024年改訂見解）\nこども家庭庁-赤ちゃんが安全に眠れるように（sids）\n沐浴・お風呂のポイント\n品川区の公式ページ「赤ちゃんのお世話実演動画のご紹介」では、抱っこ・おむつ交換・入浴（沐浴）・お着替えのやり方を、公益財団法人母子衛生研究会の動画で段階的に紹介しています。沐浴のポイントとして、動画紹介文に「赤ちゃんの沐浴後は保湿ケアをしっかりしましょう」と明記されています。\n\n品川区では、区内在住の生後4カ月になる前までの赤ちゃんのご家庭を助産師・保健師・児童センター職員などが訪問する「すくすく赤ちゃん訪問事業」があり、実施要綱では訪問を「生後4か月以内に1回」としています。沐浴の手順や頻度、体調に応じた対応（機嫌・体調が良くない時は湯船に入らず体拭きで代用する等の判断）は、この訪問や各保健センター（品川 03-3474-2225／大井 03-3772-2666／荏原 03-3788-7013）の相談で個別に確認できます。\n\n品川区-赤ちゃんのお世話実演動画のご紹介\n品川区-すくすく赤ちゃん訪問事業\n頭の形：向き癖・後頭部の偏平（絶壁）への対処\n国立成育医療研究センター（ncchd）の研究情報では「変形性斜頭症とは、胎生期や生後の外圧による乳児頭蓋の変形で、後頭部の平坦化を主徴とするものです。治療として、体位変換などの理学療法や、ヘルメット治療の有効性が示されており、当院では、2011年に『赤ちゃんの頭のかたち外来』を開設し、ヘルメット治療を施行しています」とされています。\n\n京都大学医学部附属病院「赤ちゃんの頭のかたち外来」では、「変形性斜頭・短頭の治療コンセプトは『除圧』であり、平坦な部分にかかる圧力を除去することが重要です。変形の主な原因が『向き癖』であるため、積極的な体位変換（＝向き癖の修正）などの理学療法をおこなうことによって頭の変形が改善することがあります。中等症以上の変形では、体位変換だけでは改善がむずかしいことがあり、ヘルメット治療が勧められます」とされています。\n\n実務的な体位変換の工夫：寝かせるたびに頭の向きを左右交互に変えること、ベビーベッドの頭側・足側を入れ替えて寝かせること（赤ちゃんは光や音のある方向に顔を向けるため）。また、赤ちゃんが起きている時間に、大人が見守りながらうつ伏せで過ごす「タミータイム（うつぶせ遊び）」を取り入れると、後頭部への圧力がかかる時間を減らせるほか、首や背中の筋肉の発達にも役立るとされています。\n\nゆがみが改善しない場合・急速に変化した場合は、ncchdや各病院の「赤ちゃんの頭のかたち外来」（ledスキャナーによる採型データに基づくヘルメットによる形状誘導療法の導入など）での診断が受けられます。\n\nncchd-変形性斜頭症に対するヘルメット療法 研究情報(pdf)\n京都大学医学部附属病院-赤ちゃんの頭のかたち外来\nncchd-形成外科（赤ちゃんの頭のかたち外来）\n股関節：股関節発育不良（ddh）の観察\n日本小児整形外科学会の「股関節脱臼」ページでは、先天性（発育性）股関節脱臼で気になる所見として「○股関節の開きが硬い ○太ももやお尻のしわの左右差 ○脚の長さがちがう ○歩き方がおかしい」を挙げており、歩き始めてから発見されることもあるとしています。\n\n日本小児整形外科学会（日本小児整形外科学会・日本整形外科超音波学会からの正しい情報を集めた解説）では、日常のケアとして コアラ抱っこ（脚が伸びた状態ではなく、お股を開いた状態のたて抱っこ） を心がけること、よこ抱っこやスリングを使う場合はお股が開くように注意すること、おむつの当て方（おむつが低い（足先方向にずれた）位置だとサイドギャザーで太ももが開けなくなるため、股関節が自然に開く位置に当てる）ことが紹介されています。\n\nおむつ替え時にあぐらの姿勢（仰向けで脚を立ててひざを内側に寄せるm字）にして、股関節の開きの左右差や太もものしわ・脚の長さの左右差を観察するとよいとされています。\n\n品川区の「1カ月児健康診査」は生後28日目～41日目に受診する制度で「身体発育状況、栄養状態、疾病及び異常の有無」などが診られます。股関節の開き（開排）が気になる場合は、この健診の場で医師・保健師に相談します。国立成育医療研究センターの乳幼児健康診査 身体診察マニュアルでは、発育性股関節形成不全の所見として「股関節開排制限」を仰臥位で確認する診察法が定義されています。\n\n日本小児整形外科学会-股関節脱臼\n日本小児整形外科学会-赤ちゃんの股関節脱臼（正しい知識と早期発見のために）\n品川区-産婦健康診査・1カ月児健康診査\n発熱：受診の目安（生後3か月未満は早めに）\n日本小児科学会（厚生労働省研究班監修）の「こどもの救急（online-qq）」では、発熱（38℃以上）が「気になる症状」として扱われており、「生後3か月未満である」が「受診が必要」とされる判定項目の一つとして挙げられています。\n\n神戸大学医学部附属病院の小児科講座の資料でも注意が必要な発熱として「乳児期早期（とくに3ヶ月未満）の発熱」を挙げ、「生後3カ月未満の発熱に関しては免疫能が未熟、症状が出にくいなどの点から慎重に対応しなければならない」「3ヶ月未満の発熱の場合は入院が必要となることが多い」とされています。\n\n品川区の時間外の相談・受診窓口：子供の健康相談室（小児救急相談）#8000（ip電話等は 03-5285-8898）、24時間対応の医療機関案内「ひまわり」03-5272-0303、救急車の要否が迷う時は東京消防庁救急相談センター #7119（ip電話は 03-3212-2323）。\n\n日本小児科学会-こどもの救急(online-qq)\n神戸大学-こどもの発熱とその対応\n品川区-休日・夜間の診療\nぐずり・泣きやまないときの対応\nこども家庭庁の「赤ちゃんが泣きやまない～泣きへの理解と対処のために～」では、首や体をしっかり支えた状態での「高い高い」や「横向き抱っこ」をして揺らすのは通常のあやしであり、これらでは「乳幼児揺さぶられ症候群」にはならないとされており、危険なのは「頭が前後に激しく揺さぶられる状態」です。\n\n「動画で紹介されている赤ちゃんの泣きへの対処法や、そのほか思いつく方法をすべて試してみましたが、それでも泣きやまない」という質問に対し、同ページでは「いろいろ試して、それでも泣きやまないことに（問題はありません）。もし泣きやまないことにイライラしそうなときは、」と続き、育児で不安なことや気になることがあったら「1人で悩まず、お住まいの市町村窓口やお近くの児童相談所にご相談ください」としています。児童相談所の虐待対応ダイヤルは全国共通3桁ダイヤル 189（いちはやく） で、お住まいの地域の児童相談所に電話がつながります（こども家庭庁）。\n\nパパ・家族への引き継ぎ：ぐずりが続き自分がイライラしそうな時は、抱っこ交代や赤ちゃんを安全な場所に預けていったん離れることが、乳幼児揺さぶられ症候群の予防の観点から重要です。品川区ではすくすく赤ちゃん訪問事業（生後4カ月になる前までに助産師・保健師が訪問）や各保健センターの予約制乳幼児健康相談で、育児の困りごとを相談できます。\n\nこども家庭庁-赤ちゃんが泣きやまない\nこども家庭庁-児童相談所虐待対応ダイヤル「189」について\n品川区-すくすく赤ちゃん訪問事業",
			"sections": [
				{
					"anchor": "top",
					"heading": "",
					"text": "生後1か月は、赤ちゃんの寝かせ方が一番大事です。sids予防のための安全な睡眠、うつ伏せ寝や添い寝のリスク、沐浴、頭の形のゆがみ、股関節の確認、発熱で受診する目安、泣き止まない時の対処まで説明しています。\nこども家庭庁-赤ちゃんが安全に眠れるように（sids）"
				},
				{
					"anchor": "sids-乳幼児突然死症候群-とは",
					"heading": "SIDS（乳幼児突然死症候群）とは",
					"text": "sids（乳幼児突然死症候群）とは\nこども家庭庁の説明では、sidsは「それまで大きな異常のきざしがないのに、乳幼児が睡眠中に亡くなってしまう」原因不明の病気で、うつぶせ寝・あおむけ寝のどちらの体勢でも起こりますが、あおむけに寝かせたほうが発症率が低いことが研究でわかっています。「医学上の理由でうつぶせ寝を勧められている場合以外は、赤ちゃんの顔が見えるあおむけに寝かせましょう」（睡眠中の窒息事故の予防にも有効とされています）。\n\n令和6年（2024年）にsidsで亡くなった乳児は55名で、乳児期の死亡原因としては第3位（こども家庭庁）。\n\n厚労省は平成11年度から11月を「乳幼児突然死症候群(sids)」の対策強化月間と定めています。sids発症の危険性を低くする3つのポイントは「(1)1歳になるまでは、寝かせる時はあおむけに寝かせる (2)無理のない範囲で母乳育児を (3)たばこはやめる」（こども家庭庁のページでも「母乳で育てられている赤ちゃんのほうが、sidsの発生率が低い」ことを挙げています）。\n\n厚労省のsids対策検討会報告では、危険因子の可能性が疑われている育児環境因子として「1）うつ伏せ寝 2）人工栄養哺育 3）保護者等の習慣的喫煙 4）児の暖めすぎ」が挙げられており、平成9年度に全国規模の調査研究で各要因のオッズ比が求められています。\n\nこども家庭庁-赤ちゃんが安全に眠れるように（sids）\n政府広報オンライン-sidsの発症リスクを低くする3つのポイント\n厚労省-乳幼児突然死症候群（sids）対策に関する検討会報告\n厚労省-政策レポート「１１月は「乳幼児突然死症候群（ｓｉｄｓ）」の対策強化月間です」"
				},
				{
					"anchor": "安全な睡眠環境のポイント",
					"heading": "安全な睡眠環境のポイント",
					"text": "安全な睡眠環境のポイント\nこども家庭庁のリーフレット「赤ちゃんが安全に眠れるように ～1歳未満の赤ちゃんを育てるみなさまへ～」では、睡眠中の窒息のリスクを下げる5つのポイントを挙げています。\nこども家庭庁-赤ちゃんが安全に眠れるように（sids）"
				},
				{
					"anchor": "寝る場所・寝具",
					"heading": "寝る場所・寝具",
					"text": "寝る場所・寝具\n寝具は硬めで平坦なもの：「柔らかいクッションや傾斜のあるマットレスは避け、身体が沈まない硬めで平坦な布団やマットレスを使いましょう」。\n\n寝床には物を置かない：こども家庭庁の啓発ポスターでは「枕やタオル、衣服、よだれ掛け、ぬいぐるみなどは近くにおかないようにしましょう。下に敷くふとん・マットレスはかた（い）ものを」。\n\n赤ちゃん専用の寝床：「できるだけベビーベッドを使用し、国が定めた安全基準の検査に合格した製品であることを示す、pscマークが貼付されたベビーベッドを選びましょう」。\n\n温度調整は着るものや空調で：「掛け布団は赤ちゃんの顔にかかると窒息のリスクがあります。1歳になるまでは掛け布団は使わず、スリーパーなどの着るものや空調で寒さを調整」。\n\nこども家庭庁-赤ちゃんが安全に眠れるように（sids）\nこども家庭庁-sids普及啓発ポスター(pdf)"
				},
				{
					"anchor": "喫煙・暖めすぎ",
					"heading": "喫煙・暖めすぎ",
					"text": "喫煙・暖めすぎ\n政府広報オンライン（sidsの3つのポイント）では「乳幼児の周囲で誰かがたばこを吸うことは、sidsの発生率を高くすることがわかっている」とし、妊婦自身の喫煙や、周囲の人が吸ったたばこの副流煙を吸う「受動喫煙」も注意が必要です。\n\n厚労省の検討会報告では「保護者等の習慣的喫煙」「児の暖めすぎ（厚着・重い布団）」も危険因子として挙げられています。\n\n政府広報オンライン-sidsの発症リスクを低くする3つのポイント\n厚労省-乳幼児突然死症候群（sids）対策に関する検討会報告"
				},
				{
					"anchor": "うつ伏せ寝・添い寝のリスク",
					"heading": "うつ伏せ寝・添い寝のリスク",
					"text": "うつ伏せ寝・添い寝のリスク\n日本小児科学会の2024年改訂リーフレットに関する見解では、わが国で0歳児の死亡は年間1,500～2,000件生じており、「不慮の事故」の大半が睡眠中の窒息事故であるとし、米国のレジストリ研究を引用して「乳児突然死の72%は『安全でない睡眠環境』で発生しており、窒息（確定および疑い）例の74%は柔らかな寝具（soft-bedding）が関与する」と報告されています。\n\n同室別床（同じ部屋で別々の寝床）：日本小児科学会の見解が引用する米国小児科学会（aap）の推奨では、「少なくとも最初の6ヶ月間は、乳児が両親の部屋で、両親のベッドの近くであるが乳児用に設計された別の面（surface）で寝ることが推奨される」とされ、これによりsidsのリスクを最大50%まで減少させるとのエビデンスがあるとされています。\n\n添い寝の危険：同見解では「添い寝によって覆い被さりや挟み込みが直接死因となり死亡する月齢4以下の乳児が多い」とされています。こども家庭庁のページでも「大人の身体で赤ちゃんに覆い被さったり、口や鼻を塞いでしまったりする危険がある添い寝には注意をしましょう」とし、特に危険なケースとして ①添い寝している人が眠気を引き起こしたり注意力を低下させる薬を服用している場合 ②添い寝している人が飲酒をした場合 ③赤ちゃんが早産や低出生体重で生まれた場合 を挙げています。\n\n日本小児科学会-乳児の安全な睡眠環境の確保について（2024年改訂見解）\nこども家庭庁-赤ちゃんが安全に眠れるように（sids）"
				},
				{
					"anchor": "沐浴・お風呂のポイント",
					"heading": "沐浴・お風呂のポイント",
					"text": "沐浴・お風呂のポイント\n品川区の公式ページ「赤ちゃんのお世話実演動画のご紹介」では、抱っこ・おむつ交換・入浴（沐浴）・お着替えのやり方を、公益財団法人母子衛生研究会の動画で段階的に紹介しています。沐浴のポイントとして、動画紹介文に「赤ちゃんの沐浴後は保湿ケアをしっかりしましょう」と明記されています。\n\n品川区では、区内在住の生後4カ月になる前までの赤ちゃんのご家庭を助産師・保健師・児童センター職員などが訪問する「すくすく赤ちゃん訪問事業」があり、実施要綱では訪問を「生後4か月以内に1回」としています。沐浴の手順や頻度、体調に応じた対応（機嫌・体調が良くない時は湯船に入らず体拭きで代用する等の判断）は、この訪問や各保健センター（品川 03-3474-2225／大井 03-3772-2666／荏原 03-3788-7013）の相談で個別に確認できます。\n\n品川区-赤ちゃんのお世話実演動画のご紹介\n品川区-すくすく赤ちゃん訪問事業"
				},
				{
					"anchor": "頭の形-向き癖・後頭部の偏平-絶壁-への対処",
					"heading": "頭の形：向き癖・後頭部の偏平（絶壁）への対処",
					"text": "頭の形：向き癖・後頭部の偏平（絶壁）への対処\n国立成育医療研究センター（ncchd）の研究情報では「変形性斜頭症とは、胎生期や生後の外圧による乳児頭蓋の変形で、後頭部の平坦化を主徴とするものです。治療として、体位変換などの理学療法や、ヘルメット治療の有効性が示されており、当院では、2011年に『赤ちゃんの頭のかたち外来』を開設し、ヘルメット治療を施行しています」とされています。\n\n京都大学医学部附属病院「赤ちゃんの頭のかたち外来」では、「変形性斜頭・短頭の治療コンセプトは『除圧』であり、平坦な部分にかかる圧力を除去することが重要です。変形の主な原因が『向き癖』であるため、積極的な体位変換（＝向き癖の修正）などの理学療法をおこなうことによって頭の変形が改善することがあります。中等症以上の変形では、体位変換だけでは改善がむずかしいことがあり、ヘルメット治療が勧められます」とされています。\n\n実務的な体位変換の工夫：寝かせるたびに頭の向きを左右交互に変えること、ベビーベッドの頭側・足側を入れ替えて寝かせること（赤ちゃんは光や音のある方向に顔を向けるため）。また、赤ちゃんが起きている時間に、大人が見守りながらうつ伏せで過ごす「タミータイム（うつぶせ遊び）」を取り入れると、後頭部への圧力がかかる時間を減らせるほか、首や背中の筋肉の発達にも役立るとされています。\n\nゆがみが改善しない場合・急速に変化した場合は、ncchdや各病院の「赤ちゃんの頭のかたち外来」（ledスキャナーによる採型データに基づくヘルメットによる形状誘導療法の導入など）での診断が受けられます。\n\nncchd-変形性斜頭症に対するヘルメット療法 研究情報(pdf)\n京都大学医学部附属病院-赤ちゃんの頭のかたち外来\nncchd-形成外科（赤ちゃんの頭のかたち外来）"
				},
				{
					"anchor": "股関節-股関節発育不良-ddh-の観察",
					"heading": "股関節：股関節発育不良（DDH）の観察",
					"text": "股関節：股関節発育不良（ddh）の観察\n日本小児整形外科学会の「股関節脱臼」ページでは、先天性（発育性）股関節脱臼で気になる所見として「○股関節の開きが硬い ○太ももやお尻のしわの左右差 ○脚の長さがちがう ○歩き方がおかしい」を挙げており、歩き始めてから発見されることもあるとしています。\n\n日本小児整形外科学会（日本小児整形外科学会・日本整形外科超音波学会からの正しい情報を集めた解説）では、日常のケアとして コアラ抱っこ（脚が伸びた状態ではなく、お股を開いた状態のたて抱っこ） を心がけること、よこ抱っこやスリングを使う場合はお股が開くように注意すること、おむつの当て方（おむつが低い（足先方向にずれた）位置だとサイドギャザーで太ももが開けなくなるため、股関節が自然に開く位置に当てる）ことが紹介されています。\n\nおむつ替え時にあぐらの姿勢（仰向けで脚を立ててひざを内側に寄せるm字）にして、股関節の開きの左右差や太もものしわ・脚の長さの左右差を観察するとよいとされています。\n\n品川区の「1カ月児健康診査」は生後28日目～41日目に受診する制度で「身体発育状況、栄養状態、疾病及び異常の有無」などが診られます。股関節の開き（開排）が気になる場合は、この健診の場で医師・保健師に相談します。国立成育医療研究センターの乳幼児健康診査 身体診察マニュアルでは、発育性股関節形成不全の所見として「股関節開排制限」を仰臥位で確認する診察法が定義されています。\n\n日本小児整形外科学会-股関節脱臼\n日本小児整形外科学会-赤ちゃんの股関節脱臼（正しい知識と早期発見のために）\n品川区-産婦健康診査・1カ月児健康診査"
				},
				{
					"anchor": "発熱-受診の目安-生後3か月未満は早めに",
					"heading": "発熱：受診の目安（生後3か月未満は早めに）",
					"text": "発熱：受診の目安（生後3か月未満は早めに）\n日本小児科学会（厚生労働省研究班監修）の「こどもの救急（online-qq）」では、発熱（38℃以上）が「気になる症状」として扱われており、「生後3か月未満である」が「受診が必要」とされる判定項目の一つとして挙げられています。\n\n神戸大学医学部附属病院の小児科講座の資料でも注意が必要な発熱として「乳児期早期（とくに3ヶ月未満）の発熱」を挙げ、「生後3カ月未満の発熱に関しては免疫能が未熟、症状が出にくいなどの点から慎重に対応しなければならない」「3ヶ月未満の発熱の場合は入院が必要となることが多い」とされています。\n\n品川区の時間外の相談・受診窓口：子供の健康相談室（小児救急相談）#8000（ip電話等は 03-5285-8898）、24時間対応の医療機関案内「ひまわり」03-5272-0303、救急車の要否が迷う時は東京消防庁救急相談センター #7119（ip電話は 03-3212-2323）。\n\n日本小児科学会-こどもの救急(online-qq)\n神戸大学-こどもの発熱とその対応\n品川区-休日・夜間の診療"
				},
				{
					"anchor": "ぐずり・泣きやまないときの対応",
					"heading": "ぐずり・泣きやまないときの対応",
					"text": "ぐずり・泣きやまないときの対応\nこども家庭庁の「赤ちゃんが泣きやまない～泣きへの理解と対処のために～」では、首や体をしっかり支えた状態での「高い高い」や「横向き抱っこ」をして揺らすのは通常のあやしであり、これらでは「乳幼児揺さぶられ症候群」にはならないとされており、危険なのは「頭が前後に激しく揺さぶられる状態」です。\n\n「動画で紹介されている赤ちゃんの泣きへの対処法や、そのほか思いつく方法をすべて試してみましたが、それでも泣きやまない」という質問に対し、同ページでは「いろいろ試して、それでも泣きやまないことに（問題はありません）。もし泣きやまないことにイライラしそうなときは、」と続き、育児で不安なことや気になることがあったら「1人で悩まず、お住まいの市町村窓口やお近くの児童相談所にご相談ください」としています。児童相談所の虐待対応ダイヤルは全国共通3桁ダイヤル 189（いちはやく） で、お住まいの地域の児童相談所に電話がつながります（こども家庭庁）。\n\nパパ・家族への引き継ぎ：ぐずりが続き自分がイライラしそうな時は、抱っこ交代や赤ちゃんを安全な場所に預けていったん離れることが、乳幼児揺さぶられ症候群の予防の観点から重要です。品川区ではすくすく赤ちゃん訪問事業（生後4カ月になる前までに助産師・保健師が訪問）や各保健センターの予約制乳幼児健康相談で、育児の困りごとを相談できます。\n\nこども家庭庁-赤ちゃんが泣きやまない\nこども家庭庁-児童相談所虐待対応ダイヤル「189」について\n品川区-すくすく赤ちゃん訪問事業"
				}
			]
		},
		{
			"slug": "vaccines",
			"title": "予防接種：いつ打つか・費用・忘れたらどうするか",
			"order": 3,
			"fullText": "予防接種は2か月から始まり、2歳まで続きます。どのワクチンをどの月齢に打つか、どれが無料でどれが有料か、品川区での予約方法、忘れた時の相談先を説明しています。接種した日の夜、赤ちゃんの様子をどう見たらよいかも載せています。\n品川区-こどもの予防接種\n0〜2歳の予防接種スケジュール\nvaccine-schedule\n下表は品川区公式ページ「こどもの予防接種」（更新日：令和8年4月1日）の「予防接種スケジュール」表と、厚生労働省の各ワクチン公式ページの標準スケジュールに基づく。品川区では「予防接種を受ける時期になりましたら、予防接種予診票（接種券）をご自宅に送付します」とされている。\n予診票送付時期 ワクチン 回数 接種方法（品川区ページの記載）\n出生前（妊娠届提出後） rsウイルス 1回 妊娠28週0日～36週6日の間に1回（妊婦本人）\n生後2カ月 五種混合（ジフテリア・百日せき・破傷風・不活化ポリオ・hib） 3回 生後2カ月から20日以上の間隔で3回（標準は20～56日の間隔）\n生後2カ月 小児用肺炎球菌 最大3回 開始が生後2カ月～6カ月の方は3回（生後24カ月まで）ほか、開始年齢により異なる\n生後2カ月 b型肝炎 3回 27日以上間隔で2回、1回目から139日以上間隔で3回目（1歳誕生日の前日まで。標準は生後2～8カ月に3回）\n生後2カ月 ロタウイルス（経口） 2〜3回 ロタリックス：生後6週0日～24週0日に2回。ロタテック：生後6週0日～32週0日に3回。1回目は生後14週6日までに開始\n生後5カ月 bcg（結核） 1回 満1歳誕生日の前日まで1回（標準は生後5～8カ月）\n1歳 五種混合 1回 初回3回完了後、3回目から6か月以上あけて1回（厚労省の標準）\n1歳 小児用肺炎球菌 1回 最後の初回接種から60日以上あけて、生後12か月以降に1回（厚労省の標準）\n1歳 mr（麻しん・風しん） 1回 1歳～2歳誕生日の前日までに1回\n1歳 水痘（水ぼうそう） 2回 1歳～3歳誕生日の前日までに3カ月以上あけて2回（標準は1回目生後12～15カ月、2回目は1回目から6カ月～1年）\n3歳・4歳 日本脳炎 3回 3歳で6～28日間の間隔で2回、4歳で1期初回完了後6か月以上あけて1回（7歳6か月前日まで）※3歳以降のため言及のみ\n※2歳以降は、9歳で日本脳炎2期1回、11歳で二種混合（dt）2期1回、年長でmr2期1回、小学6年（女子）でhpvが品川区の送付表にある。\n品川区-こどもの予防接種\n厚労省-予防接種・ワクチン情報\n品川区-こどもの予防接種\n厚労省-ロタウイルスワクチン\n厚労省-bcgワクチン\n厚労省-mrワクチン\n厚労省-日本脳炎ワクチン\n厚労省-5種混合ワクチン\n厚労省-子どもの肺炎球菌ワクチン\n接種したらチェック（todo）\n打ち終わったワクチンにチェックを入れられます。チェックはこの端末に保存され、次回も残ります。\n五種混合 1回目（生後2カ月〜）\n小児用肺炎球菌 1回目（生後2カ月〜）\nb型肝炎 1回目（生後2カ月〜）\nロタウイルス 1回目（生後2カ月〜）\n五種混合 2回目（生後3〜4カ月）\n小児用肺炎球菌 2回目（生後3〜4カ月）\nb型肝炎 2回目（生後3〜4カ月）\nロタウイルス 2回目（生後3〜4カ月）\n五種混合 3回目（生後4〜5カ月）\n小児用肺炎球菌 3回目（生後4〜5カ月）\nb型肝炎 3回目（生後5カ月〜）\nロタウイルス 3回目（ロタテックの場合のみ・生後4〜6カ月）\nbcg（生後5〜8カ月）\n五種混合 追加（1歳〜）\n小児用肺炎球菌 追加（1歳〜）\nmr（麻しん・風しん）（1歳〜2歳誕生日前日まで）\n水痘 1回目（生後12〜15カ月）\n水痘 2回目（1歳〜3歳）\n日本脳炎 1期初回 1回目（3歳）\n日本脳炎 1期初回 2回目（3歳）\n日本脳炎 1期追加（4歳）\n品川区-こどもの予防接種\n厚労省-予防接種・ワクチン情報\n生後月齢ごとの目安（0〜2歳）\n生後2か月：五種混合1回目・小児用肺炎球菌1回目・b型肝炎1回目・ロタウイルス1回目（経口）。4つは同じ日に同時接種が可能とされています。\n\n生後3か月・4か月頃：五種混合2・3回目・肺炎球菌2・3回目・b型肝炎2・3回目（各ワクチンの間隔ルールに従い、おおむね1か月おき）。\n\n生後5～8か月：bcgを1回。\n\n生後12か月～：五種混合1期追加（3回目から6か月以上）、肺炎球菌追加（3回目から60日以上）、mr1期（2歳誕生日の前日まで）、水痘1回目（生後12～15カ月）。水痘2回目は1回目から6か月～1年あけて1歳～3歳の間に。\n\n3歳：日本脳炎1期初回2回（本章は対象外のため言及のみ。品川区では3歳で予診票送付）。\n\n品川区-こどもの予防接種\n厚労省-予防接種・ワクチン情報\n定期（i）・任意（ii）：どこが無料で、どこにお金がかかるか\n定期（i類）＝原則無料、任意（ii類）＝原則自己負担（品川区が一部助成） です。以下で詳しく説明します。\n定期予防接種（i類）：予防接種法に基づき市町村（品川区）が実施・費用を負担する接種。品川区は対象者へ個別に予診票（接種券）を郵送し、区内契約医療機関で接種する仕組み。里帰り出産等で23区の契約医療機関以外で定期接種を受けた場合も、品川区は「接種費用の一部または全額を払い戻す」制度を持つ、と公式ページに明記されている（定期接種の費用は区が負う）。\n\n品川区ページは「接種期間を超えての接種は原則として全額自己負担となりますので、ご注意ください」と記載しており、対象年齢（期間）内の定期接種は区民に無料であることが分かる。\n\n任意予防接種（ii類）：保護者の判断で受けるもので、品川区ページは「任意接種（保護者の判断で接種するかどうか決めるもの）」と定義。原則自己負担だが、品川区は一部を助成。\nmrワクチン：定期の対象年齢を過ぎて任意接種した2歳から19歳未満は「全額助成＝無料（2回まで）」（定期予防接種を受けられなかった回数のみ）。\nインフルエンザ：生後6カ月～高校3年生相当、接種期間10月1日～翌年1月31日。皮下接種は1回2,000円助成（12歳以下は2回まで、13歳以上は1回まで）、経鼻接種（フルミスト）は4,000円助成（2歳以上18歳以下、1回で完了）。\nおたふくかぜ：1歳～年長相当で1回あたり3,000円助成（2回まで）（品川区の任意接種費用助成の一環）。\n品川区-こどもの予防接種\n品川区-里帰り出産等の理由により23区の契約医療機関以外で定期予防接種を受ける方\n品川区での接種方法\n品川区は「予防接種を受ける時期になりましたら、予防接種予診票（接種券）をご自宅に送付します。予診票が届きましたら、親子健康手帳（母子健康手帳）と一緒に実施医療機関に持参し、予防接種を受けましょう」と案内。\n\n接種場所：品川区内の契約医療機関（小児科等）。リストは区ページの「こどもの予防接種契約医療機関一覧表（pdf）」。接種は医療機関への予約（「医療機関に接種予約のうえ…接種を受けます」と区ページに案内）が必要。\n\n持ち物：予防接種予診票（接種券）＋親子健康手帳（母子健康手帳）。\n\n保護者が同伴できない場合：普段からお子さんの健康状態をよく知っている方が、保護者が記入した「委任状」を持参すれば同伴可能（同伴者は「委任状」と「予診票」を持参し、医師診察後の同意時に署名）。\n\n予診票を紛失・転入した方：前の住所地の予診票は使えず、品川区電子申請サービスでの「こどもの予防接種予診票交付申請」が必要（母子健康手帳の出生届出済証明のページと予防接種記録のページの画像を添付）。3～4営業日で郵送。急ぎの場合は母子健康手帳を持って窓口で即時発行（品川区保健予防課〈区役所7f 広町2-1-36〉、品川・大井・荏原の各保健センター。いずれも午前8時30分～午後5時、土日祝・年末年始を除く。荏原保健センターは仮移転先 西五反田6-6-6）。\n\n23区外で定期接種（里帰り出産・入院等）：事前に「予防接種依頼書交付申請」をして予防接種依頼書を受領し、接種後に費用の一部または全額の払い戻し（助成申請）。\n\n問い合わせ：品川区保健予防課（予防接種担当）電話 03-5742-9152（fax 03-5742-6013）、品川保健センター 03-3474-2225、大井保健センター 03-3772-2666、荏原保健センター 03-3788-7013。\n\n品川区-こどもの予防接種\n品川区-【品川区の予防接種】\n品川区-rsウイルス 定期予防接種\n品川区-子どもの予防接種関係\n品川区-里帰り出産等の理由により23区の契約医療機関以外で定期予防接種を受ける方\n接種を忘れた・遅れた場合\n期間内の接種を逃したとき：品川区ページは「接種期間を超えての接種は原則として全額自己負担となりますので、ご注意ください」と案内しているため、対象期間内に受けることが原則。\n\n長期療養の特別の事情がある場合：品川区ページは「長期療養を必要とする疾病にかかった等の特別の事情により、やむを得ず定期予防接種の対象期間内にその予防接種を受けることができなかったと認められた方は、対象年齢を過ぎていても、特別な事情がなくなった日から2年間は、接種できなかった予防接種を定期接種として受けられる」という趣旨で案内（長期療養特例）。\n\n予診票が間に合わなかった・失くした：品川区電子申請サービスで交付申請（母子健康手帳の画像データが必要）。\n\nmr（麻しん・風しん）を定期の対象年齢で受けそこねた場合：2歳から19歳未満の任意接種を品川区が全額助成（＝無料、2回まで）。\n\n相談先：接種可否・追いつき（キャッチアップ）の時期の相談は品川区保健予防課（予防接種担当）03-5742-9152、または品川・大井・荏原の各保健センター（電話番号は前節）。\n\n品川区-こどもの予防接種\n接種前後の注意\n発熱・体調が心配な場合：厚生労働省の各ワクチン公式ページ（予防接種ガイドライン）では、「明らかな発熱を呈している方」「重篤な急性疾患にかかっていることが明らかな方」「その予防接種の成分でアナフィラキシーを起こしたことがある方」などが接種不適当者として挙げられ、接種を行わないこととされている。また、接種の判断に注意を要する接種要注意者も定められており、接種判断は接種医療機関の医師が行う。\n\n当日朝：自宅で一度検温してから受診するよう推奨（医療機関でも検温）。厚労省は37.5℃以上を発熱のひとつの目安とする一方、体温調節機能が未熟な小児・幼児は37.5℃以上でも元気になることがよくあるため、接種に不安がある場合はお子さんの様子を知っている医師に相談する、とされている。\n\n接種後：発熱や接種部位の発赤・腫れなどの副反応が出ることがある。気になる変化・症状がある場合は接種した医療機関に相談。定期予防接種の副反応については「予防接種健康被害救済制度」（健康被害が接種によるものであると厚生労働大臣が認定したとき給付を受けることができる制度）がある、と品川区ページも案内している。\n\n厚労省-5種混合ワクチン\npfizer-faqで学ぶワクチン（接種前に熱がある場合）\n品川区-こどもの予防接種\n品川区-rsウイルス 定期予防接種",
			"sections": [
				{
					"anchor": "top",
					"heading": "",
					"text": "予防接種は2か月から始まり、2歳まで続きます。どのワクチンをどの月齢に打つか、どれが無料でどれが有料か、品川区での予約方法、忘れた時の相談先を説明しています。接種した日の夜、赤ちゃんの様子をどう見たらよいかも載せています。\n品川区-こどもの予防接種"
				},
				{
					"anchor": "0-2歳の予防接種スケジュール",
					"heading": "0〜2歳の予防接種スケジュール",
					"text": "0〜2歳の予防接種スケジュール\nvaccine-schedule\n下表は品川区公式ページ「こどもの予防接種」（更新日：令和8年4月1日）の「予防接種スケジュール」表と、厚生労働省の各ワクチン公式ページの標準スケジュールに基づく。品川区では「予防接種を受ける時期になりましたら、予防接種予診票（接種券）をご自宅に送付します」とされている。\n予診票送付時期 ワクチン 回数 接種方法（品川区ページの記載）\n出生前（妊娠届提出後） rsウイルス 1回 妊娠28週0日～36週6日の間に1回（妊婦本人）\n生後2カ月 五種混合（ジフテリア・百日せき・破傷風・不活化ポリオ・hib） 3回 生後2カ月から20日以上の間隔で3回（標準は20～56日の間隔）\n生後2カ月 小児用肺炎球菌 最大3回 開始が生後2カ月～6カ月の方は3回（生後24カ月まで）ほか、開始年齢により異なる\n生後2カ月 b型肝炎 3回 27日以上間隔で2回、1回目から139日以上間隔で3回目（1歳誕生日の前日まで。標準は生後2～8カ月に3回）\n生後2カ月 ロタウイルス（経口） 2〜3回 ロタリックス：生後6週0日～24週0日に2回。ロタテック：生後6週0日～32週0日に3回。1回目は生後14週6日までに開始\n生後5カ月 bcg（結核） 1回 満1歳誕生日の前日まで1回（標準は生後5～8カ月）\n1歳 五種混合 1回 初回3回完了後、3回目から6か月以上あけて1回（厚労省の標準）\n1歳 小児用肺炎球菌 1回 最後の初回接種から60日以上あけて、生後12か月以降に1回（厚労省の標準）\n1歳 mr（麻しん・風しん） 1回 1歳～2歳誕生日の前日までに1回\n1歳 水痘（水ぼうそう） 2回 1歳～3歳誕生日の前日までに3カ月以上あけて2回（標準は1回目生後12～15カ月、2回目は1回目から6カ月～1年）\n3歳・4歳 日本脳炎 3回 3歳で6～28日間の間隔で2回、4歳で1期初回完了後6か月以上あけて1回（7歳6か月前日まで）※3歳以降のため言及のみ\n※2歳以降は、9歳で日本脳炎2期1回、11歳で二種混合（dt）2期1回、年長でmr2期1回、小学6年（女子）でhpvが品川区の送付表にある。\n品川区-こどもの予防接種\n厚労省-予防接種・ワクチン情報\n品川区-こどもの予防接種\n厚労省-ロタウイルスワクチン\n厚労省-bcgワクチン\n厚労省-mrワクチン\n厚労省-日本脳炎ワクチン\n厚労省-5種混合ワクチン\n厚労省-子どもの肺炎球菌ワクチン"
				},
				{
					"anchor": "接種したらチェック-todo",
					"heading": "接種したらチェック（todo）",
					"text": "接種したらチェック（todo）\n打ち終わったワクチンにチェックを入れられます。チェックはこの端末に保存され、次回も残ります。\n五種混合 1回目（生後2カ月〜）\n小児用肺炎球菌 1回目（生後2カ月〜）\nb型肝炎 1回目（生後2カ月〜）\nロタウイルス 1回目（生後2カ月〜）\n五種混合 2回目（生後3〜4カ月）\n小児用肺炎球菌 2回目（生後3〜4カ月）\nb型肝炎 2回目（生後3〜4カ月）\nロタウイルス 2回目（生後3〜4カ月）\n五種混合 3回目（生後4〜5カ月）\n小児用肺炎球菌 3回目（生後4〜5カ月）\nb型肝炎 3回目（生後5カ月〜）\nロタウイルス 3回目（ロタテックの場合のみ・生後4〜6カ月）\nbcg（生後5〜8カ月）\n五種混合 追加（1歳〜）\n小児用肺炎球菌 追加（1歳〜）\nmr（麻しん・風しん）（1歳〜2歳誕生日前日まで）\n水痘 1回目（生後12〜15カ月）\n水痘 2回目（1歳〜3歳）\n日本脳炎 1期初回 1回目（3歳）\n日本脳炎 1期初回 2回目（3歳）\n日本脳炎 1期追加（4歳）\n品川区-こどもの予防接種\n厚労省-予防接種・ワクチン情報"
				},
				{
					"anchor": "生後月齢ごとの目安-0-2歳",
					"heading": "生後月齢ごとの目安（0〜2歳）",
					"text": "生後月齢ごとの目安（0〜2歳）\n生後2か月：五種混合1回目・小児用肺炎球菌1回目・b型肝炎1回目・ロタウイルス1回目（経口）。4つは同じ日に同時接種が可能とされています。\n\n生後3か月・4か月頃：五種混合2・3回目・肺炎球菌2・3回目・b型肝炎2・3回目（各ワクチンの間隔ルールに従い、おおむね1か月おき）。\n\n生後5～8か月：bcgを1回。\n\n生後12か月～：五種混合1期追加（3回目から6か月以上）、肺炎球菌追加（3回目から60日以上）、mr1期（2歳誕生日の前日まで）、水痘1回目（生後12～15カ月）。水痘2回目は1回目から6か月～1年あけて1歳～3歳の間に。\n\n3歳：日本脳炎1期初回2回（本章は対象外のため言及のみ。品川区では3歳で予診票送付）。\n\n品川区-こどもの予防接種\n厚労省-予防接種・ワクチン情報"
				},
				{
					"anchor": "定期-i-・任意-ii-どこが無料で-どこにお金がかかるか",
					"heading": "定期（I）・任意（II）：どこが無料で、どこにお金がかかるか",
					"text": "定期（i）・任意（ii）：どこが無料で、どこにお金がかかるか\n定期（i類）＝原則無料、任意（ii類）＝原則自己負担（品川区が一部助成） です。以下で詳しく説明します。\n定期予防接種（i類）：予防接種法に基づき市町村（品川区）が実施・費用を負担する接種。品川区は対象者へ個別に予診票（接種券）を郵送し、区内契約医療機関で接種する仕組み。里帰り出産等で23区の契約医療機関以外で定期接種を受けた場合も、品川区は「接種費用の一部または全額を払い戻す」制度を持つ、と公式ページに明記されている（定期接種の費用は区が負う）。\n\n品川区ページは「接種期間を超えての接種は原則として全額自己負担となりますので、ご注意ください」と記載しており、対象年齢（期間）内の定期接種は区民に無料であることが分かる。\n\n任意予防接種（ii類）：保護者の判断で受けるもので、品川区ページは「任意接種（保護者の判断で接種するかどうか決めるもの）」と定義。原則自己負担だが、品川区は一部を助成。\nmrワクチン：定期の対象年齢を過ぎて任意接種した2歳から19歳未満は「全額助成＝無料（2回まで）」（定期予防接種を受けられなかった回数のみ）。\nインフルエンザ：生後6カ月～高校3年生相当、接種期間10月1日～翌年1月31日。皮下接種は1回2,000円助成（12歳以下は2回まで、13歳以上は1回まで）、経鼻接種（フルミスト）は4,000円助成（2歳以上18歳以下、1回で完了）。\nおたふくかぜ：1歳～年長相当で1回あたり3,000円助成（2回まで）（品川区の任意接種費用助成の一環）。\n品川区-こどもの予防接種\n品川区-里帰り出産等の理由により23区の契約医療機関以外で定期予防接種を受ける方"
				},
				{
					"anchor": "品川区での接種方法",
					"heading": "品川区での接種方法",
					"text": "品川区での接種方法\n品川区は「予防接種を受ける時期になりましたら、予防接種予診票（接種券）をご自宅に送付します。予診票が届きましたら、親子健康手帳（母子健康手帳）と一緒に実施医療機関に持参し、予防接種を受けましょう」と案内。\n\n接種場所：品川区内の契約医療機関（小児科等）。リストは区ページの「こどもの予防接種契約医療機関一覧表（pdf）」。接種は医療機関への予約（「医療機関に接種予約のうえ…接種を受けます」と区ページに案内）が必要。\n\n持ち物：予防接種予診票（接種券）＋親子健康手帳（母子健康手帳）。\n\n保護者が同伴できない場合：普段からお子さんの健康状態をよく知っている方が、保護者が記入した「委任状」を持参すれば同伴可能（同伴者は「委任状」と「予診票」を持参し、医師診察後の同意時に署名）。\n\n予診票を紛失・転入した方：前の住所地の予診票は使えず、品川区電子申請サービスでの「こどもの予防接種予診票交付申請」が必要（母子健康手帳の出生届出済証明のページと予防接種記録のページの画像を添付）。3～4営業日で郵送。急ぎの場合は母子健康手帳を持って窓口で即時発行（品川区保健予防課〈区役所7f 広町2-1-36〉、品川・大井・荏原の各保健センター。いずれも午前8時30分～午後5時、土日祝・年末年始を除く。荏原保健センターは仮移転先 西五反田6-6-6）。\n\n23区外で定期接種（里帰り出産・入院等）：事前に「予防接種依頼書交付申請」をして予防接種依頼書を受領し、接種後に費用の一部または全額の払い戻し（助成申請）。\n\n問い合わせ：品川区保健予防課（予防接種担当）電話 03-5742-9152（fax 03-5742-6013）、品川保健センター 03-3474-2225、大井保健センター 03-3772-2666、荏原保健センター 03-3788-7013。\n\n品川区-こどもの予防接種\n品川区-【品川区の予防接種】\n品川区-rsウイルス 定期予防接種\n品川区-子どもの予防接種関係\n品川区-里帰り出産等の理由により23区の契約医療機関以外で定期予防接種を受ける方"
				},
				{
					"anchor": "接種を忘れた・遅れた場合",
					"heading": "接種を忘れた・遅れた場合",
					"text": "接種を忘れた・遅れた場合\n期間内の接種を逃したとき：品川区ページは「接種期間を超えての接種は原則として全額自己負担となりますので、ご注意ください」と案内しているため、対象期間内に受けることが原則。\n\n長期療養の特別の事情がある場合：品川区ページは「長期療養を必要とする疾病にかかった等の特別の事情により、やむを得ず定期予防接種の対象期間内にその予防接種を受けることができなかったと認められた方は、対象年齢を過ぎていても、特別な事情がなくなった日から2年間は、接種できなかった予防接種を定期接種として受けられる」という趣旨で案内（長期療養特例）。\n\n予診票が間に合わなかった・失くした：品川区電子申請サービスで交付申請（母子健康手帳の画像データが必要）。\n\nmr（麻しん・風しん）を定期の対象年齢で受けそこねた場合：2歳から19歳未満の任意接種を品川区が全額助成（＝無料、2回まで）。\n\n相談先：接種可否・追いつき（キャッチアップ）の時期の相談は品川区保健予防課（予防接種担当）03-5742-9152、または品川・大井・荏原の各保健センター（電話番号は前節）。\n\n品川区-こどもの予防接種"
				},
				{
					"anchor": "接種前後の注意",
					"heading": "接種前後の注意",
					"text": "接種前後の注意\n発熱・体調が心配な場合：厚生労働省の各ワクチン公式ページ（予防接種ガイドライン）では、「明らかな発熱を呈している方」「重篤な急性疾患にかかっていることが明らかな方」「その予防接種の成分でアナフィラキシーを起こしたことがある方」などが接種不適当者として挙げられ、接種を行わないこととされている。また、接種の判断に注意を要する接種要注意者も定められており、接種判断は接種医療機関の医師が行う。\n\n当日朝：自宅で一度検温してから受診するよう推奨（医療機関でも検温）。厚労省は37.5℃以上を発熱のひとつの目安とする一方、体温調節機能が未熟な小児・幼児は37.5℃以上でも元気になることがよくあるため、接種に不安がある場合はお子さんの様子を知っている医師に相談する、とされている。\n\n接種後：発熱や接種部位の発赤・腫れなどの副反応が出ることがある。気になる変化・症状がある場合は接種した医療機関に相談。定期予防接種の副反応については「予防接種健康被害救済制度」（健康被害が接種によるものであると厚生労働大臣が認定したとき給付を受けることができる制度）がある、と品川区ページも案内している。\n\n厚労省-5種混合ワクチン\npfizer-faqで学ぶワクチン（接種前に熱がある場合）\n品川区-こどもの予防接種\n品川区-rsウイルス 定期予防接種"
				}
			]
		},
		{
			"slug": "checkups",
			"title": "健診と、受診すべきサイン",
			"order": 4,
			"fullText": "品川区では、1か月、4か月、6〜7か月、9〜10か月、1歳6か月、3歳に健診があります。いつどこへ行き、何を調べるのか、目や発熱で受診すべきサインまで説明しています。\n品川区-乳幼児の健康診査・相談\n品川区の乳幼児健診スケジュール\n品川区の公式ページ（更新日：令和7年5月7日）の健診スケジュールは以下のとおりです。\n1カ月児健診：生後28日～41日目まで\n4カ月児健診：4カ月頃（各保健センター、午前）\n6～7カ月児健診：6～7カ月の間（都内契約医療機関）\n9～10カ月児健診：9～10カ月の間（都内契約医療機関）\n1歳6カ月児健診：1歳7カ月前後（各保健センター、午後）\n3歳児健診：3歳4カ月前後（各保健センター、午後、目の検査（屈折検査）も実施）\n実施場所は品川・大井・荏原の3つの保健センター。「お住まいの地域によって、管轄の保健センターが異なります」（管轄一覧表を区サイトで確認）。管轄外の保健センターでも受診できます。\n\n予約・案内：「案内通知は、受診日の前月上旬に郵送します。予約制のため人数制限がありますので、希望に添えない場合があります」。受診日の変更は案内通知到着後に管轄保健センターへ連絡します。\n\n持ち物：区ページで持ち物の明示があるのは6～7カ月健診で「医療機関にお問い合わせの上、親子健康手帳（母子健康手帳）と受診票を持参し、ご受診ください」。厚労省の乳幼児健康診査実施要綱では健診時に「母子健康手帳の内容を参考とし、それまでの発達状況等を保護者の記録も含めて確認」することとされています。\n\n6～7カ月・9～10カ月の受診票は4カ月児健診で配布されます（「4カ月児健診で、6～7カ月児健診受診票・9～10カ月児健診受診票を配布します」）。\n\n健診の費用は区ページに明記されていません。厚労省の実施要綱では委託医療機関は健診の費用を健康診査票により市町村に請求する仕組み（公費で決済される仕組み）です。自己負担の有無は区に確認してください。\n\n保健センターの電話（品川区公式ページより）：\n品川保健センター 03-3474-2225（北品川3-11-22）\n大井保健センター 03-3772-2666（大井2-27-20）\n荏原保健センター 03-3788-7013（荏原2-9-6）\n保健センターでは、予約制の乳幼児健康相談・発達健診・心理相談（「ことばが遅い、落ち着きがないなどの相談」）も実施しています。\n\n品川区-乳幼児の健康診査・相談\n厚労省-乳幼児に対する健康診査の実施について(平成10年児発第285号)\n1か月児健診（生後28日～41日目）と産婦健診\n品川区では「1か月児健康診査の公費助成を実施しています」。\n\n受診時期と回数：生後28日目～41日目までに1回（区ページでは「1カ月児健診：生後28日～41日目まで」）。\n\n対象：品川区に住民登録があり、受診結果の区への提出に同意する方。\n\n内容（区ページ原文）：「身体発育状況、栄養状態、疾病及び異常の有無、新生児聴覚検査、先天性代謝異常検査の実施状況の確認、ビタミンk2投与の実施状況の確認及び必要に応じて投与、育児上問題となる事項」。\n\n費用：6,000円を上限に公費助成（「6,000円を上限に助成します。上限を超えた場合…は自己負担となります」）。受診票は母子健康手帳交付時に渡す「親と子の保健バック」に入っています。\n\n母体の「産婦健康診査」も対象：産後概ね2週間と概ね1カ月の合計2回（原則、出産後2か月以内）まで、1回につき5,000円を上限に助成。内容は問診・診察・体重測定・血圧測定・尿検査・母体の回復状況・乳房の状態の確認と、心の健康のためのアンケートです。\n\n問い合わせ：1か月児健診は品川保健センター 保健事業係 03-3474-2221、産婦健診は健康課 保健衛生担当 03-5742-6745。\n\n品川区-産婦健康診査・1カ月児健康診査\n健診で見る項目\n厚労省の乳幼児健康診査実施要綱（母子保健法第12・13条に基づく）で、1歳6か月児（満1歳6か月を超え満2歳に達しない幼児）の一般健康診査項目は、①身体発育状況 ②栄養状態 ③脊柱及び胸郭の疾病及び異常の有無 ④皮膚の疾病の有無 ⑤四肢運動障害の有無 ⑥精神発達の状況 ⑦言語障害の有無 ⑧予防接種の実施状況 ⑨育児上問題となる事項（生活習慣の自立、社会性の発達、しつけ、食事、事故等）⑩その他の疾病及び異常の有無。目的は「運動機能、視聴覚等の障害、精神発達の遅滞等障害を持った児童を早期に発見」することです。\n\n股関節：国立成育医療研究センター（ncchd）の乳幼児健康診査 身体診察マニュアルでは、発育性股関節形成不全（先天性股関節脱臼）の所見として「股関節開排制限」を診ており、仰臥位で股関節・膝関節を90度～100度に曲げ、股関節を開いたときの床からの角度が20度以上ある場合を陽性とします。\n\n心雑音：同マニュアルでは「顔面蒼白や眼瞼結膜の蒼白がある場合や明らかな頻脈、心尖部および心基部の収縮期雑音が聴取される場合には、精密検査のため医療機関を紹介する」とされています。\n\n聴覚：母子健康手帳に新生児聴覚スクリーニングの結果が記載されているか確認し、「両耳リファー」などの記載がある場合は精密聴覚検査機関の受診を確認します。\n\n1か月児健診では、新生児聴覚検査・先天性代謝異常検査（マススクリーニング）の結果確認と、必要に応じたビタミンk2の投与も行われます（品川区ページ）。\n\n厚労省-乳幼児に対する健康診査の実施について(平成10年児発第285号)\nncchd-乳幼児健康診査 身体診察マニュアル\n品川区-産婦健康診査・1カ月児健康診査\n目の問題：レッドリフレックスと斜視・弱視の早期発見\n乳幼児の目は0〜2歳の感受性の高い時期に病気が起こると回復しにくい弱視になりやすいため、公的ガイドでは早期発見が強調されています。\nncchd-眼科\nレッドリフレックス（赤反射）チェック\nncchdの乳幼児健康診査 身体診察マニュアル（コラム3）の定義：「直像鏡（検影器）を使用して眼底からの反射を瞳孔から観察する方法であり、角膜混濁、白内障、網膜芽細胞腫、網膜剥離などの疑いのある児を簡便に検出できる有効な方法である。両眼から同じ大きさの黄橙色の明るい反射が観察できれば正常である」。\n\n判定：「左右眼いずれかでも反射が観察できない児は、早急に眼科での精密検査を勧告する」。\n\n日本産婦人科医会の研修ノート（新生児・乳幼児の視覚スクリーニング）でも、1か月児健診・乳幼児健診での診察項目として「red reflex 法」が挙げられており、「片方の反射が暗い場合には、強度の屈折異常が疑われる。片方の反射がない場合には、そちらの眼に白内障などの器質的疾患がある可能性が高い」としています。\n\nncchd-乳幼児健康診査 身体診察マニュアル\n日本産婦人科医会-視覚スクリーニングの実際\n斜視・弱視の早期発見の重要性\nncchdの斜視の解説（ページ原文）：「視覚刺激に対する感受性の高い乳幼児期に斜視が起こると、斜視の眼に抑制がかかって視力の発達が阻害されて弱視になります。また両眼で物を同時に見て奥行き感や立体感をとらえる能力、すなわち両眼視機能…が発達しません」。\n\n「斜視の症状として視線のずれのほか、頭位異常（頭をかしげている、顔を曲げている、顎を上げている等）や片目つぶりが目立つことがあります。気になる症状があれば、ぜひ早めに眼科を受診してください」。\n\n「乳児内斜視など早期に発症する斜視は、両眼視機能の発達が阻害されやすく、両眼視を獲得するためには早期に診断して眼位を矯正する治療（手術、眼鏡、プリズム治療）を行う必要があります」。\n\nncchd眼科ページでは「とくに0～2歳は視覚刺激への感受性が高いため、目の病気が起こると高度の弱視になってしまいます」としています。\n\nncchd-斜視\nncchd-眼科\n発見されやすい年齢とサイン\n厚生労働科学研究（amed）の診療マニュアル（視覚異常の早期発見と眼科健診）より：\n固視・追視（物をじっと見つめたり、目で追うしぐさ）がはっきり観察されるようになるのは生後2か月頃。親御さんの顔を見ない、視線が合わない、表情や反応が乏しければ両眼の眼疾患を疑います。\n生後3か月以降になると、見る反応が乏しい、目の揺れ（眼振）、目の動きの異常、片目の視線がずれている（斜視）、顔を曲げて見る（頭位異常）などの異常サインがはっきりしてきます。\n乳児内斜視が顕性化するのは生後2～4か月頃で、「2～3カ月放置すると、両眼視機能（立体視）獲得するチャンスが極めて少なくなります」。\n「弱視の有病率は約2%」で、3歳児健診の眼科健診（視力検査で左右眼いずれかでも0.5が確認できなかった児は眼科精密検査が勧告）で発見されれば、矯正眼鏡と弱視訓練によって就学までに治癒することが多いとされています。視覚の感受性期間は6～8歳までで、過ぎると不可逆的な視力障害となります。\n品川区の3歳児健診では「目の検査（屈折検査）も実施しています」（品川区公式ページ）。\n\named-視覚聴覚二重障害の医療 診療マニュアル\n品川区-乳幼児の健康診査・相談\n気になる症状：発熱と受診の目安\n日本小児科学会（厚生労働省研究班監修）の「こどもの救急（online-qq）」では、発熱（38℃以上）が「気になる症状」として扱われており、その判定項目に「生後3か月未満である」が「受診が必要」とされる項目の一つとして挙げられています（元気がなくぐったりしている、呼吸があらく苦しそう、顔色・皮膚色が悪い、ずっとうとうとしている と並ぶ）。\n\n神戸大学医学部附属病院の小児科講座の資料（こどもの発熱とその対応）でも、注意が必要な発熱として「乳児期早期（とくに3ヶ月未満）の発熱」を挙げ、「生後3カ月未満の発熱に関しては免疫能が未熟、症状が出にくいなどの点から慎重に対応しなければならない」「3ヶ月未満の発熱の場合は入院が必要となることが多い」としています。\n\n日本小児科学会-こどもの救急(online-qq)\n神戸大学-こどもの発熱とその対応\n品川区の時間外の救急・相談窓口\n子供の健康相談室（小児救急相談）#8000（ip電話などは03-5285-8898）：小児科医師・看護師が電話で相談に応じます。受付は平日（休日・年末年始を除く）18時～翌8時、土日祝・年末年始は8時～翌8時。\n\n品川区こども夜間救急室（昭和医科大学病院 中央棟4階、旗の台1-5-8）電話 03-3784-8181：平日夜間20時～23時（受付22時30分まで）、第2・第4土曜日夜間17時～22時（受付21時まで）。外傷には対応できません。\n\n第1・第3・第5土曜日夜間（17時～22時）は品川区医師会休日診療所（内科・小児科、北品川3-7-25、03-3450-7650）。\n\n24時間対応の医療機関案内「ひまわり」03-5272-0303、救急車の要否が迷うときは東京消防庁救急相談センター #7119（ip電話は03-3212-2323）。\n\n品川区-休日・夜間の診療",
			"sections": [
				{
					"anchor": "top",
					"heading": "",
					"text": "品川区では、1か月、4か月、6〜7か月、9〜10か月、1歳6か月、3歳に健診があります。いつどこへ行き、何を調べるのか、目や発熱で受診すべきサインまで説明しています。\n品川区-乳幼児の健康診査・相談"
				},
				{
					"anchor": "品川区の乳幼児健診スケジュール",
					"heading": "品川区の乳幼児健診スケジュール",
					"text": "品川区の乳幼児健診スケジュール\n品川区の公式ページ（更新日：令和7年5月7日）の健診スケジュールは以下のとおりです。\n1カ月児健診：生後28日～41日目まで\n4カ月児健診：4カ月頃（各保健センター、午前）\n6～7カ月児健診：6～7カ月の間（都内契約医療機関）\n9～10カ月児健診：9～10カ月の間（都内契約医療機関）\n1歳6カ月児健診：1歳7カ月前後（各保健センター、午後）\n3歳児健診：3歳4カ月前後（各保健センター、午後、目の検査（屈折検査）も実施）\n実施場所は品川・大井・荏原の3つの保健センター。「お住まいの地域によって、管轄の保健センターが異なります」（管轄一覧表を区サイトで確認）。管轄外の保健センターでも受診できます。\n\n予約・案内：「案内通知は、受診日の前月上旬に郵送します。予約制のため人数制限がありますので、希望に添えない場合があります」。受診日の変更は案内通知到着後に管轄保健センターへ連絡します。\n\n持ち物：区ページで持ち物の明示があるのは6～7カ月健診で「医療機関にお問い合わせの上、親子健康手帳（母子健康手帳）と受診票を持参し、ご受診ください」。厚労省の乳幼児健康診査実施要綱では健診時に「母子健康手帳の内容を参考とし、それまでの発達状況等を保護者の記録も含めて確認」することとされています。\n\n6～7カ月・9～10カ月の受診票は4カ月児健診で配布されます（「4カ月児健診で、6～7カ月児健診受診票・9～10カ月児健診受診票を配布します」）。\n\n健診の費用は区ページに明記されていません。厚労省の実施要綱では委託医療機関は健診の費用を健康診査票により市町村に請求する仕組み（公費で決済される仕組み）です。自己負担の有無は区に確認してください。\n\n保健センターの電話（品川区公式ページより）：\n品川保健センター 03-3474-2225（北品川3-11-22）\n大井保健センター 03-3772-2666（大井2-27-20）\n荏原保健センター 03-3788-7013（荏原2-9-6）\n保健センターでは、予約制の乳幼児健康相談・発達健診・心理相談（「ことばが遅い、落ち着きがないなどの相談」）も実施しています。\n\n品川区-乳幼児の健康診査・相談\n厚労省-乳幼児に対する健康診査の実施について(平成10年児発第285号)"
				},
				{
					"anchor": "1か月児健診-生後28日-41日目-と産婦健診",
					"heading": "1か月児健診（生後28日～41日目）と産婦健診",
					"text": "1か月児健診（生後28日～41日目）と産婦健診\n品川区では「1か月児健康診査の公費助成を実施しています」。\n\n受診時期と回数：生後28日目～41日目までに1回（区ページでは「1カ月児健診：生後28日～41日目まで」）。\n\n対象：品川区に住民登録があり、受診結果の区への提出に同意する方。\n\n内容（区ページ原文）：「身体発育状況、栄養状態、疾病及び異常の有無、新生児聴覚検査、先天性代謝異常検査の実施状況の確認、ビタミンk2投与の実施状況の確認及び必要に応じて投与、育児上問題となる事項」。\n\n費用：6,000円を上限に公費助成（「6,000円を上限に助成します。上限を超えた場合…は自己負担となります」）。受診票は母子健康手帳交付時に渡す「親と子の保健バック」に入っています。\n\n母体の「産婦健康診査」も対象：産後概ね2週間と概ね1カ月の合計2回（原則、出産後2か月以内）まで、1回につき5,000円を上限に助成。内容は問診・診察・体重測定・血圧測定・尿検査・母体の回復状況・乳房の状態の確認と、心の健康のためのアンケートです。\n\n問い合わせ：1か月児健診は品川保健センター 保健事業係 03-3474-2221、産婦健診は健康課 保健衛生担当 03-5742-6745。\n\n品川区-産婦健康診査・1カ月児健康診査"
				},
				{
					"anchor": "健診で見る項目",
					"heading": "健診で見る項目",
					"text": "健診で見る項目\n厚労省の乳幼児健康診査実施要綱（母子保健法第12・13条に基づく）で、1歳6か月児（満1歳6か月を超え満2歳に達しない幼児）の一般健康診査項目は、①身体発育状況 ②栄養状態 ③脊柱及び胸郭の疾病及び異常の有無 ④皮膚の疾病の有無 ⑤四肢運動障害の有無 ⑥精神発達の状況 ⑦言語障害の有無 ⑧予防接種の実施状況 ⑨育児上問題となる事項（生活習慣の自立、社会性の発達、しつけ、食事、事故等）⑩その他の疾病及び異常の有無。目的は「運動機能、視聴覚等の障害、精神発達の遅滞等障害を持った児童を早期に発見」することです。\n\n股関節：国立成育医療研究センター（ncchd）の乳幼児健康診査 身体診察マニュアルでは、発育性股関節形成不全（先天性股関節脱臼）の所見として「股関節開排制限」を診ており、仰臥位で股関節・膝関節を90度～100度に曲げ、股関節を開いたときの床からの角度が20度以上ある場合を陽性とします。\n\n心雑音：同マニュアルでは「顔面蒼白や眼瞼結膜の蒼白がある場合や明らかな頻脈、心尖部および心基部の収縮期雑音が聴取される場合には、精密検査のため医療機関を紹介する」とされています。\n\n聴覚：母子健康手帳に新生児聴覚スクリーニングの結果が記載されているか確認し、「両耳リファー」などの記載がある場合は精密聴覚検査機関の受診を確認します。\n\n1か月児健診では、新生児聴覚検査・先天性代謝異常検査（マススクリーニング）の結果確認と、必要に応じたビタミンk2の投与も行われます（品川区ページ）。\n\n厚労省-乳幼児に対する健康診査の実施について(平成10年児発第285号)\nncchd-乳幼児健康診査 身体診察マニュアル\n品川区-産婦健康診査・1カ月児健康診査"
				},
				{
					"anchor": "目の問題-レッドリフレックスと斜視・弱視の早期発見",
					"heading": "目の問題：レッドリフレックスと斜視・弱視の早期発見",
					"text": "目の問題：レッドリフレックスと斜視・弱視の早期発見\n乳幼児の目は0〜2歳の感受性の高い時期に病気が起こると回復しにくい弱視になりやすいため、公的ガイドでは早期発見が強調されています。\nncchd-眼科"
				},
				{
					"anchor": "レッドリフレックス-赤反射-チェック",
					"heading": "レッドリフレックス（赤反射）チェック",
					"text": "レッドリフレックス（赤反射）チェック\nncchdの乳幼児健康診査 身体診察マニュアル（コラム3）の定義：「直像鏡（検影器）を使用して眼底からの反射を瞳孔から観察する方法であり、角膜混濁、白内障、網膜芽細胞腫、網膜剥離などの疑いのある児を簡便に検出できる有効な方法である。両眼から同じ大きさの黄橙色の明るい反射が観察できれば正常である」。\n\n判定：「左右眼いずれかでも反射が観察できない児は、早急に眼科での精密検査を勧告する」。\n\n日本産婦人科医会の研修ノート（新生児・乳幼児の視覚スクリーニング）でも、1か月児健診・乳幼児健診での診察項目として「red reflex 法」が挙げられており、「片方の反射が暗い場合には、強度の屈折異常が疑われる。片方の反射がない場合には、そちらの眼に白内障などの器質的疾患がある可能性が高い」としています。\n\nncchd-乳幼児健康診査 身体診察マニュアル\n日本産婦人科医会-視覚スクリーニングの実際"
				},
				{
					"anchor": "斜視・弱視の早期発見の重要性",
					"heading": "斜視・弱視の早期発見の重要性",
					"text": "斜視・弱視の早期発見の重要性\nncchdの斜視の解説（ページ原文）：「視覚刺激に対する感受性の高い乳幼児期に斜視が起こると、斜視の眼に抑制がかかって視力の発達が阻害されて弱視になります。また両眼で物を同時に見て奥行き感や立体感をとらえる能力、すなわち両眼視機能…が発達しません」。\n\n「斜視の症状として視線のずれのほか、頭位異常（頭をかしげている、顔を曲げている、顎を上げている等）や片目つぶりが目立つことがあります。気になる症状があれば、ぜひ早めに眼科を受診してください」。\n\n「乳児内斜視など早期に発症する斜視は、両眼視機能の発達が阻害されやすく、両眼視を獲得するためには早期に診断して眼位を矯正する治療（手術、眼鏡、プリズム治療）を行う必要があります」。\n\nncchd眼科ページでは「とくに0～2歳は視覚刺激への感受性が高いため、目の病気が起こると高度の弱視になってしまいます」としています。\n\nncchd-斜視\nncchd-眼科"
				},
				{
					"anchor": "発見されやすい年齢とサイン",
					"heading": "発見されやすい年齢とサイン",
					"text": "発見されやすい年齢とサイン\n厚生労働科学研究（amed）の診療マニュアル（視覚異常の早期発見と眼科健診）より：\n固視・追視（物をじっと見つめたり、目で追うしぐさ）がはっきり観察されるようになるのは生後2か月頃。親御さんの顔を見ない、視線が合わない、表情や反応が乏しければ両眼の眼疾患を疑います。\n生後3か月以降になると、見る反応が乏しい、目の揺れ（眼振）、目の動きの異常、片目の視線がずれている（斜視）、顔を曲げて見る（頭位異常）などの異常サインがはっきりしてきます。\n乳児内斜視が顕性化するのは生後2～4か月頃で、「2～3カ月放置すると、両眼視機能（立体視）獲得するチャンスが極めて少なくなります」。\n「弱視の有病率は約2%」で、3歳児健診の眼科健診（視力検査で左右眼いずれかでも0.5が確認できなかった児は眼科精密検査が勧告）で発見されれば、矯正眼鏡と弱視訓練によって就学までに治癒することが多いとされています。視覚の感受性期間は6～8歳までで、過ぎると不可逆的な視力障害となります。\n品川区の3歳児健診では「目の検査（屈折検査）も実施しています」（品川区公式ページ）。\n\named-視覚聴覚二重障害の医療 診療マニュアル\n品川区-乳幼児の健康診査・相談"
				},
				{
					"anchor": "気になる症状-発熱と受診の目安",
					"heading": "気になる症状：発熱と受診の目安",
					"text": "気になる症状：発熱と受診の目安\n日本小児科学会（厚生労働省研究班監修）の「こどもの救急（online-qq）」では、発熱（38℃以上）が「気になる症状」として扱われており、その判定項目に「生後3か月未満である」が「受診が必要」とされる項目の一つとして挙げられています（元気がなくぐったりしている、呼吸があらく苦しそう、顔色・皮膚色が悪い、ずっとうとうとしている と並ぶ）。\n\n神戸大学医学部附属病院の小児科講座の資料（こどもの発熱とその対応）でも、注意が必要な発熱として「乳児期早期（とくに3ヶ月未満）の発熱」を挙げ、「生後3カ月未満の発熱に関しては免疫能が未熟、症状が出にくいなどの点から慎重に対応しなければならない」「3ヶ月未満の発熱の場合は入院が必要となることが多い」としています。\n\n日本小児科学会-こどもの救急(online-qq)\n神戸大学-こどもの発熱とその対応"
				},
				{
					"anchor": "品川区の時間外の救急・相談窓口",
					"heading": "品川区の時間外の救急・相談窓口",
					"text": "品川区の時間外の救急・相談窓口\n子供の健康相談室（小児救急相談）#8000（ip電話などは03-5285-8898）：小児科医師・看護師が電話で相談に応じます。受付は平日（休日・年末年始を除く）18時～翌8時、土日祝・年末年始は8時～翌8時。\n\n品川区こども夜間救急室（昭和医科大学病院 中央棟4階、旗の台1-5-8）電話 03-3784-8181：平日夜間20時～23時（受付22時30分まで）、第2・第4土曜日夜間17時～22時（受付21時まで）。外傷には対応できません。\n\n第1・第3・第5土曜日夜間（17時～22時）は品川区医師会休日診療所（内科・小児科、北品川3-7-25、03-3450-7650）。\n\n24時間対応の医療機関案内「ひまわり」03-5272-0303、救急車の要否が迷うときは東京消防庁救急相談センター #7119（ip電話は03-3212-2323）。\n\n品川区-休日・夜間の診療"
				}
			]
		},
		{
			"slug": "complementary-feeding",
			"title": "離乳食",
			"order": 5,
			"fullText": "離乳食は、生後5〜6か月頃から始めます。進め方の目安、鉄分のとり方、食物アレルギー、窒息の予防まで説明しています。\nこども家庭庁「授乳や離乳について」（『授乳・離乳の支援ガイド』）\n離乳とは\n「離乳」とは、母乳または育児用ミルクなどの乳汁だけでは不足してくるエネルギーや栄養素を補うために、乳汁から幼児食に移行する過程をいいます。その間に与えられる食事を離乳食といい、この時期に「吸って飲む」ことではなく「噛んで食べる」力が育っていきます。\n授乳・離乳の支援ガイド(平成31(2019)年3月)\n開始時期（いつから始めるか）\n厚生労働省の「授乳・離乳の支援ガイド」(2019年改定) では、離乳開始は生後5〜6か月頃が適切とされています。ただし、子どもの成長・発達は個人差があるため、月齢はあくまで目安として、お子さんの「食べたい」サインを見ながら進めることが重要とされています。\n\n離乳開始の目安（お子さんの発達状況）：\n首がすわり、寝返りがうてる\n支えがあると5秒以上すわる\nスプーンなどを口に入れても舌で押し出すことが少なくなってきた\n食べ物に興味を示す\n離乳の開始とは、なめらかにすりつぶした状態の食物を初めて与えたときを指します。\n\n授乳・離乳の支援ガイド(平成31(2019)年3月)\n注：離乳のガイドは2023年に改定されました\n本マニュアルの調査時点（2026年8月）において、公式に存在する最新版は2019年3月（平成31年）改定の「授乳・離乳の支援ガイド」です（こども家庭庁のページにpdfが掲載されています）。「2023年改定版」という改訂は確認できませんでした。\nこども家庭庁「授乳や離乳について」\n授乳・離乳の支援ガイド(2019年3月)\n進め方の目安（初期・中期・後期・完了期）\n時期 月齢 1日の回数 食形態の目安 穀類の量（2019年ガイド目安表）\n離乳初期 生後5〜6か月頃 1日1回 なめらかにすりつぶした状態（ポタージュ状→ヨーグルト状） 1さじずつ開始し50〜80g（つぶしがゆか全がゆ）\n離乳中期 生後7〜8か月頃 1日2回 舌でつぶせる硬さ 全がゆ90g→軟飯80g\n離乳後期 生後9〜11か月頃 1日3回 歯ぐきでつぶせる硬さ 軟飯90g→ご飯80g\n離乳完了期 生後12〜18か月頃 1日3回＋おやつ1〜2回 歯ぐきで噛める硬さ ご飯80g\n量はあくまで目安です。子どもの食欲や成長・発達の状況に応じて、1日の回数を調整してください。\n\n新しい食品を始めるときは、離乳食用のスプーンで1さじずつ与え、子どもの様子を見ながら量を増やします。\n\n2019年改定版の目安表では、「又は卵」の行は離乳初期に「卵黄1個」、離乳中期に「全卵1/3」、離乳後期に「全卵1/2」、離乳完了期に「全卵1/2〜2/3」とされています。\n\n授乳・離乳の支援ガイド(2019年3月)\n鉄分は先に（母乳育児と鉄）\n2019年改定版の「授乳・離乳の支援ガイド」では、母乳育児の場合、生後6か月の時点でヘモグロビン濃度が低く鉄欠乏を生じやすいとの報告があるとして、離乳開始の適切な時期とあわせて、鉄（およびビタミンd）を含む食品を意識的に取り入れることが重要とされています。\n\n離乳中期以降は、赤身の肉・魚やレバーなどのヘム鉄を含む食品を活用すると、効率よく鉄を補えます。\n\n離乳開始はアレルギーの心配が少ないおかゆ（米）から始めるのが基本ですが、離乳の進行に伴って鉄を含む食品（赤身肉・レバー・赤身の魚など）を積極的に取り入れてください。\n\n授乳・離乳の支援ガイド(2019年3月)\n食物アレルギーと早期摂取（ピーナッツ・卵）\n「授乳・離乳の支援ガイド」(2019年) は、食物アレルギーの発症を心配して離乳の開始や特定の食物の摂取開始を遅らせても予防効果があるという科学的根拠はないとしています。生後5〜6か月頃から離乳を始めるように情報提供し、食物アレルギーが疑われる症状がみられた場合は自己判断で対応せず、必ず医師の診断に基づいて進めることが必要です。\n\nピーナッツ：国立成育医療研究センター（食物アレルギー 診療の手引き）は、ピーナッツの摂取開始の遅延がアレルギー発症のリスクを高める可能性があることから、乳児期早期（生後4〜10か月）にピーナッツを含む食品の摂取を開始することが推奨されるとしています。日本アレルギー学会のコンセンサスステートメント（ピーナッツアレルギーの多い国での研究をもとに）は、乳児期の早期（4〜11か月）にピーナッツを含む食品の摂取を開始することを推奨しています。\n\n卵：アトピー性皮膚炎のある乳児では、鶏卵の摂取が遅いほど鶏卵アレルギーを発症するリスクが高まるため、アトピー性皮膚炎を寛解（落ち着かせる）させたうえで、医師の管理のもと生後6か月から鶏卵の微量摂取を開始することを推奨しています。\n\nアトピー性皮膚炎が強い場合：乳児期のアトピー性皮膚炎や食物アレルギーの管理に精通している医師の診療を受けることを推奨されています。湿疹が強い、食物アレルギーが疑われる症状がある場合は、離乳の進め方について医師に相談してください。\n\n国立成育医療研究センター「発症予防」\n国立成育医療研究センター「鶏卵の摂取開始時期について」\n日本アレルギー学会「ピーナッツアレルギーに関するコンセンサスステートメント」\n授乳・離乳の支援ガイド(2019年3月)\n窒息の予防\n食品による窒息は未就学児、特に5歳以下で多いとされています。消費者庁の注意喚起（厚生労働省の人口動態調査を引用、平成26年度〜令和元年度の6年間）では、食品の誤嚥による窒息で14歳以下の子どもが80名死亡しており、そのうち5歳以下が73名で9割を占めていました。\n\n硬い豆やナッツ類は、5歳以下の子どもには食べさせないでください（消費者庁）。ナッツ類を与える場合はあらかじめ1/4に切り、よく噛んで食べるよう見守ってください。\n\n離乳食は子どもの噛む・飲み込む力に合った固さで。離乳初期は飲み込むだけで、舌や歯ぐきで噛んだりつぶしたりすることはできません。中期は舌でつぶせる固さ、後期は歯ぐきでつぶせる固さのものから進めてください。\n\n市販のベビーフードや零食に表示された対象月齢はメーカーの目安です。『授乳・離乳の支援ガイド』でも、子どもに合わせる月齢や固さのものを選び、与える前に一口食べて味や固さを確認し、食べ方で固さの適切さを確かめるよう指摘されています。子どもの噛む・飲み込む力に合わせて選んでください。\n\n窒息予防のポイント（日本小児科学会）：\n食品を小さく切り、食べやすい大きさにする（丸い食品は1/4程度に切る）\n一口を無理なく食べられる量にし、よく噛んでから飲み込ませる\n姿勢良く座らせ、食べることに集中させる\n食事中は遊ばせず、目を離さない\n詰まってしまったときの応急処置の方法を日頃から確認しておく\n日本小児科学会「食品による窒息 子どもを守るためにできること」\n消費者庁「食品による子どもの窒息・誤嚥事故に注意!」\n国民生活センター「2020年度 縮刷版」\n授乳・離乳の支援ガイド(2019年3月)\n与えてはいけないもの（注意点）\nはちみつ：1歳未満の赤ちゃんには与えないでください（乳児ボツリヌス症の予防のため）。詳細は07章「やってはいけないこと」を参照してください。\n\n牛乳を飲む場合：鉄欠乏性貧血の予防の観点から、飲用として与えるのは1歳を過ぎてからが望ましいとされています。\n\n調味料（塩・砂糖）：離乳の開始時期は調味料は必要ありません。離乳の進行に応じて、食塩や砂糖などの調味料を使用する場合は、それぞれの食品のもつ味を生かしながら、薄味でおいしく調理し、油脂類も少量の使用とします。\n\n硬い豆・ナッツ類：5歳以下の子どもには食べさせないでください（上記「窒息の予防」を参照）。\n\n厚生労働省「はちみつを与えるのは1歳を過ぎてから」\n消費者庁「はちみつに含まれる菌による乳児ボツリヌス症に注意してください」\n授乳・離乳の支援ガイド(2019年3月)\n消費者庁「食品による子どもの窒息・誤嚥事故に注意!」\n母乳・育児用ミルクの役割\n離乳は「離乳食に完全に切り替える」ことではなく、母乳または育児用ミルクなどの乳汁栄養から幼児食に移行する過程です。離乳食が始まっても、母乳・育児用ミルクは引き続き大切な栄養源であり、離乳の進み方に合わせて回数を減らしていきます。\n\n離乳初期は離乳食を1さじずつ始め、母乳・育児用ミルクは飲みたいだけ飲ませます。離乳が進むにつれ、1日2回食・3回食と食事のリズムをつけていき、1歳を過ぎた頃には離乳食が1日の食事の中心になっていきます。\n\n母乳育児の場合、離乳開始の時期にあわせて鉄とビタミンdを含む食品を意識的に取り入れることが重要です。\n\n離乳完了期（12か月頃）から1歳を過ぎた頃には、離乳食が1日の食事の中心となり、母乳・育児用ミルクは補助的な役割に変わっていきます。\n\n授乳・離乳の支援ガイド(2019年3月)",
			"sections": [
				{
					"anchor": "top",
					"heading": "",
					"text": "離乳食は、生後5〜6か月頃から始めます。進め方の目安、鉄分のとり方、食物アレルギー、窒息の予防まで説明しています。\nこども家庭庁「授乳や離乳について」（『授乳・離乳の支援ガイド』）"
				},
				{
					"anchor": "離乳とは",
					"heading": "離乳とは",
					"text": "離乳とは\n「離乳」とは、母乳または育児用ミルクなどの乳汁だけでは不足してくるエネルギーや栄養素を補うために、乳汁から幼児食に移行する過程をいいます。その間に与えられる食事を離乳食といい、この時期に「吸って飲む」ことではなく「噛んで食べる」力が育っていきます。\n授乳・離乳の支援ガイド(平成31(2019)年3月)"
				},
				{
					"anchor": "開始時期-いつから始めるか",
					"heading": "開始時期（いつから始めるか）",
					"text": "開始時期（いつから始めるか）\n厚生労働省の「授乳・離乳の支援ガイド」(2019年改定) では、離乳開始は生後5〜6か月頃が適切とされています。ただし、子どもの成長・発達は個人差があるため、月齢はあくまで目安として、お子さんの「食べたい」サインを見ながら進めることが重要とされています。\n\n離乳開始の目安（お子さんの発達状況）：\n首がすわり、寝返りがうてる\n支えがあると5秒以上すわる\nスプーンなどを口に入れても舌で押し出すことが少なくなってきた\n食べ物に興味を示す\n離乳の開始とは、なめらかにすりつぶした状態の食物を初めて与えたときを指します。\n\n授乳・離乳の支援ガイド(平成31(2019)年3月)"
				},
				{
					"anchor": "注-離乳のガイドは2023年に改定されました",
					"heading": "注：離乳のガイドは2023年に改定されました",
					"text": "注：離乳のガイドは2023年に改定されました\n本マニュアルの調査時点（2026年8月）において、公式に存在する最新版は2019年3月（平成31年）改定の「授乳・離乳の支援ガイド」です（こども家庭庁のページにpdfが掲載されています）。「2023年改定版」という改訂は確認できませんでした。\nこども家庭庁「授乳や離乳について」\n授乳・離乳の支援ガイド(2019年3月)"
				},
				{
					"anchor": "進め方の目安-初期・中期・後期・完了期",
					"heading": "進め方の目安（初期・中期・後期・完了期）",
					"text": "進め方の目安（初期・中期・後期・完了期）\n時期 月齢 1日の回数 食形態の目安 穀類の量（2019年ガイド目安表）\n離乳初期 生後5〜6か月頃 1日1回 なめらかにすりつぶした状態（ポタージュ状→ヨーグルト状） 1さじずつ開始し50〜80g（つぶしがゆか全がゆ）\n離乳中期 生後7〜8か月頃 1日2回 舌でつぶせる硬さ 全がゆ90g→軟飯80g\n離乳後期 生後9〜11か月頃 1日3回 歯ぐきでつぶせる硬さ 軟飯90g→ご飯80g\n離乳完了期 生後12〜18か月頃 1日3回＋おやつ1〜2回 歯ぐきで噛める硬さ ご飯80g\n量はあくまで目安です。子どもの食欲や成長・発達の状況に応じて、1日の回数を調整してください。\n\n新しい食品を始めるときは、離乳食用のスプーンで1さじずつ与え、子どもの様子を見ながら量を増やします。\n\n2019年改定版の目安表では、「又は卵」の行は離乳初期に「卵黄1個」、離乳中期に「全卵1/3」、離乳後期に「全卵1/2」、離乳完了期に「全卵1/2〜2/3」とされています。\n\n授乳・離乳の支援ガイド(2019年3月)"
				},
				{
					"anchor": "鉄分は先に-母乳育児と鉄",
					"heading": "鉄分は先に（母乳育児と鉄）",
					"text": "鉄分は先に（母乳育児と鉄）\n2019年改定版の「授乳・離乳の支援ガイド」では、母乳育児の場合、生後6か月の時点でヘモグロビン濃度が低く鉄欠乏を生じやすいとの報告があるとして、離乳開始の適切な時期とあわせて、鉄（およびビタミンd）を含む食品を意識的に取り入れることが重要とされています。\n\n離乳中期以降は、赤身の肉・魚やレバーなどのヘム鉄を含む食品を活用すると、効率よく鉄を補えます。\n\n離乳開始はアレルギーの心配が少ないおかゆ（米）から始めるのが基本ですが、離乳の進行に伴って鉄を含む食品（赤身肉・レバー・赤身の魚など）を積極的に取り入れてください。\n\n授乳・離乳の支援ガイド(2019年3月)"
				},
				{
					"anchor": "食物アレルギーと早期摂取-ピーナッツ・卵",
					"heading": "食物アレルギーと早期摂取（ピーナッツ・卵）",
					"text": "食物アレルギーと早期摂取（ピーナッツ・卵）\n「授乳・離乳の支援ガイド」(2019年) は、食物アレルギーの発症を心配して離乳の開始や特定の食物の摂取開始を遅らせても予防効果があるという科学的根拠はないとしています。生後5〜6か月頃から離乳を始めるように情報提供し、食物アレルギーが疑われる症状がみられた場合は自己判断で対応せず、必ず医師の診断に基づいて進めることが必要です。\n\nピーナッツ：国立成育医療研究センター（食物アレルギー 診療の手引き）は、ピーナッツの摂取開始の遅延がアレルギー発症のリスクを高める可能性があることから、乳児期早期（生後4〜10か月）にピーナッツを含む食品の摂取を開始することが推奨されるとしています。日本アレルギー学会のコンセンサスステートメント（ピーナッツアレルギーの多い国での研究をもとに）は、乳児期の早期（4〜11か月）にピーナッツを含む食品の摂取を開始することを推奨しています。\n\n卵：アトピー性皮膚炎のある乳児では、鶏卵の摂取が遅いほど鶏卵アレルギーを発症するリスクが高まるため、アトピー性皮膚炎を寛解（落ち着かせる）させたうえで、医師の管理のもと生後6か月から鶏卵の微量摂取を開始することを推奨しています。\n\nアトピー性皮膚炎が強い場合：乳児期のアトピー性皮膚炎や食物アレルギーの管理に精通している医師の診療を受けることを推奨されています。湿疹が強い、食物アレルギーが疑われる症状がある場合は、離乳の進め方について医師に相談してください。\n\n国立成育医療研究センター「発症予防」\n国立成育医療研究センター「鶏卵の摂取開始時期について」\n日本アレルギー学会「ピーナッツアレルギーに関するコンセンサスステートメント」\n授乳・離乳の支援ガイド(2019年3月)"
				},
				{
					"anchor": "窒息の予防",
					"heading": "窒息の予防",
					"text": "窒息の予防\n食品による窒息は未就学児、特に5歳以下で多いとされています。消費者庁の注意喚起（厚生労働省の人口動態調査を引用、平成26年度〜令和元年度の6年間）では、食品の誤嚥による窒息で14歳以下の子どもが80名死亡しており、そのうち5歳以下が73名で9割を占めていました。\n\n硬い豆やナッツ類は、5歳以下の子どもには食べさせないでください（消費者庁）。ナッツ類を与える場合はあらかじめ1/4に切り、よく噛んで食べるよう見守ってください。\n\n離乳食は子どもの噛む・飲み込む力に合った固さで。離乳初期は飲み込むだけで、舌や歯ぐきで噛んだりつぶしたりすることはできません。中期は舌でつぶせる固さ、後期は歯ぐきでつぶせる固さのものから進めてください。\n\n市販のベビーフードや零食に表示された対象月齢はメーカーの目安です。『授乳・離乳の支援ガイド』でも、子どもに合わせる月齢や固さのものを選び、与える前に一口食べて味や固さを確認し、食べ方で固さの適切さを確かめるよう指摘されています。子どもの噛む・飲み込む力に合わせて選んでください。\n\n窒息予防のポイント（日本小児科学会）：\n食品を小さく切り、食べやすい大きさにする（丸い食品は1/4程度に切る）\n一口を無理なく食べられる量にし、よく噛んでから飲み込ませる\n姿勢良く座らせ、食べることに集中させる\n食事中は遊ばせず、目を離さない\n詰まってしまったときの応急処置の方法を日頃から確認しておく\n日本小児科学会「食品による窒息 子どもを守るためにできること」\n消費者庁「食品による子どもの窒息・誤嚥事故に注意!」\n国民生活センター「2020年度 縮刷版」\n授乳・離乳の支援ガイド(2019年3月)"
				},
				{
					"anchor": "与えてはいけないもの-注意点",
					"heading": "与えてはいけないもの（注意点）",
					"text": "与えてはいけないもの（注意点）\nはちみつ：1歳未満の赤ちゃんには与えないでください（乳児ボツリヌス症の予防のため）。詳細は07章「やってはいけないこと」を参照してください。\n\n牛乳を飲む場合：鉄欠乏性貧血の予防の観点から、飲用として与えるのは1歳を過ぎてからが望ましいとされています。\n\n調味料（塩・砂糖）：離乳の開始時期は調味料は必要ありません。離乳の進行に応じて、食塩や砂糖などの調味料を使用する場合は、それぞれの食品のもつ味を生かしながら、薄味でおいしく調理し、油脂類も少量の使用とします。\n\n硬い豆・ナッツ類：5歳以下の子どもには食べさせないでください（上記「窒息の予防」を参照）。\n\n厚生労働省「はちみつを与えるのは1歳を過ぎてから」\n消費者庁「はちみつに含まれる菌による乳児ボツリヌス症に注意してください」\n授乳・離乳の支援ガイド(2019年3月)\n消費者庁「食品による子どもの窒息・誤嚥事故に注意!」"
				},
				{
					"anchor": "母乳・育児用ミルクの役割",
					"heading": "母乳・育児用ミルクの役割",
					"text": "母乳・育児用ミルクの役割\n離乳は「離乳食に完全に切り替える」ことではなく、母乳または育児用ミルクなどの乳汁栄養から幼児食に移行する過程です。離乳食が始まっても、母乳・育児用ミルクは引き続き大切な栄養源であり、離乳の進み方に合わせて回数を減らしていきます。\n\n離乳初期は離乳食を1さじずつ始め、母乳・育児用ミルクは飲みたいだけ飲ませます。離乳が進むにつれ、1日2回食・3回食と食事のリズムをつけていき、1歳を過ぎた頃には離乳食が1日の食事の中心になっていきます。\n\n母乳育児の場合、離乳開始の時期にあわせて鉄とビタミンdを含む食品を意識的に取り入れることが重要です。\n\n離乳完了期（12か月頃）から1歳を過ぎた頃には、離乳食が1日の食事の中心となり、母乳・育児用ミルクは補助的な役割に変わっていきます。\n\n授乳・離乳の支援ガイド(2019年3月)"
				}
			]
		},
		{
			"slug": "safety",
			"title": "事故の予防：家と車の中",
			"order": 6,
			"fullText": "赤ちゃんが生まれたあと、危険な場所は浴槽、階段、小さな物、車の中です。窒息、転落、やけど、溺水、熱中症、誤飲——それぞれをどう防ぎ、起きた時はどう対処するかを、具体的な数字で説明しています。チャイルドシートの決まりもまとめています。\nこども家庭庁-水の危険は近くにあります\n消費者庁-御家庭内での子どもの溺水事故に御注意ください\nチャイルドシート：義務と正しい装着\n使用義務（道路交通法）\n道路交通法第71条の3第3項で、自動車の運転者はチャイルドシート（幼児用補助装置）を使用しない6歳未満の幼児を乗せて運転してはならないと定められています（平成12年4月1日から義務化）。\n\n警察庁の統計（令和7年中）では、自動車同乗中の死傷した6歳未満幼児のチャイルドシート使用者率は83.5％（前年比+2.5ポイント、近年は横ばい）。年齢別では1歳未満93.2％、1～4歳84.8％、5歳66.7％で、5歳が最も低くなっています。\n\n警察庁は「チャイルドシートを使用していても、車両への取付け固定が不十分だったり、正しく座らせなかった場合には、交通事故時にチャイルドシートがシートベルトから分離してしまったり、幼児がチャイルドシートから飛び出してしまうなど、本来の機能が発揮できない」と警告しています。\n\n警察庁-子供を守るチャイルドシート\n装着のポイント（乳児は後部座席・後ろ向き）\n独立行政法人自動車事故対策機構（nasva）のチャイルドシート使い分けでは、乳児用（ベビーシート）は体重10kg未満又は13kg未満、身長70cm以下で新生児から1歳くらいまでの対象とし、「後ろ向き」と「ベッド型」があるとしています。\n\n後部座席への設置が推奨されています。前方座席のエアバッグは成人の体型を前提に設計されており、子どもにはかえって被害を及ぼすおそれがあるためです。やむを得ず助手席に置く場合はシートを最大まで後方に下げます。\n\n取り付けは座席に体重をかけて沈み込み、シートベルトの緩みを取ることがポイントです。isofix対応品は取付けが確実に行いやすく、警察庁や業界団体が普及啓発を行っています。\n\nnasva-チャイルドシートの使い方\n警察庁-子供を守るチャイルドシート\n正しく使わなければ意味がない\n国土交通省のチャイルドシート着用効果の分析では、「着用時と非着用時とでは致死率、死亡重傷率に大きな差がある」とされています。警察庁のデータでも、取付けが適切だった割合は74.8％、正しく着座できていた割合は55.6％にすぎず、不適切な使用が重大事故につながりやすいことが示されています。\n\n警察庁-子供を守るチャイルドシート\n誤飲・窒息：何が危険で、万一はどうする\n危険なもの（小物・食品）\n政府広報オンラインの解説：「3歳のこどもの口の直径はおよそ4cmで、ほぼトイレットペーパーの芯ぐらいの大きさ。それより小さな物は飲み込んでしまう危険を常に考えたほうがいい」。スーパーボールなど6mmから2cmのおもちゃは特に気道をふさぎやすく窒息のおそれが高まる、としています。\n\nこどもの救急（online-qq、日本小児科学会）が窒息の原因になりやすいものとして挙げる例：食品（こんにゃくゼリー、ピーナッツなどの豆類、野菜スティック、アメ、キャラメル、ポップコーン、甘栗）、日用品（柔らかい布団）、おもちゃの部品、硬貨（小銭）、ボタン電池。コンビニ袋を頭にかぶる遊び、電気コードやカーテン・ブラインドのヒモを首に巻くことも窒息の原因になりうるとしています。\n\nボタン電池は粘膜に触れるとタンパク質を溶かす液体が出て体内で化学やけど（化学熱傷）を引き起こし、胃や食道の壁を短時間で傷つけて穴をあけることがあります。誤飲の疑いがある場合は無理に吐かせず、受診するまで何も飲ませないよう呼びかけられています。\n\n消費者庁・こども家庭庁のハンドブックでも、0～3歳くらいの「医薬品・洗剤・化粧品の誤飲」、0～5歳くらいの「ボタン電池・吸水ボール・磁石の誤飲」、0～6歳くらいの「食事中に食べ物で窒息」が注意項目として扱われています。\n\n政府広報-赤ちゃんやこどもを誤飲・窒息事故から守る\nこどもの救急-窒息\n消費者庁-こどもの事故防止ハンドブック（窒息・誤飲）\n食べ物の切り方・姿勢\n日本小児科学会「食品による窒息 子どもを守るためにできること」は、食品による窒息は未就学児（特に5歳以下）で多いことを示し、丸い・滑りやすい・硬い・粘着性の食品を小さく・やわらかくし、食事中は姿勢を正して目を離さないことなどを呼びかけています。\n\n日本小児科学会-食品による窒息 子どもを守るためにできること\n窒息時の応急処置（ハイムリック法は1歳以上のみ）\nこどもの救急（online-qq）の公式手順：「突然声が出なくなった、首をおさえ苦しそうにしている、唇が紫色になった」場合は窒息を疑います。1歳未満の乳児には「胸部突き上げ法」と「背部叩打法」を数回ずつ交互に行います。意識がある1歳以上の幼児には「腹部突き上げ法」（ハイムリック法）を行います。いずれも意識がない場合は心肺蘇生（cpr）を行いながら119番通報し救急車を呼びます。\n\n日本医師会救急蘇生法でも「乳児では腹部突き上げ法は行いません」と明記されています。腹部突き上げ法は腹部の内臓を傷める可能性があるため、実施した場合は救急隊にその旨を伝えるよう呼びかけられています。\n\nこどもの救急-窒息\n日本医師会-気道異物除去の手順\n転落：ベッド・階段・窓\nこども家庭庁・消費者庁の事故防止ハンドブック（転落・転倒、1歳以上）：「窓に補助錠やストッパーをつけて、大きく開かないようにしましょう。窓の近くにベッドやソファなど踏み台になるものは置かない」ように、としています。\n\n消費者庁は「子どもの転落事故に注意！〜落ちるまではあっという間です〜」と注意喚起しています。調査では、乳幼児の育児経験がある消費者の約4割が子育て中に転落事故の経験があり、その約3割が医療機関を受診した経験がある、としています。\n\n消費者庁・国民生活センターには、ベビーゲート（ベビードア）が取り付けられていなかったり、付けていても閉め忘れていたりしたことで、子どもが階段から転落した事故情報が寄せられており、取り付け位置の確認と「閉まっている」ことの確認が呼びかけられています。\n\n抱っこ中・高い位置からの落下：国民生活センターの注意喚起では、浴槽の蓋や洗濯機の上などに乳児を寝かせたまま目を離した際の落下で頭部を受傷する事故（骨折や頭蓋内損傷を負った事故の約4割は洗濯機からの落下）が発生しており、乳児を浴槽の蓋や洗濯機の上に寝かせないよう呼びかけられています。\n\nこども家庭庁-水の危険は近くにあります\n消費者庁-こどもの事故防止ハンドブック（転落・転倒）\n消費者庁-子どもの転落事故に注意!\n国民生活センター-入浴・沐浴に伴う乳児の落下事故に注意\nやけど：入浴と熱いもの\n消費者庁の入浴安全の指針（「入浴事故を防ぐための5ヵ条」）では、「湯温は41度以下、湯につかる時間は10分まで」が目安とされています（入浴前に脱衣所・浴室を暖める、浴槽から急に立ち上がらない、食後すぐやアルコールが抜けるまでの入浴を控える、入浴前に同居者へ一声かける、と並ぶ）。\n\n消費者庁・こども家庭庁のハンドブック（やけど）：床に置くタイプの暖房器具は子どもの手が届かないよう安全柵などで囲む、湯たんぽや電気カーペットは同じ場所が長時間触れて低温やけどになることに注意、とされています。炊飯器や電気ケトルなど、高温の蒸気や転倒して熱湯に触れるおそれのある製品は、乳幼児の行動範囲で使用しないよう行政が呼びかけています。\n\n子どものやけどの初期対応として、政府広報は「すぐに10分以上冷やす。刺激を避けるため、容器に溜めた水で冷やすか、水道水・シャワーを直接当てない。服の上から熱湯などがかかった場合は、脱がさずに服の上から冷やす」と示しています。\n\n消費者庁-消費者白書 column 住環境における高齢者の事故（入浴時の注意ポイント）\n消費者庁-こどもの事故防止ハンドブック（やけど）\n政府広報-家の中の思わぬ危険。乳幼児のやけど事故にご注意を！（やけどの初期対応）\n溺水：浴槽・桶・便座・おむつ替え台\n消費者庁（厚生労働省「人口動態調査」を踏まえた注意喚起）：「子どもが浴室で溺水し死亡する事故が多く発生しています」「子どもは声や音を出さず静かに溺れることもあります」。対策として、入浴後は浴槽の水を抜くことを習慣にし、子どもだけで浴室に入れないようベビーゲートなどを設置すること、浴室等の水回りの環境づくり（桶・洗面器など一時的に残る水はこまめに抜く）が呼びかけられています。\n\n消費者庁「子どもの水の事故を防ごう！」（世界溺水防止デー 7月25日）：厚生労働省「人口動態調査」によると、0～1歳では浴槽での溺死が最も多い、より活動的になる5歳以上では自然水域での溺死が最多、としています。「少しの時間、少しの水量と油断せず、子どもの見守りと合わせて溺水事故が起こらない環境づくりを」と呼びかけています。\n\nこども家庭庁（令和元年～5年の5年間）：14歳以下のこどもの不慮の溺死・溺水による死亡は不慮の事故の中でも死因の上位を占め、10～14歳では最も多い、5～9歳では交通事故に次いで多い、としています。\n\n消費者庁-御家庭内での子どもの溺水事故に御注意ください\n消費者庁-子どもの水の事故を防ごう！\nこども家庭庁-水の危険は近くにあります\n熱中症：車内放置と外出時の水分\n消費者庁（jafのテスト紹介）：10月で最高気温約27度の比較的過ごしやすい気候でも、日が射すと車内温度は約48度、ダッシュボードは65度を超えることがあります。エアコンで適温（25度程度）にした後にエンジンを停止・締め切った状態でも、約1時間後の車内温度は50度以上（51.3度）に達します。「たとえ数分であっても、車内に子どもを残すことは絶対しない」よう呼びかけています。\n\njafユーザーテスト：夏場でエアコン停止からわずか15分で熱中症指数（wbgt）が危険レベルに達した、とされています。「乳幼児は体温調節機能が未発達で、高温下では短時間で体温が上昇し、死に至ることがある。寝ているからという理由で車内に子どもを残すのは大変危険である」としています。\n\nこども家庭庁：「短時間であっても絶対に車内をこどもだけにせず、降ろし忘れにも注意」「乳幼児は自分の力で移動することができず、『寝ているから』『ちょっとの時間だから』と放置することは危険です。特に、車内に置き去りにすることは絶対にやめましょう」としています。\n\n外出時は、子どもは身長が低い分、地面からの輻射熱を大人より強く受けるとされています。遊びに夢中になっているとのどの渇きなどの熱中症のサインに気づきにくいので、大人が見守りながら休憩と水分補給を勧めることが、こども家庭庁・消費者庁の呼びかけです。\n\n消費者庁-vol.524 真夏でなくても車内での熱中症に注意しましょう!\njaf-真夏の車内温度（jafユーザーテスト）\nこども家庭庁-みんなで見守り「こどもの熱中症」を防ぎましょう！\n誤飲（薬・洗剤）と中毒110番\n医薬品・洗剤・化粧品は子どもの手の届かない場所に保管し、飲料用ペットボトルへの移し替えはしない（誤飲事故が多い）ことが、国民生活センター・消費者庁ハンドブックで呼びかけられています。\n\n医薬品・洗剤などの誤飲（急性中毒）が起きた場合は、公益財団法人日本中毒情報センターの中毒110番へ電話で応急処置などの情報を得られます。\n大阪中毒110番：072-727-2499（365日・24時間対応、情報提供料無料）\nつくば中毒110番：029-852-9999（一般専用電話・365日24時間対応、情報提供料無料）\n中毒110番は、化学物質（たばこ・家庭用品など）・医薬品・動植物の毒などによる急性中毒への情報提供が対象です。ビー玉・小石などの異物誤飲は相談の対象外なので、その場合は直ちに医療機関へ。\n日本中毒情報センター-中毒１１０番・電話サービス\n消費者庁-こどもの事故防止ハンドブック（窒息・誤飲）",
			"sections": [
				{
					"anchor": "top",
					"heading": "",
					"text": "赤ちゃんが生まれたあと、危険な場所は浴槽、階段、小さな物、車の中です。窒息、転落、やけど、溺水、熱中症、誤飲——それぞれをどう防ぎ、起きた時はどう対処するかを、具体的な数字で説明しています。チャイルドシートの決まりもまとめています。\nこども家庭庁-水の危険は近くにあります\n消費者庁-御家庭内での子どもの溺水事故に御注意ください"
				},
				{
					"anchor": "チャイルドシート-義務と正しい装着",
					"heading": "チャイルドシート：義務と正しい装着",
					"text": "チャイルドシート：義務と正しい装着"
				},
				{
					"anchor": "使用義務-道路交通法",
					"heading": "使用義務（道路交通法）",
					"text": "使用義務（道路交通法）\n道路交通法第71条の3第3項で、自動車の運転者はチャイルドシート（幼児用補助装置）を使用しない6歳未満の幼児を乗せて運転してはならないと定められています（平成12年4月1日から義務化）。\n\n警察庁の統計（令和7年中）では、自動車同乗中の死傷した6歳未満幼児のチャイルドシート使用者率は83.5％（前年比+2.5ポイント、近年は横ばい）。年齢別では1歳未満93.2％、1～4歳84.8％、5歳66.7％で、5歳が最も低くなっています。\n\n警察庁は「チャイルドシートを使用していても、車両への取付け固定が不十分だったり、正しく座らせなかった場合には、交通事故時にチャイルドシートがシートベルトから分離してしまったり、幼児がチャイルドシートから飛び出してしまうなど、本来の機能が発揮できない」と警告しています。\n\n警察庁-子供を守るチャイルドシート"
				},
				{
					"anchor": "装着のポイント-乳児は後部座席・後ろ向き",
					"heading": "装着のポイント（乳児は後部座席・後ろ向き）",
					"text": "装着のポイント（乳児は後部座席・後ろ向き）\n独立行政法人自動車事故対策機構（nasva）のチャイルドシート使い分けでは、乳児用（ベビーシート）は体重10kg未満又は13kg未満、身長70cm以下で新生児から1歳くらいまでの対象とし、「後ろ向き」と「ベッド型」があるとしています。\n\n後部座席への設置が推奨されています。前方座席のエアバッグは成人の体型を前提に設計されており、子どもにはかえって被害を及ぼすおそれがあるためです。やむを得ず助手席に置く場合はシートを最大まで後方に下げます。\n\n取り付けは座席に体重をかけて沈み込み、シートベルトの緩みを取ることがポイントです。isofix対応品は取付けが確実に行いやすく、警察庁や業界団体が普及啓発を行っています。\n\nnasva-チャイルドシートの使い方\n警察庁-子供を守るチャイルドシート"
				},
				{
					"anchor": "正しく使わなければ意味がない",
					"heading": "正しく使わなければ意味がない",
					"text": "正しく使わなければ意味がない\n国土交通省のチャイルドシート着用効果の分析では、「着用時と非着用時とでは致死率、死亡重傷率に大きな差がある」とされています。警察庁のデータでも、取付けが適切だった割合は74.8％、正しく着座できていた割合は55.6％にすぎず、不適切な使用が重大事故につながりやすいことが示されています。\n\n警察庁-子供を守るチャイルドシート"
				},
				{
					"anchor": "誤飲・窒息-何が危険で-万一はどうする",
					"heading": "誤飲・窒息：何が危険で、万一はどうする",
					"text": "誤飲・窒息：何が危険で、万一はどうする"
				},
				{
					"anchor": "危険なもの-小物・食品",
					"heading": "危険なもの（小物・食品）",
					"text": "危険なもの（小物・食品）\n政府広報オンラインの解説：「3歳のこどもの口の直径はおよそ4cmで、ほぼトイレットペーパーの芯ぐらいの大きさ。それより小さな物は飲み込んでしまう危険を常に考えたほうがいい」。スーパーボールなど6mmから2cmのおもちゃは特に気道をふさぎやすく窒息のおそれが高まる、としています。\n\nこどもの救急（online-qq、日本小児科学会）が窒息の原因になりやすいものとして挙げる例：食品（こんにゃくゼリー、ピーナッツなどの豆類、野菜スティック、アメ、キャラメル、ポップコーン、甘栗）、日用品（柔らかい布団）、おもちゃの部品、硬貨（小銭）、ボタン電池。コンビニ袋を頭にかぶる遊び、電気コードやカーテン・ブラインドのヒモを首に巻くことも窒息の原因になりうるとしています。\n\nボタン電池は粘膜に触れるとタンパク質を溶かす液体が出て体内で化学やけど（化学熱傷）を引き起こし、胃や食道の壁を短時間で傷つけて穴をあけることがあります。誤飲の疑いがある場合は無理に吐かせず、受診するまで何も飲ませないよう呼びかけられています。\n\n消費者庁・こども家庭庁のハンドブックでも、0～3歳くらいの「医薬品・洗剤・化粧品の誤飲」、0～5歳くらいの「ボタン電池・吸水ボール・磁石の誤飲」、0～6歳くらいの「食事中に食べ物で窒息」が注意項目として扱われています。\n\n政府広報-赤ちゃんやこどもを誤飲・窒息事故から守る\nこどもの救急-窒息\n消費者庁-こどもの事故防止ハンドブック（窒息・誤飲）"
				},
				{
					"anchor": "食べ物の切り方・姿勢",
					"heading": "食べ物の切り方・姿勢",
					"text": "食べ物の切り方・姿勢\n日本小児科学会「食品による窒息 子どもを守るためにできること」は、食品による窒息は未就学児（特に5歳以下）で多いことを示し、丸い・滑りやすい・硬い・粘着性の食品を小さく・やわらかくし、食事中は姿勢を正して目を離さないことなどを呼びかけています。\n\n日本小児科学会-食品による窒息 子どもを守るためにできること"
				},
				{
					"anchor": "窒息時の応急処置-ハイムリック法は1歳以上のみ",
					"heading": "窒息時の応急処置（ハイムリック法は1歳以上のみ）",
					"text": "窒息時の応急処置（ハイムリック法は1歳以上のみ）\nこどもの救急（online-qq）の公式手順：「突然声が出なくなった、首をおさえ苦しそうにしている、唇が紫色になった」場合は窒息を疑います。1歳未満の乳児には「胸部突き上げ法」と「背部叩打法」を数回ずつ交互に行います。意識がある1歳以上の幼児には「腹部突き上げ法」（ハイムリック法）を行います。いずれも意識がない場合は心肺蘇生（cpr）を行いながら119番通報し救急車を呼びます。\n\n日本医師会救急蘇生法でも「乳児では腹部突き上げ法は行いません」と明記されています。腹部突き上げ法は腹部の内臓を傷める可能性があるため、実施した場合は救急隊にその旨を伝えるよう呼びかけられています。\n\nこどもの救急-窒息\n日本医師会-気道異物除去の手順"
				},
				{
					"anchor": "転落-ベッド・階段・窓",
					"heading": "転落：ベッド・階段・窓",
					"text": "転落：ベッド・階段・窓\nこども家庭庁・消費者庁の事故防止ハンドブック（転落・転倒、1歳以上）：「窓に補助錠やストッパーをつけて、大きく開かないようにしましょう。窓の近くにベッドやソファなど踏み台になるものは置かない」ように、としています。\n\n消費者庁は「子どもの転落事故に注意！〜落ちるまではあっという間です〜」と注意喚起しています。調査では、乳幼児の育児経験がある消費者の約4割が子育て中に転落事故の経験があり、その約3割が医療機関を受診した経験がある、としています。\n\n消費者庁・国民生活センターには、ベビーゲート（ベビードア）が取り付けられていなかったり、付けていても閉め忘れていたりしたことで、子どもが階段から転落した事故情報が寄せられており、取り付け位置の確認と「閉まっている」ことの確認が呼びかけられています。\n\n抱っこ中・高い位置からの落下：国民生活センターの注意喚起では、浴槽の蓋や洗濯機の上などに乳児を寝かせたまま目を離した際の落下で頭部を受傷する事故（骨折や頭蓋内損傷を負った事故の約4割は洗濯機からの落下）が発生しており、乳児を浴槽の蓋や洗濯機の上に寝かせないよう呼びかけられています。\n\nこども家庭庁-水の危険は近くにあります\n消費者庁-こどもの事故防止ハンドブック（転落・転倒）\n消費者庁-子どもの転落事故に注意!\n国民生活センター-入浴・沐浴に伴う乳児の落下事故に注意"
				},
				{
					"anchor": "やけど-入浴と熱いもの",
					"heading": "やけど：入浴と熱いもの",
					"text": "やけど：入浴と熱いもの\n消費者庁の入浴安全の指針（「入浴事故を防ぐための5ヵ条」）では、「湯温は41度以下、湯につかる時間は10分まで」が目安とされています（入浴前に脱衣所・浴室を暖める、浴槽から急に立ち上がらない、食後すぐやアルコールが抜けるまでの入浴を控える、入浴前に同居者へ一声かける、と並ぶ）。\n\n消費者庁・こども家庭庁のハンドブック（やけど）：床に置くタイプの暖房器具は子どもの手が届かないよう安全柵などで囲む、湯たんぽや電気カーペットは同じ場所が長時間触れて低温やけどになることに注意、とされています。炊飯器や電気ケトルなど、高温の蒸気や転倒して熱湯に触れるおそれのある製品は、乳幼児の行動範囲で使用しないよう行政が呼びかけています。\n\n子どものやけどの初期対応として、政府広報は「すぐに10分以上冷やす。刺激を避けるため、容器に溜めた水で冷やすか、水道水・シャワーを直接当てない。服の上から熱湯などがかかった場合は、脱がさずに服の上から冷やす」と示しています。\n\n消費者庁-消費者白書 column 住環境における高齢者の事故（入浴時の注意ポイント）\n消費者庁-こどもの事故防止ハンドブック（やけど）\n政府広報-家の中の思わぬ危険。乳幼児のやけど事故にご注意を！（やけどの初期対応）"
				},
				{
					"anchor": "溺水-浴槽・桶・便座・おむつ替え台",
					"heading": "溺水：浴槽・桶・便座・おむつ替え台",
					"text": "溺水：浴槽・桶・便座・おむつ替え台\n消費者庁（厚生労働省「人口動態調査」を踏まえた注意喚起）：「子どもが浴室で溺水し死亡する事故が多く発生しています」「子どもは声や音を出さず静かに溺れることもあります」。対策として、入浴後は浴槽の水を抜くことを習慣にし、子どもだけで浴室に入れないようベビーゲートなどを設置すること、浴室等の水回りの環境づくり（桶・洗面器など一時的に残る水はこまめに抜く）が呼びかけられています。\n\n消費者庁「子どもの水の事故を防ごう！」（世界溺水防止デー 7月25日）：厚生労働省「人口動態調査」によると、0～1歳では浴槽での溺死が最も多い、より活動的になる5歳以上では自然水域での溺死が最多、としています。「少しの時間、少しの水量と油断せず、子どもの見守りと合わせて溺水事故が起こらない環境づくりを」と呼びかけています。\n\nこども家庭庁（令和元年～5年の5年間）：14歳以下のこどもの不慮の溺死・溺水による死亡は不慮の事故の中でも死因の上位を占め、10～14歳では最も多い、5～9歳では交通事故に次いで多い、としています。\n\n消費者庁-御家庭内での子どもの溺水事故に御注意ください\n消費者庁-子どもの水の事故を防ごう！\nこども家庭庁-水の危険は近くにあります"
				},
				{
					"anchor": "熱中症-車内放置と外出時の水分",
					"heading": "熱中症：車内放置と外出時の水分",
					"text": "熱中症：車内放置と外出時の水分\n消費者庁（jafのテスト紹介）：10月で最高気温約27度の比較的過ごしやすい気候でも、日が射すと車内温度は約48度、ダッシュボードは65度を超えることがあります。エアコンで適温（25度程度）にした後にエンジンを停止・締め切った状態でも、約1時間後の車内温度は50度以上（51.3度）に達します。「たとえ数分であっても、車内に子どもを残すことは絶対しない」よう呼びかけています。\n\njafユーザーテスト：夏場でエアコン停止からわずか15分で熱中症指数（wbgt）が危険レベルに達した、とされています。「乳幼児は体温調節機能が未発達で、高温下では短時間で体温が上昇し、死に至ることがある。寝ているからという理由で車内に子どもを残すのは大変危険である」としています。\n\nこども家庭庁：「短時間であっても絶対に車内をこどもだけにせず、降ろし忘れにも注意」「乳幼児は自分の力で移動することができず、『寝ているから』『ちょっとの時間だから』と放置することは危険です。特に、車内に置き去りにすることは絶対にやめましょう」としています。\n\n外出時は、子どもは身長が低い分、地面からの輻射熱を大人より強く受けるとされています。遊びに夢中になっているとのどの渇きなどの熱中症のサインに気づきにくいので、大人が見守りながら休憩と水分補給を勧めることが、こども家庭庁・消費者庁の呼びかけです。\n\n消費者庁-vol.524 真夏でなくても車内での熱中症に注意しましょう!\njaf-真夏の車内温度（jafユーザーテスト）\nこども家庭庁-みんなで見守り「こどもの熱中症」を防ぎましょう！"
				},
				{
					"anchor": "誤飲-薬・洗剤-と中毒110番",
					"heading": "誤飲（薬・洗剤）と中毒110番",
					"text": "誤飲（薬・洗剤）と中毒110番\n医薬品・洗剤・化粧品は子どもの手の届かない場所に保管し、飲料用ペットボトルへの移し替えはしない（誤飲事故が多い）ことが、国民生活センター・消費者庁ハンドブックで呼びかけられています。\n\n医薬品・洗剤などの誤飲（急性中毒）が起きた場合は、公益財団法人日本中毒情報センターの中毒110番へ電話で応急処置などの情報を得られます。\n大阪中毒110番：072-727-2499（365日・24時間対応、情報提供料無料）\nつくば中毒110番：029-852-9999（一般専用電話・365日24時間対応、情報提供料無料）\n中毒110番は、化学物質（たばこ・家庭用品など）・医薬品・動植物の毒などによる急性中毒への情報提供が対象です。ビー玉・小石などの異物誤飲は相談の対象外なので、その場合は直ちに医療機関へ。\n日本中毒情報センター-中毒１１０番・電話サービス\n消費者庁-こどもの事故防止ハンドブック（窒息・誤飲）"
				}
			]
		},
		{
			"slug": "dos-and-donts",
			"title": "やってはいけないこと",
			"order": 7,
			"fullText": "揺さぶり、はちみつ、添い寝、綿棒、寝かしたままの授乳。どれも公的機関が根拠を示して注意していることです。根拠のないしきたりや風説は載せていません。\n日本小児科学会「乳児の安全な睡眠環境の確保について 2024年改訂」\n赤ちゃんを激しく揺さぶらない（乳幼児揺さぶられ症候群）\n赤ちゃんは首の筋肉が弱く、身体に対する頭の割合が大きいので、激しく揺さぶられると外傷が見えていなくても脳に大きな衝撃が伝わります。こども家庭庁は、虐待防止の観点から、泣きやませるために激しく揺さぶったり、口をふさいだりしてはいけないことを、動画「赤ちゃんが泣きやまない〜泣きへの理解と対処のために〜」（厚生労働省制作）で呼びかけています。\n\n揺さぶられた赤ちゃんに嘔吐・ぐったり・けいれんなどの症状がみられた場合は、迷わずすぐに小児科を受診してください。\n\nこども家庭庁「赤ちゃんが泣きやまない」\n泣き止まないときの対処（一旦離れる）\n育児のしおり（国立成育医療研究センター研究所 成育社会医学研究部作成）では、泣きやまず強いストレスを感じたときは、赤ちゃんを安全な場所に寝かせて、大人がその場から一旦離れることが勧められています。深呼吸をする、安全な所に赤ちゃんを寝かせて一旦離れる、誰かと言葉をかわすなどの気分転換を。泣くことは赤ちゃんにとって正常な連絡手段であり、泣いているのは誰が悪いことでもありません。\n\nパートナーや周囲に「ちょっとお願い」と声をかけるのも有効です。一人で抱え込まず、こども家庭庁の動画「赤ちゃんが泣きやまない」を事前に視聴しておくことも勧められています。\n\n赤ちゃんが泣きやまず、強いストレスを感じていますか\nはい\nいいえ\n赤ちゃんを安全な場所に寝かせて、大人がその場から一旦離れる\n嘔吐・ぐったり・けいれんなどの症状がみられた場合\n症状がみられない場合\n迷わずすぐに小児科を受診する\n泣くことは赤ちゃんにとって正常な連絡手段であり、泣いているのは誰が悪いことでもありません。パートナーや周囲に「ちょっとお願い」と声をかけるのも有効です\n泣くことは赤ちゃんにとって正常な連絡手段であり、泣いているのは誰が悪いことでもありません\n東京都福祉局「育児のしおり」（国立成育医療研究センター研究所 成育社会医学研究部作成）\nこども家庭庁「赤ちゃんが泣きやまない」\nはちみつは1歳まで与えない（乳児ボツリヌス症）\n1歳未満の赤ちゃんにははちみつを与えないでください。 1歳未満の赤ちゃんがはちみつを食べることによって乳児ボツリヌス症にかかることがあります。1歳未満は腸内細菌の環境が整っておらず、はちみつに混入しうるボツリヌス菌が増殖して毒素を作るおそれがあるためです。\n\nボツリヌス菌は熱に強いので、通常の加熱や調理では死にません。 1歳未満の赤ちゃんにははちみつだけでなく、はちみつを含む食品（はちみつ入りのお菓子・調味料など）も与えないようにしてください。\n\n1歳以上になると離乳食等により腸内環境が整うため、はちみつを避ける必要はありません。\n\n乳児のお世話をする祖父母・同居のご家族など周囲の方にも「1歳までははちみつng」を共有しておいてください。\n\n厚生労働省「ハチミツを与えるのは１歳を過ぎてから。」\n消費者庁「ハチミツによる乳児のボツリヌス症」\nソファでの添い寝・同じ寝具での添い寝をしない（sids・窒息リスク）\nsids（乳幼児突然死症候群）は、何の予兆や既往歴もないまま乳幼児が睡眠中に亡くなる原因不明の病気で、窒息などの事故とは異なります。令和6年には55名の乳児がsidsで亡くなっており、乳児期の死亡原因としては第3位とされています（こども家庭庁）。\n\nsidsの発症リスクを低くするための3原則（こども家庭庁）：①1歳になるまでは「あおむけ」に寝かせる ②無理のない範囲で母乳育児をする ③たばこをやめる（赤ちゃんの周囲での喫煙・受動喫煙もsidsの発生要因）。\n\n添い寝は、大人の身体で赤ちゃんに覆い被さったり口や鼻を塞いでしまったりする危険があるため注意が必要です。とくに、添い寝している人が眠気を引き起こす・注意力を低下させる薬を服用している場合、飲酒をした場合、赤ちゃんが早産や低出生体重で生まれた場合は特に危険とされています（こども家庭庁）。\n\n日本小児科学会の2024年改訂提言では、乳児突然死230事例のうち61%で「親と共寝（添い寝）」が記録されており、添い寝による覆い被さり・挟み込みが乳児の窒息死に関与する懸念が示されています。\n\nソファでの添い寝・就寝は特に避けてください。 ソファは沈み込む座面で、転落したり、身体の隙間に沈み込んで顔が寝具に埋もれて窒息する事故が報告されています。こども家庭庁の事故防止ハンドブックも「2歳になるまでは、できるだけ大人用ベッドは使わないようにしましょう。またソファで寝かせないようにしましょう」としています。日中の短い昼寝でもソファに寝かせたまま離れないようにしてください。\n\nこども家庭庁「赤ちゃんが安全に眠れるように」\n日本小児科学会「乳児の安全な睡眠環境の確保について 2024年改訂」\n消費者庁「vol.607 就寝時の窒息事故に気を付けましょう」\nこども家庭庁「こどもの事故防止ハンドブック」（転落・転倒事故）\n赤ちゃんを長時間一人にしない\n添い寝・睡眠中の事故を予防する観点から、sids対策の支援団体（npo法人sids家族の会）は、よく眠っているからといって長い時間赤ちゃんを一人にしないことを呼びかけています。\n\n1歳までの就寝環境は、大人がすぐそばにいる場所で寝かせて、転落しないよう柵を上げたベビーベッドや転落防止の整った環境にすること、寝ている赤ちゃんの顔の近くに口鼻を覆うもの（掛け布団・ぬいぐるみ・衣類・スタイ）を置かないことが、消費者庁・こども家庭庁で共通に案内されています。\n\nnpo法人sids家族の会「sidsを少なくするために」\n消費者庁「vol.607 就寝時の窒息事故に気を付けましょう」\n綿棒で耳の奥まで掃除しない\n一般社団法人 日本耳鼻咽喉科頭頸部外科学会は、家庭で綿棒や耳かきを使って耳掃除することは常に危険を伴うとしています。奥までいじりすぎると耳垢を押し込んで「耳垢栓塞（耳垢が詰まる状態）」となり、強く拭くと外耳道を傷つけて外耳炎を起こすことがあります。耳掃除中に赤ちゃんが動いたり他人と接触したりすると鼓膜を破ってしまう事故もあります。\n\n耳垢には細菌やカビの繁殖を防いだり、外耳道の皮膚を保護する役割があるため、奥まで取り切ろうとしないこと。見える範囲（耳の入口付近）をそっと拭う程度にとどめ、耳垢の詰まりが気になる・耳を触って泣くなどの場合は耳鼻咽喉科に相談してください。\n\n一般社団法人 日本耳鼻咽喉科頭頸部外科学会「耳垢」\n就寝中の授乳・ミルクに注意（乳歯のむし歯・哺乳びんむし歯）\n就寝しながらの授乳はむし歯発生のリスクです。就寝中は唾液の分泌が減少し、むし歯の原因菌にとって好ましい環境が維持されるためです（国立成育医療研究センター e-ヘルスネット）。母乳・育児用ミルクだけであれば大きなリスクではありませんが、離乳食が始まって砂糖を含む食品や果汁を摂り始めると、授乳によるむし歯リスクが高まります。\n\n乳歯が生え始めたら、哺乳びんに甘い飲み物（ジュース・乳酸菌飲料・甘味飲料）を入れること、寝ながらの授乳は控えるようにすることが案内されています。\n\n母乳か粉ミルクかの差より、哺乳時間や哺乳姿勢、歯の清潔保持のほうがむし歯予防では重要とされています（日本小児歯科学会）。歯が生え始めたらガーゼや赤ちゃん用歯ブラシで歯や歯ぐきを清潔に保ちましょう。\n\n品川区では保健センターで1歳6か月児健康診査（予約制）が行われています。授乳状況や歯・口まわりのケアの気になることは、健診や保健センターで相談してください。区では2歳児歯科健診（フッ化物塗布 880円・予約制）も別途実施しています。\n\n国立成育医療研究センター e-ヘルスネット「卒乳時期とむし歯の関係」\n日本小児歯科学会「産まれてから2歳頃まで」\n品川区「乳幼児の健康診査・相談」\n叩く・ぶつけるなどの体罰は法律で禁止\n令和元年6月に児童福祉法・児童虐待防止法が改正され、親権者等は、児童のしつけに際して体罰を加えてはならないことが法定化され、令和2年4月に施行されました（こども家庭庁）。\n\n体罰禁止の趣旨や虐待防止対策は、厚生労働省（こども家庭庁に移管）の「児童虐待に関する法令・指針等一覧」等で整理されています。叩く・叩きつける・ぶつける・投げつけるなどの行為は、しつけを名目にしても禁止されています。\n\nこども家庭庁「体罰等によらない子育てのために」\n厚生労働省「児童虐待に関する法令・指針等一覧」",
			"sections": [
				{
					"anchor": "top",
					"heading": "",
					"text": "揺さぶり、はちみつ、添い寝、綿棒、寝かしたままの授乳。どれも公的機関が根拠を示して注意していることです。根拠のないしきたりや風説は載せていません。\n日本小児科学会「乳児の安全な睡眠環境の確保について 2024年改訂」"
				},
				{
					"anchor": "赤ちゃんを激しく揺さぶらない-乳幼児揺さぶられ症候群",
					"heading": "赤ちゃんを激しく揺さぶらない（乳幼児揺さぶられ症候群）",
					"text": "赤ちゃんを激しく揺さぶらない（乳幼児揺さぶられ症候群）\n赤ちゃんは首の筋肉が弱く、身体に対する頭の割合が大きいので、激しく揺さぶられると外傷が見えていなくても脳に大きな衝撃が伝わります。こども家庭庁は、虐待防止の観点から、泣きやませるために激しく揺さぶったり、口をふさいだりしてはいけないことを、動画「赤ちゃんが泣きやまない〜泣きへの理解と対処のために〜」（厚生労働省制作）で呼びかけています。\n\n揺さぶられた赤ちゃんに嘔吐・ぐったり・けいれんなどの症状がみられた場合は、迷わずすぐに小児科を受診してください。\n\nこども家庭庁「赤ちゃんが泣きやまない」"
				},
				{
					"anchor": "泣き止まないときの対処-一旦離れる",
					"heading": "泣き止まないときの対処（一旦離れる）",
					"text": "泣き止まないときの対処（一旦離れる）\n育児のしおり（国立成育医療研究センター研究所 成育社会医学研究部作成）では、泣きやまず強いストレスを感じたときは、赤ちゃんを安全な場所に寝かせて、大人がその場から一旦離れることが勧められています。深呼吸をする、安全な所に赤ちゃんを寝かせて一旦離れる、誰かと言葉をかわすなどの気分転換を。泣くことは赤ちゃんにとって正常な連絡手段であり、泣いているのは誰が悪いことでもありません。\n\nパートナーや周囲に「ちょっとお願い」と声をかけるのも有効です。一人で抱え込まず、こども家庭庁の動画「赤ちゃんが泣きやまない」を事前に視聴しておくことも勧められています。\n\n赤ちゃんが泣きやまず、強いストレスを感じていますか\nはい\nいいえ\n赤ちゃんを安全な場所に寝かせて、大人がその場から一旦離れる\n嘔吐・ぐったり・けいれんなどの症状がみられた場合\n症状がみられない場合\n迷わずすぐに小児科を受診する\n泣くことは赤ちゃんにとって正常な連絡手段であり、泣いているのは誰が悪いことでもありません。パートナーや周囲に「ちょっとお願い」と声をかけるのも有効です\n泣くことは赤ちゃんにとって正常な連絡手段であり、泣いているのは誰が悪いことでもありません\n東京都福祉局「育児のしおり」（国立成育医療研究センター研究所 成育社会医学研究部作成）\nこども家庭庁「赤ちゃんが泣きやまない」"
				},
				{
					"anchor": "はちみつは1歳まで与えない-乳児ボツリヌス症",
					"heading": "はちみつは1歳まで与えない（乳児ボツリヌス症）",
					"text": "はちみつは1歳まで与えない（乳児ボツリヌス症）\n1歳未満の赤ちゃんにははちみつを与えないでください。 1歳未満の赤ちゃんがはちみつを食べることによって乳児ボツリヌス症にかかることがあります。1歳未満は腸内細菌の環境が整っておらず、はちみつに混入しうるボツリヌス菌が増殖して毒素を作るおそれがあるためです。\n\nボツリヌス菌は熱に強いので、通常の加熱や調理では死にません。 1歳未満の赤ちゃんにははちみつだけでなく、はちみつを含む食品（はちみつ入りのお菓子・調味料など）も与えないようにしてください。\n\n1歳以上になると離乳食等により腸内環境が整うため、はちみつを避ける必要はありません。\n\n乳児のお世話をする祖父母・同居のご家族など周囲の方にも「1歳までははちみつng」を共有しておいてください。\n\n厚生労働省「ハチミツを与えるのは１歳を過ぎてから。」\n消費者庁「ハチミツによる乳児のボツリヌス症」"
				},
				{
					"anchor": "ソファでの添い寝・同じ寝具での添い寝をしない-sids・窒息リスク",
					"heading": "ソファでの添い寝・同じ寝具での添い寝をしない（SIDS・窒息リスク）",
					"text": "ソファでの添い寝・同じ寝具での添い寝をしない（sids・窒息リスク）\nsids（乳幼児突然死症候群）は、何の予兆や既往歴もないまま乳幼児が睡眠中に亡くなる原因不明の病気で、窒息などの事故とは異なります。令和6年には55名の乳児がsidsで亡くなっており、乳児期の死亡原因としては第3位とされています（こども家庭庁）。\n\nsidsの発症リスクを低くするための3原則（こども家庭庁）：①1歳になるまでは「あおむけ」に寝かせる ②無理のない範囲で母乳育児をする ③たばこをやめる（赤ちゃんの周囲での喫煙・受動喫煙もsidsの発生要因）。\n\n添い寝は、大人の身体で赤ちゃんに覆い被さったり口や鼻を塞いでしまったりする危険があるため注意が必要です。とくに、添い寝している人が眠気を引き起こす・注意力を低下させる薬を服用している場合、飲酒をした場合、赤ちゃんが早産や低出生体重で生まれた場合は特に危険とされています（こども家庭庁）。\n\n日本小児科学会の2024年改訂提言では、乳児突然死230事例のうち61%で「親と共寝（添い寝）」が記録されており、添い寝による覆い被さり・挟み込みが乳児の窒息死に関与する懸念が示されています。\n\nソファでの添い寝・就寝は特に避けてください。 ソファは沈み込む座面で、転落したり、身体の隙間に沈み込んで顔が寝具に埋もれて窒息する事故が報告されています。こども家庭庁の事故防止ハンドブックも「2歳になるまでは、できるだけ大人用ベッドは使わないようにしましょう。またソファで寝かせないようにしましょう」としています。日中の短い昼寝でもソファに寝かせたまま離れないようにしてください。\n\nこども家庭庁「赤ちゃんが安全に眠れるように」\n日本小児科学会「乳児の安全な睡眠環境の確保について 2024年改訂」\n消費者庁「vol.607 就寝時の窒息事故に気を付けましょう」\nこども家庭庁「こどもの事故防止ハンドブック」（転落・転倒事故）"
				},
				{
					"anchor": "赤ちゃんを長時間一人にしない",
					"heading": "赤ちゃんを長時間一人にしない",
					"text": "赤ちゃんを長時間一人にしない\n添い寝・睡眠中の事故を予防する観点から、sids対策の支援団体（npo法人sids家族の会）は、よく眠っているからといって長い時間赤ちゃんを一人にしないことを呼びかけています。\n\n1歳までの就寝環境は、大人がすぐそばにいる場所で寝かせて、転落しないよう柵を上げたベビーベッドや転落防止の整った環境にすること、寝ている赤ちゃんの顔の近くに口鼻を覆うもの（掛け布団・ぬいぐるみ・衣類・スタイ）を置かないことが、消費者庁・こども家庭庁で共通に案内されています。\n\nnpo法人sids家族の会「sidsを少なくするために」\n消費者庁「vol.607 就寝時の窒息事故に気を付けましょう」"
				},
				{
					"anchor": "綿棒で耳の奥まで掃除しない",
					"heading": "綿棒で耳の奥まで掃除しない",
					"text": "綿棒で耳の奥まで掃除しない\n一般社団法人 日本耳鼻咽喉科頭頸部外科学会は、家庭で綿棒や耳かきを使って耳掃除することは常に危険を伴うとしています。奥までいじりすぎると耳垢を押し込んで「耳垢栓塞（耳垢が詰まる状態）」となり、強く拭くと外耳道を傷つけて外耳炎を起こすことがあります。耳掃除中に赤ちゃんが動いたり他人と接触したりすると鼓膜を破ってしまう事故もあります。\n\n耳垢には細菌やカビの繁殖を防いだり、外耳道の皮膚を保護する役割があるため、奥まで取り切ろうとしないこと。見える範囲（耳の入口付近）をそっと拭う程度にとどめ、耳垢の詰まりが気になる・耳を触って泣くなどの場合は耳鼻咽喉科に相談してください。\n\n一般社団法人 日本耳鼻咽喉科頭頸部外科学会「耳垢」"
				},
				{
					"anchor": "就寝中の授乳・ミルクに注意-乳歯のむし歯・哺乳びんむし歯",
					"heading": "就寝中の授乳・ミルクに注意（乳歯のむし歯・哺乳びんむし歯）",
					"text": "就寝中の授乳・ミルクに注意（乳歯のむし歯・哺乳びんむし歯）\n就寝しながらの授乳はむし歯発生のリスクです。就寝中は唾液の分泌が減少し、むし歯の原因菌にとって好ましい環境が維持されるためです（国立成育医療研究センター e-ヘルスネット）。母乳・育児用ミルクだけであれば大きなリスクではありませんが、離乳食が始まって砂糖を含む食品や果汁を摂り始めると、授乳によるむし歯リスクが高まります。\n\n乳歯が生え始めたら、哺乳びんに甘い飲み物（ジュース・乳酸菌飲料・甘味飲料）を入れること、寝ながらの授乳は控えるようにすることが案内されています。\n\n母乳か粉ミルクかの差より、哺乳時間や哺乳姿勢、歯の清潔保持のほうがむし歯予防では重要とされています（日本小児歯科学会）。歯が生え始めたらガーゼや赤ちゃん用歯ブラシで歯や歯ぐきを清潔に保ちましょう。\n\n品川区では保健センターで1歳6か月児健康診査（予約制）が行われています。授乳状況や歯・口まわりのケアの気になることは、健診や保健センターで相談してください。区では2歳児歯科健診（フッ化物塗布 880円・予約制）も別途実施しています。\n\n国立成育医療研究センター e-ヘルスネット「卒乳時期とむし歯の関係」\n日本小児歯科学会「産まれてから2歳頃まで」\n品川区「乳幼児の健康診査・相談」"
				},
				{
					"anchor": "叩く・ぶつけるなどの体罰は法律で禁止",
					"heading": "叩く・ぶつけるなどの体罰は法律で禁止",
					"text": "叩く・ぶつけるなどの体罰は法律で禁止\n令和元年6月に児童福祉法・児童虐待防止法が改正され、親権者等は、児童のしつけに際して体罰を加えてはならないことが法定化され、令和2年4月に施行されました（こども家庭庁）。\n\n体罰禁止の趣旨や虐待防止対策は、厚生労働省（こども家庭庁に移管）の「児童虐待に関する法令・指針等一覧」等で整理されています。叩く・叩きつける・ぶつける・投げつけるなどの行為は、しつけを名目にしても禁止されています。\n\nこども家庭庁「体罰等によらない子育てのために」\n厚生労働省「児童虐待に関する法令・指針等一覧」"
				}
			]
		},
		{
			"slug": "dads-mindset",
			"title": "パパの心構え：パートナーの観察と育児の分担",
			"order": 8,
			"fullText": "出産は、パパの生活と心も変えます。産後は、母も父も心の不調になりやすい時期です。国や自治体も、サインを知っておくことを勧めています。育児の分担と相談先は、遅くなる前に決めておきましょう。\nこども家庭庁 健やか親子21 テーマ2 妊産婦の健康（2024-03 pdf）\n産後うつ（母）のサインを知る\n産後うつ病（産褥期うつ病）は、分娩後 6〜8 週程度の産褥期に起こりやすいうつ病です。急激な身体的変化・ホルモン変化に加え、育児という心理社会的変化が同時に起こるため、時に自殺や無理心中などのおそれも指摘されています。\n\nこども家庭庁の「健やか親子21」では、「産後うつ病の可能性のある方は約 10人に1人」（令和4年度 母子保健事業の実施状況等について）とされています。\n\n同じ資料で挙げられている主なリスク因子は「サポート不足」「妊娠中のうつ症状や不安」「精神疾患の既往」で、家族からのサポート不足が明確なリスク因子として位置づけられています。\n\n産後 4 週間頃は、母親が安心して身体を回復させながら育児を行うことが心の状態にとってとても大切です（パパが負担を分担する絶好の時期でもあります）。\n\n妻が「気分が重い、なぜだか涙が出てしまう、赤ちゃんをかわいいと思えない、何もする気がならない、眠れない、急にイライラする」といった状態が続いているなら、「疲れているだけ」とは思わず気にかけましょう。\n\n厚生労働省は「育児を抱え込ませない社会的サポートが重要です」としています。\n\nこども家庭庁 健やか親子21 テーマ2 妊産婦の健康（2024-03 pdf）\n厚生労働省 こころの耳（産褥期うつ病 用語解説）\nパパが観察できるサインと声かけ\n上記のサインが 2 週間ほど続く、または日常生活に支障が出る程度なら「気のせい」と思わず、本人に直接声をかけます。ポイントは、体調や悩みを抱えていないかなど、コミュニケーションをとって確認することです。\n\n「おかしいよ」のような評価の言葉ではなく、体調と悩みを確認する問いかけ（体調はどう？ 何か心配事は？ 今夜は全部私がやるから休んで）を、毎日短い時間をつくって続けるのがポイントです。\n\n妻だけでなく、ご家族やパートナーからの相談も品川区の保健センターが受け付けています（保健師・助産師・栄養士・歯科衛生士が対応）。電話だけでなく、乳幼児健診などの母子保健事業に来所した際にも相談できます。\n\nこども家庭庁 健やか親子21 テーマ2 妊産婦の健康（2024-03 pdf）\n品川区（妊娠・出産・子育てに関するご相談）\nパパも産後うつになる\n父親も対象です。国立成育医療研究センターによると、父親の産前・産後のうつ病発症率は約 10％前後とされ、母親と同様な頻度で起こります。母親だけでなく父親も両親学級などに参加して準備することが勧められています。\n\n国立成育医療研究センターの研究（2023 年発表）では、父親の産前・産後期のうつ病のリスク要因は「強い不安」「こども時代の困難な体験」「パートナーの妊娠前のうつ病既往」「家族関係の問題」などで、母親の一般的なリスク要因と共通しています。「周囲や家族のサポート不足」がある場合、リスクは約 2 倍になるとされています。\n\n一般社団法人日本家族計画協会（jfpa）は、父親向けのメンタルヘルス教材「パパコト『頑張りすぎちゃうお父さんへ』」も公開しています。\n\nパパ自身に同じサイン（気分の落ち込み・イライラ・不眠・育児への関心低下）が 2 週間ほど続くなら、妻と同様に相談窓口の利用を勧めます。\n\n国立成育医療研究センター（父親の産前・産後うつ リスク要因 プレスリリース）\n日本家族計画協会（jfpa）健康チャンネル（ncchd 研究紹介）\n父親支援は行政の正式な事業になっている\n国立成育医療研究センターが 2025 年に「支援者のための父親支援マニュアル」を公開しました（日本初・自治体向け）。こども家庭庁の研究班として作成され、「すべての父親を対象にした取り組み」を既存の母子保健・子育て支援事業に追加できることがポイントです。自治体の父親支援（父親向け教室・健診問診票の父親記入欄など）を見かけたら利用するのがおすすめです。\n\n国立成育医療研究センター（父親支援マニュアル プレスリリース）\n相談先（品川区）\n品川区の区保健センター（品川・大井・荏原）は、妊娠・出産・子育てに関する相談を保健師・助産師などの専門職が受け付けています。妊婦・母親だけでなく、ご家族やパートナーからのご相談も受付けています。\n品川保健センター 電話：03-3474-2903\n大井保健センター 電話：03-3772-2666\n荏原保健センター 電話：03-3788-7016\n「子育てネウボラ相談」は、13 の児童センターで保健師・看護師・教員・保育士などの資格を持つ相談員が対応します（月〜土 午前 10 時〜午後 4 時、各センターで曜日違い・予約制。対象は区内在住の乳幼児の保護者）。\n\n心の状態が心配な場合は、厚生労働省の相談サイト「こころの耳」にも電話・メール・sns 相談窓口があります。\n\n品川区（妊娠・出産・子育てに関するご相談）\n品川区（子育てネウボラ相談）\n厚生労働省 こころの耳（産褥期うつ病 用語解説）\n育児の分担：パパが担えること\nパパが担えることの例（厚生労働省「父親の仕事と育児両立読本」が示す父親の育児関わり方の方向性）：\n沐浴（赤ちゃんをいつどこに寝かせるか、着替え場所、お風呂の準備から片づけまで含めて事前確認）\n\n授乳の補助（ミルクのあげ方、哺乳瓶の洗浄・消毒）\n\n寝かしつけ（穏やかな言葉かけ、抱き方の事前確認）\n\nおむつ替え、掃除、洗濯\n\n買い物、料理（テイクアウト・宅配も活用）\n\n事務手続き（役所の手続きはパパがやる候補）\n\n保育所の送迎\n\n両親学級などで事前に練習しておくと、実際に担いやすいとされています。\n\n厚生労働省 父親の仕事と育児両立読本（パンフレット）\n夫婦のコミュニケーション：責めない、抱え込まない\n産前は「誰がどのようにサポートできるのか」をあらかじめ相談しておくことが勧められています。準備していてもうまくいかないことがある前提で、家族・子育て経験者・助産師や保健師などの専門職に相談しながら対応します。\n\n育児環境の確認リスト（産後は自宅で過ごすか、赤ちゃんの部屋・場所、上の子の育児、入院中の交通手段、育児用品、予防接種の予定、パパママの職場復帰タイミングなど）を、妊娠中から夫婦で共有しておくと、産後の駆け引きが減ります。\n\n産後直後は一時的な気分の変動（マタニティブルーズと呼ばれるもの）もよくあります。「育児向きにならない」と責めるのは逆効果で、公的な指針の核心は「ひとりで抱え込まない」ことです（厚労省は「育児を抱え込ませない社会的サポートが重要です」としています）。不調のサインが見えたら、上の相談先へ早めに相談します。\n\nこども家庭庁 健やか親子21 テーマ2 妊産婦の健康（2024-03 pdf）\n厚生労働省 こころの耳（産褥期うつ病 用語解説）",
			"sections": [
				{
					"anchor": "top",
					"heading": "",
					"text": "出産は、パパの生活と心も変えます。産後は、母も父も心の不調になりやすい時期です。国や自治体も、サインを知っておくことを勧めています。育児の分担と相談先は、遅くなる前に決めておきましょう。\nこども家庭庁 健やか親子21 テーマ2 妊産婦の健康（2024-03 pdf）"
				},
				{
					"anchor": "産後うつ-母-のサインを知る",
					"heading": "産後うつ（母）のサインを知る",
					"text": "産後うつ（母）のサインを知る\n産後うつ病（産褥期うつ病）は、分娩後 6〜8 週程度の産褥期に起こりやすいうつ病です。急激な身体的変化・ホルモン変化に加え、育児という心理社会的変化が同時に起こるため、時に自殺や無理心中などのおそれも指摘されています。\n\nこども家庭庁の「健やか親子21」では、「産後うつ病の可能性のある方は約 10人に1人」（令和4年度 母子保健事業の実施状況等について）とされています。\n\n同じ資料で挙げられている主なリスク因子は「サポート不足」「妊娠中のうつ症状や不安」「精神疾患の既往」で、家族からのサポート不足が明確なリスク因子として位置づけられています。\n\n産後 4 週間頃は、母親が安心して身体を回復させながら育児を行うことが心の状態にとってとても大切です（パパが負担を分担する絶好の時期でもあります）。\n\n妻が「気分が重い、なぜだか涙が出てしまう、赤ちゃんをかわいいと思えない、何もする気がならない、眠れない、急にイライラする」といった状態が続いているなら、「疲れているだけ」とは思わず気にかけましょう。\n\n厚生労働省は「育児を抱え込ませない社会的サポートが重要です」としています。\n\nこども家庭庁 健やか親子21 テーマ2 妊産婦の健康（2024-03 pdf）\n厚生労働省 こころの耳（産褥期うつ病 用語解説）"
				},
				{
					"anchor": "パパが観察できるサインと声かけ",
					"heading": "パパが観察できるサインと声かけ",
					"text": "パパが観察できるサインと声かけ\n上記のサインが 2 週間ほど続く、または日常生活に支障が出る程度なら「気のせい」と思わず、本人に直接声をかけます。ポイントは、体調や悩みを抱えていないかなど、コミュニケーションをとって確認することです。\n\n「おかしいよ」のような評価の言葉ではなく、体調と悩みを確認する問いかけ（体調はどう？ 何か心配事は？ 今夜は全部私がやるから休んで）を、毎日短い時間をつくって続けるのがポイントです。\n\n妻だけでなく、ご家族やパートナーからの相談も品川区の保健センターが受け付けています（保健師・助産師・栄養士・歯科衛生士が対応）。電話だけでなく、乳幼児健診などの母子保健事業に来所した際にも相談できます。\n\nこども家庭庁 健やか親子21 テーマ2 妊産婦の健康（2024-03 pdf）\n品川区（妊娠・出産・子育てに関するご相談）"
				},
				{
					"anchor": "パパも産後うつになる",
					"heading": "パパも産後うつになる",
					"text": "パパも産後うつになる\n父親も対象です。国立成育医療研究センターによると、父親の産前・産後のうつ病発症率は約 10％前後とされ、母親と同様な頻度で起こります。母親だけでなく父親も両親学級などに参加して準備することが勧められています。\n\n国立成育医療研究センターの研究（2023 年発表）では、父親の産前・産後期のうつ病のリスク要因は「強い不安」「こども時代の困難な体験」「パートナーの妊娠前のうつ病既往」「家族関係の問題」などで、母親の一般的なリスク要因と共通しています。「周囲や家族のサポート不足」がある場合、リスクは約 2 倍になるとされています。\n\n一般社団法人日本家族計画協会（jfpa）は、父親向けのメンタルヘルス教材「パパコト『頑張りすぎちゃうお父さんへ』」も公開しています。\n\nパパ自身に同じサイン（気分の落ち込み・イライラ・不眠・育児への関心低下）が 2 週間ほど続くなら、妻と同様に相談窓口の利用を勧めます。\n\n国立成育医療研究センター（父親の産前・産後うつ リスク要因 プレスリリース）\n日本家族計画協会（jfpa）健康チャンネル（ncchd 研究紹介）"
				},
				{
					"anchor": "父親支援は行政の正式な事業になっている",
					"heading": "父親支援は行政の正式な事業になっている",
					"text": "父親支援は行政の正式な事業になっている\n国立成育医療研究センターが 2025 年に「支援者のための父親支援マニュアル」を公開しました（日本初・自治体向け）。こども家庭庁の研究班として作成され、「すべての父親を対象にした取り組み」を既存の母子保健・子育て支援事業に追加できることがポイントです。自治体の父親支援（父親向け教室・健診問診票の父親記入欄など）を見かけたら利用するのがおすすめです。\n\n国立成育医療研究センター（父親支援マニュアル プレスリリース）"
				},
				{
					"anchor": "相談先-品川区",
					"heading": "相談先（品川区）",
					"text": "相談先（品川区）\n品川区の区保健センター（品川・大井・荏原）は、妊娠・出産・子育てに関する相談を保健師・助産師などの専門職が受け付けています。妊婦・母親だけでなく、ご家族やパートナーからのご相談も受付けています。\n品川保健センター 電話：03-3474-2903\n大井保健センター 電話：03-3772-2666\n荏原保健センター 電話：03-3788-7016\n「子育てネウボラ相談」は、13 の児童センターで保健師・看護師・教員・保育士などの資格を持つ相談員が対応します（月〜土 午前 10 時〜午後 4 時、各センターで曜日違い・予約制。対象は区内在住の乳幼児の保護者）。\n\n心の状態が心配な場合は、厚生労働省の相談サイト「こころの耳」にも電話・メール・sns 相談窓口があります。\n\n品川区（妊娠・出産・子育てに関するご相談）\n品川区（子育てネウボラ相談）\n厚生労働省 こころの耳（産褥期うつ病 用語解説）"
				},
				{
					"anchor": "育児の分担-パパが担えること",
					"heading": "育児の分担：パパが担えること",
					"text": "育児の分担：パパが担えること\nパパが担えることの例（厚生労働省「父親の仕事と育児両立読本」が示す父親の育児関わり方の方向性）：\n沐浴（赤ちゃんをいつどこに寝かせるか、着替え場所、お風呂の準備から片づけまで含めて事前確認）\n\n授乳の補助（ミルクのあげ方、哺乳瓶の洗浄・消毒）\n\n寝かしつけ（穏やかな言葉かけ、抱き方の事前確認）\n\nおむつ替え、掃除、洗濯\n\n買い物、料理（テイクアウト・宅配も活用）\n\n事務手続き（役所の手続きはパパがやる候補）\n\n保育所の送迎\n\n両親学級などで事前に練習しておくと、実際に担いやすいとされています。\n\n厚生労働省 父親の仕事と育児両立読本（パンフレット）"
				},
				{
					"anchor": "夫婦のコミュニケーション-責めない-抱え込まない",
					"heading": "夫婦のコミュニケーション：責めない、抱え込まない",
					"text": "夫婦のコミュニケーション：責めない、抱え込まない\n産前は「誰がどのようにサポートできるのか」をあらかじめ相談しておくことが勧められています。準備していてもうまくいかないことがある前提で、家族・子育て経験者・助産師や保健師などの専門職に相談しながら対応します。\n\n育児環境の確認リスト（産後は自宅で過ごすか、赤ちゃんの部屋・場所、上の子の育児、入院中の交通手段、育児用品、予防接種の予定、パパママの職場復帰タイミングなど）を、妊娠中から夫婦で共有しておくと、産後の駆け引きが減ります。\n\n産後直後は一時的な気分の変動（マタニティブルーズと呼ばれるもの）もよくあります。「育児向きにならない」と責めるのは逆効果で、公的な指針の核心は「ひとりで抱え込まない」ことです（厚労省は「育児を抱え込ませない社会的サポートが重要です」としています）。不調のサインが見えたら、上の相談先へ早めに相談します。\n\nこども家庭庁 健やか親子21 テーマ2 妊産婦の健康（2024-03 pdf）\n厚生労働省 こころの耳（産褥期うつ病 用語解説）"
				}
			]
		},
		{
			"slug": "procedures",
			"title": "品川区の給付と手続き：早見表",
			"order": 9,
			"fullText": "品川区の育児の支援：医療費助成、児童手当、妊婦のための支援給付、出産育児一時金、保育園。赤ちゃんの月齢の順にまとめているので、今やるべき手続きがすぐに分かります。問い合わせ先も載せています。\n品川区役所\n品川区の主な育児支援制度\n子どもすこやか医療費助成：子どもが医療機関を受診した際の窓口医療費（保険診療分）を区が助成する制度。対象は「0歳～18歳（高校3年生相当年齢、18歳に達した日以後の最初の3月31日まで）」で、受給要件は「子どもの住所が品川区にあること」「子どもが健康保険に加入していること」。未就学児は「乳幼児医療証（マル乳）」（0歳から6歳に達する日以後最初の3月31日まで）を使い、都内の医療機関の窓口で「窓口での医療費自己負担分の支払いが不要になります」。有効期間は毎年9月30日までで、毎年9月下旬頃までに新しい医療証が郵送されます（更新の手続きは不要）。\n\n児童手当：0歳～3歳未満は月額15,000円、3歳～高校生年代は第1子・第2子が月額10,000円、第3子（0歳～高校生年代）は月額30,000円。令和6年10月分から所得制限等が撤廃されています。原則隔月（偶数月）に年6回、各支給月の10日頃に入金。品川区では子育て応援課手当医療助成担当（区役所本庁舎7階、電話03-5742-6721）へ郵送または電子申請で申請します。\n\n妊婦のための支援給付事業（妊娠・出産時の支援給付）：区独自の「出生時支援金」に相当する現行制度です。「妊娠届出後と出生届出後に面談を受けた方はそれぞれ5万円の給付金を申請できます」（合計10万円）。妊娠時分は妊娠届出後の「妊婦相談（初回面談）」で、出産後分は出生後の「すくすく赤ちゃん訪問」で受け、二次元コードから申請します。申請期限は妊娠時分が「胎児の心拍が確認されてから2年間」、出産後分が「出産予定日の8週間前から2年間」。なお「東京都赤ちゃんファースト10万円分は、別途申請が必要です」。\n\n出産育児一時金（国民健康保険加入者）：品川区国民健康保険に加入して出産した場合は「出生児1人につき50万円支給」。妊娠4カ月（85日）以上の死産・流産・人工妊娠中絶でも支給。申請は出産日の翌日から2年間。窓口での差額負担を減らす「直接支払制度」または「受取代理制度」（出産前、出産予定日の2カ月前から受付）を利用できます。担当は国保医療年金課給付係（電話03-5742-6677）。\n\nすこやか医療費\n児童手当\n妊婦支援給付\n出産一時金\n申請のタイミングと窓口\n子どもすこやか医療費助成：子どもが生まれたとき、または品川区へ転入したときに申請。「異動日(出生日・転入日)から6カ月以内に申請すると異動日から資格が発生します。ただし、6カ月を過ぎて申請した場合は、申請した日からの資格となります」。窓口（子育て応援課、本庁舎7階、電話03-5742-9174）・郵送・電子申請のいずれも可能。\n\n児童手当：初めての子の出生により受給資格が生じた日の翌日から15日以内に申請（15日特例：出生日・転入日が月末に近い場合、翌月になっても15日以内ならその翌月分から支給）。窓口・郵送・電子申請（マイナンバーカードで電子署名）のいずれも可能。\n\nすこやか医療費\n児童手当\n保育の申し込み（認可保育園）\n申請方法は3つ：「電子申請（マイナポータル）」「郵送（簡易書留）」「区役所の保育入園調整課入園相談担当窓口」（窓口受付は平日午前8時30分～午後5時）。電子申請の締め切りは「申請締切日の午後11時59分まで」。\n\n利用開始の1〜3か月前に申請する形です（令和8年度入園選考予定から）。例：令和8年9月入園は申請締切日8月3日（月）、結果発表日8月21日（金）。令和8年5月入園なら締切4月3日（金）。4月入園は年明け前の1次（令和9年度は11月20日（金）締切）と2月9日（火）締切の2次があり、締切から約3週間後に結果発表です。\n\n年度途中の入園は「5月から翌年の2月まで」で「3月入園は受付していません」。「ご提出いただいた申請書は、原則として当該年度2月入園の利用調整まで有効となります。翌年度4月入園を希望する場合は、改めて入園申請が必要です」。\n\nマイナンバーは「保育支給認定申請書 兼 保育所等利用希望申請書」への記載が必要。提出時は「番号確認」と「本人確認」の書類（マイナンバーカードや個人番号通知カード等、写真付き本人確認書類1点など）が必要です。「原則、申請書にはマイナンバーの記入が必要ですが、未記入であっても受け付けます」。\n\n出産予定での申請は「2月および4月入園の1次利用調整のみ」可能です。\n\nお問い合わせ：保育入園調整課入園相談担当 電話03-5742-6725（fax 03-5742-6350）。\n\n入園手続\n保育料（品川区）\n品川区が公表する「保育園等保育料一覧（令和7年9月1日施行）」によると、令和7年9月1日より保育料は第1子以降すべて無償（品川区内の認可保育園では食材料費の保護者負担もなし）。延長保育料等は収入階層別に別途かかるため、詳細は区公式ページで確認してください。\n\n区の妊娠・出産・産後の支援制度とtodo一覧を整理した姉妹サイト「しながわほじょきん」も参照できます。\n\n品川区-保育園等保育料一覧（令和7年9月1日施行）\nしながわほじょきん\n年齢月齢別の手続き早見\n0 か月（生まれた直後）\n出生届：「生まれた日を含め14日以内」に、父・母の本籍地／届出人の所在地／出生地のいずれかの区市役所・町村役場に届出。届出人は父または母（署名は本人が自署必要、押印は任意）。届書は「病院に用意されています」。品川区では、出生届の提出と同日に「児童に関する手当・子どもの医療費助成」（子育て応援課）や「子どもの国民健康保険の加入」（国保医療年金課）の手続きも可能です。お問い合わせ：戸籍住民課戸籍住民担当 電話03-5742-6657。\n\n国民健康保険に加入：国保加入世帯は、出生届と同日に子どもの国保加入手続きができる（国保医療年金課）。\n\n医療証（子どもすこやか医療費助成）は上記「申請のタイミング」のとおり、出生日から6カ月以内に申請。\n\n出生届\nすこやか医療費\n1〜2 か月\n1か月児健康診査：「生後28日目～41日目までに1回」。品川区では公費助成（6,000円を上限）を行い、助産師等による育児相談・授乳相談も可能です。お問い合わせ：品川保健センター 保健事業係 電話03-3474-2221。\n\n予防接種開始：品川区では「生後2カ月の接種開始にあわせて、はじめの予防接種予診票（接種券）をご自宅に送付します」。届くのは「誕生月の翌月末または翌々月の中旬」（例：4月前半生まれ→5月末発送）。対象は五種混合（1期初回3回）、小児用肺炎球菌、b型肝炎、ロタウイルス。\n\n産婦・1カ月児健診\n予防接種\n3 か月以降（bcg）\nbcg：品川区の公式スケジュールでは、予診票は「生後5カ月」に送付され、接種は「満1歳誕生日の前日まで 1回（標準的には、生後5カ月～8カ月）」です（※「生後3カ月」ではなく、公式は5〜8カ月が標準の記載）。\n\n予診票が届いたら、親子健康手帳（母子健康手帳）と一緒に実施医療機関（区内契約医療機関）に持参して接種します。\n\n予防接種\n1 歳\n予防接種（1歳の予診票）：五種混合（1期追加1回）、小児用肺炎球菌（追加1回）、mr（麻しん・風しん）1期（1歳～2歳誕生日の前日までに1回）、水痘（1歳～3歳誕生日の前日までに、3カ月以上あけて2回）。\n\n1歳6カ月児健診：保健センターでの集団健診（1歳7カ月前後。案内通知は受診日の前月上旬に郵送）。\n\n予防接種\n乳幼児健診\n2 歳\n2歳児歯科健診：品川・大井・荏原の各保健センターで月2〜3回実施（予約制、案内通知は受診日の前月上旬に郵送）。希望者はフッ化物塗布（880円）の予防処置も予約可能。\n\nmr（麻しん・風しん）2期は「小学校に入る前年度の3月31日までに1回」（年長の4月に予診票送付）。\n\n乳幼児健診\n予防接種\n常用の問い合わせ先\n品川区役所（代表）：電話03-3777-1111。開庁時間：月曜日～金曜日 午前8時30分～午後5時（火曜は一部窓口午後7時まで、第2・4日曜は一部窓口で午前8時30分～午後5時まで開庁）。休業日は土・日（日曜開庁日を除く）・祝日・年末年始（12月29日～1月3日）。\n\n保育入園調整課入園相談担当：電話03-5742-6725（fax 03-5742-6350）。区役所第二庁舎7階。\n\n子育て応援課手当医療助成担当：電話03-5742-9174（医療費助成）・03-5742-6721（児童手当等）、fax 03-5742-6387。本庁舎7階、平日午前8時30分～午後5時。\n\n国保医療年金課給付係（出産育児一時金など）：電話03-5742-6677（fax 03-5742-6876）。\n\n家庭あんしんセンター（子育て支援センター・相談・一時預かり）：品川区平塚2-12-2、電話03-5749-1032。開館：月曜～土曜 午前9時～午後6時。「子育てのこと、子どもの発達、性格などちょっと気がかりなことや心配なことを相談できます」。\n\n母子保健・健診・予防接種（健康課）：健康課保健衛生担当 電話03-5742-6745（fax 03-5742-6883）。予防接種は品川区保健予防課 電話03-5742-9152（fax 03-5742-6013）。保健センター：品川03-3474-2225／大井03-3772-2666／荏原03-3788-7013。\n\n妊婦のための支援給付事業コールセンター：電話03-6731-6732（祝日を除く月曜～金曜 午前8時30分～午後5時15分）。\n\n品川区役所\n入園手続\nすこやか医療費\n出産一時金\n家庭あんしんセンター\n産婦・1カ月児健診\n予防接種\n妊婦支援給付",
			"sections": [
				{
					"anchor": "top",
					"heading": "",
					"text": "品川区の育児の支援：医療費助成、児童手当、妊婦のための支援給付、出産育児一時金、保育園。赤ちゃんの月齢の順にまとめているので、今やるべき手続きがすぐに分かります。問い合わせ先も載せています。\n品川区役所"
				},
				{
					"anchor": "品川区の主な育児支援制度",
					"heading": "品川区の主な育児支援制度",
					"text": "品川区の主な育児支援制度\n子どもすこやか医療費助成：子どもが医療機関を受診した際の窓口医療費（保険診療分）を区が助成する制度。対象は「0歳～18歳（高校3年生相当年齢、18歳に達した日以後の最初の3月31日まで）」で、受給要件は「子どもの住所が品川区にあること」「子どもが健康保険に加入していること」。未就学児は「乳幼児医療証（マル乳）」（0歳から6歳に達する日以後最初の3月31日まで）を使い、都内の医療機関の窓口で「窓口での医療費自己負担分の支払いが不要になります」。有効期間は毎年9月30日までで、毎年9月下旬頃までに新しい医療証が郵送されます（更新の手続きは不要）。\n\n児童手当：0歳～3歳未満は月額15,000円、3歳～高校生年代は第1子・第2子が月額10,000円、第3子（0歳～高校生年代）は月額30,000円。令和6年10月分から所得制限等が撤廃されています。原則隔月（偶数月）に年6回、各支給月の10日頃に入金。品川区では子育て応援課手当医療助成担当（区役所本庁舎7階、電話03-5742-6721）へ郵送または電子申請で申請します。\n\n妊婦のための支援給付事業（妊娠・出産時の支援給付）：区独自の「出生時支援金」に相当する現行制度です。「妊娠届出後と出生届出後に面談を受けた方はそれぞれ5万円の給付金を申請できます」（合計10万円）。妊娠時分は妊娠届出後の「妊婦相談（初回面談）」で、出産後分は出生後の「すくすく赤ちゃん訪問」で受け、二次元コードから申請します。申請期限は妊娠時分が「胎児の心拍が確認されてから2年間」、出産後分が「出産予定日の8週間前から2年間」。なお「東京都赤ちゃんファースト10万円分は、別途申請が必要です」。\n\n出産育児一時金（国民健康保険加入者）：品川区国民健康保険に加入して出産した場合は「出生児1人につき50万円支給」。妊娠4カ月（85日）以上の死産・流産・人工妊娠中絶でも支給。申請は出産日の翌日から2年間。窓口での差額負担を減らす「直接支払制度」または「受取代理制度」（出産前、出産予定日の2カ月前から受付）を利用できます。担当は国保医療年金課給付係（電話03-5742-6677）。\n\nすこやか医療費\n児童手当\n妊婦支援給付\n出産一時金"
				},
				{
					"anchor": "申請のタイミングと窓口",
					"heading": "申請のタイミングと窓口",
					"text": "申請のタイミングと窓口\n子どもすこやか医療費助成：子どもが生まれたとき、または品川区へ転入したときに申請。「異動日(出生日・転入日)から6カ月以内に申請すると異動日から資格が発生します。ただし、6カ月を過ぎて申請した場合は、申請した日からの資格となります」。窓口（子育て応援課、本庁舎7階、電話03-5742-9174）・郵送・電子申請のいずれも可能。\n\n児童手当：初めての子の出生により受給資格が生じた日の翌日から15日以内に申請（15日特例：出生日・転入日が月末に近い場合、翌月になっても15日以内ならその翌月分から支給）。窓口・郵送・電子申請（マイナンバーカードで電子署名）のいずれも可能。\n\nすこやか医療費\n児童手当"
				},
				{
					"anchor": "保育の申し込み-認可保育園",
					"heading": "保育の申し込み（認可保育園）",
					"text": "保育の申し込み（認可保育園）\n申請方法は3つ：「電子申請（マイナポータル）」「郵送（簡易書留）」「区役所の保育入園調整課入園相談担当窓口」（窓口受付は平日午前8時30分～午後5時）。電子申請の締め切りは「申請締切日の午後11時59分まで」。\n\n利用開始の1〜3か月前に申請する形です（令和8年度入園選考予定から）。例：令和8年9月入園は申請締切日8月3日（月）、結果発表日8月21日（金）。令和8年5月入園なら締切4月3日（金）。4月入園は年明け前の1次（令和9年度は11月20日（金）締切）と2月9日（火）締切の2次があり、締切から約3週間後に結果発表です。\n\n年度途中の入園は「5月から翌年の2月まで」で「3月入園は受付していません」。「ご提出いただいた申請書は、原則として当該年度2月入園の利用調整まで有効となります。翌年度4月入園を希望する場合は、改めて入園申請が必要です」。\n\nマイナンバーは「保育支給認定申請書 兼 保育所等利用希望申請書」への記載が必要。提出時は「番号確認」と「本人確認」の書類（マイナンバーカードや個人番号通知カード等、写真付き本人確認書類1点など）が必要です。「原則、申請書にはマイナンバーの記入が必要ですが、未記入であっても受け付けます」。\n\n出産予定での申請は「2月および4月入園の1次利用調整のみ」可能です。\n\nお問い合わせ：保育入園調整課入園相談担当 電話03-5742-6725（fax 03-5742-6350）。\n\n入園手続"
				},
				{
					"anchor": "保育料-品川区",
					"heading": "保育料（品川区）",
					"text": "保育料（品川区）\n品川区が公表する「保育園等保育料一覧（令和7年9月1日施行）」によると、令和7年9月1日より保育料は第1子以降すべて無償（品川区内の認可保育園では食材料費の保護者負担もなし）。延長保育料等は収入階層別に別途かかるため、詳細は区公式ページで確認してください。\n\n区の妊娠・出産・産後の支援制度とtodo一覧を整理した姉妹サイト「しながわほじょきん」も参照できます。\n\n品川区-保育園等保育料一覧（令和7年9月1日施行）\nしながわほじょきん"
				},
				{
					"anchor": "年齢月齢別の手続き早見",
					"heading": "年齢月齢別の手続き早見",
					"text": "年齢月齢別の手続き早見"
				},
				{
					"anchor": "0-か月-生まれた直後",
					"heading": "0 か月（生まれた直後）",
					"text": "0 か月（生まれた直後）\n出生届：「生まれた日を含め14日以内」に、父・母の本籍地／届出人の所在地／出生地のいずれかの区市役所・町村役場に届出。届出人は父または母（署名は本人が自署必要、押印は任意）。届書は「病院に用意されています」。品川区では、出生届の提出と同日に「児童に関する手当・子どもの医療費助成」（子育て応援課）や「子どもの国民健康保険の加入」（国保医療年金課）の手続きも可能です。お問い合わせ：戸籍住民課戸籍住民担当 電話03-5742-6657。\n\n国民健康保険に加入：国保加入世帯は、出生届と同日に子どもの国保加入手続きができる（国保医療年金課）。\n\n医療証（子どもすこやか医療費助成）は上記「申請のタイミング」のとおり、出生日から6カ月以内に申請。\n\n出生届\nすこやか医療費"
				},
				{
					"anchor": "1-2-か月",
					"heading": "1〜2 か月",
					"text": "1〜2 か月\n1か月児健康診査：「生後28日目～41日目までに1回」。品川区では公費助成（6,000円を上限）を行い、助産師等による育児相談・授乳相談も可能です。お問い合わせ：品川保健センター 保健事業係 電話03-3474-2221。\n\n予防接種開始：品川区では「生後2カ月の接種開始にあわせて、はじめの予防接種予診票（接種券）をご自宅に送付します」。届くのは「誕生月の翌月末または翌々月の中旬」（例：4月前半生まれ→5月末発送）。対象は五種混合（1期初回3回）、小児用肺炎球菌、b型肝炎、ロタウイルス。\n\n産婦・1カ月児健診\n予防接種"
				},
				{
					"anchor": "3-か月以降-bcg",
					"heading": "3 か月以降（BCG）",
					"text": "3 か月以降（bcg）\nbcg：品川区の公式スケジュールでは、予診票は「生後5カ月」に送付され、接種は「満1歳誕生日の前日まで 1回（標準的には、生後5カ月～8カ月）」です（※「生後3カ月」ではなく、公式は5〜8カ月が標準の記載）。\n\n予診票が届いたら、親子健康手帳（母子健康手帳）と一緒に実施医療機関（区内契約医療機関）に持参して接種します。\n\n予防接種"
				},
				{
					"anchor": "1-歳",
					"heading": "1 歳",
					"text": "1 歳\n予防接種（1歳の予診票）：五種混合（1期追加1回）、小児用肺炎球菌（追加1回）、mr（麻しん・風しん）1期（1歳～2歳誕生日の前日までに1回）、水痘（1歳～3歳誕生日の前日までに、3カ月以上あけて2回）。\n\n1歳6カ月児健診：保健センターでの集団健診（1歳7カ月前後。案内通知は受診日の前月上旬に郵送）。\n\n予防接種\n乳幼児健診"
				},
				{
					"anchor": "2-歳",
					"heading": "2 歳",
					"text": "2 歳\n2歳児歯科健診：品川・大井・荏原の各保健センターで月2〜3回実施（予約制、案内通知は受診日の前月上旬に郵送）。希望者はフッ化物塗布（880円）の予防処置も予約可能。\n\nmr（麻しん・風しん）2期は「小学校に入る前年度の3月31日までに1回」（年長の4月に予診票送付）。\n\n乳幼児健診\n予防接種"
				},
				{
					"anchor": "常用の問い合わせ先",
					"heading": "常用の問い合わせ先",
					"text": "常用の問い合わせ先\n品川区役所（代表）：電話03-3777-1111。開庁時間：月曜日～金曜日 午前8時30分～午後5時（火曜は一部窓口午後7時まで、第2・4日曜は一部窓口で午前8時30分～午後5時まで開庁）。休業日は土・日（日曜開庁日を除く）・祝日・年末年始（12月29日～1月3日）。\n\n保育入園調整課入園相談担当：電話03-5742-6725（fax 03-5742-6350）。区役所第二庁舎7階。\n\n子育て応援課手当医療助成担当：電話03-5742-9174（医療費助成）・03-5742-6721（児童手当等）、fax 03-5742-6387。本庁舎7階、平日午前8時30分～午後5時。\n\n国保医療年金課給付係（出産育児一時金など）：電話03-5742-6677（fax 03-5742-6876）。\n\n家庭あんしんセンター（子育て支援センター・相談・一時預かり）：品川区平塚2-12-2、電話03-5749-1032。開館：月曜～土曜 午前9時～午後6時。「子育てのこと、子どもの発達、性格などちょっと気がかりなことや心配なことを相談できます」。\n\n母子保健・健診・予防接種（健康課）：健康課保健衛生担当 電話03-5742-6745（fax 03-5742-6883）。予防接種は品川区保健予防課 電話03-5742-9152（fax 03-5742-6013）。保健センター：品川03-3474-2225／大井03-3772-2666／荏原03-3788-7013。\n\n妊婦のための支援給付事業コールセンター：電話03-6731-6732（祝日を除く月曜～金曜 午前8時30分～午後5時15分）。\n\n品川区役所\n入園手続\nすこやか医療費\n出産一時金\n家庭あんしんセンター\n産婦・1カ月児健診\n予防接種\n妊婦支援給付"
				}
			]
		}
	]
};
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
//#endregion
//#region node_modules/lucide-react/dist/esm/defaultAttributes.mjs
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};
//#endregion
//#region node_modules/lucide-react/dist/esm/context.mjs
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LucideContext = (0, import_react.createContext)({});
var useLucideContext = () => (0, import_react.useContext)(LucideContext);
//#endregion
//#region node_modules/lucide-react/dist/esm/Icon.mjs
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Icon = (0, import_react.forwardRef)(({ color, size, strokeWidth, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => {
	const { size: contextSize = 24, strokeWidth: contextStrokeWidth = 2, absoluteStrokeWidth: contextAbsoluteStrokeWidth = false, color: contextColor = "currentColor", className: contextClass = "" } = useLucideContext() ?? {};
	const calculatedStrokeWidth = absoluteStrokeWidth ?? contextAbsoluteStrokeWidth ? Number(strokeWidth ?? contextStrokeWidth) * 24 / Number(size ?? contextSize) : strokeWidth ?? contextStrokeWidth;
	return (0, import_react.createElement)("svg", {
		ref,
		...defaultAttributes,
		width: size ?? contextSize ?? defaultAttributes.width,
		height: size ?? contextSize ?? defaultAttributes.height,
		stroke: color ?? contextColor,
		strokeWidth: calculatedStrokeWidth,
		className: mergeClasses("lucide", contextClass, className),
		...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
		...rest
	}, [...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]);
});
//#endregion
//#region node_modules/lucide-react/dist/esm/createLucideIcon.mjs
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var createLucideIcon = (iconName, iconNode) => {
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		iconNode,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
		...props
	}));
	Component.displayName = toPascalCase(iconName);
	return Component;
};
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowRight = createLucideIcon("arrow-right", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowUp = createLucideIcon("arrow-up", [["path", {
	d: "m5 12 7-7 7 7",
	key: "hav0vg"
}], ["path", {
	d: "M12 19V5",
	key: "x0mq9r"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Baby = createLucideIcon("baby", [
	["path", {
		d: "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5",
		key: "1u7htd"
	}],
	["path", {
		d: "M15 12h.01",
		key: "1k8ypt"
	}],
	["path", {
		d: "M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1",
		key: "11xh7x"
	}],
	["path", {
		d: "M9 12h.01",
		key: "157uk2"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronDown = createLucideIcon("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronLeft = createLucideIcon("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronRight = createLucideIcon("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronUp = createLucideIcon("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleAlert = createLucideIcon("circle-alert", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "8",
		y2: "12",
		key: "1pkeuh"
	}],
	["line", {
		x1: "12",
		x2: "12.01",
		y1: "16",
		y2: "16",
		key: "4dfq90"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Gift = createLucideIcon("gift", [
	["path", {
		d: "M12 7v14",
		key: "1akyts"
	}],
	["path", {
		d: "M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8",
		key: "1sqzm4"
	}],
	["path", {
		d: "M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5",
		key: "kc0143"
	}],
	["rect", {
		x: "3",
		y: "7",
		width: "18",
		height: "4",
		rx: "1",
		key: "1hberx"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var House = createLucideIcon("house", [["path", {
	d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
	key: "5wwlr5"
}], ["path", {
	d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
	key: "r6nss1"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Info = createLucideIcon("info", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 16v-4",
		key: "1dtifu"
	}],
	["path", {
		d: "M12 8h.01",
		key: "e9boi3"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Menu = createLucideIcon("menu", [
	["path", {
		d: "M4 5h16",
		key: "1tepv9"
	}],
	["path", {
		d: "M4 12h16",
		key: "1lakjw"
	}],
	["path", {
		d: "M4 19h16",
		key: "1djgab"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var RotateCcw = createLucideIcon("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ShoppingBasket = createLucideIcon("shopping-basket", [
	["path", {
		d: "m15 11-1 9",
		key: "5wnq3a"
	}],
	["path", {
		d: "m19 11-4-7",
		key: "cnml18"
	}],
	["path", {
		d: "M2 11h20",
		key: "3eubbj"
	}],
	["path", {
		d: "m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4",
		key: "yiazzp"
	}],
	["path", {
		d: "M4.5 15.5h15",
		key: "13mye1"
	}],
	["path", {
		d: "m5 11 4-7",
		key: "116ra9"
	}],
	["path", {
		d: "m9 11 1 9",
		key: "1ojof7"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var TriangleAlert = createLucideIcon("triangle-alert", [
	["path", {
		d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
		key: "wmoenq"
	}],
	["path", {
		d: "M12 9v4",
		key: "juzpu7"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
/**
* @license lucide-react v1.31.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var X = createLucideIcon("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]);
//#endregion
//#region src/components/layout/back-to-top-button.tsx
/**
* 浮遊「ページの先頭へ戻る」ボタン（spec-mobile.md §2.6）。
* 600px スクロール以降に表示。prefers-reduced-motion では即表示/非表示（No 9/99）。
*/
function BackToTopButton() {
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setVisible(window.scrollY > 600);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": "ページの先頭へ戻る",
		"aria-hidden": !visible,
		tabIndex: visible ? 0 : -1,
		onClick: () => window.scrollTo(0, 0),
		className: `fixed bottom-4 right-4 z-30 mb-[env(safe-area-inset-bottom)] flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift transition-opacity duration-150 motion-reduce:duration-0 active:bg-primary-deep focus-visible:outline-2 focus-visible:outline-ring ${visible ? "" : "pointer-events-none opacity-0"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {
			className: "size-5",
			"aria-hidden": "true"
		})
	});
}
//#endregion
//#region src/lib/nav.ts
/**
* 静的マルチページ遷移用のヘルパー。
* このサイトは SPA ではなく SSG の静的 HTML（base './' 相対、GitHub Pages 配信）で、
* 章遷移はフルリロード（通常の <a href>）で行う。href は生成 HTML への相対パス。
*/
/** slug から遷移先 HTML への相対パスを返す（例: 'vaccines' → './vaccines.html'）。トップは './index.html'。 */
function chapterHref(slug) {
	if (slug === "") return "./index.html";
	return `./${slug}.html`;
}
/** 現在のページの slug を location.pathname から取得（例: '/vaccines.html' → 'vaccines'、'/' → ''）。
* SSR（SSG ビルド時）は window が無いので空文字を返す（active 判定はクライアントのみ）。 */
function currentSlugFromPath(pathname) {
	if (!pathname) return "";
	return pathname.replace(/^\//, "").replace(/\.html$/, "").replace(/^index$/, "");
}
/** クライアントのみの現在 slug（SSR では空）。 */
function useClientSlug() {
	if (typeof window === "undefined") return "";
	return currentSlugFromPath(window.location.pathname);
}
//#endregion
//#region src/components/layout/mobile-chapter-sheet.tsx
var FOCUSABLE = "a[href], button:not([disabled])";
/**
* 章メニューのボトームシート（spec-mobile.md §2.3）。
* 親ヘッダーの 44px 「章」ボタンから開閉する。開閉時は body スクロールロック +
* フォーカストラップ、閉じたら元フォーカスへ復帰。history を汚さない（No 4）。
*/
function MobileChapterSheet({ open, onClose }) {
	const panelRef = (0, import_react.useRef)(null);
	const closeRef = (0, import_react.useRef)(null);
	const currentSlug = useClientSlug();
	const idx = SITE_DATA.chapters.findIndex((c) => c.slug === currentSlug);
	const current = idx >= 0 ? SITE_DATA.chapters[idx] : null;
	const prev = idx > 0 ? SITE_DATA.chapters[idx - 1] : null;
	const next = idx < SITE_DATA.chapters.length - 1 ? SITE_DATA.chapters[idx + 1] : null;
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const previouslyFocused = document.activeElement;
		document.body.style.overflow = "hidden";
		document.body.style.overscrollBehavior = "contain";
		closeRef.current?.focus();
		return () => {
			document.body.style.overflow = "";
			document.body.style.overscrollBehavior = "";
			previouslyFocused?.focus();
		};
	}, [open]);
	if (!open) return null;
	const onKeyDown = (e) => {
		if (e.key === "Escape") {
			e.stopPropagation();
			onClose();
			return;
		}
		if (e.key !== "Tab" || !panelRef.current) return;
		const focusables = Array.from(panelRef.current.querySelectorAll(FOCUSABLE));
		if (focusables.length === 0) return;
		const first = focusables[0];
		const last = focusables[focusables.length - 1];
		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	};
	const rowClass = "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm active:bg-accent";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		onKeyDown,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 bg-foreground/40 animate-in fade-in duration-150 motion-reduce:animate-none",
			onClick: onClose,
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: panelRef,
			id: "chapter-sheet",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "章一覧",
			className: "fixed inset-x-0 top-[var(--header-h)] z-50 max-h-[70dvh] overflow-y-auto rounded-b-2xl border-b border-border bg-card shadow-lg pb-[env(safe-area-inset-bottom)] animate-in slide-in-from-top duration-200 motion-reduce:animate-none",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-md px-4 pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-heading text-base font-bold",
						children: "章一覧"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						ref: closeRef,
						type: "button",
						"aria-label": "閉じる",
						onClick: onClose,
						className: "flex size-11 items-center justify-center rounded-full active:bg-accent focus-visible:outline-2 focus-visible:outline-ring",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							className: "size-5",
							"aria-hidden": "true"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 pb-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "./index.html",
							onClick: onClose,
							className: rowClass,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
								className: "size-4 shrink-0 text-muted-foreground",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "トップページ"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "./timeline.html",
							onClick: onClose,
							"aria-current": currentSlug === "timeline" ? "page" : void 0,
							className: `${rowClass} ${currentSlug === "timeline" ? "bg-primary/10 font-bold" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBasket, {
								className: "size-4 shrink-0 text-primary",
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: "月齢別・買うものタイムライン"
							})]
						}),
						(prev || next) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 grid grid-cols-2 gap-1",
							children: [prev && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: chapterHref(prev.slug),
								onClick: onClose,
								className: rowClass,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
									className: "size-4 shrink-0 text-muted-foreground",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block truncate font-medium",
										children: [
											"第",
											prev.order,
											"章 ",
											prev.title
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted-foreground",
										children: "前の章"
									})]
								})]
							}), next && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: chapterHref(next.slug),
								onClick: onClose,
								className: rowClass,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
									className: "size-4 shrink-0 text-muted-foreground",
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block truncate font-medium",
										children: [
											"第",
											next.order,
											"章 ",
											next.title
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted-foreground",
										children: "次の章"
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							"aria-label": "章一覧",
							className: "mt-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "divide-y divide-border",
								children: SITE_DATA.chapters.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: chapterHref(c.slug),
									onClick: onClose,
									"aria-current": current?.slug === c.slug ? "page" : void 0,
									className: `${rowClass} w-full ${current?.slug === c.slug ? "bg-primary/10 font-bold" : ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-5 shrink-0 font-heading font-bold text-primary",
										children: c.order
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 truncate font-medium",
										children: c.title
									})]
								}) }, c.slug))
							})
						})
					]
				})]
			})
		})]
	});
}
//#endregion
//#region node_modules/@base-ui/utils/useIsoLayoutEffect.mjs
var noop = () => {};
var useIsoLayoutEffect = typeof document !== "undefined" ? import_react.useLayoutEffect : noop;
//#endregion
//#region node_modules/@base-ui/utils/safeReact.mjs
/**
* A clone of the React namespace for reading APIs that may be missing in older
* supported React versions. Bundlers can rewrite direct `React.someNewApi`
* reads into named imports, which breaks React 17. Reading from this cloned
* object keeps those lookups optional.
*
* @see https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379
*/
var SafeReact = { ...import_react };
//#endregion
//#region node_modules/@base-ui/utils/useRefWithInit.mjs
var UNINITIALIZED = {};
/**
* A React.useRef() that is initialized with a function. Note that it accepts an optional
* initialization argument, so the initialization function doesn't need to be an inline closure.
*
* @usage
*   const ref = useRefWithInit(sortColumns, columns)
*/
function useRefWithInit(init, initArg) {
	const ref = import_react.useRef(UNINITIALIZED);
	if (ref.current === UNINITIALIZED) ref.current = init(initArg);
	return ref;
}
//#endregion
//#region node_modules/@base-ui/utils/useStableCallback.mjs
var useInsertionEffect = SafeReact.useInsertionEffect;
var useSafeInsertionEffect = useInsertionEffect && useInsertionEffect !== SafeReact.useLayoutEffect ? useInsertionEffect : (fn) => fn();
/**
* Stabilizes the function passed so it's always the same between renders.
*
* The function becomes non-reactive to any values it captures.
* It can safely be passed as a dependency of `React.useMemo` and `React.useEffect` without re-triggering them if its captured values change.
*
* The function must only be called inside effects and event handlers, never during render (which throws an error).
*
* This hook is a more permissive version of React 19.2's `React.useEffectEvent` in that it can be passed through contexts and called in event handler props, not just effects.
*/
function useStableCallback(callback) {
	const stable = useRefWithInit(createStableCallback).current;
	stable.next = callback;
	useSafeInsertionEffect(stable.effect);
	return stable.trampoline;
}
function createStableCallback() {
	const stable = {
		next: void 0,
		callback: assertNotCalled,
		trampoline: (...args) => stable.callback?.(...args),
		effect: () => {
			stable.callback = stable.next;
		}
	};
	return stable;
}
function assertNotCalled() {}
//#endregion
//#region node_modules/@base-ui/utils/formatErrorMessage.mjs
/**
* Creates a formatErrorMessage function with a custom URL and prefix.
* @param baseUrl - The base URL for the error page (e.g., 'https://base-ui.com/production-error')
* @param prefix - The prefix for the error message (e.g., 'Base UI')
* @returns A function that formats error messages with the given URL and prefix
*/
function createFormatErrorMessage(baseUrl, prefix) {
	return function formatErrorMessage(code, ...args) {
		const url = new URL(baseUrl);
		url.searchParams.set("code", code.toString());
		args.forEach((arg) => url.searchParams.append("args[]", arg));
		return `${prefix} error #${code}; visit ${url} for the full message.`;
	};
}
/**
* WARNING: Don't import this directly. It's imported by the code generated by
* `@mui/internal-babel-plugin-minify-errors`. Make sure to always use string literals in `Error`
* constructors to ensure the plugin works as expected. Supported patterns include:
*   throw new Error('My message');
*   throw new Error(`My message: ${foo}`);
*   throw new Error(`My message: ${foo}` + 'another string');
*   ...
*/
var formatErrorMessage = createFormatErrorMessage("https://base-ui.com/production-error", "Base UI");
//#endregion
//#region node_modules/@base-ui/utils/empty.mjs
function NOOP() {}
Object.freeze([]);
var EMPTY_OBJECT = Object.freeze({});
//#endregion
//#region node_modules/@base-ui/react/internals/field-constants/constants.mjs
var DEFAULT_VALIDITY_STATE = {
	badInput: false,
	customError: false,
	patternMismatch: false,
	rangeOverflow: false,
	rangeUnderflow: false,
	stepMismatch: false,
	tooLong: false,
	tooShort: false,
	typeMismatch: false,
	valid: null,
	valueMissing: false
};
var DEFAULT_FIELD_ROOT_STATE = {
	disabled: false,
	valid: null,
	touched: false,
	dirty: false,
	filled: false,
	focused: false
};
var fieldValidityMapping = { valid(value) {
	if (value === null) return null;
	if (value) return { "data-valid": "" };
	return { "data-invalid": "" };
} };
//#endregion
//#region node_modules/@base-ui/react/internals/field-root-context/FieldRootContext.mjs
var DEFAULT_FIELD_ROOT_CONTEXT = {
	invalid: void 0,
	name: void 0,
	validityData: {
		state: DEFAULT_VALIDITY_STATE,
		errors: [],
		error: "",
		value: "",
		initialValue: null
	},
	setValidityData: NOOP,
	disabled: void 0,
	setTouched: NOOP,
	setDirty: NOOP,
	setFilled: NOOP,
	setFocused: NOOP,
	validationMode: "onSubmit",
	shouldValidateOnChange: () => false,
	state: DEFAULT_FIELD_ROOT_STATE,
	registerFieldControl: NOOP,
	validation: {
		getValidationProps: (_disabled, props = EMPTY_OBJECT) => props,
		inputRef: { current: null },
		registeredInputs: /* @__PURE__ */ new Map(),
		registerInput: NOOP,
		getInputControl: () => null,
		commit: async () => {},
		change: NOOP
	}
};
var FieldRootContext = /*#__PURE__*/ import_react.createContext(DEFAULT_FIELD_ROOT_CONTEXT);
function useFieldRootContext(optional = true) {
	const context = import_react.useContext(FieldRootContext);
	if (context.setValidityData === NOOP && !optional) throw new Error(formatErrorMessage(28));
	return context;
}
//#endregion
//#region node_modules/@base-ui/react/internals/form-context/FormContext.mjs
var FormContext = /*#__PURE__*/ import_react.createContext({
	elementRef: { current: null },
	formRef: { current: { fields: /* @__PURE__ */ new Map() } },
	errors: {},
	clearErrors: NOOP,
	validationMode: "onSubmit",
	submitAttemptedRef: { current: false }
});
function useFormContext() {
	return import_react.useContext(FormContext);
}
//#endregion
//#region node_modules/@base-ui/utils/useId.mjs
var globalId = 0;
function useGlobalId(idOverride, prefix = "mui") {
	const [defaultId, setDefaultId] = import_react.useState(idOverride);
	const id = idOverride || defaultId;
	import_react.useEffect(() => {
		if (defaultId == null) {
			globalId += 1;
			setDefaultId(`${prefix}-${globalId}`);
		}
	}, [defaultId, prefix]);
	return id;
}
var maybeReactUseId = SafeReact.useId;
/**
*
* @example <div id={useId()} />
* @param idOverride
* @returns {string}
*/
function useId(idOverride, prefix) {
	if (maybeReactUseId !== void 0) {
		const reactId = maybeReactUseId();
		return idOverride ?? (prefix ? `${prefix}-${reactId}` : reactId);
	}
	return useGlobalId(idOverride, prefix);
}
//#endregion
//#region node_modules/@base-ui/react/internals/useBaseUiId.mjs
/**
* Wraps `useId` and prefixes generated `id`s with `base-ui-`
* @param {string | undefined} idOverride overrides the generated id when provided
* @returns {string | undefined}
*/
function useBaseUiId(idOverride) {
	return useId(idOverride, "base-ui");
}
//#endregion
//#region node_modules/@base-ui/react/internals/labelable-provider/LabelableContext.mjs
/**
* A context for providing [labelable elements](https://html.spec.whatwg.org/multipage/forms.html#category-label)\
* with an accessible name (label) and description.
*/
var LabelableContext = /*#__PURE__*/ import_react.createContext({
	controlId: void 0,
	registerControlId: NOOP,
	labelId: void 0,
	setLabelId: NOOP,
	messageIds: [],
	setMessageIds: NOOP,
	getDescriptionProps: (externalProps) => externalProps
});
function useLabelableContext() {
	return import_react.useContext(LabelableContext);
}
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
	return typeof window !== "undefined";
}
function getWindow(node) {
	var _node$ownerDocument;
	return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function isElement(value) {
	if (!hasWindow()) return false;
	return value instanceof Element || value instanceof getWindow(value).Element;
}
//#endregion
//#region node_modules/@base-ui/react/internals/labelable-provider/useLabelableId.mjs
function useLabelableId(params = {}) {
	const { id, implicit = false, controlRef } = params;
	const { controlId, registerControlId } = useLabelableContext();
	const defaultId = useBaseUiId(id);
	const controlIdForEffect = implicit ? controlId : void 0;
	const controlSourceRef = useRefWithInit(() => Symbol());
	const hasRegisteredRef = import_react.useRef(false);
	const hadExplicitIdRef = import_react.useRef(id != null);
	const unregisterControlId = useStableCallback(() => {
		if (!hasRegisteredRef.current || registerControlId === NOOP) return;
		hasRegisteredRef.current = false;
		registerControlId(controlSourceRef.current, void 0);
	});
	useIsoLayoutEffect(() => {
		if (registerControlId === NOOP) return;
		let nextId;
		if (implicit) {
			const elem = controlRef?.current;
			if (isElement(elem) && elem.closest("label") != null) nextId = id ?? null;
			else nextId = controlIdForEffect ?? defaultId;
		} else if (id != null) {
			hadExplicitIdRef.current = true;
			nextId = id;
		} else if (hadExplicitIdRef.current) nextId = defaultId;
		else {
			unregisterControlId();
			return;
		}
		if (nextId === void 0) {
			unregisterControlId();
			return;
		}
		hasRegisteredRef.current = true;
		registerControlId(controlSourceRef.current, nextId);
	}, [
		id,
		controlRef,
		controlIdForEffect,
		registerControlId,
		implicit,
		defaultId,
		controlSourceRef,
		unregisterControlId
	]);
	import_react.useEffect(() => {
		return unregisterControlId;
	}, [unregisterControlId]);
	return controlId ?? defaultId;
}
//#endregion
//#region node_modules/@base-ui/utils/owner.mjs
function ownerDocument(node) {
	return node?.ownerDocument || document;
}
//#endregion
//#region node_modules/@base-ui/react/internals/shadowDom.mjs
function activeElement(doc) {
	let element = doc.activeElement;
	while (element?.shadowRoot?.activeElement != null) element = element.shadowRoot.activeElement;
	return element;
}
//#endregion
//#region node_modules/@base-ui/utils/useMergedRefs.mjs
/**
* Merges refs into a single memoized callback ref or `null`.
* This makes sure multiple refs are updated together and have the same value.
*
* This function accepts up to four refs. If you need to merge more, or have an unspecified number of refs to merge,
* use `useMergedRefsN` instead.
*/
function useMergedRefs(a, b, c, d) {
	const forkRef = useRefWithInit(createForkRef).current;
	if (didChange(forkRef, a, b, c, d)) update(forkRef, [
		a,
		b,
		c,
		d
	]);
	return forkRef.callback;
}
/**
* Merges an array of refs into a single memoized callback ref or `null`.
*
* If you need to merge a fixed number (up to four) of refs, use `useMergedRefs` instead for better performance.
*/
function useMergedRefsN(refs) {
	const forkRef = useRefWithInit(createForkRef).current;
	if (didChangeN(forkRef, refs)) update(forkRef, refs);
	return forkRef.callback;
}
function createForkRef() {
	return {
		callback: null,
		cleanup: null,
		refs: []
	};
}
function didChange(forkRef, a, b, c, d) {
	return forkRef.refs[0] !== a || forkRef.refs[1] !== b || forkRef.refs[2] !== c || forkRef.refs[3] !== d;
}
function didChangeN(forkRef, newRefs) {
	return forkRef.refs.length !== newRefs.length || forkRef.refs.some((ref, index) => ref !== newRefs[index]);
}
function update(forkRef, refs) {
	forkRef.refs = refs;
	if (refs.every((ref) => ref == null)) {
		forkRef.callback = null;
		return;
	}
	forkRef.callback = (instance) => {
		if (forkRef.cleanup) {
			forkRef.cleanup();
			forkRef.cleanup = null;
		}
		if (instance != null) {
			const cleanupCallbacks = Array(refs.length).fill(null);
			for (let i = 0; i < refs.length; i += 1) {
				const ref = refs[i];
				if (ref == null) continue;
				switch (typeof ref) {
					case "function": {
						const refCleanup = ref(instance);
						if (typeof refCleanup === "function") cleanupCallbacks[i] = refCleanup;
						break;
					}
					case "object": ref.current = instance;
				}
			}
			forkRef.cleanup = () => {
				for (let i = 0; i < refs.length; i += 1) {
					const ref = refs[i];
					if (ref == null) continue;
					switch (typeof ref) {
						case "function": {
							const cleanupCallback = cleanupCallbacks[i];
							if (typeof cleanupCallback === "function") cleanupCallback();
							else ref(null);
							break;
						}
						case "object": ref.current = null;
					}
				}
			};
		}
	};
}
//#endregion
//#region node_modules/@base-ui/utils/reactVersion.mjs
var majorVersion = parseInt("19.2.8", 10);
function isReactVersionAtLeast(reactVersionToCheck) {
	return majorVersion >= reactVersionToCheck;
}
//#endregion
//#region node_modules/@base-ui/utils/getReactElementRef.mjs
/**
* Extracts the `ref` from a React element, handling different React versions.
*/
function getReactElementRef(element) {
	if (!/*#__PURE__*/ import_react.isValidElement(element)) return null;
	const reactElement = element;
	const propsWithRef = reactElement.props;
	return (isReactVersionAtLeast(19) ? propsWithRef?.ref : reactElement.ref) ?? null;
}
//#endregion
//#region node_modules/@base-ui/utils/mergeObjects.mjs
function mergeObjects(a, b) {
	if (a && !b) return a;
	if (!a && b) return b;
	if (a || b) return {
		...a,
		...b
	};
}
//#endregion
//#region node_modules/@base-ui/react/internals/getStateAttributesProps.mjs
function getStateAttributesProps(state, customMapping) {
	const props = {};
	for (const key in state) {
		const value = state[key];
		if (customMapping?.hasOwnProperty(key)) {
			const customProps = customMapping[key](value);
			if (customProps != null) Object.assign(props, customProps);
			continue;
		}
		if (value === true) props[`data-${key.toLowerCase()}`] = "";
		else if (value) props[`data-${key.toLowerCase()}`] = value.toString();
	}
	return props;
}
//#endregion
//#region node_modules/@base-ui/react/utils/resolveClassName.mjs
/**
* If the provided className is a string, it will be returned as is.
* Otherwise, the function will call the className function with the state as the first argument.
*
* @param className
* @param state
*/
function resolveClassName(className, state) {
	return typeof className === "function" ? className(state) : className;
}
//#endregion
//#region node_modules/@base-ui/react/utils/resolveStyle.mjs
/**
* If the provided style is an object, it will be returned as is.
* Otherwise, the function will call the style function with the state as the first argument.
*
* @param style
* @param state
*/
function resolveStyle(style, state) {
	return typeof style === "function" ? style(state) : style;
}
//#endregion
//#region node_modules/@base-ui/react/merge-props/mergeProps.mjs
var EMPTY_PROPS = {};
/**
* Merges multiple sets of React props. It follows the Object.assign pattern where the rightmost object's fields overwrite
* the conflicting ones from others. This doesn't apply to event handlers, `className` and `style` props.
*
* Event handlers are merged and called in right-to-left order (rightmost handler executes first, leftmost last).
* For React synthetic events, the rightmost handler can prevent prior (left-positioned) handlers from executing
* by calling `event.preventBaseUIHandler()`. For non-synthetic events (custom events with primitive/object values),
* all handlers always execute without prevention capability.
*
* The `className` prop is merged by concatenating classes in right-to-left order (rightmost class appears first in the string).
* The `style` prop is merged with rightmost styles overwriting the prior ones.
*
* Props can either be provided as objects or as functions that take the previous props as an argument.
* The function will receive the merged props up to that point (going from left to right):
* so in the case of `(obj1, obj2, fn, obj3)`, `fn` will receive the merged props of `obj1` and `obj2`.
* The function is responsible for chaining event handlers if needed (that is, we don't run the merge logic).
*
* Event handlers returned by the functions are not automatically prevented when `preventBaseUIHandler` is called.
* They must check `event.baseUIHandlerPrevented` themselves and bail out if it's true.
*
* @important **`ref` is not merged.**
* @param a Props object to merge.
* @param b Props object to merge. The function will overwrite conflicting props from `a`.
* @param c Props object to merge. The function will overwrite conflicting props from previous parameters.
* @param d Props object to merge. The function will overwrite conflicting props from previous parameters.
* @param e Props object to merge. The function will overwrite conflicting props from previous parameters.
* @returns The merged props.
* @public
*/
function mergeProps(a, b, c, d, e) {
	if (!c && !d && !e && !a) return createInitialMergedProps(b);
	let merged = createInitialMergedProps(a);
	if (b) merged = mergeInto(merged, b);
	if (c) merged = mergeInto(merged, c);
	if (d) merged = mergeInto(merged, d);
	if (e) merged = mergeInto(merged, e);
	return merged;
}
/**
* Merges an arbitrary number of React props using the same logic as {@link mergeProps}.
* This function accepts an array of props instead of individual arguments.
*
* This has slightly lower performance than {@link mergeProps} due to accepting an array
* instead of a fixed number of arguments. Prefer {@link mergeProps} when merging 5 or
* fewer prop sets for better performance.
*
* @param props Array of props to merge.
* @returns The merged props.
* @see mergeProps
* @public
*/
function mergePropsN(props) {
	if (props.length === 0) return EMPTY_PROPS;
	if (props.length === 1) return createInitialMergedProps(props[0]);
	let merged = createInitialMergedProps(props[0]);
	for (let i = 1; i < props.length; i += 1) merged = mergeInto(merged, props[i]);
	return merged;
}
function createInitialMergedProps(inputProps) {
	if (isPropsGetter(inputProps)) return { ...resolvePropsGetter(inputProps, EMPTY_PROPS) };
	return copyInitialProps(inputProps);
}
function mergeInto(merged, inputProps) {
	if (isPropsGetter(inputProps)) return resolvePropsGetter(inputProps, merged);
	return mutablyMergeInto(merged, inputProps);
}
function copyInitialProps(inputProps) {
	const copiedProps = { ...inputProps };
	for (const propName in copiedProps) {
		const propValue = copiedProps[propName];
		if (isEventHandler(propName, propValue)) copiedProps[propName] = wrapEventHandler(propValue);
	}
	return copiedProps;
}
/**
* Merges two sets of props. In case of conflicts, the external props take precedence.
*/
function mutablyMergeInto(mergedProps, externalProps) {
	if (!externalProps) return mergedProps;
	for (const propName in externalProps) {
		const externalPropValue = externalProps[propName];
		switch (propName) {
			case "style":
				mergedProps[propName] = mergeObjects(mergedProps.style, externalPropValue);
				break;
			case "className":
				mergedProps[propName] = mergeClassNames(mergedProps.className, externalPropValue);
				break;
			default: if (isEventHandler(propName, externalPropValue)) mergedProps[propName] = mergeEventHandlers(mergedProps[propName], externalPropValue);
			else mergedProps[propName] = externalPropValue;
		}
	}
	return mergedProps;
}
function isEventHandler(key, value) {
	const code0 = key.charCodeAt(0);
	const code1 = key.charCodeAt(1);
	const code2 = key.charCodeAt(2);
	return code0 === 111 && code1 === 110 && code2 >= 65 && code2 <= 90 && (typeof value === "function" || typeof value === "undefined");
}
function isPropsGetter(inputProps) {
	return typeof inputProps === "function";
}
function resolvePropsGetter(inputProps, previousProps) {
	if (isPropsGetter(inputProps)) return inputProps(previousProps);
	return inputProps ?? EMPTY_PROPS;
}
function mergeEventHandlers(ourHandler, theirHandler) {
	if (!theirHandler) return ourHandler;
	if (!ourHandler) return wrapEventHandler(theirHandler);
	return (...args) => {
		const event = args[0];
		if (isSyntheticEvent(event)) {
			const baseUIEvent = event;
			makeEventPreventable(baseUIEvent);
			const result = theirHandler(...args);
			if (!baseUIEvent.baseUIHandlerPrevented) ourHandler?.(...args);
			return result;
		}
		const result = theirHandler(...args);
		ourHandler?.(...args);
		return result;
	};
}
function wrapEventHandler(handler) {
	if (!handler) return handler;
	return (...args) => {
		const event = args[0];
		if (isSyntheticEvent(event)) makeEventPreventable(event);
		return handler(...args);
	};
}
function makeEventPreventable(event) {
	event.preventBaseUIHandler = () => {
		event.baseUIHandlerPrevented = true;
	};
	return event;
}
function mergeClassNames(ourClassName, theirClassName) {
	if (theirClassName) {
		if (ourClassName) return theirClassName + " " + ourClassName;
		return theirClassName;
	}
	return ourClassName;
}
function isSyntheticEvent(event) {
	return event != null && typeof event === "object" && "nativeEvent" in event;
}
//#endregion
//#region node_modules/@base-ui/react/internals/useRenderElement.mjs
/**
* Renders a Base UI element.
*
* @param element The default HTML element to render. Can be overridden by the `render` prop.
* @param componentProps An object containing the `render` and `className` props to be used for element customization. Other props are ignored.
* @param params Additional parameters for rendering the element.
*/
function useRenderElement(element, componentProps, params = {}) {
	const renderProp = componentProps.render;
	const outProps = useRenderElementProps(componentProps, params);
	if (params.enabled === false) return null;
	return evaluateRenderProp(element, renderProp, outProps, params.state ?? EMPTY_OBJECT);
}
/**
* Computes render element final props.
*/
function useRenderElementProps(componentProps, params = {}) {
	const { className: classNameProp, style: styleProp, render: renderProp } = componentProps;
	const { state = EMPTY_OBJECT, ref, props, stateAttributesMapping, enabled = true } = params;
	const className = enabled ? resolveClassName(classNameProp, state) : void 0;
	const style = enabled ? resolveStyle(styleProp, state) : void 0;
	const stateProps = enabled ? getStateAttributesProps(state, stateAttributesMapping) : EMPTY_OBJECT;
	const resolvedProps = enabled && props ? resolveRenderFunctionProps(props) : void 0;
	const outProps = enabled ? mergeObjects(stateProps, resolvedProps) ?? {} : EMPTY_OBJECT;
	if (typeof document !== "undefined") {
		if (!enabled) useMergedRefs(null, null);
		else if (Array.isArray(ref)) outProps.ref = useMergedRefsN([
			outProps.ref,
			getReactElementRef(renderProp),
			...ref
		]);
		else outProps.ref = useMergedRefs(outProps.ref, getReactElementRef(renderProp), ref);
	}
	if (!enabled) return EMPTY_OBJECT;
	if (className !== void 0) outProps.className = mergeClassNames(outProps.className, className);
	if (style !== void 0) outProps.style = mergeObjects(outProps.style, style);
	return outProps;
}
function resolveRenderFunctionProps(props) {
	if (Array.isArray(props)) return mergePropsN(props);
	return mergeProps(void 0, props);
}
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
function evaluateRenderProp(element, render, props, state) {
	if (render) {
		if (typeof render === "function") return render(props, state);
		const mergedProps = mergeProps(props, render.props);
		mergedProps.ref = props.ref;
		let newElement = render;
		if (newElement?.$$typeof === REACT_LAZY_TYPE) newElement = import_react.Children.toArray(render)[0];
		return /*#__PURE__*/ import_react.cloneElement(newElement, mergedProps);
	}
	if (element) {
		if (typeof element === "string") return renderTag(element, props);
	}
	throw new Error(formatErrorMessage(8));
}
function renderTag(Tag, props) {
	if (Tag === "button") return /*#__PURE__*/ (0, import_react.createElement)("button", {
		type: "button",
		...props,
		key: props.key
	});
	if (Tag === "img") return /*#__PURE__*/ (0, import_react.createElement)("img", {
		alt: "",
		...props,
		key: props.key
	});
	return /*#__PURE__*/ import_react.createElement(Tag, props);
}
//#endregion
//#region node_modules/@base-ui/utils/useControlled.mjs
function useControlled({ controlled, default: defaultProp, name, state = "value" }) {
	const { current: isControlled } = import_react.useRef(controlled !== void 0);
	const [valueState, setValue] = import_react.useState(defaultProp);
	return [isControlled ? controlled : valueState, import_react.useCallback((newValue) => {
		if (!isControlled) setValue(newValue);
	}, [])];
}
//#endregion
//#region node_modules/@base-ui/react/internals/field-register-control/useRegisterFieldControl.mjs
function useRegisterFieldControl(controlRef, id, value, getFormValueOverride, enabled = true, name) {
	const { registerFieldControl } = useFieldRootContext();
	const sourceRef = useRefWithInit(() => Symbol());
	useIsoLayoutEffect(() => {
		const source = sourceRef.current;
		if (!enabled) {
			registerFieldControl(source, void 0);
			return;
		}
		registerFieldControl(source, {
			controlRef,
			getValue: getFormValueOverride,
			id,
			name,
			value
		});
	}, [
		controlRef,
		enabled,
		getFormValueOverride,
		id,
		name,
		registerFieldControl,
		sourceRef,
		value
	]);
	useIsoLayoutEffect(() => {
		const source = sourceRef.current;
		return () => {
			registerFieldControl(source, void 0);
		};
	}, [registerFieldControl, sourceRef]);
}
//#endregion
//#region node_modules/@base-ui/react/internals/reason-parts.mjs
var none = "none";
//#endregion
//#region node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs
/**
* Maps a change `reason` string to the corresponding native event type.
*/
/**
* Details of custom change events emitted by Base UI components.
*/
/**
* Details of custom generic events emitted by Base UI components.
*/
/**
* Creates a Base UI event details object with the given reason and utilities
* for preventing Base UI's internal event handling.
*/
function createChangeEventDetails(reason, event, trigger, customProperties) {
	let canceled = false;
	let allowPropagation = false;
	const custom = customProperties ?? EMPTY_OBJECT;
	return {
		reason,
		event: event ?? new Event("base-ui"),
		cancel() {
			canceled = true;
		},
		allowPropagation() {
			allowPropagation = true;
		},
		get isCanceled() {
			return canceled;
		},
		get isPropagationAllowed() {
			return allowPropagation;
		},
		trigger,
		...custom
	};
}
//#endregion
//#region node_modules/@base-ui/react/field/control/FieldControl.mjs
/**
* The form control to label and validate.
* Renders an `<input>` element.
*
* You can omit this part and use any Base UI input component instead. For example,
* [Input](https://base-ui.com/react/components/input), [Checkbox](https://base-ui.com/react/components/checkbox),
* or [Select](https://base-ui.com/react/components/select), among others, will work with Field out of the box.
*
* Documentation: [Base UI Field](https://base-ui.com/react/components/field)
*/
var FieldControl = /*#__PURE__*/ import_react.forwardRef(function FieldControl(componentProps, forwardedRef) {
	const { render, className, id: idProp, name: nameProp, value: valueProp, disabled: disabledProp = false, onValueChange, defaultValue, autoFocus = false, style, ...elementProps } = componentProps;
	const { state: fieldState, name: fieldName, disabled: fieldDisabled, setTouched, setDirty, validityData, setFocused, setFilled, validationMode, validation } = useFieldRootContext();
	const { clearErrors } = useFormContext();
	const disabled = fieldDisabled || disabledProp;
	const name = fieldName ?? nameProp;
	const state = {
		...fieldState,
		disabled
	};
	const { labelId } = useLabelableContext();
	const id = useLabelableId({ id: idProp });
	useIsoLayoutEffect(() => {
		const hasExternalValue = valueProp != null;
		if (validation.inputRef.current?.value || hasExternalValue && valueProp !== "") setFilled(true);
		else if (hasExternalValue && valueProp === "") setFilled(false);
	}, [
		validation.inputRef,
		setFilled,
		valueProp
	]);
	const inputRef = import_react.useRef(null);
	useIsoLayoutEffect(() => {
		if (autoFocus && inputRef.current === activeElement(ownerDocument(inputRef.current))) setFocused(true);
	}, [autoFocus, setFocused]);
	const [valueUnwrapped] = useControlled({
		controlled: valueProp,
		default: defaultValue,
		name: "FieldControl",
		state: "value"
	});
	const isControlled = valueProp !== void 0;
	const value = isControlled ? valueUnwrapped : void 0;
	const getValueFromInput = useStableCallback(() => validation.inputRef.current?.value);
	useRegisterFieldControl(validation.inputRef, id, value, getValueFromInput, !disabled, nameProp);
	return useRenderElement("input", componentProps, {
		ref: [forwardedRef, inputRef],
		state,
		props: [
			{
				id,
				disabled,
				name,
				ref: validation.inputRef,
				"aria-labelledby": labelId,
				autoFocus,
				...isControlled ? { value } : { defaultValue },
				onChange(event) {
					const inputValue = event.currentTarget.value;
					onValueChange?.(inputValue, createChangeEventDetails(none, event.nativeEvent));
					setDirty(inputValue !== (validityData.initialValue ?? ""));
					setFilled(inputValue !== "");
					if (!event.nativeEvent.defaultPrevented) {
						clearErrors(name);
						validation.change(inputValue);
					}
				},
				onFocus() {
					setFocused(true);
				},
				onBlur(event) {
					setTouched(true);
					setFocused(false);
					if (validationMode === "onBlur") validation.commit(event.currentTarget.value);
				},
				onKeyDown(event) {
					if (event.currentTarget.tagName === "INPUT" && event.key === "Enter") {
						setTouched(true);
						validation.commit(event.currentTarget.value);
					}
				}
			},
			elementProps,
			(props) => validation.getValidationProps(disabled, props)
		],
		stateAttributesMapping: fieldValidityMapping
	});
});
//#endregion
//#region node_modules/@base-ui/react/input/Input.mjs
/**
* A native input element that automatically works with [Field](https://base-ui.com/react/components/field).
* Renders an `<input>` element.
*
* Documentation: [Base UI Input](https://base-ui.com/react/components/input)
*/
var Input$1 = /*#__PURE__*/ import_react.forwardRef(function Input(props, forwardedRef) {
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldControl, {
		ref: forwardedRef,
		...props
	});
});
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function r(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
//#endregion
//#region node_modules/tailwind-merge/dist/bundle-mjs.mjs
/**
* Concatenates two arrays faster than the array spread operator.
*/
var concatArrays = (array1, array2) => {
	const combinedArray = new Array(array1.length + array2.length);
	for (let i = 0; i < array1.length; i++) combinedArray[i] = array1[i];
	for (let i = 0; i < array2.length; i++) combinedArray[array1.length + i] = array2[i];
	return combinedArray;
};
var createClassValidatorObject = (classGroupId, validator) => ({
	classGroupId,
	validator
});
var createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
	nextPart,
	validators,
	classGroupId
});
var CLASS_PART_SEPARATOR = "-";
var EMPTY_CONFLICTS = [];
var ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
var createClassGroupUtils = (config) => {
	const classMap = createClassMap(config);
	const { conflictingClassGroups, conflictingClassGroupModifiers } = config;
	const getClassGroupId = (className) => {
		if (className.startsWith("[") && className.endsWith("]")) return getGroupIdForArbitraryProperty(className);
		const classParts = className.split(CLASS_PART_SEPARATOR);
		return getGroupRecursive(classParts, classParts[0] === "" && classParts.length > 1 ? 1 : 0, classMap);
	};
	const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
		if (hasPostfixModifier) {
			const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
			const baseConflicts = conflictingClassGroups[classGroupId];
			if (modifierConflicts) {
				if (baseConflicts) return concatArrays(baseConflicts, modifierConflicts);
				return modifierConflicts;
			}
			return baseConflicts || EMPTY_CONFLICTS;
		}
		return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
	};
	return {
		getClassGroupId,
		getConflictingClassGroupIds
	};
};
var getGroupRecursive = (classParts, startIndex, classPartObject) => {
	if (classParts.length - startIndex === 0) return classPartObject.classGroupId;
	const currentClassPart = classParts[startIndex];
	const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
	if (nextClassPartObject) {
		const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
		if (result) return result;
	}
	const validators = classPartObject.validators;
	if (validators === null) return;
	const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
	const validatorsLength = validators.length;
	for (let i = 0; i < validatorsLength; i++) {
		const validatorObj = validators[i];
		if (validatorObj.validator(classRest)) return validatorObj.classGroupId;
	}
};
/**
* Get the class group ID for an arbitrary property.
*
* @param className - The class name to get the group ID for. Is expected to be string starting with `[` and ending with `]`.
*/
var getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	const content = className.slice(1, -1);
	const colonIndex = content.indexOf(":");
	const property = content.slice(0, colonIndex);
	return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
})();
/**
* Exported for testing only
*/
var createClassMap = (config) => {
	const { theme, classGroups } = config;
	return processClassGroups(classGroups, theme);
};
var processClassGroups = (classGroups, theme) => {
	const classMap = createClassPartObject();
	for (const classGroupId in classGroups) {
		const group = classGroups[classGroupId];
		processClassesRecursively(group, classMap, classGroupId, theme);
	}
	return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
	const len = classGroup.length;
	for (let i = 0; i < len; i++) {
		const classDefinition = classGroup[i];
		processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
	}
};
var processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	if (typeof classDefinition === "string") {
		processStringDefinition(classDefinition, classPartObject, classGroupId);
		return;
	}
	if (typeof classDefinition === "function") {
		processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
		return;
	}
	processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
var processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
	const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
	classPartObjectToEdit.classGroupId = classGroupId;
};
var processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	if (isThemeGetter(classDefinition)) {
		processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
		return;
	}
	if (classPartObject.validators === null) classPartObject.validators = [];
	classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
var processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	const entries = Object.entries(classDefinition);
	const len = entries.length;
	for (let i = 0; i < len; i++) {
		const [key, value] = entries[i];
		processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
	}
};
var getPart = (classPartObject, path) => {
	let current = classPartObject;
	const parts = path.split(CLASS_PART_SEPARATOR);
	const len = parts.length;
	for (let i = 0; i < len; i++) {
		const part = parts[i];
		let next = current.nextPart.get(part);
		if (!next) {
			next = createClassPartObject();
			current.nextPart.set(part, next);
		}
		current = next;
	}
	return current;
};
var isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
var createLruCache = (maxCacheSize) => {
	if (maxCacheSize < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let cacheSize = 0;
	let cache = Object.create(null);
	let previousCache = Object.create(null);
	const update = (key, value) => {
		cache[key] = value;
		cacheSize++;
		if (cacheSize > maxCacheSize) {
			cacheSize = 0;
			previousCache = cache;
			cache = Object.create(null);
		}
	};
	return {
		get(key) {
			let value = cache[key];
			if (value !== void 0) return value;
			if ((value = previousCache[key]) !== void 0) {
				update(key, value);
				return value;
			}
		},
		set(key, value) {
			if (key in cache) cache[key] = value;
			else update(key, value);
		}
	};
};
var IMPORTANT_MODIFIER = "!";
var MODIFIER_SEPARATOR = ":";
var EMPTY_MODIFIERS = [];
var createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
	modifiers,
	hasImportantModifier,
	baseClassName,
	maybePostfixModifierPosition,
	isExternal
});
var createParseClassName = (config) => {
	const { prefix, experimentalParseClassName } = config;
	/**
	* Parse class name into parts.
	*
	* Inspired by `splitAtTopLevelOnly` used in Tailwind CSS
	* @see https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
	*/
	let parseClassName = (className) => {
		const modifiers = [];
		let bracketDepth = 0;
		let parenDepth = 0;
		let modifierStart = 0;
		let postfixModifierPosition;
		const len = className.length;
		for (let index = 0; index < len; index++) {
			const currentCharacter = className[index];
			if (bracketDepth === 0 && parenDepth === 0) {
				if (currentCharacter === MODIFIER_SEPARATOR) {
					modifiers.push(className.slice(modifierStart, index));
					modifierStart = index + 1;
					continue;
				}
				if (currentCharacter === "/") {
					postfixModifierPosition = index;
					continue;
				}
			}
			if (currentCharacter === "[") bracketDepth++;
			else if (currentCharacter === "]") bracketDepth--;
			else if (currentCharacter === "(") parenDepth++;
			else if (currentCharacter === ")") parenDepth--;
		}
		const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
		let baseClassName = baseClassNameWithImportantModifier;
		let hasImportantModifier = false;
		if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
			baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
			hasImportantModifier = true;
		} else if (baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)) {
			baseClassName = baseClassNameWithImportantModifier.slice(1);
			hasImportantModifier = true;
		}
		const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
		return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
	};
	if (prefix) {
		const fullPrefix = prefix + MODIFIER_SEPARATOR;
		const parseClassNameOriginal = parseClassName;
		parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
	}
	if (experimentalParseClassName) {
		const parseClassNameOriginal = parseClassName;
		parseClassName = (className) => experimentalParseClassName({
			className,
			parseClassName: parseClassNameOriginal
		});
	}
	return parseClassName;
};
/**
* Sorts modifiers according to following schema:
* - Predefined modifiers are sorted alphabetically
* - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
*/
var createSortModifiers = (config) => {
	const modifierWeights = /* @__PURE__ */ new Map();
	config.orderSensitiveModifiers.forEach((mod, index) => {
		modifierWeights.set(mod, 1e6 + index);
	});
	return (modifiers) => {
		const result = [];
		let currentSegment = [];
		for (let i = 0; i < modifiers.length; i++) {
			const modifier = modifiers[i];
			const isArbitrary = modifier[0] === "[";
			const isOrderSensitive = modifierWeights.has(modifier);
			if (isArbitrary || isOrderSensitive) {
				if (currentSegment.length > 0) {
					currentSegment.sort();
					result.push(...currentSegment);
					currentSegment = [];
				}
				result.push(modifier);
			} else currentSegment.push(modifier);
		}
		if (currentSegment.length > 0) {
			currentSegment.sort();
			result.push(...currentSegment);
		}
		return result;
	};
};
var createConfigUtils = (config) => ({
	cache: createLruCache(config.cacheSize),
	parseClassName: createParseClassName(config),
	sortModifiers: createSortModifiers(config),
	postfixLookupClassGroupIds: createPostfixLookupClassGroupIds(config),
	...createClassGroupUtils(config)
});
var createPostfixLookupClassGroupIds = (config) => {
	const lookup = Object.create(null);
	const classGroupIds = config.postfixLookupClassGroups;
	if (classGroupIds) for (let i = 0; i < classGroupIds.length; i++) lookup[classGroupIds[i]] = true;
	return lookup;
};
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
	const { parseClassName, getClassGroupId, getConflictingClassGroupIds, sortModifiers, postfixLookupClassGroupIds } = configUtils;
	/**
	* Set of classGroupIds in following format:
	* `{importantModifier}{variantModifiers}{classGroupId}`
	* @example 'float'
	* @example 'hover:focus:bg-color'
	* @example 'md:!pr'
	*/
	const classGroupsInConflict = [];
	const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
	let result = "";
	for (let index = classNames.length - 1; index >= 0; index -= 1) {
		const originalClassName = classNames[index];
		const { isExternal, modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } = parseClassName(originalClassName);
		if (isExternal) {
			result = originalClassName + (result.length > 0 ? " " + result : result);
			continue;
		}
		let hasPostfixModifier = !!maybePostfixModifierPosition;
		let classGroupId;
		if (hasPostfixModifier) {
			classGroupId = getClassGroupId(baseClassName.substring(0, maybePostfixModifierPosition));
			const classGroupIdWithPostfix = classGroupId && postfixLookupClassGroupIds[classGroupId] ? getClassGroupId(baseClassName) : void 0;
			if (classGroupIdWithPostfix && classGroupIdWithPostfix !== classGroupId) {
				classGroupId = classGroupIdWithPostfix;
				hasPostfixModifier = false;
			}
		} else classGroupId = getClassGroupId(baseClassName);
		if (!classGroupId) {
			if (!hasPostfixModifier) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			classGroupId = getClassGroupId(baseClassName);
			if (!classGroupId) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			hasPostfixModifier = false;
		}
		const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
		const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
		const classId = modifierId + classGroupId;
		if (classGroupsInConflict.indexOf(classId) > -1) continue;
		classGroupsInConflict.push(classId);
		const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
		for (let i = 0; i < conflictGroups.length; ++i) {
			const group = conflictGroups[i];
			classGroupsInConflict.push(modifierId + group);
		}
		result = originalClassName + (result.length > 0 ? " " + result : result);
	}
	return result;
};
/**
* The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
*
* Specifically:
* - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
* - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
*
* Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
*/
var twJoin = (...classLists) => {
	let index = 0;
	let argument;
	let resolvedValue;
	let string = "";
	while (index < classLists.length) if (argument = classLists[index++]) {
		if (resolvedValue = toValue(argument)) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
};
var toValue = (mix) => {
	if (typeof mix === "string") return mix;
	let resolvedValue;
	let string = "";
	for (let k = 0; k < mix.length; k++) if (mix[k]) {
		if (resolvedValue = toValue(mix[k])) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
};
var createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
	let configUtils;
	let cacheGet;
	let cacheSet;
	let functionToCall;
	const initTailwindMerge = (classList) => {
		configUtils = createConfigUtils(createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst()));
		cacheGet = configUtils.cache.get;
		cacheSet = configUtils.cache.set;
		functionToCall = tailwindMerge;
		return tailwindMerge(classList);
	};
	const tailwindMerge = (classList) => {
		const cachedResult = cacheGet(classList);
		if (cachedResult) return cachedResult;
		const result = mergeClassList(classList, configUtils);
		cacheSet(classList, result);
		return result;
	};
	functionToCall = initTailwindMerge;
	return (...args) => functionToCall(twJoin(...args));
};
var fallbackThemeArr = [];
var fromTheme = (key) => {
	const themeGetter = (theme) => theme[key] || fallbackThemeArr;
	themeGetter.isThemeGetter = true;
	return themeGetter;
};
var arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
var arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
var fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isFraction = (value) => fractionRegex.test(value);
var isNumber = (value) => !!value && !Number.isNaN(Number(value));
var isInteger = (value) => !!value && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var isAny = () => true;
var isLengthOnly = (value) => lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
var isNamedContainerQuery = (value) => value.startsWith("@container") && (value[10] === "/" && value[11] !== void 0 || value[11] === "s" && value[16] !== void 0 && value.startsWith("-size/", 10) || value[11] === "n" && value[18] !== void 0 && value.startsWith("-normal/", 10));
var isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
var isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
var isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
var isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
var isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
var isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
var isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
var isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
var isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
var isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
var isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
var isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
var isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
var getIsArbitraryValue = (value, testLabel, testValue) => {
	const result = arbitraryValueRegex.exec(value);
	if (result) {
		if (result[1]) return testLabel(result[1]);
		return testValue(result[2]);
	}
	return false;
};
var getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
	const result = arbitraryVariableRegex.exec(value);
	if (result) {
		if (result[1]) return testLabel(result[1]);
		return shouldMatchNoLabel;
	}
	return false;
};
var isLabelPosition = (label) => label === "position" || label === "percentage";
var isLabelImage = (label) => label === "image" || label === "url";
var isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
var isLabelLength = (label) => label === "length";
var isLabelNumber = (label) => label === "number";
var isLabelFamilyName = (label) => label === "family-name";
var isLabelWeight = (label) => label === "number" || label === "weight";
var isLabelShadow = (label) => label === "shadow";
var getDefaultConfig = () => {
	/**
	* Theme getters for theme variable namespaces
	* @see https://tailwindcss.com/docs/theme#theme-variable-namespaces
	*/
	const themeColor = fromTheme("color");
	const themeFont = fromTheme("font");
	const themeText = fromTheme("text");
	const themeFontWeight = fromTheme("font-weight");
	const themeTracking = fromTheme("tracking");
	const themeLeading = fromTheme("leading");
	const themeBreakpoint = fromTheme("breakpoint");
	const themeContainer = fromTheme("container");
	const themeSpacing = fromTheme("spacing");
	const themeRadius = fromTheme("radius");
	const themeShadow = fromTheme("shadow");
	const themeInsetShadow = fromTheme("inset-shadow");
	const themeTextShadow = fromTheme("text-shadow");
	const themeDropShadow = fromTheme("drop-shadow");
	const themeBlur = fromTheme("blur");
	const themePerspective = fromTheme("perspective");
	const themeAspect = fromTheme("aspect");
	const themeEase = fromTheme("ease");
	const themeAnimate = fromTheme("animate");
	/**
	* Helpers to avoid repeating the same scales
	*
	* We use functions that create a new array every time they're called instead of static arrays.
	* This ensures that users who modify any scale by mutating the array (e.g. with `array.push(element)`) don't accidentally mutate arrays in other parts of the config.
	*/
	const scaleBreak = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	];
	const scalePosition = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	];
	const scalePositionWithArbitrary = () => [
		...scalePosition(),
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleOverflow = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	];
	const scaleOverscroll = () => [
		"auto",
		"contain",
		"none"
	];
	const scaleUnambiguousSpacing = () => [
		isArbitraryVariable,
		isArbitraryValue,
		themeSpacing
	];
	const scaleInset = () => [
		isFraction,
		"full",
		"auto",
		...scaleUnambiguousSpacing()
	];
	const scaleGridTemplateColsRows = () => [
		isInteger,
		"none",
		"subgrid",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridColRowStartAndEnd = () => [
		"auto",
		{ span: [
			"full",
			isInteger,
			isArbitraryVariable,
			isArbitraryValue
		] },
		isInteger,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridColRowStartOrEnd = () => [
		isInteger,
		"auto",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridAutoColsRows = () => [
		"auto",
		"min",
		"max",
		"fr",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleAlignPrimaryAxis = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	];
	const scaleAlignSecondaryAxis = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	];
	const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
	const scaleSizing = () => [
		isFraction,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleSizingInline = () => [
		isFraction,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleSizingBlock = () => [
		isFraction,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleColor = () => [
		themeColor,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleBgPosition = () => [
		...scalePosition(),
		isArbitraryVariablePosition,
		isArbitraryPosition,
		{ position: [isArbitraryVariable, isArbitraryValue] }
	];
	const scaleBgRepeat = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }];
	const scaleBgSize = () => [
		"auto",
		"cover",
		"contain",
		isArbitraryVariableSize,
		isArbitrarySize,
		{ size: [isArbitraryVariable, isArbitraryValue] }
	];
	const scaleGradientStopPosition = () => [
		isPercent,
		isArbitraryVariableLength,
		isArbitraryLength
	];
	const scaleRadius = () => [
		"",
		"none",
		"full",
		themeRadius,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleBorderWidth = () => [
		"",
		isNumber,
		isArbitraryVariableLength,
		isArbitraryLength
	];
	const scaleLineStyle = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	];
	const scaleBlendMode = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	];
	const scaleMaskImagePosition = () => [
		isNumber,
		isPercent,
		isArbitraryVariablePosition,
		isArbitraryPosition
	];
	const scaleBlur = () => [
		"",
		"none",
		themeBlur,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleRotate = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleScale = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleSkew = () => [
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleTranslate = () => [
		isFraction,
		"full",
		...scaleUnambiguousSpacing()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [isTshirtSize],
			breakpoint: [isTshirtSize],
			color: [isAny],
			container: [isTshirtSize],
			"drop-shadow": [isTshirtSize],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [isAnyNonArbitrary],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [isTshirtSize],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [isTshirtSize],
			shadow: [isTshirtSize],
			spacing: ["px", isNumber],
			text: [isTshirtSize],
			"text-shadow": [isTshirtSize],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			/**
			* Aspect Ratio
			* @see https://tailwindcss.com/docs/aspect-ratio
			*/
			aspect: [{ aspect: [
				"auto",
				"square",
				isFraction,
				isArbitraryValue,
				isArbitraryVariable,
				themeAspect
			] }],
			/**
			* Container
			* @see https://tailwindcss.com/docs/container
			* @deprecated since Tailwind CSS v4.0.0
			*/
			container: ["container"],
			/**
			* Container Type
			* @see https://tailwindcss.com/docs/responsive-design#container-queries
			*/
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Container Name
			* @see https://tailwindcss.com/docs/responsive-design#named-containers
			*/
			"container-named": [isNamedContainerQuery],
			/**
			* Columns
			* @see https://tailwindcss.com/docs/columns
			*/
			columns: [{ columns: [
				isNumber,
				isArbitraryValue,
				isArbitraryVariable,
				themeContainer
			] }],
			/**
			* Break After
			* @see https://tailwindcss.com/docs/break-after
			*/
			"break-after": [{ "break-after": scaleBreak() }],
			/**
			* Break Before
			* @see https://tailwindcss.com/docs/break-before
			*/
			"break-before": [{ "break-before": scaleBreak() }],
			/**
			* Break Inside
			* @see https://tailwindcss.com/docs/break-inside
			*/
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			/**
			* Box Decoration Break
			* @see https://tailwindcss.com/docs/box-decoration-break
			*/
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			/**
			* Box Sizing
			* @see https://tailwindcss.com/docs/box-sizing
			*/
			box: [{ box: ["border", "content"] }],
			/**
			* Display
			* @see https://tailwindcss.com/docs/display
			*/
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			/**
			* Screen Reader Only
			* @see https://tailwindcss.com/docs/display#screen-reader-only
			*/
			sr: ["sr-only", "not-sr-only"],
			/**
			* Floats
			* @see https://tailwindcss.com/docs/float
			*/
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			/**
			* Clear
			* @see https://tailwindcss.com/docs/clear
			*/
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			/**
			* Isolation
			* @see https://tailwindcss.com/docs/isolation
			*/
			isolation: ["isolate", "isolation-auto"],
			/**
			* Object Fit
			* @see https://tailwindcss.com/docs/object-fit
			*/
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			/**
			* Object Position
			* @see https://tailwindcss.com/docs/object-position
			*/
			"object-position": [{ object: scalePositionWithArbitrary() }],
			/**
			* Overflow
			* @see https://tailwindcss.com/docs/overflow
			*/
			overflow: [{ overflow: scaleOverflow() }],
			/**
			* Overflow X
			* @see https://tailwindcss.com/docs/overflow
			*/
			"overflow-x": [{ "overflow-x": scaleOverflow() }],
			/**
			* Overflow Y
			* @see https://tailwindcss.com/docs/overflow
			*/
			"overflow-y": [{ "overflow-y": scaleOverflow() }],
			/**
			* Overscroll Behavior
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			overscroll: [{ overscroll: scaleOverscroll() }],
			/**
			* Overscroll Behavior X
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			"overscroll-x": [{ "overscroll-x": scaleOverscroll() }],
			/**
			* Overscroll Behavior Y
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			"overscroll-y": [{ "overscroll-y": scaleOverscroll() }],
			/**
			* Position
			* @see https://tailwindcss.com/docs/position
			*/
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			/**
			* Inset
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			inset: [{ inset: scaleInset() }],
			/**
			* Inset Inline
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-x": [{ "inset-x": scaleInset() }],
			/**
			* Inset Block
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-y": [{ "inset-y": scaleInset() }],
			/**
			* Inset Inline Start
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			* @todo class group will be renamed to `inset-s` in next major release
			*/
			start: [{
				"inset-s": scaleInset(),
				/**
				* @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
				* @see https://github.com/tailwindlabs/tailwindcss/pull/19613
				*/
				start: scaleInset()
			}],
			/**
			* Inset Inline End
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			* @todo class group will be renamed to `inset-e` in next major release
			*/
			end: [{
				"inset-e": scaleInset(),
				/**
				* @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
				* @see https://github.com/tailwindlabs/tailwindcss/pull/19613
				*/
				end: scaleInset()
			}],
			/**
			* Inset Block Start
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-bs": [{ "inset-bs": scaleInset() }],
			/**
			* Inset Block End
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-be": [{ "inset-be": scaleInset() }],
			/**
			* Top
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			top: [{ top: scaleInset() }],
			/**
			* Right
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			right: [{ right: scaleInset() }],
			/**
			* Bottom
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			bottom: [{ bottom: scaleInset() }],
			/**
			* Left
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			left: [{ left: scaleInset() }],
			/**
			* Visibility
			* @see https://tailwindcss.com/docs/visibility
			*/
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			/**
			* Z-Index
			* @see https://tailwindcss.com/docs/z-index
			*/
			z: [{ z: [
				isInteger,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Flex Basis
			* @see https://tailwindcss.com/docs/flex-basis
			*/
			basis: [{ basis: [
				isFraction,
				"full",
				"auto",
				themeContainer,
				...scaleUnambiguousSpacing()
			] }],
			/**
			* Flex Direction
			* @see https://tailwindcss.com/docs/flex-direction
			*/
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			/**
			* Flex Wrap
			* @see https://tailwindcss.com/docs/flex-wrap
			*/
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			/**
			* Flex
			* @see https://tailwindcss.com/docs/flex
			*/
			flex: [{ flex: [
				isNumber,
				isFraction,
				"auto",
				"initial",
				"none",
				isArbitraryValue
			] }],
			/**
			* Flex Grow
			* @see https://tailwindcss.com/docs/flex-grow
			*/
			grow: [{ grow: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Flex Shrink
			* @see https://tailwindcss.com/docs/flex-shrink
			*/
			shrink: [{ shrink: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Order
			* @see https://tailwindcss.com/docs/order
			*/
			order: [{ order: [
				isInteger,
				"first",
				"last",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Grid Template Columns
			* @see https://tailwindcss.com/docs/grid-template-columns
			*/
			"grid-cols": [{ "grid-cols": scaleGridTemplateColsRows() }],
			/**
			* Grid Column Start / End
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-start-end": [{ col: scaleGridColRowStartAndEnd() }],
			/**
			* Grid Column Start
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-start": [{ "col-start": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Column End
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-end": [{ "col-end": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Template Rows
			* @see https://tailwindcss.com/docs/grid-template-rows
			*/
			"grid-rows": [{ "grid-rows": scaleGridTemplateColsRows() }],
			/**
			* Grid Row Start / End
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-start-end": [{ row: scaleGridColRowStartAndEnd() }],
			/**
			* Grid Row Start
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-start": [{ "row-start": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Row End
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-end": [{ "row-end": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Auto Flow
			* @see https://tailwindcss.com/docs/grid-auto-flow
			*/
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			/**
			* Grid Auto Columns
			* @see https://tailwindcss.com/docs/grid-auto-columns
			*/
			"auto-cols": [{ "auto-cols": scaleGridAutoColsRows() }],
			/**
			* Grid Auto Rows
			* @see https://tailwindcss.com/docs/grid-auto-rows
			*/
			"auto-rows": [{ "auto-rows": scaleGridAutoColsRows() }],
			/**
			* Gap
			* @see https://tailwindcss.com/docs/gap
			*/
			gap: [{ gap: scaleUnambiguousSpacing() }],
			/**
			* Gap X
			* @see https://tailwindcss.com/docs/gap
			*/
			"gap-x": [{ "gap-x": scaleUnambiguousSpacing() }],
			/**
			* Gap Y
			* @see https://tailwindcss.com/docs/gap
			*/
			"gap-y": [{ "gap-y": scaleUnambiguousSpacing() }],
			/**
			* Justify Content
			* @see https://tailwindcss.com/docs/justify-content
			*/
			"justify-content": [{ justify: [...scaleAlignPrimaryAxis(), "normal"] }],
			/**
			* Justify Items
			* @see https://tailwindcss.com/docs/justify-items
			*/
			"justify-items": [{ "justify-items": [...scaleAlignSecondaryAxis(), "normal"] }],
			/**
			* Justify Self
			* @see https://tailwindcss.com/docs/justify-self
			*/
			"justify-self": [{ "justify-self": ["auto", ...scaleAlignSecondaryAxis()] }],
			/**
			* Align Content
			* @see https://tailwindcss.com/docs/align-content
			*/
			"align-content": [{ content: ["normal", ...scaleAlignPrimaryAxis()] }],
			/**
			* Align Items
			* @see https://tailwindcss.com/docs/align-items
			*/
			"align-items": [{ items: [...scaleAlignSecondaryAxis(), { baseline: ["", "last"] }] }],
			/**
			* Align Self
			* @see https://tailwindcss.com/docs/align-self
			*/
			"align-self": [{ self: [
				"auto",
				...scaleAlignSecondaryAxis(),
				{ baseline: ["", "last"] }
			] }],
			/**
			* Place Content
			* @see https://tailwindcss.com/docs/place-content
			*/
			"place-content": [{ "place-content": scaleAlignPrimaryAxis() }],
			/**
			* Place Items
			* @see https://tailwindcss.com/docs/place-items
			*/
			"place-items": [{ "place-items": [...scaleAlignSecondaryAxis(), "baseline"] }],
			/**
			* Place Self
			* @see https://tailwindcss.com/docs/place-self
			*/
			"place-self": [{ "place-self": ["auto", ...scaleAlignSecondaryAxis()] }],
			/**
			* Padding
			* @see https://tailwindcss.com/docs/padding
			*/
			p: [{ p: scaleUnambiguousSpacing() }],
			/**
			* Padding Inline
			* @see https://tailwindcss.com/docs/padding
			*/
			px: [{ px: scaleUnambiguousSpacing() }],
			/**
			* Padding Block
			* @see https://tailwindcss.com/docs/padding
			*/
			py: [{ py: scaleUnambiguousSpacing() }],
			/**
			* Padding Inline Start
			* @see https://tailwindcss.com/docs/padding
			*/
			ps: [{ ps: scaleUnambiguousSpacing() }],
			/**
			* Padding Inline End
			* @see https://tailwindcss.com/docs/padding
			*/
			pe: [{ pe: scaleUnambiguousSpacing() }],
			/**
			* Padding Block Start
			* @see https://tailwindcss.com/docs/padding
			*/
			pbs: [{ pbs: scaleUnambiguousSpacing() }],
			/**
			* Padding Block End
			* @see https://tailwindcss.com/docs/padding
			*/
			pbe: [{ pbe: scaleUnambiguousSpacing() }],
			/**
			* Padding Top
			* @see https://tailwindcss.com/docs/padding
			*/
			pt: [{ pt: scaleUnambiguousSpacing() }],
			/**
			* Padding Right
			* @see https://tailwindcss.com/docs/padding
			*/
			pr: [{ pr: scaleUnambiguousSpacing() }],
			/**
			* Padding Bottom
			* @see https://tailwindcss.com/docs/padding
			*/
			pb: [{ pb: scaleUnambiguousSpacing() }],
			/**
			* Padding Left
			* @see https://tailwindcss.com/docs/padding
			*/
			pl: [{ pl: scaleUnambiguousSpacing() }],
			/**
			* Margin
			* @see https://tailwindcss.com/docs/margin
			*/
			m: [{ m: scaleMargin() }],
			/**
			* Margin Inline
			* @see https://tailwindcss.com/docs/margin
			*/
			mx: [{ mx: scaleMargin() }],
			/**
			* Margin Block
			* @see https://tailwindcss.com/docs/margin
			*/
			my: [{ my: scaleMargin() }],
			/**
			* Margin Inline Start
			* @see https://tailwindcss.com/docs/margin
			*/
			ms: [{ ms: scaleMargin() }],
			/**
			* Margin Inline End
			* @see https://tailwindcss.com/docs/margin
			*/
			me: [{ me: scaleMargin() }],
			/**
			* Margin Block Start
			* @see https://tailwindcss.com/docs/margin
			*/
			mbs: [{ mbs: scaleMargin() }],
			/**
			* Margin Block End
			* @see https://tailwindcss.com/docs/margin
			*/
			mbe: [{ mbe: scaleMargin() }],
			/**
			* Margin Top
			* @see https://tailwindcss.com/docs/margin
			*/
			mt: [{ mt: scaleMargin() }],
			/**
			* Margin Right
			* @see https://tailwindcss.com/docs/margin
			*/
			mr: [{ mr: scaleMargin() }],
			/**
			* Margin Bottom
			* @see https://tailwindcss.com/docs/margin
			*/
			mb: [{ mb: scaleMargin() }],
			/**
			* Margin Left
			* @see https://tailwindcss.com/docs/margin
			*/
			ml: [{ ml: scaleMargin() }],
			/**
			* Space Between X
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-x": [{ "space-x": scaleUnambiguousSpacing() }],
			/**
			* Space Between X Reverse
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-x-reverse": ["space-x-reverse"],
			/**
			* Space Between Y
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-y": [{ "space-y": scaleUnambiguousSpacing() }],
			/**
			* Space Between Y Reverse
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-y-reverse": ["space-y-reverse"],
			/**
			* Size
			* @see https://tailwindcss.com/docs/width#setting-both-width-and-height
			*/
			size: [{ size: scaleSizing() }],
			/**
			* Inline Size
			* @see https://tailwindcss.com/docs/width
			*/
			"inline-size": [{ inline: ["auto", ...scaleSizingInline()] }],
			/**
			* Min-Inline Size
			* @see https://tailwindcss.com/docs/min-width
			*/
			"min-inline-size": [{ "min-inline": ["auto", ...scaleSizingInline()] }],
			/**
			* Max-Inline Size
			* @see https://tailwindcss.com/docs/max-width
			*/
			"max-inline-size": [{ "max-inline": ["none", ...scaleSizingInline()] }],
			/**
			* Block Size
			* @see https://tailwindcss.com/docs/height
			*/
			"block-size": [{ block: ["auto", ...scaleSizingBlock()] }],
			/**
			* Min-Block Size
			* @see https://tailwindcss.com/docs/min-height
			*/
			"min-block-size": [{ "min-block": ["auto", ...scaleSizingBlock()] }],
			/**
			* Max-Block Size
			* @see https://tailwindcss.com/docs/max-height
			*/
			"max-block-size": [{ "max-block": ["none", ...scaleSizingBlock()] }],
			/**
			* Width
			* @see https://tailwindcss.com/docs/width
			*/
			w: [{ w: [
				themeContainer,
				"screen",
				...scaleSizing()
			] }],
			/**
			* Min-Width
			* @see https://tailwindcss.com/docs/min-width
			*/
			"min-w": [{ "min-w": [
				themeContainer,
				"screen",
				"none",
				...scaleSizing()
			] }],
			/**
			* Max-Width
			* @see https://tailwindcss.com/docs/max-width
			*/
			"max-w": [{ "max-w": [
				themeContainer,
				"screen",
				"none",
				"prose",
				{ screen: [themeBreakpoint] },
				...scaleSizing()
			] }],
			/**
			* Height
			* @see https://tailwindcss.com/docs/height
			*/
			h: [{ h: [
				"screen",
				"lh",
				...scaleSizing()
			] }],
			/**
			* Min-Height
			* @see https://tailwindcss.com/docs/min-height
			*/
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...scaleSizing()
			] }],
			/**
			* Max-Height
			* @see https://tailwindcss.com/docs/max-height
			*/
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...scaleSizing()
			] }],
			/**
			* Font Size
			* @see https://tailwindcss.com/docs/font-size
			*/
			"font-size": [{ text: [
				"base",
				themeText,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			/**
			* Font Smoothing
			* @see https://tailwindcss.com/docs/font-smoothing
			*/
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			/**
			* Font Style
			* @see https://tailwindcss.com/docs/font-style
			*/
			"font-style": ["italic", "not-italic"],
			/**
			* Font Weight
			* @see https://tailwindcss.com/docs/font-weight
			*/
			"font-weight": [{ font: [
				themeFontWeight,
				isArbitraryVariableWeight,
				isArbitraryWeight
			] }],
			/**
			* Font Stretch
			* @see https://tailwindcss.com/docs/font-stretch
			*/
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				isPercent,
				isArbitraryValue
			] }],
			/**
			* Font Family
			* @see https://tailwindcss.com/docs/font-family
			*/
			"font-family": [{ font: [
				isArbitraryVariableFamilyName,
				isArbitraryFamilyName,
				themeFont
			] }],
			/**
			* Font Feature Settings
			* @see https://tailwindcss.com/docs/font-feature-settings
			*/
			"font-features": [{ "font-features": [isArbitraryValue] }],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-normal": ["normal-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-ordinal": ["ordinal"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-slashed-zero": ["slashed-zero"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			/**
			* Letter Spacing
			* @see https://tailwindcss.com/docs/letter-spacing
			*/
			tracking: [{ tracking: [
				themeTracking,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Line Clamp
			* @see https://tailwindcss.com/docs/line-clamp
			*/
			"line-clamp": [{ "line-clamp": [
				isNumber,
				"none",
				isArbitraryVariable,
				isArbitraryNumber
			] }],
			/**
			* Line Height
			* @see https://tailwindcss.com/docs/line-height
			*/
			leading: [{ leading: [themeLeading, ...scaleUnambiguousSpacing()] }],
			/**
			* List Style Image
			* @see https://tailwindcss.com/docs/list-style-image
			*/
			"list-image": [{ "list-image": [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* List Style Position
			* @see https://tailwindcss.com/docs/list-style-position
			*/
			"list-style-position": [{ list: ["inside", "outside"] }],
			/**
			* List Style Type
			* @see https://tailwindcss.com/docs/list-style-type
			*/
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Text Alignment
			* @see https://tailwindcss.com/docs/text-align
			*/
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			/**
			* Placeholder Color
			* @deprecated since Tailwind CSS v3.0.0
			* @see https://v3.tailwindcss.com/docs/placeholder-color
			*/
			"placeholder-color": [{ placeholder: scaleColor() }],
			/**
			* Text Color
			* @see https://tailwindcss.com/docs/text-color
			*/
			"text-color": [{ text: scaleColor() }],
			/**
			* Text Decoration
			* @see https://tailwindcss.com/docs/text-decoration
			*/
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			/**
			* Text Decoration Style
			* @see https://tailwindcss.com/docs/text-decoration-style
			*/
			"text-decoration-style": [{ decoration: [...scaleLineStyle(), "wavy"] }],
			/**
			* Text Decoration Thickness
			* @see https://tailwindcss.com/docs/text-decoration-thickness
			*/
			"text-decoration-thickness": [{ decoration: [
				isNumber,
				"from-font",
				"auto",
				isArbitraryVariable,
				isArbitraryLength
			] }],
			/**
			* Text Decoration Color
			* @see https://tailwindcss.com/docs/text-decoration-color
			*/
			"text-decoration-color": [{ decoration: scaleColor() }],
			/**
			* Text Underline Offset
			* @see https://tailwindcss.com/docs/text-underline-offset
			*/
			"underline-offset": [{ "underline-offset": [
				isNumber,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Text Transform
			* @see https://tailwindcss.com/docs/text-transform
			*/
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			/**
			* Text Overflow
			* @see https://tailwindcss.com/docs/text-overflow
			*/
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			/**
			* Text Wrap
			* @see https://tailwindcss.com/docs/text-wrap
			*/
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			/**
			* Text Indent
			* @see https://tailwindcss.com/docs/text-indent
			*/
			indent: [{ indent: scaleUnambiguousSpacing() }],
			/**
			* Tab Size
			* @see https://tailwindcss.com/docs/tab-size
			*/
			"tab-size": [{ tab: [
				isInteger,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Vertical Alignment
			* @see https://tailwindcss.com/docs/vertical-align
			*/
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Whitespace
			* @see https://tailwindcss.com/docs/whitespace
			*/
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			/**
			* Word Break
			* @see https://tailwindcss.com/docs/word-break
			*/
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			/**
			* Overflow Wrap
			* @see https://tailwindcss.com/docs/overflow-wrap
			*/
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			/**
			* Hyphens
			* @see https://tailwindcss.com/docs/hyphens
			*/
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			/**
			* Content
			* @see https://tailwindcss.com/docs/content
			*/
			content: [{ content: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Background Attachment
			* @see https://tailwindcss.com/docs/background-attachment
			*/
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			/**
			* Background Clip
			* @see https://tailwindcss.com/docs/background-clip
			*/
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			/**
			* Background Origin
			* @see https://tailwindcss.com/docs/background-origin
			*/
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			/**
			* Background Position
			* @see https://tailwindcss.com/docs/background-position
			*/
			"bg-position": [{ bg: scaleBgPosition() }],
			/**
			* Background Repeat
			* @see https://tailwindcss.com/docs/background-repeat
			*/
			"bg-repeat": [{ bg: scaleBgRepeat() }],
			/**
			* Background Size
			* @see https://tailwindcss.com/docs/background-size
			*/
			"bg-size": [{ bg: scaleBgSize() }],
			/**
			* Background Image
			* @see https://tailwindcss.com/docs/background-image
			*/
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					],
					radial: [
						"",
						isArbitraryVariable,
						isArbitraryValue
					],
					conic: [
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					]
				},
				isArbitraryVariableImage,
				isArbitraryImage
			] }],
			/**
			* Background Color
			* @see https://tailwindcss.com/docs/background-color
			*/
			"bg-color": [{ bg: scaleColor() }],
			/**
			* Gradient Color Stops From Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-from-pos": [{ from: scaleGradientStopPosition() }],
			/**
			* Gradient Color Stops Via Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-via-pos": [{ via: scaleGradientStopPosition() }],
			/**
			* Gradient Color Stops To Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-to-pos": [{ to: scaleGradientStopPosition() }],
			/**
			* Gradient Color Stops From
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-from": [{ from: scaleColor() }],
			/**
			* Gradient Color Stops Via
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-via": [{ via: scaleColor() }],
			/**
			* Gradient Color Stops To
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-to": [{ to: scaleColor() }],
			/**
			* Border Radius
			* @see https://tailwindcss.com/docs/border-radius
			*/
			rounded: [{ rounded: scaleRadius() }],
			/**
			* Border Radius Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-s": [{ "rounded-s": scaleRadius() }],
			/**
			* Border Radius End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-e": [{ "rounded-e": scaleRadius() }],
			/**
			* Border Radius Top
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-t": [{ "rounded-t": scaleRadius() }],
			/**
			* Border Radius Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-r": [{ "rounded-r": scaleRadius() }],
			/**
			* Border Radius Bottom
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-b": [{ "rounded-b": scaleRadius() }],
			/**
			* Border Radius Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-l": [{ "rounded-l": scaleRadius() }],
			/**
			* Border Radius Start Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-ss": [{ "rounded-ss": scaleRadius() }],
			/**
			* Border Radius Start End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-se": [{ "rounded-se": scaleRadius() }],
			/**
			* Border Radius End End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-ee": [{ "rounded-ee": scaleRadius() }],
			/**
			* Border Radius End Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-es": [{ "rounded-es": scaleRadius() }],
			/**
			* Border Radius Top Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-tl": [{ "rounded-tl": scaleRadius() }],
			/**
			* Border Radius Top Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-tr": [{ "rounded-tr": scaleRadius() }],
			/**
			* Border Radius Bottom Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-br": [{ "rounded-br": scaleRadius() }],
			/**
			* Border Radius Bottom Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-bl": [{ "rounded-bl": scaleRadius() }],
			/**
			* Border Width
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w": [{ border: scaleBorderWidth() }],
			/**
			* Border Width Inline
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-x": [{ "border-x": scaleBorderWidth() }],
			/**
			* Border Width Block
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-y": [{ "border-y": scaleBorderWidth() }],
			/**
			* Border Width Inline Start
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-s": [{ "border-s": scaleBorderWidth() }],
			/**
			* Border Width Inline End
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-e": [{ "border-e": scaleBorderWidth() }],
			/**
			* Border Width Block Start
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-bs": [{ "border-bs": scaleBorderWidth() }],
			/**
			* Border Width Block End
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-be": [{ "border-be": scaleBorderWidth() }],
			/**
			* Border Width Top
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-t": [{ "border-t": scaleBorderWidth() }],
			/**
			* Border Width Right
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-r": [{ "border-r": scaleBorderWidth() }],
			/**
			* Border Width Bottom
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-b": [{ "border-b": scaleBorderWidth() }],
			/**
			* Border Width Left
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-l": [{ "border-l": scaleBorderWidth() }],
			/**
			* Divide Width X
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-x": [{ "divide-x": scaleBorderWidth() }],
			/**
			* Divide Width X Reverse
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-x-reverse": ["divide-x-reverse"],
			/**
			* Divide Width Y
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-y": [{ "divide-y": scaleBorderWidth() }],
			/**
			* Divide Width Y Reverse
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-y-reverse": ["divide-y-reverse"],
			/**
			* Border Style
			* @see https://tailwindcss.com/docs/border-style
			*/
			"border-style": [{ border: [
				...scaleLineStyle(),
				"hidden",
				"none"
			] }],
			/**
			* Divide Style
			* @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
			*/
			"divide-style": [{ divide: [
				...scaleLineStyle(),
				"hidden",
				"none"
			] }],
			/**
			* Border Color
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color": [{ border: scaleColor() }],
			/**
			* Border Color Inline
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-x": [{ "border-x": scaleColor() }],
			/**
			* Border Color Block
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-y": [{ "border-y": scaleColor() }],
			/**
			* Border Color Inline Start
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-s": [{ "border-s": scaleColor() }],
			/**
			* Border Color Inline End
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-e": [{ "border-e": scaleColor() }],
			/**
			* Border Color Block Start
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-bs": [{ "border-bs": scaleColor() }],
			/**
			* Border Color Block End
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-be": [{ "border-be": scaleColor() }],
			/**
			* Border Color Top
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-t": [{ "border-t": scaleColor() }],
			/**
			* Border Color Right
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-r": [{ "border-r": scaleColor() }],
			/**
			* Border Color Bottom
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-b": [{ "border-b": scaleColor() }],
			/**
			* Border Color Left
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-l": [{ "border-l": scaleColor() }],
			/**
			* Divide Color
			* @see https://tailwindcss.com/docs/divide-color
			*/
			"divide-color": [{ divide: scaleColor() }],
			/**
			* Outline Style
			* @see https://tailwindcss.com/docs/outline-style
			*/
			"outline-style": [{ outline: [
				...scaleLineStyle(),
				"none",
				"hidden"
			] }],
			/**
			* Outline Offset
			* @see https://tailwindcss.com/docs/outline-offset
			*/
			"outline-offset": [{ "outline-offset": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Outline Width
			* @see https://tailwindcss.com/docs/outline-width
			*/
			"outline-w": [{ outline: [
				"",
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			/**
			* Outline Color
			* @see https://tailwindcss.com/docs/outline-color
			*/
			"outline-color": [{ outline: scaleColor() }],
			/**
			* Box Shadow
			* @see https://tailwindcss.com/docs/box-shadow
			*/
			shadow: [{ shadow: [
				"",
				"none",
				themeShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Box Shadow Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
			*/
			"shadow-color": [{ shadow: scaleColor() }],
			/**
			* Inset Box Shadow
			* @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
			*/
			"inset-shadow": [{ "inset-shadow": [
				"none",
				themeInsetShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Inset Box Shadow Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
			*/
			"inset-shadow-color": [{ "inset-shadow": scaleColor() }],
			/**
			* Ring Width
			* @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
			*/
			"ring-w": [{ ring: scaleBorderWidth() }],
			/**
			* Ring Width Inset
			* @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
			* @deprecated since Tailwind CSS v4.0.0
			* @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
			*/
			"ring-w-inset": ["ring-inset"],
			/**
			* Ring Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
			*/
			"ring-color": [{ ring: scaleColor() }],
			/**
			* Ring Offset Width
			* @see https://v3.tailwindcss.com/docs/ring-offset-width
			* @deprecated since Tailwind CSS v4.0.0
			* @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
			*/
			"ring-offset-w": [{ "ring-offset": [isNumber, isArbitraryLength] }],
			/**
			* Ring Offset Color
			* @see https://v3.tailwindcss.com/docs/ring-offset-color
			* @deprecated since Tailwind CSS v4.0.0
			* @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
			*/
			"ring-offset-color": [{ "ring-offset": scaleColor() }],
			/**
			* Inset Ring Width
			* @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
			*/
			"inset-ring-w": [{ "inset-ring": scaleBorderWidth() }],
			/**
			* Inset Ring Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
			*/
			"inset-ring-color": [{ "inset-ring": scaleColor() }],
			/**
			* Text Shadow
			* @see https://tailwindcss.com/docs/text-shadow
			*/
			"text-shadow": [{ "text-shadow": [
				"none",
				themeTextShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Text Shadow Color
			* @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
			*/
			"text-shadow-color": [{ "text-shadow": scaleColor() }],
			/**
			* Opacity
			* @see https://tailwindcss.com/docs/opacity
			*/
			opacity: [{ opacity: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Mix Blend Mode
			* @see https://tailwindcss.com/docs/mix-blend-mode
			*/
			"mix-blend": [{ "mix-blend": [
				...scaleBlendMode(),
				"plus-darker",
				"plus-lighter"
			] }],
			/**
			* Background Blend Mode
			* @see https://tailwindcss.com/docs/background-blend-mode
			*/
			"bg-blend": [{ "bg-blend": scaleBlendMode() }],
			/**
			* Mask Clip
			* @see https://tailwindcss.com/docs/mask-clip
			*/
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			/**
			* Mask Composite
			* @see https://tailwindcss.com/docs/mask-composite
			*/
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			/**
			* Mask Image
			* @see https://tailwindcss.com/docs/mask-image
			*/
			"mask-image-linear-pos": [{ "mask-linear": [isNumber] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": scaleMaskImagePosition() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": scaleMaskImagePosition() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": scaleColor() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": scaleColor() }],
			"mask-image-t-from-pos": [{ "mask-t-from": scaleMaskImagePosition() }],
			"mask-image-t-to-pos": [{ "mask-t-to": scaleMaskImagePosition() }],
			"mask-image-t-from-color": [{ "mask-t-from": scaleColor() }],
			"mask-image-t-to-color": [{ "mask-t-to": scaleColor() }],
			"mask-image-r-from-pos": [{ "mask-r-from": scaleMaskImagePosition() }],
			"mask-image-r-to-pos": [{ "mask-r-to": scaleMaskImagePosition() }],
			"mask-image-r-from-color": [{ "mask-r-from": scaleColor() }],
			"mask-image-r-to-color": [{ "mask-r-to": scaleColor() }],
			"mask-image-b-from-pos": [{ "mask-b-from": scaleMaskImagePosition() }],
			"mask-image-b-to-pos": [{ "mask-b-to": scaleMaskImagePosition() }],
			"mask-image-b-from-color": [{ "mask-b-from": scaleColor() }],
			"mask-image-b-to-color": [{ "mask-b-to": scaleColor() }],
			"mask-image-l-from-pos": [{ "mask-l-from": scaleMaskImagePosition() }],
			"mask-image-l-to-pos": [{ "mask-l-to": scaleMaskImagePosition() }],
			"mask-image-l-from-color": [{ "mask-l-from": scaleColor() }],
			"mask-image-l-to-color": [{ "mask-l-to": scaleColor() }],
			"mask-image-x-from-pos": [{ "mask-x-from": scaleMaskImagePosition() }],
			"mask-image-x-to-pos": [{ "mask-x-to": scaleMaskImagePosition() }],
			"mask-image-x-from-color": [{ "mask-x-from": scaleColor() }],
			"mask-image-x-to-color": [{ "mask-x-to": scaleColor() }],
			"mask-image-y-from-pos": [{ "mask-y-from": scaleMaskImagePosition() }],
			"mask-image-y-to-pos": [{ "mask-y-to": scaleMaskImagePosition() }],
			"mask-image-y-from-color": [{ "mask-y-from": scaleColor() }],
			"mask-image-y-to-color": [{ "mask-y-to": scaleColor() }],
			"mask-image-radial": [{ "mask-radial": [isArbitraryVariable, isArbitraryValue] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": scaleMaskImagePosition() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": scaleMaskImagePosition() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": scaleColor() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": scaleColor() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": scalePosition() }],
			"mask-image-conic-pos": [{ "mask-conic": [isNumber] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": scaleMaskImagePosition() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": scaleMaskImagePosition() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": scaleColor() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": scaleColor() }],
			/**
			* Mask Mode
			* @see https://tailwindcss.com/docs/mask-mode
			*/
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			/**
			* Mask Origin
			* @see https://tailwindcss.com/docs/mask-origin
			*/
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			/**
			* Mask Position
			* @see https://tailwindcss.com/docs/mask-position
			*/
			"mask-position": [{ mask: scaleBgPosition() }],
			/**
			* Mask Repeat
			* @see https://tailwindcss.com/docs/mask-repeat
			*/
			"mask-repeat": [{ mask: scaleBgRepeat() }],
			/**
			* Mask Size
			* @see https://tailwindcss.com/docs/mask-size
			*/
			"mask-size": [{ mask: scaleBgSize() }],
			/**
			* Mask Type
			* @see https://tailwindcss.com/docs/mask-type
			*/
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			/**
			* Mask Image
			* @see https://tailwindcss.com/docs/mask-image
			*/
			"mask-image": [{ mask: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Filter
			* @see https://tailwindcss.com/docs/filter
			*/
			filter: [{ filter: [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Blur
			* @see https://tailwindcss.com/docs/blur
			*/
			blur: [{ blur: scaleBlur() }],
			/**
			* Brightness
			* @see https://tailwindcss.com/docs/brightness
			*/
			brightness: [{ brightness: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Contrast
			* @see https://tailwindcss.com/docs/contrast
			*/
			contrast: [{ contrast: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Drop Shadow
			* @see https://tailwindcss.com/docs/drop-shadow
			*/
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				themeDropShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Drop Shadow Color
			* @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
			*/
			"drop-shadow-color": [{ "drop-shadow": scaleColor() }],
			/**
			* Grayscale
			* @see https://tailwindcss.com/docs/grayscale
			*/
			grayscale: [{ grayscale: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Hue Rotate
			* @see https://tailwindcss.com/docs/hue-rotate
			*/
			"hue-rotate": [{ "hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Invert
			* @see https://tailwindcss.com/docs/invert
			*/
			invert: [{ invert: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Saturate
			* @see https://tailwindcss.com/docs/saturate
			*/
			saturate: [{ saturate: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Sepia
			* @see https://tailwindcss.com/docs/sepia
			*/
			sepia: [{ sepia: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Filter
			* @see https://tailwindcss.com/docs/backdrop-filter
			*/
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Blur
			* @see https://tailwindcss.com/docs/backdrop-blur
			*/
			"backdrop-blur": [{ "backdrop-blur": scaleBlur() }],
			/**
			* Backdrop Brightness
			* @see https://tailwindcss.com/docs/backdrop-brightness
			*/
			"backdrop-brightness": [{ "backdrop-brightness": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Contrast
			* @see https://tailwindcss.com/docs/backdrop-contrast
			*/
			"backdrop-contrast": [{ "backdrop-contrast": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Grayscale
			* @see https://tailwindcss.com/docs/backdrop-grayscale
			*/
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Hue Rotate
			* @see https://tailwindcss.com/docs/backdrop-hue-rotate
			*/
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Invert
			* @see https://tailwindcss.com/docs/backdrop-invert
			*/
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Opacity
			* @see https://tailwindcss.com/docs/backdrop-opacity
			*/
			"backdrop-opacity": [{ "backdrop-opacity": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Saturate
			* @see https://tailwindcss.com/docs/backdrop-saturate
			*/
			"backdrop-saturate": [{ "backdrop-saturate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Sepia
			* @see https://tailwindcss.com/docs/backdrop-sepia
			*/
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Border Collapse
			* @see https://tailwindcss.com/docs/border-collapse
			*/
			"border-collapse": [{ border: ["collapse", "separate"] }],
			/**
			* Border Spacing
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing": [{ "border-spacing": scaleUnambiguousSpacing() }],
			/**
			* Border Spacing X
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing-x": [{ "border-spacing-x": scaleUnambiguousSpacing() }],
			/**
			* Border Spacing Y
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing-y": [{ "border-spacing-y": scaleUnambiguousSpacing() }],
			/**
			* Table Layout
			* @see https://tailwindcss.com/docs/table-layout
			*/
			"table-layout": [{ table: ["auto", "fixed"] }],
			/**
			* Caption Side
			* @see https://tailwindcss.com/docs/caption-side
			*/
			caption: [{ caption: ["top", "bottom"] }],
			/**
			* Transition Property
			* @see https://tailwindcss.com/docs/transition-property
			*/
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Transition Behavior
			* @see https://tailwindcss.com/docs/transition-behavior
			*/
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			/**
			* Transition Duration
			* @see https://tailwindcss.com/docs/transition-duration
			*/
			duration: [{ duration: [
				isNumber,
				"initial",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Transition Timing Function
			* @see https://tailwindcss.com/docs/transition-timing-function
			*/
			ease: [{ ease: [
				"linear",
				"initial",
				themeEase,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Transition Delay
			* @see https://tailwindcss.com/docs/transition-delay
			*/
			delay: [{ delay: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Animation
			* @see https://tailwindcss.com/docs/animation
			*/
			animate: [{ animate: [
				"none",
				themeAnimate,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backface Visibility
			* @see https://tailwindcss.com/docs/backface-visibility
			*/
			backface: [{ backface: ["hidden", "visible"] }],
			/**
			* Perspective
			* @see https://tailwindcss.com/docs/perspective
			*/
			perspective: [{ perspective: [
				themePerspective,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Perspective Origin
			* @see https://tailwindcss.com/docs/perspective-origin
			*/
			"perspective-origin": [{ "perspective-origin": scalePositionWithArbitrary() }],
			/**
			* Rotate
			* @see https://tailwindcss.com/docs/rotate
			*/
			rotate: [{ rotate: scaleRotate() }],
			/**
			* Rotate X
			* @see https://tailwindcss.com/docs/rotate
			*/
			"rotate-x": [{ "rotate-x": scaleRotate() }],
			/**
			* Rotate Y
			* @see https://tailwindcss.com/docs/rotate
			*/
			"rotate-y": [{ "rotate-y": scaleRotate() }],
			/**
			* Rotate Z
			* @see https://tailwindcss.com/docs/rotate
			*/
			"rotate-z": [{ "rotate-z": scaleRotate() }],
			/**
			* Scale
			* @see https://tailwindcss.com/docs/scale
			*/
			scale: [{ scale: scaleScale() }],
			/**
			* Scale X
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-x": [{ "scale-x": scaleScale() }],
			/**
			* Scale Y
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-y": [{ "scale-y": scaleScale() }],
			/**
			* Scale Z
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-z": [{ "scale-z": scaleScale() }],
			/**
			* Scale 3D
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-3d": ["scale-3d"],
			/**
			* Skew
			* @see https://tailwindcss.com/docs/skew
			*/
			skew: [{ skew: scaleSkew() }],
			/**
			* Skew X
			* @see https://tailwindcss.com/docs/skew
			*/
			"skew-x": [{ "skew-x": scaleSkew() }],
			/**
			* Skew Y
			* @see https://tailwindcss.com/docs/skew
			*/
			"skew-y": [{ "skew-y": scaleSkew() }],
			/**
			* Transform
			* @see https://tailwindcss.com/docs/transform
			*/
			transform: [{ transform: [
				isArbitraryVariable,
				isArbitraryValue,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			/**
			* Transform Origin
			* @see https://tailwindcss.com/docs/transform-origin
			*/
			"transform-origin": [{ origin: scalePositionWithArbitrary() }],
			/**
			* Transform Style
			* @see https://tailwindcss.com/docs/transform-style
			*/
			"transform-style": [{ transform: ["3d", "flat"] }],
			/**
			* Translate
			* @see https://tailwindcss.com/docs/translate
			*/
			translate: [{ translate: scaleTranslate() }],
			/**
			* Translate X
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-x": [{ "translate-x": scaleTranslate() }],
			/**
			* Translate Y
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-y": [{ "translate-y": scaleTranslate() }],
			/**
			* Translate Z
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-z": [{ "translate-z": scaleTranslate() }],
			/**
			* Translate None
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-none": ["translate-none"],
			/**
			* Zoom
			* @see https://tailwindcss.com/docs/zoom
			*/
			zoom: [{ zoom: [
				isInteger,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Accent Color
			* @see https://tailwindcss.com/docs/accent-color
			*/
			accent: [{ accent: scaleColor() }],
			/**
			* Appearance
			* @see https://tailwindcss.com/docs/appearance
			*/
			appearance: [{ appearance: ["none", "auto"] }],
			/**
			* Caret Color
			* @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
			*/
			"caret-color": [{ caret: scaleColor() }],
			/**
			* Color Scheme
			* @see https://tailwindcss.com/docs/color-scheme
			*/
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			/**
			* Cursor
			* @see https://tailwindcss.com/docs/cursor
			*/
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Field Sizing
			* @see https://tailwindcss.com/docs/field-sizing
			*/
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			/**
			* Pointer Events
			* @see https://tailwindcss.com/docs/pointer-events
			*/
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			/**
			* Resize
			* @see https://tailwindcss.com/docs/resize
			*/
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			/**
			* Scroll Behavior
			* @see https://tailwindcss.com/docs/scroll-behavior
			*/
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			/**
			* Scrollbar Thumb Color
			* @see https://tailwindcss.com/docs/scrollbar-color
			*/
			"scrollbar-thumb-color": [{ "scrollbar-thumb": scaleColor() }],
			/**
			* Scrollbar Track Color
			* @see https://tailwindcss.com/docs/scrollbar-color
			*/
			"scrollbar-track-color": [{ "scrollbar-track": scaleColor() }],
			/**
			* Scrollbar Gutter
			* @see https://tailwindcss.com/docs/scrollbar-gutter
			*/
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			/**
			* Scrollbar Width
			* @see https://tailwindcss.com/docs/scrollbar-width
			*/
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			/**
			* Scroll Margin
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-m": [{ "scroll-m": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Inline
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mx": [{ "scroll-mx": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Block
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-my": [{ "scroll-my": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Inline Start
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-ms": [{ "scroll-ms": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Inline End
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-me": [{ "scroll-me": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Block Start
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mbs": [{ "scroll-mbs": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Block End
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mbe": [{ "scroll-mbe": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Top
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mt": [{ "scroll-mt": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Right
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mr": [{ "scroll-mr": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Bottom
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mb": [{ "scroll-mb": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Left
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-ml": [{ "scroll-ml": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-p": [{ "scroll-p": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Inline
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-px": [{ "scroll-px": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Block
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-py": [{ "scroll-py": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Inline Start
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-ps": [{ "scroll-ps": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Inline End
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pe": [{ "scroll-pe": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Block Start
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pbs": [{ "scroll-pbs": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Block End
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pbe": [{ "scroll-pbe": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Top
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pt": [{ "scroll-pt": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Right
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pr": [{ "scroll-pr": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Bottom
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pb": [{ "scroll-pb": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Left
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pl": [{ "scroll-pl": scaleUnambiguousSpacing() }],
			/**
			* Scroll Snap Align
			* @see https://tailwindcss.com/docs/scroll-snap-align
			*/
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			/**
			* Scroll Snap Stop
			* @see https://tailwindcss.com/docs/scroll-snap-stop
			*/
			"snap-stop": [{ snap: ["normal", "always"] }],
			/**
			* Scroll Snap Type
			* @see https://tailwindcss.com/docs/scroll-snap-type
			*/
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			/**
			* Scroll Snap Type Strictness
			* @see https://tailwindcss.com/docs/scroll-snap-type
			*/
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			/**
			* Touch Action
			* @see https://tailwindcss.com/docs/touch-action
			*/
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			/**
			* Touch Action X
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			/**
			* Touch Action Y
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			/**
			* Touch Action Pinch Zoom
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-pz": ["touch-pinch-zoom"],
			/**
			* User Select
			* @see https://tailwindcss.com/docs/user-select
			*/
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			/**
			* Will Change
			* @see https://tailwindcss.com/docs/will-change
			*/
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Fill
			* @see https://tailwindcss.com/docs/fill
			*/
			fill: [{ fill: ["none", ...scaleColor()] }],
			/**
			* Stroke Width
			* @see https://tailwindcss.com/docs/stroke-width
			*/
			"stroke-w": [{ stroke: [
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength,
				isArbitraryNumber
			] }],
			/**
			* Stroke
			* @see https://tailwindcss.com/docs/stroke
			*/
			stroke: [{ stroke: ["none", ...scaleColor()] }],
			/**
			* Forced Color Adjust
			* @see https://tailwindcss.com/docs/forced-color-adjust
			*/
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
};
var twMerge = /*#__PURE__*/ createTailwindMerge(getDefaultConfig);
//#endregion
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/components/ui/input.tsx
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
		type,
		"data-slot": "input",
		className: cn("h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", className),
		...props
	});
}
//#endregion
//#region src/lib/search.ts
/** search-index.json を読み込む（相対パス。base: './' 静的配信前提）。 */
async function loadSearchIndex() {
	const res = await fetch("./search-index.json", { cache: "force-cache" });
	if (!res.ok) return [];
	return await res.json();
}
function makeSnippet(text, query) {
	const idx = text.indexOf(query);
	if (idx < 0) return text.slice(0, 40);
	const start = Math.max(0, idx - 24);
	const end = Math.min(text.length, idx + query.length + 32);
	return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
}
/** クエリで章・セクションを走査し、ヒットを新しい順に最大 limit 件返す。 */
function searchIndex(index, query, limit = 8) {
	const q = query.trim().toLowerCase();
	if (q.length < 1) return [];
	const hits = [];
	for (const ch of index) {
		const chapterHit = ch.title.toLowerCase().includes(q);
		for (const sec of ch.sections) {
			const inHeading = sec.heading.toLowerCase().includes(q);
			const inText = sec.text.toLowerCase().includes(q);
			if (!inHeading && !inText && !chapterHit) continue;
			hits.push({
				slug: ch.slug,
				chapterTitle: ch.title,
				order: ch.order,
				heading: sec.heading || ch.title,
				anchor: sec.anchor,
				snippet: inText ? makeSnippet(sec.text, q) : sec.heading || makeSnippet(ch.fullText, q)
			});
			if (hits.length >= limit) return hits;
		}
		if (chapterHit && !hits.some((h) => h.slug === ch.slug)) {
			hits.push({
				slug: ch.slug,
				chapterTitle: ch.title,
				order: ch.order,
				heading: ch.title,
				anchor: "top",
				snippet: makeSnippet(ch.fullText, q)
			});
			if (hits.length >= limit) return hits;
		}
	}
	return hits;
}
//#endregion
//#region src/components/search/search-box.tsx
/**
* 共有ヘッダーの検索ボックス（AC-7）。
* クライアント側で search-index.json を走査し、該当セクションへジャンプする。
* モバイル仕様（spec-mobile.md §2.4）: 44px 入力・44px 行・60dvh クランプ・
* Enter で先頭ヒットを開く。デスクトップ仕様（spec-desktop.md §5）: 「/」でフォーカス。
*/
function SearchBox() {
	const [index, setIndex] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [hits, setHits] = (0, import_react.useState)([]);
	const [open, setOpen] = (0, import_react.useState)(false);
	const boxRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let disposed = false;
		loadSearchIndex().then((idx) => {
			if (!disposed) setIndex(idx);
		});
		return () => {
			disposed = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const onDocClick = (e) => {
			if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
		};
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
			if (e.key === "/") {
				const t = e.target;
				if (!(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement || t.isContentEditable)) {
					e.preventDefault();
					document.getElementById("site-search")?.focus();
				}
			}
		};
		document.addEventListener("mousedown", onDocClick);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onDocClick);
			document.removeEventListener("keydown", onKey);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!index) return;
		setHits(searchIndex(index, query));
	}, [index, query]);
	const showPanel = open && query.trim().length > 0 && index !== null;
	const openFirstHit = () => {
		const first = hits[0];
		if (!first) return;
		setOpen(false);
		window.location.href = `./${first.slug}.html#${first.anchor}`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: boxRef,
		className: "relative w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "site-search",
				className: "sr-only",
				children: "サイト内検索"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "site-search",
				type: "search",
				placeholder: "検索（例: はちみつ、チャイルドシート）",
				className: "h-11 rounded-full bg-background",
				value: query,
				onChange: (e) => {
					setQuery(e.target.value);
					setOpen(true);
				},
				onFocus: () => setOpen(true),
				onKeyDown: (e) => {
					if (e.key === "Enter" && hits.length > 0) {
						e.preventDefault();
						openFirstHit();
					}
				},
				autoComplete: "off"
			}),
			showPanel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				role: "listbox",
				"aria-label": "検索結果",
				className: "absolute left-0 right-0 top-12 z-50 max-h-[min(24rem,60dvh)] overflow-auto rounded-lg border border-border bg-card shadow-md",
				children: [hits.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-4 py-3 text-sm text-muted-foreground",
					children: "見つかりませんでした"
				}), hits.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: `./${h.slug}.html#${h.anchor}`,
					className: "block min-h-11 px-4 py-2.5 hover:bg-accent active:bg-accent",
					onClick: () => setOpen(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm font-medium leading-snug",
						children: h.heading
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block text-xs text-muted-foreground",
						children: [
							h.order,
							". ",
							h.chapterTitle,
							" — ",
							h.snippet
						]
					})]
				}) }, `${h.slug}-${h.anchor}-${i}`))]
			})
		]
	});
}
//#endregion
//#region src/config.ts
/** サイト名。 */
var SITE_NAME = "あかちゃんマニュアル";
/**
* 姉妹サイト shinagawa-hojokin（品川区 妊娠・出産・産後の給付・助成）の公開 URL。
* 制度・手続きの詳細への誘導リンクはすべてこの定数から出す（AC-9、1 箇所管理）。
*/
var HOJOKIN_URL = "https://TOSUKUi.github.io/shinagawa-hojokin/";
//#endregion
//#region src/components/layout/layout.tsx
/** 章チップ（ポインター環境の lg 以上のみ表示、ラップして全 9 章を見せる）。 */
function ChapterNav() {
	const currentSlug = useClientSlug();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "章 navigation",
		className: "pb-1",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "flex flex-wrap gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "./timeline.html",
				"aria-current": currentSlug === "timeline" ? "page" : void 0,
				className: ["rounded-full border px-2.5 py-1 text-xs transition-colors motion-reduce:duration-0", currentSlug === "timeline" ? "border-primary bg-primary text-primary-foreground" : "border-primary/40 bg-primary/5 text-primary hover:bg-primary/10"].join(" "),
				children: "いつ・何を買う？"
			}) }), SITE_DATA.chapters.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: chapterHref(c.slug),
				"aria-current": currentSlug === c.slug ? "page" : void 0,
				className: ["rounded-full border px-2.5 py-1 text-xs transition-colors motion-reduce:duration-0", currentSlug === c.slug ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-accent"].join(" "),
				children: [
					c.order,
					". ",
					c.title
				]
			}) }, c.slug))]
		})
	});
}
function Layout() {
	const [sheetOpen, setSheetOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto w-full max-w-3xl px-4 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "./index.html",
								className: "shrink-0 font-heading text-base font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sm:hidden",
									children: "あかちゃん"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: SITE_DATA.meta.siteName
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "min-w-0 flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSheetOpen(true),
								"aria-expanded": sheetOpen,
								"aria-controls": sheetOpen ? "chapter-sheet" : void 0,
								className: "inline-flex h-11 min-w-11 shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3 font-heading text-sm font-bold text-foreground active:bg-accent lg:hidden focus-visible:outline-2 focus-visible:outline-ring",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
									className: "size-4",
									"aria-hidden": "true"
								}), "章"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden py-2.5 lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChapterNav, {})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileChapterSheet, {
				open: sheetOpen,
				onClose: () => setSheetOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-3xl flex-1 px-4 py-6 lg:max-w-5xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackToTopButton, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-10 border-t border-border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto w-full max-w-3xl space-y-3 px-4 py-6 text-xs leading-relaxed text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-heading text-sm font-bold text-foreground",
							children: SITE_NAME
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: SITE_DATA.meta.disclaimer }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"保育料・給付・助成の申請時期や必要書類の詳細は姉妹サイト",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: HOJOKIN_URL,
								className: "underline hover:text-primary",
								children: "shinagawa-hojokin"
							}),
							" ",
							"を見てください。"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"全項目の最終確認日: ",
							SITE_DATA.meta.siteLastVerified,
							"（更新は各章ごとにその章の日にちを参照）"
						] })
					]
				})
			})
		]
	});
}
//#endregion
//#region node_modules/@base-ui/react/use-render/useRender.mjs
/**
* Renders a Base UI element.
*
* @public
*/
function useRender(params) {
	return useRenderElement(params.defaultTagName ?? "div", params, params);
}
//#endregion
//#region node_modules/class-variance-authority/dist/index.mjs
/**
* Copyright 2022 Joe Bell. All rights reserved.
*
* This file is licensed to you under the Apache License, Version 2.0
* (the "License"); you may not use this file except in compliance with the
* License. You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
* WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the
* License for the specific language governing permissions and limitations under
* the License.
*/ var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
var cx = clsx;
var cva = (base, config) => (props) => {
	var _config_compoundVariants;
	if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
	const { variants, defaultVariants } = config;
	const getVariantClassNames = Object.keys(variants).map((variant) => {
		const variantProp = props === null || props === void 0 ? void 0 : props[variant];
		const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
		if (variantProp === null) return null;
		const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
		return variants[variant][variantKey];
	});
	const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
		let [key, value] = param;
		if (value === void 0) return acc;
		acc[key] = value;
		return acc;
	}, {});
	return cx(base, getVariantClassNames, config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
		let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
		return Object.entries(compoundVariantOptions).every((param) => {
			let [key, value] = param;
			return Array.isArray(value) ? value.includes({
				...defaultVariants,
				...propsWithoutUndefined
			}[key]) : {
				...defaultVariants,
				...propsWithoutUndefined
			}[key] === value;
		}) ? [
			...acc,
			cvClass,
			cvClassName
		] : acc;
	}, []), props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
//#endregion
//#region src/components/ui/badge.tsx
var badgeVariants = cva("group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!", {
	variants: { variant: {
		default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
		secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
		destructive: "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
		outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
		ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
		link: "text-primary underline-offset-4 hover:underline"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant = "default", render, ...props }) {
	return useRender({
		defaultTagName: "span",
		props: mergeProps({ className: cn(badgeVariants({ variant }), className) }, props),
		render,
		state: {
			slot: "badge",
			variant
		}
	});
}
//#endregion
//#region src/components/ui/card.tsx
function Card({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card",
		"data-size": size,
		className: cn("group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-content",
		className: cn("px-(--card-spacing)", className),
		...props
	});
}
//#endregion
//#region node_modules/@base-ui/react/separator/Separator.mjs
/**
* A separator element accessible to screen readers.
* Renders a `<div>` element.
*
* Documentation: [Base UI Separator](https://base-ui.com/react/components/separator)
*/
var Separator$1 = /*#__PURE__*/ import_react.forwardRef(function SeparatorComponent(componentProps, forwardedRef) {
	const { className, render, orientation = "horizontal", style, ...elementProps } = componentProps;
	return useRenderElement("div", componentProps, {
		state: { orientation },
		ref: forwardedRef,
		props: [{
			role: "separator",
			"aria-orientation": orientation
		}, elementProps]
	});
});
//#endregion
//#region src/components/ui/separator.tsx
function Separator({ className, orientation = "horizontal", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {
		"data-slot": "separator",
		orientation,
		className: cn("shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch", className),
		...props
	});
}
//#endregion
//#region src/generated/items-data.ts
var ITEMS_DATA = {
	"bands": [
		{
			"id": "pregnancy",
			"label": "妊娠中",
			"monthsFrom": -1,
			"monthsTo": 0,
			"intro": "退院したその日から使うものを、妊娠後期にそろえておきます。母乳・ミルク、おむつ、寝床の方針は出産後に変わることもあるので、買い込みすぎないのもコツです。",
			"caution": "月齢・サイズはあくまで目安です。衣類は実際の身長と体重、用品は製品本体の対象月齢・対象体重表示を優先してください。",
			"sources": [
				{
					"name": "品川区「妊婦のための支援給付事業について」",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/20230120091157.html",
					"checked": "2026-09-01"
				},
				{
					"name": "品川区「産後ケア事業 宿泊型」",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/20240328204508.html",
					"checked": "2026-09-01"
				},
				{
					"name": "西松屋「ベビーアイテム別準備品リスト 新生児衣料」",
					"url": "https://www.24028.jp/premama/preparation-item/newborn/",
					"checked": "2026-09-01"
				},
				{
					"name": "アカチャンホンポ「短肌着」",
					"url": "https://shop.akachan.jp/shop/c/cb065/",
					"checked": "2026-09-01"
				},
				{
					"name": "西松屋「ベビーウェア選び方・使い方ガイド」",
					"url": "https://www.24028.jp/premama/guide/babywear/",
					"checked": "2026-09-01"
				},
				{
					"name": "Amazon.co.jp 商品検索「ドレスオール 肌着 赤ちゃん」",
					"url": "https://www.amazon.co.jp/s?k=%E3%83%89%E3%83%AC%E3%82%B9%E3%82%AA%E3%83%BC%E3%83%AB%20%E8%82%8C%E7%9D%80%20%E8%B5%A4%E3%81%A1%E3%82%83%E3%82%93&language=ja_JP&currency=JPY",
					"checked": "2026-09-02"
				},
				{
					"name": "アカチャンホンポ「ガーゼ・入浴布・汗取りパット」",
					"url": "https://shop.akachan.jp/shop/c/cb071/",
					"checked": "2026-09-01"
				},
				{
					"name": "アカチャンホンポ「おくるみ」",
					"url": "https://shop.akachan.jp/shop/c/cb347/",
					"checked": "2026-09-01"
				},
				{
					"name": "こども家庭庁「赤ちゃんが安全に眠れるように」",
					"url": "https://www.cfa.go.jp/policies/boshihoken/kenkou/sids",
					"checked": "2026-08-15"
				},
				{
					"name": "西松屋「ミルク＆おむつ準備品リスト」",
					"url": "https://www.24028.jp/premama/preparation-item/milkdiapers/",
					"checked": "2026-09-01"
				},
				{
					"name": "西松屋「おむつ選び方・使い方ガイド」",
					"url": "https://www.24028.jp/premama/guide/diapers/",
					"checked": "2026-09-01"
				},
				{
					"name": "アカチャンホンポ「紙おむつ（テープタイプ）」",
					"url": "https://shop.akachan.jp/shop/c/cb327/",
					"checked": "2026-09-01"
				},
				{
					"name": "西松屋オンラインストア「紙おむつ」",
					"url": "https://www.24028-net.jp/category/EX_PAPERDIAPER/",
					"checked": "2026-09-01"
				},
				{
					"name": "西松屋オンラインストア「おしりふき」",
					"url": "https://www.24028-net.jp/category/EX_WIPE/",
					"checked": "2026-09-01"
				},
				{
					"name": "アカチャンホンポ「おしりふき」",
					"url": "https://shop.akachan.jp/shop/c/cb332/",
					"checked": "2026-09-01"
				},
				{
					"name": "西松屋「哺乳びん乳首・除菌アイテム選び方・使い方ガイド」",
					"url": "https://www.24028.jp/premama/guide/bottlenipple/",
					"checked": "2026-09-01"
				},
				{
					"name": "アカチャンホンポ「ほ乳びん・乳首」",
					"url": "https://shop.akachan.jp/shop/c/cb143/",
					"checked": "2026-09-01"
				},
				{
					"name": "アカチャンホンポ「ほ乳びん洗浄・消毒グッズ」",
					"url": "https://shop.akachan.jp/shop/c/cb146/",
					"checked": "2026-09-01"
				},
				{
					"name": "西松屋「ベビーバス選び方・使い方ガイド」",
					"url": "https://www.24028.jp/premama/guide/babybath/",
					"checked": "2026-09-01"
				},
				{
					"name": "西松屋「お風呂＆衛生グッズ準備品リスト」",
					"url": "https://www.24028.jp/premama/preparation-item/bathsanitary/",
					"checked": "2026-09-01"
				},
				{
					"name": "アカチャンホンポ「おふろグッズ」",
					"url": "https://shop.akachan.jp/shop/c/cb152/",
					"checked": "2026-09-01"
				},
				{
					"name": "西松屋オンラインストア「お風呂グッズ」",
					"url": "https://www.24028-net.jp/category/SANI_BATH/",
					"checked": "2026-09-01"
				},
				{
					"name": "西松屋「ねんねグッズ準備品リスト」",
					"url": "https://www.24028.jp/premama/preparation-item/bedding/",
					"checked": "2026-09-01"
				},
				{
					"name": "Amazon.co.jp 商品検索「簡易ベビーベッド」（3,000〜40,000円指定）",
					"url": "https://www.amazon.co.jp/s?k=%E7%B0%A1%E6%98%93%E3%83%99%E3%83%93%E3%83%BC%E3%83%99%E3%83%83%E3%83%89&language=ja_JP&currency=JPY&p_36-price-min=3000&p_36-price-max=40000",
					"checked": "2026-09-02"
				},
				{
					"name": "西松屋「チャイルドシート選び方・使い方ガイド」",
					"url": "https://www.24028.jp/premama/guide/childseat/",
					"checked": "2026-09-01"
				},
				{
					"name": "西松屋オンラインストア「ベビー＆チャイルド兼用タイプ（新生児〜4歳頃まで）」",
					"url": "https://www.24028-net.jp/category/SEAT_BABY_CHILD/",
					"checked": "2026-09-01"
				},
				{
					"name": "アカチャンホンポ「チャイルドシート」",
					"url": "https://shop.akachan.jp/shop/c/cb285/",
					"checked": "2026-09-01"
				},
				{
					"name": "西松屋「育児グッズ準備品リスト」",
					"url": "https://www.24028.jp/premama/preparation-item/childcare/",
					"checked": "2026-09-01"
				},
				{
					"name": "ピジョン「ベビーカー選び方完全ガイド」",
					"url": "https://pigeon.info/stroller/howtochoose/",
					"checked": "2026-09-01"
				},
				{
					"name": "西松屋オンラインストア「ベビーカー（A型）」",
					"url": "https://www.24028-net.jp/category/TRIP_STROLLER/",
					"checked": "2026-09-01"
				},
				{
					"name": "アカチャンホンポ「ファーストベビーカー・A型ベビーカー」",
					"url": "https://shop.akachan.jp/shop/c/cb290/",
					"checked": "2026-09-01"
				},
				{
					"name": "西松屋オンラインストア「抱っこ紐」",
					"url": "https://www.24028-net.jp/category/TRIP_BABYCARRIER/",
					"checked": "2026-09-01"
				},
				{
					"name": "アカチャンホンポ「抱っこ紐・スリング」",
					"url": "https://shop.akachan.jp/shop/c/cb288/",
					"checked": "2026-09-01"
				},
				{
					"name": "西松屋オンラインストア 検索「授乳クッション」",
					"url": "https://www.24028-net.jp/item_list.html?searchbox=1&q=%E6%8E%88%E4%B9%B3%E3%82%AF%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3",
					"checked": "2026-09-02"
				},
				{
					"name": "アカチャンホンポ「抱き枕・授乳クッション」",
					"url": "https://shop.akachan.jp/shop/c/cb028/",
					"checked": "2026-09-01"
				}
			],
			"support": [{
				"id": "shinpu-kyufu-5man",
				"title": "妊婦のための支援給付金（妊娠時）5万円",
				"detail": "令和7年4月1日以降に妊娠届出と妊婦給付認定の申請をし、助産師・保健師等の面談を受けると給付されます。申請期限は胎児の心拍が確認されてから2年間。区が配布する案内の二次元コードから申請します。",
				"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/20230120091157.html"
			}, {
				"id": "sango-care-mendan",
				"title": "妊娠期面談で産後ケアも事前に申し込める",
				"detail": "品川区の産後ケア（宿泊型・訪問型）は、妊娠期の1回目面談または出産準備個別相談で申請できます。里帰りや体調に不安がある人は、生まれる前に予定を押さえておくと安心です。",
				"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/20240328204508.html"
			}],
			"items": [
				{
					"id": "pre-tan-hadagi",
					"name": "短肌着",
					"category": "kiru",
					"need": "must",
					"startMonth": -1,
					"note": "退院した日から使ういちばん下の肌着。着替えとおむつ替えの回数が多いので、洗濯中の替えを含めてそろえます。",
					"whySources": ["https://www.24028.jp/premama/preparation-item/newborn/"],
					"shops": [{
						"kind": "nishimatyaya",
						"q": "短肌着"
					}, {
						"kind": "akachan",
						"q": "短肌着"
					}],
					"endMonth": 3,
					"size": "50cm／5〜6枚（西松屋の目安）",
					"price": {
						"low": 1749,
						"high": 2189,
						"unit": "2枚組（税込）",
						"sources": ["https://shop.akachan.jp/shop/c/cb065/"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "pre-combi-hadagi",
					"name": "コンビ肌着",
					"category": "kiru",
					"need": "must",
					"startMonth": -1,
					"note": "短肌着の上に着る肌着。足を動かすようになるとカバーオール代わりにもの使えます。",
					"whySources": ["https://www.24028.jp/premama/preparation-item/newborn/", "https://www.24028.jp/premama/guide/babywear/"],
					"shops": [{
						"kind": "nishimatyaya",
						"q": "コンビ肌着"
					}, {
						"kind": "akachan",
						"q": "コンビ肌着"
					}],
					"endMonth": 6,
					"size": "50〜60cm／5〜6枚（西松屋の目安）",
					"price": {
						"low": 2189,
						"high": 3069,
						"unit": "2枚組（税込）",
						"sources": ["https://shop.akachan.jp/shop/c/cb065/"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "pre-dress-all",
					"name": "ドレスオール（コンビドレス）",
					"category": "kiru",
					"need": "must",
					"startMonth": -1,
					"note": "新生児〜3か月前後のころ合い（退院着にも）。前開きで着脱がラクで、肌着1枚＋これ1枚で調節できます。1着2,051〜4,290円程度（調査時点のAmazon検索の実売）（目安 2〜3着）",
					"whySources": ["https://www.24028.jp/premama/preparation-item/newborn/"],
					"shops": [{
						"kind": "nishimatyaya",
						"q": "ドレスオール"
					}, {
						"kind": "uniqlo",
						"q": "ベビー ドレスオール"
					}],
					"endMonth": 6,
					"size": "50〜60cm／3〜5枚（西松屋の目安）",
					"price": {
						"low": 2051,
						"high": 4290,
						"unit": "1着",
						"sources": ["https://www.amazon.co.jp/s?k=%E3%83%89%E3%83%AC%E3%82%B9%E3%82%AA%E3%83%BC%E3%83%AB%20%E8%82%8C%E7%9D%80%20%E8%B5%A4%E3%81%A1%E3%82%83%E3%82%93&language=ja_JP&currency=JPY"],
						"checked": "2026-09-02"
					}
				},
				{
					"id": "pre-gauze",
					"name": "ガーゼハンカチ",
					"category": "arau",
					"need": "must",
					"startMonth": -1,
					"note": "授乳・沐浴・汗や口のまわりの拭き取りまで、1日何枚も使う多目的用品。枚数で買うと1枚単価が大きく下がります。",
					"whySources": ["https://www.24028.jp/premama/preparation-item/newborn/"],
					"shops": [{
						"kind": "nishimatyaya",
						"q": "ガーゼハンカチ"
					}, {
						"kind": "akachan",
						"q": "ガーゼハンカチ"
					}],
					"endMonth": 24,
					"size": "10〜20枚（西松屋の目安）",
					"price": {
						"low": 416,
						"high": 1419,
						"unit": "5枚組（税込）",
						"sources": ["https://shop.akachan.jp/shop/c/cb071/"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "pre-okurumi",
					"name": "おくるみ",
					"category": "neru",
					"need": "useful",
					"startMonth": -1,
					"note": "出生直後の包み、チャイルドシートやベビーカーでの掛け代わりに。睡眠中は寝床に物を入れない安全案内が基本なので、掛け布団の代わりにする場合は着衣と室温で調整します。",
					"whySources": ["https://shop.akachan.jp/shop/c/cb347/", "https://www.cfa.go.jp/policies/boshihoken/kenkou/sids"],
					"shops": [{
						"kind": "nishimatyaya",
						"q": "おくるみ"
					}, {
						"kind": "akachan",
						"q": "おくるみ"
					}],
					"endMonth": 6,
					"size": "1〜2枚",
					"price": {
						"low": 1648,
						"high": 3839,
						"unit": "1枚（税込）",
						"sources": ["https://shop.akachan.jp/shop/c/cb347/"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "pre-diaper-newborn",
					"name": "紙おむつ（新生児サイズ）",
					"category": "arau",
					"need": "must",
					"startMonth": -1,
					"note": "退院後すぐに使う消耗品。体重とフィット感を見てSサイズへ切り替えます。サイズ区分はメーカーごとに違うので袋の表示を確認します。",
					"whySources": ["https://www.24028.jp/premama/preparation-item/milkdiapers/", "https://www.24028.jp/premama/guide/diapers/"],
					"shops": [
						{
							"kind": "amazon",
							"q": "紙おむつ 新生児"
						},
						{
							"kind": "rakuten",
							"q": "紙おむつ 新生児 まとめ買い"
						},
						{
							"kind": "akachan",
							"q": "紙おむつ 新生児"
						}
					],
					"endMonth": 2,
					"size": "まず1パックから。新生児サイズは買い置きしすぎない",
					"price": {
						"low": 2178,
						"high": 6152,
						"unit": "1パック〜ケース（枚数差に注意・税込）",
						"sources": ["https://shop.akachan.jp/shop/c/cb327/", "https://www.24028-net.jp/category/EX_PAPERDIAPER/"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "pre-oshiri-fuki",
					"name": "おしりふき",
					"category": "arau",
					"need": "must",
					"startMonth": -1,
					"note": "おむつ替えのたびに使う消耗品。ケース買いが1枚単価では安くつきますが、置き場所は確保しておきます。",
					"whySources": ["https://www.24028.jp/premama/preparation-item/milkdiapers/"],
					"shops": [
						{
							"kind": "amazon",
							"q": "ベビー用 おしりふき"
						},
						{
							"kind": "rakuten",
							"q": "おしりふき ケース買い"
						},
						{
							"kind": "nishimatyaya",
							"q": "おしりふき"
						}
					],
					"endMonth": 18,
					"size": "5〜6個（西松屋の目安）",
					"price": {
						"low": 196,
						"high": 3839,
						"unit": "1個〜ケース（税込）",
						"sources": ["https://www.24028-net.jp/category/EX_WIPE/", "https://shop.akachan.jp/shop/c/cb332/"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "pre-bottle",
					"name": "哺乳びん・乳首",
					"category": "tabe",
					"need": "must",
					"startMonth": -1,
					"note": "母乳中心でも、搾乳・混合栄養・一時的なミルクの出番に備えて最小限だけ準備します。乳首は2個以上を交互に使う案内です。",
					"whySources": ["https://www.24028.jp/premama/preparation-item/milkdiapers/", "https://www.24028.jp/premama/guide/bottlenipple/"],
					"shops": [{
						"kind": "nishimatyaya",
						"q": "哺乳瓶"
					}, {
						"kind": "akachan",
						"q": "哺乳びん"
					}],
					"endMonth": 18,
					"size": "哺乳びん2〜3本、乳首3〜5個（西松屋の目安）",
					"price": {
						"low": 658,
						"high": 4488,
						"unit": "1本（税込）",
						"sources": ["https://shop.akachan.jp/shop/c/cb143/"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "pre-bottle-sterilize",
					"name": "哺乳びんの洗浄・除菌用品",
					"category": "tabe",
					"need": "must",
					"startMonth": -1,
					"note": "使ったその場で洗う動線を退院前に作っておくと、出産後に困りません。煮沸・薬液・スチームは製品の説明書に従います。",
					"whySources": ["https://www.24028.jp/premama/preparation-item/milkdiapers/", "https://www.24028.jp/premama/guide/bottlenipple/"],
					"shops": [{
						"kind": "nishimatyaya",
						"q": "哺乳瓶 消毒"
					}, {
						"kind": "rakuten",
						"q": "哺乳瓶 除菌"
					}],
					"endMonth": 12,
					"size": "洗剤1個・ブラシ1本・除菌用品1セット",
					"price": {
						"low": 328,
						"high": 3608,
						"unit": "1点（税込）",
						"sources": ["https://shop.akachan.jp/shop/c/cb146/"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "pre-mokuyoku-set",
					"name": "沐浴セット（ベビーバス・湯温計・ベビーソープ）",
					"category": "arau",
					"need": "must",
					"startMonth": -1,
					"note": "退院した日から沐浴が始まります。西松屋の案内では湯温37〜40度、湯につかる時間5〜7分が目安。詳細は産院の指示を優先します。",
					"whySources": ["https://www.24028.jp/premama/guide/babybath/", "https://www.24028.jp/premama/preparation-item/bathsanitary/"],
					"shops": [{
						"kind": "nishimatyaya",
						"q": "ベビーバス"
					}, {
						"kind": "akachan",
						"q": "沐浴セット"
					}],
					"endMonth": 1,
					"size": "ベビーバス1個、湯温計1個、浴用ガーゼ2〜3枚、湯上りタオル2〜3枚、ベビーソープ1個",
					"price": {
						"low": 1408,
						"high": 5049,
						"unit": "浴用品1点（税込）",
						"sources": ["https://shop.akachan.jp/shop/c/cb152/", "https://www.24028-net.jp/category/SANI_BATH/"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "pre-sleep-place",
					"name": "ベビーベッド／赤ちゃん専用の寝床",
					"category": "neru",
					"need": "useful",
					"startMonth": -1,
					"note": "大人と別で寝る場所を確保できるかどうかで必要度が分かれます。必要なら購入よりレンタル（家具一式プラン）のほうが安く、処分も不要。購入する場合は簡易ベッドで実売3,000〜1万9,200円程度、ベビー布団セットは3,000円台からあります（調査日 2026-09-02・目安 1台またはレンタル）",
					"whySources": ["https://www.24028.jp/premama/preparation-item/bedding/", "https://www.cfa.go.jp/policies/boshihoken/kenkou/sids"],
					"shops": [{
						"kind": "nishimatyaya",
						"q": "ベビーベッド"
					}, {
						"kind": "akachan",
						"q": "ベビーベッド"
					}],
					"endMonth": 18,
					"size": "ベビーベッド1台、固わた敷布団1枚、フィッティングシーツ2〜3枚、防水シーツ2〜3枚",
					"price": {
						"low": 3e3,
						"high": 19200,
						"unit": "簡易ベッド1台",
						"sources": ["https://www.amazon.co.jp/s?k=%E7%B0%A1%E6%98%93%E3%83%99%E3%83%93%E3%83%BC%E3%83%99%E3%83%83%E3%83%89&language=ja_JP&currency=JPY&p_36-price-min=3000&p_36-price-max=40000"],
						"checked": "2026-09-02"
					}
				},
				{
					"id": "pre-child-seat",
					"name": "チャイルドシート",
					"category": "ugoku",
					"need": "must",
					"startMonth": -1,
					"note": "自家用車で退院するなら出生直後から必要です。6歳未満の使用が義務として案内されています。新生児は原則後ろ向き、R129製品は生後15か月未満を後ろ向きとします。",
					"whySources": ["https://www.24028.jp/premama/guide/childseat/"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "チャイルドシート"
						},
						{
							"kind": "akachan",
							"q": "チャイルドシート"
						},
						{
							"kind": "rakuten",
							"q": "チャイルドシート 新生児"
						}
					],
					"endMonth": 84,
					"size": "新生児から使える製品を1台。車種適合と固定方法（ISOFIXまたはシートベルト）を事前確認",
					"price": {
						"low": 15178,
						"high": 86900,
						"unit": "1台（税込・新品）",
						"sources": ["https://www.24028-net.jp/category/SEAT_BABY_CHILD/", "https://shop.akachan.jp/shop/c/cb285/"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "pre-a-stroller",
					"name": "A型ベビーカー",
					"category": "ugoku",
					"need": "useful",
					"startMonth": -1,
					"note": "産後1か月頃からの外出に備えます。新生児期から使えるかは製品の対象月齢を確認します（ピジョンはA形を生後1か月〜36か月の例として案内）。",
					"whySources": ["https://www.24028.jp/premama/preparation-item/childcare/", "https://pigeon.info/stroller/howtochoose/"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "A型 ベビーカー"
						},
						{
							"kind": "akachan",
							"q": "A型ベビーカー"
						},
						{
							"kind": "rakuten",
							"q": "A型 ベビーカー"
						}
					],
					"endMonth": 6,
					"size": "1台。自宅周辺の階段・車・公共交通機関の利用状況で要否的判断",
					"price": {
						"low": 19798,
						"high": 84700,
						"unit": "1台（税込・新品）",
						"sources": ["https://www.24028-net.jp/category/TRIP_STROLLER/", "https://shop.akachan.jp/shop/c/cb290/"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "pre-baby-holder",
					"name": "抱っこひも・スリング",
					"category": "ugoku",
					"need": "must",
					"startMonth": -1,
					"note": "ベビーカーが使いにくい場所や短い移動で使います。新生児から使えるかは製品差が大きいので、姿勢・体重・月齢表示を守ります。",
					"whySources": ["https://www.24028.jp/premama/preparation-item/childcare/"],
					"shops": [{
						"kind": "nishimatyaya",
						"q": "抱っこ紐"
					}, {
						"kind": "akachan",
						"q": "抱っこ紐"
					}],
					"endMonth": 24,
					"size": "腰ベルト型抱っこひも1個、スリング1個（西松屋の目安）",
					"price": {
						"low": 3848,
						"high": 49500,
						"unit": "1点（税込）",
						"sources": ["https://www.24028-net.jp/category/TRIP_BABYCARRIER/", "https://shop.akachan.jp/shop/c/cb288/"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "pre-health-tools",
					"name": "体温計・爪切り・綿棒などのケア用品",
					"category": "karada",
					"need": "must",
					"startMonth": -1,
					"note": "退院直後に「買ってよかった」と慌てないよう、使う場所を決めておきます。鼻水吸引は無理に使わず、必要時は医療機関に相談します。",
					"whySources": ["https://www.24028.jp/premama/preparation-item/bathsanitary/"],
					"shops": [{
						"kind": "nishimatyaya",
						"q": "ベビー 体温計"
					}, {
						"kind": "akachan",
						"q": "ベビー 爪切り"
					}],
					"endMonth": 24,
					"size": "体温計1個、爪切りはさみ1個、綿棒1パック、保湿ローション1本、鼻水取り器1個"
				},
				{
					"id": "pre-nursing-cushion",
					"name": "授乳クッション",
					"category": "tabe",
					"need": "useful",
					"startMonth": -1,
					"note": "授乳の姿勢を支える用品で、必要さは家庭の方針で分かれます。カバーが洗えるかなども含めて選びます。",
					"whySources": ["https://www.24028-net.jp/item_list.html?searchbox=1&q=%E6%8E%88%E4%B9%B3%E3%82%AF%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3", "https://shop.akachan.jp/shop/c/cb028/"],
					"shops": [{
						"kind": "nishimatyaya",
						"q": "授乳クッション"
					}, {
						"kind": "akachan",
						"q": "授乳クッション"
					}],
					"endMonth": 6,
					"size": "1個",
					"price": {
						"low": 1699,
						"high": 13200,
						"unit": "1個（税込）",
						"sources": ["https://shop.akachan.jp/shop/c/cb028/"],
						"checked": "2026-09-01"
					}
				}
			],
			"fileName": "00-pregnancy.md"
		},
		{
			"id": "newborn",
			"label": "新生児（0〜1か月）",
			"monthsFrom": 0,
			"monthsTo": 1,
			"intro": "退院してからの1か月は、授乳とおむつ替えで1日が埋まります。妊娠中にそろえたもので足りるため、この時期に新しく買うのは「使って分かった不足分」だけ。退院後に不足へ気づいてから買い足しても間に合うので、買い置きは最小限にします。",
			"caution": "沐浴は石けんを泡立てて手早く。体についた石けんはシャワーで流し、湯船の湯を顔にかけるのはやめましょう（ピジョン）。沐浴剤を湯に入れる方法もあります。母乳パッドや保湿剤は消耗が続くので、合わなければやめられるよう、最初は小さい袋で試します。",
			"sources": [
				{
					"name": "品川区 すくすく赤ちゃん訪問事業",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/hpg000022461.html",
					"checked": "2026-09-02"
				},
				{
					"name": "品川区 電話授乳相談",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/hpg000033270.html",
					"checked": "2026-09-02"
				},
				{
					"name": "品川区 産後ケア事業（訪問型）",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/20240328204226.html",
					"checked": "2026-09-02"
				},
				{
					"name": "ピジョン はじめての育児 新生児〜ねんねの頃（0〜2か月）",
					"url": "https://pigeon.info/growth/baby0-2months.html",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「母乳パッド」",
					"url": "https://www.amazon.co.jp/s?k=%E6%AF%8D%E4%B9%B3%E3%83%91%E3%83%83%E3%83%89",
					"checked": "2026-09-01"
				},
				{
					"name": "Amazon.co.jp 検索「母乳ポンプ」",
					"url": "https://www.amazon.co.jp/s?k=%E6%AF%8D%E4%B9%B3%E3%83%9D%E3%83%B3%E3%83%97",
					"checked": "2026-09-01"
				},
				{
					"name": "Amazon.co.jp 検索「ベビーローション 新生児」",
					"url": "https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%83%AD%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%20%E6%96%B0%E7%94%9F%E5%85%90",
					"checked": "2026-09-01"
				},
				{
					"name": "環境省 WBGT 公開ページ（熱中症予防情報）",
					"url": "https://www.wbgt.env.go.jp/",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「温湿度計 子供 部屋」",
					"url": "https://www.amazon.co.jp/s?k=%E6%B8%A9%E6%B9%BF%E5%BA%A6%E8%A8%88%20%E5%AD%90%E4%BE%9B%20%E9%83%A8%E5%B1%8B",
					"checked": "2026-09-01"
				},
				{
					"name": "Amazon.co.jp 検索「ベビー 日焼け止め 0か月」",
					"url": "https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%20%E6%97%A5%E7%84%BC%E3%81%91%E6%AD%A2%E3%82%81%200%E3%81%8B%E6%9C%88",
					"checked": "2026-09-01"
				}
			],
			"support": [
				{
					"id": "sukurabu-shiho",
					"title": "すくすく赤ちゃん訪問",
					"detail": "助産師または保健師が生後4か月になる前までのご家庭を訪問し、発育測定・母乳相談・子育ての心配事を聞いてくれます。訪問を希望する場合は区のこども家庭庁の窓口へ連絡します。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/hpg000022461.html"
				},
				{
					"id": "denwa-nyunyu",
					"title": "電話授乳相談",
					"detail": "授乳やミルクの量、混合育児の進め方など、対面になりにくい内容を電話で相談できます。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/hpg000033270.html"
				},
				{
					"id": "sangon-seika-homomon",
					"title": "産後ケア（訪問型）",
					"detail": "産後1年未満（多胎育児は2年未満）が対象。助産師らが自宅を訪問し、授乳介助・沐浴・家事の手伝いをします。品川区の委託事業は妊娠期の面談時に申請します。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/20240328204226.html"
				}
			],
			"items": [
				{
					"id": "nb-nursing-pad",
					"name": "母乳パッド",
					"category": "karada",
					"need": "must",
					"startMonth": 0,
					"note": "母乳が漏れて下着を濡らすために使う、授乳期の消耗品。使い捨ては取り替えるだけ、布は洗って繰り返使えます。産院で処方・販売されることがあるので、退院前に数量を聞いておくと重複して買いません。",
					"whySources": ["https://pigeon.info/growth/baby0-2months.html"],
					"shops": [
						{
							"kind": "amazon",
							"q": "母乳パッド"
						},
						{
							"kind": "rakuten",
							"q": "母乳パッド"
						},
						{
							"kind": "nishimatyaya",
							"q": "母乳パッド"
						},
						{
							"kind": "akachan",
							"q": "母乳パッド"
						}
					],
					"endMonth": 12,
					"price": {
						"low": 850,
						"high": 1800,
						"unit": "使い捨て1パック（100枚前後）",
						"sources": ["https://www.amazon.co.jp/s?k=%E6%AF%8D%E4%B9%B3%E3%83%91%E3%83%83%E3%83%89"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "nb-breast-pump",
					"name": "さく乳器（手動・電動）",
					"category": "karada",
					"need": "useful",
					"startMonth": 0,
					"note": "母乳の張りが強いときや、搾った母乳を保存しておきたいときに使います。搾乳の必要度は人によって差が大きいので、頻繁に搾る予定がない場合は手動から。手動は1,500〜4,000円、電動は1〜2万円台です。",
					"whySources": ["https://pigeon.info/growth/baby0-2months.html"],
					"shops": [
						{
							"kind": "amazon",
							"q": "母乳ポンプ"
						},
						{
							"kind": "rakuten",
							"q": "さく乳器"
						},
						{
							"kind": "akachan",
							"q": "さく乳器"
						}
					],
					"endMonth": 24,
					"price": {
						"low": 1400,
						"high": 4e3,
						"unit": "手動1台（電動は1〜2万円台）",
						"sources": ["https://www.amazon.co.jp/s?k=%E6%AF%8D%E4%B9%B3%E3%83%9D%E3%83%B3%E3%83%97"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "nb-baby-lotion",
					"name": "赤ちゃん用の保湿剤",
					"category": "karada",
					"need": "must",
					"startMonth": 0,
					"note": "沐浴後に使う保湿ローション。新生児のころからのスキンケアが案内されています。低刺激・無香料タイプが1本880〜2,000円（300ml前後）。合う・合わないがあるので、まずは小さいサイズから試します。",
					"whySources": ["https://pigeon.info/growth/baby0-2months.html"],
					"shops": [
						{
							"kind": "amazon",
							"q": "ベビーローション 新生児"
						},
						{
							"kind": "rakuten",
							"q": "ベビーローション"
						},
						{
							"kind": "nishimatyaya",
							"q": "ベビーローション"
						}
					],
					"endMonth": 24,
					"price": {
						"low": 880,
						"high": 2e3,
						"unit": "1本（300ml前後）",
						"sources": ["https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%83%AD%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%20%E6%96%B0%E7%94%9F%E5%85%90"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "nb-room-thermo",
					"name": "温湿度計",
					"category": "karada",
					"need": "useful",
					"startMonth": 0,
					"note": "冷暖房を効かせる部屋でも、数字で確認する習慣があると判断が早くなります。夏季は外の暑さもあわせて判断します（環境省の熱中症予防情報サイトで品川の数値が見られます）。",
					"whySources": ["https://pigeon.info/growth/baby0-2months.html", "https://www.wbgt.env.go.jp/"],
					"shops": [{
						"kind": "amazon",
						"q": "温湿度計 子供 部屋"
					}, {
						"kind": "rakuten",
						"q": "温湿度計"
					}],
					"endMonth": 24,
					"price": {
						"low": 700,
						"high": 1600,
						"unit": "1個",
						"sources": ["https://www.amazon.co.jp/s?k=%E6%B8%A9%E6%B9%BF%E5%BA%A6%E8%A8%88%20%E5%AD%90%E4%BE%9B%20%E9%83%A8%E5%B1%8B"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "nb-baby-uv",
					"name": "ベビー用日焼け止め",
					"category": "karada",
					"need": "useful",
					"startMonth": 0,
					"note": "0か月から使える紫外線対策用品が用意されています。石けんで落ちるタイプが一般的。帽子とあわせて、外出の頻度を見てからで間に合います。",
					"whySources": ["https://pigeon.info/growth/baby0-2months.html"],
					"shops": [
						{
							"kind": "amazon",
							"q": "ベビー 日焼け止め 0か月"
						},
						{
							"kind": "rakuten",
							"q": "ベビー 日焼け止め"
						},
						{
							"kind": "akachan",
							"q": "ベビー 日焼け止め"
						}
					],
					"endMonth": 36,
					"price": {
						"low": 1e3,
						"high": 2700,
						"unit": "1本",
						"sources": ["https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%20%E6%97%A5%E7%84%BC%E3%81%91%E6%AD%A2%E3%82%81%200%E3%81%8B%E6%9C%88"],
						"checked": "2026-09-01"
					}
				}
			],
			"fileName": "01-newborn.md"
		},
		{
			"id": "m2-3",
			"label": "2〜3か月",
			"monthsFrom": 2,
			"monthsTo": 3,
			"intro": "首がすわる前で、外出は抱っこ中心の時期です。妊娠中にそろえたベビーカー・抱っこひもを使い始める一方で、新しく買うものは外出の小物が中心。生後2か月から予防接種が始まり、小児科へ行く回数が急に増えます。",
			"caution": "抱っこひもは、首すわり前でも使える対象月齢・体格のものを選び、装着は製品ごとの動画や説明書どおりに。顔が布に埋もれない、あごが上がらない姿勢が原則です。夏季はベビーカー内が熱中症の危険な暑さになりやすいと環境省が注意を呼びかけています。日陰・こまめな水分補給とあわせて、温度を上げすぎない工夫を。",
			"sources": [
				{
					"name": "品川区 こどもの予防接種",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000033448.html",
					"checked": "2026-09-02"
				},
				{
					"name": "品川区 乳幼児の健康診査・相談",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html",
					"checked": "2026-09-02"
				},
				{
					"name": "品川区 オアシスルーム（ポップンルーム）",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/oashisuroom/hpg000033303.html",
					"checked": "2026-09-02"
				},
				{
					"name": "ピジョン はじめての育児 首がすわってくる頃（3〜4か月）",
					"url": "https://pigeon.info/growth/baby3-4months.html",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「スタイ 赤ちゃん 6枚」",
					"url": "https://www.amazon.co.jp/s?k=%E3%82%B9%E3%82%BF%E3%82%A4%20%E8%B5%A4%E3%81%A1%E3%82%83%E3%82%93%206%E6%9E%9A",
					"checked": "2026-09-01"
				},
				{
					"name": "ピジョン はじめての育児 新生児〜ねんねの頃（0〜2か月）",
					"url": "https://pigeon.info/growth/baby0-2months.html",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「ベビーメリー 音楽」",
					"url": "https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%83%A1%E3%83%AA%E3%83%BC%20%E9%9F%B3%E6%A5%BD",
					"checked": "2026-09-01"
				},
				{
					"name": "Amazon.co.jp 検索「哺乳びんケース 外出」",
					"url": "https://www.amazon.co.jp/s?k=%E5%93%BA%E4%B9%B3%E3%81%B3%E3%82%93%E3%82%B1%E3%83%BC%E3%82%B9%20%E5%A4%96%E5%87%BA",
					"checked": "2026-09-01"
				},
				{
					"name": "ピジョン ベビーカーの選び方（A型・B型）",
					"url": "https://pigeon.info/stroller/howtochoose/",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「ベビーカー レインカバー」",
					"url": "https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%82%AB%E3%83%BC%20%E3%83%AC%E3%82%A4%E3%83%B3%E3%82%AB%E3%83%90%E3%83%BC",
					"checked": "2026-09-01"
				}
			],
			"support": [
				{
					"id": "yobou-suii",
					"title": "予防接種のスケジュール確認",
					"detail": "生後2か月から始まる定期予防接種（ヒブ・小児用肺炎球菌・B型肝炎・四種混合・ロタウイルスなど）は、品川区のページに月齢別の標準的なスケジュールが載っています。同時接種の相談は小児科で受けます。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000033448.html"
				},
				{
					"id": "nyuuyouji-kenshin",
					"title": "乳幼児の健康診査・相談",
					"detail": "1〜2か月児相談（対象は生後28日を経過した翌日から生後3か月に達する日の前日）など、区の健診・相談事業の一覧です。予約制のものと当日受付のものがあります。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"
				},
				{
					"id": "oasis",
					"title": "オアシスルーム（ポップンルーム）",
					"detail": "就学前の乳幼児を一時的に預けられる区の施設。買い物や体調回復の利用ができ、利用には申請と抽選があります。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/oashisuroom/hpg000033303.html"
				}
			],
			"items": [
				{
					"id": "m23-bib",
					"name": "よだれかけ・スタイ",
					"category": "kiru",
					"need": "useful",
					"startMonth": 2,
					"note": "生後2〜3か月頃からよだれが増え、服の襟元が濡れるようになります。服を洗い替えるよりスタイを回す方が洗濯が減ります。6枚セットで1,300〜2,300円が目安。洗濯しやすいガーゼ生地と、よだれを通しにくい防水タイプがあります。",
					"whySources": ["https://pigeon.info/growth/baby3-4months.html"],
					"shops": [
						{
							"kind": "amazon",
							"q": "スタイ 赤ちゃん 6枚"
						},
						{
							"kind": "rakuten",
							"q": "スタイ 赤ちゃん"
						},
						{
							"kind": "nishimatyaya",
							"q": "スタイ"
						},
						{
							"kind": "akachan",
							"q": "スタイ"
						}
					],
					"endMonth": 12,
					"price": {
						"low": 1300,
						"high": 2300,
						"unit": "6枚セット",
						"sources": ["https://www.amazon.co.jp/s?k=%E3%82%B9%E3%82%BF%E3%82%A4%20%E8%B5%A4%E3%81%A1%E3%82%83%E3%82%93%206%E6%9E%9A"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "m23-mobile",
					"name": "ベビーメリー・オルゴール",
					"category": "asobi",
					"need": "useful",
					"startMonth": 2,
					"note": "ベッドの側に取り付ける、音と光がなるおもちゃ。ねんねの時間の手遊びに使えます。生後2〜3か月の視力では近い位置の動くものを追うため、取り付け位置は寝具から手の届かない位置にします。",
					"whySources": ["https://pigeon.info/growth/baby0-2months.html"],
					"shops": [
						{
							"kind": "amazon",
							"q": "ベビーメリー 音楽"
						},
						{
							"kind": "rakuten",
							"q": "ベビーメリー"
						},
						{
							"kind": "akachan",
							"q": "メリー"
						}
					],
					"endMonth": 8,
					"price": {
						"low": 2700,
						"high": 5e3,
						"unit": "1台",
						"sources": ["https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%83%A1%E3%83%AA%E3%83%BC%20%E9%9F%B3%E6%A5%BD"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "m23-outing-case",
					"name": "外出用 哺乳びんケース・ポーチ",
					"category": "tabe",
					"need": "useful",
					"startMonth": 2,
					"note": "予防接種と健診で小児科に行くようになり、哺乳びん・粉ミルク・着替えをまとめて持つ必要が出ます。保温・保冷できるタイプと、軽いだけでいいタイプに分かれます。",
					"whySources": ["https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000033448.html"],
					"shops": [{
						"kind": "amazon",
						"q": "哺乳びんケース 外出"
					}, {
						"kind": "rakuten",
						"q": "哺乳瓶ケース 外出"
					}],
					"endMonth": 18,
					"price": {
						"low": 1300,
						"high": 2200,
						"unit": "1個",
						"sources": ["https://www.amazon.co.jp/s?k=%E5%93%BA%E4%B9%B3%E3%81%B3%E3%82%93%E3%82%B1%E3%83%BC%E3%82%B9%20%E5%A4%96%E5%87%BA"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "m23-raincover",
					"name": "ベビーカー用レインカバー",
					"category": "ugoku",
					"need": "useful",
					"startMonth": 2,
					"note": "雨の日や強風の日のお出かけに。ベビーカーのメーカー・形で適合が変わるので、購入前に取り付けられる型号を本体の表記と照合します。汎用型で800円前後、専用品で3,000円前後です。",
					"whySources": ["https://pigeon.info/stroller/howtochoose/"],
					"shops": [
						{
							"kind": "amazon",
							"q": "ベビーカー レインカバー"
						},
						{
							"kind": "rakuten",
							"q": "ベビーカー レインカバー"
						},
						{
							"kind": "akachan",
							"q": "レインカバー"
						}
					],
					"endMonth": 36,
					"price": {
						"low": 800,
						"high": 3600,
						"unit": "1枚",
						"sources": ["https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%82%AB%E3%83%BC%20%E3%83%AC%E3%82%A4%E3%83%B3%E3%82%AB%E3%83%90%E3%83%BC"],
						"checked": "2026-09-01"
					}
				}
			],
			"fileName": "02-m2-3.md"
		},
		{
			"id": "m4-6",
			"label": "4〜6か月",
			"monthsFrom": 4,
			"monthsTo": 6,
			"intro": "首がすわり、体の動きが活発になる時期です。品川区の4か月児健診で発育を確認し、離乳食の進め方も相談できます。離乳食は5〜6か月頃からが目安で、始めるのは「首がすわっている」「食べ物の興味を示している」「スプーンを口に入れても押し出さない」などのサインが出てからで十分です。",
			"caution": "離乳食は始めさせようとするより、子どもの準備ができてから始めます。1さじから始め、初めての食材は平日の昼間に、授乳や医療機関の相談ができる時間帯に与えてください。ハイチェア・ベビーラックは対象月齢と体重、ベルトの使用を守ります。目を離すと転落・ずり落ちの事故につながるため、必ずそばにいてください（製品事故情報はNITEで確認できます）。",
			"sources": [
				{
					"name": "品川区 乳幼児の健康診査・相談",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html",
					"checked": "2026-09-02"
				},
				{
					"name": "品川区 動画で見る「離乳食」",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-kateisoudan/hpg000010365.html",
					"checked": "2026-09-02"
				},
				{
					"name": "品川区 電話授乳相談",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/hpg000033270.html",
					"checked": "2026-09-02"
				},
				{
					"name": "https://www.pigeon.info/baby/getsurei/getsurei-8.html",
					"url": "https://www.pigeon.info/baby/getsurei/getsurei-8.html",
					"checked": "2026-09-02"
				},
				{
					"name": "https://www.24028.jp/premama/guide/chair/",
					"url": "https://www.24028.jp/premama/guide/chair/",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「ハイチェア ベビー」",
					"url": "https://www.amazon.co.jp/s?k=%E3%83%8F%E3%82%A4%E3%83%81%E3%82%A7%E3%82%A2%20%E3%83%99%E3%83%93%E3%83%BC",
					"checked": "2026-09-01"
				},
				{
					"name": "ピジョン 離乳食の進め方",
					"url": "https://www.pigeon.info/baby-feeding/",
					"checked": "2026-09-02"
				},
				{
					"name": "https://www.24028.jp/premama/guide/tableware/",
					"url": "https://www.24028.jp/premama/guide/tableware/",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「ベビー 食器セット」",
					"url": "https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%20%E9%A3%9F%E5%99%A8%E3%82%BB%E3%83%83%E3%83%88",
					"checked": "2026-09-01"
				},
				{
					"name": "ピジョン はじめての育児 生後5か月の発達・成長",
					"url": "https://www.pigeon.info/baby/getsurei/getsurei-5.html",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「防水シーツ ベビー」",
					"url": "https://www.amazon.co.jp/s?k=%E9%98%B2%E6%B0%B4%E3%82%B7%E3%83%BC%E3%83%84%20%E3%83%99%E3%83%93%E3%83%BC",
					"checked": "2026-09-01"
				},
				{
					"name": "Amazon.co.jp 検索「歯固め」",
					"url": "https://www.amazon.co.jp/s?k=%E6%AD%AF%E5%9B%BA%E3%82%81",
					"checked": "2026-09-01"
				},
				{
					"name": "Amazon.co.jp 検索「布の絵本 布絵本 0歳」",
					"url": "https://www.amazon.co.jp/s?k=%E5%B8%83%E3%81%AE%E7%B5%B5%E6%9C%AC%20%E5%B8%83%E7%B5%B5%E6%9C%AC%200%E6%AD%B3",
					"checked": "2026-09-01"
				},
				{
					"name": "ピジョン はじめての育児 生後3か月の発達・成長",
					"url": "https://www.pigeon.info/baby/getsurei/getsurei-3.html",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「吐き戻し防止 クッション」",
					"url": "https://www.amazon.co.jp/s?k=%E5%90%90%E3%81%8D%E6%88%BB%E3%81%97%E9%98%B2%E6%AD%A2%20%E3%82%AF%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3",
					"checked": "2026-09-01"
				}
			],
			"support": [
				{
					"id": "shigaetsu-shiho",
					"title": "4か月児健診（品川・大井・荏原保健センター）",
					"detail": "4か月頃の健診。発育測定、歯科相談、育児相談など。ここで6〜7か月児・9〜10か月児健診の受診票も配布されます。絵本バッグの引換券（よんでよんで事業）もこの健診でお渡しします。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"
				},
				{
					"id": "nyunyuushoku-doga",
					"title": "動画で見る「離乳食」",
					"detail": "品川区が用意した離乳食の進め方の動画。初期のすりつぶしや与え方の手本を、在宅で何度でも確認できます。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-kateisoudan/hpg000010365.html"
				},
				{
					"id": "tanyu-sodan",
					"title": "電話授乳相談",
					"detail": "授乳やミルク、離乳食への切り替えなど、専門の相談員に電話で相談できます。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/hpg000033270.html"
				}
			],
			"items": [
				{
					"id": "m46-chair",
					"name": "離乳食用の椅子（ハイチェア・ベビーチェア）",
					"category": "tabe",
					"need": "must",
					"startMonth": 5,
					"note": "離乳食開始が5〜6か月が目安で、食べさせる人が毎回同じ姿勢で支えられる椅子が要るため、おさまりがよく、離乳食の失敗が減ります。テーブル付きか、ダイニング椅子に固定するタイプかを部屋に置いて確認を（目安 1脚）",
					"whySources": ["https://www.pigeon.info/baby/getsurei/getsurei-8.html", "https://www.24028.jp/premama/guide/chair/"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "離乳食用の椅子"
						},
						{
							"kind": "akachan",
							"q": "離乳食用の椅子"
						},
						{
							"kind": "amazon",
							"q": "離乳食用の椅子"
						}
					],
					"endMonth": 42,
					"size": "首すわり〜・体重目安に従う",
					"price": {
						"low": 7500,
						"high": 14e3,
						"unit": "1脚",
						"sources": ["https://www.amazon.co.jp/s?k=%E3%83%8F%E3%82%A4%E3%83%81%E3%82%A7%E3%82%A2%20%E3%83%99%E3%83%93%E3%83%BC"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "m46-tableware",
					"name": "離乳食用の食器・スプーン（初期）",
					"category": "tabe",
					"need": "must",
					"startMonth": 5,
					"note": "初期は1さじから始めるため、少量を扱う専用の器とスプーンが必要。仕切り皿、小さめのスプーン、研ぎ鉢とすりこぎ、裏ごし器が基本。100円均一でもそろえられます（目安 1セット）",
					"whySources": ["https://www.pigeon.info/baby-feeding/", "https://www.24028.jp/premama/guide/tableware/"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "離乳食用の食器・スプーン"
						},
						{
							"kind": "akachan",
							"q": "離乳食用の食器・スプーン"
						},
						{
							"kind": "uniqlo",
							"q": "離乳食用の食器・スプーン"
						},
						{
							"kind": "amazon",
							"q": "離乳食用の食器・スプーン"
						}
					],
					"endMonth": 18,
					"size": "初期用（小さめ）1セット",
					"price": {
						"low": 900,
						"high": 2600,
						"unit": "1セット",
						"sources": ["https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%20%E9%A3%9F%E5%99%A8%E3%82%BB%E3%83%83%E3%83%88"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "m46-sheet",
					"name": "防水シーツ・敷きパッド",
					"category": "neru",
					"need": "useful",
					"startMonth": 4,
					"note": "吐き戻し、離乳食のこぼれ、おむつ漏れで布団の汚れが増える時期のため、掛けるだけで、布団丸洗いの回数を減らせます。洗濯機で洗えるタイプが扱いやすいです（目安 1〜2枚）",
					"whySources": ["https://www.pigeon.info/baby/getsurei/getsurei-5.html"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "防水シーツ・敷きパッド"
						},
						{
							"kind": "akachan",
							"q": "防水シーツ・敷きパッド"
						},
						{
							"kind": "amazon",
							"q": "防水シーツ・敷きパッド"
						}
					],
					"endMonth": 60,
					"size": "敷き布団に合うサイズ",
					"price": {
						"low": 1500,
						"high": 3e3,
						"unit": "1枚",
						"sources": ["https://www.amazon.co.jp/s?k=%E9%98%B2%E6%B0%B4%E3%82%B7%E3%83%BC%E3%83%84%20%E3%83%99%E3%83%93%E3%83%BC"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "m46-teeth-toy",
					"name": "歯固め・布えほん（口に入れて遊ぶおもちゃ）",
					"category": "asobi",
					"need": "useful",
					"startMonth": 4,
					"note": "口に入れて物を調べる時期が始まり、安全なおもちゃが必要になるため、舐めても安全な素材、煮沸や漂白ができるかを基準に選びます。細かい部品が外れないものを選んでください（目安 2〜3個）",
					"whySources": ["https://www.pigeon.info/baby/getsurei/getsurei-5.html"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "歯固め・布えほん"
						},
						{
							"kind": "akachan",
							"q": "歯固め・布えほん"
						},
						{
							"kind": "amazon",
							"q": "歯固め・布えほん"
						}
					],
					"endMonth": 18,
					"size": "つかみやすく洗えるもの",
					"price": {
						"low": 700,
						"high": 2500,
						"unit": "布絵本3冊・歯固め1個の目安",
						"sources": ["https://www.amazon.co.jp/s?k=%E6%AD%AF%E5%9B%BA%E3%82%81", "https://www.amazon.co.jp/s?k=%E5%B8%83%E3%81%AE%E7%B5%B5%E6%9C%AC%20%E5%B8%83%E7%B5%B5%E6%9C%AC%200%E6%AD%B3"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "m46-spit-cushion",
					"name": "吐き戻し防止クッション・傾斜マット",
					"category": "neru",
					"need": "useful",
					"startMonth": 3,
					"note": "授乳後の吐き戻しが続く時期に、布団の汚れと見守りの負担を減らす目的で使われるため、使用時は必ず大人が見ていること、寝返りできるようになったら使用をやめることが基本です（目安 1個）",
					"whySources": ["https://www.pigeon.info/baby/getsurei/getsurei-3.html"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "吐き戻し防止クッション・傾斜マット"
						},
						{
							"kind": "akachan",
							"q": "吐き戻し防止クッション・傾斜マット"
						},
						{
							"kind": "amazon",
							"q": "吐き戻し防止クッション・傾斜マット"
						}
					],
					"endMonth": 8,
					"size": "対象月齢・体重を確認",
					"price": {
						"low": 3e3,
						"high": 9e3,
						"unit": "1個",
						"sources": ["https://www.amazon.co.jp/s?k=%E5%90%90%E3%81%8D%E6%88%BB%E3%81%97%E9%98%B2%E6%AD%A2%20%E3%82%AF%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3"],
						"checked": "2026-09-01"
					}
				}
			],
			"fileName": "03-m4-6.md"
		},
		{
			"id": "m7-9",
			"label": "7〜9か月",
			"monthsFrom": 7,
			"monthsTo": 9,
			"intro": "離乳食が2回食になり、量と種類が増えます。同時にハイハイ・つかまり立ちが始まり、手の届く範囲が一気に広がります。品川区の6〜7か月児健診・9〜10か月児健診は都内契約医療機関で受けられます（受診票は4か月児健診で配布）。",
			"caution": "離乳食でむせたり、硬さを間違えて吐き戻したりする失敗は誰にでも起こります。責めるより「明日の硬さ」を1段階戻すだけにしてください。ハイハイの時期はコンセント・コード・洗剤・薬が事故の原因になります。ベビーサークルやゲートは「使えば安心」ではなく、目の届く場所で使う前提で置いてください。夏は室温と湿度の管理を先に決めます（環境省のWBGT情報で品川の数値を確認できます）。",
			"sources": [
				{
					"name": "品川区 乳幼児の健康診査・相談",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html",
					"checked": "2026-09-02"
				},
				{
					"name": "品川区 一時保育",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-hoyou/kodomo-hoyou-ichizi/hpg000033215.html",
					"checked": "2026-09-02"
				},
				{
					"name": "品川区 オアシスルーム（認可外保育施設）",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/oashisuroom/hpg000033303.html",
					"checked": "2026-09-02"
				},
				{
					"name": "ピジョン 離乳食ステップ9（9〜11か月ころ）",
					"url": "https://pigeon.info/baby-feeding/food_9.html",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「ベビーフード」",
					"url": "https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%83%95%E3%83%BC%E3%83%89",
					"checked": "2026-09-01"
				},
				{
					"name": "Amazon.co.jp 検索「ハブラシ ベビー」",
					"url": "https://www.amazon.co.jp/s?k=%E3%83%8F%E3%83%96%E3%83%A9%E3%82%B7%20%E3%83%99%E3%83%93%E3%83%BC",
					"checked": "2026-09-01"
				},
				{
					"name": "ピジョン 離乳食のQ&A",
					"url": "https://www.pigeon.info/qa/",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「電動鼻水吸引器」",
					"url": "https://www.amazon.co.jp/s?k=%E9%9B%BB%E5%8B%95%E9%BC%BB%E6%B0%B4%E5%90%B8%E5%BC%95%E5%99%A8",
					"checked": "2026-09-01"
				},
				{
					"name": "NITE 製品安全・製品事故情報",
					"url": "https://www.nite.go.jp/",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「ベビーサークル」",
					"url": "https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%82%B5%E3%83%BC%E3%82%AF%E3%83%AB",
					"checked": "2026-09-01"
				}
			],
			"support": [
				{
					"id": "roku-shichi-kenshin",
					"title": "6〜7か月児健診・9〜10か月児健診",
					"detail": "都内契約医療機関で受けられます。受診票は4か月児健診で配布。医療機関に電話してから、母子健康手帳と受診票を持参します。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"
				},
				{
					"id": "ichiji-hoiku",
					"title": "一時保育（区立・私立保育所）",
					"detail": "生後満4か月から就学前まで、1日単位で保育所を利用できます。利用開始日から2か月以内の必要な日だけ、午前7時30分〜午後6時30分まで。各園2人までなので早めの申請が必要です。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-hoyou/kodomo-hoyou-ichizi/hpg000033215.html"
				},
				{
					"id": "oasis-room",
					"title": "オアシスルーム（区の認可外保育施設・ポップンルーム）",
					"detail": "就学前の乳幼児を一時的に預けられる区の施設。利用には申請と抽選があり、保育の必要性の認定を受けると利用料が無償化される場合があります。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/oashisuroom/hpg000033303.html"
				}
			],
			"items": [
				{
					"id": "m79-babyfood",
					"name": "ベビーフード（裏技として常備）",
					"category": "arau",
					"need": "useful",
					"startMonth": 7,
					"note": "手作りにこだわって離乳食が止まるより、親が続けられる形を守る方が実際の運用として安定するため、全食を手作りにしようとすると続かない人向け。父が1人で面倒を見る日の「正解のある選択肢」として2〜3個置いておくと安全です（目安 在庫2〜3個）",
					"whySources": ["https://pigeon.info/baby-feeding/food_9.html"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "ベビーフード"
						},
						{
							"kind": "akachan",
							"q": "ベビーフード"
						},
						{
							"kind": "amazon",
							"q": "ベビーフード"
						}
					],
					"endMonth": 18,
					"size": "7か月向け・9か月向けを混在",
					"price": {
						"low": 1200,
						"high": 3300,
						"unit": "6個〜1ケース",
						"sources": ["https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%83%95%E3%83%BC%E3%83%89"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "m79-toothbrush",
					"name": "ハブラシ（歯みがき開始）",
					"category": "karada",
					"need": "must",
					"startMonth": 7,
					"note": "前歯が生え始める時期で、歯みがきを「嫌なものでなく日常の一部」にしておきたい。区は2歳児歯科健診を実施しています。最初は噛んで遊んでOK。奥歯が生え始めたら仕上げ磨きが本番になります（目安 1本・月1回ほどの交換）",
					"whySources": ["https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "ハブラシ"
						},
						{
							"kind": "akachan",
							"q": "ハブラシ"
						},
						{
							"kind": "amazon",
							"q": "ハブラシ"
						}
					],
					"endMonth": 36,
					"size": "赤ちゃん用・極小ヘッド",
					"price": {
						"low": 900,
						"high": 1300,
						"unit": "1本",
						"sources": ["https://www.amazon.co.jp/s?k=%E3%83%8F%E3%83%96%E3%83%A9%E3%82%B7%20%E3%83%99%E3%83%93%E3%83%BC"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "m79-suction",
					"name": "電動鼻水吸引器",
					"category": "karada",
					"need": "useful",
					"startMonth": 7,
					"note": "鼻水で寝られない時期が年に何度も来て、深夜の受診判断に迷う回数が減るため、口で吸うタイプは親が感染するリスクと体力の消耗があります。電動は音で寝てしまう子もいるので、返品条件を事前に確認すると安心です（目安 1台）",
					"whySources": ["https://www.pigeon.info/qa/"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "電動鼻水吸引器"
						},
						{
							"kind": "akachan",
							"q": "電動鼻水吸引器"
						},
						{
							"kind": "amazon",
							"q": "電動鼻水吸引器"
						}
					],
					"endMonth": 24,
					"size": "家庭用・充電式または吸引式",
					"price": {
						"low": 5900,
						"high": 12500,
						"unit": "1台（手動は3,000円前後）",
						"sources": ["https://www.amazon.co.jp/s?k=%E9%9B%BB%E5%8B%95%E9%BC%BB%E6%B0%B4%E5%90%B8%E5%BC%95%E5%99%A8"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "m79-circle",
					"name": "ベビーサークル・プレイマット",
					"category": "anzen",
					"need": "must",
					"startMonth": 7,
					"note": "ハイハイ〜つかまり立ちで行動範囲が急拡大し、親が離れる数分間の子どもの安全な場所が必要になるため、洗濯・入浴・料理中に「一時的に見守れる場所」を作ります。柵の間隔や高さなど事故情報はNITEで確認できます（目安 1台）",
					"whySources": ["https://www.nite.go.jp/"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "ベビーサークル・プレイマット"
						},
						{
							"kind": "akachan",
							"q": "ベビーサークル・プレイマット"
						},
						{
							"kind": "amazon",
							"q": "ベビーサークル・プレイマット"
						}
					],
					"endMonth": 24,
					"size": "部屋の動線に合わせてサイズ選び",
					"price": {
						"low": 6e3,
						"high": 16600,
						"unit": "1台",
						"sources": ["https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%82%B5%E3%83%BC%E3%82%AF%E3%83%AB"],
						"checked": "2026-09-01"
					}
				}
			],
			"fileName": "04-m7-9.md"
		},
		{
			"id": "m10-12",
			"label": "10〜12か月",
			"monthsFrom": 10,
			"monthsTo": 12,
			"intro": "つかまり立ちや伝い歩きが始まり、1歳前後で離乳食は卒乳の時期も視野に入ります。1歳をまたぐと麻しん・風しん（MR）1期など定期予防接種の追加が続くので、予約の順番を先に決めるこの時期からが実務の山場です。",
			"caution": "1歳からは麻しん・風しん（MR）1期など定期予防接種が続きます。予診票がない場合は区の電子申請で交付申請が可能です。転勤で品川区へ引っ越す場合は、転入届（転出届受理から14日以内）とは別に母子健康手帳の引き継ぎと予防接種の予診票発行が必要で、品川区で受ける予防接種は予約制です。前の自治体で受けた健診の受診票も窓口で交付してもらえます。",
			"sources": [
				{
					"name": "こどもの予防接種（品川区）",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000033448.html",
					"checked": "2026-09-02"
				},
				{
					"name": "品川区 転入届（別の自治体から品川区に引っ越したとき）",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-zyuumin_inkan/procedure-zyuumin_inkan-zyuumin/procedure-zyuumin_inkan-zyuumin-todoke/tennyu20241020.html",
					"checked": "2026-09-02"
				},
				{
					"name": "品川区 パパの子育てスタートブック",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/hpg000016964.html",
					"checked": "2026-09-02"
				},
				{
					"name": "品川区 子どもすこやか医療費助成",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-iryohizyosei/hpg000017744.html",
					"checked": "2026-09-02"
				},
				{
					"name": "ピジョン はじめての育児 生後8か月の発達・成長",
					"url": "https://www.pigeon.info/baby/getsurei/getsurei-8.html",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「型はめ おもちゃ」",
					"url": "https://www.amazon.co.jp/s?k=%E5%9E%8B%E3%81%AF%E3%82%81%20%E3%81%8A%E3%82%82%E3%81%A1%E3%82%83",
					"checked": "2026-09-01"
				},
				{
					"name": "Amazon.co.jp 検索「ベビー おさかなつり」",
					"url": "https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%20%E3%81%8A%E3%81%95%E3%81%8B%E3%81%AA%E3%81%A4%E3%82%8A",
					"checked": "2026-09-01"
				},
				{
					"name": "ピジョン 液体ミルク かいおきミルク",
					"url": "https://www.pigeon.info/products/item/920",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 商品検索「液体ミルク 80ml」",
					"url": "https://www.amazon.co.jp/s?k=%E6%B6%B2%E4%BD%93%E3%83%9F%E3%83%AB%E3%82%AF%2080ml&language=ja_JP&currency=JPY",
					"checked": "2026-09-02"
				},
				{
					"name": "環境省 WBGT 公開ページ（熱中症予防情報）",
					"url": "https://www.wbgt.env.go.jp/",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「キッズ帽子 紫外線対策」",
					"url": "https://www.amazon.co.jp/s?k=%E3%82%AD%E3%83%83%E3%82%BA%E5%B8%BD%E5%AD%90%20%E7%B4%AB%E5%A4%96%E7%B7%9A%E5%AF%BE%E7%AD%96",
					"checked": "2026-09-01"
				}
			],
			"support": [
				{
					"id": "yobou-1sai",
					"title": "1歳からの予防接種（MR1期・水痘・小児用肺炎球菌追加）",
					"detail": "MR（麻しん・風しん）1期は1歳から2歳の誕生日の前日までに1回、水痘は1歳から3歳の誕生日の前日までに2回、小児用肺炎球菌の追加は初回完了後60日以上あけて生後12〜15か月が目安です。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000033448.html"
				},
				{
					"id": "shinagawa-tennyu",
					"title": "品川区に転入したら（転入届と子育ての引継ぎ）",
					"detail": "転入届は転出届受理から14日以内。あわせて世帯の状況に応じて国民健康保険・児童手当・保育所入所の申請が必要です。子ども医療証は保険証と引き換えに窓口で即日交付されます。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-zyuumin_inkan/procedure-zyuumin_inkan-zyuumin/procedure-zyuumin_inkan-zyuumin-todoke/tennyu20241020.html"
				},
				{
					"id": "papa-book",
					"title": "パパの子育てスタートブック（東京都）",
					"detail": "母体の心身の変化と子どもの成長、その時々の父親としての役割や子育ての知識をまとめた冊子。区の子育てページから読めます。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/hpg000016964.html"
				},
				{
					"id": "medical-fee",
					"title": "子どもすこやか医療費助成",
					"detail": "0〜18歳（高校3年生相当の年齢まで）が対象で、区内の医療機関で保険証といっしょに医療証を提示すると窓口の自己負担が助成されます。健康診断・予防接種・薬の容器代などは対象外です。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-iryohizyosei/hpg000017744.html"
				}
			],
			"items": [
				{
					"id": "m1012-shape-toy",
					"name": "型はめ・積み木（指先を使うおもちゃ）",
					"category": "asobi",
					"need": "must",
					"startMonth": 10,
					"note": "手の発達が早く、親が付き添わなくても自分で遊べる時間の第一歩になるため、自分で組み替えて遊べるおもちゃはこの時期から長く使えます。部品が口に入らないサイズか、洗える素材かを基準に選びます（目安 1セット）",
					"whySources": ["https://www.pigeon.info/baby/getsurei/getsurei-8.html"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "型はめ・積み木"
						},
						{
							"kind": "akachan",
							"q": "型はめ・積み木"
						},
						{
							"kind": "amazon",
							"q": "型はめ・積み木"
						}
					],
					"endMonth": 30,
					"size": "口に入らない大きさ",
					"price": {
						"low": 2e3,
						"high": 3700,
						"unit": "1セット",
						"sources": ["https://www.amazon.co.jp/s?k=%E5%9E%8B%E3%81%AF%E3%82%81%20%E3%81%8A%E3%82%82%E3%81%A1%E3%82%83"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "m1012-fishing-toy",
					"name": "おさかなつりなど指先遊びのおもちゃ",
					"category": "asobi",
					"need": "useful",
					"startMonth": 10,
					"note": "指先を使う遊びは言葉や集中力の土台になり、寝る前以外の時間つぶしにも使えるため、親子の遊び方を見本で示してあげると続きやすいです。音の出るものは時間帯を決めておくと夜泣きの妨げになりません（目安 1個）",
					"whySources": ["https://www.pigeon.info/baby/getsurei/getsurei-8.html"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "おさかなつりなど指先遊びのおもちゃ"
						},
						{
							"kind": "akachan",
							"q": "おさかなつりなど指先遊びのおもちゃ"
						},
						{
							"kind": "amazon",
							"q": "おさかなつりなど指先遊びのおもちゃ"
						}
					],
					"endMonth": 24,
					"size": "部品が大きく丸みがあるもの",
					"price": {
						"low": 1e3,
						"high": 1800,
						"unit": "1個",
						"sources": ["https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%20%E3%81%8A%E3%81%95%E3%81%8B%E3%81%AA%E3%81%A4%E3%82%8A"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "m1012-milk-stock",
					"name": "液体ミルク（非常用備蓄）",
					"category": "arau",
					"need": "must",
					"startMonth": 10,
					"note": "調乳不要で災害時にそのまま飲めるため、備蓄用には必須に近い保険です。1本（80ml）あたり803〜2,495円で、ケース買いなら1本あたりは下がります（目安 6〜12本）",
					"whySources": ["https://www.pigeon.info/products/item/920"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "液体ミルク"
						},
						{
							"kind": "akachan",
							"q": "液体ミルク"
						},
						{
							"kind": "amazon",
							"q": "液体ミルク"
						}
					],
					"endMonth": 24,
					"size": "200ml入り12本前後",
					"price": {
						"low": 803,
						"high": 2495,
						"unit": "1本（80ml）",
						"sources": ["https://www.amazon.co.jp/s?k=%E6%B6%B2%E4%BD%93%E3%83%9F%E3%83%AB%E3%82%AF%2080ml&language=ja_JP&currency=JPY"],
						"checked": "2026-09-02"
					}
				},
				{
					"id": "m1012-hat",
					"name": "帽子（紫外線対策・防寒）",
					"category": "kiru",
					"need": "must",
					"startMonth": 10,
					"note": "公園での時間が増え、紫外線と温度調整を親が管理しなければならないため、外出時間が増える分、帽子の不足がそのまま日焼け対策の漏れになります。洗濯を考慮して2枚持っておくと安心です（目安 1〜2個）",
					"whySources": ["https://www.wbgt.env.go.jp/"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "帽子"
						},
						{
							"kind": "akachan",
							"q": "帽子"
						},
						{
							"kind": "uniqlo",
							"q": "帽子"
						}
					],
					"endMonth": 36,
					"size": "頭囲を実測して選ぶ",
					"price": {
						"low": 1300,
						"high": 2900,
						"unit": "1個",
						"sources": ["https://www.amazon.co.jp/s?k=%E3%82%AD%E3%83%83%E3%82%BA%E5%B8%BD%E5%AD%90%20%E7%B4%AB%E5%A4%96%E7%B7%9A%E5%AF%BE%E7%AD%96"],
						"checked": "2026-09-01"
					}
				}
			],
			"fileName": "05-m10-12.md"
		},
		{
			"id": "m13-18",
			"label": "13〜18か月",
			"monthsFrom": 13,
			"monthsTo": 18,
			"intro": "一人で歩くようになり、行動範囲が部屋の外（廊下・階段・玄関）にまで広がります。家具の固定やコンセント対策など「子どもの目線で部屋を見る」作業を一度まとめてやると、その後の注意の回数が大きく減ります。1歳6か月児健診と保育所入園の申請が重なる時期なので、手続きの締め切りを先に確認してください。",
			"caution": "1歳を過ぎると誤飲・転落・やけどの報告が増えます。家具の転倒防止、窓や階段の対策、洗濯洗剤や洗剤ポッドの保管位置を、1歳6か月児健診の前に見直しておくと相談しやすいです。室内遊具は対象年齢と耐荷重、設置面の滑りやすさを確認してください。事故情報はNITEの製品事故情報で確認できます。",
			"sources": [
				{
					"name": "品川区 乳幼児の健康診査・相談",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html",
					"checked": "2026-09-02"
				},
				{
					"name": "品川区 保育所入(転)園申請",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-hoyou/kodomo-hoyou-hoikuen/hpg000027973.html",
					"checked": "2026-09-02"
				},
				{
					"name": "品川区 ファミリー・サポート・センター",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-kateisoudan/hpg000020024.html",
					"checked": "2026-09-02"
				},
				{
					"name": "品川区 病児保育",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-hoyou/kodomo-hoyou-ichizi/hpg000033509.html",
					"checked": "2026-09-02"
				},
				{
					"name": "NITE 製品安全・製品事故情報",
					"url": "https://www.nite.go.jp/",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「ジャングルジム すべり台 室内」",
					"url": "https://www.amazon.co.jp/s?k=%E3%82%B8%E3%83%A3%E3%83%B3%E3%82%B0%E3%83%AB%E3%82%B8%E3%83%A0%20%E3%81%99%E3%81%B9%E3%82%8A%E5%8F%B0%20%E5%AE%A4%E5%86%85",
					"checked": "2026-09-01"
				},
				{
					"name": "ピジョン はじめての育児 1歳の発達・成長",
					"url": "https://www.pigeon.info/baby/getsurei/getsurei-12.html",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「キッズステップ 踏み台」",
					"url": "https://www.amazon.co.jp/s?k=%E3%82%AD%E3%83%83%E3%82%BA%E3%82%B9%E3%83%86%E3%83%83%E3%83%97%20%E8%B8%8F%E3%81%BF%E5%8F%B0",
					"checked": "2026-09-01"
				},
				{
					"name": "Amazon.co.jp 検索「家具転倒防止 ストラップ」",
					"url": "https://www.amazon.co.jp/s?k=%E5%AE%B6%E5%85%B7%E8%BB%A2%E5%80%92%E9%98%B2%E6%AD%A2%20%E3%82%B9%E3%83%88%E3%83%A9%E3%83%83%E3%83%97",
					"checked": "2026-09-01"
				},
				{
					"name": "環境省 WBGT 公開ページ（熱中症予防情報）",
					"url": "https://www.wbgt.env.go.jp/",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「チャイルドシート サンシェード」",
					"url": "https://www.amazon.co.jp/s?k=%E3%83%81%E3%83%A3%E3%82%A4%E3%83%AB%E3%83%89%E3%82%B7%E3%83%BC%E3%83%88%20%E3%82%B5%E3%83%B3%E3%82%B7%E3%82%A7%E3%83%BC%E3%83%89",
					"checked": "2026-09-01"
				}
			],
			"support": [
				{
					"id": "kenshin-1sai6",
					"title": "1歳6か月児健診",
					"detail": "1歳7カ月前後に各保健センターで実施（予約制、月1〜2回）。発育・歯科・生活のリズムなどの相談ができます。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"
				},
				{
					"id": "hoikuen-nyuen",
					"title": "保育所入（転）園の申請",
					"detail": "共働きなどで保育の必要がある場合の入園申請。品川区は電子申請に対応し、令和9年10月分からは出生後8日以内などの申請期限に電子申請が使えるようになりました。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-hoyou/kodomo-hoyou-hoikuen/hpg000027973.html"
				},
				{
					"id": "famsup",
					"title": "ファミリー・サポート・センター（有償ヘルプ）",
					"detail": "区内在住で育児の援助を受けたい人と手伝いできる人が会員になり、送迎や一時の預かりを手伝ってもらえる有償の互助制度です。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-kateisoudan/hpg000020024.html"
				},
				{
					"id": "byouji-hoiku",
					"title": "病児保育・病後児保育",
					"detail": "熱があるなど保育園に登園できない時に預けられる施設。受診後の利用など条件と予約が必要なので、事前登録と登録手続きを済ませておくと使えます。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-hoyou/kodomo-hoyou-ichizi/hpg000033509.html"
				}
			],
			"items": [
				{
					"id": "m1318-indoor-gym",
					"name": "室内遊具（ジャングルジム・すべり台）",
					"category": "asobi",
					"need": "useful",
					"startMonth": 14,
					"note": "外出できない日でも体を動かせる場所が必要で、不足すると室内での登高行動が増えるため、雨の日や気温が高い日の体力発散用。組み立てと収納のしやすさを先に確認すると、部屋に置いたままにしにくいです（目安 1台）",
					"whySources": ["https://www.nite.go.jp/"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "室内遊具"
						},
						{
							"kind": "akachan",
							"q": "室内遊具"
						},
						{
							"kind": "amazon",
							"q": "室内遊具"
						}
					],
					"endMonth": 48,
					"size": "対象年齢と耐荷重を確認",
					"price": {
						"low": 7e3,
						"high": 16700,
						"unit": "1台",
						"sources": ["https://www.amazon.co.jp/s?k=%E3%82%B8%E3%83%A3%E3%83%B3%E3%82%B0%E3%83%AB%E3%82%B8%E3%83%A0%20%E3%81%99%E3%81%B9%E3%82%8A%E5%8F%B0%20%E5%AE%A4%E5%86%85"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "m1318-step",
					"name": "踏み台（キッズステップ）",
					"category": "anzen",
					"need": "must",
					"startMonth": 14,
					"note": "自分で手洗い・うがいができる高さに届くと、親の付き添いが必要な作業が減るため、手洗い・歯みがき・服の着替えなど「自分でやる」のための道具。倒れにくい低めのものから始めてください（目安 1台）",
					"whySources": ["https://www.pigeon.info/baby/getsurei/getsurei-12.html"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "踏み台"
						},
						{
							"kind": "akachan",
							"q": "踏み台"
						},
						{
							"kind": "amazon",
							"q": "踏み台"
						}
					],
					"endMonth": 72,
					"size": "滑り止め付き・耐荷重を確認",
					"price": {
						"low": 1800,
						"high": 4e3,
						"unit": "1台",
						"sources": ["https://www.amazon.co.jp/s?k=%E3%82%AD%E3%83%83%E3%82%BA%E3%82%B9%E3%83%86%E3%83%83%E3%83%97%20%E8%B8%8F%E3%81%BF%E5%8F%B0"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "m1318-childproof",
					"name": "家具転倒防止ストッパー・いたずら対策用品",
					"category": "anzen",
					"need": "must",
					"startMonth": 13,
					"note": "引き出しにつかまって立つ・引く行動が増え、転倒・挟まれ・誤飲の事故リスクが上がる時期のため、テレビ・棚の固定、引き出しのロック、コンセントのキャップ、窓の開放制限を一気に済ませます。入居直後の部屋は特に見落としが多いです（目安 一式（各2〜4個））",
					"whySources": ["https://www.nite.go.jp/"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "家具転倒防止ストッパー・いたずら対策用品"
						},
						{
							"kind": "akachan",
							"q": "家具転倒防止ストッパー・いたずら対策用品"
						},
						{
							"kind": "amazon",
							"q": "家具転倒防止ストッパー・いたずら対策用品"
						}
					],
					"endMonth": 36,
					"size": "家具のサイズ・引き出しの幅に合うもの",
					"price": {
						"low": 800,
						"high": 2400,
						"unit": "一式",
						"sources": ["https://www.amazon.co.jp/s?k=%E5%AE%B6%E5%85%B7%E8%BB%A2%E5%80%92%E9%98%B2%E6%AD%A2%20%E3%82%B9%E3%83%88%E3%83%A9%E3%83%83%E3%83%97"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "m1318-shades",
					"name": "ベビーカー・チャイルドシート用サンシェード",
					"category": "ugoku",
					"need": "useful",
					"startMonth": 13,
					"note": "屋外での熱中症リスクを下げ、ベビーカー内の温度上昇を抑えるため、日差しの角度が変わる春夏に効果が出ます。装着が面倒なものは使われないので、留め具が簡単なものを選んでください（目安 1〜2個）",
					"whySources": ["https://www.wbgt.env.go.jp/"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "ベビーカー・チャイルドシート用サンシェード"
						},
						{
							"kind": "akachan",
							"q": "ベビーカー・チャイルドシート用サンシェード"
						},
						{
							"kind": "amazon",
							"q": "ベビーカー・チャイルドシート用サンシェード"
						}
					],
					"endMonth": 36,
					"size": "機種に合うサイズ",
					"price": {
						"low": 900,
						"high": 1800,
						"unit": "1個",
						"sources": ["https://www.amazon.co.jp/s?k=%E3%83%81%E3%83%A3%E3%82%A4%E3%83%AB%E3%83%89%E3%82%B7%E3%83%BC%E3%83%88%20%E3%82%B5%E3%83%B3%E3%82%B7%E3%82%A7%E3%83%BC%E3%83%89"],
						"checked": "2026-09-01"
					}
				}
			],
			"fileName": "06-m13-18.md"
		},
		{
			"id": "m19-24",
			"label": "19〜24か月",
			"monthsFrom": 19,
			"monthsTo": 24,
			"intro": "言葉が伸び、自我が出てくる時期です。排泄の間隔は個人差が大きく、「夏に向けて布のトレーニングパンツをそろえる」ように季節と生活リズムで進めるのが実務的です。2歳児歯科健診とフッ化物塗布、3歳児健診への準備など、区の健診が次の段階に移ります。",
			"caution": "トイレトレーニングは失敗を叱らないことが前提です。布のトレーニングパンツは「濡れた感触で気づく」ための補助で、オムツ外しが早く進む保証はありません。子どもの準備サイン（オムツが2時間以上乾く、排泄の前に合図をする等）が出てから始めてください。噛みつき・爪でのひっかきが出やすい時期です。園でのケガは「噛んだ／噛まれた」の双方でやり取りが必要になるので、事実を時間・場所・症状付きでメモに残してください。",
			"sources": [
				{
					"name": "品川区 乳幼児の健康診査・相談",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html",
					"checked": "2026-09-02"
				},
				{
					"name": "品川区 ファミリー・サポート・センター",
					"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-kateisoudan/hpg000020024.html",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 商品検索「布トレーニングパンツ」",
					"url": "https://www.amazon.co.jp/s?k=%E5%B8%83%E3%83%88%E3%83%AC%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E3%83%91%E3%83%B3%E3%83%84&language=ja_JP&currency=JPY",
					"checked": "2026-09-02"
				},
				{
					"name": "ピジョン 離乳食の進め方",
					"url": "https://www.pigeon.info/baby-feeding/",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「トレーニング箸 子供」",
					"url": "https://www.amazon.co.jp/s?k=%E3%83%88%E3%83%AC%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E7%AD%B7%20%E5%AD%90%E4%BE%9B",
					"checked": "2026-09-01"
				},
				{
					"name": "ピジョン はじめての育児 1歳の発達・成長",
					"url": "https://www.pigeon.info/baby/getsurei/getsurei-12.html",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 商品検索「おままごと キッチン おもちゃ」",
					"url": "https://www.amazon.co.jp/s?k=%E3%81%8A%E3%81%BE%E3%81%BE%E3%81%94%E3%81%A8%20%E3%82%AD%E3%83%83%E3%83%81%E3%83%B3%20%E3%81%8A%E3%82%82%E3%81%A1%E3%82%83&language=ja_JP&currency=JPY",
					"checked": "2026-09-02"
				},
				{
					"name": "Amazon.co.jp 検索「知育玩具 2歳」",
					"url": "https://www.amazon.co.jp/s?k=%E7%9F%A5%E8%82%B2%E7%8E%A9%E5%85%B7%202%E6%AD%B3",
					"checked": "2026-09-01"
				}
			],
			"support": [
				{
					"id": "shigaetsu-shini",
					"title": "2歳児歯科健診・フッ化物塗布",
					"detail": "各保健センターで2歳児歯科健診を実施。希望すればフッ化物塗布も受けられます（保健センター実施は1回880円、3歳児健診で不正咬合の診断があった場合は歯並びモグモグ相談も継続）。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"
				},
				{
					"id": "famsup-2sai",
					"title": "ファミリー・サポート・センター",
					"detail": "保育の送迎や、リフレッシュのための一時預かりを手伝ってもらえる有償の互助制度。育児休暇明けで保育との二本立てになる時期に、週1回の受け皿として使えます。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-kateisoudan/hpg000020024.html"
				},
				{
					"id": "next-kenshin",
					"title": "3歳児健診につながる相談窓口",
					"detail": "言葉の発達・排泄・園での様子の相談は、子育てネウボラ相談や児童館の相談員が受け持っています。3歳児健診は3歳4カ月前後、目の検査（屈折検査）も含めて実施されます。",
					"source": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"
				}
			],
			"items": [
				{
					"id": "m1924-train-pants",
					"name": "布のトレーニングパンツ",
					"category": "kiru",
					"need": "must",
					"startMonth": 20,
					"note": "布タイプは漏れを受け止める層があり、洗濯前提で何度も使えます。3枚セットで1,598〜3,080円程度。紙おむつのみの補助で足りる家庭は買わなくても進みます（目安 3〜6枚）",
					"whySources": ["https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "布のトレーニングパンツ"
						},
						{
							"kind": "akachan",
							"q": "布のトレーニングパンツ"
						},
						{
							"kind": "uniqlo",
							"q": "布のトレーニングパンツ"
						}
					],
					"endMonth": 36,
					"size": "90〜95cm・6層〜8層",
					"price": {
						"low": 1598,
						"high": 3080,
						"unit": "3枚セット",
						"sources": ["https://www.amazon.co.jp/s?k=%E5%B8%83%E3%83%88%E3%83%AC%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E3%83%91%E3%83%B3%E3%83%84&language=ja_JP&currency=JPY"],
						"checked": "2026-09-02"
					}
				},
				{
					"id": "m1924-chopsticks",
					"name": "練習用箸（トレーニング箸）",
					"category": "tabe",
					"need": "must",
					"startMonth": 18,
					"note": "自分で食べたい欲求が強くなる時期で、道具が揃っていないと食事が親の手付きのままになるため、指入れのリング付きから始めて、リングなし、本物の箸へ段階を踏みます。食器セットと同じ時期にそろえると洗い替えが楽です（目安 1〜2足）",
					"whySources": ["https://www.pigeon.info/baby-feeding/"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "練習用箸"
						},
						{
							"kind": "akachan",
							"q": "練習用箸"
						},
						{
							"kind": "amazon",
							"q": "練習用箸"
						}
					],
					"endMonth": 48,
					"size": "手のサイズに合う長さ",
					"price": {
						"low": 400,
						"high": 1300,
						"unit": "1足",
						"sources": ["https://www.amazon.co.jp/s?k=%E3%83%88%E3%83%AC%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E7%AD%B7%20%E5%AD%90%E4%BE%9B"],
						"checked": "2026-09-01"
					}
				},
				{
					"id": "m1924-roleplay",
					"name": "ごっこ遊びのおもちゃ（おままごと道具）",
					"category": "asobi",
					"need": "useful",
					"startMonth": 20,
					"note": "2歳前半からは見立て遊びが広がり、ごっこ遊びの道具が遊びの幅を左右します。木製キッチン含むセットは2,138〜1万6,990円と幅が大きいので、最初の1セットは小さめで十分（目安 1セット）",
					"whySources": ["https://www.pigeon.info/baby/getsurei/getsurei-12.html"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "ごっこ遊びのおもちゃ"
						},
						{
							"kind": "akachan",
							"q": "ごっこ遊びのおもちゃ"
						},
						{
							"kind": "amazon",
							"q": "ごっこ遊びのおもちゃ"
						}
					],
					"endMonth": 60,
					"size": "小さい部品が少ないもの",
					"price": {
						"low": 2138,
						"high": 16990,
						"unit": "1セット",
						"sources": ["https://www.amazon.co.jp/s?k=%E3%81%8A%E3%81%BE%E3%81%BE%E3%81%94%E3%81%A8%20%E3%82%AD%E3%83%83%E3%83%81%E3%83%B3%20%E3%81%8A%E3%82%82%E3%81%A1%E3%82%83&language=ja_JP&currency=JPY"],
						"checked": "2026-09-02"
					}
				},
				{
					"id": "m1924-ikusu-toy",
					"name": "2歳向けの知育玩具・絵本",
					"category": "asobi",
					"need": "useful",
					"startMonth": 19,
					"note": "集中して遊ぶ時間が延び、親が少し離れている時間を作れるため、遊んだ後に片付けられる量に抑えると、部屋が荒れにくくなります。図書館の読み聞かせ会も併用できます（目安 1〜2個）",
					"whySources": ["https://www.pigeon.info/baby/getsurei/getsurei-12.html"],
					"shops": [
						{
							"kind": "nishimatyaya",
							"q": "2歳向けの知育玩具・絵本"
						},
						{
							"kind": "akachan",
							"q": "2歳向けの知育玩具・絵本"
						},
						{
							"kind": "amazon",
							"q": "2歳向けの知育玩具・絵本"
						}
					],
					"endMonth": 48,
					"size": "対象年齢2歳以上のもの",
					"price": {
						"low": 2100,
						"high": 4500,
						"unit": "1個",
						"sources": ["https://www.amazon.co.jp/s?k=%E7%9F%A5%E8%82%B2%E7%8E%A9%E5%85%B7%202%E6%AD%B3"],
						"checked": "2026-09-01"
					}
				}
			],
			"fileName": "07-m19-24.md"
		}
	],
	"items": [
		{
			"id": "pre-tan-hadagi",
			"name": "短肌着",
			"category": "kiru",
			"need": "must",
			"startMonth": -1,
			"note": "退院した日から使ういちばん下の肌着。着替えとおむつ替えの回数が多いので、洗濯中の替えを含めてそろえます。",
			"whySources": ["https://www.24028.jp/premama/preparation-item/newborn/"],
			"shops": [{
				"kind": "nishimatyaya",
				"q": "短肌着"
			}, {
				"kind": "akachan",
				"q": "短肌着"
			}],
			"endMonth": 3,
			"size": "50cm／5〜6枚（西松屋の目安）",
			"price": {
				"low": 1749,
				"high": 2189,
				"unit": "2枚組（税込）",
				"sources": ["https://shop.akachan.jp/shop/c/cb065/"],
				"checked": "2026-09-01"
			},
			"bandId": "pregnancy"
		},
		{
			"id": "pre-combi-hadagi",
			"name": "コンビ肌着",
			"category": "kiru",
			"need": "must",
			"startMonth": -1,
			"note": "短肌着の上に着る肌着。足を動かすようになるとカバーオール代わりにもの使えます。",
			"whySources": ["https://www.24028.jp/premama/preparation-item/newborn/", "https://www.24028.jp/premama/guide/babywear/"],
			"shops": [{
				"kind": "nishimatyaya",
				"q": "コンビ肌着"
			}, {
				"kind": "akachan",
				"q": "コンビ肌着"
			}],
			"endMonth": 6,
			"size": "50〜60cm／5〜6枚（西松屋の目安）",
			"price": {
				"low": 2189,
				"high": 3069,
				"unit": "2枚組（税込）",
				"sources": ["https://shop.akachan.jp/shop/c/cb065/"],
				"checked": "2026-09-01"
			},
			"bandId": "pregnancy"
		},
		{
			"id": "pre-dress-all",
			"name": "ドレスオール（コンビドレス）",
			"category": "kiru",
			"need": "must",
			"startMonth": -1,
			"note": "新生児〜3か月前後のころ合い（退院着にも）。前開きで着脱がラクで、肌着1枚＋これ1枚で調節できます。1着2,051〜4,290円程度（調査時点のAmazon検索の実売）（目安 2〜3着）",
			"whySources": ["https://www.24028.jp/premama/preparation-item/newborn/"],
			"shops": [{
				"kind": "nishimatyaya",
				"q": "ドレスオール"
			}, {
				"kind": "uniqlo",
				"q": "ベビー ドレスオール"
			}],
			"endMonth": 6,
			"size": "50〜60cm／3〜5枚（西松屋の目安）",
			"price": {
				"low": 2051,
				"high": 4290,
				"unit": "1着",
				"sources": ["https://www.amazon.co.jp/s?k=%E3%83%89%E3%83%AC%E3%82%B9%E3%82%AA%E3%83%BC%E3%83%AB%20%E8%82%8C%E7%9D%80%20%E8%B5%A4%E3%81%A1%E3%82%83%E3%82%93&language=ja_JP&currency=JPY"],
				"checked": "2026-09-02"
			},
			"bandId": "pregnancy"
		},
		{
			"id": "pre-gauze",
			"name": "ガーゼハンカチ",
			"category": "arau",
			"need": "must",
			"startMonth": -1,
			"note": "授乳・沐浴・汗や口のまわりの拭き取りまで、1日何枚も使う多目的用品。枚数で買うと1枚単価が大きく下がります。",
			"whySources": ["https://www.24028.jp/premama/preparation-item/newborn/"],
			"shops": [{
				"kind": "nishimatyaya",
				"q": "ガーゼハンカチ"
			}, {
				"kind": "akachan",
				"q": "ガーゼハンカチ"
			}],
			"endMonth": 24,
			"size": "10〜20枚（西松屋の目安）",
			"price": {
				"low": 416,
				"high": 1419,
				"unit": "5枚組（税込）",
				"sources": ["https://shop.akachan.jp/shop/c/cb071/"],
				"checked": "2026-09-01"
			},
			"bandId": "pregnancy"
		},
		{
			"id": "pre-okurumi",
			"name": "おくるみ",
			"category": "neru",
			"need": "useful",
			"startMonth": -1,
			"note": "出生直後の包み、チャイルドシートやベビーカーでの掛け代わりに。睡眠中は寝床に物を入れない安全案内が基本なので、掛け布団の代わりにする場合は着衣と室温で調整します。",
			"whySources": ["https://shop.akachan.jp/shop/c/cb347/", "https://www.cfa.go.jp/policies/boshihoken/kenkou/sids"],
			"shops": [{
				"kind": "nishimatyaya",
				"q": "おくるみ"
			}, {
				"kind": "akachan",
				"q": "おくるみ"
			}],
			"endMonth": 6,
			"size": "1〜2枚",
			"price": {
				"low": 1648,
				"high": 3839,
				"unit": "1枚（税込）",
				"sources": ["https://shop.akachan.jp/shop/c/cb347/"],
				"checked": "2026-09-01"
			},
			"bandId": "pregnancy"
		},
		{
			"id": "pre-diaper-newborn",
			"name": "紙おむつ（新生児サイズ）",
			"category": "arau",
			"need": "must",
			"startMonth": -1,
			"note": "退院後すぐに使う消耗品。体重とフィット感を見てSサイズへ切り替えます。サイズ区分はメーカーごとに違うので袋の表示を確認します。",
			"whySources": ["https://www.24028.jp/premama/preparation-item/milkdiapers/", "https://www.24028.jp/premama/guide/diapers/"],
			"shops": [
				{
					"kind": "amazon",
					"q": "紙おむつ 新生児"
				},
				{
					"kind": "rakuten",
					"q": "紙おむつ 新生児 まとめ買い"
				},
				{
					"kind": "akachan",
					"q": "紙おむつ 新生児"
				}
			],
			"endMonth": 2,
			"size": "まず1パックから。新生児サイズは買い置きしすぎない",
			"price": {
				"low": 2178,
				"high": 6152,
				"unit": "1パック〜ケース（枚数差に注意・税込）",
				"sources": ["https://shop.akachan.jp/shop/c/cb327/", "https://www.24028-net.jp/category/EX_PAPERDIAPER/"],
				"checked": "2026-09-01"
			},
			"bandId": "pregnancy"
		},
		{
			"id": "pre-oshiri-fuki",
			"name": "おしりふき",
			"category": "arau",
			"need": "must",
			"startMonth": -1,
			"note": "おむつ替えのたびに使う消耗品。ケース買いが1枚単価では安くつきますが、置き場所は確保しておきます。",
			"whySources": ["https://www.24028.jp/premama/preparation-item/milkdiapers/"],
			"shops": [
				{
					"kind": "amazon",
					"q": "ベビー用 おしりふき"
				},
				{
					"kind": "rakuten",
					"q": "おしりふき ケース買い"
				},
				{
					"kind": "nishimatyaya",
					"q": "おしりふき"
				}
			],
			"endMonth": 18,
			"size": "5〜6個（西松屋の目安）",
			"price": {
				"low": 196,
				"high": 3839,
				"unit": "1個〜ケース（税込）",
				"sources": ["https://www.24028-net.jp/category/EX_WIPE/", "https://shop.akachan.jp/shop/c/cb332/"],
				"checked": "2026-09-01"
			},
			"bandId": "pregnancy"
		},
		{
			"id": "pre-bottle",
			"name": "哺乳びん・乳首",
			"category": "tabe",
			"need": "must",
			"startMonth": -1,
			"note": "母乳中心でも、搾乳・混合栄養・一時的なミルクの出番に備えて最小限だけ準備します。乳首は2個以上を交互に使う案内です。",
			"whySources": ["https://www.24028.jp/premama/preparation-item/milkdiapers/", "https://www.24028.jp/premama/guide/bottlenipple/"],
			"shops": [{
				"kind": "nishimatyaya",
				"q": "哺乳瓶"
			}, {
				"kind": "akachan",
				"q": "哺乳びん"
			}],
			"endMonth": 18,
			"size": "哺乳びん2〜3本、乳首3〜5個（西松屋の目安）",
			"price": {
				"low": 658,
				"high": 4488,
				"unit": "1本（税込）",
				"sources": ["https://shop.akachan.jp/shop/c/cb143/"],
				"checked": "2026-09-01"
			},
			"bandId": "pregnancy"
		},
		{
			"id": "pre-bottle-sterilize",
			"name": "哺乳びんの洗浄・除菌用品",
			"category": "tabe",
			"need": "must",
			"startMonth": -1,
			"note": "使ったその場で洗う動線を退院前に作っておくと、出産後に困りません。煮沸・薬液・スチームは製品の説明書に従います。",
			"whySources": ["https://www.24028.jp/premama/preparation-item/milkdiapers/", "https://www.24028.jp/premama/guide/bottlenipple/"],
			"shops": [{
				"kind": "nishimatyaya",
				"q": "哺乳瓶 消毒"
			}, {
				"kind": "rakuten",
				"q": "哺乳瓶 除菌"
			}],
			"endMonth": 12,
			"size": "洗剤1個・ブラシ1本・除菌用品1セット",
			"price": {
				"low": 328,
				"high": 3608,
				"unit": "1点（税込）",
				"sources": ["https://shop.akachan.jp/shop/c/cb146/"],
				"checked": "2026-09-01"
			},
			"bandId": "pregnancy"
		},
		{
			"id": "pre-mokuyoku-set",
			"name": "沐浴セット（ベビーバス・湯温計・ベビーソープ）",
			"category": "arau",
			"need": "must",
			"startMonth": -1,
			"note": "退院した日から沐浴が始まります。西松屋の案内では湯温37〜40度、湯につかる時間5〜7分が目安。詳細は産院の指示を優先します。",
			"whySources": ["https://www.24028.jp/premama/guide/babybath/", "https://www.24028.jp/premama/preparation-item/bathsanitary/"],
			"shops": [{
				"kind": "nishimatyaya",
				"q": "ベビーバス"
			}, {
				"kind": "akachan",
				"q": "沐浴セット"
			}],
			"endMonth": 1,
			"size": "ベビーバス1個、湯温計1個、浴用ガーゼ2〜3枚、湯上りタオル2〜3枚、ベビーソープ1個",
			"price": {
				"low": 1408,
				"high": 5049,
				"unit": "浴用品1点（税込）",
				"sources": ["https://shop.akachan.jp/shop/c/cb152/", "https://www.24028-net.jp/category/SANI_BATH/"],
				"checked": "2026-09-01"
			},
			"bandId": "pregnancy"
		},
		{
			"id": "pre-sleep-place",
			"name": "ベビーベッド／赤ちゃん専用の寝床",
			"category": "neru",
			"need": "useful",
			"startMonth": -1,
			"note": "大人と別で寝る場所を確保できるかどうかで必要度が分かれます。必要なら購入よりレンタル（家具一式プラン）のほうが安く、処分も不要。購入する場合は簡易ベッドで実売3,000〜1万9,200円程度、ベビー布団セットは3,000円台からあります（調査日 2026-09-02・目安 1台またはレンタル）",
			"whySources": ["https://www.24028.jp/premama/preparation-item/bedding/", "https://www.cfa.go.jp/policies/boshihoken/kenkou/sids"],
			"shops": [{
				"kind": "nishimatyaya",
				"q": "ベビーベッド"
			}, {
				"kind": "akachan",
				"q": "ベビーベッド"
			}],
			"endMonth": 18,
			"size": "ベビーベッド1台、固わた敷布団1枚、フィッティングシーツ2〜3枚、防水シーツ2〜3枚",
			"price": {
				"low": 3e3,
				"high": 19200,
				"unit": "簡易ベッド1台",
				"sources": ["https://www.amazon.co.jp/s?k=%E7%B0%A1%E6%98%93%E3%83%99%E3%83%93%E3%83%BC%E3%83%99%E3%83%83%E3%83%89&language=ja_JP&currency=JPY&p_36-price-min=3000&p_36-price-max=40000"],
				"checked": "2026-09-02"
			},
			"bandId": "pregnancy"
		},
		{
			"id": "pre-child-seat",
			"name": "チャイルドシート",
			"category": "ugoku",
			"need": "must",
			"startMonth": -1,
			"note": "自家用車で退院するなら出生直後から必要です。6歳未満の使用が義務として案内されています。新生児は原則後ろ向き、R129製品は生後15か月未満を後ろ向きとします。",
			"whySources": ["https://www.24028.jp/premama/guide/childseat/"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "チャイルドシート"
				},
				{
					"kind": "akachan",
					"q": "チャイルドシート"
				},
				{
					"kind": "rakuten",
					"q": "チャイルドシート 新生児"
				}
			],
			"endMonth": 84,
			"size": "新生児から使える製品を1台。車種適合と固定方法（ISOFIXまたはシートベルト）を事前確認",
			"price": {
				"low": 15178,
				"high": 86900,
				"unit": "1台（税込・新品）",
				"sources": ["https://www.24028-net.jp/category/SEAT_BABY_CHILD/", "https://shop.akachan.jp/shop/c/cb285/"],
				"checked": "2026-09-01"
			},
			"bandId": "pregnancy"
		},
		{
			"id": "pre-a-stroller",
			"name": "A型ベビーカー",
			"category": "ugoku",
			"need": "useful",
			"startMonth": -1,
			"note": "産後1か月頃からの外出に備えます。新生児期から使えるかは製品の対象月齢を確認します（ピジョンはA形を生後1か月〜36か月の例として案内）。",
			"whySources": ["https://www.24028.jp/premama/preparation-item/childcare/", "https://pigeon.info/stroller/howtochoose/"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "A型 ベビーカー"
				},
				{
					"kind": "akachan",
					"q": "A型ベビーカー"
				},
				{
					"kind": "rakuten",
					"q": "A型 ベビーカー"
				}
			],
			"endMonth": 6,
			"size": "1台。自宅周辺の階段・車・公共交通機関の利用状況で要否的判断",
			"price": {
				"low": 19798,
				"high": 84700,
				"unit": "1台（税込・新品）",
				"sources": ["https://www.24028-net.jp/category/TRIP_STROLLER/", "https://shop.akachan.jp/shop/c/cb290/"],
				"checked": "2026-09-01"
			},
			"bandId": "pregnancy"
		},
		{
			"id": "pre-baby-holder",
			"name": "抱っこひも・スリング",
			"category": "ugoku",
			"need": "must",
			"startMonth": -1,
			"note": "ベビーカーが使いにくい場所や短い移動で使います。新生児から使えるかは製品差が大きいので、姿勢・体重・月齢表示を守ります。",
			"whySources": ["https://www.24028.jp/premama/preparation-item/childcare/"],
			"shops": [{
				"kind": "nishimatyaya",
				"q": "抱っこ紐"
			}, {
				"kind": "akachan",
				"q": "抱っこ紐"
			}],
			"endMonth": 24,
			"size": "腰ベルト型抱っこひも1個、スリング1個（西松屋の目安）",
			"price": {
				"low": 3848,
				"high": 49500,
				"unit": "1点（税込）",
				"sources": ["https://www.24028-net.jp/category/TRIP_BABYCARRIER/", "https://shop.akachan.jp/shop/c/cb288/"],
				"checked": "2026-09-01"
			},
			"bandId": "pregnancy"
		},
		{
			"id": "pre-health-tools",
			"name": "体温計・爪切り・綿棒などのケア用品",
			"category": "karada",
			"need": "must",
			"startMonth": -1,
			"note": "退院直後に「買ってよかった」と慌てないよう、使う場所を決めておきます。鼻水吸引は無理に使わず、必要時は医療機関に相談します。",
			"whySources": ["https://www.24028.jp/premama/preparation-item/bathsanitary/"],
			"shops": [{
				"kind": "nishimatyaya",
				"q": "ベビー 体温計"
			}, {
				"kind": "akachan",
				"q": "ベビー 爪切り"
			}],
			"endMonth": 24,
			"size": "体温計1個、爪切りはさみ1個、綿棒1パック、保湿ローション1本、鼻水取り器1個",
			"bandId": "pregnancy"
		},
		{
			"id": "pre-nursing-cushion",
			"name": "授乳クッション",
			"category": "tabe",
			"need": "useful",
			"startMonth": -1,
			"note": "授乳の姿勢を支える用品で、必要さは家庭の方針で分かれます。カバーが洗えるかなども含めて選びます。",
			"whySources": ["https://www.24028-net.jp/item_list.html?searchbox=1&q=%E6%8E%88%E4%B9%B3%E3%82%AF%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3", "https://shop.akachan.jp/shop/c/cb028/"],
			"shops": [{
				"kind": "nishimatyaya",
				"q": "授乳クッション"
			}, {
				"kind": "akachan",
				"q": "授乳クッション"
			}],
			"endMonth": 6,
			"size": "1個",
			"price": {
				"low": 1699,
				"high": 13200,
				"unit": "1個（税込）",
				"sources": ["https://shop.akachan.jp/shop/c/cb028/"],
				"checked": "2026-09-01"
			},
			"bandId": "pregnancy"
		},
		{
			"id": "nb-nursing-pad",
			"name": "母乳パッド",
			"category": "karada",
			"need": "must",
			"startMonth": 0,
			"note": "母乳が漏れて下着を濡らすために使う、授乳期の消耗品。使い捨ては取り替えるだけ、布は洗って繰り返使えます。産院で処方・販売されることがあるので、退院前に数量を聞いておくと重複して買いません。",
			"whySources": ["https://pigeon.info/growth/baby0-2months.html"],
			"shops": [
				{
					"kind": "amazon",
					"q": "母乳パッド"
				},
				{
					"kind": "rakuten",
					"q": "母乳パッド"
				},
				{
					"kind": "nishimatyaya",
					"q": "母乳パッド"
				},
				{
					"kind": "akachan",
					"q": "母乳パッド"
				}
			],
			"endMonth": 12,
			"price": {
				"low": 850,
				"high": 1800,
				"unit": "使い捨て1パック（100枚前後）",
				"sources": ["https://www.amazon.co.jp/s?k=%E6%AF%8D%E4%B9%B3%E3%83%91%E3%83%83%E3%83%89"],
				"checked": "2026-09-01"
			},
			"bandId": "newborn"
		},
		{
			"id": "nb-breast-pump",
			"name": "さく乳器（手動・電動）",
			"category": "karada",
			"need": "useful",
			"startMonth": 0,
			"note": "母乳の張りが強いときや、搾った母乳を保存しておきたいときに使います。搾乳の必要度は人によって差が大きいので、頻繁に搾る予定がない場合は手動から。手動は1,500〜4,000円、電動は1〜2万円台です。",
			"whySources": ["https://pigeon.info/growth/baby0-2months.html"],
			"shops": [
				{
					"kind": "amazon",
					"q": "母乳ポンプ"
				},
				{
					"kind": "rakuten",
					"q": "さく乳器"
				},
				{
					"kind": "akachan",
					"q": "さく乳器"
				}
			],
			"endMonth": 24,
			"price": {
				"low": 1400,
				"high": 4e3,
				"unit": "手動1台（電動は1〜2万円台）",
				"sources": ["https://www.amazon.co.jp/s?k=%E6%AF%8D%E4%B9%B3%E3%83%9D%E3%83%B3%E3%83%97"],
				"checked": "2026-09-01"
			},
			"bandId": "newborn"
		},
		{
			"id": "nb-baby-lotion",
			"name": "赤ちゃん用の保湿剤",
			"category": "karada",
			"need": "must",
			"startMonth": 0,
			"note": "沐浴後に使う保湿ローション。新生児のころからのスキンケアが案内されています。低刺激・無香料タイプが1本880〜2,000円（300ml前後）。合う・合わないがあるので、まずは小さいサイズから試します。",
			"whySources": ["https://pigeon.info/growth/baby0-2months.html"],
			"shops": [
				{
					"kind": "amazon",
					"q": "ベビーローション 新生児"
				},
				{
					"kind": "rakuten",
					"q": "ベビーローション"
				},
				{
					"kind": "nishimatyaya",
					"q": "ベビーローション"
				}
			],
			"endMonth": 24,
			"price": {
				"low": 880,
				"high": 2e3,
				"unit": "1本（300ml前後）",
				"sources": ["https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%83%AD%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%20%E6%96%B0%E7%94%9F%E5%85%90"],
				"checked": "2026-09-01"
			},
			"bandId": "newborn"
		},
		{
			"id": "nb-room-thermo",
			"name": "温湿度計",
			"category": "karada",
			"need": "useful",
			"startMonth": 0,
			"note": "冷暖房を効かせる部屋でも、数字で確認する習慣があると判断が早くなります。夏季は外の暑さもあわせて判断します（環境省の熱中症予防情報サイトで品川の数値が見られます）。",
			"whySources": ["https://pigeon.info/growth/baby0-2months.html", "https://www.wbgt.env.go.jp/"],
			"shops": [{
				"kind": "amazon",
				"q": "温湿度計 子供 部屋"
			}, {
				"kind": "rakuten",
				"q": "温湿度計"
			}],
			"endMonth": 24,
			"price": {
				"low": 700,
				"high": 1600,
				"unit": "1個",
				"sources": ["https://www.amazon.co.jp/s?k=%E6%B8%A9%E6%B9%BF%E5%BA%A6%E8%A8%88%20%E5%AD%90%E4%BE%9B%20%E9%83%A8%E5%B1%8B"],
				"checked": "2026-09-01"
			},
			"bandId": "newborn"
		},
		{
			"id": "nb-baby-uv",
			"name": "ベビー用日焼け止め",
			"category": "karada",
			"need": "useful",
			"startMonth": 0,
			"note": "0か月から使える紫外線対策用品が用意されています。石けんで落ちるタイプが一般的。帽子とあわせて、外出の頻度を見てからで間に合います。",
			"whySources": ["https://pigeon.info/growth/baby0-2months.html"],
			"shops": [
				{
					"kind": "amazon",
					"q": "ベビー 日焼け止め 0か月"
				},
				{
					"kind": "rakuten",
					"q": "ベビー 日焼け止め"
				},
				{
					"kind": "akachan",
					"q": "ベビー 日焼け止め"
				}
			],
			"endMonth": 36,
			"price": {
				"low": 1e3,
				"high": 2700,
				"unit": "1本",
				"sources": ["https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%20%E6%97%A5%E7%84%BC%E3%81%91%E6%AD%A2%E3%82%81%200%E3%81%8B%E6%9C%88"],
				"checked": "2026-09-01"
			},
			"bandId": "newborn"
		},
		{
			"id": "m23-bib",
			"name": "よだれかけ・スタイ",
			"category": "kiru",
			"need": "useful",
			"startMonth": 2,
			"note": "生後2〜3か月頃からよだれが増え、服の襟元が濡れるようになります。服を洗い替えるよりスタイを回す方が洗濯が減ります。6枚セットで1,300〜2,300円が目安。洗濯しやすいガーゼ生地と、よだれを通しにくい防水タイプがあります。",
			"whySources": ["https://pigeon.info/growth/baby3-4months.html"],
			"shops": [
				{
					"kind": "amazon",
					"q": "スタイ 赤ちゃん 6枚"
				},
				{
					"kind": "rakuten",
					"q": "スタイ 赤ちゃん"
				},
				{
					"kind": "nishimatyaya",
					"q": "スタイ"
				},
				{
					"kind": "akachan",
					"q": "スタイ"
				}
			],
			"endMonth": 12,
			"price": {
				"low": 1300,
				"high": 2300,
				"unit": "6枚セット",
				"sources": ["https://www.amazon.co.jp/s?k=%E3%82%B9%E3%82%BF%E3%82%A4%20%E8%B5%A4%E3%81%A1%E3%82%83%E3%82%93%206%E6%9E%9A"],
				"checked": "2026-09-01"
			},
			"bandId": "m2-3"
		},
		{
			"id": "m23-mobile",
			"name": "ベビーメリー・オルゴール",
			"category": "asobi",
			"need": "useful",
			"startMonth": 2,
			"note": "ベッドの側に取り付ける、音と光がなるおもちゃ。ねんねの時間の手遊びに使えます。生後2〜3か月の視力では近い位置の動くものを追うため、取り付け位置は寝具から手の届かない位置にします。",
			"whySources": ["https://pigeon.info/growth/baby0-2months.html"],
			"shops": [
				{
					"kind": "amazon",
					"q": "ベビーメリー 音楽"
				},
				{
					"kind": "rakuten",
					"q": "ベビーメリー"
				},
				{
					"kind": "akachan",
					"q": "メリー"
				}
			],
			"endMonth": 8,
			"price": {
				"low": 2700,
				"high": 5e3,
				"unit": "1台",
				"sources": ["https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%83%A1%E3%83%AA%E3%83%BC%20%E9%9F%B3%E6%A5%BD"],
				"checked": "2026-09-01"
			},
			"bandId": "m2-3"
		},
		{
			"id": "m23-outing-case",
			"name": "外出用 哺乳びんケース・ポーチ",
			"category": "tabe",
			"need": "useful",
			"startMonth": 2,
			"note": "予防接種と健診で小児科に行くようになり、哺乳びん・粉ミルク・着替えをまとめて持つ必要が出ます。保温・保冷できるタイプと、軽いだけでいいタイプに分かれます。",
			"whySources": ["https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000033448.html"],
			"shops": [{
				"kind": "amazon",
				"q": "哺乳びんケース 外出"
			}, {
				"kind": "rakuten",
				"q": "哺乳瓶ケース 外出"
			}],
			"endMonth": 18,
			"price": {
				"low": 1300,
				"high": 2200,
				"unit": "1個",
				"sources": ["https://www.amazon.co.jp/s?k=%E5%93%BA%E4%B9%B3%E3%81%B3%E3%82%93%E3%82%B1%E3%83%BC%E3%82%B9%20%E5%A4%96%E5%87%BA"],
				"checked": "2026-09-01"
			},
			"bandId": "m2-3"
		},
		{
			"id": "m23-raincover",
			"name": "ベビーカー用レインカバー",
			"category": "ugoku",
			"need": "useful",
			"startMonth": 2,
			"note": "雨の日や強風の日のお出かけに。ベビーカーのメーカー・形で適合が変わるので、購入前に取り付けられる型号を本体の表記と照合します。汎用型で800円前後、専用品で3,000円前後です。",
			"whySources": ["https://pigeon.info/stroller/howtochoose/"],
			"shops": [
				{
					"kind": "amazon",
					"q": "ベビーカー レインカバー"
				},
				{
					"kind": "rakuten",
					"q": "ベビーカー レインカバー"
				},
				{
					"kind": "akachan",
					"q": "レインカバー"
				}
			],
			"endMonth": 36,
			"price": {
				"low": 800,
				"high": 3600,
				"unit": "1枚",
				"sources": ["https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%82%AB%E3%83%BC%20%E3%83%AC%E3%82%A4%E3%83%B3%E3%82%AB%E3%83%90%E3%83%BC"],
				"checked": "2026-09-01"
			},
			"bandId": "m2-3"
		},
		{
			"id": "m46-chair",
			"name": "離乳食用の椅子（ハイチェア・ベビーチェア）",
			"category": "tabe",
			"need": "must",
			"startMonth": 5,
			"note": "離乳食開始が5〜6か月が目安で、食べさせる人が毎回同じ姿勢で支えられる椅子が要るため、おさまりがよく、離乳食の失敗が減ります。テーブル付きか、ダイニング椅子に固定するタイプかを部屋に置いて確認を（目安 1脚）",
			"whySources": ["https://www.pigeon.info/baby/getsurei/getsurei-8.html", "https://www.24028.jp/premama/guide/chair/"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "離乳食用の椅子"
				},
				{
					"kind": "akachan",
					"q": "離乳食用の椅子"
				},
				{
					"kind": "amazon",
					"q": "離乳食用の椅子"
				}
			],
			"endMonth": 42,
			"size": "首すわり〜・体重目安に従う",
			"price": {
				"low": 7500,
				"high": 14e3,
				"unit": "1脚",
				"sources": ["https://www.amazon.co.jp/s?k=%E3%83%8F%E3%82%A4%E3%83%81%E3%82%A7%E3%82%A2%20%E3%83%99%E3%83%93%E3%83%BC"],
				"checked": "2026-09-01"
			},
			"bandId": "m4-6"
		},
		{
			"id": "m46-tableware",
			"name": "離乳食用の食器・スプーン（初期）",
			"category": "tabe",
			"need": "must",
			"startMonth": 5,
			"note": "初期は1さじから始めるため、少量を扱う専用の器とスプーンが必要。仕切り皿、小さめのスプーン、研ぎ鉢とすりこぎ、裏ごし器が基本。100円均一でもそろえられます（目安 1セット）",
			"whySources": ["https://www.pigeon.info/baby-feeding/", "https://www.24028.jp/premama/guide/tableware/"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "離乳食用の食器・スプーン"
				},
				{
					"kind": "akachan",
					"q": "離乳食用の食器・スプーン"
				},
				{
					"kind": "uniqlo",
					"q": "離乳食用の食器・スプーン"
				},
				{
					"kind": "amazon",
					"q": "離乳食用の食器・スプーン"
				}
			],
			"endMonth": 18,
			"size": "初期用（小さめ）1セット",
			"price": {
				"low": 900,
				"high": 2600,
				"unit": "1セット",
				"sources": ["https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%20%E9%A3%9F%E5%99%A8%E3%82%BB%E3%83%83%E3%83%88"],
				"checked": "2026-09-01"
			},
			"bandId": "m4-6"
		},
		{
			"id": "m46-sheet",
			"name": "防水シーツ・敷きパッド",
			"category": "neru",
			"need": "useful",
			"startMonth": 4,
			"note": "吐き戻し、離乳食のこぼれ、おむつ漏れで布団の汚れが増える時期のため、掛けるだけで、布団丸洗いの回数を減らせます。洗濯機で洗えるタイプが扱いやすいです（目安 1〜2枚）",
			"whySources": ["https://www.pigeon.info/baby/getsurei/getsurei-5.html"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "防水シーツ・敷きパッド"
				},
				{
					"kind": "akachan",
					"q": "防水シーツ・敷きパッド"
				},
				{
					"kind": "amazon",
					"q": "防水シーツ・敷きパッド"
				}
			],
			"endMonth": 60,
			"size": "敷き布団に合うサイズ",
			"price": {
				"low": 1500,
				"high": 3e3,
				"unit": "1枚",
				"sources": ["https://www.amazon.co.jp/s?k=%E9%98%B2%E6%B0%B4%E3%82%B7%E3%83%BC%E3%83%84%20%E3%83%99%E3%83%93%E3%83%BC"],
				"checked": "2026-09-01"
			},
			"bandId": "m4-6"
		},
		{
			"id": "m46-teeth-toy",
			"name": "歯固め・布えほん（口に入れて遊ぶおもちゃ）",
			"category": "asobi",
			"need": "useful",
			"startMonth": 4,
			"note": "口に入れて物を調べる時期が始まり、安全なおもちゃが必要になるため、舐めても安全な素材、煮沸や漂白ができるかを基準に選びます。細かい部品が外れないものを選んでください（目安 2〜3個）",
			"whySources": ["https://www.pigeon.info/baby/getsurei/getsurei-5.html"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "歯固め・布えほん"
				},
				{
					"kind": "akachan",
					"q": "歯固め・布えほん"
				},
				{
					"kind": "amazon",
					"q": "歯固め・布えほん"
				}
			],
			"endMonth": 18,
			"size": "つかみやすく洗えるもの",
			"price": {
				"low": 700,
				"high": 2500,
				"unit": "布絵本3冊・歯固め1個の目安",
				"sources": ["https://www.amazon.co.jp/s?k=%E6%AD%AF%E5%9B%BA%E3%82%81", "https://www.amazon.co.jp/s?k=%E5%B8%83%E3%81%AE%E7%B5%B5%E6%9C%AC%20%E5%B8%83%E7%B5%B5%E6%9C%AC%200%E6%AD%B3"],
				"checked": "2026-09-01"
			},
			"bandId": "m4-6"
		},
		{
			"id": "m46-spit-cushion",
			"name": "吐き戻し防止クッション・傾斜マット",
			"category": "neru",
			"need": "useful",
			"startMonth": 3,
			"note": "授乳後の吐き戻しが続く時期に、布団の汚れと見守りの負担を減らす目的で使われるため、使用時は必ず大人が見ていること、寝返りできるようになったら使用をやめることが基本です（目安 1個）",
			"whySources": ["https://www.pigeon.info/baby/getsurei/getsurei-3.html"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "吐き戻し防止クッション・傾斜マット"
				},
				{
					"kind": "akachan",
					"q": "吐き戻し防止クッション・傾斜マット"
				},
				{
					"kind": "amazon",
					"q": "吐き戻し防止クッション・傾斜マット"
				}
			],
			"endMonth": 8,
			"size": "対象月齢・体重を確認",
			"price": {
				"low": 3e3,
				"high": 9e3,
				"unit": "1個",
				"sources": ["https://www.amazon.co.jp/s?k=%E5%90%90%E3%81%8D%E6%88%BB%E3%81%97%E9%98%B2%E6%AD%A2%20%E3%82%AF%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3"],
				"checked": "2026-09-01"
			},
			"bandId": "m4-6"
		},
		{
			"id": "m79-babyfood",
			"name": "ベビーフード（裏技として常備）",
			"category": "arau",
			"need": "useful",
			"startMonth": 7,
			"note": "手作りにこだわって離乳食が止まるより、親が続けられる形を守る方が実際の運用として安定するため、全食を手作りにしようとすると続かない人向け。父が1人で面倒を見る日の「正解のある選択肢」として2〜3個置いておくと安全です（目安 在庫2〜3個）",
			"whySources": ["https://pigeon.info/baby-feeding/food_9.html"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "ベビーフード"
				},
				{
					"kind": "akachan",
					"q": "ベビーフード"
				},
				{
					"kind": "amazon",
					"q": "ベビーフード"
				}
			],
			"endMonth": 18,
			"size": "7か月向け・9か月向けを混在",
			"price": {
				"low": 1200,
				"high": 3300,
				"unit": "6個〜1ケース",
				"sources": ["https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%83%95%E3%83%BC%E3%83%89"],
				"checked": "2026-09-01"
			},
			"bandId": "m7-9"
		},
		{
			"id": "m79-toothbrush",
			"name": "ハブラシ（歯みがき開始）",
			"category": "karada",
			"need": "must",
			"startMonth": 7,
			"note": "前歯が生え始める時期で、歯みがきを「嫌なものでなく日常の一部」にしておきたい。区は2歳児歯科健診を実施しています。最初は噛んで遊んでOK。奥歯が生え始めたら仕上げ磨きが本番になります（目安 1本・月1回ほどの交換）",
			"whySources": ["https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "ハブラシ"
				},
				{
					"kind": "akachan",
					"q": "ハブラシ"
				},
				{
					"kind": "amazon",
					"q": "ハブラシ"
				}
			],
			"endMonth": 36,
			"size": "赤ちゃん用・極小ヘッド",
			"price": {
				"low": 900,
				"high": 1300,
				"unit": "1本",
				"sources": ["https://www.amazon.co.jp/s?k=%E3%83%8F%E3%83%96%E3%83%A9%E3%82%B7%20%E3%83%99%E3%83%93%E3%83%BC"],
				"checked": "2026-09-01"
			},
			"bandId": "m7-9"
		},
		{
			"id": "m79-suction",
			"name": "電動鼻水吸引器",
			"category": "karada",
			"need": "useful",
			"startMonth": 7,
			"note": "鼻水で寝られない時期が年に何度も来て、深夜の受診判断に迷う回数が減るため、口で吸うタイプは親が感染するリスクと体力の消耗があります。電動は音で寝てしまう子もいるので、返品条件を事前に確認すると安心です（目安 1台）",
			"whySources": ["https://www.pigeon.info/qa/"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "電動鼻水吸引器"
				},
				{
					"kind": "akachan",
					"q": "電動鼻水吸引器"
				},
				{
					"kind": "amazon",
					"q": "電動鼻水吸引器"
				}
			],
			"endMonth": 24,
			"size": "家庭用・充電式または吸引式",
			"price": {
				"low": 5900,
				"high": 12500,
				"unit": "1台（手動は3,000円前後）",
				"sources": ["https://www.amazon.co.jp/s?k=%E9%9B%BB%E5%8B%95%E9%BC%BB%E6%B0%B4%E5%90%B8%E5%BC%95%E5%99%A8"],
				"checked": "2026-09-01"
			},
			"bandId": "m7-9"
		},
		{
			"id": "m79-circle",
			"name": "ベビーサークル・プレイマット",
			"category": "anzen",
			"need": "must",
			"startMonth": 7,
			"note": "ハイハイ〜つかまり立ちで行動範囲が急拡大し、親が離れる数分間の子どもの安全な場所が必要になるため、洗濯・入浴・料理中に「一時的に見守れる場所」を作ります。柵の間隔や高さなど事故情報はNITEで確認できます（目安 1台）",
			"whySources": ["https://www.nite.go.jp/"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "ベビーサークル・プレイマット"
				},
				{
					"kind": "akachan",
					"q": "ベビーサークル・プレイマット"
				},
				{
					"kind": "amazon",
					"q": "ベビーサークル・プレイマット"
				}
			],
			"endMonth": 24,
			"size": "部屋の動線に合わせてサイズ選び",
			"price": {
				"low": 6e3,
				"high": 16600,
				"unit": "1台",
				"sources": ["https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%82%B5%E3%83%BC%E3%82%AF%E3%83%AB"],
				"checked": "2026-09-01"
			},
			"bandId": "m7-9"
		},
		{
			"id": "m1012-shape-toy",
			"name": "型はめ・積み木（指先を使うおもちゃ）",
			"category": "asobi",
			"need": "must",
			"startMonth": 10,
			"note": "手の発達が早く、親が付き添わなくても自分で遊べる時間の第一歩になるため、自分で組み替えて遊べるおもちゃはこの時期から長く使えます。部品が口に入らないサイズか、洗える素材かを基準に選びます（目安 1セット）",
			"whySources": ["https://www.pigeon.info/baby/getsurei/getsurei-8.html"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "型はめ・積み木"
				},
				{
					"kind": "akachan",
					"q": "型はめ・積み木"
				},
				{
					"kind": "amazon",
					"q": "型はめ・積み木"
				}
			],
			"endMonth": 30,
			"size": "口に入らない大きさ",
			"price": {
				"low": 2e3,
				"high": 3700,
				"unit": "1セット",
				"sources": ["https://www.amazon.co.jp/s?k=%E5%9E%8B%E3%81%AF%E3%82%81%20%E3%81%8A%E3%82%82%E3%81%A1%E3%82%83"],
				"checked": "2026-09-01"
			},
			"bandId": "m10-12"
		},
		{
			"id": "m1012-fishing-toy",
			"name": "おさかなつりなど指先遊びのおもちゃ",
			"category": "asobi",
			"need": "useful",
			"startMonth": 10,
			"note": "指先を使う遊びは言葉や集中力の土台になり、寝る前以外の時間つぶしにも使えるため、親子の遊び方を見本で示してあげると続きやすいです。音の出るものは時間帯を決めておくと夜泣きの妨げになりません（目安 1個）",
			"whySources": ["https://www.pigeon.info/baby/getsurei/getsurei-8.html"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "おさかなつりなど指先遊びのおもちゃ"
				},
				{
					"kind": "akachan",
					"q": "おさかなつりなど指先遊びのおもちゃ"
				},
				{
					"kind": "amazon",
					"q": "おさかなつりなど指先遊びのおもちゃ"
				}
			],
			"endMonth": 24,
			"size": "部品が大きく丸みがあるもの",
			"price": {
				"low": 1e3,
				"high": 1800,
				"unit": "1個",
				"sources": ["https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%20%E3%81%8A%E3%81%95%E3%81%8B%E3%81%AA%E3%81%A4%E3%82%8A"],
				"checked": "2026-09-01"
			},
			"bandId": "m10-12"
		},
		{
			"id": "m1012-milk-stock",
			"name": "液体ミルク（非常用備蓄）",
			"category": "arau",
			"need": "must",
			"startMonth": 10,
			"note": "調乳不要で災害時にそのまま飲めるため、備蓄用には必須に近い保険です。1本（80ml）あたり803〜2,495円で、ケース買いなら1本あたりは下がります（目安 6〜12本）",
			"whySources": ["https://www.pigeon.info/products/item/920"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "液体ミルク"
				},
				{
					"kind": "akachan",
					"q": "液体ミルク"
				},
				{
					"kind": "amazon",
					"q": "液体ミルク"
				}
			],
			"endMonth": 24,
			"size": "200ml入り12本前後",
			"price": {
				"low": 803,
				"high": 2495,
				"unit": "1本（80ml）",
				"sources": ["https://www.amazon.co.jp/s?k=%E6%B6%B2%E4%BD%93%E3%83%9F%E3%83%AB%E3%82%AF%2080ml&language=ja_JP&currency=JPY"],
				"checked": "2026-09-02"
			},
			"bandId": "m10-12"
		},
		{
			"id": "m1012-hat",
			"name": "帽子（紫外線対策・防寒）",
			"category": "kiru",
			"need": "must",
			"startMonth": 10,
			"note": "公園での時間が増え、紫外線と温度調整を親が管理しなければならないため、外出時間が増える分、帽子の不足がそのまま日焼け対策の漏れになります。洗濯を考慮して2枚持っておくと安心です（目安 1〜2個）",
			"whySources": ["https://www.wbgt.env.go.jp/"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "帽子"
				},
				{
					"kind": "akachan",
					"q": "帽子"
				},
				{
					"kind": "uniqlo",
					"q": "帽子"
				}
			],
			"endMonth": 36,
			"size": "頭囲を実測して選ぶ",
			"price": {
				"low": 1300,
				"high": 2900,
				"unit": "1個",
				"sources": ["https://www.amazon.co.jp/s?k=%E3%82%AD%E3%83%83%E3%82%BA%E5%B8%BD%E5%AD%90%20%E7%B4%AB%E5%A4%96%E7%B7%9A%E5%AF%BE%E7%AD%96"],
				"checked": "2026-09-01"
			},
			"bandId": "m10-12"
		},
		{
			"id": "m1318-indoor-gym",
			"name": "室内遊具（ジャングルジム・すべり台）",
			"category": "asobi",
			"need": "useful",
			"startMonth": 14,
			"note": "外出できない日でも体を動かせる場所が必要で、不足すると室内での登高行動が増えるため、雨の日や気温が高い日の体力発散用。組み立てと収納のしやすさを先に確認すると、部屋に置いたままにしにくいです（目安 1台）",
			"whySources": ["https://www.nite.go.jp/"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "室内遊具"
				},
				{
					"kind": "akachan",
					"q": "室内遊具"
				},
				{
					"kind": "amazon",
					"q": "室内遊具"
				}
			],
			"endMonth": 48,
			"size": "対象年齢と耐荷重を確認",
			"price": {
				"low": 7e3,
				"high": 16700,
				"unit": "1台",
				"sources": ["https://www.amazon.co.jp/s?k=%E3%82%B8%E3%83%A3%E3%83%B3%E3%82%B0%E3%83%AB%E3%82%B8%E3%83%A0%20%E3%81%99%E3%81%B9%E3%82%8A%E5%8F%B0%20%E5%AE%A4%E5%86%85"],
				"checked": "2026-09-01"
			},
			"bandId": "m13-18"
		},
		{
			"id": "m1318-step",
			"name": "踏み台（キッズステップ）",
			"category": "anzen",
			"need": "must",
			"startMonth": 14,
			"note": "自分で手洗い・うがいができる高さに届くと、親の付き添いが必要な作業が減るため、手洗い・歯みがき・服の着替えなど「自分でやる」のための道具。倒れにくい低めのものから始めてください（目安 1台）",
			"whySources": ["https://www.pigeon.info/baby/getsurei/getsurei-12.html"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "踏み台"
				},
				{
					"kind": "akachan",
					"q": "踏み台"
				},
				{
					"kind": "amazon",
					"q": "踏み台"
				}
			],
			"endMonth": 72,
			"size": "滑り止め付き・耐荷重を確認",
			"price": {
				"low": 1800,
				"high": 4e3,
				"unit": "1台",
				"sources": ["https://www.amazon.co.jp/s?k=%E3%82%AD%E3%83%83%E3%82%BA%E3%82%B9%E3%83%86%E3%83%83%E3%83%97%20%E8%B8%8F%E3%81%BF%E5%8F%B0"],
				"checked": "2026-09-01"
			},
			"bandId": "m13-18"
		},
		{
			"id": "m1318-childproof",
			"name": "家具転倒防止ストッパー・いたずら対策用品",
			"category": "anzen",
			"need": "must",
			"startMonth": 13,
			"note": "引き出しにつかまって立つ・引く行動が増え、転倒・挟まれ・誤飲の事故リスクが上がる時期のため、テレビ・棚の固定、引き出しのロック、コンセントのキャップ、窓の開放制限を一気に済ませます。入居直後の部屋は特に見落としが多いです（目安 一式（各2〜4個））",
			"whySources": ["https://www.nite.go.jp/"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "家具転倒防止ストッパー・いたずら対策用品"
				},
				{
					"kind": "akachan",
					"q": "家具転倒防止ストッパー・いたずら対策用品"
				},
				{
					"kind": "amazon",
					"q": "家具転倒防止ストッパー・いたずら対策用品"
				}
			],
			"endMonth": 36,
			"size": "家具のサイズ・引き出しの幅に合うもの",
			"price": {
				"low": 800,
				"high": 2400,
				"unit": "一式",
				"sources": ["https://www.amazon.co.jp/s?k=%E5%AE%B6%E5%85%B7%E8%BB%A2%E5%80%92%E9%98%B2%E6%AD%A2%20%E3%82%B9%E3%83%88%E3%83%A9%E3%83%83%E3%83%97"],
				"checked": "2026-09-01"
			},
			"bandId": "m13-18"
		},
		{
			"id": "m1318-shades",
			"name": "ベビーカー・チャイルドシート用サンシェード",
			"category": "ugoku",
			"need": "useful",
			"startMonth": 13,
			"note": "屋外での熱中症リスクを下げ、ベビーカー内の温度上昇を抑えるため、日差しの角度が変わる春夏に効果が出ます。装着が面倒なものは使われないので、留め具が簡単なものを選んでください（目安 1〜2個）",
			"whySources": ["https://www.wbgt.env.go.jp/"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "ベビーカー・チャイルドシート用サンシェード"
				},
				{
					"kind": "akachan",
					"q": "ベビーカー・チャイルドシート用サンシェード"
				},
				{
					"kind": "amazon",
					"q": "ベビーカー・チャイルドシート用サンシェード"
				}
			],
			"endMonth": 36,
			"size": "機種に合うサイズ",
			"price": {
				"low": 900,
				"high": 1800,
				"unit": "1個",
				"sources": ["https://www.amazon.co.jp/s?k=%E3%83%81%E3%83%A3%E3%82%A4%E3%83%AB%E3%83%89%E3%82%B7%E3%83%BC%E3%83%88%20%E3%82%B5%E3%83%B3%E3%82%B7%E3%82%A7%E3%83%BC%E3%83%89"],
				"checked": "2026-09-01"
			},
			"bandId": "m13-18"
		},
		{
			"id": "m1924-train-pants",
			"name": "布のトレーニングパンツ",
			"category": "kiru",
			"need": "must",
			"startMonth": 20,
			"note": "布タイプは漏れを受け止める層があり、洗濯前提で何度も使えます。3枚セットで1,598〜3,080円程度。紙おむつのみの補助で足りる家庭は買わなくても進みます（目安 3〜6枚）",
			"whySources": ["https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "布のトレーニングパンツ"
				},
				{
					"kind": "akachan",
					"q": "布のトレーニングパンツ"
				},
				{
					"kind": "uniqlo",
					"q": "布のトレーニングパンツ"
				}
			],
			"endMonth": 36,
			"size": "90〜95cm・6層〜8層",
			"price": {
				"low": 1598,
				"high": 3080,
				"unit": "3枚セット",
				"sources": ["https://www.amazon.co.jp/s?k=%E5%B8%83%E3%83%88%E3%83%AC%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E3%83%91%E3%83%B3%E3%83%84&language=ja_JP&currency=JPY"],
				"checked": "2026-09-02"
			},
			"bandId": "m19-24"
		},
		{
			"id": "m1924-chopsticks",
			"name": "練習用箸（トレーニング箸）",
			"category": "tabe",
			"need": "must",
			"startMonth": 18,
			"note": "自分で食べたい欲求が強くなる時期で、道具が揃っていないと食事が親の手付きのままになるため、指入れのリング付きから始めて、リングなし、本物の箸へ段階を踏みます。食器セットと同じ時期にそろえると洗い替えが楽です（目安 1〜2足）",
			"whySources": ["https://www.pigeon.info/baby-feeding/"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "練習用箸"
				},
				{
					"kind": "akachan",
					"q": "練習用箸"
				},
				{
					"kind": "amazon",
					"q": "練習用箸"
				}
			],
			"endMonth": 48,
			"size": "手のサイズに合う長さ",
			"price": {
				"low": 400,
				"high": 1300,
				"unit": "1足",
				"sources": ["https://www.amazon.co.jp/s?k=%E3%83%88%E3%83%AC%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E7%AD%B7%20%E5%AD%90%E4%BE%9B"],
				"checked": "2026-09-01"
			},
			"bandId": "m19-24"
		},
		{
			"id": "m1924-roleplay",
			"name": "ごっこ遊びのおもちゃ（おままごと道具）",
			"category": "asobi",
			"need": "useful",
			"startMonth": 20,
			"note": "2歳前半からは見立て遊びが広がり、ごっこ遊びの道具が遊びの幅を左右します。木製キッチン含むセットは2,138〜1万6,990円と幅が大きいので、最初の1セットは小さめで十分（目安 1セット）",
			"whySources": ["https://www.pigeon.info/baby/getsurei/getsurei-12.html"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "ごっこ遊びのおもちゃ"
				},
				{
					"kind": "akachan",
					"q": "ごっこ遊びのおもちゃ"
				},
				{
					"kind": "amazon",
					"q": "ごっこ遊びのおもちゃ"
				}
			],
			"endMonth": 60,
			"size": "小さい部品が少ないもの",
			"price": {
				"low": 2138,
				"high": 16990,
				"unit": "1セット",
				"sources": ["https://www.amazon.co.jp/s?k=%E3%81%8A%E3%81%BE%E3%81%BE%E3%81%94%E3%81%A8%20%E3%82%AD%E3%83%83%E3%83%81%E3%83%B3%20%E3%81%8A%E3%82%82%E3%81%A1%E3%82%83&language=ja_JP&currency=JPY"],
				"checked": "2026-09-02"
			},
			"bandId": "m19-24"
		},
		{
			"id": "m1924-ikusu-toy",
			"name": "2歳向けの知育玩具・絵本",
			"category": "asobi",
			"need": "useful",
			"startMonth": 19,
			"note": "集中して遊ぶ時間が延び、親が少し離れている時間を作れるため、遊んだ後に片付けられる量に抑えると、部屋が荒れにくくなります。図書館の読み聞かせ会も併用できます（目安 1〜2個）",
			"whySources": ["https://www.pigeon.info/baby/getsurei/getsurei-12.html"],
			"shops": [
				{
					"kind": "nishimatyaya",
					"q": "2歳向けの知育玩具・絵本"
				},
				{
					"kind": "akachan",
					"q": "2歳向けの知育玩具・絵本"
				},
				{
					"kind": "amazon",
					"q": "2歳向けの知育玩具・絵本"
				}
			],
			"endMonth": 48,
			"size": "対象年齢2歳以上のもの",
			"price": {
				"low": 2100,
				"high": 4500,
				"unit": "1個",
				"sources": ["https://www.amazon.co.jp/s?k=%E7%9F%A5%E8%82%B2%E7%8E%A9%E5%85%B7%202%E6%AD%B3"],
				"checked": "2026-09-01"
			},
			"bandId": "m19-24"
		}
	],
	"sources": [
		{
			"name": "品川区「妊婦のための支援給付事業について」",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/20230120091157.html",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "品川区「産後ケア事業 宿泊型」",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/20240328204508.html",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "西松屋「ベビーアイテム別準備品リスト 新生児衣料」",
			"url": "https://www.24028.jp/premama/preparation-item/newborn/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "アカチャンホンポ「短肌着」",
			"url": "https://shop.akachan.jp/shop/c/cb065/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "西松屋「ベビーウェア選び方・使い方ガイド」",
			"url": "https://www.24028.jp/premama/guide/babywear/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "Amazon.co.jp 商品検索「ドレスオール 肌着 赤ちゃん」",
			"url": "https://www.amazon.co.jp/s?k=%E3%83%89%E3%83%AC%E3%82%B9%E3%82%AA%E3%83%BC%E3%83%AB%20%E8%82%8C%E7%9D%80%20%E8%B5%A4%E3%81%A1%E3%82%83%E3%82%93&language=ja_JP&currency=JPY",
			"checked": "2026-09-02",
			"bandId": "pregnancy"
		},
		{
			"name": "アカチャンホンポ「ガーゼ・入浴布・汗取りパット」",
			"url": "https://shop.akachan.jp/shop/c/cb071/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "アカチャンホンポ「おくるみ」",
			"url": "https://shop.akachan.jp/shop/c/cb347/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "こども家庭庁「赤ちゃんが安全に眠れるように」",
			"url": "https://www.cfa.go.jp/policies/boshihoken/kenkou/sids",
			"checked": "2026-08-15",
			"bandId": "pregnancy"
		},
		{
			"name": "西松屋「ミルク＆おむつ準備品リスト」",
			"url": "https://www.24028.jp/premama/preparation-item/milkdiapers/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "西松屋「おむつ選び方・使い方ガイド」",
			"url": "https://www.24028.jp/premama/guide/diapers/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "アカチャンホンポ「紙おむつ（テープタイプ）」",
			"url": "https://shop.akachan.jp/shop/c/cb327/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "西松屋オンラインストア「紙おむつ」",
			"url": "https://www.24028-net.jp/category/EX_PAPERDIAPER/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "西松屋オンラインストア「おしりふき」",
			"url": "https://www.24028-net.jp/category/EX_WIPE/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "アカチャンホンポ「おしりふき」",
			"url": "https://shop.akachan.jp/shop/c/cb332/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "西松屋「哺乳びん乳首・除菌アイテム選び方・使い方ガイド」",
			"url": "https://www.24028.jp/premama/guide/bottlenipple/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "アカチャンホンポ「ほ乳びん・乳首」",
			"url": "https://shop.akachan.jp/shop/c/cb143/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "アカチャンホンポ「ほ乳びん洗浄・消毒グッズ」",
			"url": "https://shop.akachan.jp/shop/c/cb146/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "西松屋「ベビーバス選び方・使い方ガイド」",
			"url": "https://www.24028.jp/premama/guide/babybath/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "西松屋「お風呂＆衛生グッズ準備品リスト」",
			"url": "https://www.24028.jp/premama/preparation-item/bathsanitary/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "アカチャンホンポ「おふろグッズ」",
			"url": "https://shop.akachan.jp/shop/c/cb152/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "西松屋オンラインストア「お風呂グッズ」",
			"url": "https://www.24028-net.jp/category/SANI_BATH/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "西松屋「ねんねグッズ準備品リスト」",
			"url": "https://www.24028.jp/premama/preparation-item/bedding/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "Amazon.co.jp 商品検索「簡易ベビーベッド」（3,000〜40,000円指定）",
			"url": "https://www.amazon.co.jp/s?k=%E7%B0%A1%E6%98%93%E3%83%99%E3%83%93%E3%83%BC%E3%83%99%E3%83%83%E3%83%89&language=ja_JP&currency=JPY&p_36-price-min=3000&p_36-price-max=40000",
			"checked": "2026-09-02",
			"bandId": "pregnancy"
		},
		{
			"name": "西松屋「チャイルドシート選び方・使い方ガイド」",
			"url": "https://www.24028.jp/premama/guide/childseat/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "西松屋オンラインストア「ベビー＆チャイルド兼用タイプ（新生児〜4歳頃まで）」",
			"url": "https://www.24028-net.jp/category/SEAT_BABY_CHILD/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "アカチャンホンポ「チャイルドシート」",
			"url": "https://shop.akachan.jp/shop/c/cb285/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "西松屋「育児グッズ準備品リスト」",
			"url": "https://www.24028.jp/premama/preparation-item/childcare/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "ピジョン「ベビーカー選び方完全ガイド」",
			"url": "https://pigeon.info/stroller/howtochoose/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "西松屋オンラインストア「ベビーカー（A型）」",
			"url": "https://www.24028-net.jp/category/TRIP_STROLLER/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "アカチャンホンポ「ファーストベビーカー・A型ベビーカー」",
			"url": "https://shop.akachan.jp/shop/c/cb290/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "西松屋オンラインストア「抱っこ紐」",
			"url": "https://www.24028-net.jp/category/TRIP_BABYCARRIER/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "アカチャンホンポ「抱っこ紐・スリング」",
			"url": "https://shop.akachan.jp/shop/c/cb288/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "西松屋オンラインストア 検索「授乳クッション」",
			"url": "https://www.24028-net.jp/item_list.html?searchbox=1&q=%E6%8E%88%E4%B9%B3%E3%82%AF%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3",
			"checked": "2026-09-02",
			"bandId": "pregnancy"
		},
		{
			"name": "アカチャンホンポ「抱き枕・授乳クッション」",
			"url": "https://shop.akachan.jp/shop/c/cb028/",
			"checked": "2026-09-01",
			"bandId": "pregnancy"
		},
		{
			"name": "品川区 すくすく赤ちゃん訪問事業",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/hpg000022461.html",
			"checked": "2026-09-02",
			"bandId": "newborn"
		},
		{
			"name": "品川区 電話授乳相談",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/hpg000033270.html",
			"checked": "2026-09-02",
			"bandId": "newborn"
		},
		{
			"name": "品川区 産後ケア事業（訪問型）",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/20240328204226.html",
			"checked": "2026-09-02",
			"bandId": "newborn"
		},
		{
			"name": "ピジョン はじめての育児 新生児〜ねんねの頃（0〜2か月）",
			"url": "https://pigeon.info/growth/baby0-2months.html",
			"checked": "2026-09-02",
			"bandId": "newborn"
		},
		{
			"name": "Amazon.co.jp 検索「母乳パッド」",
			"url": "https://www.amazon.co.jp/s?k=%E6%AF%8D%E4%B9%B3%E3%83%91%E3%83%83%E3%83%89",
			"checked": "2026-09-01",
			"bandId": "newborn"
		},
		{
			"name": "Amazon.co.jp 検索「母乳ポンプ」",
			"url": "https://www.amazon.co.jp/s?k=%E6%AF%8D%E4%B9%B3%E3%83%9D%E3%83%B3%E3%83%97",
			"checked": "2026-09-01",
			"bandId": "newborn"
		},
		{
			"name": "Amazon.co.jp 検索「ベビーローション 新生児」",
			"url": "https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%83%AD%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%20%E6%96%B0%E7%94%9F%E5%85%90",
			"checked": "2026-09-01",
			"bandId": "newborn"
		},
		{
			"name": "環境省 WBGT 公開ページ（熱中症予防情報）",
			"url": "https://www.wbgt.env.go.jp/",
			"checked": "2026-09-02",
			"bandId": "newborn"
		},
		{
			"name": "Amazon.co.jp 検索「温湿度計 子供 部屋」",
			"url": "https://www.amazon.co.jp/s?k=%E6%B8%A9%E6%B9%BF%E5%BA%A6%E8%A8%88%20%E5%AD%90%E4%BE%9B%20%E9%83%A8%E5%B1%8B",
			"checked": "2026-09-01",
			"bandId": "newborn"
		},
		{
			"name": "Amazon.co.jp 検索「ベビー 日焼け止め 0か月」",
			"url": "https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%20%E6%97%A5%E7%84%BC%E3%81%91%E6%AD%A2%E3%82%81%200%E3%81%8B%E6%9C%88",
			"checked": "2026-09-01",
			"bandId": "newborn"
		},
		{
			"name": "品川区 こどもの予防接種",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000033448.html",
			"checked": "2026-09-02",
			"bandId": "m2-3"
		},
		{
			"name": "品川区 乳幼児の健康診査・相談",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html",
			"checked": "2026-09-02",
			"bandId": "m2-3"
		},
		{
			"name": "品川区 オアシスルーム（ポップンルーム）",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/oashisuroom/hpg000033303.html",
			"checked": "2026-09-02",
			"bandId": "m2-3"
		},
		{
			"name": "ピジョン はじめての育児 首がすわってくる頃（3〜4か月）",
			"url": "https://pigeon.info/growth/baby3-4months.html",
			"checked": "2026-09-02",
			"bandId": "m2-3"
		},
		{
			"name": "Amazon.co.jp 検索「スタイ 赤ちゃん 6枚」",
			"url": "https://www.amazon.co.jp/s?k=%E3%82%B9%E3%82%BF%E3%82%A4%20%E8%B5%A4%E3%81%A1%E3%82%83%E3%82%93%206%E6%9E%9A",
			"checked": "2026-09-01",
			"bandId": "m2-3"
		},
		{
			"name": "ピジョン はじめての育児 新生児〜ねんねの頃（0〜2か月）",
			"url": "https://pigeon.info/growth/baby0-2months.html",
			"checked": "2026-09-02",
			"bandId": "m2-3"
		},
		{
			"name": "Amazon.co.jp 検索「ベビーメリー 音楽」",
			"url": "https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%83%A1%E3%83%AA%E3%83%BC%20%E9%9F%B3%E6%A5%BD",
			"checked": "2026-09-01",
			"bandId": "m2-3"
		},
		{
			"name": "Amazon.co.jp 検索「哺乳びんケース 外出」",
			"url": "https://www.amazon.co.jp/s?k=%E5%93%BA%E4%B9%B3%E3%81%B3%E3%82%93%E3%82%B1%E3%83%BC%E3%82%B9%20%E5%A4%96%E5%87%BA",
			"checked": "2026-09-01",
			"bandId": "m2-3"
		},
		{
			"name": "ピジョン ベビーカーの選び方（A型・B型）",
			"url": "https://pigeon.info/stroller/howtochoose/",
			"checked": "2026-09-02",
			"bandId": "m2-3"
		},
		{
			"name": "Amazon.co.jp 検索「ベビーカー レインカバー」",
			"url": "https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%82%AB%E3%83%BC%20%E3%83%AC%E3%82%A4%E3%83%B3%E3%82%AB%E3%83%90%E3%83%BC",
			"checked": "2026-09-01",
			"bandId": "m2-3"
		},
		{
			"name": "品川区 乳幼児の健康診査・相談",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html",
			"checked": "2026-09-02",
			"bandId": "m4-6"
		},
		{
			"name": "品川区 動画で見る「離乳食」",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-kateisoudan/hpg000010365.html",
			"checked": "2026-09-02",
			"bandId": "m4-6"
		},
		{
			"name": "品川区 電話授乳相談",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-umaretara/hpg000033270.html",
			"checked": "2026-09-02",
			"bandId": "m4-6"
		},
		{
			"name": "https://www.pigeon.info/baby/getsurei/getsurei-8.html",
			"url": "https://www.pigeon.info/baby/getsurei/getsurei-8.html",
			"checked": "2026-09-02",
			"bandId": "m4-6"
		},
		{
			"name": "https://www.24028.jp/premama/guide/chair/",
			"url": "https://www.24028.jp/premama/guide/chair/",
			"checked": "2026-09-02",
			"bandId": "m4-6"
		},
		{
			"name": "Amazon.co.jp 検索「ハイチェア ベビー」",
			"url": "https://www.amazon.co.jp/s?k=%E3%83%8F%E3%82%A4%E3%83%81%E3%82%A7%E3%82%A2%20%E3%83%99%E3%83%93%E3%83%BC",
			"checked": "2026-09-01",
			"bandId": "m4-6"
		},
		{
			"name": "ピジョン 離乳食の進め方",
			"url": "https://www.pigeon.info/baby-feeding/",
			"checked": "2026-09-02",
			"bandId": "m4-6"
		},
		{
			"name": "https://www.24028.jp/premama/guide/tableware/",
			"url": "https://www.24028.jp/premama/guide/tableware/",
			"checked": "2026-09-02",
			"bandId": "m4-6"
		},
		{
			"name": "Amazon.co.jp 検索「ベビー 食器セット」",
			"url": "https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%20%E9%A3%9F%E5%99%A8%E3%82%BB%E3%83%83%E3%83%88",
			"checked": "2026-09-01",
			"bandId": "m4-6"
		},
		{
			"name": "ピジョン はじめての育児 生後5か月の発達・成長",
			"url": "https://www.pigeon.info/baby/getsurei/getsurei-5.html",
			"checked": "2026-09-02",
			"bandId": "m4-6"
		},
		{
			"name": "Amazon.co.jp 検索「防水シーツ ベビー」",
			"url": "https://www.amazon.co.jp/s?k=%E9%98%B2%E6%B0%B4%E3%82%B7%E3%83%BC%E3%83%84%20%E3%83%99%E3%83%93%E3%83%BC",
			"checked": "2026-09-01",
			"bandId": "m4-6"
		},
		{
			"name": "Amazon.co.jp 検索「歯固め」",
			"url": "https://www.amazon.co.jp/s?k=%E6%AD%AF%E5%9B%BA%E3%82%81",
			"checked": "2026-09-01",
			"bandId": "m4-6"
		},
		{
			"name": "Amazon.co.jp 検索「布の絵本 布絵本 0歳」",
			"url": "https://www.amazon.co.jp/s?k=%E5%B8%83%E3%81%AE%E7%B5%B5%E6%9C%AC%20%E5%B8%83%E7%B5%B5%E6%9C%AC%200%E6%AD%B3",
			"checked": "2026-09-01",
			"bandId": "m4-6"
		},
		{
			"name": "ピジョン はじめての育児 生後3か月の発達・成長",
			"url": "https://www.pigeon.info/baby/getsurei/getsurei-3.html",
			"checked": "2026-09-02",
			"bandId": "m4-6"
		},
		{
			"name": "Amazon.co.jp 検索「吐き戻し防止 クッション」",
			"url": "https://www.amazon.co.jp/s?k=%E5%90%90%E3%81%8D%E6%88%BB%E3%81%97%E9%98%B2%E6%AD%A2%20%E3%82%AF%E3%83%83%E3%82%B7%E3%83%A7%E3%83%B3",
			"checked": "2026-09-01",
			"bandId": "m4-6"
		},
		{
			"name": "品川区 乳幼児の健康診査・相談",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html",
			"checked": "2026-09-02",
			"bandId": "m7-9"
		},
		{
			"name": "品川区 一時保育",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-hoyou/kodomo-hoyou-ichizi/hpg000033215.html",
			"checked": "2026-09-02",
			"bandId": "m7-9"
		},
		{
			"name": "品川区 オアシスルーム（認可外保育施設）",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/oashisuroom/hpg000033303.html",
			"checked": "2026-09-02",
			"bandId": "m7-9"
		},
		{
			"name": "ピジョン 離乳食ステップ9（9〜11か月ころ）",
			"url": "https://pigeon.info/baby-feeding/food_9.html",
			"checked": "2026-09-02",
			"bandId": "m7-9"
		},
		{
			"name": "Amazon.co.jp 検索「ベビーフード」",
			"url": "https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%83%95%E3%83%BC%E3%83%89",
			"checked": "2026-09-01",
			"bandId": "m7-9"
		},
		{
			"name": "Amazon.co.jp 検索「ハブラシ ベビー」",
			"url": "https://www.amazon.co.jp/s?k=%E3%83%8F%E3%83%96%E3%83%A9%E3%82%B7%20%E3%83%99%E3%83%93%E3%83%BC",
			"checked": "2026-09-01",
			"bandId": "m7-9"
		},
		{
			"name": "ピジョン 離乳食のQ&A",
			"url": "https://www.pigeon.info/qa/",
			"checked": "2026-09-02",
			"bandId": "m7-9"
		},
		{
			"name": "Amazon.co.jp 検索「電動鼻水吸引器」",
			"url": "https://www.amazon.co.jp/s?k=%E9%9B%BB%E5%8B%95%E9%BC%BB%E6%B0%B4%E5%90%B8%E5%BC%95%E5%99%A8",
			"checked": "2026-09-01",
			"bandId": "m7-9"
		},
		{
			"name": "NITE 製品安全・製品事故情報",
			"url": "https://www.nite.go.jp/",
			"checked": "2026-09-02",
			"bandId": "m7-9"
		},
		{
			"name": "Amazon.co.jp 検索「ベビーサークル」",
			"url": "https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%E3%82%B5%E3%83%BC%E3%82%AF%E3%83%AB",
			"checked": "2026-09-01",
			"bandId": "m7-9"
		},
		{
			"name": "こどもの予防接種（品川区）",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kenkou/yobousessyu/hpg000033448.html",
			"checked": "2026-09-02",
			"bandId": "m10-12"
		},
		{
			"name": "品川区 転入届（別の自治体から品川区に引っ越したとき）",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-zyuumin_inkan/procedure-zyuumin_inkan-zyuumin/procedure-zyuumin_inkan-zyuumin-todoke/tennyu20241020.html",
			"checked": "2026-09-02",
			"bandId": "m10-12"
		},
		{
			"name": "品川区 パパの子育てスタートブック",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/hpg000016964.html",
			"checked": "2026-09-02",
			"bandId": "m10-12"
		},
		{
			"name": "品川区 子どもすこやか医療費助成",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-iryohizyosei/hpg000017744.html",
			"checked": "2026-09-02",
			"bandId": "m10-12"
		},
		{
			"name": "ピジョン はじめての育児 生後8か月の発達・成長",
			"url": "https://www.pigeon.info/baby/getsurei/getsurei-8.html",
			"checked": "2026-09-02",
			"bandId": "m10-12"
		},
		{
			"name": "Amazon.co.jp 検索「型はめ おもちゃ」",
			"url": "https://www.amazon.co.jp/s?k=%E5%9E%8B%E3%81%AF%E3%82%81%20%E3%81%8A%E3%82%82%E3%81%A1%E3%82%83",
			"checked": "2026-09-01",
			"bandId": "m10-12"
		},
		{
			"name": "Amazon.co.jp 検索「ベビー おさかなつり」",
			"url": "https://www.amazon.co.jp/s?k=%E3%83%99%E3%83%93%E3%83%BC%20%E3%81%8A%E3%81%95%E3%81%8B%E3%81%AA%E3%81%A4%E3%82%8A",
			"checked": "2026-09-01",
			"bandId": "m10-12"
		},
		{
			"name": "ピジョン 液体ミルク かいおきミルク",
			"url": "https://www.pigeon.info/products/item/920",
			"checked": "2026-09-02",
			"bandId": "m10-12"
		},
		{
			"name": "Amazon.co.jp 商品検索「液体ミルク 80ml」",
			"url": "https://www.amazon.co.jp/s?k=%E6%B6%B2%E4%BD%93%E3%83%9F%E3%83%AB%E3%82%AF%2080ml&language=ja_JP&currency=JPY",
			"checked": "2026-09-02",
			"bandId": "m10-12"
		},
		{
			"name": "環境省 WBGT 公開ページ（熱中症予防情報）",
			"url": "https://www.wbgt.env.go.jp/",
			"checked": "2026-09-02",
			"bandId": "m10-12"
		},
		{
			"name": "Amazon.co.jp 検索「キッズ帽子 紫外線対策」",
			"url": "https://www.amazon.co.jp/s?k=%E3%82%AD%E3%83%83%E3%82%BA%E5%B8%BD%E5%AD%90%20%E7%B4%AB%E5%A4%96%E7%B7%9A%E5%AF%BE%E7%AD%96",
			"checked": "2026-09-01",
			"bandId": "m10-12"
		},
		{
			"name": "品川区 乳幼児の健康診査・相談",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html",
			"checked": "2026-09-02",
			"bandId": "m13-18"
		},
		{
			"name": "品川区 保育所入(転)園申請",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-hoyou/kodomo-hoyou-hoikuen/hpg000027973.html",
			"checked": "2026-09-02",
			"bandId": "m13-18"
		},
		{
			"name": "品川区 ファミリー・サポート・センター",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-kateisoudan/hpg000020024.html",
			"checked": "2026-09-02",
			"bandId": "m13-18"
		},
		{
			"name": "品川区 病児保育",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-hoyou/kodomo-hoyou-ichizi/hpg000033509.html",
			"checked": "2026-09-02",
			"bandId": "m13-18"
		},
		{
			"name": "NITE 製品安全・製品事故情報",
			"url": "https://www.nite.go.jp/",
			"checked": "2026-09-02",
			"bandId": "m13-18"
		},
		{
			"name": "Amazon.co.jp 検索「ジャングルジム すべり台 室内」",
			"url": "https://www.amazon.co.jp/s?k=%E3%82%B8%E3%83%A3%E3%83%B3%E3%82%B0%E3%83%AB%E3%82%B8%E3%83%A0%20%E3%81%99%E3%81%B9%E3%82%8A%E5%8F%B0%20%E5%AE%A4%E5%86%85",
			"checked": "2026-09-01",
			"bandId": "m13-18"
		},
		{
			"name": "ピジョン はじめての育児 1歳の発達・成長",
			"url": "https://www.pigeon.info/baby/getsurei/getsurei-12.html",
			"checked": "2026-09-02",
			"bandId": "m13-18"
		},
		{
			"name": "Amazon.co.jp 検索「キッズステップ 踏み台」",
			"url": "https://www.amazon.co.jp/s?k=%E3%82%AD%E3%83%83%E3%82%BA%E3%82%B9%E3%83%86%E3%83%83%E3%83%97%20%E8%B8%8F%E3%81%BF%E5%8F%B0",
			"checked": "2026-09-01",
			"bandId": "m13-18"
		},
		{
			"name": "Amazon.co.jp 検索「家具転倒防止 ストラップ」",
			"url": "https://www.amazon.co.jp/s?k=%E5%AE%B6%E5%85%B7%E8%BB%A2%E5%80%92%E9%98%B2%E6%AD%A2%20%E3%82%B9%E3%83%88%E3%83%A9%E3%83%83%E3%83%97",
			"checked": "2026-09-01",
			"bandId": "m13-18"
		},
		{
			"name": "環境省 WBGT 公開ページ（熱中症予防情報）",
			"url": "https://www.wbgt.env.go.jp/",
			"checked": "2026-09-02",
			"bandId": "m13-18"
		},
		{
			"name": "Amazon.co.jp 検索「チャイルドシート サンシェード」",
			"url": "https://www.amazon.co.jp/s?k=%E3%83%81%E3%83%A3%E3%82%A4%E3%83%AB%E3%83%89%E3%82%B7%E3%83%BC%E3%83%88%20%E3%82%B5%E3%83%B3%E3%82%B7%E3%82%A7%E3%83%BC%E3%83%89",
			"checked": "2026-09-01",
			"bandId": "m13-18"
		},
		{
			"name": "品川区 乳幼児の健康診査・相談",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-yobousessyu/hpg000000798.html",
			"checked": "2026-09-02",
			"bandId": "m19-24"
		},
		{
			"name": "品川区 ファミリー・サポート・センター",
			"url": "https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-kateisoudan/hpg000020024.html",
			"checked": "2026-09-02",
			"bandId": "m19-24"
		},
		{
			"name": "Amazon.co.jp 商品検索「布トレーニングパンツ」",
			"url": "https://www.amazon.co.jp/s?k=%E5%B8%83%E3%83%88%E3%83%AC%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E3%83%91%E3%83%B3%E3%83%84&language=ja_JP&currency=JPY",
			"checked": "2026-09-02",
			"bandId": "m19-24"
		},
		{
			"name": "ピジョン 離乳食の進め方",
			"url": "https://www.pigeon.info/baby-feeding/",
			"checked": "2026-09-02",
			"bandId": "m19-24"
		},
		{
			"name": "Amazon.co.jp 検索「トレーニング箸 子供」",
			"url": "https://www.amazon.co.jp/s?k=%E3%83%88%E3%83%AC%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E7%AD%B7%20%E5%AD%90%E4%BE%9B",
			"checked": "2026-09-01",
			"bandId": "m19-24"
		},
		{
			"name": "ピジョン はじめての育児 1歳の発達・成長",
			"url": "https://www.pigeon.info/baby/getsurei/getsurei-12.html",
			"checked": "2026-09-02",
			"bandId": "m19-24"
		},
		{
			"name": "Amazon.co.jp 商品検索「おままごと キッチン おもちゃ」",
			"url": "https://www.amazon.co.jp/s?k=%E3%81%8A%E3%81%BE%E3%81%BE%E3%81%94%E3%81%A8%20%E3%82%AD%E3%83%83%E3%83%81%E3%83%B3%20%E3%81%8A%E3%82%82%E3%81%A1%E3%82%83&language=ja_JP&currency=JPY",
			"checked": "2026-09-02",
			"bandId": "m19-24"
		},
		{
			"name": "Amazon.co.jp 検索「知育玩具 2歳」",
			"url": "https://www.amazon.co.jp/s?k=%E7%9F%A5%E8%82%B2%E7%8E%A9%E5%85%B7%202%E6%AD%B3",
			"checked": "2026-09-01",
			"bandId": "m19-24"
		}
	]
};
//#endregion
//#region src/pages/index.tsx
/** 月齢別タイムラインへの入口（spec 0003 AC-1）。トップ最上部の 1 枚カード。 */
function TimelineCard() {
	const total = ITEMS_DATA.items.length;
	const mustCount = ITEMS_DATA.items.filter((i) => i.need === "must").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: "./timeline.html",
		className: "block rounded-lg border border-primary/40 bg-primary/5 p-4 transition-colors motion-reduce:duration-0 hover:border-primary hover:bg-primary/10 active:bg-primary/10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBasket, {
					className: "size-5 text-primary",
					"aria-hidden": "true"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 font-heading text-base font-bold text-foreground",
						children: ["いつ、何を買う？ 月齢別タイムライン", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							className: "size-4 shrink-0 text-primary",
							"aria-hidden": "true"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-sm leading-relaxed text-muted-foreground",
						children: "妊娠中から 2 歳まで、月齢順に「この時期に揃えるもの」を縦並びで確認できます。目安金額や西松屋・アカチャンホンポなどの検索先、品川区の給付・健診も同じ時間軸に載せています。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-2 block font-mono text-xs text-muted-foreground",
						children: [
							"全 ",
							total,
							" 品目（うち必須 ",
							mustCount,
							" 品） / 8 ステージ"
						]
					})
				]
			})]
		})
	});
}
/** 最重要チェックリスト（AC-1）。必須 12 項目をバッジ付きで一覧。 */
function MustChecklist() {
	const items = SITE_DATA.mustItems.filter((i) => i.canonical);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		id: "must-checklist",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "pt-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-heading text-lg font-bold",
					children: "やるべきこと（最重要）"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "公的機関がエビデンスに基づいて注意を促していることから抜粋した、12個の必須項目です。タップで該当の場所へジャンプします。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `./${item.chapterSlug}.html#${item.anchor}`,
						className: "group flex min-h-11 items-center gap-2 rounded-md px-2 hover:bg-accent active:bg-accent sm:flex-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "shrink-0 bg-primary/10 font-heading text-primary",
								children: "必須"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-[15px] font-medium group-hover:text-primary",
									children: item.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block truncate text-xs text-muted-foreground sm:hidden",
									children: item.chapterTitle
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto hidden shrink-0 truncate text-xs text-muted-foreground sm:block",
								children: item.chapterTitle
							})
						]
					}) }, item.id))
				})
			]
		})
	});
}
/** 出産当日〜退院までの手続き（AC-1：1 画面で確認できること）。アンカーは fact の見出しから動的に解決。 */
var DOB_ITEMS = [
	{
		label: "出生届を 14 日以内に届出（届出人は父または母）",
		anchorPrefix: "出生届"
	},
	{
		label: "国民健康保険への加入（品川区は出生届と同日に可能）",
		anchorPrefix: "国民健康保険への加入"
	},
	{
		label: "出産育児一時金・出産支援の給付（出産予定の申請も可）",
		anchorPrefix: "出産育児一時金"
	},
	{
		label: "児童手当を出生直後に申請",
		anchorPrefix: "児童手当"
	}
];
function dobLink(anchorPrefix) {
	const sec = SITE_DATA.chapters.find((c) => c.slug === "day-of-birth")?.sections.find((s) => s.anchor.startsWith(anchorPrefix));
	return sec ? `./day-of-birth.html#${sec.anchor}` : "./day-of-birth.html";
}
function DobChecklist() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-labelledby": "dob-heading",
		className: "mt-6 rounded-lg border border-border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			id: "dob-heading",
			className: "font-heading text-base font-bold",
			children: "出産当日 → 退院まで（手続きを忘れない）"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2",
			children: DOB_ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: dobLink(item.anchorPrefix),
				className: "group flex min-h-11 items-center gap-2 rounded-md px-2 hover:bg-accent active:bg-accent sm:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: "shrink-0 font-heading",
						children: "手続き"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[15px] font-medium group-hover:text-primary",
							children: item.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block truncate text-xs text-muted-foreground sm:hidden",
							children: "1. 出産直前から直後までやる手続き"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-auto hidden shrink-0 truncate text-xs text-muted-foreground sm:block",
						children: "1. 出産直前から直後までやる手続き"
					})
				]
			}) }, item.anchorPrefix))
		})]
	});
}
function ChapterGrid() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-heading text-lg font-bold",
		children: "章一覧（出産当日 → 2歳まで）"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2",
		children: SITE_DATA.chapters.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: chapterHref(c.slug),
			className: "block rounded-lg border border-border bg-card p-3 transition-colors motion-reduce:duration-0 hover:border-primary hover:bg-accent active:bg-accent",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-heading text-sm font-bold text-primary",
						children: c.order
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-heading text-[15px] font-bold",
						children: c.title
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 line-clamp-2 text-sm text-muted-foreground",
					children: c.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: ["最終確認日: ", c.lastVerified]
				})
			]
		}, c.slug))
	})] });
}
function Component$2() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-heading text-2xl font-bold leading-snug sm:text-[28px] lg:text-3xl",
					children: "赤ちゃんから2歳までやるべきこと。気を付けること。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[15px] leading-7 text-muted-foreground",
					children: "品川区在住のパパ向けに、赤ちゃんが生まれてから2歳までの育児情報をまとめています。 出生届などの期限のある手続き、予防接種のスケジュール、離乳食の進め方、事故の防ぎ方など、 各項目に行政などの出典リンクを付けています。"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: [
						"最終確認日: ",
						SITE_DATA.meta.siteLastVerified,
						"（章ごとに日にちが別です）"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 hidden lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#must-checklist",
						className: "inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/5 px-4 py-3 text-sm font-medium text-primary transition-colors motion-reduce:duration-0 hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-ring",
						children: ["やるべきこと（最重要）へ ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
							className: "size-4",
							"aria-hidden": true
						})]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineCard, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MustChecklist, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DobChecklist, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChapterGrid, {})
		]
	});
}
//#endregion
//#region src/lib/items-model.ts
var ITEM_CATEGORIES = [
	"neru",
	"kiru",
	"tabe",
	"arau",
	"ugoku",
	"anzen",
	"asobi",
	"karada"
];
var CATEGORY_LABELS = {
	neru: "ねる",
	kiru: "きる",
	tabe: "のむ・食べる",
	arau: "洗う・おむつ",
	ugoku: "移動・おでかけ",
	anzen: "安全対策",
	asobi: "遊ぶ",
	karada: "からだ・体調"
};
var NEED_LABELS = {
	must: "そろえる",
	useful: "あると便利"
};
var SHOP_SEARCH_LABELS = {
	amazon: "Amazon で検索",
	rakuten: "楽天で検索",
	nishimatyaya: "西松屋で検索",
	akachan: "アカチャンホンポで検索",
	uniqlo: "ユニクロで検索"
};
/** 月の表示ラベル（例: '妊娠中' / '5 か月' / '1 歳 6 か月'）。-1 は妊娠中。 */
function monthPoint(month) {
	if (month <= -1) return "妊娠中";
	if (month >= 12) {
		const years = Math.floor(month / 12);
		const rest = month % 12;
		return rest === 0 ? `${years} 歳` : `${years} 歳 ${rest} か月`;
	}
	return `${month} か月`;
}
/** 使い始め〜終わりの表示（例: 「5 か月ごろから」/「2〜6 か月ごろ」/「妊娠中〜6 か月ごろ」）。 */
function monthRangeLabel(startMonth, endMonth) {
	const start = startMonth <= -1 ? "妊娠中" : `${monthPoint(startMonth)}ごろ`;
	if (endMonth === void 0) return `${start}から`;
	if (endMonth > 24) return `${start}から（2 歳以降も継続）`;
	if (endMonth === startMonth) return `${monthPoint(endMonth)}ごろ`;
	if (startMonth >= 0 && endMonth < 12) return `${startMonth}〜${endMonth} か月ごろ`;
	return `${monthPoint(startMonth)}〜${monthPoint(endMonth)}ごろ`;
}
/** 金額表示（千区切り）。 */
function yen(amount) {
	return `${Math.round(amount).toLocaleString("ja-JP")}円`;
}
/** フィルタ適用（純関数）。カテゴリ未指定 = 全カテゴリ。 */
function filterItems(items, filters) {
	return items.filter((item) => {
		if (filters.categories.length > 0 && !filters.categories.includes(item.category)) return false;
		if (filters.mustOnly && item.need !== "must") return false;
		return true;
	});
}
/** 残り点数と残り予算レンジの集計（純関数）。 */
function summarize(items, doneIds) {
	const done = new Set(doneIds);
	const summary = {
		total: 0,
		remaining: 0,
		done: 0,
		remainingLow: 0,
		remainingHigh: 0,
		priced: 0
	};
	for (const item of items) {
		summary.total += 1;
		if (done.has(item.id)) {
			summary.done += 1;
			continue;
		}
		summary.remaining += 1;
		if (item.price) {
			summary.remainingLow += item.price.low;
			summary.remainingHigh += item.price.high;
			summary.priced += 1;
		}
	}
	return summary;
}
/** URL をこの band の出典名に解決する（未登録ならホスト名）。 */
function sourceLabel(sources, url) {
	const found = sources.find((s) => s.url === url);
	if (found) return found.name;
	try {
		return new URL(url).host;
	} catch {
		return url;
	}
}
//#endregion
//#region src/components/timeline/item-card.tsx
function SourceLinks({ urls, sources }) {
	if (urls.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: urls.map((url) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: url,
		target: "_blank",
		rel: "noreferrer",
		className: "break-all text-primary underline underline-offset-2 hover:opacity-80",
		children: [sourceLabel(sources, url), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "（新しいタブで開きます）"
		})]
	}, url)) });
}
function ItemCard({ item, done, onToggle, sources, shops }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: `list-none rounded-xl border bg-card p-4 ${done ? "border-border opacity-80" : "border-primary/40"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: `item-${item.id}`,
				type: "checkbox",
				checked: done,
				onChange: (e) => onToggle(item.id, e.target.checked),
				className: "mt-1 size-6 shrink-0 accent-[var(--primary)]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-x-2 gap-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: `item-${item.id}`,
								className: "font-heading text-[16px] font-bold leading-snug text-foreground",
								children: item.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded px-1.5 py-0.5 text-[11px] font-medium ${item.need === "must" ? "bg-gold/15 text-gold" : "bg-muted text-muted-foreground"}`,
								children: NEED_LABELS[item.need]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded bg-secondary px-1.5 py-0.5 text-[11px] text-[hsl(var(--secondary-foreground))]",
								children: CATEGORY_LABELS[item.category]
							}),
							done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "準備OK"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-2 space-y-1 text-[13px] leading-relaxed",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "shrink-0 text-muted-foreground",
								children: "使い始め"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-foreground",
								children: monthRangeLabel(item.startMonth, item.endMonth)
							})]
						}), item.size && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "shrink-0 text-muted-foreground",
								children: "目安"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-foreground",
								children: item.size
							})]
						})]
					}),
					item.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-foreground",
						children: item.note
					}),
					item.price && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 rounded-lg bg-secondary/70 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[17px] font-bold text-foreground",
								children: `${yen(item.price.low)}〜${yen(item.price.high)}`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-1.5 text-xs text-muted-foreground",
								children: [
									item.price.unit,
									"・",
									item.price.checked,
									" 調査の目安"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-[11px] leading-relaxed text-muted-foreground",
							children: ["価格の出典: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceLinks, {
								urls: item.price.sources,
								sources
							})]
						})]
					}),
					item.whySources.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-[11px] leading-relaxed text-muted-foreground",
						children: ["月齢・サイズの根拠: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceLinks, {
							urls: item.whySources,
							sources
						})]
					}),
					shops.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 border-t border-border pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "取り扱いの検索（価格・在庫は購入前に各店で確認）"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-1 flex flex-wrap gap-x-3 gap-y-1",
							children: shops.map((shop) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: shop.url,
								target: "_blank",
								rel: "noreferrer",
								className: "flex min-h-9 items-center text-[13px] text-primary underline underline-offset-2 hover:opacity-80 sm:min-h-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "sr-only",
										children: [item.name, "を"]
									}),
									SHOP_SEARCH_LABELS[shop.kind],
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: "（新しいタブで開きます）"
									})
								]
							}) }, `${shop.kind}:${shop.q}`))
						})]
					})
				]
			})]
		})
	});
}
//#endregion
//#region src/lib/shop-links.ts
function query(value) {
	return encodeURIComponent(value.trim());
}
var TEMPLATES = {
	amazon: (q) => `https://www.amazon.co.jp/s?k=${query(q)}`,
	rakuten: (q) => `https://search.rakuten.co.jp/search/mall/${query(q)}/`,
	nishimatyaya: (q) => `https://www.24028-net.jp/item_list.html?searchbox=1&q=${query(q)}`,
	akachan: (q) => `https://shop.akachan.jp/shop/goods/search.aspx?keyword=${query(q)}`,
	uniqlo: (q) => `https://www.uniqlo.com/jp/ja/search/?q=${query(q)}`
};
function shopUrl(shop) {
	const template = TEMPLATES[shop.kind];
	if (!template) throw new Error(`未知の販売先 kind です: ${String(shop.kind)}`);
	const q = shop.q.trim();
	if (!q) throw new Error(`検索語が空です（kind: ${shop.kind}）`);
	return template(q);
}
function resolveShopLinks(shops) {
	return shops.map((shop) => ({
		kind: shop.kind,
		q: shop.q,
		url: shopUrl(shop)
	}));
}
//#endregion
//#region src/pages/timeline.tsx
var STORAGE_KEY = "items-timeline:v1";
function isStoredTimeline(value) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
	const candidate = value;
	const keys = Object.keys(candidate).sort();
	return keys.length === 2 && keys[0] === "done" && keys[1] === "v" && candidate.v === 1 && Array.isArray(candidate.done) && candidate.done.every((item) => typeof item === "string");
}
/** 保存されたチェック済み ID。壊れていれば null（= 初期状態）。消えた品目 ID は黙って落とす（checklist-view と同じ）。 */
function loadDone(items) {
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (raw === null) return [];
		const parsed = JSON.parse(raw);
		if (!isStoredTimeline(parsed)) return null;
		const validIds = new Set(items.map((item) => item.id));
		return [...new Set(parsed.done)].filter((id) => validIds.has(id));
	} catch {
		return null;
	}
}
/** その時期とあわせて読む章（fact/ の slug のみ。ラベルは SITE_DATA から解決して誤字を防ぐ） */
var RELATED_CHAPTER_SLUGS = {
	pregnancy: ["procedures", "day-of-birth"],
	newborn: ["newborn-care", "day-of-birth"],
	"m2-3": ["subsidies", "medical"],
	"m4-6": ["feeding", "medical"],
	"m7-9": ["feeding", "medical"],
	"m10-12": ["day-of-birth", "medical"],
	"m13-18": [
		"safety",
		"emergency",
		"subsidies"
	],
	"m19-24": ["childcare", "subsidies"]
};
function resolveChapterTitle(slug) {
	return SITE_DATA.chapters.find((chapter) => chapter.slug === slug)?.title;
}
var RELATED_CHAPTERS = Object.fromEntries(Object.entries(RELATED_CHAPTER_SLUGS).map(([bandId, slugs]) => [bandId, (slugs ?? []).map((slug) => {
	const title = resolveChapterTitle(slug);
	return title ? {
		slug,
		title
	} : void 0;
}).filter((entry) => entry !== void 0)]));
var POSITION_LABELS = {
	neutral: "この時期",
	past: "過ぎた時期",
	current: "いまの時期",
	future: "これからの時期"
};
var monthLabel = (band) => `${band.monthsFrom === -1 ? "妊娠中" : `生後${band.monthsFrom}か月`}〜${band.monthsTo}か月`;
function MonthRail({ bands, selectedBands, onToggleBand, onShowAll }) {
	const chipClass = (active) => `flex min-h-11 w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-sm whitespace-nowrap lg:min-h-9 ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary active:bg-accent"}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": "月齢で絞り込む",
		className: "mt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-heading text-sm font-bold text-foreground",
			children: "いまはどこ？ 月齢えらび"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:flex-wrap",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-pressed": selectedBands.length === 0,
				onClick: onShowAll,
				className: chipClass(selectedBands.length === 0),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "すべて見る" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-xs",
					children: [
						"全 ",
						bands.reduce((sum, b) => sum + b.items.length, 0),
						"品"
					]
				})]
			}) }), bands.map((band) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-pressed": selectedBands.includes(band.id),
				onClick: () => onToggleBand(band.id),
				className: chipClass(selectedBands.includes(band.id)),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: monthLabel(band) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-xs",
					children: [band.items.length, "品"]
				})]
			}) }, band.id))]
		})]
	});
}
/** カテゴリ・重要度の絞り込み（月齢とは AND 条件。count は全期間の該当数） */
function CategoryBar({ items, categories, mustOnly, onToggleCategory, onToggleMustOnly, actions }) {
	const countBy = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const item of items) map.set(item.category, (map.get(item.category) ?? 0) + 1);
		return map;
	}, [items]);
	const chipClass = (active) => `inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3 text-sm font-medium whitespace-nowrap lg:min-h-9 ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary active:bg-accent"}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": "カテゴリで絞り込む",
		className: "mt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-heading text-sm font-bold text-foreground",
			children: "カテゴリしぼり込み"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-2 flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": mustOnly,
					onClick: onToggleMustOnly,
					className: chipClass(mustOnly),
					children: "必要だけ"
				}) }),
				actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "contents",
					children: actions
				}),
				ITEM_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-pressed": categories.includes(c),
					onClick: () => onToggleCategory(c),
					className: chipClass(categories.includes(c)),
					children: [CATEGORY_LABELS[c], /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `font-mono text-xs ${categories.includes(c) ? "opacity-80" : "text-muted-foreground"}`,
						children: [countBy.get(c) ?? 0, "品"]
					})]
				}) }, c))
			]
		})]
	});
}
function BandSectionInner({ band, position, expanded, collapsible, filters, doneSet, shopsByItem, boundaryLabel, onJumpToNextItem, onBackToIndex, onToggle, onExpand, onCollapse }, ref) {
	const items = (0, import_react.useMemo)(() => filterItems(band.items, filters), [band.items, filters]);
	const summary = summarize(items, [...doneSet]);
	const related = RELATED_CHAPTERS[band.id] ?? [];
	const headingId = `${band.id}-heading`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		ref,
		id: band.id,
		"aria-labelledby": headingId,
		className: `relative border-l-2 pl-4 sm:pl-6 ${position === "current" ? "border-primary" : "border-border"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			className: `absolute top-1.5 -left-[11px] size-4 rounded-full border-2 border-background sm:-left-[15px] ${position === "neutral" || position === "current" ? "border-primary bg-primary" : "border-border bg-card"}`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pb-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline gap-x-2 gap-y-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: headingId,
						className: "font-heading text-xl font-bold text-foreground sm:text-2xl",
						children: band.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs text-muted-foreground",
						children: [
							monthPoint(band.monthsFrom),
							" 〜 ",
							monthPoint(band.monthsTo)
						]
					}),
					position === "current" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground",
						children: "いまの時期"
					})
				]
			}), expanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: [
						"表示 ",
						items.length,
						" 品・残り ",
						summary.remaining,
						" 品"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 leading-7 text-foreground",
					children: band.intro
				}),
				band.support.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-labelledby": `${band.id}-support`,
					className: "mt-4 rounded-lg border border-gold/40 bg-gold-soft/60 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						id: `${band.id}-support`,
						className: "flex items-center gap-2 font-heading text-base font-bold text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, {
							className: "size-4 shrink-0 text-gold",
							"aria-hidden": "true"
						}), "この時期に区からもらえるもの・やっておくこと"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-3",
						children: band.support.map((support) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold text-foreground",
								children: support.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-sm leading-relaxed text-muted-foreground",
								children: support.detail
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: support.source,
								target: "_blank",
								rel: "noreferrer",
								className: "mt-1 flex min-h-9 items-center text-sm text-primary underline underline-offset-2 hover:opacity-80 sm:min-h-0",
								children: ["品川区・東京都の案内ページ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: "（新しいタブで開きます）"
								})]
							})
						] }, support.id))
					})]
				}),
				items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 rounded-lg border border-dashed border-border bg-background p-4 text-sm leading-relaxed text-muted-foreground",
					children: "この時期で、いまの絞り込み条件に合う品目はありません。"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 flex lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onJumpToNextItem,
						className: "inline-flex min-h-11 items-center gap-1.5 rounded-md border border-primary/30 bg-primary/5 px-3 text-sm font-bold text-primary active:bg-primary/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "▼"
						}), boundaryLabel ? `${band.label}の品目へ（次： ${boundaryLabel}）` : `${band.label}の品目へ`]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-3 lg:mt-4",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemCard, {
						item,
						done: doneSet.has(item.id),
						onToggle,
						sources: band.sources,
						shops: shopsByItem.get(item.id) ?? []
					}, item.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 rounded-lg bg-secondary/70 p-3 text-sm leading-relaxed text-foreground",
					children: band.caution
				}),
				collapsible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onCollapse,
					className: "mt-3 inline-flex min-h-11 items-center gap-1 text-sm text-primary underline underline-offset-2 hover:opacity-80 lg:min-h-9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {
						className: "size-4",
						"aria-hidden": "true"
					}), "この時期だけをたたむ"]
				}) }),
				related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-wrap gap-x-4 gap-y-1",
					children: related.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `./${entry.slug}.html`,
						className: "flex min-h-9 items-center gap-1 text-sm text-primary underline underline-offset-2 hover:opacity-80 sm:min-h-0",
						children: [
							entry.title,
							"を読む",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								className: "size-3.5 shrink-0",
								"aria-hidden": "true"
							})
						]
					}) }, entry.slug))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 flex gap-4 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onBackToIndex,
						className: "inline-flex min-h-11 items-center gap-1.5 text-sm text-primary underline underline-offset-2 hover:opacity-80",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "∨"
						}), "品目インデックスに戻る"]
					}), boundaryLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onJumpToNextItem,
						className: "inline-flex min-h-11 items-center gap-1.5 text-sm text-primary underline underline-offset-2 hover:opacity-80",
						children: [
							boundaryLabel,
							"の品目へ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "∧"
							})
						]
					})]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onExpand,
				"aria-label": `${band.label}の品目を開く`,
				className: "mt-2 flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 text-left active:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:min-h-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "使用期間："
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-foreground",
							children: [
								monthPoint(band.monthsFrom),
								" 〜 ",
								monthPoint(band.monthsTo)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-primary-soft px-1.5 py-0.5 text-xs text-primary",
							children: POSITION_LABELS[position]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								"表示 ",
								items.length,
								" 品・残り ",
								summary.remaining,
								" 品（",
								summary.done,
								" 品完了）"
							]
						}),
						summary.remainingHigh > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								"残り目安 ",
								yen(summary.remainingLow),
								"〜",
								yen(summary.remainingHigh)
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: "size-5 shrink-0 text-muted-foreground",
					"aria-hidden": "true"
				})]
			})]
		})]
	});
}
var BandSection = (0, import_react.forwardRef)(BandSectionInner);
function Component$1({ data = ITEMS_DATA } = {}) {
	const [selectedBands, setSelectedBands] = (0, import_react.useState)([]);
	const [expandedBands, setExpandedBands] = (0, import_react.useState)(null);
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [mustOnly, setMustOnly] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)([]);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const restored = loadDone(data.items);
		if (restored) setDone(restored);
		setHydrated(true);
	}, [data.items]);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		try {
			const validIds = new Set(data.items.map((item) => item.id));
			const valid = [...new Set(done)].filter((id) => validIds.has(id));
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
				v: 1,
				done: valid
			}));
		} catch {}
	}, [
		done,
		hydrated,
		data.items
	]);
	const toggle = (id, isDone) => {
		setDone((current) => isDone ? [.../* @__PURE__ */ new Set([...current, id])] : current.filter((value) => value !== id));
	};
	const toggleCategory = (category) => {
		setCategories((current) => current.includes(category) ? current.filter((c) => c !== category) : [...current, category]);
	};
	const selectBand = (bandId) => {
		const next = selectedBands.includes(bandId) ? selectedBands.filter((id) => id !== bandId) : [...selectedBands, bandId];
		setSelectedBands(next);
		setExpandedBands(next.length > 0 ? next : null);
	};
	const showAllBands = () => {
		setSelectedBands([]);
		setExpandedBands(null);
	};
	const collapseAllBands = () => setExpandedBands([]);
	const expandAllBands = () => {
		setSelectedBands([]);
		setExpandedBands(null);
	};
	const collapseBand = (bandId) => {
		setExpandedBands((current) => (current ?? data.bands.map((band) => band.id)).filter((id) => id !== bandId));
	};
	const bandRefs = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const registerBand = (bandId) => (el) => {
		if (el) bandRefs.current.set(bandId, el);
		else bandRefs.current.delete(bandId);
	};
	const scrollToBand = (bandId) => {
		const el = bandRefs.current.get(bandId);
		if (!el) return;
		const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
		const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h") || "0");
		const top = el.getBoundingClientRect().top + window.scrollY - header - 12;
		window.scrollTo({
			top: Math.max(0, top),
			behavior: reduce ? "auto" : "smooth"
		});
	};
	const backToIndex = () => {
		const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
		window.scrollTo({
			top: 0,
			behavior: reduce ? "auto" : "smooth"
		});
	};
	const shopsByItem = (0, import_react.useMemo)(() => new Map(data.bands.flatMap((band) => band.items.map((item) => [item.id, resolveShopLinks(item.shops)]))), [data]);
	const priceSurvey = (0, import_react.useMemo)(() => {
		const dates = data.bands.flatMap((band) => band.items.filter((item) => item.price).map((item) => item.price.checked)).sort();
		if (dates.length === 0) return null;
		return dates[0] === dates[dates.length - 1] ? dates[0] : `${dates[0]} 〜 ${dates[dates.length - 1]}`;
	}, [data]);
	const bandRange = (0, import_react.useMemo)(() => {
		if (data.bands.length === 0) return "";
		const min = Math.min(...data.bands.map((band) => band.monthsFrom));
		const max = Math.max(...data.bands.map((band) => band.monthsTo));
		return `${monthPoint(min)}から ${monthPoint(max)}まで`;
	}, [data]);
	const selectedSet = (0, import_react.useMemo)(() => new Set(selectedBands), [selectedBands]);
	const positionOf = (band) => {
		if (selectedBands.length === 0) return "neutral";
		const firstSelected = data.bands.findIndex((b) => selectedSet.has(b.id));
		const index = data.bands.findIndex((b) => b.id === band.id);
		return selectedSet.has(band.id) ? "current" : index < firstSelected ? "past" : "future";
	};
	const filters = (0, import_react.useMemo)(() => ({
		categories,
		mustOnly
	}), [categories, mustOnly]);
	const filterActive = categories.length > 0 || mustOnly;
	const doneSet = (0, import_react.useMemo)(() => new Set(done), [done]);
	const summary = (0, import_react.useMemo)(() => summarize(data.items, done), [data.items, done]);
	const visibleCount = (0, import_react.useMemo)(() => data.bands.reduce((sum, band) => {
		return (expandedBands === null ? true : expandedBands.includes(band.id)) ? sum + filterItems(band.items, filters).length : sum;
	}, 0), [
		data,
		filters,
		expandedBands
	]);
	const resetFilters = () => {
		setCategories([]);
		setMustOnly(false);
	};
	const barActions = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: expandedBands === null ? collapseAllBands : expandAllBands,
			className: "inline-flex min-h-11 items-center gap-1 text-sm text-primary underline underline-offset-2 hover:opacity-80 lg:min-h-9",
			children: [expandedBands === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {
				className: "size-4 shrink-0",
				"aria-hidden": "true"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
				className: "size-4 shrink-0",
				"aria-hidden": "true"
			}), expandedBands === null ? "すべての時期を閉じる" : "すべての時期を開く"]
		}),
		filterActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: resetFilters,
			className: "inline-flex min-h-11 items-center gap-1 text-sm text-primary underline underline-offset-2 hover:opacity-80 lg:min-h-9",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
				className: "size-4 shrink-0",
				"aria-hidden": "true"
			}), "絞り込みをもどす"]
		}),
		done.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setDone([]),
			className: "inline-flex min-h-11 items-center gap-1 text-sm text-primary underline underline-offset-2 hover:opacity-80 lg:min-h-9",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
				className: "size-4 shrink-0",
				"aria-hidden": "true"
			}), "チェックをすべて外す"]
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-1.5 font-mono text-xs tracking-wider text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Baby, {
						className: "size-3.5",
						"aria-hidden": "true"
					}), "妊娠中から 2 歳まで"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-heading text-2xl leading-snug font-bold sm:text-[28px] lg:text-3xl",
					children: "いつ、何を買う？ 月齢別タイムライン"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-[15px] leading-7 text-muted-foreground",
					children: [
						"上から読むだけで、",
						bandRange,
						"にそろえるものがわかる。 月齢とカテゴリで絞り込め、チェックしたものは残り点数と目安予算から引かれる。"
					]
				}),
				priceSurvey && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs leading-relaxed text-muted-foreground",
					children: [
						"価格は ",
						priceSurvey,
						" 時点で調査した目安（税込・セールやポイント還元は含まず）。"
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthRail, {
				bands: data.bands,
				selectedBands,
				onToggleBand: selectBand,
				onShowAll: showAllBands
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryBar, {
				items: data.items,
				categories,
				mustOnly,
				onToggleCategory: toggleCategory,
				onToggleMustOnly: () => setMustOnly((v) => !v),
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "contents lg:hidden",
					children: barActions
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-label": "準備状況と目安予算",
				className: "sticky top-[var(--header-h)] z-30 hidden rounded-lg border border-border bg-card/95 p-3 backdrop-blur lg:block",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"aria-live": "polite",
						className: "text-sm text-foreground",
						children: [
							`全 ${summary.total} 品目のうち`,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-heading font-bold",
								children: [
									" 残り ",
									summary.remaining,
									" 品"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [
									"（準備完了 ",
									summary.done,
									" 品）"
								]
							}),
							filterActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [
									"／ いまの条件で ",
									visibleCount,
									" 品目を表示中"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-relaxed text-muted-foreground",
						children: summary.remainingHigh > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"残り品の目安予算",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-foreground",
								children: `${yen(summary.remainingLow)}〜${yen(summary.remainingHigh)}`
							}),
							" ",
							"（価格がわかる ",
							summary.priced,
							" 品目・税込）"
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "残り品に価格つきの品目はありません" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 hidden flex-wrap items-center gap-x-3 gap-y-1 text-sm lg:flex",
						children: barActions
					})
				]
			}),
			filterActive && visibleCount === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg border border-dashed border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground",
				children: "条件に合う品目が 0 件です。カテゴリの選びすぎか「必要だけ」の絞り込みが厳しすぎます。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: data.bands.map((band, i) => {
				const expanded = expandedBands === null ? true : expandedBands.includes(band.id);
				const next = data.bands[i + 1];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BandSection, {
					band,
					position: positionOf(band),
					expanded,
					collapsible: expanded,
					filters,
					doneSet,
					shopsByItem,
					boundaryLabel: next ? `${next.monthsFrom}か月〜` : null,
					onJumpToNextItem: () => next && scrollToBand(next.id),
					onBackToIndex: backToIndex,
					onToggle: toggle,
					onExpand: () => {
						setExpandedBands((current) => [...current ?? data.bands.map((b) => b.id), band.id]);
					},
					onCollapse: () => collapseBand(band.id),
					ref: registerBand(band.id)
				}, band.id);
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "-mt-4 rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground",
				children: [
					"月齢・数量の目安には個人差があります。ねんねの安全条件（硬いマット・仰向け・同じ部屋に別の寝具）は どの時期でも同じで、上記の「ねる」品目が揃っても寝床の条件は変わりません。 医療や安全の判断は",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "./safety.html",
						className: "text-primary underline underline-offset-2 hover:opacity-80",
						children: "安全対策の章"
					}),
					" ",
					"を優先してください。品川区の給付・助成でカバーできる費用は",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: HOJOKIN_URL,
						className: "text-primary underline underline-offset-2 hover:opacity-80",
						children: "shinagawa-hojokin"
					}),
					" ",
					"で確認できます。"
				]
			})
		]
	});
}
//#endregion
//#region src/components/chapter/chapter-sub-bar.tsx
/**
* 章ページのスティッキー・サブバー（spec-mobile.md §2.5、<lg のみ）。
* 上段: 章タイトル（モバイルの唯一の視覚タイトル。本物の h1 は本文側 sr-only）。
* 下段: 現在のセクション名 + ▾。タップでセクション一覧がサブバー直下に
* 上から落ちる（章メニューと同系のデザイン言語）。現在セクションを
* ハイライトし、選択でハッシュジャンプ + 自動クローズ。
* 外側タップ（トリガー自身を除く）/ Escape / スクロールで閉じる。
*/
function ChapterSubBar({ chapter, activeId, className }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const panelRef = (0, import_react.useRef)(null);
	const triggerRef = (0, import_react.useRef)(null);
	const current = chapter.sections.find((s) => s.anchor === activeId)?.heading ?? chapter.sections[0]?.heading;
	const currentAnchor = activeId ?? chapter.sections[0]?.anchor;
	const currentLabel = current !== "" ? current : "この章の先頭";
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onPointerDown = (e) => {
			if (panelRef.current?.contains(e.target)) return;
			if (triggerRef.current?.contains(e.target)) return;
			setOpen(false);
		};
		const onKeyDown = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		const onScroll = () => setOpen(false);
		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("scroll", onScroll);
		};
	}, [open]);
	const onSectionJump = (anchor) => {
		setOpen(false);
		requestAnimationFrame(() => {
			window.location.hash = anchor;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `sticky top-[var(--header-h)] z-30 -mx-4 border-b border-border bg-card/95 backdrop-blur lg:hidden ${className ?? ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-3xl px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				"aria-hidden": "true",
				className: "truncate pt-2 font-heading text-base font-bold leading-tight",
				children: chapter.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					ref: triggerRef,
					type: "button",
					"aria-haspopup": "listbox",
					"aria-expanded": open,
					"aria-controls": open ? "section-menu" : void 0,
					onClick: () => setOpen((v) => !v),
					className: "flex h-11 w-full items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-ring",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate text-xs text-muted-foreground",
						children: currentLabel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
						className: `size-3.5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`,
						"aria-hidden": "true"
					})]
				})
			})]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: panelRef,
			id: "section-menu",
			role: "listbox",
			"aria-label": "セクション一覧",
			className: "absolute inset-x-0 top-full max-h-[60dvh] overflow-y-auto border-b border-border bg-card shadow-lg animate-in slide-in-from-top duration-150 motion-reduce:animate-none",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mx-auto w-full max-w-3xl px-4 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "option",
					"aria-selected": currentAnchor === "top",
					onClick: () => onSectionJump("top"),
					className: `flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm active:bg-accent focus-visible:outline-2 focus-visible:outline-ring ${currentAnchor === "top" ? "bg-primary/10 font-bold" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `size-1.5 shrink-0 rounded-full ${currentAnchor === "top" ? "bg-primary" : "bg-transparent"}`,
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "min-w-0 truncate",
						children: "この章の先頭へ"
					})]
				}) }), chapter.sections.filter((s) => s.heading !== "").map((s) => {
					const isCurrent = s.anchor === currentAnchor;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "option",
						"aria-selected": isCurrent,
						onClick: () => onSectionJump(s.anchor),
						className: `flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm active:bg-accent focus-visible:outline-2 focus-visible:outline-ring ${isCurrent ? "bg-primary/10 font-bold" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `size-1.5 shrink-0 rounded-full ${isCurrent ? "bg-primary" : "bg-transparent"}`,
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 truncate",
							children: s.heading
						})]
					}) }, s.anchor);
				})]
			})
		})]
	});
}
//#endregion
//#region src/components/chapter-toc.tsx
/**
* In-chapter table of contents for the desktop sidebar (lg and up only).
* Pure presentational: `activeId` comes from the caller's `useScrollSpy` —
* no observer inside this component. Level-1 (intro) sections have no
* heading and are not listed.
*/
function ChapterToc({ order, sections, activeId }) {
	const rows = sections.filter((s) => s.level >= 2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "この章の目次",
		className: "hidden lg:block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-[var(--header-h,180px)] max-h-[calc(100dvh-var(--header-h,180px)-2rem)] overflow-y-auto rounded-lg border border-border bg-card/70 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-heading text-xs font-bold text-muted-foreground",
					children: [
						"第",
						order,
						"章 目次"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-0.5",
					children: rows.map((s) => {
						const active = activeId === s.anchor;
						const indent = s.level === 3 ? "pl-6 text-[13px]" : "pl-2 text-sm";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `#${s.anchor}`,
							"aria-current": active ? "location" : void 0,
							className: `block rounded border-l-2 py-1.5 pr-2 leading-snug transition-colors motion-reduce:duration-0 focus-visible:outline-2 focus-visible:outline-ring ${indent} ${active ? "border-primary bg-primary/10 font-medium text-foreground" : "border-transparent text-muted-foreground hover:bg-accent hover:text-foreground"}`,
							children: s.heading
						}) }, s.anchor);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#top",
					onClick: (e) => {
						e.preventDefault();
						window.scrollTo(0, 0);
					},
					className: "mt-3 block px-2 text-xs text-muted-foreground underline hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring",
					children: "ページの先頭へ"
				})
			]
		})
	});
}
//#endregion
//#region src/components/fact/inline-spans.tsx
/** 構造化されたインライン文字列を安全な React 要素として描画する。 */
function InlineSpans({ spans }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: spans.map((span, index) => span.bold ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: span.text }, `${span.text}-${index}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: span.text }, `${span.text}-${index}`)) });
}
//#endregion
//#region src/components/fact/callout-view.tsx
var CALLOUT_META = {
	note: {
		label: "メモ",
		icon: Info,
		className: "border-primary/40 bg-primary/5 text-foreground",
		iconClassName: "text-primary"
	},
	warning: {
		label: "注意",
		icon: TriangleAlert,
		className: "border-gold/50 bg-gold-soft/60 text-foreground",
		iconClassName: "text-gold"
	},
	danger: {
		label: "危険",
		icon: CircleAlert,
		className: "border-destructive/50 bg-destructive/5 text-foreground",
		iconClassName: "text-destructive"
	}
};
function CalloutView({ block }) {
	const meta = CALLOUT_META[block.tone];
	const Icon = meta.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		role: block.tone === "note" ? void 0 : "alert",
		className: `my-4 rounded-lg border p-4 ${meta.className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: `mt-0.5 size-5 shrink-0 ${meta.iconClassName}`,
				"aria-hidden": "true"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 text-[15px] leading-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 font-heading text-sm font-bold",
					children: meta.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineSpans, { spans: block.inline }) })]
			})]
		})
	});
}
//#endregion
//#region src/components/fact/checklist-view.tsx
function isStoredChecklist(value) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
	const candidate = value;
	const keys = Object.keys(candidate).sort();
	return keys.length === 2 && keys[0] === "done" && keys[1] === "v" && candidate.v === 1 && Array.isArray(candidate.done) && candidate.done.every((item) => typeof item === "string");
}
function ChecklistView({ chapterSlug, block }) {
	const storageKey = `checklist:${chapterSlug}/${block.id}`;
	const itemNames = (0, import_react.useMemo)(() => block.items.map((item) => item.text), [block.items]);
	const authoredDone = (0, import_react.useMemo)(() => block.items.filter((item) => item.done).map((item) => item.text), [block.items]);
	const [done, setDone] = (0, import_react.useState)([]);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let restored = authoredDone;
		try {
			const raw = window.localStorage.getItem(storageKey);
			if (raw !== null) {
				const parsed = JSON.parse(raw);
				if (isStoredChecklist(parsed)) {
					const currentItems = new Set(itemNames);
					restored = [...new Set(parsed.done)].filter((item) => currentItems.has(item));
				}
			}
		} catch {
			restored = authoredDone;
		}
		setDone(restored);
		setHydrated(true);
	}, [
		authoredDone,
		itemNames,
		storageKey
	]);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		try {
			const currentItems = new Set(itemNames);
			const validDone = [...new Set(done)].filter((item) => currentItems.has(item));
			window.localStorage.setItem(storageKey, JSON.stringify({
				v: 1,
				done: validDone
			}));
		} catch {}
	}, [
		done,
		hydrated,
		itemNames,
		storageKey
	]);
	const doneSet = new Set(done);
	const completed = itemNames.filter((item) => doneSet.has(item)).length;
	const progress = itemNames.length === 0 ? 0 : completed / itemNames.length * 100;
	const toggle = (item) => {
		setDone((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "my-4 rounded-lg border border-border bg-card p-4",
		"aria-labelledby": `${storageKey}-heading`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					id: `${storageKey}-heading`,
					className: "font-heading text-base font-bold",
					children: "チェックリスト"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm font-medium text-muted-foreground",
					"aria-live": "polite",
					children: [
						completed,
						"/",
						itemNames.length,
						" 完了"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 h-2 overflow-hidden rounded-full bg-muted",
				role: "progressbar",
				"aria-valuemin": 0,
				"aria-valuemax": itemNames.length,
				"aria-valuenow": completed,
				"aria-label": "チェックリストの進捗",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-primary transition-[width] motion-reduce:transition-none",
					style: { width: `${progress}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-1",
				children: block.items.map((item) => {
					const checked = doneSet.has(item.text);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-2 py-1 hover:bg-accent has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked,
							onChange: () => toggle(item.text),
							className: "size-5 shrink-0 accent-primary",
							"aria-label": item.text
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: checked ? "text-[15px] leading-7 text-muted-foreground line-through" : "text-[15px] leading-7",
							children: item.text
						})]
					}) }, item.text);
				})
			})
		]
	});
}
//#endregion
//#region src/components/ui/table.tsx
function Table({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "table-container",
		className: "relative w-full overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
			"data-slot": "table",
			className: cn("w-full caption-bottom text-sm", className),
			...props
		})
	});
}
function TableHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
		"data-slot": "table-header",
		className: cn("[&_tr]:border-b", className),
		...props
	});
}
function TableBody({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
		"data-slot": "table-body",
		className: cn("[&_tr:last-child]:border-0", className),
		...props
	});
}
function TableRow({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
		"data-slot": "table-row",
		className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
		...props
	});
}
function TableHead({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
		"data-slot": "table-head",
		className: cn("h-10 whitespace-nowrap bg-muted/60 px-3 text-left align-middle font-heading text-[13px] font-bold text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
		...props
	});
}
function TableCell({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		"data-slot": "table-cell",
		className: cn("px-3 py-2 align-top text-[14px] leading-relaxed [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
		...props
	});
}
//#endregion
//#region src/components/fact/data-table.tsx
/**
* マークダウンのテーブル表示。
* モバイル（<sm）: 各行を縦カードで表示（横スクロール不要・列の意味が残る）。
* デスクトップ（sm+）: 従来の横テーブル。
*/
function DataTable({ block }) {
	const headers = block.headers;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "my-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hidden overflow-x-auto rounded-lg border border-border sm:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				className: "min-w-[520px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: headers.map((header, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: header }, `${header}-${index}`)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: block.rows.map((row, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
					className: rowIndex % 2 === 0 ? "bg-muted/20" : void 0,
					children: headers.map((_, cellIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row[cellIndex] ?? "" }, `cell-${rowIndex}-${cellIndex}`))
				}, `row-${rowIndex}`)) })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3 sm:hidden",
			children: block.rows.map((row, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg border border-border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "divide-y divide-border/60",
					children: headers.map((header, cellIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs font-bold text-muted-foreground",
							children: header
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-0.5 text-sm leading-relaxed",
							children: row[cellIndex] ?? ""
						})]
					}, `cell-${rowIndex}-${cellIndex}`))
				})
			}, `card-${rowIndex}`))
		})]
	});
}
//#endregion
//#region src/components/fact/list-block-view.tsx
function ListItems({ items, ordered }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ordered ? "ol" : "ul", {
		className: "my-2 space-y-1 pl-5",
		type: ordered ? "1" : void 0,
		children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "leading-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineSpans, { spans: item.inline }), item.children.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItems, {
				items: item.children,
				ordered: false
			})]
		}, `${index}-${item.inline.map((span) => span.text).join("")}`))
	});
}
function ListBlockView({ block }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItems, {
		items: block.items,
		ordered: block.ordered
	});
}
//#endregion
//#region src/lib/fact-model.ts
var CANONICAL_MUST_LABELS = {
	sids: "SIDS 予防（仰向け寝・固めのマットレス・枕なし・喫煙回避）",
	vaccines: "定期予防接種の漏れ防止（スケジュール管理・品川区の助成）",
	carseat: "チャイルドシート常時着用（乳児は後ろ向き）",
	"no-shaking": "揺さぶり禁止（泣き止まない時の対処法）",
	choking: "誤飲・窒息予防（小さな物・コード・ビニール袋）",
	accident: "転落・やけど・溺水・熱中症予防",
	"head-shape": "頭の形（向き癖への対処・タミータイムは起きている時のみ）",
	eyes: "目の問題（斜視・弱視は早期発見が決め手）",
	hip: "股関節脱臼のチェック（おむつ替え時の開排）",
	honey: "はちみつは 1 歳まで禁止（乳児ボツリヌス症）",
	"sleep-risk": "うつ伏せ寝・添い寝のリスク",
	postpartum: "産後うつのサインと相談窓口"
};
//#endregion
//#region src/components/fact/fact-section-view.tsx
/** 「根拠:」行の描画（AC-4）。ソースは必ず表示する。 */
function SourceLine({ sources }) {
	if (sources.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-3 border-l-2 border-primary/40 pl-3 text-xs leading-relaxed text-muted-foreground",
		children: [
			"根拠:",
			" ",
			sources.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [i > 0 && "、", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: s.url,
				target: "_blank",
				rel: "noreferrer",
				className: "underline hover:text-primary",
				children: s.name
			})] }, `${s.url}-${i}`))
		]
	});
}
/** 「必須」バッジ（AC-5）。canonical ID には表示ラベルを出す。 */
function MustBadges({ ids }) {
	if (ids.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mt-2 flex flex-wrap gap-1.5",
		children: ids.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
			variant: "secondary",
			className: "h-auto max-w-full whitespace-normal bg-primary/10 text-left font-heading leading-snug text-primary",
			children: ["必須: ", CANONICAL_MUST_LABELS[id] ?? id]
		}, id))
	});
}
function BlockView({ block, chapterSlug }) {
	switch (block.kind) {
		case "paragraph": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[15px] leading-7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineSpans, { spans: block.inline })
		});
		case "list": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBlockView, { block });
		case "table": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, { block });
		case "callout": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalloutView, { block });
		case "checklist": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChecklistView, {
			chapterSlug,
			block
		});
		case "flow": return null;
		case "diagram": return null;
	}
}
/** fact の 1 セクション（見出し + 構造化ブロック + 根拠 + 必須バッジ）。 */
function FactSectionView({ section, chapterSlug }) {
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		section.blocks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 space-y-3",
			children: section.blocks.map((block, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockView, {
				block,
				chapterSlug
			}) }, `${block.kind}-${index}`))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceLine, { sources: section.sources }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MustBadges, { ids: section.mustIds })
	] });
	if (section.level === 3) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: section.anchor,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mt-6 font-heading text-base font-bold",
			children: section.heading
		}), body]
	});
	if (section.level === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: section.anchor,
		children: body
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: section.anchor,
		className: "border-t border-border pt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-heading text-lg font-bold first:mt-0 lg:mt-6",
			children: section.heading
		}), body]
	});
}
//#endregion
//#region src/lib/use-scroll-spy.ts
/**
* Track which section id is "current" under a sticky-header reading position.
*
* SSG-safe: all work happens inside useEffect (client-only); SSR renders
* `undefined`. The `ids` list must be referentially stable (the caller
* memoizes it) so the observer is not re-created on every render.
*
* Semantics: a thin "spy band" sits just below the sticky header
* (from `topOffset + 8px` down to about one-third of the viewport). The
* active section is the one whose top edge is closest to `topOffset` while
* it is inside the band. A passive scroll listener adds a bottom-edge
* fallback so the last (often short) section still becomes active at the
* bottom of the page. State only changes when the announced id changes
* (hysteresis, no re-render storms).
*/
function useScrollSpy(ids, topOffset) {
	const [activeId, setActiveId] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || ids.length === 0) return;
		const elements = ids.map((id) => document.getElementById(id)).filter((el) => el !== null);
		if (elements.length === 0) return;
		const inBand = /* @__PURE__ */ new Set();
		let lastId;
		const announce = (id) => {
			if (id !== lastId) {
				lastId = id;
				setActiveId(id);
			}
		};
		const pickClosest = () => {
			let best;
			let bestDist = Infinity;
			for (const id of inBand) {
				const el = document.getElementById(id);
				if (!el) continue;
				const dist = Math.abs(el.getBoundingClientRect().top - topOffset);
				if (dist < bestDist) {
					bestDist = dist;
					best = id;
				}
			}
			announce(best);
		};
		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				const id = entry.target.id;
				if (entry.isIntersecting) inBand.add(id);
				else inBand.delete(id);
			}
			pickClosest();
		}, {
			rootMargin: `${-topOffset - 8}px 0px -66% 0px`,
			threshold: 0
		});
		elements.forEach((el) => observer.observe(el));
		const onScroll = () => {
			if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) announce(ids[ids.length - 1]);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", onScroll);
		};
	}, [ids, topOffset]);
	return activeId;
}
//#endregion
//#region src/pages/[chapter].tsx
function Component() {
	const { slug: paramSlug } = useParams();
	const cleanSlug = (() => {
		return (typeof window !== "undefined" ? window.location.pathname.replace(/^\//, "").replace(/\.html$/, "") : paramSlug ?? "").replace(/^index$/, "");
	})();
	const chapter = SITE_DATA.chapters.find((c) => c.slug === cleanSlug);
	const activeId = useScrollSpy((0, import_react.useMemo)(() => chapter ? chapter.sections.filter((s) => s.level >= 2).map((s) => s.anchor) : [], [chapter]), 180);
	if (cleanSlug === "") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component$2, {});
	if (!chapter) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "章が見つかりません。" });
	const idx = SITE_DATA.chapters.findIndex((c) => c.slug === cleanSlug);
	const prev = idx > 0 ? SITE_DATA.chapters[idx - 1] : null;
	const next = idx < SITE_DATA.chapters.length - 1 ? SITE_DATA.chapters[idx + 1] : null;
	const prevCard = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: prev ? chapterHref(prev.slug) : "./index.html",
		className: "flex min-h-14 items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition-colors motion-reduce:duration-0 active:bg-accent sm:min-h-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:hover:text-primary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
			className: "size-4 shrink-0 text-muted-foreground",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-xs text-muted-foreground",
				children: prev ? "前の章" : "ホーム"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate font-heading text-sm font-bold",
				children: prev ? `${prev.order}. ${prev.title}` : "トップページ"
			})]
		})]
	});
	const nextCard = next && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: chapterHref(next.slug),
		className: "flex min-h-14 items-center gap-3 rounded-lg border border-border bg-card p-3 text-right transition-colors motion-reduce:duration-0 active:bg-accent sm:min-h-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:hover:text-primary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-xs text-muted-foreground",
				children: "次の章"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "block truncate font-heading text-sm font-bold",
				children: [
					next.order,
					". ",
					next.title
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
			className: "size-4 shrink-0 text-muted-foreground",
			"aria-hidden": "true"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sr-only lg:not-sr-only",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"第 ",
							chapter.order,
							" 章 / 全 ",
							SITE_DATA.chapters.length,
							" 章"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-heading text-2xl font-bold leading-snug",
						children: chapter.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: ["この章の最終確認日: ", chapter.lastVerified]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChapterSubBar, {
				chapter,
				activeId,
				className: "-mt-6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", { children: chapter.sections.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FactSectionView, {
							section: s,
							chapterSlug: chapter.slug
						}, `${s.anchor}-${i}`)) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "text-xs leading-relaxed text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-heading text-sm font-bold text-foreground",
								children: "この章の出典"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 space-y-1",
								children: chapter.sources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: s.url,
									target: "_blank",
									rel: "noreferrer",
									className: "flex min-h-9 items-center underline hover:text-primary sm:min-h-0 sm:block",
									children: s.name
								}) }, s.url))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							"aria-label": "前後の章",
							className: "flex flex-col gap-3 pt-2 sm:flex-row sm:items-stretch sm:justify-between",
							children: [prevCard, nextCard]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChapterToc, {
					order: chapter.order,
					sections: chapter.sections,
					activeId
				})]
			})
		]
	});
}
ViteReactSSG({ routes: [{
	path: "/",
	element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {}),
	children: [
		{
			index: true,
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component$2, {})
		},
		{
			path: "timeline",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component$1, {})
		},
		{
			path: ":slug",
			element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {}),
			getStaticPaths: () => SITE_DATA.chapters.map((c) => c.slug)
		}
	]
}] });
//#endregion
export { require_react as n, __commonJSMin as r, require_react_dom as t };
