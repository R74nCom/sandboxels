// xVS_beta.js (wasm attributes/methods)

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
  var fs = require('node:fs');

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
// NOTE: This is also used as the process return code in shell environments
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
  return binaryDecode(' asm   Ð ` ` ` ``  ` `~~ ` ` `}}`}}}}`}}}`}}}`}}} `}}}} `}`} ` `|}``}`||`}`}}`}`|`|}`||````Åenvemscripten_resize_heap env	_abort_js env_embind_register_void env_embind_register_bool  env_embind_register_integer env_embind_register_bigint env_embind_register_float env_embind_register_std_string env_embind_register_std_wstring env_embind_register_emval env_embind_register_memory_view UT	\n\r					    pA¹memory __wasm_call_ctors fade lerp \rgrad noise \rinit_c_arrays free 6malloc 4propagate_light_c calculate_wave_c calculate_heat_distortion_c get_lightmap_value_c set_lightmap_value_c increment_frame_counter get_frame_counter \rfree_c_arrays __indirect_function_table \r__getTypeName \\_emscripten_stack_restore 9_emscripten_stack_alloc :emscripten_stack_get_current ;	 ADGEFJHM[YTIZXU]\n®T ^"           C  À@C  pÁC   A\r       D}    Aq"AI"   Aq  C      A\rqAF AI"   Aqó}  ""    C  À@C  pÁC   A    ""         C  À@C  pÁC   A"  C  ¿" C  ¿"A (è´ "   ü AÿqAtj"(Atj ü AÿqAt"	j"\nAj( Atj( "Aq"AI"  Aq  C     A\rqAF AI"  Aq      ( Atj 	j"Aj( Atj( "Aq"	AI"  Aq   C     A\rqAF 	AI"  Aq"      \n( Atj( "Aq"	AI"  Aq  C     A\rqAF 	AI"  Aq     ( Atj( "Aq"AI"  Aq   C     A\rqAF AI"  Aq" " À@A (ì´ "E\r  ¶ @A (ð´ "E\r  ¶ @A (è´ "E\r  ¶ A  6ø´ A   6ô´ A    l"Al"´ 6ì´ A  ´ 6ð´ A A´ 6è´ A !@® ! A (è´  "Atj  Ao6  Aj" !  AG\r @ AH\r  Al"A AJ!A (ð´ !A (ì´ !A !@  "At" jA 6    jA 6  Aj" !   G\r 	}}}}@A (ì´ "E\r A (ð´ "E\r @A (ø´ "AH\r A (ô´ "AH!A !@ !@ \r   l!A !@ !	C    !\nC    !A!A !C    !\r@ " j" l! \n!\n !A! ! \r!\r@ \r!\r ! ! \n!\n@@ " rE\r   	j" O\r   O\r  \r   jAlj"*!\r Aj!  *! \n * !\n \r!\r ! ! \n!\n \n"!\n "! Aj"! "! \r"!\r AG\r  !\n ! Aj"! ! !\r AG\r    	jAlj"Aj   * ²"\nC @?D¡ 8  Aj  \nC @?D¡ 8    \nC @?D¡ 8  	Aj"!  G\r  Aj"!  G\r A  6ð´ A  6ì´ è} A 6  A 6  A 6 @ ("A L\r  CìQ¸=!  CÂõ=!	  *!\nA !@  Cffæ? "³" ¨ C\n×#>"CÍÌ? 	  \n"° C\\Â>  C  ?" " * 8       C33³> * 8    C  > * 8  Aj"!  G\r }@@   *$^\r C    !   *(^E\r *,  C  ÃC  áDC  ?¡ !C    ! @ "C    ^E\r  C¸> C  > C{.>°  C   @!    8  A 6 {}@   rA N\r C    @A (ì´ "\r C    @  A (ô´ "H\r C    C    !@ A (ø´ N\r    l  jAlj Atj* ! g@   rA H\r A (ì´ "E\r   A (ô´ "N\r  A (ø´ N\r    l  jAlj Atj C     C @?D8  A A (ü´ Aj6ü´  A (ü´ @A (ì´ " E\r   ¶ @A (ð´ " E\r   ¶ @A (è´ " E\r   ¶ A A 6ð´ A A 6ì´ A A 6è´ A A 6ô´ A A 6ø´ O|    ¢"     ¢"¢  DiPîàBù>¢D\'èÀV¿ ¢ DB:áSU¥?¢  D^ýÿÿß¿¢D      ð?   ¶K|      ¢"¢"  ¢¢ D§F;ÍÆ>¢DtçÊâù *¿ ¢  D²ûn?¢Dw¬ËTUUÅ¿ ¢    ¶|||# A°k"$  A}jAm"A  A J"Ahl j!@ AtA j( "	 Aj"\njA H\r  	 j!  \nk!A !@@@ A N\r D        ! At( ·! AÀj Atj 9  Aj! Aj" G\r  Ahj!\rA ! 	A  	A J! AH!@@@ E\r D        !  \nj!A !D        !@   Atj+  AÀj  kAtj+ ¢  ! Aj" G\r   Atj 9   F! Aj! E\r A/ k!A0 k! AtA j! 	!@@  Atj+ !A ! !@ AH\r @ Aàj Atj D      p>¢ü·"D      pÁ¢  ü6   AtjAxj+   ! Aj! Aj" G\r   \r¯ !  D      À?¢ D       À¢ " ü"·¡!@@@@@ \rAH"\r  Aàj AtjA|j" ( "  u" tk"6   u!  j! \r\r Aàj AtjA|j( Au! AH\rA! D      à?f\r A !A !A !A!@ AH\r @ Aàj Atj"\n( !@@@@ E\r Aÿÿÿ! E\rA! \n  k6 A!A !A !A! Aj" G\r @ \r Aÿÿÿ!@@ \rAj Aÿÿÿ! Aàj AtjA|j" (  q6  Aj! AG\r D      ð? ¡!A! \r  D      ð? \r¯ ¡!@ D        b\r A ! !@  	L\r @ Aàj Aj"Atj(  r!  	J\r  E\r @ \rAhj!\r Aàj Aj"Atj( E\r A!@ "Aj! Aàj 	 kAtj( E\r   j!@ AÀj  j"Atj  Aj"Atj( ·9 A !D        !@ AH\r @   Atj+  AÀj  kAtj+ ¢  ! Aj" G\r   Atj 9   H\r  !@@ A k¯ "D      pAfE\r  Aàj Atj D      p>¢ü"·D      pÁ¢  ü6  Aj! !\r ü! Aàj Atj 6 D      ð? \r¯ !@ A H\r  !@  "Atj  Aàj Atj( ·¢9  Aj! D      p>¢! \r A ! !@ 	  	 H!  k!\n  Atj! A !D        !@ At"+à    j+ ¢  !  G! Aj! \r  A j \nAtj 9  Aj!  G! Aj! \r @@@@@  D        !@ A L\r  !@ A j Atj"Axj" + " + " "9     ¡ 9  AK! Aj! \r  AF\r  !@ A j Atj"Axj" + " + " "9     ¡ 9  AK! Aj! \r D        !@  A j Atj+  ! AK! Aj! \r  + ! \r  9  +¨!  9  9D        !@ A H\r @ "Aj!  A j Atj+  ! \r     9 D        !@ A H\r  !@ "Aj!  A j Atj+  ! \r     9  +  ¡!A!@ AH\r @  A j Atj+  !  G! Aj! \r     9  9  +¨!  9  9 A°j$  Aq|# Ak"$ @@  ¼"Aÿÿÿÿq"AÚ¤îK\r    »" DÈÉm0_ä?¢D      8C D      8Ã "D   Pû!ù¿¢  Dcba´Q¾¢ "9  ü!@ D   `û!é¿cE\r    D      ð¿ "D   Pû!ù¿¢  Dcba´Q¾¢ 9  Aj! D   `û!é?dE\r   D      ð? "D   Pû!ù¿¢  Dcba´Q¾¢ 9  Aj!@ AüI\r      »9 A !   AvAê~j"Atk¾»9 Aj  AA  ! + !@ AJ\r   9 A  k!  9  Aj$  Ï}|# Ak"$ @@  ¼"Aÿÿÿÿq"AÚ¤úK\r C  ?! AÌI\r  » !@ AÑ§íK\r @ AäÛI\r D-DTû!	@D-DTû!	À A H  »  !  »!@ AJ\r  D-DTû!ù?  !D-DTû!ù? ¡ !@ AÕãK\r @ AàÛ¿I\r D-DTû!@D-DTû!À A H  »  !@ AJ\r DÒ!3|ÙÀ  »¡ !  »DÒ!3|ÙÀ  !@ AüI\r     !   Aj ! +!@@@@ Aq    !  !  !  ! Aj$     ? @    AÿÿÿÿqAüK\r         AÿÿÿÿqAüK!    ¼? @  ¢ AÿÿÿÿqAüK\r       ¢ AÿÿÿÿqAüK!    ¼     "         ¥ # Ak"  8 *   C   p¤    C   ¤ Ç}| ¼"© !@@@@@  ¼"AxjAxI\r A ! \r E\rC  ?! AüF\r At"E\r@@ At"AxK\r  AxI\r    AøF\rC       AøI A Hs@ © E\r     !@ AJ\r    ª AF! AJ\rC  ? « A !@ AJ\r @ ª "\r   £ AA  AF!  ¼Aÿÿÿÿq! AÿÿÿK\r   C   K¼AÿÿÿÿqA¤j!@ ¬  »¢"½Bàÿÿ BÀ¯À T\r @ DqÕÑÿÿÿ_@dE\r  ¦  D     ÀbÀeE\r  §   ­ !    AtAjAIMA !@  AvAÿq"Aÿ I\r A! AK\r A !AA kt"Aj  q\r AA   q! # Ak"  8 *|A +è¢     A´|j"A|qk¾» AvAðq" +è  ¢D      ð¿ "¢A +ð¢    ¢" ¢¢A +ø¢  ¢A +£   ¢A +£  ¢  +ð   Au·    o|~A +¨      A +   " " ¡¡" ¢A +°       ¢¢A +¸    ¢D      ð?   ½" ­|B/ §AqAt)  |¿¢¶-~A A )µ B­þÕäÔý¨Ø ~B|" 7µ   B!§® @@ AH\r   D      à¢! @ AÿO\r  Axj!  D      à¢!  Aý AýIApj! AxJ\r   D      `¢! @ A¸pM\r  AÉj!  D      `¢!  Aðh AðhKAj!   Aÿj­B4¿¢Ê|# Ak"$ @@  ¼"Aÿÿÿÿq"AÚ¤úK\r  AÌI\r  » ! @ AÑ§íK\r   »!@ AãÛK\r @ AJ\r  D-DTû!ù?  !  D-DTû!ù¿  ! D-DTû!	ÀD-DTû!	@ AJ   ! @ AÕãK\r @ AßÛ¿K\r   »!@ AJ\r  DÒ!3|Ù@  !  DÒ!3|ÙÀ  ! D-DTû!@D-DTû!À A H  »  ! @ AüI\r     !    Aj ! +!@@@@ Aq    !   !   !   !  Aj$    Aµ   @    ü\n    @ AI\r     ²    j!@@   sAq\r @@  Aq\r   !@ \r   !  !@  -  :   Aj! Aj"AqE\r  I\r  A|q!@ AÀ I\r   A@j"K\r @  ( 6   (6  (6  (6  (6  (6  (6  (6  ( 6   ($6$  ((6(  (,6,  (060  (464  (868  (<6< AÀ j! AÀ j" M\r   O\r@  ( 6  Aj! Aj" I\r @ AO\r   !@ AO\r   ! A|j!  !@  -  :    - :   - :   - :  Aj! Aj" M\r @  O\r @  -  :   Aj! Aj" G\r   Æ$# Ak"$ @@@@@@@@@@@  AôK\r @A (µ "A  AjAøq  AI"Av"v" AqE\r @@  AsAq j"At"A´µ j"  (¼µ "("G\r A  A~ wq6µ    6   6 Aj!   Ar6  j" (Ar6 A (µ "M\r@  E\r @@   tA t" A   krqh"At"A´µ j" (¼µ " ("G\r A  A~ wq"6µ   6  6   Ar6   j"  k"Ar6   j 6 @ E\r  AxqA´µ j!A ( µ !@@ A Avt"q\r A   r6µ  ! (!  6  6  6  6  Aj! A  6 µ A  6µ A (µ "	E\r 	hAt(¼· "(Axq k! !@@@ (" \r  (" E\r  (Axq k"   I"!    !  !  (!\n@ ("  F\r  ("  6   6\n@@ ("E\r  Aj! ("E\r Aj!@ ! " Aj!  ("\r   Aj!  ("\r  A 6 	A!  A¿K\r   Aj"Axq!A (µ "\nE\r A!@  AôÿÿK\r  A& Avg" kvAq  AtkA>j!A  k!@@@@ At(¼· "\r A ! A !A !  A A Avk AFt!A !@@ (Axq k" O\r  ! ! \r A ! ! !    ("   AvAqj("F   !  At! ! \r @   r\r A !A t" A   kr \nq" E\r  hAt(¼· !   E\r@  (Axq k" I!@  ("\r   (!   !    ! !  \r  E\r  A (µ  kO\r  (!@ ("  F\r  ("  6   6@@ ("E\r  Aj! ("E\r Aj!@ ! " Aj!  ("\r   Aj!  ("\r  A 6 @A (µ "  I\r A ( µ !@@   k"AI\r   j" Ar6   j 6   Ar6   Ar6   j"   (Ar6A !A !A  6µ A  6 µ  Aj! 	@A (µ " M\r A   k"6µ A A (¤µ "  j"6¤µ   Ar6   Ar6  Aj! 	@@A (ä¸ E\r A (ì¸ !A B7ð¸ A B 7è¸ A  AjApqAØªÕªs6ä¸ A A 6ø¸ A A 6È¸ A !A !   A/j"j"A  k"q" M\rA ! @A (Ä¸ "E\r A (¼¸ " j"\n M\r	 \n K\r	@@A - È¸ Aq\r @@@@@A (¤µ "E\r AÌ¸ ! @@   ( "I\r     (jI\r  (" \r A ¸ "AF\r !@A (è¸ " Aj" qE\r   k  jA   kqj!  M\r@A (Ä¸ " E\r A (¼¸ " j" M\r   K\r ¸ "  G\r  k q"¸ "  (   (jF\r !   AF\r@  A0jI\r   !  kA (ì¸ "jA  kq"¸ AF\r  j!  ! AG\rA A (È¸ Ar6È¸  ¸ !A ¸ !  AF\r  AF\r   O\r   k" A(jM\rA A (¼¸  j" 6¼¸ @  A (À¸ M\r A   6À¸ @@A (¤µ "E\r AÌ¸ ! @   ( "  ("jF\r  (" \r @@A (µ " E\r    O\rA  6µ A ! A  6Ð¸ A  6Ì¸ A A6¬µ A A (ä¸ 6°µ A A 6Ø¸ @  At" A´µ j"6¼µ   6Àµ   Aj" A G\r A  AXj" Ax kAq"k"6µ A   j"6¤µ   Ar6   jA(6A A (ô¸ 6¨µ   O\r  I\r  (Aq\r    j6A  Ax kAq" j"6¤µ A A (µ  j"  k" 6µ    Ar6  jA(6A A (ô¸ 6¨µ A ! A ! @ A (µ O\r A  6µ   j!AÌ¸ ! @@@  ( " F\r  (" \r   - AqE\rAÌ¸ ! @@@   ( "I\r     (j"I\r  (!  A  AXj" Ax kAq"k"6µ A   j"6¤µ   Ar6   jA(6A A (ô¸ 6¨µ   A\' kAqjAQj"    AjI"A6 A )Ô¸ 7 A )Ì¸ 7A  Aj6Ô¸ A  6Ð¸ A  6Ì¸ A A 6Ø¸  Aj! @  A6  Aj!  Aj!   I\r   F\r   (A~q6   k"Ar6  6 @@ AÿK\r  AøqA´µ j! @@A (µ "A Avt"q\r A   r6µ   !  (!   6  6A!A!A! @ AÿÿÿK\r  A& Avg" kvAq  AtrA>s!    6 B 7  AtA¼· j!@@@A (µ "A  t"q\r A   r6µ   6   6 A A  Avk  AFt!  ( !@ "(Axq F\r  Av!  At!   Aqj"("\r  Aj 6   6A!A! ! !  ("  6  6   6A ! A!A!  j 6   j  6 A (µ "  M\r A    k"6µ A A (¤µ "  j"6¤µ   Ar6   Ar6  Aj! ± A06 A !    6     ( j6   µ ! @ E\r @@  ("At"(¼· G\r  A¼· j  6   \rA  \nA~ wq"\n6µ @@ ( G\r    6   6  E\r   6@ ("E\r    6   6 ("E\r    6   6@@ AK\r    j" Ar6   j"   (Ar6  Ar6  j" Ar6  j 6 @ AÿK\r  AøqA´µ j! @@A (µ "A Avt"q\r A   r6µ   !  (!   6  6   6  6A! @ AÿÿÿK\r  A& Avg" kvAq  AtrA>s!    6 B 7  AtA¼· j!@@@ \nA  t"q\r A  \n r6µ   6   6 A A  Avk  AFt!  ( !@ "(Axq F\r  Av!  At!   Aqj"("\r  Aj 6   6  6  6 ("  6  6 A 6  6   6 Aj! @ \nE\r @@  ("At"(¼· G\r  A¼· j  6   \rA  	A~ wq6µ @@ \n( G\r  \n  6 \n  6  E\r   \n6@ ("E\r    6   6 ("E\r    6   6@@ AK\r    j" Ar6   j"   (Ar6  Ar6  j" Ar6  j 6 @ E\r  AxqA´µ j!A ( µ ! @@A Avt" q\r A   r6µ  ! (!   6   6   6   6A  6 µ A  6µ  Aj!  Aj$   ¡  Ax  kAqj" Ar6 Ax kAqj"  j"k! @@ A (¤µ G\r A  6¤µ A A (µ   j"6µ   Ar6@ A ( µ G\r A  6 µ A A (µ   j"6µ   Ar6  j 6 @ ("AqAG\r  Axq! (!@@ AÿK\r @  ("G\r A A (µ A~ Avwq6µ   6  6 (!@@  F\r  (" 6  6@@@ ("E\r  Aj! ("E\r Aj!@ !	 "Aj! ("\r  Aj! ("\r  	A 6 A ! E\r @@  ("At"(¼· G\r  A¼· j 6  \rA A (µ A~ wq6µ @@ ( G\r   6  6 E\r  6@ ("E\r   6  6 ("E\r   6  6   j!   j"(!  A~q6   Ar6   j  6 @  AÿK\r   AøqA´µ j!@@A (µ "A  Avt" q\r A    r6µ  !  (!   6   6  6   6A!@  AÿÿÿK\r   A&  Avg"kvAq AtrA>s!  6 B 7 AtA¼· j!@@@A (µ "A t"q\r A   r6µ   6   6  A A Avk AFt! ( !@ "(Axq  F\r Av! At!  Aqj"("\r  Aj 6   6  6  6 (" 6  6 A 6  6  6 Aj\r@  E\r   Axj"  A|j( "Axq" j!@ Aq\r  AqE\r  ( "k"A (µ I\r   j! @@@@ A ( µ F\r  (!@ AÿK\r   ("G\rA A (µ A~ Avwq6µ  (!@  F\r  (" 6  6@@ ("E\r  Aj! ("E\r Aj!@ ! "Aj! ("\r  Aj! ("\r  A 6  ("AqAG\rA   6µ   A~q6   Ar6   6   6  6A ! E\r @@  ("At"(¼· G\r  A¼· j 6  \rA A (µ A~ wq6µ @@ ( G\r   6  6 E\r  6@ ("E\r   6  6 ("E\r   6  6  O\r  ("AqE\r @@@@@ Aq\r @ A (¤µ G\r A  6¤µ A A (µ   j" 6µ    Ar6 A ( µ G\rA A 6µ A A 6 µ @ A ( µ "G\r A  6 µ A A (µ   j" 6µ    Ar6   j  6  Axq  j!  (!@ AÿK\r @  ("G\r A A (µ A~ Avwq6µ   6  6 (!@  F\r  (" 6  6@@ ("E\r  Aj! ("E\r Aj!@ ! "Aj! ("\r  Aj! ("\r  A 6   A~q6   Ar6   j  6 A ! E\r @@  ("At"(¼· G\r  A¼· j 6  \rA A (µ A~ wq6µ @@ ( G\r   6  6 E\r  6@ ("E\r   6  6 ("E\r   6  6   Ar6   j  6   G\r A   6µ @  AÿK\r   AøqA´µ j!@@A (µ "A  Avt" q\r A    r6µ  !  (!   6   6  6   6A!@  AÿÿÿK\r   A&  Avg"kvAq AtrA>s!  6 B 7 AtA¼· j!@@@@A (µ "A t"q\r A   r6µ   6 A! A!  A A Avk AFt! ( !@ "(Axq  F\r Av! At!  Aqj"("\r  Aj 6 A! A! ! ! ! (" 6  6A !A! A!  j 6   6   j 6 A A (¬µ Aj"A 6¬µ  ? Atd~@@  ­B|BøÿÿÿA (ä´ " ­|"BÿÿÿÿV\r ·  §"O\r  \r± A06 AA  6ä´   \n   $ #   kApq"$   #   !@@  AqE\r @  -  \r     k  !@ Aj"AqE\r -  \r @ "Aj!A ( "k rAxqAxF\r @ "Aj! -  \r    k-@  ¼ Aj"´ "\r A     ³ 	   	 ¾  \n   ¶ \n   À    Y -  !@  -  "E\r   AÿqG\r @ - !  - "E\r Aj!  Aj!   AÿqF\r   Aÿqk\n   Â      Ä AÁ    Ä AÁ    Ä AÁ     A Ë 9 @ \r   ( (F@   G\r A  Ì  Ì Ã E   (# AÐ k"$ A!@@   A Ë \r A ! E\r A ! A¨£ AØ£ A Î "E\r  ( "E\r AjA A8ü  A: K A6    6  6 A6D  Aj A ( (  @ (,"AG\r   ($6  AF! AÐ j$   Aé¥ 6 Aç6 AÀ¤ 6 A¨¤  ¿  # Ak"$  Aj  Ï  (" A Ë ! (!@@ E\r       ( Ð !      Ñ "\r        Ò ! Aj$  /   ( "Axj( "6    j6    A|j( 6Ì# AÀ k"$ A !@@ A H\r  A  A  kF! A~F\r  B 7  6  6   6  6 B 7 B 7$ B 7, A 6< B74  Aj  AA  ( (   A  (AF! AÀ j$  º# AÀ k"$ A !@ A H\r    k"  H\r  B 7  6  6  6 B 7 B 7$ B 7, A 6< B74   6  Aj  AA  ( (    A  (! AÀ j$  ê# AÀ k"$   6  6   6  6A ! AjA A\'ü  A 6< A: ;  Aj AA  ( (  @@@ ((  (A  ($AFA  ( AFA  (,AF!@ (AF\r  (,\r ( AG\r ($AG\r (! AÀ j$  w@ ($"\r   6  6 A6$  (86@@ ( (8G\r  ( G\r  (AG\r  6 A: 6 A6  Aj6$% @   (A Ë E\r     Ó F @   (A Ë E\r     Ó   ("      ( (    A: 5@  (G\r  A: 4@@ ("\r  A6$  6  6 AG\r (0AF\r@  G\r @ ("AG\r   6 ! (0AG\r AF\r  ($Aj6$ A: 6  @  (G\r  (AF\r   6 @   ( Ë E\r     × @@   (  Ë E\r @@  (F\r   (G\r AG\r A6   6 @ (,AF\r  A ;4  ("    A   ( (  @ - 5AG\r  A6, - 4E\r A6,  6  ((Aj6( ($AG\r (AG\r A: 6  ("       ( (  ¤ @   ( Ë E\r     × @   (  Ë E\r @@  (F\r   (G\r AG\r A6   6  6   ((Aj6(@ ($AG\r  (AG\r  A: 6 A6,L @   ( Ë E\r      Ö   ("        ( (  \' @   ( Ë E\r      Ö \r   (½ Ý Aà« Aä¥  Aì« A¥ AA  Aø« A»¤ AAAÿ  A¬ A´¤ AAAÿ  A¬ A²¤ AA Aÿ A¬ A¤ AA~Aÿÿ A¨¬ A¤ AA Aÿÿ A´¬ A¤ AAxAÿÿÿÿ AÀ¬ A¤ AA A AÌ¬ A¡¥ AAxAÿÿÿÿ AØ¬ A¥ AA A Aä¬ A¥ ABBÿÿÿÿÿÿÿÿÿ  Að¬ A¥ AB B Aü¬ A¢¤ A A­ AÝ¥ A A´® A³¥  Aü® AA¦¥  AÄ¯ AA¿¥  A° AAÎ¥  A®  AÜ° A AÀ©  A± A Aª  A¬± AAÞ©  AÔ± AA¦  Aü± AA¬¦  A¤² AAÔ¦  AÌ² AAñ¦  Aô² AAªª  A³ AAÈª  A± A A×§  A¬± AA¶§  AÔ± AA¨  Aü± AA÷§  A¤² AA©  AÌ² AAý¨  AÄ³ AAÜ¨  Aì³ A	Aº¨  A´ AA§  A¼´ AAïª  C A A 6¹ A A 6¹ Ý A A (ü¸ 6¹ A A¹ 6ü¸ õ, Aã,            ù¢ DNn ü) ÑW\' Ý4õ bÛÀ < AC cQþ »Þ« ·aÅ :n$ ÒMB Ià 	ê. Ñ ëþ )± è>§ õ5 D». é ´&p A~_ Ö9 S9 ô9 _ (ù½ ø; Þÿ  /ï \nZ mm Ï~6 	Ë\' FO· f? -ê_ º\'u åëÇ ={ñ ÷9 R ûkê ±_ ] 0V {üF ð«k  ¼Ï 6ô ã© ^a æ e  _ @h Øÿ \'sM 1 ÊV É¨s {â` kÀ ÄG ÍgÃ 	èÜ Y* vÄ ¦ D¯Ý WÑ ¥> ÿ 3~? Â2è OÞ »}2 &=Ã kï ø^ 5: òÊ ñ |! j$| Õnú 0-w ;C µÆ Ã ­ÄÂ ,MA  ] }F ãq- Æ 3b  ´Ò| ´§ 7UÕ ×>ö £ Mvü d* p×« c|ø z°W ç ÀIV ;ÖÙ §8 $#Ë Öw ZT#  ¹ ñ\n Îß 1ÿ fj Wa ¬ûG ~Ø "e· 2è æ¿` ïÄÍ l6	 ]?Ô Þ× X;Þ Þ Ò"( (è âXM ÆÊ2 ã à}Ë ÀP ó§ à[ .4 b H õ[ ­° éò HJC gÓ ªÝØ ®_B jaÎ \n(¤ Ó´ ¦ò \\w £Â a< sx ¯Z o×½ -¦c ô¿Ë ï &Ág UÊE ÊÙ6 (¨Ò Âa Éw & F ÄYÄ ÈÅD M²  ó ÔC­ )Iå ýÕ  ¾ü Ì pÎî >õ ìñ ³çÃ Çø(  Áq> .	³ Eó  « { .µ GÂ {2/ Um r§ kç 1Ë yJ Ayâ ôß è âæ 1 ík __6 »ý H´ g¤l qrB ]2 ¸ ¼å	 1% ÷t9 0 \r Kh ,îX Gª tç ½Ö$ ÷}¦ nHr ï ¦ ´ö ÑSQ Ï\nò  3 õK~ ²ch Ý>_ @]  UR) 7dÀ mØ 2H2 [Lu NqÔ ETn 	Á *õi fÕ \' ]P ´;Û êvÅ ù Ik} \'º i) ÆÌ¬ ­T âj Ù ,rP ¤¾ w ó0p  ü\' êq¨ fÂI dà= Ý £? Cý \r 1AÞ 9 Ýp ·ç ß; 7+ \\  Z  èØ l¯ ÛÿK 8 Yv b¥ aË» Ç¹ @½ Òò Iu\' ë¶ö Û"» \nª &/ dv 	;3  Q:ª £Â ¯í® \\& mÂM -z ÀV ? 	ðö +@ m1 9´   ØÃ[ õÄ Æ­K NÊ¥ §7Í æ©6 « ÝBh cÞ vï hR üÛ7 ®¡« ß1  ®¡ ûÚ dMf í· )e0 WV¿ Gÿ: jù¹ u¾ó (ß «0 fö Ë ú" Ùä =³¤ W 6Í	 NBé ¾¤ 3#µ ðª Oe¨ ÒÁ¥ ? [xÍ #ùv { r Æ¦S onâ ïë  JX ÄÚ· ªfº vÏÏ Ñ ±ñ- Á Ã­w HÚ ÷]  Æô ¬ð/ Ýì ?\\¼ ÐÞm Ç *Û¶ £%:  ¯ ­S ¶W )-´ K~ Ú§ vª {Y¡ * Ü·- úåý Ûþ ¾ý ävl ©ü >p n ýÿ (> ag3 * M½ê ³ç¯ mn g9 1¿[ ×H 0ß Ç-C %a5 ÉpÎ 0Ë¸ ¿lý ¤ ¢ lä ZÝ  !oG bÒ ¹\\ paI kVà R PU7 Õ· 3ñÄ n_ ]0ä .© ²Ã ¡26 ·¤ ê±Ô ÷! iä \'ÿw  @- OÍ   ¥ ³¢Ó /]\n ´ùB ÚË }¾Ð ÛÁ «½ Ê¢ j\\ .U \' U ð á d A ¾Þ Úý* k%¶ {4 óþ ¹¿ hjO J*¨ OÄZ -ø¼ ×Z ôÇ \rM  :¦ ¤W_ ?± 8 Ì  qÝ ÉÞ¶ ¿`õ Me k °¬ ²ÀÐ QUH û rÃ £; À@5 Ü{ àEÌ N)ú ÖÊÈ èóA |dÞ dØ Ù¾1 ¤Ã wXÔ iãÅ ðÚ º:< FF Uu_ Ò½õ nÆ ¬.] Dí >B aÄ )ýé çÖó "|Ê o5 àÅ ÿ× njâ °ýÆ Á |]t k­² Ín >r{ Æj ÷Ï© )sß µÉº · Q â²\r tº$ å}` tØ \r,  ~f ) zv ýý¾ VEï Ù~6 ìÙ º¹ Äü 1¨\' ñnÃ Å6 Ø¨V ´¨µ ÏÌ - oW4 ,V Îã Ö ¹ k^ª >* _Ì ýJ áôû ;m â, éÔ ü´© ïîÑ .5É /9a 8!D ÙÈ ü\n ûJj /Ø S´ N T"Ì *UÜ ÀÆÖ  p¸ id &Z` ?Rî  ôµ üËõ 4¼- 4¼î è]Ì Ý^` g 3ï É¸ aX áW¼ QÆ Ø> ÝqH -Ý ¯¡ !,F Yó× Ùz TÀ Oú Vü åy® "6 8­" gÜ Uèª &8 Êç Q\r¤ 3± ©× iH e²ð § L ùÑ6 !³ {J Ï! @Ü ÜGU át: gëB þß ^Ô_ {g¤ º¬z Uö¢ +# AºU Yn !* 9G ãæ åÔ Iû@ ÿVé Ê ÅY ú+ ÓÁÅ ÅÏ ÛZ® GÅ Cb !; ,y a *L{ , C¿ & x< ¨Ää åÛ{ Ä:Â &ôê ÷g \r¿ e£+ =± ½| ¤QÜ \'Ýc iáÝ  ¨) hÎ( 	í´ D  NÊ pc ~|# ¹2 §õ Vç !ñ µ* o~M ¥Q µù« ßÖ Ýa 6 Ä: ¢¡ rím 9z ¸© k2\\ F\'[  4í Ò w üôU YM àq            @û!ù?    -Dt>   Fø<   `QÌx;   ð9   @ %z8   "ã6    ói5      ð?tÓ°Ùï?ùlXµï?Q[Ðï?{Q}<¸rï?ª¹h1Tï?8bunz8ï?áÞõï?·1\nþï?Ë©:7§ñî?"4L¦Þî?-a`Îî?\'*6ÕÚ¿î?OV+´î?)THÝ«î?U:°~¤î?Í;f î?t_ìèuî?ës¡î?ÎL¥î?Û *Bå¬î?åÅÍ°7·î?ð£Äî?]%>²Õî?­ÓZèî?G^ûòvÿî?RÝï?iïÜ 7ï?¤ûÜXï?_{3|ï?Ú¤¢¯¤ï?@En[vÐï?      èB#Køj¬?óÄúPÎ¿Î?ÖRÿB.æ?      8Cþ+eGG@#Køj¼>óÄúPÎ¿.?ÖRÿB.?¾óøyìaö?0[ÆþÞ¿=¯Jíqõ?¤üÔ2hÛ¿°ðð9ô?{·\nA×¿¸°Éó?{ÏméÓ¿¥d\ró?1¶òóÐ¿ {"^ò?ðz;|É¿?4JJ»ñ?<¯ãùÂ¿ºåðX#ñ?\\x¿Ë`¹¿§ A?ð?Î_G¶oª¿      ð?        ¬Gý`î?=õ$Ê8³? j³¤ì?º8T©vÄ?æüjW6 ë?ÒäÄJÎ?-ª¡cÑÂé?eÆðEÔ?íAxæè?ø,Ø?bHSõÜgç?Ì{±N¤àÜ?nIÉvÒ?zÆu i×¿Ýº§l\nÇÞ?Èö¾HGç¿+¸*eG÷?    St9type_info    Ä  ´    N10__cxxabiv116__shim_type_infoE    Ä  ä  ¨  N10__cxxabiv117__class_type_infoE unsigned short unsigned int float %s:%d: %s unsigned char /emsdk/emscripten/system/lib/libcxxabi/src/private_typeinfo.cpp bool unsigned long long unsigned long std::wstring std::string std::u16string std::u32string double void catching a class without an object? emscripten::memory_view<short> emscripten::memory_view<unsigned short> emscripten::memory_view<int> emscripten::memory_view<unsigned int> emscripten::memory_view<float> emscripten::memory_view<uint8_t> emscripten::memory_view<int8_t> emscripten::memory_view<uint16_t> emscripten::memory_view<int16_t> emscripten::memory_view<uint64_t> emscripten::memory_view<int64_t> emscripten::memory_view<uint32_t> emscripten::memory_view<int32_t> emscripten::memory_view<char> emscripten::memory_view<unsigned char> emscripten::memory_view<signed char> emscripten::memory_view<long> emscripten::memory_view<unsigned long> emscripten::memory_view<double>      ¬                 Ä  ¸  ¨  N10__cxxabiv123__fundamental_type_infoE   è  v     ô  b        c       h       a     $  s     0  t     <  i     H  j     T  l     `  m     l  x     x  y       f       d       Ø                    	   \n       ä                    \r      Ä  ð  Ø  N10__cxxabiv120__si_class_type_infoE         N10emscripten3valE    <  NSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE      NSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEEE    Ì  NSt3__212basic_stringIDsNS_11char_traitsIDsEENS_9allocatorIDsEEEE       NSt3__212basic_stringIDiNS_11char_traitsIDiEENS_9allocatorIDiEEEE     d  N10emscripten11memory_viewIcEE      N10emscripten11memory_viewIaEE    ´  N10emscripten11memory_viewIhEE    Ü  N10emscripten11memory_viewIsEE      N10emscripten11memory_viewItEE    ,  N10emscripten11memory_viewIiEE    T  N10emscripten11memory_viewIjEE    |  N10emscripten11memory_viewIlEE    ¤  N10emscripten11memory_viewImEE    Ì  N10emscripten11memory_viewIxEE    ô  N10emscripten11memory_viewIyEE      N10emscripten11memory_viewIfEE    D  N10emscripten11memory_viewIdEE  Aä4  target_features+bulk-memory+bulk-memory-opt+call-indirect-overlong+\nmultivalue+mutable-globals+nontrapping-fptoint+reference-types+sign-ext');
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

  

  var __abort_js = () =>
      abort('');

  var AsciiToString = (ptr) => {
      var str = '';
      while (1) {
        var ch = HEAPU8[ptr++];
        if (!ch) return str;
        str += String.fromCharCode(ch);
      }
    };
  
  var awaitingDependencies = {
  };
  
  var registeredTypes = {
  };
  
  var typeDependencies = {
  };
  
  var BindingError =  class BindingError extends Error { constructor(message) { super(message); this.name = 'BindingError'; }};
  var throwBindingError = (message) => { throw new BindingError(message); };
  /** @param {Object=} options */
  function sharedRegisterType(rawType, registeredInstance, options = {}) {
      var name = registeredInstance.name;
      if (!rawType) {
        throwBindingError(`type "${name}" must have a positive integer typeid pointer`);
      }
      if (registeredTypes.hasOwnProperty(rawType)) {
        if (options.ignoreDuplicateRegistrations) {
          return;
        } else {
          throwBindingError(`Cannot register type '${name}' twice`);
        }
      }
  
      registeredTypes[rawType] = registeredInstance;
      delete typeDependencies[rawType];
  
      if (awaitingDependencies.hasOwnProperty(rawType)) {
        var callbacks = awaitingDependencies[rawType];
        delete awaitingDependencies[rawType];
        callbacks.forEach((cb) => cb());
      }
    }
  /** @param {Object=} options */
  function registerType(rawType, registeredInstance, options = {}) {
      return sharedRegisterType(rawType, registeredInstance, options);
    }
  
  var integerReadValueFromPointer = (name, width, signed) => {
      // integers are quite common, so generate very specialized functions
      switch (width) {
        case 1: return signed ?
          (pointer) => HEAP8[pointer] :
          (pointer) => HEAPU8[pointer];
        case 2: return signed ?
          (pointer) => HEAP16[((pointer)>>1)] :
          (pointer) => HEAPU16[((pointer)>>1)]
        case 4: return signed ?
          (pointer) => HEAP32[((pointer)>>2)] :
          (pointer) => HEAPU32[((pointer)>>2)]
        case 8: return signed ?
          (pointer) => HEAP64[((pointer)>>3)] :
          (pointer) => HEAPU64[((pointer)>>3)]
        default:
          throw new TypeError(`invalid integer width (${width}): ${name}`);
      }
    };
  /** @suppress {globalThis} */
  var __embind_register_bigint = (primitiveType, name, size, minRange, maxRange) => {
      name = AsciiToString(name);
  
      const isUnsignedType = minRange === 0n;
  
      let fromWireType = (value) => value;
      if (isUnsignedType) {
        // uint64 get converted to int64 in ABI, fix them up like we do for 32-bit integers.
        const bitSize = size * 8;
        fromWireType = (value) => {
          return BigInt.asUintN(bitSize, value);
        }
        maxRange = fromWireType(maxRange);
      }
  
      registerType(primitiveType, {
        name,
        fromWireType: fromWireType,
        toWireType: (destructors, value) => {
          if (typeof value == "number") {
            value = BigInt(value);
          }
          return value;
        },
        readValueFromPointer: integerReadValueFromPointer(name, size, !isUnsignedType),
        destructorFunction: null, // This type does not need a destructor
      });
    };

  
  /** @suppress {globalThis} */
  var __embind_register_bool = (rawType, name, trueValue, falseValue) => {
      name = AsciiToString(name);
      registerType(rawType, {
        name,
        fromWireType: function(wt) {
          // ambiguous emscripten ABI: sometimes return values are
          // true or false, and sometimes integers (0 or 1)
          return !!wt;
        },
        toWireType: function(destructors, o) {
          return o ? trueValue : falseValue;
        },
        readValueFromPointer: function(pointer) {
          return this.fromWireType(HEAPU8[pointer]);
        },
        destructorFunction: null, // This type does not need a destructor
      });
    };

  
  var emval_freelist = [];
  
  var emval_handles = [0,1,,1,null,1,true,1,false,1];
  var __emval_decref = (handle) => {
      if (handle > 9 && 0 === --emval_handles[handle + 1]) {
        emval_handles[handle] = undefined;
        emval_freelist.push(handle);
      }
    };
  
  
  
  var Emval = {
  toValue:(handle) => {
        if (!handle) {
            throwBindingError(`Cannot use deleted val. handle = ${handle}`);
        }
        return emval_handles[handle];
      },
  toHandle:(value) => {
        switch (value) {
          case undefined: return 2;
          case null: return 4;
          case true: return 6;
          case false: return 8;
          default:{
            const handle = emval_freelist.pop() || emval_handles.length;
            emval_handles[handle] = value;
            emval_handles[handle + 1] = 1;
            return handle;
          }
        }
      },
  };
  
  /** @suppress {globalThis} */
  function readPointer(pointer) {
      return this.fromWireType(HEAPU32[((pointer)>>2)]);
    }
  var EmValType = {
      name: 'emscripten::val',
      fromWireType: (handle) => {
        var rv = Emval.toValue(handle);
        __emval_decref(handle);
        return rv;
      },
      toWireType: (destructors, value) => Emval.toHandle(value),
      readValueFromPointer: readPointer,
      destructorFunction: null, // This type does not need a destructor
  
      // TODO: do we need a deleteObject here?  write a test where
      // emval is passed into JS via an interface
    };
  var __embind_register_emval = (rawType) => registerType(rawType, EmValType);

  var floatReadValueFromPointer = (name, width) => {
      switch (width) {
        case 4: return function(pointer) {
          return this.fromWireType(HEAPF32[((pointer)>>2)]);
        };
        case 8: return function(pointer) {
          return this.fromWireType(HEAPF64[((pointer)>>3)]);
        };
        default:
          throw new TypeError(`invalid float width (${width}): ${name}`);
      }
    };
  
  
  var __embind_register_float = (rawType, name, size) => {
      name = AsciiToString(name);
      registerType(rawType, {
        name,
        fromWireType: (value) => value,
        toWireType: (destructors, value) => {
          // The VM will perform JS to Wasm value conversion, according to the spec:
          // https://www.w3.org/TR/wasm-js-api-1/#towebassemblyvalue
          return value;
        },
        readValueFromPointer: floatReadValueFromPointer(name, size),
        destructorFunction: null, // This type does not need a destructor
      });
    };

  
  
  /** @suppress {globalThis} */
  var __embind_register_integer = (primitiveType, name, size, minRange, maxRange) => {
      name = AsciiToString(name);
  
      const isUnsignedType = minRange === 0;
  
      let fromWireType = (value) => value;
      if (isUnsignedType) {
        var bitshift = 32 - 8*size;
        fromWireType = (value) => (value << bitshift) >>> bitshift;
        maxRange = fromWireType(maxRange);
      }
  
      registerType(primitiveType, {
        name,
        fromWireType: fromWireType,
        toWireType: (destructors, value) => {
          // The VM will perform JS to Wasm value conversion, according to the spec:
          // https://www.w3.org/TR/wasm-js-api-1/#towebassemblyvalue
          return value;
        },
        readValueFromPointer: integerReadValueFromPointer(name, size, minRange !== 0),
        destructorFunction: null, // This type does not need a destructor
      });
    };

  
  var __embind_register_memory_view = (rawType, dataTypeIndex, name) => {
      var typeMapping = [
        Int8Array,
        Uint8Array,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array,
        BigInt64Array,
        BigUint64Array,
      ];
  
      var TA = typeMapping[dataTypeIndex];
  
      function decodeMemoryView(handle) {
        var size = HEAPU32[((handle)>>2)];
        var data = HEAPU32[(((handle)+(4))>>2)];
        return new TA(HEAP8.buffer, data, size);
      }
  
      name = AsciiToString(name);
      registerType(rawType, {
        name,
        fromWireType: decodeMemoryView,
        readValueFromPointer: decodeMemoryView,
      }, {
        ignoreDuplicateRegistrations: true,
      });
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
  var __embind_register_std_string = (rawType, name) => {
      name = AsciiToString(name);
      var stdStringIsUTF8 = true;
  
      registerType(rawType, {
        name,
        // For some method names we use string keys here since they are part of
        // the public/external API and/or used by the runtime-generated code.
        fromWireType(value) {
          var length = HEAPU32[((value)>>2)];
          var payload = value + 4;
  
          var str;
          if (stdStringIsUTF8) {
            str = UTF8ToString(payload, length, true);
          } else {
            str = '';
            for (var i = 0; i < length; ++i) {
              str += String.fromCharCode(HEAPU8[payload + i]);
            }
          }
  
          _free(value);
  
          return str;
        },
        toWireType(destructors, value) {
          if (value instanceof ArrayBuffer) {
            value = new Uint8Array(value);
          }
  
          var length;
          var valueIsOfTypeString = (typeof value == 'string');
  
          // We accept `string` or array views with single byte elements
          if (!(valueIsOfTypeString || (ArrayBuffer.isView(value) && value.BYTES_PER_ELEMENT == 1))) {
            throwBindingError('Cannot pass non-string to std::string');
          }
          if (stdStringIsUTF8 && valueIsOfTypeString) {
            length = lengthBytesUTF8(value);
          } else {
            length = value.length;
          }
  
          // assumes POINTER_SIZE alignment
          var base = _malloc(4 + length + 1);
          var ptr = base + 4;
          HEAPU32[((base)>>2)] = length;
          if (valueIsOfTypeString) {
            if (stdStringIsUTF8) {
              stringToUTF8(value, ptr, length + 1);
            } else {
              for (var i = 0; i < length; ++i) {
                var charCode = value.charCodeAt(i);
                if (charCode > 255) {
                  _free(base);
                  throwBindingError('String has UTF-16 code units that do not fit in 8 bits');
                }
                HEAPU8[ptr + i] = charCode;
              }
            }
          } else {
            HEAPU8.set(value, ptr);
          }
  
          if (destructors !== null) {
            destructors.push(_free, base);
          }
          return base;
        },
        readValueFromPointer: readPointer,
        destructorFunction(ptr) {
          _free(ptr);
        },
      });
    };

  
  
  
  var UTF16Decoder = globalThis.TextDecoder ? new TextDecoder('utf-16le') : undefined;;
  
  var UTF16ToString = (ptr, maxBytesToRead, ignoreNul) => {
      var idx = ((ptr)>>1);
      var endIdx = findStringEnd(HEAPU16, idx, maxBytesToRead / 2, ignoreNul);
  
      // When using conditional TextDecoder, skip it for short strings as the overhead of the native call is not worth it.
      if (endIdx - idx > 16 && UTF16Decoder)
        return UTF16Decoder.decode(HEAPU16.subarray(idx, endIdx));
  
      // Fallback: decode without UTF16Decoder
      var str = '';
  
      // If maxBytesToRead is not passed explicitly, it will be undefined, and the
      // for-loop's condition will always evaluate to true. The loop is then
      // terminated on the first null char.
      for (var i = idx; i < endIdx; ++i) {
        var codeUnit = HEAPU16[i];
        // fromCharCode constructs a character from a UTF-16 code unit, so we can
        // pass the UTF16 string right through.
        str += String.fromCharCode(codeUnit);
      }
  
      return str;
    };
  
  var stringToUTF16 = (str, outPtr, maxBytesToWrite) => {
      // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
      maxBytesToWrite ??= 0x7FFFFFFF;
      if (maxBytesToWrite < 2) return 0;
      maxBytesToWrite -= 2; // Null terminator.
      var startPtr = outPtr;
      var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
      for (var i = 0; i < numCharsToWrite; ++i) {
        // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
        var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
        HEAP16[((outPtr)>>1)] = codeUnit;
        outPtr += 2;
      }
      // Null-terminate the pointer to the HEAP.
      HEAP16[((outPtr)>>1)] = 0;
      return outPtr - startPtr;
    };
  
  var lengthBytesUTF16 = (str) => str.length*2;
  
  var UTF32ToString = (ptr, maxBytesToRead, ignoreNul) => {
      var str = '';
      var startIdx = ((ptr)>>2);
      // If maxBytesToRead is not passed explicitly, it will be undefined, and this
      // will always evaluate to true. This saves on code size.
      for (var i = 0; !(i >= maxBytesToRead / 4); i++) {
        var utf32 = HEAPU32[startIdx + i];
        if (!utf32 && !ignoreNul) break;
        str += String.fromCodePoint(utf32);
      }
      return str;
    };
  
  var stringToUTF32 = (str, outPtr, maxBytesToWrite) => {
      // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
      maxBytesToWrite ??= 0x7FFFFFFF;
      if (maxBytesToWrite < 4) return 0;
      var startPtr = outPtr;
      var endPtr = startPtr + maxBytesToWrite - 4;
      for (var i = 0; i < str.length; ++i) {
        var codePoint = str.codePointAt(i);
        // Gotcha: if codePoint is over 0xFFFF, it is represented as a surrogate pair in UTF-16.
        // We need to manually skip over the second code unit for correct iteration.
        if (codePoint > 0xFFFF) {
          i++;
        }
        HEAP32[((outPtr)>>2)] = codePoint;
        outPtr += 4;
        if (outPtr + 4 > endPtr) break;
      }
      // Null-terminate the pointer to the HEAP.
      HEAP32[((outPtr)>>2)] = 0;
      return outPtr - startPtr;
    };
  
  var lengthBytesUTF32 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        var codePoint = str.codePointAt(i);
        // Gotcha: if codePoint is over 0xFFFF, it is represented as a surrogate pair in UTF-16.
        // We need to manually skip over the second code unit for correct iteration.
        if (codePoint > 0xFFFF) {
          i++;
        }
        len += 4;
      }
  
      return len;
    };
  var __embind_register_std_wstring = (rawType, charSize, name) => {
      name = AsciiToString(name);
      var decodeString, encodeString, lengthBytesUTF;
      if (charSize === 2) {
        decodeString = UTF16ToString;
        encodeString = stringToUTF16;
        lengthBytesUTF = lengthBytesUTF16;
      } else {
        decodeString = UTF32ToString;
        encodeString = stringToUTF32;
        lengthBytesUTF = lengthBytesUTF32;
      }
      registerType(rawType, {
        name,
        fromWireType: (value) => {
          // Code mostly taken from _embind_register_std_string fromWireType
          var length = HEAPU32[((value)>>2)];
          var str = decodeString(value + 4, length * charSize, true);
  
          _free(value);
  
          return str;
        },
        toWireType: (destructors, value) => {
          if (!(typeof value == 'string')) {
            throwBindingError(`Cannot pass non-string to C++ string type ${name}`);
          }
  
          // assumes POINTER_SIZE alignment
          var length = lengthBytesUTF(value);
          var ptr = _malloc(4 + length + charSize);
          HEAPU32[((ptr)>>2)] = length / charSize;
  
          encodeString(value, ptr + 4, length + charSize);
  
          if (destructors !== null) {
            destructors.push(_free, ptr);
          }
          return ptr;
        },
        readValueFromPointer: readPointer,
        destructorFunction(ptr) {
          _free(ptr);
        }
      });
    };

  
  var __embind_register_void = (rawType, name) => {
      name = AsciiToString(name);
      registerType(rawType, {
        isVoid: true, // void return values can be optimized out sometimes
        name,
        fromWireType: () => undefined,
        // TODO: assert if anything else is given?
        toWireType: (destructors, o) => undefined,
      });
    };

  var getHeapMax = () =>
      // Stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate
      // full 4GB Wasm memories, the size will wrap back to 0 bytes in Wasm side
      // for any code that deals with heap sizes, which would require special
      // casing all heap size related code to treat 0 specially.
      2147483648;
  
  var alignMemory = (size, alignment) => {
      return Math.ceil(size / alignment) * alignment;
    };
  
  var growMemory = (size) => {
      var oldHeapSize = wasmMemory.buffer.byteLength;
      var pages = ((size - oldHeapSize + 65535) / 65536) | 0;
      try {
        // round size grow request up to wasm page size (fixed 64KB per spec)
        wasmMemory.grow(pages); // .grow() takes a delta compared to the previous size
        updateMemoryViews();
        return 1 /*success*/;
      } catch(e) {
      }
      // implicit 0 return to save code size (caller will cast "undefined" into 0
      // anyhow)
    };
  var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      requestedSize >>>= 0;
      // With multithreaded builds, races can happen (another thread might increase the size
      // in between), so return a failure, and let the caller retry.
  
      // Memory resize rules:
      // 1.  Always increase heap size to at least the requested size, rounded up
      //     to next page multiple.
      // 2a. If MEMORY_GROWTH_LINEAR_STEP == -1, excessively resize the heap
      //     geometrically: increase the heap size according to
      //     MEMORY_GROWTH_GEOMETRIC_STEP factor (default +20%), At most
      //     overreserve by MEMORY_GROWTH_GEOMETRIC_CAP bytes (default 96MB).
      // 2b. If MEMORY_GROWTH_LINEAR_STEP != -1, excessively resize the heap
      //     linearly: increase the heap size by at least
      //     MEMORY_GROWTH_LINEAR_STEP bytes.
      // 3.  Max size for the heap is capped at 2048MB-WASM_PAGE_SIZE, or by
      //     MAXIMUM_MEMORY, or by ASAN limit, depending on which is smallest
      // 4.  If we were unable to allocate as much memory, it may be due to
      //     over-eager decision to excessively reserve due to (3) above.
      //     Hence if an allocation fails, cut down on the amount of excess
      //     growth, in an attempt to succeed to perform a smaller allocation.
  
      // A limit is set for how much we can grow. We should not exceed that
      // (the wasm binary specifies it, so if we tried, we'd fail anyhow).
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        return false;
      }
  
      // Loop through potential heap size increases. If we attempt a too eager
      // reservation that fails, cut down on the attempted size and reserve a
      // smaller bump instead. (max 3 times, chosen somewhat arbitrarily)
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown); // ensure geometric growth
        // but limit overreserving (default to capping at +96MB overgrowth at most)
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296 );
  
        var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
  
        var replacement = growMemory(newSize);
        if (replacement) {
  
          return true;
        }
      }
      return false;
    };

  var getCFunc = (ident) => {
      var func = Module['_' + ident]; // closure exported function
      return func;
    };
  
  var writeArrayToMemory = (array, buffer) => {
      HEAP8.set(array, buffer);
    };
  
  
  
  var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
  var stringToUTF8OnStack = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
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

  
  
    /**
   * @param {string=} returnType
   * @param {Array=} argTypes
   * @param {Object=} opts
   */
  var cwrap = (ident, returnType, argTypes, opts) => {
      // When the function takes numbers and returns a number, we can just return
      // the original function
      var numericArgs = !argTypes || argTypes.every((type) => type === 'number' || type === 'boolean');
      var numericRet = returnType !== 'string';
      if (numericRet && numericArgs && !opts) {
        return getCFunc(ident);
      }
      return (...args) => ccall(ident, returnType, argTypes, args, opts);
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
  Module['cwrap'] = cwrap;
  // End runtime exports
  // Begin JS library exports
  // End JS library exports

// end include: postlibrary.js


// Imports from the Wasm binary.
var _fade,
  _lerp,
  _grad,
  _noise,
  _init_c_arrays,
  _free,
  _malloc,
  _propagate_light_c,
  _calculate_wave_c,
  _calculate_heat_distortion_c,
  _get_lightmap_value_c,
  _set_lightmap_value_c,
  _increment_frame_counter,
  _get_frame_counter,
  _free_c_arrays,
  ___getTypeName,
  __emscripten_stack_restore,
  __emscripten_stack_alloc,
  _emscripten_stack_get_current,
  memory,
  __indirect_function_table,
  wasmMemory;


function assignWasmExports(wasmExports) {
  _fade = Module['_fade'] = wasmExports['fade'];
  _lerp = Module['_lerp'] = wasmExports['lerp'];
  _grad = Module['_grad'] = wasmExports['grad'];
  _noise = Module['_noise'] = wasmExports['noise'];
  _init_c_arrays = Module['_init_c_arrays'] = wasmExports['init_c_arrays'];
  _free = wasmExports['free'];
  _malloc = wasmExports['malloc'];
  _propagate_light_c = Module['_propagate_light_c'] = wasmExports['propagate_light_c'];
  _calculate_wave_c = Module['_calculate_wave_c'] = wasmExports['calculate_wave_c'];
  _calculate_heat_distortion_c = Module['_calculate_heat_distortion_c'] = wasmExports['calculate_heat_distortion_c'];
  _get_lightmap_value_c = Module['_get_lightmap_value_c'] = wasmExports['get_lightmap_value_c'];
  _set_lightmap_value_c = Module['_set_lightmap_value_c'] = wasmExports['set_lightmap_value_c'];
  _increment_frame_counter = Module['_increment_frame_counter'] = wasmExports['increment_frame_counter'];
  _get_frame_counter = Module['_get_frame_counter'] = wasmExports['get_frame_counter'];
  _free_c_arrays = Module['_free_c_arrays'] = wasmExports['free_c_arrays'];
  ___getTypeName = wasmExports['__getTypeName'];
  __emscripten_stack_restore = wasmExports['_emscripten_stack_restore'];
  __emscripten_stack_alloc = wasmExports['_emscripten_stack_alloc'];
  _emscripten_stack_get_current = wasmExports['emscripten_stack_get_current'];
  memory = wasmMemory = wasmExports['memory'];
  __indirect_function_table = wasmExports['__indirect_function_table'];
}

var wasmImports = {
  /** @export */
  _abort_js: __abort_js,
  /** @export */
  _embind_register_bigint: __embind_register_bigint,
  /** @export */
  _embind_register_bool: __embind_register_bool,
  /** @export */
  _embind_register_emval: __embind_register_emval,
  /** @export */
  _embind_register_float: __embind_register_float,
  /** @export */
  _embind_register_integer: __embind_register_integer,
  /** @export */
  _embind_register_memory_view: __embind_register_memory_view,
  /** @export */
  _embind_register_std_string: __embind_register_std_string,
  /** @export */
  _embind_register_std_wstring: __embind_register_std_wstring,
  /** @export */
  _embind_register_void: __embind_register_void,
  /** @export */
  emscripten_resize_heap: _emscripten_resize_heap
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































// xVS_beta.js (real function start at here) - Hybrid version: v2 Light + v3 Liquids & Physics + WASM Acceleration
// Stable light glow (v2 style) + advanced wave/caustic/heat effects (v3 style)
// No camX/camY, immediate startup effects, accelerated light propagation via WASM
// ============================================================================
// CONFIGURATION
// ============================================================================
const CONFIG = {
    // Light (v2 style)
    lightmapScale:          1.5,
    lightSourceBoost:       6.5,
    falloff:                0.95,
    lightBlur:              0.9,
    initialPropagationSteps: 8,

    // Liquids & Physics (v3 style)
    waveOctaves:            7,
    waveSpeed:              0.05,
    turbulenceThreshold:    0.38,
    foamHeightThreshold:    0.18,
    causticIntensity:       1.0,
    physicsRefraction:      0.4,
    heatThreshold:          480,
    gasHeatThreshold:       320,
    maxHeatDistortion:      0.18,
    sparkleThreshold:       0.75,
};

// ============================================================================
// GLOBALS
// ============================================================================
let lightmap = [];
let nextLightmap = [];
let lightCanvas, lightCtx, tempCanvas, tempCtx;
let gridWidth = 0, gridHeight = 0;
let frameCount = 0;
let isFirstFrame = true;

// --- WASM Integration Variables ---
let wasmReady = false;

// ============================================================================
// HELPERS
// ============================================================================
function rgbToArray(c) {
    if (!c || typeof c !== "string") return [255,255,255];
    if (c.startsWith("#")) {
        let hex = c.slice(1);
        if (hex.length === 3) hex = hex.split('').map(x=>x+x).join('');
        return [
            parseInt(hex.substr(0,2),16),
            parseInt(hex.substr(2,2),16),
            parseInt(hex.substr(4,2),16)
        ];
    }
    let m = c.match(/\d+/g);
    return m ? m.map(Number) : [255,255,255];
}
function arrayToRgb(a) {
    return `rgb(${Math.round(a[0])},${Math.round(a[1])},${Math.round(a[2])})`;
}

// ============================================================================
// LIGHTMAP - v2 style (simple & reliable) + WASM Acceleration
// ============================================================================
function initLightmap(w, h) {
    gridWidth = w; gridHeight = h;
    let lw = Math.ceil(w / CONFIG.lightmapScale) + 4;
    let lh = Math.ceil(h / CONFIG.lightmapScale) + 4;
    lightmap = Array.from({length: lh}, () => Array(lw).fill().map(() => ({color: [0,0,0]})));
    nextLightmap = Array.from({length: lh}, () => Array(lw).fill().map(() => ({color: [0,0,0]})));

    lightCanvas = document.createElement('canvas');
    lightCanvas.width = lw; lightCanvas.height = lh;
    lightCtx = lightCanvas.getContext('2d', {alpha: true});

    tempCanvas = document.createElement('canvas');
    tempCanvas.width = lw; tempCanvas.height = lh;
    tempCtx = tempCanvas.getContext('2d', {alpha: true});
}

function emitFromPixel(pixel) {
    if (!pixel || !pixel.color) return;
    let x = Math.floor(pixel.x / CONFIG.lightmapScale) + 2;
    let y = Math.floor(pixel.y / CONFIG.lightmapScale) + 2;
    if (x < 0 || y < 0 || x >= lightmap[0]?.length || y >= lightmap?.length) return;
    let boost = CONFIG.lightSourceBoost * (1 + Math.max(0, (pixel.temp - 300) / 1500) * 2.5);
    let col = rgbToArray(pixel.color);
    lightmap[y][x].color = col.map(v => Math.min(765, v * boost));
}

// --- Propagate Light using WASM or JavaScript Fallback ---
function propagateLight() {
    if (!lightmap.length) return;
    const w = lightmap[0].length;
    const h = lightmap.length;
    const total = w * h;

    if (wasmReady && Module) {
        try {
            // Prepare TypedArrays for input and output
            const inR = new Float32Array(total);
            const inG = new Float32Array(total);
            const inB = new Float32Array(total);
            const outR = new Float32Array(total);
            const outG = new Float32Array(total);
            const outB = new Float32Array(total);

            // Populate input arrays from the current lightmap
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const idx = y * w + x;
                    const c = lightmap[y][x].color;
                    inR[idx] = c[0] || 0;
                    inG[idx] = c[1] || 0;
                    inB[idx] = c[2] || 0;
                }
            }

            // Call the WASM function
            Module.ccall(
                'propagate_lightmap_f32', // Name of the C function
                null,                     // Return type (void)
                ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'], // Argument types
                [ // Arguments
                    Module.HEAPF32.subarray(inR.byteOffset / 4, inR.byteOffset / 4 + total), // Input R
                    Module.HEAPF32.subarray(inG.byteOffset / 4, inG.byteOffset / 4 + total), // Input G
                    Module.HEAPF32.subarray(inB.byteOffset / 4, inB.byteOffset / 4 + total), // Input B
                    Module.HEAPF32.subarray(outR.byteOffset / 4, outR.byteOffset / 4 + total), // Output R
                    Module.HEAPF32.subarray(outG.byteOffset / 4, outG.byteOffset / 4 + total), // Output G
                    Module.HEAPF32.subarray(outB.byteOffset / 4, outB.byteOffset / 4 + total), // Output B
                    w, h, CONFIG.falloff // Width, Height, Falloff
                ]
            );

            // Copy results from output arrays back to the nextLightmap
            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const idx = y * w + x;
                    nextLightmap[y][x].color = [outR[idx], outG[idx], outB[idx]];
                }
            }
        } catch (e) {
            console.error("WASM light propagation failed", e);
            wasmReady = false; // Disable WASM for subsequent calls
            return propagateLightJS(); // Fall back to JS
        }
    } else {
        // Fall back to JavaScript implementation if WASM is not ready or failed
        return propagateLightJS();
    }

    // Swap the lightmaps (current becomes next after WASM/JS calculation)
    [lightmap, nextLightmap] = [nextLightmap, lightmap];
}

// --- JavaScript Fallback for Light Propagation ---
function propagateLightJS() {
    if (!lightmap.length) return;
    const w = lightmap[0].length, h = lightmap.length;
    const dirs = [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]];
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            let sum = [0,0,0], count = 0;
            dirs.forEach(([dx,dy]) => {
                let nx = x + dx, ny = y + dy;
                if (nx >= 0 && ny >= 0 && nx < w && ny < h) {
                    sum[0] += lightmap[ny][nx].color[0];
                    sum[1] += lightmap[ny][nx].color[1];
                    sum[2] += lightmap[ny][nx].color[2];
                    count++;
                }
            });
            if (count) {
                const f = CONFIG.falloff / count;
                nextLightmap[y][x].color = [
                    Math.min(765, sum[0] * f),
                    Math.min(765, sum[1] * f),
                    Math.min(765, sum[2] * f)
                ];
            }
        }
    }
    [lightmap, nextLightmap] = [nextLightmap, lightmap];
}

function updateLightCanvas() {
    lightCtx.clearRect(0, 0, lightCanvas.width, lightCanvas.height);
    const lw = lightmap[0].length, lh = lightmap.length;
    for (let y = 0; y < lh; y++) {
        for (let x = 0; x < lw; x++) {
            const c = lightmap[y][x].color;
            const bright = (c[0] + c[1] + c[2]) / (765 * 3);
            if (bright > 0.01) {
                const r = Math.min(255, c[0] / 3);
                const g = Math.min(255, c[1] / 3);
                const b = Math.min(255, c[2] / 3);
                lightCtx.globalAlpha = Math.min(1, bright * 0.55);
                lightCtx.fillStyle = `rgb(${r},${g},${b})`;
                lightCtx.fillRect(x, y, 1, 1);
            }
        }
    }
}

function renderLightmap(ctx) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(lightCanvas, 0, 0);

    if (CONFIG.lightBlur > 0) {
        tempCtx.filter = `blur(${CONFIG.lightBlur}px)`;
        tempCtx.drawImage(lightCanvas, 0, 0);
        tempCtx.filter = 'none';
    }

    const scaleFactor = CONFIG.lightmapScale * pixelSize;
    const offsetX = (width * pixelSize - lightCanvas.width * scaleFactor) / 2;
    const offsetY = (height * pixelSize - lightCanvas.height * scaleFactor) / 2;

    ctx.drawImage(tempCanvas, offsetX, offsetY,
                  lightCanvas.width * scaleFactor,
                  lightCanvas.height * scaleFactor);
    ctx.restore();

    // First-frame ambient fallback
    if (isFirstFrame && frameCount < 5) {
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = '#404055';
        ctx.fillRect(0, 0, width * pixelSize, height * pixelSize);
        ctx.globalAlpha = 1;
    }
}

// Bootstrap - immediate light visibility
function bootstrapLightmap() {
    if (!width || !height || !currentPixels?.length) return;
    currentPixels.forEach(p => {
        if (p.temp > 550 || ["fire", "lava", "plasma", "sun", "magma", "light", "liquid_light", "laser"].includes(p.element)) {
            emitFromPixel(p);
        }
    });

    for (let i = 0; i < CONFIG.initialPropagationSteps; i++) {
        propagateLight(); // Use the potentially WASM-accelerated version here too
    }

    updateLightCanvas();
}

// ============================================================================
// LIQUIDS & PHYSICS - v3 style (unchanged from original)
// ============================================================================
function renderLiquidAndPhysics(pixel, ctx) {
    const el = elements[pixel.element];
    if (!el) return;
    const t = pixelTicks * CONFIG.waveSpeed;

    // ──────────────────────────────────────────────
    // LIQUID WAVES + FOAM + CAUSTICS + REFRACTION
    // ──────────────────────────────────────────────
    if (el.state === "liquid") {
        let wx = pixel.x * 0.12, wy = pixel.y * 0.09;
        let height = 0, dx = 0, dy = 0;

        for (let o = 0; o < CONFIG.waveOctaves; o++) {
            let freq = 0.16 * Math.pow(1.8, o);
            let amp = 0.38 / (o + 1);
            let phase = t + wx * freq + wy * freq * 0.55;
            height += Math.sin(phase) * amp;
            dx += Math.cos(phase) * amp * freq * 0.35;
            dy += Math.sin(phase) * amp * freq * 0.25;
        }

        const surfaceY = pixel.y + height * 0.65;

        // Foam
        const turb = Math.abs(height) + Math.abs(dx) + Math.abs(dy);
        if (turb > CONFIG.turbulenceThreshold && Math.abs(height) > CONFIG.foamHeightThreshold) {
            const foamA = Math.min(0.9, turb * 0.85);
            drawSquare(ctx, "#f8fbff", pixel.x + dx * 0.4, surfaceY, 1.15, foamA * 0.6);
        }

        // Caustics + refraction
        let lx = Math.floor(pixel.x / CONFIG.lightmapScale) + 2;
        let ly = Math.floor(pixel.y / CONFIG.lightmapScale) + 2;
        let lightInt = 0;
        if (lightmap[ly]?.[lx]) {
            let lm = lightmap[ly][lx].color;
            lightInt = (lm[0] + lm[1] + lm[2]) / (765 * 3);
        }

        if (lightInt > 0.22) {
            const noise = Math.sin(pixel.x * 0.45 + t * 0.22) * Math.cos(pixel.y * 0.55 + t * 0.18);
            const cy = pixel.y + 0.5 + noise * CONFIG.causticIntensity;
             drawSquare(ctx, "#00eeff", pixel.x + noise * 0.7, cy, 1, lightInt * 0.75 * (noise * 0.5 + 0.5));

            const hue = (t * 0.6 + noise * 3) % 360;
            ctx.globalAlpha = lightInt * CONFIG.physicsRefraction * 0.35;
            ctx.fillStyle = `hsl(${hue}, 85%, 65%)`;
            drawSquare(ctx, ctx.fillStyle, pixel.x, pixel.y, 1.1, 0.45);
            ctx.globalAlpha = 1;
        }
    }

    // ──────────────────────────────────────────────
    // HEAT DISTORTION + SPARKLE + FOG
    // ──────────────────────────────────────────────
    const temp = pixel.temp || 20;

    if (temp > CONFIG.heatThreshold || (el.state === "gas" && temp > CONFIG.gasHeatThreshold)) {
        let distort = Math.min(1, (temp - 300) / 1800) * CONFIG.maxHeatDistortion;
        if (distort > 0) {
            let noise = Math.sin(t * 0.17 + pixel.x * 0.25 + pixel.y * 0.13);
            ctx.globalAlpha = distort * 0.28;
            ctx.fillStyle = `rgba(255,${180 + 75 * noise},80, 0.85)`;
            ctx.fillRect(
                (pixel.x + noise * distort * 2.5) * pixelSize,
                pixel.y * pixelSize,
                pixelSize * 1.5,
                pixelSize * 1.5
             );
            ctx.globalAlpha = 1;
        }
    }

    let lx = Math.floor(pixel.x / CONFIG.lightmapScale) + 2;
    let ly = Math.floor(pixel.y / CONFIG.lightmapScale) + 2;
    let lightInt = lightmap[ly]?.[lx] ? (lightmap[ly][lx].color.reduce((a,b)=>a+b,0) / (765*3)) : 0;

    if (lightInt > 0.45 && (el.hardness < 12 || el.category === "crystals" || ["ice", "glass", "diamond", "crystal"].includes(pixel.element))) {
        if (Math.sin(pixelTicks * 0.55 + pixel.x * 1.2 + pixel.y * 1.1) > CONFIG.sparkleThreshold) {
            drawSquare(ctx, "#ffffff", pixel.x + 0.4, pixel.y + 0.4, 0.5, lightInt * 1.1);
        }
    }

    if (el.state === "gas" && lightInt < 0.25) {
        ctx.globalAlpha = (0.28 - lightInt) * 0.45;
        ctx.fillStyle = "#333344";
        ctx.fillRect(pixel.x * pixelSize, pixel.y * pixelSize, pixelSize, pixelSize);
        ctx.globalAlpha = 1;
    }
}

// ============================================================================
// HOOKS & INITIALIZATION
// ============================================================================

// --- WASM Loading ---
// Note: This assumes the WASM module file (e.g., xVS_kernel.js) is loaded BEFORE this script.
// The global Module object is created by the Emscripten-generated JS file.
if (typeof Module !== 'undefined' && Module !== null) {
    Module.onRuntimeInitialized = () => {
        wasmReady = true;
        console.log("[xVS] WASM Module Ready - Accelerated light propagation active");
    };
} else {
    console.warn("[xVS] WASM Module (xVS_kernel.js) not found. Using JavaScript fallback for light propagation.");
}

// --- Rendering Hooks ---
renderPrePixel(ctx => {
    if (!paused) propagateLight(); // This call now uses WASM if available
    updateLightCanvas();
    renderLightmap(ctx);
});

renderEachPixel((pixel, ctx) => {
    renderLiquidAndPhysics(pixel, ctx);
});

runAfterReset(() => {
    initLightmap(width, height);
    bootstrapLightmap();
    isFirstFrame = true;
    console.log("[xVS] Reset complete - v2 light + v3 physics + WASM acceleration ready");
});

runEveryTick(() => {
    frameCount++; // Increment frame counter for animations
    if (width !== gridWidth || height !== gridHeight) {
        initLightmap(width, height);
        bootstrapLightmap();
    }
});

// Emitters
const emitters = [
 "fire",  "cold_fire",  "plasma",  "lava",  "magma",  "sun",  "light",  "liquid_light ",
 "laser",  "flash",  "rainbow",  "ember",  "explosion",  "n_explosion",  "supernova ",
 "fireball",  "blaster",  "lightning",  "electric",  "neon",  "led",  "torch "
];
emitters.forEach(name => {
    if (elements[name]?.tick) {
        let old = elements[name].tick;
        elements[name].tick = function(pixel) {
            old?.(pixel);
            emitFromPixel(pixel);
        };
    }
});

runPerPixel(pixel => {
    if (pixel.temp > 550) emitFromPixel(pixel);
}, 3);

console.log("[xVS] Loaded - v2 light + v3 liquids/physics + WASM-accelerated light propagation");
