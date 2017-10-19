(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var meteorInstall = Package['modules-runtime'].meteorInstall;

var require = meteorInstall({"node_modules":{"meteor":{"modules":{"server.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/modules/server.js                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
require("./install-packages.js");
require("./process.js");
require("./reify.js");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"install-packages.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/modules/install-packages.js                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
function install(name, mainModule) {
  var meteorDir = {};

  // Given a package name <name>, install a stub module in the
  // /node_modules/meteor directory called <name>.js, so that
  // require.resolve("meteor/<name>") will always return
  // /node_modules/meteor/<name>.js instead of something like
  // /node_modules/meteor/<name>/index.js, in the rare but possible event
  // that the package contains a file called index.js (#6590).

  if (typeof mainModule === "string") {
    // Set up an alias from /node_modules/meteor/<package>.js to the main
    // module, e.g. meteor/<package>/index.js.
    meteorDir[name + ".js"] = mainModule;
  } else {
    // back compat with old Meteor packages
    meteorDir[name + ".js"] = function (r, e, module) {
      module.exports = Package[name];
    };
  }

  meteorInstall({
    node_modules: {
      meteor: meteorDir
    }
  });
}

// This file will be modified during computeJsOutputFilesMap to include
// install(<name>) calls for every Meteor package.

install("meteor");
install("modules-runtime");
install("modules", "meteor/modules/server.js");
install("es5-shim", "meteor/es5-shim/server.js");
install("meteor-base");
install("npm-mongo");
install("ecmascript-runtime");
install("promise", "meteor/promise/server.js");
install("ecmascript-runtime-server", "meteor/ecmascript-runtime-server/runtime.js");
install("babel-compiler");
install("ecmascript");
install("underscore");
install("base64");
install("babel-runtime", "meteor/babel-runtime/babel-runtime.js");
install("ejson", "meteor/ejson/ejson.js");
install("diff-sequence");
install("geojson-utils", "meteor/geojson-utils/main.js");
install("id-map");
install("random");
install("mongo-id");
install("ordered-dict");
install("tracker");
install("minimongo", "meteor/minimongo/minimongo_server.js");
install("check", "meteor/check/match.js");
install("retry");
install("callback-hook");
install("ddp-common");
install("ddp-client", "meteor/ddp-client/namespace.js");
install("rate-limit");
install("ddp-rate-limiter");
install("logging");
install("routepolicy");
install("boilerplate-generator", "meteor/boilerplate-generator/generator.js");
install("webapp-hashing");
install("webapp", "meteor/webapp/webapp_server.js");
install("audit-argument-checks");
install("ddp-server");
install("ddp");
install("allow-deny");
install("binary-heap");
install("mongo");
install("blaze-html-templates");
install("jquery");
install("reload");
install("seba:minifiers-autoprefixer");
install("standard-minifier-js");
install("dynamic-import", "meteor/dynamic-import/server.js");
install("reactive-var");
install("mrt:filesize");
install("markdown");
install("url");
install("http");
install("fortawesome:fontawesome");
install("simple:highlight.js");
install("observe-sequence");
install("deps");
install("htmljs");
install("blaze");
install("mquandalle:jade");
install("fourseven:scss");
install("momentjs:moment");
install("spacebars");
install("templating-compiler");
install("templating-runtime");
install("templating");
install("perak:markdown");
install("meteorhacks:subs-manager");
install("ostrio:cookies", "meteor/ostrio:cookies/cookies.js");
install("ostrio:files", "meteor/ostrio:files/server.js");
install("ostrio:cstorage");
install("ostrio:templatehelpers");
install("reactive-dict");
install("ostrio:flow-router-extra", "meteor/ostrio:flow-router-extra/server/_init.js");
install("ostrio:flow-router-title");
install("ostrio:flow-router-meta");
install("ostrio:spiderable-middleware", "meteor/ostrio:spiderable-middleware/lib/meteor.js");
install("accounts-base", "meteor/accounts-base/server_main.js");
install("service-configuration");
install("localstorage");
install("oauth");
install("accounts-oauth");
install("oauth2");
install("github-oauth");
install("accounts-github");
install("oauth1");
install("twitter-oauth");
install("accounts-twitter");
install("facebook-oauth");
install("accounts-facebook");
install("meteor-developer-oauth");
install("accounts-meteor-developer");
install("livedata");
install("hot-code-push");
install("ui");
install("autoupdate");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"process.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/modules/process.js                                                                                        //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
if (! global.process) {
  try {
    // The application can run `npm install process` to provide its own
    // process stub; otherwise this module will provide a partial stub.
    global.process = require("process");
  } catch (missing) {
    global.process = {};
  }
}

var proc = global.process;

if (Meteor.isServer) {
  // Make require("process") work on the server in all versions of Node.
  meteorInstall({
    node_modules: {
      "process.js": function (r, e, module) {
        module.exports = proc;
      }
    }
  });
} else {
  proc.platform = "browser";
  proc.nextTick = proc.nextTick || Meteor._setImmediate;
}

if (typeof proc.env !== "object") {
  proc.env = {};
}

var hasOwn = Object.prototype.hasOwnProperty;
for (var key in meteorEnv) {
  if (hasOwn.call(meteorEnv, key)) {
    proc.env[key] = meteorEnv[key];
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"reify.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/modules/reify.js                                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Module = module.constructor;
var Mp = Module.prototype;
require("reify/lib/runtime").enable(Mp);
Mp.importSync = Mp.importSync || Mp.import;
Mp.import = Mp.import || Mp.importSync;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"node_modules":{"reify":{"lib":{"runtime":{"index.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/meteor/modules/node_modules/reify/lib/runtime/index.js                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
"use strict";

// This module should be compatible with PhantomJS v1, just like the other files
// in reify/lib/runtime. Node 4+ features like const/let and arrow functions are
// not acceptable here, and importing any npm packages should be contemplated
// with extreme skepticism.

var utils = require("./utils.js");
var Entry = require("./entry.js");

// The exports.enable method can be used to enable the Reify runtime for
// specific module objects, or for Module.prototype (where implemented),
// to make the runtime available throughout the entire module system.
exports.enable = function (mod) {
  if (typeof mod.export !== "function" ||
      typeof mod.importSync !== "function") {
    mod.export = moduleExport;
    mod.exportDefault = moduleExportDefault;
    mod.runSetters = runSetters;
    mod.watch = moduleWatch;

    // Used for copying the properties of a namespace object to
    // mod.exports to implement `export * from "module"` syntax.
    mod.makeNsSetter = moduleMakeNsSetter;

    // To be deprecated:
    mod.runModuleSetters = runSetters;
    mod.importSync = importSync;

    return true;
  }

  return false;
};

function moduleWatch(exported, setters, key) {
  utils.setESModule(this.exports);
  Entry.getOrCreate(this.exports, this);

  if (utils.isObject(setters)) {
    Entry.getOrCreate(exported).addSetters(this, setters, key);
  }
}

// If key is provided, it will be used to identify the given setters so
// that they can be replaced if module.importSync is called again with the
// same key. This avoids potential memory leaks from import declarations
// inside loops. The compiler generates these keys automatically (and
// deterministically) when compiling nested import declarations.
function importSync(id, setters, key) {
  return this.watch(this.require(id), setters, key);
}

// Register getter functions for local variables in the scope of an export
// statement. Pass true as the second argument to indicate that the getter
// functions always return the same values.
function moduleExport(getters, constant) {
  utils.setESModule(this.exports);
  var entry = Entry.getOrCreate(this.exports, this);
  entry.addGetters(getters, constant);
  if (this.loaded) {
    // If the module has already been evaluated, then we need to trigger
    // another round of entry.runSetters calls, which begins by calling
    // entry.runModuleGetters(module).
    entry.runSetters();
  }
}

// Register a getter function that always returns the given value.
function moduleExportDefault(value) {
  return this.export({
    default: function () {
      return value;
    }
  }, true);
}

// Platform-specific code should find a way to call this method whenever
// the module system is about to return module.exports from require. This
// might happen more than once per module, in case of dependency cycles,
// so we want Module.prototype.runSetters to run each time.
function runSetters(valueToPassThrough) {
  var entry = Entry.get(this.exports);
  if (entry !== null) {
    entry.runSetters();
  }

  if (this.loaded) {
    // If this module has finished loading, then we must create an Entry
    // object here, so that we can add this module to entry.ownerModules
    // by passing it as the second argument to Entry.getOrCreate.
    Entry.getOrCreate(this.exports, this);
  }

  // Assignments to exported local variables get wrapped with calls to
  // module.runSetters, so module.runSetters returns the
  // valueToPassThrough parameter to allow the value of the original
  // expression to pass through. For example,
  //
  //   export var a = 1;
  //   console.log(a += 3);
  //
  // becomes
  //
  //   module.export("a", () => a);
  //   var a = 1;
  //   console.log(module.runSetters(a += 3));
  //
  // This ensures module.runSetters runs immediately after the assignment,
  // and does not interfere with the larger computation.
  return valueToPassThrough;
}

// Returns a function that takes a namespace object and copies the
// properties of the namespace to module.exports, excluding any "default"
// property, which is useful for implementing `export * from "module"`.
function moduleMakeNsSetter() {
  var module = this;
  // Discussion of why the "default" property is skipped:
  // https://github.com/tc39/ecma262/issues/948
  return function (namespace) {
    Object.keys(namespace).forEach(function (key) {
      if (key !== "default") {
        utils.copyKey(key, module.exports, namespace);
      }
    });
  };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}}},"fs-extra":{"package.json":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/fs-extra/package.json                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
exports.name = "fs-extra";
exports.version = "4.0.2";
exports.main = "./lib/index.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"index.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/fs-extra/lib/index.js                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
'use strict'

const assign = require('./util/assign')

const fs = {}

// Export graceful-fs:
assign(fs, require('./fs'))
// Export extra methods:
assign(fs, require('./copy'))
assign(fs, require('./copy-sync'))
assign(fs, require('./mkdirs'))
assign(fs, require('./remove'))
assign(fs, require('./json'))
assign(fs, require('./move'))
assign(fs, require('./move-sync'))
assign(fs, require('./empty'))
assign(fs, require('./ensure'))
assign(fs, require('./output'))
assign(fs, require('./path-exists'))

module.exports = fs

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"aws-sdk":{"clients":{"s3.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/aws-sdk/clients/s3.js                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
require('../lib/node_loader');
var AWS = require('../lib/core');
var Service = AWS.Service;
var apiLoader = AWS.apiLoader;

apiLoader.services['s3'] = {};
AWS.S3 = Service.defineService('s3', ['2006-03-01']);
require('../lib/services/s3');
Object.defineProperty(apiLoader.services['s3'], '2006-03-01', {
  get: function get() {
    var model = require('../apis/s3-2006-03-01.min.json');
    model.paginators = require('../apis/s3-2006-03-01.paginators.json').pagination;
    model.waiters = require('../apis/s3-2006-03-01.waiters2.json').waiters;
    return model;
  },
  enumerable: true,
  configurable: true
});

module.exports = AWS.S3;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"request":{"package.json":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/request/package.json                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
exports.name = "request";
exports.version = "2.83.0";
exports.main = "index.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/request/index.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// Copyright 2010-2012 Mikeal Rogers
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

'use strict'

var extend = require('extend')
var cookies = require('./lib/cookies')
var helpers = require('./lib/helpers')

var paramsHaveRequestBody = helpers.paramsHaveRequestBody

// organize params for patch, post, put, head, del
function initParams (uri, options, callback) {
  if (typeof options === 'function') {
    callback = options
  }

  var params = {}
  if (typeof options === 'object') {
    extend(params, options, {uri: uri})
  } else if (typeof uri === 'string') {
    extend(params, {uri: uri})
  } else {
    extend(params, uri)
  }

  params.callback = callback || params.callback
  return params
}

function request (uri, options, callback) {
  if (typeof uri === 'undefined') {
    throw new Error('undefined is not a valid uri or options object.')
  }

  var params = initParams(uri, options, callback)

  if (params.method === 'HEAD' && paramsHaveRequestBody(params)) {
    throw new Error('HTTP HEAD requests MUST NOT include a request body.')
  }

  return new request.Request(params)
}

function verbFunc (verb) {
  var method = verb.toUpperCase()
  return function (uri, options, callback) {
    var params = initParams(uri, options, callback)
    params.method = method
    return request(params, params.callback)
  }
}

// define like this to please codeintel/intellisense IDEs
request.get = verbFunc('get')
request.head = verbFunc('head')
request.options = verbFunc('options')
request.post = verbFunc('post')
request.put = verbFunc('put')
request.patch = verbFunc('patch')
request.del = verbFunc('delete')
request['delete'] = verbFunc('delete')

request.jar = function (store) {
  return cookies.jar(store)
}

request.cookie = function (str) {
  return cookies.parse(str)
}

function wrapRequestMethod (method, options, requester, verb) {
  return function (uri, opts, callback) {
    var params = initParams(uri, opts, callback)

    var target = {}
    extend(true, target, options, params)

    target.pool = params.pool || options.pool

    if (verb) {
      target.method = verb.toUpperCase()
    }

    if (typeof requester === 'function') {
      method = requester
    }

    return method(target, target.callback)
  }
}

request.defaults = function (options, requester) {
  var self = this

  options = options || {}

  if (typeof options === 'function') {
    requester = options
    options = {}
  }

  var defaults = wrapRequestMethod(self, options, requester)

  var verbs = ['get', 'head', 'post', 'put', 'patch', 'del', 'delete']
  verbs.forEach(function (verb) {
    defaults[verb] = wrapRequestMethod(self[verb], options, requester, verb)
  })

  defaults.cookie = wrapRequestMethod(self.cookie, options, requester)
  defaults.jar = self.jar
  defaults.defaults = self.defaults
  return defaults
}

request.forever = function (agentOptions, optionsArg) {
  var options = {}
  if (optionsArg) {
    extend(options, optionsArg)
  }
  if (agentOptions) {
    options.agentOptions = agentOptions
  }

  options.forever = true
  return request.defaults(options)
}

// Exports

module.exports = request
request.Request = require('./request')
request.initParams = initParams

// Backwards compatibility for request.debug
Object.defineProperty(request, 'debug', {
  enumerable: true,
  get: function () {
    return request.Request.debug
  },
  set: function (debug) {
    request.Request.debug = debug
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"dropbox":{"package.json":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/dropbox/package.json                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
exports.name = "dropbox";
exports.version = "0.10.3";
exports.main = "lib/dropbox.js";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"dropbox.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/dropbox/lib/dropbox.js                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// Generated by CoffeeScript 1.7.1
(function() {
  var DbxClient, DbxEnvGlobal, DbxEnvRequire, DbxXhrArrayBufferView, DbxXhrCanSendForms, DbxXhrDoesPreflight, DbxXhrIeMode, DbxXhrRequest, DbxXhrSendArrayBufferView, DbxXhrWrapBlob, Dropbox,
    __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Dropbox = (function() {
    function Dropbox() {
      throw new Error("Not implemented. Did you mean to use Dropbox.Client?");
    }

    return Dropbox;

  })();

  Dropbox.Util = (function() {
    function Util() {}

    return Util;

  })();

  Dropbox.Http = (function() {
    function Http() {}

    return Http;

  })();

  Dropbox.File = (function() {
    function File() {}

    return File;

  })();

  if (typeof global !== 'undefined' && typeof module !== 'undefined' && 'exports' in module) {
    DbxEnvGlobal = global;
    DbxEnvRequire = module.require.bind(module);
    module.exports = Dropbox;
  } else if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    DbxEnvGlobal = window;
    DbxEnvRequire = null;
    if (window.Dropbox) {
      (function() {
        var name, value, _ref, _results;
        _ref = window.Dropbox;
        _results = [];
        for (name in _ref) {
          if (!__hasProp.call(_ref, name)) continue;
          value = _ref[name];
          _results.push(Dropbox[name] = value);
        }
        return _results;
      })();
    }
    window.Dropbox = Dropbox;
  } else if (typeof self !== 'undefined' && typeof navigator !== 'undefined') {
    DbxEnvGlobal = self;
    DbxEnvRequire = self.importScripts.bind(self);
    self.Dropbox = Dropbox;
  } else {
    throw new Error('dropbox.js loaded in an unsupported JavaScript environment.');
  }

  Dropbox.Env = (function() {
    function Env() {}

    Env.global = DbxEnvGlobal;

    Env.require = DbxEnvRequire;

    return Env;

  })();

  Dropbox.Util.EventSource = (function() {
    function EventSource(options) {
      this._cancelable = options && options.cancelable;
      this._listeners = [];
    }

    EventSource.prototype.addListener = function(listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('Invalid listener type; expected function');
      }
      if (__indexOf.call(this._listeners, listener) < 0) {
        this._listeners.push(listener);
      }
      return this;
    };

    EventSource.prototype.removeListener = function(listener) {
      var i, index, subscriber, _i, _len, _ref;
      if (this._listeners.indexOf) {
        index = this._listeners.indexOf(listener);
        if (index !== -1) {
          this._listeners.splice(index, 1);
        }
      } else {
        _ref = this._listeners;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          subscriber = _ref[i];
          if (subscriber === listener) {
            this._listeners.splice(i, 1);
            break;
          }
        }
      }
      return this;
    };

    EventSource.prototype.dispatch = function(event) {
      var listener, returnValue, _i, _len, _ref;
      _ref = this._listeners;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        listener = _ref[_i];
        returnValue = listener(event);
        if (this._cancelable && (returnValue === false)) {
          return false;
        }
      }
      return true;
    };

    return EventSource;

  })();

  Dropbox.AccountInfo = (function() {
    AccountInfo.parse = function(accountInfo) {
      if (accountInfo && typeof accountInfo === 'object') {
        return new Dropbox.AccountInfo(accountInfo);
      } else {
        return accountInfo;
      }
    };

    AccountInfo.prototype.name = null;

    AccountInfo.prototype.email = null;

    AccountInfo.prototype.countryCode = null;

    AccountInfo.prototype.uid = null;

    AccountInfo.prototype.referralUrl = null;

    AccountInfo.prototype.publicAppUrl = null;

    AccountInfo.prototype.quota = null;

    AccountInfo.prototype.usedQuota = null;

    AccountInfo.prototype.privateBytes = null;

    AccountInfo.prototype.sharedBytes = null;

    AccountInfo.prototype.json = function() {
      return this._json;
    };

    function AccountInfo(accountInfo) {
      var lastIndex;
      this._json = accountInfo;
      this.name = accountInfo.display_name;
      this.email = accountInfo.email;
      this.countryCode = accountInfo.country || null;
      this.uid = accountInfo.uid.toString();
      if (accountInfo.public_app_url) {
        this.publicAppUrl = accountInfo.public_app_url;
        lastIndex = this.publicAppUrl.length - 1;
        if (lastIndex >= 0 && this.publicAppUrl.substring(lastIndex) === '/') {
          this.publicAppUrl = this.publicAppUrl.substring(0, lastIndex);
        }
      } else {
        this.publicAppUrl = null;
      }
      this.referralUrl = accountInfo.referral_link;
      this.quota = accountInfo.quota_info.quota;
      this.privateBytes = accountInfo.quota_info.normal || 0;
      this.sharedBytes = accountInfo.quota_info.shared || 0;
      this.usedQuota = this.privateBytes + this.sharedBytes;
    }

    return AccountInfo;

  })();

  Dropbox.ApiError = (function() {
    ApiError.prototype.status = null;

    ApiError.prototype.method = null;

    ApiError.prototype.url = null;

    ApiError.prototype.responseText = null;

    ApiError.prototype.response = null;

    ApiError.NETWORK_ERROR = 0;

    ApiError.NO_CONTENT = 304;

    ApiError.INVALID_PARAM = 400;

    ApiError.INVALID_TOKEN = 401;

    ApiError.OAUTH_ERROR = 403;

    ApiError.NOT_FOUND = 404;

    ApiError.INVALID_METHOD = 405;

    ApiError.NOT_ACCEPTABLE = 406;

    ApiError.CONFLICT = 409;

    ApiError.RATE_LIMITED = 429;

    ApiError.SERVER_ERROR = 503;

    ApiError.OVER_QUOTA = 507;

    function ApiError(xhr, method, url) {
      var text, xhrError;
      this.method = method;
      this.url = url;
      this.status = xhr.status;
      if (xhr.responseType) {
        try {
          text = xhr.response || xhr.responseText;
        } catch (_error) {
          xhrError = _error;
          try {
            text = xhr.responseText;
          } catch (_error) {
            xhrError = _error;
            text = null;
          }
        }
      } else {
        try {
          text = xhr.responseText;
        } catch (_error) {
          xhrError = _error;
          text = null;
        }
      }
      if (text) {
        try {
          this.responseText = text.toString();
          this.response = JSON.parse(text);
        } catch (_error) {
          xhrError = _error;
          this.response = null;
        }
      } else {
        this.responseText = '(no response)';
        this.response = null;
      }
    }

    ApiError.prototype.toString = function() {
      return "Dropbox API error " + this.status + " from " + this.method + " " + this.url + " :: " + this.responseText;
    };

    ApiError.prototype.inspect = function() {
      return this.toString();
    };

    return ApiError;

  })();

  Dropbox.AuthDriver = (function() {
    function AuthDriver() {}

    AuthDriver.prototype.authType = function() {
      return "code";
    };

    AuthDriver.prototype.url = function() {
      return "https://some.url";
    };

    AuthDriver.prototype.doAuthorize = function(authUrl, stateParam, client, callback) {
      return callback({
        code: 'access-code'
      });
    };

    AuthDriver.prototype.getStateParam = function(client, callback) {
      return callback(Dropbox.Util.Oauth.randomAuthStateParam());
    };

    AuthDriver.prototype.resumeAuthorize = function(stateParam, client, callback) {
      return callback({
        code: 'access-code'
      });
    };

    AuthDriver.prototype.onAuthStepChange = function(client, callback) {
      return callback();
    };

    AuthDriver.oauthQueryParams = ['access_token', 'expires_in', 'scope', 'token_type', 'code', 'error', 'error_description', 'error_uri', 'mac_key', 'mac_algorithm'].sort();

    return AuthDriver;

  })();

  Dropbox.AuthDriver.autoConfigure = function(client) {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id) {
      if (chrome.tabs && chrome.tabs.create) {
        client.authDriver(new Dropbox.AuthDriver.ChromeExtension());
      } else {
        client.authDriver(new Dropbox.AuthDriver.ChromeApp());
      }
      return;
    }
    if (typeof window !== 'undefined') {
      if (window.cordova) {
        client.authDriver(new Dropbox.AuthDriver.Cordova());
        return;
      }
      if (window && window.navigator) {
        client.authDriver(new Dropbox.AuthDriver.Redirect());
      }
    }
  };

  Dropbox.AuthDriver.BrowserBase = (function() {
    function BrowserBase(options) {
      if (options) {
        this.rememberUser = 'rememberUser' in options ? options.rememberUser : true;
        this.scope = options.scope || 'default';
      } else {
        this.rememberUser = true;
        this.scope = 'default';
      }
      this.storageKey = null;
      this.storage = Dropbox.AuthDriver.BrowserBase.localStorage();
      this.stateRe = /^[^#]+\#(.*&)?state=([^&]+)(&|$)/;
    }

    BrowserBase.prototype.authType = function() {
      return 'token';
    };

    BrowserBase.prototype.onAuthStepChange = function(client, callback) {
      this.setStorageKey(client);
      switch (client.authStep) {
        case Dropbox.Client.RESET:
          return this.loadCredentials((function(_this) {
            return function(credentials) {
              if (!credentials) {
                return callback();
              }
              client.setCredentials(credentials);
              if (client.authStep !== Dropbox.Client.DONE) {
                return callback();
              }
              if (!_this.rememberUser) {
                return _this.forgetCredentials(callback);
              }
              client.setCredentials(credentials);
              return callback();
            };
          })(this));
        case Dropbox.Client.DONE:
          if (this.rememberUser) {
            return this.storeCredentials(client.credentials(), callback);
          }
          return this.forgetCredentials(callback);
        case Dropbox.Client.SIGNED_OUT:
          return this.forgetCredentials(callback);
        case Dropbox.Client.ERROR:
          return this.forgetCredentials(callback);
        default:
          callback();
          return this;
      }
    };

    BrowserBase.prototype.setStorageKey = function(client) {
      this.storageKey = "dropbox-auth:" + this.scope + ":" + (client.appHash());
      return this;
    };

    BrowserBase.prototype.storeCredentials = function(credentials, callback) {
      var jsonString, name, storageError, value;
      jsonString = JSON.stringify(credentials);
      try {
        this.storage.setItem(this.storageKey, jsonString);
      } catch (_error) {
        storageError = _error;
        name = encodeURIComponent(this.storageKey);
        value = encodeURIComponent(jsonString);
        document.cookie = "" + name + "=" + value + "; path=/";
      }
      callback();
      return this;
    };

    BrowserBase.prototype.loadCredentials = function(callback) {
      var cookieRegexp, jsonError, jsonString, match, name, nameRegexp, storageError;
      try {
        jsonString = this.storage.getItem(this.storageKey);
      } catch (_error) {
        storageError = _error;
        jsonString = null;
      }
      if (jsonString === null) {
        name = encodeURIComponent(this.storageKey);
        nameRegexp = name.replace(/[.*+()]/g, '\\$&');
        cookieRegexp = new RegExp("(^|(;\\s*))" + name + "=([^;]*)(;|$)");
        if (match = cookieRegexp.exec(document.cookie)) {
          jsonString = decodeURIComponent(match[3]);
        }
      }
      if (!jsonString) {
        callback(null);
        return this;
      }
      try {
        callback(JSON.parse(jsonString));
      } catch (_error) {
        jsonError = _error;
        callback(null);
      }
      return this;
    };

    BrowserBase.prototype.forgetCredentials = function(callback) {
      var expires, name, storageError;
      try {
        this.storage.removeItem(this.storageKey);
      } catch (_error) {
        storageError = _error;
        name = encodeURIComponent(this.storageKey);
        expires = (new Date(0)).toGMTString();
        document.cookie = "" + name + "={}; expires=" + expires + "; path=/";
      }
      callback();
      return this;
    };

    BrowserBase.prototype.locationStateParam = function(url) {
      var location, match;
      location = url || Dropbox.AuthDriver.BrowserBase.currentLocation();
      match = this.stateRe.exec(location);
      if (match) {
        return decodeURIComponent(match[2]);
      }
      return null;
    };

    BrowserBase.prototype.replaceUrlBasename = function(url, basename) {
      var fragments, hashIndex, queryIndex;
      hashIndex = url.indexOf('#');
      if (hashIndex !== -1) {
        url = url.substring(0, hashIndex);
      }
      queryIndex = url.indexOf('?');
      if (queryIndex !== -1) {
        url = url.substring(0, queryIndex);
      }
      fragments = url.split('/');
      fragments[fragments.length - 1] = basename;
      return fragments.join('/');
    };

    BrowserBase.localStorage = function() {
      var deprecationError;
      if (typeof window !== 'undefined') {
        try {
          return window.localStorage;
        } catch (_error) {
          deprecationError = _error;
          return null;
        }
      } else {
        return null;
      }
    };

    BrowserBase.currentLocation = function() {
      return window.location.href;
    };

    BrowserBase.cleanupLocation = function() {
      var hashIndex, pageUrl;
      if (window.history && window.history.replaceState) {
        pageUrl = this.currentLocation();
        hashIndex = pageUrl.indexOf('#');
        window.history.replaceState({}, document.title, pageUrl.substring(0, hashIndex));
      } else {
        window.location.hash = '';
      }
    };

    return BrowserBase;

  })();

  Dropbox.AuthDriver.Redirect = (function(_super) {
    __extends(Redirect, _super);

    function Redirect(options) {
      Redirect.__super__.constructor.call(this, options);
      this.receiverUrl = this.baseUrl(options);
    }

    Redirect.prototype.baseUrl = function(options) {
      var hashIndex, url;
      url = Dropbox.AuthDriver.BrowserBase.currentLocation();
      if (options) {
        if (options.redirectUrl) {
          return options.redirectUrl;
        }
        if (options.redirectFile) {
          return this.replaceUrlBasename(url, options.redirectFile);
        }
      }
      hashIndex = url.indexOf('#');
      if (hashIndex !== -1) {
        url = url.substring(0, hashIndex);
      }
      return url;
    };

    Redirect.prototype.url = function() {
      return this.receiverUrl;
    };

    Redirect.prototype.doAuthorize = function(authUrl, stateParam, client) {
      return this.storeCredentials(client.credentials(), function() {
        return window.location.assign(authUrl);
      });
    };

    Redirect.prototype.resumeAuthorize = function(stateParam, client, callback) {
      var pageUrl;
      if (this.locationStateParam() === stateParam) {
        pageUrl = Dropbox.AuthDriver.BrowserBase.currentLocation();
        Dropbox.AuthDriver.BrowserBase.cleanupLocation();
        return callback(Dropbox.Util.Oauth.queryParamsFromUrl(pageUrl));
      } else {
        return this.forgetCredentials(function() {
          return callback({
            error: 'Authorization error'
          });
        });
      }
    };

    return Redirect;

  })(Dropbox.AuthDriver.BrowserBase);

  Dropbox.AuthDriver.Popup = (function(_super) {
    __extends(Popup, _super);

    function Popup(options) {
      Popup.__super__.constructor.call(this, options);
      this.receiverUrl = this.baseUrl(options);
    }

    Popup.prototype.url = function() {
      return this.receiverUrl;
    };

    Popup.prototype.doAuthorize = function(authUrl, stateParam, client, callback) {
      this.listenForMessage(stateParam, callback);
      return this.openWindow(authUrl);
    };

    Popup.prototype.baseUrl = function(options) {
      var url;
      url = Dropbox.AuthDriver.BrowserBase.currentLocation();
      if (options) {
        if (options.receiverUrl) {
          return options.receiverUrl;
        } else if (options.receiverFile) {
          return this.replaceUrlBasename(url, options.receiverFile);
        }
      }
      return url;
    };

    Popup.prototype.openWindow = function(url) {
      return window.open(url, '_dropboxOauthSigninWindow', this.popupWindowSpec(980, 700));
    };

    Popup.prototype.popupWindowSpec = function(popupWidth, popupHeight) {
      var height, popupLeft, popupTop, width, x0, y0, _ref, _ref1, _ref2, _ref3;
      x0 = (_ref = window.screenX) != null ? _ref : window.screenLeft;
      y0 = (_ref1 = window.screenY) != null ? _ref1 : window.screenTop;
      width = (_ref2 = window.outerWidth) != null ? _ref2 : document.documentElement.clientWidth;
      height = (_ref3 = window.outerHeight) != null ? _ref3 : document.documentElement.clientHeight;
      popupLeft = Math.round(x0 + (width - popupWidth) / 2);
      popupTop = Math.round(y0 + (height - popupHeight) / 2.5);
      if (popupLeft < x0) {
        popupLeft = x0;
      }
      if (popupTop < y0) {
        popupTop = y0;
      }
      return ("width=" + popupWidth + ",height=" + popupHeight + ",") + ("left=" + popupLeft + ",top=" + popupTop) + 'dialog=yes,dependent=yes,scrollbars=yes,location=yes';
    };

    Popup.prototype.listenForMessage = function(stateParam, callback) {
      var listener;
      listener = (function(_this) {
        return function(event) {
          var data, jsonError, oauthInfo;
          if (event.data) {
            data = event.data;
          } else {
            data = event;
          }
          try {
            oauthInfo = JSON.parse(data)._dropboxjs_oauth_info;
          } catch (_error) {
            jsonError = _error;
            return;
          }
          if (!oauthInfo) {
            return;
          }
          if (_this.locationStateParam(oauthInfo) === stateParam) {
            stateParam = false;
            window.removeEventListener('message', listener);
            Dropbox.AuthDriver.Popup.onMessage.removeListener(listener);
            return callback(Dropbox.Util.Oauth.queryParamsFromUrl(data));
          }
        };
      })(this);
      window.addEventListener('message', listener, false);
      return Dropbox.AuthDriver.Popup.onMessage.addListener(listener);
    };

    Popup.locationOrigin = function(location) {
      var match;
      match = /^(file:\/\/[^\?\#]*)(\?|\#|$)/.exec(location);
      if (match) {
        return match[1];
      }
      match = /^([^\:]+\:\/\/[^\/\?\#]*)(\/|\?|\#|$)/.exec(location);
      if (match) {
        return match[1];
      }
      return location;
    };

    Popup.oauthReceiver = function() {
      window.addEventListener('load', function() {
        var frameError, ieError, message, opener, pageOrigin, pageUrl;
        pageUrl = window.location.href;
        message = JSON.stringify({
          _dropboxjs_oauth_info: pageUrl
        });
        Dropbox.AuthDriver.BrowserBase.cleanupLocation();
        opener = window.opener;
        if (window.parent !== window.top) {
          opener || (opener = window.parent);
        }
        if (opener) {
          try {
            pageOrigin = window.location.origin || locationOrigin(pageUrl);
            opener.postMessage(message, pageOrigin);
            window.close();
          } catch (_error) {
            ieError = _error;
          }
          try {
            opener.Dropbox.AuthDriver.Popup.onMessage.dispatch(message);
            return window.close();
          } catch (_error) {
            frameError = _error;
          }
        }
      });
    };

    Popup.onMessage = new Dropbox.Util.EventSource;

    return Popup;

  })(Dropbox.AuthDriver.BrowserBase);

  Dropbox.AuthDriver.ChromeBase = (function(_super) {
    __extends(ChromeBase, _super);

    function ChromeBase(options) {
      ChromeBase.__super__.constructor.call(this, options);
      this.storageKey = "dropbox_js_" + this.scope + "_credentials";
    }

    ChromeBase.prototype.onAuthStepChange = function(client, callback) {
      switch (client.authStep) {
        case Dropbox.Client.RESET:
          return this.loadCredentials(function(credentials) {
            if (credentials) {
              client.setCredentials(credentials);
            }
            return callback();
          });
        case Dropbox.Client.DONE:
          return this.storeCredentials(client.credentials(), callback);
        case Dropbox.Client.SIGNED_OUT:
          return this.forgetCredentials(callback);
        case Dropbox.Client.ERROR:
          return this.forgetCredentials(callback);
        default:
          return callback();
      }
    };

    ChromeBase.prototype.url = function() {
      return this.receiverUrl;
    };

    ChromeBase.prototype.storeCredentials = function(credentials, callback) {
      var items;
      items = {};
      items[this.storageKey] = credentials;
      chrome.storage.local.set(items, callback);
      return this;
    };

    ChromeBase.prototype.loadCredentials = function(callback) {
      chrome.storage.local.get(this.storageKey, (function(_this) {
        return function(items) {
          return callback(items[_this.storageKey] || null);
        };
      })(this));
      return this;
    };

    ChromeBase.prototype.forgetCredentials = function(callback) {
      chrome.storage.local.remove(this.storageKey, callback);
      return this;
    };

    return ChromeBase;

  })(Dropbox.AuthDriver.BrowserBase);

  Dropbox.AuthDriver.ChromeApp = (function(_super) {
    __extends(ChromeApp, _super);

    function ChromeApp(options) {
      ChromeApp.__super__.constructor.call(this, options);
      this.receiverUrl = "https://" + chrome.runtime.id + ".chromiumapp.org/";
    }

    ChromeApp.prototype.doAuthorize = function(authUrl, stateParam, client, callback) {
      return chrome.identity.launchWebAuthFlow({
        url: authUrl,
        interactive: true
      }, (function(_this) {
        return function(redirectUrl) {
          if (_this.locationStateParam(redirectUrl) === stateParam) {
            stateParam = false;
            return callback(Dropbox.Util.Oauth.queryParamsFromUrl(redirectUrl));
          }
        };
      })(this));
    };

    return ChromeApp;

  })(Dropbox.AuthDriver.ChromeBase);

  Dropbox.AuthDriver.ChromeExtension = (function(_super) {
    __extends(ChromeExtension, _super);

    function ChromeExtension(options) {
      var receiverPath;
      ChromeExtension.__super__.constructor.call(this, options);
      receiverPath = (options && options.receiverPath) || 'chrome_oauth_receiver.html';
      this.receiverUrl = chrome.runtime.getURL(receiverPath);
    }

    ChromeExtension.prototype.doAuthorize = function(authUrl, stateParam, client, callback) {
      var listener, oauthTab;
      oauthTab = null;
      listener = (function(_this) {
        return function(message, sender) {
          var receiverHref;
          if (sender && sender.tab) {
            if (sender.tab.url.substring(0, _this.receiverUrl.length) !== _this.receiverUrl) {
              return;
            }
          }
          if (!message.dropbox_oauth_receiver_href) {
            return;
          }
          receiverHref = message.dropbox_oauth_receiver_href;
          if (_this.locationStateParam(receiverHref) === stateParam) {
            stateParam = false;
            if (oauthTab) {
              chrome.tabs.remove(oauthTab.id);
            }
            chrome.runtime.onMessage.removeListener(listener);
            return callback(Dropbox.Util.Oauth.queryParamsFromUrl(receiverHref));
          }
        };
      })(this);
      chrome.runtime.onMessage.addListener(listener);
      return chrome.tabs.create({
        url: authUrl,
        active: true,
        pinned: false
      }, function(tab) {
        return oauthTab = tab;
      });
    };

    ChromeExtension.oauthReceiver = function() {
      return window.addEventListener('load', function() {
        var pageUrl;
        pageUrl = window.location.href;
        window.location.hash = '';
        chrome.runtime.sendMessage({
          dropbox_oauth_receiver_href: pageUrl
        });
        if (window.close) {
          return window.close();
        }
      });
    };

    return ChromeExtension;

  })(Dropbox.AuthDriver.ChromeBase);

  Dropbox.AuthDriver.Cordova = (function(_super) {
    __extends(Cordova, _super);

    function Cordova(options) {
      Cordova.__super__.constructor.call(this, options);
    }

    Cordova.prototype.url = function() {
      return 'https://www.dropbox.com/1/oauth2/redirect_receiver';
    };

    Cordova.prototype.doAuthorize = function(authUrl, stateParam, client, callback) {
      var authHost, browser, onEvent, promptPageLoaded, removed;
      browser = window.open(authUrl, '_blank', 'location=yes,closebuttoncaption=Cancel');
      promptPageLoaded = false;
      authHost = /^[^/]*\/\/[^/]*\//.exec(authUrl)[0];
      removed = false;
      onEvent = (function(_this) {
        return function(event) {
          if (event.url && _this.locationStateParam(event.url) === stateParam) {
            if (removed) {
              return;
            }
            browser.removeEventListener('loadstart', onEvent);
            browser.removeEventListener('loaderror', onEvent);
            browser.removeEventListener('loadstop', onEvent);
            browser.removeEventListener('exit', onEvent);
            removed = true;
            window.setTimeout((function() {
              return browser.close();
            }), 10);
            callback(Dropbox.Util.Oauth.queryParamsFromUrl(event.url));
            return;
          }
          if (event.type === 'exit') {
            if (removed) {
              return;
            }
            browser.removeEventListener('loadstart', onEvent);
            browser.removeEventListener('loaderror', onEvent);
            browser.removeEventListener('loadstop', onEvent);
            browser.removeEventListener('exit', onEvent);
            removed = true;
            callback(new AuthError('error=access_denied&error_description=User+closed+browser+window'));
          }
        };
      })(this);
      browser.addEventListener('loadstart', onEvent);
      browser.addEventListener('loaderror', onEvent);
      browser.addEventListener('loadstop', onEvent);
      return browser.addEventListener('exit', onEvent);
    };

    return Cordova;

  })(Dropbox.AuthDriver.BrowserBase);

  Dropbox.AuthDriver.NodeServer = (function() {
    function NodeServer(options) {
      this._port = (options != null ? options.port : void 0) || 8912;
      if (options != null ? options.tls : void 0) {
        this._tlsOptions = options.tls;
        if (typeof this._tlsOptions === 'string' || this._tlsOptions instanceof Buffer) {
          this._tlsOptions = {
            key: this._tlsOptions,
            cert: this._tlsOptions
          };
        }
      } else {
        this._tlsOptions = null;
      }
      this._fs = Dropbox.Env.require('fs');
      this._http = Dropbox.Env.require('http');
      this._https = Dropbox.Env.require('https');
      this._open = Dropbox.Env.require('open');
      this._callbacks = {};
      this._nodeUrl = Dropbox.Env.require('url');
      this.createApp();
    }

    NodeServer.prototype.authType = function() {
      return "code";
    };

    NodeServer.prototype.url = function() {
      var protocol;
      protocol = this._tlsOptions === null ? 'http' : 'https';
      return "" + protocol + "://localhost:" + this._port + "/oauth_callback";
    };

    NodeServer.prototype.doAuthorize = function(authUrl, stateParam, client, callback) {
      this._callbacks[stateParam] = callback;
      return this.openBrowser(authUrl);
    };

    NodeServer.prototype.openBrowser = function(url) {
      if (!url.match(/^https?:\/\//)) {
        throw new Error("Not a http/https URL: " + url);
      }
      if ('BROWSER' in process.env) {
        return this._open(url, process.env['BROWSER']);
      } else {
        return this._open(url);
      }
    };

    NodeServer.prototype.createApp = function() {
      if (this._tlsOptions) {
        this._app = this._https.createServer(this._tlsOptions, (function(_this) {
          return function(request, response) {
            return _this.doRequest(request, response);
          };
        })(this));
      } else {
        this._app = this._http.createServer((function(_this) {
          return function(request, response) {
            return _this.doRequest(request, response);
          };
        })(this));
      }
      return this._app.listen(this._port);
    };

    NodeServer.prototype.closeServer = function() {
      return this._app.close();
    };

    NodeServer.prototype.doRequest = function(request, response) {
      var data, stateParam, url;
      url = this._nodeUrl.parse(request.url, true);
      if (url.pathname === '/oauth_callback') {
        stateParam = url.query.state;
        if (this._callbacks[stateParam]) {
          this._callbacks[stateParam](url.query);
          delete this._callbacks[stateParam];
        }
      }
      data = '';
      request.on('data', function(dataFragment) {
        return data += dataFragment;
      });
      return request.on('end', (function(_this) {
        return function() {
          return _this.closeBrowser(response);
        };
      })(this));
    };

    NodeServer.prototype.closeBrowser = function(response) {
      var closeHtml;
      closeHtml = "<!doctype html>\n<script type=\"text/javascript\">window.close();</script>\n<p>Please close this window.</p>";
      response.writeHead(200, {
        'Content-Length': closeHtml.length,
        'Content-Type': 'text/html'
      });
      response.write(closeHtml);
      return response.end();
    };

    return NodeServer;

  })();

  Dropbox.AuthError = (function() {
    AuthError.prototype.code = null;

    AuthError.prototype.description = null;

    AuthError.prototype.uri = null;

    AuthError.ACCESS_DENIED = 'access_denied';

    AuthError.INVALID_REQUEST = 'invalid_request';

    AuthError.UNAUTHORIZED_CLIENT = 'unauthorized_client';

    AuthError.INVALID_GRANT = 'invalid_grant';

    AuthError.INVALID_SCOPE = 'invalid_scope';

    AuthError.UNSUPPORTED_GRANT_TYPE = 'unsupported_grant_type';

    AuthError.UNSUPPORTED_RESPONSE_TYPE = 'unsupported_response_type';

    AuthError.SERVER_ERROR = 'server_error';

    AuthError.TEMPORARILY_UNAVAILABLE = 'temporarily_unavailable';

    function AuthError(queryString) {
      var root;
      if (!queryString.error) {
        throw new Error("Not an OAuth 2.0 error: " + (JSON.stringify(queryString)));
      }
      if (typeof queryString.error === 'object' && queryString.error.error) {
        root = queryString.error;
      } else {
        root = queryString;
      }
      this.code = root.error;
      this.description = root.error_description || null;
      this.uri = root.error_uri || null;
    }

    AuthError.prototype.toString = function() {
      return "Dropbox OAuth error " + this.code + " :: " + this.description;
    };

    AuthError.prototype.inspect = function() {
      return this.toString();
    };

    return AuthError;

  })();

  Dropbox.Client = (function() {
    function Client(options) {
      this._serverRoot = options.server || this._defaultServerRoot();
      if ('maxApiServer' in options) {
        this._maxApiServer = options.maxApiServer;
      } else {
        this._maxApiServer = this._defaultMaxApiServer();
      }
      this._authServer = options.authServer || this._defaultAuthServer();
      this._fileServer = options.fileServer || this._defaultFileServer();
      this._downloadServer = options.downloadServer || this._defaultDownloadServer();
      this._notifyServer = options.notifyServer || this._defaultNotifyServer();
      this.onXhr = new Dropbox.Util.EventSource({
        cancelable: true
      });
      this.onError = new Dropbox.Util.EventSource;
      this.onAuthStepChange = new Dropbox.Util.EventSource;
      this._xhrOnErrorHandler = (function(_this) {
        return function(error, callback) {
          return _this._handleXhrError(error, callback);
        };
      })(this);
      this._oauth = new Dropbox.Util.Oauth(options);
      this._uid = options.uid || null;
      this.authStep = this._oauth.step();
      this._driver = null;
      this.authError = null;
      this._credentials = null;
      this.setupUrls();
    }

    Client.prototype.onXhr = null;

    Client.prototype.onError = null;

    Client.prototype.onAuthStepChange = null;

    Client.prototype.authDriver = function(driver) {
      this._driver = driver;
      return this;
    };

    Client.prototype.dropboxUid = function() {
      return this._uid;
    };

    Client.prototype.credentials = function() {
      if (!this._credentials) {
        this._computeCredentials();
      }
      return this._credentials;
    };

    Client.prototype.authenticate = function(options, callback) {
      var interactive, oldAuthStep, _fsmErrorStep, _fsmNextStep, _fsmStep;
      if (!callback && typeof options === 'function') {
        callback = options;
        options = null;
      }
      if (options && 'interactive' in options) {
        interactive = options.interactive;
      } else {
        interactive = true;
      }
      if (!(this._driver || this.authStep === DbxClient.DONE)) {
        Dropbox.AuthDriver.autoConfigure(this);
        if (!this._driver) {
          throw new Error('OAuth driver auto-configuration failed. Call authDriver.');
        }
      }
      if (this.authStep === DbxClient.ERROR) {
        throw new Error('Client got in an error state. Call reset() to reuse it!');
      }
      _fsmNextStep = (function(_this) {
        return function() {
          _this.authStep = _this._oauth.step();
          if (_this.authStep === DbxClient.ERROR) {
            _this.authError = _this._oauth.error();
          }
          _this._credentials = null;
          _this.onAuthStepChange.dispatch(_this);
          return _fsmStep();
        };
      })(this);
      _fsmErrorStep = (function(_this) {
        return function() {
          _this.authStep = DbxClient.ERROR;
          _this._credentials = null;
          _this.onAuthStepChange.dispatch(_this);
          return _fsmStep();
        };
      })(this);
      oldAuthStep = null;
      _fsmStep = (function(_this) {
        return function() {
          var authUrl;
          if (oldAuthStep !== _this.authStep) {
            oldAuthStep = _this.authStep;
            if (_this._driver && _this._driver.onAuthStepChange) {
              _this._driver.onAuthStepChange(_this, _fsmStep);
              return;
            }
          }
          switch (_this.authStep) {
            case DbxClient.RESET:
              if (!interactive) {
                if (callback) {
                  callback(null, _this);
                }
                return;
              }
              if (_this._driver.getStateParam) {
                _this._driver.getStateParam(function(stateParam) {
                  if (_this.client.authStep === DbxClient.RESET) {
                    _this._oauth.setAuthStateParam(stateParam);
                  }
                  return _fsmNextStep();
                });
              }
              _this._oauth.setAuthStateParam(Dropbox.Util.Oauth.randomAuthStateParam());
              return _fsmNextStep();
            case DbxClient.PARAM_SET:
              if (!interactive) {
                if (callback) {
                  callback(null, _this);
                }
                return;
              }
              authUrl = _this.authorizeUrl();
              return _this._driver.doAuthorize(authUrl, _this._oauth.authStateParam(), _this, function(queryParams) {
                _this._oauth.processRedirectParams(queryParams);
                if (queryParams.uid) {
                  _this._uid = queryParams.uid;
                }
                return _fsmNextStep();
              });
            case DbxClient.PARAM_LOADED:
              if (!_this._driver.resumeAuthorize) {
                _this._oauth.setAuthStateParam(_this._oauth.authStateParam());
                _fsmNextStep();
                return;
              }
              return _this._driver.resumeAuthorize(_this._oauth.authStateParam(), _this, function(queryParams) {
                _this._oauth.processRedirectParams(queryParams);
                if (queryParams.uid) {
                  _this._uid = queryParams.uid;
                }
                return _fsmNextStep();
              });
            case DbxClient.AUTHORIZED:
              return _this.getAccessToken(function(error, data) {
                if (error) {
                  _this.authError = error;
                  return _fsmErrorStep();
                } else {
                  _this._oauth.processRedirectParams(data);
                  _this._uid = data.uid;
                  return _fsmNextStep();
                }
              });
            case DbxClient.DONE:
              if (callback) {
                callback(null, _this);
              }
              break;
            case DbxClient.SIGNED_OUT:
              _this.authStep = DbxClient.RESET;
              _this.reset();
              return _fsmStep();
            case DbxClient.ERROR:
              if (callback) {
                callback(_this.authError, _this);
              }
          }
        };
      })(this);
      _fsmStep();
      return this;
    };

    Client.prototype.isAuthenticated = function() {
      return this.authStep === DbxClient.DONE;
    };

    Client.prototype.signOut = function(options, callback) {
      var stopOnXhrError, xhr;
      if (!callback && typeof options === 'function') {
        callback = options;
        options = null;
      }
      stopOnXhrError = options && options.mustInvalidate;
      if (this.authStep !== DbxClient.DONE) {
        throw new Error("This client doesn't have a user's token");
      }
      xhr = new Dropbox.Util.Xhr('POST', this._urls.signOut);
      xhr.signWithOauth(this._oauth);
      return this._dispatchXhr(xhr, (function(_this) {
        return function(error) {
          if (error) {
            if (error.status === Dropbox.ApiError.INVALID_TOKEN) {
              error = null;
            } else if (stopOnXhrError) {
              if (callback) {
                callback(error);
              }
              return;
            }
          }
          _this.authStep = DbxClient.RESET;
          _this.reset();
          _this.authStep = DbxClient.SIGNED_OUT;
          _this.onAuthStepChange.dispatch(_this);
          if (_this._driver && _this._driver.onAuthStepChange) {
            return _this._driver.onAuthStepChange(_this, function() {
              if (callback) {
                return callback(null);
              }
            });
          } else {
            if (callback) {
              return callback(null);
            }
          }
        };
      })(this));
    };

    Client.prototype.signOff = function(options, callback) {
      return this.signOut(options, callback);
    };

    Client.prototype.getAccountInfo = function(options, callback) {
      var httpCache, xhr;
      if ((!callback) && (typeof options === 'function')) {
        callback = options;
        options = null;
      }
      httpCache = false;
      if (options && options.httpCache) {
        httpCache = true;
      }
      xhr = new Dropbox.Util.Xhr('GET', this._urls.accountInfo);
      xhr.signWithOauth(this._oauth, httpCache);
      return this._dispatchXhr(xhr, function(error, accountData) {
        return callback(error, Dropbox.AccountInfo.parse(accountData), accountData);
      });
    };

    Client.prototype.getUserInfo = function(options, callback) {
      return this.getAccountInfo(options, callback);
    };

    Client.prototype.readFile = function(path, options, callback) {
      var httpCache, params, rangeEnd, rangeHeader, rangeStart, responseType, xhr;
      if ((!callback) && (typeof options === 'function')) {
        callback = options;
        options = null;
      }
      params = {};
      responseType = 'text';
      rangeHeader = null;
      httpCache = false;
      if (options) {
        if (options.versionTag) {
          params.rev = options.versionTag;
        } else if (options.rev) {
          params.rev = options.rev;
        }
        if (options.arrayBuffer) {
          responseType = 'arraybuffer';
        } else if (options.blob) {
          responseType = 'blob';
        } else if (options.buffer) {
          responseType = 'buffer';
        } else if (options.binary) {
          responseType = 'b';
        }
        if (options.length) {
          if (options.start != null) {
            rangeStart = options.start;
            rangeEnd = options.start + options.length - 1;
          } else {
            rangeStart = '';
            rangeEnd = options.length;
          }
          rangeHeader = "bytes=" + rangeStart + "-" + rangeEnd;
        } else if (options.start != null) {
          rangeHeader = "bytes=" + options.start + "-";
        }
        if (options.httpCache) {
          httpCache = true;
        }
      }
      xhr = new Dropbox.Util.Xhr('GET', "" + this._urls.getFile + "/" + (this._urlEncodePath(path)));
      xhr.setParams(params).signWithOauth(this._oauth, httpCache);
      xhr.setResponseType(responseType);
      if (rangeHeader) {
        if (rangeHeader) {
          xhr.setHeader('Range', rangeHeader);
        }
        xhr.reportResponseHeaders();
      }
      return this._dispatchXhr(xhr, function(error, data, metadata, headers) {
        var rangeInfo;
        if (headers) {
          rangeInfo = Dropbox.Http.RangeInfo.parse(headers['content-range']);
        } else {
          rangeInfo = null;
        }
        return callback(error, data, Dropbox.File.Stat.parse(metadata), rangeInfo);
      });
    };

    Client.prototype.writeFile = function(path, data, options, callback) {
      var useForm;
      if ((!callback) && (typeof options === 'function')) {
        callback = options;
        options = null;
      }
      useForm = Dropbox.Util.Xhr.canSendForms && typeof data === 'object';
      if (useForm) {
        return this._writeFileUsingForm(path, data, options, callback);
      } else {
        return this._writeFileUsingPut(path, data, options, callback);
      }
    };

    Client.prototype._writeFileUsingForm = function(path, data, options, callback) {
      var fileName, params, slashIndex, xhr;
      slashIndex = path.lastIndexOf('/');
      if (slashIndex === -1) {
        fileName = path;
        path = '';
      } else {
        fileName = path.substring(slashIndex);
        path = path.substring(0, slashIndex);
      }
      params = {
        file: fileName
      };
      if (options) {
        if (options.noOverwrite) {
          params.overwrite = 'false';
        }
        if (options.lastVersionTag) {
          params.parent_rev = options.lastVersionTag;
        } else if (options.parentRev || options.parent_rev) {
          params.parent_rev = options.parentRev || options.parent_rev;
        }
      }
      xhr = new Dropbox.Util.Xhr('POST', "" + this._urls.postFile + "/" + (this._urlEncodePath(path)));
      xhr.setParams(params).signWithOauth(this._oauth).setFileField('file', fileName, data, 'application/octet-stream');
      delete params.file;
      return this._dispatchXhr(xhr, function(error, metadata) {
        if (callback) {
          return callback(error, Dropbox.File.Stat.parse(metadata));
        }
      });
    };

    Client.prototype._writeFileUsingPut = function(path, data, options, callback) {
      var params, xhr;
      params = {};
      if (options) {
        if (options.noOverwrite) {
          params.overwrite = 'false';
        }
        if (options.lastVersionTag) {
          params.parent_rev = options.lastVersionTag;
        } else if (options.parentRev || options.parent_rev) {
          params.parent_rev = options.parentRev || options.parent_rev;
        }
      }
      xhr = new Dropbox.Util.Xhr('POST', "" + this._urls.putFile + "/" + (this._urlEncodePath(path)));
      xhr.setBody(data).setParams(params).signWithOauth(this._oauth);
      return this._dispatchXhr(xhr, function(error, metadata) {
        if (callback) {
          return callback(error, Dropbox.File.Stat.parse(metadata));
        }
      });
    };

    Client.prototype.resumableUploadStep = function(data, cursor, callback) {
      var params, xhr;
      if (cursor) {
        params = {
          offset: cursor.offset
        };
        if (cursor.tag) {
          params.upload_id = cursor.tag;
        }
      } else {
        params = {
          offset: 0
        };
      }
      xhr = new Dropbox.Util.Xhr('POST', this._urls.chunkedUpload);
      xhr.setBody(data).setParams(params).signWithOauth(this._oauth);
      return this._dispatchXhr(xhr, function(error, cursor) {
        if (error && error.status === Dropbox.ApiError.INVALID_PARAM && error.response && error.response.upload_id && error.response.offset) {
          return callback(null, Dropbox.Http.UploadCursor.parse(error.response));
        } else {
          return callback(error, Dropbox.Http.UploadCursor.parse(cursor));
        }
      });
    };

    Client.prototype.resumableUploadFinish = function(path, cursor, options, callback) {
      var params, xhr;
      if ((!callback) && (typeof options === 'function')) {
        callback = options;
        options = null;
      }
      params = {
        upload_id: cursor.tag
      };
      if (options) {
        if (options.lastVersionTag) {
          params.parent_rev = options.lastVersionTag;
        } else if (options.parentRev || options.parent_rev) {
          params.parent_rev = options.parentRev || options.parent_rev;
        }
        if (options.noOverwrite) {
          params.overwrite = 'false';
        }
      }
      xhr = new Dropbox.Util.Xhr('POST', "" + this._urls.commitChunkedUpload + "/" + (this._urlEncodePath(path)));
      xhr.setParams(params).signWithOauth(this._oauth);
      return this._dispatchXhr(xhr, function(error, metadata) {
        if (callback) {
          return callback(error, Dropbox.File.Stat.parse(metadata));
        }
      });
    };

    Client.prototype.stat = function(path, options, callback) {
      var httpCache, params, xhr;
      if ((!callback) && (typeof options === 'function')) {
        callback = options;
        options = null;
      }
      params = {};
      httpCache = false;
      if (options) {
        if (options.versionTag) {
          params.rev = options.versionTag;
        } else if (options.rev) {
          params.rev = options.rev;
        }
        if (options.contentHash) {
          params.hash = options.contentHash;
        } else if (options.hash) {
          params.hash = options.hash;
        }
        if (options.removed || options.deleted) {
          params.include_deleted = 'true';
        }
        if (options.readDir) {
          params.list = 'true';
          if (options.readDir !== true) {
            params.file_limit = options.readDir.toString();
          }
        }
        if (options.cacheHash) {
          params.hash = options.cacheHash;
        }
        if (options.httpCache) {
          httpCache = true;
        }
      }
      params.include_deleted || (params.include_deleted = 'false');
      params.list || (params.list = 'false');
      xhr = new Dropbox.Util.Xhr('GET', "" + this._urls.metadata + "/" + (this._urlEncodePath(path)));
      xhr.setParams(params).signWithOauth(this._oauth, httpCache);
      return this._dispatchXhr(xhr, function(error, metadata) {
        var entries, entry, stat;
        stat = Dropbox.File.Stat.parse(metadata);
        if (metadata != null ? metadata.contents : void 0) {
          entries = (function() {
            var _i, _len, _ref, _results;
            _ref = metadata.contents;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              entry = _ref[_i];
              _results.push(Dropbox.File.Stat.parse(entry));
            }
            return _results;
          })();
        } else {
          entries = void 0;
        }
        return callback(error, stat, entries);
      });
    };

    Client.prototype.readdir = function(path, options, callback) {
      var statOptions;
      if ((!callback) && (typeof options === 'function')) {
        callback = options;
        options = null;
      }
      statOptions = {
        readDir: true
      };
      if (options) {
        if (options.limit != null) {
          statOptions.readDir = options.limit;
        }
        if (options.versionTag) {
          statOptions.versionTag = options.versionTag;
        } else if (options.rev) {
          statOptions.versionTag = options.rev;
        }
        if (options.contentHash) {
          statOptions.contentHash = options.contentHash;
        } else if (options.hash) {
          statOptions.contentHash = options.hash;
        }
        if (options.removed || options.deleted) {
          statOptions.removed = options.removed || options.deleted;
        }
        if (options.httpCache) {
          statOptions.httpCache = options.httpCache;
        }
      }
      return this.stat(path, statOptions, function(error, stat, entry_stats) {
        var entries, entry_stat;
        if (entry_stats) {
          entries = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = entry_stats.length; _i < _len; _i++) {
              entry_stat = entry_stats[_i];
              _results.push(entry_stat.name);
            }
            return _results;
          })();
        } else {
          entries = null;
        }
        return callback(error, entries, stat, entry_stats);
      });
    };

    Client.prototype.metadata = function(path, options, callback) {
      return this.stat(path, options, callback);
    };

    Client.prototype.makeUrl = function(path, options, callback) {
      var isDirect, params, url, useDownloadHack, xhr;
      if ((!callback) && (typeof options === 'function')) {
        callback = options;
        options = null;
      }
      if (options && (options['long'] || options.longUrl || options.downloadHack)) {
        params = {
          short_url: 'false'
        };
      } else {
        params = {};
      }
      path = this._urlEncodePath(path);
      url = "" + this._urls.shares + "/" + path;
      isDirect = false;
      useDownloadHack = false;
      if (options) {
        if (options.downloadHack) {
          isDirect = true;
          useDownloadHack = true;
        } else if (options.download) {
          isDirect = true;
          url = "" + this._urls.media + "/" + path;
        }
      }
      xhr = new Dropbox.Util.Xhr('POST', url).setParams(params).signWithOauth(this._oauth);
      return this._dispatchXhr(xhr, (function(_this) {
        return function(error, urlData) {
          if (useDownloadHack && (urlData != null ? urlData.url : void 0)) {
            urlData.url = urlData.url.replace(_this._authServer, _this._downloadServer);
          }
          return callback(error, Dropbox.File.ShareUrl.parse(urlData, isDirect));
        };
      })(this));
    };

    Client.prototype.history = function(path, options, callback) {
      var httpCache, params, xhr;
      if ((!callback) && (typeof options === 'function')) {
        callback = options;
        options = null;
      }
      params = {};
      httpCache = false;
      if (options) {
        if (options.limit != null) {
          params.rev_limit = options.limit;
        }
        if (options.httpCache) {
          httpCache = true;
        }
      }
      xhr = new Dropbox.Util.Xhr('GET', "" + this._urls.revisions + "/" + (this._urlEncodePath(path)));
      xhr.setParams(params).signWithOauth(this._oauth, httpCache);
      return this._dispatchXhr(xhr, function(error, versions) {
        var metadata, stats;
        if (versions) {
          stats = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = versions.length; _i < _len; _i++) {
              metadata = versions[_i];
              _results.push(Dropbox.File.Stat.parse(metadata));
            }
            return _results;
          })();
        } else {
          stats = void 0;
        }
        return callback(error, stats);
      });
    };

    Client.prototype.revisions = function(path, options, callback) {
      return this.history(path, options, callback);
    };

    Client.prototype.thumbnailUrl = function(path, options) {
      var xhr;
      xhr = this.thumbnailXhr(path, options);
      return xhr.addOauthParams(this._oauth).paramsToUrl().url;
    };

    Client.prototype.readThumbnail = function(path, options, callback) {
      var responseType, xhr;
      if ((!callback) && (typeof options === 'function')) {
        callback = options;
        options = null;
      }
      responseType = 'b';
      if (options) {
        if (options.blob) {
          responseType = 'blob';
        }
        if (options.arrayBuffer) {
          responseType = 'arraybuffer';
        }
        if (options.buffer) {
          responseType = 'buffer';
        }
      }
      xhr = this.thumbnailXhr(path, options);
      xhr.setResponseType(responseType).signWithOauth(this._oauth);
      return this._dispatchXhr(xhr, function(error, data, metadata) {
        return callback(error, data, Dropbox.File.Stat.parse(metadata));
      });
    };

    Client.prototype.thumbnailXhr = function(path, options) {
      var params, xhr;
      params = {};
      if (options) {
        if (options.format) {
          params.format = options.format;
        } else if (options.png) {
          params.format = 'png';
        }
        if (options.size) {
          params.size = options.size;
        }
      }
      xhr = new Dropbox.Util.Xhr('GET', "" + this._urls.thumbnails + "/" + (this._urlEncodePath(path)));
      return xhr.setParams(params);
    };

    Client.prototype.revertFile = function(path, versionTag, callback) {
      var xhr;
      xhr = new Dropbox.Util.Xhr('POST', "" + this._urls.restore + "/" + (this._urlEncodePath(path)));
      xhr.setParams({
        rev: versionTag
      }).signWithOauth(this._oauth);
      return this._dispatchXhr(xhr, function(error, metadata) {
        if (callback) {
          return callback(error, Dropbox.File.Stat.parse(metadata));
        }
      });
    };

    Client.prototype.restore = function(path, versionTag, callback) {
      return this.revertFile(path, versionTag, callback);
    };

    Client.prototype.findByName = function(path, namePattern, options, callback) {
      var httpCache, params, xhr;
      if ((!callback) && (typeof options === 'function')) {
        callback = options;
        options = null;
      }
      params = {
        query: namePattern
      };
      httpCache = false;
      if (options) {
        if (options.limit != null) {
          params.file_limit = options.limit;
        }
        if (options.removed || options.deleted) {
          params.include_deleted = true;
        }
        if (options.httpCache) {
          httpCache = true;
        }
      }
      xhr = new Dropbox.Util.Xhr('GET', "" + this._urls.search + "/" + (this._urlEncodePath(path)));
      xhr.setParams(params).signWithOauth(this._oauth, httpCache);
      return this._dispatchXhr(xhr, function(error, results) {
        var metadata, stats;
        if (results) {
          stats = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = results.length; _i < _len; _i++) {
              metadata = results[_i];
              _results.push(Dropbox.File.Stat.parse(metadata));
            }
            return _results;
          })();
        } else {
          stats = void 0;
        }
        return callback(error, stats);
      });
    };

    Client.prototype.search = function(path, namePattern, options, callback) {
      return this.findByName(path, namePattern, options, callback);
    };

    Client.prototype.makeCopyReference = function(path, callback) {
      var xhr;
      xhr = new Dropbox.Util.Xhr('GET', "" + this._urls.copyRef + "/" + (this._urlEncodePath(path)));
      xhr.signWithOauth(this._oauth);
      return this._dispatchXhr(xhr, function(error, refData) {
        return callback(error, Dropbox.File.CopyReference.parse(refData));
      });
    };

    Client.prototype.copyRef = function(path, callback) {
      return this.makeCopyReference(path, callback);
    };

    Client.prototype.pullChanges = function(cursor, callback) {
      var params, xhr;
      if ((!callback) && (typeof cursor === 'function')) {
        callback = cursor;
        cursor = null;
      }
      if (cursor) {
        if (cursor.cursorTag) {
          params = {
            cursor: cursor.cursorTag
          };
        } else {
          params = {
            cursor: cursor
          };
        }
      } else {
        params = {};
      }
      xhr = new Dropbox.Util.Xhr('POST', this._urls.delta);
      xhr.setParams(params).signWithOauth(this._oauth);
      return this._dispatchXhr(xhr, function(error, deltaInfo) {
        return callback(error, Dropbox.Http.PulledChanges.parse(deltaInfo));
      });
    };

    Client.prototype.delta = function(cursor, callback) {
      return this.pullChanges(cursor, callback);
    };

    Client.prototype.pollForChanges = function(cursor, options, callback) {
      var params, xhr;
      if ((!callback) && (typeof options === 'function')) {
        callback = options;
        options = null;
      }
      if (cursor.cursorTag) {
        params = {
          cursor: cursor.cursorTag
        };
      } else {
        params = {
          cursor: cursor
        };
      }
      if (options && 'timeout' in options) {
        params.timeout = options.timeout;
      }
      xhr = new Dropbox.Util.Xhr('GET', this._urls.longpollDelta);
      xhr.setParams(params);
      return this._dispatchXhr(xhr, function(error, response) {
        var jsonError;
        if (typeof response === 'string') {
          try {
            response = JSON.parse(response);
          } catch (_error) {
            jsonError = _error;
            response = null;
          }
        }
        return callback(error, Dropbox.Http.PollResult.parse(response));
      });
    };

    Client.prototype.mkdir = function(path, callback) {
      var xhr;
      xhr = new Dropbox.Util.Xhr('POST', this._urls.fileopsCreateFolder);
      xhr.setParams({
        root: 'auto',
        path: this._normalizePath(path)
      }).signWithOauth(this._oauth);
      return this._dispatchXhr(xhr, function(error, metadata) {
        if (callback) {
          return callback(error, Dropbox.File.Stat.parse(metadata));
        }
      });
    };

    Client.prototype.remove = function(path, callback) {
      var xhr;
      xhr = new Dropbox.Util.Xhr('POST', this._urls.fileopsDelete);
      xhr.setParams({
        root: 'auto',
        path: this._normalizePath(path)
      }).signWithOauth(this._oauth);
      return this._dispatchXhr(xhr, function(error, metadata) {
        if (callback) {
          return callback(error, Dropbox.File.Stat.parse(metadata));
        }
      });
    };

    Client.prototype.unlink = function(path, callback) {
      return this.remove(path, callback);
    };

    Client.prototype["delete"] = function(path, callback) {
      return this.remove(path, callback);
    };

    Client.prototype.copy = function(from, toPath, callback) {
      var options, params, xhr;
      if ((!callback) && (typeof options === 'function')) {
        callback = options;
        options = null;
      }
      params = {
        root: 'auto',
        to_path: this._normalizePath(toPath)
      };
      if (from instanceof Dropbox.File.CopyReference) {
        params.from_copy_ref = from.tag;
      } else {
        params.from_path = this._normalizePath(from);
      }
      xhr = new Dropbox.Util.Xhr('POST', this._urls.fileopsCopy);
      xhr.setParams(params).signWithOauth(this._oauth);
      return this._dispatchXhr(xhr, function(error, metadata) {
        if (callback) {
          return callback(error, Dropbox.File.Stat.parse(metadata));
        }
      });
    };

    Client.prototype.move = function(fromPath, toPath, callback) {
      var options, xhr;
      if ((!callback) && (typeof options === 'function')) {
        callback = options;
        options = null;
      }
      xhr = new Dropbox.Util.Xhr('POST', this._urls.fileopsMove);
      xhr.setParams({
        root: 'auto',
        from_path: this._normalizePath(fromPath),
        to_path: this._normalizePath(toPath)
      }).signWithOauth(this._oauth);
      return this._dispatchXhr(xhr, function(error, metadata) {
        if (callback) {
          return callback(error, Dropbox.File.Stat.parse(metadata));
        }
      });
    };

    Client.prototype.appInfo = function(appKey, callback) {
      var xhr;
      if ((!callback) && (typeof appKey === 'function')) {
        callback = appKey;
        appKey = this._oauth.credentials().key;
      }
      xhr = new Dropbox.Util.Xhr('GET', this._urls.appsInfo);
      xhr.setParams({
        app_key: appKey
      });
      return this._dispatchXhr(xhr, function(error, appInfo) {
        return callback(error, Dropbox.Http.AppInfo.parse(appInfo, appKey));
      });
    };

    Client.prototype.isAppDeveloper = function(userId, appKey, callback) {
      var xhr;
      if ((typeof userId === 'object') && ('uid' in userId)) {
        userId = userId.uid;
      }
      if ((!callback) && (typeof appKey === 'function')) {
        callback = appKey;
        appKey = this._oauth.credentials().key;
      } else if ((typeof appKey === 'object') && ('key' in appKey)) {
        appKey = appKey.key;
      }
      xhr = new Dropbox.Util.Xhr('GET', this._urls.appsCheckDeveloper);
      xhr.setParams({
        app_key: appKey,
        uid: userId
      });
      return this._dispatchXhr(xhr, function(error, response) {
        if (response) {
          return callback(error, response.is_developer);
        } else {
          return callback(error);
        }
      });
    };

    Client.prototype.hasOauthRedirectUri = function(redirectUri, appKey, callback) {
      var xhr;
      if ((!callback) && (typeof appKey === 'function')) {
        callback = appKey;
        appKey = this._oauth.credentials().key;
      } else if ((typeof appKey === 'object') && ('key' in appKey)) {
        appKey = appKey.key;
      }
      xhr = new Dropbox.Util.Xhr('GET', this._urls.appsCheckRedirectUri);
      xhr.setParams({
        app_key: appKey,
        redirect_uri: redirectUri
      });
      return this._dispatchXhr(xhr, function(error, response) {
        if (response) {
          return callback(error, response.has_redirect_uri);
        } else {
          return callback(error);
        }
      });
    };

    Client.prototype.reset = function() {
      var oldAuthStep;
      this._uid = null;
      this._oauth.reset();
      oldAuthStep = this.authStep;
      this.authStep = this._oauth.step();
      if (oldAuthStep !== this.authStep) {
        this.onAuthStepChange.dispatch(this);
      }
      this.authError = null;
      this._credentials = null;
      return this;
    };

    Client.prototype.setCredentials = function(credentials) {
      var oldAuthStep;
      oldAuthStep = this.authStep;
      this._oauth.setCredentials(credentials);
      this.authStep = this._oauth.step();
      this._uid = credentials.uid || null;
      this.authError = null;
      this._credentials = null;
      if (oldAuthStep !== this.authStep) {
        this.onAuthStepChange.dispatch(this);
      }
      return this;
    };

    Client.prototype.appHash = function() {
      return this._oauth.appHash();
    };

    Client.prototype.setupUrls = function() {
      this._apiServer = this._chooseApiServer();
      return this._urls = {
        authorize: "" + this._authServer + "/1/oauth2/authorize",
        token: "" + this._apiServer + "/1/oauth2/token",
        signOut: "" + this._apiServer + "/1/unlink_access_token",
        accountInfo: "" + this._apiServer + "/1/account/info",
        getFile: "" + this._fileServer + "/1/files/auto",
        postFile: "" + this._fileServer + "/1/files/auto",
        putFile: "" + this._fileServer + "/1/files_put/auto",
        metadata: "" + this._apiServer + "/1/metadata/auto",
        delta: "" + this._apiServer + "/1/delta",
        longpollDelta: "" + this._notifyServer + "/1/longpoll_delta",
        revisions: "" + this._apiServer + "/1/revisions/auto",
        restore: "" + this._apiServer + "/1/restore/auto",
        search: "" + this._apiServer + "/1/search/auto",
        shares: "" + this._apiServer + "/1/shares/auto",
        media: "" + this._apiServer + "/1/media/auto",
        copyRef: "" + this._apiServer + "/1/copy_ref/auto",
        thumbnails: "" + this._fileServer + "/1/thumbnails/auto",
        chunkedUpload: "" + this._fileServer + "/1/chunked_upload",
        commitChunkedUpload: "" + this._fileServer + "/1/commit_chunked_upload/auto",
        fileopsCopy: "" + this._apiServer + "/1/fileops/copy",
        fileopsCreateFolder: "" + this._apiServer + "/1/fileops/create_folder",
        fileopsDelete: "" + this._apiServer + "/1/fileops/delete",
        fileopsMove: "" + this._apiServer + "/1/fileops/move",
        appsInfo: "" + this._apiServer + "/1/apps/info",
        appsCheckDeveloper: "" + this._apiServer + "/1/apps/check_developer",
        appsCheckRedirectUri: "" + this._apiServer + "/1/apps/check_redirect_uri"
      };
    };

    Client.prototype._chooseApiServer = function() {
      var serverId, serverNumber;
      serverNumber = Math.floor(Math.random() * (this._maxApiServer + 1));
      serverId = serverNumber === 0 ? '' : serverNumber.toString();
      return this._serverRoot.replace('$', serverId);
    };

    Client.prototype.authStep = null;

    Client.ERROR = 0;

    Client.RESET = 1;

    Client.PARAM_SET = 2;

    Client.PARAM_LOADED = 3;

    Client.AUTHORIZED = 4;

    Client.DONE = 5;

    Client.SIGNED_OUT = 6;

    Client.prototype._urlEncodePath = function(path) {
      return Dropbox.Util.Xhr.urlEncodeValue(this._normalizePath(path)).replace(/%2F/gi, '/');
    };

    Client.prototype._normalizePath = function(path) {
      var i;
      if (path.substring(0, 1) === '/') {
        i = 1;
        while (path.substring(i, i + 1) === '/') {
          i += 1;
        }
        return path.substring(i);
      } else {
        return path;
      }
    };

    Client.prototype.authorizeUrl = function() {
      var params;
      params = this._oauth.authorizeUrlParams(this._driver.authType(), this._driver.url());
      return this._urls.authorize + "?" + Dropbox.Util.Xhr.urlEncode(params);
    };

    Client.prototype.getAccessToken = function(callback) {
      var params, xhr;
      params = this._oauth.accessTokenParams(this._driver.url());
      xhr = new Dropbox.Util.Xhr('POST', this._urls.token).setParams(params).addOauthParams(this._oauth);
      return this._dispatchXhr(xhr, function(error, data) {
        if (error && error.status === Dropbox.ApiError.INVALID_PARAM && error.response && error.response.error) {
          error = new Dropbox.AuthError(error.response);
        }
        return callback(error, data);
      });
    };

    Client.prototype._dispatchXhr = function(xhr, callback) {
      var nativeXhr;
      xhr.setCallback(callback);
      xhr.onError = this._xhrOnErrorHandler;
      xhr.prepare();
      nativeXhr = xhr.xhr;
      if (this.onXhr.dispatch(xhr)) {
        xhr.send();
      }
      return nativeXhr;
    };

    Client.prototype._handleXhrError = function(error, callback) {
      if (error.status === Dropbox.ApiError.INVALID_TOKEN && this.authStep === DbxClient.DONE) {
        this.authError = error;
        this.authStep = DbxClient.ERROR;
        this.onAuthStepChange.dispatch(this);
        if (this._driver && this._driver.onAuthStepChange) {
          this._driver.onAuthStepChange(this, (function(_this) {
            return function() {
              _this.onError.dispatch(error);
              return callback(error);
            };
          })(this));
          return null;
        }
      }
      this.onError.dispatch(error);
      callback(error);
    };

    Client.prototype._defaultServerRoot = function() {
      return 'https://api$.dropbox.com';
    };

    Client.prototype._defaultAuthServer = function() {
      return this._serverRoot.replace('api$', 'www');
    };

    Client.prototype._defaultFileServer = function() {
      return this._serverRoot.replace('api$', 'api-content');
    };

    Client.prototype._defaultDownloadServer = function() {
      return 'https://dl.dropboxusercontent.com';
    };

    Client.prototype._defaultNotifyServer = function() {
      return this._serverRoot.replace('api$', 'api-notify');
    };

    Client.prototype._defaultMaxApiServer = function() {
      return 30;
    };

    Client.prototype._computeCredentials = function() {
      var value;
      value = this._oauth.credentials();
      if (this._uid) {
        value.uid = this._uid;
      }
      if (this._serverRoot !== this._defaultServerRoot()) {
        value.server = this._serverRoot;
      }
      if (this._maxApiServer !== this._defaultMaxApiServer()) {
        value.maxApiServer = this._maxApiServer;
      }
      if (this._authServer !== this._defaultAuthServer()) {
        value.authServer = this._authServer;
      }
      if (this._fileServer !== this._defaultFileServer()) {
        value.fileServer = this._fileServer;
      }
      if (this._downloadServer !== this._defaultDownloadServer()) {
        value.downloadServer = this._downloadServer;
      }
      if (this._notifyServer !== this._defaultNotifyServer()) {
        value.notifyServer = this._notifyServer;
      }
      this._credentials = value;
    };

    return Client;

  })();

  DbxClient = Dropbox.Client;

  Dropbox.File.ShareUrl = (function() {
    ShareUrl.parse = function(urlData, isDirect) {
      if (urlData && typeof urlData === 'object') {
        return new Dropbox.File.ShareUrl(urlData, isDirect);
      } else {
        return urlData;
      }
    };

    ShareUrl.prototype.url = null;

    ShareUrl.prototype.expiresAt = null;

    ShareUrl.prototype.isDirect = null;

    ShareUrl.prototype.isPreview = null;

    ShareUrl.prototype.toJSON = function() {
      return this._json || (this._json = {
        url: this.url,
        expires: this.expiresAt.toUTCString(),
        direct: this.isDirect
      });
    };

    ShareUrl.prototype.json = function() {
      return this.toJSON();
    };

    function ShareUrl(urlData, isDirect) {
      this.url = urlData.url;
      this.expiresAt = Dropbox.Util.parseDate(urlData.expires);
      if (isDirect === true) {
        this.isDirect = true;
      } else if (isDirect === false) {
        this.isDirect = false;
      } else {
        if ('direct' in urlData) {
          this.isDirect = urlData.direct;
        } else {
          this.isDirect = Date.now() - this.expiresAt <= 86400000;
        }
      }
      this.isPreview = !this.isDirect;
      this._json = null;
    }

    return ShareUrl;

  })();

  Dropbox.File.CopyReference = (function() {
    CopyReference.parse = function(refData) {
      if (refData && (typeof refData === 'object' || typeof refData === 'string')) {
        return new Dropbox.File.CopyReference(refData);
      } else {
        return refData;
      }
    };

    CopyReference.prototype.tag = null;

    CopyReference.prototype.expiresAt = null;

    CopyReference.prototype.toJSON = function() {
      return this._json || (this._json = {
        copy_ref: this.tag,
        expires: this.expiresAt.toUTCString()
      });
    };

    CopyReference.prototype.json = function() {
      return this.toJSON();
    };

    function CopyReference(refData) {
      if (typeof refData === 'object') {
        this.tag = refData.copy_ref;
        this.expiresAt = Dropbox.Util.parseDate(refData.expires);
        this._json = refData;
      } else {
        this.tag = refData;
        this.expiresAt = new Date(Math.ceil(Date.now() / 1000) * 1000);
        this._json = null;
      }
    }

    return CopyReference;

  })();

  Dropbox.File.Stat = (function() {
    Stat.parse = function(metadata) {
      if (metadata && typeof metadata === 'object') {
        return new Dropbox.File.Stat(metadata);
      } else {
        return metadata;
      }
    };

    Stat.prototype.path = null;

    Stat.prototype.name = null;

    Stat.prototype.inAppFolder = null;

    Stat.prototype.isFolder = null;

    Stat.prototype.isFile = null;

    Stat.prototype.isRemoved = null;

    Stat.prototype.typeIcon = null;

    Stat.prototype.versionTag = null;

    Stat.prototype.contentHash = null;

    Stat.prototype.mimeType = null;

    Stat.prototype.size = null;

    Stat.prototype.humanSize = null;

    Stat.prototype.hasThumbnail = null;

    Stat.prototype.modifiedAt = null;

    Stat.prototype.clientModifiedAt = null;

    Stat.prototype.toJSON = function() {
      return this._json;
    };

    Stat.prototype.json = function() {
      return this.toJSON();
    };

    function Stat(metadata) {
      var lastIndex, nameSlash, _ref, _ref1;
      this._json = metadata;
      this.path = metadata.path;
      if (this.path.substring(0, 1) !== '/') {
        this.path = '/' + this.path;
      }
      lastIndex = this.path.length - 1;
      if (lastIndex >= 0 && this.path.substring(lastIndex) === '/') {
        this.path = this.path.substring(0, lastIndex);
      }
      nameSlash = this.path.lastIndexOf('/');
      this.name = this.path.substring(nameSlash + 1);
      this.isFolder = metadata.is_dir || false;
      this.isFile = !this.isFolder;
      this.isRemoved = metadata.is_deleted || false;
      this.typeIcon = metadata.icon;
      if ((_ref = metadata.modified) != null ? _ref.length : void 0) {
        this.modifiedAt = Dropbox.Util.parseDate(metadata.modified);
      } else {
        this.modifiedAt = null;
      }
      if ((_ref1 = metadata.client_mtime) != null ? _ref1.length : void 0) {
        this.clientModifiedAt = Dropbox.Util.parseDate(metadata.client_mtime);
      } else {
        this.clientModifiedAt = null;
      }
      switch (metadata.root) {
        case 'dropbox':
          this.inAppFolder = false;
          break;
        case 'app_folder':
          this.inAppFolder = true;
          break;
        default:
          this.inAppFolder = null;
      }
      this.size = metadata.bytes || 0;
      this.humanSize = metadata.size || '';
      this.hasThumbnail = metadata.thumb_exists || false;
      this.versionTag = metadata.rev;
      this.contentHash = metadata.hash || null;
      if (this.isFolder) {
        this.mimeType = metadata.mime_type || 'inode/directory';
      } else {
        this.mimeType = metadata.mime_type || 'application/octet-stream';
      }
    }

    return Stat;

  })();

  Dropbox.Http.AppInfo = (function() {
    AppInfo.parse = function(appInfo, appKey) {
      if (appInfo) {
        return new Dropbox.Http.AppInfo(appInfo, appKey);
      } else {
        return appInfo;
      }
    };

    AppInfo.prototype.name = void 0;

    AppInfo.prototype.key = void 0;

    AppInfo.prototype.canUseDatastores = void 0;

    AppInfo.prototype.canUseFiles = void 0;

    AppInfo.prototype.hasAppFolder = void 0;

    AppInfo.prototype.canUseFullDropbox = void 0;

    AppInfo.prototype.icon = function(width, height) {
      height || (height = width);
      return this._icons["" + width + "x" + height] || null;
    };

    AppInfo.ICON_SMALL = 64;

    AppInfo.ICON_LARGE = 256;

    function AppInfo(appInfo, appKey) {
      var permissions;
      this.name = appInfo.name;
      this._icons = appInfo.icons;
      permissions = appInfo.permissions || {};
      this.canUseDatastores = !!permissions.datastores;
      this.canUseFiles = !!permissions.files;
      this.canUseFullDropbox = permissions.files === 'full_dropbox';
      this.hasAppFolder = permissions.files === 'app_folder';
      if (appKey) {
        this.key = appKey;
      } else {
        this.key = appInfo.key || null;
      }
    }

    return AppInfo;

  })();

  Dropbox.Http.PollResult = (function() {
    PollResult.parse = function(response) {
      if (response) {
        return new Dropbox.Http.PollResult(response);
      } else {
        return response;
      }
    };

    PollResult.prototype.hasChanges = void 0;

    PollResult.prototype.retryAfter = void 0;

    function PollResult(response) {
      this.hasChanges = response.changes;
      this.retryAfter = response.backoff || 0;
    }

    return PollResult;

  })();

  Dropbox.Http.PulledChanges = (function() {
    PulledChanges.parse = function(deltaInfo) {
      if (deltaInfo && typeof deltaInfo === 'object') {
        return new Dropbox.Http.PulledChanges(deltaInfo);
      } else {
        return deltaInfo;
      }
    };

    PulledChanges.prototype.blankSlate = void 0;

    PulledChanges.prototype.cursorTag = void 0;

    PulledChanges.prototype.changes = void 0;

    PulledChanges.prototype.shouldPullAgain = void 0;

    PulledChanges.prototype.shouldBackOff = void 0;

    PulledChanges.prototype.cursor = function() {
      return this.cursorTag;
    };

    function PulledChanges(deltaInfo) {
      var entry;
      this.blankSlate = deltaInfo.reset || false;
      this.cursorTag = deltaInfo.cursor;
      this.shouldPullAgain = deltaInfo.has_more;
      this.shouldBackOff = !this.shouldPullAgain;
      if (deltaInfo.cursor && deltaInfo.cursor.length) {
        this.changes = (function() {
          var _i, _len, _ref, _results;
          _ref = deltaInfo.entries;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            entry = _ref[_i];
            _results.push(Dropbox.Http.PulledChange.parse(entry));
          }
          return _results;
        })();
      } else {
        this.changes = [];
      }
    }

    return PulledChanges;

  })();

  Dropbox.Http.PulledChange = (function() {
    PulledChange.parse = function(entry) {
      if (entry && typeof entry === 'object') {
        return new Dropbox.Http.PulledChange(entry);
      } else {
        return entry;
      }
    };

    PulledChange.prototype.path = void 0;

    PulledChange.prototype.wasRemoved = void 0;

    PulledChange.prototype.stat = void 0;

    function PulledChange(entry) {
      this.path = entry[0];
      this.stat = Dropbox.File.Stat.parse(entry[1]);
      if (this.stat) {
        this.wasRemoved = false;
      } else {
        this.stat = null;
        this.wasRemoved = true;
      }
    }

    return PulledChange;

  })();

  Dropbox.Http.RangeInfo = (function() {
    RangeInfo.parse = function(headerValue) {
      if (typeof headerValue === 'string') {
        return new Dropbox.Http.RangeInfo(headerValue);
      } else {
        return headerValue;
      }
    };

    RangeInfo.prototype.start = null;

    RangeInfo.prototype.size = null;

    RangeInfo.prototype.end = null;

    function RangeInfo(headerValue) {
      var match;
      if (match = /^bytes (\d*)-(\d*)\/(.*)$/.exec(headerValue)) {
        this.start = parseInt(match[1]);
        this.end = parseInt(match[2]);
        if (match[3] === '*') {
          this.size = null;
        } else {
          this.size = parseInt(match[3]);
        }
      } else {
        this.start = 0;
        this.end = 0;
        this.size = null;
      }
    }

    return RangeInfo;

  })();

  Dropbox.Http.UploadCursor = (function() {
    UploadCursor.parse = function(cursorData) {
      if (cursorData && (typeof cursorData === 'object' || typeof cursorData === 'string')) {
        return new Dropbox.Http.UploadCursor(cursorData);
      } else {
        return cursorData;
      }
    };

    UploadCursor.prototype.tag = null;

    UploadCursor.prototype.offset = null;

    UploadCursor.prototype.expiresAt = null;

    UploadCursor.prototype.toJSON = function() {
      return this._json || (this._json = {
        upload_id: this.tag,
        offset: this.offset,
        expires: this.expiresAt.toUTCString()
      });
    };

    UploadCursor.prototype.json = function() {
      return this.toJSON();
    };

    function UploadCursor(cursorData) {
      this.replace(cursorData);
    }

    UploadCursor.prototype.replace = function(cursorData) {
      if (typeof cursorData === 'object') {
        this.tag = cursorData.upload_id || null;
        this.offset = cursorData.offset || 0;
        this.expiresAt = Dropbox.Util.parseDate(cursorData.expires) || Date.now();
        this._json = cursorData;
      } else {
        this.tag = cursorData || null;
        this.offset = 0;
        this.expiresAt = new Date(Math.floor(Date.now() / 1000) * 1000);
        this._json = null;
      }
      return this;
    };

    return UploadCursor;

  })();

  if (typeof Dropbox.Env.global.atob === 'function' && typeof Dropbox.Env.global.btoa === 'function') {
    Dropbox.Util.atob = function(string) {
      return Dropbox.Env.global.atob(string);
    };
    Dropbox.Util.btoa = function(base64) {
      return Dropbox.Env.global.btoa(base64);
    };
  } else if (Dropbox.Env.global.require && Dropbox.Env.global.Buffer) {
    Dropbox.Util.atob = function(arg) {
      var buffer, i;
      buffer = new Buffer(arg, 'base64');
      return ((function() {
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = buffer.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          _results.push(String.fromCharCode(buffer[i]));
        }
        return _results;
      })()).join('');
    };
    Dropbox.Util.btoa = function(arg) {
      var buffer, i;
      buffer = new Buffer((function() {
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = arg.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          _results.push(arg.charCodeAt(i));
        }
        return _results;
      })());
      return buffer.toString('base64');
    };
  } else {
    (function() {
      var atobNibble, base64Digits, btoaNibble;
      base64Digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      btoaNibble = function(accumulator, bytes, result) {
        var i, limit;
        limit = 3 - bytes;
        accumulator <<= limit * 8;
        i = 3;
        while (i >= limit) {
          result.push(base64Digits.charAt((accumulator >> (i * 6)) & 0x3F));
          i -= 1;
        }
        i = bytes;
        while (i < 3) {
          result.push('=');
          i += 1;
        }
        return null;
      };
      atobNibble = function(accumulator, digits, result) {
        var i, limit;
        limit = 4 - digits;
        accumulator <<= limit * 6;
        i = 2;
        while (i >= limit) {
          result.push(String.fromCharCode((accumulator >> (8 * i)) & 0xFF));
          i -= 1;
        }
        return null;
      };
      Dropbox.Util.btoa = function(string) {
        var accumulator, bytes, i, result, _i, _ref;
        result = [];
        accumulator = 0;
        bytes = 0;
        for (i = _i = 0, _ref = string.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          accumulator = (accumulator << 8) | string.charCodeAt(i);
          bytes += 1;
          if (bytes === 3) {
            btoaNibble(accumulator, bytes, result);
            accumulator = bytes = 0;
          }
        }
        if (bytes > 0) {
          btoaNibble(accumulator, bytes, result);
        }
        return result.join('');
      };
      return Dropbox.Util.atob = function(base64) {
        var accumulator, digit, digits, i, result, _i, _ref;
        result = [];
        accumulator = 0;
        digits = 0;
        for (i = _i = 0, _ref = base64.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          digit = base64.charAt(i);
          if (digit === '=') {
            break;
          }
          accumulator = (accumulator << 6) | base64Digits.indexOf(digit);
          digits += 1;
          if (digits === 4) {
            atobNibble(accumulator, digits, result);
            accumulator = digits = 0;
          }
        }
        if (digits > 0) {
          atobNibble(accumulator, digits, result);
        }
        return result.join('');
      };
    })();
  }

  (function() {
    var arrayToBase64, crypto, hmacSha1, requireError, sha1, sha256, sha256Init, sha256Key, stringToArray, xxx, _base64Digits;
    Dropbox.Util.hmac = function(string, key) {
      return arrayToBase64(hmacSha1(stringToArray(string), stringToArray(key), string.length, key.length));
    };
    Dropbox.Util.sha1 = function(string) {
      return arrayToBase64(sha1(stringToArray(string), string.length));
    };
    Dropbox.Util.sha256 = function(string) {
      return arrayToBase64(sha256(stringToArray(string), string.length));
    };
    if (Dropbox.Env.require) {
      try {
        crypto = Dropbox.Env.require('crypto');
        if (crypto.createHmac && crypto.createHash) {
          Dropbox.Util.hmac = function(string, key) {
            var hmac;
            hmac = crypto.createHmac('sha1', key);
            hmac.update(string);
            return hmac.digest('base64');
          };
          Dropbox.Util.sha1 = function(string) {
            var hash;
            hash = crypto.createHash('sha1');
            hash.update(string);
            return hash.digest('base64');
          };
          Dropbox.Util.sha256 = function(string) {
            var hash;
            hash = crypto.createHash('sha256');
            hash.update(string);
            return hash.digest('base64');
          };
        }
      } catch (_error) {
        requireError = _error;
      }
    }
    hmacSha1 = function(string, key, length, keyLength) {
      var hash1, i, ipad, opad;
      if (key.length > 16) {
        key = sha1(key, keyLength);
      }
      ipad = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; _i < 16; i = ++_i) {
          _results.push(key[i] ^ 0x36363636);
        }
        return _results;
      })();
      opad = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; _i < 16; i = ++_i) {
          _results.push(key[i] ^ 0x5C5C5C5C);
        }
        return _results;
      })();
      hash1 = sha1(ipad.concat(string), 64 + length);
      return sha1(opad.concat(hash1), 64 + 20);
    };
    sha1 = function(string, length) {
      var a, a0, b, b0, c, c0, d, d0, e, e0, i, j, limit, n, state, t, _i;
      string[length >> 2] |= 1 << (31 - ((length & 0x03) << 3));
      string[(((length + 8) >> 6) << 4) + 15] = length << 3;
      state = Array(80);
      a = 0x67452301;
      b = 0xefcdab89;
      c = 0x98badcfe;
      d = 0x10325476;
      e = 0xc3d2e1f0;
      i = 0;
      limit = string.length;
      while (i < limit) {
        a0 = a;
        b0 = b;
        c0 = c;
        d0 = d;
        e0 = e;
        for (j = _i = 0; _i < 80; j = ++_i) {
          if (j < 16) {
            state[j] = string[(i + j) << 2 >> 2] | 0;
          } else {
            n = (state[(j - 3) << 2 >> 2] | 0) ^ (state[(j - 8) << 2 >> 2] | 0) ^ (state[(j - 14) << 2 >> 2] | 0) ^ (state[(j - 16) << 2 >> 2] | 0);
            state[j] = (n << 1) | (n >>> 31);
          }
          t = (((((a << 5) | (a >>> 27)) + e) | 0) + state[j << 2 >> 2]) | 0;
          if (j < 20) {
            t = (t + ((((b & c) | (~b & d)) + 0x5a827999) | 0)) | 0;
          } else if (j < 40) {
            t = (t + (((b ^ c ^ d) + 0x6ed9eba1) | 0)) | 0;
          } else if (j < 60) {
            t = (t + (((b & c) | (b & d) | (c & d)) - 0x70e44324) | 0) | 0;
          } else {
            t = (t + (((b ^ c ^ d) - 0x359d3e2a) | 0)) | 0;
          }
          e = d;
          d = c;
          c = (b << 30) | (b >>> 2);
          b = a;
          a = t;
        }
        a = (a0 + a) | 0;
        b = (b0 + b) | 0;
        c = (c0 + c) | 0;
        d = (d0 + d) | 0;
        e = (e0 + e) | 0;
        i = (i + 16) | 0;
      }
      return [a, b, c, d, e];
    };
    sha256 = function(string, length) {
      var a, a0, b, b0, c, c0, ch, d, d0, e, e0, f, f0, g, g0, gamma0, gamma0x, gamma1, gamma1x, h, h0, i, j, limit, maj, sigma0, sigma1, sj, state, t1, t2, _i;
      string[length >> 2] |= 1 << (31 - ((length & 0x03) << 3));
      string[(((length + 8) >> 6) << 4) + 15] = length << 3;
      state = Array(80);
      a = sha256Init[0], b = sha256Init[1], c = sha256Init[2], d = sha256Init[3], e = sha256Init[4], f = sha256Init[5], g = sha256Init[6], h = sha256Init[7];
      i = 0;
      limit = string.length;
      while (i < limit) {
        a0 = a;
        b0 = b;
        c0 = c;
        d0 = d;
        e0 = e;
        f0 = f;
        g0 = g;
        h0 = h;
        for (j = _i = 0; _i < 64; j = ++_i) {
          if (j < 16) {
            sj = state[j] = string[(i + j) << 2 >> 2] | 0;
          } else {
            gamma0x = state[(j - 15) << 2 >> 2] | 0;
            gamma0 = ((gamma0x << 25) | (gamma0x >>> 7)) ^ ((gamma0x << 14) | (gamma0x >>> 18)) ^ (gamma0x >>> 3);
            gamma1x = state[(j - 2) << 2 >> 2] | 0;
            gamma1 = ((gamma1x << 15) | (gamma1x >>> 17)) ^ ((gamma1x << 13) | (gamma1x >>> 19)) ^ (gamma1x >>> 10);
            sj = state[j] = (((gamma0 + (state[(j - 7) << 2 >> 2] | 0)) | 0) + ((gamma1 + (state[(j - 16) << 2 >> 2] | 0)) | 0)) | 0;
          }
          ch = (e & f) ^ (~e & g);
          maj = (a & b) ^ (a & c) ^ (b & c);
          sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
          sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7) | (e >>> 25));
          t1 = (((((h + sigma1) | 0) + ((ch + sj) | 0)) | 0) + (sha256Key[j << 2 >> 2] | 0)) | 0;
          t2 = (sigma0 + maj) | 0;
          h = g;
          g = f;
          f = e;
          e = (d + t1) | 0;
          d = c;
          c = b;
          b = a;
          a = (t1 + t2) | 0;
        }
        a = (a0 + a) | 0;
        b = (b0 + b) | 0;
        c = (c0 + c) | 0;
        d = (d0 + d) | 0;
        e = (e0 + e) | 0;
        f = (f0 + f) | 0;
        g = (g0 + g) | 0;
        h = (h0 + h) | 0;
        i += 16;
      }
      return [a, b, c, d, e, f, g, h];
    };
    xxx = function(n) {
      if (n < 0) {
        n = (1 << 30) * 4 + n;
      }
      return n.toString(16);
    };
    sha256Init = [];
    sha256Key = [];
    (function() {
      var factor, fractional, i, isPrime, prime, _i, _results;
      fractional = function(x) {
        return ((x - Math.floor(x)) * 0x100000000) | 0;
      };
      prime = 2;
      _results = [];
      for (i = _i = 0; _i < 64; i = ++_i) {
        while (true) {
          isPrime = true;
          factor = 2;
          while (factor * factor <= prime) {
            if (prime % factor === 0) {
              isPrime = false;
              break;
            }
            factor += 1;
          }
          if (isPrime) {
            break;
          }
          prime += 1;
          continue;
        }
        if (i < 8) {
          sha256Init[i] = fractional(Math.pow(prime, 1 / 2));
        }
        sha256Key[i] = fractional(Math.pow(prime, 1 / 3));
        _results.push(prime += 1);
      }
      return _results;
    })();
    arrayToBase64 = function(array) {
      var i, i2, limit, string, trit;
      string = "";
      i = 0;
      limit = array.length * 4;
      while (i < limit) {
        i2 = i;
        trit = ((array[i2 >> 2] >> ((3 - (i2 & 3)) << 3)) & 0xFF) << 16;
        i2 += 1;
        trit |= ((array[i2 >> 2] >> ((3 - (i2 & 3)) << 3)) & 0xFF) << 8;
        i2 += 1;
        trit |= (array[i2 >> 2] >> ((3 - (i2 & 3)) << 3)) & 0xFF;
        string += _base64Digits[(trit >> 18) & 0x3F];
        string += _base64Digits[(trit >> 12) & 0x3F];
        i += 1;
        if (i >= limit) {
          string += '=';
        } else {
          string += _base64Digits[(trit >> 6) & 0x3F];
        }
        i += 1;
        if (i >= limit) {
          string += '=';
        } else {
          string += _base64Digits[trit & 0x3F];
        }
        i += 1;
      }
      return string;
    };
    _base64Digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    return stringToArray = function(string) {
      var array, i, mask, _i, _ref;
      array = [];
      mask = 0xFF;
      for (i = _i = 0, _ref = string.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        array[i >> 2] |= (string.charCodeAt(i) & mask) << ((3 - (i & 3)) << 3);
      }
      return array;
    };
  })();

  Dropbox.Util.Oauth = (function() {
    function Oauth(options) {
      this._id = null;
      this._secret = null;
      this._stateParam = null;
      this._authCode = null;
      this._token = null;
      this._tokenKey = null;
      this._tokenKid = null;
      this._error = null;
      this._appHash = null;
      this._loaded = null;
      this.setCredentials(options);
    }

    Oauth.prototype.setCredentials = function(options) {
      if (options.key) {
        this._id = options.key;
      } else {
        if (!options.token) {
          throw new Error('No API key supplied');
        }
        this._id = null;
      }
      this._secret = options.secret || null;
      this._appHash = null;
      this._error = null;
      this._loaded = true;
      this.reset();
      if (options.token) {
        this._token = options.token;
        if (options.tokenKey) {
          this._tokenKey = options.tokenKey;
          this._tokenKid = options.tokenKid;
        }
      } else if (options.oauthCode) {
        this._authCode = options.oauthCode;
      } else if (options.oauthStateParam) {
        this._stateParam = options.oauthStateParam;
      }
      return this;
    };

    Oauth.prototype.credentials = function() {
      var returnValue;
      returnValue = {};
      if (this._id) {
        returnValue.key = this._id;
      }
      if (this._secret) {
        returnValue.secret = this._secret;
      }
      if (this._token !== null) {
        returnValue.token = this._token;
        if (this._tokenKey) {
          returnValue.tokenKey = this._tokenKey;
          returnValue.tokenKid = this._tokenKid;
        }
      } else if (this._authCode !== null) {
        returnValue.oauthCode = this._authCode;
      } else if (this._stateParam !== null) {
        returnValue.oauthStateParam = this._stateParam;
      }
      return returnValue;
    };

    Oauth.prototype.step = function() {
      if (this._token !== null) {
        return Dropbox.Client.DONE;
      } else if (this._authCode !== null) {
        return Dropbox.Client.AUTHORIZED;
      } else if (this._stateParam !== null) {
        if (this._loaded) {
          return Dropbox.Client.PARAM_LOADED;
        } else {
          return Dropbox.Client.PARAM_SET;
        }
      } else if (this._error !== null) {
        return Dropbox.Client.ERROR;
      } else {
        return Dropbox.Client.RESET;
      }
    };

    Oauth.prototype.setAuthStateParam = function(stateParam) {
      if (this._id === null) {
        throw new Error('No API key supplied, cannot do authorization');
      }
      this.reset();
      this._loaded = false;
      this._stateParam = stateParam;
      return this;
    };

    Oauth.prototype.checkAuthStateParam = function(stateParam) {
      return (this._stateParam === stateParam) && (this._stateParam !== null);
    };

    Oauth.prototype.authStateParam = function() {
      return this._stateParam;
    };

    Oauth.prototype.error = function() {
      return this._error;
    };

    Oauth.prototype.processRedirectParams = function(queryParams) {
      var tokenType;
      if (queryParams.error) {
        if (this._id === null) {
          throw new Error('No API key supplied, cannot process errors');
        }
        this.reset();
        this._error = new Dropbox.AuthError(queryParams);
        return true;
      }
      if (queryParams.code) {
        if (this._id === null) {
          throw new Error('No API key supplied, cannot do Authorization Codes');
        }
        this.reset();
        this._loaded = false;
        this._authCode = queryParams.code;
        return true;
      }
      tokenType = queryParams.token_type;
      if (tokenType) {
        tokenType = tokenType.toLowerCase();
        if (tokenType !== 'bearer' && tokenType !== 'mac') {
          throw new Error("Unimplemented token type " + tokenType);
        }
        this.reset();
        this._loaded = false;
        if (tokenType === 'mac') {
          if (queryParams.mac_algorithm !== 'hmac-sha-1') {
            throw new Error("Unimplemented MAC algorithms " + queryParams.mac_algorithm);
          }
          this._tokenKey = queryParams.mac_key;
          this._tokenKid = queryParams.kid;
        }
        this._token = queryParams.access_token;
        return true;
      }
      return false;
    };

    Oauth.prototype.authHeader = function(method, url, params) {
      var macParams, userPassword;
      if (this._token === null) {
        userPassword = this._secret === null ? Dropbox.Util.btoa("" + this._id + ":") : Dropbox.Util.btoa("" + this._id + ":" + this._secret);
        return "Basic " + userPassword;
      } else {
        if (this._tokenKey === null) {
          return "Bearer " + this._token;
        } else {
          macParams = this.macParams(method, url, params);
          return ("MAC kid=" + macParams.kid + " ts=" + macParams.ts + " ") + ("access_token=" + this._token + " mac=" + macParams.mac);
        }
      }
    };

    Oauth.prototype.addAuthParams = function(method, url, params) {
      var macParams;
      if (this._token === null) {
        params.client_id = this._id;
        if (this._secret !== null) {
          params.client_secret = this._secret;
        }
      } else {
        if (this._tokenKey !== null) {
          macParams = this.macParams(method, url, params);
          params.kid = macParams.kid;
          params.ts = macParams.ts;
          params.mac = macParams.mac;
        }
        params.access_token = this._token;
      }
      return params;
    };

    Oauth.prototype.authorizeUrlParams = function(responseType, redirectUrl) {
      var params;
      if (responseType !== 'token' && responseType !== 'code') {
        throw new Error("Unimplemented /authorize response type " + responseType);
      }
      params = {
        client_id: this._id,
        state: this._stateParam,
        response_type: responseType
      };
      if (redirectUrl) {
        params.redirect_uri = redirectUrl;
      }
      return params;
    };

    Oauth.prototype.accessTokenParams = function(redirectUrl) {
      var params;
      params = {
        grant_type: 'authorization_code',
        code: this._authCode
      };
      if (redirectUrl) {
        params.redirect_uri = redirectUrl;
      }
      return params;
    };

    Oauth.queryParamsFromUrl = function(url) {
      var fragment, fragmentOffset, kvp, match, offset, params, query, _i, _len, _ref;
      match = /^[^?#]+(\?([^\#]*))?(\#(.*))?$/.exec(url);
      if (!match) {
        return {};
      }
      query = match[2] || '';
      if (query.substring(0, 1) === '/') {
        query = query.substring(1);
      }
      fragment = match[4] || '';
      fragmentOffset = fragment.indexOf('?');
      if (fragmentOffset !== -1) {
        fragment = fragment.substring(fragmentOffset + 1);
      }
      if (fragment.substring(0, 1) === '/') {
        fragment = fragment.substring(1);
      }
      params = {};
      _ref = query.split('&').concat(fragment.split('&'));
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        kvp = _ref[_i];
        offset = kvp.indexOf('=');
        if (offset === -1) {
          continue;
        }
        params[decodeURIComponent(kvp.substring(0, offset))] = decodeURIComponent(kvp.substring(offset + 1));
      }
      return params;
    };

    Oauth.prototype.macParams = function(method, url, params) {
      var macParams, string;
      macParams = {
        kid: this._tokenKid,
        ts: Dropbox.Util.Oauth.timestamp()
      };
      string = method.toUpperCase() + '&' + Dropbox.Util.Xhr.urlEncodeValue(url) + '&' + Dropbox.Util.Xhr.urlEncodeValue(Dropbox.Util.Xhr.urlEncode(params));
      macParams.mac = Dropbox.Util.hmac(string, this._tokenKey);
      return macParams;
    };

    Oauth.prototype.appHash = function() {
      if (this._appHash) {
        return this._appHash;
      }
      return this._appHash = Dropbox.Util.sha1('oauth2-' + this._id).replace(/[\/+=]/g, '');
    };

    Oauth.prototype.reset = function() {
      this._stateParam = null;
      this._authCode = null;
      this._token = null;
      this._tokenKey = null;
      this._tokenKid = null;
      this._error = null;
      return this;
    };

    Oauth.timestamp = function() {
      return Math.floor(Date.now() / 1000);
    };

    Oauth.randomAuthStateParam = function() {
      return ['oas', Date.now().toString(36), Math.random().toString(36)].join('_');
    };

    return Oauth;

  })();

  if (Date.now == null) {
    Dropbox.Util.Oauth.timestamp = function() {
      return Math.floor((new Date()).getTime() / 1000);
    };
  }

  if ((new Date('Fri, 31 Jan 2042 21:01:05 +0000')).valueOf() === 2274814865000) {
    Dropbox.Util.parseDate = function(dateString) {
      return new Date(dateString);
    };
  } else if (Date.parse('Fri, 31 Jan 2042 21:01:05 +0000') === 2274814865000) {
    Dropbox.Util.parseDate = function(dateString) {
      return new Date(Date.parse(dateString));
    };
  } else {
    (function() {
      var parseDateMonths, parseDateRe;
      parseDateRe = /^\w+\, (\d+) (\w+) (\d+) (\d+)\:(\d+)\:(\d+) (\+\d+|UTC|GMT)$/;
      parseDateMonths = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11
      };
      return Dropbox.Util.parseDate = function(dateString) {
        var match;
        if (!(match = parseDateRe.exec(dateString))) {
          return NaN;
        }
        return new Date(Date.UTC(parseInt(match[3]), parseDateMonths[match[2]], parseInt(match[1]), parseInt(match[4]), parseInt(match[5]), parseInt(match[6]), 0));
      };
    })();
  }

  if (Dropbox.Env.global.XMLHttpRequest) {
    if (Dropbox.Env.global.XDomainRequest && !('withCredentials' in new XMLHttpRequest())) {
      DbxXhrRequest = XDomainRequest;
      DbxXhrIeMode = true;
      DbxXhrCanSendForms = false;
    } else {
      DbxXhrRequest = XMLHttpRequest;
      DbxXhrIeMode = false;
      DbxXhrCanSendForms = typeof FormData !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1;
    }
    DbxXhrDoesPreflight = true;
  } else {
    DbxXhrRequest = Dropbox.Env.require('xhr2');
    DbxXhrIeMode = false;
    DbxXhrCanSendForms = false;
    DbxXhrDoesPreflight = false;
  }

  if (!Dropbox.Env.global.Uint8Array) {
    DbxXhrArrayBufferView = null;
    DbxXhrWrapBlob = false;
    DbxXhrSendArrayBufferView = false;
  } else {
    if (Object.getPrototypeOf) {
      DbxXhrArrayBufferView = Object.getPrototypeOf(Object.getPrototypeOf(new Uint8Array(0))).constructor;
    } else if (Object.__proto__) {
      DbxXhrArrayBufferView = (new Uint8Array(0)).__proto__.__proto__.constructor;
    }
    if (!Dropbox.Env.global.Blob) {
      DbxXhrWrapBlob = false;
      DbxXhrSendArrayBufferView = true;
    } else {
      try {
        (function() {
          if ((new Blob([new Uint8Array(2)])).size === 2) {
            DbxXhrWrapBlob = true;
            return DbxXhrSendArrayBufferView = true;
          } else {
            DbxXhrSendArrayBufferView = false;
            return DbxXhrWrapBlob = (new Blob([new ArrayBuffer(2)])).size === 2;
          }
        })();
      } catch (_error) {
        DbxXhrSendArrayBufferView = false;
        DbxXhrWrapBlob = false;
        if (Dropbox.Env.global.WebKitBlobBuilder) {
          if (navigator.userAgent.indexOf('Android') !== -1) {
            DbxXhrCanSendForms = false;
          }
        }
      }
      if (DbxXhrArrayBufferView === Object) {
        DbxXhrSendArrayBufferView = false;
      }
    }
  }

  Dropbox.Util.Xhr = (function() {
    Xhr.Request = DbxXhrRequest;

    Xhr.ieXdr = DbxXhrIeMode;

    Xhr.canSendForms = DbxXhrCanSendForms;

    Xhr.doesPreflight = DbxXhrDoesPreflight;

    Xhr.ArrayBufferView = DbxXhrArrayBufferView;

    Xhr.sendArrayBufferView = DbxXhrSendArrayBufferView;

    Xhr.wrapBlob = DbxXhrWrapBlob;

    function Xhr(method, baseUrl) {
      this.method = method;
      this.isGet = this.method === 'GET';
      this.url = baseUrl;
      this.wantHeaders = false;
      this.headers = {};
      this.params = null;
      this.body = null;
      this.preflight = !(this.isGet || (this.method === 'POST'));
      this.signed = false;
      this.completed = false;
      this.responseType = null;
      this.callback = null;
      this.xhr = null;
      this.onError = null;
    }

    Xhr.prototype.xhr = null;

    Xhr.prototype.onError = null;

    Xhr.prototype.setParams = function(params) {
      if (this.signed) {
        throw new Error('setParams called after addOauthParams or addOauthHeader');
      }
      if (this.params) {
        throw new Error('setParams cannot be called twice');
      }
      this.params = params;
      return this;
    };

    Xhr.prototype.setCallback = function(callback) {
      this.callback = callback;
      return this;
    };

    Xhr.prototype.signWithOauth = function(oauth, cacheFriendly) {
      if (Dropbox.Util.Xhr.ieXdr) {
        return this.addOauthParams(oauth);
      } else if (this.preflight || !Dropbox.Util.Xhr.doesPreflight) {
        return this.addOauthHeader(oauth);
      } else {
        if (this.isGet && cacheFriendly) {
          return this.addOauthHeader(oauth);
        } else {
          return this.addOauthParams(oauth);
        }
      }
    };

    Xhr.prototype.addOauthParams = function(oauth) {
      if (this.signed) {
        throw new Error('Request already has an OAuth signature');
      }
      this.params || (this.params = {});
      oauth.addAuthParams(this.method, this.url, this.params);
      this.signed = true;
      return this;
    };

    Xhr.prototype.addOauthHeader = function(oauth) {
      if (this.signed) {
        throw new Error('Request already has an OAuth signature');
      }
      this.params || (this.params = {});
      this.signed = true;
      return this.setHeader('Authorization', oauth.authHeader(this.method, this.url, this.params));
    };

    Xhr.prototype.setBody = function(body) {
      if (this.isGet) {
        throw new Error('setBody cannot be called on GET requests');
      }
      if (this.body !== null) {
        throw new Error('Request already has a body');
      }
      if (typeof body === 'string') {

      } else if ((typeof FormData !== 'undefined') && (body instanceof FormData)) {

      } else {
        this.headers['Content-Type'] = 'application/octet-stream';
        this.preflight = true;
      }
      this.body = body;
      return this;
    };

    Xhr.prototype.setResponseType = function(responseType) {
      this.responseType = responseType;
      return this;
    };

    Xhr.prototype.setHeader = function(headerName, value) {
      var oldValue;
      if (this.headers[headerName]) {
        oldValue = this.headers[headerName];
        throw new Error("HTTP header " + headerName + " already set to " + oldValue);
      }
      if (headerName === 'Content-Type') {
        throw new Error('Content-Type is automatically computed based on setBody');
      }
      this.preflight = true;
      this.headers[headerName] = value;
      return this;
    };

    Xhr.prototype.reportResponseHeaders = function() {
      return this.wantHeaders = true;
    };

    Xhr.prototype.setFileField = function(fieldName, fileName, fileData, contentType) {
      var blob, blobError, boundary, builder, useFormData;
      if (this.body !== null) {
        throw new Error('Request already has a body');
      }
      if (this.isGet) {
        throw new Error('setFileField cannot be called on GET requests');
      }
      if (typeof fileData === 'object') {
        if (typeof ArrayBuffer !== 'undefined') {
          if (fileData instanceof ArrayBuffer) {
            if (Dropbox.Util.Xhr.sendArrayBufferView) {
              fileData = new Uint8Array(fileData);
            }
          } else {
            if (!Dropbox.Util.Xhr.sendArrayBufferView && fileData.byteOffset === 0 && fileData.buffer instanceof ArrayBuffer) {
              fileData = fileData.buffer;
            }
          }
        }
        contentType || (contentType = 'application/octet-stream');
        try {
          fileData = new Blob([fileData], {
            type: contentType
          });
        } catch (_error) {
          blobError = _error;
          if (window.WebKitBlobBuilder) {
            builder = new WebKitBlobBuilder;
            builder.append(fileData);
            if (blob = builder.getBlob(contentType)) {
              fileData = blob;
            }
          }
        }
        if (typeof File !== 'undefined' && fileData instanceof File) {
          fileData = new Blob([fileData], {
            type: fileData.type
          });
        }
        useFormData = fileData instanceof Blob;
      } else {
        useFormData = false;
      }
      if (useFormData) {
        this.body = new FormData();
        return this.body.append(fieldName, fileData, fileName);
      } else {
        contentType || (contentType = 'application/octet-stream');
        boundary = this.multipartBoundary();
        this.headers['Content-Type'] = "multipart/form-data; boundary=" + boundary;
        return this.body = ['--', boundary, "\r\n", 'Content-Disposition: form-data; name="', fieldName, '"; filename="', fileName, "\"\r\n", 'Content-Type: ', contentType, "\r\n", "Content-Transfer-Encoding: binary\r\n\r\n", fileData, "\r\n", '--', boundary, '--', "\r\n"].join('');
      }
    };

    Xhr.prototype.multipartBoundary = function() {
      return [Date.now().toString(36), Math.random().toString(36)].join('----');
    };

    Xhr.prototype.paramsToUrl = function() {
      var queryString;
      if (this.params) {
        queryString = Dropbox.Util.Xhr.urlEncode(this.params);
        if (queryString.length !== 0) {
          this.url = [this.url, '?', queryString].join('');
        }
        this.params = null;
      }
      return this;
    };

    Xhr.prototype.paramsToBody = function() {
      if (this.params) {
        if (this.body !== null) {
          throw new Error('Request already has a body');
        }
        if (this.isGet) {
          throw new Error('paramsToBody cannot be called on GET requests');
        }
        this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        this.body = Dropbox.Util.Xhr.urlEncode(this.params);
        this.params = null;
      }
      return this;
    };

    Xhr.prototype.prepare = function() {
      var header, ieXdr, value, _ref;
      ieXdr = Dropbox.Util.Xhr.ieXdr;
      if (this.isGet || this.body !== null || ieXdr) {
        this.paramsToUrl();
        if (this.body !== null && typeof this.body === 'string') {
          this.headers['Content-Type'] = 'text/plain; charset=utf8';
        }
      } else {
        this.paramsToBody();
      }
      this.xhr = new Dropbox.Util.Xhr.Request();
      if (ieXdr) {
        this.xhr.onload = (function(_this) {
          return function() {
            return _this.onXdrLoad();
          };
        })(this);
        this.xhr.onerror = (function(_this) {
          return function() {
            return _this.onXdrError();
          };
        })(this);
        this.xhr.ontimeout = (function(_this) {
          return function() {
            return _this.onXdrError();
          };
        })(this);
        this.xhr.onprogress = function() {};
      } else {
        this.xhr.onreadystatechange = (function(_this) {
          return function() {
            return _this.onReadyStateChange();
          };
        })(this);
      }
      this.xhr.open(this.method, this.url, true);
      if (!ieXdr) {
        _ref = this.headers;
        for (header in _ref) {
          if (!__hasProp.call(_ref, header)) continue;
          value = _ref[header];
          this.xhr.setRequestHeader(header, value);
        }
      }
      if (this.responseType) {
        if (this.responseType === 'b') {
          if (this.xhr.overrideMimeType) {
            this.xhr.overrideMimeType('text/plain; charset=x-user-defined');
          }
        } else {
          this.xhr.responseType = this.responseType;
        }
      }
      return this;
    };

    Xhr.prototype.send = function(callback) {
      var body, xhrError;
      this.callback = callback || this.callback;
      if (this.body !== null) {
        body = this.body;
        if (Dropbox.Util.Xhr.sendArrayBufferView) {
          if (body instanceof ArrayBuffer) {
            body = new Uint8Array(body);
          }
        } else {
          if (body.byteOffset === 0 && body.buffer instanceof ArrayBuffer) {
            body = body.buffer;
          }
        }
        try {
          this.xhr.send(body);
        } catch (_error) {
          xhrError = _error;
          if (!Dropbox.Util.Xhr.sendArrayBufferView && Dropbox.Util.Xhr.wrapBlob) {
            body = new Blob([body], {
              type: 'application/octet-stream'
            });
            this.xhr.send(body);
          } else {
            throw xhrError;
          }
        }
      } else {
        this.xhr.send();
      }
      return this;
    };

    Xhr.urlEncode = function(object) {
      var chunks, key, value;
      chunks = [];
      for (key in object) {
        value = object[key];
        chunks.push(this.urlEncodeValue(key) + '=' + this.urlEncodeValue(value));
      }
      return chunks.sort().join('&');
    };

    Xhr.urlEncodeValue = function(object) {
      return encodeURIComponent(object.toString()).replace(/\!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
    };

    Xhr.urlDecode = function(string) {
      var kvp, result, token, _i, _len, _ref;
      result = {};
      _ref = string.split('&');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        token = _ref[_i];
        kvp = token.split('=');
        result[decodeURIComponent(kvp[0])] = decodeURIComponent(kvp[1]);
      }
      return result;
    };

    Xhr.prototype.onReadyStateChange = function() {
      var allHeaders, apiError, bytes, contentType, dirtyText, duplicateIndex, headers, i, jsonError, metadata, metadataJson, offset, text, _i, _ref;
      if (this.xhr.readyState !== 4) {
        return true;
      }
      if (this.completed) {
        return true;
      }
      this.completed = true;
      if (this.xhr.status < 200 || this.xhr.status >= 300) {
        apiError = new Dropbox.ApiError(this.xhr, this.method, this.url);
        if (this.onError) {
          this.onError(apiError, this.callback);
        } else {
          this.callback(apiError);
        }
        return true;
      }
      if (this.wantHeaders) {
        allHeaders = this.xhr.getAllResponseHeaders();
        if (allHeaders) {
          headers = Dropbox.Util.Xhr.parseResponseHeaders(allHeaders);
        } else {
          headers = this.guessResponseHeaders();
        }
        metadataJson = headers['x-dropbox-metadata'];
      } else {
        headers = void 0;
        metadataJson = this.xhr.getResponseHeader('x-dropbox-metadata');
      }
      if (metadataJson != null ? metadataJson.length : void 0) {
        try {
          metadata = JSON.parse(metadataJson);
        } catch (_error) {
          jsonError = _error;
          duplicateIndex = metadataJson.search(/\}\,\s*\{/);
          if (duplicateIndex !== -1) {
            try {
              metadataJson = metadataJson.substring(0, duplicateIndex + 1);
              metadata = JSON.parse(metadataJson);
            } catch (_error) {
              jsonError = _error;
              metadata = void 0;
            }
          } else {
            metadata = void 0;
          }
        }
      } else {
        metadata = void 0;
      }
      if (this.responseType) {
        if (this.responseType === 'b') {
          dirtyText = this.xhr.responseText != null ? this.xhr.responseText : this.xhr.response;
          bytes = [];
          for (i = _i = 0, _ref = dirtyText.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            bytes.push(String.fromCharCode(dirtyText.charCodeAt(i) & 0xFF));
          }
          text = bytes.join('');
          this.callback(null, text, metadata, headers);
        } else {
          this.callback(null, this.xhr.response, metadata, headers);
        }
        return true;
      }
      text = this.xhr.responseText != null ? this.xhr.responseText : this.xhr.response;
      contentType = this.xhr.getResponseHeader('Content-Type');
      if (contentType) {
        offset = contentType.indexOf(';');
        if (offset !== -1) {
          contentType = contentType.substring(0, offset);
        }
      }
      switch (contentType) {
        case 'application/x-www-form-urlencoded':
          this.callback(null, Dropbox.Util.Xhr.urlDecode(text), metadata, headers);
          break;
        case 'application/json':
        case 'text/javascript':
          this.callback(null, JSON.parse(text), metadata, headers);
          break;
        default:
          this.callback(null, text, metadata, headers);
      }
      return true;
    };

    Xhr.parseResponseHeaders = function(allHeaders) {
      var colonIndex, headerLines, headers, line, name, value, _i, _len;
      headers = {};
      headerLines = allHeaders.split("\n");
      for (_i = 0, _len = headerLines.length; _i < _len; _i++) {
        line = headerLines[_i];
        colonIndex = line.indexOf(':');
        name = line.substring(0, colonIndex).trim().toLowerCase();
        value = line.substring(colonIndex + 1).trim();
        headers[name] = value;
      }
      return headers;
    };

    Xhr.prototype.guessResponseHeaders = function() {
      var headers, name, value, _i, _len, _ref;
      headers = {};
      _ref = ['cache-control', 'content-language', 'content-range', 'content-type', 'expires', 'last-modified', 'pragma', 'x-dropbox-metadata'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        value = this.xhr.getResponseHeader(name);
        if (value) {
          headers[name] = value;
        }
      }
      return headers;
    };

    Xhr.prototype.onXdrLoad = function() {
      var headers, metadata, text;
      if (this.completed) {
        return true;
      }
      this.completed = true;
      text = this.xhr.responseText;
      if (this.wantHeaders) {
        headers = {
          'content-type': this.xhr.contentType
        };
      } else {
        headers = void 0;
      }
      metadata = void 0;
      if (this.responseType) {
        this.callback(null, text, metadata, headers);
        return true;
      }
      switch (this.xhr.contentType) {
        case 'application/x-www-form-urlencoded':
          this.callback(null, Dropbox.Util.Xhr.urlDecode(text), metadata, headers);
          break;
        case 'application/json':
        case 'text/javascript':
          this.callback(null, JSON.parse(text), metadata, headers);
          break;
        default:
          this.callback(null, text, metadata, headers);
      }
      return true;
    };

    Xhr.prototype.onXdrError = function() {
      var apiError;
      if (this.completed) {
        return true;
      }
      this.completed = true;
      apiError = new Dropbox.ApiError(this.xhr, this.method, this.url);
      if (this.onError) {
        this.onError(apiError, this.callback);
      } else {
        this.callback(apiError);
      }
      return true;
    };

    return Xhr;

  })();

}).call(this);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},"gm":{"package.json":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/gm/package.json                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
exports.name = "gm";
exports.version = "1.23.0";
exports.main = "./index";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/gm/index.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //

/**
 * Module dependencies.
 */

var Stream = require('stream').Stream;
var EventEmitter = require('events').EventEmitter;
var util = require('util');

util.inherits(gm, EventEmitter);

/**
 * Constructor.
 *
 * @param {String|Number} path - path to img source or ReadableStream or width of img to create
 * @param {Number} [height] - optional filename of ReadableStream or height of img to create
 * @param {String} [color] - optional hex background color of created img
 */

function gm (source, height, color) {
  var width;

  if (!(this instanceof gm)) {
    return new gm(source, height, color);
  }

  EventEmitter.call(this);

  this._options = {};
  this.options(this.__proto__._options);

  this.data = {};
  this._in = [];
  this._out = [];
  this._outputFormat = null;
  this._subCommand = 'convert';

  if (source instanceof Stream) {
    this.sourceStream = source;
    source = height || 'unknown.jpg';
  } else if (Buffer.isBuffer(source)) {
    this.sourceBuffer = source;
    source = height || 'unknown.jpg';
  } else if (height) {
    // new images
    width = source;
    source = "";

    this.in("-size", width + "x" + height);

    if (color) {
      this.in("xc:"+ color);
    }
  }

  if (typeof source === "string") {
    // then source is a path

    // parse out gif frame brackets from filename
    // since stream doesn't use source path
    // eg. "filename.gif[0]"
    var frames = source.match(/(\[.+\])$/);
    if (frames) {
      this.sourceFrames = source.substr(frames.index, frames[0].length);
      source = source.substr(0, frames.index);
    }
  }

  this.source = source;

  this.addSrcFormatter(function (src) {
    // must be first source formatter

    var inputFromStdin = this.sourceStream || this.sourceBuffer;
    var ret = inputFromStdin ? '-' : this.source;

    if (ret && this.sourceFrames) ret += this.sourceFrames;

    src.length = 0;
    src[0] = ret;
  });
}

/**
 * Subclasses the gm constructor with custom options.
 *
 * @param {options} options
 * @return {gm} the subclasses gm constructor
 */

var parent = gm;
gm.subClass = function subClass (options) {
  function gm (source, height, color) {
    if (!(this instanceof parent)) {
      return new gm(source, height, color);
    }

    parent.call(this, source, height, color);
  }

  gm.prototype.__proto__ = parent.prototype;
  gm.prototype._options = {};
  gm.prototype.options(options);

  return gm;
}

/**
 * Augment the prototype.
 */

require("./lib/options")(gm.prototype);
require("./lib/getters")(gm);
require("./lib/args")(gm.prototype);
require("./lib/drawing")(gm.prototype);
require("./lib/convenience")(gm.prototype);
require("./lib/command")(gm.prototype);
require("./lib/compare")(gm.prototype);
require("./lib/composite")(gm.prototype);
require("./lib/montage")(gm.prototype);

/**
 * Expose.
 */

module.exports = exports = gm;
module.exports.utils = require('./lib/utils');
module.exports.compare = require('./lib/compare')();
module.exports.version = require('./package.json').version;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"babel-runtime":{"regenerator":{"index.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/babel-runtime/regenerator/index.js                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.exports = require("regenerator-runtime");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"helpers":{"typeof.js":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/babel-runtime/helpers/typeof.js                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"toConsumableArray.js":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/babel-runtime/helpers/toConsumableArray.js                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
"use strict";

exports.__esModule = true;

var _from = require("../core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"possibleConstructorReturn.js":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/babel-runtime/helpers/possibleConstructorReturn.js                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
"use strict";

exports.__esModule = true;

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"inherits.js":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/babel-runtime/helpers/inherits.js                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
"use strict";

exports.__esModule = true;

var _setPrototypeOf = require("../core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("../core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"classCallCheck.js":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/babel-runtime/helpers/classCallCheck.js                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"extends.js":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/babel-runtime/helpers/extends.js                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
"use strict";

exports.__esModule = true;

var _assign = require("../core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"slicedToArray.js":function(require,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// node_modules/babel-runtime/helpers/slicedToArray.js                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
"use strict";

exports.__esModule = true;

var _isIterable2 = require("../core-js/is-iterable");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require("../core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
var exports = require("./node_modules/meteor/modules/server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package.modules = exports, {
  meteorInstall: meteorInstall
});

})();
