// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"iUuJv":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "47f455d51fcc916e";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"fILKw":[function(require,module,exports,__globalThis) {
var _stylesCss = require("./styles.css");
var _apiJs = require("./api.js");
var _uiJs = require("./ui.js");
const PAGE_SIZE = 20;
const FAVORITES_KEY = 'vanillaDex:favorites';
const THEME_KEY = 'vanillaDex:theme';
const galleryEl = document.getElementById('gallery');
const bottomSentinelEl = document.getElementById('bottomSentinel');
const loadingLineEl = document.getElementById('loadingLine');
const emptyStateEl = document.getElementById('emptyState');
const metaLineEl = document.getElementById('metaLine');
const searchEl = document.getElementById('search');
const typeFilterEl = document.getElementById('typeFilter');
const favoritesOnlyEl = document.getElementById('favoritesOnly');
const themeSelectEl = document.getElementById('themeSelect');
const modalOverlayEl = document.getElementById('modalOverlay');
const modalContentEl = document.getElementById('modalContent');
const modalCloseEl = document.getElementById('modalClose');
const compareAEl = document.getElementById('compareA');
const compareBEl = document.getElementById('compareB');
const compareBtnEl = document.getElementById('compareBtn');
const compareResultEl = document.getElementById('compareResult');
const TYPE_OPTIONS = [
    'bug',
    'dark',
    'dragon',
    'electric',
    'fairy',
    'fighting',
    'fire',
    'flying',
    'ghost',
    'grass',
    'ground',
    'ice',
    'normal',
    'poison',
    'psychic',
    'rock',
    'steel',
    'water'
];
let allPokemon = [];
let cursor = 0;
let hasMore = true;
let loading = false;
let currentQuery = '';
let currentType = 'all';
let currentFavoritesOnly = false;
let favorites = new Set();
let activeModalId = null;
let compareOpen = false;
function loadFavorites() {
    try {
        const raw = localStorage.getItem(FAVORITES_KEY);
        if (!raw) return new Set();
        const arr = JSON.parse(raw);
        if (!Array.isArray(arr)) return new Set();
        return new Set(arr.map((n)=>Number(n)).filter((n)=>Number.isFinite(n)));
    } catch  {
        return new Set();
    }
}
function saveFavorites() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)));
}
function isDarkThemePreferred() {
    return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
}
function applyTheme(theme) {
    const t = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
}
function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const theme = saved === 'dark' || saved === 'light' ? saved : isDarkThemePreferred() ? 'dark' : 'light';
    setTheme(theme);
}
function setTheme(theme) {
    const t = theme === 'dark' ? 'dark' : 'light';
    applyTheme(t);
    localStorage.setItem(THEME_KEY, t);
    if (themeSelectEl) themeSelectEl.value = t;
}
function setMetaLine() {
    const shown = Array.from(galleryEl.querySelectorAll('[data-id]')).length;
    const typesText = currentType === 'all' ? 'All types' : (0, _uiJs.typeLabel)(currentType);
    const favLabel = currentFavoritesOnly ? ' + favorites' : '';
    metaLineEl.textContent = `Showing: ${shown}. Filter: ${typesText}${favLabel}${currentQuery ? ` \u{2022} Search: "${currentQuery}"` : ''}`;
}
function matchesFiltersByMeta(meta, details) {
    const q = currentQuery;
    if (q && !meta.name.toLowerCase().includes(q)) return false;
    if (currentFavoritesOnly && !favorites.has(meta.id)) return false;
    if (currentType !== 'all') {
        if (!details) return false;
        const types = details.types || [];
        if (!types.includes(currentType)) return false;
    }
    return true;
}
async function loadNext() {
    if (loading || !hasMore) return;
    if (allPokemon.length === 0) return;
    loading = true;
    (0, _uiJs.setLoadingLine)(loadingLineEl, "Loading Pok\xe9mon...");
    try {
        const appendedIds = [];
        let appendedCount = 0;
        while(appendedCount < PAGE_SIZE && cursor < allPokemon.length){
            const meta = allPokemon[cursor];
            cursor += 1;
            // Quick check by name/favorites-only; types need details.
            const q = currentQuery;
            if (q && !meta.name.toLowerCase().includes(q)) continue;
            if (currentFavoritesOnly && !favorites.has(meta.id)) continue;
            const details = await (0, _apiJs.fetchPokemonDetails)(meta.id);
            if (!matchesFiltersByMeta(meta, details)) continue;
            const cardHTML = (0, _uiJs.buildPokemonCardHTML)(details, favorites.has(details.id));
            galleryEl.insertAdjacentHTML('beforeend', cardHTML);
            appendedIds.push(details.id);
            appendedCount += 1;
        }
        if (cursor >= allPokemon.length && appendedIds.length === 0) hasMore = false;
        emptyStateEl.hidden = galleryEl.querySelector('[data-id]') !== null;
        setMetaLine();
    } catch (e) {
        console.error(e);
        (0, _uiJs.setLoadingLine)(loadingLineEl, 'Failed to load. Please try again.');
    } finally{
        loading = false;
        if (!hasMore) (0, _uiJs.clearLoadingLine)(loadingLineEl);
        else (0, _uiJs.clearLoadingLine)(loadingLineEl);
    }
}
function resetAndLoad() {
    cursor = 0;
    hasMore = true;
    loading = false;
    galleryEl.innerHTML = '';
    (0, _uiJs.clearSkeletonState)(galleryEl);
    emptyStateEl.hidden = false;
    setMetaLine();
    loadNext();
}
function debounce(fn, ms = 250) {
    let t;
    return (...args)=>{
        clearTimeout(t);
        t = setTimeout(()=>fn(...args), ms);
    };
}
const onSearchInput = debounce(()=>{
    currentQuery = (searchEl.value || '').trim().toLowerCase();
    resetAndLoad();
}, 180);
function initTypeOptions() {
    for (const t of TYPE_OPTIONS){
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        typeFilterEl.appendChild(opt);
    }
}
function buildCompareSelectOptions() {
    compareAEl.innerHTML = '';
    compareBEl.innerHTML = '';
    const first = allPokemon[0]?.id || 1;
    const second = allPokemon[1]?.id || 2;
    for (const meta of allPokemon){
        const optA = document.createElement('option');
        optA.value = String(meta.id);
        optA.textContent = `${meta.id.toString().padStart(3, '0')} ${meta.name}`;
        const optB = document.createElement('option');
        optB.value = String(meta.id);
        optB.textContent = `${meta.id.toString().padStart(3, '0')} ${meta.name}`;
        compareAEl.appendChild(optA);
        compareBEl.appendChild(optB);
    }
    compareAEl.value = String(first);
    compareBEl.value = String(second);
}
async function updateCompare() {
    const aId = Number(compareAEl.value);
    const bId = Number(compareBEl.value);
    if (!Number.isFinite(aId) || !Number.isFinite(bId)) return;
    if (!compareOpen) return;
    compareResultEl.innerHTML = `<span class="spinner" aria-hidden="true"></span><span style="margin-left:10px">Comparing...</span>`;
    try {
        const [aPokemon, bPokemon] = await Promise.all([
            (0, _apiJs.fetchPokemonDetails)(aId),
            (0, _apiJs.fetchPokemonDetails)(bId)
        ]);
        compareResultEl.innerHTML = (0, _uiJs.buildComparePanelHTML)(aPokemon, bPokemon);
    } catch (e) {
        console.error(e);
        compareResultEl.textContent = 'Comparison failed.';
    }
}
function openModalLoading(pokemonId) {
    activeModalId = pokemonId;
    modalContentEl.innerHTML = `
    <div class="panel">
      <span class="spinner" aria-hidden="true"></span>
      <span style="margin-left:10px">Loading details...</span>
    </div>
  `;
}
async function openPokemonModal(pokemonId) {
    openModalLoading(pokemonId);
    try {
        const [pokemon, evo] = await Promise.all([
            (0, _apiJs.fetchPokemonDetails)(pokemonId),
            (0, _apiJs.fetchEvolutionSummaryByPokemonId)(pokemonId)
        ]);
        if (activeModalId !== pokemonId) return; // modal was switched quickly
        const isFav = favorites.has(pokemonId);
        modalContentEl.innerHTML = (0, _uiJs.buildPokemonModalHTML)(pokemon, evo, isFav);
        // Bind favorite inside modal.
        const favBtn = modalContentEl.querySelector('#modalFavBtn');
        if (favBtn) favBtn.addEventListener('click', (e)=>{
            e.stopPropagation();
            toggleFavorite(pokemonId);
            refreshCardFavoriteStates(); // Update hearts on gallery cards immediately.
            // Re-render modal to update heart.
            openPokemonModal(pokemonId);
        });
    } catch (e) {
        console.error(e);
        modalContentEl.innerHTML = `<div class="panel">Failed to load details.</div>`;
    }
}
function showModal() {
    modalOverlayEl.hidden = false;
}
function hideModal() {
    modalOverlayEl.hidden = true;
    modalContentEl.innerHTML = '';
    activeModalId = null;
}
function toggleFavorite(id) {
    if (favorites.has(id)) favorites.delete(id);
    else favorites.add(id);
    saveFavorites();
}
function refreshCardFavoriteStates() {
    for (const card of galleryEl.querySelectorAll('[data-id]')){
        const id = Number(card.getAttribute('data-id'));
        const heart = card.querySelector('.heart-icon');
        if (!heart) continue;
        heart.classList.toggle('is-favorite', favorites.has(id));
    }
}
function applyFavoritesToModalIfOpen() {
// Modal re-render is handled in openPokemonModal to keep logic simple.
}
async function init() {
    favorites = loadFavorites();
    // Always start with modal closed.
    hideModal();
    initTheme();
    initTypeOptions();
    compareResultEl.innerHTML = '';
    compareResultEl.hidden = true;
    compareOpen = false;
    compareBtnEl.textContent = 'Compare';
    // Initial empty UI
    emptyStateEl.hidden = true;
    setMetaLine();
    if (themeSelectEl) themeSelectEl.addEventListener('change', ()=>setTheme(themeSelectEl.value));
    searchEl.addEventListener('input', onSearchInput);
    typeFilterEl.addEventListener('change', ()=>{
        currentType = typeFilterEl.value;
        resetAndLoad();
    });
    favoritesOnlyEl.addEventListener('change', ()=>{
        currentFavoritesOnly = favoritesOnlyEl.checked;
        resetAndLoad();
    });
    modalCloseEl.addEventListener('click', hideModal);
    modalOverlayEl.addEventListener('click', (e)=>{
        // Close when clicking on the overlay backdrop (outside of the modal window).
        if (!e.target.closest('.modal')) hideModal();
    });
    window.addEventListener('keydown', (e)=>{
        if (e.key === 'Escape' && !modalOverlayEl.hidden) hideModal();
    });
    // Event delegation for cards and hearts.
    galleryEl.addEventListener('click', (e)=>{
        // Prevent any synthetic/programmatic clicks from triggering modal open.
        if (!e.isTrusted) return;
        const heartBtn = e.target.closest('.heart-btn');
        if (heartBtn && heartBtn.dataset.fav) {
            e.stopPropagation();
            const id = Number(heartBtn.dataset.fav);
            toggleFavorite(id);
            refreshCardFavoriteStates();
            return;
        }
        const card = e.target.closest('.pokemon-card[data-id]');
        if (card) {
            const id = Number(card.getAttribute('data-id'));
            if (Number.isFinite(id)) {
                showModal();
                openPokemonModal(id);
            }
        }
    });
    // Compare
    const setCompareOpen = (open)=>{
        compareOpen = open;
        compareResultEl.hidden = !open;
        if (!open) compareResultEl.innerHTML = '';
        compareBtnEl.textContent = open ? 'Hide' : 'Compare';
    };
    compareBtnEl.addEventListener('click', async ()=>{
        if (compareOpen) {
            setCompareOpen(false);
            return;
        }
        setCompareOpen(true);
        await updateCompare();
    });
    compareAEl.addEventListener('change', ()=>{
        if (compareOpen) updateCompare();
    });
    compareBEl.addEventListener('change', ()=>{
        if (compareOpen) updateCompare();
    });
    // Load list & init compare options.
    const initialLoadingMsg = ()=>{
        (0, _uiJs.renderSkeletonCards)(galleryEl, PAGE_SIZE);
        (0, _uiJs.setLoadingLine)(loadingLineEl, "Loading Pok\xe9dex...");
    };
    initialLoadingMsg();
    try {
        allPokemon = await (0, _apiJs.fetchPokemonList)(151);
        (0, _uiJs.clearSkeletonState)(galleryEl);
        galleryEl.innerHTML = '';
        buildCompareSelectOptions();
        emptyStateEl.hidden = true;
        // Reset filters default values.
        currentQuery = '';
        currentType = 'all';
        currentFavoritesOnly = false;
        searchEl.value = '';
        typeFilterEl.value = 'all';
        favoritesOnlyEl.checked = false;
        setMetaLine();
        // Infinite scroll
        const io = new IntersectionObserver((entries)=>{
            const first = entries[0];
            if (first?.isIntersecting) loadNext();
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '200px'
        });
        io.observe(bottomSentinelEl);
        // First chunk
        cursor = 0;
        hasMore = true;
        loading = false;
        emptyStateEl.hidden = false;
        await loadNext();
    } catch (e) {
        console.error(e);
        (0, _uiJs.setLoadingLine)(loadingLineEl, "Failed to load Pok\xe9dex.");
    } finally{
        (0, _uiJs.clearLoadingLine)(loadingLineEl);
    }
}
init();

},{"./styles.css":"lW6qc","./api.js":"38UJz","./ui.js":"4OwKy"}],"lW6qc":[function() {},{}],"38UJz":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "parsePokemonIdFromUrl", ()=>parsePokemonIdFromUrl);
parcelHelpers.export(exports, "fetchPokemonList", ()=>fetchPokemonList);
parcelHelpers.export(exports, "fetchPokemonDetails", ()=>fetchPokemonDetails);
parcelHelpers.export(exports, "fetchEvolutionSummaryByPokemonId", ()=>fetchEvolutionSummaryByPokemonId);
parcelHelpers.export(exports, "getCachedPokemonDetailsCount", ()=>getCachedPokemonDetailsCount);
const API_BASE = 'https://pokeapi.co/api/v2';
const detailsCache = new Map();
const evolutionCache = new Map();
function extractPokemonId(url) {
    const match = String(url).match(/\/pokemon\/(\d+)\//);
    if (!match) return null;
    return Number(match[1]);
}
function parsePokemonIdFromUrl(url) {
    return extractPokemonId(url);
}
async function fetchPokemonList(limit = 151) {
    const res = await fetch(`${API_BASE}/pokemon?limit=${limit}`);
    if (!res.ok) throw new Error(`Failed to fetch pokemon list: ${res.status}`);
    const data = await res.json();
    return data.results.map((r)=>({
            name: r.name,
            url: r.url,
            id: extractPokemonId(r.url)
        })).filter((p)=>Number.isFinite(p.id));
}
function pickOfficialArtwork(sprites) {
    return sprites?.other?.['official-artwork']?.front_default || sprites?.other?.['official-artwork']?.front_shiny || sprites?.front_default || sprites?.front_shiny || '';
}
function normalizeStats(statsArr) {
    const result = {
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0
    };
    for (const s of statsArr || []){
        const statName = s?.stat?.name;
        const base = s?.base_stat;
        if (!statName || typeof base !== 'number') continue;
        if (statName in result) result[statName] = base;
    }
    return result;
}
async function fetchPokemonDetails(id) {
    if (detailsCache.has(id)) return detailsCache.get(id);
    const res = await fetch(`${API_BASE}/pokemon/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch pokemon details (${id}): ${res.status}`);
    const d = await res.json();
    const types = (d.types || []).map((t)=>t.type.name);
    const primaryType = types[0] || 'normal';
    const image = pickOfficialArtwork(d.sprites);
    const details = {
        id: d.id,
        name: d.name,
        image,
        types,
        primaryType,
        abilities: (d.abilities || []).map((a)=>a?.ability?.name).filter(Boolean),
        stats: normalizeStats(d.stats)
    };
    detailsCache.set(id, details);
    return details;
}
function traverseEvolutionChain(chainRoot, targetName) {
    let from = null;
    let into = [];
    function dfs(node, parentName) {
        if (!node) return false;
        const nodeName = node?.species?.name;
        if (!nodeName) return false;
        if (nodeName === targetName) {
            from = parentName;
            into = (node.evolves_to || []).map((x)=>x?.species?.name).filter(Boolean);
            return true;
        }
        for (const child of node.evolves_to || []){
            if (dfs(child, nodeName)) return true;
        }
        return false;
    }
    dfs(chainRoot, null);
    return {
        from,
        into
    };
}
async function fetchEvolutionSummaryByPokemonId(id) {
    if (evolutionCache.has(id)) return evolutionCache.get(id);
    const speciesRes = await fetch(`${API_BASE}/pokemon-species/${id}`);
    if (!speciesRes.ok) throw new Error(`Failed to fetch pokemon species (${id}): ${speciesRes.status}`);
    const speciesData = await speciesRes.json();
    const chainUrl = speciesData?.evolution_chain?.url;
    if (!chainUrl) {
        const empty = {
            from: null,
            into: []
        };
        evolutionCache.set(id, empty);
        return empty;
    }
    const chainRes = await fetch(chainUrl);
    if (!chainRes.ok) throw new Error(`Failed to fetch evolution chain: ${chainRes.status}`);
    const chainData = await chainRes.json();
    const targetName = speciesData?.name;
    const summary = traverseEvolutionChain(chainData?.chain, targetName);
    evolutionCache.set(id, summary);
    return summary;
}
function getCachedPokemonDetailsCount() {
    return detailsCache.size;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"4OwKy":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TYPE_COLORS", ()=>TYPE_COLORS);
parcelHelpers.export(exports, "capitalize", ()=>capitalize);
parcelHelpers.export(exports, "typeLabel", ()=>typeLabel);
parcelHelpers.export(exports, "getTypeColor", ()=>getTypeColor);
parcelHelpers.export(exports, "getPrimaryTypeColor", ()=>getPrimaryTypeColor);
parcelHelpers.export(exports, "statPercent", ()=>statPercent);
parcelHelpers.export(exports, "setLoadingLine", ()=>setLoadingLine);
parcelHelpers.export(exports, "clearLoadingLine", ()=>clearLoadingLine);
parcelHelpers.export(exports, "renderSkeletonCards", ()=>renderSkeletonCards);
parcelHelpers.export(exports, "clearSkeletonState", ()=>clearSkeletonState);
parcelHelpers.export(exports, "buildPokemonCardHTML", ()=>buildPokemonCardHTML);
parcelHelpers.export(exports, "buildEmptyCompareHTML", ()=>buildEmptyCompareHTML);
parcelHelpers.export(exports, "buildPokemonModalHTML", ()=>buildPokemonModalHTML);
parcelHelpers.export(exports, "buildComparePanelHTML", ()=>buildComparePanelHTML);
const TYPE_COLORS = {
    bug: '#A6B91A',
    dark: '#705746',
    dragon: '#6F35FC',
    electric: '#F7D02C',
    fairy: '#D685AD',
    fighting: '#C22E28',
    fire: '#EE8130',
    flying: '#A98FF3',
    ghost: '#735797',
    grass: '#7AC74C',
    ground: '#E2BF65',
    ice: '#96D9D6',
    normal: '#A8A77A',
    poison: '#A33EA1',
    psychic: '#F95587',
    rock: '#B6A136',
    steel: '#B7B7CE',
    water: '#6390F0'
};
function capitalize(str) {
    return String(str || '').trim().replace(/-/g, ' ').replace(/\s+/g, ' ').split(' ').filter(Boolean).map((w)=>w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
function typeLabel(typeName) {
    return capitalize(typeName);
}
function getTypeColor(typeName) {
    return TYPE_COLORS[typeName] || '#60a5fa';
}
function getPrimaryTypeColor(primaryType) {
    return getTypeColor(primaryType);
}
function statPercent(statKey, value) {
    const maxByStat = {
        hp: 250,
        attack: 190,
        defense: 230,
        speed: 200
    };
    const max = maxByStat[statKey] || 200;
    return Math.max(0, Math.min(100, Math.round(value / max * 100)));
}
function setLoadingLine(el, message) {
    el.innerHTML = `
    <span class="spinner" aria-hidden="true"></span>
    <span style="margin-left:10px">${message || 'Loading...'}</span>
  `;
}
function clearLoadingLine(el) {
    el.textContent = '';
}
function renderSkeletonCards(container, count = 20) {
    const skeletons = Array.from({
        length: count
    }, ()=>`<div class="skeleton-card"></div>`).join('');
    container.classList.add('skeleton-grid');
    container.innerHTML = skeletons;
}
function clearSkeletonState(container) {
    container.classList.remove('skeleton-grid');
}
function buildPokemonCardHTML(pokemon, isFavorite) {
    const id3 = String(pokemon.id).padStart(3, '0');
    const cardBg = getPrimaryTypeColor(pokemon.primaryType);
    const typesHtml = (pokemon.types || []).slice(0, 2).map((t)=>`<span class="type-badge" title="${t}">${typeLabel(t)}</span>`).join('');
    const heartClass = isFavorite ? 'is-favorite' : '';
    // Use button for heart to keep UX nice; click won't open modal.
    return `
    <article class="pokemon-card" data-id="${pokemon.id}" style="--card-bg:${cardBg}" tabindex="0" role="button" aria-label="Open ${capitalize(pokemon.name)}">
      <button class="heart-btn" type="button" data-fav="${pokemon.id}" aria-label="Add to favorites">
        <span class="heart-icon ${heartClass}" aria-hidden="true">\u{2665}</span>
      </button>

      <div class="pokemon-card__image-wrap">
        <img src="${pokemon.image}" alt="${capitalize(pokemon.name)}" loading="lazy" />
      </div>

      <div class="pokemon-card__content">
        <div class="pokemon-card__title">
          <span class="pokemon-card__id">#${id3}</span>
          <h3 class="pokemon-card__name">${capitalize(pokemon.name)}</h3>
        </div>
        <div class="pokemon-card__types">${typesHtml}</div>
      </div>
    </article>
  `;
}
function buildEmptyCompareHTML() {
    return `<div class="muted">Select A and B to compare.</div>`;
}
function statRowHTML({ statKey, statName, value }) {
    const percent = statPercent(statKey, value);
    return `
    <div class="statRow">
      <div class="statName">${statName}</div>
      <div>
        <div class="progress" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="250">
          <div class="bar" style="width:${percent}%"></div>
        </div>
      </div>
      <div class="statValue">${value}</div>
    </div>
  `;
}
function buildPokemonModalHTML(pokemon, evolutionSummary, isFavorite) {
    const id3 = String(pokemon.id).padStart(3, '0');
    const heartClass = isFavorite ? 'is-favorite' : '';
    const evoFrom = evolutionSummary?.from ? capitalize(evolutionSummary.from) : "\u2014";
    const evoInto = evolutionSummary?.into?.length ? evolutionSummary.into.map((n)=>`<li>${capitalize(n)}</li>`).join('') : `<li>\u{2014}</li>`;
    const typesHtml = (pokemon.types || []).slice(0, 2).map((t)=>`<span class="type-badge" title="${t}">${typeLabel(t)}</span>`).join('');
    const stats = pokemon.stats || {
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0
    };
    const statBg = getPrimaryTypeColor(pokemon.primaryType);
    return `
    <div class="modalHeader">
      <div class="modalHeader__left">
        <img class="modalPokemonImage" src="${pokemon.image}" alt="${capitalize(pokemon.name)}" />
        <div class="modalHeader__title">
          <h2 style="padding-bottom: 8px;" id="modalTitle">${capitalize(pokemon.name)}</h2>
          <div class="id">#${id3} \u{2022} ${typesHtml}</div>
        </div>
      </div>

      <div>
        <button class="heart-btn" id="modalFavBtn" type="button" data-id="${pokemon.id}" aria-label="Favorite">
          <span class="heart-icon ${heartClass}" aria-hidden="true">\u{2665}</span>
        </button>
      </div>
    </div>

    <div class="grid2">
      <div class="panel" style="--card-bg:${statBg}">
        <h3 style="margin:0 0 10px">Stats</h3>
        ${statRowHTML({
        statKey: 'hp',
        statName: 'HP',
        value: stats.hp
    })}
        ${statRowHTML({
        statKey: 'attack',
        statName: 'Attack',
        value: stats.attack
    })}
        ${statRowHTML({
        statKey: 'defense',
        statName: 'Defense',
        value: stats.defense
    })}
        ${statRowHTML({
        statKey: 'speed',
        statName: 'Speed',
        value: stats.speed
    })}
      </div>

      <div class="panel">
        <h3 style="margin:0 0 10px">Abilities</h3>
        <ul class="abilityList">
          ${(pokemon.abilities || []).map((a)=>`<li>${capitalize(a)}</li>`).join('')}
        </ul>

        <div class="evoFrom">
          Evolution:
          <div class="evoFrom">
            <div>From: <strong>${evoFrom}</strong></div>
            <div class="evoTo" style="margin-top:8px">To: <strong>${evolutionSummary?.into?.length ? evolutionSummary.into.map(capitalize).join(', ') : "\u2014"}</strong></div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel">
      <h3 style="margin:0 0 10px">Evolution Chain</h3>
      <div class="evoFrom">From: <strong>${evoFrom}</strong></div>
      <div class="evoTo">To:</div>
      <ul class="evoList">${evoInto}</ul>
    </div>
  `;
}
function buildComparePanelHTML(aPokemon, bPokemon) {
    const statsA = aPokemon.stats || {
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0
    };
    const statsB = bPokemon.stats || {
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0
    };
    const statKeys = [
        {
            key: 'hp',
            name: 'HP'
        },
        {
            key: 'attack',
            name: 'Attack'
        },
        {
            key: 'defense',
            name: 'Defense'
        },
        {
            key: 'speed',
            name: 'Speed'
        }
    ];
    function compareColumnHTML(pokemon, stats) {
        const bg = getPrimaryTypeColor(pokemon.primaryType);
        return `
      <div class="compareCard" style="--card-bg:${bg}">
        <h3>${capitalize(pokemon.name)}</h3>
        <div class="small">#${String(pokemon.id).padStart(3, '0')} \u{2022} ${(pokemon.types || []).slice(0, 2).map(typeLabel).join(' / ')}</div>
        <div class="compareStats" aria-label="Stats">
          ${statKeys.map((s)=>{
            const v = stats[s.key] || 0;
            const pc = statPercent(s.key, v);
            return `
                <div class="statRow" style="grid-template-columns: 90px 1fr 56px">
                  <div class="statName">${s.name}</div>
                  <div>
                    <div class="progress">
                      <div class="bar" style="width:${pc}%;"></div>
                    </div>
                  </div>
                  <div class="statValue">${v}</div>
                </div>
              `;
        }).join('')}
        </div>
      </div>
    `;
    }
    return `
    <div class="compareStats__row">
      ${compareColumnHTML(aPokemon, statsA)}
      ${compareColumnHTML(bPokemon, statsB)}
    </div>
  `;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["iUuJv","fILKw"], "fILKw", "parcelRequirefc40", {})

//# sourceMappingURL=Test.1fcc916e.js.map
