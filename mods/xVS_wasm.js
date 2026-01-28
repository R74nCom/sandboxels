// include: shell.js
// include: minimum_runtime_check.js
// end include: minimum_runtime_check.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(moduleArg) => Promise<Module>
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module != 'undefined' ? Module : {};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = !!globalThis.window;
var ENVIRONMENT_IS_WORKER = !!globalThis.WorkerGlobalScope;
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = globalThis.process?.versions?.node && globalThis.process?.type != 'renderer';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)


var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// In MODULARIZE mode _scriptName needs to be captured already at the very top of the page immediately when the page is parsed, so it is generated there
// before the page load. In non-MODULARIZE modes generate it here.
var _scriptName = globalThis.document?.currentScript?.src;

if (typeof __filename != 'undefined') { // Node
  _scriptName = __filename;
} else
if (ENVIRONMENT_IS_WORKER) {
  _scriptName = self.location.href;
}

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var readAsync, readBinary;

if (ENVIRONMENT_IS_NODE) {

  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require('fs');

  scriptDirectory = __dirname + '/';

// include: node_shell_read.js
readBinary = (filename) => {
  // We need to re-wrap `file://` strings to URLs.
  filename = isFileURI(filename) ? new URL(filename) : filename;
  var ret = fs.readFileSync(filename);
  return ret;
};

readAsync = async (filename, binary = true) => {
  // See the comment in the `readBinary` function.
  filename = isFileURI(filename) ? new URL(filename) : filename;
  var ret = fs.readFileSync(filename, binary ? undefined : 'utf8');
  return ret;
};
// end include: node_shell_read.js
  if (process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, '/');
  }

  arguments_ = process.argv.slice(2);

  // MODULARIZE will export the module in the proper place outside, we don't need to export here
  if (typeof module != 'undefined') {
    module['exports'] = Module;
  }

  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  try {
    scriptDirectory = new URL('.', _scriptName).href; // includes trailing slash
  } catch {
    // Must be a `blob:` or `data:` URL (e.g. `blob:http://site.com/etc/etc`), we cannot
    // infer anything from them.
  }

  {
// include: web_or_worker_shell_read.js
if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);
      return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = async (url) => {
    // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
    // See https://github.com/github/fetch/pull/92#issuecomment-140665932
    // Cordova or Electron apps are typically loaded from a file:// url.
    // So use XHR on webview if URL is a file URL.
    if (isFileURI(url)) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = () => {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            resolve(xhr.response);
            return;
          }
          reject(xhr.status);
        };
        xhr.onerror = reject;
        xhr.send(null);
      });
    }
    var response = await fetch(url, { credentials: 'same-origin' });
    if (response.ok) {
      return response.arrayBuffer();
    }
    throw new Error(response.status + ' : ' + response.url);
  };
// end include: web_or_worker_shell_read.js
  }
} else
{
}

var out = console.log.bind(console);
var err = console.error.bind(console);

// end include: shell.js

// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary;

// Wasm globals

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    // This build was created without ASSERTIONS defined.  `assert()` should not
    // ever be called in this configuration but in case there are callers in
    // the wild leave this simple abort() implementation here for now.
    abort(text);
  }
}

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */
var isFileURI = (filename) => filename.startsWith('file://');

// include: runtime_common.js
// include: runtime_stack_check.js
// end include: runtime_stack_check.js
// include: runtime_exceptions.js
// end include: runtime_exceptions.js
// include: runtime_debug.js
// end include: runtime_debug.js
// include: binaryDecode.js
// Prevent Closure from minifying the binaryDecode() function, or otherwise
// Closure may analyze through the WASM_BINARY_DATA placeholder string into this
// function, leading into incorrect results.
/** @noinline */
function binaryDecode(bin) {
  for (var i = 0, l = bin.length, o = new Uint8Array(l), c; i < l; ++i) {
    c = bin.charCodeAt(i);
    o[i] = ~c >> 8 & c; // Recover the null byte in a manner that is compatible with https://crbug.com/453961758
  }
  return o;
}
// end include: binaryDecode.js
// Memory management
var
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

// BigInt64Array type is not correctly defined in closure
var
/** not-@type {!BigInt64Array} */
  HEAP64,
/* BigUint64Array type is not correctly defined in closure
/** not-@type {!BigUint64Array} */
  HEAPU64;

var runtimeInitialized = false;



function updateMemoryViews() {
  var b = wasmMemory.buffer;
  HEAP8 = new Int8Array(b);
  HEAP16 = new Int16Array(b);
  HEAPU8 = new Uint8Array(b);
  HEAPU16 = new Uint16Array(b);
  HEAP32 = new Int32Array(b);
  HEAPU32 = new Uint32Array(b);
  HEAPF32 = new Float32Array(b);
  HEAPF64 = new Float64Array(b);
  HEAP64 = new BigInt64Array(b);
  HEAPU64 = new BigUint64Array(b);
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// end include: runtime_common.js
function preRun() {
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  // Begin ATPRERUNS hooks
  callRuntimeCallbacks(onPreRuns);
  // End ATPRERUNS hooks
}

function initRuntime() {
  runtimeInitialized = true;

  // No ATINITS hooks

  wasmExports['__wasm_call_ctors']();

  // No ATPOSTCTORS hooks
}

function postRun() {
   // PThreads reuse the runtime from the main thread.

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  // Begin ATPOSTRUNS hooks
  callRuntimeCallbacks(onPostRuns);
  // End ATPOSTRUNS hooks
}

/** @param {string|number=} what */
function abort(what) {
  Module['onAbort']?.(what);

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;

  what += '. Build with -sASSERTIONS for more info.';

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // definition for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

var wasmBinaryFile;

function findWasmBinary() {
  return binaryDecode(' asm   &`  `	} ` ` ``  pA ¾memory __wasm_call_ctors  propagate_lightmap_f32 compute_blockers_u8 __indirect_function_table _emscripten_stack_restore _emscripten_stack_alloc emscripten_stack_get_current \n¹ }}}@ AH\r  AH!	A !\n@ \n!@ 	\r   l!A !\n@ \n!\rC    !C    !A !\nA !C    !@ ! ! ! !@@ \n"\nAt"(  \rj"A H\r   N\r  (  j" O\r     l jAt"j* ! Aj!   j* !    j* ! ! ! ! ! "! "! \nAj"!\n "! "! AG\r  \r j!\n@@ A L\r   \nAt"jC    C @?D  ³" " C @?D^ C    ]8   jC    C @?D  " C @?D^ C    ]8  !C    C @?D  " C @?D^ C    ]!  \nAt"jA 6   jA 6  !C    !  \nAtj 8  \rAj"!\n  G\r  Aj"!\n  G\r ñ	@ AH\r  AH!A !@ !@ \r    lj!	A !@ !\nA !A !@ A L\r @ !@@ \n  "Atj"\r,  j"A N\r A!@  H\r A!A!  \r, j"\r O\r    \r lj j-  AK!  j! Aj"!  G\r  	 \nj :   \nAj"!  G\r  Aj"!  G\r \n   $ #   kApq"$   # \' A    ÿÿÿÿ                   ÿÿÿÿ target_features+bulk-memory+bulk-memory-opt+call-indirect-overlong+\nmultivalue+mutable-globals+nontrapping-fptoint+reference-types+sign-ext');
}

function getBinarySync(file) {
  return file;
}

async function getWasmBinary(binaryFile) {

  // Otherwise, getBinarySync should be able to get it synchronously
  return getBinarySync(binaryFile);
}

async function instantiateArrayBuffer(binaryFile, imports) {
  try {
    var binary = await getWasmBinary(binaryFile);
    var instance = await WebAssembly.instantiate(binary, imports);
    return instance;
  } catch (reason) {
    err(`failed to asynchronously prepare wasm: ${reason}`);

    abort(reason);
  }
}

async function instantiateAsync(binary, binaryFile, imports) {
  return instantiateArrayBuffer(binaryFile, imports);
}

function getWasmImports() {
  // prepare imports
  var imports = {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  };
  return imports;
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
async function createWasm() {
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    wasmExports = instance.exports;

    assignWasmExports(wasmExports);

    updateMemoryViews();

    removeRunDependency('wasm-instantiate');
    return wasmExports;
  }
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    return receiveInstance(result['instance']);
  }

  var info = getWasmImports();

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {
    return new Promise((resolve, reject) => {
        Module['instantiateWasm'](info, (inst, mod) => {
          resolve(receiveInstance(inst, mod));
        });
    });
  }

  wasmBinaryFile ??= findWasmBinary();
  var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
  var exports = receiveInstantiationResult(result);
  return exports;
}

// end include: preamble.js

// Begin JS library code


  class ExitStatus {
      name = 'ExitStatus';
      constructor(status) {
        this.message = `Program terminated with exit(${status})`;
        this.status = status;
      }
    }

  var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        // Pass the module as the first argument.
        callbacks.shift()(Module);
      }
    };
  var onPostRuns = [];
  var addOnPostRun = (cb) => onPostRuns.push(cb);

  var onPreRuns = [];
  var addOnPreRun = (cb) => onPreRuns.push(cb);

  var runDependencies = 0;
  
  
  var dependenciesFulfilled = null;
  var removeRunDependency = (id) => {
      runDependencies--;
  
      Module['monitorRunDependencies']?.(runDependencies);
  
      if (runDependencies == 0) {
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback(); // can add another dependenciesFulfilled
        }
      }
    };
  var addRunDependency = (id) => {
      runDependencies++;
  
      Module['monitorRunDependencies']?.(runDependencies);
  
    };

  /** @noinline */
  var base64Decode = (b64) => {
      if (ENVIRONMENT_IS_NODE) {
        var buf = Buffer.from(b64, 'base64');
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
      }
  
      var b1, b2, i = 0, j = 0, bLength = b64.length;
      var output = new Uint8Array((bLength*3>>2) - (b64[bLength-2] == '=') - (b64[bLength-1] == '='));
      for (; i < bLength; i += 4, j += 3) {
        b1 = base64ReverseLookup[b64.charCodeAt(i+1)];
        b2 = base64ReverseLookup[b64.charCodeAt(i+2)];
        output[j] = base64ReverseLookup[b64.charCodeAt(i)] << 2 | b1 >> 4;
        output[j+1] = b1 << 4 | b2 >> 2;
        output[j+2] = b2 << 6 | base64ReverseLookup[b64.charCodeAt(i+3)];
      }
      return output;
    };


  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[ptr];
      case 'i8': return HEAP8[ptr];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP64[((ptr)>>3)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort(`invalid type for getValue: ${type}`);
    }
  }

  var noExitRuntime = true;


  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[ptr] = value; break;
      case 'i8': HEAP8[ptr] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': HEAP64[((ptr)>>3)] = BigInt(value); break;
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort(`invalid type for setValue: ${type}`);
    }
  }

  var stackRestore = (val) => __emscripten_stack_restore(val);

  var stackSave = () => _emscripten_stack_get_current();

  

  var getCFunc = (ident) => {
      var func = Module['_' + ident]; // closure exported function
      return func;
    };
  
  var writeArrayToMemory = (array, buffer) => {
      HEAP8.set(array, buffer);
    };
  
  var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
  
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.codePointAt(i);
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
          // Gotcha: if codePoint is over 0xFFFF, it is represented as a surrogate pair in UTF-16.
          // We need to manually skip over the second code unit for correct iteration.
          i++;
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    };
  
  var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
  var stringToUTF8OnStack = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
    };
  
  
  
  
  var UTF8Decoder = globalThis.TextDecoder && new TextDecoder();
  
  var findStringEnd = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
      var maxIdx = idx + maxBytesToRead;
      if (ignoreNul) return maxIdx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.
      // As a tiny code save trick, compare idx against maxIdx using a negation,
      // so that maxBytesToRead=undefined/NaN means Infinity.
      while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
      return idx;
    };
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number=} idx
     * @param {number=} maxBytesToRead
     * @param {boolean=} ignoreNul - If true, the function will not stop on a NUL character.
     * @return {string}
     */
  var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
  
      var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
  
      // When using conditional TextDecoder, skip it for short strings as the overhead of the native call is not worth it.
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    };
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index.
     * @param {boolean=} ignoreNul - If true, the function will not stop on a NUL character.
     * @return {string}
     */
  var UTF8ToString = (ptr, maxBytesToRead, ignoreNul) => {
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead, ignoreNul) : '';
    };
  
    /**
     * @param {string|null=} returnType
     * @param {Array=} argTypes
     * @param {Array=} args
     * @param {Object=} opts
     */
  var ccall = (ident, returnType, argTypes, args, opts) => {
      // For fast lookup of conversion functions
      var toC = {
        'string': (str) => {
          var ret = 0;
          if (str !== null && str !== undefined && str !== 0) { // null string
            ret = stringToUTF8OnStack(str);
          }
          return ret;
        },
        'array': (arr) => {
          var ret = stackAlloc(arr.length);
          writeArrayToMemory(arr, ret);
          return ret;
        }
      };
  
      function convertReturnValue(ret) {
        if (returnType === 'string') {
          return UTF8ToString(ret);
        }
        if (returnType === 'boolean') return Boolean(ret);
        return ret;
      }
  
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]];
          if (converter) {
            if (stack === 0) stack = stackSave();
            cArgs[i] = converter(args[i]);
          } else {
            cArgs[i] = args[i];
          }
        }
      }
      var ret = func(...cArgs);
      function onDone(ret) {
        if (stack !== 0) stackRestore(stack);
        return convertReturnValue(ret);
      }
  
      ret = onDone(ret);
      return ret;
    };

    // Precreate a reverse lookup table from chars
    // "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" back to
    // bytes to make decoding fast.
    for (var base64ReverseLookup = new Uint8Array(123/*'z'+1*/), i = 25; i >= 0; --i) {
      base64ReverseLookup[48+i] = 52+i; // '0-9'
      base64ReverseLookup[65+i] = i; // 'A-Z'
      base64ReverseLookup[97+i] = 26+i; // 'a-z'
    }
    base64ReverseLookup[43] = 62; // '+'
    base64ReverseLookup[47] = 63; // '/'
  ;
// End JS library code

// include: postlibrary.js
// This file is included after the automatically-generated JS library code
// but before the wasm module is created.

{

  // Begin ATMODULES hooks
  if (Module['noExitRuntime']) noExitRuntime = Module['noExitRuntime'];
if (Module['print']) out = Module['print'];
if (Module['printErr']) err = Module['printErr'];
if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];
  // End ATMODULES hooks

  if (Module['arguments']) arguments_ = Module['arguments'];
  if (Module['thisProgram']) thisProgram = Module['thisProgram'];

  if (Module['preInit']) {
    if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
    while (Module['preInit'].length > 0) {
      Module['preInit'].shift()();
    }
  }
}

// Begin runtime exports
  Module['ccall'] = ccall;
  // End runtime exports
  // Begin JS library exports
  // End JS library exports

// end include: postlibrary.js


// Imports from the Wasm binary.
var _propagate_lightmap_f32,
  _compute_blockers_u8,
  __emscripten_stack_restore,
  __emscripten_stack_alloc,
  _emscripten_stack_get_current,
  memory,
  __indirect_function_table,
  wasmMemory;


function assignWasmExports(wasmExports) {
  _propagate_lightmap_f32 = Module['_propagate_lightmap_f32'] = wasmExports['propagate_lightmap_f32'];
  _compute_blockers_u8 = Module['_compute_blockers_u8'] = wasmExports['compute_blockers_u8'];
  __emscripten_stack_restore = wasmExports['_emscripten_stack_restore'];
  __emscripten_stack_alloc = wasmExports['_emscripten_stack_alloc'];
  _emscripten_stack_get_current = wasmExports['emscripten_stack_get_current'];
  memory = wasmMemory = wasmExports['memory'];
  __indirect_function_table = wasmExports['__indirect_function_table'];
}

var wasmImports = {
  
};


// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

function run() {

  if (runDependencies > 0) {
    dependenciesFulfilled = run;
    return;
  }

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    dependenciesFulfilled = run;
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    Module['onRuntimeInitialized']?.();

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(() => {
      setTimeout(() => Module['setStatus'](''), 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
}

var wasmExports;

// With async instantation wasmExports is assigned asynchronously when the
// instance is received.
createWasm();

run();

// end include: postamble.js










// start here:

// === WASM LOADER ===
let wasmReady = false;

// Wait for WASM to initialize
Module.onRuntimeInitialized = () => {
    wasmReady = true;
    console.log("Realistic System: WASM ready (portable mode)");
};


// === LIGHTMAP SYSTEM ===
var lightmap = [];
var nextLightmap = [];
var lightmapScale = 4;
var lightSourceBoost = 3;
var falloff = 0.85;

function rgbToArray(colorString) {
    if (typeof colorString !== "string") return [255,255,255];
    if (colorString.startsWith("rgb")) {
        return colorString.slice(4, -1).split(",").map(val => parseInt(val.trim()));
    } else if (colorString.startsWith("#")) {
        let hex = colorString.slice(1);
        if (hex.length === 3) hex = hex.split("").map(char => char + char).join("");
        let r = parseInt(hex.slice(0, 2), 16);
        let g = parseInt(hex.slice(2, 4), 16);
        let b = parseInt(hex.slice(4, 6), 16);
        return [r, g, b];
    }
    return [255,255,255];
}

function scaleList(numbers, scale) {
    return numbers.map(number => number * scale);
}

function rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    let d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) h = 0;
    else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, v];
}

function hsvToRgb(h, s, v) {
    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    let r, g, b;
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function initializeLightmap(w, h) {
    let lw = Math.ceil(w / lightmapScale) + 1;
    let lh = Math.ceil(h / lightmapScale) + 1;
    function createArray(width_, height_) {
        return Array.from({length: height_}, () => Array.from({length: width_}, () => ({color: [0, 0, 0]})));
    }
    lightmap = createArray(lw, lh);
    nextLightmap = createArray(lw, lh);
}

// === PROPAGATE LIGHTMAP (WASM OR JS) ===
function propagateLightmap() {
    if (!lightmap[0]) return;
    const width = lightmap[0].length;
    const height = lightmap.length;
    const total = width * height;

    if (wasmReady && Module) {
        try {
            const inR = new Float32Array(total);
            const inG = new Float32Array(total);
            const inB = new Float32Array(total);
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const idx = y * width + x;
                    const c = lightmap[y][x].color;
                    inR[idx] = c[0] || 0;
                    inG[idx] = c[1] || 0;
                    inB[idx] = c[2] || 0;
                }
            }

            const outR = new Float32Array(total);
            const outG = new Float32Array(total);
            const outB = new Float32Array(total);

            Module.ccall(
                'propagate_lightmap_f32',
                null,
                ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'],
                [
                    Module.HEAPF32.subarray(inR.byteOffset / 4, inR.byteOffset / 4 + total),
                    Module.HEAPF32.subarray(inG.byteOffset / 4, inG.byteOffset / 4 + total),
                    Module.HEAPF32.subarray(inB.byteOffset / 4, inB.byteOffset / 4 + total),
                    Module.HEAPF32.subarray(outR.byteOffset / 4, outR.byteOffset / 4 + total),
                    Module.HEAPF32.subarray(outG.byteOffset / 4, outG.byteOffset / 4 + total),
                    Module.HEAPF32.subarray(outB.byteOffset / 4, outB.byteOffset / 4 + total),
                    width, height, falloff
                ]
            );

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const idx = y * width + x;
                    nextLightmap[y][x].color = [outR[idx], outG[idx], outB[idx]];
                }
            }
        } catch (e) {
            console.error("WASM light propagation failed", e);
            wasmReady = false;
            return propagateLightmapJS();
        }
    } else {
        return propagateLightmapJS();
    }

    // Copy next → current
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            lightmap[y][x] = {...nextLightmap[y][x]};
        }
    }
}

function propagateLightmapJS() {
    const width = lightmap[0].length;
    const height = lightmap.length;
    const neighbors = [{dx:1,dy:0},{dx:-1,dy:0},{dx:0,dy:1},{dx:0,dy:-1}];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let totalColor = [0,0,0];
            let neighborCount = 0;
            for (const n of neighbors) {
                const nx = x + n.dx;
                const ny = y + n.dy;
                if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
                    const c = lightmap[ny][nx].color;
                    totalColor[0] += c[0];
                    totalColor[1] += c[1];
                    totalColor[2] += c[2];
                    neighborCount++;
                }
            }
            const factor = neighborCount > 0 ? falloff / neighborCount : 0;
            nextLightmap[y][x].color = [
                Math.min(765, Math.max(0, totalColor[0] * factor)),
                Math.min(765, Math.max(0, totalColor[1] * factor)),
                Math.min(765, Math.max(0, totalColor[2] * factor))
            ];
        }
    }
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            lightmap[y][x] = {...nextLightmap[y][x]};
        }
    }
}

function renderLightmap(ctx) {
    if (!lightmap[0]) return;
    let lw = lightmap[0].length;
    let lh = lightmap.length;
    for (let y = 0; y < lh; y++) {
        for (let x = 0; x < lw; x++) {
            let color = lightmap[y][x].color;
            let r = color[0], g = color[1], b = color[2];
            if (r > 16 || g > 16 || b > 16) {
                let hsv = rgbToHsv(r, g, b);
                let newColor = hsvToRgb(hsv[0], hsv[1], 1);
                let alpha = hsv[2];
                ctx.globalAlpha = 1;
                ctx.fillStyle = `rgba(${newColor[0]},${newColor[1]},${newColor[2]},${alpha * 0.4})`;
                ctx.fillRect(x * pixelSize * lightmapScale, y * pixelSize * lightmapScale, pixelSize * lightmapScale, pixelSize * lightmapScale);
                ctx.fillStyle = `rgba(${newColor[0]},${newColor[1]},${newColor[2]},${alpha * 0.25})`;
                ctx.fillRect((x * pixelSize - pixelSizeHalf) * lightmapScale, (y * pixelSize - pixelSizeHalf) * lightmapScale,
                    pixelSize * lightmapScale * 2, pixelSize * lightmapScale * 2);
            }
        }
    }
}

function glowItsOwnColor(pixel) {
    if (!pixel.color) return;
    let x = Math.floor(pixel.x / lightmapScale);
    let y = Math.floor(pixel.y / lightmapScale);
    if (x < 0 || y < 0 || x >= lightmap[0]?.length || y >= lightmap?.length) return;
    lightmap[y][x].color = scaleList(rgbToArray(pixel.color), lightSourceBoost);
}

function glowPowered(pixel) {
    if (!pixel.charge || pixel.charge <= 0 || !pixel.color) return;
    glowItsOwnColor(pixel);
}

let lightEmitters = [
    "fire", "cold_fire", "plasma", "lava", "magma", "sun", "light", "liquid_light", "laser", "flash", "rainbow",
    "ember", "fw_ember", "explosion", "n_explosion", "supernova", "fireball", "blaster", "lightning", "electric",
    "positron", "neutron", "proton", "radiation", "fallout", "rad_cloud", "rad_steam", "uranium", "molten_uranium"
];
lightEmitters.forEach(elName => {
    let el = elements[elName];
    if (el && el.tick) {
        let origTick = el.tick;
        el.tick = function(pixel) {
            origTick(pixel);
            glowItsOwnColor(pixel);
        };
    }
});

["neon", "led", "light_bulb"].forEach(elName => {
    let el = elements[elName];
    if (el && el.tick) {
        let origTick = el.tick;
        el.tick = function(pixel) {
            origTick(pixel);
            glowPowered(pixel);
        };
    }
});

function glowTemp(pixel) {
    let t = pixel.temp;
    if (t < 500) return;
    let intensity = Math.min(1, (t - 500) / 2000);
    let r = Math.min(255, 100 + 155 * intensity);
    let g = Math.min(255, 50 * intensity);
    let b = Math.min(255, 10 * intensity);
    let x = Math.floor(pixel.x / lightmapScale);
    let y = Math.floor(pixel.y / lightmapScale);
    if (x < 0 || y < 0 || x >= lightmap[0]?.length || y >= lightmap?.length) return;
    lightmap[y][x].color = scaleList([r, g, b], lightSourceBoost * intensity);
}
runPerPixel(glowTemp);

renderPrePixel(function(ctx) {
    if (!paused) propagateLightmap();
    renderLightmap(ctx);
});

if (typeof runAfterReset !== 'undefined') {
    runAfterReset(() => initializeLightmap(width, height));
} else {
    setTimeout(() => initializeLightmap(width, height), 100);
}

// === SHADOWS (WASM ACCELERATED BLOCKER COUNT) ===
const DEFAULT_LIGHT_FACTOR = 0.8;
const MIN_LIGHT_INTENSITY = 0.4;
const MAX_DIRECT_NEIGHBORS = 4;
const FOLLOWUP_COORDS_TO_CHECK = [
    [-1,-1],[-1,1],[1,-1],[1,1],
    [-2,0],[2,0],[0,-2],[0,2],
    [-3,0],[3,0],[0,-3],[0,3],
    [-4,0],[4,0],[0,-4],[0,4]
];

let transparentElements = [];
function initTransparent() {
    transparentElements = [];
    Object.keys(elements).forEach(name => {
        let el = elements[name];
        if (el.state === "gas" || el.category === "special" || el.putInTransparentList) {
            transparentElements.push(name);
        }
    });
    ["glass", "stained_glass", "glass_shard", "ice", "led"].forEach(t => {
        if (!transparentElements.includes(t)) transparentElements.push(t);
    });
}
initTransparent();

let frameCounter = 0;
let pixelBrightnessCache = {};

function isOutOfBounds(x, y) {
    return x >= width || y >= height || x < 0 || y < 0;
}

function calculateBrightness(pixel) {
    let directNeighbors = 0;
    [[-1,0],[1,0],[0,-1],[0,1]].forEach(([dx,dy]) => {
        if (!isOutOfBounds(pixel.x + dx, pixel.y + dy)) directNeighbors++;
    });
    let outOfBounds = 4 - directNeighbors;
    if (directNeighbors + outOfBounds >= MAX_DIRECT_NEIGHBORS) {
        return adjustBrightness(computeBrightnessFurther(pixel));
    }
    return 1;
}

function computeBrightnessFurther(pixel) {
    if (!wasmReady || !Module) return computeBrightnessFurtherJS(pixel);

    // Build grid: 0=empty, 1=transparent, 2=opaque
    const lw = Math.min(1000, width);  // limit for performance
    const lh = Math.min(1000, height);
    const grid = new Uint8Array(lw * lh);
    for (let y = 0; y < lh; y++) {
        for (let x = 0; x < lw; x++) {
            if (isOutOfBounds(x, y)) {
                grid[y * lw + x] = 2; // treat OOB as opaque
            } else {
                let elName = pixelMap[x]?.[y]?.element;
                if (!elName) grid[y * lw + x] = 0;
                else if (transparentElements.includes(elName)) grid[y * lw + x] = 1;
                else grid[y * lw + x] = 2;
            }
        }
    }

    // Flatten coords
    const coordsFlat = new Int8Array(FOLLOWUP_COORDS_TO_CHECK.length * 2);
    for (let i = 0; i < FOLLOWUP_COORDS_TO_CHECK.length; i++) {
        coordsFlat[i * 2] = FOLLOWUP_COORDS_TO_CHECK[i][0];
        coordsFlat[i * 2 + 1] = FOLLOWUP_COORDS_TO_CHECK[i][1];
    }

    const blockers = new Uint8Array(lw * lh);
    try {
        Module.ccall(
            'compute_blockers_u8',
            null,
            ['number', 'number', 'number', 'number', 'number', 'number'],
            [
                Module.HEAPU8.subarray(grid.byteOffset, grid.byteOffset + grid.length),
                Module.HEAPU8.subarray(blockers.byteOffset, blockers.byteOffset + blockers.length),
                lw, lh,
                Module.HEAP8.subarray(coordsFlat.byteOffset, coordsFlat.byteOffset + coordsFlat.length),
                FOLLOWUP_COORDS_TO_CHECK.length
            ]
        );
        let px = Math.min(pixel.x, lw - 1);
        let py = Math.min(pixel.y, lh - 1);
        let blockerCount = blockers[py * lw + px];
        return 1 - (blockerCount / FOLLOWUP_COORDS_TO_CHECK.length);
    } catch (e) {
        console.warn("WASM shadow failed", e);
        wasmReady = false;
        return computeBrightnessFurtherJS(pixel);
    }
}

function computeBrightnessFurtherJS(pixel) {
    let blockers = 0;
    FOLLOWUP_COORDS_TO_CHECK.forEach(([dx,dy]) => {
        let nx = pixel.x + dx, ny = pixel.y + dy;
        if (isOutOfBounds(nx, ny)) {
            blockers++;
            return;
        }
        let elName = pixelMap[nx]?.[ny]?.element;
        if (elName && !transparentElements.includes(elName)) blockers++;
    });
    return 1 - (blockers / FOLLOWUP_COORDS_TO_CHECK.length);
}

function adjustBrightness(factor) {
    return factor * DEFAULT_LIGHT_FACTOR + MIN_LIGHT_INTENSITY;
}

function applyShadows(ctx) {
    if (frameCounter % 2 === 0) {
        currentPixels.forEach(pixel => {
            let brightness = calculateBrightness(pixel);
            pixelBrightnessCache[`${pixel.x},${pixel.y}`] = brightness;
        });
    }
    currentPixels.forEach(pixel => {
        let brightness = pixelBrightnessCache[`${pixel.x},${pixel.y}`] || 1;
        let lx = Math.floor(pixel.x / lightmapScale);
        let ly = Math.floor(pixel.y / lightmapScale);
        let lightInt = 0;
        if (ly >= 0 && ly < lightmap?.length && lx >= 0 && lx < lightmap[0]?.length) {
            let lm = lightmap[ly][lx].color;
            lightInt = (lm[0] + lm[1] + lm[2]) / (255 * 3);
        }
        let shadeAlpha = (1 - brightness) * 0.7 * Math.max(0.2, 1 - lightInt * 0.8);
        ctx.globalAlpha = shadeAlpha;
        ctx.fillStyle = "#000";
        ctx.fillRect(pixel.x * pixelSize, pixel.y * pixelSize, pixelSize, pixelSize);
    });
    frameCounter++;
}
renderPostPixel(applyShadows);

// === LIQUID WAVES (pure JS – too tied to rendering) ===
renderEachPixel(function(pixel, ctx) {
    let el = elements[pixel.element];
    if (el && el.state === "liquid") {
        let time = (pixelTicks * 0.01 + pixel.x * 0.15 + pixel.y * 0.03) % (Math.PI * 2);
        let waveOffset = Math.sin(time) * 0.35 - 0.15;
        let foamY = Math.floor(pixel.y + waveOffset);
        let foamAlpha = 0.6 + Math.sin(time * 1.5) * 0.3;
        let foamColor = "#e8f4ff";
        drawSquare(ctx, foamColor, pixel.x, foamY, 1, foamAlpha * 0.4);

        let lx = Math.floor(pixel.x / lightmapScale);
        let ly = Math.floor(pixel.y / lightmapScale);
        if (ly >= 0 && ly < lightmap?.length && lx >= 0 && lx < lightmap[0]?.length) {
            let lmBright = (lightmap[ly][lx].color[0] + lightmap[ly][lx].color[1] + lightmap[ly][lx].color[2]) / (255 * 3);
            if (lmBright > 0.2) {
                let causticAlpha = lmBright * 0.3;
                let causticX = pixel.x + Math.sin(time * 0.7) * 0.2;
                let causticY = pixel.y + 0.5 + Math.cos(time * 1.2) * 0.15;
                drawSquare(ctx, "#00ff88", causticX, causticY, 0.8, causticAlpha);
            }
        }
    }
});

if (typeof runEveryTick !== 'undefined') {
    runEveryTick(initTransparent);
}

