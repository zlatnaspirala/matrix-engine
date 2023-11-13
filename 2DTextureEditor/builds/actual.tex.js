(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _visualJs = require("visual-js");

// Final build
// For dev stage
// import {sys, ActivateModifiers,  loadEditor, runEditor, loadEditorObjects} from 'visual-js';
// npm run build.tex.editor
// BUILD FROM EDITOR TO REAL JS FILE
// It is auto-generated file ./starter/visual.js [from cache/ folder]
// If you wanna multiply use of texture editor
// just rename ./starter/actual.final.js
// and then use `sys.SCRIPT.LOAD("starter/actual.final.js").then(() => {`
// Lets make another texture editor file...
// DISABLE NOW EDITOR
var runTextureEditor = curTexId => {
  // Visual-JS 3 part
  // must be fixed - double call
  if (typeof window.RESOURCE !== 'undefined') return; // Final build

  _visualJs.application.EDITOR = false;
  (0, _visualJs.ActivateModifiers)(); // Run editor
  // runEditor();
  // loadEditor(); - this load keyboard and other gui staff no need now.

  _visualJs.sys.DOM.CREATE_SURFACE("SURF", curTexId, 100, 99.4, "DIAMETRIC");

  actualTexture.ENGINE.CREATE_MODUL("STARTER");
  /**
   * @description
   * Create non-editor game objects here (from code)
   */

  let smodul = actualTexture.ENGINE.MODULES.ACCESS_MODULE("STARTER"); // smodul.NEW_OBJECT("IamNewObject", 25, 50, 12, 25, 10);
  // Run editor only !
  // loadEditorObjects();

  _visualJs.sys.SCRIPT.LOAD("res/animations/resource.js").then(() => {
    // addEventListener('postScriptReady', () => {
    _visualJs.sys.SCRIPT.LOAD("starter/actual.final.js").then(() => {
      // Access
      console.log("window.parent.matrixEngine.App.scene.outsideBox.streamTextures ", window.parent.matrixEngine.App.scene.outsideBox.streamTextures);
      var posGreen = new _visualJs.sys.MATH.OSCILLATOR(10, 80, 1);
      var posBlend1 = new _visualJs.sys.MATH.OSCILLATOR(-30, 120, 2);
      pilLeft.ANIMATION.ROTATE.ANGLE = 90;
      pilRight.ANIMATION.ROTATE.ANGLE = 90;
      pilLeft.POSITION.SET_POSITION(-185, 230);
      text1.TEXTBOX.font = '33px stormfaze';
      title.TEXTBOX.font = '43px stormfaze'; // VJS3 Staff

      pilLeft.ON_UPDATE = function () {
        test.ANIMATION.ROTATE.ANGLE++;
        pilGreen.POSITION.TRANSLATE(8, posGreen.UPDATE());
        blend1.POSITION.TRANSLATE(8, posBlend1.UPDATE());
      };
    });
  });
}; // Automatic run


runTextureEditor('actualTexture'); // Easy console access

window.runTextureEditor = runTextureEditor;

},{"visual-js":40}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Emitter = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */
function Emitter(obj) {
  if (obj) return mixin(obj);
}
/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */


function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }

  return obj;
}
/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */


Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
  return this;
};
/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */


Emitter.prototype.once = function (event, fn) {
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};
/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */


Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {}; // all

  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  } // specific event


  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this; // remove all handlers

  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  } // remove specific handler


  var cb;

  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];

    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  } // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.


  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};
/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */


Emitter.prototype.emit = function (event) {
  this._callbacks = this._callbacks || {};
  var args = new Array(arguments.length - 1),
      callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);

    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
}; // alias used for reserved events (protected method)


Emitter.prototype.emitReserved = Emitter.prototype.emit;
/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function (event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};
/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */


Emitter.prototype.hasListeners = function (event) {
  return !!this.listeners(event).length;
};

},{}],3:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],4:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":3,"buffer":4,"ieee754":26}],5:[function(require,module,exports){
(function (process){(function (){
/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = require('./common')(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};

}).call(this)}).call(this,require('_process'))
},{"./common":6,"_process":28}],6:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = require('ms');
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => enableOverride === null ? createDebug.enabled(namespace) : enableOverride,
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;

},{"ms":27}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasCORS = void 0;
// imported from https://github.com/component/has-cors
let value = false;
try {
    value = typeof XMLHttpRequest !== 'undefined' &&
        'withCredentials' in new XMLHttpRequest();
}
catch (err) {
    // if XMLHttp support is disabled in IE then it will throw
    // when trying to create
}
exports.hasCORS = value;

},{}],8:[function(require,module,exports){
"use strict";
// imported from https://github.com/galkn/querystring
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = void 0;
function encode(obj) {
    let str = '';
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (str.length)
                str += '&';
            str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
        }
    }
    return str;
}
exports.encode = encode;
/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */
function decode(qs) {
    let qry = {};
    let pairs = qs.split('&');
    for (let i = 0, l = pairs.length; i < l; i++) {
        let pair = pairs[i].split('=');
        qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
}
exports.decode = decode;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
// imported from https://github.com/galkn/parseuri
/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */
const re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
const parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];
function parse(str) {
    const src = str, b = str.indexOf('['), e = str.indexOf(']');
    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }
    let m = re.exec(str || ''), uri = {}, i = 14;
    while (i--) {
        uri[parts[i]] = m[i] || '';
    }
    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }
    uri.pathNames = pathNames(uri, uri['path']);
    uri.queryKey = queryKey(uri, uri['query']);
    return uri;
}
exports.parse = parse;
function pathNames(obj, path) {
    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
    if (path.substr(0, 1) == '/' || path.length === 0) {
        names.splice(0, 1);
    }
    if (path.substr(path.length - 1, 1) == '/') {
        names.splice(names.length - 1, 1);
    }
    return names;
}
function queryKey(uri, query) {
    const data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
        if ($1) {
            data[$1] = $2;
        }
    });
    return data;
}

},{}],10:[function(require,module,exports){
// imported from https://github.com/unshiftio/yeast
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.yeast = exports.decode = exports.encode = void 0;
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''), length = 64, map = {};
let seed = 0, i = 0, prev;
/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
    let encoded = '';
    do {
        encoded = alphabet[num % length] + encoded;
        num = Math.floor(num / length);
    } while (num > 0);
    return encoded;
}
exports.encode = encode;
/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
    let decoded = 0;
    for (i = 0; i < str.length; i++) {
        decoded = decoded * length + map[str.charAt(i)];
    }
    return decoded;
}
exports.decode = decode;
/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
    const now = encode(+new Date());
    if (now !== prev)
        return seed = 0, prev = now;
    return now + '.' + encode(seed++);
}
exports.yeast = yeast;
//
// Map each character to its index.
//
for (; i < length; i++)
    map[alphabet[i]] = i;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalThisShim = void 0;
exports.globalThisShim = (() => {
    if (typeof self !== "undefined") {
        return self;
    }
    else if (typeof window !== "undefined") {
        return window;
    }
    else {
        return Function("return this")();
    }
})();

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.installTimerFunctions = exports.transports = exports.Transport = exports.protocol = exports.Socket = void 0;
const socket_js_1 = require("./socket.js");
Object.defineProperty(exports, "Socket", { enumerable: true, get: function () { return socket_js_1.Socket; } });
exports.protocol = socket_js_1.Socket.protocol;
var transport_js_1 = require("./transport.js");
Object.defineProperty(exports, "Transport", { enumerable: true, get: function () { return transport_js_1.Transport; } });
var index_js_1 = require("./transports/index.js");
Object.defineProperty(exports, "transports", { enumerable: true, get: function () { return index_js_1.transports; } });
var util_js_1 = require("./util.js");
Object.defineProperty(exports, "installTimerFunctions", { enumerable: true, get: function () { return util_js_1.installTimerFunctions; } });
var parseuri_js_1 = require("./contrib/parseuri.js");
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return parseuri_js_1.parse; } });

},{"./contrib/parseuri.js":9,"./socket.js":13,"./transport.js":14,"./transports/index.js":15,"./util.js":20}],13:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
const index_js_1 = require("./transports/index.js");
const util_js_1 = require("./util.js");
const parseqs_js_1 = require("./contrib/parseqs.js");
const parseuri_js_1 = require("./contrib/parseuri.js");
const debug_1 = __importDefault(require("debug")); // debug()
const component_emitter_1 = require("@socket.io/component-emitter");
const engine_io_parser_1 = require("engine.io-parser");
const debug = (0, debug_1.default)("engine.io-client:socket"); // debug()
class Socket extends component_emitter_1.Emitter {
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri or options
     * @param {Object} opts - options
     * @api public
     */
    constructor(uri, opts = {}) {
        super();
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = null;
        }
        if (uri) {
            uri = (0, parseuri_js_1.parse)(uri);
            opts.hostname = uri.host;
            opts.secure = uri.protocol === "https" || uri.protocol === "wss";
            opts.port = uri.port;
            if (uri.query)
                opts.query = uri.query;
        }
        else if (opts.host) {
            opts.hostname = (0, parseuri_js_1.parse)(opts.host).host;
        }
        (0, util_js_1.installTimerFunctions)(this, opts);
        this.secure =
            null != opts.secure
                ? opts.secure
                : typeof location !== "undefined" && "https:" === location.protocol;
        if (opts.hostname && !opts.port) {
            // if no port is specified manually, use the protocol default
            opts.port = this.secure ? "443" : "80";
        }
        this.hostname =
            opts.hostname ||
                (typeof location !== "undefined" ? location.hostname : "localhost");
        this.port =
            opts.port ||
                (typeof location !== "undefined" && location.port
                    ? location.port
                    : this.secure
                        ? "443"
                        : "80");
        this.transports = opts.transports || ["polling", "websocket"];
        this.readyState = "";
        this.writeBuffer = [];
        this.prevBufferLen = 0;
        this.opts = Object.assign({
            path: "/engine.io",
            agent: false,
            withCredentials: false,
            upgrade: true,
            timestampParam: "t",
            rememberUpgrade: false,
            rejectUnauthorized: true,
            perMessageDeflate: {
                threshold: 1024
            },
            transportOptions: {},
            closeOnBeforeunload: true
        }, opts);
        this.opts.path = this.opts.path.replace(/\/$/, "") + "/";
        if (typeof this.opts.query === "string") {
            this.opts.query = (0, parseqs_js_1.decode)(this.opts.query);
        }
        // set on handshake
        this.id = null;
        this.upgrades = null;
        this.pingInterval = null;
        this.pingTimeout = null;
        // set on heartbeat
        this.pingTimeoutTimer = null;
        if (typeof addEventListener === "function") {
            if (this.opts.closeOnBeforeunload) {
                // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
                // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
                // closed/reloaded)
                addEventListener("beforeunload", () => {
                    if (this.transport) {
                        // silently close the transport
                        this.transport.removeAllListeners();
                        this.transport.close();
                    }
                }, false);
            }
            if (this.hostname !== "localhost") {
                this.offlineEventListener = () => {
                    this.onClose("transport close", {
                        description: "network connection lost"
                    });
                };
                addEventListener("offline", this.offlineEventListener, false);
            }
        }
        this.open();
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} transport name
     * @return {Transport}
     * @api private
     */
    createTransport(name) {
        debug('creating transport "%s"', name);
        const query = Object.assign({}, this.opts.query);
        // append engine.io protocol identifier
        query.EIO = engine_io_parser_1.protocol;
        // transport name
        query.transport = name;
        // session id if we already have one
        if (this.id)
            query.sid = this.id;
        const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
            query,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port
        });
        debug("options: %j", opts);
        return new index_js_1.transports[name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @api private
     */
    open() {
        let transport;
        if (this.opts.rememberUpgrade &&
            Socket.priorWebsocketSuccess &&
            this.transports.indexOf("websocket") !== -1) {
            transport = "websocket";
        }
        else if (0 === this.transports.length) {
            // Emit error on next tick so it can be listened to
            this.setTimeoutFn(() => {
                this.emitReserved("error", "No transports available");
            }, 0);
            return;
        }
        else {
            transport = this.transports[0];
        }
        this.readyState = "opening";
        // Retry with the next transport if the transport is disabled (jsonp: false)
        try {
            transport = this.createTransport(transport);
        }
        catch (e) {
            debug("error while creating transport: %s", e);
            this.transports.shift();
            this.open();
            return;
        }
        transport.open();
        this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @api private
     */
    setTransport(transport) {
        debug("setting transport %s", transport.name);
        if (this.transport) {
            debug("clearing existing transport %s", this.transport.name);
            this.transport.removeAllListeners();
        }
        // set up transport
        this.transport = transport;
        // set up transport listeners
        transport
            .on("drain", this.onDrain.bind(this))
            .on("packet", this.onPacket.bind(this))
            .on("error", this.onError.bind(this))
            .on("close", reason => this.onClose("transport close", reason));
    }
    /**
     * Probes a transport.
     *
     * @param {String} transport name
     * @api private
     */
    probe(name) {
        debug('probing transport "%s"', name);
        let transport = this.createTransport(name);
        let failed = false;
        Socket.priorWebsocketSuccess = false;
        const onTransportOpen = () => {
            if (failed)
                return;
            debug('probe transport "%s" opened', name);
            transport.send([{ type: "ping", data: "probe" }]);
            transport.once("packet", msg => {
                if (failed)
                    return;
                if ("pong" === msg.type && "probe" === msg.data) {
                    debug('probe transport "%s" pong', name);
                    this.upgrading = true;
                    this.emitReserved("upgrading", transport);
                    if (!transport)
                        return;
                    Socket.priorWebsocketSuccess = "websocket" === transport.name;
                    debug('pausing current transport "%s"', this.transport.name);
                    this.transport.pause(() => {
                        if (failed)
                            return;
                        if ("closed" === this.readyState)
                            return;
                        debug("changing transport and sending upgrade packet");
                        cleanup();
                        this.setTransport(transport);
                        transport.send([{ type: "upgrade" }]);
                        this.emitReserved("upgrade", transport);
                        transport = null;
                        this.upgrading = false;
                        this.flush();
                    });
                }
                else {
                    debug('probe transport "%s" failed', name);
                    const err = new Error("probe error");
                    // @ts-ignore
                    err.transport = transport.name;
                    this.emitReserved("upgradeError", err);
                }
            });
        };
        function freezeTransport() {
            if (failed)
                return;
            // Any callback called by transport should be ignored since now
            failed = true;
            cleanup();
            transport.close();
            transport = null;
        }
        // Handle any error that happens while probing
        const onerror = err => {
            const error = new Error("probe error: " + err);
            // @ts-ignore
            error.transport = transport.name;
            freezeTransport();
            debug('probe transport "%s" failed because of error: %s', name, err);
            this.emitReserved("upgradeError", error);
        };
        function onTransportClose() {
            onerror("transport closed");
        }
        // When the socket is closed while we're probing
        function onclose() {
            onerror("socket closed");
        }
        // When the socket is upgraded while we're probing
        function onupgrade(to) {
            if (transport && to.name !== transport.name) {
                debug('"%s" works - aborting "%s"', to.name, transport.name);
                freezeTransport();
            }
        }
        // Remove all listeners on the transport and on self
        const cleanup = () => {
            transport.removeListener("open", onTransportOpen);
            transport.removeListener("error", onerror);
            transport.removeListener("close", onTransportClose);
            this.off("close", onclose);
            this.off("upgrading", onupgrade);
        };
        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        transport.open();
    }
    /**
     * Called when connection is deemed open.
     *
     * @api private
     */
    onOpen() {
        debug("socket open");
        this.readyState = "open";
        Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
        this.emitReserved("open");
        this.flush();
        // we check for `readyState` in case an `open`
        // listener already closed the socket
        if ("open" === this.readyState &&
            this.opts.upgrade &&
            this.transport.pause) {
            debug("starting upgrade probes");
            let i = 0;
            const l = this.upgrades.length;
            for (; i < l; i++) {
                this.probe(this.upgrades[i]);
            }
        }
    }
    /**
     * Handles a packet.
     *
     * @api private
     */
    onPacket(packet) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
            this.emitReserved("packet", packet);
            // Socket is live - any packet counts
            this.emitReserved("heartbeat");
            switch (packet.type) {
                case "open":
                    this.onHandshake(JSON.parse(packet.data));
                    break;
                case "ping":
                    this.resetPingTimeout();
                    this.sendPacket("pong");
                    this.emitReserved("ping");
                    this.emitReserved("pong");
                    break;
                case "error":
                    const err = new Error("server error");
                    // @ts-ignore
                    err.code = packet.data;
                    this.onError(err);
                    break;
                case "message":
                    this.emitReserved("data", packet.data);
                    this.emitReserved("message", packet.data);
                    break;
            }
        }
        else {
            debug('packet received with socket readyState "%s"', this.readyState);
        }
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @api private
     */
    onHandshake(data) {
        this.emitReserved("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this.upgrades = this.filterUpgrades(data.upgrades);
        this.pingInterval = data.pingInterval;
        this.pingTimeout = data.pingTimeout;
        this.maxPayload = data.maxPayload;
        this.onOpen();
        // In case open handler closes socket
        if ("closed" === this.readyState)
            return;
        this.resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @api private
     */
    resetPingTimeout() {
        this.clearTimeoutFn(this.pingTimeoutTimer);
        this.pingTimeoutTimer = this.setTimeoutFn(() => {
            this.onClose("ping timeout");
        }, this.pingInterval + this.pingTimeout);
        if (this.opts.autoUnref) {
            this.pingTimeoutTimer.unref();
        }
    }
    /**
     * Called on `drain` event
     *
     * @api private
     */
    onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen);
        // setting prevBufferLen = 0 is very important
        // for example, when upgrading, upgrade packet is sent over,
        // and a nonzero prevBufferLen could cause problems on `drain`
        this.prevBufferLen = 0;
        if (0 === this.writeBuffer.length) {
            this.emitReserved("drain");
        }
        else {
            this.flush();
        }
    }
    /**
     * Flush write buffers.
     *
     * @api private
     */
    flush() {
        if ("closed" !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length) {
            const packets = this.getWritablePackets();
            debug("flushing %d packets in socket", packets.length);
            this.transport.send(packets);
            // keep track of current length of writeBuffer
            // splice writeBuffer and callbackBuffer on `drain`
            this.prevBufferLen = packets.length;
            this.emitReserved("flush");
        }
    }
    /**
     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
     * long-polling)
     *
     * @private
     */
    getWritablePackets() {
        const shouldCheckPayloadSize = this.maxPayload &&
            this.transport.name === "polling" &&
            this.writeBuffer.length > 1;
        if (!shouldCheckPayloadSize) {
            return this.writeBuffer;
        }
        let payloadSize = 1; // first packet type
        for (let i = 0; i < this.writeBuffer.length; i++) {
            const data = this.writeBuffer[i].data;
            if (data) {
                payloadSize += (0, util_js_1.byteLength)(data);
            }
            if (i > 0 && payloadSize > this.maxPayload) {
                debug("only send %d out of %d packets", i, this.writeBuffer.length);
                return this.writeBuffer.slice(0, i);
            }
            payloadSize += 2; // separator + packet type
        }
        debug("payload size is %d (max: %d)", payloadSize, this.maxPayload);
        return this.writeBuffer;
    }
    /**
     * Sends a message.
     *
     * @param {String} message.
     * @param {Function} callback function.
     * @param {Object} options.
     * @return {Socket} for chaining.
     * @api public
     */
    write(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    send(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} callback function.
     * @api private
     */
    sendPacket(type, data, options, fn) {
        if ("function" === typeof data) {
            fn = data;
            data = undefined;
        }
        if ("function" === typeof options) {
            fn = options;
            options = null;
        }
        if ("closing" === this.readyState || "closed" === this.readyState) {
            return;
        }
        options = options || {};
        options.compress = false !== options.compress;
        const packet = {
            type: type,
            data: data,
            options: options
        };
        this.emitReserved("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn)
            this.once("flush", fn);
        this.flush();
    }
    /**
     * Closes the connection.
     *
     * @api public
     */
    close() {
        const close = () => {
            this.onClose("forced close");
            debug("socket closing - telling transport to close");
            this.transport.close();
        };
        const cleanupAndClose = () => {
            this.off("upgrade", cleanupAndClose);
            this.off("upgradeError", cleanupAndClose);
            close();
        };
        const waitForUpgrade = () => {
            // wait for upgrade to finish since we can't send packets while pausing a transport
            this.once("upgrade", cleanupAndClose);
            this.once("upgradeError", cleanupAndClose);
        };
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            if (this.writeBuffer.length) {
                this.once("drain", () => {
                    if (this.upgrading) {
                        waitForUpgrade();
                    }
                    else {
                        close();
                    }
                });
            }
            else if (this.upgrading) {
                waitForUpgrade();
            }
            else {
                close();
            }
        }
        return this;
    }
    /**
     * Called upon transport error
     *
     * @api private
     */
    onError(err) {
        debug("socket error %j", err);
        Socket.priorWebsocketSuccess = false;
        this.emitReserved("error", err);
        this.onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @api private
     */
    onClose(reason, description) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            debug('socket close with reason: "%s"', reason);
            // clear timers
            this.clearTimeoutFn(this.pingTimeoutTimer);
            // stop event from firing again for transport
            this.transport.removeAllListeners("close");
            // ensure transport won't stay open
            this.transport.close();
            // ignore further transport communication
            this.transport.removeAllListeners();
            if (typeof removeEventListener === "function") {
                removeEventListener("offline", this.offlineEventListener, false);
            }
            // set ready state
            this.readyState = "closed";
            // clear session id
            this.id = null;
            // emit close event
            this.emitReserved("close", reason, description);
            // clean buffers after, so users can still
            // grab the buffers on `close` event
            this.writeBuffer = [];
            this.prevBufferLen = 0;
        }
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} server upgrades
     * @api private
     *
     */
    filterUpgrades(upgrades) {
        const filteredUpgrades = [];
        let i = 0;
        const j = upgrades.length;
        for (; i < j; i++) {
            if (~this.transports.indexOf(upgrades[i]))
                filteredUpgrades.push(upgrades[i]);
        }
        return filteredUpgrades;
    }
}
exports.Socket = Socket;
Socket.protocol = engine_io_parser_1.protocol;

},{"./contrib/parseqs.js":8,"./contrib/parseuri.js":9,"./transports/index.js":15,"./util.js":20,"@socket.io/component-emitter":2,"debug":5,"engine.io-parser":25}],14:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = void 0;
const engine_io_parser_1 = require("engine.io-parser");
const component_emitter_1 = require("@socket.io/component-emitter");
const util_js_1 = require("./util.js");
const debug_1 = __importDefault(require("debug")); // debug()
const debug = (0, debug_1.default)("engine.io-client:transport"); // debug()
class TransportError extends Error {
    constructor(reason, description, context) {
        super(reason);
        this.description = description;
        this.context = context;
        this.type = "TransportError";
    }
}
class Transport extends component_emitter_1.Emitter {
    /**
     * Transport abstract constructor.
     *
     * @param {Object} options.
     * @api private
     */
    constructor(opts) {
        super();
        this.writable = false;
        (0, util_js_1.installTimerFunctions)(this, opts);
        this.opts = opts;
        this.query = opts.query;
        this.readyState = "";
        this.socket = opts.socket;
    }
    /**
     * Emits an error.
     *
     * @param {String} reason
     * @param description
     * @param context - the error context
     * @return {Transport} for chaining
     * @api protected
     */
    onError(reason, description, context) {
        super.emitReserved("error", new TransportError(reason, description, context));
        return this;
    }
    /**
     * Opens the transport.
     *
     * @api public
     */
    open() {
        if ("closed" === this.readyState || "" === this.readyState) {
            this.readyState = "opening";
            this.doOpen();
        }
        return this;
    }
    /**
     * Closes the transport.
     *
     * @api public
     */
    close() {
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.doClose();
            this.onClose();
        }
        return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     * @api public
     */
    send(packets) {
        if ("open" === this.readyState) {
            this.write(packets);
        }
        else {
            // this might happen if the transport was silently closed in the beforeunload event handler
            debug("transport is not open, discarding packets");
        }
    }
    /**
     * Called upon open
     *
     * @api protected
     */
    onOpen() {
        this.readyState = "open";
        this.writable = true;
        super.emitReserved("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @api protected
     */
    onData(data) {
        const packet = (0, engine_io_parser_1.decodePacket)(data, this.socket.binaryType);
        this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     *
     * @api protected
     */
    onPacket(packet) {
        super.emitReserved("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @api protected
     */
    onClose(details) {
        this.readyState = "closed";
        super.emitReserved("close", details);
    }
}
exports.Transport = Transport;

},{"./util.js":20,"@socket.io/component-emitter":2,"debug":5,"engine.io-parser":25}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transports = void 0;
const polling_js_1 = require("./polling.js");
const websocket_js_1 = require("./websocket.js");
exports.transports = {
    websocket: websocket_js_1.WS,
    polling: polling_js_1.Polling
};

},{"./polling.js":16,"./websocket.js":18}],16:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = exports.Polling = void 0;
const transport_js_1 = require("../transport.js");
const debug_1 = __importDefault(require("debug")); // debug()
const yeast_js_1 = require("../contrib/yeast.js");
const parseqs_js_1 = require("../contrib/parseqs.js");
const engine_io_parser_1 = require("engine.io-parser");
const xmlhttprequest_js_1 = require("./xmlhttprequest.js");
const component_emitter_1 = require("@socket.io/component-emitter");
const util_js_1 = require("../util.js");
const globalThis_js_1 = require("../globalThis.js");
const debug = (0, debug_1.default)("engine.io-client:polling"); // debug()
function empty() { }
const hasXHR2 = (function () {
    const xhr = new xmlhttprequest_js_1.XHR({
        xdomain: false
    });
    return null != xhr.responseType;
})();
class Polling extends transport_js_1.Transport {
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @api public
     */
    constructor(opts) {
        super(opts);
        this.polling = false;
        if (typeof location !== "undefined") {
            const isSSL = "https:" === location.protocol;
            let port = location.port;
            // some user agents have empty `location.port`
            if (!port) {
                port = isSSL ? "443" : "80";
            }
            this.xd =
                (typeof location !== "undefined" &&
                    opts.hostname !== location.hostname) ||
                    port !== opts.port;
            this.xs = opts.secure !== isSSL;
        }
        /**
         * XHR supports binary
         */
        const forceBase64 = opts && opts.forceBase64;
        this.supportsBinary = hasXHR2 && !forceBase64;
    }
    /**
     * Transport name.
     */
    get name() {
        return "polling";
    }
    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @api private
     */
    doOpen() {
        this.poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} callback upon buffers are flushed and transport is paused
     * @api private
     */
    pause(onPause) {
        this.readyState = "pausing";
        const pause = () => {
            debug("paused");
            this.readyState = "paused";
            onPause();
        };
        if (this.polling || !this.writable) {
            let total = 0;
            if (this.polling) {
                debug("we are currently polling - waiting to pause");
                total++;
                this.once("pollComplete", function () {
                    debug("pre-pause polling complete");
                    --total || pause();
                });
            }
            if (!this.writable) {
                debug("we are currently writing - waiting to pause");
                total++;
                this.once("drain", function () {
                    debug("pre-pause writing complete");
                    --total || pause();
                });
            }
        }
        else {
            pause();
        }
    }
    /**
     * Starts polling cycle.
     *
     * @api public
     */
    poll() {
        debug("polling");
        this.polling = true;
        this.doPoll();
        this.emitReserved("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @api private
     */
    onData(data) {
        debug("polling got data %s", data);
        const callback = packet => {
            // if its the first message we consider the transport open
            if ("opening" === this.readyState && packet.type === "open") {
                this.onOpen();
            }
            // if its a close packet, we close the ongoing requests
            if ("close" === packet.type) {
                this.onClose({ description: "transport closed by the server" });
                return false;
            }
            // otherwise bypass onData and handle the message
            this.onPacket(packet);
        };
        // decode payload
        (0, engine_io_parser_1.decodePayload)(data, this.socket.binaryType).forEach(callback);
        // if an event did not trigger closing
        if ("closed" !== this.readyState) {
            // if we got data we're not polling
            this.polling = false;
            this.emitReserved("pollComplete");
            if ("open" === this.readyState) {
                this.poll();
            }
            else {
                debug('ignoring poll - transport state "%s"', this.readyState);
            }
        }
    }
    /**
     * For polling, send a close packet.
     *
     * @api private
     */
    doClose() {
        const close = () => {
            debug("writing close packet");
            this.write([{ type: "close" }]);
        };
        if ("open" === this.readyState) {
            debug("transport open - closing");
            close();
        }
        else {
            // in case we're trying to close while
            // handshaking is in progress (GH-164)
            debug("transport not open - deferring close");
            this.once("open", close);
        }
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} data packets
     * @param {Function} drain callback
     * @api private
     */
    write(packets) {
        this.writable = false;
        (0, engine_io_parser_1.encodePayload)(packets, data => {
            this.doWrite(data, () => {
                this.writable = true;
                this.emitReserved("drain");
            });
        });
    }
    /**
     * Generates uri for connection.
     *
     * @api private
     */
    uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "https" : "http";
        let port = "";
        // cache busting is forced
        if (false !== this.opts.timestampRequests) {
            query[this.opts.timestampParam] = (0, yeast_js_1.yeast)();
        }
        if (!this.supportsBinary && !query.sid) {
            query.b64 = 1;
        }
        // avoid port if default for schema
        if (this.opts.port &&
            (("https" === schema && Number(this.opts.port) !== 443) ||
                ("http" === schema && Number(this.opts.port) !== 80))) {
            port = ":" + this.opts.port;
        }
        const encodedQuery = (0, parseqs_js_1.encode)(query);
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return (schema +
            "://" +
            (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
            port +
            this.opts.path +
            (encodedQuery.length ? "?" + encodedQuery : ""));
    }
    /**
     * Creates a request.
     *
     * @param {String} method
     * @api private
     */
    request(opts = {}) {
        Object.assign(opts, { xd: this.xd, xs: this.xs }, this.opts);
        return new Request(this.uri(), opts);
    }
    /**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @api private
     */
    doWrite(data, fn) {
        const req = this.request({
            method: "POST",
            data: data
        });
        req.on("success", fn);
        req.on("error", (xhrStatus, context) => {
            this.onError("xhr post error", xhrStatus, context);
        });
    }
    /**
     * Starts a poll cycle.
     *
     * @api private
     */
    doPoll() {
        debug("xhr poll");
        const req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", (xhrStatus, context) => {
            this.onError("xhr poll error", xhrStatus, context);
        });
        this.pollXhr = req;
    }
}
exports.Polling = Polling;
class Request extends component_emitter_1.Emitter {
    /**
     * Request constructor
     *
     * @param {Object} options
     * @api public
     */
    constructor(uri, opts) {
        super();
        (0, util_js_1.installTimerFunctions)(this, opts);
        this.opts = opts;
        this.method = opts.method || "GET";
        this.uri = uri;
        this.async = false !== opts.async;
        this.data = undefined !== opts.data ? opts.data : null;
        this.create();
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @api private
     */
    create() {
        const opts = (0, util_js_1.pick)(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this.opts.xd;
        opts.xscheme = !!this.opts.xs;
        const xhr = (this.xhr = new xmlhttprequest_js_1.XHR(opts));
        try {
            debug("xhr open %s: %s", this.method, this.uri);
            xhr.open(this.method, this.uri, this.async);
            try {
                if (this.opts.extraHeaders) {
                    xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
                    for (let i in this.opts.extraHeaders) {
                        if (this.opts.extraHeaders.hasOwnProperty(i)) {
                            xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
                        }
                    }
                }
            }
            catch (e) { }
            if ("POST" === this.method) {
                try {
                    xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
                }
                catch (e) { }
            }
            try {
                xhr.setRequestHeader("Accept", "*/*");
            }
            catch (e) { }
            // ie6 check
            if ("withCredentials" in xhr) {
                xhr.withCredentials = this.opts.withCredentials;
            }
            if (this.opts.requestTimeout) {
                xhr.timeout = this.opts.requestTimeout;
            }
            xhr.onreadystatechange = () => {
                if (4 !== xhr.readyState)
                    return;
                if (200 === xhr.status || 1223 === xhr.status) {
                    this.onLoad();
                }
                else {
                    // make sure the `error` event handler that's user-set
                    // does not throw in the same tick and gets caught here
                    this.setTimeoutFn(() => {
                        this.onError(typeof xhr.status === "number" ? xhr.status : 0);
                    }, 0);
                }
            };
            debug("xhr data %s", this.data);
            xhr.send(this.data);
        }
        catch (e) {
            // Need to defer since .create() is called directly from the constructor
            // and thus the 'error' event can only be only bound *after* this exception
            // occurs.  Therefore, also, we cannot throw here at all.
            this.setTimeoutFn(() => {
                this.onError(e);
            }, 0);
            return;
        }
        if (typeof document !== "undefined") {
            this.index = Request.requestsCount++;
            Request.requests[this.index] = this;
        }
    }
    /**
     * Called upon error.
     *
     * @api private
     */
    onError(err) {
        this.emitReserved("error", err, this.xhr);
        this.cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @api private
     */
    cleanup(fromError) {
        if ("undefined" === typeof this.xhr || null === this.xhr) {
            return;
        }
        this.xhr.onreadystatechange = empty;
        if (fromError) {
            try {
                this.xhr.abort();
            }
            catch (e) { }
        }
        if (typeof document !== "undefined") {
            delete Request.requests[this.index];
        }
        this.xhr = null;
    }
    /**
     * Called upon load.
     *
     * @api private
     */
    onLoad() {
        const data = this.xhr.responseText;
        if (data !== null) {
            this.emitReserved("data", data);
            this.emitReserved("success");
            this.cleanup();
        }
    }
    /**
     * Aborts the request.
     *
     * @api public
     */
    abort() {
        this.cleanup();
    }
}
exports.Request = Request;
Request.requestsCount = 0;
Request.requests = {};
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */
if (typeof document !== "undefined") {
    // @ts-ignore
    if (typeof attachEvent === "function") {
        // @ts-ignore
        attachEvent("onunload", unloadHandler);
    }
    else if (typeof addEventListener === "function") {
        const terminationEvent = "onpagehide" in globalThis_js_1.globalThisShim ? "pagehide" : "unload";
        addEventListener(terminationEvent, unloadHandler, false);
    }
}
function unloadHandler() {
    for (let i in Request.requests) {
        if (Request.requests.hasOwnProperty(i)) {
            Request.requests[i].abort();
        }
    }
}

},{"../contrib/parseqs.js":8,"../contrib/yeast.js":10,"../globalThis.js":11,"../transport.js":14,"../util.js":20,"./xmlhttprequest.js":19,"@socket.io/component-emitter":2,"debug":5,"engine.io-parser":25}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultBinaryType = exports.usingBrowserWebSocket = exports.WebSocket = exports.nextTick = void 0;
const globalThis_js_1 = require("../globalThis.js");
exports.nextTick = (() => {
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) {
        return cb => Promise.resolve().then(cb);
    }
    else {
        return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
    }
})();
exports.WebSocket = globalThis_js_1.globalThisShim.WebSocket || globalThis_js_1.globalThisShim.MozWebSocket;
exports.usingBrowserWebSocket = true;
exports.defaultBinaryType = "arraybuffer";

},{"../globalThis.js":11}],18:[function(require,module,exports){
(function (Buffer){(function (){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WS = void 0;
const transport_js_1 = require("../transport.js");
const parseqs_js_1 = require("../contrib/parseqs.js");
const yeast_js_1 = require("../contrib/yeast.js");
const util_js_1 = require("../util.js");
const websocket_constructor_js_1 = require("./websocket-constructor.js");
const debug_1 = __importDefault(require("debug")); // debug()
const engine_io_parser_1 = require("engine.io-parser");
const debug = (0, debug_1.default)("engine.io-client:websocket"); // debug()
// detect ReactNative environment
const isReactNative = typeof navigator !== "undefined" &&
    typeof navigator.product === "string" &&
    navigator.product.toLowerCase() === "reactnative";
class WS extends transport_js_1.Transport {
    /**
     * WebSocket transport constructor.
     *
     * @api {Object} connection options
     * @api public
     */
    constructor(opts) {
        super(opts);
        this.supportsBinary = !opts.forceBase64;
    }
    /**
     * Transport name.
     *
     * @api public
     */
    get name() {
        return "websocket";
    }
    /**
     * Opens socket.
     *
     * @api private
     */
    doOpen() {
        if (!this.check()) {
            // let probe timeout
            return;
        }
        const uri = this.uri();
        const protocols = this.opts.protocols;
        // React Native only supports the 'headers' option, and will print a warning if anything else is passed
        const opts = isReactNative
            ? {}
            : (0, util_js_1.pick)(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        if (this.opts.extraHeaders) {
            opts.headers = this.opts.extraHeaders;
        }
        try {
            this.ws =
                websocket_constructor_js_1.usingBrowserWebSocket && !isReactNative
                    ? protocols
                        ? new websocket_constructor_js_1.WebSocket(uri, protocols)
                        : new websocket_constructor_js_1.WebSocket(uri)
                    : new websocket_constructor_js_1.WebSocket(uri, protocols, opts);
        }
        catch (err) {
            return this.emitReserved("error", err);
        }
        this.ws.binaryType = this.socket.binaryType || websocket_constructor_js_1.defaultBinaryType;
        this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @api private
     */
    addEventListeners() {
        this.ws.onopen = () => {
            if (this.opts.autoUnref) {
                this.ws._socket.unref();
            }
            this.onOpen();
        };
        this.ws.onclose = closeEvent => this.onClose({
            description: "websocket connection closed",
            context: closeEvent
        });
        this.ws.onmessage = ev => this.onData(ev.data);
        this.ws.onerror = e => this.onError("websocket error", e);
    }
    /**
     * Writes data to socket.
     *
     * @param {Array} array of packets.
     * @api private
     */
    write(packets) {
        this.writable = false;
        // encodePacket efficient as it uses WS framing
        // no need for encodePayload
        for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            (0, engine_io_parser_1.encodePacket)(packet, this.supportsBinary, data => {
                // always create a new object (GH-437)
                const opts = {};
                if (!websocket_constructor_js_1.usingBrowserWebSocket) {
                    if (packet.options) {
                        opts.compress = packet.options.compress;
                    }
                    if (this.opts.perMessageDeflate) {
                        const len = 
                        // @ts-ignore
                        "string" === typeof data ? Buffer.byteLength(data) : data.length;
                        if (len < this.opts.perMessageDeflate.threshold) {
                            opts.compress = false;
                        }
                    }
                }
                // Sometimes the websocket has already been closed but the browser didn't
                // have a chance of informing us about it yet, in that case send will
                // throw an error
                try {
                    if (websocket_constructor_js_1.usingBrowserWebSocket) {
                        // TypeError is thrown when passing the second argument on Safari
                        this.ws.send(data);
                    }
                    else {
                        this.ws.send(data, opts);
                    }
                }
                catch (e) {
                    debug("websocket closed before onclose event");
                }
                if (lastPacket) {
                    // fake drain
                    // defer to next tick to allow Socket to clear writeBuffer
                    (0, websocket_constructor_js_1.nextTick)(() => {
                        this.writable = true;
                        this.emitReserved("drain");
                    }, this.setTimeoutFn);
                }
            });
        }
    }
    /**
     * Closes socket.
     *
     * @api private
     */
    doClose() {
        if (typeof this.ws !== "undefined") {
            this.ws.close();
            this.ws = null;
        }
    }
    /**
     * Generates uri for connection.
     *
     * @api private
     */
    uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "wss" : "ws";
        let port = "";
        // avoid port if default for schema
        if (this.opts.port &&
            (("wss" === schema && Number(this.opts.port) !== 443) ||
                ("ws" === schema && Number(this.opts.port) !== 80))) {
            port = ":" + this.opts.port;
        }
        // append timestamp to URI
        if (this.opts.timestampRequests) {
            query[this.opts.timestampParam] = (0, yeast_js_1.yeast)();
        }
        // communicate binary support capabilities
        if (!this.supportsBinary) {
            query.b64 = 1;
        }
        const encodedQuery = (0, parseqs_js_1.encode)(query);
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return (schema +
            "://" +
            (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
            port +
            this.opts.path +
            (encodedQuery.length ? "?" + encodedQuery : ""));
    }
    /**
     * Feature detection for WebSocket.
     *
     * @return {Boolean} whether this transport is available.
     * @api public
     */
    check() {
        return !!websocket_constructor_js_1.WebSocket;
    }
}
exports.WS = WS;

}).call(this)}).call(this,require("buffer").Buffer)
},{"../contrib/parseqs.js":8,"../contrib/yeast.js":10,"../transport.js":14,"../util.js":20,"./websocket-constructor.js":17,"buffer":4,"debug":5,"engine.io-parser":25}],19:[function(require,module,exports){
"use strict";
// browser shim for xmlhttprequest module
Object.defineProperty(exports, "__esModule", { value: true });
exports.XHR = void 0;
const has_cors_js_1 = require("../contrib/has-cors.js");
const globalThis_js_1 = require("../globalThis.js");
function XHR(opts) {
    const xdomain = opts.xdomain;
    // XMLHttpRequest can be disabled on IE
    try {
        if ("undefined" !== typeof XMLHttpRequest && (!xdomain || has_cors_js_1.hasCORS)) {
            return new XMLHttpRequest();
        }
    }
    catch (e) { }
    if (!xdomain) {
        try {
            return new globalThis_js_1.globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
        }
        catch (e) { }
    }
}
exports.XHR = XHR;

},{"../contrib/has-cors.js":7,"../globalThis.js":11}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.byteLength = exports.installTimerFunctions = exports.pick = void 0;
const globalThis_js_1 = require("./globalThis.js");
function pick(obj, ...attr) {
    return attr.reduce((acc, k) => {
        if (obj.hasOwnProperty(k)) {
            acc[k] = obj[k];
        }
        return acc;
    }, {});
}
exports.pick = pick;
// Keep a reference to the real timeout functions so they can be used when overridden
const NATIVE_SET_TIMEOUT = setTimeout;
const NATIVE_CLEAR_TIMEOUT = clearTimeout;
function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
        obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThis_js_1.globalThisShim);
        obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThis_js_1.globalThisShim);
    }
    else {
        obj.setTimeoutFn = setTimeout.bind(globalThis_js_1.globalThisShim);
        obj.clearTimeoutFn = clearTimeout.bind(globalThis_js_1.globalThisShim);
    }
}
exports.installTimerFunctions = installTimerFunctions;
// base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
const BASE64_OVERHEAD = 1.33;
// we could also have used `new Blob([obj]).size`, but it isn't supported in IE9
function byteLength(obj) {
    if (typeof obj === "string") {
        return utf8Length(obj);
    }
    // arraybuffer or blob
    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
exports.byteLength = byteLength;
function utf8Length(str) {
    let c = 0, length = 0;
    for (let i = 0, l = str.length; i < l; i++) {
        c = str.charCodeAt(i);
        if (c < 0x80) {
            length += 1;
        }
        else if (c < 0x800) {
            length += 2;
        }
        else if (c < 0xd800 || c >= 0xe000) {
            length += 3;
        }
        else {
            i++;
            length += 4;
        }
    }
    return length;
}

},{"./globalThis.js":11}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_PACKET = exports.PACKET_TYPES_REVERSE = exports.PACKET_TYPES = void 0;
const PACKET_TYPES = Object.create(null); // no Map = no polyfill
exports.PACKET_TYPES = PACKET_TYPES;
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = Object.create(null);
exports.PACKET_TYPES_REVERSE = PACKET_TYPES_REVERSE;
Object.keys(PACKET_TYPES).forEach(key => {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = { type: "error", data: "parser error" };
exports.ERROR_PACKET = ERROR_PACKET;

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = void 0;
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
const lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (let i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}
const encode = (arraybuffer) => {
    let bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = '';
    for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
        base64 += chars[bytes[i + 2] & 63];
    }
    if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + '=';
    }
    else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + '==';
    }
    return base64;
};
exports.encode = encode;
const decode = (base64) => {
    let bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }
    return arraybuffer;
};
exports.decode = decode;

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commons_js_1 = require("./commons.js");
const base64_arraybuffer_js_1 = require("./contrib/base64-arraybuffer.js");
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const decodePacket = (encodedPacket, binaryType) => {
    if (typeof encodedPacket !== "string") {
        return {
            type: "message",
            data: mapBinary(encodedPacket, binaryType)
        };
    }
    const type = encodedPacket.charAt(0);
    if (type === "b") {
        return {
            type: "message",
            data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
        };
    }
    const packetType = commons_js_1.PACKET_TYPES_REVERSE[type];
    if (!packetType) {
        return commons_js_1.ERROR_PACKET;
    }
    return encodedPacket.length > 1
        ? {
            type: commons_js_1.PACKET_TYPES_REVERSE[type],
            data: encodedPacket.substring(1)
        }
        : {
            type: commons_js_1.PACKET_TYPES_REVERSE[type]
        };
};
const decodeBase64Packet = (data, binaryType) => {
    if (withNativeArrayBuffer) {
        const decoded = (0, base64_arraybuffer_js_1.decode)(data);
        return mapBinary(decoded, binaryType);
    }
    else {
        return { base64: true, data }; // fallback for old browsers
    }
};
const mapBinary = (data, binaryType) => {
    switch (binaryType) {
        case "blob":
            return data instanceof ArrayBuffer ? new Blob([data]) : data;
        case "arraybuffer":
        default:
            return data; // assuming the data is already an ArrayBuffer
    }
};
exports.default = decodePacket;

},{"./commons.js":21,"./contrib/base64-arraybuffer.js":22}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commons_js_1 = require("./commons.js");
const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        Object.prototype.toString.call(Blob) === "[object BlobConstructor]");
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
// ArrayBuffer.isView method is not defined in IE10
const isView = obj => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({ type, data }, supportsBinary, callback) => {
    if (withNativeBlob && data instanceof Blob) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(data, callback);
        }
    }
    else if (withNativeArrayBuffer &&
        (data instanceof ArrayBuffer || isView(data))) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(new Blob([data]), callback);
        }
    }
    // plain string
    return callback(commons_js_1.PACKET_TYPES[type] + (data || ""));
};
const encodeBlobAsBase64 = (data, callback) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
        const content = fileReader.result.split(",")[1];
        callback("b" + content);
    };
    return fileReader.readAsDataURL(data);
};
exports.default = encodePacket;

},{"./commons.js":21}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodePayload = exports.decodePacket = exports.encodePayload = exports.encodePacket = exports.protocol = void 0;
const encodePacket_js_1 = require("./encodePacket.js");
exports.encodePacket = encodePacket_js_1.default;
const decodePacket_js_1 = require("./decodePacket.js");
exports.decodePacket = decodePacket_js_1.default;
const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
const encodePayload = (packets, callback) => {
    // some packets may be added to the array while encoding, so the initial length must be saved
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i) => {
        // force base64 encoding for binary packets
        (0, encodePacket_js_1.default)(packet, false, encodedPacket => {
            encodedPackets[i] = encodedPacket;
            if (++count === length) {
                callback(encodedPackets.join(SEPARATOR));
            }
        });
    });
};
exports.encodePayload = encodePayload;
const decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i = 0; i < encodedPackets.length; i++) {
        const decodedPacket = (0, decodePacket_js_1.default)(encodedPackets[i], binaryType);
        packets.push(decodedPacket);
        if (decodedPacket.type === "error") {
            break;
        }
    }
    return packets;
};
exports.decodePayload = decodePayload;
exports.protocol = 4;

},{"./decodePacket.js":23,"./encodePacket.js":24}],26:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],27:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

},{}],28:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],29:[function(require,module,exports){
"use strict";
/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backoff = void 0;
function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
}
exports.Backoff = Backoff;
/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */
Backoff.prototype.duration = function () {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var rand = Math.random();
        var deviation = Math.floor(rand * this.jitter * ms);
        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */
Backoff.prototype.reset = function () {
    this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */
Backoff.prototype.setMin = function (min) {
    this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */
Backoff.prototype.setMax = function (max) {
    this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */
Backoff.prototype.setJitter = function (jitter) {
    this.jitter = jitter;
};

},{}],30:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.connect = exports.io = exports.Socket = exports.Manager = exports.protocol = void 0;
const url_js_1 = require("./url.js");
const manager_js_1 = require("./manager.js");
Object.defineProperty(exports, "Manager", { enumerable: true, get: function () { return manager_js_1.Manager; } });
const socket_js_1 = require("./socket.js");
Object.defineProperty(exports, "Socket", { enumerable: true, get: function () { return socket_js_1.Socket; } });
const debug_1 = __importDefault(require("debug")); // debug()
const debug = debug_1.default("socket.io-client"); // debug()
/**
 * Managers cache.
 */
const cache = {};
function lookup(uri, opts) {
    if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
    }
    opts = opts || {};
    const parsed = url_js_1.url(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew ||
        opts["force new connection"] ||
        false === opts.multiplex ||
        sameNamespace;
    let io;
    if (newConnection) {
        debug("ignoring socket cache for %s", source);
        io = new manager_js_1.Manager(source, opts);
    }
    else {
        if (!cache[id]) {
            debug("new io instance for %s", source);
            cache[id] = new manager_js_1.Manager(source, opts);
        }
        io = cache[id];
    }
    if (parsed.query && !opts.query) {
        opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
}
exports.io = lookup;
exports.connect = lookup;
exports.default = lookup;
// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility
Object.assign(lookup, {
    Manager: manager_js_1.Manager,
    Socket: socket_js_1.Socket,
    io: lookup,
    connect: lookup,
});
/**
 * Protocol version.
 *
 * @public
 */
var socket_io_parser_1 = require("socket.io-parser");
Object.defineProperty(exports, "protocol", { enumerable: true, get: function () { return socket_io_parser_1.protocol; } });

module.exports = lookup;

},{"./manager.js":31,"./socket.js":33,"./url.js":34,"debug":35,"socket.io-parser":38}],31:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const engine_io_client_1 = require("engine.io-client");
const socket_js_1 = require("./socket.js");
const parser = __importStar(require("socket.io-parser"));
const on_js_1 = require("./on.js");
const backo2_js_1 = require("./contrib/backo2.js");
const component_emitter_1 = require("@socket.io/component-emitter");
const debug_1 = __importDefault(require("debug")); // debug()
const debug = debug_1.default("socket.io-client:manager"); // debug()
class Manager extends component_emitter_1.Emitter {
    constructor(uri, opts) {
        var _a;
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        engine_io_client_1.installTimerFunctions(this, opts);
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
        this.backoff = new backo2_js_1.Backoff({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor(),
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || parser;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect)
            this.open();
    }
    reconnection(v) {
        if (!arguments.length)
            return this._reconnection;
        this._reconnection = !!v;
        return this;
    }
    reconnectionAttempts(v) {
        if (v === undefined)
            return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
    }
    reconnectionDelay(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
    }
    randomizationFactor(v) {
        var _a;
        if (v === undefined)
            return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
    }
    reconnectionDelayMax(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
    }
    timeout(v) {
        if (!arguments.length)
            return this._timeout;
        this._timeout = v;
        return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */
    maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting &&
            this._reconnection &&
            this.backoff.attempts === 0) {
            // keeps reconnection from firing twice for the same reconnection loop
            this.reconnect();
        }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */
    open(fn) {
        debug("readyState %s", this._readyState);
        if (~this._readyState.indexOf("open"))
            return this;
        debug("opening %s", this.uri);
        this.engine = new engine_io_client_1.Socket(this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        const openSubDestroy = on_js_1.on(socket, "open", function () {
            self.onopen();
            fn && fn();
        });
        // emit `error`
        const errorSub = on_js_1.on(socket, "error", (err) => {
            debug("error");
            self.cleanup();
            self._readyState = "closed";
            this.emitReserved("error", err);
            if (fn) {
                fn(err);
            }
            else {
                // Only do this if there is no fn to handle the error
                self.maybeReconnectOnOpen();
            }
        });
        if (false !== this._timeout) {
            const timeout = this._timeout;
            debug("connect attempt will timeout after %d", timeout);
            if (timeout === 0) {
                openSubDestroy(); // prevents a race condition with the 'open' event
            }
            // set timer
            const timer = this.setTimeoutFn(() => {
                debug("connect attempt timed out after %d", timeout);
                openSubDestroy();
                socket.close();
                // @ts-ignore
                socket.emit("error", new Error("timeout"));
            }, timeout);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */
    connect(fn) {
        return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */
    onopen() {
        debug("open");
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        this.emitReserved("open");
        // add new subs
        const socket = this.engine;
        this.subs.push(on_js_1.on(socket, "ping", this.onping.bind(this)), on_js_1.on(socket, "data", this.ondata.bind(this)), on_js_1.on(socket, "error", this.onerror.bind(this)), on_js_1.on(socket, "close", this.onclose.bind(this)), on_js_1.on(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */
    onping() {
        this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */
    ondata(data) {
        this.decoder.add(data);
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
        this.emitReserved("packet", packet);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */
    onerror(err) {
        debug("error", err);
        this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */
    socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
            socket = new socket_js_1.Socket(this, nsp, opts);
            this.nsps[nsp] = socket;
        }
        return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */
    _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps) {
            const socket = this.nsps[nsp];
            if (socket.active) {
                debug("socket %s is still active, skipping close", nsp);
                return;
            }
        }
        this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */
    _packet(packet) {
        debug("writing packet %j", packet);
        const encodedPackets = this.encoder.encode(packet);
        for (let i = 0; i < encodedPackets.length; i++) {
            this.engine.write(encodedPackets[i], packet.options);
        }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */
    cleanup() {
        debug("cleanup");
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */
    _close() {
        debug("disconnect");
        this.skipReconnect = true;
        this._reconnecting = false;
        this.onclose("forced close");
        if (this.engine)
            this.engine.close();
    }
    /**
     * Alias for close()
     *
     * @private
     */
    disconnect() {
        return this._close();
    }
    /**
     * Called upon engine close.
     *
     * @private
     */
    onclose(reason, description) {
        debug("closed due to %s", reason);
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason, description);
        if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
        }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */
    reconnect() {
        if (this._reconnecting || this.skipReconnect)
            return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
            debug("reconnect failed");
            this.backoff.reset();
            this.emitReserved("reconnect_failed");
            this._reconnecting = false;
        }
        else {
            const delay = this.backoff.duration();
            debug("will wait %dms before reconnect attempt", delay);
            this._reconnecting = true;
            const timer = this.setTimeoutFn(() => {
                if (self.skipReconnect)
                    return;
                debug("attempting reconnect");
                this.emitReserved("reconnect_attempt", self.backoff.attempts);
                // check again for the case socket closed in above events
                if (self.skipReconnect)
                    return;
                self.open((err) => {
                    if (err) {
                        debug("reconnect attempt error");
                        self._reconnecting = false;
                        self.reconnect();
                        this.emitReserved("reconnect_error", err);
                    }
                    else {
                        debug("reconnect success");
                        self.onreconnect();
                    }
                });
            }, delay);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */
    onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
    }
}
exports.Manager = Manager;

},{"./contrib/backo2.js":29,"./on.js":32,"./socket.js":33,"@socket.io/component-emitter":2,"debug":35,"engine.io-client":12,"socket.io-parser":38}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.on = void 0;
function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
        obj.off(ev, fn);
    };
}
exports.on = on;

},{}],33:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
const socket_io_parser_1 = require("socket.io-parser");
const on_js_1 = require("./on.js");
const component_emitter_1 = require("@socket.io/component-emitter");
const debug_1 = __importDefault(require("debug")); // debug()
const debug = debug_1.default("socket.io-client:socket"); // debug()
/**
 * Internal events.
 * These events can't be emitted by the user.
 */
const RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1,
});
class Socket extends component_emitter_1.Emitter {
    /**
     * `Socket` constructor.
     *
     * @public
     */
    constructor(io, nsp, opts) {
        super();
        this.connected = false;
        this.receiveBuffer = [];
        this.sendBuffer = [];
        this.ids = 0;
        this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;
        if (opts && opts.auth) {
            this.auth = opts.auth;
        }
        if (this.io._autoConnect)
            this.open();
    }
    /**
     * Whether the socket is currently disconnected
     */
    get disconnected() {
        return !this.connected;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    subEvents() {
        if (this.subs)
            return;
        const io = this.io;
        this.subs = [
            on_js_1.on(io, "open", this.onopen.bind(this)),
            on_js_1.on(io, "packet", this.onpacket.bind(this)),
            on_js_1.on(io, "error", this.onerror.bind(this)),
            on_js_1.on(io, "close", this.onclose.bind(this)),
        ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects
     */
    get active() {
        return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @public
     */
    connect() {
        if (this.connected)
            return this;
        this.subEvents();
        if (!this.io["_reconnecting"])
            this.io.open(); // ensure open
        if ("open" === this.io._readyState)
            this.onopen();
        return this;
    }
    /**
     * Alias for connect()
     */
    open() {
        return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * @return self
     * @public
     */
    send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @return self
     * @public
     */
    emit(ev, ...args) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev + '" is a reserved event name');
        }
        args.unshift(ev);
        const packet = {
            type: socket_io_parser_1.PacketType.EVENT,
            data: args,
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
            const id = this.ids++;
            debug("emitting packet with ack id %d", id);
            const ack = args.pop();
            this._registerAckCallback(id, ack);
            packet.id = id;
        }
        const isTransportWritable = this.io.engine &&
            this.io.engine.transport &&
            this.io.engine.transport.writable;
        const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
        if (discardPacket) {
            debug("discard packet as the transport is not currently writable");
        }
        else if (this.connected) {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        }
        else {
            this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
    }
    /**
     * @private
     */
    _registerAckCallback(id, ack) {
        const timeout = this.flags.timeout;
        if (timeout === undefined) {
            this.acks[id] = ack;
            return;
        }
        // @ts-ignore
        const timer = this.io.setTimeoutFn(() => {
            delete this.acks[id];
            for (let i = 0; i < this.sendBuffer.length; i++) {
                if (this.sendBuffer[i].id === id) {
                    debug("removing packet with ack id %d from the buffer", id);
                    this.sendBuffer.splice(i, 1);
                }
            }
            debug("event with ack id %d has timed out after %d ms", id, timeout);
            ack.call(this, new Error("operation has timed out"));
        }, timeout);
        this.acks[id] = (...args) => {
            // @ts-ignore
            this.io.clearTimeoutFn(timer);
            ack.apply(this, [null, ...args]);
        };
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    onopen() {
        debug("transport is open - connecting");
        if (typeof this.auth == "function") {
            this.auth((data) => {
                this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data });
            });
        }
        else {
            this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data: this.auth });
        }
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    onerror(err) {
        if (!this.connected) {
            this.emitReserved("connect_error", err);
        }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @param description
     * @private
     */
    onclose(reason, description) {
        debug("close (%s)", reason);
        this.connected = false;
        delete this.id;
        this.emitReserved("disconnect", reason, description);
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace)
            return;
        switch (packet.type) {
            case socket_io_parser_1.PacketType.CONNECT:
                if (packet.data && packet.data.sid) {
                    const id = packet.data.sid;
                    this.onconnect(id);
                }
                else {
                    this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                }
                break;
            case socket_io_parser_1.PacketType.EVENT:
            case socket_io_parser_1.PacketType.BINARY_EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser_1.PacketType.ACK:
            case socket_io_parser_1.PacketType.BINARY_ACK:
                this.onack(packet);
                break;
            case socket_io_parser_1.PacketType.DISCONNECT:
                this.ondisconnect();
                break;
            case socket_io_parser_1.PacketType.CONNECT_ERROR:
                this.destroy();
                const err = new Error(packet.data.message);
                // @ts-ignore
                err.data = packet.data.data;
                this.emitReserved("connect_error", err);
                break;
        }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    onevent(packet) {
        const args = packet.data || [];
        debug("emitting event %j", args);
        if (null != packet.id) {
            debug("attaching ack callback to event");
            args.push(this.ack(packet.id));
        }
        if (this.connected) {
            this.emitEvent(args);
        }
        else {
            this.receiveBuffer.push(Object.freeze(args));
        }
    }
    emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, args);
            }
        }
        super.emit.apply(this, args);
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    ack(id) {
        const self = this;
        let sent = false;
        return function (...args) {
            // prevent double callbacks
            if (sent)
                return;
            sent = true;
            debug("sending ack %j", args);
            self.packet({
                type: socket_io_parser_1.PacketType.ACK,
                id: id,
                data: args,
            });
        };
    }
    /**
     * Called upon a server acknowlegement.
     *
     * @param packet
     * @private
     */
    onack(packet) {
        const ack = this.acks[packet.id];
        if ("function" === typeof ack) {
            debug("calling ack %s with %j", packet.id, packet.data);
            ack.apply(this, packet.data);
            delete this.acks[packet.id];
        }
        else {
            debug("bad ack %s", packet.id);
        }
    }
    /**
     * Called upon server connect.
     *
     * @private
     */
    onconnect(id) {
        debug("socket connected with id %s", id);
        this.id = id;
        this.connected = true;
        this.emitBuffered();
        this.emitReserved("connect");
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    emitBuffered() {
        this.receiveBuffer.forEach((args) => this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet) => {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        });
        this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    ondisconnect() {
        debug("server disconnect (%s)", this.nsp);
        this.destroy();
        this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    destroy() {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach((subDestroy) => subDestroy());
            this.subs = undefined;
        }
        this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually.
     *
     * @return self
     * @public
     */
    disconnect() {
        if (this.connected) {
            debug("performing disconnect (%s)", this.nsp);
            this.packet({ type: socket_io_parser_1.PacketType.DISCONNECT });
        }
        // remove socket from pool
        this.destroy();
        if (this.connected) {
            // fire events
            this.onclose("io client disconnect");
        }
        return this;
    }
    /**
     * Alias for disconnect()
     *
     * @return self
     * @public
     */
    close() {
        return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     * @public
     */
    compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @returns self
     * @public
     */
    get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * ```
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     * ```
     *
     * @returns self
     * @public
     */
    timeout(timeout) {
        this.flags.timeout = timeout;
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @param listener
     * @public
     */
    onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @param listener
     * @public
     */
    prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @param listener
     * @public
     */
    offAny(listener) {
        if (!this._anyListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     *
     * @public
     */
    listenersAny() {
        return this._anyListeners || [];
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @param listener
     *
     * <pre><code>
     *
     * socket.onAnyOutgoing((event, ...args) => {
     *   console.log(event);
     * });
     *
     * </pre></code>
     *
     * @public
     */
    onAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @param listener
     *
     * <pre><code>
     *
     * socket.prependAnyOutgoing((event, ...args) => {
     *   console.log(event);
     * });
     *
     * </pre></code>
     *
     * @public
     */
    prependAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @param listener
     *
     * <pre><code>
     *
     * const handler = (event, ...args) => {
     *   console.log(event);
     * }
     *
     * socket.onAnyOutgoing(handler);
     *
     * // then later
     * socket.offAnyOutgoing(handler);
     *
     * </pre></code>
     *
     * @public
     */
    offAnyOutgoing(listener) {
        if (!this._anyOutgoingListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyOutgoingListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyOutgoingListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     *
     * @public
     */
    listenersAnyOutgoing() {
        return this._anyOutgoingListeners || [];
    }
    /**
     * Notify the listeners for each packet sent
     *
     * @param packet
     *
     * @private
     */
    notifyOutgoingListeners(packet) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const listeners = this._anyOutgoingListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, packet.data);
            }
        }
    }
}
exports.Socket = Socket;

},{"./on.js":32,"@socket.io/component-emitter":2,"debug":35,"socket.io-parser":38}],34:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = void 0;
const engine_io_client_1 = require("engine.io-client");
const debug_1 = __importDefault(require("debug")); // debug()
const debug = debug_1.default("socket.io-client:url"); // debug()
/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */
function url(uri, path = "", loc) {
    let obj = uri;
    // default to window.location
    loc = loc || (typeof location !== "undefined" && location);
    if (null == uri)
        uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
        if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) {
                uri = loc.protocol + uri;
            }
            else {
                uri = loc.host + uri;
            }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
            debug("protocol-less url %s", uri);
            if ("undefined" !== typeof loc) {
                uri = loc.protocol + "//" + uri;
            }
            else {
                uri = "https://" + uri;
            }
        }
        // parse
        debug("parse %s", uri);
        obj = engine_io_client_1.parse(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
            obj.port = "80";
        }
        else if (/^(http|ws)s$/.test(obj.protocol)) {
            obj.port = "443";
        }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href =
        obj.protocol +
            "://" +
            host +
            (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
}
exports.url = url;

},{"debug":35,"engine.io-client":12}],35:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"./common":36,"_process":28,"dup":5}],36:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = require('ms');
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;

},{"ms":27}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deconstructPacket = deconstructPacket;
exports.reconstructPacket = reconstructPacket;

var _isBinary = require("./is-binary.js");

/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */
function deconstructPacket(packet) {
  const buffers = [];
  const packetData = packet.data;
  const pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length; // number of binary 'attachments'

  return {
    packet: pack,
    buffers: buffers
  };
}

function _deconstructPacket(data, buffers) {
  if (!data) return data;

  if ((0, _isBinary.isBinary)(data)) {
    const placeholder = {
      _placeholder: true,
      num: buffers.length
    };
    buffers.push(data);
    return placeholder;
  } else if (Array.isArray(data)) {
    const newData = new Array(data.length);

    for (let i = 0; i < data.length; i++) {
      newData[i] = _deconstructPacket(data[i], buffers);
    }

    return newData;
  } else if (typeof data === "object" && !(data instanceof Date)) {
    const newData = {};

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        newData[key] = _deconstructPacket(data[key], buffers);
      }
    }

    return newData;
  }

  return data;
}
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */


function reconstructPacket(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  packet.attachments = undefined; // no longer useful

  return packet;
}

function _reconstructPacket(data, buffers) {
  if (!data) return data;

  if (data && data._placeholder === true) {
    const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;

    if (isIndexValid) {
      return buffers[data.num]; // appropriate buffer (should be natural order anyway)
    } else {
      throw new Error("illegal attachments");
    }
  } else if (Array.isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      data[i] = _reconstructPacket(data[i], buffers);
    }
  } else if (typeof data === "object") {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = _reconstructPacket(data[key], buffers);
      }
    }
  }

  return data;
}

},{"./is-binary.js":39}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Decoder = exports.Encoder = exports.PacketType = exports.protocol = void 0;

var _componentEmitter = require("@socket.io/component-emitter");

var _binary = require("./binary.js");

var _isBinary = require("./is-binary.js");

/**
 * Protocol version.
 *
 * @public
 */
const protocol = 5;
exports.protocol = protocol;
var PacketType;
exports.PacketType = PacketType;

(function (PacketType) {
  PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
  PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
  PacketType[PacketType["EVENT"] = 2] = "EVENT";
  PacketType[PacketType["ACK"] = 3] = "ACK";
  PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
  PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
  PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (exports.PacketType = PacketType = {}));
/**
 * A socket.io Encoder instance
 */


class Encoder {
  /**
   * Encoder constructor
   *
   * @param {function} replacer - custom replacer to pass down to JSON.parse
   */
  constructor(replacer) {
    this.replacer = replacer;
  }
  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   */


  encode(obj) {
    if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
      if ((0, _isBinary.hasBinary)(obj)) {
        obj.type = obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK;
        return this.encodeAsBinary(obj);
      }
    }

    return [this.encodeAsString(obj)];
  }
  /**
   * Encode packet as string.
   */


  encodeAsString(obj) {
    // first is type
    let str = "" + obj.type; // attachments if we have them

    if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
      str += obj.attachments + "-";
    } // if we have a namespace other than `/`
    // we append it followed by a comma `,`


    if (obj.nsp && "/" !== obj.nsp) {
      str += obj.nsp + ",";
    } // immediately followed by the id


    if (null != obj.id) {
      str += obj.id;
    } // json data


    if (null != obj.data) {
      str += JSON.stringify(obj.data, this.replacer);
    }

    return str;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */


  encodeAsBinary(obj) {
    const deconstruction = (0, _binary.deconstructPacket)(obj);
    const pack = this.encodeAsString(deconstruction.packet);
    const buffers = deconstruction.buffers;
    buffers.unshift(pack); // add packet info to beginning of data list

    return buffers; // write all the buffers
  }

}
/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */


exports.Encoder = Encoder;

class Decoder extends _componentEmitter.Emitter {
  /**
   * Decoder constructor
   *
   * @param {function} reviver - custom reviver to pass down to JSON.stringify
   */
  constructor(reviver) {
    super();
    this.reviver = reviver;
  }
  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   */


  add(obj) {
    let packet;

    if (typeof obj === "string") {
      if (this.reconstructor) {
        throw new Error("got plaintext data when reconstructing a packet");
      }

      packet = this.decodeString(obj);

      if (packet.type === PacketType.BINARY_EVENT || packet.type === PacketType.BINARY_ACK) {
        // binary packet's json
        this.reconstructor = new BinaryReconstructor(packet); // no attachments, labeled binary but no binary data to follow

        if (packet.attachments === 0) {
          super.emitReserved("decoded", packet);
        }
      } else {
        // non-binary full packet
        super.emitReserved("decoded", packet);
      }
    } else if ((0, _isBinary.isBinary)(obj) || obj.base64) {
      // raw binary data
      if (!this.reconstructor) {
        throw new Error("got binary data when not reconstructing a packet");
      } else {
        packet = this.reconstructor.takeBinaryData(obj);

        if (packet) {
          // received final buffer
          this.reconstructor = null;
          super.emitReserved("decoded", packet);
        }
      }
    } else {
      throw new Error("Unknown type: " + obj);
    }
  }
  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   */


  decodeString(str) {
    let i = 0; // look up type

    const p = {
      type: Number(str.charAt(0))
    };

    if (PacketType[p.type] === undefined) {
      throw new Error("unknown packet type " + p.type);
    } // look up attachments if type binary


    if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
      const start = i + 1;

      while (str.charAt(++i) !== "-" && i != str.length) {}

      const buf = str.substring(start, i);

      if (buf != Number(buf) || str.charAt(i) !== "-") {
        throw new Error("Illegal attachments");
      }

      p.attachments = Number(buf);
    } // look up namespace (if any)


    if ("/" === str.charAt(i + 1)) {
      const start = i + 1;

      while (++i) {
        const c = str.charAt(i);
        if ("," === c) break;
        if (i === str.length) break;
      }

      p.nsp = str.substring(start, i);
    } else {
      p.nsp = "/";
    } // look up id


    const next = str.charAt(i + 1);

    if ("" !== next && Number(next) == next) {
      const start = i + 1;

      while (++i) {
        const c = str.charAt(i);

        if (null == c || Number(c) != c) {
          --i;
          break;
        }

        if (i === str.length) break;
      }

      p.id = Number(str.substring(start, i + 1));
    } // look up json data


    if (str.charAt(++i)) {
      const payload = this.tryParse(str.substr(i));

      if (Decoder.isPayloadValid(p.type, payload)) {
        p.data = payload;
      } else {
        throw new Error("invalid payload");
      }
    }

    return p;
  }

  tryParse(str) {
    try {
      return JSON.parse(str, this.reviver);
    } catch (e) {
      return false;
    }
  }

  static isPayloadValid(type, payload) {
    switch (type) {
      case PacketType.CONNECT:
        return typeof payload === "object";

      case PacketType.DISCONNECT:
        return payload === undefined;

      case PacketType.CONNECT_ERROR:
        return typeof payload === "string" || typeof payload === "object";

      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        return Array.isArray(payload) && payload.length > 0;

      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        return Array.isArray(payload);
    }
  }
  /**
   * Deallocates a parser's resources
   */


  destroy() {
    if (this.reconstructor) {
      this.reconstructor.finishedReconstruction();
    }
  }

}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */


exports.Decoder = Decoder;

class BinaryReconstructor {
  constructor(packet) {
    this.packet = packet;
    this.buffers = [];
    this.reconPack = packet;
  }
  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   */


  takeBinaryData(binData) {
    this.buffers.push(binData);

    if (this.buffers.length === this.reconPack.attachments) {
      // done with buffer list
      const packet = (0, _binary.reconstructPacket)(this.reconPack, this.buffers);
      this.finishedReconstruction();
      return packet;
    }

    return null;
  }
  /**
   * Cleans up binary packet reconstruction variables.
   */


  finishedReconstruction() {
    this.reconPack = null;
    this.buffers = [];
  }

}

},{"./binary.js":37,"./is-binary.js":39,"@socket.io/component-emitter":2}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBinary = isBinary;
exports.hasBinary = hasBinary;
const withNativeArrayBuffer = typeof ArrayBuffer === "function";

const isView = obj => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};

const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
const withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */

function isBinary(obj) {
  return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
}

function hasBinary(obj, toJSON) {
  if (!obj || typeof obj !== "object") {
    return false;
  }

  if (Array.isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }

    return false;
  }

  if (isBinary(obj)) {
    return true;
  }

  if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }

  return false;
}

},{}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SYS", {
  enumerable: true,
  get: function () {
    return _system.default;
  }
});
Object.defineProperty(exports, "APPLICATION", {
  enumerable: true,
  get: function () {
    return _manifest.default;
  }
});
Object.defineProperty(exports, "ActivateModifiers", {
  enumerable: true,
  get: function () {
    return _proto_modify.default;
  }
});
Object.defineProperty(exports, "runEditor", {
  enumerable: true,
  get: function () {
    return _editor.runEditor;
  }
});
Object.defineProperty(exports, "randLetter", {
  enumerable: true,
  get: function () {
    return _init.randLetter;
  }
});
exports.loadEditorObjects = exports.loadEditor = exports.application = exports.sys = void 0;

var _system = _interopRequireDefault(require("./lib/system"));

var _manifest = _interopRequireDefault(require("./manifest/manifest"));

var _proto_modify = _interopRequireDefault(require("./lib/proto_modify"));

var _program_modul = require("./lib/program_modul");

var _editor = require("./lib/editor/editor");

var _init = require("./lib/init");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description 
 * Convert to lowercase letters. 
 */
let sys = _system.default,
    application = _manifest.default,
    loadEditor = _program_modul.CREATE_SYSTEM_BUTTONS,
    loadEditorObjects = _editor.GET_ALL_GAME_OBJECTS;
exports.loadEditorObjects = loadEditorObjects;
exports.loadEditor = loadEditor;
exports.application = application;
exports.sys = sys;

},{"./lib/editor/editor":44,"./lib/init":50,"./lib/program_modul":55,"./lib/proto_modify":56,"./lib/system":57,"./manifest/manifest":58}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ANIMATION = ANIMATION;

var _manifest = _interopRequireDefault(require("../../manifest/manifest"));

var _init = require("../init");

var _system = _interopRequireDefault(require("../system"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ANIMATION
 * @example new ANIMATION()
 * @class ANIMATION
 * @constructor
 * @param {context2d} surf
 * @param {String} TYPE_
 * @param radius FrameIndex
 * @param {String} source
 * @param PARENT
 * @param ID
 * @param {yes} blink_ Every other value returns false (No blink)
 * @param {number} min_
 * @param {number} max_
 * @param {number} step
 * @param {number} speed_
 * @param {number} opacity_
 * @return nothing
 *
 * @constructor
 * @param {String} Name name is passed value for modul name.
 * @param {String} Name name is passed value for modul name.
 */
function ANIMATION(surf, TYPE_, FrameIndex, source, PARENT, ID, blink_, min_, max_, step, speed_, opacity_) {
  var SURFACE = surf;
  this.TYPE = TYPE_;
  this.DRAW_TYPE = "PARENT";
  this.ROTATE = {
    ENABLE: true,
    ANGLE: 0 //new SYS.MATH.OSCILLATOR(0, 360 , 0.1)

  };

  if (speed_ !== undefined) {
    this.speed = speed_;
    this.initial_speed = speed_;
  } else {
    this.speed = null;
  }

  if (blink_ == "yes") {
    this.blink = new OSCILLATOR(min_, max_, step);
  } else {
    this.blink = null;
  }

  if (ID === undefined) {
    var local1 = _system.default.MATH.RANDOM_INT_FROM_TO(1, 666);

    var local2 = _system.default.MATH.RANDOM_INT_FROM_TO(666, 1234);

    this.ID = "ID" + (local1 + local2) + local2 * 66;
  } else {
    this.ID = ID;
  } // Add offset


  this.X = function () {
    return PARENT.POSITION.X();
  };

  this.Y = function () {
    return PARENT.POSITION.Y();
  };

  this.W = function () {
    return PARENT.DIMENSION.WIDTH();
  };

  this.H = function () {
    return PARENT.DIMENSION.HEIGHT();
  }; // OK


  for (var x = 0; x < source.source.length; x++) {
    window["f_" + this.ID + x] = new Image();

    if (_manifest.default.IMAGE_LOADER_PREFIX == true) {
      window["f_" + this.ID + x].src = "res/animations/" + source.source[x];
    } else {
      window["f_" + this.ID + x].src = source.source[x].toString();
    }

    window["f_" + this.ID + x].onload = function () {
      _system.default.RES.SUM_OF_LOADED_IMAGES++;
    };
  }

  this.NUMBERS_OF_FRAMES = source.source.length;

  if (FrameIndex == null) {
    this.CURRENT_FRAME = 0;
  } else {
    this.CURRENT_FRAME = FrameIndex;
  }

  this.SET_SPEED = function (new_speed) {
    if (typeof new_speed != "undefined" && new_speed != null || typeof new_speed != "number") {
      this.initial_speed = new_speed;
    } else {
      _system.default.DEBUG.WARNING(" SPEED ARRGS must be number .");
    }
  };

  this.DRAW = function (x_, y_, w_, h_, blink_status) {
    if (blink_status == "yes") {
      SURFACE.globalAlpha = Math.sin(this.blink.UPDATE());
    }

    if (this.TYPE == "LOOP") {
      if (this.DRAW_TYPE == "PARENT") {
        if (this.ROTATE.ENABLE == false) {
          SURFACE.drawImage(window["f_" + this.ID + this.CURRENT_FRAME], this.X(), this.Y(), this.W(), this.H());
        } else {
          (0, _init.drawRotatedImage)(window["f_" + this.ID + this.CURRENT_FRAME], this.X(), this.Y(), _system.default.MATH.TO_RADIANS(this.ROTATE.ANGLE), this.W(), this.H(), SURFACE);
        }
      } else if (this.DRAW_TYPE == "DIRECT") {
        SURFACE.drawImage(window["f_" + this.ID + this.CURRENT_FRAME], x_, y_, w_, h_);
      } else {
        _system.default.DOM.WARN("error in draw loop , class animator with id:" + this.ID + " " + this.CURRENT_FRAME + "<");
      }

      if (this.CURRENT_FRAME < this.NUMBERS_OF_FRAMES - 1) {
        if (this.speed == null) {
          this.CURRENT_FRAME++;
        } else {
          if (this.speed > 0) {
            this.speed--;
          } else {
            this.CURRENT_FRAME++;
            this.speed = this.initial_speed;
          }
        }
      } else {
        this.CURRENT_FRAME = 0;
      }
    } else if (this.TYPE == "DRAW_FRAME") {
      if (this.DRAW_TYPE == "PARENT" && this.CURRENT_FRAME < this.NUMBERS_OF_FRAMES) {
        if (this.ROTATE.ENABLE == false) {
          SURFACE.drawImage(window["f_" + this.ID + this.CURRENT_FRAME], this.X(), this.Y(), this.W(), this.H());
        } else {
          (0, _init.drawRotatedImage)(window["f_" + this.ID + this.CURRENT_FRAME], this.X(), this.Y(), _system.default.MATH.TO_RADIANS(this.ROTATE.ANGLE), this.W(), this.H(), SURFACE);
        }
      } else if (this.DRAW_TYPE == "DIRECT" && this.CURRENT_FRAME < this.NUMBERS_OF_FRAMES) {
        SURFACE.drawImage(window["f_" + this.ID + this.CURRENT_FRAME], this.X(), this.Y(), this.W(), this.H());
      } else {
        _system.default.DEBUG.WARNING("error in animation draw procedure , class animator says : type is DRAW FRAME . this is id : " + this.ID + ">>>may be > this.CURRENT_FRAME<this.NUMBERS_OF_FRAMES is not true , Also DRAW_TYPE must be PARENT or DIRECT!");
      }
    }

    SURFACE.globalAlpha = 1;
  };
}

},{"../../manifest/manifest":58,"../init":50,"../system":57}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RECT = RECT;

var _init = require("../init");

/**
 * @class RECT
 * @constructor
 * @param TEXT
 * @param ROOT_GAME_OBJECT
 * @param radius color
 * @param colorText
 */
function RECT(TEXT, ROOT_GAME_OBJECT, radius, color, colorText) {
  //this.FOCUS = false;
  this.TEXT_ANGLE = 0;
  this.TEXT_COLOR = colorText;
  this.TEXT_ALIGN = "center";
  this.TEXT = TEXT;
  this.EDIT = true;
  this.BACKGROUND_OPACITY = 0.5;
  this.TEXT_OPACITY = 1;
  this.textBaseline = "middle";
  this.textResizeByWidth = false;
  this.POSITION = ROOT_GAME_OBJECT.POSITION;
  this.DIMENSION = ROOT_GAME_OBJECT.DIMENSION;

  this.x = function () {
    return POSITION.X();
  };

  this.y = function () {
    return POSITION.Y();
  };

  this.width = function () {
    return this.DIMENSION.WIDHT();
  };

  this.height = function () {
    return this.DIMENSION.HEIGHT();
  };

  this.radius = parseFloat(radius);
  this.color = color;
  this.border_color = "rgba(121,121,222,0.9)";
  this.border_on_focus_color = "blue";
  this.border_on_focus_width_line = 5;
  this.font = "20px Arial";

  this.DRAW = function (s) {
    s.save();
    s.globalAlpha = this.BACKGROUND_OPACITY;
    (0, _init.roundedRect)(s, "", this.POSITION.X(), this.POSITION.Y(), this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT(), this.radius, this.color);
    s.textBaseline = this.textBaseline;

    if (ROOT_GAME_OBJECT.FOCUS == true) {
      s.lineWidth = this.border_on_focus_width_line;
      s.fillStyle = this.border_on_focus_color;
      (0, _init.roundedRect)(s, "", this.POSITION.X(), this.POSITION.Y(), this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT(), this.radius, this.color, "stroke", this.border_color);
    } else {
      s.lineWidth = this.border_width_line;
      s.fillStyle = this.border_color;
      (0, _init.roundedRect)(s, "", this.POSITION.X(), this.POSITION.Y(), this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT(), this.radius, this.color, "stroke", this.border_color);
    }

    s.textAlign = this.TEXT_ALIGN;
    s.font = this.font;
    s.fillStyle = this.TEXT_COLOR;
    s.globalAlpha = this.TEXT_OPACITY;

    if (this.textResizeByWidth == false) {
      (0, _init.drawRotatedTextNoSkrech)(s, this.TEXT, this.POSITION.X(), this.POSITION.Y(), this.TEXT_ANGLE, this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT());
    } else {
      drawRotatedText(s, this.TEXT, this.POSITION.X(), this.POSITION.Y(), this.TEXT_ANGLE, this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT()); //s.textAlign = "start";
    }

    s.restore();
  };
}

},{"../init":50}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RIGHT_MENU_BUTTON = RIGHT_MENU_BUTTON;

var _init = require("../init");

var _math = require("../math");

var _system = _interopRequireDefault(require("../system"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// WEB GUI
function RIGHT_MENU_BUTTON(text, Y_OFFSET, id, res) {
  var ROOT = this;
  this.IAM = id;
  this.HOVER = false;
  this.Y_OFFSET = Y_OFFSET;
  this.text = text;
  this.icon = null;

  if (typeof res != "undefined") {
    var locName = "system_" + this.IAM.toString();

    _system.default.RES.CREATE_IMG(locName, res);

    this.icon = true;
  }

  this.POSITION = {
    x: 0,
    y: 0,
    X: function () {
      return ROOT.POSITION.x;
    },
    Y: function () {
      return ROOT.POSITION.y + ROOT.Y_OFFSET;
    }
  }, this.DIMENSION = new _math.DIMENSION(22, 2);

  this.TAP = function () {};
}

},{"../init":50,"../math":51,"../system":57}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ADD = ADD;
exports.GET_ALL_GAME_OBJECTS = GET_ALL_GAME_OBJECTS;
exports.DESTROY = DESTROY;
exports.DESTROY_DELAY = DESTROY_DELAY;
exports.SET_NEW_START_UP_POS = SET_NEW_START_UP_POS;
exports.ADD_ANIMATION = ADD_ANIMATION;
exports.SET_WIDTH = SET_WIDTH;
exports.SET_HEIGHT = SET_HEIGHT;
exports.SET_ANIMATION_SPEED = SET_ANIMATION_SPEED;
exports.SET_ANIMATION_TYPE = SET_ANIMATION_TYPE;
exports.ADD_COLLISION = ADD_COLLISION;
exports.REMOVE_COLLISION = REMOVE_COLLISION;
exports.CREATE_PLAYER = CREATE_PLAYER;
exports.DEATACH_PLAYER = DEATACH_PLAYER;
exports.ADD_PARTICLE = ADD_PARTICLE;
exports.REMOVE_PARTICLE = REMOVE_PARTICLE;
exports.ADD_TEXTBOX = ADD_TEXTBOX;
exports.REMOVE_TEXTBOX = REMOVE_TEXTBOX;
exports.ADD_WEBCAM = ADD_WEBCAM;
exports.REMOVE_WEBCAM = REMOVE_WEBCAM;
exports.SET_MAIN_INTERVAL = SET_MAIN_INTERVAL;
exports.DELETE_FROM_VISUAL_SCRIPTS = DELETE_FROM_VISUAL_SCRIPTS;
exports.runEditor = void 0;

var _socket = require("socket.io-client");

var _system = _interopRequireDefault(require("../system"));

var _manifest = _interopRequireDefault(require("../../manifest/manifest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('\x1b[36m%s\x1b[0m', "......................................");
console.log('\x1b[36m%s\x1b[0m', ".                                    .");
console.log('\x1b[36m%s\x1b[0m', ". Visual-js Editor                   .");
console.log('\x1b[36m%s\x1b[0m', ". Version 3.0.0                      .");
console.log('\x1b[36m%s\x1b[0m', ". Thanks for using my software!      .");
console.log('\x1b[36m%s\x1b[0m', "......................................");
var LOCAL_COMMUNICATOR;

const runEditor = () => {
  LOCAL_COMMUNICATOR = {};
  let testPromiseLoadedScript = [];

  if (_manifest.default.EDITOR_AUTORUN == true || _manifest.default.EDITOR == true) {
    LOCAL_COMMUNICATOR = _socket.io.connect("http://" + _manifest.default.LOCAL_SERVER + ":1013");
    LOCAL_COMMUNICATOR.on("connect", function () {
      console.log("%c" + "Connected with Editor.", "background: #000; color: lime");
    });
    LOCAL_COMMUNICATOR.on("realtime", function (user, data) {
      if (data != "") {
        console.log("chat data empty", user, data);
      } else {
        console.log("chat data empty");
      }
    });

    function loadNext() {
      var src = testPromiseLoadedScript.shift();

      if (typeof src === 'undefined') {
        const postScriptReady = new CustomEvent("postScriptReady", {
          detail: 'good'
        });
        dispatchEvent(postScriptReady);
        return;
      }

      var s = document.createElement("script");
      s.src = src;

      if (s.addEventListener) {
        s.addEventListener("load", loadNext, false);
      } else if (s.readyState) {
        s.onreadystatechange = loadNext;
      }

      document.body.appendChild(s);
    }

    LOCAL_COMMUNICATOR.on("RETURN", function (action, data, sumOfObjs) {
      if (action == "GET_ALL_GAME_OBJECTS") {
        console.log(data + "<GET_ALL_GAME_OBJECTS> nothing ");
      } else if (action == "LOAD_SCRIPT") {
        console.log(data + "<GET_ALL_GAME_OBJECTS>  sumOfObjs ", sumOfObjs);

        if (testPromiseLoadedScript.length == sumOfObjs - 1) {
          // test - usually on page load
          // put all in array
          testPromiseLoadedScript.push(data);
          loadNext();
        } else {
          testPromiseLoadedScript.push(data);
        }
      } else if (action == "LOAD_SCRIPT_AFTER_F5") {// 
      } else if (action == "REFRESH") {
        location.reload();
      } else if (action == "ERROR") {
        alert("Server says error:" + data);
      }
    });
  }
}; // EDITOR ACTIONS


exports.runEditor = runEditor;

function CALL_OR_WAIT(data) {
  var data = data;
  setTimeout(function () {
    _system.default.DEBUG.LOG(data + "");

    if (typeof data != "undefined") {
      if (data.indexOf("a2") == -1) {
        setTimeout(function () {
          _system.default.DEBUG.LOG("VISUAL SCRIPT EDITOR ACTION EXECUTED!");

          _system.default.SCRIPT.LOAD(data);
        }, 100);
      } else {
        _system.default.DEBUG.LOG("VISUAL SCRIPT EDITOR ACTION EXECUTED!");

        _system.default.SCRIPT.LOAD(data);
      }
    } else {
      setTimeout(function () {
        CALL_OR_WAIT(data);
      }, 50);
    }
  }, 250);
}

function ADD(name, x, y, w, h, PROGRAM_NAME, MODUL) {
  LOCAL_COMMUNICATOR.emit("ADD_NEW_GAME_OBJECT", name, x, y, w, h, PROGRAM_NAME, MODUL);
}

function GET_ALL_GAME_OBJECTS() {
  LOCAL_COMMUNICATOR.emit("GET_ALL_GAME_OBJECTS");
}

function DESTROY(name) {
  LOCAL_COMMUNICATOR.emit("DESTROY_GAME_OBJECT", name);
}

function DESTROY_DELAY(name, sec, MODUL, PROGRAM_NAME) {
  LOCAL_COMMUNICATOR.emit("DESTROY_GAME_OBJECT_WITH_DELAY", name, sec, MODUL, PROGRAM_NAME);
}

function SET_NEW_START_UP_POS(name, PROGRAM_NAME, MODUL, newX, newY, w, h) {
  LOCAL_COMMUNICATOR.emit("SET_NEW_START_UP_POSITION", name, PROGRAM_NAME, MODUL, newX, newY, w, h);
}

function ADD_ANIMATION(name, PROGRAM_NAME, MODUL, RES) {
  LOCAL_COMMUNICATOR.emit("ADD_ANIMATION", name, PROGRAM_NAME, MODUL, RES);
}

function SET_WIDTH(name, PROGRAM_NAME, MODUL, W) {
  LOCAL_COMMUNICATOR.emit("SET_WIDTH", name, PROGRAM_NAME, MODUL, W);
}

function SET_HEIGHT(name, PROGRAM_NAME, MODUL, H) {
  LOCAL_COMMUNICATOR.emit("SET_HEIGHT", name, PROGRAM_NAME, MODUL, H);
}

function SET_ANIMATION_SPEED(name, PROGRAM_NAME, MODUL, S) {
  LOCAL_COMMUNICATOR.emit("SET_ANIMATION_SPEED", name, PROGRAM_NAME, MODUL, S);
}

function SET_ANIMATION_TYPE(name, PROGRAM_NAME, MODUL, S) {
  LOCAL_COMMUNICATOR.emit("SET_ANIMATION_TYPE", name, PROGRAM_NAME, MODUL, S);
}

function ADD_COLLISION(name, PROGRAM_NAME, MODUL, margin) {
  LOCAL_COMMUNICATOR.emit("ADD_COLLISION", name, PROGRAM_NAME, MODUL, margin);
}

function REMOVE_COLLISION(name, PROGRAM_NAME, MODUL) {
  LOCAL_COMMUNICATOR.emit("REMOVE_COLLISION", name, PROGRAM_NAME, MODUL);
}

function CREATE_PLAYER(name, PROGRAM_NAME, MODUL, type__, index) {
  LOCAL_COMMUNICATOR.emit("ATACH_PLAYER", name, PROGRAM_NAME, MODUL, type__, index);
}

function DEATACH_PLAYER(name, PROGRAM_NAME, MODUL, type__) {
  LOCAL_COMMUNICATOR.emit("DEATACH_PLAYER", name, PROGRAM_NAME, MODUL, type__);
}

function ADD_PARTICLE(name, PROGRAM_NAME, MODUL, type__) {
  LOCAL_COMMUNICATOR.emit("ADD_PARTICLE", name, PROGRAM_NAME, MODUL, type__);
}

function REMOVE_PARTICLE(name, PROGRAM_NAME, MODUL) {
  LOCAL_COMMUNICATOR.emit("REMOVE_PARTICLE", name, PROGRAM_NAME, MODUL);
}

function ADD_TEXTBOX(name, PROGRAM_NAME, MODUL, text, radius, color, textcolor) {
  LOCAL_COMMUNICATOR.emit("ADD_TEXTBOX", name, PROGRAM_NAME, MODUL, text, radius, color, textcolor);
}

function REMOVE_TEXTBOX(name, PROGRAM_NAME, MODUL) {
  LOCAL_COMMUNICATOR.emit("REMOVE_TEXTBOX", name, PROGRAM_NAME, MODUL);
}

function ADD_WEBCAM(name, PROGRAM_NAME, MODUL, type_, type_of_dim, byV, byH) {
  LOCAL_COMMUNICATOR.emit("ADD_WEBCAM", name, PROGRAM_NAME, MODUL, type_, type_of_dim, byV, byH);
}

function REMOVE_WEBCAM(name, PROGRAM_NAME, MODUL) {
  LOCAL_COMMUNICATOR.emit("REMOVE_WEBCAM", name, PROGRAM_NAME, MODUL);
}

function SET_MAIN_INTERVAL(PROGRAM_NAME, d, u) {
  LOCAL_COMMUNICATOR.emit("SET_MAIN_INTERVAL", PROGRAM_NAME, d, u);
}

function DELETE_FROM_VISUAL_SCRIPTS(PROGRAM_NAME) {
  LOCAL_COMMUNICATOR.emit("DELETE_FROM_VISUAL_SCRIPTS", PROGRAM_NAME);
}

},{"../../manifest/manifest":58,"../system":57,"socket.io-client":30}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ENGINE = ENGINE;

var _game_object_events = require("./game_object/game_object_events");

var _keyboard = require("./events/keyboard");

var _systems = require("./draw_functions/systems");

var _manifest = _interopRequireDefault(require("../manifest/manifest"));

var _init = require("./init");

var _modules = require("./modules/modules");

var _system = _interopRequireDefault(require("./system"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @Description Instance of ENGINE class will handle all modules and
 * gameobjects.
 * @class ENGINE
 * @example Internal . Injected like property ENGINE intro PROGRAM object.
 * @constructor
 * @return {Any} nothing
 *
 */
function ENGINE(c) {
  var ROOT_ENGINE = this; // ONE PROGRAM ONE ENGINE
  //ENGINE WILL BE BIG SWITCHER

  this.PROGRAM_ID = c.id;

  if (_manifest.default.EDITOR == true) {
    this.ENGINE_EDITOR = true;
  } else {
    this.ENGINE_EDITOR = false;
  } //Events are part of engine


  this.EVENTS = new _game_object_events.EVENTS(c, ROOT_ENGINE); // destroy mem IMPORTANT events must be deatached at first time than set up to undefined .

  this.MODULES = new Array();
  this.GAME_TYPE = "NO_PLAYER";
  this.KEYBOARD = new _keyboard.KEYBOARD(c);

  this.EXIT_EDIT_MODE = function () {
    ROOT_ENGINE.ENGINE_EDITOR = false;

    for (var x = 0; x < ROOT_ENGINE.MODULES.length; x++) {
      for (var y = 0; y < ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length; y++) {
        ROOT_ENGINE.MODULES[x].GAME_OBJECTS[y].EDITOR.ENABLE = false;
      }
    }
  };

  this.GO_TO_EDIT_MODE = function () {
    ROOT_ENGINE.ENGINE_EDITOR = true;

    for (var x = 0; x < ROOT_ENGINE.MODULES.length; x++) {
      for (var y = 0; y < ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length; y++) {
        ROOT_ENGINE.MODULES[x].GAME_OBJECTS[y].EDITOR.ENABLE = true;
      }
    }
  };

  this.GUI = {
    VISIBLE: false,
    BUTTONS: [new _systems.RIGHT_MENU_BUTTON("Add new gameObject ", 0, "1"), new _systems.RIGHT_MENU_BUTTON("Exit edit mode", 20, "2"), new _systems.RIGHT_MENU_BUTTON("Set render speed", 40, "3"), new _systems.RIGHT_MENU_BUTTON("Switch AutoConnect to true", 60, "4", "res/system/images/html5/HTML5-Offline-Storage.png"), new _systems.RIGHT_MENU_BUTTON("Switch EditorAutoRun to true", 80, "5", "res/system/images/html5/HTML5-Offline-Storage.png"), new _systems.RIGHT_MENU_BUTTON("Clear All", 100, "6")],
    CHECK_ON_START: function () {
      if ((0, _init.LOAD)("Application") == false || (0, _init.LOAD)("Application") == null) {
        console.log("no cache data about application");
      } else {
        var APPLICATION_CLONE = (0, _init.LOAD)("Application");
        _manifest.default.EDITOR = APPLICATION_CLONE.EDITOR;
        _manifest.default.EDITOR_AUTORUN = APPLICATION_CLONE.EDITOR_AUTORUN;
        _manifest.default.STATUS = APPLICATION_CLONE.STATUS;
        _manifest.default.STATUS = APPLICATION_CLONE.STATUS;
        _manifest.default.IMAGE_LOADER_PREFIX = APPLICATION_CLONE.IMAGE_LOADER_PREFIX;
        _manifest.default.SYSTEM = APPLICATION_CLONE.SYSTEM;
        _manifest.default.LOCAL_SERVER = APPLICATION_CLONE.LOCAL_SERVER;

        _system.default.DEBUG.LOG("APPLICATION object was loaded from localstorage. " + _manifest.default.ACCOUNT_SERVICE_AUTO_RUN);

        if (_manifest.default.ACCOUNT_SERVICE_AUTO_RUN == true) {
          ROOT_ENGINE.GUI.BUTTONS[3].text = "Switch AutoConnect to false";
        } else {
          ROOT_ENGINE.GUI.BUTTONS[3].text = "Switch AutoConnect to true";
        }

        if (_manifest.default.EDITOR_AUTORUN == true) {
          ROOT_ENGINE.ENGINE_EDITOR = true;
          ROOT_ENGINE.GUI.BUTTONS[4].text = "Switch editorAutoRun to false";
        } else {
          ROOT_ENGINE.ENGINE_EDITOR = false;
          ROOT_ENGINE.GUI.BUTTONS[4].text = "Switch editorAutoRun to true";
        }
      }
    },
    GRID: {
      VISIBLE: true,
      MAP_SIZE_X: 10,
      MAP_SIZE_Y: 10,
      STEP: 10,
      COLOR: _manifest.default.SYSTEM.HOVER_COLOR
    },
    LIST_OF_OBJECTS: {
      VISIBLE: true,
      LIST: ROOT_ENGINE.MODULES,
      BUTTONS_MODULES: [],
      BUTTONS_GAME_OBJECTS: [],
      GET_MODULES: function (_give_me_reference_object_) {
        for (var s = 0; s < ROOT_ENGINE.MODULES.length; s++) {
          ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES.push(new _systems.RIGHT_MENU_BUTTON(ROOT_ENGINE.MODULES[s].NAME, 15 * s, s + 1));

          ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[s].TAP = function () {
            //console.log(this.IAM)
            ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS = [];

            for (var w = 0; w < ROOT_ENGINE.MODULES[this.IAM - 1].GAME_OBJECTS.length; w++) {
              ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS.push(new _systems.RIGHT_MENU_BUTTON(ROOT_ENGINE.MODULES[this.IAM - 1].GAME_OBJECTS[w].NAME, 14 * w, w + 1));
              ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[w].POSITION.x += 100;
              var _pass_name = ROOT_ENGINE.MODULES[this.IAM - 1].GAME_OBJECTS[w].NAME;
              ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[w]._pass_name = _pass_name;

              ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[w].TAP = function () {
                console.log("ON_PAGE EDITOR::::reference comes from : " + _give_me_reference_object_.NAME + " ::::::: reference for" + this._pass_name);
                window[_give_me_reference_object_.NAME]._REF = this._pass_name;
                console.log(">>>>>>>>" + window[_give_me_reference_object_.NAME].NAME + "::::::::::" + window[_give_me_reference_object_.NAME]._REF);

                window[_system.default.RUNNING_PROGRAMS[0]].ENGINE.GUI.LIST_OF_OBJECTS.REMOVE_LIST_OBJ_MODULES();
              };
            }
          };
        }
      },
      REMOVE_LIST_OBJ_MODULES: function () {
        ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES = [];
        ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS = [];
      }
    }
  };
  this.GUI.LIST_OF_OBJECTS.GET_MODULES();
  this.GUI.CHECK_ON_START();

  this.DRAW_MODULES = function (s) {
    if (ROOT_ENGINE.GUI.GRID.VISIBLE == true && ROOT_ENGINE.ENGINE_EDITOR == true) {
      s.fillStyle = ROOT_ENGINE.GUI.GRID.COLOR;

      for (var x = 0; x < ROOT_ENGINE.GUI.GRID.MAP_SIZE_X * ROOT_ENGINE.GUI.GRID.STEP; x += ROOT_ENGINE.GUI.GRID.STEP) {
        s.fillRect(_init.VIEW.W(x), _init.VIEW.H(0), 1, _init.VIEW.H());
        s.fillRect(_init.VIEW.W(0), _init.VIEW.H(x), _init.VIEW.W(), 1);
      }
    }

    for (var x = 0; x < ROOT_ENGINE.MODULES.length; x++) {
      ROOT_ENGINE.MODULES[x].DRAW_GAME_OBJECTS(s);
    }

    if (ROOT_ENGINE.ENGINE_EDITOR == true) {
      if (ROOT_ENGINE.GUI.VISIBLE == true) {
        s.save();
        s.font = _manifest.default.SYSTEM.FONT;

        for (var x = 0; x < ROOT_ENGINE.GUI.BUTTONS.length; x++) {
          s.textBaseline = "bottom";

          if (ROOT_ENGINE.GUI.BUTTONS[x].HOVER == false) {
            s.fillStyle = _manifest.default.SYSTEM.COLOR;
            s.fillRect(ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X(), ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y(), ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH(), 20);
            s.fillStyle = _manifest.default.SYSTEM.TEXT_COLOR;
            s.fillText(ROOT_ENGINE.GUI.BUTTONS[x].text, ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X(), ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y() + 15, ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH());
          } else {
            s.fillStyle = _manifest.default.SYSTEM.HOVER_COLOR;
            s.fillRect(ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X(), ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y(), ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH(), 20);
            s.fillStyle = _manifest.default.SYSTEM.TEXT_COLOR;
            s.fillText(ROOT_ENGINE.GUI.BUTTONS[x].text, ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X(), ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y() + 15, ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH());

            if (ROOT_ENGINE.GUI.BUTTONS[x].icon == true) {
              try {
                s.drawImage(window["image_system_" + ROOT_ENGINE.GUI.BUTTONS[x].IAM], ROOT_ENGINE.GUI.BUTTONS[x].POSITION.X() + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH() - 30, ROOT_ENGINE.GUI.BUTTONS[x].POSITION.Y() - 5, 30, 30);
              } catch (e) {
                /* Not nessesery */
              }
            }
          }
        }

        s.restore();
      } //


      for (var x = 0; x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES.length; x++) {
        s.textBaseline = "middle";

        if (ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].HOVER == false) {
          s.fillStyle = _manifest.default.SYSTEM.COLOR;
          s.fillRect(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.Y(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT());
          s.fillStyle = _manifest.default.SYSTEM.TEXT_COLOR;
          s.fillText(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].text, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.Y() + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT() / 2, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH());
        } else {
          s.fillStyle = _manifest.default.SYSTEM.HOVER_COLOR;
          s.fillRect(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.Y(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT());
          s.fillStyle = _manifest.default.SYSTEM.COLOR;
          s.fillText(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].text, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.Y() + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT() / 2, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH());
        }
      }

      for (var x = 0; x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS.length; x++) {
        s.textBaseline = "middle";

        if (ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].HOVER == false) {
          s.fillStyle = _manifest.default.SYSTEM.COLOR;
          s.fillRect(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.Y(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT());
          s.fillStyle = _manifest.default.SYSTEM.TEXT_COLOR;
          s.fillText(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].text, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.Y() + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT() / 2, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH());
        } else {
          s.fillStyle = _manifest.default.SYSTEM.HOVER_COLOR;
          s.fillRect(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.Y(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT());
          s.fillStyle = _manifest.default.SYSTEM.COLOR;
          s.fillText(ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].text, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.X(), ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.Y() + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT() / 2, ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH());
        }
      } //

    }
  };

  this.UPDATE_MODULES = function () {
    for (var x = 0; x < ROOT_ENGINE.MODULES.length; x++) {
      ROOT_ENGINE.MODULES[x].UPDATE_GAME_OBJECTS();
    }
  };

  this.CREATE_MODUL = function (name) {
    // window[name] = new MODUL(name);
    ROOT_ENGINE.MODULES.push(new _modules.MODUL(name, ROOT_ENGINE.PROGRAM_ID));
  };

  this.DESTROY_MODUL = function (name) {
    // window[name] = new MODUL(name);
    console.log(ROOT_ENGINE.MODULES.indexOf(name));
    ROOT_ENGINE.MODULES.forEach(function (item, index, object) {
      // (item, index, object)
      if (item.NAME == name) {
        if (index > -1) {
          ROOT_ENGINE.MODULES.splice(index, 1);
        }

        console.log(ROOT_ENGINE.MODULES.indexOf(name));
      }
    });
  };
}

},{"../manifest/manifest":58,"./draw_functions/systems":43,"./events/keyboard":46,"./game_object/game_object_events":49,"./init":50,"./modules/modules":52,"./system":57}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KEYBOARD = KEYBOARD;

var _system = _interopRequireDefault(require("../system"));

var _keyboard_editor = _interopRequireDefault(require("./keyboard_editor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// PLAYER CONTROL AND OTHER KEYBOARD STAFF
function KEYBOARD(c) {
  var ROOT = this;
  ROOT.CAPTURE_CHAR = "";
  ROOT.CLEAR_CAPTURE_ON_PRESS_ENTER = true;
  ROOT.LAST_CAPTURE_CHAR = "";
  ROOT.ENTER_PRESSED = false;
  ROOT.SHIFT_PRESSED = false;

  ROOT.ACTION_ON_KEY_DOWN = function () {};

  this.CANVAS = c;
  this.PROGRAM_NAME = c.id;
  ROOT.keyboardListener = new _keyboard_editor.default();
  c.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
      case 8:
        e.preventDefault();

        _system.default.DEBUG.LOG("prevent default for backspace.");

    }

    _system.default.DEBUG.LOG(" GAME RUNNING , key pressed: " + e.keyCode);

    if (typeof PLAYER != "undefined") {
      if (PLAYER.TYPE == "NORMAL") {
        switch (e.keyCode) {
          case 121:
            _system.default.DEBUG.LOG("F10 command -->> Show command line ");

          case 69:
          case 37:
            // left
            PLAYER.X = PLAYER.X - PLAYER.SPEED;
            PLAYER.POSITION.TRANSLATE_BY_X(PLAYER.X);
            break;

          case 38:
            // up
            PLAYER.Y = PLAYER.Y - PLAYER.SPEED;
            PLAYER.POSITION.TRANSLATE_BY_Y(PLAYER.Y);
            break;

          case 39:
            // right
            PLAYER.X = PLAYER.X + PLAYER.SPEED;
            PLAYER.POSITION.TRANSLATE_BY_X(PLAYER.X);
            break;

          case 40:
            // down
            PLAYER.Y = PLAYER.Y + PLAYER.SPEED;
            PLAYER.POSITION.TRANSLATE_BY_Y(PLAYER.Y);
            break;
        }
      }
    } // SPECIAL FOR TEXTBOX


    _system.default.DEBUG.LOG("KEYBOARD-->> Show users types : " + e.keyCode);

    var keynum;

    if (window.event) {
      keynum = e.keyCode;
    } else {
      if (e.which) {
        keynum = e.which;
      }
    } //console.log(String.fromCharCode(keynum));


    if (e.keyCode == 16) {
      ROOT.SHIFT_PRESSED = true;
    }

    if (e.keyCode == 8) {
      _system.default.DEBUG.LOG("textbox delete last char!");

      ROOT.CAPTURE_CHAR = remove_last(ROOT.CAPTURE_CHAR);
    } else if (e.keyCode == 13) {
      ROOT.ENTER_PRESSED = true;
    } else {
      if (ROOT.SHIFT_PRESSED == false) {
        if (e.keyCode == 189) {
          ROOT.CAPTURE_CHAR += "_";
          ROOT.LAST_CAPTURE_CHAR = "_";
        } else if (e.keyCode == 187) {
          ROOT.CAPTURE_CHAR += "+";
          ROOT.LAST_CAPTURE_CHAR = "+";
        } else if (e.keyCode == 187) {
          ROOT.CAPTURE_CHAR += "+";
          ROOT.LAST_CAPTURE_CHAR = "+";
        } else if (e.keyCode == 188) {
          ROOT.CAPTURE_CHAR += ",";
          ROOT.LAST_CAPTURE_CHAR = ",";
        } else if (e.keyCode == 190) {
          ROOT.CAPTURE_CHAR += ".";
          ROOT.LAST_CAPTURE_CHAR = ".";
        } else if (e.keyCode == 191) {
          ROOT.CAPTURE_CHAR += "/";
          ROOT.LAST_CAPTURE_CHAR = "/";
        } else if (e.keyCode == 186) {
          ROOT.CAPTURE_CHAR += ";";
          ROOT.LAST_CAPTURE_CHAR = ";";
        } else if (e.keyCode == 222) {
          ROOT.CAPTURE_CHAR += "'";
          ROOT.LAST_CAPTURE_CHAR = "'";
        } else if (e.keyCode == 220) {
          ROOT.CAPTURE_CHAR += "\\";
          ROOT.LAST_CAPTURE_CHAR = "\\";
        } else if (e.keyCode == 219) {
          ROOT.CAPTURE_CHAR += "[";
          ROOT.LAST_CAPTURE_CHAR = "[";
        } else if (e.keyCode == 221) {
          ROOT.CAPTURE_CHAR += "]";
          ROOT.LAST_CAPTURE_CHAR = "]";
        } else {
          ROOT.CAPTURE_CHAR += String.fromCharCode(keynum).toLowerCase();
          ROOT.LAST_CAPTURE_CHAR = String.fromCharCode(keynum).toLowerCase();
        }
      } else {
        if (e.keyCode == 50) {
          ROOT.CAPTURE_CHAR += "@";
          ROOT.LAST_CAPTURE_CHAR = "@";
        } else if (e.keyCode == 49) {
          ROOT.CAPTURE_CHAR += "!";
          ROOT.LAST_CAPTURE_CHAR = "!";
        } else if (e.keyCode == 51) {
          ROOT.CAPTURE_CHAR += "#";
          ROOT.LAST_CAPTURE_CHAR = "#";
        } else if (e.keyCode == 52) {
          ROOT.CAPTURE_CHAR += "$";
          ROOT.LAST_CAPTURE_CHAR = "$";
        } else if (e.keyCode == 53) {
          ROOT.CAPTURE_CHAR += "%";
          ROOT.LAST_CAPTURE_CHAR = "%";
        } else if (e.keyCode == 54) {
          ROOT.CAPTURE_CHAR += "^";
          ROOT.LAST_CAPTURE_CHAR = "^";
        } else if (e.keyCode == 55) {
          ROOT.CAPTURE_CHAR += "&";
          ROOT.LAST_CAPTURE_CHAR = "&";
        } else if (e.keyCode == 56) {
          ROOT.CAPTURE_CHAR += "*";
          ROOT.LAST_CAPTURE_CHAR = "*";
        } else if (e.keyCode == 57) {
          ROOT.CAPTURE_CHAR += "(";
          ROOT.LAST_CAPTURE_CHAR = "(";
        } else if (e.keyCode == 48) {
          ROOT.CAPTURE_CHAR += ")";
          ROOT.LAST_CAPTURE_CHAR = ")";
        } else if (e.keyCode == 189) {
          ROOT.CAPTURE_CHAR += "_";
          ROOT.LAST_CAPTURE_CHAR = "_";
        } else if (e.keyCode == 187) {
          ROOT.CAPTURE_CHAR += "+";
          ROOT.LAST_CAPTURE_CHAR = "+";
        } else if (e.keyCode == 187) {
          ROOT.CAPTURE_CHAR += "+";
          ROOT.LAST_CAPTURE_CHAR = "+";
        } else if (e.keyCode == 188) {
          ROOT.CAPTURE_CHAR += "<";
          ROOT.LAST_CAPTURE_CHAR = "<";
        } else if (e.keyCode == 190) {
          ROOT.CAPTURE_CHAR += ">";
          ROOT.LAST_CAPTURE_CHAR = ">";
        } else if (e.keyCode == 191) {
          ROOT.CAPTURE_CHAR += "?";
          ROOT.LAST_CAPTURE_CHAR = "?";
        } else if (e.keyCode == 186) {
          ROOT.CAPTURE_CHAR += ":";
          ROOT.LAST_CAPTURE_CHAR = ":";
        } else if (e.keyCode == 222) {
          ROOT.CAPTURE_CHAR += "\"";
          ROOT.LAST_CAPTURE_CHAR = "\"";
        } else if (e.keyCode == 220) {
          ROOT.CAPTURE_CHAR += "|";
          ROOT.LAST_CAPTURE_CHAR = "|";
        } else if (e.keyCode == 219) {
          ROOT.CAPTURE_CHAR += "{";
          ROOT.LAST_CAPTURE_CHAR = "{";
        } else if (e.keyCode == 221) {
          ROOT.CAPTURE_CHAR += "}";
          ROOT.LAST_CAPTURE_CHAR = "}";
        } else {
          ROOT.CAPTURE_CHAR += String.fromCharCode(keynum).toUpperCase();
          ROOT.LAST_CAPTURE_CHAR = String.fromCharCode(keynum).toUpperCase();
        }
      }
    }

    ROOT.ACTION_ON_KEY_DOWN(); //@@@@@@@@@@@@@@@@@@@@@@@@@

    if (typeof ROOT.TARGET_MODUL != "undefined" && typeof ROOT.TARGET != "undefined") {
      ROOT.CAPTURE_CHAR = ROOT.CAPTURE_CHAR.replace(/[^\x00-\x7F]/g, "");
      ROOT.CAPTURE_CHAR = ROOT.CAPTURE_CHAR.replace(/[^A-Za-z 0-9 \.,\?""!#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, "");
      window[ROOT.PROGRAM_NAME].ENGINE.MODULES.ACCESS(ROOT.TARGET_MODUL).GAME_OBJECTS.ACCESS(ROOT.TARGET).TEXTBOX.TEXT = ROOT.CAPTURE_CHAR;

      if (ROOT.ENTER_PRESSED == true) {
        window[ROOT.PROGRAM_NAME].ENGINE.MODULES.ACCESS(ROOT.TARGET_MODUL).GAME_OBJECTS.ACCESS(ROOT.TARGET).TEXTBOX.ON_PRESS_ENTER();

        if (ROOT.CLEAR_CAPTURE_ON_PRESS_ENTER == true) {
          ROOT.CAPTURE_CHAR = "";
        }
      }
    }

    ROOT.ENTER_PRESSED = false; //local_go.TEXTBOX.TEXT =  ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.CAPTURE_CHAR;
  }, false);
  c.addEventListener("keyup", function (e) {
    _system.default.DEBUG.LOG(" GAME RUNNING , key up : " + e.keyCode); //SYS.SOUND.GEN( 50 , e.keyCode * 20 );


    switch (e.keyCode) {
      case 121:
        _system.default.DEBUG.LOG("F10 command -->> Show command line ");

        break;

      case 16:
        ROOT.SHIFT_PRESSED = false;
        break;
    }

    if (typeof PLAYER != "undefined") {
      if (PLAYER.TYPE == "NORMAL") {
        switch (e.keyCode) {
          case 121:
            _system.default.DEBUG.LOG("F10 command -->> Show command line ");

          case 69:
          case 37:
            // left
            PLAYER.X = PLAYER.X - PLAYER.SPEED;
            PLAYER.POSITION.TRANSLATE_BY_X(PLAYER.X);
            break;

          case 38:
            // up
            PLAYER.Y = PLAYER.Y - PLAYER.SPEED;
            PLAYER.POSITION.TRANSLATE_BY_Y(PLAYER.Y);
            break;

          case 39:
            // right
            PLAYER.X = PLAYER.X + PLAYER.SPEED;
            PLAYER.POSITION.TRANSLATE_BY_X(PLAYER.X);
            break;

          case 40:
            // down
            PLAYER.Y = PLAYER.Y + PLAYER.SPEED;
            PLAYER.POSITION.TRANSLATE_BY_Y(PLAYER.Y);
            break;
        }
      }
    }
  }, false);
}

},{"../system":57,"./keyboard_editor":47}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _system = _interopRequireDefault(require("../system"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// maybe for editor can be used
class KeyboardListener {
  constructor() {
    window.addEventListener("keydown", function (e) {
      _system.default.DEBUG.LOG(" kaydown event fired for keyboard_editor . e.keyCode " + e.keyCode); //SYS.SOUND.GEN( 50 , e.keyCode * 20 );


      switch (e.keyCode) {
        case 121:
          _system.default.DEBUG.LOG("F10 command -->> Show command line ");

        case 115:
          for (var z = 0; z < _system.default.RUNNING_PROGRAMS.length; z++) {
            window[_system.default.RUNNING_PROGRAMS[z]].ENGINE.GO_TO_EDIT_MODE();
          }

        case 37:
          // left
          break;

        case 38:
          // up
          break;

        case 39:
          // right
          break;

        case 40:
          // down
          break;
      }
    }, false);
  }

}

var _default = KeyboardListener;
exports.default = _default;

},{"../system":57}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GAME_OBJECT = GAME_OBJECT;

var _math = require("../math");

var _system = _interopRequireDefault(require("../system"));

var _systems = require("../draw_functions/systems");

var _rect = require("../draw_functions/rect");

var _animation = require("../draw_functions/animation");

var _manifest = _interopRequireDefault(require("../../manifest/manifest"));

var _init = require("../init");

var _editor = require("../editor/editor");

var _particule = require("../particule/particule");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  Copyright 2016, zlatnaspirala@gmail.com
  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are
  met:

  * Redistributions of source code must retain the above copyright
  notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above
  copyright notice, this list of conditions and the following disclaimer
  in the documentation and/or other materials provided with the
  distribution.
  * Neither the name of zlatnaspirala@gmail.com nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
  A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
  OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
  SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
  THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
  Constructor
  GAME_OBJECT ( name  , modul , x , y , w , h , speed , PROGRAM_NAME)
  Type : Class

  Program create instance of this class  from  class modul :
  HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT("STOSKE" , 22, 42, 22 , 22 , "DIAMETRIC");
 */
function GAME_OBJECT(name, modul, x, y, w, h, speed, PROGRAM_NAME) {
  var ROOT_GAME_OBJECT = this; //alias global access

  if (name == "system" || name.indexOf("___VIRTUALKEYBOARD_") != -1) {
    ROOT_GAME_OBJECT.VISIBLE = true;
    window["" + name] = this;
  } else {
    window["" + name] = this;
    ROOT_GAME_OBJECT.VISIBLE = true;
  }

  this.ID = parseFloat(Math.random() * 4560000 + Math.random() * 1230000).toFixed(0);
  this.PARENT = modul;
  this.PROGRAM_NAME = PROGRAM_NAME;
  this.NAME = name;
  this.AUTO_UPDATE = true;
  this.FOCUS = false; // similar SELECTED but for runtime mode only

  this.TYPE_OF_GAME_OBJECT = "empty";
  this.ENUMERATION = ["empty", "ANIMATION", "TEXT_BOX", "PATRICLE", "NO_RENDER", "ANIMATION_TEXT_BOX", "ANIMATION_PATRICLE"];
  this.DESTROY_ON_GAMEMAP_EXIT = true;
  this.DRAG_STATUS = true;
  this.DRAG = true;
  this.DRAG_START_X = 0;
  this.DRAG_START_Y = 0;
  this.DRAG_DELTA = 0;
  this.zoom_scale = 0;
  this.globalAlpha = 1;

  if ((typeof x && typeof y) === "number") {
    if (typeof speed === "number") {
      this.POSITION = new _math.POSITION(x, y, x, y, speed);
    } else {
      this.POSITION = new _math.POSITION(x, y, x, y, 1);
    }
  } else {
    this.POSITION = new _math.POSITION(10, 10, 200, 200, 1);
  }

  if ((typeof w && typeof h) === "number") {
    this.DIMENSION = new _math.DIMENSION(w, h);
  } else {
    this.DIMENSION = new _math.DIMENSION(10, 10);
  } //this.ON_TARGET_POSITION = function(){};


  this.POSITION.parentModul = modul;
  this.POSITION.parentGameObject = name;
  this.POSITION.PROGRAM_NAME = PROGRAM_NAME;
  this.POSITION.DIMENSION = this.DIMENSION; //this.POSITION.ON_TARGET_POSITION = this.ON_TARGET_POSITION;

  this.ANIMATION = null;

  this.CREATE_ANIMATION = function (surf, TYPE_, FrameIndex, source, ID, blink_, min_, max_, step, speed_, opacity_) {
    this.ANIMATION = new _animation.ANIMATION(surf, TYPE_, FrameIndex, source, ROOT_GAME_OBJECT, ID, blink_, min_, max_, step, speed_, opacity_);
    this.TYPE_OF_GAME_OBJECT = "ANIMATION"; //SYS.DEBUG.LOG("images added in memory.... ID " + ID);
  };

  this.CREATE_PLAYER = function (type_) {
    ROOT_GAME_OBJECT.PLAYER = {
      TYPE: type_,
      X: ROOT_GAME_OBJECT.POSITION.x,
      // for platform
      Y: ROOT_GAME_OBJECT.POSITION.y,
      SPEED: 1,
      CONTROL: {
        RIGHT: false,
        LEFT: false,
        JUMP: false,
        DOWN: false
      },
      POSITION: ROOT_GAME_OBJECT.POSITION,
      BREAK_AT_MOMENT_STATUS: false
    };
    window["PLAYER"] = ROOT_GAME_OBJECT.PLAYER;
    this.POSITION.PLAYER = ROOT_GAME_OBJECT.PLAYER;
    window[PROGRAM_NAME].ENGINE.GAME_TYPE = "NORMAL_CONTROL";
  };

  this.TEXTBOX = null;
  this.TRACK_KEY = null;

  this.CREATE_TEXTBOX = function (text, radius, color, textColor) {
    if (typeof text != "undefined" && typeof radius != "undefined" && typeof color != "undefined" && typeof textColor != "undefined") {
      this.TEXTBOX = new _rect.RECT(text, ROOT_GAME_OBJECT, radius, color, textColor);
      this.TYPE_OF_GAME_OBJECT = "TEXT_BOX";
      this.TRACK_KEY = true;
      this.TEXTBOX.TEXT = text;
      this.TEXTBOX.TEXT += window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.KEYBOARD.CAPTURE_CHAR;
      this.FOCUS = true;

      this.TEXTBOX.ON_PRESS_ENTER = function () {};

      ROOT_GAME_OBJECT.EDITOR.BUTTONS[6].text = "Remove textbox";
    } else {
      _system.default.DEBUG.WARNING("TEXT_BOX error in constructor : ( text , radius , color, textColor) cant be undefined.");
    }
  };

  this.DESTROY_AFTER = null;

  this.DESTROY_ME_AFTER_X_SECUND = function (sec, name, x, ROOT_EVENTS) {
    this.DESTROY_AFTER = sec * 20;

    if (_manifest.default.EDITOR == true) {
      (0, _editor.DESTROY_DELAY)(name, sec, ROOT_GAME_OBJECT.PARENT, ROOT_GAME_OBJECT.PROGRAM_NAME);
    }
  };

  this.COLLISION = null;
  this.POSITION.STATIC = false;

  this.COLIDER = function (type__, margin) {
    this.TYPE = type__;

    if (typeof margin === "number") {
      this.margin = margin;
    } else {
      this.margin = 1.02;
    }
  };

  this.CREATE_COLLISION = function (type__, margin) {
    ROOT_GAME_OBJECT.COLLISION = new ROOT_GAME_OBJECT.COLIDER(type__, margin);
    ROOT_GAME_OBJECT.EDITOR.BUTTONS[3].text = "Remove collision";
  };

  this.ON_COLLISION = function (name_) {}; // face detect tracking.js


  this.CREATE_FACE_DETECT = function () {
    ROOT_GAME_OBJECT.SET_TRACKING_VIEW("NORMAL", "NORMAL");
    TRACK_NOW();

    ROOT_GAME_OBJECT.ON_UPDATE_SYS = function () {
      ROOT_GAME_OBJECT.WEBCAM.VIDEO.style.left = ROOT_GAME_OBJECT.POSITION.X() + "px";
      ROOT_GAME_OBJECT.WEBCAM.VIDEO.style.top = ROOT_GAME_OBJECT.POSITION.Y() + 50 + "px";
      ROOT_GAME_OBJECT.WEBCAM.TRACKING_CANVAS_LAYOUT.style.left = ROOT_GAME_OBJECT.POSITION.X() + "px";
      ROOT_GAME_OBJECT.WEBCAM.TRACKING_CANVAS_LAYOUT.style.top = ROOT_GAME_OBJECT.POSITION.Y() + 50 + "px";
    };

    ROOT_GAME_OBJECT.WEBCAM.VIDEO.style.opacity = 0.9;
  };

  this.SET_TRACKING_VIEW = function (type_, DIMENSIONS_TYPE) {
    // just webcam view
    ROOT_GAME_OBJECT.WEBCAM = new Object();
    ROOT_GAME_OBJECT.WEBCAM.VIDEO = _system.default.DOM.E("video");
    ROOT_GAME_OBJECT.WEBCAM.TRACKING_CANVAS_LAYOUT = document.getElementById("canvas"); // SET_STREAM(ROOT_GAME_OBJECT.WEBCAM.VIDEO);

    if (DIMENSIONS_TYPE == "GAME_OBJECT") {
      ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE = "GAME_OBJECT";
    } else {
      ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE = "WEBCAM_DIMENSION";
      ROOT_GAME_OBJECT.DIMENSION.H = _init.CONVERTOR.PIY_TO_PER(_system.default.DOM.E("video").height);
      ROOT_GAME_OBJECT.DIMENSION.W = _init.CONVERTOR.PIX_TO_PER(_system.default.DOM.E("video").width);
    }

    ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "CUSTOM";

    ROOT_GAME_OBJECT.CUSTOM = function () {
      SURF.fillStyle = "white";
      SURF.fillRect(ROOT_GAME_OBJECT.POSITION.X(), ROOT_GAME_OBJECT.POSITION.Y(), 100, 100);
    };
  }; // DRAW PATH


  this.CREATE_PENCIL = function (type_, color, width) {
    this.PENCIL = new Object();

    if (typeof type_ != "undefined") {
      this.PENCIL.TYPE = type_;
    } else {
      this.PENCIL.TYPE = "POINTS";
    }

    if (typeof color != "undefined") {
      this.PENCIL.COLOR = color;
    } else {
      this.PENCIL.COLOR = "lime";
    }

    if (typeof width != "undefined") {
      this.PENCIL.WIDTH = width;
    } else {
      this.PENCIL.WIDTH = 1;
    }

    ROOT_GAME_OBJECT.PENCIL.PATH = [];
    ROOT_GAME_OBJECT.PENCIL.NAME = "";
    ROOT_GAME_OBJECT.PENCIL.ID = ""; //draw

    ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "PENCIL";
    ROOT_GAME_OBJECT.PENCIL.LAST_POS = {
      x: _system.default.MOUSE.x,
      y: _system.default.MOUSE.y
    }; // TRANSLATE_BY_PATH

    ROOT_GAME_OBJECT.PENCIL.RECORD = true;

    ROOT_GAME_OBJECT.PENCIL.RECORD_TYPE = function (TYPE_) {
      if (TYPE_ == "EVERY_POINT") {
        ROOT_GAME_OBJECT.ON_UPDATE_SYS = ROOT_GAME_OBJECT.ON_UPDATE_SYS_RECORD_EVERY_POINT;

        _system.default.MOUSE.ON_RIGHT_BTN_PRESSED = function () {};
      } else if (TYPE_ == "ON_TAP") {
        ROOT_GAME_OBJECT.ON_UPDATE_SYS = ROOT_GAME_OBJECT.ON_UPDATE_SYS_RECORD_ONLY_TAP; //clear colector
        //collector on tap

        _system.default.MOUSE.ON_RIGHT_BTN_PRESSED = function () {
          IamPathGameObject.PENCIL.RECORD = false;
        };

        _system.default.MOUSE.ON_LEFT_BTN_PRESSED = function () {
          ROOT_GAME_OBJECT.PENCIL.PATH.push({
            x: _system.default.MOUSE.x,
            y: _system.default.MOUSE.y
          });
          var XX = _system.default.MOUSE.x;
          var YY = _system.default.MOUSE.y;
          ROOT_GAME_OBJECT.PENCIL.LAST_POS.x = XX;
          ROOT_GAME_OBJECT.PENCIL.LAST_POS.y = YY;
        };
      }
    };

    ROOT_GAME_OBJECT.PENCIL.SAVE_DRAWS = function (name_) {
      if (typeof name_ != "undefined") {
        var PATH_FOR_PENCIL = new Object();
        PATH_FOR_PENCIL.PATH = ROOT_GAME_OBJECT.PENCIL.PATH;
        PATH_FOR_PENCIL.ID = _system.default.MATH.RANDOM_INT_FROM_TO(1, 100000) * 78;
        ROOT_GAME_OBJECT.PENCIL.NAME = name_;
        PATH_FOR_PENCIL.NAME = name_;
        SAVE(PATH_FOR_PENCIL.NAME, PATH_FOR_PENCIL);
      } else {
        _system.default.DEBUG.WARNING("Pencil object : save draws faild. Please give a name in arg");
      }
    };

    ROOT_GAME_OBJECT.PENCIL.LOAD_PATH = function (name_) {
      if (typeof name != "undefined") {
        ROOT_GAME_OBJECT.PENCIL.LOADED_PATH = LOAD(name_);
        ROOT_GAME_OBJECT.PENCIL.PATH = ROOT_GAME_OBJECT.PENCIL.LOADED_PATH.PATH;
        ROOT_GAME_OBJECT.PENCIL.NAME = ROOT_GAME_OBJECT.PENCIL.LOADED_PATH.NAME;
        ROOT_GAME_OBJECT.PENCIL.ID = ROOT_GAME_OBJECT.PENCIL.LOADED_PATH.ID; // ROOT_GAME_OBJECT.PENCIL.LOADED_PATH = null;

        ROOT_GAME_OBJECT.PENCIL.RECORD = false;
      } else {
        _system.default.DEBUG.WARNING("Pencil object : load draws faild. Please give a name in arg");
      }
    };

    ROOT_GAME_OBJECT.PENCIL.DRAW = function () {};

    ROOT_GAME_OBJECT.PENCIL.CLEAR = function () {
      ROOT_GAME_OBJECT.PENCIL.PATH = [];
    };

    ROOT_GAME_OBJECT.PENCIL.DRAW_TYPE = function (TYPE_) {
      if (TYPE_ == "LINES") {
        ROOT_GAME_OBJECT.PENCIL.DRAW = ROOT_GAME_OBJECT.PENCIL.DRAW_LINES;
        ROOT_GAME_OBJECT.PENCIL.TYPE = TYPE_;
      } else if (TYPE_ == "POINTS") {
        ROOT_GAME_OBJECT.PENCIL.DRAW = ROOT_GAME_OBJECT.PENCIL.DRAW_POINTS;
        ROOT_GAME_OBJECT.PENCIL.TYPE = TYPE_;
      } else if (TYPE_ == "STRIP_LINES") {
        ROOT_GAME_OBJECT.PENCIL.DRAW = ROOT_GAME_OBJECT.PENCIL.DRAW_STRIP_LINES;
        ROOT_GAME_OBJECT.PENCIL.TYPE = TYPE_;
      } else if (TYPE_ == "STRIP_LINES2") {
        ROOT_GAME_OBJECT.PENCIL.DRAW = ROOT_GAME_OBJECT.PENCIL.DRAW_STRIP_LINES2;
        ROOT_GAME_OBJECT.PENCIL.TYPE = TYPE_;
      } else if (TYPE_ == "BALLS") {
        ROOT_GAME_OBJECT.PENCIL.DRAW = ROOT_GAME_OBJECT.PENCIL.DRAW_BALS;
        ROOT_GAME_OBJECT.PENCIL.TYPE = TYPE_;
      } else {
        ROOT_GAME_OBJECT.PENCIL.DRAW = ROOT_GAME_OBJECT.PENCIL.DRAW_POINTS;
        ROOT_GAME_OBJECT.PENCIL.TYPE = "POINTS";
      }
    };

    ROOT_GAME_OBJECT.PENCIL.DRAW_POINTS = function () {
      ROOT_GAME_OBJECT.PENCIL.PATH.forEach(function (value_) {
        SURF.fillStyle = ROOT_GAME_OBJECT.PENCIL.COLOR;
        SURF.beginPath();
        SURF.arc(value_.x, value_.y, ROOT_GAME_OBJECT.PENCIL.WIDTH, 0, 2 * Math.PI);
        SURF.fill();
      });
    };

    ROOT_GAME_OBJECT.PENCIL.DRAW_STRIP_LINES = function () {
      var a = 0;
      ROOT_GAME_OBJECT.PENCIL.PATH.forEach(function (value_) {
        SURF.strokeStyle = ROOT_GAME_OBJECT.PENCIL.COLOR; //SURF.beginPath();
        //SURF.arc(value_.x,value_.y,ROOT_GAME_OBJECT.PENCIL.WIDTH,0,2*Math.PI);

        if (a == 0) {
          SURF.beginPath();
          SURF.lineWidth = ROOT_GAME_OBJECT.PENCIL.WIDTH;
          SURF.moveTo(value_.x, value_.y);
        }

        SURF.lineTo(value_.x, value_.y);
        SURF.stroke();
        a++;
      });
    };

    ROOT_GAME_OBJECT.PENCIL.DRAW_LINES = function () {
      var a = 0;
      ROOT_GAME_OBJECT.PENCIL.PATH.forEach(function (value_) {
        SURF.strokeStyle = ROOT_GAME_OBJECT.PENCIL.COLOR; //SURF.beginPath();
        //SURF.arc(value_.x,value_.y,ROOT_GAME_OBJECT.PENCIL.WIDTH,0,2*Math.PI);

        if (isOdd(a)) {
          SURF.beginPath();
          SURF.lineWidth = ROOT_GAME_OBJECT.PENCIL.WIDTH;
          SURF.moveTo(value_.x, value_.y);
        }

        SURF.lineTo(value_.x, value_.y);
        SURF.stroke();
        a++;
      });
    }; //


    ROOT_GAME_OBJECT.PENCIL.DRAW_STRIP_LINES2 = function () {
      var a = 0;
      ROOT_GAME_OBJECT.PENCIL.PATH.forEach(function (value_) {
        SURF.strokeStyle = ROOT_GAME_OBJECT.PENCIL.COLOR; //SURF.beginPath();
        //SURF.arc(value_.x,value_.y,ROOT_GAME_OBJECT.PENCIL.WIDTH,0,2*Math.PI);

        if (isEven(a)) {
          SURF.beginPath();
          SURF.lineWidth = ROOT_GAME_OBJECT.PENCIL.WIDTH;
          SURF.moveTo(value_.x, value_.y);
        } //SURF.lineTo(value_.x,value_.y);
        //SURF.stroke();


        SURF.lineTo(value_.x, value_.y);
        SURF.stroke();
        a++;
      });
      var a = 0;
      ROOT_GAME_OBJECT.PENCIL.PATH.forEach(function (value_) {
        SURF.strokeStyle = ROOT_GAME_OBJECT.PENCIL.COLOR; //SURF.beginPath();
        //SURF.arc(value_.x,value_.y,ROOT_GAME_OBJECT.PENCIL.WIDTH,0,2*Math.PI);

        if (isOdd(a)) {
          SURF.beginPath();
          SURF.lineWidth = ROOT_GAME_OBJECT.PENCIL.WIDTH;
          SURF.moveTo(value_.x, value_.y);
        }

        SURF.lineTo(value_.x, value_.y);
        SURF.stroke();
        a++;
      });
    }; //


    ROOT_GAME_OBJECT.PENCIL.DRAW_BALS = function () {
      SURF.fillStyle = ROOT_GAME_OBJECT.PENCIL.COLOR;
      ROOT_GAME_OBJECT.PENCIL.PATH.forEach(function (value_) {
        SURF.beginPath();
        SURF.arc(value_.x, value_.y, ROOT_GAME_OBJECT.PENCIL.WIDTH * 20, 0, 2 * Math.PI);
        SURF.fill();
      });
    };

    ROOT_GAME_OBJECT.PENCIL.DRAW_TYPE(); //#############################
    //#############################

    ROOT_GAME_OBJECT.ON_UPDATE_SYS = function () {
      if (ROOT_GAME_OBJECT.PENCIL.RECORD == true) {
        if (ROOT_GAME_OBJECT.PENCIL.PATH.length > 0) {
          if (ROOT_GAME_OBJECT.PENCIL.PATH[ROOT_GAME_OBJECT.PENCIL.PATH.length - 1].x != _system.default.MOUSE.x) {
            ROOT_GAME_OBJECT.PENCIL.PATH.push({
              x: _system.default.MOUSE.x,
              y: _system.default.MOUSE.y
            });
            var XX = _system.default.MOUSE.x;
            var YY = _system.default.MOUSE.y;
            ROOT_GAME_OBJECT.PENCIL.LAST_POS.x = XX;
            ROOT_GAME_OBJECT.PENCIL.LAST_POS.y = YY;
          }
        } else {
          ROOT_GAME_OBJECT.PENCIL.PATH.push(ROOT_GAME_OBJECT.PENCIL.LAST_POS);
        }
      }
    };

    ROOT_GAME_OBJECT.ON_UPDATE_SYS_RECORD_ONLY_TAP = function () {};

    ROOT_GAME_OBJECT.ON_UPDATE_SYS_RECORD_EVERY_POINT = function () {
      if (ROOT_GAME_OBJECT.PENCIL.RECORD == true) {
        if (ROOT_GAME_OBJECT.PENCIL.PATH.length > 0) {
          if (ROOT_GAME_OBJECT.PENCIL.PATH[ROOT_GAME_OBJECT.PENCIL.PATH.length - 1].x != _system.default.MOUSE.x) {
            ROOT_GAME_OBJECT.PENCIL.PATH.push({
              x: _system.default.MOUSE.x,
              y: _system.default.MOUSE.y
            });
            var XX = _system.default.MOUSE.x;
            var YY = _system.default.MOUSE.y;
            ROOT_GAME_OBJECT.PENCIL.LAST_POS.x = XX;
            ROOT_GAME_OBJECT.PENCIL.LAST_POS.y = YY;
          }
        } else {
          ROOT_GAME_OBJECT.PENCIL.PATH.push(ROOT_GAME_OBJECT.PENCIL.LAST_POS);
        }
      }
    };
  };

  this.TRANSLATE_BY_PATH = function (PATH_, LOOP_TYPE) {
    ROOT_GAME_OBJECT.sys_translateByPath = PATH_;
    ROOT_GAME_OBJECT.sys_translateByPathIndex = 0;

    if (typeof LOOP_TYPE != "undefined") {
      ROOT_GAME_OBJECT.sys_translateByPathLoopType = LOOP_TYPE;
      ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive = "STOP";
    } else {
      ROOT_GAME_OBJECT.sys_translateByPathLoopType = "STOP";
      ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive = "STOP";
    }

    ROOT_GAME_OBJECT.POSITION.TRANSLATE(_init.CONVERTOR.PIX_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].x), _init.CONVERTOR.PIY_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].y));

    ROOT_GAME_OBJECT.POSITION.ON_TARGET_POSITION = function () {
      if (ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive == "STOP") {
        if (ROOT_GAME_OBJECT.sys_translateByPath.length > ROOT_GAME_OBJECT.sys_translateByPathIndex + 1) {
          ROOT_GAME_OBJECT.sys_translateByPathIndex++;
          ROOT_GAME_OBJECT.POSITION.TRANSLATE(_init.CONVERTOR.PIX_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].x), _init.CONVERTOR.PIY_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].y));
        } else {
          if (ROOT_GAME_OBJECT.sys_translateByPathLoopType == "INVERSE") {
            ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive = "INVERSE";
            ROOT_GAME_OBJECT.sys_translateByPathIndex--;
            ROOT_GAME_OBJECT.sys_translateByPathIndex--;
            ROOT_GAME_OBJECT.POSITION.TRANSLATE(_init.CONVERTOR.PIX_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].x), _init.CONVERTOR.PIY_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].y));
          }
        }
      } else if (ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive == "INVERSE") {
        if (ROOT_GAME_OBJECT.sys_translateByPathIndex > 1) {
          ROOT_GAME_OBJECT.sys_translateByPathIndex--;
          ROOT_GAME_OBJECT.POSITION.TRANSLATE(_init.CONVERTOR.PIX_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].x), _init.CONVERTOR.PIY_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].y));
        } else {
          if (ROOT_GAME_OBJECT.sys_translateByPathLoopType == "INVERSE_FOR_EVER") {
            ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive = "STOP";
            ROOT_GAME_OBJECT.sys_translateByPathIndex++;
            ROOT_GAME_OBJECT.POSITION.TRANSLATE(_init.CONVERTOR.PIX_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].x), _init.CONVERTOR.PIY_TO_PER(ROOT_GAME_OBJECT.sys_translateByPath[ROOT_GAME_OBJECT.sys_translateByPathIndex].y));
          }
        }
      } else {
        /* 	 if (ROOT_GAME_OBJECT.sys_translateByPathLoopType == "STOP") {
            }
        else if (ROOT_GAME_OBJECT.sys_translateByPathLoopType == "INVERSE"){
          ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive = "INVERSE";
          }
        else if (ROOT_GAME_OBJECT.sys_translateByPathLoopType == "INVERSE_FOR_EVER"){
          ROOT_GAME_OBJECT.sys_translateByPathLoopTypeActive = "STOP";
        }
         */
      }
    };
  };

  this.EDITOR = {
    SELECTED: false,
    ENABLE: window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.ENGINE_EDITOR,
    ACTORS_VISIBLE: true,
    ACTORS_AREA_HEIGHT: 10,
    ACTOR_BLUE_HOVER: false,
    ACTOR_GREEN_HOVER: false,
    ACTOR_CENTER_OSCILATOR: new _system.default.MATH.OSCILLATOR(0, 2, 0.01),
    ACTOR_START_X: 0,
    ACTOR_START_Y: 0,
    ACTOR_DELTA: 0,
    ACTOR_X_IN_MOVE: false,
    ACTOR_Y_IN_MOVE: false,
    ACTOR_DRAG_RECT_DIM: new _math.DIMENSION(5, 5),
    //ACTOR_DRAG_RECT_POS : SYS.ARRAY_OPERATION.DEEP_COPY.getCloneOfObject( this.POSITION ) ,
    ACTOR_DRAG_RECT_POS: this.POSITION,
    ACTOR_DRAG: false,
    BUTTONS: [new _systems.RIGHT_MENU_BUTTON("Destroy gameObject", 0, "1"), new _systems.RIGHT_MENU_BUTTON("Destroy after secund ", 20, "2"), new _systems.RIGHT_MENU_BUTTON("Add animation ", 40, "3"), new _systems.RIGHT_MENU_BUTTON("Add collision ", 60, "4"), new _systems.RIGHT_MENU_BUTTON("Atach player ", 80, "5", "res/system/images/html5/plus.png"), new _systems.RIGHT_MENU_BUTTON("Add particle ", 100, "6", "res/system/images/html5/particle.png"), new _systems.RIGHT_MENU_BUTTON("Add textbox ", 120, "7", "res/system/images/html5/textbox.png"), new _systems.RIGHT_MENU_BUTTON("Add webcam  ", 140, "8", "res/system/images/html5/HTML5-Device-Access.png"), new _systems.RIGHT_MENU_BUTTON("Set width ", 160, "B1"), new _systems.RIGHT_MENU_BUTTON("Set height ", 180, "B2"), new _systems.RIGHT_MENU_BUTTON("Set animation speed ", 200, "ANIM1"), new _systems.RIGHT_MENU_BUTTON("Set animation type ", 220, "ANIM2")],
    GAME_OBJECT_MENU: {
      VISIBLE: false
    }
  };
  this.WEBCAM = null;

  this.SET_WEBCAM_VIEW = function (type_, DIMENSIONS_TYPE) {
    // just webcam view
    ROOT_GAME_OBJECT.WEBCAM = new Object();
    ROOT_GAME_OBJECT.WEBCAM.VIDEO = _system.default.DOM.E("webcam");
    (0, _init.SET_STREAM)(ROOT_GAME_OBJECT.WEBCAM.VIDEO);

    if (DIMENSIONS_TYPE == "GAME_OBJECT") {
      ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE = "GAME_OBJECT";
    } else {
      ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE = "WEBCAM_DIMENSION";
      ROOT_GAME_OBJECT.DIMENSION.H = _init.CONVERTOR.PIY_TO_PER(_system.default.DOM.E("webcam").height);
      ROOT_GAME_OBJECT.DIMENSION.W = _init.CONVERTOR.PIX_TO_PER(_system.default.DOM.E("webcam").width);
    }

    if (type_ == "NORMAL") {
      ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "WEBCAM";
    } else if (type_ == "NUI") {
      _system.default.DOM.E("canvas-blended").height = _system.default.DOM.E("webcam").height;
      _system.default.DOM.E("canvas-blended").width = _system.default.DOM.E("webcam").width;
      _system.default.DOM.E("canvas-render").height = _system.default.DOM.E("webcam").height;
      _system.default.DOM.E("canvas-render").width = _system.default.DOM.E("webcam").width;
      ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "WEBCAM_NUI";
      ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS = _system.default.DOM.E("canvas-blended");
      ROOT_GAME_OBJECT.WEBCAM.RENDER_CANVAS = _system.default.DOM.E("canvas-render");
      ROOT_GAME_OBJECT.WEBCAM.NOTES = [];
    }
  };

  this.CREATE_WEBCAM = function (type_, DIMENSIONS_TYPE, numFieldV, numFieldH) {
    if (typeof type_ != "undefined") {
      if (type_ == "NUI") {
        ROOT_GAME_OBJECT.SET_WEBCAM_VIEW("NUI", DIMENSIONS_TYPE);
        ROOT_GAME_OBJECT.WEBCAM.numFieldV = numFieldV;
        ROOT_GAME_OBJECT.WEBCAM.numFieldH = numFieldH;
        ROOT_GAME_OBJECT.WEBCAM.BS = ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS.getContext("2d");
        ROOT_GAME_OBJECT.WEBCAM.RC = ROOT_GAME_OBJECT.WEBCAM.RENDER_CANVAS.getContext("2d");
        ROOT_GAME_OBJECT.WEBCAM._N_ = new Array();
        CREATE_MOTION_PARAMETERS(ROOT_GAME_OBJECT);
        CREATE_MOTION_FIELDS(ROOT_GAME_OBJECT);
        ROOT_GAME_OBJECT.WEBCAM.HIDE_INDICATED_POINT = false;
        ROOT_GAME_OBJECT.WEBCAM.DRAW = WEBCAM_DRAW;
      } else if ("NORMAL") {
        ROOT_GAME_OBJECT.SET_WEBCAM_VIEW("NORMAL", DIMENSIONS_TYPE);
      }
    } else {
      _system.default.DEBUG.WARNING("Pleas enter type of webcam component .  [ NUI , NORMAL ]  ");
    }
  };

  this.DESTROY_WEBCAM = function () {
    ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "NO_RENDER";

    ROOT_GAME_OBJECT.WEBCAM.DRAW = function () {};

    ROOT_GAME_OBJECT.WEBCAM.NOTES = [];
    ROOT_GAME_OBJECT.WEBCAM.BS = null;
    ROOT_GAME_OBJECT.WEBCAM.RC = null;
    ROOT_GAME_OBJECT.WEBCAM._N_ = [];
    delete ROOT_GAME_OBJECT.WEBCAM;
    ROOT_GAME_OBJECT.WEBCAM = null;
  }; //$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$//$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  // MUTIRTC_PEER


  this.ON_PEER_CREATED = {
    "DONE": function () {}
    /* MAIN_PEER.CHANNEL.SET('LEVEL1') }  */

  };

  this.CREATE_PEER = function (port) {
    if (typeof port != "undefined") {
      window["MAIN_PEER"].PORT = port;
    } else {
      window["MAIN_PEER"].PORT = 12034;
    }

    if (typeof window["MAIN_PEER"].REMOTE_DATA == "undefined") {
      ROOT_GAME_OBJECT.MAIN_PEER = window["MAIN_PEER"];
      ROOT_GAME_OBJECT.MAIN_PEER.ADDRESS = "localhost";
      ROOT_GAME_OBJECT.MAIN_PEER.ON_PEER_CREATED = ROOT_GAME_OBJECT.ON_PEER_CREATED;

      ROOT_GAME_OBJECT.MAIN_PEER.LOADED = function () {
        console.log("peer loaded2");
      };

      if (typeof window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER") == "undefined") {
        setTimeout(ROOT_GAME_OBJECT.CREATE_PEER, 50);
        return;
      } else {
        if (typeof window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT == "function") {} else {
          setTimeout(ROOT_GAME_OBJECT.CREATE_PEER, 50);
          return;
        }
      }

      window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT("system_object_for_MAIN_peer", 5, 5, 15, 8, 10);

      var sys_btn_alias = window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS("system_object_for_MAIN_peer");

      sys_btn_alias.DIMENSION.W = ROOT_GAME_OBJECT.DIMENSION.W;
      sys_btn_alias.CREATE_TEXTBOX("enter message", 10, "black", "lime");
      system_object_for_MAIN_peer.TEXTBOX.font = "18px Arial";

      system_object_for_MAIN_peer.TEXTBOX.ON_PRESS_ENTER = function () {
        _system.default.DOM.E("SEND_BTN_").value = system_object_for_MAIN_peer.TEXTBOX.TEXT;

        _system.default.DEBUG.LOG("SEND TEXT MSG TO CURRENT CHANNEL");

        system_object_for_MAIN_peer.TEXTBOX.TEXT = "";
        ROOT_GAME_OBJECT.MAIN_PEER.SEND_MSG();
      };

      window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT("system_object_for_MAIN_peer_BTN_connect", 5, 5, 9, 7, 10);

      var sys_btn_connect = window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS("system_object_for_MAIN_peer_BTN_connect");

      sys_btn_connect.CREATE_TEXTBOX("Connect", 10, "black", "lime");
      sys_btn_connect.TEXTBOX.font = "18px Arial";
      sys_btn_connect.TEXTBOX.EDIT = false;

      sys_btn_connect.TAP = function () {
        if (rtcMultiConnection.sessionDescription == null) {
          MAIN_PEER.CONNECT_TO_CHANNEL();
        }
      }; ///////////////////////


      ROOT_GAME_OBJECT.ON_UPDATE_SYS = function () {
        //sys_btn_alias.POSITION.x = ROOT_GAME_OBJECT.POSITION.x;
        sys_btn_alias.POSITION.SET_POSITION(ROOT_GAME_OBJECT.POSITION.x, ROOT_GAME_OBJECT.POSITION.y + ROOT_GAME_OBJECT.DIMENSION.H * 1.1, "DIAMETRIC");
        sys_btn_connect.POSITION.SET_POSITION(ROOT_GAME_OBJECT.POSITION.x + ROOT_GAME_OBJECT.DIMENSION.W / 1.7, ROOT_GAME_OBJECT.POSITION.y, "DIAMETRIC");
      }; // ROOT_GAME_OBJECT.
      //


      ROOT_GAME_OBJECT.MAIN_PEER.REMOTE_DATA = {
        OBJECTS: [],
        //SEND DATA
        SHARE: function (object) {
          rtcMultiConnection.send({
            "shared_object": object,
            "operation": "share"
          });
          object.PEER_SHARED = true;
        },
        SHARE_POSITION: function (object) {
          object.POSITION.SHARE_POSITION = true;
        },
        NEW_POSITION: function (object) {
          rtcMultiConnection.send({
            "nameOfObject": object.NAME,
            "operation": "new_pos",
            "x": object.POSITION.x,
            "y": object.POSITION.y
          });
        },
        NEW_DIMENSION: function (object) {
          rtcMultiConnection.send({
            "nameOfObject": object.NAME,
            "operation": "new_dim",
            "x": object.DIMENSION.W,
            "y": object.DIMENSION.H
          });
        },
        // DATA FROM SERVER
        NETWORK_VIEW: function (e) {
          if (e.operation == "share") {
            window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_NETWORK_OBJECT(e.shared_object);
          } else if (e.operation == "new_pos") {
            window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_NETWORK_POSITION(e);
          } else if (e.operation == "new_dim") {
            window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_NETWORK_DIMENSION(e);
          } else if (e.operation == "dimension&position") {}
        }
      };
      ROOT_GAME_OBJECT.MAIN_PEER.CHANNEL = {
        GET: function () {
          return _system.default.DOM.E("room-name").value;
        },
        SET: function (newvalue) {
          _system.default.DOM.E("room-name").value = newvalue;
        }
      };
      ROOT_GAME_OBJECT.MAIN_PEER.LOCAL_USER = {
        GET: function () {
          return _system.default.DOM.E("your-name").value;
        },
        SET: function (newvalue) {
          _system.default.DOM.E("your-name").value = newvalue;
        }
      };
      ROOT_GAME_OBJECT.MAIN_PEER.SEND_MSG = function () {
        if (typeof rtcMultiConnection != "undefined") {
          rtcMultiConnection.send(_system.default.DOM.E("SEND_BTN_").value);
          _system.default.DOM.E("SEND_BTN_").value = "";
        }
      }, ROOT_GAME_OBJECT.MAIN_PEER.CONNECT_TO_CHANNEL = function () {
        _system.default.DOM.E("continue").onclick();
      }, ROOT_GAME_OBJECT.MAIN_PEER.LOGS = "logs!";
      ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "MAIN_PEER_OBJECT";
      setTimeout(function () {
        MAIN_PEER.ON_PEER_CREATED.DONE();
      }, 200);
    } else {
      _system.default.DEBUG.WARNING("from function CREATE_PEER -  MAIN PEER OBJECT ALREADY CREATED.");
    }
  };

  this.GROUP = {
    ADD: function (name) {
      var locx = window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS_MODULE(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.ACCESS(name).POSITION.x;
      var locy = window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS_MODULE(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.ACCESS(name).POSITION.y;
      var dx = ROOT_GAME_OBJECT.GROUP.MASTER_INITIALS.x - locx;
      var dy = ROOT_GAME_OBJECT.GROUP.MASTER_INITIALS.y - locy;
      ROOT_GAME_OBJECT.GROUP.GROUP_INITIALS.push({
        x: dx,
        y: dy
      });
      ROOT_GAME_OBJECT.GROUP.GROUP.push(name); //delete (locx);
      //delete (locy);
      //SYS.DEBUG.LOG(dx + "=============" + dy)
    },
    GROUP: [],
    GROUP_INITIALS: [],
    MASTER: ROOT_GAME_OBJECT.NAME,
    MASTER_INITIALS: {
      x: ROOT_GAME_OBJECT.POSITION.x,
      y: ROOT_GAME_OBJECT.POSITION.y
    },
    UPDATE: function () {}
  };
  this.EFFECTS = {
    FADE: {
      IN: function (sec) {
        var TIMER = setTimeout(function () {
          ROOT_GAME_OBJECT.globalAlpha += 0.02;

          if (ROOT_GAME_OBJECT.globalAlpha < 1) {
            ROOT_GAME_OBJECT.EFFECTS.FADE.IN();
          } else {
            ROOT_GAME_OBJECT.globalAlpha = 1;
          }
        }, sec);
      },
      OUT: function (sec) {
        var TIMER = setTimeout(function () {
          ROOT_GAME_OBJECT.globalAlpha -= 0.02;

          if (ROOT_GAME_OBJECT.globalAlpha > 0) {
            ROOT_GAME_OBJECT.EFFECTS.FADE.OUT();
          } else {
            ROOT_GAME_OBJECT.globalAlpha = 0;
          }
        }, sec);
      }
    },
    ZOOM: {
      STATUS_FOR_IN: false,
      STATUS_FOR_OUT: false,
      ZOOM_IN_FINISHED: function () {
        console.log("zoom in  ----finished.");
      },
      ZOOM_OUT_FINISHED: function () {
        console.log("zoom out ----finished.");
      },
      VALUE: 0.5,
      IN: function (sec) {
        var sec = sec;
        this.STATUS_FOR_IN = true;
        var TIMER = setTimeout(function () {
          if (ROOT_GAME_OBJECT.zoom_scale < ROOT_GAME_OBJECT.EFFECTS.ZOOM.VALUE) {
            ROOT_GAME_OBJECT.zoom_scale += 0.01;
            ROOT_GAME_OBJECT.POSITION.SET_POSITION(ROOT_GAME_OBJECT.POSITION.x - ROOT_GAME_OBJECT.zoom_scale, ROOT_GAME_OBJECT.POSITION.y - ROOT_GAME_OBJECT.zoom_scale, "DIAMETRIC");
            ROOT_GAME_OBJECT.DIMENSION.W = ROOT_GAME_OBJECT.DIMENSION.W + ROOT_GAME_OBJECT.zoom_scale * 2;
            ROOT_GAME_OBJECT.DIMENSION.H = ROOT_GAME_OBJECT.DIMENSION.H + ROOT_GAME_OBJECT.zoom_scale * 2;
            ROOT_GAME_OBJECT.EFFECTS.ZOOM.IN(sec);
          } else {
            ROOT_GAME_OBJECT.EFFECTS.ZOOM.ZOOM_IN_FINISHED();
            ROOT_GAME_OBJECT.EFFECTS.ZOOM.STATUS_FOR_IN = false;
          }
        }, sec);
      },
      OUT: function (sec) {
        var sec = sec;
        this.STATUS_FOR_OUT = true;
        var TIMER = setTimeout(function () {
          if (ROOT_GAME_OBJECT.POSITION.x < ROOT_GAME_OBJECT.GROUP.MASTER_INITIALS.x) {
            ROOT_GAME_OBJECT.zoom_scale -= 0.009;
            ROOT_GAME_OBJECT.POSITION.SET_POSITION(ROOT_GAME_OBJECT.POSITION.x + ROOT_GAME_OBJECT.zoom_scale, ROOT_GAME_OBJECT.POSITION.y + ROOT_GAME_OBJECT.zoom_scale, "DIAMETRIC");
            ROOT_GAME_OBJECT.DIMENSION.W = ROOT_GAME_OBJECT.DIMENSION.W - ROOT_GAME_OBJECT.zoom_scale * 2;
            ROOT_GAME_OBJECT.DIMENSION.H = ROOT_GAME_OBJECT.DIMENSION.H - ROOT_GAME_OBJECT.zoom_scale * 2;
            ROOT_GAME_OBJECT.EFFECTS.ZOOM.OUT(sec);
          } else {
            ROOT_GAME_OBJECT.zoom_scale = 0;
            ROOT_GAME_OBJECT.EFFECTS.ZOOM.ZOOM_OUT_FINISHED();
            ROOT_GAME_OBJECT.EFFECTS.ZOOM.STATUS_FOR_OUT = false;
          }
        }, sec);
      }
    }
  };
  this.PARTICLE = null;

  this.CREATE_PARTICLE = function (type_) {
    // NEED to be created more particle system in future !!!
    ROOT_GAME_OBJECT.PARTICLE = new _particule.PARTICLE_FONTAN(ROOT_GAME_OBJECT);
    ROOT_GAME_OBJECT.TYPE_OF_GAME_OBJECT = "PATRICLE";
  };

  this.CUSTOM = function () {};

  this.DESELECT_ALL = function () {
    var exec_local = "" + ROOT_GAME_OBJECT.PROGRAM_NAME.toString();

    for (var z = 0; z < window[exec_local].ENGINE.MODULES.ACCESS(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.length; z++) {
      window[exec_local].ENGINE.MODULES.ACCESS(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS[z].EDITOR.SELECTED = false;
    }
  }; // For user override


  this.TOUCH_DOWN = function () {
    _system.default.DEBUG.LOG("No atached event . EVENT_TOUCH_DOWN");
  };

  this.TAP = function () {
    _system.default.DEBUG.LOG("No atached event . EVENT_TAP : similar click");
  };

  this.TOUCH_UP = function () {
    _system.default.DEBUG.LOG("No atached event . EVENT_TOUCH_UP");
  };

  this.TOUCH_MOVE = function () {// SYS.DEBUG.LOG("No atached event . EVENT_TOUCH_MOVE");
  };

  this.UPDATE_STATUS = {
    STOP: function () {}
  };
  this.ROTATE = {
    ANGLE: 0,
    //use for custum image drawing
    RADIANS: 0,
    // fiktive
    ROTATE_ARROUNT_CENTER: function () {
      ORBIT(50, 50, ROOT_GAME_OBJECT.ROTATE.ANGLE, ROOT_GAME_OBJECT.POSITION);
    }
  };

  this.DRAW = function (s) {
    if (ROOT_GAME_OBJECT.VISIBLE == true) {
      s.save();
      s.globalAlpha = ROOT_GAME_OBJECT.globalAlpha;

      if (this.TYPE_OF_GAME_OBJECT == "ANIMATION") {
        this.ANIMATION.DRAW();
      } else if (this.TYPE_OF_GAME_OBJECT == "TEXT_BOX") {
        this.TEXTBOX.DRAW(s);
      } else if (this.TYPE_OF_GAME_OBJECT == "TEXT_BOX_ANIMATION") {
        this.TEXTBOX.DRAW(s);
        this.ANIMATION.DRAW();
      } else if (this.TYPE_OF_GAME_OBJECT == "PATRICLE") {
        this.PARTICLE.DRAW(s);
      } else if (this.TYPE_OF_GAME_OBJECT == "PATRICLE_ANIMATION") {
        this.PARTICLE.DRAW(s);
        this.ANIMATION.DRAW();
      } else if (this.TYPE_OF_GAME_OBJECT == "ANIMATION_PATRICLE") {
        this.ANIMATION.DRAW();
        this.PARTICLE.DRAW(s);
      } else if (this.TYPE_OF_GAME_OBJECT == "ANIMATION_TEXT_BOX") {
        this.ANIMATION.DRAW();
        this.TEXTBOX.DRAW(s);
      } else if (this.TYPE_OF_GAME_OBJECT == "ANIMATION_PATRICLE") {
        this.ANIMATION.DRAW();
        this.PARTICLE.DRAW(s);
      } else if (this.TYPE_OF_GAME_OBJECT == "WEBCAM") {
        if (ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE = "GAME_OBJECT") {
          s.drawImage(ROOT_GAME_OBJECT.WEBCAM.VIDEO, ROOT_GAME_OBJECT.POSITION.X(), ROOT_GAME_OBJECT.POSITION.Y(), ROOT_GAME_OBJECT.DIMENSION.WIDTH(), ROOT_GAME_OBJECT.DIMENSION.HEIGHT());
        } else {
          s.drawImage(ROOT_GAME_OBJECT.WEBCAM.VIDEO, ROOT_GAME_OBJECT.POSITION.X(), ROOT_GAME_OBJECT.POSITION.Y(), ROOT_GAME_OBJECT.WEBCAM.VIDEO.width, ROOT_GAME_OBJECT.WEBCAM.VIDEO.height);
        }
      } else if (this.TYPE_OF_GAME_OBJECT == "WEBCAM_NUI") {
        if (ROOT_GAME_OBJECT.WEBCAM.DIMENSIONS_TYPE = "GAME_OBJECT") {
          s.drawImage(ROOT_GAME_OBJECT.WEBCAM.VIDEO, ROOT_GAME_OBJECT.POSITION.X(), ROOT_GAME_OBJECT.POSITION.Y(), ROOT_GAME_OBJECT.DIMENSION.WIDTH(), ROOT_GAME_OBJECT.DIMENSION.HEIGHT());
        } else {
          s.drawImage(ROOT_GAME_OBJECT.WEBCAM.VIDEO, ROOT_GAME_OBJECT.POSITION.X(), ROOT_GAME_OBJECT.POSITION.Y(), ROOT_GAME_OBJECT.WEBCAM.VIDEO.width, ROOT_GAME_OBJECT.WEBCAM.VIDEO.height);
        }

        blend(ROOT_GAME_OBJECT, s);
        checkAreas(ROOT_GAME_OBJECT);
        ROOT_GAME_OBJECT.WEBCAM.DRAW(s, ROOT_GAME_OBJECT.WEBCAM);
      } else if (this.TYPE_OF_GAME_OBJECT == "CUSTOM") {
        ROOT_GAME_OBJECT.CUSTOM(s);
      } else if (this.TYPE_OF_GAME_OBJECT == "PENCIL") {
        ROOT_GAME_OBJECT.PENCIL.DRAW();
      } else if (this.TYPE_OF_GAME_OBJECT == "NO_RENDER") {// nothing here
      } else if (this.TYPE_OF_GAME_OBJECT == "MAIN_PEER_OBJECT") {
        s.fillStyle = "#192837";
        s.fillRect(this.POSITION.X(), this.POSITION.Y(), this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT());
        s.fillStyle = "lime";
        s.drawImage(image_system_8, this.POSITION.X() + this.DIMENSION.WIDTH() / 2, this.POSITION.Y() + 30, 90, 90);
        s.drawImage(image_system_conn, this.POSITION.X() + this.DIMENSION.WIDTH() / 1.4, this.POSITION.Y() + 30, 90, 90);
        s.fillText("Signaling IP Address : " + this.MAIN_PEER.ADDRESS, this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 4);
        s.fillText("Name : " + this.MAIN_PEER.LOCAL_USER.GET(), this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 5);
        s.fillText("Channel : " + this.MAIN_PEER.CHANNEL.GET(), this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 6);
        s.fillText("peer logs : " + ROOT_GAME_OBJECT.MAIN_PEER.LOGS, this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 7); //ROOT_GAME_OBJECT.MAIN_PEER.LOGS = 'logs!';
      }

      s.restore();
    }
  };

  this.DRAW_ACTOR = function (s) {
    if (this.EDITOR.ACTORS_VISIBLE == true) {
      s.save();
      s.font = "13px Arial";
      s.fillRect(0, this.POSITION.Y(), _init.VIEW.W(), 1);
      s.fillRect(this.POSITION.X(), 0, 1, _init.VIEW.H());
      s.globalAlpha = 0.5;
      s.fillRect(this.POSITION.X(), this.POSITION.Y(), this.DIMENSION.WIDTH(), this.DIMENSION.HEIGHT());
      s.globalAlpha = 0.9;

      if (ROOT_GAME_OBJECT.EDITOR.SELECTED == true) {
        s.fillText("Name :" + this.NAME, this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() - this.EDITOR.ACTORS_AREA_HEIGHT * 4);
        s.fillText("Percent :" + _init.CONVERTOR.PIX_TO_PER(this.POSITION.X().toString()).toFixed(2) + "%  y:" + _init.CONVERTOR.PIY_TO_PER(this.POSITION.Y()).toFixed(2), this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() - this.EDITOR.ACTORS_AREA_HEIGHT * 2.5);
        s.fillText("Actor- x:" + this.POSITION.X().toFixed(2).toString() + " y:" + this.POSITION.Y().toFixed(2), this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() - this.EDITOR.ACTORS_AREA_HEIGHT);
      } //CONVERTOR.PIX_TO_PER( h );
      // actor rect for drag
      //ACTOR_DRAG_RECT


      s.strokeStyle = "blue";
      s.strokeRect(this.EDITOR.ACTOR_DRAG_RECT_POS.X() + this.EDITOR.ACTORS_AREA_HEIGHT, this.EDITOR.ACTOR_DRAG_RECT_POS.Y() + this.EDITOR.ACTORS_AREA_HEIGHT, this.EDITOR.ACTOR_DRAG_RECT_DIM.WIDTH(), this.EDITOR.ACTOR_DRAG_RECT_DIM.HEIGHT());

      if (this.EDITOR.ACTOR_BLUE_HOVER == true) {
        s.fillStyle = "lime";
      } else {
        s.fillStyle = "blue";
      } //BLU LINE ACTOR X-OSA


      s.fillRect(this.POSITION.X(), this.POSITION.Y(), this.EDITOR.ACTORS_AREA_HEIGHT * 15, this.EDITOR.ACTORS_AREA_HEIGHT);
      s.beginPath();
      s.moveTo(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT * 10 * 1.5, this.POSITION.Y() - 0.5 * this.EDITOR.ACTORS_AREA_HEIGHT);
      s.lineTo(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT * 10 * 1.5, this.POSITION.Y() + 1.4 * this.EDITOR.ACTORS_AREA_HEIGHT);
      s.lineTo(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT * 12.5 * 1.5, this.POSITION.Y() + 1 / 2 * this.EDITOR.ACTORS_AREA_HEIGHT);
      s.closePath();
      s.fill();

      if (this.EDITOR.ACTOR_GREEN_HOVER == true) {
        s.fillStyle = "lime";
      } else {
        s.fillStyle = "green";
      } //BLU LINE ACTOR X-OSA


      s.fillRect(this.POSITION.X(), this.POSITION.Y(), this.EDITOR.ACTORS_AREA_HEIGHT, this.EDITOR.ACTORS_AREA_HEIGHT * 15);
      s.beginPath();
      s.moveTo(this.POSITION.X() - 0.5 * this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 10 * 1.5);
      s.lineTo(this.POSITION.X() + 1.4 * this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 10 * 1.5);
      s.lineTo(this.POSITION.X() + 1 / 2 * this.EDITOR.ACTORS_AREA_HEIGHT, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT * 12.5 * 1.5);
      s.closePath();
      s.fill(); // fix color compositi near x i y

      s.fillStyle = "red";
      s.beginPath(); //s.strokeStyle = "rgba( 222 , " + this.PULSAR_G.VALUE + " , " + this.PULSAR_B.VALUE + " , " + this.PULSAR_A.VALUE + ")";

      s.arc(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT / 2, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT / 2, this.EDITOR.ACTORS_AREA_HEIGHT / 2, 0 * Math.PI, 2 * Math.PI);
      s.fill();
      s.closePath();
      s.beginPath();
      s.lineWidth = 1;
      s.strokeStyle = "white";
      s.arc(this.POSITION.X() + this.EDITOR.ACTORS_AREA_HEIGHT / 2, this.POSITION.Y() + this.EDITOR.ACTORS_AREA_HEIGHT / 2, this.EDITOR.ACTORS_AREA_HEIGHT, (this.EDITOR.ACTOR_CENTER_OSCILATOR.UPDATE() + 0.1) * Math.PI, (this.EDITOR.ACTOR_CENTER_OSCILATOR.UPDATE() - 0.1) * Math.PI);
      s.stroke();
      s.closePath();
      s.restore();
    }

    if (ROOT_GAME_OBJECT.EDITOR.GAME_OBJECT_MENU.VISIBLE == true) {
      for (var x = 0; x < ROOT_GAME_OBJECT.EDITOR.BUTTONS.length; x++) {
        s.save();
        s.textBaseline = 'bottom';
        s.globalAlpha = 1;

        if (ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].HOVER == false) {
          //if (ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].text == 'Set animation speed ' && ROOT_GAME_OBJECT.ANIMATION != null) {
          s.fillStyle = _manifest.default.SYSTEM.COLOR; // s.fillRect(ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.HEIGHT());

          s.fillRect(ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH(), 20);
          s.fillStyle = _manifest.default.SYSTEM.TEXT_COLOR;
          s.fillText(ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].text, ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y() + 15, ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH()); //}
        } else {
          s.fillStyle = _manifest.default.SYSTEM.HOVER_COLOR; //s.fillRect(ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.HEIGHT());

          s.fillRect(ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH(), 20);
          s.fillStyle = _manifest.default.SYSTEM.TEXT_COLOR;
          s.fillText(ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].text, ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X(), ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y() + 15, ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH());

          if (ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].icon == true) {
            try {
              s.drawImage(window["image_system_" + ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].IAM], ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X() + ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH() - 30, ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y() - 5, 30, 30);
            } catch (e) {
              /* Not nessesery */
            }
          }
        }

        s.restore();

        if (ROOT_GAME_OBJECT.WEBCAM != null) {//s.drawImage( , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.X() , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].POSITION.Y() + ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.HEIGHT()/2 , ROOT_GAME_OBJECT.EDITOR.BUTTONS[x].DIMENSION.WIDTH());
        }
      }
    }
  };

  this.ON_UPDATE = function () {};

  this.ON_UPDATE_SYS = function () {};

  this.UPDATE = function () {
    if (this.AUTO_UPDATE == true) {
      ROOT_GAME_OBJECT.POSITION.UPDATE();
    }

    if (ROOT_GAME_OBJECT.EDITOR.ENABLE == false) {
      if (ROOT_GAME_OBJECT.DESTROY_AFTER != null) {
        if (ROOT_GAME_OBJECT.DESTROY_AFTER > 0) {
          ROOT_GAME_OBJECT.DESTROY_AFTER--;
        }
      }
    }

    if (ROOT_GAME_OBJECT.GROUP.GROUP.length > 0) {
      for (var s = 0; s < ROOT_GAME_OBJECT.GROUP.GROUP.length; s++) {
        window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.ACCESS(ROOT_GAME_OBJECT.GROUP.GROUP[s]).POSITION.x = ROOT_GAME_OBJECT.POSITION.x - ROOT_GAME_OBJECT.GROUP.GROUP_INITIALS[s].x;
        window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS(ROOT_GAME_OBJECT.PARENT).GAME_OBJECTS.ACCESS(ROOT_GAME_OBJECT.GROUP.GROUP[s]).POSITION.y = ROOT_GAME_OBJECT.POSITION.y - ROOT_GAME_OBJECT.GROUP.GROUP_INITIALS[s].y;
      }
    }

    if (ROOT_GAME_OBJECT.DESTROY_ON_GAMEMAP_EXIT == true && ROOT_GAME_OBJECT.POSITION.Y() < window[ROOT_GAME_OBJECT.PROGRAM_NAME].MAP.UP()) {
      //alert("DESTROYED " + ROOT_GAME_OBJECT.NAME)
      window[ROOT_GAME_OBJECT.PROGRAM_NAME].ENGINE.MODULES.ACCESS_MODULE(ROOT_GAME_OBJECT.PARENT).DESTROY_OBJECT(ROOT_GAME_OBJECT.NAME);
    }

    ROOT_GAME_OBJECT.ON_UPDATE();
    ROOT_GAME_OBJECT.ON_UPDATE_SYS();
  };

  this.GAME_OBJECT_READY = function () {
    _system.default.DEBUG.LOG("ready : " + ROOT_GAME_OBJECT.NAME);
    /* 	if (OVERRIDE_DRAW_FOR_NETWORK == null){
    //ALLWAYS
    OVERRIDE_DRAW_FOR_NETWORK = ROOT_GAME_OBJECT.DRAW;
    OVERRIDE_UPDATE_FOR_NETWORK = ROOT_GAME_OBJECT.UPDATE;
    OVERRIDE_POSITION_X = ROOT_GAME_OBJECT.POSITION.X;
    OVERRIDE_POSITION_Y = ROOT_GAME_OBJECT.POSITION.Y;
    OVERRIDE_DIMENSION_WIDTH = ROOT_GAME_OBJECT.DIMENSION.WIDTH;
    OVERRIDE_DIMENSION_HEIGHT = ROOT_GAME_OBJECT.DIMENSION.HEIGHT;
    }
      if (OVERRIDE_ANIMATION_DRAW == null) {
    //NOT ALWAYS
    OVERRIDE_ANIMATION_DRAW = ROOT_GAME_OBJECT.ANIMATION.DRAW;
    OVERRIDE_ANIMATION_X = ROOT_GAME_OBJECT.ANIMATION.X;
    OVERRIDE_ANIMATION_Y = ROOT_GAME_OBJECT.ANIMATION.Y;
    OVERRIDE_ANIMATION_W = ROOT_GAME_OBJECT.ANIMATION.W;
    OVERRIDE_ANIMATION_H = ROOT_GAME_OBJECT.ANIMATION.H;
    } */

  };

  setTimeout(ROOT_GAME_OBJECT.GAME_OBJECT_READY, 15);
}

},{"../../manifest/manifest":58,"../draw_functions/animation":41,"../draw_functions/rect":42,"../draw_functions/systems":43,"../editor/editor":44,"../init":50,"../math":51,"../particule/particule":53,"../system":57}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENTS = EVENTS;

var _manifest = _interopRequireDefault(require("../../manifest/manifest"));

var _system = _interopRequireDefault(require("../system"));

var _init = require("../init");

var _editor = require("../editor/editor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EVENTS(canvas, ROOT_ENGINE) {
  var ROOT_EVENTS = this;
  this.ROOT_ENGINE = ROOT_ENGINE; //Mobile device

  if (NOMOBILE == 0) {
    /**
     * Use for Mobile device.
     * @event touchstart
     */
    canvas.addEventListener("touchstart", function (e) {
      e.preventDefault();
      var touchList = e.changedTouches; //SYS.MOUSE.PRESS = true;

      _system.default.MOUSE.x = touchList[0].pageX;
      _system.default.MOUSE.y = touchList[0].pageY;
      ROOT_EVENTS.CALCULATE_TOUCH_OR_CLICK();
    }, false);
    /**
     * Use for Mobile device.
     * @event touchend
     */

    canvas.addEventListener("touchend", function (e) {
      e.preventDefault();
      var touchList = e.changedTouches;
      _system.default.MOUSE.PRESS = false;
      _system.default.MOUSE.x = touchList[0].pageX;
      _system.default.MOUSE.y = touchList[0].pageY;
      ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
    }, false);
    /**
     * Use for Mobile device.
     * @event touchcancel
     */

    canvas.addEventListener("touchcancel", function (e) {
      e.preventDefault();
      var touchList = e.changedTouches;
      _system.default.MOUSE.PRESS = false;
      _system.default.MOUSE.x = touchList[0].pageX;
      _system.default.MOUSE.y = touchList[0].pageY;
      ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
    }, false);
    /**
     * Use for Mobile device.
     * @event touchmove
     */

    canvas.addEventListener("touchmove", function (e) {
      e.preventDefault();
      var touchList = e.changedTouches; //SYS.MOUSE.PRESS = true;

      _system.default.MOUSE.x = touchList[0].pageX;
      _system.default.MOUSE.y = touchList[0].pageY;
      ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE();
    }, false);
  } else {
    /**
     * Use for Desktop device.
     * @event click
     */
    canvas.addEventListener("click", function (e) {
      //SYS.MOUSE.PRESS = true;
      _system.default.MOUSE.x = e.layerX;
      _system.default.MOUSE.y = e.layerY;
      ROOT_EVENTS.CALCULATE_TOUCH_OR_CLICK(); //SYS.DEBUG.LOG("SYS : CLICK EVENT " + canvas);
    }, false);
    /**
     * Use for Desktop device.
     * @event mouseup
     */

    canvas.addEventListener("mouseup", function (e) {
      _system.default.MOUSE.PRESS = false;
      _system.default.MOUSE.BUTTON_PRESSED = null;
      _system.default.MOUSE.x = e.layerX;
      _system.default.MOUSE.y = e.layerY;
      ROOT_EVENTS.CALCULATE_TOUCH_UP_OR_MOUSE_UP();
    }, false);
    /**
     * Use for Desktop device.
     * @event onmousemove
     */

    canvas.onmousemove = function (e) {
      _system.default.MOUSE.x = e.layerX;
      _system.default.MOUSE.y = e.layerY;
      ROOT_EVENTS.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE();
    };
    /**
     * Use for Desktop device.
     * @event onmousedown
     */


    canvas.onmousedown = function (e) {
      _system.default.MOUSE.PRESS = true;

      if (e.which == 3) {
        _system.default.MOUSE.BUTTON_PRESSED = "RIGHT";

        _system.default.MOUSE.ON_RIGHT_BTN_PRESSED();

        _system.default.DEBUG.LOG("Right button clicked");
      } else if (e.which == 2) {
        _system.default.MOUSE.BUTTON_PRESSED = "MID";

        _system.default.MOUSE.ON_MID_BTN_PRESSED();

        _system.default.DEBUG.LOG("Mid button clicked");
      } else if (e.which == 1) {
        _system.default.MOUSE.BUTTON_PRESSED = "LEFT";

        _system.default.MOUSE.ON_LEFT_BTN_PRESSED();

        _system.default.DEBUG.LOG("Left button clicked");
      }

      _system.default.MOUSE.x = e.layerX;
      _system.default.MOUSE.y = e.layerY;
      ROOT_EVENTS.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN();
    }; //console.log("This is PC desktop device.");

  } //Calculate touch or click event


  this.CALCULATE_TOUCH_OR_CLICK = function () {
    for (var x = 0; x < this.ROOT_ENGINE.MODULES.length; x++) {
      for (var z = 0; z < ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length; z++) {
        var local_go = ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS[z];

        if (_system.default.MOUSE.x > local_go.POSITION.X() && _system.default.MOUSE.x < local_go.POSITION.X() + local_go.DIMENSION.WIDTH() && _system.default.MOUSE.y > local_go.POSITION.Y() && _system.default.MOUSE.y < local_go.POSITION.Y() + local_go.DIMENSION.HEIGHT()) {
          if (ROOT_EVENTS.ROOT_ENGINE.ENGINE_EDITOR == false && local_go.VISIBLE != false) {
            _system.default.DEBUG.LOG("SYS : touch or click event on game object : " + local_go.NAME);

            local_go.FOCUS = true;
            local_go.TAP();
          }
        }
      }
    }
  }; // CALCULATE MOUSE MOVE OR TOUCH MOVE


  this.CALCULATE_TOUCH_MOVE_OR_MOUSE_MOVE = function () {
    for (var x = 0; x < this.ROOT_ENGINE.MODULES.length; x++) {
      var first_pass = false;

      for (var z = 0; z < ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length; z++) {
        //-------------------------------//-------------------------------//-------------------------------
        var local_go = ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS[z];

        if (_system.default.MOUSE.x > local_go.POSITION.X() && _system.default.MOUSE.x < local_go.POSITION.X() + local_go.DIMENSION.WIDTH() && _system.default.MOUSE.y > local_go.POSITION.Y() && _system.default.MOUSE.y < local_go.POSITION.Y() + local_go.DIMENSION.HEIGHT()) {
          //SYS.DEBUG.LOG( "SYS : touchmove event on game object : " + local_go.NAME);
          // EVENT ONLY OUT OF EDITOR
          if (ROOT_EVENTS.ROOT_ENGINE.ENGINE_EDITOR == false && local_go.VISIBLE == true) {
            local_go.TOUCH_MOVE();

            if (_system.default.MOUSE.PRESS == true && local_go.DRAG == true && first_pass == false && local_go.DRAG_STATUS == true) {
              first_pass = true;
              local_go.DRAG_DELTA = local_go.DRAG_START_X;

              var local_ = _init.CONVERTOR.PIX_TO_PER(parseFloat(local_go.DRAG_DELTA.toFixed(2)));

              local_go.POSITION.TRANSLATE_BY_X(parseFloat(_init.CONVERTOR.PIX_TO_PER(_system.default.MOUSE.x).toFixed(2)) - Math.abs(local_));
              local_go.DRAG_DELTA = local_go.DRAG_START_Y;

              var local_ = _init.CONVERTOR.PIY_TO_PER(parseFloat(local_go.DRAG_DELTA.toFixed(2)));

              local_go.POSITION.TRANSLATE_BY_Y(parseFloat(_init.CONVERTOR.PIY_TO_PER(_system.default.MOUSE.y).toFixed(2)) - Math.abs(local_));
            }
          }
        } else {} //-------------------------------//-------------------------------//-------------------------------
        //-------------------------------//-------------------------------//-------------------------------
        //EDITOR
        //-------------------------------//-------------------------------//-------------------------------


        if (local_go.EDITOR.ENABLE == true) {
          //-------------------------------//-------------------------------//-------------------------------
          // DRAG in EDITOR
          //-------------------------------//-------------------------------//-------------------------------
          if (_system.default.MOUSE.PRESS == true && local_go.EDITOR.ACTOR_DRAG == true && first_pass == false) {
            first_pass = true;
            local_go.EDITOR.ACTOR_DELTA = local_go.EDITOR.ACTOR_START_X + local_go.EDITOR.ACTORS_AREA_HEIGHT;

            var local_ = _init.CONVERTOR.PIX_TO_PER(parseFloat(local_go.EDITOR.ACTOR_DELTA.toFixed(2)));

            local_go.POSITION.TRANSLATE_BY_X(parseFloat(_init.CONVERTOR.PIX_TO_PER(_system.default.MOUSE.x).toFixed(2)) - Math.abs(local_));
            local_go.EDITOR.ACTOR_DELTA = local_go.EDITOR.ACTOR_START_Y + local_go.EDITOR.ACTORS_AREA_HEIGHT;

            var local_ = _init.CONVERTOR.PIY_TO_PER(parseFloat(local_go.EDITOR.ACTOR_DELTA.toFixed(2)));

            local_go.POSITION.TRANSLATE_BY_Y(parseFloat(_init.CONVERTOR.PIY_TO_PER(_system.default.MOUSE.y).toFixed(2)) - Math.abs(local_));
          } //-------------------------------//-------------------------------//-------------------------------
          //-------------------------------//-------------------------------//-------------------------------
          //-------------------------------//-------------------------------//-------------------------------
          // OBJECT MOVE
          // ACTOR X


          if (local_go.EDITOR.ACTOR_X_IN_MOVE == true) {
            local_go.EDITOR.ACTOR_DELTA = local_go.EDITOR.ACTOR_START_X;

            var local_ = _init.CONVERTOR.PIX_TO_PER(parseFloat(local_go.EDITOR.ACTOR_DELTA.toFixed(1)));

            local_go.POSITION.TRANSLATE_BY_X(parseFloat(_init.CONVERTOR.PIX_TO_PER(_system.default.MOUSE.x).toFixed(1)) - Math.abs(local_));
          } // ACTOR Y


          if (local_go.EDITOR.ACTOR_Y_IN_MOVE == true) {
            local_go.EDITOR.ACTOR_DELTA = local_go.EDITOR.ACTOR_START_Y;

            var local_ = _init.CONVERTOR.PIY_TO_PER(parseFloat(local_go.EDITOR.ACTOR_DELTA.toFixed(1)));

            local_go.POSITION.TRANSLATE_BY_Y(parseFloat(_init.CONVERTOR.PIY_TO_PER(_system.default.MOUSE.y).toFixed(1)) - Math.abs(local_));
          } //-------------------------------//-------------------------------//-------------------------------
          //HOVER
          //-------------------------------//-------------------------------//-------------------------------


          if (_system.default.MOUSE.x > local_go.POSITION.X() + local_go.EDITOR.ACTORS_AREA_HEIGHT && _system.default.MOUSE.x < local_go.POSITION.X() + local_go.EDITOR.ACTORS_AREA_HEIGHT * 15 && _system.default.MOUSE.y > local_go.POSITION.Y() && _system.default.MOUSE.y < local_go.POSITION.Y() + local_go.EDITOR.ACTORS_AREA_HEIGHT) {
            local_go.EDITOR.ACTOR_BLUE_HOVER = true;
          } else {
            local_go.EDITOR.ACTOR_BLUE_HOVER = false;
          } //-------------------------------//-------------------------------//-------------------------------
          //-------------------------------//-------------------------------//-------------------------------


          if (_system.default.MOUSE.x > local_go.POSITION.X() && _system.default.MOUSE.x < local_go.POSITION.X() + local_go.EDITOR.ACTORS_AREA_HEIGHT && _system.default.MOUSE.y > local_go.POSITION.Y() + local_go.EDITOR.ACTORS_AREA_HEIGHT && _system.default.MOUSE.y < local_go.POSITION.Y() + local_go.EDITOR.ACTORS_AREA_HEIGHT * 15) {
            local_go.EDITOR.ACTOR_GREEN_HOVER = true; //SYS.DEBUG.LOG( "SYS : green Y-ACTOR event on game object : " + local_go.NAME);
          } else {
            local_go.EDITOR.ACTOR_GREEN_HOVER = false;
          } //-------------------------------//-------------------------------//-------------------------------
          //-------------------------------//-------------------------------//-------------------------------

        } // END OF EDITOR


        if (local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE == true) {
          local_go.EDITOR.ACTOR_DRAG = false;

          for (var q = 0; q < local_go.EDITOR.BUTTONS.length; q++) {
            if (_system.default.MOUSE.x > local_go.EDITOR.BUTTONS[q].POSITION.x && _system.default.MOUSE.x < local_go.EDITOR.BUTTONS[q].POSITION.x + local_go.EDITOR.BUTTONS[q].DIMENSION.WIDTH() && _system.default.MOUSE.y > local_go.EDITOR.BUTTONS[q].POSITION.y + local_go.EDITOR.BUTTONS[q].Y_OFFSET && _system.default.MOUSE.y < local_go.EDITOR.BUTTONS[q].POSITION.y + local_go.EDITOR.BUTTONS[q].Y_OFFSET + local_go.EDITOR.BUTTONS[q].DIMENSION.HEIGHT()) {
              local_go.EDITOR.BUTTONS[q].HOVER = true;
            } else {
              local_go.EDITOR.BUTTONS[q].HOVER = false;
            }
          }
        } //-------------------------------//-------------------------------//-------------------------------

      }
    }

    if (ROOT_ENGINE.GUI.VISIBLE == true) {
      for (var x = 0; x < ROOT_ENGINE.GUI.BUTTONS.length; x++) {
        if (_system.default.MOUSE.x > ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x && _system.default.MOUSE.x < ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH() && _system.default.MOUSE.y > ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y + ROOT_ENGINE.GUI.BUTTONS[x].Y_OFFSET && _system.default.MOUSE.y < ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y + ROOT_ENGINE.GUI.BUTTONS[x].Y_OFFSET + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT()) {
          ROOT_ENGINE.GUI.BUTTONS[x].HOVER = true;
        } else {
          ROOT_ENGINE.GUI.BUTTONS[x].HOVER = false;
        }
      }
    } // LIST GUI SYSTEM EVENTS


    if (ROOT_ENGINE.GUI.VISIBLE == true) {
      for (var x = 0; x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES.length; x++) {
        if (_system.default.MOUSE.x > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.x && _system.default.MOUSE.x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.x + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH() && _system.default.MOUSE.y > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].Y_OFFSET && _system.default.MOUSE.y < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].Y_OFFSET + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT()) {
          ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].HOVER = true;
        } else {
          ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].HOVER = false;
        }
      } //BUTTONS_GAME_OBJECTS


      for (var x = 0; x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS.length; x++) {
        if (_system.default.MOUSE.x > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.x && _system.default.MOUSE.x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.x + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH() && _system.default.MOUSE.y > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].Y_OFFSET && _system.default.MOUSE.y < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].Y_OFFSET + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT()) {
          ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].HOVER = true;
        } else {
          ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].HOVER = false;
        }
      }
    } //

  }; // CALCULATE_TOUCH_UP_OR_MOUSE_UP


  this.CALCULATE_TOUCH_UP_OR_MOUSE_UP = function () {
    for (var x = 0; x < this.ROOT_ENGINE.MODULES.length; x++) {
      for (var z = 0; z < ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length; z++) {
        var local_go = ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS[z];
        local_go.EDITOR.ACTOR_X_IN_MOVE = false;
        local_go.EDITOR.ACTOR_Y_IN_MOVE = false; //-------------------------------//-------------------------------//-------------------------------
        // EDITOR
        //-------------------------------//-------------------------------//-------------------------------

        if (local_go.EDITOR.ENABLE == true) {
          local_go.EDITOR.ACTOR_DRAG = false; //-------------------------------//-------------------------------//-------------------------------
        } // end of EDITOR
        //-------------------------------//-------------------------------//-------------------------------
        // EVENT ONLY OUT OF EDITOR


        if (ROOT_EVENTS.ROOT_ENGINE.ENGINE_EDITOR == false) {
          if (_system.default.MOUSE.x > local_go.POSITION.X() && _system.default.MOUSE.x < local_go.POSITION.X() + local_go.DIMENSION.WIDTH() && _system.default.MOUSE.y > local_go.POSITION.Y() && _system.default.MOUSE.y < local_go.POSITION.Y() + local_go.DIMENSION.HEIGHT()) {
            if (local_go.VISIBLE == true) {
              local_go.TOUCH_UP();
              _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).style.cursor = "auto";
            }
          }
        }
      }
    }
  };

  this.CALCULATE_TOUCH_DOWN_OR_MOUSE_DOWN = function () {
    var selected_something = false;

    for (var x = 0; x < this.ROOT_ENGINE.MODULES.length; x++) {
      for (var z = 0; z < ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS.length; z++) {
        var local_go = ROOT_EVENTS.ROOT_ENGINE.MODULES[x].GAME_OBJECTS[z];

        if (_system.default.MOUSE.x > local_go.POSITION.X() && _system.default.MOUSE.x < local_go.POSITION.X() + local_go.DIMENSION.WIDTH() && _system.default.MOUSE.y > local_go.POSITION.Y() && _system.default.MOUSE.y < local_go.POSITION.Y() + local_go.DIMENSION.HEIGHT()) {
          local_go.EDITOR.SELECTED = true;
          selected_something = true;

          if (local_go.TYPE_OF_GAME_OBJECT == "TEXT_BOX" && local_go.TEXTBOX.EDIT == true && local_go.VISIBLE == true) {
            if (NOMOBILE == 1) {
              // for desktop mouse		HARD CODE 0/1
              if (_manifest.default.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP == true) {
                ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET_MODUL = local_go.PARENT;
                ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET = local_go.NAME;
                SHOW_KEYBOARD(local_go.NAME);
              } else {
                //normal for desktop
                local_go.FOCUS = true;
                ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.CAPTURE_CHAR = local_go.TEXTBOX.TEXT;
                ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET_MODUL = local_go.PARENT;
                ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET = local_go.NAME;
              }
            } else {
              // for mobile VirtualKeyboard
              ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET_MODUL = local_go.PARENT;
              ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET = local_go.NAME;
              SHOW_KEYBOARD(local_go.NAME);
            }
          } // EVENT ONLY OUT OF EDITOR


          if (ROOT_EVENTS.ROOT_ENGINE.ENGINE_EDITOR == false && local_go.VISIBLE == true) {
            local_go.FOCUS = true;
            local_go.TOUCH_DOWN();

            _system.default.DEBUG.LOG("SYS : touchDown or mouseDown event on game object : " + local_go.NAME); // if drag is enabled


            if (local_go.DRAG == true) {
              if (_system.default.MOUSE.BUTTON_PRESSED == "LEFT") {
                _system.default.DOM.E(local_go.PROGRAM_NAME).style.cursor = "MOVE";
                local_go.DRAG = true;
                local_go.DRAG_START_X = parseFloat(_system.default.MOUSE.x.toFixed(2) - local_go.POSITION.X());
                local_go.DRAG_START_Y = parseFloat(_system.default.MOUSE.y.toFixed(2) - local_go.POSITION.Y());
              }
            }
          }
        } else {
          local_go.FOCUS = false;
        } //-------------------------------//-------------------------------//-------------------------------
        // EDITOR
        //-------------------------------//-------------------------------//-------------------------------


        if (local_go.EDITOR.ENABLE == true) {
          //################
          if (local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE == true) {
            local_go.EDITOR.ACTOR_DRAG = false;

            for (var q = 0; q < local_go.EDITOR.BUTTONS.length; q++) {
              if (_system.default.MOUSE.x > local_go.EDITOR.BUTTONS[q].POSITION.x && _system.default.MOUSE.x < local_go.EDITOR.BUTTONS[q].POSITION.x + local_go.EDITOR.BUTTONS[q].DIMENSION.WIDTH() && _system.default.MOUSE.y > local_go.EDITOR.BUTTONS[q].POSITION.y + local_go.EDITOR.BUTTONS[q].Y_OFFSET && _system.default.MOUSE.y < local_go.EDITOR.BUTTONS[q].POSITION.y + local_go.EDITOR.BUTTONS[q].Y_OFFSET + local_go.EDITOR.BUTTONS[q].DIMENSION.HEIGHT()) {
                //-----------------------------------------------------------------------------//-----------------------------------------------------------------------------
                if (local_go.EDITOR.BUTTONS[q].IAM == "1") {
                  // DESTROY OBJECT
                  ROOT_EVENTS.ROOT_ENGINE.MODULES[x].DESTROY_OBJECT(local_go.NAME); //DESTROY( name , canvas.id  , local_go.PARENT )

                  (0, _editor.DESTROY)(local_go.NAME);

                  _system.default.DEBUG.LOG("DESTROY_OBJECT");
                } //-----------------------------------------------------------------------------//-----------------------------------------------------------------------------
                else if (local_go.EDITOR.BUTTONS[q].IAM == "2") {
                    var local_res = prompt("Destroy game_object ( Time not count in editor ):", "10");

                    if (!isNaN(parseFloat(local_res.charAt(0)))) {
                      var _name = local_go.NAME;
                      local_go.DESTROY_ME_AFTER_X_SECUND(local_res, _name, x, ROOT_EVENTS);
                    } else {
                      alert("ERROR MSG: Destroy not success.");
                    }

                    _system.default.DEBUG.LOG("Destroy...");
                  } //-----------------------------------------------------------------------------//-----------------------------------------------------------------------------
                  else if (local_go.EDITOR.BUTTONS[q].IAM == "3") {
                      var resource_list = "";

                      for (var key in window.RESOURCE) {
                        if (RESOURCE.hasOwnProperty(key) && key != "SUM") {
                          resource_list += "  " + key + ", ";
                        }
                      } // console.log("WHAT IS local_go....", local_go.ANIMATION);


                      var local_res = prompt("Full list of images source : \n " + resource_list + "   \n \n Enter name of animation resource object :", "demo1");

                      if (isNaN(parseFloat(local_res.charAt(0)))) {
                        (0, _editor.ADD_ANIMATION)(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res);
                      } else {
                        alert("ERROR MSG: ADD_ANIMATION not success.");
                      }
                    } //-----------------------------------------------------------------------------//-----------------------------------------------------------------------------
                    //-----------------------------------------------------------------------------
                    else if (local_go.EDITOR.BUTTONS[q].IAM == "4") {
                        if (local_go.COLLISION == null) {
                          // ADD COLLIDER
                          var local_res = prompt("Enter outline margin collider.", "1.02");

                          if (!isNaN(parseFloat(local_res.charAt(0)))) {
                            (0, _editor.ADD_COLLISION)(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res);
                            local_go.EDITOR.BUTTONS[q].text = "Remove collision"; //local_go.REMOVE_COLLISION(local_go.NAME  , local_go.PROGRAM_NAME , local_go.PARENT);

                            _system.default.DEBUG.LOG("add collider");
                          } else {
                            alert("ERROR MSG: ADD_COLLISION not success.");
                          }
                        } else if (local_go.EDITOR.BUTTONS[q].text == "Remove collision") {
                          REMOVE_COLLISION();
                          local_go.COLLISION = null;
                          local_go.EDITOR.BUTTONS[q].text = "Add collision";

                          _system.default.DEBUG.LOG("remove collider");
                        }
                      } //-----------------------------------------------------------------------------
                      else if (local_go.EDITOR.BUTTONS[q].IAM == "5") {
                          if (typeof PLAYER === "undefined") {
                            var local_res = prompt("Enter player type : ", "NORMAL");

                            if (isNaN(parseFloat(local_res.charAt(0)))) {
                              (0, _editor.CREATE_PLAYER)(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res, q);
                              local_go.EDITOR.BUTTONS[q].text = "Deatach player";

                              _system.default.DEBUG.LOG("atach player");
                            }
                          } else if (typeof local_go.PLAYER != "undefined") {
                            (0, _editor.DEATACH_PLAYER)(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT);
                            local_go.PLAYER = undefined;
                            PLAYER = undefined; //delete (local_go.PLAYER);
                            //delete (PLAYER);

                            local_go.EDITOR.BUTTONS[q].text = "Atach player";

                            _system.default.DEBUG.LOG("deatach player , also destroy PLAYER global object.");
                          }
                        } //-----------------------------------------------------------------------------
                        //-----------------------------------------------------------------------------
                        else if (local_go.EDITOR.BUTTONS[q].IAM == "6") {
                            if (local_go.PARTICLE == null) {
                              var local_res = prompt("Enter particle type : ", "FONTAN");

                              if (isNaN(parseFloat(local_res.charAt(0)))) {
                                (0, _editor.ADD_PARTICLE)(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res);
                                local_go.CREATE_PARTICLE(local_res);
                                local_go.EDITOR.BUTTONS[q].text = "Remove particle";

                                _system.default.DEBUG.LOG("atach player");
                              }
                            } else if (typeof local_go.PARTICLE != null) {
                              (0, _editor.REMOVE_PARTICLE)(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT);
                              local_go.TYPE_OF_GAME_OBJECT = "empty";
                              delete local_go.PARTICLE;
                              local_go.PARTICLE = null;
                              local_go.EDITOR.BUTTONS[q].text = "Add particle";

                              _system.default.DEBUG.LOG("particle removed from " + local_go.NAME);
                            }
                          } //-----------------------------------------------------------------------------
                          //-----------------------------------------------------------------------------
                          else if (local_go.EDITOR.BUTTONS[q].IAM == "7") {
                              if (local_go.TEXTBOX == null) {
                                var local_res = prompt("Enter text value : ", "HELLO");
                                var local_color = prompt("Enter color value : ", "red");
                                var local_textcolor = prompt("Enter Text color value : ", "black");
                                var local_radius = prompt("Enter rect radius  value : ", 15);
                                local_res = "" + local_res.toString();
                                (0, _editor.ADD_TEXTBOX)(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res, local_radius, local_color, local_textcolor);
                                local_go.CREATE_TEXTBOX(local_res, local_radius, local_color, local_textcolor);
                                local_go.EDITOR.BUTTONS[q].text = "Remove textbox";

                                _system.default.DEBUG.LOG("atach textbox");
                              } else if (typeof local_go.TEXTBOX != null) {
                                (0, _editor.REMOVE_TEXTBOX)(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT);
                                local_go.TYPE_OF_GAME_OBJECT = "empty";
                                delete local_go.TEXTBOX;
                                local_go.TEXTBOX = null;
                                local_go.EDITOR.BUTTONS[q].text = "Add textbox";

                                _system.default.DEBUG.LOG("textbox removed from " + local_go.NAME + " . And .TEXTBOX is :" + local_go.TEXTBOX);
                              }
                            } //-----------------------------------------------------------------------------
                            //-----------------------------------------------------------------------------
                            else if (local_go.EDITOR.BUTTONS[q].IAM == "8") {
                                if (local_go.WEBCAM == null) {
                                  var local_res = prompt("Choose NORMAL if you wanna simple webcam view or enter value 'NUI' for motion detect component + webcam view : ", "NORMAL");

                                  if (local_res == "NORMAL") {
                                    var local_type_of_dim = prompt("Just press enter to make video with the same dimensions like game_object , any other value set dimensions of webcam video. ", "GAME_OBJECT");

                                    if (local_type_of_dim == "GAME_OBJECT") {
                                      local_go.CREATE_WEBCAM(local_res, local_type_of_dim);
                                      (0, _editor.ADD_WEBCAM)(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res, local_type_of_dim);
                                      local_go.EDITOR.BUTTONS[q].text = "Remove webcam";

                                      _system.default.DEBUG.LOG("atach webcam");
                                    } else {
                                      // DIMENSIONS_TYPE = WEBCAM_DIMENSION
                                      local_go.CREATE_WEBCAM(local_res, local_type_of_dim);
                                      (0, _editor.ADD_WEBCAM)(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res, "WEBCAM_DIMENSION");
                                      local_go.EDITOR.BUTTONS[q].text = "Remove webcam";

                                      _system.default.DEBUG.LOG("atach webcam");
                                    }
                                  } else if (local_res == "NUI") {
                                    var local_type_of_dim = prompt("Just press enter to make video with the same dimensions like game_object , any other value set dimensions of webcam video. ", "GAME_OBJECT");
                                    var detectPointByVer = prompt(" Sum of motion detect point for vertical line, 8 is optimal for max value and 1 is minimum . ", 6);
                                    var detectPointByHor = prompt(" Sum of motion detect point for horizontal line, 8 is optimal for max value and 1 is minimum . ", 6);

                                    if (!isNaN(detectPointByVer) && !isNaN(detectPointByHor) && isNaN(local_type_of_dim)) {
                                      local_go.CREATE_WEBCAM(local_res, local_type_of_dim);
                                      (0, _editor.ADD_WEBCAM)(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res, local_type_of_dim, detectPointByVer, detectPointByHor);
                                      local_go.EDITOR.BUTTONS[q].text = "Remove webcam";

                                      _system.default.DEBUG.LOG("atach webcam");
                                    } else {
                                      _system.default.DEBUG.WARNING(" Error in CREATE_WEBCAM procedure Description : type of dimensions must be string , Sum of point must be number.");
                                    }
                                  }
                                } else {
                                  local_go.DESTROY_WEBCAM();
                                  (0, _editor.REMOVE_WEBCAM)(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT);
                                }
                              } else if (local_go.EDITOR.BUTTONS[q].IAM == "B1") {
                                var local_res = prompt("Set width: \n Enter float or integer object width: ", "20");

                                if (!isNaN(parseFloat(local_res.charAt(0)))) {
                                  //
                                  (0, _editor.SET_WIDTH)(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res); // ADD_ANIMATION(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res);
                                } else {
                                  alert("ERROR MSG: SET_WIDTH not success.");
                                }

                                _system.default.DEBUG.LOG("SET_WIDTH....");
                              } else if (local_go.EDITOR.BUTTONS[q].IAM == "B2") {
                                var local_res = prompt("Set width: \n Enter float or integer object height: ", "20");

                                if (!isNaN(parseFloat(local_res.charAt(0)))) {
                                  (0, _editor.SET_HEIGHT)(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res);
                                } else {
                                  alert("ERROR MSG: SET_height not success.");
                                }

                                _system.default.DEBUG.LOG("SET_height....");
                              } else if (local_go.EDITOR.BUTTONS[q].IAM == "ANIM1") {
                                var local_res = prompt("Set animation speed: \n Enter float or integer : ", "5");

                                if (!isNaN(parseFloat(local_res.charAt(0))) && local_go.ANIMATION != null) {
                                  (0, _editor.SET_ANIMATION_SPEED)(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res);
                                } else {
                                  alert("ERROR MSG: SET_ANIMATION_SPEED not success.");
                                }

                                _system.default.DEBUG.LOG("SET_ANIMATION_SPEED....");
                              } else if (local_go.EDITOR.BUTTONS[q].IAM == "ANIM2") {
                                var local_res = prompt("Set animation draw type: \n Enter LOOP or DRAW_FRAME : ", "DRAW_FRAME");

                                if (isNaN(parseFloat(local_res.charAt(0))) && local_go.ANIMATION != null) {
                                  (0, _editor.SET_ANIMATION_TYPE)(local_go.NAME, local_go.PROGRAM_NAME, local_go.PARENT, local_res);
                                } else {
                                  alert("ERROR MSG: SET_ANIMATION_SPEED not success.");
                                }

                                _system.default.DEBUG.LOG("SET_ANIMATION_SPEED....");
                              }
              } else {
                local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE = false;
              }
            }
          }

          if (_system.default.MOUSE.x > local_go.EDITOR.ACTOR_DRAG_RECT_POS.X() + local_go.EDITOR.ACTORS_AREA_HEIGHT && _system.default.MOUSE.x < local_go.EDITOR.ACTOR_DRAG_RECT_POS.X() + local_go.EDITOR.ACTOR_DRAG_RECT_DIM.WIDTH() + local_go.EDITOR.ACTORS_AREA_HEIGHT && _system.default.MOUSE.y > local_go.EDITOR.ACTOR_DRAG_RECT_POS.Y() + local_go.EDITOR.ACTORS_AREA_HEIGHT && _system.default.MOUSE.y < local_go.EDITOR.ACTOR_DRAG_RECT_POS.Y() + local_go.EDITOR.ACTOR_DRAG_RECT_DIM.HEIGHT() + local_go.EDITOR.ACTORS_AREA_HEIGHT) {
            if (_system.default.MOUSE.BUTTON_PRESSED == "LEFT") {
              local_go.EDITOR.ACTOR_DRAG = true;
              local_go.EDITOR.ACTOR_START_X = parseFloat(_system.default.MOUSE.x.toFixed(2) - local_go.POSITION.X() - local_go.EDITOR.ACTORS_AREA_HEIGHT);
              local_go.EDITOR.ACTOR_START_Y = parseFloat(_system.default.MOUSE.y.toFixed(2) - local_go.POSITION.Y() - local_go.EDITOR.ACTORS_AREA_HEIGHT);
            } else if (_system.default.MOUSE.BUTTON_PRESSED == "RIGHT") {
              if (local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE == false) {
                for (var w = 0; w < local_go.EDITOR.BUTTONS.length; w++) {
                  local_go.EDITOR.BUTTONS[w].POSITION.x = _system.default.MOUSE.x;
                  local_go.EDITOR.BUTTONS[w].POSITION.y = _system.default.MOUSE.y;
                }

                local_go.EDITOR.GAME_OBJECT_MENU.VISIBLE = true;
              }
            }
          } // HOVER  ACTORS


          if (local_go.EDITOR.ACTOR_BLUE_HOVER == true) {
            local_go.EDITOR.ACTOR_X_IN_MOVE = true;
            local_go.EDITOR.ACTOR_START_X = parseFloat(_system.default.MOUSE.x.toFixed(2) - local_go.POSITION.X());
          } else if (local_go.EDITOR.ACTOR_GREEN_HOVER == true) {
            local_go.EDITOR.ACTOR_Y_IN_MOVE = true;
            local_go.EDITOR.ACTOR_START_Y = parseFloat(_system.default.MOUSE.y.toFixed(2) - local_go.POSITION.Y());
          }

          if (selected_something == false) {
            local_go.DESELECT_ALL();
          }
        } // end of EDITOR


        if (selected_something == false && local_go.NAME.indexOf("___VIRTUALKEYBOARD") == -1) {
          ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET_MODUL = undefined;
          ROOT_EVENTS.ROOT_ENGINE.KEYBOARD.TARGET = undefined;
        } // local_go

      }
    }

    if (ROOT_ENGINE.ENGINE_EDITOR == true) {
      if (ROOT_ENGINE.GUI.VISIBLE == false && selected_something == false && _system.default.MOUSE.BUTTON_PRESSED == "RIGHT") {
        for (var x = 0; x < ROOT_ENGINE.GUI.BUTTONS.length; x++) {
          ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x = _system.default.MOUSE.x;
          ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y = _system.default.MOUSE.y;
        }

        ROOT_ENGINE.GUI.VISIBLE = true;
      } else if (ROOT_ENGINE.GUI.VISIBLE == true) {
        for (var x = 0; x < ROOT_ENGINE.GUI.BUTTONS.length; x++) {
          if (_system.default.MOUSE.x > ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x && _system.default.MOUSE.x < ROOT_ENGINE.GUI.BUTTONS[x].POSITION.x + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.WIDTH() && _system.default.MOUSE.y > ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y + ROOT_ENGINE.GUI.BUTTONS[x].Y_OFFSET && _system.default.MOUSE.y < ROOT_ENGINE.GUI.BUTTONS[x].POSITION.y + ROOT_ENGINE.GUI.BUTTONS[x].Y_OFFSET + ROOT_ENGINE.GUI.BUTTONS[x].DIMENSION.HEIGHT()) {
            if (ROOT_ENGINE.GUI.BUTTONS[x].IAM == "1") {
              // ADD NEW OBJECT
              var sign_name = prompt("Enter gameObject name :", "noname");

              if (isNaN(parseFloat(sign_name.charAt(0)))) {
                var sign_name2 = prompt("Enter gameObject parent modul :", "STARTER");

                if (isNaN(parseFloat(sign_name.charAt(0)))) {
                  (0, _editor.ADD)(sign_name, 45, 45, 10, 10, canvas.id, sign_name2);
                } else {
                  alert("ERROR MSG: GameObject name created not success.");
                }
              } else {
                alert("ERROR MSG: GameObject name created not success.");
              }
            } else if (ROOT_ENGINE.GUI.BUTTONS[x].IAM == "2") {
              for (var z = 0; z < _system.default.RUNNING_PROGRAMS.length; z++) {
                window[_system.default.RUNNING_PROGRAMS[z]].ENGINE.EXIT_EDIT_MODE();
              }
            } else if (ROOT_ENGINE.GUI.BUTTONS[x].IAM == "3") {
              //runtime only
              // change draw interval and update
              var sign_name = prompt("Enter   program DRAW_INTERVAL :", 15);

              if (!isNaN(parseFloat(sign_name))) {
                var sign_name2 = prompt("Enter  program UPDATE_INTERVAL :", 15);

                if (!isNaN(parseFloat(sign_name2))) {
                  _system.default.DEBUG.LOG("Program interval now is   " + sign_name + "  . best range is [1 , 70]  ");

                  window[ROOT_ENGINE.PROGRAM_ID].DRAW_INTERVAL = parseFloat(sign_name);
                  window[ROOT_ENGINE.PROGRAM_ID].UPDATE_INTERVAL = parseFloat(sign_name2);
                  (0, _editor.SET_MAIN_INTERVAL)(ROOT_ENGINE.PROGRAM_ID, sign_name, sign_name2);
                } else {
                  alert("ERROR MSG: Program interval not success changed.");
                }
              } else {
                alert("ERROR MSG: Program interval not success changed.");
              }
            } else if (ROOT_ENGINE.GUI.BUTTONS[x].IAM == "4") {
              if (_manifest.default.ACCOUNT_SERVICE_AUTO_RUN == true) {
                _manifest.default.ACCOUNT_SERVICE_AUTO_RUN = false;
                ROOT_ENGINE.GUI.BUTTONS[3].text = "Switch AutoConnect to true";
              } else {
                _manifest.default.ACCOUNT_SERVICE_AUTO_RUN = true;
                ROOT_ENGINE.GUI.BUTTONS[3].text = "Switch AutoConnectt to false";
              }

              (0, _init.SAVE)("Application", _manifest.default);
            } else if (ROOT_ENGINE.GUI.BUTTONS[x].IAM == "5") {
              if (_manifest.default.EDITOR_AUTORUN == true) {
                _manifest.default.EDITOR_AUTORUN = false;
                ROOT_ENGINE.GUI.BUTTONS[4].text = "Switch editorAutoRun to true";
              } else {
                _manifest.default.EDITOR_AUTORUN = true;
                ROOT_ENGINE.GUI.BUTTONS[4].text = "Switch editorAutoRun to false";
              }

              (0, _init.SAVE)("Application", _manifest.default);
            } else if (ROOT_ENGINE.GUI.BUTTONS[x].IAM == "6") {
              // clear all
              (0, _editor.DELETE_FROM_VISUAL_SCRIPTS)(ROOT_ENGINE.PROGRAM_ID);
            } // DELETE_FROM_VISUAL_SCRIPTS

          }
        }

        ROOT_ENGINE.GUI.VISIBLE = false;
      }

      if (ROOT_ENGINE.GUI.LIST_OF_OBJECTS.VISIBLE == true) {
        for (var x = 0; x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES.length; x++) {
          if (_system.default.MOUSE.x > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.x && _system.default.MOUSE.x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.x + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.WIDTH() && _system.default.MOUSE.y > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].Y_OFFSET && _system.default.MOUSE.y < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].Y_OFFSET + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].DIMENSION.HEIGHT()) {
            ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_MODULES[x].TAP();
          }
        } // GUI BUTTON LIST SYSTEM TAP EVENT


        for (var x = 0; x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS.length; x++) {
          if (_system.default.MOUSE.x > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.x && _system.default.MOUSE.x < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.x + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.WIDTH() && _system.default.MOUSE.y > ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].Y_OFFSET && _system.default.MOUSE.y < ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].POSITION.y + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].Y_OFFSET + ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].DIMENSION.HEIGHT()) {
            ROOT_ENGINE.GUI.LIST_OF_OBJECTS.BUTTONS_GAME_OBJECTS[x].TAP();
          }
        }
      }
    }
  };
}

},{"../../manifest/manifest":58,"../editor/editor":44,"../init":50,"../system":57}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randLetter = randLetter;
exports.DETECTBROWSER = DETECTBROWSER;
exports.LOG = LOG;
exports.DOM = DOM;
exports.test_webcam_device = test_webcam_device;
exports.SET_STREAM = SET_STREAM;
exports.initialize = initialize;
exports.LS_SET = LS_SET;
exports.LS_GET = LS_GET;
exports.SAVE = SAVE;
exports.LOAD = LOAD;
exports.readXML = readXML;
exports.xmlToJson = xmlToJson;
exports.MONITOR = MONITOR;
exports.OVERRIDE_TO_REF_CANVAS = OVERRIDE_TO_REF_CANVAS;
exports.removeItem = removeItem;
exports.remove_last = remove_last;
exports.SOUND = SOUND;
exports.drawRotatedImage = drawRotatedImage;
exports.drawRotatedText = drawRotatedText;
exports.drawRotatedTextNoSkrech = drawRotatedTextNoSkrech;
exports.roundedRect = roundedRect;
exports.TRACK_NOW = TRACK_NOW;
exports.GRADIENT = GRADIENT;
exports.CREATE_IMG = CREATE_IMG;
exports.validateEmail = validateEmail;
exports.DEEP_COPY = exports.CONVERTOR = exports.VIEW = exports.PAGE = exports.lineLength = exports.SCRIPT = void 0;

var _system = _interopRequireDefault(require("./system"));

var _program = _interopRequireDefault(require("./program"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function randLetter() {
  const randomLetter = _ => String.fromCharCode(0 | Math.random() * 26 + 97),
        randomStrOf15Chars = Array(15).fill().map(randomLetter).join('');

  return randomStrOf15Chars;
}
/**
 * This class will detect you device and browser and
 * store data. Instance already stored intro SYS.BROWSER
 * global object.
 * Access trow SYS.BROWSER
 *
 * @example var Browser = new DETECTBROWSER();
 * @class DETECTBROWSER
 * @constructor
 * @return {nothing}
 *
 */


function DETECTBROWSER() {
  var HREFF,
      HREFTXT = "unknown";
  this.NAVIGATOR = navigator.userAgent;
  var NAV = navigator.userAgent;
  var gecko, navIpad, operatablet, navIphone, navFirefox, navChrome, navOpera, navSafari, navandroid, mobile, navMozilla, navUbuntu, navLinux;
  navLinux = NAV.match(/Linux/gi);
  navUbuntu = NAV.match(/Ubuntu/gi);
  gecko = NAV.match(/gecko/gi);
  navOpera = NAV.match(/Opera|OPR\//) ? true : false;
  operatablet = NAV.match(/Tablet/gi);
  navIpad = NAV.match(/ipad/gi);
  navIphone = NAV.match(/iphone/gi);
  navFirefox = NAV.match(/Firefox/gi);
  navMozilla = NAV.match(/mozilla/gi);
  navChrome = NAV.match(/Chrome/gi);
  navSafari = NAV.match(/safari/gi);
  navandroid = NAV.match(/android/gi);
  mobile = NAV.match(/mobile/gi);
  window["TYPEOFANDROID"] = 0;
  window["NOMOBILE"] = 0;
  var mobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase());

  if (mobile) {
    var userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.search("android") > -1 && userAgent.search("mobile") > -1) {
      console.log("ANDROID MOBILE");
    } else if (userAgent.search("android") > -1 && !(userAgent.search("mobile") > -1)) {
      console.log(" ANDROID TABLET ");
      TYPEOFANDROID = 1;
    }
  } else {
    NOMOBILE = 1;
  } //  FIREFOX za android


  if (navFirefox && navandroid && TYPEOFANDROID == 0) {
    HREFF = "#";
    HREFTXT = "mobile_firefox_android";
  } //  FIREFOX za android T


  if (navFirefox && navandroid && TYPEOFANDROID == 1) {
    HREFF = "#";
    HREFTXT = "mobile_firefox_android_tablet";
  } // OPERA ZA ANDROID


  if (navOpera && navandroid) {
    HREFF = "#";
    HREFTXT = "opera_mobile_android";
  } // provera
  // OPERA ZA ANDROID TABLET


  if (navOpera && navandroid && operatablet) {
    HREFF = "#";
    HREFTXT = "opera_mobile_android_tablet";
  } // provera
  //  safari mobile za IPHONE - i  safari mobile za IPAD i CHROME za IPAD


  if (navSafari) {
    var Iphonesafari = NAV.match(/iphone/gi);

    if (Iphonesafari) {
      HREFF = "#";
      HREFTXT = "safari_mobile_iphone";
    } else if (navIpad) {
      HREFF = "#";
      HREFTXT = "mobile_safari_chrome_ipad";
    } else if (navandroid) {
      HREFF = "#";
      HREFTXT = "android_native";
    }
  } // TEST CHROME


  if (navChrome && navSafari && navMozilla && TYPEOFANDROID == 1) {
    HREFF = "#";
    HREFTXT = "mobile_chrome_android_tablet";
  }

  if (navChrome && navSafari && navMozilla && TYPEOFANDROID == 0) {
    HREFF = "#";
    HREFTXT = "mobile_chrome_android";
  }

  if (navChrome && TYPEOFANDROID == 0) {
    HREFF = "#";
    HREFTXT = "chrome_browser";
  }

  if (navMozilla && NOMOBILE == 1 && gecko && navFirefox) {
    HREFF = "#";
    HREFTXT = "firefox_desktop";
  }

  if (navOpera && TYPEOFANDROID == 0 && !mobile) {
    HREFF = "#";
    HREFTXT = "opera_desktop";
  } //linux


  if (navUbuntu && navMozilla && navFirefox && navLinux) {
    HREFF = "#";
    HREFTXT = "firefox_desktop_linux";
  }

  if (navMozilla && navLinux && navChrome && navSafari) {
    HREFF = "#";
    HREFTXT = "chrome_desktop_linux";
  }

  if (navMozilla && navLinux && navChrome && navSafari && navOpera) {
    HREFF = "#";
    HREFTXT = "opera_desktop_linux";
  }
  /**
   * Template for this view's container...
   * NOMOBILE = 1 means desktop platform
   * @example This is ENUMERATORS for property NAME :
   * "mobile_firefox_android"
   * "mobile_firefox_android_tablet"
   * "opera_mobile_android"
   * "opera_mobile_android_tablet"
   * "safari_mobile_iphone"
   * "mobile_safari_chrome_ipad"
   * "android_native"
   * "mobile_chrome_android_tablet"
   * "mobile_chrome_android"
   * "chrome_browser"
   * "firefox_desktop"
   * "opera_desktop"
   * "firefox_desktop_linux"
   * "chrome_desktop_linux"
   * "opera_desktop_linux" .
   * @property NAME
   * @type {String}
   * @default "unknown"
   */


  this.NAME = HREFTXT;
  /**
   * NOMOBILE = 1 Means desktop platform (Any win , mac or linux etc..)
   * NOMOBILE = 2 Means mobile platform (iOS , android etc.)
   * @property NOMOBILE
   * @type Number
   * @default "unknown"
   */

  this.NOMOBILE = NOMOBILE;
}
/**
 * Loading JS scripts in runtime.
 * @function SCRIPT.LOAD
 * @param name
 * @param src
 */


var SCRIPT = {
  SCRIPT_ID: 0,
  LOAD: async function addScript(src, isAsync) {
    return new Promise((resolve, reject) => {
      var s = document.createElement("script");
      if (typeof isAsync !== 'undefined') s.type = "module";

      s.onload = function () {
        SCRIPT.SCRIPT_ID++;
        console.log('\x1b[36m%s\x1b[0m', "Script id loaded [" + SCRIPT.SCRIPT_ID + "] : " + this.src);
        var filename = this.src.substring(this.src.lastIndexOf("/") + 1, this.src.lastIndexOf("."));
        filename = filename.replace(".", "_");
        resolve('Async js code block loaded and executed.');
      };

      s.setAttribute("src", src);
      document.body.appendChild(s);
    });
  }
};
/**
 * LOG is class but we use single instance.
 * Access point  : SYS.DEBUG
 * @example new LOG()  Usage : SYS.DEBUG.LOG("Hello")
 * @class LOG
 * @constructor
 * @return nothing
 */

exports.SCRIPT = SCRIPT;

function LOG() {
  /** We can disable logs any time
   * @prop ENABLE {Boolean} Logs work with true , log disabled with false.
   * @type {Boolean}
   */
  this.ENABLE = true;
  /**
   * LOG is class but we use single instance.
   * @Alias LOG#LOG
   * @Class LOG
   * @Method LOG
   * @param {Any} Data Just log anything like console.log dones. Usage : SYS.DEBUG.LOG("Hello")
   * @return {Any} printing console.log
   */

  this.LOG = function (data) {
    if (this.ENABLE == true) {
      console.log("%c" + data, "background: #333; color: lime");
    }
  };
  /**
   * LOG is class but we use single instance.
   * @description Access point : SYS.DEBUG.WARNING
   * @alias LOG#WARNING
   * @param {Any} Data Just log anything like console.log dones. Usage : SYS.DEBUG.WARNING("Hello maybe something wrong!")
   * @return {Any} printing console.warn
   */


  this.WARNING = function (data) {
    if (this.ENABLE == true) {
      console.warn("%c Warning : " + data, "background: #333; color: yellow");
    }
  };
  /**
   * LOG is class but we use single instance.
   * @alias LOG#CRITICAL
   * @param {Any} Data Just log anything like console.log dones. Usage : SYS.DEBUG.CRITICAL("Hello maybe something wrong!")
   * @return {Any} printing console.log
   */


  this.CRITICAL = function (data) {
    if (this.ENABLE == true) {
      console.warn("%c Critical : " + data, "background: #333; color: red");
    }
  };
  /**
   * LOG is class but we use single instance.
   * @alias LOG#NETWORK_LOG
   * @param {Any} Data Just log anything like console.log dones. Usage : SYS.DEBUG.NETWORK_LOG("Hello networking!")
   * @return {Any} printing console.log
   */


  this.NETWORK_LOG = function (data) {
    if (this.ENABLE == true) {
      console.log("%c Network view : " + data, "background: #333; color: #a7afaf");
    }
  };
}
/**
 * DOM is class but we used princip one single instance.
 * Instance already created and stored intro
 * SYS.DOM object.
 * @example new DOM()  Usage : SYS.DOM
 * @class DOM
 * @constructor
 * @return {Any} nothing
 */


function DOM() {
  /**
   * Returns dom html element object
   *
   * @alias DOM#E
   * @param {String} Id Id of html element.
   * @return {HtmlObject} point to html element.
   */
  this.E = function (id) {
    return document.getElementById(id);
  };
  /**
   * Returns dom iframe html document object
   *
   * @alias DOM#ACCESS_IFRAME
   * @param {String} Id Id of html iframe element.
   * @return {Object} point to iframe document object.
   */


  this.ACCESS_IFRAME = function (name) {
    return document.getElementById(name).contentWindow;
  };
  /**
   * GOTO is navigate to new url address
   * Work on all modern browsers.
   * @alias DOM#GOTO
   * @param {String} Url_ Url_ of new html page.
   * @return nothing
   */


  this.GOTO = function (url_) {
    location.assign(url_);
  };
  /**
   * UPLOAD_FILE - Runtime creating input element with type "file"
   * @alias DOM#UPLOAD_FILE
   * @param {String} Id_ Id for input type=file element
   * @param {method} Atach event
   * @return {Object} point to iframe document object.
   */


  this.UPLOAD_FILE = function (id_, onchange) {
    var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
    x.setAttribute("id", id_);
    x.setAttribute("style", "display:block;");
    document.getElementById("UPLOAD_BOX").appendChild(x);
    window["FILE_" + id_] = document.getElementById(id_);

    window["FILE_" + id_].onchange = function () {
      _system.default.DEBUG.LOG("New file comes...");
    };

    if (typeof onchange !== "undefined") {
      window["FILE_" + id_].onchange = onchange;
    } //document.body.appendChild(x);

  };
  /**
   * CREATE_SURFACE - Canvas2d staff
   * @alias DOM#CREATE_SURFACE
   * @param {canvas2dContext} ctx
   * @param {String} Name_of_canvas Id of canvas element. Optimal.
   * @param {number} w Value for width (percent or pixel depens on resizeType)
   * @param {number} h Value for width (percent or pixel depens on resizeType)
   * @param {String} resizeType
   * @return nothing
   */


  this.CREATE_SURFACE = function (ctx, name_of_canvas, w, h, resizeType) {
    this.c = document.getElementById(name_of_canvas);

    if (this.c == null) {
      this.c = document.createElement('canvas');
      this.c.id = name_of_canvas;
      document.body.appendChild(this.c);
    }

    if (typeof resizeType === "undefined" || resizeType == "DIAMETRIC") {
      /**
       * RESIZE_TYPE
       *
       * @property {String} RESIZE_TYPE
       * @default {string} "DIAMETRIC"
       */
      this.RESIZE_TYPE = "DIAMETRIC";
      this.W_PIX = w;
      this.H_PIX = h;
      this.c.width = CONVERTOR.PER_TO_PIX(this.W_PIX);
      this.c.height = CONVERTOR.PER_TO_PIY(this.H_PIX);
    } else if (resizeType == "FIXED") {
      this.RESIZE_TYPE = "FIXED";
    } else {
      this.RESIZE_TYPE = "DIAMETRIC";
    }

    window[ctx] = this.c.getContext("2d");

    _system.default.DEBUG.LOG("SYS : Surface created , program name is " + name_of_canvas);

    _system.default.RUNNING_PROGRAMS.push(name_of_canvas);

    window[name_of_canvas] = new _program.default(window[ctx], this.c);
    window[name_of_canvas].DRAW();
  };
  /**
   *  Destroy DOM element.
   * @alias DOM#removeElement
   * @param {HtmlObject} ParentDiv ParentDiv
   * @param {HtmlObject} ChildDiv ChildDiv for destroying
   * @return {Any} false - if removing faild.
   */


  this.removeElement = function (parentDiv, childDiv) {
    if (typeof childDiv == "undefined") {
      console.log("remove now");
      document.body.removeChild(parentDiv);
    } else if (document.getElementById(childDiv)) {
      var child = document.getElementById(childDiv);
      var parent = document.getElementById(parentDiv);
      parent.removeChild(child);
      parent.style.zIndex = 0;
      parent.style.display = "none";
    } else {
      return false;
    }
  };
  /**
   *  Destroy DOM element.
   * @alias DOM#DESTROY_PROGRAM
   * @param {string} Name Name of program (alias name of canvas element)
   * @return {Any} false -if faild
   */


  this.DESTROY_PROGRAM = function (name) {
    if (typeof name === "undefined") {
      _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.DOM.DESTROY_PROGRAM'  Desciption : arrg name :>> " + typeof name + " << not valid.");
    } else if (typeof window[name] === "undefined") {
      _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.DOM.DESTROY_PROGRAM'  Desciption : program with  name: " + name + " not exist. ");
    } else {
      //memory
      window[name].DRAW = function () {};

      window[name].UPDATE = function () {};

      window[name].DRAW_INTERVAL = undefined;
      window[name].UPDATE_INTERVAL = undefined;
      window[name].AUTO_UPDATE = [];
      window[name].AUTO_UPDATE = undefined;
      window[name] = undefined;
      delete window[name]; //remove dom element canvas
      //this.removeElement(SYS.DOM.E(name));

      _system.default.RUNNING_PROGRAMS.unset(name);

      _system.default.DEBUG.LOG("SYS : log for procedure 'SYS.DOM.DESTROY_PROGRAM'  Desciption : program with  name :" + name + " is dead. Memory clear .");
    }
  };

  this.LANCH_FULLSCREEN = function (element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };
  /**
   * Exit from fullScreen regime.
   * @alias DOM#EXIT_FULLSCREEN
   * @return nothing
   */


  this.EXIT_FULLSCREEN = function () {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  };

  this.FS_FLAG = 0;
  /**
   * Go to fullscreen
   * @alias DOM#FULL_SCREEN
   * @return nothing
   */

  this.FULL_SCREEN = function () {
    if (this.FS_FLAG == 0) {
      this.LANCH_FULLSCREEN(document.documentElement);
      this.FS_FLAG = 1;
    } else if (this.FS_FLAG == 1) {
      this.EXIT_FULLSCREEN();
      this.FS_FLAG = 0;
    }
  };
}
/**
 * Test webcam device is global method.
 * @function test_webcam_device
 * @return {boolean} True Means webcam operartion supported.
 */


function test_webcam_device() {
  function hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }

  if (hasGetUserMedia()) {
    // console.log("webcam operartion support");
    return true;
  } else {
    console.warn("Webcam operation faild...");
    return false;
  }
}
/**
 * Set Stream
 * @function SET_STREAM will activate webcam , getUserMedia inside.
 * @return {boolean} True Means webcam operartion supported.
 * @access global SET_STREAM
 */


function SET_STREAM(video) {
  /**
   * webcamError webcamError
   * @private
   * @memberof SET_STREAM method
   */
  var webcamError = function (e) {
    alert("Webcam error!", e);
  };

  if (navigator.webkitGetUserMedia) {
    navigator.webkitGetUserMedia({
      audio: true,
      video: true
    }, function (stream) {
      video.srcObject = stream; //video.src = window.URL.createObjectURL(stream);
      // initialize();
    }, webcamError);
  } else if (navigator.getUserMedia) {
    navigator.getUserMedia({
      audio: true,
      video: true
    }, function (stream) {
      //video.src = stream;
      video.src = window.URL.createObjectURL(stream); //initialize();
    }, webcamError);
  } else {
    alert("webcam broken.");
  }
}
/**
 * Cheking AudioContext browser support.
 * @function initialize
 * @access global initialize
 */


function initialize() {
  if (!AudioContext) {
    alert("AudioContext not supported!");
  } else {
    loadSounds();
  }
}

var lineLength = function (x, y, x0, y0) {
  return Math.sqrt((x -= x0) * x + (y -= y0) * y);
};

exports.lineLength = lineLength;
var PAGE = {
  SET_ICON: function (SRC) {
    var link = document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon"; //SRC
    //link.href = 'http://www.stackoverflow.com/favicon.ico';

    link.href = "favicon.png";
    document.getElementsByTagName("head")[0].appendChild(link);
  },
  ANIMATE_ICON: null,
  ANIMATE: function () {//this.ANIMATE_ICON = setInterval(function(){
    //},200);
  }
};
/**
 * LOCAL STORAGE OPERATION
 * LS_SET is LocalStorage function.
 * @example Usage : LS_SET("MyObjectKey", myObject )
 * @function LS_SET
 * @param {String} Name Name of localstorage key
 * @param {Any} Value Any object we can store.
 * @return nothing
 */

exports.PAGE = PAGE;

function LS_SET(name, value) {
  try {
    localStorage.setItem(name, value);
  } catch (e) {
    console.info("No access for localStorage!");
  }
}
/**
 * LS_GET is LocalStorage function
 * @example Usage : LS_GET("MyObjectKey", myObject )
 * @function LS_GET
 * @param {String} Name Name of localstorage key
 * @return {Any} What ever we are stored intro localStorage.
 */


function LS_GET(name) {
  try {
    var l = localStorage.getItem(name);
    return l;
  } catch (e) {
    console.info("No access for localStorage!");
    return null;
  }
}
/**
 * SAVE  Put the object into storage.
 * @example Usage : SAVE("MyObjectKey", myObject )
 * @function SAVE
 * @param {String} Name Name of localstorage key
 * @param {Any} Value Any object we can store.
 * @return {Any} What ever we are stored intro localStorage.
 */


function SAVE(name, obj) {
  try {
    localStorage.setItem(name, JSON.stringify(obj));
    console.log(JSON.stringify(obj));
  } catch (e) {
    console.info("No access for localStorage!");
  }
}
/**
 * LOAD  Load a object from storage. Retrieve the object from storage
 * @example Usage : LOAD("MyObjectKey")
 * @function LOAD
 * @param {String} Name Name of localstorage key
 * @return {Any} What ever we are stored intro localStorage.
 */


function LOAD(name) {
  try {
    if (localStorage.getItem(name) == "undefined" || localStorage.getItem(name) == null || localStorage.getItem(name) == "") {
      // SYS.DEBUG.WARNING(
      //   "localstorage object with name: " +
      //     name +
      //     " , returns " +
      //     localStorage.getItem(name)
      // );
      return false;
    } else {
      return JSON.parse(localStorage.getItem(name));
    }
  } catch (e) {
    console.info("No access for localStorage!");
  }
}
/**
 * FILES OPERATION
 * @example Usage : readXML("MyObjectKey")
 * @function readXML
 * @param {String} Path Path url to the source file.
 * @param {String} Operation operation is flag. He can be undefined or can be literal string "CONVER_TO_OBJ" (We got xml data but we want to convert it to the json object direct) .
 * @return {Any} responseText from Xmlrequest or Object
 */


function readXML(path, operation) {
  var ROOT = this;

  if (window.XMLHttpRequest) {
    ROOT.xmlhttpGA = new XMLHttpRequest();
  }

  ROOT.xmlhttpGA.open("GET", path, true);
  ROOT.xmlhttpGA.send();
  ROOT.L = "";

  ROOT.xmlhttpGA.onreadystatechange = function () {
    if (this.readyState !== 4) return;
    if (this.status !== 200) return; // or whatever error handling you want

    if (typeof operation === "undefined") {
      ROOT.L = this.responseText;
    } else if (operation == "CONVER_TO_OBJ") {
      ROOT.L = xmlToJson(this.responseXML);
    } else {
      ROOT.L = this.responseText;
    }
  };
}

function xmlToJson(xml) {
  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};

      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    // text
    obj = xml.nodeValue;
  } // do children


  if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;

      if (typeof obj[nodeName] == "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }

        obj[nodeName].push(xmlToJson(item));
      }
    }
  }

  var private_call = JSON.stringify(obj);
  private_call.replace("#text", "text"); // Fix literal # symbol

  return JSON.parse(private_call);
} // MONITOR AND BROWSER_VIEW- COORDINATE SYSTEM


function MONITOR() {}
/**
 * VIEW
 * @example Usage : VIEW.W(50)
 * @Object VIEW
 */


var VIEW = {
  /**
   * VIEW Object
   * @example Usage : VIEW.W(50)
   * @memberof VIEW
   * @param {Number} Represent percent of body width - window.innerWidth
   * @return {Number} Value in pixels
   */
  W: function (per) {
    if (typeof per === "undefined") {
      return window.innerWidth;
    } else {
      return window.innerWidth / 100 * per;
    }
  },

  /**
   * VIEW Object
   * @example Usage : VIEW.H(50)
   * @alias VIEW#H
   * @param {Number} Represent percent of body height - window.innerHeight
   * @return {Number} Value in pixels
   */
  H: function (per) {
    if (typeof per === "undefined") {
      return window.innerHeight;
    } else {
      return window.innerHeight / 100 * per;
    }
  },

  /**
   * VIEW Object ASPECT
   * @example Usage : VIEW.ASPECT()
   * @alias VIEW#ASPECT
   * @return {Number} Value in aspectRatio for current window (body).
   */
  ASPECT: function () {
    return window.innerWidth / window.innerHeight;
  }
};
/**
 * OVERRIDE_TO_REF_CANVAS
 * Future feature related function!
 * @example Usage : OVERRIDE_TO_REF_CANVAS()
 * @function OVERRIDE_TO_REF_CANVAS
 * @return nothing
 */

exports.VIEW = VIEW;

function OVERRIDE_TO_REF_CANVAS() {
  exports.VIEW = VIEW = {
    W: function (per) {
      if (typeof per === "undefined") {
        return _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).width;
      } else {
        return _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).width / 100 * per;
      }
    },
    H: function (per) {
      if (typeof per === "undefined") {
        return _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).height;
      } else {
        return _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).height / 100 * per;
      }
    },
    ASPECT: function () {
      return _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).width / _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).height;
    }
  }; // override CONVERTOR

  exports.CONVERTOR = CONVERTOR = {
    PER_TO_PIX: function (v) {
      var ONE_PERCENT = _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).width / 100;
      return v * ONE_PERCENT;
    },
    PIX_TO_PER: function (v) {
      var ONE_PERCENT = _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).width / 100;
      return v / ONE_PERCENT;
    },
    PER_TO_PIY: function (v) {
      var ONE_PERCENT = _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).height / 100;
      return v * ONE_PERCENT;
    },
    PIY_TO_PER: function (v) {
      var ONE_PERCENT = _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).height / 100;
      return v / ONE_PERCENT;
    }
  };
} // Array works , remove all array items with same values


function removeItem(arr) {
  var what,
      a = arguments,
      L = a.length,
      ax;

  while (L > 1 && arr.length) {
    what = a[--L];

    while ((ax = arr.indexOf(what)) != -1) {
      arr.splice(ax, 1);
    }
  }

  return arr;
} // removeA(arrayNAME,'-delete-all-value-');

/**
 * CONVERTOR
 * percents to pixel convert by Width reference
 * @example Usage : CONVERTOR.PER_TO_PIX(10)
 * @function CONVERTOR.PER_TO_PIX
 * @param {Number} V V is number of percents.
 * @return {Number} Value represent number of pixels.
 */


var CONVERTOR = {
  PER_TO_PIX: function (v) {
    var ONE_PERCENT = window.innerWidth / 100;
    return v * ONE_PERCENT;
  },

  /**
   * CONVERTOR
   * pixel to percents convert by Width reference
   * @example Usage : CONVERTOR.PIX_TO_PER(10)
   * @function CONVERTOR.PIX_TO_PER
   * @param {Number} V V is number of pixel
   * @return {Number} Value represent number of percents.
   */
  PIX_TO_PER: function (v) {
    var ONE_PERCENT = window.innerWidth / 100;
    return v / ONE_PERCENT;
  },

  /**
   * CONVERTOR
   * percents to pixel convert by Height reference
   * @example Usage : CONVERTOR.PER_TO_PIY(10)
   * @function CONVERTOR.PER_TO_PIY
   * @param {Number} V V is number of pixel
   * @return {Number} Value represent number of percents.
   */
  PER_TO_PIY: function (v) {
    var ONE_PERCENT = window.innerHeight / 100;
    return v * ONE_PERCENT;
  },

  /**
   * CONVERTOR
   * pixel to percents convert by Height reference
   * @example Usage : CONVERTOR.PIX_TO_PER(10)
   * @function CONVERTOR.PIX_TO_PER
   * @param {Number} V V is number of pixel
   * @return {Number} Value represent number of percents.
   */
  PIY_TO_PER: function (v) {
    var ONE_PERCENT = window.innerHeight / 100;
    return v / ONE_PERCENT;
  }
}; //###############################################//###############################################
//Move to modify proto file

exports.CONVERTOR = CONVERTOR;

function remove_last(str) {
  return str.slice(0, -1);
}

var DEEP_COPY = {
  //public method
  getCloneOfObject: function (oldObject) {
    var tempClone = {};
    if (typeof oldObject == "object") // for array use private method getCloneOfArray
      for (prop in oldObject) if (typeof oldObject[prop] == "object" && oldObject[prop].__isArray) tempClone[prop] = this.getCloneOfArray(oldObject[prop]); // for object make recursive call to getCloneOfObject
      else if (typeof oldObject[prop] == "object") tempClone[prop] = this.getCloneOfObject(oldObject[prop]); // normal (non-object type) members
        else tempClone[prop] = oldObject[prop];
    return tempClone;
  },
  getCloneOfArray: function (oldArray) {
    var tempClone = [];

    for (var arrIndex = 0; arrIndex <= oldArray.length; arrIndex++) if (typeof oldArray[arrIndex] == "object") tempClone.push(this.getCloneOfObject(oldArray[arrIndex]));else tempClone.push(oldArray[arrIndex]);

    return tempClone;
  }
};
exports.DEEP_COPY = DEEP_COPY;

function SOUND(duration, fref) {
  var audio = new window.AudioContext();
  var osc = audio.createOscillator();
  osc.frequency.value = fref;
  osc.connect(audio.destination);
  osc.start(0);
  setTimeout(function () {
    osc.stop();
    audio.close();
    audio = null;
    osc = null; ///delete osc;
    //delete audio;
  }, duration);
}

function drawRotatedImage(image, x, y, angle, w, h, surf) {
  surf.save();
  surf.translate(x + w / 2, y + h / 2);
  surf.rotate(angle);

  if (typeof image !== "undefined") {
    surf.drawImage(image, -(w / 2), -(h / 2), w, h);
  }

  surf.restore();
}

function drawRotatedText(s, text, x, y, angle, w, h) {
  SURF.save();
  SURF.rotate(_system.default.MATH.TO_RADIANS(angle));
  SURF.fillText(text, x + w / 2, y + h / 2, w);
  SURF.restore();
}

function drawRotatedTextNoSkrech(s, text, x, y, angle, w, h) {
  SURF.save();
  SURF.rotate(_system.default.MATH.TO_RADIANS(angle));
  SURF.fillText(text, x + w / 2, y + h / 2);
  SURF.restore();
}

function roundedRect(SURF, t, x, y, width, height, radius, color, type, strokeColor) {
  SURF.save();

  if (type == "stroke") {
    SURF.strokeStyle = strokeColor;
  } else {
    SURF.fillStyle = color;
  }

  SURF.beginPath();
  SURF.moveTo(x, y + radius);
  SURF.lineTo(x, y + height - radius);
  SURF.quadraticCurveTo(x, y + height, x + radius, y + height);
  SURF.lineTo(x + width - radius, y + height);
  SURF.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  SURF.lineTo(x + width, y + radius);
  SURF.quadraticCurveTo(x + width, y, x + width - radius, y);
  SURF.lineTo(x + radius, y);
  SURF.quadraticCurveTo(x, y, x, y + radius);

  if (type == "stroke") {
    SURF.stroke();
  } else {
    SURF.fill();
  }

  SURF.restore();
}

window.oncontextmenu = function () {
  return false; // hardcode!
}; // Performance off cpu


var cpu_canvas_power = {
  CPU_SPEED: 0,
  array_of_res: [],
  end_count: 0,
  count_frames: 0,
  begin: null,
  getSec: function () {
    cpu_canvas_power.begin = new Date().getSeconds();
  },
  checkForCount: function () {
    if (cpu_canvas_power.begin == null) {
      cpu_canvas_power.getSec();
    } else if (cpu_canvas_power.begin == new Date().getSeconds() && cpu_canvas_power.end_count == 0) {
      console.log("cpu...");
    } else if (cpu_canvas_power.begin + 1 == new Date().getSeconds() && cpu_canvas_power.end_count < 2) {
      cpu_canvas_power.count_frames++;

      if (cpu_canvas_power.end_count == 0) {
        cpu_canvas_power.end_count++;
      }
    } else {
      if (cpu_canvas_power.array_of_res.length < 5) {
        if (cpu_canvas_power.count_frames != 0) {
          cpu_canvas_power.array_of_res.push(cpu_canvas_power.count_frames);
        }

        cpu_canvas_power.count_frames = 0;
        cpu_canvas_power.end_count = 0;
        cpu_canvas_power.begin = null;
      } else {
        var sum = 0;

        for (var i = 0; i < cpu_canvas_power.array_of_res.length; i++) {
          sum += parseInt(cpu_canvas_power.array_of_res[i]);
        }

        cpu_canvas_power.CPU_SPEED = sum / cpu_canvas_power.array_of_res.length;
        console.log("cpu SPEED : " + cpu_canvas_power.CPU_SPEED);
      }
    }
  }
}; // tracking

function TRACK_NOW() {
  var video = document.getElementById("video");
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var tracker = new tracking.ObjectTracker("face");
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);
  tracking.track("#video", tracker, {
    camera: true
  });
  tracker.on("track", function (event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    event.data.forEach(function (rect) {
      context.strokeStyle = "#a64ceb";
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = "11px Helvetica";
      context.fillStyle = "#fff";
      context.fillText("x: " + rect.x + "px", rect.x + rect.width + 5, rect.y + 11);
      context.fillText("y: " + rect.y + "px", rect.x + rect.width + 5, rect.y + 22);
    });
  });
} // class GRADIENT


function GRADIENT(color1, color2) {
  var ROOT = this;
  ROOT.grd = SURF.createLinearGradient(0, 0, 170, 0);
  ROOT.grd.addColorStop(0, color1);
  ROOT.grd.addColorStop(1, color2);
}
/**
 * Creating Image objects.
 * @function CREATE_IMG
 * @param name
 * @param src
 * @return nothing
 */


function CREATE_IMG(name, src) {
  window["image_" + name] = new Image();
  window["image_" + name].src = src;

  window["image_" + name].onload = function () {
    _system.default.RES.SUM_OF_LOADED_IMAGES++;
  };
}
/**
 * Validate string for email address.
 * validateEmail is global access method.
 * @example validateEmail("zlatnaspirala@gmail") will return false ,
 * validateEmail("zlatnaspirala@gmail.com") return true
 * @function validateEmail Global method ,  pseudo
 * @param {String} email Email for checking.
 * @return {boolean} True : Email is valid , False email is invalid.
 */


function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

},{"./program":54,"./system":57}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.round = round;
exports.randomIntFromTo = randomIntFromTo;
exports.toDegrees = toDegrees;
exports.toRadians = toRadians;
exports.ORBIT = ORBIT;
exports.OSCILLATOR = OSCILLATOR;
exports.INCREMENTATOR = INCREMENTATOR;
exports.DIMENSION = DIMENSION;
exports.POSITION = POSITION;
exports.isEven = exports.isOdd = void 0;

var _system = _interopRequireDefault(require("./system"));

var _manifest = _interopRequireDefault(require("../manifest/manifest"));

var _editor = require("./editor/editor");

var _init = require("./init");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Simple number round.
 * @function round
 * @param {number} value
 * @param {number} decimals
 * @return {number} Number
 */
function round(value, decimals) {
  if (typeof value === "object" || typeof decimals === "object") {
    _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.NUMBER_ROUND'  Desciption : Replace object with string ,  this >> " + typeof value + " << must be string or number.");
  } else if (typeof value === "undefined" || typeof decimals === "undefined") {
    _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.NUMBER_ROUND'  Desciption : arguments (value, decimals) cant be undefined ,  this >> " + typeof value + " << must be string or number.");
  } else {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }
}

function randomIntFromTo(min, max) {
  if (typeof min === "object" || typeof max === "object") {
    _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO'  Desciption : Replace object with string ,  this >> " + typeof min + " and " + typeof min + " << must be string or number.");
  } else if (typeof min === "undefined" || typeof max === "undefined") {
    _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.RANDOM_INT_FROM_TO'  Desciption : arguments (min, max) cant be undefined ,  this >> " + typeof min + " and " + typeof min + "  << must be string or number.");
  } else {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
} // Convert toDegrees/toRadians


function toDegrees(angle) {
  if (typeof angle === "string" || typeof angle === "number") {
    return angle * (180 / Math.PI);
  } else {
    _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.TO_RADIANS'  Desciption : Input arr ,  angle >> " + typeof angle + "  << must be string or number.");
  }
}

function toRadians(angle) {
  if (typeof angle === "string" || typeof angle === "number") {
    return angle * (Math.PI / 180);
  } else {
    _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.TO_RADIANS'  Desciption : Input arr ,  angle >> " + typeof angle + "  << must be string or number.");
  }
}

var isOdd = function (x) {
  return x & 1;
};

exports.isOdd = isOdd;

var isEven = function (x) {
  return !(x & 1);
};

exports.isEven = isEven;

function ORBIT(cx, cy, angle, p) {
  var s = Math.sin(angle);
  var c = Math.cos(angle); // translate point back to origin:

  p.x -= cx;
  p.y -= cy; // rotate point

  let xnew = p.x * c - p.y * s;
  let ynew = p.x * s + p.y * c; // translate point back:

  p.x = xnew + cx;
  p.y = ynew + cy;
  return p;
} //GET PULSE VALUES IN REAL TIME


function OSCILLATOR(min, max, step) {
  if ((typeof min === "string" || typeof min === "number") && (typeof max === "string" || typeof max === "number") && (typeof step === "string" || typeof step === "number")) {
    var ROOT = this;
    this.min = parseFloat(min);
    this.max = parseFloat(max);
    this.step = parseFloat(step);
    this.value_ = parseFloat(min);
    this.status = 0;

    this.on_maximum_value = function () {};

    this.on_minimum_value = function () {};

    this.UPDATE = function (STATUS_) {
      if (STATUS_ === undefined) {
        if (this.status == 0 && this.value_ < this.max) {
          this.value_ = this.value_ + this.step;

          if (this.value_ >= this.max) {
            this.value_ = this.max;
            this.status = 1;
            ROOT.on_maximum_value();
          }

          return this.value_;
        } else if (this.status == 1 && this.value_ > this.min) {
          this.value_ = this.value_ - this.step;

          if (this.value_ <= this.min) {
            this.value_ = this.min;
            this.status = 0;
            ROOT.on_minimum_value();
          }

          return this.value_;
        }
      } else {
        return this.value_;
      }
    };
  } else {
    _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.OSCILLATOR'  Desciption : Replace object with string or number,  min >> " + typeof min + " and max >>" + typeof max + "  and step >>" + typeof step + " << must be string or number.");
  }
} // GET INCREMENT VALUES IN REAL TIME


function INCREMENTATOR(min, max, step, stop_after) {
  if ((typeof min === "string" || typeof min === "number") && (typeof max === "string" || typeof max === "number") && (typeof step === "string" || typeof step === "number")) {
    if (typeof stop_after != "undefined") {
      this.stop_after = stop_after;
    } else {
      this.stop_after = 1;
    }

    this.loops = 0;
    this.min = parseFloat(min);
    this.max = parseFloat(max);
    this.step = parseFloat(step);
    this.value_ = parseFloat(min);
    this.status = 0;

    this.UPDATE = function (STATUS_) {
      if (STATUS_ === undefined) {
        if (this.status == 0 && this.value_ < this.max) {
          this.value_ = this.value_ + this.step;

          if (this.value_ >= this.max) {
            this.value_ = this.min;

            if (this.loops == this.stop_after) {
              this.status = 1;
            }
          }

          return this.value_;
        } else {
          return this.value_;
        }
      }
    }; //AUTO UPDATE HERE

  } else {
    _system.default.DEBUG.WARNING("SYS : warning for procedure 'SYS.MATH.OSCILLATOR'  Desciption : Replace object with string or number,  min >> " + typeof min + " and max >>" + typeof max + "  and step >>" + typeof step + " << must be string or number.");
  }
}

function DIMENSION(w, h, type_) {
  var ROOT_DIMENSION = this;

  if (typeof type_ == "undefined") {
    this.type = "REF_CANVAS";
  } else {
    this.type = type_;
  }

  if (typeof w === undefined) {
    this.W = 10;

    _system.default.DEBUG.WARNING("SYS : warning for procedure new 'DIMENSION'  Desciption : arguments (w , h ) are  undefined ,  system will setup 10% of width and height.");
  } else {
    this.W = w;
  }

  if (typeof h === undefined) {
    this.H = 10;

    _system.default.DEBUG.WARNING("SYS : warning for procedure new 'DIMENSION'  Desciption : arguments (w , h ) are  undefined ,  system will setup 10% of width and height.");
  } else {
    this.H = h;
  }

  this.WIDTH = function () {
    if (ROOT_DIMENSION.type == "NORMAL") {
      return window.innerWidth / 100 * this.W;
    } else if (ROOT_DIMENSION.type == "REF_CANVAS") {
      return _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).width / 100 * this.W;
    }
  };

  this.HEIGHT = function () {
    if (ROOT_DIMENSION.type == "NORMAL") {
      return window.innerHeight / 100 * this.H;
    } else if (ROOT_DIMENSION.type == "REF_CANVAS") {
      return _system.default.DOM.E(_system.default.RUNNING_PROGRAMS[0]).height / 100 * this.H;
    }
  };
}

function POSITION(curentX, curentY, targetX_, targetY_, thrust_) {
  var ROOT = this;
  this.FREEZ = false;
  ROOT.CANVAS_ = window[_system.default.RUNNING_PROGRAMS[0]].ENGINE.PROGRAM_ID;

  this.ON_TARGET_POSITION = function () {}; //parameters


  this.x = curentX;
  this.y = curentY;
  this.targetX = targetX_;
  this.targetY = targetY_;
  this.velX = 0;
  this.velY = 0;
  this.thrust = thrust_;

  if (_manifest.default.PROGRAM.CALCULATING_POSITION_BY == "MONITOR") {
    this.TYPE = "NORMAL";
  } else if (_manifest.default.PROGRAM.CALCULATING_POSITION_BY == "CANVAS") {
    this.TYPE = "REF_CANVAS";
  }

  this.IN_MOVE = true; //metods

  this.SET_SPEED = function (num_) {
    if (typeof num_ === "number") {
      this.thrust = num_;
    } else {
      _system.default.DEBUG.WARNING("SYS : warning for method 'POSITION.SET_SPEED'  Desciption : arguments (w , h ) must be type of number.");
    }
  };

  this.TRANSLATE_BY_X = function (x_) {
    this.IN_MOVE = true;
    this.targetX = x_;
  };

  this.TRANSLATE_BY_Y = function (y_) {
    this.IN_MOVE = true;
    this.targetY = y_;
  };

  this.TRANSLATE = function (x_, y_) {
    this.IN_MOVE = true;
    this.targetX = x_;
    this.targetY = y_;
  };

  this.SET_POSITION = function (x_, y_, type_) {
    if (type_ == "DIAMETRIC") {
      this.targetX = x_;
      this.targetY = y_;
      this.x = x_;
      this.y = y_;
      this.IN_MOVE = false;
    } else {
      this.targetX = _init.CONVERTOR.PIX_TO_PER(x_);
      this.targetY = _init.CONVERTOR.PIX_TO_PER(y_);
      this.x = _init.CONVERTOR.PIY_TO_PER(x_);
      this.y = _init.CONVERTOR.PIY_TO_PER(y_);
      this.IN_MOVE = false;
    }
  };

  this.UPDATE = function () {
    var tx = this.targetX - this.x,
        ty = this.targetY - this.y,
        dist = Math.sqrt(tx * tx + ty * ty),
        rad = Math.atan2(ty, tx),
        angle = rad / Math.PI * 180;
    this.velX = tx / dist * this.thrust;
    this.velY = ty / dist * this.thrust; // stop the box if its too close so it doesn't just rotate and bounce

    if (this.IN_MOVE == true) {
      if (dist > this.thrust) {
        this.x += this.velX;
        this.y += this.velY;

        if (ROOT.SHARE_POSITION == true) {
          MAIN_PEER.REMOTE_DATA.NEW_POSITION(window[this.parentGameObject]);
        }
      } else {
        this.x = this.targetX;
        this.y = this.targetY;
        this.IN_MOVE = false;
        ROOT.ON_TARGET_POSITION();

        if (ROOT.SHARE_POSITION == true) {
          MAIN_PEER.REMOTE_DATA.NEW_POSITION(window[this.parentGameObject]);
        }

        try {
          if (_manifest.default.EDITOR == true) {
            (0, _editor.SET_NEW_START_UP_POS)(this.parentGameObject, this.PROGRAM_NAME, this.parentModul, this.targetX, this.targetY, this.DIMENSION.W, this.DIMENSION.H);
          }
        } catch (e) {
          console.log(e + ":::in:::SET_NEW_START_UP_POS");
        }
      }
    }
  };

  this.X = function () {
    if (ROOT.TYPE == "NORMAL") {
      return window.innerWidth / 100 * this.x;
    } else if (ROOT.TYPE == "REF_CANVAS") {
      return _system.default.DOM.E(ROOT.CANVAS_).width / 100 * this.x;
    }
  };

  this.Y = function () {
    if (ROOT.TYPE == "NORMAL") {
      return window.innerHeight / 100 * this.y;
    } else if (ROOT.TYPE == "REF_CANVAS") {
      return _system.default.DOM.E(ROOT.CANVAS_).height / 100 * this.y;
    }
  };
}

},{"../manifest/manifest":58,"./editor/editor":44,"./init":50,"./system":57}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MODUL = MODUL;

var _game_object = require("../game_object/game_object");

/**
 * @example Use MODUL class on begin of program with
 * @example HELLO_WORLD.ENGINE.CREATE_MODUL("STARTER");
 * @Class MODUL
 * @constructor
 * @param {String} Name name is passed value for modul name.
 * @param {String} Name name is passed value for modul name.
 */
function MODUL(name, PROGRAM_NAME) {
  var ROOT_MODUL = this; //ENGINE WILL BE BIG SWITCHER

  this.PARENT = PROGRAM_NAME;
  this.NAME = name;
  this.GAME_OBJECTS = new Array();

  this.NEW_OBJECT = function (name__, x, y, w, h, speed) {
    ROOT_MODUL.GAME_OBJECTS.push(new _game_object.GAME_OBJECT(name__, ROOT_MODUL.NAME, x, y, w, h, speed, ROOT_MODUL.PARENT));
  }; // Netwotk object


  this.NEW_NETWORK_OBJECT = function (object_) {
    ROOT_MODUL.GAME_OBJECTS.push(new _game_object.GAME_OBJECT(object_.NAME, ROOT_MODUL.NAME, object_.POSITION.x, object_.POSITION.y, object_.DIMENSION.W, object_.DIMENSION.H, object_.POSITION.thrust, ROOT_MODUL.PARENT));

    if (object_.TYPE_OF_GAME_OBJECT.indexOf("ANIMATION") != -1) {
      window[object_.NAME].CREATE_ANIMATION(SURF, object_.ANIMATION.TYPE, 0, RESOURCE.Tiles, 123423444, "no", 1, 11, 1, 1, 1);
    }
  };

  this.NEW_NETWORK_POSITION = function (object_) {
    if (typeof object_.nameOfObject !== "undefined") {
      window[object_.nameOfObject].POSITION.SET_POSITION(object_.x, object_.y, "DIAMETRIC");
    }
  };

  this.NEW_NETWORK_DIMENSION = function (object_) {
    if (typeof object_.nameOfObject !== "undefined") {
      window[object_.nameOfObject].DIMENSION.W = object_.W;
      window[object_.nameOfObject].DIMENSION.H = object_.H;
    }
  };

  this.DESTROY_OBJECT = function (name__) {
    ROOT_MODUL.GAME_OBJECTS.forEach(function (item, index, object) {
      if (item.NAME == name__) {
        if (index > -1) {
          ROOT_MODUL.GAME_OBJECTS.splice(index, 1);
          delete window[name__];
        }

        console.log("OBJ DELETED:" + ROOT_MODUL.GAME_OBJECTS.indexOf(name__) + "  ACCESS GLOBAL  : " + window["name__"]);
      }
    });
  };

  this.DRAW_GAME_OBJECTS = function (s) {
    for (var x = 0; x < ROOT_MODUL.GAME_OBJECTS.length; x++) {
      ROOT_MODUL.GAME_OBJECTS[x].DRAW(s);

      if (ROOT_MODUL.GAME_OBJECTS[x].EDITOR.ENABLE == true) {
        ROOT_MODUL.GAME_OBJECTS[x].DRAW_ACTOR(s);
      }
    }
  };

  ROOT_MODUL.BREAK_AT_MOMENT = false;

  this.UPDATE_GAME_OBJECTS = function () {
    for (var x = 0; x < ROOT_MODUL.GAME_OBJECTS.length; x++) {
      if (ROOT_MODUL.BREAK_AT_MOMENT == true) {
        ROOT_MODUL.BREAK_AT_MOMENT = false;
        console.log("BREAK");
        break;
      }

      if (ROOT_MODUL.GAME_OBJECTS[x].COLLISION != null) {
        for (var z = 0; z < ROOT_MODUL.GAME_OBJECTS.length; z++) {
          if (ROOT_MODUL.GAME_OBJECTS[z].COLLISION != null && ROOT_MODUL.GAME_OBJECTS[z].NAME != ROOT_MODUL.GAME_OBJECTS[x].NAME) {
            //Y by H
            if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() && ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT()) {
              if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() - 2 && ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {
                if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + " COLLIDE (noplayer) right WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.x = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                } else if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) rigth WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.x = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                }
              } else if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH() + 2 && ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH() - ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {
                if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) left WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.x = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[x].POSITION.x + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                } else if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) left WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.x = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetX = ROOT_MODUL.GAME_OBJECTS[z].POSITION.x - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.W * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                }
              }
            } //


            if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.WIDTH() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12 && ROOT_MODUL.GAME_OBJECTS[z].POSITION.X() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.X() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.WIDTH() - ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {
              if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() && ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.HEIGHT() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {
                if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) top WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.y = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y - ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                } else if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) botton WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.y = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                }
              } else if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() < ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT() && ROOT_MODUL.GAME_OBJECTS[z].POSITION.Y() > ROOT_MODUL.GAME_OBJECTS[x].POSITION.Y() + ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.HEIGHT() - ROOT_MODUL.GAME_OBJECTS[x].POSITION.thrust * 12) {
                if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false && ROOT_MODUL.GAME_OBJECTS[z].POSITION.IN_MOVE == true) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) onTop WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.y = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[z].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[x].POSITION.y + ROOT_MODUL.GAME_OBJECTS[z].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                } else if (ROOT_MODUL.GAME_OBJECTS[z].POSITION.STATIC == false) {
                  SYS.DEBUG.LOG(ROOT_MODUL.GAME_OBJECTS[z].NAME + "COLLIDE (noplayer) onTop WITH:" + ROOT_MODUL.GAME_OBJECTS[x].NAME);
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.y = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                  ROOT_MODUL.GAME_OBJECTS[x].POSITION.targetY = ROOT_MODUL.GAME_OBJECTS[z].POSITION.y - ROOT_MODUL.GAME_OBJECTS[x].DIMENSION.H * ROOT_MODUL.GAME_OBJECTS[z].COLLISION.margin;
                }
              }

              ROOT_MODUL.GAME_OBJECTS[x].ON_COLLISION(ROOT_MODUL.GAME_OBJECTS[z].NAME);
            }
          }
        }
      }

      if (typeof ROOT_MODUL.GAME_OBJECTS[x] !== "undefined") {
        if (ROOT_MODUL.GAME_OBJECTS[x].DESTROY_AFTER != null) {
          if (ROOT_MODUL.GAME_OBJECTS[x].DESTROY_AFTER < 1) {
            ROOT_MODUL.DESTROY_OBJECT(ROOT_MODUL.GAME_OBJECTS[x].NAME);
          }
        }

        if (typeof ROOT_MODUL.GAME_OBJECTS[x] !== "undefined") {
          ROOT_MODUL.GAME_OBJECTS[x].UPDATE();
        }
      }
    }
  };
}

},{"../game_object/game_object":48}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PARTICLE_FONTAN = PARTICLE_FONTAN;

function PARTICLE_FONTAN(GO, PARAMETERS) {
  var FONTAN = this;
  FONTAN.GO = GO;
  FONTAN.GO_POS = GO.POSITION;
  FONTAN.ANIMATION_ID = GO.ANIMATION.ID;
  FONTAN.particles = {}, FONTAN.particleIndex = 0, FONTAN.settings = {
    density: 10,
    particleSize: 22,
    startingX: function () {
      return FONTAN.GO_POS.X();
    },
    startingY: function () {
      return FONTAN.GO_POS.Y();
    },
    gravity: 0,
    gravity_CIKLUS: 155,
    gravity_index: 1,
    bounceLevel: window.innerHeight * 0.75
  };

  if (typeof PARAMETERS != "undefined") {// polymorf here in future
  }

  FONTAN.Particle = function () {
    this.x = FONTAN.settings.startingX();
    this.y = FONTAN.settings.startingY();
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;

    if (Math.random() > 0.98) {
      this.vy *= 3;
    }

    FONTAN.particleIndex++;
    FONTAN.particles[FONTAN.particleIndex] = this;
    this.id = FONTAN.particleIndex;
    this.life = 0;
    this.maxLife = Math.random() * 120;
  };

  FONTAN.Particle.prototype.draw = function (s) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.y > FONTAN.settings.bounceLevel) {
      this.vy *= -0.6;
      this.vx *= 0.75;
      this.y = FONTAN.settings.bounceLevel;
    }

    this.vy += FONTAN.settings.gravity;
    this.life++;

    if (this.life >= this.maxLife) {
      delete FONTAN.particles[this.id];
    } //s.fillRect(this.x, this.y, FONTAN.settings.particleSize, FONTAN.settings.particleSize)


    s.drawImage(window["f_" + FONTAN.ANIMATION_ID + FONTAN.GO.ANIMATION.CURRENT_FRAME], this.x, this.y, FONTAN.settings.particleSize, FONTAN.settings.particleSize);
  };

  FONTAN.DRAW = function (s) {
    // Draw the particles
    for (var i = 0; i < FONTAN.settings.density; i++) {
      new FONTAN.Particle();
    }

    for (var i in FONTAN.particles) {
      FONTAN.particles[i].draw(s);
    }

    if (FONTAN.settings.gravity_index > FONTAN.settings.gravity_CIKLUS) {
      FONTAN.settings.gravity_index = 1;
      FONTAN.settings.gravity = 0; //setTimeout(function() {FONTAN.settings.gravity = 1} , 1000); ORI

      setTimeout(function () {
        FONTAN.settings.gravity = 0;
      }, 1000);
    } else {
      FONTAN.settings.gravity_index++;
    }
  };
}

},{}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _manifest = _interopRequireDefault(require("../manifest/manifest"));

var _engine = require("./engine");

var _init = require("./init");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Instance of Class PROGRAM is root for all other
 * class instances.
 * @example new PROGRAM
 * @class PROGRAM
 * @constroctor
 * @param {2dCanvasContext} S
 * @param {object} C
 */
function PROGRAM(s, c) {
  /**
     * @memberof PROGRAM
     * @property {self} PROGRAM_ROOT
     */
  var PROGRAM_ROOT = this;
  /**
   * @memberof PROGRAM
   * @property {float} DRAW_INTERVAL Loaded from : APPLICATION.PROGRAM.RENDER_SPEED
   */

  this.DRAW_INTERVAL = _manifest.default.PROGRAM.RENDER_SPEED;
  /**
     * @memberof PROGRAM
     * @property {float} UPDATE_INTERVAL Default value 15
     */

  this.UPDATE_INTERVAL = 15;
  /**
     * @memberof PROGRAM
     * @property {float} BASELINE Default value 'middle'
     */

  this.BASELINE = "middle";
  /**
   * @memberof PROGRAM
   * @property {float} GLOBAL_TRANSLATE Default value 0
   */

  this.GLOBAL_TRANSLATE = 0;
  /**
     * @memberof PROGRAM
     * @property {boolean} DO_GLOBAL_TRANSLATE Default value false
     */

  this.DO_GLOBAL_TRANSLATE = false;
  /**
     * @memberof PROGRAM
     * @method TRANSLATE DO_GLOBAL_TRANSLATE
   * @param {float} x 
     */

  PROGRAM_ROOT.TRANSLATE = function (x) {
    PROGRAM_ROOT.GLOBAL_TRANSLATE = x;
    PROGRAM_ROOT.DO_GLOBAL_TRANSLATE = true;
  };
  /**
   * @class GAME_MAP
     * @memberof PROGRAM
     */


  this.GAME_MAP = function () {
    //screens
    var ROOT = this;
    this.TOTAL_LEFT = 2;
    this.TOTAL_RIGHT = 4;
    this.TOTAL_UP = 2;
    this.TOTAL_DOWN = 4;

    this.LEFT = function () {
      return ROOT.TOTAL_LEFT * -_init.VIEW.W();
    };

    this.WIDTH = function () {
      return ROOT.TOTAL_RIGHT * _init.VIEW.W();
    };

    this.UP = function () {
      return ROOT.TOTAL_UP * -_init.VIEW.H();
    };

    this.HEIGHT = function () {
      return ROOT.TOTAL_DOWN * _init.VIEW.W();
    };

    this.CLEAR_MAP = true;
  };
  /**
     * @memberof PROGRAM
     * @property {GAME_MAP} MAP
     */


  PROGRAM_ROOT.MAP = new PROGRAM_ROOT.GAME_MAP();
  this.AUTO_UPDATE = new Array();
  /**
   * @memberof PROGRAM
   * @property {ENGINE} ENGINE
   */

  this.ENGINE = new _engine.ENGINE(c);
  s.textAlign = "start";
  s.textBaseline = this.BASELINE;
  /**
    * @memberof PROGRAM
    * @method DRAW
  * @return void
    */

  this.DRAW = function () {
    if (PROGRAM_ROOT.MAP.CLEAR_MAP == true) {
      s.clearRect(PROGRAM_ROOT.MAP.LEFT(), PROGRAM_ROOT.MAP.UP(), PROGRAM_ROOT.MAP.WIDTH(), PROGRAM_ROOT.MAP.HEIGHT());
    }

    if (PROGRAM_ROOT.DO_GLOBAL_TRANSLATE == true) {
      PROGRAM_ROOT.DO_GLOBAL_TRANSLATE = false;
      s.translate(PROGRAM_ROOT.GLOBAL_TRANSLATE, 0);
    }

    PROGRAM_ROOT.ENGINE.DRAW_MODULES(s);
    setTimeout(function () {
      PROGRAM_ROOT.UPDATE();
    }, this.UPDATE_INTERVAL);
  };
  /**
   * @memberof PROGRAM
   * @method UPDATE
  * @return void
   */


  this.UPDATE = function () {
    PROGRAM_ROOT.ENGINE.UPDATE_MODULES();

    for (var x = 0; x < this.AUTO_UPDATE; x++) {
      ROOT.AUTO_UPDATE[x].UPDATE();
    }

    setTimeout(function () {
      PROGRAM_ROOT.DRAW();
    }, this.DRAW_INTERVAL);
  };
}

var _default = PROGRAM;
exports.default = _default;

},{"../manifest/manifest":58,"./engine":45,"./init":50}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CREATE_SYSTEM_BUTTONS = CREATE_SYSTEM_BUTTONS;
exports.CREATE_VIRTUAL_KEYBOARD = CREATE_VIRTUAL_KEYBOARD;
exports.________MAKE_VK = ________MAKE_VK;
exports.HIDE_KEYBOARD = HIDE_KEYBOARD;
exports.SHOW_KEYBOARD = SHOW_KEYBOARD;
exports.VK_ENTER = VK_ENTER;
exports.VK_CAPS = VK_CAPS;
exports.___KBSTATUS = ___KBSTATUS;
exports.___KBSTATUS_CAPS_ON = ___KBSTATUS_CAPS_ON;
exports.___KBSTATUS_CAPS_OFF = ___KBSTATUS_CAPS_OFF;

var _system = _interopRequireDefault(require("./system"));

var _manifest = _interopRequireDefault(require("../manifest/manifest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CREATE_SYSTEM_BUTTONS() {
  if (typeof window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]] !== "undefined" && typeof window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE !== "undefined") {
    window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.CREATE_MODUL("GUI_STARTER");

    if (NOMOBILE == 0) {
      CREATE_VIRTUAL_KEYBOARD();
      HIDE_KEYBOARD();
    } else {
      if (_manifest.default.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP == true) {
        CREATE_VIRTUAL_KEYBOARD();
        HIDE_KEYBOARD();
      }
    }
  } else {
    setTimeout(function () {
      //we dont wait any async
      CREATE_SYSTEM_BUTTONS();
    }, 50);
  }
}

function CREATE_VIRTUAL_KEYBOARD() {
  ________MAKE_VK(11, 5, 7, 7, 10); // value 1 speed


  window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").NEW_OBJECT("___VIRTUALKEYBOARD_LABEL", 18, 32, 60, 10, 1);

  window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("___VIRTUALKEYBOARD_LABEL").CREATE_TEXTBOX("", 10, "black", "lime");

  window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("___VIRTUALKEYBOARD_LABEL").TEXTBOX.EDIT = false;
  ___VIRTUALKEYBOARD_LABEL.TEXT_FOR = null;
  ___VIRTUALKEYBOARD_LABEL.DRAG = false; // caps handler

  ___VIRTUALKEYBOARD_LABEL.CAPS = false; // backspace handler

  ___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN = false;

  ___VIRTUALKEYBOARD_LABEL.SPEEDUPBACKSPACE = function () {
    setTimeout(function () {
      if (___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN == true) {
        ___VIRTUALKEYBOARD_LABEL.SPEED__BACKSPACE();
      }
    }, 1000);
  };

  ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE = 400;

  ___VIRTUALKEYBOARD_LABEL.SPEED__BACKSPACE = function () {
    ___VIRTUALKEYBOARD_LABEL.SPEED__BACKSPACE__TIMER = setInterval(function () {
      if (___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN == true) {
        ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0, ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1);

        if (___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE < 300) {
          ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0, ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1);
        }

        if (___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE < 100) {
          ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0, ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1);
          ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0, ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1);
        }

        if (___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE > 5) {
          ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE = ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE - 100;
        } else {
          ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE = 5;
        } //console.log("___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE" + " " + ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE)

      } else {
        clearInterval(___VIRTUALKEYBOARD_LABEL.SPEED__BACKSPACE__TIMER);
        ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE = 400;
      }
    }, ___VIRTUALKEYBOARD_LABEL.DELTA_INC_TIMER_BACKSPACE);
  };
}

;

function ________MAKE_VK(H, V, step, w, h) {
  for (var y = 0; y < V; y = y + 1) {
    for (var x = 0; x < H; x = x + 1) {
      var name = "___VIRTUALKEYBOARD_" + x + y;
      var PASS_VK_CODE_ = "";
      var width_extra = 0;
      var SPECIAL_COMMAND = null;
      var LETTER = 0;

      if (x == 0 && y == 1) {
        LETTER = 16; //q

        PASS_VK_CODE_ = "q";
      } else if (x == 1 && y == 1) {
        LETTER = 22; //w

        PASS_VK_CODE_ = "w";
      } else if (x == 2 && y == 1) {
        LETTER = 4; //e

        PASS_VK_CODE_ = "e";
      } else if (x == 3 && y == 1) {
        LETTER = 17; //r

        PASS_VK_CODE_ = "r";
      } else if (x == 4 && y == 1) {
        LETTER = 19; //t

        PASS_VK_CODE_ = "t";
      } else if (x == 5 && y == 1) {
        LETTER = 25; //z

        PASS_VK_CODE_ = "z";
      } else if (x == 6 && y == 1) {
        LETTER = 20; //u

        PASS_VK_CODE_ = "u";
      } else if (x == 7 && y == 1) {
        LETTER = 8; //i

        PASS_VK_CODE_ = "i";
      } else if (x == 8 && y == 1) {
        LETTER = 14; //o

        PASS_VK_CODE_ = "o";
      } else if (x == 9 && y == 1) {
        LETTER = 15; //p

        PASS_VK_CODE_ = "p";
      } else if (x == 10 && y == 1) {
        LETTER = 28; //m UBACI ZA TACKU

        PASS_VK_CODE_ = "[";
      } else if (x == 10 && y == 0) {
        LETTER = 25; //Backspace

        width_extra = 10;
        PASS_VK_CODE_ = "Backspace";
      } //line 2
      else if (x == 0 && y == 2) {
          LETTER = 0; //a

          PASS_VK_CODE_ = "a";
        } else if (x == 1 && y == 2) {
          LETTER = 18; //s

          PASS_VK_CODE_ = "s";
        } else if (x == 2 && y == 2) {
          LETTER = 3; //d

          PASS_VK_CODE_ = "d";
        } else if (x == 3 && y == 2) {
          LETTER = 5; //f

          PASS_VK_CODE_ = "f";
        } else if (x == 4 && y == 2) {
          LETTER = 6; //g

          PASS_VK_CODE_ = "g";
        } else if (x == 5 && y == 2) {
          LETTER = 7; //h

          PASS_VK_CODE_ = "h";
        } else if (x == 6 && y == 2) {
          LETTER = 9; //j

          PASS_VK_CODE_ = "j";
        } else if (x == 7 && y == 2) {
          LETTER = 10; //k

          PASS_VK_CODE_ = "k";
        } else if (x == 8 && y == 2) {
          LETTER = 11; //l

          PASS_VK_CODE_ = "l";
        } else if (x == 9 && y == 2) {
          LETTER = 28; // SPECIAL : ENTER
          //width_extra = 10;

          PASS_VK_CODE_ = ";";
        } else if (x == 10 && y == 2) {
          LETTER = 28; // SPECIAL : ENTER
          //width_extra = 10;

          PASS_VK_CODE_ = "'";
        } else if (x == 11 && y == 2) {
          LETTER = 0; // enter

          width_extra = 10;
          PASS_VK_CODE_ = "enter2";
        } //line 3
        else if (x == 0 && y == 3) {
            LETTER = 24; //y

            PASS_VK_CODE_ = "y";
          } else if (x == 1 && y == 3) {
            LETTER = 23; //x

            PASS_VK_CODE_ = "x";
          } else if (x == 2 && y == 3) {
            LETTER = 2; //c

            PASS_VK_CODE_ = "c";
          } else if (x == 3 && y == 3) {
            LETTER = 21; //v

            PASS_VK_CODE_ = "v";
          } else if (x == 4 && y == 3) {
            LETTER = 1; //b

            PASS_VK_CODE_ = "b";
          } else if (x == 5 && y == 3) {
            LETTER = 13; //n

            PASS_VK_CODE_ = "n";
          } else if (x == 6 && y == 3) {
            LETTER = 12; //m

            PASS_VK_CODE_ = "m";
          } else if (x == 7 && y == 3) {
            LETTER = 27; //m

            PASS_VK_CODE_ = ",";
          } else if (x == 8 && y == 3) {
            LETTER = 27; //m UBACI ZA TACKU

            PASS_VK_CODE_ = ".";
          } else if (x == 9 && y == 3) {
            LETTER = 30; //m UBACI ZA TACKU

            PASS_VK_CODE_ = "/";
          } else if (x == 10 && y == 3) {
            LETTER = 31; //m UBACI ZA TACKU

            PASS_VK_CODE_ = "Caps";
          } //down line
          else if (x == 0 && y == 4) {
              LETTER = 24; //y

              PASS_VK_CODE_ = "_";
            } else if (x == 1 && y == 4) {
              LETTER = 23; //x

              PASS_VK_CODE_ = "-";
            } else if (x == 2 && y == 4) {
              LETTER = 2; //c

              PASS_VK_CODE_ = "+";
            } else if (x == 3 && y == 4) {
              LETTER = 21; //v

              PASS_VK_CODE_ = "=";
            } else if (x == 4 && y == 4) {
              LETTER = 1; //b

              PASS_VK_CODE_ = "space";
              width_extra = 24;
            } else if (x == 5 && y == 4) {
              /** unhandled */
            } else if (x == 6 && y == 4) {
              /** unhandled */
            } else if (x == 7 && y == 4) {
              /** unhandled */
            } else if (x == 8 && y == 4) {
              LETTER = 27; //m UBACI ZA TACKU

              PASS_VK_CODE_ = ".com";
            } else if (x == 9 && y == 4) {
              LETTER = 30; //m UBACI ZA TACKU

              PASS_VK_CODE_ = "hide";
              SPECIAL_COMMAND = "hide";
            } else if (x == 10 && y == 4) {
              LETTER = 31; //m UBACI ZA TACKU

              PASS_VK_CODE_ = "Enter";
              width_extra = 12;
            } // NUMBERS
            else if (x == 0 && y == 0) {
                LETTER = 33; // o

                PASS_VK_CODE_ = "0";
              } else if (x == 1 && y == 0) {
                LETTER = 34; // o

                PASS_VK_CODE_ = "1";
              } else if (x == 2 && y == 0) {
                LETTER = 35; // o

                PASS_VK_CODE_ = "2";
              } else if (x == 3 && y == 0) {
                LETTER = 36; // o

                PASS_VK_CODE_ = "3";
              } else if (x == 4 && y == 0) {
                LETTER = 37; // o

                PASS_VK_CODE_ = "4";
              } else if (x == 5 && y == 0) {
                LETTER = 38; // o

                PASS_VK_CODE_ = "5";
              } else if (x == 6 && y == 0) {
                LETTER = 39; // o

                PASS_VK_CODE_ = "6";
              } else if (x == 7 && y == 0) {
                LETTER = 40; // o

                PASS_VK_CODE_ = "7";
              } else if (x == 8 && y == 0) {
                LETTER = 41; // o

                PASS_VK_CODE_ = "8";
              } else if (x == 9 && y == 0) {
                LETTER = 42; // o

                PASS_VK_CODE_ = "9";
              } else if (x == 10 && y == 0) {
                LETTER = 32; // o

                PASS_VK_CODE_ = "0";
              } /////////////////////////
      // CREATING SYS KEYBOARD
      // eliminate rigth of space


      if (!(x >= 5 && y == 4 && x <= 7 && y == 4)) {
        var ___ID = Math.random();

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT(name, x + step * x, y + step * 1.5 * y + 40, w + width_extra, h, 10); //window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_ANIMATION( SURF , "DRAW_FRAME" , LETTER , RESOURCE.imagesFont1  , ___ID , "no" , 1,11,1,1,1)


        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_TEXTBOX(PASS_VK_CODE_, 10, "black", "lime");

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).DRAG = false;
        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.EDIT = false;
        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).PASS_VK_CODE = PASS_VK_CODE_;

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TOUCH_UP = function () {
          ___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN = false;
          ___VIRTUALKEYBOARD_LABEL.SPEEDUP = false;
        };

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TOUCH_DOWN = function () {
          if (window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == "Backspace") {
            ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.substring(0, ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT.length - 1); //console.log("VIRTUAL KEYBOARD : Backspace ")

            ___VIRTUALKEYBOARD_LABEL.BACKSPACE_DOWN = true;

            ___VIRTUALKEYBOARD_LABEL.SPEEDUPBACKSPACE();
          } else if (window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == "hide") {
            HIDE_KEYBOARD(); //console.log("VIRTUAL KEYBOARD :  HIDE_KEYBOARD() ")
          } else if (window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == "Enter") {
            VK_ENTER(); //console.log("VIRTUAL KEYBOARD :  enter!! ")
          } else if (window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == "Caps") {
            VK_CAPS(); //console.log("VIRTUAL KEYBOARD :  caps !! ")
          } else if (window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT == "space") {
            HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("___VIRTUALKEYBOARD_LABEL").TEXTBOX.TEXT += " "; //console.log("VIRTUAL KEYBOARD :  caps !! ")
          } else {
            HELLO_WORLD.ENGINE.MODULES.ACCESS_MODULE("STARTER").GAME_OBJECTS.ACCESS("___VIRTUALKEYBOARD_LABEL").TEXTBOX.TEXT += window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(this.NAME).TEXTBOX.TEXT;
          }
        };
      } // extra


      if (y == 2 && x == 10) {
        var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
        x = 11;
        PASS_VK_CODE_ = "\\";

        var ___ID = Math.random();

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT(name, x + step * x, y + step * 1.5 * y + 40, w + width_extra, h, 10); //window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_ANIMATION( SURF , "DRAW_FRAME" , LETTER , RESOURCE.imagesFont1  , ___ID , "no" , 1,11,1,1,1)


        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_TEXTBOX(PASS_VK_CODE_, 10, "black", "lime");

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).DRAG = false;
        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.EDIT = false;

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TAP = function () {//console.log("VIRTUAL KEYBOARD : " + this.NAME);
        };

        x = 10;
      } // extra


      if (y == 1 && x == 10) {
        var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
        x = 11;
        PASS_VK_CODE_ = "]";

        var ___ID = Math.random();

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").NEW_OBJECT(name, x + step * x, y + step * 1.5 * y + 40, w + width_extra, h, 10); //window[SYS.RUNNING_PROGRAMS[SYS.RUNNING_PROGRAMS.length-1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_ANIMATION( SURF , "DRAW_FRAME" , LETTER , RESOURCE.imagesFont1  , ___ID , "no" , 1,11,1,1,1)


        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).CREATE_TEXTBOX(PASS_VK_CODE_, 10, "black", "lime");

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).DRAG = false;
        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.EDIT = false;

        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TAP = function () {//console.log("VIRTUAL KEYBOARD : " + this.NAME);
        };

        x = 12;
      } ///////////////////////

    }
  }
}

;

function HIDE_KEYBOARD() {
  ___VIRTUALKEYBOARD_LABEL.VISIBLE = false;

  ___KBSTATUS(11, 5, false);

  ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = "";
}

function SHOW_KEYBOARD(textIsForThisNameObj) {
  ___VIRTUALKEYBOARD_LABEL.TEXT_FOR = window[textIsForThisNameObj];
  ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXT_FOR.TEXTBOX.TEXT;
  ___VIRTUALKEYBOARD_LABEL.VISIBLE = true;

  ___KBSTATUS(11, 5, true);
}

;

function VK_ENTER() {
  window[___VIRTUALKEYBOARD_LABEL.TEXT_FOR.NAME].TEXTBOX.TEXT = ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT;
  ___VIRTUALKEYBOARD_LABEL.TEXTBOX.TEXT = "";
  HIDE_KEYBOARD();
}

;

function VK_CAPS() {
  if (___VIRTUALKEYBOARD_LABEL.CAPS == false) {
    ___KBSTATUS_CAPS_ON(11, 5);

    ___VIRTUALKEYBOARD_LABEL.CAPS = true;
  } else {
    ___KBSTATUS_CAPS_OFF(11, 5);

    ___VIRTUALKEYBOARD_LABEL.CAPS = false;
  }
}

; // help hide keyb

function ___KBSTATUS(H, V, WHAT) {
  for (var y = 0; y < V; y = y + 1) {
    for (var x = 0; x < H; x = x + 1) {
      var name = "___VIRTUALKEYBOARD_" + x + y;
      var PASS_VK_CODE_ = "";
      var width_extra = 0;
      var SPECIAL_COMMAND = null;
      var LETTER = 0; // CREATING SYS KEYBOARD
      // eliminate rigth of space

      if (!(x >= 5 && y == 4 && x <= 7 && y == 4)) {
        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).VISIBLE = WHAT;
      } // extra


      if (y == 2 && x == 10) {
        var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
        x = 11;
        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).VISIBLE = WHAT;
        x = 10;
      } // extra


      if (y == 1 && x == 10) {
        var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
        x = 11;
        window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).VISIBLE = WHAT;
        x = 12;
      }
    }
  }
}

; // caps staff

function ___KBSTATUS_CAPS_ON(H, V, WHAT) {
  for (var y = 0; y < V; y = y + 1) {
    for (var x = 0; x < H; x = x + 1) {
      var name = "___VIRTUALKEYBOARD_" + x + y;
      var PASS_VK_CODE_ = "";
      var width_extra = 0;
      var SPECIAL_COMMAND = null;
      var LETTER = 0; // CREATING SYS KEYBOARD

      if (name != "___VIRTUALKEYBOARD_44" && name != "___VIRTUALKEYBOARD_100" && name != "___VIRTUALKEYBOARD_103" && name != "___VIRTUALKEYBOARD_104" && name != "___VIRTUALKEYBOARD_94") {
        // eliminate rigth of space
        if (!(x >= 5 && y == 4 && x <= 7 && y == 4)) {
          window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toUpperCase();
        } // extra


        if (y == 2 && x == 10) {
          var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
          x = 11;
          window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toUpperCase();
          x = 10;
        } // extra


        if (y == 1 && x == 10) {
          var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
          x = 11;
          window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toUpperCase();
          x = 12;
        } //for special


        if (___VIRTUALKEYBOARD_101.TEXTBOX.TEXT != "{") {
          ___VIRTUALKEYBOARD_101.TEXTBOX.TEXT = "{";
        }

        if (___VIRTUALKEYBOARD_102.TEXTBOX.TEXT != "\"") {
          ___VIRTUALKEYBOARD_102.TEXTBOX.TEXT = "\"";
        }

        if (___VIRTUALKEYBOARD_93.TEXTBOX.TEXT != "?") {
          ___VIRTUALKEYBOARD_93.TEXTBOX.TEXT = "?";
        }

        if (name == "___VIRTUALKEYBOARD_111") {
          ___VIRTUALKEYBOARD_111.TEXTBOX.TEXT = "}";
        } else if (name == "___VIRTUALKEYBOARD_92") {
          ___VIRTUALKEYBOARD_92.TEXTBOX.TEXT = ":";
        } else if (name == "___VIRTUALKEYBOARD_112") {
          ___VIRTUALKEYBOARD_112.TEXTBOX.TEXT = "|";
        } else if (name == "___VIRTUALKEYBOARD_73") {
          ___VIRTUALKEYBOARD_73.TEXTBOX.TEXT = "<";
        } else if (name == "___VIRTUALKEYBOARD_83") {
          ___VIRTUALKEYBOARD_83.TEXTBOX.TEXT = ">";
        } else if (name == "___VIRTUALKEYBOARD_10") {
          ___VIRTUALKEYBOARD_10.TEXTBOX.TEXT = "!";
        } else if (name == "___VIRTUALKEYBOARD_20") {
          ___VIRTUALKEYBOARD_20.TEXTBOX.TEXT = "@";
        } else if (name == "___VIRTUALKEYBOARD_30") {
          ___VIRTUALKEYBOARD_30.TEXTBOX.TEXT = "#";
        } else if (name == "___VIRTUALKEYBOARD_40") {
          ___VIRTUALKEYBOARD_40.TEXTBOX.TEXT = "$";
        } else if (name == "___VIRTUALKEYBOARD_50") {
          ___VIRTUALKEYBOARD_50.TEXTBOX.TEXT = "%";
        } else if (name == "___VIRTUALKEYBOARD_60") {
          ___VIRTUALKEYBOARD_60.TEXTBOX.TEXT = "^";
        } else if (name == "___VIRTUALKEYBOARD_70") {
          ___VIRTUALKEYBOARD_70.TEXTBOX.TEXT = "&";
        } else if (name == "___VIRTUALKEYBOARD_80") {
          ___VIRTUALKEYBOARD_80.TEXTBOX.TEXT = "*";
        } else if (name == "___VIRTUALKEYBOARD_90") {
          ___VIRTUALKEYBOARD_90.TEXTBOX.TEXT = "(";
        } else if (name == "___VIRTUALKEYBOARD_00") {
          ___VIRTUALKEYBOARD_00.TEXTBOX.TEXT = ")";
        }
      }
    }
  }
}

;

function ___KBSTATUS_CAPS_OFF(H, V, WHAT) {
  for (var y = 0; y < V; y = y + 1) {
    for (var x = 0; x < H; x = x + 1) {
      var name = "___VIRTUALKEYBOARD_" + x + y;
      var PASS_VK_CODE_ = "";
      var width_extra = 0;
      var SPECIAL_COMMAND = null;
      var LETTER = 0; // CREATING SYS KEYBOARD

      if (name != "___VIRTUALKEYBOARD_44" && name != "___VIRTUALKEYBOARD_100" && name != "___VIRTUALKEYBOARD_103" && name != "___VIRTUALKEYBOARD_104" && name != "___VIRTUALKEYBOARD_94") {
        // eliminate rigth of space
        if (!(x >= 5 && y == 4 && x <= 7 && y == 4)) {
          window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toLowerCase(); //console.log('caps OFF' + x + ' x y ' + y)
        } // extra


        if (y == 2 && x == 10) {
          var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
          x = 11;
          window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toLowerCase();
          x = 10;
        } // extra


        if (y == 1 && x == 10) {
          var name = "___VIRTUALKEYBOARD_" + (x + 1) + y;
          x = 11;
          window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT = window[_system.default.RUNNING_PROGRAMS[_system.default.RUNNING_PROGRAMS.length - 1]].ENGINE.MODULES.ACCESS_MODULE("GUI_STARTER").GAME_OBJECTS.ACCESS(name).TEXTBOX.TEXT.toLowerCase();
          x = 12;
        } //for special


        if (___VIRTUALKEYBOARD_101.TEXTBOX.TEXT != "[") {
          ___VIRTUALKEYBOARD_101.TEXTBOX.TEXT = "[";
        }

        if (___VIRTUALKEYBOARD_102.TEXTBOX.TEXT != "'") {
          ___VIRTUALKEYBOARD_102.TEXTBOX.TEXT = "'";
        }

        if (___VIRTUALKEYBOARD_93.TEXTBOX.TEXT != "/") {
          ___VIRTUALKEYBOARD_93.TEXTBOX.TEXT = "/";
        } //for special


        if (name == "___VIRTUALKEYBOARD_111") {
          ___VIRTUALKEYBOARD_111.TEXTBOX.TEXT = "]";
        } else if (name == "___VIRTUALKEYBOARD_93") {
          ___VIRTUALKEYBOARD_92.TEXTBOX.TEXT = ";";
        } else if (name == "___VIRTUALKEYBOARD_112") {
          ___VIRTUALKEYBOARD_112.TEXTBOX.TEXT = "\\";
        } else if (name == "___VIRTUALKEYBOARD_73") {
          ___VIRTUALKEYBOARD_73.TEXTBOX.TEXT = ",";
        } else if (name == "___VIRTUALKEYBOARD_83") {
          ___VIRTUALKEYBOARD_83.TEXTBOX.TEXT = ".";
        } else if (name == "___VIRTUALKEYBOARD_10") {
          ___VIRTUALKEYBOARD_10.TEXTBOX.TEXT = "1";
        } else if (name == "___VIRTUALKEYBOARD_20") {
          ___VIRTUALKEYBOARD_20.TEXTBOX.TEXT = "2";
        } else if (name == "___VIRTUALKEYBOARD_30") {
          ___VIRTUALKEYBOARD_30.TEXTBOX.TEXT = "3";
        } else if (name == "___VIRTUALKEYBOARD_40") {
          ___VIRTUALKEYBOARD_40.TEXTBOX.TEXT = "4";
        } else if (name == "___VIRTUALKEYBOARD_50") {
          ___VIRTUALKEYBOARD_50.TEXTBOX.TEXT = "5";
        } else if (name == "___VIRTUALKEYBOARD_60") {
          ___VIRTUALKEYBOARD_60.TEXTBOX.TEXT = "6";
        } else if (name == "___VIRTUALKEYBOARD_70") {
          ___VIRTUALKEYBOARD_70.TEXTBOX.TEXT = "7";
        } else if (name == "___VIRTUALKEYBOARD_80") {
          ___VIRTUALKEYBOARD_80.TEXTBOX.TEXT = "8";
        } else if (name == "___VIRTUALKEYBOARD_90") {
          ___VIRTUALKEYBOARD_90.TEXTBOX.TEXT = "9";
        } else if (name == "___VIRTUALKEYBOARD_00") {
          ___VIRTUALKEYBOARD_00.TEXTBOX.TEXT = "0";
        }
      } //for special


      if (name == "___VIRTUALKEYBOARD_101") {
        ___VIRTUALKEYBOARD_101.TEXTBOX.TEXT = "[";
      }
    }
  }
}

;

},{"../manifest/manifest":58,"./system":57}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ActivateModifiers;

function ActivateModifiers() {
  // Make 1200.99 $   looks like this 1.230,00
  Number.prototype.BalanceStyle = function (decPlaces, thouSeparator, decSeparator) {
    var n = this,
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSeparator = decSeparator == undefined ? "." : decSeparator,
        thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
        sign = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
  };

  Array.prototype.unset = function (value) {
    if (this.indexOf(value) != -1) {
      this.splice(this.indexOf(value), 1);
    }
  };

  Array.prototype.ACCESS_MODULE = function (name) {
    for (var x = 0; x < this.length; x++) {
      if (this[x].NAME == name) {
        return this[x];
      }
    }
  };

  Array.prototype.ACCESS = function (name) {
    for (var x = 0; x < this.length; x++) {
      if (this[x].NAME == name) {
        return this[x];
      }
    }
  };

  Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
  };

  NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
      if (this[i] && this[i].parentElement) {
        this[i].parentElement.removeChild(this[i]);
      }
    }
  };
}

},{}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _init = require("./init");

var _math = require("./math");

/**
 * Created by Nikola Lukic zlatnaspirala@gmail.com
 * @example SYS.DEBUG.LOG('welcome to extrime')
 * @Object {object} SYS
 */
var SYS = {
  ROOT: void 0,

  /**
   * Get browser data
   * @property {DETECTBROWSER} BROWSER
   */
  BROWSER: new _init.DETECTBROWSER(),

  /**
  Load/Add dinamic script in runtime
   */
  SCRIPT: _init.SCRIPT,

  /**
  Works with html canvas element ,
  create surface and setup main program loop
   */
  DOM: new _init.DOM(),

  /**
  Just list of running programs
   */
  RUNNING_PROGRAMS: new Array(),

  /**
  DEBUG
  console.log polumorh call
  switch on/off
   */
  DEBUG: new _init.LOG(),
  READY: false,

  /**
  RES - resources
  Image object creator
   */
  RES: {
    SUM_OF_LOADED_IMAGES: 0,
    CREATE_IMG: _init.CREATE_IMG,
    RESOURCE: window.RESOURCE
  },
  // Math

  /**
  Math - operation
   */
  MATH: {
    NUMBER_ROUND: _math.round,
    RANDOM_INT_FROM_TO: _math.randomIntFromTo,
    TO_DEGREES: _math.toDegrees,
    TO_RADIANS: _math.toRadians,
    OSCILLATOR: _math.OSCILLATOR,
    CONVERT: _init.CONVERTOR,
    INCREMENTATOR: _math.INCREMENTATOR,
    ORBIT: _math.ORBIT
  },
  ARRAY_OPERATION: {
    REMOVE_ALL_ITEMS_WITH_VALUE: _init.removeItem,
    DEEP_COPY: _init.DEEP_COPY
  },
  LOCAL_STORAGE: {},
  // Mouse or touch READ_ONLY
  MOUSE: {
    x: 0,
    y: 0,
    PRESS: false,
    BUTTON_PRESSED: null,
    ON_RIGHT_BTN_PRESSED: function () {},
    ON_MID_BTN_PRESSED: function () {},
    ON_LEFT_BTN_PRESSED: function () {}
  },
  XML: {
    READ: _init.readXML
  },
  SOUND: {
    GEN: _init.SOUND,
    RES: {}
  },
  VOICE: {
    SPEAK: function () {},
    LISTEN: function () {}
  },
  CAMERA: {
    SUPPORT: (0, _init.test_webcam_device)()
  }
};
var _default = SYS;
exports.default = _default;

},{"./init":50,"./math":51}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @Filename : manifest.js
 * Manifest file for visual-js application.
 * Important: Use this file just for edit fields, dont press enter for new line.
 * Created by Nikola Lukic zlatnaspirala@gmail.com
 * www.maximumroulette.com 2016
 */
var APPLICATION = {
  NAME: "VISUAL-JS",
  TYPE: "client",
  VERSION: "3.0.0",
  STATUS: "develop",
  MULTILANGUAGE: true,
  // false for fiddle support , we need absolute path.
  IMAGE_LOADER_PREFIX: true,
  EDITOR: true,
  EDITOR_AUTORUN: false,
  LOCAL_SERVER: "localhost",
  DEVELOPERS: ["Nikola Lukic Zlatnaspirala@gmail.com"],
  ACCESSIBILITY: {
    VIRTUAL_KEYBOARD_FOR_DESKTOP: false,
    ACTIVATE_VK_FOR_DESKTOP: function () {
      CREATE_VIRTUAL_KEYBOARD();
      HIDE_KEYBOARD();
      APPLICATION.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP = true;
    },
    DEACTIVATE_VK_FOR_DESKTOP: function () {
      APPLICATION.ACCESSIBILITY.VIRTUAL_KEYBOARD_FOR_DESKTOP = false;
    }
  },
  SINGLE_BROADCAST: true,
  MULTIRTC_PEER: true,
  PROGRAM: {
    // MONITOR is innerWidth.Height or CANVAS is canvas width
    CALCULATING_POSITION_BY: "CANVAS",
    RENDER_SPEED: 5,
    UPDATE_SPEED: 5
  },
  SYSTEM: {
    FONT: '12px sans-serif',
    COLOR: "#afa9aa",
    HOVER_COLOR: "#5991FF",
    TEXT_COLOR: "black",
    ACTOR_X: "",
    ACTOR_Y: ""
  }
};
var _default = APPLICATION;
exports.default = _default;

},{}]},{},[1]);
