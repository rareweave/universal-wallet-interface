var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output2 = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output2.push(tripletToBase64(tmp));
      }
      return output2.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports) {
    exports.read = function(buffer, offset2, isLE2, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE2 ? nBytes - 1 : 0;
      var d = isLE2 ? -1 : 1;
      var s = buffer[offset2 + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset2 + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset2 + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset2, isLE2, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE2 ? 0 : nBytes - 1;
      var d = isLE2 ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset2 + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset2 + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset2 + i - d] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer3;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer3.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer3.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer3.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function Buffer3(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer3.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer3.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b)
        return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer3.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer3, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer3.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer3.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer3.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string2, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer3.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string2, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string2, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array2) {
      const length = array2.length < 0 ? 0 : checked(array2.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array2[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array2, byteOffset, length) {
      if (byteOffset < 0 || array2.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array2.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array2);
      } else if (length === void 0) {
        buf = new Uint8Array(array2, byteOffset);
      } else {
        buf = new Uint8Array(array2, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer3.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer3.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer3.alloc(+length);
    }
    Buffer3.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer3.prototype;
    };
    Buffer3.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array))
        a = Buffer3.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array))
        b = Buffer3.from(b, b.offset, b.byteLength);
      if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b)
        return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer3.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer3.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer3.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer3.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer3.isBuffer(buf))
              buf = Buffer3.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer3.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string2, encoding) {
      if (Buffer3.isBuffer(string2)) {
        return string2.length;
      }
      if (ArrayBuffer.isView(string2) || isInstance(string2, ArrayBuffer)) {
        return string2.byteLength;
      }
      if (typeof string2 !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string2
        );
      }
      const len = string2.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0)
        return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes3(string2).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string2).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes3(string2).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer3.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer3.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer3.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer3.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer3.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
    Buffer3.prototype.equals = function equals(b) {
      if (!Buffer3.isBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer3.compare(this, b) === 0;
    };
    Buffer3.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
    }
    Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer3.from(target, target.offset, target.byteLength);
      }
      if (!Buffer3.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer3.from(val, encoding);
      }
      if (Buffer3.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i;
            if (i - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found)
            return i;
        }
      }
      return -1;
    }
    Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string2, offset2, length) {
      offset2 = Number(offset2) || 0;
      const remaining = buf.length - offset2;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string2.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string2.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i;
        buf[offset2 + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string2, offset2, length) {
      return blitBuffer(utf8ToBytes3(string2, buf.length - offset2), buf, offset2, length);
    }
    function asciiWrite(buf, string2, offset2, length) {
      return blitBuffer(asciiToBytes(string2), buf, offset2, length);
    }
    function base64Write(buf, string2, offset2, length) {
      return blitBuffer(base64ToBytes(string2), buf, offset2, length);
    }
    function ucs2Write(buf, string2, offset2, length) {
      return blitBuffer(utf16leToBytes(string2, buf.length - offset2), buf, offset2, length);
    }
    Buffer3.prototype.write = function write(string2, offset2, length, encoding) {
      if (offset2 === void 0) {
        encoding = "utf8";
        length = this.length;
        offset2 = 0;
      } else if (length === void 0 && typeof offset2 === "string") {
        encoding = offset2;
        length = this.length;
        offset2 = 0;
      } else if (isFinite(offset2)) {
        offset2 = offset2 >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset2;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string2.length > 0 && (length < 0 || offset2 < 0) || offset2 > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string2, offset2, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string2, offset2, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string2, offset2, length);
          case "base64":
            return base64Write(this, string2, offset2, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string2, offset2, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer3.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes2 = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes2.length - 1; i += 2) {
        res += String.fromCharCode(bytes2[i] + bytes2[i + 1] * 256);
      }
      return res;
    }
    Buffer3.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer3.prototype);
      return newBuf;
    };
    function checkOffset(offset2, ext, length) {
      if (offset2 % 1 !== 0 || offset2 < 0)
        throw new RangeError("offset is not uint");
      if (offset2 + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset2, byteLength2, noAssert) {
      offset2 = offset2 >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset2, byteLength2, this.length);
      let val = this[offset2];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset2 + i] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset2, byteLength2, noAssert) {
      offset2 = offset2 >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset2, byteLength2, this.length);
      }
      let val = this[offset2 + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset2 + --byteLength2] * mul;
      }
      return val;
    };
    Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkOffset(offset2, 1, this.length);
      return this[offset2];
    };
    Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkOffset(offset2, 2, this.length);
      return this[offset2] | this[offset2 + 1] << 8;
    };
    Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkOffset(offset2, 2, this.length);
      return this[offset2] << 8 | this[offset2 + 1];
    };
    Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkOffset(offset2, 4, this.length);
      return (this[offset2] | this[offset2 + 1] << 8 | this[offset2 + 2] << 16) + this[offset2 + 3] * 16777216;
    };
    Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkOffset(offset2, 4, this.length);
      return this[offset2] * 16777216 + (this[offset2 + 1] << 16 | this[offset2 + 2] << 8 | this[offset2 + 3]);
    };
    Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset2) {
      offset2 = offset2 >>> 0;
      validateNumber(offset2, "offset");
      const first = this[offset2];
      const last = this[offset2 + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset2, this.length - 8);
      }
      const lo = first + this[++offset2] * 2 ** 8 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 24;
      const hi = this[++offset2] + this[++offset2] * 2 ** 8 + this[++offset2] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset2) {
      offset2 = offset2 >>> 0;
      validateNumber(offset2, "offset");
      const first = this[offset2];
      const last = this[offset2 + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset2, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + this[++offset2];
      const lo = this[++offset2] * 2 ** 24 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer3.prototype.readIntLE = function readIntLE(offset2, byteLength2, noAssert) {
      offset2 = offset2 >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset2, byteLength2, this.length);
      let val = this[offset2];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset2 + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readIntBE = function readIntBE(offset2, byteLength2, noAssert) {
      offset2 = offset2 >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset2, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset2 + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset2 + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer3.prototype.readInt8 = function readInt8(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkOffset(offset2, 1, this.length);
      if (!(this[offset2] & 128))
        return this[offset2];
      return (255 - this[offset2] + 1) * -1;
    };
    Buffer3.prototype.readInt16LE = function readInt16LE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkOffset(offset2, 2, this.length);
      const val = this[offset2] | this[offset2 + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt16BE = function readInt16BE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkOffset(offset2, 2, this.length);
      const val = this[offset2 + 1] | this[offset2] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer3.prototype.readInt32LE = function readInt32LE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkOffset(offset2, 4, this.length);
      return this[offset2] | this[offset2 + 1] << 8 | this[offset2 + 2] << 16 | this[offset2 + 3] << 24;
    };
    Buffer3.prototype.readInt32BE = function readInt32BE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkOffset(offset2, 4, this.length);
      return this[offset2] << 24 | this[offset2 + 1] << 16 | this[offset2 + 2] << 8 | this[offset2 + 3];
    };
    Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset2) {
      offset2 = offset2 >>> 0;
      validateNumber(offset2, "offset");
      const first = this[offset2];
      const last = this[offset2 + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset2, this.length - 8);
      }
      const val = this[offset2 + 4] + this[offset2 + 5] * 2 ** 8 + this[offset2 + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset2] * 2 ** 8 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 24);
    });
    Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset2) {
      offset2 = offset2 >>> 0;
      validateNumber(offset2, "offset");
      const first = this[offset2];
      const last = this[offset2 + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset2, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + this[++offset2];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset2] * 2 ** 24 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + last);
    });
    Buffer3.prototype.readFloatLE = function readFloatLE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkOffset(offset2, 4, this.length);
      return ieee754.read(this, offset2, true, 23, 4);
    };
    Buffer3.prototype.readFloatBE = function readFloatBE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkOffset(offset2, 4, this.length);
      return ieee754.read(this, offset2, false, 23, 4);
    };
    Buffer3.prototype.readDoubleLE = function readDoubleLE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkOffset(offset2, 8, this.length);
      return ieee754.read(this, offset2, true, 52, 8);
    };
    Buffer3.prototype.readDoubleBE = function readDoubleBE(offset2, noAssert) {
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkOffset(offset2, 8, this.length);
      return ieee754.read(this, offset2, false, 52, 8);
    };
    function checkInt(buf, value, offset2, ext, max, min) {
      if (!Buffer3.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset2 + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset2, byteLength2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset2, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset2] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset2 + i] = value / mul & 255;
      }
      return offset2 + byteLength2;
    };
    Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset2, byteLength2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset2, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset2 + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset2 + i] = value / mul & 255;
      }
      return offset2 + byteLength2;
    };
    Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkInt(this, value, offset2, 1, 255, 0);
      this[offset2] = value & 255;
      return offset2 + 1;
    };
    Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkInt(this, value, offset2, 2, 65535, 0);
      this[offset2] = value & 255;
      this[offset2 + 1] = value >>> 8;
      return offset2 + 2;
    };
    Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkInt(this, value, offset2, 2, 65535, 0);
      this[offset2] = value >>> 8;
      this[offset2 + 1] = value & 255;
      return offset2 + 2;
    };
    Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkInt(this, value, offset2, 4, 4294967295, 0);
      this[offset2 + 3] = value >>> 24;
      this[offset2 + 2] = value >>> 16;
      this[offset2 + 1] = value >>> 8;
      this[offset2] = value & 255;
      return offset2 + 4;
    };
    Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkInt(this, value, offset2, 4, 4294967295, 0);
      this[offset2] = value >>> 24;
      this[offset2 + 1] = value >>> 16;
      this[offset2 + 2] = value >>> 8;
      this[offset2 + 3] = value & 255;
      return offset2 + 4;
    };
    function wrtBigUInt64LE(buf, value, offset2, min, max) {
      checkIntBI(value, min, max, buf, offset2, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset2++] = lo;
      lo = lo >> 8;
      buf[offset2++] = lo;
      lo = lo >> 8;
      buf[offset2++] = lo;
      lo = lo >> 8;
      buf[offset2++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset2++] = hi;
      hi = hi >> 8;
      buf[offset2++] = hi;
      hi = hi >> 8;
      buf[offset2++] = hi;
      hi = hi >> 8;
      buf[offset2++] = hi;
      return offset2;
    }
    function wrtBigUInt64BE(buf, value, offset2, min, max) {
      checkIntBI(value, min, max, buf, offset2, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset2 + 7] = lo;
      lo = lo >> 8;
      buf[offset2 + 6] = lo;
      lo = lo >> 8;
      buf[offset2 + 5] = lo;
      lo = lo >> 8;
      buf[offset2 + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset2 + 3] = hi;
      hi = hi >> 8;
      buf[offset2 + 2] = hi;
      hi = hi >> 8;
      buf[offset2 + 1] = hi;
      hi = hi >> 8;
      buf[offset2] = hi;
      return offset2 + 8;
    }
    Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset2 = 0) {
      return wrtBigUInt64LE(this, value, offset2, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset2 = 0) {
      return wrtBigUInt64BE(this, value, offset2, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer3.prototype.writeIntLE = function writeIntLE(value, offset2, byteLength2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset2, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset2] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset2 + i - 1] !== 0) {
          sub = 1;
        }
        this[offset2 + i] = (value / mul >> 0) - sub & 255;
      }
      return offset2 + byteLength2;
    };
    Buffer3.prototype.writeIntBE = function writeIntBE(value, offset2, byteLength2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset2, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset2 + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset2 + i + 1] !== 0) {
          sub = 1;
        }
        this[offset2 + i] = (value / mul >> 0) - sub & 255;
      }
      return offset2 + byteLength2;
    };
    Buffer3.prototype.writeInt8 = function writeInt8(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkInt(this, value, offset2, 1, 127, -128);
      if (value < 0)
        value = 255 + value + 1;
      this[offset2] = value & 255;
      return offset2 + 1;
    };
    Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkInt(this, value, offset2, 2, 32767, -32768);
      this[offset2] = value & 255;
      this[offset2 + 1] = value >>> 8;
      return offset2 + 2;
    };
    Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkInt(this, value, offset2, 2, 32767, -32768);
      this[offset2] = value >>> 8;
      this[offset2 + 1] = value & 255;
      return offset2 + 2;
    };
    Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkInt(this, value, offset2, 4, 2147483647, -2147483648);
      this[offset2] = value & 255;
      this[offset2 + 1] = value >>> 8;
      this[offset2 + 2] = value >>> 16;
      this[offset2 + 3] = value >>> 24;
      return offset2 + 4;
    };
    Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset2, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert)
        checkInt(this, value, offset2, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      this[offset2] = value >>> 24;
      this[offset2 + 1] = value >>> 16;
      this[offset2 + 2] = value >>> 8;
      this[offset2 + 3] = value & 255;
      return offset2 + 4;
    };
    Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset2 = 0) {
      return wrtBigUInt64LE(this, value, offset2, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset2 = 0) {
      return wrtBigUInt64BE(this, value, offset2, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset2, ext, max, min) {
      if (offset2 + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset2 < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset2, littleEndian, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset2, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset2, littleEndian, 23, 4);
      return offset2 + 4;
    }
    Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset2, noAssert) {
      return writeFloat(this, value, offset2, true, noAssert);
    };
    Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset2, noAssert) {
      return writeFloat(this, value, offset2, false, noAssert);
    };
    function writeDouble(buf, value, offset2, littleEndian, noAssert) {
      value = +value;
      offset2 = offset2 >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset2, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset2, littleEndian, 52, 8);
      return offset2 + 8;
    }
    Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset2, noAssert) {
      return writeDouble(this, value, offset2, true, noAssert);
    };
    Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset2, noAssert) {
      return writeDouble(this, value, offset2, false, noAssert);
    };
    Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer3.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer3.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes2 = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
        const len = bytes2.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes2[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset2, byteLength2) {
      validateNumber(offset2, "offset");
      if (buf[offset2] === void 0 || buf[offset2 + byteLength2] === void 0) {
        boundsError(offset2, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset2, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset2, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type2) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type2);
        throw new errors.ERR_OUT_OF_RANGE(type2 || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type2 || "offset",
        `>= ${type2 ? 1 : 0} and <= ${length}`,
        value
      );
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes3(string2, units) {
      units = units || Infinity;
      let codePoint;
      const length = string2.length;
      let leadSurrogate = null;
      const bytes2 = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string2.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes2.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1)
                bytes2.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes2.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes2.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes2.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes2.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes2.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes2.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes2;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0)
          break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset2, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset2 >= dst.length || i >= src.length)
          break;
        dst[i + offset2] = src[i];
      }
      return i;
    }
    function isInstance(obj, type2) {
      return obj instanceof type2 || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type2.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// node_modules/@babel/runtime/helpers/typeof.js
var require_typeof = __commonJS({
  "node_modules/@babel/runtime/helpers/typeof.js"(exports, module) {
    function _typeof2(o) {
      "@babel/helpers - typeof";
      return module.exports = _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof2(o);
    }
    module.exports = _typeof2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/regeneratorRuntime.js
var require_regeneratorRuntime = __commonJS({
  "node_modules/@babel/runtime/helpers/regeneratorRuntime.js"(exports, module) {
    var _typeof2 = require_typeof()["default"];
    function _regeneratorRuntime2() {
      "use strict";
      module.exports = _regeneratorRuntime2 = function _regeneratorRuntime3() {
        return e;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports;
      var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function(t2, e2, r2) {
        t2[e2] = r2.value;
      }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag";
      function define2(t2, e2, r2) {
        return Object.defineProperty(t2, e2, {
          value: r2,
          enumerable: true,
          configurable: true,
          writable: true
        }), t2[e2];
      }
      try {
        define2({}, "");
      } catch (t2) {
        define2 = function define3(t3, e2, r2) {
          return t3[e2] = r2;
        };
      }
      function wrap(t2, e2, r2, n2) {
        var i2 = e2 && e2.prototype instanceof Generator ? e2 : Generator, a2 = Object.create(i2.prototype), c2 = new Context(n2 || []);
        return o(a2, "_invoke", {
          value: makeInvokeMethod(t2, r2, c2)
        }), a2;
      }
      function tryCatch(t2, e2, r2) {
        try {
          return {
            type: "normal",
            arg: t2.call(e2, r2)
          };
        } catch (t3) {
          return {
            type: "throw",
            arg: t3
          };
        }
      }
      e.wrap = wrap;
      var h = "suspendedStart", l = "suspendedYield", f2 = "executing", s = "completed", y = {};
      function Generator() {
      }
      function GeneratorFunction() {
      }
      function GeneratorFunctionPrototype() {
      }
      var p = {};
      define2(p, a, function() {
        return this;
      });
      var d = Object.getPrototypeOf, v = d && d(d(values([])));
      v && v !== r && n.call(v, a) && (p = v);
      var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
      function defineIteratorMethods(t2) {
        ["next", "throw", "return"].forEach(function(e2) {
          define2(t2, e2, function(t3) {
            return this._invoke(e2, t3);
          });
        });
      }
      function AsyncIterator(t2, e2) {
        function invoke(r3, o2, i2, a2) {
          var c2 = tryCatch(t2[r3], t2, o2);
          if ("throw" !== c2.type) {
            var u2 = c2.arg, h2 = u2.value;
            return h2 && "object" == _typeof2(h2) && n.call(h2, "__await") ? e2.resolve(h2.__await).then(function(t3) {
              invoke("next", t3, i2, a2);
            }, function(t3) {
              invoke("throw", t3, i2, a2);
            }) : e2.resolve(h2).then(function(t3) {
              u2.value = t3, i2(u2);
            }, function(t3) {
              return invoke("throw", t3, i2, a2);
            });
          }
          a2(c2.arg);
        }
        var r2;
        o(this, "_invoke", {
          value: function value(t3, n2) {
            function callInvokeWithMethodAndArg() {
              return new e2(function(e3, r3) {
                invoke(t3, n2, e3, r3);
              });
            }
            return r2 = r2 ? r2.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
          }
        });
      }
      function makeInvokeMethod(e2, r2, n2) {
        var o2 = h;
        return function(i2, a2) {
          if (o2 === f2)
            throw new Error("Generator is already running");
          if (o2 === s) {
            if ("throw" === i2)
              throw a2;
            return {
              value: t,
              done: true
            };
          }
          for (n2.method = i2, n2.arg = a2; ; ) {
            var c2 = n2.delegate;
            if (c2) {
              var u2 = maybeInvokeDelegate(c2, n2);
              if (u2) {
                if (u2 === y)
                  continue;
                return u2;
              }
            }
            if ("next" === n2.method)
              n2.sent = n2._sent = n2.arg;
            else if ("throw" === n2.method) {
              if (o2 === h)
                throw o2 = s, n2.arg;
              n2.dispatchException(n2.arg);
            } else
              "return" === n2.method && n2.abrupt("return", n2.arg);
            o2 = f2;
            var p2 = tryCatch(e2, r2, n2);
            if ("normal" === p2.type) {
              if (o2 = n2.done ? s : l, p2.arg === y)
                continue;
              return {
                value: p2.arg,
                done: n2.done
              };
            }
            "throw" === p2.type && (o2 = s, n2.method = "throw", n2.arg = p2.arg);
          }
        };
      }
      function maybeInvokeDelegate(e2, r2) {
        var n2 = r2.method, o2 = e2.iterator[n2];
        if (o2 === t)
          return r2.delegate = null, "throw" === n2 && e2.iterator["return"] && (r2.method = "return", r2.arg = t, maybeInvokeDelegate(e2, r2), "throw" === r2.method) || "return" !== n2 && (r2.method = "throw", r2.arg = new TypeError("The iterator does not provide a '" + n2 + "' method")), y;
        var i2 = tryCatch(o2, e2.iterator, r2.arg);
        if ("throw" === i2.type)
          return r2.method = "throw", r2.arg = i2.arg, r2.delegate = null, y;
        var a2 = i2.arg;
        return a2 ? a2.done ? (r2[e2.resultName] = a2.value, r2.next = e2.nextLoc, "return" !== r2.method && (r2.method = "next", r2.arg = t), r2.delegate = null, y) : a2 : (r2.method = "throw", r2.arg = new TypeError("iterator result is not an object"), r2.delegate = null, y);
      }
      function pushTryEntry(t2) {
        var e2 = {
          tryLoc: t2[0]
        };
        1 in t2 && (e2.catchLoc = t2[1]), 2 in t2 && (e2.finallyLoc = t2[2], e2.afterLoc = t2[3]), this.tryEntries.push(e2);
      }
      function resetTryEntry(t2) {
        var e2 = t2.completion || {};
        e2.type = "normal", delete e2.arg, t2.completion = e2;
      }
      function Context(t2) {
        this.tryEntries = [{
          tryLoc: "root"
        }], t2.forEach(pushTryEntry, this), this.reset(true);
      }
      function values(e2) {
        if (e2 || "" === e2) {
          var r2 = e2[a];
          if (r2)
            return r2.call(e2);
          if ("function" == typeof e2.next)
            return e2;
          if (!isNaN(e2.length)) {
            var o2 = -1, i2 = function next() {
              for (; ++o2 < e2.length; )
                if (n.call(e2, o2))
                  return next.value = e2[o2], next.done = false, next;
              return next.value = t, next.done = true, next;
            };
            return i2.next = i2;
          }
        }
        throw new TypeError(_typeof2(e2) + " is not iterable");
      }
      return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: true
      }), o(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: true
      }), GeneratorFunction.displayName = define2(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function(t2) {
        var e2 = "function" == typeof t2 && t2.constructor;
        return !!e2 && (e2 === GeneratorFunction || "GeneratorFunction" === (e2.displayName || e2.name));
      }, e.mark = function(t2) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(t2, GeneratorFunctionPrototype) : (t2.__proto__ = GeneratorFunctionPrototype, define2(t2, u, "GeneratorFunction")), t2.prototype = Object.create(g), t2;
      }, e.awrap = function(t2) {
        return {
          __await: t2
        };
      }, defineIteratorMethods(AsyncIterator.prototype), define2(AsyncIterator.prototype, c, function() {
        return this;
      }), e.AsyncIterator = AsyncIterator, e.async = function(t2, r2, n2, o2, i2) {
        void 0 === i2 && (i2 = Promise);
        var a2 = new AsyncIterator(wrap(t2, r2, n2, o2), i2);
        return e.isGeneratorFunction(r2) ? a2 : a2.next().then(function(t3) {
          return t3.done ? t3.value : a2.next();
        });
      }, defineIteratorMethods(g), define2(g, u, "Generator"), define2(g, a, function() {
        return this;
      }), define2(g, "toString", function() {
        return "[object Generator]";
      }), e.keys = function(t2) {
        var e2 = Object(t2), r2 = [];
        for (var n2 in e2)
          r2.push(n2);
        return r2.reverse(), function next() {
          for (; r2.length; ) {
            var t3 = r2.pop();
            if (t3 in e2)
              return next.value = t3, next.done = false, next;
          }
          return next.done = true, next;
        };
      }, e.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(e2) {
          if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = false, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e2)
            for (var r2 in this)
              "t" === r2.charAt(0) && n.call(this, r2) && !isNaN(+r2.slice(1)) && (this[r2] = t);
        },
        stop: function stop() {
          this.done = true;
          var t2 = this.tryEntries[0].completion;
          if ("throw" === t2.type)
            throw t2.arg;
          return this.rval;
        },
        dispatchException: function dispatchException(e2) {
          if (this.done)
            throw e2;
          var r2 = this;
          function handle(n2, o3) {
            return a2.type = "throw", a2.arg = e2, r2.next = n2, o3 && (r2.method = "next", r2.arg = t), !!o3;
          }
          for (var o2 = this.tryEntries.length - 1; o2 >= 0; --o2) {
            var i2 = this.tryEntries[o2], a2 = i2.completion;
            if ("root" === i2.tryLoc)
              return handle("end");
            if (i2.tryLoc <= this.prev) {
              var c2 = n.call(i2, "catchLoc"), u2 = n.call(i2, "finallyLoc");
              if (c2 && u2) {
                if (this.prev < i2.catchLoc)
                  return handle(i2.catchLoc, true);
                if (this.prev < i2.finallyLoc)
                  return handle(i2.finallyLoc);
              } else if (c2) {
                if (this.prev < i2.catchLoc)
                  return handle(i2.catchLoc, true);
              } else {
                if (!u2)
                  throw new Error("try statement without catch or finally");
                if (this.prev < i2.finallyLoc)
                  return handle(i2.finallyLoc);
              }
            }
          }
        },
        abrupt: function abrupt(t2, e2) {
          for (var r2 = this.tryEntries.length - 1; r2 >= 0; --r2) {
            var o2 = this.tryEntries[r2];
            if (o2.tryLoc <= this.prev && n.call(o2, "finallyLoc") && this.prev < o2.finallyLoc) {
              var i2 = o2;
              break;
            }
          }
          i2 && ("break" === t2 || "continue" === t2) && i2.tryLoc <= e2 && e2 <= i2.finallyLoc && (i2 = null);
          var a2 = i2 ? i2.completion : {};
          return a2.type = t2, a2.arg = e2, i2 ? (this.method = "next", this.next = i2.finallyLoc, y) : this.complete(a2);
        },
        complete: function complete(t2, e2) {
          if ("throw" === t2.type)
            throw t2.arg;
          return "break" === t2.type || "continue" === t2.type ? this.next = t2.arg : "return" === t2.type ? (this.rval = this.arg = t2.arg, this.method = "return", this.next = "end") : "normal" === t2.type && e2 && (this.next = e2), y;
        },
        finish: function finish(t2) {
          for (var e2 = this.tryEntries.length - 1; e2 >= 0; --e2) {
            var r2 = this.tryEntries[e2];
            if (r2.finallyLoc === t2)
              return this.complete(r2.completion, r2.afterLoc), resetTryEntry(r2), y;
          }
        },
        "catch": function _catch(t2) {
          for (var e2 = this.tryEntries.length - 1; e2 >= 0; --e2) {
            var r2 = this.tryEntries[e2];
            if (r2.tryLoc === t2) {
              var n2 = r2.completion;
              if ("throw" === n2.type) {
                var o2 = n2.arg;
                resetTryEntry(r2);
              }
              return o2;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(e2, r2, n2) {
          return this.delegate = {
            iterator: values(e2),
            resultName: r2,
            nextLoc: n2
          }, "next" === this.method && (this.arg = t), y;
        }
      }, e;
    }
    module.exports = _regeneratorRuntime2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/regenerator/index.js
var require_regenerator = __commonJS({
  "node_modules/@babel/runtime/regenerator/index.js"(exports, module) {
    var runtime = require_regeneratorRuntime()();
    module.exports = runtime;
    try {
      regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
      if (typeof globalThis === "object") {
        globalThis.regeneratorRuntime = runtime;
      } else {
        Function("r", "regeneratorRuntime = r")(runtime);
      }
    }
  }
});

// (disabled):node_modules/buffer/index.js
var require_buffer2 = __commonJS({
  "(disabled):node_modules/buffer/index.js"() {
  }
});

// node_modules/bn.js/lib/bn.js
var require_bn = __commonJS({
  "node_modules/bn.js/lib/bn.js"(exports, module) {
    (function(module2, exports2) {
      "use strict";
      function assert3(val, msg) {
        if (!val)
          throw new Error(msg || "Assertion failed");
      }
      function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
      function BN2(number3, base, endian) {
        if (BN2.isBN(number3)) {
          return number3;
        }
        this.negative = 0;
        this.words = null;
        this.length = 0;
        this.red = null;
        if (number3 !== null) {
          if (base === "le" || base === "be") {
            endian = base;
            base = 10;
          }
          this._init(number3 || 0, base || 10, endian || "be");
        }
      }
      if (typeof module2 === "object") {
        module2.exports = BN2;
      } else {
        exports2.BN = BN2;
      }
      BN2.BN = BN2;
      BN2.wordSize = 26;
      var Buffer3;
      try {
        if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
          Buffer3 = window.Buffer;
        } else {
          Buffer3 = require_buffer2().Buffer;
        }
      } catch (e) {
      }
      BN2.isBN = function isBN(num) {
        if (num instanceof BN2) {
          return true;
        }
        return num !== null && typeof num === "object" && num.constructor.wordSize === BN2.wordSize && Array.isArray(num.words);
      };
      BN2.max = function max(left, right) {
        if (left.cmp(right) > 0)
          return left;
        return right;
      };
      BN2.min = function min(left, right) {
        if (left.cmp(right) < 0)
          return left;
        return right;
      };
      BN2.prototype._init = function init(number3, base, endian) {
        if (typeof number3 === "number") {
          return this._initNumber(number3, base, endian);
        }
        if (typeof number3 === "object") {
          return this._initArray(number3, base, endian);
        }
        if (base === "hex") {
          base = 16;
        }
        assert3(base === (base | 0) && base >= 2 && base <= 36);
        number3 = number3.toString().replace(/\s+/g, "");
        var start = 0;
        if (number3[0] === "-") {
          start++;
          this.negative = 1;
        }
        if (start < number3.length) {
          if (base === 16) {
            this._parseHex(number3, start, endian);
          } else {
            this._parseBase(number3, base, start);
            if (endian === "le") {
              this._initArray(this.toArray(), base, endian);
            }
          }
        }
      };
      BN2.prototype._initNumber = function _initNumber(number3, base, endian) {
        if (number3 < 0) {
          this.negative = 1;
          number3 = -number3;
        }
        if (number3 < 67108864) {
          this.words = [number3 & 67108863];
          this.length = 1;
        } else if (number3 < 4503599627370496) {
          this.words = [
            number3 & 67108863,
            number3 / 67108864 & 67108863
          ];
          this.length = 2;
        } else {
          assert3(number3 < 9007199254740992);
          this.words = [
            number3 & 67108863,
            number3 / 67108864 & 67108863,
            1
          ];
          this.length = 3;
        }
        if (endian !== "le")
          return;
        this._initArray(this.toArray(), base, endian);
      };
      BN2.prototype._initArray = function _initArray(number3, base, endian) {
        assert3(typeof number3.length === "number");
        if (number3.length <= 0) {
          this.words = [0];
          this.length = 1;
          return this;
        }
        this.length = Math.ceil(number3.length / 3);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var j, w;
        var off = 0;
        if (endian === "be") {
          for (i = number3.length - 1, j = 0; i >= 0; i -= 3) {
            w = number3[i] | number3[i - 1] << 8 | number3[i - 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        } else if (endian === "le") {
          for (i = 0, j = 0; i < number3.length; i += 3) {
            w = number3[i] | number3[i + 1] << 8 | number3[i + 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        }
        return this._strip();
      };
      function parseHex4Bits(string2, index) {
        var c = string2.charCodeAt(index);
        if (c >= 48 && c <= 57) {
          return c - 48;
        } else if (c >= 65 && c <= 70) {
          return c - 55;
        } else if (c >= 97 && c <= 102) {
          return c - 87;
        } else {
          assert3(false, "Invalid character in " + string2);
        }
      }
      function parseHexByte(string2, lowerBound, index) {
        var r = parseHex4Bits(string2, index);
        if (index - 1 >= lowerBound) {
          r |= parseHex4Bits(string2, index - 1) << 4;
        }
        return r;
      }
      BN2.prototype._parseHex = function _parseHex(number3, start, endian) {
        this.length = Math.ceil((number3.length - start) / 6);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var off = 0;
        var j = 0;
        var w;
        if (endian === "be") {
          for (i = number3.length - 1; i >= start; i -= 2) {
            w = parseHexByte(number3, start, i) << off;
            this.words[j] |= w & 67108863;
            if (off >= 18) {
              off -= 18;
              j += 1;
              this.words[j] |= w >>> 26;
            } else {
              off += 8;
            }
          }
        } else {
          var parseLength = number3.length - start;
          for (i = parseLength % 2 === 0 ? start + 1 : start; i < number3.length; i += 2) {
            w = parseHexByte(number3, start, i) << off;
            this.words[j] |= w & 67108863;
            if (off >= 18) {
              off -= 18;
              j += 1;
              this.words[j] |= w >>> 26;
            } else {
              off += 8;
            }
          }
        }
        this._strip();
      };
      function parseBase(str, start, end, mul) {
        var r = 0;
        var b = 0;
        var len = Math.min(str.length, end);
        for (var i = start; i < len; i++) {
          var c = str.charCodeAt(i) - 48;
          r *= mul;
          if (c >= 49) {
            b = c - 49 + 10;
          } else if (c >= 17) {
            b = c - 17 + 10;
          } else {
            b = c;
          }
          assert3(c >= 0 && b < mul, "Invalid character");
          r += b;
        }
        return r;
      }
      BN2.prototype._parseBase = function _parseBase(number3, base, start) {
        this.words = [0];
        this.length = 1;
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base) {
          limbLen++;
        }
        limbLen--;
        limbPow = limbPow / base | 0;
        var total = number3.length - start;
        var mod2 = total % limbLen;
        var end = Math.min(total, total - mod2) + start;
        var word = 0;
        for (var i = start; i < end; i += limbLen) {
          word = parseBase(number3, i, i + limbLen, base);
          this.imuln(limbPow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        if (mod2 !== 0) {
          var pow3 = 1;
          word = parseBase(number3, i, number3.length, base);
          for (i = 0; i < mod2; i++) {
            pow3 *= base;
          }
          this.imuln(pow3);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        this._strip();
      };
      BN2.prototype.copy = function copy(dest) {
        dest.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          dest.words[i] = this.words[i];
        }
        dest.length = this.length;
        dest.negative = this.negative;
        dest.red = this.red;
      };
      function move(dest, src) {
        dest.words = src.words;
        dest.length = src.length;
        dest.negative = src.negative;
        dest.red = src.red;
      }
      BN2.prototype._move = function _move(dest) {
        move(dest, this);
      };
      BN2.prototype.clone = function clone() {
        var r = new BN2(null);
        this.copy(r);
        return r;
      };
      BN2.prototype._expand = function _expand(size) {
        while (this.length < size) {
          this.words[this.length++] = 0;
        }
        return this;
      };
      BN2.prototype._strip = function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }
        return this._normSign();
      };
      BN2.prototype._normSign = function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }
        return this;
      };
      if (typeof Symbol !== "undefined" && typeof Symbol.for === "function") {
        try {
          BN2.prototype[Symbol.for("nodejs.util.inspect.custom")] = inspect;
        } catch (e) {
          BN2.prototype.inspect = inspect;
        }
      } else {
        BN2.prototype.inspect = inspect;
      }
      function inspect() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var zeros = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ];
      var groupSizes = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ];
      var groupBases = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      BN2.prototype.toString = function toString(base, padding) {
        base = base || 10;
        padding = padding | 0 || 1;
        var out;
        if (base === 16 || base === "hex") {
          out = "";
          var off = 0;
          var carry = 0;
          for (var i = 0; i < this.length; i++) {
            var w = this.words[i];
            var word = ((w << off | carry) & 16777215).toString(16);
            carry = w >>> 24 - off & 16777215;
            off += 2;
            if (off >= 26) {
              off -= 26;
              i--;
            }
            if (carry !== 0 || i !== this.length - 1) {
              out = zeros[6 - word.length] + word + out;
            } else {
              out = word + out;
            }
          }
          if (carry !== 0) {
            out = carry.toString(16) + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        if (base === (base | 0) && base >= 2 && base <= 36) {
          var groupSize = groupSizes[base];
          var groupBase = groupBases[base];
          out = "";
          var c = this.clone();
          c.negative = 0;
          while (!c.isZero()) {
            var r = c.modrn(groupBase).toString(base);
            c = c.idivn(groupBase);
            if (!c.isZero()) {
              out = zeros[groupSize - r.length] + r + out;
            } else {
              out = r + out;
            }
          }
          if (this.isZero()) {
            out = "0" + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        assert3(false, "Base should be between 2 and 36");
      };
      BN2.prototype.toNumber = function toNumber() {
        var ret = this.words[0];
        if (this.length === 2) {
          ret += this.words[1] * 67108864;
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864;
        } else if (this.length > 2) {
          assert3(false, "Number can only safely store up to 53 bits");
        }
        return this.negative !== 0 ? -ret : ret;
      };
      BN2.prototype.toJSON = function toJSON() {
        return this.toString(16, 2);
      };
      if (Buffer3) {
        BN2.prototype.toBuffer = function toBuffer3(endian, length) {
          return this.toArrayLike(Buffer3, endian, length);
        };
      }
      BN2.prototype.toArray = function toArray(endian, length) {
        return this.toArrayLike(Array, endian, length);
      };
      var allocate = function allocate2(ArrayType, size) {
        if (ArrayType.allocUnsafe) {
          return ArrayType.allocUnsafe(size);
        }
        return new ArrayType(size);
      };
      BN2.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
        this._strip();
        var byteLength = this.byteLength();
        var reqLength = length || Math.max(1, byteLength);
        assert3(byteLength <= reqLength, "byte array longer than desired length");
        assert3(reqLength > 0, "Requested array length <= 0");
        var res = allocate(ArrayType, reqLength);
        var postfix = endian === "le" ? "LE" : "BE";
        this["_toArrayLike" + postfix](res, byteLength);
        return res;
      };
      BN2.prototype._toArrayLikeLE = function _toArrayLikeLE(res, byteLength) {
        var position = 0;
        var carry = 0;
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = this.words[i] << shift | carry;
          res[position++] = word & 255;
          if (position < res.length) {
            res[position++] = word >> 8 & 255;
          }
          if (position < res.length) {
            res[position++] = word >> 16 & 255;
          }
          if (shift === 6) {
            if (position < res.length) {
              res[position++] = word >> 24 & 255;
            }
            carry = 0;
            shift = 0;
          } else {
            carry = word >>> 24;
            shift += 2;
          }
        }
        if (position < res.length) {
          res[position++] = carry;
          while (position < res.length) {
            res[position++] = 0;
          }
        }
      };
      BN2.prototype._toArrayLikeBE = function _toArrayLikeBE(res, byteLength) {
        var position = res.length - 1;
        var carry = 0;
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = this.words[i] << shift | carry;
          res[position--] = word & 255;
          if (position >= 0) {
            res[position--] = word >> 8 & 255;
          }
          if (position >= 0) {
            res[position--] = word >> 16 & 255;
          }
          if (shift === 6) {
            if (position >= 0) {
              res[position--] = word >> 24 & 255;
            }
            carry = 0;
            shift = 0;
          } else {
            carry = word >>> 24;
            shift += 2;
          }
        }
        if (position >= 0) {
          res[position--] = carry;
          while (position >= 0) {
            res[position--] = 0;
          }
        }
      };
      if (Math.clz32) {
        BN2.prototype._countBits = function _countBits(w) {
          return 32 - Math.clz32(w);
        };
      } else {
        BN2.prototype._countBits = function _countBits(w) {
          var t = w;
          var r = 0;
          if (t >= 4096) {
            r += 13;
            t >>>= 13;
          }
          if (t >= 64) {
            r += 7;
            t >>>= 7;
          }
          if (t >= 8) {
            r += 4;
            t >>>= 4;
          }
          if (t >= 2) {
            r += 2;
            t >>>= 2;
          }
          return r + t;
        };
      }
      BN2.prototype._zeroBits = function _zeroBits(w) {
        if (w === 0)
          return 26;
        var t = w;
        var r = 0;
        if ((t & 8191) === 0) {
          r += 13;
          t >>>= 13;
        }
        if ((t & 127) === 0) {
          r += 7;
          t >>>= 7;
        }
        if ((t & 15) === 0) {
          r += 4;
          t >>>= 4;
        }
        if ((t & 3) === 0) {
          r += 2;
          t >>>= 2;
        }
        if ((t & 1) === 0) {
          r++;
        }
        return r;
      };
      BN2.prototype.bitLength = function bitLength() {
        var w = this.words[this.length - 1];
        var hi = this._countBits(w);
        return (this.length - 1) * 26 + hi;
      };
      function toBitArray(num) {
        var w = new Array(num.bitLength());
        for (var bit = 0; bit < w.length; bit++) {
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          w[bit] = num.words[off] >>> wbit & 1;
        }
        return w;
      }
      BN2.prototype.zeroBits = function zeroBits() {
        if (this.isZero())
          return 0;
        var r = 0;
        for (var i = 0; i < this.length; i++) {
          var b = this._zeroBits(this.words[i]);
          r += b;
          if (b !== 26)
            break;
        }
        return r;
      };
      BN2.prototype.byteLength = function byteLength() {
        return Math.ceil(this.bitLength() / 8);
      };
      BN2.prototype.toTwos = function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1);
        }
        return this.clone();
      };
      BN2.prototype.fromTwos = function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg();
        }
        return this.clone();
      };
      BN2.prototype.isNeg = function isNeg() {
        return this.negative !== 0;
      };
      BN2.prototype.neg = function neg() {
        return this.clone().ineg();
      };
      BN2.prototype.ineg = function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1;
        }
        return this;
      };
      BN2.prototype.iuor = function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0;
        }
        for (var i = 0; i < num.length; i++) {
          this.words[i] = this.words[i] | num.words[i];
        }
        return this._strip();
      };
      BN2.prototype.ior = function ior(num) {
        assert3((this.negative | num.negative) === 0);
        return this.iuor(num);
      };
      BN2.prototype.or = function or(num) {
        if (this.length > num.length)
          return this.clone().ior(num);
        return num.clone().ior(this);
      };
      BN2.prototype.uor = function uor(num) {
        if (this.length > num.length)
          return this.clone().iuor(num);
        return num.clone().iuor(this);
      };
      BN2.prototype.iuand = function iuand(num) {
        var b;
        if (this.length > num.length) {
          b = num;
        } else {
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = this.words[i] & num.words[i];
        }
        this.length = b.length;
        return this._strip();
      };
      BN2.prototype.iand = function iand(num) {
        assert3((this.negative | num.negative) === 0);
        return this.iuand(num);
      };
      BN2.prototype.and = function and(num) {
        if (this.length > num.length)
          return this.clone().iand(num);
        return num.clone().iand(this);
      };
      BN2.prototype.uand = function uand(num) {
        if (this.length > num.length)
          return this.clone().iuand(num);
        return num.clone().iuand(this);
      };
      BN2.prototype.iuxor = function iuxor(num) {
        var a;
        var b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = a.words[i] ^ b.words[i];
        }
        if (this !== a) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = a.length;
        return this._strip();
      };
      BN2.prototype.ixor = function ixor(num) {
        assert3((this.negative | num.negative) === 0);
        return this.iuxor(num);
      };
      BN2.prototype.xor = function xor(num) {
        if (this.length > num.length)
          return this.clone().ixor(num);
        return num.clone().ixor(this);
      };
      BN2.prototype.uxor = function uxor(num) {
        if (this.length > num.length)
          return this.clone().iuxor(num);
        return num.clone().iuxor(this);
      };
      BN2.prototype.inotn = function inotn(width) {
        assert3(typeof width === "number" && width >= 0);
        var bytesNeeded = Math.ceil(width / 26) | 0;
        var bitsLeft = width % 26;
        this._expand(bytesNeeded);
        if (bitsLeft > 0) {
          bytesNeeded--;
        }
        for (var i = 0; i < bytesNeeded; i++) {
          this.words[i] = ~this.words[i] & 67108863;
        }
        if (bitsLeft > 0) {
          this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft;
        }
        return this._strip();
      };
      BN2.prototype.notn = function notn(width) {
        return this.clone().inotn(width);
      };
      BN2.prototype.setn = function setn(bit, val) {
        assert3(typeof bit === "number" && bit >= 0);
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        this._expand(off + 1);
        if (val) {
          this.words[off] = this.words[off] | 1 << wbit;
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit);
        }
        return this._strip();
      };
      BN2.prototype.iadd = function iadd(num) {
        var r;
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0;
          r = this.isub(num);
          this.negative ^= 1;
          return this._normSign();
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0;
          r = this.isub(num);
          num.negative = 1;
          return r._normSign();
        }
        var a, b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        this.length = a.length;
        if (carry !== 0) {
          this.words[this.length] = carry;
          this.length++;
        } else if (a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        return this;
      };
      BN2.prototype.add = function add2(num) {
        var res;
        if (num.negative !== 0 && this.negative === 0) {
          num.negative = 0;
          res = this.sub(num);
          num.negative ^= 1;
          return res;
        } else if (num.negative === 0 && this.negative !== 0) {
          this.negative = 0;
          res = num.sub(this);
          this.negative = 1;
          return res;
        }
        if (this.length > num.length)
          return this.clone().iadd(num);
        return num.clone().iadd(this);
      };
      BN2.prototype.isub = function isub(num) {
        if (num.negative !== 0) {
          num.negative = 0;
          var r = this.iadd(num);
          num.negative = 1;
          return r._normSign();
        } else if (this.negative !== 0) {
          this.negative = 0;
          this.iadd(num);
          this.negative = 1;
          return this._normSign();
        }
        var cmp = this.cmp(num);
        if (cmp === 0) {
          this.negative = 0;
          this.length = 1;
          this.words[0] = 0;
          return this;
        }
        var a, b;
        if (cmp > 0) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        if (carry === 0 && i < a.length && a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = Math.max(this.length, i);
        if (a !== this) {
          this.negative = 1;
        }
        return this._strip();
      };
      BN2.prototype.sub = function sub(num) {
        return this.clone().isub(num);
      };
      function smallMulTo(self, num, out) {
        out.negative = num.negative ^ self.negative;
        var len = self.length + num.length | 0;
        out.length = len;
        len = len - 1 | 0;
        var a = self.words[0] | 0;
        var b = num.words[0] | 0;
        var r = a * b;
        var lo = r & 67108863;
        var carry = r / 67108864 | 0;
        out.words[0] = lo;
        for (var k = 1; k < len; k++) {
          var ncarry = carry >>> 26;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
            var i = k - j | 0;
            a = self.words[i] | 0;
            b = num.words[j] | 0;
            r = a * b + rword;
            ncarry += r / 67108864 | 0;
            rword = r & 67108863;
          }
          out.words[k] = rword | 0;
          carry = ncarry | 0;
        }
        if (carry !== 0) {
          out.words[k] = carry | 0;
        } else {
          out.length--;
        }
        return out._strip();
      }
      var comb10MulTo = function comb10MulTo2(self, num, out) {
        var a = self.words;
        var b = num.words;
        var o = out.words;
        var c = 0;
        var lo;
        var mid;
        var hi;
        var a0 = a[0] | 0;
        var al0 = a0 & 8191;
        var ah0 = a0 >>> 13;
        var a1 = a[1] | 0;
        var al1 = a1 & 8191;
        var ah1 = a1 >>> 13;
        var a2 = a[2] | 0;
        var al2 = a2 & 8191;
        var ah2 = a2 >>> 13;
        var a3 = a[3] | 0;
        var al3 = a3 & 8191;
        var ah3 = a3 >>> 13;
        var a4 = a[4] | 0;
        var al4 = a4 & 8191;
        var ah4 = a4 >>> 13;
        var a5 = a[5] | 0;
        var al5 = a5 & 8191;
        var ah5 = a5 >>> 13;
        var a6 = a[6] | 0;
        var al6 = a6 & 8191;
        var ah6 = a6 >>> 13;
        var a7 = a[7] | 0;
        var al7 = a7 & 8191;
        var ah7 = a7 >>> 13;
        var a8 = a[8] | 0;
        var al8 = a8 & 8191;
        var ah8 = a8 >>> 13;
        var a9 = a[9] | 0;
        var al9 = a9 & 8191;
        var ah9 = a9 >>> 13;
        var b0 = b[0] | 0;
        var bl0 = b0 & 8191;
        var bh0 = b0 >>> 13;
        var b1 = b[1] | 0;
        var bl1 = b1 & 8191;
        var bh1 = b1 >>> 13;
        var b2 = b[2] | 0;
        var bl2 = b2 & 8191;
        var bh2 = b2 >>> 13;
        var b3 = b[3] | 0;
        var bl3 = b3 & 8191;
        var bh3 = b3 >>> 13;
        var b4 = b[4] | 0;
        var bl4 = b4 & 8191;
        var bh4 = b4 >>> 13;
        var b5 = b[5] | 0;
        var bl5 = b5 & 8191;
        var bh5 = b5 >>> 13;
        var b6 = b[6] | 0;
        var bl6 = b6 & 8191;
        var bh6 = b6 >>> 13;
        var b7 = b[7] | 0;
        var bl7 = b7 & 8191;
        var bh7 = b7 >>> 13;
        var b8 = b[8] | 0;
        var bl8 = b8 & 8191;
        var bh8 = b8 >>> 13;
        var b9 = b[9] | 0;
        var bl9 = b9 & 8191;
        var bh9 = b9 >>> 13;
        out.negative = self.negative ^ num.negative;
        out.length = 19;
        lo = Math.imul(al0, bl0);
        mid = Math.imul(al0, bh0);
        mid = mid + Math.imul(ah0, bl0) | 0;
        hi = Math.imul(ah0, bh0);
        var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
        w0 &= 67108863;
        lo = Math.imul(al1, bl0);
        mid = Math.imul(al1, bh0);
        mid = mid + Math.imul(ah1, bl0) | 0;
        hi = Math.imul(ah1, bh0);
        lo = lo + Math.imul(al0, bl1) | 0;
        mid = mid + Math.imul(al0, bh1) | 0;
        mid = mid + Math.imul(ah0, bl1) | 0;
        hi = hi + Math.imul(ah0, bh1) | 0;
        var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
        w1 &= 67108863;
        lo = Math.imul(al2, bl0);
        mid = Math.imul(al2, bh0);
        mid = mid + Math.imul(ah2, bl0) | 0;
        hi = Math.imul(ah2, bh0);
        lo = lo + Math.imul(al1, bl1) | 0;
        mid = mid + Math.imul(al1, bh1) | 0;
        mid = mid + Math.imul(ah1, bl1) | 0;
        hi = hi + Math.imul(ah1, bh1) | 0;
        lo = lo + Math.imul(al0, bl2) | 0;
        mid = mid + Math.imul(al0, bh2) | 0;
        mid = mid + Math.imul(ah0, bl2) | 0;
        hi = hi + Math.imul(ah0, bh2) | 0;
        var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
        w2 &= 67108863;
        lo = Math.imul(al3, bl0);
        mid = Math.imul(al3, bh0);
        mid = mid + Math.imul(ah3, bl0) | 0;
        hi = Math.imul(ah3, bh0);
        lo = lo + Math.imul(al2, bl1) | 0;
        mid = mid + Math.imul(al2, bh1) | 0;
        mid = mid + Math.imul(ah2, bl1) | 0;
        hi = hi + Math.imul(ah2, bh1) | 0;
        lo = lo + Math.imul(al1, bl2) | 0;
        mid = mid + Math.imul(al1, bh2) | 0;
        mid = mid + Math.imul(ah1, bl2) | 0;
        hi = hi + Math.imul(ah1, bh2) | 0;
        lo = lo + Math.imul(al0, bl3) | 0;
        mid = mid + Math.imul(al0, bh3) | 0;
        mid = mid + Math.imul(ah0, bl3) | 0;
        hi = hi + Math.imul(ah0, bh3) | 0;
        var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
        w3 &= 67108863;
        lo = Math.imul(al4, bl0);
        mid = Math.imul(al4, bh0);
        mid = mid + Math.imul(ah4, bl0) | 0;
        hi = Math.imul(ah4, bh0);
        lo = lo + Math.imul(al3, bl1) | 0;
        mid = mid + Math.imul(al3, bh1) | 0;
        mid = mid + Math.imul(ah3, bl1) | 0;
        hi = hi + Math.imul(ah3, bh1) | 0;
        lo = lo + Math.imul(al2, bl2) | 0;
        mid = mid + Math.imul(al2, bh2) | 0;
        mid = mid + Math.imul(ah2, bl2) | 0;
        hi = hi + Math.imul(ah2, bh2) | 0;
        lo = lo + Math.imul(al1, bl3) | 0;
        mid = mid + Math.imul(al1, bh3) | 0;
        mid = mid + Math.imul(ah1, bl3) | 0;
        hi = hi + Math.imul(ah1, bh3) | 0;
        lo = lo + Math.imul(al0, bl4) | 0;
        mid = mid + Math.imul(al0, bh4) | 0;
        mid = mid + Math.imul(ah0, bl4) | 0;
        hi = hi + Math.imul(ah0, bh4) | 0;
        var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
        w4 &= 67108863;
        lo = Math.imul(al5, bl0);
        mid = Math.imul(al5, bh0);
        mid = mid + Math.imul(ah5, bl0) | 0;
        hi = Math.imul(ah5, bh0);
        lo = lo + Math.imul(al4, bl1) | 0;
        mid = mid + Math.imul(al4, bh1) | 0;
        mid = mid + Math.imul(ah4, bl1) | 0;
        hi = hi + Math.imul(ah4, bh1) | 0;
        lo = lo + Math.imul(al3, bl2) | 0;
        mid = mid + Math.imul(al3, bh2) | 0;
        mid = mid + Math.imul(ah3, bl2) | 0;
        hi = hi + Math.imul(ah3, bh2) | 0;
        lo = lo + Math.imul(al2, bl3) | 0;
        mid = mid + Math.imul(al2, bh3) | 0;
        mid = mid + Math.imul(ah2, bl3) | 0;
        hi = hi + Math.imul(ah2, bh3) | 0;
        lo = lo + Math.imul(al1, bl4) | 0;
        mid = mid + Math.imul(al1, bh4) | 0;
        mid = mid + Math.imul(ah1, bl4) | 0;
        hi = hi + Math.imul(ah1, bh4) | 0;
        lo = lo + Math.imul(al0, bl5) | 0;
        mid = mid + Math.imul(al0, bh5) | 0;
        mid = mid + Math.imul(ah0, bl5) | 0;
        hi = hi + Math.imul(ah0, bh5) | 0;
        var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
        w5 &= 67108863;
        lo = Math.imul(al6, bl0);
        mid = Math.imul(al6, bh0);
        mid = mid + Math.imul(ah6, bl0) | 0;
        hi = Math.imul(ah6, bh0);
        lo = lo + Math.imul(al5, bl1) | 0;
        mid = mid + Math.imul(al5, bh1) | 0;
        mid = mid + Math.imul(ah5, bl1) | 0;
        hi = hi + Math.imul(ah5, bh1) | 0;
        lo = lo + Math.imul(al4, bl2) | 0;
        mid = mid + Math.imul(al4, bh2) | 0;
        mid = mid + Math.imul(ah4, bl2) | 0;
        hi = hi + Math.imul(ah4, bh2) | 0;
        lo = lo + Math.imul(al3, bl3) | 0;
        mid = mid + Math.imul(al3, bh3) | 0;
        mid = mid + Math.imul(ah3, bl3) | 0;
        hi = hi + Math.imul(ah3, bh3) | 0;
        lo = lo + Math.imul(al2, bl4) | 0;
        mid = mid + Math.imul(al2, bh4) | 0;
        mid = mid + Math.imul(ah2, bl4) | 0;
        hi = hi + Math.imul(ah2, bh4) | 0;
        lo = lo + Math.imul(al1, bl5) | 0;
        mid = mid + Math.imul(al1, bh5) | 0;
        mid = mid + Math.imul(ah1, bl5) | 0;
        hi = hi + Math.imul(ah1, bh5) | 0;
        lo = lo + Math.imul(al0, bl6) | 0;
        mid = mid + Math.imul(al0, bh6) | 0;
        mid = mid + Math.imul(ah0, bl6) | 0;
        hi = hi + Math.imul(ah0, bh6) | 0;
        var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
        w6 &= 67108863;
        lo = Math.imul(al7, bl0);
        mid = Math.imul(al7, bh0);
        mid = mid + Math.imul(ah7, bl0) | 0;
        hi = Math.imul(ah7, bh0);
        lo = lo + Math.imul(al6, bl1) | 0;
        mid = mid + Math.imul(al6, bh1) | 0;
        mid = mid + Math.imul(ah6, bl1) | 0;
        hi = hi + Math.imul(ah6, bh1) | 0;
        lo = lo + Math.imul(al5, bl2) | 0;
        mid = mid + Math.imul(al5, bh2) | 0;
        mid = mid + Math.imul(ah5, bl2) | 0;
        hi = hi + Math.imul(ah5, bh2) | 0;
        lo = lo + Math.imul(al4, bl3) | 0;
        mid = mid + Math.imul(al4, bh3) | 0;
        mid = mid + Math.imul(ah4, bl3) | 0;
        hi = hi + Math.imul(ah4, bh3) | 0;
        lo = lo + Math.imul(al3, bl4) | 0;
        mid = mid + Math.imul(al3, bh4) | 0;
        mid = mid + Math.imul(ah3, bl4) | 0;
        hi = hi + Math.imul(ah3, bh4) | 0;
        lo = lo + Math.imul(al2, bl5) | 0;
        mid = mid + Math.imul(al2, bh5) | 0;
        mid = mid + Math.imul(ah2, bl5) | 0;
        hi = hi + Math.imul(ah2, bh5) | 0;
        lo = lo + Math.imul(al1, bl6) | 0;
        mid = mid + Math.imul(al1, bh6) | 0;
        mid = mid + Math.imul(ah1, bl6) | 0;
        hi = hi + Math.imul(ah1, bh6) | 0;
        lo = lo + Math.imul(al0, bl7) | 0;
        mid = mid + Math.imul(al0, bh7) | 0;
        mid = mid + Math.imul(ah0, bl7) | 0;
        hi = hi + Math.imul(ah0, bh7) | 0;
        var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
        w7 &= 67108863;
        lo = Math.imul(al8, bl0);
        mid = Math.imul(al8, bh0);
        mid = mid + Math.imul(ah8, bl0) | 0;
        hi = Math.imul(ah8, bh0);
        lo = lo + Math.imul(al7, bl1) | 0;
        mid = mid + Math.imul(al7, bh1) | 0;
        mid = mid + Math.imul(ah7, bl1) | 0;
        hi = hi + Math.imul(ah7, bh1) | 0;
        lo = lo + Math.imul(al6, bl2) | 0;
        mid = mid + Math.imul(al6, bh2) | 0;
        mid = mid + Math.imul(ah6, bl2) | 0;
        hi = hi + Math.imul(ah6, bh2) | 0;
        lo = lo + Math.imul(al5, bl3) | 0;
        mid = mid + Math.imul(al5, bh3) | 0;
        mid = mid + Math.imul(ah5, bl3) | 0;
        hi = hi + Math.imul(ah5, bh3) | 0;
        lo = lo + Math.imul(al4, bl4) | 0;
        mid = mid + Math.imul(al4, bh4) | 0;
        mid = mid + Math.imul(ah4, bl4) | 0;
        hi = hi + Math.imul(ah4, bh4) | 0;
        lo = lo + Math.imul(al3, bl5) | 0;
        mid = mid + Math.imul(al3, bh5) | 0;
        mid = mid + Math.imul(ah3, bl5) | 0;
        hi = hi + Math.imul(ah3, bh5) | 0;
        lo = lo + Math.imul(al2, bl6) | 0;
        mid = mid + Math.imul(al2, bh6) | 0;
        mid = mid + Math.imul(ah2, bl6) | 0;
        hi = hi + Math.imul(ah2, bh6) | 0;
        lo = lo + Math.imul(al1, bl7) | 0;
        mid = mid + Math.imul(al1, bh7) | 0;
        mid = mid + Math.imul(ah1, bl7) | 0;
        hi = hi + Math.imul(ah1, bh7) | 0;
        lo = lo + Math.imul(al0, bl8) | 0;
        mid = mid + Math.imul(al0, bh8) | 0;
        mid = mid + Math.imul(ah0, bl8) | 0;
        hi = hi + Math.imul(ah0, bh8) | 0;
        var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
        w8 &= 67108863;
        lo = Math.imul(al9, bl0);
        mid = Math.imul(al9, bh0);
        mid = mid + Math.imul(ah9, bl0) | 0;
        hi = Math.imul(ah9, bh0);
        lo = lo + Math.imul(al8, bl1) | 0;
        mid = mid + Math.imul(al8, bh1) | 0;
        mid = mid + Math.imul(ah8, bl1) | 0;
        hi = hi + Math.imul(ah8, bh1) | 0;
        lo = lo + Math.imul(al7, bl2) | 0;
        mid = mid + Math.imul(al7, bh2) | 0;
        mid = mid + Math.imul(ah7, bl2) | 0;
        hi = hi + Math.imul(ah7, bh2) | 0;
        lo = lo + Math.imul(al6, bl3) | 0;
        mid = mid + Math.imul(al6, bh3) | 0;
        mid = mid + Math.imul(ah6, bl3) | 0;
        hi = hi + Math.imul(ah6, bh3) | 0;
        lo = lo + Math.imul(al5, bl4) | 0;
        mid = mid + Math.imul(al5, bh4) | 0;
        mid = mid + Math.imul(ah5, bl4) | 0;
        hi = hi + Math.imul(ah5, bh4) | 0;
        lo = lo + Math.imul(al4, bl5) | 0;
        mid = mid + Math.imul(al4, bh5) | 0;
        mid = mid + Math.imul(ah4, bl5) | 0;
        hi = hi + Math.imul(ah4, bh5) | 0;
        lo = lo + Math.imul(al3, bl6) | 0;
        mid = mid + Math.imul(al3, bh6) | 0;
        mid = mid + Math.imul(ah3, bl6) | 0;
        hi = hi + Math.imul(ah3, bh6) | 0;
        lo = lo + Math.imul(al2, bl7) | 0;
        mid = mid + Math.imul(al2, bh7) | 0;
        mid = mid + Math.imul(ah2, bl7) | 0;
        hi = hi + Math.imul(ah2, bh7) | 0;
        lo = lo + Math.imul(al1, bl8) | 0;
        mid = mid + Math.imul(al1, bh8) | 0;
        mid = mid + Math.imul(ah1, bl8) | 0;
        hi = hi + Math.imul(ah1, bh8) | 0;
        lo = lo + Math.imul(al0, bl9) | 0;
        mid = mid + Math.imul(al0, bh9) | 0;
        mid = mid + Math.imul(ah0, bl9) | 0;
        hi = hi + Math.imul(ah0, bh9) | 0;
        var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
        w9 &= 67108863;
        lo = Math.imul(al9, bl1);
        mid = Math.imul(al9, bh1);
        mid = mid + Math.imul(ah9, bl1) | 0;
        hi = Math.imul(ah9, bh1);
        lo = lo + Math.imul(al8, bl2) | 0;
        mid = mid + Math.imul(al8, bh2) | 0;
        mid = mid + Math.imul(ah8, bl2) | 0;
        hi = hi + Math.imul(ah8, bh2) | 0;
        lo = lo + Math.imul(al7, bl3) | 0;
        mid = mid + Math.imul(al7, bh3) | 0;
        mid = mid + Math.imul(ah7, bl3) | 0;
        hi = hi + Math.imul(ah7, bh3) | 0;
        lo = lo + Math.imul(al6, bl4) | 0;
        mid = mid + Math.imul(al6, bh4) | 0;
        mid = mid + Math.imul(ah6, bl4) | 0;
        hi = hi + Math.imul(ah6, bh4) | 0;
        lo = lo + Math.imul(al5, bl5) | 0;
        mid = mid + Math.imul(al5, bh5) | 0;
        mid = mid + Math.imul(ah5, bl5) | 0;
        hi = hi + Math.imul(ah5, bh5) | 0;
        lo = lo + Math.imul(al4, bl6) | 0;
        mid = mid + Math.imul(al4, bh6) | 0;
        mid = mid + Math.imul(ah4, bl6) | 0;
        hi = hi + Math.imul(ah4, bh6) | 0;
        lo = lo + Math.imul(al3, bl7) | 0;
        mid = mid + Math.imul(al3, bh7) | 0;
        mid = mid + Math.imul(ah3, bl7) | 0;
        hi = hi + Math.imul(ah3, bh7) | 0;
        lo = lo + Math.imul(al2, bl8) | 0;
        mid = mid + Math.imul(al2, bh8) | 0;
        mid = mid + Math.imul(ah2, bl8) | 0;
        hi = hi + Math.imul(ah2, bh8) | 0;
        lo = lo + Math.imul(al1, bl9) | 0;
        mid = mid + Math.imul(al1, bh9) | 0;
        mid = mid + Math.imul(ah1, bl9) | 0;
        hi = hi + Math.imul(ah1, bh9) | 0;
        var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
        w10 &= 67108863;
        lo = Math.imul(al9, bl2);
        mid = Math.imul(al9, bh2);
        mid = mid + Math.imul(ah9, bl2) | 0;
        hi = Math.imul(ah9, bh2);
        lo = lo + Math.imul(al8, bl3) | 0;
        mid = mid + Math.imul(al8, bh3) | 0;
        mid = mid + Math.imul(ah8, bl3) | 0;
        hi = hi + Math.imul(ah8, bh3) | 0;
        lo = lo + Math.imul(al7, bl4) | 0;
        mid = mid + Math.imul(al7, bh4) | 0;
        mid = mid + Math.imul(ah7, bl4) | 0;
        hi = hi + Math.imul(ah7, bh4) | 0;
        lo = lo + Math.imul(al6, bl5) | 0;
        mid = mid + Math.imul(al6, bh5) | 0;
        mid = mid + Math.imul(ah6, bl5) | 0;
        hi = hi + Math.imul(ah6, bh5) | 0;
        lo = lo + Math.imul(al5, bl6) | 0;
        mid = mid + Math.imul(al5, bh6) | 0;
        mid = mid + Math.imul(ah5, bl6) | 0;
        hi = hi + Math.imul(ah5, bh6) | 0;
        lo = lo + Math.imul(al4, bl7) | 0;
        mid = mid + Math.imul(al4, bh7) | 0;
        mid = mid + Math.imul(ah4, bl7) | 0;
        hi = hi + Math.imul(ah4, bh7) | 0;
        lo = lo + Math.imul(al3, bl8) | 0;
        mid = mid + Math.imul(al3, bh8) | 0;
        mid = mid + Math.imul(ah3, bl8) | 0;
        hi = hi + Math.imul(ah3, bh8) | 0;
        lo = lo + Math.imul(al2, bl9) | 0;
        mid = mid + Math.imul(al2, bh9) | 0;
        mid = mid + Math.imul(ah2, bl9) | 0;
        hi = hi + Math.imul(ah2, bh9) | 0;
        var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
        w11 &= 67108863;
        lo = Math.imul(al9, bl3);
        mid = Math.imul(al9, bh3);
        mid = mid + Math.imul(ah9, bl3) | 0;
        hi = Math.imul(ah9, bh3);
        lo = lo + Math.imul(al8, bl4) | 0;
        mid = mid + Math.imul(al8, bh4) | 0;
        mid = mid + Math.imul(ah8, bl4) | 0;
        hi = hi + Math.imul(ah8, bh4) | 0;
        lo = lo + Math.imul(al7, bl5) | 0;
        mid = mid + Math.imul(al7, bh5) | 0;
        mid = mid + Math.imul(ah7, bl5) | 0;
        hi = hi + Math.imul(ah7, bh5) | 0;
        lo = lo + Math.imul(al6, bl6) | 0;
        mid = mid + Math.imul(al6, bh6) | 0;
        mid = mid + Math.imul(ah6, bl6) | 0;
        hi = hi + Math.imul(ah6, bh6) | 0;
        lo = lo + Math.imul(al5, bl7) | 0;
        mid = mid + Math.imul(al5, bh7) | 0;
        mid = mid + Math.imul(ah5, bl7) | 0;
        hi = hi + Math.imul(ah5, bh7) | 0;
        lo = lo + Math.imul(al4, bl8) | 0;
        mid = mid + Math.imul(al4, bh8) | 0;
        mid = mid + Math.imul(ah4, bl8) | 0;
        hi = hi + Math.imul(ah4, bh8) | 0;
        lo = lo + Math.imul(al3, bl9) | 0;
        mid = mid + Math.imul(al3, bh9) | 0;
        mid = mid + Math.imul(ah3, bl9) | 0;
        hi = hi + Math.imul(ah3, bh9) | 0;
        var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
        w12 &= 67108863;
        lo = Math.imul(al9, bl4);
        mid = Math.imul(al9, bh4);
        mid = mid + Math.imul(ah9, bl4) | 0;
        hi = Math.imul(ah9, bh4);
        lo = lo + Math.imul(al8, bl5) | 0;
        mid = mid + Math.imul(al8, bh5) | 0;
        mid = mid + Math.imul(ah8, bl5) | 0;
        hi = hi + Math.imul(ah8, bh5) | 0;
        lo = lo + Math.imul(al7, bl6) | 0;
        mid = mid + Math.imul(al7, bh6) | 0;
        mid = mid + Math.imul(ah7, bl6) | 0;
        hi = hi + Math.imul(ah7, bh6) | 0;
        lo = lo + Math.imul(al6, bl7) | 0;
        mid = mid + Math.imul(al6, bh7) | 0;
        mid = mid + Math.imul(ah6, bl7) | 0;
        hi = hi + Math.imul(ah6, bh7) | 0;
        lo = lo + Math.imul(al5, bl8) | 0;
        mid = mid + Math.imul(al5, bh8) | 0;
        mid = mid + Math.imul(ah5, bl8) | 0;
        hi = hi + Math.imul(ah5, bh8) | 0;
        lo = lo + Math.imul(al4, bl9) | 0;
        mid = mid + Math.imul(al4, bh9) | 0;
        mid = mid + Math.imul(ah4, bl9) | 0;
        hi = hi + Math.imul(ah4, bh9) | 0;
        var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
        w13 &= 67108863;
        lo = Math.imul(al9, bl5);
        mid = Math.imul(al9, bh5);
        mid = mid + Math.imul(ah9, bl5) | 0;
        hi = Math.imul(ah9, bh5);
        lo = lo + Math.imul(al8, bl6) | 0;
        mid = mid + Math.imul(al8, bh6) | 0;
        mid = mid + Math.imul(ah8, bl6) | 0;
        hi = hi + Math.imul(ah8, bh6) | 0;
        lo = lo + Math.imul(al7, bl7) | 0;
        mid = mid + Math.imul(al7, bh7) | 0;
        mid = mid + Math.imul(ah7, bl7) | 0;
        hi = hi + Math.imul(ah7, bh7) | 0;
        lo = lo + Math.imul(al6, bl8) | 0;
        mid = mid + Math.imul(al6, bh8) | 0;
        mid = mid + Math.imul(ah6, bl8) | 0;
        hi = hi + Math.imul(ah6, bh8) | 0;
        lo = lo + Math.imul(al5, bl9) | 0;
        mid = mid + Math.imul(al5, bh9) | 0;
        mid = mid + Math.imul(ah5, bl9) | 0;
        hi = hi + Math.imul(ah5, bh9) | 0;
        var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
        w14 &= 67108863;
        lo = Math.imul(al9, bl6);
        mid = Math.imul(al9, bh6);
        mid = mid + Math.imul(ah9, bl6) | 0;
        hi = Math.imul(ah9, bh6);
        lo = lo + Math.imul(al8, bl7) | 0;
        mid = mid + Math.imul(al8, bh7) | 0;
        mid = mid + Math.imul(ah8, bl7) | 0;
        hi = hi + Math.imul(ah8, bh7) | 0;
        lo = lo + Math.imul(al7, bl8) | 0;
        mid = mid + Math.imul(al7, bh8) | 0;
        mid = mid + Math.imul(ah7, bl8) | 0;
        hi = hi + Math.imul(ah7, bh8) | 0;
        lo = lo + Math.imul(al6, bl9) | 0;
        mid = mid + Math.imul(al6, bh9) | 0;
        mid = mid + Math.imul(ah6, bl9) | 0;
        hi = hi + Math.imul(ah6, bh9) | 0;
        var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
        w15 &= 67108863;
        lo = Math.imul(al9, bl7);
        mid = Math.imul(al9, bh7);
        mid = mid + Math.imul(ah9, bl7) | 0;
        hi = Math.imul(ah9, bh7);
        lo = lo + Math.imul(al8, bl8) | 0;
        mid = mid + Math.imul(al8, bh8) | 0;
        mid = mid + Math.imul(ah8, bl8) | 0;
        hi = hi + Math.imul(ah8, bh8) | 0;
        lo = lo + Math.imul(al7, bl9) | 0;
        mid = mid + Math.imul(al7, bh9) | 0;
        mid = mid + Math.imul(ah7, bl9) | 0;
        hi = hi + Math.imul(ah7, bh9) | 0;
        var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
        w16 &= 67108863;
        lo = Math.imul(al9, bl8);
        mid = Math.imul(al9, bh8);
        mid = mid + Math.imul(ah9, bl8) | 0;
        hi = Math.imul(ah9, bh8);
        lo = lo + Math.imul(al8, bl9) | 0;
        mid = mid + Math.imul(al8, bh9) | 0;
        mid = mid + Math.imul(ah8, bl9) | 0;
        hi = hi + Math.imul(ah8, bh9) | 0;
        var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
        w17 &= 67108863;
        lo = Math.imul(al9, bl9);
        mid = Math.imul(al9, bh9);
        mid = mid + Math.imul(ah9, bl9) | 0;
        hi = Math.imul(ah9, bh9);
        var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
        w18 &= 67108863;
        o[0] = w0;
        o[1] = w1;
        o[2] = w2;
        o[3] = w3;
        o[4] = w4;
        o[5] = w5;
        o[6] = w6;
        o[7] = w7;
        o[8] = w8;
        o[9] = w9;
        o[10] = w10;
        o[11] = w11;
        o[12] = w12;
        o[13] = w13;
        o[14] = w14;
        o[15] = w15;
        o[16] = w16;
        o[17] = w17;
        o[18] = w18;
        if (c !== 0) {
          o[19] = c;
          out.length++;
        }
        return out;
      };
      if (!Math.imul) {
        comb10MulTo = smallMulTo;
      }
      function bigMulTo(self, num, out) {
        out.negative = num.negative ^ self.negative;
        out.length = self.length + num.length;
        var carry = 0;
        var hncarry = 0;
        for (var k = 0; k < out.length - 1; k++) {
          var ncarry = hncarry;
          hncarry = 0;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
            var i = k - j;
            var a = self.words[i] | 0;
            var b = num.words[j] | 0;
            var r = a * b;
            var lo = r & 67108863;
            ncarry = ncarry + (r / 67108864 | 0) | 0;
            lo = lo + rword | 0;
            rword = lo & 67108863;
            ncarry = ncarry + (lo >>> 26) | 0;
            hncarry += ncarry >>> 26;
            ncarry &= 67108863;
          }
          out.words[k] = rword;
          carry = ncarry;
          ncarry = hncarry;
        }
        if (carry !== 0) {
          out.words[k] = carry;
        } else {
          out.length--;
        }
        return out._strip();
      }
      function jumboMulTo(self, num, out) {
        return bigMulTo(self, num, out);
      }
      BN2.prototype.mulTo = function mulTo(num, out) {
        var res;
        var len = this.length + num.length;
        if (this.length === 10 && num.length === 10) {
          res = comb10MulTo(this, num, out);
        } else if (len < 63) {
          res = smallMulTo(this, num, out);
        } else if (len < 1024) {
          res = bigMulTo(this, num, out);
        } else {
          res = jumboMulTo(this, num, out);
        }
        return res;
      };
      function FFTM(x, y) {
        this.x = x;
        this.y = y;
      }
      FFTM.prototype.makeRBT = function makeRBT(N) {
        var t = new Array(N);
        var l = BN2.prototype._countBits(N) - 1;
        for (var i = 0; i < N; i++) {
          t[i] = this.revBin(i, l, N);
        }
        return t;
      };
      FFTM.prototype.revBin = function revBin(x, l, N) {
        if (x === 0 || x === N - 1)
          return x;
        var rb = 0;
        for (var i = 0; i < l; i++) {
          rb |= (x & 1) << l - i - 1;
          x >>= 1;
        }
        return rb;
      };
      FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
        for (var i = 0; i < N; i++) {
          rtws[i] = rws[rbt[i]];
          itws[i] = iws[rbt[i]];
        }
      };
      FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
        this.permute(rbt, rws, iws, rtws, itws, N);
        for (var s = 1; s < N; s <<= 1) {
          var l = s << 1;
          var rtwdf = Math.cos(2 * Math.PI / l);
          var itwdf = Math.sin(2 * Math.PI / l);
          for (var p = 0; p < N; p += l) {
            var rtwdf_ = rtwdf;
            var itwdf_ = itwdf;
            for (var j = 0; j < s; j++) {
              var re = rtws[p + j];
              var ie = itws[p + j];
              var ro = rtws[p + j + s];
              var io = itws[p + j + s];
              var rx = rtwdf_ * ro - itwdf_ * io;
              io = rtwdf_ * io + itwdf_ * ro;
              ro = rx;
              rtws[p + j] = re + ro;
              itws[p + j] = ie + io;
              rtws[p + j + s] = re - ro;
              itws[p + j + s] = ie - io;
              if (j !== l) {
                rx = rtwdf * rtwdf_ - itwdf * itwdf_;
                itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                rtwdf_ = rx;
              }
            }
          }
        }
      };
      FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
        var N = Math.max(m, n) | 1;
        var odd = N & 1;
        var i = 0;
        for (N = N / 2 | 0; N; N = N >>> 1) {
          i++;
        }
        return 1 << i + 1 + odd;
      };
      FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
        if (N <= 1)
          return;
        for (var i = 0; i < N / 2; i++) {
          var t = rws[i];
          rws[i] = rws[N - i - 1];
          rws[N - i - 1] = t;
          t = iws[i];
          iws[i] = -iws[N - i - 1];
          iws[N - i - 1] = -t;
        }
      };
      FFTM.prototype.normalize13b = function normalize13b(ws, N) {
        var carry = 0;
        for (var i = 0; i < N / 2; i++) {
          var w = Math.round(ws[2 * i + 1] / N) * 8192 + Math.round(ws[2 * i] / N) + carry;
          ws[i] = w & 67108863;
          if (w < 67108864) {
            carry = 0;
          } else {
            carry = w / 67108864 | 0;
          }
        }
        return ws;
      };
      FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
        var carry = 0;
        for (var i = 0; i < len; i++) {
          carry = carry + (ws[i] | 0);
          rws[2 * i] = carry & 8191;
          carry = carry >>> 13;
          rws[2 * i + 1] = carry & 8191;
          carry = carry >>> 13;
        }
        for (i = 2 * len; i < N; ++i) {
          rws[i] = 0;
        }
        assert3(carry === 0);
        assert3((carry & ~8191) === 0);
      };
      FFTM.prototype.stub = function stub(N) {
        var ph = new Array(N);
        for (var i = 0; i < N; i++) {
          ph[i] = 0;
        }
        return ph;
      };
      FFTM.prototype.mulp = function mulp(x, y, out) {
        var N = 2 * this.guessLen13b(x.length, y.length);
        var rbt = this.makeRBT(N);
        var _ = this.stub(N);
        var rws = new Array(N);
        var rwst = new Array(N);
        var iwst = new Array(N);
        var nrws = new Array(N);
        var nrwst = new Array(N);
        var niwst = new Array(N);
        var rmws = out.words;
        rmws.length = N;
        this.convert13b(x.words, x.length, rws, N);
        this.convert13b(y.words, y.length, nrws, N);
        this.transform(rws, _, rwst, iwst, N, rbt);
        this.transform(nrws, _, nrwst, niwst, N, rbt);
        for (var i = 0; i < N; i++) {
          var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
          iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
          rwst[i] = rx;
        }
        this.conjugate(rwst, iwst, N);
        this.transform(rwst, iwst, rmws, _, N, rbt);
        this.conjugate(rmws, _, N);
        this.normalize13b(rmws, N);
        out.negative = x.negative ^ y.negative;
        out.length = x.length + y.length;
        return out._strip();
      };
      BN2.prototype.mul = function mul(num) {
        var out = new BN2(null);
        out.words = new Array(this.length + num.length);
        return this.mulTo(num, out);
      };
      BN2.prototype.mulf = function mulf(num) {
        var out = new BN2(null);
        out.words = new Array(this.length + num.length);
        return jumboMulTo(this, num, out);
      };
      BN2.prototype.imul = function imul(num) {
        return this.clone().mulTo(num, this);
      };
      BN2.prototype.imuln = function imuln(num) {
        var isNegNum = num < 0;
        if (isNegNum)
          num = -num;
        assert3(typeof num === "number");
        assert3(num < 67108864);
        var carry = 0;
        for (var i = 0; i < this.length; i++) {
          var w = (this.words[i] | 0) * num;
          var lo = (w & 67108863) + (carry & 67108863);
          carry >>= 26;
          carry += w / 67108864 | 0;
          carry += lo >>> 26;
          this.words[i] = lo & 67108863;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return isNegNum ? this.ineg() : this;
      };
      BN2.prototype.muln = function muln(num) {
        return this.clone().imuln(num);
      };
      BN2.prototype.sqr = function sqr() {
        return this.mul(this);
      };
      BN2.prototype.isqr = function isqr() {
        return this.imul(this.clone());
      };
      BN2.prototype.pow = function pow3(num) {
        var w = toBitArray(num);
        if (w.length === 0)
          return new BN2(1);
        var res = this;
        for (var i = 0; i < w.length; i++, res = res.sqr()) {
          if (w[i] !== 0)
            break;
        }
        if (++i < w.length) {
          for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
            if (w[i] === 0)
              continue;
            res = res.mul(q);
          }
        }
        return res;
      };
      BN2.prototype.iushln = function iushln(bits) {
        assert3(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        var carryMask = 67108863 >>> 26 - r << 26 - r;
        var i;
        if (r !== 0) {
          var carry = 0;
          for (i = 0; i < this.length; i++) {
            var newCarry = this.words[i] & carryMask;
            var c = (this.words[i] | 0) - newCarry << r;
            this.words[i] = c | carry;
            carry = newCarry >>> 26 - r;
          }
          if (carry) {
            this.words[i] = carry;
            this.length++;
          }
        }
        if (s !== 0) {
          for (i = this.length - 1; i >= 0; i--) {
            this.words[i + s] = this.words[i];
          }
          for (i = 0; i < s; i++) {
            this.words[i] = 0;
          }
          this.length += s;
        }
        return this._strip();
      };
      BN2.prototype.ishln = function ishln(bits) {
        assert3(this.negative === 0);
        return this.iushln(bits);
      };
      BN2.prototype.iushrn = function iushrn(bits, hint, extended) {
        assert3(typeof bits === "number" && bits >= 0);
        var h;
        if (hint) {
          h = (hint - hint % 26) / 26;
        } else {
          h = 0;
        }
        var r = bits % 26;
        var s = Math.min((bits - r) / 26, this.length);
        var mask2 = 67108863 ^ 67108863 >>> r << r;
        var maskedWords = extended;
        h -= s;
        h = Math.max(0, h);
        if (maskedWords) {
          for (var i = 0; i < s; i++) {
            maskedWords.words[i] = this.words[i];
          }
          maskedWords.length = s;
        }
        if (s === 0) {
        } else if (this.length > s) {
          this.length -= s;
          for (i = 0; i < this.length; i++) {
            this.words[i] = this.words[i + s];
          }
        } else {
          this.words[0] = 0;
          this.length = 1;
        }
        var carry = 0;
        for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
          var word = this.words[i] | 0;
          this.words[i] = carry << 26 - r | word >>> r;
          carry = word & mask2;
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry;
        }
        if (this.length === 0) {
          this.words[0] = 0;
          this.length = 1;
        }
        return this._strip();
      };
      BN2.prototype.ishrn = function ishrn(bits, hint, extended) {
        assert3(this.negative === 0);
        return this.iushrn(bits, hint, extended);
      };
      BN2.prototype.shln = function shln(bits) {
        return this.clone().ishln(bits);
      };
      BN2.prototype.ushln = function ushln(bits) {
        return this.clone().iushln(bits);
      };
      BN2.prototype.shrn = function shrn(bits) {
        return this.clone().ishrn(bits);
      };
      BN2.prototype.ushrn = function ushrn(bits) {
        return this.clone().iushrn(bits);
      };
      BN2.prototype.testn = function testn(bit) {
        assert3(typeof bit === "number" && bit >= 0);
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s)
          return false;
        var w = this.words[s];
        return !!(w & q);
      };
      BN2.prototype.imaskn = function imaskn(bits) {
        assert3(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        assert3(this.negative === 0, "imaskn works only with positive numbers");
        if (this.length <= s) {
          return this;
        }
        if (r !== 0) {
          s++;
        }
        this.length = Math.min(s, this.length);
        if (r !== 0) {
          var mask2 = 67108863 ^ 67108863 >>> r << r;
          this.words[this.length - 1] &= mask2;
        }
        return this._strip();
      };
      BN2.prototype.maskn = function maskn(bits) {
        return this.clone().imaskn(bits);
      };
      BN2.prototype.iaddn = function iaddn(num) {
        assert3(typeof num === "number");
        assert3(num < 67108864);
        if (num < 0)
          return this.isubn(-num);
        if (this.negative !== 0) {
          if (this.length === 1 && (this.words[0] | 0) <= num) {
            this.words[0] = num - (this.words[0] | 0);
            this.negative = 0;
            return this;
          }
          this.negative = 0;
          this.isubn(num);
          this.negative = 1;
          return this;
        }
        return this._iaddn(num);
      };
      BN2.prototype._iaddn = function _iaddn(num) {
        this.words[0] += num;
        for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
          this.words[i] -= 67108864;
          if (i === this.length - 1) {
            this.words[i + 1] = 1;
          } else {
            this.words[i + 1]++;
          }
        }
        this.length = Math.max(this.length, i + 1);
        return this;
      };
      BN2.prototype.isubn = function isubn(num) {
        assert3(typeof num === "number");
        assert3(num < 67108864);
        if (num < 0)
          return this.iaddn(-num);
        if (this.negative !== 0) {
          this.negative = 0;
          this.iaddn(num);
          this.negative = 1;
          return this;
        }
        this.words[0] -= num;
        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0];
          this.negative = 1;
        } else {
          for (var i = 0; i < this.length && this.words[i] < 0; i++) {
            this.words[i] += 67108864;
            this.words[i + 1] -= 1;
          }
        }
        return this._strip();
      };
      BN2.prototype.addn = function addn(num) {
        return this.clone().iaddn(num);
      };
      BN2.prototype.subn = function subn(num) {
        return this.clone().isubn(num);
      };
      BN2.prototype.iabs = function iabs() {
        this.negative = 0;
        return this;
      };
      BN2.prototype.abs = function abs() {
        return this.clone().iabs();
      };
      BN2.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
        var len = num.length + shift;
        var i;
        this._expand(len);
        var w;
        var carry = 0;
        for (i = 0; i < num.length; i++) {
          w = (this.words[i + shift] | 0) + carry;
          var right = (num.words[i] | 0) * mul;
          w -= right & 67108863;
          carry = (w >> 26) - (right / 67108864 | 0);
          this.words[i + shift] = w & 67108863;
        }
        for (; i < this.length - shift; i++) {
          w = (this.words[i + shift] | 0) + carry;
          carry = w >> 26;
          this.words[i + shift] = w & 67108863;
        }
        if (carry === 0)
          return this._strip();
        assert3(carry === -1);
        carry = 0;
        for (i = 0; i < this.length; i++) {
          w = -(this.words[i] | 0) + carry;
          carry = w >> 26;
          this.words[i] = w & 67108863;
        }
        this.negative = 1;
        return this._strip();
      };
      BN2.prototype._wordDiv = function _wordDiv(num, mode) {
        var shift = this.length - num.length;
        var a = this.clone();
        var b = num;
        var bhi = b.words[b.length - 1] | 0;
        var bhiBits = this._countBits(bhi);
        shift = 26 - bhiBits;
        if (shift !== 0) {
          b = b.ushln(shift);
          a.iushln(shift);
          bhi = b.words[b.length - 1] | 0;
        }
        var m = a.length - b.length;
        var q;
        if (mode !== "mod") {
          q = new BN2(null);
          q.length = m + 1;
          q.words = new Array(q.length);
          for (var i = 0; i < q.length; i++) {
            q.words[i] = 0;
          }
        }
        var diff = a.clone()._ishlnsubmul(b, 1, m);
        if (diff.negative === 0) {
          a = diff;
          if (q) {
            q.words[m] = 1;
          }
        }
        for (var j = m - 1; j >= 0; j--) {
          var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0);
          qj = Math.min(qj / bhi | 0, 67108863);
          a._ishlnsubmul(b, qj, j);
          while (a.negative !== 0) {
            qj--;
            a.negative = 0;
            a._ishlnsubmul(b, 1, j);
            if (!a.isZero()) {
              a.negative ^= 1;
            }
          }
          if (q) {
            q.words[j] = qj;
          }
        }
        if (q) {
          q._strip();
        }
        a._strip();
        if (mode !== "div" && shift !== 0) {
          a.iushrn(shift);
        }
        return {
          div: q || null,
          mod: a
        };
      };
      BN2.prototype.divmod = function divmod(num, mode, positive) {
        assert3(!num.isZero());
        if (this.isZero()) {
          return {
            div: new BN2(0),
            mod: new BN2(0)
          };
        }
        var div, mod2, res;
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          if (mode !== "div") {
            mod2 = res.mod.neg();
            if (positive && mod2.negative !== 0) {
              mod2.iadd(num);
            }
          }
          return {
            div,
            mod: mod2
          };
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          return {
            div,
            mod: res.mod
          };
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode);
          if (mode !== "div") {
            mod2 = res.mod.neg();
            if (positive && mod2.negative !== 0) {
              mod2.isub(num);
            }
          }
          return {
            div: res.div,
            mod: mod2
          };
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return {
            div: new BN2(0),
            mod: this
          };
        }
        if (num.length === 1) {
          if (mode === "div") {
            return {
              div: this.divn(num.words[0]),
              mod: null
            };
          }
          if (mode === "mod") {
            return {
              div: null,
              mod: new BN2(this.modrn(num.words[0]))
            };
          }
          return {
            div: this.divn(num.words[0]),
            mod: new BN2(this.modrn(num.words[0]))
          };
        }
        return this._wordDiv(num, mode);
      };
      BN2.prototype.div = function div(num) {
        return this.divmod(num, "div", false).div;
      };
      BN2.prototype.mod = function mod2(num) {
        return this.divmod(num, "mod", false).mod;
      };
      BN2.prototype.umod = function umod(num) {
        return this.divmod(num, "mod", true).mod;
      };
      BN2.prototype.divRound = function divRound(num) {
        var dm = this.divmod(num);
        if (dm.mod.isZero())
          return dm.div;
        var mod2 = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
        var half = num.ushrn(1);
        var r2 = num.andln(1);
        var cmp = mod2.cmp(half);
        if (cmp < 0 || r2 === 1 && cmp === 0)
          return dm.div;
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
      };
      BN2.prototype.modrn = function modrn(num) {
        var isNegNum = num < 0;
        if (isNegNum)
          num = -num;
        assert3(num <= 67108863);
        var p = (1 << 26) % num;
        var acc = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          acc = (p * acc + (this.words[i] | 0)) % num;
        }
        return isNegNum ? -acc : acc;
      };
      BN2.prototype.modn = function modn(num) {
        return this.modrn(num);
      };
      BN2.prototype.idivn = function idivn(num) {
        var isNegNum = num < 0;
        if (isNegNum)
          num = -num;
        assert3(num <= 67108863);
        var carry = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var w = (this.words[i] | 0) + carry * 67108864;
          this.words[i] = w / num | 0;
          carry = w % num;
        }
        this._strip();
        return isNegNum ? this.ineg() : this;
      };
      BN2.prototype.divn = function divn(num) {
        return this.clone().idivn(num);
      };
      BN2.prototype.egcd = function egcd(p) {
        assert3(p.negative === 0);
        assert3(!p.isZero());
        var x = this;
        var y = p.clone();
        if (x.negative !== 0) {
          x = x.umod(p);
        } else {
          x = x.clone();
        }
        var A = new BN2(1);
        var B = new BN2(0);
        var C = new BN2(0);
        var D = new BN2(1);
        var g = 0;
        while (x.isEven() && y.isEven()) {
          x.iushrn(1);
          y.iushrn(1);
          ++g;
        }
        var yp = y.clone();
        var xp = x.clone();
        while (!x.isZero()) {
          for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1)
            ;
          if (i > 0) {
            x.iushrn(i);
            while (i-- > 0) {
              if (A.isOdd() || B.isOdd()) {
                A.iadd(yp);
                B.isub(xp);
              }
              A.iushrn(1);
              B.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1)
            ;
          if (j > 0) {
            y.iushrn(j);
            while (j-- > 0) {
              if (C.isOdd() || D.isOdd()) {
                C.iadd(yp);
                D.isub(xp);
              }
              C.iushrn(1);
              D.iushrn(1);
            }
          }
          if (x.cmp(y) >= 0) {
            x.isub(y);
            A.isub(C);
            B.isub(D);
          } else {
            y.isub(x);
            C.isub(A);
            D.isub(B);
          }
        }
        return {
          a: C,
          b: D,
          gcd: y.iushln(g)
        };
      };
      BN2.prototype._invmp = function _invmp(p) {
        assert3(p.negative === 0);
        assert3(!p.isZero());
        var a = this;
        var b = p.clone();
        if (a.negative !== 0) {
          a = a.umod(p);
        } else {
          a = a.clone();
        }
        var x1 = new BN2(1);
        var x2 = new BN2(0);
        var delta = b.clone();
        while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
          for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1)
            ;
          if (i > 0) {
            a.iushrn(i);
            while (i-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta);
              }
              x1.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1)
            ;
          if (j > 0) {
            b.iushrn(j);
            while (j-- > 0) {
              if (x2.isOdd()) {
                x2.iadd(delta);
              }
              x2.iushrn(1);
            }
          }
          if (a.cmp(b) >= 0) {
            a.isub(b);
            x1.isub(x2);
          } else {
            b.isub(a);
            x2.isub(x1);
          }
        }
        var res;
        if (a.cmpn(1) === 0) {
          res = x1;
        } else {
          res = x2;
        }
        if (res.cmpn(0) < 0) {
          res.iadd(p);
        }
        return res;
      };
      BN2.prototype.gcd = function gcd(num) {
        if (this.isZero())
          return num.abs();
        if (num.isZero())
          return this.abs();
        var a = this.clone();
        var b = num.clone();
        a.negative = 0;
        b.negative = 0;
        for (var shift = 0; a.isEven() && b.isEven(); shift++) {
          a.iushrn(1);
          b.iushrn(1);
        }
        do {
          while (a.isEven()) {
            a.iushrn(1);
          }
          while (b.isEven()) {
            b.iushrn(1);
          }
          var r = a.cmp(b);
          if (r < 0) {
            var t = a;
            a = b;
            b = t;
          } else if (r === 0 || b.cmpn(1) === 0) {
            break;
          }
          a.isub(b);
        } while (true);
        return b.iushln(shift);
      };
      BN2.prototype.invm = function invm(num) {
        return this.egcd(num).a.umod(num);
      };
      BN2.prototype.isEven = function isEven() {
        return (this.words[0] & 1) === 0;
      };
      BN2.prototype.isOdd = function isOdd() {
        return (this.words[0] & 1) === 1;
      };
      BN2.prototype.andln = function andln(num) {
        return this.words[0] & num;
      };
      BN2.prototype.bincn = function bincn(bit) {
        assert3(typeof bit === "number");
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) {
          this._expand(s + 1);
          this.words[s] |= q;
          return this;
        }
        var carry = q;
        for (var i = s; carry !== 0 && i < this.length; i++) {
          var w = this.words[i] | 0;
          w += carry;
          carry = w >>> 26;
          w &= 67108863;
          this.words[i] = w;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return this;
      };
      BN2.prototype.isZero = function isZero() {
        return this.length === 1 && this.words[0] === 0;
      };
      BN2.prototype.cmpn = function cmpn(num) {
        var negative = num < 0;
        if (this.negative !== 0 && !negative)
          return -1;
        if (this.negative === 0 && negative)
          return 1;
        this._strip();
        var res;
        if (this.length > 1) {
          res = 1;
        } else {
          if (negative) {
            num = -num;
          }
          assert3(num <= 67108863, "Number is too big");
          var w = this.words[0] | 0;
          res = w === num ? 0 : w < num ? -1 : 1;
        }
        if (this.negative !== 0)
          return -res | 0;
        return res;
      };
      BN2.prototype.cmp = function cmp(num) {
        if (this.negative !== 0 && num.negative === 0)
          return -1;
        if (this.negative === 0 && num.negative !== 0)
          return 1;
        var res = this.ucmp(num);
        if (this.negative !== 0)
          return -res | 0;
        return res;
      };
      BN2.prototype.ucmp = function ucmp(num) {
        if (this.length > num.length)
          return 1;
        if (this.length < num.length)
          return -1;
        var res = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var a = this.words[i] | 0;
          var b = num.words[i] | 0;
          if (a === b)
            continue;
          if (a < b) {
            res = -1;
          } else if (a > b) {
            res = 1;
          }
          break;
        }
        return res;
      };
      BN2.prototype.gtn = function gtn(num) {
        return this.cmpn(num) === 1;
      };
      BN2.prototype.gt = function gt(num) {
        return this.cmp(num) === 1;
      };
      BN2.prototype.gten = function gten(num) {
        return this.cmpn(num) >= 0;
      };
      BN2.prototype.gte = function gte(num) {
        return this.cmp(num) >= 0;
      };
      BN2.prototype.ltn = function ltn(num) {
        return this.cmpn(num) === -1;
      };
      BN2.prototype.lt = function lt(num) {
        return this.cmp(num) === -1;
      };
      BN2.prototype.lten = function lten(num) {
        return this.cmpn(num) <= 0;
      };
      BN2.prototype.lte = function lte(num) {
        return this.cmp(num) <= 0;
      };
      BN2.prototype.eqn = function eqn(num) {
        return this.cmpn(num) === 0;
      };
      BN2.prototype.eq = function eq(num) {
        return this.cmp(num) === 0;
      };
      BN2.red = function red(num) {
        return new Red(num);
      };
      BN2.prototype.toRed = function toRed(ctx) {
        assert3(!this.red, "Already a number in reduction context");
        assert3(this.negative === 0, "red works only with positives");
        return ctx.convertTo(this)._forceRed(ctx);
      };
      BN2.prototype.fromRed = function fromRed() {
        assert3(this.red, "fromRed works only with numbers in reduction context");
        return this.red.convertFrom(this);
      };
      BN2.prototype._forceRed = function _forceRed(ctx) {
        this.red = ctx;
        return this;
      };
      BN2.prototype.forceRed = function forceRed(ctx) {
        assert3(!this.red, "Already a number in reduction context");
        return this._forceRed(ctx);
      };
      BN2.prototype.redAdd = function redAdd(num) {
        assert3(this.red, "redAdd works only with red numbers");
        return this.red.add(this, num);
      };
      BN2.prototype.redIAdd = function redIAdd(num) {
        assert3(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, num);
      };
      BN2.prototype.redSub = function redSub(num) {
        assert3(this.red, "redSub works only with red numbers");
        return this.red.sub(this, num);
      };
      BN2.prototype.redISub = function redISub(num) {
        assert3(this.red, "redISub works only with red numbers");
        return this.red.isub(this, num);
      };
      BN2.prototype.redShl = function redShl(num) {
        assert3(this.red, "redShl works only with red numbers");
        return this.red.shl(this, num);
      };
      BN2.prototype.redMul = function redMul(num) {
        assert3(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.mul(this, num);
      };
      BN2.prototype.redIMul = function redIMul(num) {
        assert3(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.imul(this, num);
      };
      BN2.prototype.redSqr = function redSqr() {
        assert3(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      };
      BN2.prototype.redISqr = function redISqr() {
        assert3(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      };
      BN2.prototype.redSqrt = function redSqrt() {
        assert3(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      };
      BN2.prototype.redInvm = function redInvm() {
        assert3(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      };
      BN2.prototype.redNeg = function redNeg() {
        assert3(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      };
      BN2.prototype.redPow = function redPow(num) {
        assert3(this.red && !num.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, num);
      };
      var primes = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function MPrime(name, p) {
        this.name = name;
        this.p = new BN2(p, 16);
        this.n = this.p.bitLength();
        this.k = new BN2(1).iushln(this.n).isub(this.p);
        this.tmp = this._tmp();
      }
      MPrime.prototype._tmp = function _tmp() {
        var tmp = new BN2(null);
        tmp.words = new Array(Math.ceil(this.n / 13));
        return tmp;
      };
      MPrime.prototype.ireduce = function ireduce(num) {
        var r = num;
        var rlen;
        do {
          this.split(r, this.tmp);
          r = this.imulK(r);
          r = r.iadd(this.tmp);
          rlen = r.bitLength();
        } while (rlen > this.n);
        var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
        if (cmp === 0) {
          r.words[0] = 0;
          r.length = 1;
        } else if (cmp > 0) {
          r.isub(this.p);
        } else {
          if (r.strip !== void 0) {
            r.strip();
          } else {
            r._strip();
          }
        }
        return r;
      };
      MPrime.prototype.split = function split2(input, out) {
        input.iushrn(this.n, 0, out);
      };
      MPrime.prototype.imulK = function imulK(num) {
        return num.imul(this.k);
      };
      function K256() {
        MPrime.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      inherits(K256, MPrime);
      K256.prototype.split = function split2(input, output2) {
        var mask2 = 4194303;
        var outLen = Math.min(input.length, 9);
        for (var i = 0; i < outLen; i++) {
          output2.words[i] = input.words[i];
        }
        output2.length = outLen;
        if (input.length <= 9) {
          input.words[0] = 0;
          input.length = 1;
          return;
        }
        var prev = input.words[9];
        output2.words[output2.length++] = prev & mask2;
        for (i = 10; i < input.length; i++) {
          var next = input.words[i] | 0;
          input.words[i - 10] = (next & mask2) << 4 | prev >>> 22;
          prev = next;
        }
        prev >>>= 22;
        input.words[i - 10] = prev;
        if (prev === 0 && input.length > 10) {
          input.length -= 10;
        } else {
          input.length -= 9;
        }
      };
      K256.prototype.imulK = function imulK(num) {
        num.words[num.length] = 0;
        num.words[num.length + 1] = 0;
        num.length += 2;
        var lo = 0;
        for (var i = 0; i < num.length; i++) {
          var w = num.words[i] | 0;
          lo += w * 977;
          num.words[i] = lo & 67108863;
          lo = w * 64 + (lo / 67108864 | 0);
        }
        if (num.words[num.length - 1] === 0) {
          num.length--;
          if (num.words[num.length - 1] === 0) {
            num.length--;
          }
        }
        return num;
      };
      function P224() {
        MPrime.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      inherits(P224, MPrime);
      function P192() {
        MPrime.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      inherits(P192, MPrime);
      function P25519() {
        MPrime.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      inherits(P25519, MPrime);
      P25519.prototype.imulK = function imulK(num) {
        var carry = 0;
        for (var i = 0; i < num.length; i++) {
          var hi = (num.words[i] | 0) * 19 + carry;
          var lo = hi & 67108863;
          hi >>>= 26;
          num.words[i] = lo;
          carry = hi;
        }
        if (carry !== 0) {
          num.words[num.length++] = carry;
        }
        return num;
      };
      BN2._prime = function prime(name) {
        if (primes[name])
          return primes[name];
        var prime2;
        if (name === "k256") {
          prime2 = new K256();
        } else if (name === "p224") {
          prime2 = new P224();
        } else if (name === "p192") {
          prime2 = new P192();
        } else if (name === "p25519") {
          prime2 = new P25519();
        } else {
          throw new Error("Unknown prime " + name);
        }
        primes[name] = prime2;
        return prime2;
      };
      function Red(m) {
        if (typeof m === "string") {
          var prime = BN2._prime(m);
          this.m = prime.p;
          this.prime = prime;
        } else {
          assert3(m.gtn(1), "modulus must be greater than 1");
          this.m = m;
          this.prime = null;
        }
      }
      Red.prototype._verify1 = function _verify1(a) {
        assert3(a.negative === 0, "red works only with positives");
        assert3(a.red, "red works only with red numbers");
      };
      Red.prototype._verify2 = function _verify2(a, b) {
        assert3((a.negative | b.negative) === 0, "red works only with positives");
        assert3(
          a.red && a.red === b.red,
          "red works only with red numbers"
        );
      };
      Red.prototype.imod = function imod(a) {
        if (this.prime)
          return this.prime.ireduce(a)._forceRed(this);
        move(a, a.umod(this.m)._forceRed(this));
        return a;
      };
      Red.prototype.neg = function neg(a) {
        if (a.isZero()) {
          return a.clone();
        }
        return this.m.sub(a)._forceRed(this);
      };
      Red.prototype.add = function add2(a, b) {
        this._verify2(a, b);
        var res = a.add(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.iadd = function iadd(a, b) {
        this._verify2(a, b);
        var res = a.iadd(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res;
      };
      Red.prototype.sub = function sub(a, b) {
        this._verify2(a, b);
        var res = a.sub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.isub = function isub(a, b) {
        this._verify2(a, b);
        var res = a.isub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res;
      };
      Red.prototype.shl = function shl(a, num) {
        this._verify1(a);
        return this.imod(a.ushln(num));
      };
      Red.prototype.imul = function imul(a, b) {
        this._verify2(a, b);
        return this.imod(a.imul(b));
      };
      Red.prototype.mul = function mul(a, b) {
        this._verify2(a, b);
        return this.imod(a.mul(b));
      };
      Red.prototype.isqr = function isqr(a) {
        return this.imul(a, a.clone());
      };
      Red.prototype.sqr = function sqr(a) {
        return this.mul(a, a);
      };
      Red.prototype.sqrt = function sqrt(a) {
        if (a.isZero())
          return a.clone();
        var mod3 = this.m.andln(3);
        assert3(mod3 % 2 === 1);
        if (mod3 === 3) {
          var pow3 = this.m.add(new BN2(1)).iushrn(2);
          return this.pow(a, pow3);
        }
        var q = this.m.subn(1);
        var s = 0;
        while (!q.isZero() && q.andln(1) === 0) {
          s++;
          q.iushrn(1);
        }
        assert3(!q.isZero());
        var one = new BN2(1).toRed(this);
        var nOne = one.redNeg();
        var lpow = this.m.subn(1).iushrn(1);
        var z = this.m.bitLength();
        z = new BN2(2 * z * z).toRed(this);
        while (this.pow(z, lpow).cmp(nOne) !== 0) {
          z.redIAdd(nOne);
        }
        var c = this.pow(z, q);
        var r = this.pow(a, q.addn(1).iushrn(1));
        var t = this.pow(a, q);
        var m = s;
        while (t.cmp(one) !== 0) {
          var tmp = t;
          for (var i = 0; tmp.cmp(one) !== 0; i++) {
            tmp = tmp.redSqr();
          }
          assert3(i < m);
          var b = this.pow(c, new BN2(1).iushln(m - i - 1));
          r = r.redMul(b);
          c = b.redSqr();
          t = t.redMul(c);
          m = i;
        }
        return r;
      };
      Red.prototype.invm = function invm(a) {
        var inv = a._invmp(this.m);
        if (inv.negative !== 0) {
          inv.negative = 0;
          return this.imod(inv).redNeg();
        } else {
          return this.imod(inv);
        }
      };
      Red.prototype.pow = function pow3(a, num) {
        if (num.isZero())
          return new BN2(1).toRed(this);
        if (num.cmpn(1) === 0)
          return a.clone();
        var windowSize = 4;
        var wnd = new Array(1 << windowSize);
        wnd[0] = new BN2(1).toRed(this);
        wnd[1] = a;
        for (var i = 2; i < wnd.length; i++) {
          wnd[i] = this.mul(wnd[i - 1], a);
        }
        var res = wnd[0];
        var current = 0;
        var currentLen = 0;
        var start = num.bitLength() % 26;
        if (start === 0) {
          start = 26;
        }
        for (i = num.length - 1; i >= 0; i--) {
          var word = num.words[i];
          for (var j = start - 1; j >= 0; j--) {
            var bit = word >> j & 1;
            if (res !== wnd[0]) {
              res = this.sqr(res);
            }
            if (bit === 0 && current === 0) {
              currentLen = 0;
              continue;
            }
            current <<= 1;
            current |= bit;
            currentLen++;
            if (currentLen !== windowSize && (i !== 0 || j !== 0))
              continue;
            res = this.mul(res, wnd[current]);
            currentLen = 0;
            current = 0;
          }
          start = 26;
        }
        return res;
      };
      Red.prototype.convertTo = function convertTo(num) {
        var r = num.umod(this.m);
        return r === num ? r.clone() : r;
      };
      Red.prototype.convertFrom = function convertFrom(num) {
        var res = num.clone();
        res.red = null;
        return res;
      };
      BN2.mont = function mont(num) {
        return new Mont(num);
      };
      function Mont(m) {
        Red.call(this, m);
        this.shift = this.m.bitLength();
        if (this.shift % 26 !== 0) {
          this.shift += 26 - this.shift % 26;
        }
        this.r = new BN2(1).iushln(this.shift);
        this.r2 = this.imod(this.r.sqr());
        this.rinv = this.r._invmp(this.m);
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
        this.minv = this.minv.umod(this.r);
        this.minv = this.r.sub(this.minv);
      }
      inherits(Mont, Red);
      Mont.prototype.convertTo = function convertTo(num) {
        return this.imod(num.ushln(this.shift));
      };
      Mont.prototype.convertFrom = function convertFrom(num) {
        var r = this.imod(num.mul(this.rinv));
        r.red = null;
        return r;
      };
      Mont.prototype.imul = function imul(a, b) {
        if (a.isZero() || b.isZero()) {
          a.words[0] = 0;
          a.length = 1;
          return a;
        }
        var t = a.imul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.mul = function mul(a, b) {
        if (a.isZero() || b.isZero())
          return new BN2(0)._forceRed(this);
        var t = a.mul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.invm = function invm(a) {
        var res = this.imod(a._invmp(this.m).mul(this.r2));
        return res._forceRed(this);
      };
    })(typeof module === "undefined" || module, exports);
  }
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports, module) {
    var buffer = require_buffer();
    var Buffer3 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer3.from && Buffer3.alloc && Buffer3.allocUnsafe && Buffer3.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer3(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer3.prototype);
    copyProps(Buffer3, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer3(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer3(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer3(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/@solana/web3.js/node_modules/base-x/src/index.js
var require_src = __commonJS({
  "node_modules/@solana/web3.js/node_modules/base-x/src/index.js"(exports, module) {
    "use strict";
    var _Buffer = require_safe_buffer().Buffer;
    function base(ALPHABET) {
      if (ALPHABET.length >= 255) {
        throw new TypeError("Alphabet too long");
      }
      var BASE_MAP = new Uint8Array(256);
      for (var j = 0; j < BASE_MAP.length; j++) {
        BASE_MAP[j] = 255;
      }
      for (var i = 0; i < ALPHABET.length; i++) {
        var x = ALPHABET.charAt(i);
        var xc = x.charCodeAt(0);
        if (BASE_MAP[xc] !== 255) {
          throw new TypeError(x + " is ambiguous");
        }
        BASE_MAP[xc] = i;
      }
      var BASE = ALPHABET.length;
      var LEADER = ALPHABET.charAt(0);
      var FACTOR = Math.log(BASE) / Math.log(256);
      var iFACTOR = Math.log(256) / Math.log(BASE);
      function encode(source) {
        if (Array.isArray(source) || source instanceof Uint8Array) {
          source = _Buffer.from(source);
        }
        if (!_Buffer.isBuffer(source)) {
          throw new TypeError("Expected Buffer");
        }
        if (source.length === 0) {
          return "";
        }
        var zeroes = 0;
        var length = 0;
        var pbegin = 0;
        var pend = source.length;
        while (pbegin !== pend && source[pbegin] === 0) {
          pbegin++;
          zeroes++;
        }
        var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
        var b58 = new Uint8Array(size);
        while (pbegin !== pend) {
          var carry = source[pbegin];
          var i2 = 0;
          for (var it1 = size - 1; (carry !== 0 || i2 < length) && it1 !== -1; it1--, i2++) {
            carry += 256 * b58[it1] >>> 0;
            b58[it1] = carry % BASE >>> 0;
            carry = carry / BASE >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length = i2;
          pbegin++;
        }
        var it2 = size - length;
        while (it2 !== size && b58[it2] === 0) {
          it2++;
        }
        var str = LEADER.repeat(zeroes);
        for (; it2 < size; ++it2) {
          str += ALPHABET.charAt(b58[it2]);
        }
        return str;
      }
      function decodeUnsafe(source) {
        if (typeof source !== "string") {
          throw new TypeError("Expected String");
        }
        if (source.length === 0) {
          return _Buffer.alloc(0);
        }
        var psz = 0;
        var zeroes = 0;
        var length = 0;
        while (source[psz] === LEADER) {
          zeroes++;
          psz++;
        }
        var size = (source.length - psz) * FACTOR + 1 >>> 0;
        var b256 = new Uint8Array(size);
        while (source[psz]) {
          var carry = BASE_MAP[source.charCodeAt(psz)];
          if (carry === 255) {
            return;
          }
          var i2 = 0;
          for (var it3 = size - 1; (carry !== 0 || i2 < length) && it3 !== -1; it3--, i2++) {
            carry += BASE * b256[it3] >>> 0;
            b256[it3] = carry % 256 >>> 0;
            carry = carry / 256 >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length = i2;
          psz++;
        }
        var it4 = size - length;
        while (it4 !== size && b256[it4] === 0) {
          it4++;
        }
        var vch = _Buffer.allocUnsafe(zeroes + (size - it4));
        vch.fill(0, 0, zeroes);
        var j2 = zeroes;
        while (it4 !== size) {
          vch[j2++] = b256[it4++];
        }
        return vch;
      }
      function decode(string2) {
        var buffer = decodeUnsafe(string2);
        if (buffer) {
          return buffer;
        }
        throw new Error("Non-base" + BASE + " character");
      }
      return {
        encode,
        decodeUnsafe,
        decode
      };
    }
    module.exports = base;
  }
});

// node_modules/@solana/web3.js/node_modules/bs58/index.js
var require_bs58 = __commonJS({
  "node_modules/@solana/web3.js/node_modules/bs58/index.js"(exports, module) {
    var basex = require_src();
    var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    module.exports = basex(ALPHABET);
  }
});

// node_modules/borsh/node_modules/base-x/src/index.js
var require_src2 = __commonJS({
  "node_modules/borsh/node_modules/base-x/src/index.js"(exports, module) {
    "use strict";
    var _Buffer = require_safe_buffer().Buffer;
    function base(ALPHABET) {
      if (ALPHABET.length >= 255) {
        throw new TypeError("Alphabet too long");
      }
      var BASE_MAP = new Uint8Array(256);
      for (var j = 0; j < BASE_MAP.length; j++) {
        BASE_MAP[j] = 255;
      }
      for (var i = 0; i < ALPHABET.length; i++) {
        var x = ALPHABET.charAt(i);
        var xc = x.charCodeAt(0);
        if (BASE_MAP[xc] !== 255) {
          throw new TypeError(x + " is ambiguous");
        }
        BASE_MAP[xc] = i;
      }
      var BASE = ALPHABET.length;
      var LEADER = ALPHABET.charAt(0);
      var FACTOR = Math.log(BASE) / Math.log(256);
      var iFACTOR = Math.log(256) / Math.log(BASE);
      function encode(source) {
        if (Array.isArray(source) || source instanceof Uint8Array) {
          source = _Buffer.from(source);
        }
        if (!_Buffer.isBuffer(source)) {
          throw new TypeError("Expected Buffer");
        }
        if (source.length === 0) {
          return "";
        }
        var zeroes = 0;
        var length = 0;
        var pbegin = 0;
        var pend = source.length;
        while (pbegin !== pend && source[pbegin] === 0) {
          pbegin++;
          zeroes++;
        }
        var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
        var b58 = new Uint8Array(size);
        while (pbegin !== pend) {
          var carry = source[pbegin];
          var i2 = 0;
          for (var it1 = size - 1; (carry !== 0 || i2 < length) && it1 !== -1; it1--, i2++) {
            carry += 256 * b58[it1] >>> 0;
            b58[it1] = carry % BASE >>> 0;
            carry = carry / BASE >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length = i2;
          pbegin++;
        }
        var it2 = size - length;
        while (it2 !== size && b58[it2] === 0) {
          it2++;
        }
        var str = LEADER.repeat(zeroes);
        for (; it2 < size; ++it2) {
          str += ALPHABET.charAt(b58[it2]);
        }
        return str;
      }
      function decodeUnsafe(source) {
        if (typeof source !== "string") {
          throw new TypeError("Expected String");
        }
        if (source.length === 0) {
          return _Buffer.alloc(0);
        }
        var psz = 0;
        var zeroes = 0;
        var length = 0;
        while (source[psz] === LEADER) {
          zeroes++;
          psz++;
        }
        var size = (source.length - psz) * FACTOR + 1 >>> 0;
        var b256 = new Uint8Array(size);
        while (source[psz]) {
          var carry = BASE_MAP[source.charCodeAt(psz)];
          if (carry === 255) {
            return;
          }
          var i2 = 0;
          for (var it3 = size - 1; (carry !== 0 || i2 < length) && it3 !== -1; it3--, i2++) {
            carry += BASE * b256[it3] >>> 0;
            b256[it3] = carry % 256 >>> 0;
            carry = carry / 256 >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length = i2;
          psz++;
        }
        var it4 = size - length;
        while (it4 !== size && b256[it4] === 0) {
          it4++;
        }
        var vch = _Buffer.allocUnsafe(zeroes + (size - it4));
        vch.fill(0, 0, zeroes);
        var j2 = zeroes;
        while (it4 !== size) {
          vch[j2++] = b256[it4++];
        }
        return vch;
      }
      function decode(string2) {
        var buffer = decodeUnsafe(string2);
        if (buffer) {
          return buffer;
        }
        throw new Error("Non-base" + BASE + " character");
      }
      return {
        encode,
        decodeUnsafe,
        decode
      };
    }
    module.exports = base;
  }
});

// node_modules/borsh/node_modules/bs58/index.js
var require_bs582 = __commonJS({
  "node_modules/borsh/node_modules/bs58/index.js"(exports, module) {
    var basex = require_src2();
    var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    module.exports = basex(ALPHABET);
  }
});

// node_modules/text-encoding-utf-8/lib/encoding.lib.js
var require_encoding_lib = __commonJS({
  "node_modules/text-encoding-utf-8/lib/encoding.lib.js"(exports) {
    "use strict";
    function inRange(a, min, max) {
      return min <= a && a <= max;
    }
    function ToDictionary(o) {
      if (o === void 0)
        return {};
      if (o === Object(o))
        return o;
      throw TypeError("Could not convert argument to dictionary");
    }
    function stringToCodePoints(string2) {
      var s = String(string2);
      var n = s.length;
      var i = 0;
      var u = [];
      while (i < n) {
        var c = s.charCodeAt(i);
        if (c < 55296 || c > 57343) {
          u.push(c);
        } else if (56320 <= c && c <= 57343) {
          u.push(65533);
        } else if (55296 <= c && c <= 56319) {
          if (i === n - 1) {
            u.push(65533);
          } else {
            var d = string2.charCodeAt(i + 1);
            if (56320 <= d && d <= 57343) {
              var a = c & 1023;
              var b = d & 1023;
              u.push(65536 + (a << 10) + b);
              i += 1;
            } else {
              u.push(65533);
            }
          }
        }
        i += 1;
      }
      return u;
    }
    function codePointsToString(code_points) {
      var s = "";
      for (var i = 0; i < code_points.length; ++i) {
        var cp = code_points[i];
        if (cp <= 65535) {
          s += String.fromCharCode(cp);
        } else {
          cp -= 65536;
          s += String.fromCharCode(
            (cp >> 10) + 55296,
            (cp & 1023) + 56320
          );
        }
      }
      return s;
    }
    var end_of_stream = -1;
    function Stream(tokens) {
      this.tokens = [].slice.call(tokens);
    }
    Stream.prototype = {
      /**
       * @return {boolean} True if end-of-stream has been hit.
       */
      endOfStream: function() {
        return !this.tokens.length;
      },
      /**
       * When a token is read from a stream, the first token in the
       * stream must be returned and subsequently removed, and
       * end-of-stream must be returned otherwise.
       *
       * @return {number} Get the next token from the stream, or
       * end_of_stream.
       */
      read: function() {
        if (!this.tokens.length)
          return end_of_stream;
        return this.tokens.shift();
      },
      /**
       * When one or more tokens are prepended to a stream, those tokens
       * must be inserted, in given order, before the first token in the
       * stream.
       *
       * @param {(number|!Array.<number>)} token The token(s) to prepend to the stream.
       */
      prepend: function(token) {
        if (Array.isArray(token)) {
          var tokens = (
            /**@type {!Array.<number>}*/
            token
          );
          while (tokens.length)
            this.tokens.unshift(tokens.pop());
        } else {
          this.tokens.unshift(token);
        }
      },
      /**
       * When one or more tokens are pushed to a stream, those tokens
       * must be inserted, in given order, after the last token in the
       * stream.
       *
       * @param {(number|!Array.<number>)} token The tokens(s) to prepend to the stream.
       */
      push: function(token) {
        if (Array.isArray(token)) {
          var tokens = (
            /**@type {!Array.<number>}*/
            token
          );
          while (tokens.length)
            this.tokens.push(tokens.shift());
        } else {
          this.tokens.push(token);
        }
      }
    };
    var finished = -1;
    function decoderError(fatal, opt_code_point) {
      if (fatal)
        throw TypeError("Decoder error");
      return opt_code_point || 65533;
    }
    var DEFAULT_ENCODING = "utf-8";
    function TextDecoder2(encoding, options) {
      if (!(this instanceof TextDecoder2)) {
        return new TextDecoder2(encoding, options);
      }
      encoding = encoding !== void 0 ? String(encoding).toLowerCase() : DEFAULT_ENCODING;
      if (encoding !== DEFAULT_ENCODING) {
        throw new Error("Encoding not supported. Only utf-8 is supported");
      }
      options = ToDictionary(options);
      this._streaming = false;
      this._BOMseen = false;
      this._decoder = null;
      this._fatal = Boolean(options["fatal"]);
      this._ignoreBOM = Boolean(options["ignoreBOM"]);
      Object.defineProperty(this, "encoding", { value: "utf-8" });
      Object.defineProperty(this, "fatal", { value: this._fatal });
      Object.defineProperty(this, "ignoreBOM", { value: this._ignoreBOM });
    }
    TextDecoder2.prototype = {
      /**
       * @param {ArrayBufferView=} input The buffer of bytes to decode.
       * @param {Object=} options
       * @return {string} The decoded string.
       */
      decode: function decode(input, options) {
        var bytes2;
        if (typeof input === "object" && input instanceof ArrayBuffer) {
          bytes2 = new Uint8Array(input);
        } else if (typeof input === "object" && "buffer" in input && input.buffer instanceof ArrayBuffer) {
          bytes2 = new Uint8Array(
            input.buffer,
            input.byteOffset,
            input.byteLength
          );
        } else {
          bytes2 = new Uint8Array(0);
        }
        options = ToDictionary(options);
        if (!this._streaming) {
          this._decoder = new UTF8Decoder({ fatal: this._fatal });
          this._BOMseen = false;
        }
        this._streaming = Boolean(options["stream"]);
        var input_stream = new Stream(bytes2);
        var code_points = [];
        var result;
        while (!input_stream.endOfStream()) {
          result = this._decoder.handler(input_stream, input_stream.read());
          if (result === finished)
            break;
          if (result === null)
            continue;
          if (Array.isArray(result))
            code_points.push.apply(
              code_points,
              /**@type {!Array.<number>}*/
              result
            );
          else
            code_points.push(result);
        }
        if (!this._streaming) {
          do {
            result = this._decoder.handler(input_stream, input_stream.read());
            if (result === finished)
              break;
            if (result === null)
              continue;
            if (Array.isArray(result))
              code_points.push.apply(
                code_points,
                /**@type {!Array.<number>}*/
                result
              );
            else
              code_points.push(result);
          } while (!input_stream.endOfStream());
          this._decoder = null;
        }
        if (code_points.length) {
          if (["utf-8"].indexOf(this.encoding) !== -1 && !this._ignoreBOM && !this._BOMseen) {
            if (code_points[0] === 65279) {
              this._BOMseen = true;
              code_points.shift();
            } else {
              this._BOMseen = true;
            }
          }
        }
        return codePointsToString(code_points);
      }
    };
    function TextEncoder2(encoding, options) {
      if (!(this instanceof TextEncoder2))
        return new TextEncoder2(encoding, options);
      encoding = encoding !== void 0 ? String(encoding).toLowerCase() : DEFAULT_ENCODING;
      if (encoding !== DEFAULT_ENCODING) {
        throw new Error("Encoding not supported. Only utf-8 is supported");
      }
      options = ToDictionary(options);
      this._streaming = false;
      this._encoder = null;
      this._options = { fatal: Boolean(options["fatal"]) };
      Object.defineProperty(this, "encoding", { value: "utf-8" });
    }
    TextEncoder2.prototype = {
      /**
       * @param {string=} opt_string The string to encode.
       * @param {Object=} options
       * @return {Uint8Array} Encoded bytes, as a Uint8Array.
       */
      encode: function encode(opt_string, options) {
        opt_string = opt_string ? String(opt_string) : "";
        options = ToDictionary(options);
        if (!this._streaming)
          this._encoder = new UTF8Encoder(this._options);
        this._streaming = Boolean(options["stream"]);
        var bytes2 = [];
        var input_stream = new Stream(stringToCodePoints(opt_string));
        var result;
        while (!input_stream.endOfStream()) {
          result = this._encoder.handler(input_stream, input_stream.read());
          if (result === finished)
            break;
          if (Array.isArray(result))
            bytes2.push.apply(
              bytes2,
              /**@type {!Array.<number>}*/
              result
            );
          else
            bytes2.push(result);
        }
        if (!this._streaming) {
          while (true) {
            result = this._encoder.handler(input_stream, input_stream.read());
            if (result === finished)
              break;
            if (Array.isArray(result))
              bytes2.push.apply(
                bytes2,
                /**@type {!Array.<number>}*/
                result
              );
            else
              bytes2.push(result);
          }
          this._encoder = null;
        }
        return new Uint8Array(bytes2);
      }
    };
    function UTF8Decoder(options) {
      var fatal = options.fatal;
      var utf8_code_point = 0, utf8_bytes_seen = 0, utf8_bytes_needed = 0, utf8_lower_boundary = 128, utf8_upper_boundary = 191;
      this.handler = function(stream, bite) {
        if (bite === end_of_stream && utf8_bytes_needed !== 0) {
          utf8_bytes_needed = 0;
          return decoderError(fatal);
        }
        if (bite === end_of_stream)
          return finished;
        if (utf8_bytes_needed === 0) {
          if (inRange(bite, 0, 127)) {
            return bite;
          }
          if (inRange(bite, 194, 223)) {
            utf8_bytes_needed = 1;
            utf8_code_point = bite - 192;
          } else if (inRange(bite, 224, 239)) {
            if (bite === 224)
              utf8_lower_boundary = 160;
            if (bite === 237)
              utf8_upper_boundary = 159;
            utf8_bytes_needed = 2;
            utf8_code_point = bite - 224;
          } else if (inRange(bite, 240, 244)) {
            if (bite === 240)
              utf8_lower_boundary = 144;
            if (bite === 244)
              utf8_upper_boundary = 143;
            utf8_bytes_needed = 3;
            utf8_code_point = bite - 240;
          } else {
            return decoderError(fatal);
          }
          utf8_code_point = utf8_code_point << 6 * utf8_bytes_needed;
          return null;
        }
        if (!inRange(bite, utf8_lower_boundary, utf8_upper_boundary)) {
          utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0;
          utf8_lower_boundary = 128;
          utf8_upper_boundary = 191;
          stream.prepend(bite);
          return decoderError(fatal);
        }
        utf8_lower_boundary = 128;
        utf8_upper_boundary = 191;
        utf8_bytes_seen += 1;
        utf8_code_point += bite - 128 << 6 * (utf8_bytes_needed - utf8_bytes_seen);
        if (utf8_bytes_seen !== utf8_bytes_needed)
          return null;
        var code_point = utf8_code_point;
        utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0;
        return code_point;
      };
    }
    function UTF8Encoder(options) {
      var fatal = options.fatal;
      this.handler = function(stream, code_point) {
        if (code_point === end_of_stream)
          return finished;
        if (inRange(code_point, 0, 127))
          return code_point;
        var count, offset2;
        if (inRange(code_point, 128, 2047)) {
          count = 1;
          offset2 = 192;
        } else if (inRange(code_point, 2048, 65535)) {
          count = 2;
          offset2 = 224;
        } else if (inRange(code_point, 65536, 1114111)) {
          count = 3;
          offset2 = 240;
        }
        var bytes2 = [(code_point >> 6 * count) + offset2];
        while (count > 0) {
          var temp = code_point >> 6 * (count - 1);
          bytes2.push(128 | temp & 63);
          count -= 1;
        }
        return bytes2;
      };
    }
    exports.TextEncoder = TextEncoder2;
    exports.TextDecoder = TextDecoder2;
  }
});

// node_modules/borsh/lib/index.js
var require_lib = __commonJS({
  "node_modules/borsh/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __importStar = exports && exports.__importStar || function(mod2) {
      if (mod2 && mod2.__esModule)
        return mod2;
      var result = {};
      if (mod2 != null) {
        for (var k in mod2)
          if (k !== "default" && Object.hasOwnProperty.call(mod2, k))
            __createBinding(result, mod2, k);
      }
      __setModuleDefault(result, mod2);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod2) {
      return mod2 && mod2.__esModule ? mod2 : { "default": mod2 };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deserializeUnchecked = exports.deserialize = exports.serialize = exports.BinaryReader = exports.BinaryWriter = exports.BorshError = exports.baseDecode = exports.baseEncode = void 0;
    var bn_js_1 = __importDefault(require_bn());
    var bs58_1 = __importDefault(require_bs582());
    var encoding = __importStar(require_encoding_lib());
    var ResolvedTextDecoder = typeof TextDecoder !== "function" ? encoding.TextDecoder : TextDecoder;
    var textDecoder = new ResolvedTextDecoder("utf-8", { fatal: true });
    function baseEncode(value) {
      if (typeof value === "string") {
        value = Buffer.from(value, "utf8");
      }
      return bs58_1.default.encode(Buffer.from(value));
    }
    exports.baseEncode = baseEncode;
    function baseDecode(value) {
      return Buffer.from(bs58_1.default.decode(value));
    }
    exports.baseDecode = baseDecode;
    var INITIAL_LENGTH = 1024;
    var BorshError = class extends Error {
      constructor(message) {
        super(message);
        this.fieldPath = [];
        this.originalMessage = message;
      }
      addToFieldPath(fieldName) {
        this.fieldPath.splice(0, 0, fieldName);
        this.message = this.originalMessage + ": " + this.fieldPath.join(".");
      }
    };
    exports.BorshError = BorshError;
    var BinaryWriter = class {
      constructor() {
        this.buf = Buffer.alloc(INITIAL_LENGTH);
        this.length = 0;
      }
      maybeResize() {
        if (this.buf.length < 16 + this.length) {
          this.buf = Buffer.concat([this.buf, Buffer.alloc(INITIAL_LENGTH)]);
        }
      }
      writeU8(value) {
        this.maybeResize();
        this.buf.writeUInt8(value, this.length);
        this.length += 1;
      }
      writeU16(value) {
        this.maybeResize();
        this.buf.writeUInt16LE(value, this.length);
        this.length += 2;
      }
      writeU32(value) {
        this.maybeResize();
        this.buf.writeUInt32LE(value, this.length);
        this.length += 4;
      }
      writeU64(value) {
        this.maybeResize();
        this.writeBuffer(Buffer.from(new bn_js_1.default(value).toArray("le", 8)));
      }
      writeU128(value) {
        this.maybeResize();
        this.writeBuffer(Buffer.from(new bn_js_1.default(value).toArray("le", 16)));
      }
      writeU256(value) {
        this.maybeResize();
        this.writeBuffer(Buffer.from(new bn_js_1.default(value).toArray("le", 32)));
      }
      writeU512(value) {
        this.maybeResize();
        this.writeBuffer(Buffer.from(new bn_js_1.default(value).toArray("le", 64)));
      }
      writeBuffer(buffer) {
        this.buf = Buffer.concat([
          Buffer.from(this.buf.subarray(0, this.length)),
          buffer,
          Buffer.alloc(INITIAL_LENGTH)
        ]);
        this.length += buffer.length;
      }
      writeString(str) {
        this.maybeResize();
        const b = Buffer.from(str, "utf8");
        this.writeU32(b.length);
        this.writeBuffer(b);
      }
      writeFixedArray(array2) {
        this.writeBuffer(Buffer.from(array2));
      }
      writeArray(array2, fn) {
        this.maybeResize();
        this.writeU32(array2.length);
        for (const elem of array2) {
          this.maybeResize();
          fn(elem);
        }
      }
      toArray() {
        return this.buf.subarray(0, this.length);
      }
    };
    exports.BinaryWriter = BinaryWriter;
    function handlingRangeError(target, propertyKey, propertyDescriptor) {
      const originalMethod = propertyDescriptor.value;
      propertyDescriptor.value = function(...args) {
        try {
          return originalMethod.apply(this, args);
        } catch (e) {
          if (e instanceof RangeError) {
            const code = e.code;
            if (["ERR_BUFFER_OUT_OF_BOUNDS", "ERR_OUT_OF_RANGE"].indexOf(code) >= 0) {
              throw new BorshError("Reached the end of buffer when deserializing");
            }
          }
          throw e;
        }
      };
    }
    var BinaryReader = class {
      constructor(buf) {
        this.buf = buf;
        this.offset = 0;
      }
      readU8() {
        const value = this.buf.readUInt8(this.offset);
        this.offset += 1;
        return value;
      }
      readU16() {
        const value = this.buf.readUInt16LE(this.offset);
        this.offset += 2;
        return value;
      }
      readU32() {
        const value = this.buf.readUInt32LE(this.offset);
        this.offset += 4;
        return value;
      }
      readU64() {
        const buf = this.readBuffer(8);
        return new bn_js_1.default(buf, "le");
      }
      readU128() {
        const buf = this.readBuffer(16);
        return new bn_js_1.default(buf, "le");
      }
      readU256() {
        const buf = this.readBuffer(32);
        return new bn_js_1.default(buf, "le");
      }
      readU512() {
        const buf = this.readBuffer(64);
        return new bn_js_1.default(buf, "le");
      }
      readBuffer(len) {
        if (this.offset + len > this.buf.length) {
          throw new BorshError(`Expected buffer length ${len} isn't within bounds`);
        }
        const result = this.buf.slice(this.offset, this.offset + len);
        this.offset += len;
        return result;
      }
      readString() {
        const len = this.readU32();
        const buf = this.readBuffer(len);
        try {
          return textDecoder.decode(buf);
        } catch (e) {
          throw new BorshError(`Error decoding UTF-8 string: ${e}`);
        }
      }
      readFixedArray(len) {
        return new Uint8Array(this.readBuffer(len));
      }
      readArray(fn) {
        const len = this.readU32();
        const result = Array();
        for (let i = 0; i < len; ++i) {
          result.push(fn());
        }
        return result;
      }
    };
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU8", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU16", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU32", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU64", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU128", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU256", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readU512", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readString", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readFixedArray", null);
    __decorate([
      handlingRangeError
    ], BinaryReader.prototype, "readArray", null);
    exports.BinaryReader = BinaryReader;
    function capitalizeFirstLetter(string2) {
      return string2.charAt(0).toUpperCase() + string2.slice(1);
    }
    function serializeField(schema, fieldName, value, fieldType, writer) {
      try {
        if (typeof fieldType === "string") {
          writer[`write${capitalizeFirstLetter(fieldType)}`](value);
        } else if (fieldType instanceof Array) {
          if (typeof fieldType[0] === "number") {
            if (value.length !== fieldType[0]) {
              throw new BorshError(`Expecting byte array of length ${fieldType[0]}, but got ${value.length} bytes`);
            }
            writer.writeFixedArray(value);
          } else if (fieldType.length === 2 && typeof fieldType[1] === "number") {
            if (value.length !== fieldType[1]) {
              throw new BorshError(`Expecting byte array of length ${fieldType[1]}, but got ${value.length} bytes`);
            }
            for (let i = 0; i < fieldType[1]; i++) {
              serializeField(schema, null, value[i], fieldType[0], writer);
            }
          } else {
            writer.writeArray(value, (item) => {
              serializeField(schema, fieldName, item, fieldType[0], writer);
            });
          }
        } else if (fieldType.kind !== void 0) {
          switch (fieldType.kind) {
            case "option": {
              if (value === null || value === void 0) {
                writer.writeU8(0);
              } else {
                writer.writeU8(1);
                serializeField(schema, fieldName, value, fieldType.type, writer);
              }
              break;
            }
            case "map": {
              writer.writeU32(value.size);
              value.forEach((val, key) => {
                serializeField(schema, fieldName, key, fieldType.key, writer);
                serializeField(schema, fieldName, val, fieldType.value, writer);
              });
              break;
            }
            default:
              throw new BorshError(`FieldType ${fieldType} unrecognized`);
          }
        } else {
          serializeStruct(schema, value, writer);
        }
      } catch (error) {
        if (error instanceof BorshError) {
          error.addToFieldPath(fieldName);
        }
        throw error;
      }
    }
    function serializeStruct(schema, obj, writer) {
      if (typeof obj.borshSerialize === "function") {
        obj.borshSerialize(writer);
        return;
      }
      const structSchema = schema.get(obj.constructor);
      if (!structSchema) {
        throw new BorshError(`Class ${obj.constructor.name} is missing in schema`);
      }
      if (structSchema.kind === "struct") {
        structSchema.fields.map(([fieldName, fieldType]) => {
          serializeField(schema, fieldName, obj[fieldName], fieldType, writer);
        });
      } else if (structSchema.kind === "enum") {
        const name = obj[structSchema.field];
        for (let idx = 0; idx < structSchema.values.length; ++idx) {
          const [fieldName, fieldType] = structSchema.values[idx];
          if (fieldName === name) {
            writer.writeU8(idx);
            serializeField(schema, fieldName, obj[fieldName], fieldType, writer);
            break;
          }
        }
      } else {
        throw new BorshError(`Unexpected schema kind: ${structSchema.kind} for ${obj.constructor.name}`);
      }
    }
    function serialize2(schema, obj, Writer = BinaryWriter) {
      const writer = new Writer();
      serializeStruct(schema, obj, writer);
      return writer.toArray();
    }
    exports.serialize = serialize2;
    function deserializeField(schema, fieldName, fieldType, reader) {
      try {
        if (typeof fieldType === "string") {
          return reader[`read${capitalizeFirstLetter(fieldType)}`]();
        }
        if (fieldType instanceof Array) {
          if (typeof fieldType[0] === "number") {
            return reader.readFixedArray(fieldType[0]);
          } else if (typeof fieldType[1] === "number") {
            const arr = [];
            for (let i = 0; i < fieldType[1]; i++) {
              arr.push(deserializeField(schema, null, fieldType[0], reader));
            }
            return arr;
          } else {
            return reader.readArray(() => deserializeField(schema, fieldName, fieldType[0], reader));
          }
        }
        if (fieldType.kind === "option") {
          const option = reader.readU8();
          if (option) {
            return deserializeField(schema, fieldName, fieldType.type, reader);
          }
          return void 0;
        }
        if (fieldType.kind === "map") {
          let map = /* @__PURE__ */ new Map();
          const length = reader.readU32();
          for (let i = 0; i < length; i++) {
            const key = deserializeField(schema, fieldName, fieldType.key, reader);
            const val = deserializeField(schema, fieldName, fieldType.value, reader);
            map.set(key, val);
          }
          return map;
        }
        return deserializeStruct(schema, fieldType, reader);
      } catch (error) {
        if (error instanceof BorshError) {
          error.addToFieldPath(fieldName);
        }
        throw error;
      }
    }
    function deserializeStruct(schema, classType, reader) {
      if (typeof classType.borshDeserialize === "function") {
        return classType.borshDeserialize(reader);
      }
      const structSchema = schema.get(classType);
      if (!structSchema) {
        throw new BorshError(`Class ${classType.name} is missing in schema`);
      }
      if (structSchema.kind === "struct") {
        const result = {};
        for (const [fieldName, fieldType] of schema.get(classType).fields) {
          result[fieldName] = deserializeField(schema, fieldName, fieldType, reader);
        }
        return new classType(result);
      }
      if (structSchema.kind === "enum") {
        const idx = reader.readU8();
        if (idx >= structSchema.values.length) {
          throw new BorshError(`Enum index: ${idx} is out of range`);
        }
        const [fieldName, fieldType] = structSchema.values[idx];
        const fieldValue = deserializeField(schema, fieldName, fieldType, reader);
        return new classType({ [fieldName]: fieldValue });
      }
      throw new BorshError(`Unexpected schema kind: ${structSchema.kind} for ${classType.constructor.name}`);
    }
    function deserialize2(schema, classType, buffer, Reader = BinaryReader) {
      const reader = new Reader(buffer);
      const result = deserializeStruct(schema, classType, reader);
      if (reader.offset < buffer.length) {
        throw new BorshError(`Unexpected ${buffer.length - reader.offset} bytes after deserialized data`);
      }
      return result;
    }
    exports.deserialize = deserialize2;
    function deserializeUnchecked2(schema, classType, buffer, Reader = BinaryReader) {
      const reader = new Reader(buffer);
      return deserializeStruct(schema, classType, reader);
    }
    exports.deserializeUnchecked = deserializeUnchecked2;
  }
});

// node_modules/@solana/buffer-layout/lib/Layout.js
var require_Layout = __commonJS({
  "node_modules/@solana/buffer-layout/lib/Layout.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.s16 = exports.s8 = exports.nu64be = exports.u48be = exports.u40be = exports.u32be = exports.u24be = exports.u16be = exports.nu64 = exports.u48 = exports.u40 = exports.u32 = exports.u24 = exports.u16 = exports.u8 = exports.offset = exports.greedy = exports.Constant = exports.UTF8 = exports.CString = exports.Blob = exports.Boolean = exports.BitField = exports.BitStructure = exports.VariantLayout = exports.Union = exports.UnionLayoutDiscriminator = exports.UnionDiscriminator = exports.Structure = exports.Sequence = exports.DoubleBE = exports.Double = exports.FloatBE = exports.Float = exports.NearInt64BE = exports.NearInt64 = exports.NearUInt64BE = exports.NearUInt64 = exports.IntBE = exports.Int = exports.UIntBE = exports.UInt = exports.OffsetLayout = exports.GreedyCount = exports.ExternalLayout = exports.bindConstructorLayout = exports.nameWithProperty = exports.Layout = exports.uint8ArrayToBuffer = exports.checkUint8Array = void 0;
    exports.constant = exports.utf8 = exports.cstr = exports.blob = exports.unionLayoutDiscriminator = exports.union = exports.seq = exports.bits = exports.struct = exports.f64be = exports.f64 = exports.f32be = exports.f32 = exports.ns64be = exports.s48be = exports.s40be = exports.s32be = exports.s24be = exports.s16be = exports.ns64 = exports.s48 = exports.s40 = exports.s32 = exports.s24 = void 0;
    var buffer_1 = require_buffer();
    function checkUint8Array(b) {
      if (!(b instanceof Uint8Array)) {
        throw new TypeError("b must be a Uint8Array");
      }
    }
    exports.checkUint8Array = checkUint8Array;
    function uint8ArrayToBuffer(b) {
      checkUint8Array(b);
      return buffer_1.Buffer.from(b.buffer, b.byteOffset, b.length);
    }
    exports.uint8ArrayToBuffer = uint8ArrayToBuffer;
    var Layout = class {
      constructor(span, property) {
        if (!Number.isInteger(span)) {
          throw new TypeError("span must be an integer");
        }
        this.span = span;
        this.property = property;
      }
      /** Function to create an Object into which decoded properties will
       * be written.
       *
       * Used only for layouts that {@link Layout#decode|decode} to Object
       * instances, which means:
       * * {@link Structure}
       * * {@link Union}
       * * {@link VariantLayout}
       * * {@link BitStructure}
       *
       * If left undefined the JavaScript representation of these layouts
       * will be Object instances.
       *
       * See {@link bindConstructorLayout}.
       */
      makeDestinationObject() {
        return {};
      }
      /**
       * Calculate the span of a specific instance of a layout.
       *
       * @param {Uint8Array} b - the buffer that contains an encoded instance.
       *
       * @param {Number} [offset] - the offset at which the encoded instance
       * starts.  If absent a zero offset is inferred.
       *
       * @return {Number} - the number of bytes covered by the layout
       * instance.  If this method is not overridden in a subclass the
       * definition-time constant {@link Layout#span|span} will be
       * returned.
       *
       * @throws {RangeError} - if the length of the value cannot be
       * determined.
       */
      getSpan(b, offset2) {
        if (0 > this.span) {
          throw new RangeError("indeterminate span");
        }
        return this.span;
      }
      /**
       * Replicate the layout using a new property.
       *
       * This function must be used to get a structurally-equivalent layout
       * with a different name since all {@link Layout} instances are
       * immutable.
       *
       * **NOTE** This is a shallow copy.  All fields except {@link
       * Layout#property|property} are strictly equal to the origin layout.
       *
       * @param {String} property - the value for {@link
       * Layout#property|property} in the replica.
       *
       * @returns {Layout} - the copy with {@link Layout#property|property}
       * set to `property`.
       */
      replicate(property) {
        const rv = Object.create(this.constructor.prototype);
        Object.assign(rv, this);
        rv.property = property;
        return rv;
      }
      /**
       * Create an object from layout properties and an array of values.
       *
       * **NOTE** This function returns `undefined` if invoked on a layout
       * that does not return its value as an Object.  Objects are
       * returned for things that are a {@link Structure}, which includes
       * {@link VariantLayout|variant layouts} if they are structures, and
       * excludes {@link Union}s.  If you want this feature for a union
       * you must use {@link Union.getVariant|getVariant} to select the
       * desired layout.
       *
       * @param {Array} values - an array of values that correspond to the
       * default order for properties.  As with {@link Layout#decode|decode}
       * layout elements that have no property name are skipped when
       * iterating over the array values.  Only the top-level properties are
       * assigned; arguments are not assigned to properties of contained
       * layouts.  Any unused values are ignored.
       *
       * @return {(Object|undefined)}
       */
      fromArray(values) {
        return void 0;
      }
    };
    exports.Layout = Layout;
    function nameWithProperty(name, lo) {
      if (lo.property) {
        return name + "[" + lo.property + "]";
      }
      return name;
    }
    exports.nameWithProperty = nameWithProperty;
    function bindConstructorLayout(Class, layout) {
      if ("function" !== typeof Class) {
        throw new TypeError("Class must be constructor");
      }
      if (Object.prototype.hasOwnProperty.call(Class, "layout_")) {
        throw new Error("Class is already bound to a layout");
      }
      if (!(layout && layout instanceof Layout)) {
        throw new TypeError("layout must be a Layout");
      }
      if (Object.prototype.hasOwnProperty.call(layout, "boundConstructor_")) {
        throw new Error("layout is already bound to a constructor");
      }
      Class.layout_ = layout;
      layout.boundConstructor_ = Class;
      layout.makeDestinationObject = () => new Class();
      Object.defineProperty(Class.prototype, "encode", {
        value(b, offset2) {
          return layout.encode(this, b, offset2);
        },
        writable: true
      });
      Object.defineProperty(Class, "decode", {
        value(b, offset2) {
          return layout.decode(b, offset2);
        },
        writable: true
      });
    }
    exports.bindConstructorLayout = bindConstructorLayout;
    var ExternalLayout = class extends Layout {
      /**
       * Return `true` iff the external layout decodes to an unsigned
       * integer layout.
       *
       * In that case it can be used as the source of {@link
       * Sequence#count|Sequence counts}, {@link Blob#length|Blob lengths},
       * or as {@link UnionLayoutDiscriminator#layout|external union
       * discriminators}.
       *
       * @abstract
       */
      isCount() {
        throw new Error("ExternalLayout is abstract");
      }
    };
    exports.ExternalLayout = ExternalLayout;
    var GreedyCount = class extends ExternalLayout {
      constructor(elementSpan = 1, property) {
        if (!Number.isInteger(elementSpan) || 0 >= elementSpan) {
          throw new TypeError("elementSpan must be a (positive) integer");
        }
        super(-1, property);
        this.elementSpan = elementSpan;
      }
      /** @override */
      isCount() {
        return true;
      }
      /** @override */
      decode(b, offset2 = 0) {
        checkUint8Array(b);
        const rem = b.length - offset2;
        return Math.floor(rem / this.elementSpan);
      }
      /** @override */
      encode(src, b, offset2) {
        return 0;
      }
    };
    exports.GreedyCount = GreedyCount;
    var OffsetLayout = class extends ExternalLayout {
      constructor(layout, offset2 = 0, property) {
        if (!(layout instanceof Layout)) {
          throw new TypeError("layout must be a Layout");
        }
        if (!Number.isInteger(offset2)) {
          throw new TypeError("offset must be integer or undefined");
        }
        super(layout.span, property || layout.property);
        this.layout = layout;
        this.offset = offset2;
      }
      /** @override */
      isCount() {
        return this.layout instanceof UInt || this.layout instanceof UIntBE;
      }
      /** @override */
      decode(b, offset2 = 0) {
        return this.layout.decode(b, offset2 + this.offset);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        return this.layout.encode(src, b, offset2 + this.offset);
      }
    };
    exports.OffsetLayout = OffsetLayout;
    var UInt = class extends Layout {
      constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
          throw new RangeError("span must not exceed 6 bytes");
        }
      }
      /** @override */
      decode(b, offset2 = 0) {
        return uint8ArrayToBuffer(b).readUIntLE(offset2, this.span);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        uint8ArrayToBuffer(b).writeUIntLE(src, offset2, this.span);
        return this.span;
      }
    };
    exports.UInt = UInt;
    var UIntBE = class extends Layout {
      constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
          throw new RangeError("span must not exceed 6 bytes");
        }
      }
      /** @override */
      decode(b, offset2 = 0) {
        return uint8ArrayToBuffer(b).readUIntBE(offset2, this.span);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        uint8ArrayToBuffer(b).writeUIntBE(src, offset2, this.span);
        return this.span;
      }
    };
    exports.UIntBE = UIntBE;
    var Int = class extends Layout {
      constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
          throw new RangeError("span must not exceed 6 bytes");
        }
      }
      /** @override */
      decode(b, offset2 = 0) {
        return uint8ArrayToBuffer(b).readIntLE(offset2, this.span);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        uint8ArrayToBuffer(b).writeIntLE(src, offset2, this.span);
        return this.span;
      }
    };
    exports.Int = Int;
    var IntBE = class extends Layout {
      constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
          throw new RangeError("span must not exceed 6 bytes");
        }
      }
      /** @override */
      decode(b, offset2 = 0) {
        return uint8ArrayToBuffer(b).readIntBE(offset2, this.span);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        uint8ArrayToBuffer(b).writeIntBE(src, offset2, this.span);
        return this.span;
      }
    };
    exports.IntBE = IntBE;
    var V2E32 = Math.pow(2, 32);
    function divmodInt64(src) {
      const hi32 = Math.floor(src / V2E32);
      const lo32 = src - hi32 * V2E32;
      return { hi32, lo32 };
    }
    function roundedInt64(hi32, lo32) {
      return hi32 * V2E32 + lo32;
    }
    var NearUInt64 = class extends Layout {
      constructor(property) {
        super(8, property);
      }
      /** @override */
      decode(b, offset2 = 0) {
        const buffer = uint8ArrayToBuffer(b);
        const lo32 = buffer.readUInt32LE(offset2);
        const hi32 = buffer.readUInt32LE(offset2 + 4);
        return roundedInt64(hi32, lo32);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        const split2 = divmodInt64(src);
        const buffer = uint8ArrayToBuffer(b);
        buffer.writeUInt32LE(split2.lo32, offset2);
        buffer.writeUInt32LE(split2.hi32, offset2 + 4);
        return 8;
      }
    };
    exports.NearUInt64 = NearUInt64;
    var NearUInt64BE = class extends Layout {
      constructor(property) {
        super(8, property);
      }
      /** @override */
      decode(b, offset2 = 0) {
        const buffer = uint8ArrayToBuffer(b);
        const hi32 = buffer.readUInt32BE(offset2);
        const lo32 = buffer.readUInt32BE(offset2 + 4);
        return roundedInt64(hi32, lo32);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        const split2 = divmodInt64(src);
        const buffer = uint8ArrayToBuffer(b);
        buffer.writeUInt32BE(split2.hi32, offset2);
        buffer.writeUInt32BE(split2.lo32, offset2 + 4);
        return 8;
      }
    };
    exports.NearUInt64BE = NearUInt64BE;
    var NearInt64 = class extends Layout {
      constructor(property) {
        super(8, property);
      }
      /** @override */
      decode(b, offset2 = 0) {
        const buffer = uint8ArrayToBuffer(b);
        const lo32 = buffer.readUInt32LE(offset2);
        const hi32 = buffer.readInt32LE(offset2 + 4);
        return roundedInt64(hi32, lo32);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        const split2 = divmodInt64(src);
        const buffer = uint8ArrayToBuffer(b);
        buffer.writeUInt32LE(split2.lo32, offset2);
        buffer.writeInt32LE(split2.hi32, offset2 + 4);
        return 8;
      }
    };
    exports.NearInt64 = NearInt64;
    var NearInt64BE = class extends Layout {
      constructor(property) {
        super(8, property);
      }
      /** @override */
      decode(b, offset2 = 0) {
        const buffer = uint8ArrayToBuffer(b);
        const hi32 = buffer.readInt32BE(offset2);
        const lo32 = buffer.readUInt32BE(offset2 + 4);
        return roundedInt64(hi32, lo32);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        const split2 = divmodInt64(src);
        const buffer = uint8ArrayToBuffer(b);
        buffer.writeInt32BE(split2.hi32, offset2);
        buffer.writeUInt32BE(split2.lo32, offset2 + 4);
        return 8;
      }
    };
    exports.NearInt64BE = NearInt64BE;
    var Float = class extends Layout {
      constructor(property) {
        super(4, property);
      }
      /** @override */
      decode(b, offset2 = 0) {
        return uint8ArrayToBuffer(b).readFloatLE(offset2);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        uint8ArrayToBuffer(b).writeFloatLE(src, offset2);
        return 4;
      }
    };
    exports.Float = Float;
    var FloatBE = class extends Layout {
      constructor(property) {
        super(4, property);
      }
      /** @override */
      decode(b, offset2 = 0) {
        return uint8ArrayToBuffer(b).readFloatBE(offset2);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        uint8ArrayToBuffer(b).writeFloatBE(src, offset2);
        return 4;
      }
    };
    exports.FloatBE = FloatBE;
    var Double = class extends Layout {
      constructor(property) {
        super(8, property);
      }
      /** @override */
      decode(b, offset2 = 0) {
        return uint8ArrayToBuffer(b).readDoubleLE(offset2);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        uint8ArrayToBuffer(b).writeDoubleLE(src, offset2);
        return 8;
      }
    };
    exports.Double = Double;
    var DoubleBE = class extends Layout {
      constructor(property) {
        super(8, property);
      }
      /** @override */
      decode(b, offset2 = 0) {
        return uint8ArrayToBuffer(b).readDoubleBE(offset2);
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        uint8ArrayToBuffer(b).writeDoubleBE(src, offset2);
        return 8;
      }
    };
    exports.DoubleBE = DoubleBE;
    var Sequence = class extends Layout {
      constructor(elementLayout, count, property) {
        if (!(elementLayout instanceof Layout)) {
          throw new TypeError("elementLayout must be a Layout");
        }
        if (!(count instanceof ExternalLayout && count.isCount() || Number.isInteger(count) && 0 <= count)) {
          throw new TypeError("count must be non-negative integer or an unsigned integer ExternalLayout");
        }
        let span = -1;
        if (!(count instanceof ExternalLayout) && 0 < elementLayout.span) {
          span = count * elementLayout.span;
        }
        super(span, property);
        this.elementLayout = elementLayout;
        this.count = count;
      }
      /** @override */
      getSpan(b, offset2 = 0) {
        if (0 <= this.span) {
          return this.span;
        }
        let span = 0;
        let count = this.count;
        if (count instanceof ExternalLayout) {
          count = count.decode(b, offset2);
        }
        if (0 < this.elementLayout.span) {
          span = count * this.elementLayout.span;
        } else {
          let idx = 0;
          while (idx < count) {
            span += this.elementLayout.getSpan(b, offset2 + span);
            ++idx;
          }
        }
        return span;
      }
      /** @override */
      decode(b, offset2 = 0) {
        const rv = [];
        let i = 0;
        let count = this.count;
        if (count instanceof ExternalLayout) {
          count = count.decode(b, offset2);
        }
        while (i < count) {
          rv.push(this.elementLayout.decode(b, offset2));
          offset2 += this.elementLayout.getSpan(b, offset2);
          i += 1;
        }
        return rv;
      }
      /** Implement {@link Layout#encode|encode} for {@link Sequence}.
       *
       * **NOTE** If `src` is shorter than {@link Sequence#count|count} then
       * the unused space in the buffer is left unchanged.  If `src` is
       * longer than {@link Sequence#count|count} the unneeded elements are
       * ignored.
       *
       * **NOTE** If {@link Layout#count|count} is an instance of {@link
       * ExternalLayout} then the length of `src` will be encoded as the
       * count after `src` is encoded. */
      encode(src, b, offset2 = 0) {
        const elo = this.elementLayout;
        const span = src.reduce((span2, v) => {
          return span2 + elo.encode(v, b, offset2 + span2);
        }, 0);
        if (this.count instanceof ExternalLayout) {
          this.count.encode(src.length, b, offset2);
        }
        return span;
      }
    };
    exports.Sequence = Sequence;
    var Structure = class extends Layout {
      constructor(fields, property, decodePrefixes) {
        if (!(Array.isArray(fields) && fields.reduce((acc, v) => acc && v instanceof Layout, true))) {
          throw new TypeError("fields must be array of Layout instances");
        }
        if ("boolean" === typeof property && void 0 === decodePrefixes) {
          decodePrefixes = property;
          property = void 0;
        }
        for (const fd of fields) {
          if (0 > fd.span && void 0 === fd.property) {
            throw new Error("fields cannot contain unnamed variable-length layout");
          }
        }
        let span = -1;
        try {
          span = fields.reduce((span2, fd) => span2 + fd.getSpan(), 0);
        } catch (e) {
        }
        super(span, property);
        this.fields = fields;
        this.decodePrefixes = !!decodePrefixes;
      }
      /** @override */
      getSpan(b, offset2 = 0) {
        if (0 <= this.span) {
          return this.span;
        }
        let span = 0;
        try {
          span = this.fields.reduce((span2, fd) => {
            const fsp = fd.getSpan(b, offset2);
            offset2 += fsp;
            return span2 + fsp;
          }, 0);
        } catch (e) {
          throw new RangeError("indeterminate span");
        }
        return span;
      }
      /** @override */
      decode(b, offset2 = 0) {
        checkUint8Array(b);
        const dest = this.makeDestinationObject();
        for (const fd of this.fields) {
          if (void 0 !== fd.property) {
            dest[fd.property] = fd.decode(b, offset2);
          }
          offset2 += fd.getSpan(b, offset2);
          if (this.decodePrefixes && b.length === offset2) {
            break;
          }
        }
        return dest;
      }
      /** Implement {@link Layout#encode|encode} for {@link Structure}.
       *
       * If `src` is missing a property for a member with a defined {@link
       * Layout#property|property} the corresponding region of the buffer is
       * left unmodified. */
      encode(src, b, offset2 = 0) {
        const firstOffset = offset2;
        let lastOffset = 0;
        let lastWrote = 0;
        for (const fd of this.fields) {
          let span = fd.span;
          lastWrote = 0 < span ? span : 0;
          if (void 0 !== fd.property) {
            const fv = src[fd.property];
            if (void 0 !== fv) {
              lastWrote = fd.encode(fv, b, offset2);
              if (0 > span) {
                span = fd.getSpan(b, offset2);
              }
            }
          }
          lastOffset = offset2;
          offset2 += span;
        }
        return lastOffset + lastWrote - firstOffset;
      }
      /** @override */
      fromArray(values) {
        const dest = this.makeDestinationObject();
        for (const fd of this.fields) {
          if (void 0 !== fd.property && 0 < values.length) {
            dest[fd.property] = values.shift();
          }
        }
        return dest;
      }
      /**
       * Get access to the layout of a given property.
       *
       * @param {String} property - the structure member of interest.
       *
       * @return {Layout} - the layout associated with `property`, or
       * undefined if there is no such property.
       */
      layoutFor(property) {
        if ("string" !== typeof property) {
          throw new TypeError("property must be string");
        }
        for (const fd of this.fields) {
          if (fd.property === property) {
            return fd;
          }
        }
        return void 0;
      }
      /**
       * Get the offset of a structure member.
       *
       * @param {String} property - the structure member of interest.
       *
       * @return {Number} - the offset in bytes to the start of `property`
       * within the structure, or undefined if `property` is not a field
       * within the structure.  If the property is a member but follows a
       * variable-length structure member a negative number will be
       * returned.
       */
      offsetOf(property) {
        if ("string" !== typeof property) {
          throw new TypeError("property must be string");
        }
        let offset2 = 0;
        for (const fd of this.fields) {
          if (fd.property === property) {
            return offset2;
          }
          if (0 > fd.span) {
            offset2 = -1;
          } else if (0 <= offset2) {
            offset2 += fd.span;
          }
        }
        return void 0;
      }
    };
    exports.Structure = Structure;
    var UnionDiscriminator = class {
      constructor(property) {
        this.property = property;
      }
      /** Analog to {@link Layout#decode|Layout decode} for union discriminators.
       *
       * The implementation of this method need not reference the buffer if
       * variant information is available through other means. */
      decode(b, offset2) {
        throw new Error("UnionDiscriminator is abstract");
      }
      /** Analog to {@link Layout#decode|Layout encode} for union discriminators.
       *
       * The implementation of this method need not store the value if
       * variant information is maintained through other means. */
      encode(src, b, offset2) {
        throw new Error("UnionDiscriminator is abstract");
      }
    };
    exports.UnionDiscriminator = UnionDiscriminator;
    var UnionLayoutDiscriminator = class extends UnionDiscriminator {
      constructor(layout, property) {
        if (!(layout instanceof ExternalLayout && layout.isCount())) {
          throw new TypeError("layout must be an unsigned integer ExternalLayout");
        }
        super(property || layout.property || "variant");
        this.layout = layout;
      }
      /** Delegate decoding to {@link UnionLayoutDiscriminator#layout|layout}. */
      decode(b, offset2) {
        return this.layout.decode(b, offset2);
      }
      /** Delegate encoding to {@link UnionLayoutDiscriminator#layout|layout}. */
      encode(src, b, offset2) {
        return this.layout.encode(src, b, offset2);
      }
    };
    exports.UnionLayoutDiscriminator = UnionLayoutDiscriminator;
    var Union = class extends Layout {
      constructor(discr, defaultLayout, property) {
        let discriminator;
        if (discr instanceof UInt || discr instanceof UIntBE) {
          discriminator = new UnionLayoutDiscriminator(new OffsetLayout(discr));
        } else if (discr instanceof ExternalLayout && discr.isCount()) {
          discriminator = new UnionLayoutDiscriminator(discr);
        } else if (!(discr instanceof UnionDiscriminator)) {
          throw new TypeError("discr must be a UnionDiscriminator or an unsigned integer layout");
        } else {
          discriminator = discr;
        }
        if (void 0 === defaultLayout) {
          defaultLayout = null;
        }
        if (!(null === defaultLayout || defaultLayout instanceof Layout)) {
          throw new TypeError("defaultLayout must be null or a Layout");
        }
        if (null !== defaultLayout) {
          if (0 > defaultLayout.span) {
            throw new Error("defaultLayout must have constant span");
          }
          if (void 0 === defaultLayout.property) {
            defaultLayout = defaultLayout.replicate("content");
          }
        }
        let span = -1;
        if (defaultLayout) {
          span = defaultLayout.span;
          if (0 <= span && (discr instanceof UInt || discr instanceof UIntBE)) {
            span += discriminator.layout.span;
          }
        }
        super(span, property);
        this.discriminator = discriminator;
        this.usesPrefixDiscriminator = discr instanceof UInt || discr instanceof UIntBE;
        this.defaultLayout = defaultLayout;
        this.registry = {};
        let boundGetSourceVariant = this.defaultGetSourceVariant.bind(this);
        this.getSourceVariant = function(src) {
          return boundGetSourceVariant(src);
        };
        this.configGetSourceVariant = function(gsv) {
          boundGetSourceVariant = gsv.bind(this);
        };
      }
      /** @override */
      getSpan(b, offset2 = 0) {
        if (0 <= this.span) {
          return this.span;
        }
        const vlo = this.getVariant(b, offset2);
        if (!vlo) {
          throw new Error("unable to determine span for unrecognized variant");
        }
        return vlo.getSpan(b, offset2);
      }
      /**
       * Method to infer a registered Union variant compatible with `src`.
       *
       * The first satisfied rule in the following sequence defines the
       * return value:
       * * If `src` has properties matching the Union discriminator and
       *   the default layout, `undefined` is returned regardless of the
       *   value of the discriminator property (this ensures the default
       *   layout will be used);
       * * If `src` has a property matching the Union discriminator, the
       *   value of the discriminator identifies a registered variant, and
       *   either (a) the variant has no layout, or (b) `src` has the
       *   variant's property, then the variant is returned (because the
       *   source satisfies the constraints of the variant it identifies);
       * * If `src` does not have a property matching the Union
       *   discriminator, but does have a property matching a registered
       *   variant, then the variant is returned (because the source
       *   matches a variant without an explicit conflict);
       * * An error is thrown (because we either can't identify a variant,
       *   or we were explicitly told the variant but can't satisfy it).
       *
       * @param {Object} src - an object presumed to be compatible with
       * the content of the Union.
       *
       * @return {(undefined|VariantLayout)} - as described above.
       *
       * @throws {Error} - if `src` cannot be associated with a default or
       * registered variant.
       */
      defaultGetSourceVariant(src) {
        if (Object.prototype.hasOwnProperty.call(src, this.discriminator.property)) {
          if (this.defaultLayout && this.defaultLayout.property && Object.prototype.hasOwnProperty.call(src, this.defaultLayout.property)) {
            return void 0;
          }
          const vlo = this.registry[src[this.discriminator.property]];
          if (vlo && (!vlo.layout || vlo.property && Object.prototype.hasOwnProperty.call(src, vlo.property))) {
            return vlo;
          }
        } else {
          for (const tag in this.registry) {
            const vlo = this.registry[tag];
            if (vlo.property && Object.prototype.hasOwnProperty.call(src, vlo.property)) {
              return vlo;
            }
          }
        }
        throw new Error("unable to infer src variant");
      }
      /** Implement {@link Layout#decode|decode} for {@link Union}.
       *
       * If the variant is {@link Union#addVariant|registered} the return
       * value is an instance of that variant, with no explicit
       * discriminator.  Otherwise the {@link Union#defaultLayout|default
       * layout} is used to decode the content. */
      decode(b, offset2 = 0) {
        let dest;
        const dlo = this.discriminator;
        const discr = dlo.decode(b, offset2);
        const clo = this.registry[discr];
        if (void 0 === clo) {
          const defaultLayout = this.defaultLayout;
          let contentOffset = 0;
          if (this.usesPrefixDiscriminator) {
            contentOffset = dlo.layout.span;
          }
          dest = this.makeDestinationObject();
          dest[dlo.property] = discr;
          dest[defaultLayout.property] = defaultLayout.decode(b, offset2 + contentOffset);
        } else {
          dest = clo.decode(b, offset2);
        }
        return dest;
      }
      /** Implement {@link Layout#encode|encode} for {@link Union}.
       *
       * This API assumes the `src` object is consistent with the union's
       * {@link Union#defaultLayout|default layout}.  To encode variants
       * use the appropriate variant-specific {@link VariantLayout#encode}
       * method. */
      encode(src, b, offset2 = 0) {
        const vlo = this.getSourceVariant(src);
        if (void 0 === vlo) {
          const dlo = this.discriminator;
          const clo = this.defaultLayout;
          let contentOffset = 0;
          if (this.usesPrefixDiscriminator) {
            contentOffset = dlo.layout.span;
          }
          dlo.encode(src[dlo.property], b, offset2);
          return contentOffset + clo.encode(src[clo.property], b, offset2 + contentOffset);
        }
        return vlo.encode(src, b, offset2);
      }
      /** Register a new variant structure within a union.  The newly
       * created variant is returned.
       *
       * @param {Number} variant - initializer for {@link
       * VariantLayout#variant|variant}.
       *
       * @param {Layout} layout - initializer for {@link
       * VariantLayout#layout|layout}.
       *
       * @param {String} property - initializer for {@link
       * Layout#property|property}.
       *
       * @return {VariantLayout} */
      addVariant(variant, layout, property) {
        const rv = new VariantLayout(this, variant, layout, property);
        this.registry[variant] = rv;
        return rv;
      }
      /**
       * Get the layout associated with a registered variant.
       *
       * If `vb` does not produce a registered variant the function returns
       * `undefined`.
       *
       * @param {(Number|Uint8Array)} vb - either the variant number, or a
       * buffer from which the discriminator is to be read.
       *
       * @param {Number} offset - offset into `vb` for the start of the
       * union.  Used only when `vb` is an instance of {Uint8Array}.
       *
       * @return {({VariantLayout}|undefined)}
       */
      getVariant(vb, offset2 = 0) {
        let variant;
        if (vb instanceof Uint8Array) {
          variant = this.discriminator.decode(vb, offset2);
        } else {
          variant = vb;
        }
        return this.registry[variant];
      }
    };
    exports.Union = Union;
    var VariantLayout = class extends Layout {
      constructor(union2, variant, layout, property) {
        if (!(union2 instanceof Union)) {
          throw new TypeError("union must be a Union");
        }
        if (!Number.isInteger(variant) || 0 > variant) {
          throw new TypeError("variant must be a (non-negative) integer");
        }
        if ("string" === typeof layout && void 0 === property) {
          property = layout;
          layout = null;
        }
        if (layout) {
          if (!(layout instanceof Layout)) {
            throw new TypeError("layout must be a Layout");
          }
          if (null !== union2.defaultLayout && 0 <= layout.span && layout.span > union2.defaultLayout.span) {
            throw new Error("variant span exceeds span of containing union");
          }
          if ("string" !== typeof property) {
            throw new TypeError("variant must have a String property");
          }
        }
        let span = union2.span;
        if (0 > union2.span) {
          span = layout ? layout.span : 0;
          if (0 <= span && union2.usesPrefixDiscriminator) {
            span += union2.discriminator.layout.span;
          }
        }
        super(span, property);
        this.union = union2;
        this.variant = variant;
        this.layout = layout || null;
      }
      /** @override */
      getSpan(b, offset2 = 0) {
        if (0 <= this.span) {
          return this.span;
        }
        let contentOffset = 0;
        if (this.union.usesPrefixDiscriminator) {
          contentOffset = this.union.discriminator.layout.span;
        }
        let span = 0;
        if (this.layout) {
          span = this.layout.getSpan(b, offset2 + contentOffset);
        }
        return contentOffset + span;
      }
      /** @override */
      decode(b, offset2 = 0) {
        const dest = this.makeDestinationObject();
        if (this !== this.union.getVariant(b, offset2)) {
          throw new Error("variant mismatch");
        }
        let contentOffset = 0;
        if (this.union.usesPrefixDiscriminator) {
          contentOffset = this.union.discriminator.layout.span;
        }
        if (this.layout) {
          dest[this.property] = this.layout.decode(b, offset2 + contentOffset);
        } else if (this.property) {
          dest[this.property] = true;
        } else if (this.union.usesPrefixDiscriminator) {
          dest[this.union.discriminator.property] = this.variant;
        }
        return dest;
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        let contentOffset = 0;
        if (this.union.usesPrefixDiscriminator) {
          contentOffset = this.union.discriminator.layout.span;
        }
        if (this.layout && !Object.prototype.hasOwnProperty.call(src, this.property)) {
          throw new TypeError("variant lacks property " + this.property);
        }
        this.union.discriminator.encode(this.variant, b, offset2);
        let span = contentOffset;
        if (this.layout) {
          this.layout.encode(src[this.property], b, offset2 + contentOffset);
          span += this.layout.getSpan(b, offset2 + contentOffset);
          if (0 <= this.union.span && span > this.union.span) {
            throw new Error("encoded variant overruns containing union");
          }
        }
        return span;
      }
      /** Delegate {@link Layout#fromArray|fromArray} to {@link
       * VariantLayout#layout|layout}. */
      fromArray(values) {
        if (this.layout) {
          return this.layout.fromArray(values);
        }
        return void 0;
      }
    };
    exports.VariantLayout = VariantLayout;
    function fixBitwiseResult(v) {
      if (0 > v) {
        v += 4294967296;
      }
      return v;
    }
    var BitStructure = class extends Layout {
      constructor(word, msb, property) {
        if (!(word instanceof UInt || word instanceof UIntBE)) {
          throw new TypeError("word must be a UInt or UIntBE layout");
        }
        if ("string" === typeof msb && void 0 === property) {
          property = msb;
          msb = false;
        }
        if (4 < word.span) {
          throw new RangeError("word cannot exceed 32 bits");
        }
        super(word.span, property);
        this.word = word;
        this.msb = !!msb;
        this.fields = [];
        let value = 0;
        this._packedSetValue = function(v) {
          value = fixBitwiseResult(v);
          return this;
        };
        this._packedGetValue = function() {
          return value;
        };
      }
      /** @override */
      decode(b, offset2 = 0) {
        const dest = this.makeDestinationObject();
        const value = this.word.decode(b, offset2);
        this._packedSetValue(value);
        for (const fd of this.fields) {
          if (void 0 !== fd.property) {
            dest[fd.property] = fd.decode(b);
          }
        }
        return dest;
      }
      /** Implement {@link Layout#encode|encode} for {@link BitStructure}.
       *
       * If `src` is missing a property for a member with a defined {@link
       * Layout#property|property} the corresponding region of the packed
       * value is left unmodified.  Unused bits are also left unmodified. */
      encode(src, b, offset2 = 0) {
        const value = this.word.decode(b, offset2);
        this._packedSetValue(value);
        for (const fd of this.fields) {
          if (void 0 !== fd.property) {
            const fv = src[fd.property];
            if (void 0 !== fv) {
              fd.encode(fv);
            }
          }
        }
        return this.word.encode(this._packedGetValue(), b, offset2);
      }
      /** Register a new bitfield with a containing bit structure.  The
       * resulting bitfield is returned.
       *
       * @param {Number} bits - initializer for {@link BitField#bits|bits}.
       *
       * @param {string} property - initializer for {@link
       * Layout#property|property}.
       *
       * @return {BitField} */
      addField(bits, property) {
        const bf = new BitField(this, bits, property);
        this.fields.push(bf);
        return bf;
      }
      /** As with {@link BitStructure#addField|addField} for single-bit
       * fields with `boolean` value representation.
       *
       * @param {string} property - initializer for {@link
       * Layout#property|property}.
       *
       * @return {Boolean} */
      // `Boolean` conflicts with the native primitive type
      // eslint-disable-next-line @typescript-eslint/ban-types
      addBoolean(property) {
        const bf = new Boolean2(this, property);
        this.fields.push(bf);
        return bf;
      }
      /**
       * Get access to the bit field for a given property.
       *
       * @param {String} property - the bit field of interest.
       *
       * @return {BitField} - the field associated with `property`, or
       * undefined if there is no such property.
       */
      fieldFor(property) {
        if ("string" !== typeof property) {
          throw new TypeError("property must be string");
        }
        for (const fd of this.fields) {
          if (fd.property === property) {
            return fd;
          }
        }
        return void 0;
      }
    };
    exports.BitStructure = BitStructure;
    var BitField = class {
      constructor(container, bits, property) {
        if (!(container instanceof BitStructure)) {
          throw new TypeError("container must be a BitStructure");
        }
        if (!Number.isInteger(bits) || 0 >= bits) {
          throw new TypeError("bits must be positive integer");
        }
        const totalBits = 8 * container.span;
        const usedBits = container.fields.reduce((sum, fd) => sum + fd.bits, 0);
        if (bits + usedBits > totalBits) {
          throw new Error("bits too long for span remainder (" + (totalBits - usedBits) + " of " + totalBits + " remain)");
        }
        this.container = container;
        this.bits = bits;
        this.valueMask = (1 << bits) - 1;
        if (32 === bits) {
          this.valueMask = 4294967295;
        }
        this.start = usedBits;
        if (this.container.msb) {
          this.start = totalBits - usedBits - bits;
        }
        this.wordMask = fixBitwiseResult(this.valueMask << this.start);
        this.property = property;
      }
      /** Store a value into the corresponding subsequence of the containing
       * bit field. */
      decode(b, offset2) {
        const word = this.container._packedGetValue();
        const wordValue = fixBitwiseResult(word & this.wordMask);
        const value = wordValue >>> this.start;
        return value;
      }
      /** Store a value into the corresponding subsequence of the containing
       * bit field.
       *
       * **NOTE** This is not a specialization of {@link
       * Layout#encode|Layout.encode} and there is no return value. */
      encode(value) {
        if ("number" !== typeof value || !Number.isInteger(value) || value !== fixBitwiseResult(value & this.valueMask)) {
          throw new TypeError(nameWithProperty("BitField.encode", this) + " value must be integer not exceeding " + this.valueMask);
        }
        const word = this.container._packedGetValue();
        const wordValue = fixBitwiseResult(value << this.start);
        this.container._packedSetValue(fixBitwiseResult(word & ~this.wordMask) | wordValue);
      }
    };
    exports.BitField = BitField;
    var Boolean2 = class extends BitField {
      constructor(container, property) {
        super(container, 1, property);
      }
      /** Override {@link BitField#decode|decode} for {@link Boolean|Boolean}.
       *
       * @returns {boolean} */
      decode(b, offset2) {
        return !!super.decode(b, offset2);
      }
      /** @override */
      encode(value) {
        if ("boolean" === typeof value) {
          value = +value;
        }
        super.encode(value);
      }
    };
    exports.Boolean = Boolean2;
    var Blob = class extends Layout {
      constructor(length, property) {
        if (!(length instanceof ExternalLayout && length.isCount() || Number.isInteger(length) && 0 <= length)) {
          throw new TypeError("length must be positive integer or an unsigned integer ExternalLayout");
        }
        let span = -1;
        if (!(length instanceof ExternalLayout)) {
          span = length;
        }
        super(span, property);
        this.length = length;
      }
      /** @override */
      getSpan(b, offset2) {
        let span = this.span;
        if (0 > span) {
          span = this.length.decode(b, offset2);
        }
        return span;
      }
      /** @override */
      decode(b, offset2 = 0) {
        let span = this.span;
        if (0 > span) {
          span = this.length.decode(b, offset2);
        }
        return uint8ArrayToBuffer(b).slice(offset2, offset2 + span);
      }
      /** Implement {@link Layout#encode|encode} for {@link Blob}.
       *
       * **NOTE** If {@link Layout#count|count} is an instance of {@link
       * ExternalLayout} then the length of `src` will be encoded as the
       * count after `src` is encoded. */
      encode(src, b, offset2) {
        let span = this.length;
        if (this.length instanceof ExternalLayout) {
          span = src.length;
        }
        if (!(src instanceof Uint8Array && span === src.length)) {
          throw new TypeError(nameWithProperty("Blob.encode", this) + " requires (length " + span + ") Uint8Array as src");
        }
        if (offset2 + span > b.length) {
          throw new RangeError("encoding overruns Uint8Array");
        }
        const srcBuffer = uint8ArrayToBuffer(src);
        uint8ArrayToBuffer(b).write(srcBuffer.toString("hex"), offset2, span, "hex");
        if (this.length instanceof ExternalLayout) {
          this.length.encode(span, b, offset2);
        }
        return span;
      }
    };
    exports.Blob = Blob;
    var CString = class extends Layout {
      constructor(property) {
        super(-1, property);
      }
      /** @override */
      getSpan(b, offset2 = 0) {
        checkUint8Array(b);
        let idx = offset2;
        while (idx < b.length && 0 !== b[idx]) {
          idx += 1;
        }
        return 1 + idx - offset2;
      }
      /** @override */
      decode(b, offset2 = 0) {
        const span = this.getSpan(b, offset2);
        return uint8ArrayToBuffer(b).slice(offset2, offset2 + span - 1).toString("utf-8");
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        if ("string" !== typeof src) {
          src = String(src);
        }
        const srcb = buffer_1.Buffer.from(src, "utf8");
        const span = srcb.length;
        if (offset2 + span > b.length) {
          throw new RangeError("encoding overruns Buffer");
        }
        const buffer = uint8ArrayToBuffer(b);
        srcb.copy(buffer, offset2);
        buffer[offset2 + span] = 0;
        return span + 1;
      }
    };
    exports.CString = CString;
    var UTF8 = class extends Layout {
      constructor(maxSpan, property) {
        if ("string" === typeof maxSpan && void 0 === property) {
          property = maxSpan;
          maxSpan = void 0;
        }
        if (void 0 === maxSpan) {
          maxSpan = -1;
        } else if (!Number.isInteger(maxSpan)) {
          throw new TypeError("maxSpan must be an integer");
        }
        super(-1, property);
        this.maxSpan = maxSpan;
      }
      /** @override */
      getSpan(b, offset2 = 0) {
        checkUint8Array(b);
        return b.length - offset2;
      }
      /** @override */
      decode(b, offset2 = 0) {
        const span = this.getSpan(b, offset2);
        if (0 <= this.maxSpan && this.maxSpan < span) {
          throw new RangeError("text length exceeds maxSpan");
        }
        return uint8ArrayToBuffer(b).slice(offset2, offset2 + span).toString("utf-8");
      }
      /** @override */
      encode(src, b, offset2 = 0) {
        if ("string" !== typeof src) {
          src = String(src);
        }
        const srcb = buffer_1.Buffer.from(src, "utf8");
        const span = srcb.length;
        if (0 <= this.maxSpan && this.maxSpan < span) {
          throw new RangeError("text length exceeds maxSpan");
        }
        if (offset2 + span > b.length) {
          throw new RangeError("encoding overruns Buffer");
        }
        srcb.copy(uint8ArrayToBuffer(b), offset2);
        return span;
      }
    };
    exports.UTF8 = UTF8;
    var Constant = class extends Layout {
      constructor(value, property) {
        super(0, property);
        this.value = value;
      }
      /** @override */
      decode(b, offset2) {
        return this.value;
      }
      /** @override */
      encode(src, b, offset2) {
        return 0;
      }
    };
    exports.Constant = Constant;
    exports.greedy = (elementSpan, property) => new GreedyCount(elementSpan, property);
    exports.offset = (layout, offset2, property) => new OffsetLayout(layout, offset2, property);
    exports.u8 = (property) => new UInt(1, property);
    exports.u16 = (property) => new UInt(2, property);
    exports.u24 = (property) => new UInt(3, property);
    exports.u32 = (property) => new UInt(4, property);
    exports.u40 = (property) => new UInt(5, property);
    exports.u48 = (property) => new UInt(6, property);
    exports.nu64 = (property) => new NearUInt64(property);
    exports.u16be = (property) => new UIntBE(2, property);
    exports.u24be = (property) => new UIntBE(3, property);
    exports.u32be = (property) => new UIntBE(4, property);
    exports.u40be = (property) => new UIntBE(5, property);
    exports.u48be = (property) => new UIntBE(6, property);
    exports.nu64be = (property) => new NearUInt64BE(property);
    exports.s8 = (property) => new Int(1, property);
    exports.s16 = (property) => new Int(2, property);
    exports.s24 = (property) => new Int(3, property);
    exports.s32 = (property) => new Int(4, property);
    exports.s40 = (property) => new Int(5, property);
    exports.s48 = (property) => new Int(6, property);
    exports.ns64 = (property) => new NearInt64(property);
    exports.s16be = (property) => new IntBE(2, property);
    exports.s24be = (property) => new IntBE(3, property);
    exports.s32be = (property) => new IntBE(4, property);
    exports.s40be = (property) => new IntBE(5, property);
    exports.s48be = (property) => new IntBE(6, property);
    exports.ns64be = (property) => new NearInt64BE(property);
    exports.f32 = (property) => new Float(property);
    exports.f32be = (property) => new FloatBE(property);
    exports.f64 = (property) => new Double(property);
    exports.f64be = (property) => new DoubleBE(property);
    exports.struct = (fields, property, decodePrefixes) => new Structure(fields, property, decodePrefixes);
    exports.bits = (word, msb, property) => new BitStructure(word, msb, property);
    exports.seq = (elementLayout, count, property) => new Sequence(elementLayout, count, property);
    exports.union = (discr, defaultLayout, property) => new Union(discr, defaultLayout, property);
    exports.unionLayoutDiscriminator = (layout, property) => new UnionLayoutDiscriminator(layout, property);
    exports.blob = (length, property) => new Blob(length, property);
    exports.cstr = (property) => new CString(property);
    exports.utf8 = (maxSpan, property) => new UTF8(maxSpan, property);
    exports.constant = (value, property) => new Constant(value, property);
  }
});

// node_modules/bigint-buffer/dist/browser.js
var require_browser = __commonJS({
  "node_modules/bigint-buffer/dist/browser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var converter;
    function toBigIntLE2(buf) {
      {
        const reversed = Buffer.from(buf);
        reversed.reverse();
        const hex = reversed.toString("hex");
        if (hex.length === 0) {
          return BigInt(0);
        }
        return BigInt(`0x${hex}`);
      }
      return converter.toBigInt(buf, false);
    }
    exports.toBigIntLE = toBigIntLE2;
    function toBigIntBE(buf) {
      {
        const hex = buf.toString("hex");
        if (hex.length === 0) {
          return BigInt(0);
        }
        return BigInt(`0x${hex}`);
      }
      return converter.toBigInt(buf, true);
    }
    exports.toBigIntBE = toBigIntBE;
    function toBufferLE2(num, width) {
      {
        const hex = num.toString(16);
        const buffer = Buffer.from(hex.padStart(width * 2, "0").slice(0, width * 2), "hex");
        buffer.reverse();
        return buffer;
      }
      return converter.fromBigInt(num, Buffer.allocUnsafe(width), false);
    }
    exports.toBufferLE = toBufferLE2;
    function toBufferBE(num, width) {
      {
        const hex = num.toString(16);
        return Buffer.from(hex.padStart(width * 2, "0").slice(0, width * 2), "hex");
      }
      return converter.fromBigInt(num, Buffer.allocUnsafe(width), true);
    }
    exports.toBufferBE = toBufferBE;
  }
});

// node_modules/uuid/dist/esm-browser/rng.js
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
var getRandomValues, rnds8;
var init_rng = __esm({
  "node_modules/uuid/dist/esm-browser/rng.js"() {
    rnds8 = new Uint8Array(16);
  }
});

// node_modules/uuid/dist/esm-browser/regex.js
var regex_default;
var init_regex = __esm({
  "node_modules/uuid/dist/esm-browser/regex.js"() {
    regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  }
});

// node_modules/uuid/dist/esm-browser/validate.js
function validate2(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default;
var init_validate = __esm({
  "node_modules/uuid/dist/esm-browser/validate.js"() {
    init_regex();
    validate_default = validate2;
  }
});

// node_modules/uuid/dist/esm-browser/stringify.js
function stringify(arr) {
  var offset2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid = (byteToHex[arr[offset2 + 0]] + byteToHex[arr[offset2 + 1]] + byteToHex[arr[offset2 + 2]] + byteToHex[arr[offset2 + 3]] + "-" + byteToHex[arr[offset2 + 4]] + byteToHex[arr[offset2 + 5]] + "-" + byteToHex[arr[offset2 + 6]] + byteToHex[arr[offset2 + 7]] + "-" + byteToHex[arr[offset2 + 8]] + byteToHex[arr[offset2 + 9]] + "-" + byteToHex[arr[offset2 + 10]] + byteToHex[arr[offset2 + 11]] + byteToHex[arr[offset2 + 12]] + byteToHex[arr[offset2 + 13]] + byteToHex[arr[offset2 + 14]] + byteToHex[arr[offset2 + 15]]).toLowerCase();
  if (!validate_default(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var byteToHex, i, stringify_default;
var init_stringify = __esm({
  "node_modules/uuid/dist/esm-browser/stringify.js"() {
    init_validate();
    byteToHex = [];
    for (i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).substr(1));
    }
    stringify_default = stringify;
  }
});

// node_modules/uuid/dist/esm-browser/v1.js
function v1(options, buf, offset2) {
  var i = buf && offset2 || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || rng)();
    if (node == null) {
      node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
    }
  }
  var msecs = options.msecs !== void 0 ? options.msecs : Date.now();
  var nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
  if (dt < 0 && options.clockseq === void 0) {
    clockseq = clockseq + 1 & 16383;
  }
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
    nsecs = 0;
  }
  if (nsecs >= 1e4) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;
  msecs += 122192928e5;
  var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
  b[i++] = tl >>> 24 & 255;
  b[i++] = tl >>> 16 & 255;
  b[i++] = tl >>> 8 & 255;
  b[i++] = tl & 255;
  var tmh = msecs / 4294967296 * 1e4 & 268435455;
  b[i++] = tmh >>> 8 & 255;
  b[i++] = tmh & 255;
  b[i++] = tmh >>> 24 & 15 | 16;
  b[i++] = tmh >>> 16 & 255;
  b[i++] = clockseq >>> 8 | 128;
  b[i++] = clockseq & 255;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || stringify_default(b);
}
var _nodeId, _clockseq, _lastMSecs, _lastNSecs, v1_default;
var init_v1 = __esm({
  "node_modules/uuid/dist/esm-browser/v1.js"() {
    init_rng();
    init_stringify();
    _lastMSecs = 0;
    _lastNSecs = 0;
    v1_default = v1;
  }
});

// node_modules/uuid/dist/esm-browser/parse.js
function parse(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  var v;
  var arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}
var parse_default;
var init_parse = __esm({
  "node_modules/uuid/dist/esm-browser/parse.js"() {
    init_validate();
    parse_default = parse;
  }
});

// node_modules/uuid/dist/esm-browser/v35.js
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  var bytes2 = [];
  for (var i = 0; i < str.length; ++i) {
    bytes2.push(str.charCodeAt(i));
  }
  return bytes2;
}
function v35_default(name, version2, hashfunc) {
  function generateUUID(value, namespace, buf, offset2) {
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace === "string") {
      namespace = parse_default(namespace);
    }
    if (namespace.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    var bytes2 = new Uint8Array(16 + value.length);
    bytes2.set(namespace);
    bytes2.set(value, namespace.length);
    bytes2 = hashfunc(bytes2);
    bytes2[6] = bytes2[6] & 15 | version2;
    bytes2[8] = bytes2[8] & 63 | 128;
    if (buf) {
      offset2 = offset2 || 0;
      for (var i = 0; i < 16; ++i) {
        buf[offset2 + i] = bytes2[i];
      }
      return buf;
    }
    return stringify_default(bytes2);
  }
  try {
    generateUUID.name = name;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}
var DNS, URL;
var init_v35 = __esm({
  "node_modules/uuid/dist/esm-browser/v35.js"() {
    init_stringify();
    init_parse();
    DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  }
});

// node_modules/uuid/dist/esm-browser/md5.js
function md5(bytes2) {
  if (typeof bytes2 === "string") {
    var msg = unescape(encodeURIComponent(bytes2));
    bytes2 = new Uint8Array(msg.length);
    for (var i = 0; i < msg.length; ++i) {
      bytes2[i] = msg.charCodeAt(i);
    }
  }
  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes2), bytes2.length * 8));
}
function md5ToHexEncodedArray(input) {
  var output2 = [];
  var length32 = input.length * 32;
  var hexTab = "0123456789abcdef";
  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 255;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15), 16);
    output2.push(hex);
  }
  return output2;
}
function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
function wordsToMd5(x, len) {
  x[len >> 5] |= 128 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}
function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }
  var length8 = input.length * 8;
  var output2 = new Uint32Array(getOutputLength(length8));
  for (var i = 0; i < length8; i += 8) {
    output2[i >> 5] |= (input[i / 8] & 255) << i % 32;
  }
  return output2;
}
function safeAdd(x, y) {
  var lsw = (x & 65535) + (y & 65535);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 65535;
}
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
var md5_default;
var init_md5 = __esm({
  "node_modules/uuid/dist/esm-browser/md5.js"() {
    md5_default = md5;
  }
});

// node_modules/uuid/dist/esm-browser/v3.js
var v3, v3_default;
var init_v3 = __esm({
  "node_modules/uuid/dist/esm-browser/v3.js"() {
    init_v35();
    init_md5();
    v3 = v35_default("v3", 48, md5_default);
    v3_default = v3;
  }
});

// node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset2) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset2 = offset2 || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset2 + i] = rnds[i];
    }
    return buf;
  }
  return stringify_default(rnds);
}
var v4_default;
var init_v4 = __esm({
  "node_modules/uuid/dist/esm-browser/v4.js"() {
    init_rng();
    init_stringify();
    v4_default = v4;
  }
});

// node_modules/uuid/dist/esm-browser/sha1.js
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;
    case 1:
      return x ^ y ^ z;
    case 2:
      return x & y ^ x & z ^ y & z;
    case 3:
      return x ^ y ^ z;
  }
}
function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}
function sha1(bytes2) {
  var K = [1518500249, 1859775393, 2400959708, 3395469782];
  var H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof bytes2 === "string") {
    var msg = unescape(encodeURIComponent(bytes2));
    bytes2 = [];
    for (var i = 0; i < msg.length; ++i) {
      bytes2.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes2)) {
    bytes2 = Array.prototype.slice.call(bytes2);
  }
  bytes2.push(128);
  var l = bytes2.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);
  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);
    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes2[_i * 64 + j * 4] << 24 | bytes2[_i * 64 + j * 4 + 1] << 16 | bytes2[_i * 64 + j * 4 + 2] << 8 | bytes2[_i * 64 + j * 4 + 3];
    }
    M[_i] = arr;
  }
  M[N - 1][14] = (bytes2.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes2.length - 1) * 8 & 4294967295;
  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);
    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }
    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }
    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];
    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }
    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }
  return [H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, H[0] & 255, H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, H[1] & 255, H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, H[2] & 255, H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, H[3] & 255, H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, H[4] & 255];
}
var sha1_default;
var init_sha1 = __esm({
  "node_modules/uuid/dist/esm-browser/sha1.js"() {
    sha1_default = sha1;
  }
});

// node_modules/uuid/dist/esm-browser/v5.js
var v5, v5_default;
var init_v5 = __esm({
  "node_modules/uuid/dist/esm-browser/v5.js"() {
    init_v35();
    init_sha1();
    v5 = v35_default("v5", 80, sha1_default);
    v5_default = v5;
  }
});

// node_modules/uuid/dist/esm-browser/nil.js
var nil_default;
var init_nil = __esm({
  "node_modules/uuid/dist/esm-browser/nil.js"() {
    nil_default = "00000000-0000-0000-0000-000000000000";
  }
});

// node_modules/uuid/dist/esm-browser/version.js
function version(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  return parseInt(uuid.substr(14, 1), 16);
}
var version_default;
var init_version = __esm({
  "node_modules/uuid/dist/esm-browser/version.js"() {
    init_validate();
    version_default = version;
  }
});

// node_modules/uuid/dist/esm-browser/index.js
var esm_browser_exports = {};
__export(esm_browser_exports, {
  NIL: () => nil_default,
  parse: () => parse_default,
  stringify: () => stringify_default,
  v1: () => v1_default,
  v3: () => v3_default,
  v4: () => v4_default,
  v5: () => v5_default,
  validate: () => validate_default,
  version: () => version_default
});
var init_esm_browser = __esm({
  "node_modules/uuid/dist/esm-browser/index.js"() {
    init_v1();
    init_v3();
    init_v4();
    init_v5();
    init_nil();
    init_version();
    init_validate();
    init_stringify();
    init_parse();
  }
});

// node_modules/jayson/lib/generateRequest.js
var require_generateRequest = __commonJS({
  "node_modules/jayson/lib/generateRequest.js"(exports, module) {
    "use strict";
    var uuid = (init_esm_browser(), __toCommonJS(esm_browser_exports)).v4;
    var generateRequest = function(method, params, id, options) {
      if (typeof method !== "string") {
        throw new TypeError(method + " must be a string");
      }
      options = options || {};
      const version2 = typeof options.version === "number" ? options.version : 2;
      if (version2 !== 1 && version2 !== 2) {
        throw new TypeError(version2 + " must be 1 or 2");
      }
      const request = {
        method
      };
      if (version2 === 2) {
        request.jsonrpc = "2.0";
      }
      if (params) {
        if (typeof params !== "object" && !Array.isArray(params)) {
          throw new TypeError(params + " must be an object, array or omitted");
        }
        request.params = params;
      }
      if (typeof id === "undefined") {
        const generator = typeof options.generator === "function" ? options.generator : function() {
          return uuid();
        };
        request.id = generator(request, options);
      } else if (version2 === 2 && id === null) {
        if (options.notificationIdNull) {
          request.id = null;
        }
      } else {
        request.id = id;
      }
      return request;
    };
    module.exports = generateRequest;
  }
});

// node_modules/jayson/lib/client/browser/index.js
var require_browser2 = __commonJS({
  "node_modules/jayson/lib/client/browser/index.js"(exports, module) {
    "use strict";
    var uuid = (init_esm_browser(), __toCommonJS(esm_browser_exports)).v4;
    var generateRequest = require_generateRequest();
    var ClientBrowser = function(callServer, options) {
      if (!(this instanceof ClientBrowser)) {
        return new ClientBrowser(callServer, options);
      }
      if (!options) {
        options = {};
      }
      this.options = {
        reviver: typeof options.reviver !== "undefined" ? options.reviver : null,
        replacer: typeof options.replacer !== "undefined" ? options.replacer : null,
        generator: typeof options.generator !== "undefined" ? options.generator : function() {
          return uuid();
        },
        version: typeof options.version !== "undefined" ? options.version : 2,
        notificationIdNull: typeof options.notificationIdNull === "boolean" ? options.notificationIdNull : false
      };
      this.callServer = callServer;
    };
    module.exports = ClientBrowser;
    ClientBrowser.prototype.request = function(method, params, id, callback) {
      const self = this;
      let request = null;
      const isBatch = Array.isArray(method) && typeof params === "function";
      if (this.options.version === 1 && isBatch) {
        throw new TypeError("JSON-RPC 1.0 does not support batching");
      }
      const isRaw = !isBatch && method && typeof method === "object" && typeof params === "function";
      if (isBatch || isRaw) {
        callback = params;
        request = method;
      } else {
        if (typeof id === "function") {
          callback = id;
          id = void 0;
        }
        const hasCallback = typeof callback === "function";
        try {
          request = generateRequest(method, params, id, {
            generator: this.options.generator,
            version: this.options.version,
            notificationIdNull: this.options.notificationIdNull
          });
        } catch (err) {
          if (hasCallback) {
            return callback(err);
          }
          throw err;
        }
        if (!hasCallback) {
          return request;
        }
      }
      let message;
      try {
        message = JSON.stringify(request, this.options.replacer);
      } catch (err) {
        return callback(err);
      }
      this.callServer(message, function(err, response) {
        self._parseResponse(err, response, callback);
      });
      return request;
    };
    ClientBrowser.prototype._parseResponse = function(err, responseText, callback) {
      if (err) {
        callback(err);
        return;
      }
      if (!responseText) {
        return callback();
      }
      let response;
      try {
        response = JSON.parse(responseText, this.options.reviver);
      } catch (err2) {
        return callback(err2);
      }
      if (callback.length === 3) {
        if (Array.isArray(response)) {
          const isError = function(res) {
            return typeof res.error !== "undefined";
          };
          const isNotError = function(res) {
            return !isError(res);
          };
          return callback(null, response.filter(isError), response.filter(isNotError));
        } else {
          return callback(null, response.error, response.result);
        }
      }
      callback(null, response);
    };
  }
});

// node_modules/@babel/runtime/helpers/interopRequireDefault.js
var require_interopRequireDefault = __commonJS({
  "node_modules/@babel/runtime/helpers/interopRequireDefault.js"(exports, module) {
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/asyncToGenerator.js
var require_asyncToGenerator = __commonJS({
  "node_modules/@babel/runtime/helpers/asyncToGenerator.js"(exports, module) {
    function asyncGeneratorStep2(gen2, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen2[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator2(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen2 = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep2(gen2, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep2(gen2, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    module.exports = _asyncToGenerator2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/classCallCheck.js
var require_classCallCheck = __commonJS({
  "node_modules/@babel/runtime/helpers/classCallCheck.js"(exports, module) {
    function _classCallCheck2(instance2, Constructor) {
      if (!(instance2 instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    module.exports = _classCallCheck2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/toPrimitive.js
var require_toPrimitive = __commonJS({
  "node_modules/@babel/runtime/helpers/toPrimitive.js"(exports, module) {
    var _typeof2 = require_typeof()["default"];
    function _toPrimitive2(input, hint) {
      if (_typeof2(input) !== "object" || input === null)
        return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== void 0) {
        var res = prim.call(input, hint || "default");
        if (_typeof2(res) !== "object")
          return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    module.exports = _toPrimitive2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/toPropertyKey.js
var require_toPropertyKey = __commonJS({
  "node_modules/@babel/runtime/helpers/toPropertyKey.js"(exports, module) {
    var _typeof2 = require_typeof()["default"];
    var toPrimitive = require_toPrimitive();
    function _toPropertyKey2(arg) {
      var key = toPrimitive(arg, "string");
      return _typeof2(key) === "symbol" ? key : String(key);
    }
    module.exports = _toPropertyKey2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/createClass.js
var require_createClass = __commonJS({
  "node_modules/@babel/runtime/helpers/createClass.js"(exports, module) {
    var toPropertyKey = require_toPropertyKey();
    function _defineProperties2(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass2(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties2(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties2(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
      return Constructor;
    }
    module.exports = _createClass2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/setPrototypeOf.js
var require_setPrototypeOf = __commonJS({
  "node_modules/@babel/runtime/helpers/setPrototypeOf.js"(exports, module) {
    function _setPrototypeOf2(o, p) {
      module.exports = _setPrototypeOf2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf3(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports;
      return _setPrototypeOf2(o, p);
    }
    module.exports = _setPrototypeOf2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/inherits.js
var require_inherits = __commonJS({
  "node_modules/@babel/runtime/helpers/inherits.js"(exports, module) {
    var setPrototypeOf = require_setPrototypeOf();
    function _inherits2(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      Object.defineProperty(subClass, "prototype", {
        writable: false
      });
      if (superClass)
        setPrototypeOf(subClass, superClass);
    }
    module.exports = _inherits2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/assertThisInitialized.js
var require_assertThisInitialized = __commonJS({
  "node_modules/@babel/runtime/helpers/assertThisInitialized.js"(exports, module) {
    function _assertThisInitialized2(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    module.exports = _assertThisInitialized2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var require_possibleConstructorReturn = __commonJS({
  "node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"(exports, module) {
    var _typeof2 = require_typeof()["default"];
    var assertThisInitialized = require_assertThisInitialized();
    function _possibleConstructorReturn2(self, call) {
      if (call && (_typeof2(call) === "object" || typeof call === "function")) {
        return call;
      } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
      }
      return assertThisInitialized(self);
    }
    module.exports = _possibleConstructorReturn2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/getPrototypeOf.js
var require_getPrototypeOf = __commonJS({
  "node_modules/@babel/runtime/helpers/getPrototypeOf.js"(exports, module) {
    function _getPrototypeOf2(o) {
      module.exports = _getPrototypeOf2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf3(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      }, module.exports.__esModule = true, module.exports["default"] = module.exports;
      return _getPrototypeOf2(o);
    }
    module.exports = _getPrototypeOf2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__)
        prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
      else
        emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0)
        emitter._events = new Events();
      else
        delete emitter._events[evt];
    }
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0)
        return names;
      for (name in events = this._events) {
        if (has.call(events, name))
          names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else
          clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt])
          clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    EventEmitter.prefixed = prefix;
    EventEmitter.EventEmitter = EventEmitter;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter;
    }
  }
});

// node_modules/rpc-websockets/dist/lib/client.js
var require_client = __commonJS({
  "node_modules/rpc-websockets/dist/lib/client.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _regenerator = _interopRequireDefault(require_regenerator());
    var _asyncToGenerator2 = _interopRequireDefault(require_asyncToGenerator());
    var _typeof2 = _interopRequireDefault(require_typeof());
    var _classCallCheck2 = _interopRequireDefault(require_classCallCheck());
    var _createClass2 = _interopRequireDefault(require_createClass());
    var _inherits2 = _interopRequireDefault(require_inherits());
    var _possibleConstructorReturn2 = _interopRequireDefault(require_possibleConstructorReturn());
    var _getPrototypeOf2 = _interopRequireDefault(require_getPrototypeOf());
    var _eventemitter = require_eventemitter3();
    function _createSuper2(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct3();
      return function _createSuperInternal() {
        var Super = (0, _getPrototypeOf2["default"])(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return (0, _possibleConstructorReturn2["default"])(this, result);
      };
    }
    function _isNativeReflectConstruct3() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    var __rest = function(s, e) {
      var t = {};
      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      }
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    var CommonClient = /* @__PURE__ */ function(_EventEmitter) {
      (0, _inherits2["default"])(CommonClient2, _EventEmitter);
      var _super = _createSuper2(CommonClient2);
      function CommonClient2(webSocketFactory) {
        var _this;
        var address = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "ws://localhost:8080";
        var _a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var generate_request_id = arguments.length > 3 ? arguments[3] : void 0;
        (0, _classCallCheck2["default"])(this, CommonClient2);
        var _a$autoconnect = _a.autoconnect, autoconnect = _a$autoconnect === void 0 ? true : _a$autoconnect, _a$reconnect = _a.reconnect, reconnect = _a$reconnect === void 0 ? true : _a$reconnect, _a$reconnect_interval = _a.reconnect_interval, reconnect_interval = _a$reconnect_interval === void 0 ? 1e3 : _a$reconnect_interval, _a$max_reconnects = _a.max_reconnects, max_reconnects = _a$max_reconnects === void 0 ? 5 : _a$max_reconnects, rest_options = __rest(_a, ["autoconnect", "reconnect", "reconnect_interval", "max_reconnects"]);
        _this = _super.call(this);
        _this.webSocketFactory = webSocketFactory;
        _this.queue = {};
        _this.rpc_id = 0;
        _this.address = address;
        _this.autoconnect = autoconnect;
        _this.ready = false;
        _this.reconnect = reconnect;
        _this.reconnect_timer_id = void 0;
        _this.reconnect_interval = reconnect_interval;
        _this.max_reconnects = max_reconnects;
        _this.rest_options = rest_options;
        _this.current_reconnects = 0;
        _this.generate_request_id = generate_request_id || function() {
          return ++_this.rpc_id;
        };
        if (_this.autoconnect)
          _this._connect(_this.address, Object.assign({
            autoconnect: _this.autoconnect,
            reconnect: _this.reconnect,
            reconnect_interval: _this.reconnect_interval,
            max_reconnects: _this.max_reconnects
          }, _this.rest_options));
        return _this;
      }
      (0, _createClass2["default"])(CommonClient2, [{
        key: "connect",
        value: function connect() {
          if (this.socket)
            return;
          this._connect(this.address, Object.assign({
            autoconnect: this.autoconnect,
            reconnect: this.reconnect,
            reconnect_interval: this.reconnect_interval,
            max_reconnects: this.max_reconnects
          }, this.rest_options));
        }
        /**
         * Calls a registered RPC method on server.
         * @method
         * @param {String} method - RPC method name
         * @param {Object|Array} params - optional method parameters
         * @param {Number} timeout - RPC reply timeout value
         * @param {Object} ws_opts - options passed to ws
         * @return {Promise}
         */
      }, {
        key: "call",
        value: function call(method, params, timeout, ws_opts) {
          var _this2 = this;
          if (!ws_opts && "object" === (0, _typeof2["default"])(timeout)) {
            ws_opts = timeout;
            timeout = null;
          }
          return new Promise(function(resolve, reject) {
            if (!_this2.ready)
              return reject(new Error("socket not ready"));
            var rpc_id = _this2.generate_request_id(method, params);
            var message = {
              jsonrpc: "2.0",
              method,
              params: params || null,
              id: rpc_id
            };
            _this2.socket.send(JSON.stringify(message), ws_opts, function(error) {
              if (error)
                return reject(error);
              _this2.queue[rpc_id] = {
                promise: [resolve, reject]
              };
              if (timeout) {
                _this2.queue[rpc_id].timeout = setTimeout(function() {
                  delete _this2.queue[rpc_id];
                  reject(new Error("reply timeout"));
                }, timeout);
              }
            });
          });
        }
        /**
         * Logins with the other side of the connection.
         * @method
         * @param {Object} params - Login credentials object
         * @return {Promise}
         */
      }, {
        key: "login",
        value: function() {
          var _login = (0, _asyncToGenerator2["default"])(/* @__PURE__ */ _regenerator["default"].mark(function _callee(params) {
            var resp;
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return this.call("rpc.login", params);
                  case 2:
                    resp = _context.sent;
                    if (resp) {
                      _context.next = 5;
                      break;
                    }
                    throw new Error("authentication failed");
                  case 5:
                    return _context.abrupt("return", resp);
                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
          function login(_x) {
            return _login.apply(this, arguments);
          }
          return login;
        }()
        /**
         * Fetches a list of client's methods registered on server.
         * @method
         * @return {Array}
         */
      }, {
        key: "listMethods",
        value: function() {
          var _listMethods = (0, _asyncToGenerator2["default"])(/* @__PURE__ */ _regenerator["default"].mark(function _callee2() {
            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return this.call("__listMethods");
                  case 2:
                    return _context2.abrupt("return", _context2.sent);
                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));
          function listMethods() {
            return _listMethods.apply(this, arguments);
          }
          return listMethods;
        }()
        /**
         * Sends a JSON-RPC 2.0 notification to server.
         * @method
         * @param {String} method - RPC method name
         * @param {Object} params - optional method parameters
         * @return {Promise}
         */
      }, {
        key: "notify",
        value: function notify(method, params) {
          var _this3 = this;
          return new Promise(function(resolve, reject) {
            if (!_this3.ready)
              return reject(new Error("socket not ready"));
            var message = {
              jsonrpc: "2.0",
              method,
              params: params || null
            };
            _this3.socket.send(JSON.stringify(message), function(error) {
              if (error)
                return reject(error);
              resolve();
            });
          });
        }
        /**
         * Subscribes for a defined event.
         * @method
         * @param {String|Array} event - event name
         * @return {Undefined}
         * @throws {Error}
         */
      }, {
        key: "subscribe",
        value: function() {
          var _subscribe = (0, _asyncToGenerator2["default"])(/* @__PURE__ */ _regenerator["default"].mark(function _callee3(event) {
            var result;
            return _regenerator["default"].wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (typeof event === "string")
                      event = [event];
                    _context3.next = 3;
                    return this.call("rpc.on", event);
                  case 3:
                    result = _context3.sent;
                    if (!(typeof event === "string" && result[event] !== "ok")) {
                      _context3.next = 6;
                      break;
                    }
                    throw new Error("Failed subscribing to an event '" + event + "' with: " + result[event]);
                  case 6:
                    return _context3.abrupt("return", result);
                  case 7:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));
          function subscribe(_x2) {
            return _subscribe.apply(this, arguments);
          }
          return subscribe;
        }()
        /**
         * Unsubscribes from a defined event.
         * @method
         * @param {String|Array} event - event name
         * @return {Undefined}
         * @throws {Error}
         */
      }, {
        key: "unsubscribe",
        value: function() {
          var _unsubscribe = (0, _asyncToGenerator2["default"])(/* @__PURE__ */ _regenerator["default"].mark(function _callee4(event) {
            var result;
            return _regenerator["default"].wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (typeof event === "string")
                      event = [event];
                    _context4.next = 3;
                    return this.call("rpc.off", event);
                  case 3:
                    result = _context4.sent;
                    if (!(typeof event === "string" && result[event] !== "ok")) {
                      _context4.next = 6;
                      break;
                    }
                    throw new Error("Failed unsubscribing from an event with: " + result);
                  case 6:
                    return _context4.abrupt("return", result);
                  case 7:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));
          function unsubscribe(_x3) {
            return _unsubscribe.apply(this, arguments);
          }
          return unsubscribe;
        }()
        /**
         * Closes a WebSocket connection gracefully.
         * @method
         * @param {Number} code - socket close code
         * @param {String} data - optional data to be sent before closing
         * @return {Undefined}
         */
      }, {
        key: "close",
        value: function close(code, data) {
          this.socket.close(code || 1e3, data);
        }
        /**
         * Connection/Message handler.
         * @method
         * @private
         * @param {String} address - WebSocket API address
         * @param {Object} options - ws options object
         * @return {Undefined}
         */
      }, {
        key: "_connect",
        value: function _connect(address, options) {
          var _this4 = this;
          clearTimeout(this.reconnect_timer_id);
          this.socket = this.webSocketFactory(address, options);
          this.socket.addEventListener("open", function() {
            _this4.ready = true;
            _this4.emit("open");
            _this4.current_reconnects = 0;
          });
          this.socket.addEventListener("message", function(_ref) {
            var message = _ref.data;
            if (message instanceof ArrayBuffer)
              message = Buffer.from(message).toString();
            try {
              message = JSON.parse(message);
            } catch (error) {
              return;
            }
            if (message.notification && _this4.listeners(message.notification).length) {
              if (!Object.keys(message.params).length)
                return _this4.emit(message.notification);
              var args = [message.notification];
              if (message.params.constructor === Object)
                args.push(message.params);
              else
                for (var i = 0; i < message.params.length; i++) {
                  args.push(message.params[i]);
                }
              return Promise.resolve().then(function() {
                _this4.emit.apply(_this4, args);
              });
            }
            if (!_this4.queue[message.id]) {
              if (message.method && message.params) {
                return Promise.resolve().then(function() {
                  _this4.emit(message.method, message.params);
                });
              }
              return;
            }
            if ("error" in message === "result" in message)
              _this4.queue[message.id].promise[1](new Error('Server response malformed. Response must include either "result" or "error", but not both.'));
            if (_this4.queue[message.id].timeout)
              clearTimeout(_this4.queue[message.id].timeout);
            if (message.error)
              _this4.queue[message.id].promise[1](message.error);
            else
              _this4.queue[message.id].promise[0](message.result);
            delete _this4.queue[message.id];
          });
          this.socket.addEventListener("error", function(error) {
            return _this4.emit("error", error);
          });
          this.socket.addEventListener("close", function(_ref2) {
            var code = _ref2.code, reason = _ref2.reason;
            if (_this4.ready)
              setTimeout(function() {
                return _this4.emit("close", code, reason);
              }, 0);
            _this4.ready = false;
            _this4.socket = void 0;
            if (code === 1e3)
              return;
            _this4.current_reconnects++;
            if (_this4.reconnect && (_this4.max_reconnects > _this4.current_reconnects || _this4.max_reconnects === 0))
              _this4.reconnect_timer_id = setTimeout(function() {
                return _this4._connect(address, options);
              }, _this4.reconnect_interval);
          });
        }
      }]);
      return CommonClient2;
    }(_eventemitter.EventEmitter);
    exports["default"] = CommonClient;
  }
});

// node_modules/rpc-websockets/dist/lib/client/websocket.browser.js
var require_websocket_browser = __commonJS({
  "node_modules/rpc-websockets/dist/lib/client/websocket.browser.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = _default;
    var _classCallCheck2 = _interopRequireDefault(require_classCallCheck());
    var _createClass2 = _interopRequireDefault(require_createClass());
    var _inherits2 = _interopRequireDefault(require_inherits());
    var _possibleConstructorReturn2 = _interopRequireDefault(require_possibleConstructorReturn());
    var _getPrototypeOf2 = _interopRequireDefault(require_getPrototypeOf());
    var _eventemitter = require_eventemitter3();
    function _createSuper2(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct3();
      return function _createSuperInternal() {
        var Super = (0, _getPrototypeOf2["default"])(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return (0, _possibleConstructorReturn2["default"])(this, result);
      };
    }
    function _isNativeReflectConstruct3() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    var WebSocketBrowserImpl = /* @__PURE__ */ function(_EventEmitter) {
      (0, _inherits2["default"])(WebSocketBrowserImpl2, _EventEmitter);
      var _super = _createSuper2(WebSocketBrowserImpl2);
      function WebSocketBrowserImpl2(address, options, protocols) {
        var _this;
        (0, _classCallCheck2["default"])(this, WebSocketBrowserImpl2);
        _this = _super.call(this);
        _this.socket = new window.WebSocket(address, protocols);
        _this.socket.onopen = function() {
          return _this.emit("open");
        };
        _this.socket.onmessage = function(event) {
          return _this.emit("message", event.data);
        };
        _this.socket.onerror = function(error) {
          return _this.emit("error", error);
        };
        _this.socket.onclose = function(event) {
          _this.emit("close", event.code, event.reason);
        };
        return _this;
      }
      (0, _createClass2["default"])(WebSocketBrowserImpl2, [{
        key: "send",
        value: function send(data, optionsOrCallback, callback) {
          var cb = callback || optionsOrCallback;
          try {
            this.socket.send(data);
            cb();
          } catch (error) {
            cb(error);
          }
        }
        /**
         * Closes an underlying socket
         * @method
         * @param {Number} code - status code explaining why the connection is being closed
         * @param {String} reason - a description why the connection is closing
         * @return {Undefined}
         * @throws {Error}
         */
      }, {
        key: "close",
        value: function close(code, reason) {
          this.socket.close(code, reason);
        }
      }, {
        key: "addEventListener",
        value: function addEventListener(type2, listener, options) {
          this.socket.addEventListener(type2, listener, options);
        }
      }]);
      return WebSocketBrowserImpl2;
    }(_eventemitter.EventEmitter);
    function _default(address, options) {
      return new WebSocketBrowserImpl(address, options);
    }
  }
});

// node_modules/base-x/src/index.js
var require_src3 = __commonJS({
  "node_modules/base-x/src/index.js"(exports, module) {
    "use strict";
    function base(ALPHABET) {
      if (ALPHABET.length >= 255) {
        throw new TypeError("Alphabet too long");
      }
      var BASE_MAP = new Uint8Array(256);
      for (var j = 0; j < BASE_MAP.length; j++) {
        BASE_MAP[j] = 255;
      }
      for (var i = 0; i < ALPHABET.length; i++) {
        var x = ALPHABET.charAt(i);
        var xc = x.charCodeAt(0);
        if (BASE_MAP[xc] !== 255) {
          throw new TypeError(x + " is ambiguous");
        }
        BASE_MAP[xc] = i;
      }
      var BASE = ALPHABET.length;
      var LEADER = ALPHABET.charAt(0);
      var FACTOR = Math.log(BASE) / Math.log(256);
      var iFACTOR = Math.log(256) / Math.log(BASE);
      function encode(source) {
        if (source instanceof Uint8Array) {
        } else if (ArrayBuffer.isView(source)) {
          source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
        } else if (Array.isArray(source)) {
          source = Uint8Array.from(source);
        }
        if (!(source instanceof Uint8Array)) {
          throw new TypeError("Expected Uint8Array");
        }
        if (source.length === 0) {
          return "";
        }
        var zeroes = 0;
        var length = 0;
        var pbegin = 0;
        var pend = source.length;
        while (pbegin !== pend && source[pbegin] === 0) {
          pbegin++;
          zeroes++;
        }
        var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
        var b58 = new Uint8Array(size);
        while (pbegin !== pend) {
          var carry = source[pbegin];
          var i2 = 0;
          for (var it1 = size - 1; (carry !== 0 || i2 < length) && it1 !== -1; it1--, i2++) {
            carry += 256 * b58[it1] >>> 0;
            b58[it1] = carry % BASE >>> 0;
            carry = carry / BASE >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length = i2;
          pbegin++;
        }
        var it2 = size - length;
        while (it2 !== size && b58[it2] === 0) {
          it2++;
        }
        var str = LEADER.repeat(zeroes);
        for (; it2 < size; ++it2) {
          str += ALPHABET.charAt(b58[it2]);
        }
        return str;
      }
      function decodeUnsafe(source) {
        if (typeof source !== "string") {
          throw new TypeError("Expected String");
        }
        if (source.length === 0) {
          return new Uint8Array();
        }
        var psz = 0;
        var zeroes = 0;
        var length = 0;
        while (source[psz] === LEADER) {
          zeroes++;
          psz++;
        }
        var size = (source.length - psz) * FACTOR + 1 >>> 0;
        var b256 = new Uint8Array(size);
        while (source[psz]) {
          var carry = BASE_MAP[source.charCodeAt(psz)];
          if (carry === 255) {
            return;
          }
          var i2 = 0;
          for (var it3 = size - 1; (carry !== 0 || i2 < length) && it3 !== -1; it3--, i2++) {
            carry += BASE * b256[it3] >>> 0;
            b256[it3] = carry % 256 >>> 0;
            carry = carry / 256 >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length = i2;
          psz++;
        }
        var it4 = size - length;
        while (it4 !== size && b256[it4] === 0) {
          it4++;
        }
        var vch = new Uint8Array(zeroes + (size - it4));
        var j2 = zeroes;
        while (it4 !== size) {
          vch[j2++] = b256[it4++];
        }
        return vch;
      }
      function decode(string2) {
        var buffer = decodeUnsafe(string2);
        if (buffer) {
          return buffer;
        }
        throw new Error("Non-base" + BASE + " character");
      }
      return {
        encode,
        decodeUnsafe,
        decode
      };
    }
    module.exports = base;
  }
});

// node_modules/bs58/index.js
var require_bs583 = __commonJS({
  "node_modules/bs58/index.js"(exports, module) {
    var basex = require_src3();
    var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    module.exports = basex(ALPHABET);
  }
});

// node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance2, Constructor) {
  if (!(instance2 instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}

// node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

// node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

// node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

// node_modules/@solana/web3.js/lib/index.browser.esm.js
var import_buffer = __toESM(require_buffer());

// node_modules/@noble/hashes/esm/_assert.js
function number(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`Wrong positive integer: ${n}`);
}
function bytes(b, ...lengths) {
  if (!(b instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
}
function hash(hash2) {
  if (typeof hash2 !== "function" || typeof hash2.create !== "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  number(hash2.outputLen);
  number(hash2.blockLen);
}
function exists(instance2, checkFinished = true) {
  if (instance2.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance2.finished)
    throw new Error("Hash#digest() has already been called");
}
function output(out, instance2) {
  bytes(out);
  const min = instance2.outputLen;
  if (out.length < min) {
    throw new Error(`digestInto() expects output buffer of length at least ${min}`);
  }
}

// node_modules/@noble/hashes/esm/crypto.js
var crypto2 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;

// node_modules/@noble/hashes/esm/utils.js
var u8a = (a) => a instanceof Uint8Array;
var u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
var rotr = (word, shift) => word << 32 - shift | word >>> shift;
var isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!isLE)
  throw new Error("Non little-endian hardware is not supported");
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  if (!u8a(data))
    throw new Error(`expected Uint8Array, got ${typeof data}`);
  return data;
}
function concatBytes(...arrays) {
  const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
  let pad = 0;
  arrays.forEach((a) => {
    if (!u8a(a))
      throw new Error("Uint8Array expected");
    r.set(a, pad);
    pad += a.length;
  });
  return r;
}
var Hash = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
var toStr = {}.toString;
function wrapConstructor(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function wrapXOFConstructorWithOpts(hashCons) {
  const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
  const tmp = hashCons({});
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (opts) => hashCons(opts);
  return hashC;
}
function randomBytes(bytesLength = 32) {
  if (crypto2 && typeof crypto2.getRandomValues === "function") {
    return crypto2.getRandomValues(new Uint8Array(bytesLength));
  }
  throw new Error("crypto.getRandomValues must be defined");
}

// node_modules/@noble/hashes/esm/_sha2.js
function setBigUint64(view, byteOffset, value, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE2);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE2 ? 4 : 0;
  const l = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h, wh, isLE2);
  view.setUint32(byteOffset + l, wl, isLE2);
}
var SHA2 = class extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE2) {
    super();
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    exists(this);
    const { view, buffer, blockLen } = this;
    data = toBytes(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    exists(this);
    output(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    this.buffer.subarray(pos).fill(0);
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos; i < blockLen; i++)
      buffer[i] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0; i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to.length = length;
    to.pos = pos;
    to.finished = finished;
    to.destroyed = destroyed;
    if (length % blockLen)
      to.buffer.set(buffer);
    return to;
  }
};

// node_modules/@noble/hashes/esm/_u64.js
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  let Ah = new Uint32Array(lst.length);
  let Al = new Uint32Array(lst.length);
  for (let i = 0; i < lst.length; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
var toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
var shrSH = (h, _l, s) => h >>> s;
var shrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
var rotr32H = (_h, l) => l;
var rotr32L = (h, _l) => h;
var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
function add(Ah, Al, Bh, Bl) {
  const l = (Al >>> 0) + (Bl >>> 0);
  return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
}
var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
var u64 = {
  fromBig,
  split,
  toBig,
  shrSH,
  shrSL,
  rotrSH,
  rotrSL,
  rotrBH,
  rotrBL,
  rotr32H,
  rotr32L,
  rotlSH,
  rotlSL,
  rotlBH,
  rotlBL,
  add,
  add3L,
  add3H,
  add4L,
  add4H,
  add5H,
  add5L
};
var u64_default = u64;

// node_modules/@noble/hashes/esm/sha512.js
var [SHA512_Kh, SHA512_Kl] = /* @__PURE__ */ (() => u64_default.split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((n) => BigInt(n))))();
var SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
var SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
var SHA512 = class extends SHA2 {
  constructor() {
    super(128, 64, 16, false);
    this.Ah = 1779033703 | 0;
    this.Al = 4089235720 | 0;
    this.Bh = 3144134277 | 0;
    this.Bl = 2227873595 | 0;
    this.Ch = 1013904242 | 0;
    this.Cl = 4271175723 | 0;
    this.Dh = 2773480762 | 0;
    this.Dl = 1595750129 | 0;
    this.Eh = 1359893119 | 0;
    this.El = 2917565137 | 0;
    this.Fh = 2600822924 | 0;
    this.Fl = 725511199 | 0;
    this.Gh = 528734635 | 0;
    this.Gl = 4215389547 | 0;
    this.Hh = 1541459225 | 0;
    this.Hl = 327033209 | 0;
  }
  // prettier-ignore
  get() {
    const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
  }
  // prettier-ignore
  set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
    this.Ah = Ah | 0;
    this.Al = Al | 0;
    this.Bh = Bh | 0;
    this.Bl = Bl | 0;
    this.Ch = Ch | 0;
    this.Cl = Cl | 0;
    this.Dh = Dh | 0;
    this.Dl = Dl | 0;
    this.Eh = Eh | 0;
    this.El = El | 0;
    this.Fh = Fh | 0;
    this.Fl = Fl | 0;
    this.Gh = Gh | 0;
    this.Gl = Gl | 0;
    this.Hh = Hh | 0;
    this.Hl = Hl | 0;
  }
  process(view, offset2) {
    for (let i = 0; i < 16; i++, offset2 += 4) {
      SHA512_W_H[i] = view.getUint32(offset2);
      SHA512_W_L[i] = view.getUint32(offset2 += 4);
    }
    for (let i = 16; i < 80; i++) {
      const W15h = SHA512_W_H[i - 15] | 0;
      const W15l = SHA512_W_L[i - 15] | 0;
      const s0h = u64_default.rotrSH(W15h, W15l, 1) ^ u64_default.rotrSH(W15h, W15l, 8) ^ u64_default.shrSH(W15h, W15l, 7);
      const s0l = u64_default.rotrSL(W15h, W15l, 1) ^ u64_default.rotrSL(W15h, W15l, 8) ^ u64_default.shrSL(W15h, W15l, 7);
      const W2h = SHA512_W_H[i - 2] | 0;
      const W2l = SHA512_W_L[i - 2] | 0;
      const s1h = u64_default.rotrSH(W2h, W2l, 19) ^ u64_default.rotrBH(W2h, W2l, 61) ^ u64_default.shrSH(W2h, W2l, 6);
      const s1l = u64_default.rotrSL(W2h, W2l, 19) ^ u64_default.rotrBL(W2h, W2l, 61) ^ u64_default.shrSL(W2h, W2l, 6);
      const SUMl = u64_default.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
      const SUMh = u64_default.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
      SHA512_W_H[i] = SUMh | 0;
      SHA512_W_L[i] = SUMl | 0;
    }
    let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    for (let i = 0; i < 80; i++) {
      const sigma1h = u64_default.rotrSH(Eh, El, 14) ^ u64_default.rotrSH(Eh, El, 18) ^ u64_default.rotrBH(Eh, El, 41);
      const sigma1l = u64_default.rotrSL(Eh, El, 14) ^ u64_default.rotrSL(Eh, El, 18) ^ u64_default.rotrBL(Eh, El, 41);
      const CHIh = Eh & Fh ^ ~Eh & Gh;
      const CHIl = El & Fl ^ ~El & Gl;
      const T1ll = u64_default.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
      const T1h = u64_default.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
      const T1l = T1ll | 0;
      const sigma0h = u64_default.rotrSH(Ah, Al, 28) ^ u64_default.rotrBH(Ah, Al, 34) ^ u64_default.rotrBH(Ah, Al, 39);
      const sigma0l = u64_default.rotrSL(Ah, Al, 28) ^ u64_default.rotrBL(Ah, Al, 34) ^ u64_default.rotrBL(Ah, Al, 39);
      const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
      const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
      Hh = Gh | 0;
      Hl = Gl | 0;
      Gh = Fh | 0;
      Gl = Fl | 0;
      Fh = Eh | 0;
      Fl = El | 0;
      ({ h: Eh, l: El } = u64_default.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
      Dh = Ch | 0;
      Dl = Cl | 0;
      Ch = Bh | 0;
      Cl = Bl | 0;
      Bh = Ah | 0;
      Bl = Al | 0;
      const All = u64_default.add3L(T1l, sigma0l, MAJl);
      Ah = u64_default.add3H(All, T1h, sigma0h, MAJh);
      Al = All | 0;
    }
    ({ h: Ah, l: Al } = u64_default.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
    ({ h: Bh, l: Bl } = u64_default.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
    ({ h: Ch, l: Cl } = u64_default.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
    ({ h: Dh, l: Dl } = u64_default.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
    ({ h: Eh, l: El } = u64_default.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
    ({ h: Fh, l: Fl } = u64_default.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
    ({ h: Gh, l: Gl } = u64_default.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
    ({ h: Hh, l: Hl } = u64_default.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
    this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
  }
  roundClean() {
    SHA512_W_H.fill(0);
    SHA512_W_L.fill(0);
  }
  destroy() {
    this.buffer.fill(0);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var sha512 = /* @__PURE__ */ wrapConstructor(() => new SHA512());

// node_modules/@noble/curves/esm/abstract/utils.js
var utils_exports = {};
__export(utils_exports, {
  bitGet: () => bitGet,
  bitLen: () => bitLen,
  bitMask: () => bitMask,
  bitSet: () => bitSet,
  bytesToHex: () => bytesToHex,
  bytesToNumberBE: () => bytesToNumberBE,
  bytesToNumberLE: () => bytesToNumberLE,
  concatBytes: () => concatBytes2,
  createHmacDrbg: () => createHmacDrbg,
  ensureBytes: () => ensureBytes,
  equalBytes: () => equalBytes,
  hexToBytes: () => hexToBytes,
  hexToNumber: () => hexToNumber,
  numberToBytesBE: () => numberToBytesBE,
  numberToBytesLE: () => numberToBytesLE,
  numberToHexUnpadded: () => numberToHexUnpadded,
  numberToVarBytesBE: () => numberToVarBytesBE,
  utf8ToBytes: () => utf8ToBytes2,
  validateObject: () => validateObject
});
var _0n = BigInt(0);
var _1n = BigInt(1);
var _2n = BigInt(2);
var u8a2 = (a) => a instanceof Uint8Array;
var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
function bytesToHex(bytes2) {
  if (!u8a2(bytes2))
    throw new Error("Uint8Array expected");
  let hex = "";
  for (let i = 0; i < bytes2.length; i++) {
    hex += hexes[bytes2[i]];
  }
  return hex;
}
function numberToHexUnpadded(num) {
  const hex = num.toString(16);
  return hex.length & 1 ? `0${hex}` : hex;
}
function hexToNumber(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return BigInt(hex === "" ? "0" : `0x${hex}`);
}
function hexToBytes(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  const len = hex.length;
  if (len % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + len);
  const array2 = new Uint8Array(len / 2);
  for (let i = 0; i < array2.length; i++) {
    const j = i * 2;
    const hexByte = hex.slice(j, j + 2);
    const byte = Number.parseInt(hexByte, 16);
    if (Number.isNaN(byte) || byte < 0)
      throw new Error("Invalid byte sequence");
    array2[i] = byte;
  }
  return array2;
}
function bytesToNumberBE(bytes2) {
  return hexToNumber(bytesToHex(bytes2));
}
function bytesToNumberLE(bytes2) {
  if (!u8a2(bytes2))
    throw new Error("Uint8Array expected");
  return hexToNumber(bytesToHex(Uint8Array.from(bytes2).reverse()));
}
function numberToBytesBE(n, len) {
  return hexToBytes(n.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE(n, len) {
  return numberToBytesBE(n, len).reverse();
}
function numberToVarBytesBE(n) {
  return hexToBytes(numberToHexUnpadded(n));
}
function ensureBytes(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes(hex);
    } catch (e) {
      throw new Error(`${title} must be valid hex string, got "${hex}". Cause: ${e}`);
    }
  } else if (u8a2(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(`${title} must be hex string or Uint8Array`);
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(`${title} expected ${expectedLength} bytes, got ${len}`);
  return res;
}
function concatBytes2(...arrays) {
  const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
  let pad = 0;
  arrays.forEach((a) => {
    if (!u8a2(a))
      throw new Error("Uint8Array expected");
    r.set(a, pad);
    pad += a.length;
  });
  return r;
}
function equalBytes(b1, b2) {
  if (b1.length !== b2.length)
    return false;
  for (let i = 0; i < b1.length; i++)
    if (b1[i] !== b2[i])
      return false;
  return true;
}
function utf8ToBytes2(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function bitLen(n) {
  let len;
  for (len = 0; n > _0n; n >>= _1n, len += 1)
    ;
  return len;
}
function bitGet(n, pos) {
  return n >> BigInt(pos) & _1n;
}
var bitSet = (n, pos, value) => {
  return n | (value ? _1n : _0n) << BigInt(pos);
};
var bitMask = (n) => (_2n << BigInt(n - 1)) - _1n;
var u8n = (data) => new Uint8Array(data);
var u8fr = (arr) => Uint8Array.from(arr);
function createHmacDrbg(hashLen, qByteLen, hmacFn) {
  if (typeof hashLen !== "number" || hashLen < 2)
    throw new Error("hashLen must be a number");
  if (typeof qByteLen !== "number" || qByteLen < 2)
    throw new Error("qByteLen must be a number");
  if (typeof hmacFn !== "function")
    throw new Error("hmacFn must be a function");
  let v = u8n(hashLen);
  let k = u8n(hashLen);
  let i = 0;
  const reset = () => {
    v.fill(1);
    k.fill(0);
    i = 0;
  };
  const h = (...b) => hmacFn(k, v, ...b);
  const reseed = (seed = u8n()) => {
    k = h(u8fr([0]), seed);
    v = h();
    if (seed.length === 0)
      return;
    k = h(u8fr([1]), seed);
    v = h();
  };
  const gen2 = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let len = 0;
    const out = [];
    while (len < qByteLen) {
      v = h();
      const sl = v.slice();
      out.push(sl);
      len += v.length;
    }
    return concatBytes2(...out);
  };
  const genUntil = (seed, pred) => {
    reset();
    reseed(seed);
    let res = void 0;
    while (!(res = pred(gen2())))
      reseed();
    reset();
    return res;
  };
  return genUntil;
}
var validatorFns = {
  bigint: (val) => typeof val === "bigint",
  function: (val) => typeof val === "function",
  boolean: (val) => typeof val === "boolean",
  string: (val) => typeof val === "string",
  stringOrUint8Array: (val) => typeof val === "string" || val instanceof Uint8Array,
  isSafeInteger: (val) => Number.isSafeInteger(val),
  array: (val) => Array.isArray(val),
  field: (val, object) => object.Fp.isValid(val),
  hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
};
function validateObject(object, validators, optValidators = {}) {
  const checkField = (fieldName, type2, isOptional) => {
    const checkVal = validatorFns[type2];
    if (typeof checkVal !== "function")
      throw new Error(`Invalid validator "${type2}", expected function`);
    const val = object[fieldName];
    if (isOptional && val === void 0)
      return;
    if (!checkVal(val, object)) {
      throw new Error(`Invalid param ${String(fieldName)}=${val} (${typeof val}), expected ${type2}`);
    }
  };
  for (const [fieldName, type2] of Object.entries(validators))
    checkField(fieldName, type2, false);
  for (const [fieldName, type2] of Object.entries(optValidators))
    checkField(fieldName, type2, true);
  return object;
}

// node_modules/@noble/curves/esm/abstract/modular.js
var _0n2 = BigInt(0);
var _1n2 = BigInt(1);
var _2n2 = BigInt(2);
var _3n = BigInt(3);
var _4n = BigInt(4);
var _5n = BigInt(5);
var _8n = BigInt(8);
var _9n = BigInt(9);
var _16n = BigInt(16);
function mod(a, b) {
  const result = a % b;
  return result >= _0n2 ? result : b + result;
}
function pow(num, power, modulo) {
  if (modulo <= _0n2 || power < _0n2)
    throw new Error("Expected power/modulo > 0");
  if (modulo === _1n2)
    return _0n2;
  let res = _1n2;
  while (power > _0n2) {
    if (power & _1n2)
      res = res * num % modulo;
    num = num * num % modulo;
    power >>= _1n2;
  }
  return res;
}
function pow2(x, power, modulo) {
  let res = x;
  while (power-- > _0n2) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert(number3, modulo) {
  if (number3 === _0n2 || modulo <= _0n2) {
    throw new Error(`invert: expected positive integers, got n=${number3} mod=${modulo}`);
  }
  let a = mod(number3, modulo);
  let b = modulo;
  let x = _0n2, y = _1n2, u = _1n2, v = _0n2;
  while (a !== _0n2) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    const n = y - v * q;
    b = a, a = r, x = u, y = v, u = m, v = n;
  }
  const gcd = b;
  if (gcd !== _1n2)
    throw new Error("invert: does not exist");
  return mod(x, modulo);
}
function tonelliShanks(P) {
  const legendreC = (P - _1n2) / _2n2;
  let Q, S, Z;
  for (Q = P - _1n2, S = 0; Q % _2n2 === _0n2; Q /= _2n2, S++)
    ;
  for (Z = _2n2; Z < P && pow(Z, legendreC, P) !== P - _1n2; Z++)
    ;
  if (S === 1) {
    const p1div4 = (P + _1n2) / _4n;
    return function tonelliFast(Fp3, n) {
      const root = Fp3.pow(n, p1div4);
      if (!Fp3.eql(Fp3.sqr(root), n))
        throw new Error("Cannot find square root");
      return root;
    };
  }
  const Q1div2 = (Q + _1n2) / _2n2;
  return function tonelliSlow(Fp3, n) {
    if (Fp3.pow(n, legendreC) === Fp3.neg(Fp3.ONE))
      throw new Error("Cannot find square root");
    let r = S;
    let g = Fp3.pow(Fp3.mul(Fp3.ONE, Z), Q);
    let x = Fp3.pow(n, Q1div2);
    let b = Fp3.pow(n, Q);
    while (!Fp3.eql(b, Fp3.ONE)) {
      if (Fp3.eql(b, Fp3.ZERO))
        return Fp3.ZERO;
      let m = 1;
      for (let t2 = Fp3.sqr(b); m < r; m++) {
        if (Fp3.eql(t2, Fp3.ONE))
          break;
        t2 = Fp3.sqr(t2);
      }
      const ge = Fp3.pow(g, _1n2 << BigInt(r - m - 1));
      g = Fp3.sqr(ge);
      x = Fp3.mul(x, ge);
      b = Fp3.mul(b, g);
      r = m;
    }
    return x;
  };
}
function FpSqrt(P) {
  if (P % _4n === _3n) {
    const p1div4 = (P + _1n2) / _4n;
    return function sqrt3mod4(Fp3, n) {
      const root = Fp3.pow(n, p1div4);
      if (!Fp3.eql(Fp3.sqr(root), n))
        throw new Error("Cannot find square root");
      return root;
    };
  }
  if (P % _8n === _5n) {
    const c1 = (P - _5n) / _8n;
    return function sqrt5mod8(Fp3, n) {
      const n2 = Fp3.mul(n, _2n2);
      const v = Fp3.pow(n2, c1);
      const nv = Fp3.mul(n, v);
      const i = Fp3.mul(Fp3.mul(nv, _2n2), v);
      const root = Fp3.mul(nv, Fp3.sub(i, Fp3.ONE));
      if (!Fp3.eql(Fp3.sqr(root), n))
        throw new Error("Cannot find square root");
      return root;
    };
  }
  if (P % _16n === _9n) {
  }
  return tonelliShanks(P);
}
var isNegativeLE = (num, modulo) => (mod(num, modulo) & _1n2) === _1n2;
var FIELD_FIELDS = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField(field) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  };
  const opts = FIELD_FIELDS.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  return validateObject(field, opts);
}
function FpPow(f2, num, power) {
  if (power < _0n2)
    throw new Error("Expected power > 0");
  if (power === _0n2)
    return f2.ONE;
  if (power === _1n2)
    return num;
  let p = f2.ONE;
  let d = num;
  while (power > _0n2) {
    if (power & _1n2)
      p = f2.mul(p, d);
    d = f2.sqr(d);
    power >>= _1n2;
  }
  return p;
}
function FpInvertBatch(f2, nums) {
  const tmp = new Array(nums.length);
  const lastMultiplied = nums.reduce((acc, num, i) => {
    if (f2.is0(num))
      return acc;
    tmp[i] = acc;
    return f2.mul(acc, num);
  }, f2.ONE);
  const inverted = f2.inv(lastMultiplied);
  nums.reduceRight((acc, num, i) => {
    if (f2.is0(num))
      return acc;
    tmp[i] = f2.mul(acc, tmp[i]);
    return f2.mul(acc, num);
  }, inverted);
  return tmp;
}
function nLength(n, nBitLength) {
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field(ORDER, bitLen2, isLE2 = false, redef = {}) {
  if (ORDER <= _0n2)
    throw new Error(`Expected Field ORDER > 0, got ${ORDER}`);
  const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen2);
  if (BYTES > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const sqrtP = FpSqrt(ORDER);
  const f2 = Object.freeze({
    ORDER,
    BITS,
    BYTES,
    MASK: bitMask(BITS),
    ZERO: _0n2,
    ONE: _1n2,
    create: (num) => mod(num, ORDER),
    isValid: (num) => {
      if (typeof num !== "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof num}`);
      return _0n2 <= num && num < ORDER;
    },
    is0: (num) => num === _0n2,
    isOdd: (num) => (num & _1n2) === _1n2,
    neg: (num) => mod(-num, ORDER),
    eql: (lhs, rhs) => lhs === rhs,
    sqr: (num) => mod(num * num, ORDER),
    add: (lhs, rhs) => mod(lhs + rhs, ORDER),
    sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
    mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
    pow: (num, power) => FpPow(f2, num, power),
    div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
    // Same as above, but doesn't normalize
    sqrN: (num) => num * num,
    addN: (lhs, rhs) => lhs + rhs,
    subN: (lhs, rhs) => lhs - rhs,
    mulN: (lhs, rhs) => lhs * rhs,
    inv: (num) => invert(num, ORDER),
    sqrt: redef.sqrt || ((n) => sqrtP(f2, n)),
    invertBatch: (lst) => FpInvertBatch(f2, lst),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (a, b, c) => c ? b : a,
    toBytes: (num) => isLE2 ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
    fromBytes: (bytes2) => {
      if (bytes2.length !== BYTES)
        throw new Error(`Fp.fromBytes: expected ${BYTES}, got ${bytes2.length}`);
      return isLE2 ? bytesToNumberLE(bytes2) : bytesToNumberBE(bytes2);
    }
  });
  return Object.freeze(f2);
}
function FpSqrtEven(Fp3, elm) {
  if (!Fp3.isOdd)
    throw new Error(`Field doesn't have isOdd`);
  const root = Fp3.sqrt(elm);
  return Fp3.isOdd(root) ? Fp3.neg(root) : root;
}
function getFieldBytesLength(fieldOrder) {
  if (typeof fieldOrder !== "bigint")
    throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
function getMinHashLength(fieldOrder) {
  const length = getFieldBytesLength(fieldOrder);
  return length + Math.ceil(length / 2);
}
function mapHashToField(key, fieldOrder, isLE2 = false) {
  const len = key.length;
  const fieldLen = getFieldBytesLength(fieldOrder);
  const minLen = getMinHashLength(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error(`expected ${minLen}-1024 bytes of input, got ${len}`);
  const num = isLE2 ? bytesToNumberBE(key) : bytesToNumberLE(key);
  const reduced = mod(num, fieldOrder - _1n2) + _1n2;
  return isLE2 ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}

// node_modules/@noble/curves/esm/abstract/curve.js
var _0n3 = BigInt(0);
var _1n3 = BigInt(1);
function wNAF(c, bits) {
  const constTimeNegate = (condition, item) => {
    const neg = item.negate();
    return condition ? neg : item;
  };
  const opts = (W) => {
    const windows = Math.ceil(bits / W) + 1;
    const windowSize = 2 ** (W - 1);
    return { windows, windowSize };
  };
  return {
    constTimeNegate,
    // non-const time multiplication ladder
    unsafeLadder(elm, n) {
      let p = c.ZERO;
      let d = elm;
      while (n > _0n3) {
        if (n & _1n3)
          p = p.add(d);
        d = d.double();
        n >>= _1n3;
      }
      return p;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(elm, W) {
      const { windows, windowSize } = opts(W);
      const points = [];
      let p = elm;
      let base = p;
      for (let window2 = 0; window2 < windows; window2++) {
        base = p;
        points.push(base);
        for (let i = 1; i < windowSize; i++) {
          base = base.add(p);
          points.push(base);
        }
        p = base.double();
      }
      return points;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(W, precomputes, n) {
      const { windows, windowSize } = opts(W);
      let p = c.ZERO;
      let f2 = c.BASE;
      const mask2 = BigInt(2 ** W - 1);
      const maxNumber = 2 ** W;
      const shiftBy = BigInt(W);
      for (let window2 = 0; window2 < windows; window2++) {
        const offset2 = window2 * windowSize;
        let wbits = Number(n & mask2);
        n >>= shiftBy;
        if (wbits > windowSize) {
          wbits -= maxNumber;
          n += _1n3;
        }
        const offset1 = offset2;
        const offset22 = offset2 + Math.abs(wbits) - 1;
        const cond1 = window2 % 2 !== 0;
        const cond2 = wbits < 0;
        if (wbits === 0) {
          f2 = f2.add(constTimeNegate(cond1, precomputes[offset1]));
        } else {
          p = p.add(constTimeNegate(cond2, precomputes[offset22]));
        }
      }
      return { p, f: f2 };
    },
    wNAFCached(P, precomputesMap, n, transform) {
      const W = P._WINDOW_SIZE || 1;
      let comp = precomputesMap.get(P);
      if (!comp) {
        comp = this.precomputeWindow(P, W);
        if (W !== 1) {
          precomputesMap.set(P, transform(comp));
        }
      }
      return this.wNAF(W, comp, n);
    }
  };
}
function validateBasic(curve) {
  validateField(curve.Fp);
  validateObject(curve, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  });
  return Object.freeze({
    ...nLength(curve.n, curve.nBitLength),
    ...curve,
    ...{ p: curve.Fp.ORDER }
  });
}

// node_modules/@noble/curves/esm/abstract/edwards.js
var _0n4 = BigInt(0);
var _1n4 = BigInt(1);
var _2n3 = BigInt(2);
var _8n2 = BigInt(8);
var VERIFY_DEFAULT = { zip215: true };
function validateOpts(curve) {
  const opts = validateBasic(curve);
  validateObject(curve, {
    hash: "function",
    a: "bigint",
    d: "bigint",
    randomBytes: "function"
  }, {
    adjustScalarBytes: "function",
    domain: "function",
    uvRatio: "function",
    mapToCurve: "function"
  });
  return Object.freeze({ ...opts });
}
function twistedEdwards(curveDef) {
  const CURVE = validateOpts(curveDef);
  const { Fp: Fp3, n: CURVE_ORDER, prehash, hash: cHash, randomBytes: randomBytes2, nByteLength, h: cofactor } = CURVE;
  const MASK = _2n3 << BigInt(nByteLength * 8) - _1n4;
  const modP = Fp3.create;
  const uvRatio2 = CURVE.uvRatio || ((u, v) => {
    try {
      return { isValid: true, value: Fp3.sqrt(u * Fp3.inv(v)) };
    } catch (e) {
      return { isValid: false, value: _0n4 };
    }
  });
  const adjustScalarBytes2 = CURVE.adjustScalarBytes || ((bytes2) => bytes2);
  const domain = CURVE.domain || ((data, ctx, phflag) => {
    if (ctx.length || phflag)
      throw new Error("Contexts/pre-hash are not supported");
    return data;
  });
  const inBig = (n) => typeof n === "bigint" && _0n4 < n;
  const inRange = (n, max) => inBig(n) && inBig(max) && n < max;
  const in0MaskRange = (n) => n === _0n4 || inRange(n, MASK);
  function assertInRange(n, max) {
    if (inRange(n, max))
      return n;
    throw new Error(`Expected valid scalar < ${max}, got ${typeof n} ${n}`);
  }
  function assertGE0(n) {
    return n === _0n4 ? n : assertInRange(n, CURVE_ORDER);
  }
  const pointPrecomputes = /* @__PURE__ */ new Map();
  function isPoint(other) {
    if (!(other instanceof Point2))
      throw new Error("ExtendedPoint expected");
  }
  class Point2 {
    constructor(ex, ey, ez, et) {
      this.ex = ex;
      this.ey = ey;
      this.ez = ez;
      this.et = et;
      if (!in0MaskRange(ex))
        throw new Error("x required");
      if (!in0MaskRange(ey))
        throw new Error("y required");
      if (!in0MaskRange(ez))
        throw new Error("z required");
      if (!in0MaskRange(et))
        throw new Error("t required");
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static fromAffine(p) {
      if (p instanceof Point2)
        throw new Error("extended point not allowed");
      const { x, y } = p || {};
      if (!in0MaskRange(x) || !in0MaskRange(y))
        throw new Error("invalid affine point");
      return new Point2(x, y, _1n4, modP(x * y));
    }
    static normalizeZ(points) {
      const toInv = Fp3.invertBatch(points.map((p) => p.ez));
      return points.map((p, i) => p.toAffine(toInv[i])).map(Point2.fromAffine);
    }
    // "Private method", don't use it directly
    _setWindowSize(windowSize) {
      this._WINDOW_SIZE = windowSize;
      pointPrecomputes.delete(this);
    }
    // Not required for fromHex(), which always creates valid points.
    // Could be useful for fromAffine().
    assertValidity() {
      const { a, d } = CURVE;
      if (this.is0())
        throw new Error("bad point: ZERO");
      const { ex: X, ey: Y, ez: Z, et: T } = this;
      const X2 = modP(X * X);
      const Y2 = modP(Y * Y);
      const Z2 = modP(Z * Z);
      const Z4 = modP(Z2 * Z2);
      const aX2 = modP(X2 * a);
      const left = modP(Z2 * modP(aX2 + Y2));
      const right = modP(Z4 + modP(d * modP(X2 * Y2)));
      if (left !== right)
        throw new Error("bad point: equation left != right (1)");
      const XY = modP(X * Y);
      const ZT = modP(Z * T);
      if (XY !== ZT)
        throw new Error("bad point: equation left != right (2)");
    }
    // Compare one point to another.
    equals(other) {
      isPoint(other);
      const { ex: X1, ey: Y1, ez: Z1 } = this;
      const { ex: X2, ey: Y2, ez: Z2 } = other;
      const X1Z2 = modP(X1 * Z2);
      const X2Z1 = modP(X2 * Z1);
      const Y1Z2 = modP(Y1 * Z2);
      const Y2Z1 = modP(Y2 * Z1);
      return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
    }
    is0() {
      return this.equals(Point2.ZERO);
    }
    negate() {
      return new Point2(modP(-this.ex), this.ey, this.ez, modP(-this.et));
    }
    // Fast algo for doubling Extended Point.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#doubling-dbl-2008-hwcd
    // Cost: 4M + 4S + 1*a + 6add + 1*2.
    double() {
      const { a } = CURVE;
      const { ex: X1, ey: Y1, ez: Z1 } = this;
      const A = modP(X1 * X1);
      const B = modP(Y1 * Y1);
      const C = modP(_2n3 * modP(Z1 * Z1));
      const D = modP(a * A);
      const x1y1 = X1 + Y1;
      const E = modP(modP(x1y1 * x1y1) - A - B);
      const G2 = D + B;
      const F = G2 - C;
      const H = D - B;
      const X3 = modP(E * F);
      const Y3 = modP(G2 * H);
      const T3 = modP(E * H);
      const Z3 = modP(F * G2);
      return new Point2(X3, Y3, Z3, T3);
    }
    // Fast algo for adding 2 Extended Points.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
    // Cost: 9M + 1*a + 1*d + 7add.
    add(other) {
      isPoint(other);
      const { a, d } = CURVE;
      const { ex: X1, ey: Y1, ez: Z1, et: T1 } = this;
      const { ex: X2, ey: Y2, ez: Z2, et: T2 } = other;
      if (a === BigInt(-1)) {
        const A2 = modP((Y1 - X1) * (Y2 + X2));
        const B2 = modP((Y1 + X1) * (Y2 - X2));
        const F2 = modP(B2 - A2);
        if (F2 === _0n4)
          return this.double();
        const C2 = modP(Z1 * _2n3 * T2);
        const D2 = modP(T1 * _2n3 * Z2);
        const E2 = D2 + C2;
        const G3 = B2 + A2;
        const H2 = D2 - C2;
        const X32 = modP(E2 * F2);
        const Y32 = modP(G3 * H2);
        const T32 = modP(E2 * H2);
        const Z32 = modP(F2 * G3);
        return new Point2(X32, Y32, Z32, T32);
      }
      const A = modP(X1 * X2);
      const B = modP(Y1 * Y2);
      const C = modP(T1 * d * T2);
      const D = modP(Z1 * Z2);
      const E = modP((X1 + Y1) * (X2 + Y2) - A - B);
      const F = D - C;
      const G2 = D + C;
      const H = modP(B - a * A);
      const X3 = modP(E * F);
      const Y3 = modP(G2 * H);
      const T3 = modP(E * H);
      const Z3 = modP(F * G2);
      return new Point2(X3, Y3, Z3, T3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    wNAF(n) {
      return wnaf.wNAFCached(this, pointPrecomputes, n, Point2.normalizeZ);
    }
    // Constant-time multiplication.
    multiply(scalar) {
      const { p, f: f2 } = this.wNAF(assertInRange(scalar, CURVE_ORDER));
      return Point2.normalizeZ([p, f2])[0];
    }
    // Non-constant-time multiplication. Uses double-and-add algorithm.
    // It's faster, but should only be used when you don't care about
    // an exposed private key e.g. sig verification.
    // Does NOT allow scalars higher than CURVE.n.
    multiplyUnsafe(scalar) {
      let n = assertGE0(scalar);
      if (n === _0n4)
        return I;
      if (this.equals(I) || n === _1n4)
        return this;
      if (this.equals(G))
        return this.wNAF(n).p;
      return wnaf.unsafeLadder(this, n);
    }
    // Checks if point is of small order.
    // If you add something to small order point, you will have "dirty"
    // point with torsion component.
    // Multiplies point by cofactor and checks if the result is 0.
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    // Multiplies point by curve order and checks if the result is 0.
    // Returns `false` is the point is dirty.
    isTorsionFree() {
      return wnaf.unsafeLadder(this, CURVE_ORDER).is0();
    }
    // Converts Extended point to default (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    toAffine(iz) {
      const { ex: x, ey: y, ez: z } = this;
      const is0 = this.is0();
      if (iz == null)
        iz = is0 ? _8n2 : Fp3.inv(z);
      const ax = modP(x * iz);
      const ay = modP(y * iz);
      const zz = modP(z * iz);
      if (is0)
        return { x: _0n4, y: _1n4 };
      if (zz !== _1n4)
        throw new Error("invZ was invalid");
      return { x: ax, y: ay };
    }
    clearCofactor() {
      const { h: cofactor2 } = CURVE;
      if (cofactor2 === _1n4)
        return this;
      return this.multiplyUnsafe(cofactor2);
    }
    // Converts hash string or Uint8Array to Point.
    // Uses algo from RFC8032 5.1.3.
    static fromHex(hex, zip215 = false) {
      const { d, a } = CURVE;
      const len = Fp3.BYTES;
      hex = ensureBytes("pointHex", hex, len);
      const normed = hex.slice();
      const lastByte = hex[len - 1];
      normed[len - 1] = lastByte & ~128;
      const y = bytesToNumberLE(normed);
      if (y === _0n4) {
      } else {
        if (zip215)
          assertInRange(y, MASK);
        else
          assertInRange(y, Fp3.ORDER);
      }
      const y2 = modP(y * y);
      const u = modP(y2 - _1n4);
      const v = modP(d * y2 - a);
      let { isValid, value: x } = uvRatio2(u, v);
      if (!isValid)
        throw new Error("Point.fromHex: invalid y coordinate");
      const isXOdd = (x & _1n4) === _1n4;
      const isLastByteOdd = (lastByte & 128) !== 0;
      if (!zip215 && x === _0n4 && isLastByteOdd)
        throw new Error("Point.fromHex: x=0 and x_0=1");
      if (isLastByteOdd !== isXOdd)
        x = modP(-x);
      return Point2.fromAffine({ x, y });
    }
    static fromPrivateKey(privKey) {
      return getExtendedPublicKey(privKey).point;
    }
    toRawBytes() {
      const { x, y } = this.toAffine();
      const bytes2 = numberToBytesLE(y, Fp3.BYTES);
      bytes2[bytes2.length - 1] |= x & _1n4 ? 128 : 0;
      return bytes2;
    }
    toHex() {
      return bytesToHex(this.toRawBytes());
    }
  }
  Point2.BASE = new Point2(CURVE.Gx, CURVE.Gy, _1n4, modP(CURVE.Gx * CURVE.Gy));
  Point2.ZERO = new Point2(_0n4, _1n4, _1n4, _0n4);
  const { BASE: G, ZERO: I } = Point2;
  const wnaf = wNAF(Point2, nByteLength * 8);
  function modN(a) {
    return mod(a, CURVE_ORDER);
  }
  function modN_LE(hash2) {
    return modN(bytesToNumberLE(hash2));
  }
  function getExtendedPublicKey(key) {
    const len = nByteLength;
    key = ensureBytes("private key", key, len);
    const hashed = ensureBytes("hashed private key", cHash(key), 2 * len);
    const head = adjustScalarBytes2(hashed.slice(0, len));
    const prefix = hashed.slice(len, 2 * len);
    const scalar = modN_LE(head);
    const point = G.multiply(scalar);
    const pointBytes = point.toRawBytes();
    return { head, prefix, scalar, point, pointBytes };
  }
  function getPublicKey2(privKey) {
    return getExtendedPublicKey(privKey).pointBytes;
  }
  function hashDomainToScalar(context = new Uint8Array(), ...msgs) {
    const msg = concatBytes2(...msgs);
    return modN_LE(cHash(domain(msg, ensureBytes("context", context), !!prehash)));
  }
  function sign3(msg, privKey, options = {}) {
    msg = ensureBytes("message", msg);
    if (prehash)
      msg = prehash(msg);
    const { prefix, scalar, pointBytes } = getExtendedPublicKey(privKey);
    const r = hashDomainToScalar(options.context, prefix, msg);
    const R = G.multiply(r).toRawBytes();
    const k = hashDomainToScalar(options.context, R, pointBytes, msg);
    const s = modN(r + k * scalar);
    assertGE0(s);
    const res = concatBytes2(R, numberToBytesLE(s, Fp3.BYTES));
    return ensureBytes("result", res, nByteLength * 2);
  }
  const verifyOpts = VERIFY_DEFAULT;
  function verify2(sig, msg, publicKey3, options = verifyOpts) {
    const { context, zip215 } = options;
    const len = Fp3.BYTES;
    sig = ensureBytes("signature", sig, 2 * len);
    msg = ensureBytes("message", msg);
    if (prehash)
      msg = prehash(msg);
    const s = bytesToNumberLE(sig.slice(len, 2 * len));
    let A, R, SB;
    try {
      A = Point2.fromHex(publicKey3, zip215);
      R = Point2.fromHex(sig.slice(0, len), zip215);
      SB = G.multiplyUnsafe(s);
    } catch (error) {
      return false;
    }
    if (!zip215 && A.isSmallOrder())
      return false;
    const k = hashDomainToScalar(context, R.toRawBytes(), A.toRawBytes(), msg);
    const RkA = R.add(A.multiplyUnsafe(k));
    return RkA.subtract(SB).clearCofactor().equals(Point2.ZERO);
  }
  G._setWindowSize(8);
  const utils = {
    getExtendedPublicKey,
    // ed25519 private keys are uniform 32b. No need to check for modulo bias, like in secp256k1.
    randomPrivateKey: () => randomBytes2(Fp3.BYTES),
    /**
     * We're doing scalar multiplication (used in getPublicKey etc) with precomputed BASE_POINT
     * values. This slows down first getPublicKey() by milliseconds (see Speed section),
     * but allows to speed-up subsequent getPublicKey() calls up to 20x.
     * @param windowSize 2, 4, 8, 16
     */
    precompute(windowSize = 8, point = Point2.BASE) {
      point._setWindowSize(windowSize);
      point.multiply(BigInt(3));
      return point;
    }
  };
  return {
    CURVE,
    getPublicKey: getPublicKey2,
    sign: sign3,
    verify: verify2,
    ExtendedPoint: Point2,
    utils
  };
}

// node_modules/@noble/curves/esm/ed25519.js
var ED25519_P = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
var ED25519_SQRT_M1 = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
var _0n5 = BigInt(0);
var _1n5 = BigInt(1);
var _2n4 = BigInt(2);
var _5n2 = BigInt(5);
var _10n = BigInt(10);
var _20n = BigInt(20);
var _40n = BigInt(40);
var _80n = BigInt(80);
function ed25519_pow_2_252_3(x) {
  const P = ED25519_P;
  const x2 = x * x % P;
  const b2 = x2 * x % P;
  const b4 = pow2(b2, _2n4, P) * b2 % P;
  const b5 = pow2(b4, _1n5, P) * x % P;
  const b10 = pow2(b5, _5n2, P) * b5 % P;
  const b20 = pow2(b10, _10n, P) * b10 % P;
  const b40 = pow2(b20, _20n, P) * b20 % P;
  const b80 = pow2(b40, _40n, P) * b40 % P;
  const b160 = pow2(b80, _80n, P) * b80 % P;
  const b240 = pow2(b160, _80n, P) * b80 % P;
  const b250 = pow2(b240, _10n, P) * b10 % P;
  const pow_p_5_8 = pow2(b250, _2n4, P) * x % P;
  return { pow_p_5_8, b2 };
}
function adjustScalarBytes(bytes2) {
  bytes2[0] &= 248;
  bytes2[31] &= 127;
  bytes2[31] |= 64;
  return bytes2;
}
function uvRatio(u, v) {
  const P = ED25519_P;
  const v32 = mod(v * v * v, P);
  const v7 = mod(v32 * v32 * v, P);
  const pow3 = ed25519_pow_2_252_3(u * v7).pow_p_5_8;
  let x = mod(u * v32 * pow3, P);
  const vx2 = mod(v * x * x, P);
  const root1 = x;
  const root2 = mod(x * ED25519_SQRT_M1, P);
  const useRoot1 = vx2 === u;
  const useRoot2 = vx2 === mod(-u, P);
  const noRoot = vx2 === mod(-u * ED25519_SQRT_M1, P);
  if (useRoot1)
    x = root1;
  if (useRoot2 || noRoot)
    x = root2;
  if (isNegativeLE(x, P))
    x = mod(-x, P);
  return { isValid: useRoot1 || useRoot2, value: x };
}
var Fp = Field(ED25519_P, void 0, true);
var ed25519Defaults = {
  // Param: a
  a: BigInt(-1),
  // d is equal to -121665/121666 over finite field.
  // Negative number is P - number, and division is invert(number, P)
  d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
  // Finite field 𝔽p over which we'll do calculations; 2n**255n - 19n
  Fp,
  // Subgroup order: how many points curve has
  // 2n**252n + 27742317777372353535851937790883648493n;
  n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
  // Cofactor
  h: BigInt(8),
  // Base point (x, y) aka generator point
  Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
  Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
  hash: sha512,
  randomBytes,
  adjustScalarBytes,
  // dom2
  // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
  // Constant-time, u/√v
  uvRatio
};
var ed25519 = /* @__PURE__ */ twistedEdwards(ed25519Defaults);
function ed25519_domain(data, ctx, phflag) {
  if (ctx.length > 255)
    throw new Error("Context is too big");
  return concatBytes(utf8ToBytes("SigEd25519 no Ed25519 collisions"), new Uint8Array([phflag ? 1 : 0, ctx.length]), ctx, data);
}
var ed25519ctx = /* @__PURE__ */ twistedEdwards({
  ...ed25519Defaults,
  domain: ed25519_domain
});
var ed25519ph = /* @__PURE__ */ twistedEdwards({
  ...ed25519Defaults,
  domain: ed25519_domain,
  prehash: sha512
});
var ELL2_C1 = (Fp.ORDER + BigInt(3)) / BigInt(8);
var ELL2_C2 = Fp.pow(_2n4, ELL2_C1);
var ELL2_C3 = Fp.sqrt(Fp.neg(Fp.ONE));
var ELL2_C4 = (Fp.ORDER - BigInt(5)) / BigInt(8);
var ELL2_J = BigInt(486662);
var ELL2_C1_EDWARDS = FpSqrtEven(Fp, Fp.neg(BigInt(486664)));
var SQRT_AD_MINUS_ONE = BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235");
var INVSQRT_A_MINUS_D = BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578");
var ONE_MINUS_D_SQ = BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838");
var D_MINUS_ONE_SQ = BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952");
var MAX_255B = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

// node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
function asyncGeneratorStep(gen2, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen2[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function() {
    var self = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen2 = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen2, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen2, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}

// node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}

// node_modules/@babel/runtime/helpers/esm/inherits.js
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}

// node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

// node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

// node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}

// node_modules/@solana/web3.js/lib/index.browser.esm.js
var import_regenerator = __toESM(require_regenerator());
var import_bn = __toESM(require_bn());
var import_bs58 = __toESM(require_bs58());

// node_modules/@noble/hashes/esm/sha256.js
var Chi = (a, b, c) => a & b ^ ~a & c;
var Maj = (a, b, c) => a & b ^ a & c ^ b & c;
var SHA256_K = /* @__PURE__ */ new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var IV = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
var SHA256 = class extends SHA2 {
  constructor() {
    super(64, 32, 8, false);
    this.A = IV[0] | 0;
    this.B = IV[1] | 0;
    this.C = IV[2] | 0;
    this.D = IV[3] | 0;
    this.E = IV[4] | 0;
    this.F = IV[5] | 0;
    this.G = IV[6] | 0;
    this.H = IV[7] | 0;
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  // prettier-ignore
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset2) {
    for (let i = 0; i < 16; i++, offset2 += 4)
      SHA256_W[i] = view.getUint32(offset2, false);
    for (let i = 16; i < 64; i++) {
      const W15 = SHA256_W[i - 15];
      const W2 = SHA256_W[i - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i = 0; i < 64; i++) {
      const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
      const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
      const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
      const T2 = sigma0 + Maj(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    SHA256_W.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    this.buffer.fill(0);
  }
};
var sha256 = /* @__PURE__ */ wrapConstructor(() => new SHA256());

// node_modules/@solana/web3.js/lib/index.browser.esm.js
var import_borsh = __toESM(require_lib());
var BufferLayout = __toESM(require_Layout());
var import_buffer_layout = __toESM(require_Layout());

// node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}

// node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f2 = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t)
          return;
        f2 = false;
      } else
        for (; !(f2 = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f2 = true)
          ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f2 && null != t["return"] && (u = t["return"](), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}

// node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}

// node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

// node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// node_modules/@babel/runtime/helpers/esm/slicedToArray.js
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

// node_modules/@solana/web3.js/lib/index.browser.esm.js
var import_bigint_buffer = __toESM(require_browser());

// node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

// node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}

// node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}

// node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

// node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}

// node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}

// node_modules/superstruct/lib/index.es.js
var StructError = class extends TypeError {
  constructor(failure, failures) {
    let cached;
    const {
      message,
      ...rest
    } = failure;
    const {
      path
    } = failure;
    const msg = path.length === 0 ? message : "At path: " + path.join(".") + " -- " + message;
    super(msg);
    Object.assign(this, rest);
    this.name = this.constructor.name;
    this.failures = () => {
      var _cached;
      return (_cached = cached) != null ? _cached : cached = [failure, ...failures()];
    };
  }
};
function isIterable(x) {
  return isObject(x) && typeof x[Symbol.iterator] === "function";
}
function isObject(x) {
  return typeof x === "object" && x != null;
}
function print(value) {
  return typeof value === "string" ? JSON.stringify(value) : "" + value;
}
function shiftIterator(input) {
  const {
    done,
    value
  } = input.next();
  return done ? void 0 : value;
}
function toFailure(result, context, struct2, value) {
  if (result === true) {
    return;
  } else if (result === false) {
    result = {};
  } else if (typeof result === "string") {
    result = {
      message: result
    };
  }
  const {
    path,
    branch
  } = context;
  const {
    type: type2
  } = struct2;
  const {
    refinement,
    message = "Expected a value of type `" + type2 + "`" + (refinement ? " with refinement `" + refinement + "`" : "") + ", but received: `" + print(value) + "`"
  } = result;
  return {
    value,
    type: type2,
    refinement,
    key: path[path.length - 1],
    path,
    branch,
    ...result,
    message
  };
}
function* toFailures(result, context, struct2, value) {
  if (!isIterable(result)) {
    result = [result];
  }
  for (const r of result) {
    const failure = toFailure(r, context, struct2, value);
    if (failure) {
      yield failure;
    }
  }
}
function* run(value, struct2, options = {}) {
  const {
    path = [],
    branch = [value],
    coerce: coerce2 = false,
    mask: mask2 = false
  } = options;
  const ctx = {
    path,
    branch
  };
  if (coerce2) {
    value = struct2.coercer(value, ctx);
    if (mask2 && struct2.type !== "type" && isObject(struct2.schema) && isObject(value) && !Array.isArray(value)) {
      for (const key in value) {
        if (struct2.schema[key] === void 0) {
          delete value[key];
        }
      }
    }
  }
  let valid = true;
  for (const failure of struct2.validator(value, ctx)) {
    valid = false;
    yield [failure, void 0];
  }
  for (let [k, v, s] of struct2.entries(value, ctx)) {
    const ts = run(v, s, {
      path: k === void 0 ? path : [...path, k],
      branch: k === void 0 ? branch : [...branch, v],
      coerce: coerce2,
      mask: mask2
    });
    for (const t of ts) {
      if (t[0]) {
        valid = false;
        yield [t[0], void 0];
      } else if (coerce2) {
        v = t[1];
        if (k === void 0) {
          value = v;
        } else if (value instanceof Map) {
          value.set(k, v);
        } else if (value instanceof Set) {
          value.add(v);
        } else if (isObject(value)) {
          value[k] = v;
        }
      }
    }
  }
  if (valid) {
    for (const failure of struct2.refiner(value, ctx)) {
      valid = false;
      yield [failure, void 0];
    }
  }
  if (valid) {
    yield [void 0, value];
  }
}
var Struct = class {
  constructor(props) {
    const {
      type: type2,
      schema,
      validator,
      refiner,
      coercer = (value) => value,
      entries = function* () {
      }
    } = props;
    this.type = type2;
    this.schema = schema;
    this.entries = entries;
    this.coercer = coercer;
    if (validator) {
      this.validator = (value, context) => {
        const result = validator(value, context);
        return toFailures(result, context, this, value);
      };
    } else {
      this.validator = () => [];
    }
    if (refiner) {
      this.refiner = (value, context) => {
        const result = refiner(value, context);
        return toFailures(result, context, this, value);
      };
    } else {
      this.refiner = () => [];
    }
  }
  /**
   * Assert that a value passes the struct's validation, throwing if it doesn't.
   */
  assert(value) {
    return assert(value, this);
  }
  /**
   * Create a value with the struct's coercion logic, then validate it.
   */
  create(value) {
    return create(value, this);
  }
  /**
   * Check if a value passes the struct's validation.
   */
  is(value) {
    return is(value, this);
  }
  /**
   * Mask a value, coercing and validating it, but returning only the subset of
   * properties defined by the struct's schema.
   */
  mask(value) {
    return mask(value, this);
  }
  /**
   * Validate a value with the struct's validation logic, returning a tuple
   * representing the result.
   *
   * You may optionally pass `true` for the `withCoercion` argument to coerce
   * the value before attempting to validate it. If you do, the result will
   * contain the coerced result when successful.
   */
  validate(value, options = {}) {
    return validate(value, this, options);
  }
};
function assert(value, struct2) {
  const result = validate(value, struct2);
  if (result[0]) {
    throw result[0];
  }
}
function create(value, struct2) {
  const result = validate(value, struct2, {
    coerce: true
  });
  if (result[0]) {
    throw result[0];
  } else {
    return result[1];
  }
}
function mask(value, struct2) {
  const result = validate(value, struct2, {
    coerce: true,
    mask: true
  });
  if (result[0]) {
    throw result[0];
  } else {
    return result[1];
  }
}
function is(value, struct2) {
  const result = validate(value, struct2);
  return !result[0];
}
function validate(value, struct2, options = {}) {
  const tuples = run(value, struct2, options);
  const tuple2 = shiftIterator(tuples);
  if (tuple2[0]) {
    const error = new StructError(tuple2[0], function* () {
      for (const t of tuples) {
        if (t[0]) {
          yield t[0];
        }
      }
    });
    return [error, void 0];
  } else {
    const v = tuple2[1];
    return [void 0, v];
  }
}
function define(name, validator) {
  return new Struct({
    type: name,
    schema: null,
    validator
  });
}
function any() {
  return define("any", () => true);
}
function array(Element) {
  return new Struct({
    type: "array",
    schema: Element,
    *entries(value) {
      if (Element && Array.isArray(value)) {
        for (const [i, v] of value.entries()) {
          yield [i, v, Element];
        }
      }
    },
    coercer(value) {
      return Array.isArray(value) ? value.slice() : value;
    },
    validator(value) {
      return Array.isArray(value) || "Expected an array value, but received: " + print(value);
    }
  });
}
function boolean() {
  return define("boolean", (value) => {
    return typeof value === "boolean";
  });
}
function instance(Class) {
  return define("instance", (value) => {
    return value instanceof Class || "Expected a `" + Class.name + "` instance, but received: " + print(value);
  });
}
function literal(constant) {
  const description = print(constant);
  const t = typeof constant;
  return new Struct({
    type: "literal",
    schema: t === "string" || t === "number" || t === "boolean" ? constant : null,
    validator(value) {
      return value === constant || "Expected the literal `" + description + "`, but received: " + print(value);
    }
  });
}
function never() {
  return define("never", () => false);
}
function nullable(struct2) {
  return new Struct({
    ...struct2,
    validator: (value, ctx) => value === null || struct2.validator(value, ctx),
    refiner: (value, ctx) => value === null || struct2.refiner(value, ctx)
  });
}
function number2() {
  return define("number", (value) => {
    return typeof value === "number" && !isNaN(value) || "Expected a number, but received: " + print(value);
  });
}
function optional(struct2) {
  return new Struct({
    ...struct2,
    validator: (value, ctx) => value === void 0 || struct2.validator(value, ctx),
    refiner: (value, ctx) => value === void 0 || struct2.refiner(value, ctx)
  });
}
function record(Key, Value) {
  return new Struct({
    type: "record",
    schema: null,
    *entries(value) {
      if (isObject(value)) {
        for (const k in value) {
          const v = value[k];
          yield [k, k, Key];
          yield [k, v, Value];
        }
      }
    },
    validator(value) {
      return isObject(value) || "Expected an object, but received: " + print(value);
    }
  });
}
function string() {
  return define("string", (value) => {
    return typeof value === "string" || "Expected a string, but received: " + print(value);
  });
}
function tuple(Elements) {
  const Never = never();
  return new Struct({
    type: "tuple",
    schema: null,
    *entries(value) {
      if (Array.isArray(value)) {
        const length = Math.max(Elements.length, value.length);
        for (let i = 0; i < length; i++) {
          yield [i, value[i], Elements[i] || Never];
        }
      }
    },
    validator(value) {
      return Array.isArray(value) || "Expected an array, but received: " + print(value);
    }
  });
}
function type(schema) {
  const keys = Object.keys(schema);
  return new Struct({
    type: "type",
    schema,
    *entries(value) {
      if (isObject(value)) {
        for (const k of keys) {
          yield [k, value[k], schema[k]];
        }
      }
    },
    validator(value) {
      return isObject(value) || "Expected an object, but received: " + print(value);
    }
  });
}
function union(Structs) {
  const description = Structs.map((s) => s.type).join(" | ");
  return new Struct({
    type: "union",
    schema: null,
    validator(value, ctx) {
      const failures = [];
      for (const S of Structs) {
        const [...tuples] = run(value, S, ctx);
        const [first] = tuples;
        if (!first[0]) {
          return [];
        } else {
          for (const [failure] of tuples) {
            if (failure) {
              failures.push(failure);
            }
          }
        }
      }
      return ["Expected the value to satisfy a union of `" + description + "`, but received: " + print(value), ...failures];
    }
  });
}
function unknown() {
  return define("unknown", () => true);
}
function coerce(struct2, condition, coercer) {
  return new Struct({
    ...struct2,
    coercer: (value, ctx) => {
      return is(value, condition) ? struct2.coercer(coercer(value, ctx), ctx) : struct2.coercer(value, ctx);
    }
  });
}

// node_modules/@solana/web3.js/lib/index.browser.esm.js
var import_browser = __toESM(require_browser2());

// node_modules/@babel/runtime/helpers/esm/isNativeFunction.js
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

// node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}

// node_modules/@babel/runtime/helpers/esm/construct.js
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance2 = new Constructor();
      if (Class2)
        _setPrototypeOf(instance2, Class2.prototype);
      return instance2;
    };
  }
  return _construct.apply(null, arguments);
}

// node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2))
      return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2))
        return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}

// node_modules/@babel/runtime/helpers/esm/superPropBase.js
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null)
      break;
  }
  return object;
}

// node_modules/@babel/runtime/helpers/esm/get.js
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get.bind();
  } else {
    _get = function _get2(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base)
        return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}

// node_modules/@solana/web3.js/lib/index.browser.esm.js
var import_client = __toESM(require_client());
var import_websocket = __toESM(require_websocket_browser());

// node_modules/@noble/hashes/esm/sha3.js
var [SHA3_PI, SHA3_ROTL, _SHA3_IOTA] = [[], [], []];
var _0n6 = /* @__PURE__ */ BigInt(0);
var _1n6 = /* @__PURE__ */ BigInt(1);
var _2n5 = /* @__PURE__ */ BigInt(2);
var _7n = /* @__PURE__ */ BigInt(7);
var _256n = /* @__PURE__ */ BigInt(256);
var _0x71n = /* @__PURE__ */ BigInt(113);
for (let round = 0, R = _1n6, x = 1, y = 0; round < 24; round++) {
  [x, y] = [y, (2 * x + 3 * y) % 5];
  SHA3_PI.push(2 * (5 * y + x));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n6;
  for (let j = 0; j < 7; j++) {
    R = (R << _1n6 ^ (R >> _7n) * _0x71n) % _256n;
    if (R & _2n5)
      t ^= _1n6 << (_1n6 << /* @__PURE__ */ BigInt(j)) - _1n6;
  }
  _SHA3_IOTA.push(t);
}
var [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ split(_SHA3_IOTA, true);
var rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
var rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x = 0; x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0; x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0; y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0; y < 50; y += 10) {
      for (let x = 0; x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0; x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  B.fill(0);
}
var Keccak = class _Keccak extends Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    number(outputLen);
    if (0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  keccak() {
    keccakP(this.state32, this.rounds);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    exists(this);
    const { blockLen, state } = this;
    data = toBytes(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i = 0; i < take; i++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    exists(this, false);
    bytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length; pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes2) {
    number(bytes2);
    return this.xofInto(new Uint8Array(bytes2));
  }
  digestInto(out) {
    output(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    this.state.fill(0);
  }
  _cloneInto(to) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to.state32.set(this.state32);
    to.pos = this.pos;
    to.posOut = this.posOut;
    to.finished = this.finished;
    to.rounds = rounds;
    to.suffix = suffix;
    to.outputLen = outputLen;
    to.enableXOF = enableXOF;
    to.destroyed = this.destroyed;
    return to;
  }
};
var gen = (suffix, blockLen, outputLen) => wrapConstructor(() => new Keccak(blockLen, suffix, outputLen));
var sha3_224 = /* @__PURE__ */ gen(6, 144, 224 / 8);
var sha3_256 = /* @__PURE__ */ gen(6, 136, 256 / 8);
var sha3_384 = /* @__PURE__ */ gen(6, 104, 384 / 8);
var sha3_512 = /* @__PURE__ */ gen(6, 72, 512 / 8);
var keccak_224 = /* @__PURE__ */ gen(1, 144, 224 / 8);
var keccak_256 = /* @__PURE__ */ gen(1, 136, 256 / 8);
var keccak_384 = /* @__PURE__ */ gen(1, 104, 384 / 8);
var keccak_512 = /* @__PURE__ */ gen(1, 72, 512 / 8);
var genShake = (suffix, blockLen, outputLen) => wrapXOFConstructorWithOpts((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
var shake128 = /* @__PURE__ */ genShake(31, 168, 128 / 8);
var shake256 = /* @__PURE__ */ genShake(31, 136, 256 / 8);

// node_modules/@noble/curves/esm/abstract/weierstrass.js
function validatePointOpts(curve) {
  const opts = validateBasic(curve);
  validateObject(opts, {
    a: "field",
    b: "field"
  }, {
    allowedPrivateKeyLengths: "array",
    wrapPrivateKey: "boolean",
    isTorsionFree: "function",
    clearCofactor: "function",
    allowInfinityPoint: "boolean",
    fromBytes: "function",
    toBytes: "function"
  });
  const { endo, Fp: Fp3, a } = opts;
  if (endo) {
    if (!Fp3.eql(a, Fp3.ZERO)) {
      throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
    }
    if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
      throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
    }
  }
  return Object.freeze({ ...opts });
}
var { bytesToNumberBE: b2n, hexToBytes: h2b } = utils_exports;
var DER = {
  // asn.1 DER encoding utils
  Err: class DERErr extends Error {
    constructor(m = "") {
      super(m);
    }
  },
  _parseInt(data) {
    const { Err: E } = DER;
    if (data.length < 2 || data[0] !== 2)
      throw new E("Invalid signature integer tag");
    const len = data[1];
    const res = data.subarray(2, len + 2);
    if (!len || res.length !== len)
      throw new E("Invalid signature integer: wrong length");
    if (res[0] & 128)
      throw new E("Invalid signature integer: negative");
    if (res[0] === 0 && !(res[1] & 128))
      throw new E("Invalid signature integer: unnecessary leading zero");
    return { d: b2n(res), l: data.subarray(len + 2) };
  },
  toSig(hex) {
    const { Err: E } = DER;
    const data = typeof hex === "string" ? h2b(hex) : hex;
    if (!(data instanceof Uint8Array))
      throw new Error("ui8a expected");
    let l = data.length;
    if (l < 2 || data[0] != 48)
      throw new E("Invalid signature tag");
    if (data[1] !== l - 2)
      throw new E("Invalid signature: incorrect length");
    const { d: r, l: sBytes } = DER._parseInt(data.subarray(2));
    const { d: s, l: rBytesLeft } = DER._parseInt(sBytes);
    if (rBytesLeft.length)
      throw new E("Invalid signature: left bytes after parsing");
    return { r, s };
  },
  hexFromSig(sig) {
    const slice = (s2) => Number.parseInt(s2[0], 16) & 8 ? "00" + s2 : s2;
    const h = (num) => {
      const hex = num.toString(16);
      return hex.length & 1 ? `0${hex}` : hex;
    };
    const s = slice(h(sig.s));
    const r = slice(h(sig.r));
    const shl = s.length / 2;
    const rhl = r.length / 2;
    const sl = h(shl);
    const rl = h(rhl);
    return `30${h(rhl + shl + 4)}02${rl}${r}02${sl}${s}`;
  }
};
var _0n7 = BigInt(0);
var _1n7 = BigInt(1);
var _2n6 = BigInt(2);
var _3n2 = BigInt(3);
var _4n2 = BigInt(4);
function weierstrassPoints(opts) {
  const CURVE = validatePointOpts(opts);
  const { Fp: Fp3 } = CURVE;
  const toBytes2 = CURVE.toBytes || ((_c, point, _isCompressed) => {
    const a = point.toAffine();
    return concatBytes2(Uint8Array.from([4]), Fp3.toBytes(a.x), Fp3.toBytes(a.y));
  });
  const fromBytes = CURVE.fromBytes || ((bytes2) => {
    const tail = bytes2.subarray(1);
    const x = Fp3.fromBytes(tail.subarray(0, Fp3.BYTES));
    const y = Fp3.fromBytes(tail.subarray(Fp3.BYTES, 2 * Fp3.BYTES));
    return { x, y };
  });
  function weierstrassEquation(x) {
    const { a, b } = CURVE;
    const x2 = Fp3.sqr(x);
    const x3 = Fp3.mul(x2, x);
    return Fp3.add(Fp3.add(x3, Fp3.mul(x, a)), b);
  }
  if (!Fp3.eql(Fp3.sqr(CURVE.Gy), weierstrassEquation(CURVE.Gx)))
    throw new Error("bad generator point: equation left != right");
  function isWithinCurveOrder(num) {
    return typeof num === "bigint" && _0n7 < num && num < CURVE.n;
  }
  function assertGE(num) {
    if (!isWithinCurveOrder(num))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function normPrivateKeyToScalar(key) {
    const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n } = CURVE;
    if (lengths && typeof key !== "bigint") {
      if (key instanceof Uint8Array)
        key = bytesToHex(key);
      if (typeof key !== "string" || !lengths.includes(key.length))
        throw new Error("Invalid key");
      key = key.padStart(nByteLength * 2, "0");
    }
    let num;
    try {
      num = typeof key === "bigint" ? key : bytesToNumberBE(ensureBytes("private key", key, nByteLength));
    } catch (error) {
      throw new Error(`private key must be ${nByteLength} bytes, hex or bigint, not ${typeof key}`);
    }
    if (wrapPrivateKey)
      num = mod(num, n);
    assertGE(num);
    return num;
  }
  const pointPrecomputes = /* @__PURE__ */ new Map();
  function assertPrjPoint(other) {
    if (!(other instanceof Point2))
      throw new Error("ProjectivePoint expected");
  }
  class Point2 {
    constructor(px, py, pz) {
      this.px = px;
      this.py = py;
      this.pz = pz;
      if (px == null || !Fp3.isValid(px))
        throw new Error("x required");
      if (py == null || !Fp3.isValid(py))
        throw new Error("y required");
      if (pz == null || !Fp3.isValid(pz))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(p) {
      const { x, y } = p || {};
      if (!p || !Fp3.isValid(x) || !Fp3.isValid(y))
        throw new Error("invalid affine point");
      if (p instanceof Point2)
        throw new Error("projective point not allowed");
      const is0 = (i) => Fp3.eql(i, Fp3.ZERO);
      if (is0(x) && is0(y))
        return Point2.ZERO;
      return new Point2(x, y, Fp3.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(points) {
      const toInv = Fp3.invertBatch(points.map((p) => p.pz));
      return points.map((p, i) => p.toAffine(toInv[i])).map(Point2.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(hex) {
      const P = Point2.fromAffine(fromBytes(ensureBytes("pointHex", hex)));
      P.assertValidity();
      return P;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(privateKey) {
      return Point2.BASE.multiply(normPrivateKeyToScalar(privateKey));
    }
    // "Private method", don't use it directly
    _setWindowSize(windowSize) {
      this._WINDOW_SIZE = windowSize;
      pointPrecomputes.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (CURVE.allowInfinityPoint && !Fp3.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x, y } = this.toAffine();
      if (!Fp3.isValid(x) || !Fp3.isValid(y))
        throw new Error("bad point: x or y not FE");
      const left = Fp3.sqr(y);
      const right = weierstrassEquation(x);
      if (!Fp3.eql(left, right))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y } = this.toAffine();
      if (Fp3.isOdd)
        return !Fp3.isOdd(y);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(other) {
      assertPrjPoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      const U1 = Fp3.eql(Fp3.mul(X1, Z2), Fp3.mul(X2, Z1));
      const U2 = Fp3.eql(Fp3.mul(Y1, Z2), Fp3.mul(Y2, Z1));
      return U1 && U2;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new Point2(this.px, Fp3.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a, b } = CURVE;
      const b3 = Fp3.mul(b, _3n2);
      const { px: X1, py: Y1, pz: Z1 } = this;
      let X3 = Fp3.ZERO, Y3 = Fp3.ZERO, Z3 = Fp3.ZERO;
      let t0 = Fp3.mul(X1, X1);
      let t1 = Fp3.mul(Y1, Y1);
      let t2 = Fp3.mul(Z1, Z1);
      let t3 = Fp3.mul(X1, Y1);
      t3 = Fp3.add(t3, t3);
      Z3 = Fp3.mul(X1, Z1);
      Z3 = Fp3.add(Z3, Z3);
      X3 = Fp3.mul(a, Z3);
      Y3 = Fp3.mul(b3, t2);
      Y3 = Fp3.add(X3, Y3);
      X3 = Fp3.sub(t1, Y3);
      Y3 = Fp3.add(t1, Y3);
      Y3 = Fp3.mul(X3, Y3);
      X3 = Fp3.mul(t3, X3);
      Z3 = Fp3.mul(b3, Z3);
      t2 = Fp3.mul(a, t2);
      t3 = Fp3.sub(t0, t2);
      t3 = Fp3.mul(a, t3);
      t3 = Fp3.add(t3, Z3);
      Z3 = Fp3.add(t0, t0);
      t0 = Fp3.add(Z3, t0);
      t0 = Fp3.add(t0, t2);
      t0 = Fp3.mul(t0, t3);
      Y3 = Fp3.add(Y3, t0);
      t2 = Fp3.mul(Y1, Z1);
      t2 = Fp3.add(t2, t2);
      t0 = Fp3.mul(t2, t3);
      X3 = Fp3.sub(X3, t0);
      Z3 = Fp3.mul(t2, t1);
      Z3 = Fp3.add(Z3, Z3);
      Z3 = Fp3.add(Z3, Z3);
      return new Point2(X3, Y3, Z3);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(other) {
      assertPrjPoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      let X3 = Fp3.ZERO, Y3 = Fp3.ZERO, Z3 = Fp3.ZERO;
      const a = CURVE.a;
      const b3 = Fp3.mul(CURVE.b, _3n2);
      let t0 = Fp3.mul(X1, X2);
      let t1 = Fp3.mul(Y1, Y2);
      let t2 = Fp3.mul(Z1, Z2);
      let t3 = Fp3.add(X1, Y1);
      let t4 = Fp3.add(X2, Y2);
      t3 = Fp3.mul(t3, t4);
      t4 = Fp3.add(t0, t1);
      t3 = Fp3.sub(t3, t4);
      t4 = Fp3.add(X1, Z1);
      let t5 = Fp3.add(X2, Z2);
      t4 = Fp3.mul(t4, t5);
      t5 = Fp3.add(t0, t2);
      t4 = Fp3.sub(t4, t5);
      t5 = Fp3.add(Y1, Z1);
      X3 = Fp3.add(Y2, Z2);
      t5 = Fp3.mul(t5, X3);
      X3 = Fp3.add(t1, t2);
      t5 = Fp3.sub(t5, X3);
      Z3 = Fp3.mul(a, t4);
      X3 = Fp3.mul(b3, t2);
      Z3 = Fp3.add(X3, Z3);
      X3 = Fp3.sub(t1, Z3);
      Z3 = Fp3.add(t1, Z3);
      Y3 = Fp3.mul(X3, Z3);
      t1 = Fp3.add(t0, t0);
      t1 = Fp3.add(t1, t0);
      t2 = Fp3.mul(a, t2);
      t4 = Fp3.mul(b3, t4);
      t1 = Fp3.add(t1, t2);
      t2 = Fp3.sub(t0, t2);
      t2 = Fp3.mul(a, t2);
      t4 = Fp3.add(t4, t2);
      t0 = Fp3.mul(t1, t4);
      Y3 = Fp3.add(Y3, t0);
      t0 = Fp3.mul(t5, t4);
      X3 = Fp3.mul(t3, X3);
      X3 = Fp3.sub(X3, t0);
      t0 = Fp3.mul(t3, t1);
      Z3 = Fp3.mul(t5, Z3);
      Z3 = Fp3.add(Z3, t0);
      return new Point2(X3, Y3, Z3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point2.ZERO);
    }
    wNAF(n) {
      return wnaf.wNAFCached(this, pointPrecomputes, n, (comp) => {
        const toInv = Fp3.invertBatch(comp.map((p) => p.pz));
        return comp.map((p, i) => p.toAffine(toInv[i])).map(Point2.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(n) {
      const I = Point2.ZERO;
      if (n === _0n7)
        return I;
      assertGE(n);
      if (n === _1n7)
        return this;
      const { endo } = CURVE;
      if (!endo)
        return wnaf.unsafeLadder(this, n);
      let { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
      let k1p = I;
      let k2p = I;
      let d = this;
      while (k1 > _0n7 || k2 > _0n7) {
        if (k1 & _1n7)
          k1p = k1p.add(d);
        if (k2 & _1n7)
          k2p = k2p.add(d);
        d = d.double();
        k1 >>= _1n7;
        k2 >>= _1n7;
      }
      if (k1neg)
        k1p = k1p.negate();
      if (k2neg)
        k2p = k2p.negate();
      k2p = new Point2(Fp3.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
      return k1p.add(k2p);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(scalar) {
      assertGE(scalar);
      let n = scalar;
      let point, fake;
      const { endo } = CURVE;
      if (endo) {
        const { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
        let { p: k1p, f: f1p } = this.wNAF(k1);
        let { p: k2p, f: f2p } = this.wNAF(k2);
        k1p = wnaf.constTimeNegate(k1neg, k1p);
        k2p = wnaf.constTimeNegate(k2neg, k2p);
        k2p = new Point2(Fp3.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
        point = k1p.add(k2p);
        fake = f1p.add(f2p);
      } else {
        const { p, f: f2 } = this.wNAF(n);
        point = p;
        fake = f2;
      }
      return Point2.normalizeZ([point, fake])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(Q, a, b) {
      const G = Point2.BASE;
      const mul = (P, a2) => a2 === _0n7 || a2 === _1n7 || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2);
      const sum = mul(this, a).add(mul(Q, b));
      return sum.is0() ? void 0 : sum;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(iz) {
      const { px: x, py: y, pz: z } = this;
      const is0 = this.is0();
      if (iz == null)
        iz = is0 ? Fp3.ONE : Fp3.inv(z);
      const ax = Fp3.mul(x, iz);
      const ay = Fp3.mul(y, iz);
      const zz = Fp3.mul(z, iz);
      if (is0)
        return { x: Fp3.ZERO, y: Fp3.ZERO };
      if (!Fp3.eql(zz, Fp3.ONE))
        throw new Error("invZ was invalid");
      return { x: ax, y: ay };
    }
    isTorsionFree() {
      const { h: cofactor, isTorsionFree } = CURVE;
      if (cofactor === _1n7)
        return true;
      if (isTorsionFree)
        return isTorsionFree(Point2, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: cofactor, clearCofactor } = CURVE;
      if (cofactor === _1n7)
        return this;
      if (clearCofactor)
        return clearCofactor(Point2, this);
      return this.multiplyUnsafe(CURVE.h);
    }
    toRawBytes(isCompressed = true) {
      this.assertValidity();
      return toBytes2(Point2, this, isCompressed);
    }
    toHex(isCompressed = true) {
      return bytesToHex(this.toRawBytes(isCompressed));
    }
  }
  Point2.BASE = new Point2(CURVE.Gx, CURVE.Gy, Fp3.ONE);
  Point2.ZERO = new Point2(Fp3.ZERO, Fp3.ONE, Fp3.ZERO);
  const _bits = CURVE.nBitLength;
  const wnaf = wNAF(Point2, CURVE.endo ? Math.ceil(_bits / 2) : _bits);
  return {
    CURVE,
    ProjectivePoint: Point2,
    normPrivateKeyToScalar,
    weierstrassEquation,
    isWithinCurveOrder
  };
}
function validateOpts2(curve) {
  const opts = validateBasic(curve);
  validateObject(opts, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  });
  return Object.freeze({ lowS: true, ...opts });
}
function weierstrass(curveDef) {
  const CURVE = validateOpts2(curveDef);
  const { Fp: Fp3, n: CURVE_ORDER } = CURVE;
  const compressedLen = Fp3.BYTES + 1;
  const uncompressedLen = 2 * Fp3.BYTES + 1;
  function isValidFieldElement(num) {
    return _0n7 < num && num < Fp3.ORDER;
  }
  function modN(a) {
    return mod(a, CURVE_ORDER);
  }
  function invN(a) {
    return invert(a, CURVE_ORDER);
  }
  const { ProjectivePoint: Point2, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
    ...CURVE,
    toBytes(_c, point, isCompressed) {
      const a = point.toAffine();
      const x = Fp3.toBytes(a.x);
      const cat = concatBytes2;
      if (isCompressed) {
        return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
      } else {
        return cat(Uint8Array.from([4]), x, Fp3.toBytes(a.y));
      }
    },
    fromBytes(bytes2) {
      const len = bytes2.length;
      const head = bytes2[0];
      const tail = bytes2.subarray(1);
      if (len === compressedLen && (head === 2 || head === 3)) {
        const x = bytesToNumberBE(tail);
        if (!isValidFieldElement(x))
          throw new Error("Point is not on curve");
        const y2 = weierstrassEquation(x);
        let y = Fp3.sqrt(y2);
        const isYOdd = (y & _1n7) === _1n7;
        const isHeadOdd = (head & 1) === 1;
        if (isHeadOdd !== isYOdd)
          y = Fp3.neg(y);
        return { x, y };
      } else if (len === uncompressedLen && head === 4) {
        const x = Fp3.fromBytes(tail.subarray(0, Fp3.BYTES));
        const y = Fp3.fromBytes(tail.subarray(Fp3.BYTES, 2 * Fp3.BYTES));
        return { x, y };
      } else {
        throw new Error(`Point of length ${len} was invalid. Expected ${compressedLen} compressed bytes or ${uncompressedLen} uncompressed bytes`);
      }
    }
  });
  const numToNByteStr = (num) => bytesToHex(numberToBytesBE(num, CURVE.nByteLength));
  function isBiggerThanHalfOrder(number3) {
    const HALF = CURVE_ORDER >> _1n7;
    return number3 > HALF;
  }
  function normalizeS(s) {
    return isBiggerThanHalfOrder(s) ? modN(-s) : s;
  }
  const slcNum = (b, from, to) => bytesToNumberBE(b.slice(from, to));
  class Signature {
    constructor(r, s, recovery) {
      this.r = r;
      this.s = s;
      this.recovery = recovery;
      this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(hex) {
      const l = CURVE.nByteLength;
      hex = ensureBytes("compactSignature", hex, l * 2);
      return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(hex) {
      const { r, s } = DER.toSig(ensureBytes("DER", hex));
      return new Signature(r, s);
    }
    assertValidity() {
      if (!isWithinCurveOrder(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!isWithinCurveOrder(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(recovery) {
      return new Signature(this.r, this.s, recovery);
    }
    recoverPublicKey(msgHash) {
      const { r, s, recovery: rec } = this;
      const h = bits2int_modN(ensureBytes("msgHash", msgHash));
      if (rec == null || ![0, 1, 2, 3].includes(rec))
        throw new Error("recovery id invalid");
      const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
      if (radj >= Fp3.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const prefix = (rec & 1) === 0 ? "02" : "03";
      const R = Point2.fromHex(prefix + numToNByteStr(radj));
      const ir = invN(radj);
      const u1 = modN(-h * ir);
      const u2 = modN(s * ir);
      const Q = Point2.BASE.multiplyAndAddUnsafe(R, u1, u2);
      if (!Q)
        throw new Error("point at infinify");
      Q.assertValidity();
      return Q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return isBiggerThanHalfOrder(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new Signature(this.r, modN(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return hexToBytes(this.toDERHex());
    }
    toDERHex() {
      return DER.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return hexToBytes(this.toCompactHex());
    }
    toCompactHex() {
      return numToNByteStr(this.r) + numToNByteStr(this.s);
    }
  }
  const utils = {
    isValidPrivateKey(privateKey) {
      try {
        normPrivateKeyToScalar(privateKey);
        return true;
      } catch (error) {
        return false;
      }
    },
    normPrivateKeyToScalar,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const length = getMinHashLength(CURVE.n);
      return mapHashToField(CURVE.randomBytes(length), CURVE.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(windowSize = 8, point = Point2.BASE) {
      point._setWindowSize(windowSize);
      point.multiply(BigInt(3));
      return point;
    }
  };
  function getPublicKey2(privateKey, isCompressed = true) {
    return Point2.fromPrivateKey(privateKey).toRawBytes(isCompressed);
  }
  function isProbPub(item) {
    const arr = item instanceof Uint8Array;
    const str = typeof item === "string";
    const len = (arr || str) && item.length;
    if (arr)
      return len === compressedLen || len === uncompressedLen;
    if (str)
      return len === 2 * compressedLen || len === 2 * uncompressedLen;
    if (item instanceof Point2)
      return true;
    return false;
  }
  function getSharedSecret(privateA, publicB, isCompressed = true) {
    if (isProbPub(privateA))
      throw new Error("first arg must be private key");
    if (!isProbPub(publicB))
      throw new Error("second arg must be public key");
    const b = Point2.fromHex(publicB);
    return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
  }
  const bits2int = CURVE.bits2int || function(bytes2) {
    const num = bytesToNumberBE(bytes2);
    const delta = bytes2.length * 8 - CURVE.nBitLength;
    return delta > 0 ? num >> BigInt(delta) : num;
  };
  const bits2int_modN = CURVE.bits2int_modN || function(bytes2) {
    return modN(bits2int(bytes2));
  };
  const ORDER_MASK = bitMask(CURVE.nBitLength);
  function int2octets(num) {
    if (typeof num !== "bigint")
      throw new Error("bigint expected");
    if (!(_0n7 <= num && num < ORDER_MASK))
      throw new Error(`bigint expected < 2^${CURVE.nBitLength}`);
    return numberToBytesBE(num, CURVE.nByteLength);
  }
  function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
    if (["recovered", "canonical"].some((k) => k in opts))
      throw new Error("sign() legacy options not supported");
    const { hash: hash2, randomBytes: randomBytes2 } = CURVE;
    let { lowS, prehash, extraEntropy: ent } = opts;
    if (lowS == null)
      lowS = true;
    msgHash = ensureBytes("msgHash", msgHash);
    if (prehash)
      msgHash = ensureBytes("prehashed msgHash", hash2(msgHash));
    const h1int = bits2int_modN(msgHash);
    const d = normPrivateKeyToScalar(privateKey);
    const seedArgs = [int2octets(d), int2octets(h1int)];
    if (ent != null) {
      const e = ent === true ? randomBytes2(Fp3.BYTES) : ent;
      seedArgs.push(ensureBytes("extraEntropy", e));
    }
    const seed = concatBytes2(...seedArgs);
    const m = h1int;
    function k2sig(kBytes) {
      const k = bits2int(kBytes);
      if (!isWithinCurveOrder(k))
        return;
      const ik = invN(k);
      const q = Point2.BASE.multiply(k).toAffine();
      const r = modN(q.x);
      if (r === _0n7)
        return;
      const s = modN(ik * modN(m + r * d));
      if (s === _0n7)
        return;
      let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n7);
      let normS = s;
      if (lowS && isBiggerThanHalfOrder(s)) {
        normS = normalizeS(s);
        recovery ^= 1;
      }
      return new Signature(r, normS, recovery);
    }
    return { seed, k2sig };
  }
  const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
  const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
  function sign3(msgHash, privKey, opts = defaultSigOpts) {
    const { seed, k2sig } = prepSig(msgHash, privKey, opts);
    const C = CURVE;
    const drbg = createHmacDrbg(C.hash.outputLen, C.nByteLength, C.hmac);
    return drbg(seed, k2sig);
  }
  Point2.BASE._setWindowSize(8);
  function verify2(signature, msgHash, publicKey3, opts = defaultVerOpts) {
    const sg = signature;
    msgHash = ensureBytes("msgHash", msgHash);
    publicKey3 = ensureBytes("publicKey", publicKey3);
    if ("strict" in opts)
      throw new Error("options.strict was renamed to lowS");
    const { lowS, prehash } = opts;
    let _sig = void 0;
    let P;
    try {
      if (typeof sg === "string" || sg instanceof Uint8Array) {
        try {
          _sig = Signature.fromDER(sg);
        } catch (derError) {
          if (!(derError instanceof DER.Err))
            throw derError;
          _sig = Signature.fromCompact(sg);
        }
      } else if (typeof sg === "object" && typeof sg.r === "bigint" && typeof sg.s === "bigint") {
        const { r: r2, s: s2 } = sg;
        _sig = new Signature(r2, s2);
      } else {
        throw new Error("PARSE");
      }
      P = Point2.fromHex(publicKey3);
    } catch (error) {
      if (error.message === "PARSE")
        throw new Error(`signature must be Signature instance, Uint8Array or hex string`);
      return false;
    }
    if (lowS && _sig.hasHighS())
      return false;
    if (prehash)
      msgHash = CURVE.hash(msgHash);
    const { r, s } = _sig;
    const h = bits2int_modN(msgHash);
    const is2 = invN(s);
    const u1 = modN(h * is2);
    const u2 = modN(r * is2);
    const R = Point2.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine();
    if (!R)
      return false;
    const v = modN(R.x);
    return v === r;
  }
  return {
    CURVE,
    getPublicKey: getPublicKey2,
    getSharedSecret,
    sign: sign3,
    verify: verify2,
    ProjectivePoint: Point2,
    Signature,
    utils
  };
}

// node_modules/@noble/hashes/esm/hmac.js
var HMAC = class extends Hash {
  constructor(hash2, _key) {
    super();
    this.finished = false;
    this.destroyed = false;
    hash(hash2);
    const key = toBytes(_key);
    this.iHash = hash2.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad = new Uint8Array(blockLen);
    pad.set(key.length > blockLen ? hash2.create().update(key).digest() : key);
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54;
    this.iHash.update(pad);
    this.oHash = hash2.create();
    for (let i = 0; i < pad.length; i++)
      pad[i] ^= 54 ^ 92;
    this.oHash.update(pad);
    pad.fill(0);
  }
  update(buf) {
    exists(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    exists(this);
    bytes(out, this.outputLen);
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to) {
    to || (to = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to = to;
    to.finished = finished;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
};
var hmac = (hash2, key, message) => new HMAC(hash2, key).update(message).digest();
hmac.create = (hash2, key) => new HMAC(hash2, key);

// node_modules/@noble/curves/esm/_shortw_utils.js
function getHash(hash2) {
  return {
    hash: hash2,
    hmac: (key, ...msgs) => hmac(hash2, key, concatBytes(...msgs)),
    randomBytes
  };
}
function createCurve(curveDef, defHash) {
  const create2 = (hash2) => weierstrass({ ...curveDef, ...getHash(hash2) });
  return Object.freeze({ ...create2(defHash), create: create2 });
}

// node_modules/@noble/curves/esm/secp256k1.js
var secp256k1P = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
var secp256k1N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
var _1n8 = BigInt(1);
var _2n7 = BigInt(2);
var divNearest = (a, b) => (a + b / _2n7) / b;
function sqrtMod(y) {
  const P = secp256k1P;
  const _3n3 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
  const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
  const b2 = y * y * y % P;
  const b3 = b2 * b2 * y % P;
  const b6 = pow2(b3, _3n3, P) * b3 % P;
  const b9 = pow2(b6, _3n3, P) * b3 % P;
  const b11 = pow2(b9, _2n7, P) * b2 % P;
  const b22 = pow2(b11, _11n, P) * b11 % P;
  const b44 = pow2(b22, _22n, P) * b22 % P;
  const b88 = pow2(b44, _44n, P) * b44 % P;
  const b176 = pow2(b88, _88n, P) * b88 % P;
  const b220 = pow2(b176, _44n, P) * b44 % P;
  const b223 = pow2(b220, _3n3, P) * b3 % P;
  const t1 = pow2(b223, _23n, P) * b22 % P;
  const t2 = pow2(t1, _6n, P) * b2 % P;
  const root = pow2(t2, _2n7, P);
  if (!Fp2.eql(Fp2.sqr(root), y))
    throw new Error("Cannot find square root");
  return root;
}
var Fp2 = Field(secp256k1P, void 0, void 0, { sqrt: sqrtMod });
var secp256k1 = createCurve({
  a: BigInt(0),
  b: BigInt(7),
  Fp: Fp2,
  n: secp256k1N,
  // Base point (x, y) aka generator point
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  lowS: true,
  /**
   * secp256k1 belongs to Koblitz curves: it has efficiently computable endomorphism.
   * Endomorphism uses 2x less RAM, speeds up precomputation by 2x and ECDH / key recovery by 20%.
   * For precomputed wNAF it trades off 1/2 init time & 1/3 ram for 20% perf hit.
   * Explanation: https://gist.github.com/paulmillr/eb670806793e84df628a7c434a873066
   */
  endo: {
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (k) => {
      const n = secp256k1N;
      const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
      const b1 = -_1n8 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
      const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
      const b2 = a1;
      const POW_2_128 = BigInt("0x100000000000000000000000000000000");
      const c1 = divNearest(b2 * k, n);
      const c2 = divNearest(-b1 * k, n);
      let k1 = mod(k - c1 * a1 - c2 * a2, n);
      let k2 = mod(-c1 * b1 - c2 * b2, n);
      const k1neg = k1 > POW_2_128;
      const k2neg = k2 > POW_2_128;
      if (k1neg)
        k1 = n - k1;
      if (k2neg)
        k2 = n - k2;
      if (k1 > POW_2_128 || k2 > POW_2_128) {
        throw new Error("splitScalar: Endomorphism failed, k=" + k);
      }
      return { k1neg, k1, k2neg, k2 };
    }
  }
}, sha256);
var _0n8 = BigInt(0);
var Point = secp256k1.ProjectivePoint;

// node_modules/@solana/web3.js/lib/index.browser.esm.js
var generatePrivateKey = ed25519.utils.randomPrivateKey;
var generateKeypair = function generateKeypair2() {
  var privateScalar = ed25519.utils.randomPrivateKey();
  var publicKey3 = getPublicKey(privateScalar);
  var secretKey = new Uint8Array(64);
  secretKey.set(privateScalar);
  secretKey.set(publicKey3, 32);
  return {
    publicKey: publicKey3,
    secretKey
  };
};
var getPublicKey = ed25519.getPublicKey;
function isOnCurve(publicKey3) {
  try {
    ed25519.ExtendedPoint.fromHex(publicKey3);
    return true;
  } catch (_unused) {
    return false;
  }
}
var sign = function sign2(message, secretKey) {
  return ed25519.sign(message, secretKey.slice(0, 32));
};
var verify = ed25519.verify;
var toBuffer = function toBuffer2(arr) {
  if (import_buffer.Buffer.isBuffer(arr)) {
    return arr;
  } else if (arr instanceof Uint8Array) {
    return import_buffer.Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength);
  } else {
    return import_buffer.Buffer.from(arr);
  }
};
var Struct2 = /* @__PURE__ */ function() {
  function Struct3(properties) {
    _classCallCheck(this, Struct3);
    Object.assign(this, properties);
  }
  _createClass(Struct3, [{
    key: "encode",
    value: function encode() {
      return import_buffer.Buffer.from((0, import_borsh.serialize)(SOLANA_SCHEMA, this));
    }
  }], [{
    key: "decode",
    value: function decode(data) {
      return (0, import_borsh.deserialize)(SOLANA_SCHEMA, this, data);
    }
  }, {
    key: "decodeUnchecked",
    value: function decodeUnchecked(data) {
      return (0, import_borsh.deserializeUnchecked)(SOLANA_SCHEMA, this, data);
    }
  }]);
  return Struct3;
}();
var SOLANA_SCHEMA = /* @__PURE__ */ new Map();
var _Symbol$toStringTag;
function _createSuper$3(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$3();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$3() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var MAX_SEED_LENGTH = 32;
var PUBLIC_KEY_LENGTH = 32;
function isPublicKeyData(value) {
  return value._bn !== void 0;
}
var uniquePublicKeyCounter = 1;
_Symbol$toStringTag = Symbol.toStringTag;
var PublicKey = /* @__PURE__ */ function(_Struct) {
  _inherits(PublicKey2, _Struct);
  var _super = _createSuper$3(PublicKey2);
  function PublicKey2(value) {
    var _this;
    _classCallCheck(this, PublicKey2);
    _this = _super.call(this, {});
    _this._bn = void 0;
    if (isPublicKeyData(value)) {
      _this._bn = value._bn;
    } else {
      if (typeof value === "string") {
        var decoded = import_bs58.default.decode(value);
        if (decoded.length != PUBLIC_KEY_LENGTH) {
          throw new Error("Invalid public key input");
        }
        _this._bn = new import_bn.default(decoded);
      } else {
        _this._bn = new import_bn.default(value);
      }
      if (_this._bn.byteLength() > PUBLIC_KEY_LENGTH) {
        throw new Error("Invalid public key input");
      }
    }
    return _this;
  }
  _createClass(PublicKey2, [{
    key: "equals",
    value: (
      /**
       * Checks if two publicKeys are equal
       */
      function equals(publicKey3) {
        return this._bn.eq(publicKey3._bn);
      }
    )
    /**
     * Return the base-58 representation of the public key
     */
  }, {
    key: "toBase58",
    value: function toBase58() {
      return import_bs58.default.encode(this.toBytes());
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.toBase58();
    }
    /**
     * Return the byte array representation of the public key in big endian
     */
  }, {
    key: "toBytes",
    value: function toBytes2() {
      var buf = this.toBuffer();
      return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    /**
     * Return the Buffer representation of the public key in big endian
     */
  }, {
    key: "toBuffer",
    value: function toBuffer3() {
      var b = this._bn.toArrayLike(import_buffer.Buffer);
      if (b.length === PUBLIC_KEY_LENGTH) {
        return b;
      }
      var zeroPad = import_buffer.Buffer.alloc(32);
      b.copy(zeroPad, 32 - b.length);
      return zeroPad;
    }
  }, {
    key: _Symbol$toStringTag,
    get: function get() {
      return "PublicKey(".concat(this.toString(), ")");
    }
    /**
     * Return the base-58 representation of the public key
     */
  }, {
    key: "toString",
    value: function toString() {
      return this.toBase58();
    }
    /**
     * Derive a public key from another key, a seed, and a program ID.
     * The program ID will also serve as the owner of the public key, giving
     * it permission to write data to the account.
     */
    /* eslint-disable require-await */
  }], [{
    key: "unique",
    value: function unique() {
      var key = new PublicKey2(uniquePublicKeyCounter);
      uniquePublicKeyCounter += 1;
      return new PublicKey2(key.toBuffer());
    }
    /**
     * Default public key value. The base58-encoded string representation is all ones (as seen below)
     * The underlying BN number is 32 bytes that are all zeros
     */
  }, {
    key: "createWithSeed",
    value: function() {
      var _createWithSeed = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee(fromPublicKey, seed, programId) {
        var buffer, publicKeyBytes;
        return import_regenerator.default.wrap(function _callee$(_context) {
          while (1)
            switch (_context.prev = _context.next) {
              case 0:
                buffer = import_buffer.Buffer.concat([fromPublicKey.toBuffer(), import_buffer.Buffer.from(seed), programId.toBuffer()]);
                publicKeyBytes = sha256(buffer);
                return _context.abrupt("return", new PublicKey2(publicKeyBytes));
              case 3:
              case "end":
                return _context.stop();
            }
        }, _callee);
      }));
      function createWithSeed(_x, _x2, _x3) {
        return _createWithSeed.apply(this, arguments);
      }
      return createWithSeed;
    }()
    /**
     * Derive a program address from seeds and a program ID.
     */
    /* eslint-disable require-await */
  }, {
    key: "createProgramAddressSync",
    value: function createProgramAddressSync(seeds, programId) {
      var buffer = import_buffer.Buffer.alloc(0);
      seeds.forEach(function(seed) {
        if (seed.length > MAX_SEED_LENGTH) {
          throw new TypeError("Max seed length exceeded");
        }
        buffer = import_buffer.Buffer.concat([buffer, toBuffer(seed)]);
      });
      buffer = import_buffer.Buffer.concat([buffer, programId.toBuffer(), import_buffer.Buffer.from("ProgramDerivedAddress")]);
      var publicKeyBytes = sha256(buffer);
      if (isOnCurve(publicKeyBytes)) {
        throw new Error("Invalid seeds, address must fall off the curve");
      }
      return new PublicKey2(publicKeyBytes);
    }
    /**
     * Async version of createProgramAddressSync
     * For backwards compatibility
     *
     * @deprecated Use {@link createProgramAddressSync} instead
     */
    /* eslint-disable require-await */
  }, {
    key: "createProgramAddress",
    value: function() {
      var _createProgramAddress = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee2(seeds, programId) {
        return import_regenerator.default.wrap(function _callee2$(_context2) {
          while (1)
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.createProgramAddressSync(seeds, programId));
              case 1:
              case "end":
                return _context2.stop();
            }
        }, _callee2, this);
      }));
      function createProgramAddress(_x4, _x5) {
        return _createProgramAddress.apply(this, arguments);
      }
      return createProgramAddress;
    }()
    /**
     * Find a valid program address
     *
     * Valid program addresses must fall off the ed25519 curve.  This function
     * iterates a nonce until it finds one that when combined with the seeds
     * results in a valid program address.
     */
  }, {
    key: "findProgramAddressSync",
    value: function findProgramAddressSync(seeds, programId) {
      var nonce = 255;
      var address;
      while (nonce != 0) {
        try {
          var seedsWithNonce = seeds.concat(import_buffer.Buffer.from([nonce]));
          address = this.createProgramAddressSync(seedsWithNonce, programId);
        } catch (err) {
          if (err instanceof TypeError) {
            throw err;
          }
          nonce--;
          continue;
        }
        return [address, nonce];
      }
      throw new Error("Unable to find a viable program address nonce");
    }
    /**
     * Async version of findProgramAddressSync
     * For backwards compatibility
     *
     * @deprecated Use {@link findProgramAddressSync} instead
     */
  }, {
    key: "findProgramAddress",
    value: function() {
      var _findProgramAddress = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee3(seeds, programId) {
        return import_regenerator.default.wrap(function _callee3$(_context3) {
          while (1)
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.findProgramAddressSync(seeds, programId));
              case 1:
              case "end":
                return _context3.stop();
            }
        }, _callee3, this);
      }));
      function findProgramAddress(_x6, _x7) {
        return _findProgramAddress.apply(this, arguments);
      }
      return findProgramAddress;
    }()
    /**
     * Check that a pubkey is on the ed25519 curve.
     */
  }, {
    key: "isOnCurve",
    value: function isOnCurve$1(pubkeyData) {
      var pubkey = new PublicKey2(pubkeyData);
      return isOnCurve(pubkey.toBytes());
    }
  }]);
  return PublicKey2;
}(Struct2);
PublicKey["default"] = new PublicKey("11111111111111111111111111111111");
SOLANA_SCHEMA.set(PublicKey, {
  kind: "struct",
  fields: [["_bn", "u256"]]
});
var BPF_LOADER_DEPRECATED_PROGRAM_ID = new PublicKey("BPFLoader1111111111111111111111111111111111");
var PACKET_DATA_SIZE = 1280 - 40 - 8;
var VERSION_PREFIX_MASK = 127;
var SIGNATURE_LENGTH_IN_BYTES = 64;
function _createSuper$2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$2();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$2() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var TransactionExpiredBlockheightExceededError = /* @__PURE__ */ function(_Error) {
  _inherits(TransactionExpiredBlockheightExceededError2, _Error);
  var _super = _createSuper$2(TransactionExpiredBlockheightExceededError2);
  function TransactionExpiredBlockheightExceededError2(signature) {
    var _this;
    _classCallCheck(this, TransactionExpiredBlockheightExceededError2);
    _this = _super.call(this, "Signature ".concat(signature, " has expired: block height exceeded."));
    _this.signature = void 0;
    _this.signature = signature;
    return _this;
  }
  return _createClass(TransactionExpiredBlockheightExceededError2);
}(/* @__PURE__ */ _wrapNativeSuper(Error));
Object.defineProperty(TransactionExpiredBlockheightExceededError.prototype, "name", {
  value: "TransactionExpiredBlockheightExceededError"
});
var TransactionExpiredTimeoutError = /* @__PURE__ */ function(_Error2) {
  _inherits(TransactionExpiredTimeoutError2, _Error2);
  var _super2 = _createSuper$2(TransactionExpiredTimeoutError2);
  function TransactionExpiredTimeoutError2(signature, timeoutSeconds) {
    var _this2;
    _classCallCheck(this, TransactionExpiredTimeoutError2);
    _this2 = _super2.call(this, "Transaction was not confirmed in ".concat(timeoutSeconds.toFixed(2), " seconds. It is ") + "unknown if it succeeded or failed. Check signature " + "".concat(signature, " using the Solana Explorer or CLI tools."));
    _this2.signature = void 0;
    _this2.signature = signature;
    return _this2;
  }
  return _createClass(TransactionExpiredTimeoutError2);
}(/* @__PURE__ */ _wrapNativeSuper(Error));
Object.defineProperty(TransactionExpiredTimeoutError.prototype, "name", {
  value: "TransactionExpiredTimeoutError"
});
var TransactionExpiredNonceInvalidError = /* @__PURE__ */ function(_Error3) {
  _inherits(TransactionExpiredNonceInvalidError2, _Error3);
  var _super3 = _createSuper$2(TransactionExpiredNonceInvalidError2);
  function TransactionExpiredNonceInvalidError2(signature) {
    var _this3;
    _classCallCheck(this, TransactionExpiredNonceInvalidError2);
    _this3 = _super3.call(this, "Signature ".concat(signature, " has expired: the nonce is no longer valid."));
    _this3.signature = void 0;
    _this3.signature = signature;
    return _this3;
  }
  return _createClass(TransactionExpiredNonceInvalidError2);
}(/* @__PURE__ */ _wrapNativeSuper(Error));
Object.defineProperty(TransactionExpiredNonceInvalidError.prototype, "name", {
  value: "TransactionExpiredNonceInvalidError"
});
function _createForOfIteratorHelper$5(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$5(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f2() {
    try {
      if (!normalCompletion && it["return"] != null)
        it["return"]();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray$5(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$5(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$5(o, minLen);
}
function _arrayLikeToArray$5(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var MessageAccountKeys = /* @__PURE__ */ function() {
  function MessageAccountKeys2(staticAccountKeys, accountKeysFromLookups) {
    _classCallCheck(this, MessageAccountKeys2);
    this.staticAccountKeys = void 0;
    this.accountKeysFromLookups = void 0;
    this.staticAccountKeys = staticAccountKeys;
    this.accountKeysFromLookups = accountKeysFromLookups;
  }
  _createClass(MessageAccountKeys2, [{
    key: "keySegments",
    value: function keySegments() {
      var keySegments2 = [this.staticAccountKeys];
      if (this.accountKeysFromLookups) {
        keySegments2.push(this.accountKeysFromLookups.writable);
        keySegments2.push(this.accountKeysFromLookups.readonly);
      }
      return keySegments2;
    }
  }, {
    key: "get",
    value: function get(index) {
      var _iterator = _createForOfIteratorHelper$5(this.keySegments()), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var keySegment = _step.value;
          if (index < keySegment.length) {
            return keySegment[index];
          } else {
            index -= keySegment.length;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return;
    }
  }, {
    key: "length",
    get: function get() {
      return this.keySegments().flat().length;
    }
  }, {
    key: "compileInstructions",
    value: function compileInstructions(instructions) {
      var U8_MAX = 255;
      if (this.length > U8_MAX + 1) {
        throw new Error("Account index overflow encountered during compilation");
      }
      var keyIndexMap = /* @__PURE__ */ new Map();
      this.keySegments().flat().forEach(function(key, index) {
        keyIndexMap.set(key.toBase58(), index);
      });
      var findKeyIndex = function findKeyIndex2(key) {
        var keyIndex = keyIndexMap.get(key.toBase58());
        if (keyIndex === void 0)
          throw new Error("Encountered an unknown instruction account key during compilation");
        return keyIndex;
      };
      return instructions.map(function(instruction) {
        return {
          programIdIndex: findKeyIndex(instruction.programId),
          accountKeyIndexes: instruction.keys.map(function(meta) {
            return findKeyIndex(meta.pubkey);
          }),
          data: instruction.data
        };
      });
    }
  }]);
  return MessageAccountKeys2;
}();
var publicKey = function publicKey2() {
  var property = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "publicKey";
  return BufferLayout.blob(32, property);
};
var rustString = function rustString2() {
  var property = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "string";
  var rsl = BufferLayout.struct([BufferLayout.u32("length"), BufferLayout.u32("lengthPadding"), BufferLayout.blob(BufferLayout.offset(BufferLayout.u32(), -8), "chars")], property);
  var _decode = rsl.decode.bind(rsl);
  var _encode = rsl.encode.bind(rsl);
  var rslShim = rsl;
  rslShim.decode = function(b, offset2) {
    var data = _decode(b, offset2);
    return data["chars"].toString();
  };
  rslShim.encode = function(str, b, offset2) {
    var data = {
      chars: import_buffer.Buffer.from(str, "utf8")
    };
    return _encode(data, b, offset2);
  };
  rslShim.alloc = function(str) {
    return BufferLayout.u32().span + BufferLayout.u32().span + import_buffer.Buffer.from(str, "utf8").length;
  };
  return rslShim;
};
var authorized = function authorized2() {
  var property = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "authorized";
  return BufferLayout.struct([publicKey("staker"), publicKey("withdrawer")], property);
};
var lockup = function lockup2() {
  var property = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "lockup";
  return BufferLayout.struct([BufferLayout.ns64("unixTimestamp"), BufferLayout.ns64("epoch"), publicKey("custodian")], property);
};
var voteInit = function voteInit2() {
  var property = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "voteInit";
  return BufferLayout.struct([publicKey("nodePubkey"), publicKey("authorizedVoter"), publicKey("authorizedWithdrawer"), BufferLayout.u8("commission")], property);
};
var voteAuthorizeWithSeedArgs = function voteAuthorizeWithSeedArgs2() {
  var property = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "voteAuthorizeWithSeedArgs";
  return BufferLayout.struct([BufferLayout.u32("voteAuthorizationType"), publicKey("currentAuthorityDerivedKeyOwnerPubkey"), rustString("currentAuthorityDerivedKeySeed"), publicKey("newAuthorized")], property);
};
function getAlloc(type2, fields) {
  var getItemAlloc = function getItemAlloc2(item) {
    if (item.span >= 0) {
      return item.span;
    } else if (typeof item.alloc === "function") {
      return item.alloc(fields[item.property]);
    } else if ("count" in item && "elementLayout" in item) {
      var field = fields[item.property];
      if (Array.isArray(field)) {
        return field.length * getItemAlloc2(item.elementLayout);
      }
    } else if ("fields" in item) {
      return getAlloc({
        layout: item
      }, fields[item.property]);
    }
    return 0;
  };
  var alloc = 0;
  type2.layout.fields.forEach(function(item) {
    alloc += getItemAlloc(item);
  });
  return alloc;
}
function decodeLength(bytes2) {
  var len = 0;
  var size = 0;
  for (; ; ) {
    var elem = bytes2.shift();
    len |= (elem & 127) << size * 7;
    size += 1;
    if ((elem & 128) === 0) {
      break;
    }
  }
  return len;
}
function encodeLength(bytes2, len) {
  var rem_len = len;
  for (; ; ) {
    var elem = rem_len & 127;
    rem_len >>= 7;
    if (rem_len == 0) {
      bytes2.push(elem);
      break;
    } else {
      elem |= 128;
      bytes2.push(elem);
    }
  }
}
function assert2(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}
function _createForOfIteratorHelper$4(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$4(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f2() {
    try {
      if (!normalCompletion && it["return"] != null)
        it["return"]();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray$4(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$4(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$4(o, minLen);
}
function _arrayLikeToArray$4(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var CompiledKeys = /* @__PURE__ */ function() {
  function CompiledKeys2(payer, keyMetaMap) {
    _classCallCheck(this, CompiledKeys2);
    this.payer = void 0;
    this.keyMetaMap = void 0;
    this.payer = payer;
    this.keyMetaMap = keyMetaMap;
  }
  _createClass(CompiledKeys2, [{
    key: "getMessageComponents",
    value: function getMessageComponents() {
      var mapEntries = _toConsumableArray(this.keyMetaMap.entries());
      assert2(mapEntries.length <= 256, "Max static account keys length exceeded");
      var writableSigners = mapEntries.filter(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 2), meta = _ref2[1];
        return meta.isSigner && meta.isWritable;
      });
      var readonlySigners = mapEntries.filter(function(_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2), meta = _ref4[1];
        return meta.isSigner && !meta.isWritable;
      });
      var writableNonSigners = mapEntries.filter(function(_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2), meta = _ref6[1];
        return !meta.isSigner && meta.isWritable;
      });
      var readonlyNonSigners = mapEntries.filter(function(_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2), meta = _ref8[1];
        return !meta.isSigner && !meta.isWritable;
      });
      var header = {
        numRequiredSignatures: writableSigners.length + readonlySigners.length,
        numReadonlySignedAccounts: readonlySigners.length,
        numReadonlyUnsignedAccounts: readonlyNonSigners.length
      };
      {
        assert2(writableSigners.length > 0, "Expected at least one writable signer key");
        var _writableSigners$ = _slicedToArray(writableSigners[0], 1), payerAddress = _writableSigners$[0];
        assert2(payerAddress === this.payer.toBase58(), "Expected first writable signer key to be the fee payer");
      }
      var staticAccountKeys = [].concat(_toConsumableArray(writableSigners.map(function(_ref9) {
        var _ref10 = _slicedToArray(_ref9, 1), address = _ref10[0];
        return new PublicKey(address);
      })), _toConsumableArray(readonlySigners.map(function(_ref11) {
        var _ref12 = _slicedToArray(_ref11, 1), address = _ref12[0];
        return new PublicKey(address);
      })), _toConsumableArray(writableNonSigners.map(function(_ref13) {
        var _ref14 = _slicedToArray(_ref13, 1), address = _ref14[0];
        return new PublicKey(address);
      })), _toConsumableArray(readonlyNonSigners.map(function(_ref15) {
        var _ref16 = _slicedToArray(_ref15, 1), address = _ref16[0];
        return new PublicKey(address);
      })));
      return [header, staticAccountKeys];
    }
  }, {
    key: "extractTableLookup",
    value: function extractTableLookup(lookupTable) {
      var _this$drainKeysFoundI = this.drainKeysFoundInLookupTable(lookupTable.state.addresses, function(keyMeta) {
        return !keyMeta.isSigner && !keyMeta.isInvoked && keyMeta.isWritable;
      }), _this$drainKeysFoundI2 = _slicedToArray(_this$drainKeysFoundI, 2), writableIndexes = _this$drainKeysFoundI2[0], drainedWritableKeys = _this$drainKeysFoundI2[1];
      var _this$drainKeysFoundI3 = this.drainKeysFoundInLookupTable(lookupTable.state.addresses, function(keyMeta) {
        return !keyMeta.isSigner && !keyMeta.isInvoked && !keyMeta.isWritable;
      }), _this$drainKeysFoundI4 = _slicedToArray(_this$drainKeysFoundI3, 2), readonlyIndexes = _this$drainKeysFoundI4[0], drainedReadonlyKeys = _this$drainKeysFoundI4[1];
      if (writableIndexes.length === 0 && readonlyIndexes.length === 0) {
        return;
      }
      return [{
        accountKey: lookupTable.key,
        writableIndexes,
        readonlyIndexes
      }, {
        writable: drainedWritableKeys,
        readonly: drainedReadonlyKeys
      }];
    }
    /** @internal */
  }, {
    key: "drainKeysFoundInLookupTable",
    value: function drainKeysFoundInLookupTable(lookupTableEntries, keyMetaFilter) {
      var _this = this;
      var lookupTableIndexes = new Array();
      var drainedKeys = new Array();
      var _iterator = _createForOfIteratorHelper$4(this.keyMetaMap.entries()), _step;
      try {
        var _loop = function _loop2() {
          var _step$value = _slicedToArray(_step.value, 2), address = _step$value[0], keyMeta = _step$value[1];
          if (keyMetaFilter(keyMeta)) {
            var key = new PublicKey(address);
            var lookupTableIndex = lookupTableEntries.findIndex(function(entry) {
              return entry.equals(key);
            });
            if (lookupTableIndex >= 0) {
              assert2(lookupTableIndex < 256, "Max lookup table index exceeded");
              lookupTableIndexes.push(lookupTableIndex);
              drainedKeys.push(key);
              _this.keyMetaMap["delete"](address);
            }
          }
        };
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return [lookupTableIndexes, drainedKeys];
    }
  }], [{
    key: "compile",
    value: function compile(instructions, payer) {
      var keyMetaMap = /* @__PURE__ */ new Map();
      var getOrInsertDefault = function getOrInsertDefault2(pubkey) {
        var address = pubkey.toBase58();
        var keyMeta = keyMetaMap.get(address);
        if (keyMeta === void 0) {
          keyMeta = {
            isSigner: false,
            isWritable: false,
            isInvoked: false
          };
          keyMetaMap.set(address, keyMeta);
        }
        return keyMeta;
      };
      var payerKeyMeta = getOrInsertDefault(payer);
      payerKeyMeta.isSigner = true;
      payerKeyMeta.isWritable = true;
      var _iterator2 = _createForOfIteratorHelper$4(instructions), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var ix = _step2.value;
          getOrInsertDefault(ix.programId).isInvoked = true;
          var _iterator3 = _createForOfIteratorHelper$4(ix.keys), _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
              var accountMeta = _step3.value;
              var _keyMeta = getOrInsertDefault(accountMeta.pubkey);
              _keyMeta.isSigner || (_keyMeta.isSigner = accountMeta.isSigner);
              _keyMeta.isWritable || (_keyMeta.isWritable = accountMeta.isWritable);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return new CompiledKeys2(payer, keyMetaMap);
    }
  }]);
  return CompiledKeys2;
}();
var Message = /* @__PURE__ */ function() {
  function Message2(args) {
    var _this = this;
    _classCallCheck(this, Message2);
    this.header = void 0;
    this.accountKeys = void 0;
    this.recentBlockhash = void 0;
    this.instructions = void 0;
    this.indexToProgramIds = /* @__PURE__ */ new Map();
    this.header = args.header;
    this.accountKeys = args.accountKeys.map(function(account) {
      return new PublicKey(account);
    });
    this.recentBlockhash = args.recentBlockhash;
    this.instructions = args.instructions;
    this.instructions.forEach(function(ix) {
      return _this.indexToProgramIds.set(ix.programIdIndex, _this.accountKeys[ix.programIdIndex]);
    });
  }
  _createClass(Message2, [{
    key: "version",
    get: function get() {
      return "legacy";
    }
  }, {
    key: "staticAccountKeys",
    get: function get() {
      return this.accountKeys;
    }
  }, {
    key: "compiledInstructions",
    get: function get() {
      return this.instructions.map(function(ix) {
        return {
          programIdIndex: ix.programIdIndex,
          accountKeyIndexes: ix.accounts,
          data: import_bs58.default.decode(ix.data)
        };
      });
    }
  }, {
    key: "addressTableLookups",
    get: function get() {
      return [];
    }
  }, {
    key: "getAccountKeys",
    value: function getAccountKeys() {
      return new MessageAccountKeys(this.staticAccountKeys);
    }
  }, {
    key: "isAccountSigner",
    value: function isAccountSigner(index) {
      return index < this.header.numRequiredSignatures;
    }
  }, {
    key: "isAccountWritable",
    value: function isAccountWritable(index) {
      var numSignedAccounts = this.header.numRequiredSignatures;
      if (index >= this.header.numRequiredSignatures) {
        var unsignedAccountIndex = index - numSignedAccounts;
        var numUnsignedAccounts = this.accountKeys.length - numSignedAccounts;
        var numWritableUnsignedAccounts = numUnsignedAccounts - this.header.numReadonlyUnsignedAccounts;
        return unsignedAccountIndex < numWritableUnsignedAccounts;
      } else {
        var numWritableSignedAccounts = numSignedAccounts - this.header.numReadonlySignedAccounts;
        return index < numWritableSignedAccounts;
      }
    }
  }, {
    key: "isProgramId",
    value: function isProgramId(index) {
      return this.indexToProgramIds.has(index);
    }
  }, {
    key: "programIds",
    value: function programIds() {
      return _toConsumableArray(this.indexToProgramIds.values());
    }
  }, {
    key: "nonProgramIds",
    value: function nonProgramIds() {
      var _this2 = this;
      return this.accountKeys.filter(function(_, index) {
        return !_this2.isProgramId(index);
      });
    }
  }, {
    key: "serialize",
    value: function serialize2() {
      var numKeys = this.accountKeys.length;
      var keyCount = [];
      encodeLength(keyCount, numKeys);
      var instructions = this.instructions.map(function(instruction) {
        var accounts = instruction.accounts, programIdIndex = instruction.programIdIndex;
        var data = Array.from(import_bs58.default.decode(instruction.data));
        var keyIndicesCount = [];
        encodeLength(keyIndicesCount, accounts.length);
        var dataCount = [];
        encodeLength(dataCount, data.length);
        return {
          programIdIndex,
          keyIndicesCount: import_buffer.Buffer.from(keyIndicesCount),
          keyIndices: accounts,
          dataLength: import_buffer.Buffer.from(dataCount),
          data
        };
      });
      var instructionCount = [];
      encodeLength(instructionCount, instructions.length);
      var instructionBuffer = import_buffer.Buffer.alloc(PACKET_DATA_SIZE);
      import_buffer.Buffer.from(instructionCount).copy(instructionBuffer);
      var instructionBufferLength = instructionCount.length;
      instructions.forEach(function(instruction) {
        var instructionLayout = BufferLayout.struct([BufferLayout.u8("programIdIndex"), BufferLayout.blob(instruction.keyIndicesCount.length, "keyIndicesCount"), BufferLayout.seq(BufferLayout.u8("keyIndex"), instruction.keyIndices.length, "keyIndices"), BufferLayout.blob(instruction.dataLength.length, "dataLength"), BufferLayout.seq(BufferLayout.u8("userdatum"), instruction.data.length, "data")]);
        var length2 = instructionLayout.encode(instruction, instructionBuffer, instructionBufferLength);
        instructionBufferLength += length2;
      });
      instructionBuffer = instructionBuffer.slice(0, instructionBufferLength);
      var signDataLayout = BufferLayout.struct([BufferLayout.blob(1, "numRequiredSignatures"), BufferLayout.blob(1, "numReadonlySignedAccounts"), BufferLayout.blob(1, "numReadonlyUnsignedAccounts"), BufferLayout.blob(keyCount.length, "keyCount"), BufferLayout.seq(publicKey("key"), numKeys, "keys"), publicKey("recentBlockhash")]);
      var transaction = {
        numRequiredSignatures: import_buffer.Buffer.from([this.header.numRequiredSignatures]),
        numReadonlySignedAccounts: import_buffer.Buffer.from([this.header.numReadonlySignedAccounts]),
        numReadonlyUnsignedAccounts: import_buffer.Buffer.from([this.header.numReadonlyUnsignedAccounts]),
        keyCount: import_buffer.Buffer.from(keyCount),
        keys: this.accountKeys.map(function(key) {
          return toBuffer(key.toBytes());
        }),
        recentBlockhash: import_bs58.default.decode(this.recentBlockhash)
      };
      var signData = import_buffer.Buffer.alloc(2048);
      var length = signDataLayout.encode(transaction, signData);
      instructionBuffer.copy(signData, length);
      return signData.slice(0, length + instructionBuffer.length);
    }
    /**
     * Decode a compiled message into a Message object.
     */
  }], [{
    key: "compile",
    value: function compile(args) {
      var compiledKeys = CompiledKeys.compile(args.instructions, args.payerKey);
      var _compiledKeys$getMess = compiledKeys.getMessageComponents(), _compiledKeys$getMess2 = _slicedToArray(_compiledKeys$getMess, 2), header = _compiledKeys$getMess2[0], staticAccountKeys = _compiledKeys$getMess2[1];
      var accountKeys = new MessageAccountKeys(staticAccountKeys);
      var instructions = accountKeys.compileInstructions(args.instructions).map(function(ix) {
        return {
          programIdIndex: ix.programIdIndex,
          accounts: ix.accountKeyIndexes,
          data: import_bs58.default.encode(ix.data)
        };
      });
      return new Message2({
        header,
        accountKeys: staticAccountKeys,
        recentBlockhash: args.recentBlockhash,
        instructions
      });
    }
  }, {
    key: "from",
    value: function from(buffer) {
      var byteArray = _toConsumableArray(buffer);
      var numRequiredSignatures = byteArray.shift();
      if (numRequiredSignatures !== (numRequiredSignatures & VERSION_PREFIX_MASK)) {
        throw new Error("Versioned messages must be deserialized with VersionedMessage.deserialize()");
      }
      var numReadonlySignedAccounts = byteArray.shift();
      var numReadonlyUnsignedAccounts = byteArray.shift();
      var accountCount = decodeLength(byteArray);
      var accountKeys = [];
      for (var i = 0; i < accountCount; i++) {
        var account = byteArray.slice(0, PUBLIC_KEY_LENGTH);
        byteArray = byteArray.slice(PUBLIC_KEY_LENGTH);
        accountKeys.push(new PublicKey(import_buffer.Buffer.from(account)));
      }
      var recentBlockhash = byteArray.slice(0, PUBLIC_KEY_LENGTH);
      byteArray = byteArray.slice(PUBLIC_KEY_LENGTH);
      var instructionCount = decodeLength(byteArray);
      var instructions = [];
      for (var _i = 0; _i < instructionCount; _i++) {
        var programIdIndex = byteArray.shift();
        var _accountCount = decodeLength(byteArray);
        var accounts = byteArray.slice(0, _accountCount);
        byteArray = byteArray.slice(_accountCount);
        var dataLength = decodeLength(byteArray);
        var dataSlice = byteArray.slice(0, dataLength);
        var data = import_bs58.default.encode(import_buffer.Buffer.from(dataSlice));
        byteArray = byteArray.slice(dataLength);
        instructions.push({
          programIdIndex,
          accounts,
          data
        });
      }
      var messageArgs = {
        header: {
          numRequiredSignatures,
          numReadonlySignedAccounts,
          numReadonlyUnsignedAccounts
        },
        recentBlockhash: import_bs58.default.encode(import_buffer.Buffer.from(recentBlockhash)),
        accountKeys,
        instructions
      };
      return new Message2(messageArgs);
    }
  }]);
  return Message2;
}();
function _createForOfIteratorHelper$3(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f2() {
    try {
      if (!normalCompletion && it["return"] != null)
        it["return"]();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray$3(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$3(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$3(o, minLen);
}
function _arrayLikeToArray$3(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var MessageV0 = /* @__PURE__ */ function() {
  function MessageV02(args) {
    _classCallCheck(this, MessageV02);
    this.header = void 0;
    this.staticAccountKeys = void 0;
    this.recentBlockhash = void 0;
    this.compiledInstructions = void 0;
    this.addressTableLookups = void 0;
    this.header = args.header;
    this.staticAccountKeys = args.staticAccountKeys;
    this.recentBlockhash = args.recentBlockhash;
    this.compiledInstructions = args.compiledInstructions;
    this.addressTableLookups = args.addressTableLookups;
  }
  _createClass(MessageV02, [{
    key: "version",
    get: function get() {
      return 0;
    }
  }, {
    key: "numAccountKeysFromLookups",
    get: function get() {
      var count = 0;
      var _iterator = _createForOfIteratorHelper$3(this.addressTableLookups), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var lookup = _step.value;
          count += lookup.readonlyIndexes.length + lookup.writableIndexes.length;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return count;
    }
  }, {
    key: "getAccountKeys",
    value: function getAccountKeys(args) {
      var accountKeysFromLookups;
      if (args && "accountKeysFromLookups" in args && args.accountKeysFromLookups) {
        if (this.numAccountKeysFromLookups != args.accountKeysFromLookups.writable.length + args.accountKeysFromLookups.readonly.length) {
          throw new Error("Failed to get account keys because of a mismatch in the number of account keys from lookups");
        }
        accountKeysFromLookups = args.accountKeysFromLookups;
      } else if (args && "addressLookupTableAccounts" in args && args.addressLookupTableAccounts) {
        accountKeysFromLookups = this.resolveAddressTableLookups(args.addressLookupTableAccounts);
      } else if (this.addressTableLookups.length > 0) {
        throw new Error("Failed to get account keys because address table lookups were not resolved");
      }
      return new MessageAccountKeys(this.staticAccountKeys, accountKeysFromLookups);
    }
  }, {
    key: "isAccountSigner",
    value: function isAccountSigner(index) {
      return index < this.header.numRequiredSignatures;
    }
  }, {
    key: "isAccountWritable",
    value: function isAccountWritable(index) {
      var numSignedAccounts = this.header.numRequiredSignatures;
      var numStaticAccountKeys = this.staticAccountKeys.length;
      if (index >= numStaticAccountKeys) {
        var lookupAccountKeysIndex = index - numStaticAccountKeys;
        var numWritableLookupAccountKeys = this.addressTableLookups.reduce(function(count, lookup) {
          return count + lookup.writableIndexes.length;
        }, 0);
        return lookupAccountKeysIndex < numWritableLookupAccountKeys;
      } else if (index >= this.header.numRequiredSignatures) {
        var unsignedAccountIndex = index - numSignedAccounts;
        var numUnsignedAccounts = numStaticAccountKeys - numSignedAccounts;
        var numWritableUnsignedAccounts = numUnsignedAccounts - this.header.numReadonlyUnsignedAccounts;
        return unsignedAccountIndex < numWritableUnsignedAccounts;
      } else {
        var numWritableSignedAccounts = numSignedAccounts - this.header.numReadonlySignedAccounts;
        return index < numWritableSignedAccounts;
      }
    }
  }, {
    key: "resolveAddressTableLookups",
    value: function resolveAddressTableLookups(addressLookupTableAccounts) {
      var accountKeysFromLookups = {
        writable: [],
        readonly: []
      };
      var _iterator2 = _createForOfIteratorHelper$3(this.addressTableLookups), _step2;
      try {
        var _loop = function _loop2() {
          var tableLookup = _step2.value;
          var tableAccount = addressLookupTableAccounts.find(function(account) {
            return account.key.equals(tableLookup.accountKey);
          });
          if (!tableAccount) {
            throw new Error("Failed to find address lookup table account for table key ".concat(tableLookup.accountKey.toBase58()));
          }
          var _iterator3 = _createForOfIteratorHelper$3(tableLookup.writableIndexes), _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
              var index = _step3.value;
              if (index < tableAccount.state.addresses.length) {
                accountKeysFromLookups.writable.push(tableAccount.state.addresses[index]);
              } else {
                throw new Error("Failed to find address for index ".concat(index, " in address lookup table ").concat(tableLookup.accountKey.toBase58()));
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          var _iterator4 = _createForOfIteratorHelper$3(tableLookup.readonlyIndexes), _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
              var _index = _step4.value;
              if (_index < tableAccount.state.addresses.length) {
                accountKeysFromLookups.readonly.push(tableAccount.state.addresses[_index]);
              } else {
                throw new Error("Failed to find address for index ".concat(_index, " in address lookup table ").concat(tableLookup.accountKey.toBase58()));
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        };
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          _loop();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return accountKeysFromLookups;
    }
  }, {
    key: "serialize",
    value: function serialize2() {
      var encodedStaticAccountKeysLength = Array();
      encodeLength(encodedStaticAccountKeysLength, this.staticAccountKeys.length);
      var serializedInstructions = this.serializeInstructions();
      var encodedInstructionsLength = Array();
      encodeLength(encodedInstructionsLength, this.compiledInstructions.length);
      var serializedAddressTableLookups = this.serializeAddressTableLookups();
      var encodedAddressTableLookupsLength = Array();
      encodeLength(encodedAddressTableLookupsLength, this.addressTableLookups.length);
      var messageLayout = BufferLayout.struct([BufferLayout.u8("prefix"), BufferLayout.struct([BufferLayout.u8("numRequiredSignatures"), BufferLayout.u8("numReadonlySignedAccounts"), BufferLayout.u8("numReadonlyUnsignedAccounts")], "header"), BufferLayout.blob(encodedStaticAccountKeysLength.length, "staticAccountKeysLength"), BufferLayout.seq(publicKey(), this.staticAccountKeys.length, "staticAccountKeys"), publicKey("recentBlockhash"), BufferLayout.blob(encodedInstructionsLength.length, "instructionsLength"), BufferLayout.blob(serializedInstructions.length, "serializedInstructions"), BufferLayout.blob(encodedAddressTableLookupsLength.length, "addressTableLookupsLength"), BufferLayout.blob(serializedAddressTableLookups.length, "serializedAddressTableLookups")]);
      var serializedMessage = new Uint8Array(PACKET_DATA_SIZE);
      var MESSAGE_VERSION_0_PREFIX = 1 << 7;
      var serializedMessageLength = messageLayout.encode({
        prefix: MESSAGE_VERSION_0_PREFIX,
        header: this.header,
        staticAccountKeysLength: new Uint8Array(encodedStaticAccountKeysLength),
        staticAccountKeys: this.staticAccountKeys.map(function(key) {
          return key.toBytes();
        }),
        recentBlockhash: import_bs58.default.decode(this.recentBlockhash),
        instructionsLength: new Uint8Array(encodedInstructionsLength),
        serializedInstructions,
        addressTableLookupsLength: new Uint8Array(encodedAddressTableLookupsLength),
        serializedAddressTableLookups
      }, serializedMessage);
      return serializedMessage.slice(0, serializedMessageLength);
    }
  }, {
    key: "serializeInstructions",
    value: function serializeInstructions() {
      var serializedLength = 0;
      var serializedInstructions = new Uint8Array(PACKET_DATA_SIZE);
      var _iterator5 = _createForOfIteratorHelper$3(this.compiledInstructions), _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
          var instruction = _step5.value;
          var encodedAccountKeyIndexesLength = Array();
          encodeLength(encodedAccountKeyIndexesLength, instruction.accountKeyIndexes.length);
          var encodedDataLength = Array();
          encodeLength(encodedDataLength, instruction.data.length);
          var instructionLayout = BufferLayout.struct([BufferLayout.u8("programIdIndex"), BufferLayout.blob(encodedAccountKeyIndexesLength.length, "encodedAccountKeyIndexesLength"), BufferLayout.seq(BufferLayout.u8(), instruction.accountKeyIndexes.length, "accountKeyIndexes"), BufferLayout.blob(encodedDataLength.length, "encodedDataLength"), BufferLayout.blob(instruction.data.length, "data")]);
          serializedLength += instructionLayout.encode({
            programIdIndex: instruction.programIdIndex,
            encodedAccountKeyIndexesLength: new Uint8Array(encodedAccountKeyIndexesLength),
            accountKeyIndexes: instruction.accountKeyIndexes,
            encodedDataLength: new Uint8Array(encodedDataLength),
            data: instruction.data
          }, serializedInstructions, serializedLength);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      return serializedInstructions.slice(0, serializedLength);
    }
  }, {
    key: "serializeAddressTableLookups",
    value: function serializeAddressTableLookups() {
      var serializedLength = 0;
      var serializedAddressTableLookups = new Uint8Array(PACKET_DATA_SIZE);
      var _iterator6 = _createForOfIteratorHelper$3(this.addressTableLookups), _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
          var lookup = _step6.value;
          var encodedWritableIndexesLength = Array();
          encodeLength(encodedWritableIndexesLength, lookup.writableIndexes.length);
          var encodedReadonlyIndexesLength = Array();
          encodeLength(encodedReadonlyIndexesLength, lookup.readonlyIndexes.length);
          var addressTableLookupLayout = BufferLayout.struct([publicKey("accountKey"), BufferLayout.blob(encodedWritableIndexesLength.length, "encodedWritableIndexesLength"), BufferLayout.seq(BufferLayout.u8(), lookup.writableIndexes.length, "writableIndexes"), BufferLayout.blob(encodedReadonlyIndexesLength.length, "encodedReadonlyIndexesLength"), BufferLayout.seq(BufferLayout.u8(), lookup.readonlyIndexes.length, "readonlyIndexes")]);
          serializedLength += addressTableLookupLayout.encode({
            accountKey: lookup.accountKey.toBytes(),
            encodedWritableIndexesLength: new Uint8Array(encodedWritableIndexesLength),
            writableIndexes: lookup.writableIndexes,
            encodedReadonlyIndexesLength: new Uint8Array(encodedReadonlyIndexesLength),
            readonlyIndexes: lookup.readonlyIndexes
          }, serializedAddressTableLookups, serializedLength);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      return serializedAddressTableLookups.slice(0, serializedLength);
    }
  }], [{
    key: "compile",
    value: function compile(args) {
      var compiledKeys = CompiledKeys.compile(args.instructions, args.payerKey);
      var addressTableLookups = new Array();
      var accountKeysFromLookups = {
        writable: new Array(),
        readonly: new Array()
      };
      var lookupTableAccounts = args.addressLookupTableAccounts || [];
      var _iterator7 = _createForOfIteratorHelper$3(lookupTableAccounts), _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
          var lookupTable = _step7.value;
          var extractResult = compiledKeys.extractTableLookup(lookupTable);
          if (extractResult !== void 0) {
            var _accountKeysFromLooku, _accountKeysFromLooku2;
            var _extractResult = _slicedToArray(extractResult, 2), addressTableLookup = _extractResult[0], _extractResult$ = _extractResult[1], writable = _extractResult$.writable, readonly = _extractResult$.readonly;
            addressTableLookups.push(addressTableLookup);
            (_accountKeysFromLooku = accountKeysFromLookups.writable).push.apply(_accountKeysFromLooku, _toConsumableArray(writable));
            (_accountKeysFromLooku2 = accountKeysFromLookups.readonly).push.apply(_accountKeysFromLooku2, _toConsumableArray(readonly));
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      var _compiledKeys$getMess = compiledKeys.getMessageComponents(), _compiledKeys$getMess2 = _slicedToArray(_compiledKeys$getMess, 2), header = _compiledKeys$getMess2[0], staticAccountKeys = _compiledKeys$getMess2[1];
      var accountKeys = new MessageAccountKeys(staticAccountKeys, accountKeysFromLookups);
      var compiledInstructions = accountKeys.compileInstructions(args.instructions);
      return new MessageV02({
        header,
        staticAccountKeys,
        recentBlockhash: args.recentBlockhash,
        compiledInstructions,
        addressTableLookups
      });
    }
  }, {
    key: "deserialize",
    value: function deserialize2(serializedMessage) {
      var byteArray = _toConsumableArray(serializedMessage);
      var prefix = byteArray.shift();
      var maskedPrefix = prefix & VERSION_PREFIX_MASK;
      assert2(prefix !== maskedPrefix, "Expected versioned message but received legacy message");
      var version2 = maskedPrefix;
      assert2(version2 === 0, "Expected versioned message with version 0 but found version ".concat(version2));
      var header = {
        numRequiredSignatures: byteArray.shift(),
        numReadonlySignedAccounts: byteArray.shift(),
        numReadonlyUnsignedAccounts: byteArray.shift()
      };
      var staticAccountKeys = [];
      var staticAccountKeysLength = decodeLength(byteArray);
      for (var i = 0; i < staticAccountKeysLength; i++) {
        staticAccountKeys.push(new PublicKey(byteArray.splice(0, PUBLIC_KEY_LENGTH)));
      }
      var recentBlockhash = import_bs58.default.encode(byteArray.splice(0, PUBLIC_KEY_LENGTH));
      var instructionCount = decodeLength(byteArray);
      var compiledInstructions = [];
      for (var _i = 0; _i < instructionCount; _i++) {
        var programIdIndex = byteArray.shift();
        var accountKeyIndexesLength = decodeLength(byteArray);
        var accountKeyIndexes = byteArray.splice(0, accountKeyIndexesLength);
        var dataLength = decodeLength(byteArray);
        var data = new Uint8Array(byteArray.splice(0, dataLength));
        compiledInstructions.push({
          programIdIndex,
          accountKeyIndexes,
          data
        });
      }
      var addressTableLookupsCount = decodeLength(byteArray);
      var addressTableLookups = [];
      for (var _i2 = 0; _i2 < addressTableLookupsCount; _i2++) {
        var accountKey = new PublicKey(byteArray.splice(0, PUBLIC_KEY_LENGTH));
        var writableIndexesLength = decodeLength(byteArray);
        var writableIndexes = byteArray.splice(0, writableIndexesLength);
        var readonlyIndexesLength = decodeLength(byteArray);
        var readonlyIndexes = byteArray.splice(0, readonlyIndexesLength);
        addressTableLookups.push({
          accountKey,
          writableIndexes,
          readonlyIndexes
        });
      }
      return new MessageV02({
        header,
        staticAccountKeys,
        recentBlockhash,
        compiledInstructions,
        addressTableLookups
      });
    }
  }]);
  return MessageV02;
}();
function _createForOfIteratorHelper$2(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f2() {
    try {
      if (!normalCompletion && it["return"] != null)
        it["return"]();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray$2(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$2(o, minLen);
}
function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$2(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
var TransactionStatus = /* @__PURE__ */ function(TransactionStatus2) {
  TransactionStatus2[TransactionStatus2["BLOCKHEIGHT_EXCEEDED"] = 0] = "BLOCKHEIGHT_EXCEEDED";
  TransactionStatus2[TransactionStatus2["PROCESSED"] = 1] = "PROCESSED";
  TransactionStatus2[TransactionStatus2["TIMED_OUT"] = 2] = "TIMED_OUT";
  TransactionStatus2[TransactionStatus2["NONCE_INVALID"] = 3] = "NONCE_INVALID";
  return TransactionStatus2;
}({});
var DEFAULT_SIGNATURE = import_buffer.Buffer.alloc(SIGNATURE_LENGTH_IN_BYTES).fill(0);
var TransactionInstruction = /* @__PURE__ */ function() {
  function TransactionInstruction2(opts) {
    _classCallCheck(this, TransactionInstruction2);
    this.keys = void 0;
    this.programId = void 0;
    this.data = import_buffer.Buffer.alloc(0);
    this.programId = opts.programId;
    this.keys = opts.keys;
    if (opts.data) {
      this.data = opts.data;
    }
  }
  _createClass(TransactionInstruction2, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        keys: this.keys.map(function(_ref) {
          var pubkey = _ref.pubkey, isSigner = _ref.isSigner, isWritable = _ref.isWritable;
          return {
            pubkey: pubkey.toJSON(),
            isSigner,
            isWritable
          };
        }),
        programId: this.programId.toJSON(),
        data: _toConsumableArray(this.data)
      };
    }
  }]);
  return TransactionInstruction2;
}();
var Transaction = /* @__PURE__ */ function() {
  function Transaction2(opts) {
    _classCallCheck(this, Transaction2);
    this.signatures = [];
    this.feePayer = void 0;
    this.instructions = [];
    this.recentBlockhash = void 0;
    this.lastValidBlockHeight = void 0;
    this.nonceInfo = void 0;
    this.minNonceContextSlot = void 0;
    this._message = void 0;
    this._json = void 0;
    if (!opts) {
      return;
    }
    if (opts.feePayer) {
      this.feePayer = opts.feePayer;
    }
    if (opts.signatures) {
      this.signatures = opts.signatures;
    }
    if (Object.prototype.hasOwnProperty.call(opts, "nonceInfo")) {
      var _ref2 = opts, minContextSlot = _ref2.minContextSlot, nonceInfo = _ref2.nonceInfo;
      this.minNonceContextSlot = minContextSlot;
      this.nonceInfo = nonceInfo;
    } else if (Object.prototype.hasOwnProperty.call(opts, "lastValidBlockHeight")) {
      var _ref3 = opts, blockhash = _ref3.blockhash, lastValidBlockHeight = _ref3.lastValidBlockHeight;
      this.recentBlockhash = blockhash;
      this.lastValidBlockHeight = lastValidBlockHeight;
    } else {
      var _ref4 = opts, recentBlockhash = _ref4.recentBlockhash, _nonceInfo = _ref4.nonceInfo;
      if (_nonceInfo) {
        this.nonceInfo = _nonceInfo;
      }
      this.recentBlockhash = recentBlockhash;
    }
  }
  _createClass(Transaction2, [{
    key: "signature",
    get: (
      /**
       * The first (payer) Transaction signature
       *
       * @returns {Buffer | null} Buffer of payer's signature
       */
      function get() {
        if (this.signatures.length > 0) {
          return this.signatures[0].signature;
        }
        return null;
      }
    )
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        recentBlockhash: this.recentBlockhash || null,
        feePayer: this.feePayer ? this.feePayer.toJSON() : null,
        nonceInfo: this.nonceInfo ? {
          nonce: this.nonceInfo.nonce,
          nonceInstruction: this.nonceInfo.nonceInstruction.toJSON()
        } : null,
        instructions: this.instructions.map(function(instruction) {
          return instruction.toJSON();
        }),
        signers: this.signatures.map(function(_ref5) {
          var publicKey3 = _ref5.publicKey;
          return publicKey3.toJSON();
        })
      };
    }
    /**
     * Add one or more instructions to this Transaction
     *
     * @param {Array< Transaction | TransactionInstruction | TransactionInstructionCtorFields >} items - Instructions to add to the Transaction
     */
  }, {
    key: "add",
    value: function add2() {
      var _this = this;
      for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
        items[_key] = arguments[_key];
      }
      if (items.length === 0) {
        throw new Error("No instructions");
      }
      items.forEach(function(item) {
        if ("instructions" in item) {
          _this.instructions = _this.instructions.concat(item.instructions);
        } else if ("data" in item && "programId" in item && "keys" in item) {
          _this.instructions.push(item);
        } else {
          _this.instructions.push(new TransactionInstruction(item));
        }
      });
      return this;
    }
    /**
     * Compile transaction data
     */
  }, {
    key: "compileMessage",
    value: function compileMessage() {
      if (this._message && JSON.stringify(this.toJSON()) === JSON.stringify(this._json)) {
        return this._message;
      }
      var recentBlockhash;
      var instructions;
      if (this.nonceInfo) {
        recentBlockhash = this.nonceInfo.nonce;
        if (this.instructions[0] != this.nonceInfo.nonceInstruction) {
          instructions = [this.nonceInfo.nonceInstruction].concat(_toConsumableArray(this.instructions));
        } else {
          instructions = this.instructions;
        }
      } else {
        recentBlockhash = this.recentBlockhash;
        instructions = this.instructions;
      }
      if (!recentBlockhash) {
        throw new Error("Transaction recentBlockhash required");
      }
      if (instructions.length < 1) {
        console.warn("No instructions provided");
      }
      var feePayer;
      if (this.feePayer) {
        feePayer = this.feePayer;
      } else if (this.signatures.length > 0 && this.signatures[0].publicKey) {
        feePayer = this.signatures[0].publicKey;
      } else {
        throw new Error("Transaction fee payer required");
      }
      for (var i = 0; i < instructions.length; i++) {
        if (instructions[i].programId === void 0) {
          throw new Error("Transaction instruction index ".concat(i, " has undefined program id"));
        }
      }
      var programIds = [];
      var accountMetas = [];
      instructions.forEach(function(instruction) {
        instruction.keys.forEach(function(accountMeta) {
          accountMetas.push(_objectSpread$2({}, accountMeta));
        });
        var programId = instruction.programId.toString();
        if (!programIds.includes(programId)) {
          programIds.push(programId);
        }
      });
      programIds.forEach(function(programId) {
        accountMetas.push({
          pubkey: new PublicKey(programId),
          isSigner: false,
          isWritable: false
        });
      });
      var uniqueMetas = [];
      accountMetas.forEach(function(accountMeta) {
        var pubkeyString = accountMeta.pubkey.toString();
        var uniqueIndex = uniqueMetas.findIndex(function(x) {
          return x.pubkey.toString() === pubkeyString;
        });
        if (uniqueIndex > -1) {
          uniqueMetas[uniqueIndex].isWritable = uniqueMetas[uniqueIndex].isWritable || accountMeta.isWritable;
          uniqueMetas[uniqueIndex].isSigner = uniqueMetas[uniqueIndex].isSigner || accountMeta.isSigner;
        } else {
          uniqueMetas.push(accountMeta);
        }
      });
      uniqueMetas.sort(function(x, y) {
        if (x.isSigner !== y.isSigner) {
          return x.isSigner ? -1 : 1;
        }
        if (x.isWritable !== y.isWritable) {
          return x.isWritable ? -1 : 1;
        }
        var options = {
          localeMatcher: "best fit",
          usage: "sort",
          sensitivity: "variant",
          ignorePunctuation: false,
          numeric: false,
          caseFirst: "lower"
        };
        return x.pubkey.toBase58().localeCompare(y.pubkey.toBase58(), "en", options);
      });
      var feePayerIndex = uniqueMetas.findIndex(function(x) {
        return x.pubkey.equals(feePayer);
      });
      if (feePayerIndex > -1) {
        var _uniqueMetas$splice = uniqueMetas.splice(feePayerIndex, 1), _uniqueMetas$splice2 = _slicedToArray(_uniqueMetas$splice, 1), payerMeta = _uniqueMetas$splice2[0];
        payerMeta.isSigner = true;
        payerMeta.isWritable = true;
        uniqueMetas.unshift(payerMeta);
      } else {
        uniqueMetas.unshift({
          pubkey: feePayer,
          isSigner: true,
          isWritable: true
        });
      }
      var _iterator = _createForOfIteratorHelper$2(this.signatures), _step;
      try {
        var _loop = function _loop2() {
          var signature = _step.value;
          var uniqueIndex = uniqueMetas.findIndex(function(x) {
            return x.pubkey.equals(signature.publicKey);
          });
          if (uniqueIndex > -1) {
            if (!uniqueMetas[uniqueIndex].isSigner) {
              uniqueMetas[uniqueIndex].isSigner = true;
              console.warn("Transaction references a signature that is unnecessary, only the fee payer and instruction signer accounts should sign a transaction. This behavior is deprecated and will throw an error in the next major version release.");
            }
          } else {
            throw new Error("unknown signer: ".concat(signature.publicKey.toString()));
          }
        };
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var numRequiredSignatures = 0;
      var numReadonlySignedAccounts = 0;
      var numReadonlyUnsignedAccounts = 0;
      var signedKeys = [];
      var unsignedKeys = [];
      uniqueMetas.forEach(function(_ref6) {
        var pubkey = _ref6.pubkey, isSigner = _ref6.isSigner, isWritable = _ref6.isWritable;
        if (isSigner) {
          signedKeys.push(pubkey.toString());
          numRequiredSignatures += 1;
          if (!isWritable) {
            numReadonlySignedAccounts += 1;
          }
        } else {
          unsignedKeys.push(pubkey.toString());
          if (!isWritable) {
            numReadonlyUnsignedAccounts += 1;
          }
        }
      });
      var accountKeys = signedKeys.concat(unsignedKeys);
      var compiledInstructions = instructions.map(function(instruction) {
        var data = instruction.data, programId = instruction.programId;
        return {
          programIdIndex: accountKeys.indexOf(programId.toString()),
          accounts: instruction.keys.map(function(meta) {
            return accountKeys.indexOf(meta.pubkey.toString());
          }),
          data: import_bs58.default.encode(data)
        };
      });
      compiledInstructions.forEach(function(instruction) {
        assert2(instruction.programIdIndex >= 0);
        instruction.accounts.forEach(function(keyIndex) {
          return assert2(keyIndex >= 0);
        });
      });
      return new Message({
        header: {
          numRequiredSignatures,
          numReadonlySignedAccounts,
          numReadonlyUnsignedAccounts
        },
        accountKeys,
        recentBlockhash,
        instructions: compiledInstructions
      });
    }
    /**
     * @internal
     */
  }, {
    key: "_compile",
    value: function _compile() {
      var message = this.compileMessage();
      var signedKeys = message.accountKeys.slice(0, message.header.numRequiredSignatures);
      if (this.signatures.length === signedKeys.length) {
        var valid = this.signatures.every(function(pair, index) {
          return signedKeys[index].equals(pair.publicKey);
        });
        if (valid)
          return message;
      }
      this.signatures = signedKeys.map(function(publicKey3) {
        return {
          signature: null,
          publicKey: publicKey3
        };
      });
      return message;
    }
    /**
     * Get a buffer of the Transaction data that need to be covered by signatures
     */
  }, {
    key: "serializeMessage",
    value: function serializeMessage() {
      return this._compile().serialize();
    }
    /**
     * Get the estimated fee associated with a transaction
     *
     * @param {Connection} connection Connection to RPC Endpoint.
     *
     * @returns {Promise<number | null>} The estimated fee for the transaction
     */
  }, {
    key: "getEstimatedFee",
    value: function() {
      var _getEstimatedFee = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee(connection) {
        return import_regenerator.default.wrap(function _callee$(_context) {
          while (1)
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return connection.getFeeForMessage(this.compileMessage());
              case 2:
                return _context.abrupt("return", _context.sent.value);
              case 3:
              case "end":
                return _context.stop();
            }
        }, _callee, this);
      }));
      function getEstimatedFee(_x) {
        return _getEstimatedFee.apply(this, arguments);
      }
      return getEstimatedFee;
    }()
    /**
     * Specify the public keys which will be used to sign the Transaction.
     * The first signer will be used as the transaction fee payer account.
     *
     * Signatures can be added with either `partialSign` or `addSignature`
     *
     * @deprecated Deprecated since v0.84.0. Only the fee payer needs to be
     * specified and it can be set in the Transaction constructor or with the
     * `feePayer` property.
     */
  }, {
    key: "setSigners",
    value: function setSigners() {
      for (var _len2 = arguments.length, signers = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        signers[_key2] = arguments[_key2];
      }
      if (signers.length === 0) {
        throw new Error("No signers");
      }
      var seen = /* @__PURE__ */ new Set();
      this.signatures = signers.filter(function(publicKey3) {
        var key = publicKey3.toString();
        if (seen.has(key)) {
          return false;
        } else {
          seen.add(key);
          return true;
        }
      }).map(function(publicKey3) {
        return {
          signature: null,
          publicKey: publicKey3
        };
      });
    }
    /**
     * Sign the Transaction with the specified signers. Multiple signatures may
     * be applied to a Transaction. The first signature is considered "primary"
     * and is used identify and confirm transactions.
     *
     * If the Transaction `feePayer` is not set, the first signer will be used
     * as the transaction fee payer account.
     *
     * Transaction fields should not be modified after the first call to `sign`,
     * as doing so may invalidate the signature and cause the Transaction to be
     * rejected.
     *
     * The Transaction must be assigned a valid `recentBlockhash` before invoking this method
     *
     * @param {Array<Signer>} signers Array of signers that will sign the transaction
     */
  }, {
    key: "sign",
    value: function sign3() {
      for (var _len3 = arguments.length, signers = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        signers[_key3] = arguments[_key3];
      }
      if (signers.length === 0) {
        throw new Error("No signers");
      }
      var seen = /* @__PURE__ */ new Set();
      var uniqueSigners = [];
      for (var _i = 0, _signers = signers; _i < _signers.length; _i++) {
        var signer = _signers[_i];
        var key = signer.publicKey.toString();
        if (seen.has(key)) {
          continue;
        } else {
          seen.add(key);
          uniqueSigners.push(signer);
        }
      }
      this.signatures = uniqueSigners.map(function(signer2) {
        return {
          signature: null,
          publicKey: signer2.publicKey
        };
      });
      var message = this._compile();
      this._partialSign.apply(this, [message].concat(uniqueSigners));
    }
    /**
     * Partially sign a transaction with the specified accounts. All accounts must
     * correspond to either the fee payer or a signer account in the transaction
     * instructions.
     *
     * All the caveats from the `sign` method apply to `partialSign`
     *
     * @param {Array<Signer>} signers Array of signers that will sign the transaction
     */
  }, {
    key: "partialSign",
    value: function partialSign() {
      for (var _len4 = arguments.length, signers = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        signers[_key4] = arguments[_key4];
      }
      if (signers.length === 0) {
        throw new Error("No signers");
      }
      var seen = /* @__PURE__ */ new Set();
      var uniqueSigners = [];
      for (var _i2 = 0, _signers2 = signers; _i2 < _signers2.length; _i2++) {
        var signer = _signers2[_i2];
        var key = signer.publicKey.toString();
        if (seen.has(key)) {
          continue;
        } else {
          seen.add(key);
          uniqueSigners.push(signer);
        }
      }
      var message = this._compile();
      this._partialSign.apply(this, [message].concat(uniqueSigners));
    }
    /**
     * @internal
     */
  }, {
    key: "_partialSign",
    value: function _partialSign(message) {
      var _this2 = this;
      var signData = message.serialize();
      for (var _len5 = arguments.length, signers = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        signers[_key5 - 1] = arguments[_key5];
      }
      signers.forEach(function(signer) {
        var signature = sign(signData, signer.secretKey);
        _this2._addSignature(signer.publicKey, toBuffer(signature));
      });
    }
    /**
     * Add an externally created signature to a transaction. The public key
     * must correspond to either the fee payer or a signer account in the transaction
     * instructions.
     *
     * @param {PublicKey} pubkey Public key that will be added to the transaction.
     * @param {Buffer} signature An externally created signature to add to the transaction.
     */
  }, {
    key: "addSignature",
    value: function addSignature(pubkey, signature) {
      this._compile();
      this._addSignature(pubkey, signature);
    }
    /**
     * @internal
     */
  }, {
    key: "_addSignature",
    value: function _addSignature(pubkey, signature) {
      assert2(signature.length === 64);
      var index = this.signatures.findIndex(function(sigpair) {
        return pubkey.equals(sigpair.publicKey);
      });
      if (index < 0) {
        throw new Error("unknown signer: ".concat(pubkey.toString()));
      }
      this.signatures[index].signature = import_buffer.Buffer.from(signature);
    }
    /**
     * Verify signatures of a Transaction
     * Optional parameter specifies if we're expecting a fully signed Transaction or a partially signed one.
     * If no boolean is provided, we expect a fully signed Transaction by default.
     *
     * @param {boolean} [requireAllSignatures=true] Require a fully signed Transaction
     */
  }, {
    key: "verifySignatures",
    value: function verifySignatures(requireAllSignatures) {
      return this._verifySignatures(this.serializeMessage(), requireAllSignatures === void 0 ? true : requireAllSignatures);
    }
    /**
     * @internal
     */
  }, {
    key: "_verifySignatures",
    value: function _verifySignatures(signData, requireAllSignatures) {
      var _iterator2 = _createForOfIteratorHelper$2(this.signatures), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var _step2$value = _step2.value, signature = _step2$value.signature, publicKey3 = _step2$value.publicKey;
          if (signature === null) {
            if (requireAllSignatures) {
              return false;
            }
          } else {
            if (!verify(signature, signData, publicKey3.toBytes())) {
              return false;
            }
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return true;
    }
    /**
     * Serialize the Transaction in the wire format.
     *
     * @param {Buffer} [config] Config of transaction.
     *
     * @returns {Buffer} Signature of transaction in wire format.
     */
  }, {
    key: "serialize",
    value: function serialize2(config) {
      var _Object$assign = Object.assign({
        requireAllSignatures: true,
        verifySignatures: true
      }, config), requireAllSignatures = _Object$assign.requireAllSignatures, verifySignatures = _Object$assign.verifySignatures;
      var signData = this.serializeMessage();
      if (verifySignatures && !this._verifySignatures(signData, requireAllSignatures)) {
        throw new Error("Signature verification failed");
      }
      return this._serialize(signData);
    }
    /**
     * @internal
     */
  }, {
    key: "_serialize",
    value: function _serialize(signData) {
      var signatures = this.signatures;
      var signatureCount = [];
      encodeLength(signatureCount, signatures.length);
      var transactionLength = signatureCount.length + signatures.length * 64 + signData.length;
      var wireTransaction = import_buffer.Buffer.alloc(transactionLength);
      assert2(signatures.length < 256);
      import_buffer.Buffer.from(signatureCount).copy(wireTransaction, 0);
      signatures.forEach(function(_ref7, index) {
        var signature = _ref7.signature;
        if (signature !== null) {
          assert2(signature.length === 64, "signature has invalid length");
          import_buffer.Buffer.from(signature).copy(wireTransaction, signatureCount.length + index * 64);
        }
      });
      signData.copy(wireTransaction, signatureCount.length + signatures.length * 64);
      assert2(wireTransaction.length <= PACKET_DATA_SIZE, "Transaction too large: ".concat(wireTransaction.length, " > ").concat(PACKET_DATA_SIZE));
      return wireTransaction;
    }
    /**
     * Deprecated method
     * @internal
     */
  }, {
    key: "keys",
    get: function get() {
      assert2(this.instructions.length === 1);
      return this.instructions[0].keys.map(function(keyObj) {
        return keyObj.pubkey;
      });
    }
    /**
     * Deprecated method
     * @internal
     */
  }, {
    key: "programId",
    get: function get() {
      assert2(this.instructions.length === 1);
      return this.instructions[0].programId;
    }
    /**
     * Deprecated method
     * @internal
     */
  }, {
    key: "data",
    get: function get() {
      assert2(this.instructions.length === 1);
      return this.instructions[0].data;
    }
    /**
     * Parse a wire transaction into a Transaction object.
     *
     * @param {Buffer | Uint8Array | Array<number>} buffer Signature of wire Transaction
     *
     * @returns {Transaction} Transaction associated with the signature
     */
  }], [{
    key: "from",
    value: function from(buffer) {
      var byteArray = _toConsumableArray(buffer);
      var signatureCount = decodeLength(byteArray);
      var signatures = [];
      for (var i = 0; i < signatureCount; i++) {
        var signature = byteArray.slice(0, SIGNATURE_LENGTH_IN_BYTES);
        byteArray = byteArray.slice(SIGNATURE_LENGTH_IN_BYTES);
        signatures.push(import_bs58.default.encode(import_buffer.Buffer.from(signature)));
      }
      return Transaction2.populate(Message.from(byteArray), signatures);
    }
    /**
     * Populate Transaction object from message and signatures
     *
     * @param {Message} message Message of transaction
     * @param {Array<string>} signatures List of signatures to assign to the transaction
     *
     * @returns {Transaction} The populated Transaction
     */
  }, {
    key: "populate",
    value: function populate(message) {
      var signatures = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
      var transaction = new Transaction2();
      transaction.recentBlockhash = message.recentBlockhash;
      if (message.header.numRequiredSignatures > 0) {
        transaction.feePayer = message.accountKeys[0];
      }
      signatures.forEach(function(signature, index) {
        var sigPubkeyPair = {
          signature: signature == import_bs58.default.encode(DEFAULT_SIGNATURE) ? null : import_bs58.default.decode(signature),
          publicKey: message.accountKeys[index]
        };
        transaction.signatures.push(sigPubkeyPair);
      });
      message.instructions.forEach(function(instruction) {
        var keys = instruction.accounts.map(function(account) {
          var pubkey = message.accountKeys[account];
          return {
            pubkey,
            isSigner: transaction.signatures.some(function(keyObj) {
              return keyObj.publicKey.toString() === pubkey.toString();
            }) || message.isAccountSigner(account),
            isWritable: message.isAccountWritable(account)
          };
        });
        transaction.instructions.push(new TransactionInstruction({
          keys,
          programId: message.accountKeys[instruction.programIdIndex],
          data: import_bs58.default.decode(instruction.data)
        }));
      });
      transaction._message = message;
      transaction._json = transaction.toJSON();
      return transaction;
    }
  }]);
  return Transaction2;
}();
var NUM_TICKS_PER_SECOND = 160;
var DEFAULT_TICKS_PER_SLOT = 64;
var NUM_SLOTS_PER_SECOND = NUM_TICKS_PER_SECOND / DEFAULT_TICKS_PER_SLOT;
var MS_PER_SLOT = 1e3 / NUM_SLOTS_PER_SECOND;
var SYSVAR_CLOCK_PUBKEY = new PublicKey("SysvarC1ock11111111111111111111111111111111");
var SYSVAR_EPOCH_SCHEDULE_PUBKEY = new PublicKey("SysvarEpochSchedu1e111111111111111111111111");
var SYSVAR_INSTRUCTIONS_PUBKEY = new PublicKey("Sysvar1nstructions1111111111111111111111111");
var SYSVAR_RECENT_BLOCKHASHES_PUBKEY = new PublicKey("SysvarRecentB1ockHashes11111111111111111111");
var SYSVAR_RENT_PUBKEY = new PublicKey("SysvarRent111111111111111111111111111111111");
var SYSVAR_REWARDS_PUBKEY = new PublicKey("SysvarRewards111111111111111111111111111111");
var SYSVAR_SLOT_HASHES_PUBKEY = new PublicKey("SysvarS1otHashes111111111111111111111111111");
var SYSVAR_SLOT_HISTORY_PUBKEY = new PublicKey("SysvarS1otHistory11111111111111111111111111");
var SYSVAR_STAKE_HISTORY_PUBKEY = new PublicKey("SysvarStakeHistory1111111111111111111111111");
function sendAndConfirmTransaction(_x, _x2, _x3, _x4) {
  return _sendAndConfirmTransaction.apply(this, arguments);
}
function _sendAndConfirmTransaction() {
  _sendAndConfirmTransaction = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee(connection, transaction, signers, options) {
    var sendOptions, signature, status, nonceInstruction, nonceAccountPubkey;
    return import_regenerator.default.wrap(function _callee$(_context) {
      while (1)
        switch (_context.prev = _context.next) {
          case 0:
            sendOptions = options && {
              skipPreflight: options.skipPreflight,
              preflightCommitment: options.preflightCommitment || options.commitment,
              maxRetries: options.maxRetries,
              minContextSlot: options.minContextSlot
            };
            _context.next = 3;
            return connection.sendTransaction(transaction, signers, sendOptions);
          case 3:
            signature = _context.sent;
            if (!(transaction.recentBlockhash != null && transaction.lastValidBlockHeight != null)) {
              _context.next = 10;
              break;
            }
            _context.next = 7;
            return connection.confirmTransaction({
              abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
              signature,
              blockhash: transaction.recentBlockhash,
              lastValidBlockHeight: transaction.lastValidBlockHeight
            }, options && options.commitment);
          case 7:
            status = _context.sent.value;
            _context.next = 22;
            break;
          case 10:
            if (!(transaction.minNonceContextSlot != null && transaction.nonceInfo != null)) {
              _context.next = 18;
              break;
            }
            nonceInstruction = transaction.nonceInfo.nonceInstruction;
            nonceAccountPubkey = nonceInstruction.keys[0].pubkey;
            _context.next = 15;
            return connection.confirmTransaction({
              abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
              minContextSlot: transaction.minNonceContextSlot,
              nonceAccountPubkey,
              nonceValue: transaction.nonceInfo.nonce,
              signature
            }, options && options.commitment);
          case 15:
            status = _context.sent.value;
            _context.next = 22;
            break;
          case 18:
            if ((options === null || options === void 0 ? void 0 : options.abortSignal) != null) {
              console.warn("sendAndConfirmTransaction(): A transaction with a deprecated confirmation strategy was supplied along with an `abortSignal`. Only transactions having `lastValidBlockHeight` or a combination of `nonceInfo` and `minNonceContextSlot` are abortable.");
            }
            _context.next = 21;
            return connection.confirmTransaction(signature, options && options.commitment);
          case 21:
            status = _context.sent.value;
          case 22:
            if (!status.err) {
              _context.next = 24;
              break;
            }
            throw new Error("Transaction ".concat(signature, " failed (").concat(JSON.stringify(status), ")"));
          case 24:
            return _context.abrupt("return", signature);
          case 25:
          case "end":
            return _context.stop();
        }
    }, _callee);
  }));
  return _sendAndConfirmTransaction.apply(this, arguments);
}
function sleep(ms) {
  return new Promise(function(resolve) {
    return setTimeout(resolve, ms);
  });
}
function encodeData(type2, fields) {
  var allocLength = type2.layout.span >= 0 ? type2.layout.span : getAlloc(type2, fields);
  var data = import_buffer.Buffer.alloc(allocLength);
  var layoutFields = Object.assign({
    instruction: type2.index
  }, fields);
  type2.layout.encode(layoutFields, data);
  return data;
}
var FeeCalculatorLayout = BufferLayout.nu64("lamportsPerSignature");
var NonceAccountLayout = BufferLayout.struct([BufferLayout.u32("version"), BufferLayout.u32("state"), publicKey("authorizedPubkey"), publicKey("nonce"), BufferLayout.struct([FeeCalculatorLayout], "feeCalculator")]);
var NONCE_ACCOUNT_LENGTH = NonceAccountLayout.span;
var NonceAccount = /* @__PURE__ */ function() {
  function NonceAccount2(args) {
    _classCallCheck(this, NonceAccount2);
    this.authorizedPubkey = void 0;
    this.nonce = void 0;
    this.feeCalculator = void 0;
    this.authorizedPubkey = args.authorizedPubkey;
    this.nonce = args.nonce;
    this.feeCalculator = args.feeCalculator;
  }
  _createClass(NonceAccount2, null, [{
    key: "fromAccountData",
    value: function fromAccountData(buffer) {
      var nonceAccount = NonceAccountLayout.decode(toBuffer(buffer), 0);
      return new NonceAccount2({
        authorizedPubkey: new PublicKey(nonceAccount.authorizedPubkey),
        nonce: new PublicKey(nonceAccount.nonce).toString(),
        feeCalculator: nonceAccount.feeCalculator
      });
    }
  }]);
  return NonceAccount2;
}();
var encodeDecode = function encodeDecode2(layout) {
  var decode = layout.decode.bind(layout);
  var encode = layout.encode.bind(layout);
  return {
    decode,
    encode
  };
};
var bigInt = function bigInt2(length) {
  return function(property) {
    var layout = (0, import_buffer_layout.blob)(length, property);
    var _encodeDecode = encodeDecode(layout), encode = _encodeDecode.encode, decode = _encodeDecode.decode;
    var bigIntLayout = layout;
    bigIntLayout.decode = function(buffer, offset2) {
      var src = decode(buffer, offset2);
      return (0, import_bigint_buffer.toBigIntLE)(import_buffer.Buffer.from(src));
    };
    bigIntLayout.encode = function(bigInt3, buffer, offset2) {
      var src = (0, import_bigint_buffer.toBufferLE)(bigInt3, length);
      return encode(src, buffer, offset2);
    };
    return bigIntLayout;
  };
};
var u642 = bigInt(8);
var SYSTEM_INSTRUCTION_LAYOUTS = Object.freeze({
  Create: {
    index: 0,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("lamports"), BufferLayout.ns64("space"), publicKey("programId")])
  },
  Assign: {
    index: 1,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("programId")])
  },
  Transfer: {
    index: 2,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), u642("lamports")])
  },
  CreateWithSeed: {
    index: 3,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("base"), rustString("seed"), BufferLayout.ns64("lamports"), BufferLayout.ns64("space"), publicKey("programId")])
  },
  AdvanceNonceAccount: {
    index: 4,
    layout: BufferLayout.struct([BufferLayout.u32("instruction")])
  },
  WithdrawNonceAccount: {
    index: 5,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("lamports")])
  },
  InitializeNonceAccount: {
    index: 6,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("authorized")])
  },
  AuthorizeNonceAccount: {
    index: 7,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("authorized")])
  },
  Allocate: {
    index: 8,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("space")])
  },
  AllocateWithSeed: {
    index: 9,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("base"), rustString("seed"), BufferLayout.ns64("space"), publicKey("programId")])
  },
  AssignWithSeed: {
    index: 10,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("base"), rustString("seed"), publicKey("programId")])
  },
  TransferWithSeed: {
    index: 11,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), u642("lamports"), rustString("seed"), publicKey("programId")])
  },
  UpgradeNonceAccount: {
    index: 12,
    layout: BufferLayout.struct([BufferLayout.u32("instruction")])
  }
});
var SystemProgram = /* @__PURE__ */ function() {
  function SystemProgram2() {
    _classCallCheck(this, SystemProgram2);
  }
  _createClass(SystemProgram2, null, [{
    key: "createAccount",
    value: (
      /**
       * Generate a transaction instruction that creates a new account
       */
      function createAccount(params) {
        var type2 = SYSTEM_INSTRUCTION_LAYOUTS.Create;
        var data = encodeData(type2, {
          lamports: params.lamports,
          space: params.space,
          programId: toBuffer(params.programId.toBuffer())
        });
        return new TransactionInstruction({
          keys: [{
            pubkey: params.fromPubkey,
            isSigner: true,
            isWritable: true
          }, {
            pubkey: params.newAccountPubkey,
            isSigner: true,
            isWritable: true
          }],
          programId: this.programId,
          data
        });
      }
    )
    /**
     * Generate a transaction instruction that transfers lamports from one account to another
     */
  }, {
    key: "transfer",
    value: function transfer(params) {
      var data;
      var keys;
      if ("basePubkey" in params) {
        var type2 = SYSTEM_INSTRUCTION_LAYOUTS.TransferWithSeed;
        data = encodeData(type2, {
          lamports: BigInt(params.lamports),
          seed: params.seed,
          programId: toBuffer(params.programId.toBuffer())
        });
        keys = [{
          pubkey: params.fromPubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: params.basePubkey,
          isSigner: true,
          isWritable: false
        }, {
          pubkey: params.toPubkey,
          isSigner: false,
          isWritable: true
        }];
      } else {
        var _type = SYSTEM_INSTRUCTION_LAYOUTS.Transfer;
        data = encodeData(_type, {
          lamports: BigInt(params.lamports)
        });
        keys = [{
          pubkey: params.fromPubkey,
          isSigner: true,
          isWritable: true
        }, {
          pubkey: params.toPubkey,
          isSigner: false,
          isWritable: true
        }];
      }
      return new TransactionInstruction({
        keys,
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a transaction instruction that assigns an account to a program
     */
  }, {
    key: "assign",
    value: function assign(params) {
      var data;
      var keys;
      if ("basePubkey" in params) {
        var type2 = SYSTEM_INSTRUCTION_LAYOUTS.AssignWithSeed;
        data = encodeData(type2, {
          base: toBuffer(params.basePubkey.toBuffer()),
          seed: params.seed,
          programId: toBuffer(params.programId.toBuffer())
        });
        keys = [{
          pubkey: params.accountPubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: params.basePubkey,
          isSigner: true,
          isWritable: false
        }];
      } else {
        var _type2 = SYSTEM_INSTRUCTION_LAYOUTS.Assign;
        data = encodeData(_type2, {
          programId: toBuffer(params.programId.toBuffer())
        });
        keys = [{
          pubkey: params.accountPubkey,
          isSigner: true,
          isWritable: true
        }];
      }
      return new TransactionInstruction({
        keys,
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a transaction instruction that creates a new account at
     *   an address generated with `from`, a seed, and programId
     */
  }, {
    key: "createAccountWithSeed",
    value: function createAccountWithSeed(params) {
      var type2 = SYSTEM_INSTRUCTION_LAYOUTS.CreateWithSeed;
      var data = encodeData(type2, {
        base: toBuffer(params.basePubkey.toBuffer()),
        seed: params.seed,
        lamports: params.lamports,
        space: params.space,
        programId: toBuffer(params.programId.toBuffer())
      });
      var keys = [{
        pubkey: params.fromPubkey,
        isSigner: true,
        isWritable: true
      }, {
        pubkey: params.newAccountPubkey,
        isSigner: false,
        isWritable: true
      }];
      if (params.basePubkey != params.fromPubkey) {
        keys.push({
          pubkey: params.basePubkey,
          isSigner: true,
          isWritable: false
        });
      }
      return new TransactionInstruction({
        keys,
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a transaction that creates a new Nonce account
     */
  }, {
    key: "createNonceAccount",
    value: function createNonceAccount(params) {
      var transaction = new Transaction();
      if ("basePubkey" in params && "seed" in params) {
        transaction.add(SystemProgram2.createAccountWithSeed({
          fromPubkey: params.fromPubkey,
          newAccountPubkey: params.noncePubkey,
          basePubkey: params.basePubkey,
          seed: params.seed,
          lamports: params.lamports,
          space: NONCE_ACCOUNT_LENGTH,
          programId: this.programId
        }));
      } else {
        transaction.add(SystemProgram2.createAccount({
          fromPubkey: params.fromPubkey,
          newAccountPubkey: params.noncePubkey,
          lamports: params.lamports,
          space: NONCE_ACCOUNT_LENGTH,
          programId: this.programId
        }));
      }
      var initParams = {
        noncePubkey: params.noncePubkey,
        authorizedPubkey: params.authorizedPubkey
      };
      transaction.add(this.nonceInitialize(initParams));
      return transaction;
    }
    /**
     * Generate an instruction to initialize a Nonce account
     */
  }, {
    key: "nonceInitialize",
    value: function nonceInitialize(params) {
      var type2 = SYSTEM_INSTRUCTION_LAYOUTS.InitializeNonceAccount;
      var data = encodeData(type2, {
        authorized: toBuffer(params.authorizedPubkey.toBuffer())
      });
      var instructionData = {
        keys: [{
          pubkey: params.noncePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: SYSVAR_RENT_PUBKEY,
          isSigner: false,
          isWritable: false
        }],
        programId: this.programId,
        data
      };
      return new TransactionInstruction(instructionData);
    }
    /**
     * Generate an instruction to advance the nonce in a Nonce account
     */
  }, {
    key: "nonceAdvance",
    value: function nonceAdvance(params) {
      var type2 = SYSTEM_INSTRUCTION_LAYOUTS.AdvanceNonceAccount;
      var data = encodeData(type2);
      var instructionData = {
        keys: [{
          pubkey: params.noncePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: params.authorizedPubkey,
          isSigner: true,
          isWritable: false
        }],
        programId: this.programId,
        data
      };
      return new TransactionInstruction(instructionData);
    }
    /**
     * Generate a transaction instruction that withdraws lamports from a Nonce account
     */
  }, {
    key: "nonceWithdraw",
    value: function nonceWithdraw(params) {
      var type2 = SYSTEM_INSTRUCTION_LAYOUTS.WithdrawNonceAccount;
      var data = encodeData(type2, {
        lamports: params.lamports
      });
      return new TransactionInstruction({
        keys: [{
          pubkey: params.noncePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: params.toPubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: SYSVAR_RENT_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: params.authorizedPubkey,
          isSigner: true,
          isWritable: false
        }],
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a transaction instruction that authorizes a new PublicKey as the authority
     * on a Nonce account.
     */
  }, {
    key: "nonceAuthorize",
    value: function nonceAuthorize(params) {
      var type2 = SYSTEM_INSTRUCTION_LAYOUTS.AuthorizeNonceAccount;
      var data = encodeData(type2, {
        authorized: toBuffer(params.newAuthorizedPubkey.toBuffer())
      });
      return new TransactionInstruction({
        keys: [{
          pubkey: params.noncePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: params.authorizedPubkey,
          isSigner: true,
          isWritable: false
        }],
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a transaction instruction that allocates space in an account without funding
     */
  }, {
    key: "allocate",
    value: function allocate(params) {
      var data;
      var keys;
      if ("basePubkey" in params) {
        var type2 = SYSTEM_INSTRUCTION_LAYOUTS.AllocateWithSeed;
        data = encodeData(type2, {
          base: toBuffer(params.basePubkey.toBuffer()),
          seed: params.seed,
          space: params.space,
          programId: toBuffer(params.programId.toBuffer())
        });
        keys = [{
          pubkey: params.accountPubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: params.basePubkey,
          isSigner: true,
          isWritable: false
        }];
      } else {
        var _type3 = SYSTEM_INSTRUCTION_LAYOUTS.Allocate;
        data = encodeData(_type3, {
          space: params.space
        });
        keys = [{
          pubkey: params.accountPubkey,
          isSigner: true,
          isWritable: true
        }];
      }
      return new TransactionInstruction({
        keys,
        programId: this.programId,
        data
      });
    }
  }]);
  return SystemProgram2;
}();
SystemProgram.programId = new PublicKey("11111111111111111111111111111111");
var CHUNK_SIZE = PACKET_DATA_SIZE - 300;
var Loader = /* @__PURE__ */ function() {
  function Loader2() {
    _classCallCheck(this, Loader2);
  }
  _createClass(Loader2, null, [{
    key: "getMinNumSignatures",
    value: (
      /**
       * Minimum number of signatures required to load a program not including
       * retries
       *
       * Can be used to calculate transaction fees
       */
      function getMinNumSignatures(dataLength) {
        return 2 * // Every transaction requires two signatures (payer + program)
        (Math.ceil(dataLength / Loader2.chunkSize) + 1 + // Add one for Create transaction
        1);
      }
    )
    /**
     * Loads a generic program
     *
     * @param connection The connection to use
     * @param payer System account that pays to load the program
     * @param program Account to load the program into
     * @param programId Public key that identifies the loader
     * @param data Program octets
     * @return true if program was loaded successfully, false if program was already loaded
     */
  }, {
    key: "load",
    value: function() {
      var _load = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee(connection, payer, program, programId, data) {
        var balanceNeeded, programInfo, transaction, dataLayout, chunkSize, offset2, array2, transactions, bytes2, _data, _transaction, REQUESTS_PER_SECOND, _dataLayout, _data2, _transaction2, deployCommitment, finalizeSignature, _yield$connection$con, context, value, currentSlot;
        return import_regenerator.default.wrap(function _callee$(_context) {
          while (1)
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return connection.getMinimumBalanceForRentExemption(data.length);
              case 2:
                balanceNeeded = _context.sent;
                _context.next = 5;
                return connection.getAccountInfo(program.publicKey, "confirmed");
              case 5:
                programInfo = _context.sent;
                transaction = null;
                if (!(programInfo !== null)) {
                  _context.next = 16;
                  break;
                }
                if (!programInfo.executable) {
                  _context.next = 11;
                  break;
                }
                console.error("Program load failed, account is already executable");
                return _context.abrupt("return", false);
              case 11:
                if (programInfo.data.length !== data.length) {
                  transaction = transaction || new Transaction();
                  transaction.add(SystemProgram.allocate({
                    accountPubkey: program.publicKey,
                    space: data.length
                  }));
                }
                if (!programInfo.owner.equals(programId)) {
                  transaction = transaction || new Transaction();
                  transaction.add(SystemProgram.assign({
                    accountPubkey: program.publicKey,
                    programId
                  }));
                }
                if (programInfo.lamports < balanceNeeded) {
                  transaction = transaction || new Transaction();
                  transaction.add(SystemProgram.transfer({
                    fromPubkey: payer.publicKey,
                    toPubkey: program.publicKey,
                    lamports: balanceNeeded - programInfo.lamports
                  }));
                }
                _context.next = 17;
                break;
              case 16:
                transaction = new Transaction().add(SystemProgram.createAccount({
                  fromPubkey: payer.publicKey,
                  newAccountPubkey: program.publicKey,
                  lamports: balanceNeeded > 0 ? balanceNeeded : 1,
                  space: data.length,
                  programId
                }));
              case 17:
                if (!(transaction !== null)) {
                  _context.next = 20;
                  break;
                }
                _context.next = 20;
                return sendAndConfirmTransaction(connection, transaction, [payer, program], {
                  commitment: "confirmed"
                });
              case 20:
                dataLayout = BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.u32("offset"), BufferLayout.u32("bytesLength"), BufferLayout.u32("bytesLengthPadding"), BufferLayout.seq(BufferLayout.u8("byte"), BufferLayout.offset(BufferLayout.u32(), -8), "bytes")]);
                chunkSize = Loader2.chunkSize;
                offset2 = 0;
                array2 = data;
                transactions = [];
              case 25:
                if (!(array2.length > 0)) {
                  _context.next = 39;
                  break;
                }
                bytes2 = array2.slice(0, chunkSize);
                _data = import_buffer.Buffer.alloc(chunkSize + 16);
                dataLayout.encode({
                  instruction: 0,
                  // Load instruction
                  offset: offset2,
                  bytes: bytes2,
                  bytesLength: 0,
                  bytesLengthPadding: 0
                }, _data);
                _transaction = new Transaction().add({
                  keys: [{
                    pubkey: program.publicKey,
                    isSigner: true,
                    isWritable: true
                  }],
                  programId,
                  data: _data
                });
                transactions.push(sendAndConfirmTransaction(connection, _transaction, [payer, program], {
                  commitment: "confirmed"
                }));
                if (!connection._rpcEndpoint.includes("solana.com")) {
                  _context.next = 35;
                  break;
                }
                REQUESTS_PER_SECOND = 4;
                _context.next = 35;
                return sleep(1e3 / REQUESTS_PER_SECOND);
              case 35:
                offset2 += chunkSize;
                array2 = array2.slice(chunkSize);
                _context.next = 25;
                break;
              case 39:
                _context.next = 41;
                return Promise.all(transactions);
              case 41:
                _dataLayout = BufferLayout.struct([BufferLayout.u32("instruction")]);
                _data2 = import_buffer.Buffer.alloc(_dataLayout.span);
                _dataLayout.encode({
                  instruction: 1
                  // Finalize instruction
                }, _data2);
                _transaction2 = new Transaction().add({
                  keys: [{
                    pubkey: program.publicKey,
                    isSigner: true,
                    isWritable: true
                  }, {
                    pubkey: SYSVAR_RENT_PUBKEY,
                    isSigner: false,
                    isWritable: false
                  }],
                  programId,
                  data: _data2
                });
                deployCommitment = "processed";
                _context.next = 48;
                return connection.sendTransaction(_transaction2, [payer, program], {
                  preflightCommitment: deployCommitment
                });
              case 48:
                finalizeSignature = _context.sent;
                _context.next = 51;
                return connection.confirmTransaction({
                  signature: finalizeSignature,
                  lastValidBlockHeight: _transaction2.lastValidBlockHeight,
                  blockhash: _transaction2.recentBlockhash
                }, deployCommitment);
              case 51:
                _yield$connection$con = _context.sent;
                context = _yield$connection$con.context;
                value = _yield$connection$con.value;
                if (!value.err) {
                  _context.next = 56;
                  break;
                }
                throw new Error("Transaction ".concat(finalizeSignature, " failed (").concat(JSON.stringify(value), ")"));
              case 56:
                _context.prev = 57;
                _context.next = 60;
                return connection.getSlot({
                  commitment: deployCommitment
                });
              case 60:
                currentSlot = _context.sent;
                if (!(currentSlot > context.slot)) {
                  _context.next = 63;
                  break;
                }
                return _context.abrupt("break", 71);
              case 63:
                _context.next = 67;
                break;
              case 65:
                _context.prev = 65;
                _context.t0 = _context["catch"](57);
              case 67:
                _context.next = 69;
                return new Promise(function(resolve) {
                  return setTimeout(resolve, Math.round(MS_PER_SLOT / 2));
                });
              case 69:
                _context.next = 56;
                break;
              case 71:
                return _context.abrupt("return", true);
              case 72:
              case "end":
                return _context.stop();
            }
        }, _callee, null, [[57, 65]]);
      }));
      function load(_x, _x2, _x3, _x4, _x5) {
        return _load.apply(this, arguments);
      }
      return load;
    }()
  }]);
  return Loader2;
}();
Loader.chunkSize = CHUNK_SIZE;
var BPF_LOADER_PROGRAM_ID = new PublicKey("BPFLoader2111111111111111111111111111111111");
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var objToString = Object.prototype.toString;
var objKeys = Object.keys || function(obj) {
  var keys = [];
  for (var name in obj) {
    keys.push(name);
  }
  return keys;
};
function stringify2(val, isArrayProp) {
  var i, max, str, keys, key, propVal, toStr2;
  if (val === true) {
    return "true";
  }
  if (val === false) {
    return "false";
  }
  switch (typeof val) {
    case "object":
      if (val === null) {
        return null;
      } else if (val.toJSON && typeof val.toJSON === "function") {
        return stringify2(val.toJSON(), isArrayProp);
      } else {
        toStr2 = objToString.call(val);
        if (toStr2 === "[object Array]") {
          str = "[";
          max = val.length - 1;
          for (i = 0; i < max; i++) {
            str += stringify2(val[i], true) + ",";
          }
          if (max > -1) {
            str += stringify2(val[i], true);
          }
          return str + "]";
        } else if (toStr2 === "[object Object]") {
          keys = objKeys(val).sort();
          max = keys.length;
          str = "";
          i = 0;
          while (i < max) {
            key = keys[i];
            propVal = stringify2(val[key], false);
            if (propVal !== void 0) {
              if (str) {
                str += ",";
              }
              str += JSON.stringify(key) + ":" + propVal;
            }
            i++;
          }
          return "{" + str + "}";
        } else {
          return JSON.stringify(val);
        }
      }
    case "function":
    case "undefined":
      return isArrayProp ? null : void 0;
    case "string":
      return JSON.stringify(val);
    default:
      return isFinite(val) ? val : null;
  }
}
var fastStableStringify = function(val) {
  var returnVal = stringify2(val, false);
  if (returnVal !== void 0) {
    return "" + returnVal;
  }
};
var fastStableStringify$1 = /* @__PURE__ */ getDefaultExportFromCjs(fastStableStringify);
var MINIMUM_SLOT_PER_EPOCH = 32;
function trailingZeros(n) {
  var trailingZeros2 = 0;
  while (n > 1) {
    n /= 2;
    trailingZeros2++;
  }
  return trailingZeros2;
}
function nextPowerOfTwo(n) {
  if (n === 0)
    return 1;
  n--;
  n |= n >> 1;
  n |= n >> 2;
  n |= n >> 4;
  n |= n >> 8;
  n |= n >> 16;
  n |= n >> 32;
  return n + 1;
}
var EpochSchedule = /* @__PURE__ */ function() {
  function EpochSchedule2(slotsPerEpoch, leaderScheduleSlotOffset, warmup, firstNormalEpoch, firstNormalSlot) {
    _classCallCheck(this, EpochSchedule2);
    this.slotsPerEpoch = void 0;
    this.leaderScheduleSlotOffset = void 0;
    this.warmup = void 0;
    this.firstNormalEpoch = void 0;
    this.firstNormalSlot = void 0;
    this.slotsPerEpoch = slotsPerEpoch;
    this.leaderScheduleSlotOffset = leaderScheduleSlotOffset;
    this.warmup = warmup;
    this.firstNormalEpoch = firstNormalEpoch;
    this.firstNormalSlot = firstNormalSlot;
  }
  _createClass(EpochSchedule2, [{
    key: "getEpoch",
    value: function getEpoch(slot) {
      return this.getEpochAndSlotIndex(slot)[0];
    }
  }, {
    key: "getEpochAndSlotIndex",
    value: function getEpochAndSlotIndex(slot) {
      if (slot < this.firstNormalSlot) {
        var epoch = trailingZeros(nextPowerOfTwo(slot + MINIMUM_SLOT_PER_EPOCH + 1)) - trailingZeros(MINIMUM_SLOT_PER_EPOCH) - 1;
        var epochLen = this.getSlotsInEpoch(epoch);
        var slotIndex = slot - (epochLen - MINIMUM_SLOT_PER_EPOCH);
        return [epoch, slotIndex];
      } else {
        var normalSlotIndex = slot - this.firstNormalSlot;
        var normalEpochIndex = Math.floor(normalSlotIndex / this.slotsPerEpoch);
        var _epoch = this.firstNormalEpoch + normalEpochIndex;
        var _slotIndex = normalSlotIndex % this.slotsPerEpoch;
        return [_epoch, _slotIndex];
      }
    }
  }, {
    key: "getFirstSlotInEpoch",
    value: function getFirstSlotInEpoch(epoch) {
      if (epoch <= this.firstNormalEpoch) {
        return (Math.pow(2, epoch) - 1) * MINIMUM_SLOT_PER_EPOCH;
      } else {
        return (epoch - this.firstNormalEpoch) * this.slotsPerEpoch + this.firstNormalSlot;
      }
    }
  }, {
    key: "getLastSlotInEpoch",
    value: function getLastSlotInEpoch(epoch) {
      return this.getFirstSlotInEpoch(epoch) + this.getSlotsInEpoch(epoch) - 1;
    }
  }, {
    key: "getSlotsInEpoch",
    value: function getSlotsInEpoch(epoch) {
      if (epoch < this.firstNormalEpoch) {
        return Math.pow(2, epoch + trailingZeros(MINIMUM_SLOT_PER_EPOCH));
      } else {
        return this.slotsPerEpoch;
      }
    }
  }]);
  return EpochSchedule2;
}();
function _createSuper$1(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$1();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$1() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var SendTransactionError = /* @__PURE__ */ function(_Error) {
  _inherits(SendTransactionError2, _Error);
  var _super = _createSuper$1(SendTransactionError2);
  function SendTransactionError2(message, logs) {
    var _this;
    _classCallCheck(this, SendTransactionError2);
    _this = _super.call(this, message);
    _this.logs = void 0;
    _this.logs = logs;
    return _this;
  }
  return _createClass(SendTransactionError2);
}(/* @__PURE__ */ _wrapNativeSuper(Error));
var SolanaJSONRPCError = /* @__PURE__ */ function(_Error2) {
  _inherits(SolanaJSONRPCError2, _Error2);
  var _super2 = _createSuper$1(SolanaJSONRPCError2);
  function SolanaJSONRPCError2(_ref, customMessage) {
    var _this2;
    var code = _ref.code, message = _ref.message, data = _ref.data;
    _classCallCheck(this, SolanaJSONRPCError2);
    _this2 = _super2.call(this, customMessage != null ? "".concat(customMessage, ": ").concat(message) : message);
    _this2.code = void 0;
    _this2.data = void 0;
    _this2.code = code;
    _this2.data = data;
    _this2.name = "SolanaJSONRPCError";
    return _this2;
  }
  return _createClass(SolanaJSONRPCError2);
}(/* @__PURE__ */ _wrapNativeSuper(Error));
var fetchImpl = globalThis.fetch;
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$1(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct2();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct2() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var RpcWebSocketClient = /* @__PURE__ */ function(_RpcWebSocketCommonCl) {
  _inherits(RpcWebSocketClient2, _RpcWebSocketCommonCl);
  var _super = _createSuper(RpcWebSocketClient2);
  function RpcWebSocketClient2(address, options, generate_request_id) {
    var _this;
    _classCallCheck(this, RpcWebSocketClient2);
    var webSocketFactory = function webSocketFactory2(url) {
      var rpc = (0, import_websocket.default)(url, _objectSpread$1({
        autoconnect: true,
        max_reconnects: 5,
        reconnect: true,
        reconnect_interval: 1e3
      }, options));
      if ("socket" in rpc) {
        _this.underlyingSocket = rpc.socket;
      } else {
        _this.underlyingSocket = rpc;
      }
      return rpc;
    };
    _this = _super.call(this, webSocketFactory, address, options, generate_request_id);
    _this.underlyingSocket = void 0;
    return _this;
  }
  _createClass(RpcWebSocketClient2, [{
    key: "call",
    value: function call() {
      var _this$underlyingSocke;
      var readyState = (_this$underlyingSocke = this.underlyingSocket) === null || _this$underlyingSocke === void 0 ? void 0 : _this$underlyingSocke.readyState;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (readyState === 1) {
        var _get2;
        return (_get2 = _get(_getPrototypeOf(RpcWebSocketClient2.prototype), "call", this)).call.apply(_get2, [this].concat(args));
      }
      return Promise.reject(new Error("Tried to call a JSON-RPC method `" + args[0] + "` but the socket was not `CONNECTING` or `OPEN` (`readyState` was " + readyState + ")"));
    }
  }, {
    key: "notify",
    value: function notify() {
      var _this$underlyingSocke2;
      var readyState = (_this$underlyingSocke2 = this.underlyingSocket) === null || _this$underlyingSocke2 === void 0 ? void 0 : _this$underlyingSocke2.readyState;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      if (readyState === 1) {
        var _get3;
        return (_get3 = _get(_getPrototypeOf(RpcWebSocketClient2.prototype), "notify", this)).call.apply(_get3, [this].concat(args));
      }
      return Promise.reject(new Error("Tried to send a JSON-RPC notification `" + args[0] + "` but the socket was not `CONNECTING` or `OPEN` (`readyState` was " + readyState + ")"));
    }
  }]);
  return RpcWebSocketClient2;
}(import_client.default);
function decodeData(type2, data) {
  var decoded;
  try {
    decoded = type2.layout.decode(data);
  } catch (err) {
    throw new Error("invalid instruction; " + err);
  }
  if (decoded.typeIndex !== type2.index) {
    throw new Error("invalid account data; account type mismatch ".concat(decoded.typeIndex, " != ").concat(type2.index));
  }
  return decoded;
}
var LOOKUP_TABLE_META_SIZE = 56;
var AddressLookupTableAccount = /* @__PURE__ */ function() {
  function AddressLookupTableAccount2(args) {
    _classCallCheck(this, AddressLookupTableAccount2);
    this.key = void 0;
    this.state = void 0;
    this.key = args.key;
    this.state = args.state;
  }
  _createClass(AddressLookupTableAccount2, [{
    key: "isActive",
    value: function isActive() {
      var U64_MAX = BigInt("0xffffffffffffffff");
      return this.state.deactivationSlot === U64_MAX;
    }
  }], [{
    key: "deserialize",
    value: function deserialize2(accountData) {
      var meta = decodeData(LookupTableMetaLayout, accountData);
      var serializedAddressesLen = accountData.length - LOOKUP_TABLE_META_SIZE;
      assert2(serializedAddressesLen >= 0, "lookup table is invalid");
      assert2(serializedAddressesLen % 32 === 0, "lookup table is invalid");
      var numSerializedAddresses = serializedAddressesLen / 32;
      var _BufferLayout$struct$ = BufferLayout.struct([BufferLayout.seq(publicKey(), numSerializedAddresses, "addresses")]).decode(accountData.slice(LOOKUP_TABLE_META_SIZE)), addresses = _BufferLayout$struct$.addresses;
      return {
        deactivationSlot: meta.deactivationSlot,
        lastExtendedSlot: meta.lastExtendedSlot,
        lastExtendedSlotStartIndex: meta.lastExtendedStartIndex,
        authority: meta.authority.length !== 0 ? new PublicKey(meta.authority[0]) : void 0,
        addresses: addresses.map(function(address) {
          return new PublicKey(address);
        })
      };
    }
  }]);
  return AddressLookupTableAccount2;
}();
var LookupTableMetaLayout = {
  index: 1,
  layout: BufferLayout.struct([
    BufferLayout.u32("typeIndex"),
    u642("deactivationSlot"),
    BufferLayout.nu64("lastExtendedSlot"),
    BufferLayout.u8("lastExtendedStartIndex"),
    BufferLayout.u8(),
    // option
    BufferLayout.seq(publicKey(), BufferLayout.offset(BufferLayout.u8(), -1), "authority")
  ])
};
var URL_RE = /^[^:]+:\/\/([^:[]+|\[[^\]]+\])(:\d+)?(.*)/i;
function makeWebsocketUrl(endpoint) {
  var matches = endpoint.match(URL_RE);
  if (matches == null) {
    throw TypeError("Failed to validate endpoint URL `".concat(endpoint, "`"));
  }
  var _matches = _slicedToArray(matches, 4);
  _matches[0];
  var hostish = _matches[1], portWithColon = _matches[2], rest = _matches[3];
  var protocol = endpoint.startsWith("https:") ? "wss:" : "ws:";
  var startPort = portWithColon == null ? null : parseInt(portWithColon.slice(1), 10);
  var websocketPort = (
    // Only shift the port by +1 as a convention for ws(s) only if given endpoint
    // is explictly specifying the endpoint port (HTTP-based RPC), assuming
    // we're directly trying to connect to solana-validator's ws listening port.
    // When the endpoint omits the port, we're connecting to the protocol
    // default ports: http(80) or https(443) and it's assumed we're behind a reverse
    // proxy which manages WebSocket upgrade and backend port redirection.
    startPort == null ? "" : ":".concat(startPort + 1)
  );
  return "".concat(protocol, "//").concat(hostish).concat(websocketPort).concat(rest);
}
var _process$env$npm_pack;
var _excluded = ["commitment"];
var _excluded2 = ["encoding"];
var _excluded3 = ["commitment"];
var _excluded4 = ["commitment"];
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
var PublicKeyFromString = coerce(instance(PublicKey), string(), function(value) {
  return new PublicKey(value);
});
var RawAccountDataResult = tuple([string(), literal("base64")]);
var BufferFromRawAccountData = coerce(instance(import_buffer.Buffer), RawAccountDataResult, function(value) {
  return import_buffer.Buffer.from(value[0], "base64");
});
var BLOCKHASH_CACHE_TIMEOUT_MS = 30 * 1e3;
function assertEndpointUrl(putativeUrl) {
  if (/^https?:/.test(putativeUrl) === false) {
    throw new TypeError("Endpoint URL must start with `http:` or `https:`.");
  }
  return putativeUrl;
}
function extractCommitmentFromConfig(commitmentOrConfig) {
  var commitment;
  var config;
  if (typeof commitmentOrConfig === "string") {
    commitment = commitmentOrConfig;
  } else if (commitmentOrConfig) {
    var specifiedCommitment = commitmentOrConfig.commitment, specifiedConfig = _objectWithoutProperties(commitmentOrConfig, _excluded);
    commitment = specifiedCommitment;
    config = specifiedConfig;
  }
  return {
    commitment,
    config
  };
}
function createRpcResult(result) {
  return union([type({
    jsonrpc: literal("2.0"),
    id: string(),
    result
  }), type({
    jsonrpc: literal("2.0"),
    id: string(),
    error: type({
      code: unknown(),
      message: string(),
      data: optional(any())
    })
  })]);
}
var UnknownRpcResult = createRpcResult(unknown());
function jsonRpcResult(schema) {
  return coerce(createRpcResult(schema), UnknownRpcResult, function(value) {
    if ("error" in value) {
      return value;
    } else {
      return _objectSpread(_objectSpread({}, value), {}, {
        result: create(value.result, schema)
      });
    }
  });
}
function jsonRpcResultAndContext(value) {
  return jsonRpcResult(type({
    context: type({
      slot: number2()
    }),
    value
  }));
}
function notificationResultAndContext(value) {
  return type({
    context: type({
      slot: number2()
    }),
    value
  });
}
function versionedMessageFromResponse(version2, response) {
  if (version2 === 0) {
    return new MessageV0({
      header: response.header,
      staticAccountKeys: response.accountKeys.map(function(accountKey) {
        return new PublicKey(accountKey);
      }),
      recentBlockhash: response.recentBlockhash,
      compiledInstructions: response.instructions.map(function(ix) {
        return {
          programIdIndex: ix.programIdIndex,
          accountKeyIndexes: ix.accounts,
          data: import_bs58.default.decode(ix.data)
        };
      }),
      addressTableLookups: response.addressTableLookups
    });
  } else {
    return new Message(response);
  }
}
var GetInflationGovernorResult = type({
  foundation: number2(),
  foundationTerm: number2(),
  initial: number2(),
  taper: number2(),
  terminal: number2()
});
var GetInflationRewardResult = jsonRpcResult(array(nullable(type({
  epoch: number2(),
  effectiveSlot: number2(),
  amount: number2(),
  postBalance: number2(),
  commission: optional(nullable(number2()))
}))));
var GetRecentPrioritizationFeesResult = array(type({
  slot: number2(),
  prioritizationFee: number2()
}));
var GetInflationRateResult = type({
  total: number2(),
  validator: number2(),
  foundation: number2(),
  epoch: number2()
});
var GetEpochInfoResult = type({
  epoch: number2(),
  slotIndex: number2(),
  slotsInEpoch: number2(),
  absoluteSlot: number2(),
  blockHeight: optional(number2()),
  transactionCount: optional(number2())
});
var GetEpochScheduleResult = type({
  slotsPerEpoch: number2(),
  leaderScheduleSlotOffset: number2(),
  warmup: boolean(),
  firstNormalEpoch: number2(),
  firstNormalSlot: number2()
});
var GetLeaderScheduleResult = record(string(), array(number2()));
var TransactionErrorResult = nullable(union([type({}), string()]));
var SignatureStatusResult = type({
  err: TransactionErrorResult
});
var SignatureReceivedResult = literal("receivedSignature");
var VersionResult = type({
  "solana-core": string(),
  "feature-set": optional(number2())
});
var SimulatedTransactionResponseStruct = jsonRpcResultAndContext(type({
  err: nullable(union([type({}), string()])),
  logs: nullable(array(string())),
  accounts: optional(nullable(array(nullable(type({
    executable: boolean(),
    owner: string(),
    lamports: number2(),
    data: array(string()),
    rentEpoch: optional(number2())
  }))))),
  unitsConsumed: optional(number2()),
  returnData: optional(nullable(type({
    programId: string(),
    data: tuple([string(), literal("base64")])
  })))
}));
var BlockProductionResponseStruct = jsonRpcResultAndContext(type({
  byIdentity: record(string(), array(number2())),
  range: type({
    firstSlot: number2(),
    lastSlot: number2()
  })
}));
function createRpcClient(url, httpHeaders, customFetch, fetchMiddleware, disableRetryOnRateLimit, httpAgent) {
  var fetch = customFetch ? customFetch : fetchImpl;
  var agent;
  {
    if (httpAgent != null) {
      console.warn("You have supplied an `httpAgent` when creating a `Connection` in a browser environment.It has been ignored; `httpAgent` is only used in Node environments.");
    }
  }
  var fetchWithMiddleware;
  if (fetchMiddleware) {
    fetchWithMiddleware = /* @__PURE__ */ function() {
      var _ref = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee(info, init) {
        var modifiedFetchArgs;
        return import_regenerator.default.wrap(function _callee$(_context) {
          while (1)
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return new Promise(function(resolve, reject) {
                  try {
                    fetchMiddleware(info, init, function(modifiedInfo, modifiedInit) {
                      return resolve([modifiedInfo, modifiedInit]);
                    });
                  } catch (error) {
                    reject(error);
                  }
                });
              case 2:
                modifiedFetchArgs = _context.sent;
                _context.next = 5;
                return fetch.apply(void 0, _toConsumableArray(modifiedFetchArgs));
              case 5:
                return _context.abrupt("return", _context.sent);
              case 6:
              case "end":
                return _context.stop();
            }
        }, _callee);
      }));
      return function fetchWithMiddleware2(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();
  }
  var clientBrowser = new import_browser.default(/* @__PURE__ */ function() {
    var _ref2 = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee2(request, callback) {
      var options, too_many_requests_retries, res, waitTime, text;
      return import_regenerator.default.wrap(function _callee2$(_context2) {
        while (1)
          switch (_context2.prev = _context2.next) {
            case 0:
              options = {
                method: "POST",
                body: request,
                agent,
                headers: Object.assign({
                  "Content-Type": "application/json"
                }, httpHeaders || {}, COMMON_HTTP_HEADERS)
              };
              _context2.prev = 1;
              too_many_requests_retries = 5;
              waitTime = 500;
            case 4:
              if (!fetchWithMiddleware) {
                _context2.next = 10;
                break;
              }
              _context2.next = 7;
              return fetchWithMiddleware(url, options);
            case 7:
              res = _context2.sent;
              _context2.next = 13;
              break;
            case 10:
              _context2.next = 12;
              return fetch(url, options);
            case 12:
              res = _context2.sent;
            case 13:
              if (!(res.status !== 429)) {
                _context2.next = 15;
                break;
              }
              return _context2.abrupt("break", 26);
            case 15:
              if (!(disableRetryOnRateLimit === true)) {
                _context2.next = 17;
                break;
              }
              return _context2.abrupt("break", 26);
            case 17:
              too_many_requests_retries -= 1;
              if (!(too_many_requests_retries === 0)) {
                _context2.next = 20;
                break;
              }
              return _context2.abrupt("break", 26);
            case 20:
              console.log("Server responded with ".concat(res.status, " ").concat(res.statusText, ".  Retrying after ").concat(waitTime, "ms delay..."));
              _context2.next = 23;
              return sleep(waitTime);
            case 23:
              waitTime *= 2;
            case 24:
              _context2.next = 4;
              break;
            case 26:
              _context2.next = 28;
              return res.text();
            case 28:
              text = _context2.sent;
              if (res.ok) {
                callback(null, text);
              } else {
                callback(new Error("".concat(res.status, " ").concat(res.statusText, ": ").concat(text)));
              }
              _context2.next = 35;
              break;
            case 32:
              _context2.prev = 32;
              _context2.t0 = _context2["catch"](1);
              if (_context2.t0 instanceof Error)
                callback(_context2.t0);
            case 35:
            case "end":
              return _context2.stop();
          }
      }, _callee2, null, [[1, 32]]);
    }));
    return function(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(), {});
  return clientBrowser;
}
function createRpcRequest(client) {
  return function(method, args) {
    return new Promise(function(resolve, reject) {
      client.request(method, args, function(err, response) {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
  };
}
function createRpcBatchRequest(client) {
  return function(requests) {
    return new Promise(function(resolve, reject) {
      if (requests.length === 0)
        resolve([]);
      var batch = requests.map(function(params) {
        return client.request(params.methodName, params.args);
      });
      client.request(batch, function(err, response) {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
  };
}
var GetInflationGovernorRpcResult = jsonRpcResult(GetInflationGovernorResult);
var GetInflationRateRpcResult = jsonRpcResult(GetInflationRateResult);
var GetRecentPrioritizationFeesRpcResult = jsonRpcResult(GetRecentPrioritizationFeesResult);
var GetEpochInfoRpcResult = jsonRpcResult(GetEpochInfoResult);
var GetEpochScheduleRpcResult = jsonRpcResult(GetEpochScheduleResult);
var GetLeaderScheduleRpcResult = jsonRpcResult(GetLeaderScheduleResult);
var SlotRpcResult = jsonRpcResult(number2());
var GetSupplyRpcResult = jsonRpcResultAndContext(type({
  total: number2(),
  circulating: number2(),
  nonCirculating: number2(),
  nonCirculatingAccounts: array(PublicKeyFromString)
}));
var TokenAmountResult = type({
  amount: string(),
  uiAmount: nullable(number2()),
  decimals: number2(),
  uiAmountString: optional(string())
});
var GetTokenLargestAccountsResult = jsonRpcResultAndContext(array(type({
  address: PublicKeyFromString,
  amount: string(),
  uiAmount: nullable(number2()),
  decimals: number2(),
  uiAmountString: optional(string())
})));
var GetTokenAccountsByOwner = jsonRpcResultAndContext(array(type({
  pubkey: PublicKeyFromString,
  account: type({
    executable: boolean(),
    owner: PublicKeyFromString,
    lamports: number2(),
    data: BufferFromRawAccountData,
    rentEpoch: number2()
  })
})));
var ParsedAccountDataResult = type({
  program: string(),
  parsed: unknown(),
  space: number2()
});
var GetParsedTokenAccountsByOwner = jsonRpcResultAndContext(array(type({
  pubkey: PublicKeyFromString,
  account: type({
    executable: boolean(),
    owner: PublicKeyFromString,
    lamports: number2(),
    data: ParsedAccountDataResult,
    rentEpoch: number2()
  })
})));
var GetLargestAccountsRpcResult = jsonRpcResultAndContext(array(type({
  lamports: number2(),
  address: PublicKeyFromString
})));
var AccountInfoResult = type({
  executable: boolean(),
  owner: PublicKeyFromString,
  lamports: number2(),
  data: BufferFromRawAccountData,
  rentEpoch: number2()
});
var KeyedAccountInfoResult = type({
  pubkey: PublicKeyFromString,
  account: AccountInfoResult
});
var ParsedOrRawAccountData = coerce(union([instance(import_buffer.Buffer), ParsedAccountDataResult]), union([RawAccountDataResult, ParsedAccountDataResult]), function(value) {
  if (Array.isArray(value)) {
    return create(value, BufferFromRawAccountData);
  } else {
    return value;
  }
});
var ParsedAccountInfoResult = type({
  executable: boolean(),
  owner: PublicKeyFromString,
  lamports: number2(),
  data: ParsedOrRawAccountData,
  rentEpoch: number2()
});
var KeyedParsedAccountInfoResult = type({
  pubkey: PublicKeyFromString,
  account: ParsedAccountInfoResult
});
var StakeActivationResult = type({
  state: union([literal("active"), literal("inactive"), literal("activating"), literal("deactivating")]),
  active: number2(),
  inactive: number2()
});
var GetConfirmedSignaturesForAddress2RpcResult = jsonRpcResult(array(type({
  signature: string(),
  slot: number2(),
  err: TransactionErrorResult,
  memo: nullable(string()),
  blockTime: optional(nullable(number2()))
})));
var GetSignaturesForAddressRpcResult = jsonRpcResult(array(type({
  signature: string(),
  slot: number2(),
  err: TransactionErrorResult,
  memo: nullable(string()),
  blockTime: optional(nullable(number2()))
})));
var AccountNotificationResult = type({
  subscription: number2(),
  result: notificationResultAndContext(AccountInfoResult)
});
var ProgramAccountInfoResult = type({
  pubkey: PublicKeyFromString,
  account: AccountInfoResult
});
var ProgramAccountNotificationResult = type({
  subscription: number2(),
  result: notificationResultAndContext(ProgramAccountInfoResult)
});
var SlotInfoResult = type({
  parent: number2(),
  slot: number2(),
  root: number2()
});
var SlotNotificationResult = type({
  subscription: number2(),
  result: SlotInfoResult
});
var SlotUpdateResult = union([type({
  type: union([literal("firstShredReceived"), literal("completed"), literal("optimisticConfirmation"), literal("root")]),
  slot: number2(),
  timestamp: number2()
}), type({
  type: literal("createdBank"),
  parent: number2(),
  slot: number2(),
  timestamp: number2()
}), type({
  type: literal("frozen"),
  slot: number2(),
  timestamp: number2(),
  stats: type({
    numTransactionEntries: number2(),
    numSuccessfulTransactions: number2(),
    numFailedTransactions: number2(),
    maxTransactionsPerEntry: number2()
  })
}), type({
  type: literal("dead"),
  slot: number2(),
  timestamp: number2(),
  err: string()
})]);
var SlotUpdateNotificationResult = type({
  subscription: number2(),
  result: SlotUpdateResult
});
var SignatureNotificationResult = type({
  subscription: number2(),
  result: notificationResultAndContext(union([SignatureStatusResult, SignatureReceivedResult]))
});
var RootNotificationResult = type({
  subscription: number2(),
  result: number2()
});
var ContactInfoResult = type({
  pubkey: string(),
  gossip: nullable(string()),
  tpu: nullable(string()),
  rpc: nullable(string()),
  version: nullable(string())
});
var VoteAccountInfoResult = type({
  votePubkey: string(),
  nodePubkey: string(),
  activatedStake: number2(),
  epochVoteAccount: boolean(),
  epochCredits: array(tuple([number2(), number2(), number2()])),
  commission: number2(),
  lastVote: number2(),
  rootSlot: nullable(number2())
});
var GetVoteAccounts = jsonRpcResult(type({
  current: array(VoteAccountInfoResult),
  delinquent: array(VoteAccountInfoResult)
}));
var ConfirmationStatus = union([literal("processed"), literal("confirmed"), literal("finalized")]);
var SignatureStatusResponse = type({
  slot: number2(),
  confirmations: nullable(number2()),
  err: TransactionErrorResult,
  confirmationStatus: optional(ConfirmationStatus)
});
var GetSignatureStatusesRpcResult = jsonRpcResultAndContext(array(nullable(SignatureStatusResponse)));
var GetMinimumBalanceForRentExemptionRpcResult = jsonRpcResult(number2());
var AddressTableLookupStruct = type({
  accountKey: PublicKeyFromString,
  writableIndexes: array(number2()),
  readonlyIndexes: array(number2())
});
var ConfirmedTransactionResult = type({
  signatures: array(string()),
  message: type({
    accountKeys: array(string()),
    header: type({
      numRequiredSignatures: number2(),
      numReadonlySignedAccounts: number2(),
      numReadonlyUnsignedAccounts: number2()
    }),
    instructions: array(type({
      accounts: array(number2()),
      data: string(),
      programIdIndex: number2()
    })),
    recentBlockhash: string(),
    addressTableLookups: optional(array(AddressTableLookupStruct))
  })
});
var AnnotatedAccountKey = type({
  pubkey: PublicKeyFromString,
  signer: boolean(),
  writable: boolean(),
  source: optional(union([literal("transaction"), literal("lookupTable")]))
});
var ConfirmedTransactionAccountsModeResult = type({
  accountKeys: array(AnnotatedAccountKey),
  signatures: array(string())
});
var ParsedInstructionResult = type({
  parsed: unknown(),
  program: string(),
  programId: PublicKeyFromString
});
var RawInstructionResult = type({
  accounts: array(PublicKeyFromString),
  data: string(),
  programId: PublicKeyFromString
});
var InstructionResult = union([RawInstructionResult, ParsedInstructionResult]);
var UnknownInstructionResult = union([type({
  parsed: unknown(),
  program: string(),
  programId: string()
}), type({
  accounts: array(string()),
  data: string(),
  programId: string()
})]);
var ParsedOrRawInstruction = coerce(InstructionResult, UnknownInstructionResult, function(value) {
  if ("accounts" in value) {
    return create(value, RawInstructionResult);
  } else {
    return create(value, ParsedInstructionResult);
  }
});
var ParsedConfirmedTransactionResult = type({
  signatures: array(string()),
  message: type({
    accountKeys: array(AnnotatedAccountKey),
    instructions: array(ParsedOrRawInstruction),
    recentBlockhash: string(),
    addressTableLookups: optional(nullable(array(AddressTableLookupStruct)))
  })
});
var TokenBalanceResult = type({
  accountIndex: number2(),
  mint: string(),
  owner: optional(string()),
  uiTokenAmount: TokenAmountResult
});
var LoadedAddressesResult = type({
  writable: array(PublicKeyFromString),
  readonly: array(PublicKeyFromString)
});
var ConfirmedTransactionMetaResult = type({
  err: TransactionErrorResult,
  fee: number2(),
  innerInstructions: optional(nullable(array(type({
    index: number2(),
    instructions: array(type({
      accounts: array(number2()),
      data: string(),
      programIdIndex: number2()
    }))
  })))),
  preBalances: array(number2()),
  postBalances: array(number2()),
  logMessages: optional(nullable(array(string()))),
  preTokenBalances: optional(nullable(array(TokenBalanceResult))),
  postTokenBalances: optional(nullable(array(TokenBalanceResult))),
  loadedAddresses: optional(LoadedAddressesResult),
  computeUnitsConsumed: optional(number2())
});
var ParsedConfirmedTransactionMetaResult = type({
  err: TransactionErrorResult,
  fee: number2(),
  innerInstructions: optional(nullable(array(type({
    index: number2(),
    instructions: array(ParsedOrRawInstruction)
  })))),
  preBalances: array(number2()),
  postBalances: array(number2()),
  logMessages: optional(nullable(array(string()))),
  preTokenBalances: optional(nullable(array(TokenBalanceResult))),
  postTokenBalances: optional(nullable(array(TokenBalanceResult))),
  loadedAddresses: optional(LoadedAddressesResult),
  computeUnitsConsumed: optional(number2())
});
var TransactionVersionStruct = union([literal(0), literal("legacy")]);
var RewardsResult = type({
  pubkey: string(),
  lamports: number2(),
  postBalance: nullable(number2()),
  rewardType: nullable(string()),
  commission: optional(nullable(number2()))
});
var GetBlockRpcResult = jsonRpcResult(nullable(type({
  blockhash: string(),
  previousBlockhash: string(),
  parentSlot: number2(),
  transactions: array(type({
    transaction: ConfirmedTransactionResult,
    meta: nullable(ConfirmedTransactionMetaResult),
    version: optional(TransactionVersionStruct)
  })),
  rewards: optional(array(RewardsResult)),
  blockTime: nullable(number2()),
  blockHeight: nullable(number2())
})));
var GetNoneModeBlockRpcResult = jsonRpcResult(nullable(type({
  blockhash: string(),
  previousBlockhash: string(),
  parentSlot: number2(),
  rewards: optional(array(RewardsResult)),
  blockTime: nullable(number2()),
  blockHeight: nullable(number2())
})));
var GetAccountsModeBlockRpcResult = jsonRpcResult(nullable(type({
  blockhash: string(),
  previousBlockhash: string(),
  parentSlot: number2(),
  transactions: array(type({
    transaction: ConfirmedTransactionAccountsModeResult,
    meta: nullable(ConfirmedTransactionMetaResult),
    version: optional(TransactionVersionStruct)
  })),
  rewards: optional(array(RewardsResult)),
  blockTime: nullable(number2()),
  blockHeight: nullable(number2())
})));
var GetParsedBlockRpcResult = jsonRpcResult(nullable(type({
  blockhash: string(),
  previousBlockhash: string(),
  parentSlot: number2(),
  transactions: array(type({
    transaction: ParsedConfirmedTransactionResult,
    meta: nullable(ParsedConfirmedTransactionMetaResult),
    version: optional(TransactionVersionStruct)
  })),
  rewards: optional(array(RewardsResult)),
  blockTime: nullable(number2()),
  blockHeight: nullable(number2())
})));
var GetParsedAccountsModeBlockRpcResult = jsonRpcResult(nullable(type({
  blockhash: string(),
  previousBlockhash: string(),
  parentSlot: number2(),
  transactions: array(type({
    transaction: ConfirmedTransactionAccountsModeResult,
    meta: nullable(ParsedConfirmedTransactionMetaResult),
    version: optional(TransactionVersionStruct)
  })),
  rewards: optional(array(RewardsResult)),
  blockTime: nullable(number2()),
  blockHeight: nullable(number2())
})));
var GetParsedNoneModeBlockRpcResult = jsonRpcResult(nullable(type({
  blockhash: string(),
  previousBlockhash: string(),
  parentSlot: number2(),
  rewards: optional(array(RewardsResult)),
  blockTime: nullable(number2()),
  blockHeight: nullable(number2())
})));
var GetConfirmedBlockRpcResult = jsonRpcResult(nullable(type({
  blockhash: string(),
  previousBlockhash: string(),
  parentSlot: number2(),
  transactions: array(type({
    transaction: ConfirmedTransactionResult,
    meta: nullable(ConfirmedTransactionMetaResult)
  })),
  rewards: optional(array(RewardsResult)),
  blockTime: nullable(number2())
})));
var GetBlockSignaturesRpcResult = jsonRpcResult(nullable(type({
  blockhash: string(),
  previousBlockhash: string(),
  parentSlot: number2(),
  signatures: array(string()),
  blockTime: nullable(number2())
})));
var GetTransactionRpcResult = jsonRpcResult(nullable(type({
  slot: number2(),
  meta: ConfirmedTransactionMetaResult,
  blockTime: optional(nullable(number2())),
  transaction: ConfirmedTransactionResult,
  version: optional(TransactionVersionStruct)
})));
var GetParsedTransactionRpcResult = jsonRpcResult(nullable(type({
  slot: number2(),
  transaction: ParsedConfirmedTransactionResult,
  meta: nullable(ParsedConfirmedTransactionMetaResult),
  blockTime: optional(nullable(number2())),
  version: optional(TransactionVersionStruct)
})));
var GetRecentBlockhashAndContextRpcResult = jsonRpcResultAndContext(type({
  blockhash: string(),
  feeCalculator: type({
    lamportsPerSignature: number2()
  })
}));
var GetLatestBlockhashRpcResult = jsonRpcResultAndContext(type({
  blockhash: string(),
  lastValidBlockHeight: number2()
}));
var IsBlockhashValidRpcResult = jsonRpcResultAndContext(boolean());
var PerfSampleResult = type({
  slot: number2(),
  numTransactions: number2(),
  numSlots: number2(),
  samplePeriodSecs: number2()
});
var GetRecentPerformanceSamplesRpcResult = jsonRpcResult(array(PerfSampleResult));
var GetFeeCalculatorRpcResult = jsonRpcResultAndContext(nullable(type({
  feeCalculator: type({
    lamportsPerSignature: number2()
  })
})));
var RequestAirdropRpcResult = jsonRpcResult(string());
var SendTransactionRpcResult = jsonRpcResult(string());
var LogsResult = type({
  err: TransactionErrorResult,
  logs: array(string()),
  signature: string()
});
var LogsNotificationResult = type({
  result: notificationResultAndContext(LogsResult),
  subscription: number2()
});
var COMMON_HTTP_HEADERS = {
  "solana-client": "js/".concat((_process$env$npm_pack = "0.0.0-development") !== null && _process$env$npm_pack !== void 0 ? _process$env$npm_pack : "UNKNOWN")
};
var Connection = /* @__PURE__ */ function() {
  function Connection2(endpoint, _commitmentOrConfig) {
    var _this = this;
    _classCallCheck(this, Connection2);
    this._commitment = void 0;
    this._confirmTransactionInitialTimeout = void 0;
    this._rpcEndpoint = void 0;
    this._rpcWsEndpoint = void 0;
    this._rpcClient = void 0;
    this._rpcRequest = void 0;
    this._rpcBatchRequest = void 0;
    this._rpcWebSocket = void 0;
    this._rpcWebSocketConnected = false;
    this._rpcWebSocketHeartbeat = null;
    this._rpcWebSocketIdleTimeout = null;
    this._rpcWebSocketGeneration = 0;
    this._disableBlockhashCaching = false;
    this._pollingBlockhash = false;
    this._blockhashInfo = {
      latestBlockhash: null,
      lastFetch: 0,
      transactionSignatures: [],
      simulatedSignatures: []
    };
    this._nextClientSubscriptionId = 0;
    this._subscriptionDisposeFunctionsByClientSubscriptionId = {};
    this._subscriptionHashByClientSubscriptionId = {};
    this._subscriptionStateChangeCallbacksByHash = {};
    this._subscriptionCallbacksByServerSubscriptionId = {};
    this._subscriptionsByHash = {};
    this._subscriptionsAutoDisposedByRpc = /* @__PURE__ */ new Set();
    this.getBlockHeight = function() {
      var requestPromises = {};
      return /* @__PURE__ */ function() {
        var _ref3 = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee4(commitmentOrConfig) {
          var _requestPromises$requ;
          var _extractCommitmentFro, commitment, config, args, requestHash;
          return import_regenerator.default.wrap(function _callee4$(_context4) {
            while (1)
              switch (_context4.prev = _context4.next) {
                case 0:
                  _extractCommitmentFro = extractCommitmentFromConfig(commitmentOrConfig), commitment = _extractCommitmentFro.commitment, config = _extractCommitmentFro.config;
                  args = _this._buildArgs([], commitment, void 0, config);
                  requestHash = fastStableStringify$1(args);
                  requestPromises[requestHash] = (_requestPromises$requ = requestPromises[requestHash]) !== null && _requestPromises$requ !== void 0 ? _requestPromises$requ : _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee3() {
                    var unsafeRes, res;
                    return import_regenerator.default.wrap(function _callee3$(_context3) {
                      while (1)
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.prev = 0;
                            _context3.next = 3;
                            return _this._rpcRequest("getBlockHeight", args);
                          case 3:
                            unsafeRes = _context3.sent;
                            res = create(unsafeRes, jsonRpcResult(number2()));
                            if (!("error" in res)) {
                              _context3.next = 7;
                              break;
                            }
                            throw new SolanaJSONRPCError(res.error, "failed to get block height information");
                          case 7:
                            return _context3.abrupt("return", res.result);
                          case 8:
                            _context3.prev = 8;
                            delete requestPromises[requestHash];
                            return _context3.finish(8);
                          case 11:
                          case "end":
                            return _context3.stop();
                        }
                    }, _callee3, null, [[0, , 8, 11]]);
                  }))();
                  _context4.next = 6;
                  return requestPromises[requestHash];
                case 6:
                  return _context4.abrupt("return", _context4.sent);
                case 7:
                case "end":
                  return _context4.stop();
              }
          }, _callee4);
        }));
        return function(_x5) {
          return _ref3.apply(this, arguments);
        };
      }();
    }();
    var wsEndpoint;
    var httpHeaders;
    var fetch;
    var fetchMiddleware;
    var disableRetryOnRateLimit;
    var httpAgent;
    if (_commitmentOrConfig && typeof _commitmentOrConfig === "string") {
      this._commitment = _commitmentOrConfig;
    } else if (_commitmentOrConfig) {
      this._commitment = _commitmentOrConfig.commitment;
      this._confirmTransactionInitialTimeout = _commitmentOrConfig.confirmTransactionInitialTimeout;
      wsEndpoint = _commitmentOrConfig.wsEndpoint;
      httpHeaders = _commitmentOrConfig.httpHeaders;
      fetch = _commitmentOrConfig.fetch;
      fetchMiddleware = _commitmentOrConfig.fetchMiddleware;
      disableRetryOnRateLimit = _commitmentOrConfig.disableRetryOnRateLimit;
      httpAgent = _commitmentOrConfig.httpAgent;
    }
    this._rpcEndpoint = assertEndpointUrl(endpoint);
    this._rpcWsEndpoint = wsEndpoint || makeWebsocketUrl(endpoint);
    this._rpcClient = createRpcClient(endpoint, httpHeaders, fetch, fetchMiddleware, disableRetryOnRateLimit, httpAgent);
    this._rpcRequest = createRpcRequest(this._rpcClient);
    this._rpcBatchRequest = createRpcBatchRequest(this._rpcClient);
    this._rpcWebSocket = new RpcWebSocketClient(this._rpcWsEndpoint, {
      autoconnect: false,
      max_reconnects: Infinity
    });
    this._rpcWebSocket.on("open", this._wsOnOpen.bind(this));
    this._rpcWebSocket.on("error", this._wsOnError.bind(this));
    this._rpcWebSocket.on("close", this._wsOnClose.bind(this));
    this._rpcWebSocket.on("accountNotification", this._wsOnAccountNotification.bind(this));
    this._rpcWebSocket.on("programNotification", this._wsOnProgramAccountNotification.bind(this));
    this._rpcWebSocket.on("slotNotification", this._wsOnSlotNotification.bind(this));
    this._rpcWebSocket.on("slotsUpdatesNotification", this._wsOnSlotUpdatesNotification.bind(this));
    this._rpcWebSocket.on("signatureNotification", this._wsOnSignatureNotification.bind(this));
    this._rpcWebSocket.on("rootNotification", this._wsOnRootNotification.bind(this));
    this._rpcWebSocket.on("logsNotification", this._wsOnLogsNotification.bind(this));
  }
  _createClass(Connection2, [{
    key: "commitment",
    get: function get() {
      return this._commitment;
    }
    /**
     * The RPC endpoint
     */
  }, {
    key: "rpcEndpoint",
    get: function get() {
      return this._rpcEndpoint;
    }
    /**
     * Fetch the balance for the specified public key, return with context
     */
  }, {
    key: "getBalanceAndContext",
    value: function() {
      var _getBalanceAndContext = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee5(publicKey3, commitmentOrConfig) {
        var _extractCommitmentFro2, commitment, config, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee5$(_context5) {
          while (1)
            switch (_context5.prev = _context5.next) {
              case 0:
                _extractCommitmentFro2 = extractCommitmentFromConfig(commitmentOrConfig), commitment = _extractCommitmentFro2.commitment, config = _extractCommitmentFro2.config;
                args = this._buildArgs([publicKey3.toBase58()], commitment, void 0, config);
                _context5.next = 4;
                return this._rpcRequest("getBalance", args);
              case 4:
                unsafeRes = _context5.sent;
                res = create(unsafeRes, jsonRpcResultAndContext(number2()));
                if (!("error" in res)) {
                  _context5.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get balance for ".concat(publicKey3.toBase58()));
              case 8:
                return _context5.abrupt("return", res.result);
              case 9:
              case "end":
                return _context5.stop();
            }
        }, _callee5, this);
      }));
      function getBalanceAndContext(_x6, _x7) {
        return _getBalanceAndContext.apply(this, arguments);
      }
      return getBalanceAndContext;
    }()
    /**
     * Fetch the balance for the specified public key
     */
  }, {
    key: "getBalance",
    value: function() {
      var _getBalance = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee6(publicKey3, commitmentOrConfig) {
        return import_regenerator.default.wrap(function _callee6$(_context6) {
          while (1)
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.getBalanceAndContext(publicKey3, commitmentOrConfig).then(function(x) {
                  return x.value;
                })["catch"](function(e) {
                  throw new Error("failed to get balance of account " + publicKey3.toBase58() + ": " + e);
                });
              case 2:
                return _context6.abrupt("return", _context6.sent);
              case 3:
              case "end":
                return _context6.stop();
            }
        }, _callee6, this);
      }));
      function getBalance(_x8, _x9) {
        return _getBalance.apply(this, arguments);
      }
      return getBalance;
    }()
    /**
     * Fetch the estimated production time of a block
     */
  }, {
    key: "getBlockTime",
    value: function() {
      var _getBlockTime = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee7(slot) {
        var unsafeRes, res;
        return import_regenerator.default.wrap(function _callee7$(_context7) {
          while (1)
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._rpcRequest("getBlockTime", [slot]);
              case 2:
                unsafeRes = _context7.sent;
                res = create(unsafeRes, jsonRpcResult(nullable(number2())));
                if (!("error" in res)) {
                  _context7.next = 6;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get block time for slot ".concat(slot));
              case 6:
                return _context7.abrupt("return", res.result);
              case 7:
              case "end":
                return _context7.stop();
            }
        }, _callee7, this);
      }));
      function getBlockTime(_x10) {
        return _getBlockTime.apply(this, arguments);
      }
      return getBlockTime;
    }()
    /**
     * Fetch the lowest slot that the node has information about in its ledger.
     * This value may increase over time if the node is configured to purge older ledger data
     */
  }, {
    key: "getMinimumLedgerSlot",
    value: function() {
      var _getMinimumLedgerSlot = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee8() {
        var unsafeRes, res;
        return import_regenerator.default.wrap(function _callee8$(_context8) {
          while (1)
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._rpcRequest("minimumLedgerSlot", []);
              case 2:
                unsafeRes = _context8.sent;
                res = create(unsafeRes, jsonRpcResult(number2()));
                if (!("error" in res)) {
                  _context8.next = 6;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get minimum ledger slot");
              case 6:
                return _context8.abrupt("return", res.result);
              case 7:
              case "end":
                return _context8.stop();
            }
        }, _callee8, this);
      }));
      function getMinimumLedgerSlot() {
        return _getMinimumLedgerSlot.apply(this, arguments);
      }
      return getMinimumLedgerSlot;
    }()
    /**
     * Fetch the slot of the lowest confirmed block that has not been purged from the ledger
     */
  }, {
    key: "getFirstAvailableBlock",
    value: function() {
      var _getFirstAvailableBlock = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee9() {
        var unsafeRes, res;
        return import_regenerator.default.wrap(function _callee9$(_context9) {
          while (1)
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this._rpcRequest("getFirstAvailableBlock", []);
              case 2:
                unsafeRes = _context9.sent;
                res = create(unsafeRes, SlotRpcResult);
                if (!("error" in res)) {
                  _context9.next = 6;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get first available block");
              case 6:
                return _context9.abrupt("return", res.result);
              case 7:
              case "end":
                return _context9.stop();
            }
        }, _callee9, this);
      }));
      function getFirstAvailableBlock() {
        return _getFirstAvailableBlock.apply(this, arguments);
      }
      return getFirstAvailableBlock;
    }()
    /**
     * Fetch information about the current supply
     */
  }, {
    key: "getSupply",
    value: function() {
      var _getSupply = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee10(config) {
        var configArg, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee10$(_context10) {
          while (1)
            switch (_context10.prev = _context10.next) {
              case 0:
                configArg = {};
                if (typeof config === "string") {
                  configArg = {
                    commitment: config
                  };
                } else if (config) {
                  configArg = _objectSpread(_objectSpread({}, config), {}, {
                    commitment: config && config.commitment || this.commitment
                  });
                } else {
                  configArg = {
                    commitment: this.commitment
                  };
                }
                _context10.next = 4;
                return this._rpcRequest("getSupply", [configArg]);
              case 4:
                unsafeRes = _context10.sent;
                res = create(unsafeRes, GetSupplyRpcResult);
                if (!("error" in res)) {
                  _context10.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get supply");
              case 8:
                return _context10.abrupt("return", res.result);
              case 9:
              case "end":
                return _context10.stop();
            }
        }, _callee10, this);
      }));
      function getSupply(_x11) {
        return _getSupply.apply(this, arguments);
      }
      return getSupply;
    }()
    /**
     * Fetch the current supply of a token mint
     */
  }, {
    key: "getTokenSupply",
    value: function() {
      var _getTokenSupply = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee11(tokenMintAddress, commitment) {
        var args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee11$(_context11) {
          while (1)
            switch (_context11.prev = _context11.next) {
              case 0:
                args = this._buildArgs([tokenMintAddress.toBase58()], commitment);
                _context11.next = 3;
                return this._rpcRequest("getTokenSupply", args);
              case 3:
                unsafeRes = _context11.sent;
                res = create(unsafeRes, jsonRpcResultAndContext(TokenAmountResult));
                if (!("error" in res)) {
                  _context11.next = 7;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get token supply");
              case 7:
                return _context11.abrupt("return", res.result);
              case 8:
              case "end":
                return _context11.stop();
            }
        }, _callee11, this);
      }));
      function getTokenSupply(_x12, _x13) {
        return _getTokenSupply.apply(this, arguments);
      }
      return getTokenSupply;
    }()
    /**
     * Fetch the current balance of a token account
     */
  }, {
    key: "getTokenAccountBalance",
    value: function() {
      var _getTokenAccountBalance = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee12(tokenAddress, commitment) {
        var args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee12$(_context12) {
          while (1)
            switch (_context12.prev = _context12.next) {
              case 0:
                args = this._buildArgs([tokenAddress.toBase58()], commitment);
                _context12.next = 3;
                return this._rpcRequest("getTokenAccountBalance", args);
              case 3:
                unsafeRes = _context12.sent;
                res = create(unsafeRes, jsonRpcResultAndContext(TokenAmountResult));
                if (!("error" in res)) {
                  _context12.next = 7;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get token account balance");
              case 7:
                return _context12.abrupt("return", res.result);
              case 8:
              case "end":
                return _context12.stop();
            }
        }, _callee12, this);
      }));
      function getTokenAccountBalance(_x14, _x15) {
        return _getTokenAccountBalance.apply(this, arguments);
      }
      return getTokenAccountBalance;
    }()
    /**
     * Fetch all the token accounts owned by the specified account
     *
     * @return {Promise<RpcResponseAndContext<GetProgramAccountsResponse>}
     */
  }, {
    key: "getTokenAccountsByOwner",
    value: function() {
      var _getTokenAccountsByOwner = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee13(ownerAddress, filter, commitmentOrConfig) {
        var _extractCommitmentFro3, commitment, config, _args, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee13$(_context13) {
          while (1)
            switch (_context13.prev = _context13.next) {
              case 0:
                _extractCommitmentFro3 = extractCommitmentFromConfig(commitmentOrConfig), commitment = _extractCommitmentFro3.commitment, config = _extractCommitmentFro3.config;
                _args = [ownerAddress.toBase58()];
                if ("mint" in filter) {
                  _args.push({
                    mint: filter.mint.toBase58()
                  });
                } else {
                  _args.push({
                    programId: filter.programId.toBase58()
                  });
                }
                args = this._buildArgs(_args, commitment, "base64", config);
                _context13.next = 6;
                return this._rpcRequest("getTokenAccountsByOwner", args);
              case 6:
                unsafeRes = _context13.sent;
                res = create(unsafeRes, GetTokenAccountsByOwner);
                if (!("error" in res)) {
                  _context13.next = 10;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get token accounts owned by account ".concat(ownerAddress.toBase58()));
              case 10:
                return _context13.abrupt("return", res.result);
              case 11:
              case "end":
                return _context13.stop();
            }
        }, _callee13, this);
      }));
      function getTokenAccountsByOwner(_x16, _x17, _x18) {
        return _getTokenAccountsByOwner.apply(this, arguments);
      }
      return getTokenAccountsByOwner;
    }()
    /**
     * Fetch parsed token accounts owned by the specified account
     *
     * @return {Promise<RpcResponseAndContext<Array<{pubkey: PublicKey, account: AccountInfo<ParsedAccountData>}>>>}
     */
  }, {
    key: "getParsedTokenAccountsByOwner",
    value: function() {
      var _getParsedTokenAccountsByOwner = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee14(ownerAddress, filter, commitment) {
        var _args, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee14$(_context14) {
          while (1)
            switch (_context14.prev = _context14.next) {
              case 0:
                _args = [ownerAddress.toBase58()];
                if ("mint" in filter) {
                  _args.push({
                    mint: filter.mint.toBase58()
                  });
                } else {
                  _args.push({
                    programId: filter.programId.toBase58()
                  });
                }
                args = this._buildArgs(_args, commitment, "jsonParsed");
                _context14.next = 5;
                return this._rpcRequest("getTokenAccountsByOwner", args);
              case 5:
                unsafeRes = _context14.sent;
                res = create(unsafeRes, GetParsedTokenAccountsByOwner);
                if (!("error" in res)) {
                  _context14.next = 9;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get token accounts owned by account ".concat(ownerAddress.toBase58()));
              case 9:
                return _context14.abrupt("return", res.result);
              case 10:
              case "end":
                return _context14.stop();
            }
        }, _callee14, this);
      }));
      function getParsedTokenAccountsByOwner(_x19, _x20, _x21) {
        return _getParsedTokenAccountsByOwner.apply(this, arguments);
      }
      return getParsedTokenAccountsByOwner;
    }()
    /**
     * Fetch the 20 largest accounts with their current balances
     */
  }, {
    key: "getLargestAccounts",
    value: function() {
      var _getLargestAccounts = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee15(config) {
        var arg, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee15$(_context15) {
          while (1)
            switch (_context15.prev = _context15.next) {
              case 0:
                arg = _objectSpread(_objectSpread({}, config), {}, {
                  commitment: config && config.commitment || this.commitment
                });
                args = arg.filter || arg.commitment ? [arg] : [];
                _context15.next = 4;
                return this._rpcRequest("getLargestAccounts", args);
              case 4:
                unsafeRes = _context15.sent;
                res = create(unsafeRes, GetLargestAccountsRpcResult);
                if (!("error" in res)) {
                  _context15.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get largest accounts");
              case 8:
                return _context15.abrupt("return", res.result);
              case 9:
              case "end":
                return _context15.stop();
            }
        }, _callee15, this);
      }));
      function getLargestAccounts(_x22) {
        return _getLargestAccounts.apply(this, arguments);
      }
      return getLargestAccounts;
    }()
    /**
     * Fetch the 20 largest token accounts with their current balances
     * for a given mint.
     */
  }, {
    key: "getTokenLargestAccounts",
    value: function() {
      var _getTokenLargestAccounts = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee16(mintAddress, commitment) {
        var args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee16$(_context16) {
          while (1)
            switch (_context16.prev = _context16.next) {
              case 0:
                args = this._buildArgs([mintAddress.toBase58()], commitment);
                _context16.next = 3;
                return this._rpcRequest("getTokenLargestAccounts", args);
              case 3:
                unsafeRes = _context16.sent;
                res = create(unsafeRes, GetTokenLargestAccountsResult);
                if (!("error" in res)) {
                  _context16.next = 7;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get token largest accounts");
              case 7:
                return _context16.abrupt("return", res.result);
              case 8:
              case "end":
                return _context16.stop();
            }
        }, _callee16, this);
      }));
      function getTokenLargestAccounts(_x23, _x24) {
        return _getTokenLargestAccounts.apply(this, arguments);
      }
      return getTokenLargestAccounts;
    }()
    /**
     * Fetch all the account info for the specified public key, return with context
     */
  }, {
    key: "getAccountInfoAndContext",
    value: function() {
      var _getAccountInfoAndContext = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee17(publicKey3, commitmentOrConfig) {
        var _extractCommitmentFro4, commitment, config, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee17$(_context17) {
          while (1)
            switch (_context17.prev = _context17.next) {
              case 0:
                _extractCommitmentFro4 = extractCommitmentFromConfig(commitmentOrConfig), commitment = _extractCommitmentFro4.commitment, config = _extractCommitmentFro4.config;
                args = this._buildArgs([publicKey3.toBase58()], commitment, "base64", config);
                _context17.next = 4;
                return this._rpcRequest("getAccountInfo", args);
              case 4:
                unsafeRes = _context17.sent;
                res = create(unsafeRes, jsonRpcResultAndContext(nullable(AccountInfoResult)));
                if (!("error" in res)) {
                  _context17.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get info about account ".concat(publicKey3.toBase58()));
              case 8:
                return _context17.abrupt("return", res.result);
              case 9:
              case "end":
                return _context17.stop();
            }
        }, _callee17, this);
      }));
      function getAccountInfoAndContext(_x25, _x26) {
        return _getAccountInfoAndContext.apply(this, arguments);
      }
      return getAccountInfoAndContext;
    }()
    /**
     * Fetch parsed account info for the specified public key
     */
  }, {
    key: "getParsedAccountInfo",
    value: function() {
      var _getParsedAccountInfo = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee18(publicKey3, commitmentOrConfig) {
        var _extractCommitmentFro5, commitment, config, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee18$(_context18) {
          while (1)
            switch (_context18.prev = _context18.next) {
              case 0:
                _extractCommitmentFro5 = extractCommitmentFromConfig(commitmentOrConfig), commitment = _extractCommitmentFro5.commitment, config = _extractCommitmentFro5.config;
                args = this._buildArgs([publicKey3.toBase58()], commitment, "jsonParsed", config);
                _context18.next = 4;
                return this._rpcRequest("getAccountInfo", args);
              case 4:
                unsafeRes = _context18.sent;
                res = create(unsafeRes, jsonRpcResultAndContext(nullable(ParsedAccountInfoResult)));
                if (!("error" in res)) {
                  _context18.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get info about account ".concat(publicKey3.toBase58()));
              case 8:
                return _context18.abrupt("return", res.result);
              case 9:
              case "end":
                return _context18.stop();
            }
        }, _callee18, this);
      }));
      function getParsedAccountInfo(_x27, _x28) {
        return _getParsedAccountInfo.apply(this, arguments);
      }
      return getParsedAccountInfo;
    }()
    /**
     * Fetch all the account info for the specified public key
     */
  }, {
    key: "getAccountInfo",
    value: function() {
      var _getAccountInfo = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee19(publicKey3, commitmentOrConfig) {
        var res;
        return import_regenerator.default.wrap(function _callee19$(_context19) {
          while (1)
            switch (_context19.prev = _context19.next) {
              case 0:
                _context19.prev = 0;
                _context19.next = 3;
                return this.getAccountInfoAndContext(publicKey3, commitmentOrConfig);
              case 3:
                res = _context19.sent;
                return _context19.abrupt("return", res.value);
              case 7:
                _context19.prev = 7;
                _context19.t0 = _context19["catch"](0);
                throw new Error("failed to get info about account " + publicKey3.toBase58() + ": " + _context19.t0);
              case 10:
              case "end":
                return _context19.stop();
            }
        }, _callee19, this, [[0, 7]]);
      }));
      function getAccountInfo(_x29, _x30) {
        return _getAccountInfo.apply(this, arguments);
      }
      return getAccountInfo;
    }()
    /**
     * Fetch all the account info for multiple accounts specified by an array of public keys, return with context
     */
  }, {
    key: "getMultipleParsedAccounts",
    value: function() {
      var _getMultipleParsedAccounts = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee20(publicKeys, rawConfig) {
        var _extractCommitmentFro6, commitment, config, keys, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee20$(_context20) {
          while (1)
            switch (_context20.prev = _context20.next) {
              case 0:
                _extractCommitmentFro6 = extractCommitmentFromConfig(rawConfig), commitment = _extractCommitmentFro6.commitment, config = _extractCommitmentFro6.config;
                keys = publicKeys.map(function(key) {
                  return key.toBase58();
                });
                args = this._buildArgs([keys], commitment, "jsonParsed", config);
                _context20.next = 5;
                return this._rpcRequest("getMultipleAccounts", args);
              case 5:
                unsafeRes = _context20.sent;
                res = create(unsafeRes, jsonRpcResultAndContext(array(nullable(ParsedAccountInfoResult))));
                if (!("error" in res)) {
                  _context20.next = 9;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get info for accounts ".concat(keys));
              case 9:
                return _context20.abrupt("return", res.result);
              case 10:
              case "end":
                return _context20.stop();
            }
        }, _callee20, this);
      }));
      function getMultipleParsedAccounts(_x31, _x32) {
        return _getMultipleParsedAccounts.apply(this, arguments);
      }
      return getMultipleParsedAccounts;
    }()
    /**
     * Fetch all the account info for multiple accounts specified by an array of public keys, return with context
     */
  }, {
    key: "getMultipleAccountsInfoAndContext",
    value: function() {
      var _getMultipleAccountsInfoAndContext = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee21(publicKeys, commitmentOrConfig) {
        var _extractCommitmentFro7, commitment, config, keys, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee21$(_context21) {
          while (1)
            switch (_context21.prev = _context21.next) {
              case 0:
                _extractCommitmentFro7 = extractCommitmentFromConfig(commitmentOrConfig), commitment = _extractCommitmentFro7.commitment, config = _extractCommitmentFro7.config;
                keys = publicKeys.map(function(key) {
                  return key.toBase58();
                });
                args = this._buildArgs([keys], commitment, "base64", config);
                _context21.next = 5;
                return this._rpcRequest("getMultipleAccounts", args);
              case 5:
                unsafeRes = _context21.sent;
                res = create(unsafeRes, jsonRpcResultAndContext(array(nullable(AccountInfoResult))));
                if (!("error" in res)) {
                  _context21.next = 9;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get info for accounts ".concat(keys));
              case 9:
                return _context21.abrupt("return", res.result);
              case 10:
              case "end":
                return _context21.stop();
            }
        }, _callee21, this);
      }));
      function getMultipleAccountsInfoAndContext(_x33, _x34) {
        return _getMultipleAccountsInfoAndContext.apply(this, arguments);
      }
      return getMultipleAccountsInfoAndContext;
    }()
    /**
     * Fetch all the account info for multiple accounts specified by an array of public keys
     */
  }, {
    key: "getMultipleAccountsInfo",
    value: function() {
      var _getMultipleAccountsInfo = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee22(publicKeys, commitmentOrConfig) {
        var res;
        return import_regenerator.default.wrap(function _callee22$(_context22) {
          while (1)
            switch (_context22.prev = _context22.next) {
              case 0:
                _context22.next = 2;
                return this.getMultipleAccountsInfoAndContext(publicKeys, commitmentOrConfig);
              case 2:
                res = _context22.sent;
                return _context22.abrupt("return", res.value);
              case 4:
              case "end":
                return _context22.stop();
            }
        }, _callee22, this);
      }));
      function getMultipleAccountsInfo(_x35, _x36) {
        return _getMultipleAccountsInfo.apply(this, arguments);
      }
      return getMultipleAccountsInfo;
    }()
    /**
     * Returns epoch activation information for a stake account that has been delegated
     */
  }, {
    key: "getStakeActivation",
    value: function() {
      var _getStakeActivation = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee23(publicKey3, commitmentOrConfig, epoch) {
        var _extractCommitmentFro8, commitment, config, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee23$(_context23) {
          while (1)
            switch (_context23.prev = _context23.next) {
              case 0:
                _extractCommitmentFro8 = extractCommitmentFromConfig(commitmentOrConfig), commitment = _extractCommitmentFro8.commitment, config = _extractCommitmentFro8.config;
                args = this._buildArgs([publicKey3.toBase58()], commitment, void 0, _objectSpread(_objectSpread({}, config), {}, {
                  epoch: epoch != null ? epoch : config === null || config === void 0 ? void 0 : config.epoch
                }));
                _context23.next = 4;
                return this._rpcRequest("getStakeActivation", args);
              case 4:
                unsafeRes = _context23.sent;
                res = create(unsafeRes, jsonRpcResult(StakeActivationResult));
                if (!("error" in res)) {
                  _context23.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get Stake Activation ".concat(publicKey3.toBase58()));
              case 8:
                return _context23.abrupt("return", res.result);
              case 9:
              case "end":
                return _context23.stop();
            }
        }, _callee23, this);
      }));
      function getStakeActivation(_x37, _x38, _x39) {
        return _getStakeActivation.apply(this, arguments);
      }
      return getStakeActivation;
    }()
    /**
     * Fetch all the accounts owned by the specified program id
     *
     * @return {Promise<Array<{pubkey: PublicKey, account: AccountInfo<Buffer>}>>}
     */
  }, {
    key: "getProgramAccounts",
    value: (
      // eslint-disable-next-line no-dupe-class-members
      function() {
        var _getProgramAccounts = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee24(programId, configOrCommitment) {
          var _extractCommitmentFro9, commitment, config, _ref5, encoding, configWithoutEncoding, args, unsafeRes, baseSchema, res;
          return import_regenerator.default.wrap(function _callee24$(_context24) {
            while (1)
              switch (_context24.prev = _context24.next) {
                case 0:
                  _extractCommitmentFro9 = extractCommitmentFromConfig(configOrCommitment), commitment = _extractCommitmentFro9.commitment, config = _extractCommitmentFro9.config;
                  _ref5 = config || {}, encoding = _ref5.encoding, configWithoutEncoding = _objectWithoutProperties(_ref5, _excluded2);
                  args = this._buildArgs([programId.toBase58()], commitment, encoding || "base64", configWithoutEncoding);
                  _context24.next = 5;
                  return this._rpcRequest("getProgramAccounts", args);
                case 5:
                  unsafeRes = _context24.sent;
                  baseSchema = array(KeyedAccountInfoResult);
                  res = configWithoutEncoding.withContext === true ? create(unsafeRes, jsonRpcResultAndContext(baseSchema)) : create(unsafeRes, jsonRpcResult(baseSchema));
                  if (!("error" in res)) {
                    _context24.next = 10;
                    break;
                  }
                  throw new SolanaJSONRPCError(res.error, "failed to get accounts owned by program ".concat(programId.toBase58()));
                case 10:
                  return _context24.abrupt("return", res.result);
                case 11:
                case "end":
                  return _context24.stop();
              }
          }, _callee24, this);
        }));
        function getProgramAccounts(_x40, _x41) {
          return _getProgramAccounts.apply(this, arguments);
        }
        return getProgramAccounts;
      }()
    )
    /**
     * Fetch and parse all the accounts owned by the specified program id
     *
     * @return {Promise<Array<{pubkey: PublicKey, account: AccountInfo<Buffer | ParsedAccountData>}>>}
     */
  }, {
    key: "getParsedProgramAccounts",
    value: function() {
      var _getParsedProgramAccounts = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee25(programId, configOrCommitment) {
        var _extractCommitmentFro10, commitment, config, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee25$(_context25) {
          while (1)
            switch (_context25.prev = _context25.next) {
              case 0:
                _extractCommitmentFro10 = extractCommitmentFromConfig(configOrCommitment), commitment = _extractCommitmentFro10.commitment, config = _extractCommitmentFro10.config;
                args = this._buildArgs([programId.toBase58()], commitment, "jsonParsed", config);
                _context25.next = 4;
                return this._rpcRequest("getProgramAccounts", args);
              case 4:
                unsafeRes = _context25.sent;
                res = create(unsafeRes, jsonRpcResult(array(KeyedParsedAccountInfoResult)));
                if (!("error" in res)) {
                  _context25.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get accounts owned by program ".concat(programId.toBase58()));
              case 8:
                return _context25.abrupt("return", res.result);
              case 9:
              case "end":
                return _context25.stop();
            }
        }, _callee25, this);
      }));
      function getParsedProgramAccounts(_x42, _x43) {
        return _getParsedProgramAccounts.apply(this, arguments);
      }
      return getParsedProgramAccounts;
    }()
  }, {
    key: "confirmTransaction",
    value: (
      // eslint-disable-next-line no-dupe-class-members
      function() {
        var _confirmTransaction = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee26(strategy, commitment) {
          var rawSignature, _config$abortSignal, _config, decodedSignature;
          return import_regenerator.default.wrap(function _callee26$(_context26) {
            while (1)
              switch (_context26.prev = _context26.next) {
                case 0:
                  if (!(typeof strategy == "string")) {
                    _context26.next = 4;
                    break;
                  }
                  rawSignature = strategy;
                  _context26.next = 8;
                  break;
                case 4:
                  _config = strategy;
                  if (!((_config$abortSignal = _config.abortSignal) !== null && _config$abortSignal !== void 0 && _config$abortSignal.aborted)) {
                    _context26.next = 7;
                    break;
                  }
                  return _context26.abrupt("return", Promise.reject(_config.abortSignal.reason));
                case 7:
                  rawSignature = _config.signature;
                case 8:
                  _context26.prev = 8;
                  decodedSignature = import_bs58.default.decode(rawSignature);
                  _context26.next = 15;
                  break;
                case 12:
                  _context26.prev = 12;
                  _context26.t0 = _context26["catch"](8);
                  throw new Error("signature must be base58 encoded: " + rawSignature);
                case 15:
                  assert2(decodedSignature.length === 64, "signature has invalid length");
                  if (!(typeof strategy === "string")) {
                    _context26.next = 22;
                    break;
                  }
                  _context26.next = 19;
                  return this.confirmTransactionUsingLegacyTimeoutStrategy({
                    commitment: commitment || this.commitment,
                    signature: rawSignature
                  });
                case 19:
                  return _context26.abrupt("return", _context26.sent);
                case 22:
                  if (!("lastValidBlockHeight" in strategy)) {
                    _context26.next = 28;
                    break;
                  }
                  _context26.next = 25;
                  return this.confirmTransactionUsingBlockHeightExceedanceStrategy({
                    commitment: commitment || this.commitment,
                    strategy
                  });
                case 25:
                  return _context26.abrupt("return", _context26.sent);
                case 28:
                  _context26.next = 30;
                  return this.confirmTransactionUsingDurableNonceStrategy({
                    commitment: commitment || this.commitment,
                    strategy
                  });
                case 30:
                  return _context26.abrupt("return", _context26.sent);
                case 31:
                case "end":
                  return _context26.stop();
              }
          }, _callee26, this, [[8, 12]]);
        }));
        function confirmTransaction(_x44, _x45) {
          return _confirmTransaction.apply(this, arguments);
        }
        return confirmTransaction;
      }()
    )
  }, {
    key: "getCancellationPromise",
    value: function getCancellationPromise(signal) {
      return new Promise(function(_, reject) {
        if (signal == null) {
          return;
        }
        if (signal.aborted) {
          reject(signal.reason);
        } else {
          signal.addEventListener("abort", function() {
            reject(signal.reason);
          });
        }
      });
    }
  }, {
    key: "getTransactionConfirmationPromise",
    value: function getTransactionConfirmationPromise(_ref6) {
      var _this2 = this;
      var commitment = _ref6.commitment, signature = _ref6.signature;
      var signatureSubscriptionId;
      var disposeSignatureSubscriptionStateChangeObserver;
      var done = false;
      var confirmationPromise = new Promise(function(resolve, reject) {
        try {
          signatureSubscriptionId = _this2.onSignature(signature, function(result, context) {
            signatureSubscriptionId = void 0;
            var response = {
              context,
              value: result
            };
            resolve({
              __type: TransactionStatus.PROCESSED,
              response
            });
          }, commitment);
          var subscriptionSetupPromise = new Promise(function(resolveSubscriptionSetup) {
            if (signatureSubscriptionId == null) {
              resolveSubscriptionSetup();
            } else {
              disposeSignatureSubscriptionStateChangeObserver = _this2._onSubscriptionStateChange(signatureSubscriptionId, function(nextState) {
                if (nextState === "subscribed") {
                  resolveSubscriptionSetup();
                }
              });
            }
          });
          _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee27() {
            var response, context, value;
            return import_regenerator.default.wrap(function _callee27$(_context27) {
              while (1)
                switch (_context27.prev = _context27.next) {
                  case 0:
                    _context27.next = 2;
                    return subscriptionSetupPromise;
                  case 2:
                    if (!done) {
                      _context27.next = 4;
                      break;
                    }
                    return _context27.abrupt("return");
                  case 4:
                    _context27.next = 6;
                    return _this2.getSignatureStatus(signature);
                  case 6:
                    response = _context27.sent;
                    if (!done) {
                      _context27.next = 9;
                      break;
                    }
                    return _context27.abrupt("return");
                  case 9:
                    if (!(response == null)) {
                      _context27.next = 11;
                      break;
                    }
                    return _context27.abrupt("return");
                  case 11:
                    context = response.context, value = response.value;
                    if (!(value == null)) {
                      _context27.next = 14;
                      break;
                    }
                    return _context27.abrupt("return");
                  case 14:
                    if (!(value !== null && value !== void 0 && value.err)) {
                      _context27.next = 18;
                      break;
                    }
                    reject(value.err);
                    _context27.next = 29;
                    break;
                  case 18:
                    _context27.t0 = commitment;
                    _context27.next = _context27.t0 === "confirmed" ? 21 : _context27.t0 === "single" ? 21 : _context27.t0 === "singleGossip" ? 21 : _context27.t0 === "finalized" ? 24 : _context27.t0 === "max" ? 24 : _context27.t0 === "root" ? 24 : _context27.t0 === "processed" ? 27 : _context27.t0 === "recent" ? 27 : 27;
                    break;
                  case 21:
                    if (!(value.confirmationStatus === "processed")) {
                      _context27.next = 23;
                      break;
                    }
                    return _context27.abrupt("return");
                  case 23:
                    return _context27.abrupt("break", 27);
                  case 24:
                    if (!(value.confirmationStatus === "processed" || value.confirmationStatus === "confirmed")) {
                      _context27.next = 26;
                      break;
                    }
                    return _context27.abrupt("return");
                  case 26:
                    return _context27.abrupt("break", 27);
                  case 27:
                    done = true;
                    resolve({
                      __type: TransactionStatus.PROCESSED,
                      response: {
                        context,
                        value
                      }
                    });
                  case 29:
                  case "end":
                    return _context27.stop();
                }
            }, _callee27);
          }))();
        } catch (err) {
          reject(err);
        }
      });
      var abortConfirmation = function abortConfirmation2() {
        if (disposeSignatureSubscriptionStateChangeObserver) {
          disposeSignatureSubscriptionStateChangeObserver();
          disposeSignatureSubscriptionStateChangeObserver = void 0;
        }
        if (signatureSubscriptionId != null) {
          _this2.removeSignatureListener(signatureSubscriptionId);
          signatureSubscriptionId = void 0;
        }
      };
      return {
        abortConfirmation,
        confirmationPromise
      };
    }
  }, {
    key: "confirmTransactionUsingBlockHeightExceedanceStrategy",
    value: function() {
      var _confirmTransactionUsingBlockHeightExceedanceStrategy = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee30(_ref8) {
        var _this3 = this;
        var commitment, _ref8$strategy, abortSignal, lastValidBlockHeight, signature, done, expiryPromise, _this$getTransactionC, abortConfirmation, confirmationPromise, cancellationPromise, result, outcome;
        return import_regenerator.default.wrap(function _callee30$(_context30) {
          while (1)
            switch (_context30.prev = _context30.next) {
              case 0:
                commitment = _ref8.commitment, _ref8$strategy = _ref8.strategy, abortSignal = _ref8$strategy.abortSignal, lastValidBlockHeight = _ref8$strategy.lastValidBlockHeight, signature = _ref8$strategy.signature;
                done = false;
                expiryPromise = new Promise(function(resolve) {
                  var checkBlockHeight = /* @__PURE__ */ function() {
                    var _ref9 = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee28() {
                      var blockHeight;
                      return import_regenerator.default.wrap(function _callee28$(_context28) {
                        while (1)
                          switch (_context28.prev = _context28.next) {
                            case 0:
                              _context28.prev = 0;
                              _context28.next = 3;
                              return _this3.getBlockHeight(commitment);
                            case 3:
                              blockHeight = _context28.sent;
                              return _context28.abrupt("return", blockHeight);
                            case 7:
                              _context28.prev = 7;
                              _context28.t0 = _context28["catch"](0);
                              return _context28.abrupt("return", -1);
                            case 10:
                            case "end":
                              return _context28.stop();
                          }
                      }, _callee28, null, [[0, 7]]);
                    }));
                    return function checkBlockHeight2() {
                      return _ref9.apply(this, arguments);
                    };
                  }();
                  _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee29() {
                    var currentBlockHeight;
                    return import_regenerator.default.wrap(function _callee29$(_context29) {
                      while (1)
                        switch (_context29.prev = _context29.next) {
                          case 0:
                            _context29.next = 2;
                            return checkBlockHeight();
                          case 2:
                            currentBlockHeight = _context29.sent;
                            if (!done) {
                              _context29.next = 5;
                              break;
                            }
                            return _context29.abrupt("return");
                          case 5:
                            if (!(currentBlockHeight <= lastValidBlockHeight)) {
                              _context29.next = 17;
                              break;
                            }
                            _context29.next = 8;
                            return sleep(1e3);
                          case 8:
                            if (!done) {
                              _context29.next = 10;
                              break;
                            }
                            return _context29.abrupt("return");
                          case 10:
                            _context29.next = 12;
                            return checkBlockHeight();
                          case 12:
                            currentBlockHeight = _context29.sent;
                            if (!done) {
                              _context29.next = 15;
                              break;
                            }
                            return _context29.abrupt("return");
                          case 15:
                            _context29.next = 5;
                            break;
                          case 17:
                            resolve({
                              __type: TransactionStatus.BLOCKHEIGHT_EXCEEDED
                            });
                          case 18:
                          case "end":
                            return _context29.stop();
                        }
                    }, _callee29);
                  }))();
                });
                _this$getTransactionC = this.getTransactionConfirmationPromise({
                  commitment,
                  signature
                }), abortConfirmation = _this$getTransactionC.abortConfirmation, confirmationPromise = _this$getTransactionC.confirmationPromise;
                cancellationPromise = this.getCancellationPromise(abortSignal);
                _context30.prev = 5;
                _context30.next = 8;
                return Promise.race([cancellationPromise, confirmationPromise, expiryPromise]);
              case 8:
                outcome = _context30.sent;
                if (!(outcome.__type === TransactionStatus.PROCESSED)) {
                  _context30.next = 13;
                  break;
                }
                result = outcome.response;
                _context30.next = 14;
                break;
              case 13:
                throw new TransactionExpiredBlockheightExceededError(signature);
              case 14:
                _context30.prev = 14;
                done = true;
                abortConfirmation();
                return _context30.finish(14);
              case 18:
                return _context30.abrupt("return", result);
              case 19:
              case "end":
                return _context30.stop();
            }
        }, _callee30, this, [[5, , 14, 18]]);
      }));
      function confirmTransactionUsingBlockHeightExceedanceStrategy(_x46) {
        return _confirmTransactionUsingBlockHeightExceedanceStrategy.apply(this, arguments);
      }
      return confirmTransactionUsingBlockHeightExceedanceStrategy;
    }()
  }, {
    key: "confirmTransactionUsingDurableNonceStrategy",
    value: function() {
      var _confirmTransactionUsingDurableNonceStrategy = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee33(_ref11) {
        var _this4 = this;
        var commitment, _ref11$strategy, abortSignal, minContextSlot, nonceAccountPubkey, nonceValue, signature, done, expiryPromise, _this$getTransactionC2, abortConfirmation, confirmationPromise, cancellationPromise, result, outcome, _signatureStatus, signatureStatus, _outcome$slotInWhichN, status, commitmentForStatus, confirmationStatus;
        return import_regenerator.default.wrap(function _callee33$(_context34) {
          while (1)
            switch (_context34.prev = _context34.next) {
              case 0:
                commitment = _ref11.commitment, _ref11$strategy = _ref11.strategy, abortSignal = _ref11$strategy.abortSignal, minContextSlot = _ref11$strategy.minContextSlot, nonceAccountPubkey = _ref11$strategy.nonceAccountPubkey, nonceValue = _ref11$strategy.nonceValue, signature = _ref11$strategy.signature;
                done = false;
                expiryPromise = new Promise(function(resolve) {
                  var currentNonceValue = nonceValue;
                  var lastCheckedSlot = null;
                  var getCurrentNonceValue = /* @__PURE__ */ function() {
                    var _ref12 = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee31() {
                      var _yield$_this4$getNonc, _context31, nonceAccount;
                      return import_regenerator.default.wrap(function _callee31$(_context32) {
                        while (1)
                          switch (_context32.prev = _context32.next) {
                            case 0:
                              _context32.prev = 0;
                              _context32.next = 3;
                              return _this4.getNonceAndContext(nonceAccountPubkey, {
                                commitment,
                                minContextSlot
                              });
                            case 3:
                              _yield$_this4$getNonc = _context32.sent;
                              _context31 = _yield$_this4$getNonc.context;
                              nonceAccount = _yield$_this4$getNonc.value;
                              lastCheckedSlot = _context31.slot;
                              return _context32.abrupt("return", nonceAccount === null || nonceAccount === void 0 ? void 0 : nonceAccount.nonce);
                            case 10:
                              _context32.prev = 10;
                              _context32.t0 = _context32["catch"](0);
                              return _context32.abrupt("return", currentNonceValue);
                            case 13:
                            case "end":
                              return _context32.stop();
                          }
                      }, _callee31, null, [[0, 10]]);
                    }));
                    return function getCurrentNonceValue2() {
                      return _ref12.apply(this, arguments);
                    };
                  }();
                  _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee32() {
                    return import_regenerator.default.wrap(function _callee32$(_context33) {
                      while (1)
                        switch (_context33.prev = _context33.next) {
                          case 0:
                            _context33.next = 2;
                            return getCurrentNonceValue();
                          case 2:
                            currentNonceValue = _context33.sent;
                            if (!done) {
                              _context33.next = 5;
                              break;
                            }
                            return _context33.abrupt("return");
                          case 5:
                            if (!(nonceValue !== currentNonceValue)) {
                              _context33.next = 9;
                              break;
                            }
                            resolve({
                              __type: TransactionStatus.NONCE_INVALID,
                              slotInWhichNonceDidAdvance: lastCheckedSlot
                            });
                            return _context33.abrupt("return");
                          case 9:
                            _context33.next = 11;
                            return sleep(2e3);
                          case 11:
                            if (!done) {
                              _context33.next = 13;
                              break;
                            }
                            return _context33.abrupt("return");
                          case 13:
                            _context33.next = 15;
                            return getCurrentNonceValue();
                          case 15:
                            currentNonceValue = _context33.sent;
                            if (!done) {
                              _context33.next = 18;
                              break;
                            }
                            return _context33.abrupt("return");
                          case 18:
                            _context33.next = 5;
                            break;
                          case 20:
                          case "end":
                            return _context33.stop();
                        }
                    }, _callee32);
                  }))();
                });
                _this$getTransactionC2 = this.getTransactionConfirmationPromise({
                  commitment,
                  signature
                }), abortConfirmation = _this$getTransactionC2.abortConfirmation, confirmationPromise = _this$getTransactionC2.confirmationPromise;
                cancellationPromise = this.getCancellationPromise(abortSignal);
                _context34.prev = 5;
                _context34.next = 8;
                return Promise.race([cancellationPromise, confirmationPromise, expiryPromise]);
              case 8:
                outcome = _context34.sent;
                if (!(outcome.__type === TransactionStatus.PROCESSED)) {
                  _context34.next = 13;
                  break;
                }
                result = outcome.response;
                _context34.next = 47;
                break;
              case 13:
                _context34.next = 16;
                return this.getSignatureStatus(signature);
              case 16:
                status = _context34.sent;
                if (!(status == null)) {
                  _context34.next = 19;
                  break;
                }
                return _context34.abrupt("break", 27);
              case 19:
                if (!(status.context.slot < ((_outcome$slotInWhichN = outcome.slotInWhichNonceDidAdvance) !== null && _outcome$slotInWhichN !== void 0 ? _outcome$slotInWhichN : minContextSlot))) {
                  _context34.next = 23;
                  break;
                }
                _context34.next = 22;
                return sleep(400);
              case 22:
                return _context34.abrupt("continue", 13);
              case 23:
                signatureStatus = status;
                return _context34.abrupt("break", 27);
              case 27:
                if (!((_signatureStatus = signatureStatus) !== null && _signatureStatus !== void 0 && _signatureStatus.value)) {
                  _context34.next = 46;
                  break;
                }
                commitmentForStatus = commitment || "finalized";
                confirmationStatus = signatureStatus.value.confirmationStatus;
                _context34.t0 = commitmentForStatus;
                _context34.next = _context34.t0 === "processed" ? 33 : _context34.t0 === "recent" ? 33 : _context34.t0 === "confirmed" ? 36 : _context34.t0 === "single" ? 36 : _context34.t0 === "singleGossip" ? 36 : _context34.t0 === "finalized" ? 39 : _context34.t0 === "max" ? 39 : _context34.t0 === "root" ? 39 : 42;
                break;
              case 33:
                if (!(confirmationStatus !== "processed" && confirmationStatus !== "confirmed" && confirmationStatus !== "finalized")) {
                  _context34.next = 35;
                  break;
                }
                throw new TransactionExpiredNonceInvalidError(signature);
              case 35:
                return _context34.abrupt("break", 43);
              case 36:
                if (!(confirmationStatus !== "confirmed" && confirmationStatus !== "finalized")) {
                  _context34.next = 38;
                  break;
                }
                throw new TransactionExpiredNonceInvalidError(signature);
              case 38:
                return _context34.abrupt("break", 43);
              case 39:
                if (!(confirmationStatus !== "finalized")) {
                  _context34.next = 41;
                  break;
                }
                throw new TransactionExpiredNonceInvalidError(signature);
              case 41:
                return _context34.abrupt("break", 43);
              case 42:
              case 43:
                result = {
                  context: signatureStatus.context,
                  value: {
                    err: signatureStatus.value.err
                  }
                };
                _context34.next = 47;
                break;
              case 46:
                throw new TransactionExpiredNonceInvalidError(signature);
              case 47:
                _context34.prev = 47;
                done = true;
                abortConfirmation();
                return _context34.finish(47);
              case 51:
                return _context34.abrupt("return", result);
              case 52:
              case "end":
                return _context34.stop();
            }
        }, _callee33, this, [[5, , 47, 51]]);
      }));
      function confirmTransactionUsingDurableNonceStrategy(_x47) {
        return _confirmTransactionUsingDurableNonceStrategy.apply(this, arguments);
      }
      return confirmTransactionUsingDurableNonceStrategy;
    }()
  }, {
    key: "confirmTransactionUsingLegacyTimeoutStrategy",
    value: function() {
      var _confirmTransactionUsingLegacyTimeoutStrategy = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee34(_ref14) {
        var _this5 = this;
        var commitment, signature, timeoutId, expiryPromise, _this$getTransactionC3, abortConfirmation, confirmationPromise, result, outcome;
        return import_regenerator.default.wrap(function _callee34$(_context35) {
          while (1)
            switch (_context35.prev = _context35.next) {
              case 0:
                commitment = _ref14.commitment, signature = _ref14.signature;
                expiryPromise = new Promise(function(resolve) {
                  var timeoutMs = _this5._confirmTransactionInitialTimeout || 60 * 1e3;
                  switch (commitment) {
                    case "processed":
                    case "recent":
                    case "single":
                    case "confirmed":
                    case "singleGossip": {
                      timeoutMs = _this5._confirmTransactionInitialTimeout || 30 * 1e3;
                      break;
                    }
                  }
                  timeoutId = setTimeout(function() {
                    return resolve({
                      __type: TransactionStatus.TIMED_OUT,
                      timeoutMs
                    });
                  }, timeoutMs);
                });
                _this$getTransactionC3 = this.getTransactionConfirmationPromise({
                  commitment,
                  signature
                }), abortConfirmation = _this$getTransactionC3.abortConfirmation, confirmationPromise = _this$getTransactionC3.confirmationPromise;
                _context35.prev = 3;
                _context35.next = 6;
                return Promise.race([confirmationPromise, expiryPromise]);
              case 6:
                outcome = _context35.sent;
                if (!(outcome.__type === TransactionStatus.PROCESSED)) {
                  _context35.next = 11;
                  break;
                }
                result = outcome.response;
                _context35.next = 12;
                break;
              case 11:
                throw new TransactionExpiredTimeoutError(signature, outcome.timeoutMs / 1e3);
              case 12:
                _context35.prev = 12;
                clearTimeout(timeoutId);
                abortConfirmation();
                return _context35.finish(12);
              case 16:
                return _context35.abrupt("return", result);
              case 17:
              case "end":
                return _context35.stop();
            }
        }, _callee34, this, [[3, , 12, 16]]);
      }));
      function confirmTransactionUsingLegacyTimeoutStrategy(_x48) {
        return _confirmTransactionUsingLegacyTimeoutStrategy.apply(this, arguments);
      }
      return confirmTransactionUsingLegacyTimeoutStrategy;
    }()
    /**
     * Return the list of nodes that are currently participating in the cluster
     */
  }, {
    key: "getClusterNodes",
    value: function() {
      var _getClusterNodes = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee35() {
        var unsafeRes, res;
        return import_regenerator.default.wrap(function _callee35$(_context36) {
          while (1)
            switch (_context36.prev = _context36.next) {
              case 0:
                _context36.next = 2;
                return this._rpcRequest("getClusterNodes", []);
              case 2:
                unsafeRes = _context36.sent;
                res = create(unsafeRes, jsonRpcResult(array(ContactInfoResult)));
                if (!("error" in res)) {
                  _context36.next = 6;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get cluster nodes");
              case 6:
                return _context36.abrupt("return", res.result);
              case 7:
              case "end":
                return _context36.stop();
            }
        }, _callee35, this);
      }));
      function getClusterNodes() {
        return _getClusterNodes.apply(this, arguments);
      }
      return getClusterNodes;
    }()
    /**
     * Return the list of nodes that are currently participating in the cluster
     */
  }, {
    key: "getVoteAccounts",
    value: function() {
      var _getVoteAccounts = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee36(commitment) {
        var args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee36$(_context37) {
          while (1)
            switch (_context37.prev = _context37.next) {
              case 0:
                args = this._buildArgs([], commitment);
                _context37.next = 3;
                return this._rpcRequest("getVoteAccounts", args);
              case 3:
                unsafeRes = _context37.sent;
                res = create(unsafeRes, GetVoteAccounts);
                if (!("error" in res)) {
                  _context37.next = 7;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get vote accounts");
              case 7:
                return _context37.abrupt("return", res.result);
              case 8:
              case "end":
                return _context37.stop();
            }
        }, _callee36, this);
      }));
      function getVoteAccounts(_x49) {
        return _getVoteAccounts.apply(this, arguments);
      }
      return getVoteAccounts;
    }()
    /**
     * Fetch the current slot that the node is processing
     */
  }, {
    key: "getSlot",
    value: function() {
      var _getSlot = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee37(commitmentOrConfig) {
        var _extractCommitmentFro11, commitment, config, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee37$(_context38) {
          while (1)
            switch (_context38.prev = _context38.next) {
              case 0:
                _extractCommitmentFro11 = extractCommitmentFromConfig(commitmentOrConfig), commitment = _extractCommitmentFro11.commitment, config = _extractCommitmentFro11.config;
                args = this._buildArgs([], commitment, void 0, config);
                _context38.next = 4;
                return this._rpcRequest("getSlot", args);
              case 4:
                unsafeRes = _context38.sent;
                res = create(unsafeRes, jsonRpcResult(number2()));
                if (!("error" in res)) {
                  _context38.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get slot");
              case 8:
                return _context38.abrupt("return", res.result);
              case 9:
              case "end":
                return _context38.stop();
            }
        }, _callee37, this);
      }));
      function getSlot(_x50) {
        return _getSlot.apply(this, arguments);
      }
      return getSlot;
    }()
    /**
     * Fetch the current slot leader of the cluster
     */
  }, {
    key: "getSlotLeader",
    value: function() {
      var _getSlotLeader = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee38(commitmentOrConfig) {
        var _extractCommitmentFro12, commitment, config, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee38$(_context39) {
          while (1)
            switch (_context39.prev = _context39.next) {
              case 0:
                _extractCommitmentFro12 = extractCommitmentFromConfig(commitmentOrConfig), commitment = _extractCommitmentFro12.commitment, config = _extractCommitmentFro12.config;
                args = this._buildArgs([], commitment, void 0, config);
                _context39.next = 4;
                return this._rpcRequest("getSlotLeader", args);
              case 4:
                unsafeRes = _context39.sent;
                res = create(unsafeRes, jsonRpcResult(string()));
                if (!("error" in res)) {
                  _context39.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get slot leader");
              case 8:
                return _context39.abrupt("return", res.result);
              case 9:
              case "end":
                return _context39.stop();
            }
        }, _callee38, this);
      }));
      function getSlotLeader(_x51) {
        return _getSlotLeader.apply(this, arguments);
      }
      return getSlotLeader;
    }()
    /**
     * Fetch `limit` number of slot leaders starting from `startSlot`
     *
     * @param startSlot fetch slot leaders starting from this slot
     * @param limit number of slot leaders to return
     */
  }, {
    key: "getSlotLeaders",
    value: function() {
      var _getSlotLeaders = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee39(startSlot, limit) {
        var args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee39$(_context40) {
          while (1)
            switch (_context40.prev = _context40.next) {
              case 0:
                args = [startSlot, limit];
                _context40.next = 3;
                return this._rpcRequest("getSlotLeaders", args);
              case 3:
                unsafeRes = _context40.sent;
                res = create(unsafeRes, jsonRpcResult(array(PublicKeyFromString)));
                if (!("error" in res)) {
                  _context40.next = 7;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get slot leaders");
              case 7:
                return _context40.abrupt("return", res.result);
              case 8:
              case "end":
                return _context40.stop();
            }
        }, _callee39, this);
      }));
      function getSlotLeaders(_x52, _x53) {
        return _getSlotLeaders.apply(this, arguments);
      }
      return getSlotLeaders;
    }()
    /**
     * Fetch the current status of a signature
     */
  }, {
    key: "getSignatureStatus",
    value: function() {
      var _getSignatureStatus = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee40(signature, config) {
        var _yield$this$getSignat, context, values, value;
        return import_regenerator.default.wrap(function _callee40$(_context41) {
          while (1)
            switch (_context41.prev = _context41.next) {
              case 0:
                _context41.next = 2;
                return this.getSignatureStatuses([signature], config);
              case 2:
                _yield$this$getSignat = _context41.sent;
                context = _yield$this$getSignat.context;
                values = _yield$this$getSignat.value;
                assert2(values.length === 1);
                value = values[0];
                return _context41.abrupt("return", {
                  context,
                  value
                });
              case 8:
              case "end":
                return _context41.stop();
            }
        }, _callee40, this);
      }));
      function getSignatureStatus(_x54, _x55) {
        return _getSignatureStatus.apply(this, arguments);
      }
      return getSignatureStatus;
    }()
    /**
     * Fetch the current statuses of a batch of signatures
     */
  }, {
    key: "getSignatureStatuses",
    value: function() {
      var _getSignatureStatuses = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee41(signatures, config) {
        var params, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee41$(_context42) {
          while (1)
            switch (_context42.prev = _context42.next) {
              case 0:
                params = [signatures];
                if (config) {
                  params.push(config);
                }
                _context42.next = 4;
                return this._rpcRequest("getSignatureStatuses", params);
              case 4:
                unsafeRes = _context42.sent;
                res = create(unsafeRes, GetSignatureStatusesRpcResult);
                if (!("error" in res)) {
                  _context42.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get signature status");
              case 8:
                return _context42.abrupt("return", res.result);
              case 9:
              case "end":
                return _context42.stop();
            }
        }, _callee41, this);
      }));
      function getSignatureStatuses(_x56, _x57) {
        return _getSignatureStatuses.apply(this, arguments);
      }
      return getSignatureStatuses;
    }()
    /**
     * Fetch the current transaction count of the cluster
     */
  }, {
    key: "getTransactionCount",
    value: function() {
      var _getTransactionCount = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee42(commitmentOrConfig) {
        var _extractCommitmentFro13, commitment, config, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee42$(_context43) {
          while (1)
            switch (_context43.prev = _context43.next) {
              case 0:
                _extractCommitmentFro13 = extractCommitmentFromConfig(commitmentOrConfig), commitment = _extractCommitmentFro13.commitment, config = _extractCommitmentFro13.config;
                args = this._buildArgs([], commitment, void 0, config);
                _context43.next = 4;
                return this._rpcRequest("getTransactionCount", args);
              case 4:
                unsafeRes = _context43.sent;
                res = create(unsafeRes, jsonRpcResult(number2()));
                if (!("error" in res)) {
                  _context43.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get transaction count");
              case 8:
                return _context43.abrupt("return", res.result);
              case 9:
              case "end":
                return _context43.stop();
            }
        }, _callee42, this);
      }));
      function getTransactionCount(_x58) {
        return _getTransactionCount.apply(this, arguments);
      }
      return getTransactionCount;
    }()
    /**
     * Fetch the current total currency supply of the cluster in lamports
     *
     * @deprecated Deprecated since v1.2.8. Please use {@link getSupply} instead.
     */
  }, {
    key: "getTotalSupply",
    value: function() {
      var _getTotalSupply = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee43(commitment) {
        var result;
        return import_regenerator.default.wrap(function _callee43$(_context44) {
          while (1)
            switch (_context44.prev = _context44.next) {
              case 0:
                _context44.next = 2;
                return this.getSupply({
                  commitment,
                  excludeNonCirculatingAccountsList: true
                });
              case 2:
                result = _context44.sent;
                return _context44.abrupt("return", result.value.total);
              case 4:
              case "end":
                return _context44.stop();
            }
        }, _callee43, this);
      }));
      function getTotalSupply(_x59) {
        return _getTotalSupply.apply(this, arguments);
      }
      return getTotalSupply;
    }()
    /**
     * Fetch the cluster InflationGovernor parameters
     */
  }, {
    key: "getInflationGovernor",
    value: function() {
      var _getInflationGovernor = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee44(commitment) {
        var args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee44$(_context45) {
          while (1)
            switch (_context45.prev = _context45.next) {
              case 0:
                args = this._buildArgs([], commitment);
                _context45.next = 3;
                return this._rpcRequest("getInflationGovernor", args);
              case 3:
                unsafeRes = _context45.sent;
                res = create(unsafeRes, GetInflationGovernorRpcResult);
                if (!("error" in res)) {
                  _context45.next = 7;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get inflation");
              case 7:
                return _context45.abrupt("return", res.result);
              case 8:
              case "end":
                return _context45.stop();
            }
        }, _callee44, this);
      }));
      function getInflationGovernor(_x60) {
        return _getInflationGovernor.apply(this, arguments);
      }
      return getInflationGovernor;
    }()
    /**
     * Fetch the inflation reward for a list of addresses for an epoch
     */
  }, {
    key: "getInflationReward",
    value: function() {
      var _getInflationReward = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee45(addresses, epoch, commitmentOrConfig) {
        var _extractCommitmentFro14, commitment, config, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee45$(_context46) {
          while (1)
            switch (_context46.prev = _context46.next) {
              case 0:
                _extractCommitmentFro14 = extractCommitmentFromConfig(commitmentOrConfig), commitment = _extractCommitmentFro14.commitment, config = _extractCommitmentFro14.config;
                args = this._buildArgs([addresses.map(function(pubkey) {
                  return pubkey.toBase58();
                })], commitment, void 0, _objectSpread(_objectSpread({}, config), {}, {
                  epoch: epoch != null ? epoch : config === null || config === void 0 ? void 0 : config.epoch
                }));
                _context46.next = 4;
                return this._rpcRequest("getInflationReward", args);
              case 4:
                unsafeRes = _context46.sent;
                res = create(unsafeRes, GetInflationRewardResult);
                if (!("error" in res)) {
                  _context46.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get inflation reward");
              case 8:
                return _context46.abrupt("return", res.result);
              case 9:
              case "end":
                return _context46.stop();
            }
        }, _callee45, this);
      }));
      function getInflationReward(_x61, _x62, _x63) {
        return _getInflationReward.apply(this, arguments);
      }
      return getInflationReward;
    }()
    /**
     * Fetch the specific inflation values for the current epoch
     */
  }, {
    key: "getInflationRate",
    value: function() {
      var _getInflationRate = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee46() {
        var unsafeRes, res;
        return import_regenerator.default.wrap(function _callee46$(_context47) {
          while (1)
            switch (_context47.prev = _context47.next) {
              case 0:
                _context47.next = 2;
                return this._rpcRequest("getInflationRate", []);
              case 2:
                unsafeRes = _context47.sent;
                res = create(unsafeRes, GetInflationRateRpcResult);
                if (!("error" in res)) {
                  _context47.next = 6;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get inflation rate");
              case 6:
                return _context47.abrupt("return", res.result);
              case 7:
              case "end":
                return _context47.stop();
            }
        }, _callee46, this);
      }));
      function getInflationRate() {
        return _getInflationRate.apply(this, arguments);
      }
      return getInflationRate;
    }()
    /**
     * Fetch the Epoch Info parameters
     */
  }, {
    key: "getEpochInfo",
    value: function() {
      var _getEpochInfo = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee47(commitmentOrConfig) {
        var _extractCommitmentFro15, commitment, config, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee47$(_context48) {
          while (1)
            switch (_context48.prev = _context48.next) {
              case 0:
                _extractCommitmentFro15 = extractCommitmentFromConfig(commitmentOrConfig), commitment = _extractCommitmentFro15.commitment, config = _extractCommitmentFro15.config;
                args = this._buildArgs([], commitment, void 0, config);
                _context48.next = 4;
                return this._rpcRequest("getEpochInfo", args);
              case 4:
                unsafeRes = _context48.sent;
                res = create(unsafeRes, GetEpochInfoRpcResult);
                if (!("error" in res)) {
                  _context48.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get epoch info");
              case 8:
                return _context48.abrupt("return", res.result);
              case 9:
              case "end":
                return _context48.stop();
            }
        }, _callee47, this);
      }));
      function getEpochInfo(_x64) {
        return _getEpochInfo.apply(this, arguments);
      }
      return getEpochInfo;
    }()
    /**
     * Fetch the Epoch Schedule parameters
     */
  }, {
    key: "getEpochSchedule",
    value: function() {
      var _getEpochSchedule = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee48() {
        var unsafeRes, res, epochSchedule;
        return import_regenerator.default.wrap(function _callee48$(_context49) {
          while (1)
            switch (_context49.prev = _context49.next) {
              case 0:
                _context49.next = 2;
                return this._rpcRequest("getEpochSchedule", []);
              case 2:
                unsafeRes = _context49.sent;
                res = create(unsafeRes, GetEpochScheduleRpcResult);
                if (!("error" in res)) {
                  _context49.next = 6;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get epoch schedule");
              case 6:
                epochSchedule = res.result;
                return _context49.abrupt("return", new EpochSchedule(epochSchedule.slotsPerEpoch, epochSchedule.leaderScheduleSlotOffset, epochSchedule.warmup, epochSchedule.firstNormalEpoch, epochSchedule.firstNormalSlot));
              case 8:
              case "end":
                return _context49.stop();
            }
        }, _callee48, this);
      }));
      function getEpochSchedule() {
        return _getEpochSchedule.apply(this, arguments);
      }
      return getEpochSchedule;
    }()
    /**
     * Fetch the leader schedule for the current epoch
     * @return {Promise<RpcResponseAndContext<LeaderSchedule>>}
     */
  }, {
    key: "getLeaderSchedule",
    value: function() {
      var _getLeaderSchedule = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee49() {
        var unsafeRes, res;
        return import_regenerator.default.wrap(function _callee49$(_context50) {
          while (1)
            switch (_context50.prev = _context50.next) {
              case 0:
                _context50.next = 2;
                return this._rpcRequest("getLeaderSchedule", []);
              case 2:
                unsafeRes = _context50.sent;
                res = create(unsafeRes, GetLeaderScheduleRpcResult);
                if (!("error" in res)) {
                  _context50.next = 6;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get leader schedule");
              case 6:
                return _context50.abrupt("return", res.result);
              case 7:
              case "end":
                return _context50.stop();
            }
        }, _callee49, this);
      }));
      function getLeaderSchedule() {
        return _getLeaderSchedule.apply(this, arguments);
      }
      return getLeaderSchedule;
    }()
    /**
     * Fetch the minimum balance needed to exempt an account of `dataLength`
     * size from rent
     */
  }, {
    key: "getMinimumBalanceForRentExemption",
    value: function() {
      var _getMinimumBalanceForRentExemption = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee50(dataLength, commitment) {
        var args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee50$(_context51) {
          while (1)
            switch (_context51.prev = _context51.next) {
              case 0:
                args = this._buildArgs([dataLength], commitment);
                _context51.next = 3;
                return this._rpcRequest("getMinimumBalanceForRentExemption", args);
              case 3:
                unsafeRes = _context51.sent;
                res = create(unsafeRes, GetMinimumBalanceForRentExemptionRpcResult);
                if (!("error" in res)) {
                  _context51.next = 8;
                  break;
                }
                console.warn("Unable to fetch minimum balance for rent exemption");
                return _context51.abrupt("return", 0);
              case 8:
                return _context51.abrupt("return", res.result);
              case 9:
              case "end":
                return _context51.stop();
            }
        }, _callee50, this);
      }));
      function getMinimumBalanceForRentExemption(_x65, _x66) {
        return _getMinimumBalanceForRentExemption.apply(this, arguments);
      }
      return getMinimumBalanceForRentExemption;
    }()
    /**
     * Fetch a recent blockhash from the cluster, return with context
     * @return {Promise<RpcResponseAndContext<{blockhash: Blockhash, feeCalculator: FeeCalculator}>>}
     *
     * @deprecated Deprecated since Solana v1.8.0. Please use {@link getLatestBlockhash} instead.
     */
  }, {
    key: "getRecentBlockhashAndContext",
    value: function() {
      var _getRecentBlockhashAndContext = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee51(commitment) {
        var args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee51$(_context52) {
          while (1)
            switch (_context52.prev = _context52.next) {
              case 0:
                args = this._buildArgs([], commitment);
                _context52.next = 3;
                return this._rpcRequest("getRecentBlockhash", args);
              case 3:
                unsafeRes = _context52.sent;
                res = create(unsafeRes, GetRecentBlockhashAndContextRpcResult);
                if (!("error" in res)) {
                  _context52.next = 7;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get recent blockhash");
              case 7:
                return _context52.abrupt("return", res.result);
              case 8:
              case "end":
                return _context52.stop();
            }
        }, _callee51, this);
      }));
      function getRecentBlockhashAndContext(_x67) {
        return _getRecentBlockhashAndContext.apply(this, arguments);
      }
      return getRecentBlockhashAndContext;
    }()
    /**
     * Fetch recent performance samples
     * @return {Promise<Array<PerfSample>>}
     */
  }, {
    key: "getRecentPerformanceSamples",
    value: function() {
      var _getRecentPerformanceSamples = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee52(limit) {
        var unsafeRes, res;
        return import_regenerator.default.wrap(function _callee52$(_context53) {
          while (1)
            switch (_context53.prev = _context53.next) {
              case 0:
                _context53.next = 2;
                return this._rpcRequest("getRecentPerformanceSamples", limit ? [limit] : []);
              case 2:
                unsafeRes = _context53.sent;
                res = create(unsafeRes, GetRecentPerformanceSamplesRpcResult);
                if (!("error" in res)) {
                  _context53.next = 6;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get recent performance samples");
              case 6:
                return _context53.abrupt("return", res.result);
              case 7:
              case "end":
                return _context53.stop();
            }
        }, _callee52, this);
      }));
      function getRecentPerformanceSamples(_x68) {
        return _getRecentPerformanceSamples.apply(this, arguments);
      }
      return getRecentPerformanceSamples;
    }()
    /**
     * Fetch the fee calculator for a recent blockhash from the cluster, return with context
     *
     * @deprecated Deprecated since Solana v1.8.0. Please use {@link getFeeForMessage} instead.
     */
  }, {
    key: "getFeeCalculatorForBlockhash",
    value: function() {
      var _getFeeCalculatorForBlockhash = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee53(blockhash, commitment) {
        var args, unsafeRes, res, _res$result, context, value;
        return import_regenerator.default.wrap(function _callee53$(_context54) {
          while (1)
            switch (_context54.prev = _context54.next) {
              case 0:
                args = this._buildArgs([blockhash], commitment);
                _context54.next = 3;
                return this._rpcRequest("getFeeCalculatorForBlockhash", args);
              case 3:
                unsafeRes = _context54.sent;
                res = create(unsafeRes, GetFeeCalculatorRpcResult);
                if (!("error" in res)) {
                  _context54.next = 7;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get fee calculator");
              case 7:
                _res$result = res.result, context = _res$result.context, value = _res$result.value;
                return _context54.abrupt("return", {
                  context,
                  value: value !== null ? value.feeCalculator : null
                });
              case 9:
              case "end":
                return _context54.stop();
            }
        }, _callee53, this);
      }));
      function getFeeCalculatorForBlockhash(_x69, _x70) {
        return _getFeeCalculatorForBlockhash.apply(this, arguments);
      }
      return getFeeCalculatorForBlockhash;
    }()
    /**
     * Fetch the fee for a message from the cluster, return with context
     */
  }, {
    key: "getFeeForMessage",
    value: function() {
      var _getFeeForMessage = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee54(message, commitment) {
        var wireMessage, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee54$(_context55) {
          while (1)
            switch (_context55.prev = _context55.next) {
              case 0:
                wireMessage = toBuffer(message.serialize()).toString("base64");
                args = this._buildArgs([wireMessage], commitment);
                _context55.next = 4;
                return this._rpcRequest("getFeeForMessage", args);
              case 4:
                unsafeRes = _context55.sent;
                res = create(unsafeRes, jsonRpcResultAndContext(nullable(number2())));
                if (!("error" in res)) {
                  _context55.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get fee for message");
              case 8:
                if (!(res.result === null)) {
                  _context55.next = 10;
                  break;
                }
                throw new Error("invalid blockhash");
              case 10:
                return _context55.abrupt("return", res.result);
              case 11:
              case "end":
                return _context55.stop();
            }
        }, _callee54, this);
      }));
      function getFeeForMessage(_x71, _x72) {
        return _getFeeForMessage.apply(this, arguments);
      }
      return getFeeForMessage;
    }()
    /**
     * Fetch a list of prioritization fees from recent blocks.
     */
  }, {
    key: "getRecentPrioritizationFees",
    value: function() {
      var _getRecentPrioritizationFees = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee55(config) {
        var _config$lockedWritabl;
        var accounts, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee55$(_context56) {
          while (1)
            switch (_context56.prev = _context56.next) {
              case 0:
                accounts = config === null || config === void 0 ? void 0 : (_config$lockedWritabl = config.lockedWritableAccounts) === null || _config$lockedWritabl === void 0 ? void 0 : _config$lockedWritabl.map(function(key) {
                  return key.toBase58();
                });
                args = accounts !== null && accounts !== void 0 && accounts.length ? [accounts] : [];
                _context56.next = 4;
                return this._rpcRequest("getRecentPrioritizationFees", args);
              case 4:
                unsafeRes = _context56.sent;
                res = create(unsafeRes, GetRecentPrioritizationFeesRpcResult);
                if (!("error" in res)) {
                  _context56.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get recent prioritization fees");
              case 8:
                return _context56.abrupt("return", res.result);
              case 9:
              case "end":
                return _context56.stop();
            }
        }, _callee55, this);
      }));
      function getRecentPrioritizationFees(_x73) {
        return _getRecentPrioritizationFees.apply(this, arguments);
      }
      return getRecentPrioritizationFees;
    }()
    /**
     * Fetch a recent blockhash from the cluster
     * @return {Promise<{blockhash: Blockhash, feeCalculator: FeeCalculator}>}
     *
     * @deprecated Deprecated since Solana v1.8.0. Please use {@link getLatestBlockhash} instead.
     */
  }, {
    key: "getRecentBlockhash",
    value: function() {
      var _getRecentBlockhash = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee56(commitment) {
        var res;
        return import_regenerator.default.wrap(function _callee56$(_context57) {
          while (1)
            switch (_context57.prev = _context57.next) {
              case 0:
                _context57.prev = 0;
                _context57.next = 3;
                return this.getRecentBlockhashAndContext(commitment);
              case 3:
                res = _context57.sent;
                return _context57.abrupt("return", res.value);
              case 7:
                _context57.prev = 7;
                _context57.t0 = _context57["catch"](0);
                throw new Error("failed to get recent blockhash: " + _context57.t0);
              case 10:
              case "end":
                return _context57.stop();
            }
        }, _callee56, this, [[0, 7]]);
      }));
      function getRecentBlockhash(_x74) {
        return _getRecentBlockhash.apply(this, arguments);
      }
      return getRecentBlockhash;
    }()
    /**
     * Fetch the latest blockhash from the cluster
     * @return {Promise<BlockhashWithExpiryBlockHeight>}
     */
  }, {
    key: "getLatestBlockhash",
    value: function() {
      var _getLatestBlockhash = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee57(commitmentOrConfig) {
        var res;
        return import_regenerator.default.wrap(function _callee57$(_context58) {
          while (1)
            switch (_context58.prev = _context58.next) {
              case 0:
                _context58.prev = 0;
                _context58.next = 3;
                return this.getLatestBlockhashAndContext(commitmentOrConfig);
              case 3:
                res = _context58.sent;
                return _context58.abrupt("return", res.value);
              case 7:
                _context58.prev = 7;
                _context58.t0 = _context58["catch"](0);
                throw new Error("failed to get recent blockhash: " + _context58.t0);
              case 10:
              case "end":
                return _context58.stop();
            }
        }, _callee57, this, [[0, 7]]);
      }));
      function getLatestBlockhash(_x75) {
        return _getLatestBlockhash.apply(this, arguments);
      }
      return getLatestBlockhash;
    }()
    /**
     * Fetch the latest blockhash from the cluster
     * @return {Promise<BlockhashWithExpiryBlockHeight>}
     */
  }, {
    key: "getLatestBlockhashAndContext",
    value: function() {
      var _getLatestBlockhashAndContext = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee58(commitmentOrConfig) {
        var _extractCommitmentFro16, commitment, config, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee58$(_context59) {
          while (1)
            switch (_context59.prev = _context59.next) {
              case 0:
                _extractCommitmentFro16 = extractCommitmentFromConfig(commitmentOrConfig), commitment = _extractCommitmentFro16.commitment, config = _extractCommitmentFro16.config;
                args = this._buildArgs([], commitment, void 0, config);
                _context59.next = 4;
                return this._rpcRequest("getLatestBlockhash", args);
              case 4:
                unsafeRes = _context59.sent;
                res = create(unsafeRes, GetLatestBlockhashRpcResult);
                if (!("error" in res)) {
                  _context59.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get latest blockhash");
              case 8:
                return _context59.abrupt("return", res.result);
              case 9:
              case "end":
                return _context59.stop();
            }
        }, _callee58, this);
      }));
      function getLatestBlockhashAndContext(_x76) {
        return _getLatestBlockhashAndContext.apply(this, arguments);
      }
      return getLatestBlockhashAndContext;
    }()
    /**
     * Returns whether a blockhash is still valid or not
     */
  }, {
    key: "isBlockhashValid",
    value: function() {
      var _isBlockhashValid = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee59(blockhash, rawConfig) {
        var _extractCommitmentFro17, commitment, config, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee59$(_context60) {
          while (1)
            switch (_context60.prev = _context60.next) {
              case 0:
                _extractCommitmentFro17 = extractCommitmentFromConfig(rawConfig), commitment = _extractCommitmentFro17.commitment, config = _extractCommitmentFro17.config;
                args = this._buildArgs([blockhash], commitment, void 0, config);
                _context60.next = 4;
                return this._rpcRequest("isBlockhashValid", args);
              case 4:
                unsafeRes = _context60.sent;
                res = create(unsafeRes, IsBlockhashValidRpcResult);
                if (!("error" in res)) {
                  _context60.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to determine if the blockhash `" + blockhash + "`is valid");
              case 8:
                return _context60.abrupt("return", res.result);
              case 9:
              case "end":
                return _context60.stop();
            }
        }, _callee59, this);
      }));
      function isBlockhashValid(_x77, _x78) {
        return _isBlockhashValid.apply(this, arguments);
      }
      return isBlockhashValid;
    }()
    /**
     * Fetch the node version
     */
  }, {
    key: "getVersion",
    value: function() {
      var _getVersion = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee60() {
        var unsafeRes, res;
        return import_regenerator.default.wrap(function _callee60$(_context61) {
          while (1)
            switch (_context61.prev = _context61.next) {
              case 0:
                _context61.next = 2;
                return this._rpcRequest("getVersion", []);
              case 2:
                unsafeRes = _context61.sent;
                res = create(unsafeRes, jsonRpcResult(VersionResult));
                if (!("error" in res)) {
                  _context61.next = 6;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get version");
              case 6:
                return _context61.abrupt("return", res.result);
              case 7:
              case "end":
                return _context61.stop();
            }
        }, _callee60, this);
      }));
      function getVersion() {
        return _getVersion.apply(this, arguments);
      }
      return getVersion;
    }()
    /**
     * Fetch the genesis hash
     */
  }, {
    key: "getGenesisHash",
    value: function() {
      var _getGenesisHash = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee61() {
        var unsafeRes, res;
        return import_regenerator.default.wrap(function _callee61$(_context62) {
          while (1)
            switch (_context62.prev = _context62.next) {
              case 0:
                _context62.next = 2;
                return this._rpcRequest("getGenesisHash", []);
              case 2:
                unsafeRes = _context62.sent;
                res = create(unsafeRes, jsonRpcResult(string()));
                if (!("error" in res)) {
                  _context62.next = 6;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get genesis hash");
              case 6:
                return _context62.abrupt("return", res.result);
              case 7:
              case "end":
                return _context62.stop();
            }
        }, _callee61, this);
      }));
      function getGenesisHash() {
        return _getGenesisHash.apply(this, arguments);
      }
      return getGenesisHash;
    }()
    /**
     * Fetch a processed block from the cluster.
     *
     * @deprecated Instead, call `getBlock` using a `GetVersionedBlockConfig` by
     * setting the `maxSupportedTransactionVersion` property.
     */
  }, {
    key: "getBlock",
    value: (
      /**
       * Fetch a processed block from the cluster.
       */
      // eslint-disable-next-line no-dupe-class-members
      function() {
        var _getBlock = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee62(slot, rawConfig) {
          var _extractCommitmentFro18, commitment, config, args, unsafeRes, res, _res, _res2, result;
          return import_regenerator.default.wrap(function _callee62$(_context63) {
            while (1)
              switch (_context63.prev = _context63.next) {
                case 0:
                  _extractCommitmentFro18 = extractCommitmentFromConfig(rawConfig), commitment = _extractCommitmentFro18.commitment, config = _extractCommitmentFro18.config;
                  args = this._buildArgsAtLeastConfirmed([slot], commitment, void 0, config);
                  _context63.next = 4;
                  return this._rpcRequest("getBlock", args);
                case 4:
                  unsafeRes = _context63.sent;
                  _context63.prev = 5;
                  _context63.t0 = config === null || config === void 0 ? void 0 : config.transactionDetails;
                  _context63.next = _context63.t0 === "accounts" ? 9 : _context63.t0 === "none" ? 13 : 17;
                  break;
                case 9:
                  res = create(unsafeRes, GetAccountsModeBlockRpcResult);
                  if (!("error" in res)) {
                    _context63.next = 12;
                    break;
                  }
                  throw res.error;
                case 12:
                  return _context63.abrupt("return", res.result);
                case 13:
                  _res = create(unsafeRes, GetNoneModeBlockRpcResult);
                  if (!("error" in _res)) {
                    _context63.next = 16;
                    break;
                  }
                  throw _res.error;
                case 16:
                  return _context63.abrupt("return", _res.result);
                case 17:
                  _res2 = create(unsafeRes, GetBlockRpcResult);
                  if (!("error" in _res2)) {
                    _context63.next = 20;
                    break;
                  }
                  throw _res2.error;
                case 20:
                  result = _res2.result;
                  return _context63.abrupt("return", result ? _objectSpread(_objectSpread({}, result), {}, {
                    transactions: result.transactions.map(function(_ref15) {
                      var transaction = _ref15.transaction, meta = _ref15.meta, version2 = _ref15.version;
                      return {
                        meta,
                        transaction: _objectSpread(_objectSpread({}, transaction), {}, {
                          message: versionedMessageFromResponse(version2, transaction.message)
                        }),
                        version: version2
                      };
                    })
                  }) : null);
                case 22:
                  _context63.next = 27;
                  break;
                case 24:
                  _context63.prev = 24;
                  _context63.t1 = _context63["catch"](5);
                  throw new SolanaJSONRPCError(_context63.t1, "failed to get confirmed block");
                case 27:
                case "end":
                  return _context63.stop();
              }
          }, _callee62, this, [[5, 24]]);
        }));
        function getBlock(_x79, _x80) {
          return _getBlock.apply(this, arguments);
        }
        return getBlock;
      }()
    )
    /**
     * Fetch parsed transaction details for a confirmed or finalized block
     */
  }, {
    key: "getParsedBlock",
    value: (
      // eslint-disable-next-line no-dupe-class-members
      function() {
        var _getParsedBlock = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee63(slot, rawConfig) {
          var _extractCommitmentFro19, commitment, config, args, unsafeRes, res, _res3, _res4;
          return import_regenerator.default.wrap(function _callee63$(_context64) {
            while (1)
              switch (_context64.prev = _context64.next) {
                case 0:
                  _extractCommitmentFro19 = extractCommitmentFromConfig(rawConfig), commitment = _extractCommitmentFro19.commitment, config = _extractCommitmentFro19.config;
                  args = this._buildArgsAtLeastConfirmed([slot], commitment, "jsonParsed", config);
                  _context64.next = 4;
                  return this._rpcRequest("getBlock", args);
                case 4:
                  unsafeRes = _context64.sent;
                  _context64.prev = 5;
                  _context64.t0 = config === null || config === void 0 ? void 0 : config.transactionDetails;
                  _context64.next = _context64.t0 === "accounts" ? 9 : _context64.t0 === "none" ? 13 : 17;
                  break;
                case 9:
                  res = create(unsafeRes, GetParsedAccountsModeBlockRpcResult);
                  if (!("error" in res)) {
                    _context64.next = 12;
                    break;
                  }
                  throw res.error;
                case 12:
                  return _context64.abrupt("return", res.result);
                case 13:
                  _res3 = create(unsafeRes, GetParsedNoneModeBlockRpcResult);
                  if (!("error" in _res3)) {
                    _context64.next = 16;
                    break;
                  }
                  throw _res3.error;
                case 16:
                  return _context64.abrupt("return", _res3.result);
                case 17:
                  _res4 = create(unsafeRes, GetParsedBlockRpcResult);
                  if (!("error" in _res4)) {
                    _context64.next = 20;
                    break;
                  }
                  throw _res4.error;
                case 20:
                  return _context64.abrupt("return", _res4.result);
                case 21:
                  _context64.next = 26;
                  break;
                case 23:
                  _context64.prev = 23;
                  _context64.t1 = _context64["catch"](5);
                  throw new SolanaJSONRPCError(_context64.t1, "failed to get block");
                case 26:
                case "end":
                  return _context64.stop();
              }
          }, _callee63, this, [[5, 23]]);
        }));
        function getParsedBlock(_x81, _x82) {
          return _getParsedBlock.apply(this, arguments);
        }
        return getParsedBlock;
      }()
    )
  }, {
    key: "getBlockProduction",
    value: (
      /*
       * Returns recent block production information from the current or previous epoch
       */
      function() {
        var _getBlockProduction = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee64(configOrCommitment) {
          var extra, commitment, c, rest, args, unsafeRes, res;
          return import_regenerator.default.wrap(function _callee64$(_context65) {
            while (1)
              switch (_context65.prev = _context65.next) {
                case 0:
                  if (typeof configOrCommitment === "string") {
                    commitment = configOrCommitment;
                  } else if (configOrCommitment) {
                    c = configOrCommitment.commitment, rest = _objectWithoutProperties(configOrCommitment, _excluded3);
                    commitment = c;
                    extra = rest;
                  }
                  args = this._buildArgs([], commitment, "base64", extra);
                  _context65.next = 4;
                  return this._rpcRequest("getBlockProduction", args);
                case 4:
                  unsafeRes = _context65.sent;
                  res = create(unsafeRes, BlockProductionResponseStruct);
                  if (!("error" in res)) {
                    _context65.next = 8;
                    break;
                  }
                  throw new SolanaJSONRPCError(res.error, "failed to get block production information");
                case 8:
                  return _context65.abrupt("return", res.result);
                case 9:
                case "end":
                  return _context65.stop();
              }
          }, _callee64, this);
        }));
        function getBlockProduction(_x83) {
          return _getBlockProduction.apply(this, arguments);
        }
        return getBlockProduction;
      }()
    )
    /**
     * Fetch a confirmed or finalized transaction from the cluster.
     *
     * @deprecated Instead, call `getTransaction` using a
     * `GetVersionedTransactionConfig` by setting the
     * `maxSupportedTransactionVersion` property.
     */
  }, {
    key: "getTransaction",
    value: (
      /**
       * Fetch a confirmed or finalized transaction from the cluster.
       */
      // eslint-disable-next-line no-dupe-class-members
      function() {
        var _getTransaction = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee65(signature, rawConfig) {
          var _extractCommitmentFro20, commitment, config, args, unsafeRes, res, result;
          return import_regenerator.default.wrap(function _callee65$(_context66) {
            while (1)
              switch (_context66.prev = _context66.next) {
                case 0:
                  _extractCommitmentFro20 = extractCommitmentFromConfig(rawConfig), commitment = _extractCommitmentFro20.commitment, config = _extractCommitmentFro20.config;
                  args = this._buildArgsAtLeastConfirmed([signature], commitment, void 0, config);
                  _context66.next = 4;
                  return this._rpcRequest("getTransaction", args);
                case 4:
                  unsafeRes = _context66.sent;
                  res = create(unsafeRes, GetTransactionRpcResult);
                  if (!("error" in res)) {
                    _context66.next = 8;
                    break;
                  }
                  throw new SolanaJSONRPCError(res.error, "failed to get transaction");
                case 8:
                  result = res.result;
                  if (result) {
                    _context66.next = 11;
                    break;
                  }
                  return _context66.abrupt("return", result);
                case 11:
                  return _context66.abrupt("return", _objectSpread(_objectSpread({}, result), {}, {
                    transaction: _objectSpread(_objectSpread({}, result.transaction), {}, {
                      message: versionedMessageFromResponse(result.version, result.transaction.message)
                    })
                  }));
                case 12:
                case "end":
                  return _context66.stop();
              }
          }, _callee65, this);
        }));
        function getTransaction(_x84, _x85) {
          return _getTransaction.apply(this, arguments);
        }
        return getTransaction;
      }()
    )
    /**
     * Fetch parsed transaction details for a confirmed or finalized transaction
     */
  }, {
    key: "getParsedTransaction",
    value: function() {
      var _getParsedTransaction = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee66(signature, commitmentOrConfig) {
        var _extractCommitmentFro21, commitment, config, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee66$(_context67) {
          while (1)
            switch (_context67.prev = _context67.next) {
              case 0:
                _extractCommitmentFro21 = extractCommitmentFromConfig(commitmentOrConfig), commitment = _extractCommitmentFro21.commitment, config = _extractCommitmentFro21.config;
                args = this._buildArgsAtLeastConfirmed([signature], commitment, "jsonParsed", config);
                _context67.next = 4;
                return this._rpcRequest("getTransaction", args);
              case 4:
                unsafeRes = _context67.sent;
                res = create(unsafeRes, GetParsedTransactionRpcResult);
                if (!("error" in res)) {
                  _context67.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get transaction");
              case 8:
                return _context67.abrupt("return", res.result);
              case 9:
              case "end":
                return _context67.stop();
            }
        }, _callee66, this);
      }));
      function getParsedTransaction(_x86, _x87) {
        return _getParsedTransaction.apply(this, arguments);
      }
      return getParsedTransaction;
    }()
    /**
     * Fetch parsed transaction details for a batch of confirmed transactions
     */
  }, {
    key: "getParsedTransactions",
    value: function() {
      var _getParsedTransactions = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee67(signatures, commitmentOrConfig) {
        var _this6 = this;
        var _extractCommitmentFro22, commitment, config, batch, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee67$(_context68) {
          while (1)
            switch (_context68.prev = _context68.next) {
              case 0:
                _extractCommitmentFro22 = extractCommitmentFromConfig(commitmentOrConfig), commitment = _extractCommitmentFro22.commitment, config = _extractCommitmentFro22.config;
                batch = signatures.map(function(signature) {
                  var args = _this6._buildArgsAtLeastConfirmed([signature], commitment, "jsonParsed", config);
                  return {
                    methodName: "getTransaction",
                    args
                  };
                });
                _context68.next = 4;
                return this._rpcBatchRequest(batch);
              case 4:
                unsafeRes = _context68.sent;
                res = unsafeRes.map(function(unsafeRes2) {
                  var res2 = create(unsafeRes2, GetParsedTransactionRpcResult);
                  if ("error" in res2) {
                    throw new SolanaJSONRPCError(res2.error, "failed to get transactions");
                  }
                  return res2.result;
                });
                return _context68.abrupt("return", res);
              case 7:
              case "end":
                return _context68.stop();
            }
        }, _callee67, this);
      }));
      function getParsedTransactions(_x88, _x89) {
        return _getParsedTransactions.apply(this, arguments);
      }
      return getParsedTransactions;
    }()
    /**
     * Fetch transaction details for a batch of confirmed transactions.
     * Similar to {@link getParsedTransactions} but returns a {@link TransactionResponse}.
     *
     * @deprecated Instead, call `getTransactions` using a
     * `GetVersionedTransactionConfig` by setting the
     * `maxSupportedTransactionVersion` property.
     */
  }, {
    key: "getTransactions",
    value: (
      /**
       * Fetch transaction details for a batch of confirmed transactions.
       * Similar to {@link getParsedTransactions} but returns a {@link
       * VersionedTransactionResponse}.
       */
      // eslint-disable-next-line no-dupe-class-members
      function() {
        var _getTransactions = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee68(signatures, commitmentOrConfig) {
          var _this7 = this;
          var _extractCommitmentFro23, commitment, config, batch, unsafeRes, res;
          return import_regenerator.default.wrap(function _callee68$(_context69) {
            while (1)
              switch (_context69.prev = _context69.next) {
                case 0:
                  _extractCommitmentFro23 = extractCommitmentFromConfig(commitmentOrConfig), commitment = _extractCommitmentFro23.commitment, config = _extractCommitmentFro23.config;
                  batch = signatures.map(function(signature) {
                    var args = _this7._buildArgsAtLeastConfirmed([signature], commitment, void 0, config);
                    return {
                      methodName: "getTransaction",
                      args
                    };
                  });
                  _context69.next = 4;
                  return this._rpcBatchRequest(batch);
                case 4:
                  unsafeRes = _context69.sent;
                  res = unsafeRes.map(function(unsafeRes2) {
                    var res2 = create(unsafeRes2, GetTransactionRpcResult);
                    if ("error" in res2) {
                      throw new SolanaJSONRPCError(res2.error, "failed to get transactions");
                    }
                    var result = res2.result;
                    if (!result)
                      return result;
                    return _objectSpread(_objectSpread({}, result), {}, {
                      transaction: _objectSpread(_objectSpread({}, result.transaction), {}, {
                        message: versionedMessageFromResponse(result.version, result.transaction.message)
                      })
                    });
                  });
                  return _context69.abrupt("return", res);
                case 7:
                case "end":
                  return _context69.stop();
              }
          }, _callee68, this);
        }));
        function getTransactions(_x90, _x91) {
          return _getTransactions.apply(this, arguments);
        }
        return getTransactions;
      }()
    )
    /**
     * Fetch a list of Transactions and transaction statuses from the cluster
     * for a confirmed block.
     *
     * @deprecated Deprecated since v1.13.0. Please use {@link getBlock} instead.
     */
  }, {
    key: "getConfirmedBlock",
    value: function() {
      var _getConfirmedBlock = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee69(slot, commitment) {
        var args, unsafeRes, res, result, block;
        return import_regenerator.default.wrap(function _callee69$(_context70) {
          while (1)
            switch (_context70.prev = _context70.next) {
              case 0:
                args = this._buildArgsAtLeastConfirmed([slot], commitment);
                _context70.next = 3;
                return this._rpcRequest("getConfirmedBlock", args);
              case 3:
                unsafeRes = _context70.sent;
                res = create(unsafeRes, GetConfirmedBlockRpcResult);
                if (!("error" in res)) {
                  _context70.next = 7;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get confirmed block");
              case 7:
                result = res.result;
                if (result) {
                  _context70.next = 10;
                  break;
                }
                throw new Error("Confirmed block " + slot + " not found");
              case 10:
                block = _objectSpread(_objectSpread({}, result), {}, {
                  transactions: result.transactions.map(function(_ref16) {
                    var transaction = _ref16.transaction, meta = _ref16.meta;
                    var message = new Message(transaction.message);
                    return {
                      meta,
                      transaction: _objectSpread(_objectSpread({}, transaction), {}, {
                        message
                      })
                    };
                  })
                });
                return _context70.abrupt("return", _objectSpread(_objectSpread({}, block), {}, {
                  transactions: block.transactions.map(function(_ref17) {
                    var transaction = _ref17.transaction, meta = _ref17.meta;
                    return {
                      meta,
                      transaction: Transaction.populate(transaction.message, transaction.signatures)
                    };
                  })
                }));
              case 12:
              case "end":
                return _context70.stop();
            }
        }, _callee69, this);
      }));
      function getConfirmedBlock(_x92, _x93) {
        return _getConfirmedBlock.apply(this, arguments);
      }
      return getConfirmedBlock;
    }()
    /**
     * Fetch confirmed blocks between two slots
     */
  }, {
    key: "getBlocks",
    value: function() {
      var _getBlocks = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee70(startSlot, endSlot, commitment) {
        var args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee70$(_context71) {
          while (1)
            switch (_context71.prev = _context71.next) {
              case 0:
                args = this._buildArgsAtLeastConfirmed(endSlot !== void 0 ? [startSlot, endSlot] : [startSlot], commitment);
                _context71.next = 3;
                return this._rpcRequest("getBlocks", args);
              case 3:
                unsafeRes = _context71.sent;
                res = create(unsafeRes, jsonRpcResult(array(number2())));
                if (!("error" in res)) {
                  _context71.next = 7;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get blocks");
              case 7:
                return _context71.abrupt("return", res.result);
              case 8:
              case "end":
                return _context71.stop();
            }
        }, _callee70, this);
      }));
      function getBlocks(_x94, _x95, _x96) {
        return _getBlocks.apply(this, arguments);
      }
      return getBlocks;
    }()
    /**
     * Fetch a list of Signatures from the cluster for a block, excluding rewards
     */
  }, {
    key: "getBlockSignatures",
    value: function() {
      var _getBlockSignatures = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee71(slot, commitment) {
        var args, unsafeRes, res, result;
        return import_regenerator.default.wrap(function _callee71$(_context72) {
          while (1)
            switch (_context72.prev = _context72.next) {
              case 0:
                args = this._buildArgsAtLeastConfirmed([slot], commitment, void 0, {
                  transactionDetails: "signatures",
                  rewards: false
                });
                _context72.next = 3;
                return this._rpcRequest("getBlock", args);
              case 3:
                unsafeRes = _context72.sent;
                res = create(unsafeRes, GetBlockSignaturesRpcResult);
                if (!("error" in res)) {
                  _context72.next = 7;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get block");
              case 7:
                result = res.result;
                if (result) {
                  _context72.next = 10;
                  break;
                }
                throw new Error("Block " + slot + " not found");
              case 10:
                return _context72.abrupt("return", result);
              case 11:
              case "end":
                return _context72.stop();
            }
        }, _callee71, this);
      }));
      function getBlockSignatures(_x97, _x98) {
        return _getBlockSignatures.apply(this, arguments);
      }
      return getBlockSignatures;
    }()
    /**
     * Fetch a list of Signatures from the cluster for a confirmed block, excluding rewards
     *
     * @deprecated Deprecated since Solana v1.8.0. Please use {@link getBlockSignatures} instead.
     */
  }, {
    key: "getConfirmedBlockSignatures",
    value: function() {
      var _getConfirmedBlockSignatures = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee72(slot, commitment) {
        var args, unsafeRes, res, result;
        return import_regenerator.default.wrap(function _callee72$(_context73) {
          while (1)
            switch (_context73.prev = _context73.next) {
              case 0:
                args = this._buildArgsAtLeastConfirmed([slot], commitment, void 0, {
                  transactionDetails: "signatures",
                  rewards: false
                });
                _context73.next = 3;
                return this._rpcRequest("getConfirmedBlock", args);
              case 3:
                unsafeRes = _context73.sent;
                res = create(unsafeRes, GetBlockSignaturesRpcResult);
                if (!("error" in res)) {
                  _context73.next = 7;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get confirmed block");
              case 7:
                result = res.result;
                if (result) {
                  _context73.next = 10;
                  break;
                }
                throw new Error("Confirmed block " + slot + " not found");
              case 10:
                return _context73.abrupt("return", result);
              case 11:
              case "end":
                return _context73.stop();
            }
        }, _callee72, this);
      }));
      function getConfirmedBlockSignatures(_x99, _x100) {
        return _getConfirmedBlockSignatures.apply(this, arguments);
      }
      return getConfirmedBlockSignatures;
    }()
    /**
     * Fetch a transaction details for a confirmed transaction
     *
     * @deprecated Deprecated since Solana v1.8.0. Please use {@link getTransaction} instead.
     */
  }, {
    key: "getConfirmedTransaction",
    value: function() {
      var _getConfirmedTransaction = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee73(signature, commitment) {
        var args, unsafeRes, res, result, message, signatures;
        return import_regenerator.default.wrap(function _callee73$(_context74) {
          while (1)
            switch (_context74.prev = _context74.next) {
              case 0:
                args = this._buildArgsAtLeastConfirmed([signature], commitment);
                _context74.next = 3;
                return this._rpcRequest("getConfirmedTransaction", args);
              case 3:
                unsafeRes = _context74.sent;
                res = create(unsafeRes, GetTransactionRpcResult);
                if (!("error" in res)) {
                  _context74.next = 7;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get transaction");
              case 7:
                result = res.result;
                if (result) {
                  _context74.next = 10;
                  break;
                }
                return _context74.abrupt("return", result);
              case 10:
                message = new Message(result.transaction.message);
                signatures = result.transaction.signatures;
                return _context74.abrupt("return", _objectSpread(_objectSpread({}, result), {}, {
                  transaction: Transaction.populate(message, signatures)
                }));
              case 13:
              case "end":
                return _context74.stop();
            }
        }, _callee73, this);
      }));
      function getConfirmedTransaction(_x101, _x102) {
        return _getConfirmedTransaction.apply(this, arguments);
      }
      return getConfirmedTransaction;
    }()
    /**
     * Fetch parsed transaction details for a confirmed transaction
     *
     * @deprecated Deprecated since Solana v1.8.0. Please use {@link getParsedTransaction} instead.
     */
  }, {
    key: "getParsedConfirmedTransaction",
    value: function() {
      var _getParsedConfirmedTransaction = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee74(signature, commitment) {
        var args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee74$(_context75) {
          while (1)
            switch (_context75.prev = _context75.next) {
              case 0:
                args = this._buildArgsAtLeastConfirmed([signature], commitment, "jsonParsed");
                _context75.next = 3;
                return this._rpcRequest("getConfirmedTransaction", args);
              case 3:
                unsafeRes = _context75.sent;
                res = create(unsafeRes, GetParsedTransactionRpcResult);
                if (!("error" in res)) {
                  _context75.next = 7;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get confirmed transaction");
              case 7:
                return _context75.abrupt("return", res.result);
              case 8:
              case "end":
                return _context75.stop();
            }
        }, _callee74, this);
      }));
      function getParsedConfirmedTransaction(_x103, _x104) {
        return _getParsedConfirmedTransaction.apply(this, arguments);
      }
      return getParsedConfirmedTransaction;
    }()
    /**
     * Fetch parsed transaction details for a batch of confirmed transactions
     *
     * @deprecated Deprecated since Solana v1.8.0. Please use {@link getParsedTransactions} instead.
     */
  }, {
    key: "getParsedConfirmedTransactions",
    value: function() {
      var _getParsedConfirmedTransactions = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee75(signatures, commitment) {
        var _this8 = this;
        var batch, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee75$(_context76) {
          while (1)
            switch (_context76.prev = _context76.next) {
              case 0:
                batch = signatures.map(function(signature) {
                  var args = _this8._buildArgsAtLeastConfirmed([signature], commitment, "jsonParsed");
                  return {
                    methodName: "getConfirmedTransaction",
                    args
                  };
                });
                _context76.next = 3;
                return this._rpcBatchRequest(batch);
              case 3:
                unsafeRes = _context76.sent;
                res = unsafeRes.map(function(unsafeRes2) {
                  var res2 = create(unsafeRes2, GetParsedTransactionRpcResult);
                  if ("error" in res2) {
                    throw new SolanaJSONRPCError(res2.error, "failed to get confirmed transactions");
                  }
                  return res2.result;
                });
                return _context76.abrupt("return", res);
              case 6:
              case "end":
                return _context76.stop();
            }
        }, _callee75, this);
      }));
      function getParsedConfirmedTransactions(_x105, _x106) {
        return _getParsedConfirmedTransactions.apply(this, arguments);
      }
      return getParsedConfirmedTransactions;
    }()
    /**
     * Fetch a list of all the confirmed signatures for transactions involving an address
     * within a specified slot range. Max range allowed is 10,000 slots.
     *
     * @deprecated Deprecated since v1.3. Please use {@link getConfirmedSignaturesForAddress2} instead.
     *
     * @param address queried address
     * @param startSlot start slot, inclusive
     * @param endSlot end slot, inclusive
     */
  }, {
    key: "getConfirmedSignaturesForAddress",
    value: function() {
      var _getConfirmedSignaturesForAddress = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee76(address, startSlot, endSlot) {
        var options, firstAvailableBlock, block, highestConfirmedRoot, _block, confirmedSignatureInfo;
        return import_regenerator.default.wrap(function _callee76$(_context77) {
          while (1)
            switch (_context77.prev = _context77.next) {
              case 0:
                options = {};
                _context77.next = 3;
                return this.getFirstAvailableBlock();
              case 3:
                firstAvailableBlock = _context77.sent;
              case 4:
                if ("until" in options) {
                  _context77.next = 24;
                  break;
                }
                startSlot--;
                if (!(startSlot <= 0 || startSlot < firstAvailableBlock)) {
                  _context77.next = 8;
                  break;
                }
                return _context77.abrupt("break", 24);
              case 8:
                _context77.prev = 8;
                _context77.next = 11;
                return this.getConfirmedBlockSignatures(startSlot, "finalized");
              case 11:
                block = _context77.sent;
                if (block.signatures.length > 0) {
                  options.until = block.signatures[block.signatures.length - 1].toString();
                }
                _context77.next = 22;
                break;
              case 15:
                _context77.prev = 15;
                _context77.t0 = _context77["catch"](8);
                if (!(_context77.t0 instanceof Error && _context77.t0.message.includes("skipped"))) {
                  _context77.next = 21;
                  break;
                }
                return _context77.abrupt("continue", 4);
              case 21:
                throw _context77.t0;
              case 22:
                _context77.next = 4;
                break;
              case 24:
                _context77.next = 26;
                return this.getSlot("finalized");
              case 26:
                highestConfirmedRoot = _context77.sent;
              case 27:
                if ("before" in options) {
                  _context77.next = 47;
                  break;
                }
                endSlot++;
                if (!(endSlot > highestConfirmedRoot)) {
                  _context77.next = 31;
                  break;
                }
                return _context77.abrupt("break", 47);
              case 31:
                _context77.prev = 31;
                _context77.next = 34;
                return this.getConfirmedBlockSignatures(endSlot);
              case 34:
                _block = _context77.sent;
                if (_block.signatures.length > 0) {
                  options.before = _block.signatures[_block.signatures.length - 1].toString();
                }
                _context77.next = 45;
                break;
              case 38:
                _context77.prev = 38;
                _context77.t1 = _context77["catch"](31);
                if (!(_context77.t1 instanceof Error && _context77.t1.message.includes("skipped"))) {
                  _context77.next = 44;
                  break;
                }
                return _context77.abrupt("continue", 27);
              case 44:
                throw _context77.t1;
              case 45:
                _context77.next = 27;
                break;
              case 47:
                _context77.next = 49;
                return this.getConfirmedSignaturesForAddress2(address, options);
              case 49:
                confirmedSignatureInfo = _context77.sent;
                return _context77.abrupt("return", confirmedSignatureInfo.map(function(info) {
                  return info.signature;
                }));
              case 51:
              case "end":
                return _context77.stop();
            }
        }, _callee76, this, [[8, 15], [31, 38]]);
      }));
      function getConfirmedSignaturesForAddress(_x107, _x108, _x109) {
        return _getConfirmedSignaturesForAddress.apply(this, arguments);
      }
      return getConfirmedSignaturesForAddress;
    }()
    /**
     * Returns confirmed signatures for transactions involving an
     * address backwards in time from the provided signature or most recent confirmed block
     *
     *
     * @param address queried address
     * @param options
     */
  }, {
    key: "getConfirmedSignaturesForAddress2",
    value: function() {
      var _getConfirmedSignaturesForAddress2 = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee77(address, options, commitment) {
        var args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee77$(_context78) {
          while (1)
            switch (_context78.prev = _context78.next) {
              case 0:
                args = this._buildArgsAtLeastConfirmed([address.toBase58()], commitment, void 0, options);
                _context78.next = 3;
                return this._rpcRequest("getConfirmedSignaturesForAddress2", args);
              case 3:
                unsafeRes = _context78.sent;
                res = create(unsafeRes, GetConfirmedSignaturesForAddress2RpcResult);
                if (!("error" in res)) {
                  _context78.next = 7;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get confirmed signatures for address");
              case 7:
                return _context78.abrupt("return", res.result);
              case 8:
              case "end":
                return _context78.stop();
            }
        }, _callee77, this);
      }));
      function getConfirmedSignaturesForAddress2(_x110, _x111, _x112) {
        return _getConfirmedSignaturesForAddress2.apply(this, arguments);
      }
      return getConfirmedSignaturesForAddress2;
    }()
    /**
     * Returns confirmed signatures for transactions involving an
     * address backwards in time from the provided signature or most recent confirmed block
     *
     *
     * @param address queried address
     * @param options
     */
  }, {
    key: "getSignaturesForAddress",
    value: function() {
      var _getSignaturesForAddress = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee78(address, options, commitment) {
        var args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee78$(_context79) {
          while (1)
            switch (_context79.prev = _context79.next) {
              case 0:
                args = this._buildArgsAtLeastConfirmed([address.toBase58()], commitment, void 0, options);
                _context79.next = 3;
                return this._rpcRequest("getSignaturesForAddress", args);
              case 3:
                unsafeRes = _context79.sent;
                res = create(unsafeRes, GetSignaturesForAddressRpcResult);
                if (!("error" in res)) {
                  _context79.next = 7;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get signatures for address");
              case 7:
                return _context79.abrupt("return", res.result);
              case 8:
              case "end":
                return _context79.stop();
            }
        }, _callee78, this);
      }));
      function getSignaturesForAddress(_x113, _x114, _x115) {
        return _getSignaturesForAddress.apply(this, arguments);
      }
      return getSignaturesForAddress;
    }()
  }, {
    key: "getAddressLookupTable",
    value: function() {
      var _getAddressLookupTable = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee79(accountKey, config) {
        var _yield$this$getAccoun, context, accountInfo, value;
        return import_regenerator.default.wrap(function _callee79$(_context80) {
          while (1)
            switch (_context80.prev = _context80.next) {
              case 0:
                _context80.next = 2;
                return this.getAccountInfoAndContext(accountKey, config);
              case 2:
                _yield$this$getAccoun = _context80.sent;
                context = _yield$this$getAccoun.context;
                accountInfo = _yield$this$getAccoun.value;
                value = null;
                if (accountInfo !== null) {
                  value = new AddressLookupTableAccount({
                    key: accountKey,
                    state: AddressLookupTableAccount.deserialize(accountInfo.data)
                  });
                }
                return _context80.abrupt("return", {
                  context,
                  value
                });
              case 8:
              case "end":
                return _context80.stop();
            }
        }, _callee79, this);
      }));
      function getAddressLookupTable(_x116, _x117) {
        return _getAddressLookupTable.apply(this, arguments);
      }
      return getAddressLookupTable;
    }()
    /**
     * Fetch the contents of a Nonce account from the cluster, return with context
     */
  }, {
    key: "getNonceAndContext",
    value: function() {
      var _getNonceAndContext = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee80(nonceAccount, commitmentOrConfig) {
        var _yield$this$getAccoun2, context, accountInfo, value;
        return import_regenerator.default.wrap(function _callee80$(_context81) {
          while (1)
            switch (_context81.prev = _context81.next) {
              case 0:
                _context81.next = 2;
                return this.getAccountInfoAndContext(nonceAccount, commitmentOrConfig);
              case 2:
                _yield$this$getAccoun2 = _context81.sent;
                context = _yield$this$getAccoun2.context;
                accountInfo = _yield$this$getAccoun2.value;
                value = null;
                if (accountInfo !== null) {
                  value = NonceAccount.fromAccountData(accountInfo.data);
                }
                return _context81.abrupt("return", {
                  context,
                  value
                });
              case 8:
              case "end":
                return _context81.stop();
            }
        }, _callee80, this);
      }));
      function getNonceAndContext(_x118, _x119) {
        return _getNonceAndContext.apply(this, arguments);
      }
      return getNonceAndContext;
    }()
    /**
     * Fetch the contents of a Nonce account from the cluster
     */
  }, {
    key: "getNonce",
    value: function() {
      var _getNonce = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee81(nonceAccount, commitmentOrConfig) {
        return import_regenerator.default.wrap(function _callee81$(_context82) {
          while (1)
            switch (_context82.prev = _context82.next) {
              case 0:
                _context82.next = 2;
                return this.getNonceAndContext(nonceAccount, commitmentOrConfig).then(function(x) {
                  return x.value;
                })["catch"](function(e) {
                  throw new Error("failed to get nonce for account " + nonceAccount.toBase58() + ": " + e);
                });
              case 2:
                return _context82.abrupt("return", _context82.sent);
              case 3:
              case "end":
                return _context82.stop();
            }
        }, _callee81, this);
      }));
      function getNonce(_x120, _x121) {
        return _getNonce.apply(this, arguments);
      }
      return getNonce;
    }()
    /**
     * Request an allocation of lamports to the specified address
     *
     * ```typescript
     * import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
     *
     * (async () => {
     *   const connection = new Connection("https://api.testnet.solana.com", "confirmed");
     *   const myAddress = new PublicKey("2nr1bHFT86W9tGnyvmYW4vcHKsQB3sVQfnddasz4kExM");
     *   const signature = await connection.requestAirdrop(myAddress, LAMPORTS_PER_SOL);
     *   await connection.confirmTransaction(signature);
     * })();
     * ```
     */
  }, {
    key: "requestAirdrop",
    value: function() {
      var _requestAirdrop = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee82(to, lamports) {
        var unsafeRes, res;
        return import_regenerator.default.wrap(function _callee82$(_context83) {
          while (1)
            switch (_context83.prev = _context83.next) {
              case 0:
                _context83.next = 2;
                return this._rpcRequest("requestAirdrop", [to.toBase58(), lamports]);
              case 2:
                unsafeRes = _context83.sent;
                res = create(unsafeRes, RequestAirdropRpcResult);
                if (!("error" in res)) {
                  _context83.next = 6;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "airdrop to ".concat(to.toBase58(), " failed"));
              case 6:
                return _context83.abrupt("return", res.result);
              case 7:
              case "end":
                return _context83.stop();
            }
        }, _callee82, this);
      }));
      function requestAirdrop(_x122, _x123) {
        return _requestAirdrop.apply(this, arguments);
      }
      return requestAirdrop;
    }()
    /**
     * @internal
     */
  }, {
    key: "_blockhashWithExpiryBlockHeight",
    value: function() {
      var _blockhashWithExpiryBlockHeight2 = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee83(disableCache) {
        var timeSinceFetch, expired;
        return import_regenerator.default.wrap(function _callee83$(_context84) {
          while (1)
            switch (_context84.prev = _context84.next) {
              case 0:
                if (disableCache) {
                  _context84.next = 10;
                  break;
                }
              case 1:
                if (!this._pollingBlockhash) {
                  _context84.next = 6;
                  break;
                }
                _context84.next = 4;
                return sleep(100);
              case 4:
                _context84.next = 1;
                break;
              case 6:
                timeSinceFetch = Date.now() - this._blockhashInfo.lastFetch;
                expired = timeSinceFetch >= BLOCKHASH_CACHE_TIMEOUT_MS;
                if (!(this._blockhashInfo.latestBlockhash !== null && !expired)) {
                  _context84.next = 10;
                  break;
                }
                return _context84.abrupt("return", this._blockhashInfo.latestBlockhash);
              case 10:
                _context84.next = 12;
                return this._pollNewBlockhash();
              case 12:
                return _context84.abrupt("return", _context84.sent);
              case 13:
              case "end":
                return _context84.stop();
            }
        }, _callee83, this);
      }));
      function _blockhashWithExpiryBlockHeight(_x124) {
        return _blockhashWithExpiryBlockHeight2.apply(this, arguments);
      }
      return _blockhashWithExpiryBlockHeight;
    }()
    /**
     * @internal
     */
  }, {
    key: "_pollNewBlockhash",
    value: function() {
      var _pollNewBlockhash2 = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee84() {
        var startTime, cachedLatestBlockhash, cachedBlockhash, i, latestBlockhash;
        return import_regenerator.default.wrap(function _callee84$(_context85) {
          while (1)
            switch (_context85.prev = _context85.next) {
              case 0:
                this._pollingBlockhash = true;
                _context85.prev = 1;
                startTime = Date.now();
                cachedLatestBlockhash = this._blockhashInfo.latestBlockhash;
                cachedBlockhash = cachedLatestBlockhash ? cachedLatestBlockhash.blockhash : null;
                i = 0;
              case 6:
                if (!(i < 50)) {
                  _context85.next = 18;
                  break;
                }
                _context85.next = 9;
                return this.getLatestBlockhash("finalized");
              case 9:
                latestBlockhash = _context85.sent;
                if (!(cachedBlockhash !== latestBlockhash.blockhash)) {
                  _context85.next = 13;
                  break;
                }
                this._blockhashInfo = {
                  latestBlockhash,
                  lastFetch: Date.now(),
                  transactionSignatures: [],
                  simulatedSignatures: []
                };
                return _context85.abrupt("return", latestBlockhash);
              case 13:
                _context85.next = 15;
                return sleep(MS_PER_SLOT / 2);
              case 15:
                i++;
                _context85.next = 6;
                break;
              case 18:
                throw new Error("Unable to obtain a new blockhash after ".concat(Date.now() - startTime, "ms"));
              case 19:
                _context85.prev = 19;
                this._pollingBlockhash = false;
                return _context85.finish(19);
              case 22:
              case "end":
                return _context85.stop();
            }
        }, _callee84, this, [[1, , 19, 22]]);
      }));
      function _pollNewBlockhash() {
        return _pollNewBlockhash2.apply(this, arguments);
      }
      return _pollNewBlockhash;
    }()
    /**
     * get the stake minimum delegation
     */
  }, {
    key: "getStakeMinimumDelegation",
    value: function() {
      var _getStakeMinimumDelegation = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee85(config) {
        var _extractCommitmentFro24, commitment, configArg, args, unsafeRes, res;
        return import_regenerator.default.wrap(function _callee85$(_context86) {
          while (1)
            switch (_context86.prev = _context86.next) {
              case 0:
                _extractCommitmentFro24 = extractCommitmentFromConfig(config), commitment = _extractCommitmentFro24.commitment, configArg = _extractCommitmentFro24.config;
                args = this._buildArgs([], commitment, "base64", configArg);
                _context86.next = 4;
                return this._rpcRequest("getStakeMinimumDelegation", args);
              case 4:
                unsafeRes = _context86.sent;
                res = create(unsafeRes, jsonRpcResultAndContext(number2()));
                if (!("error" in res)) {
                  _context86.next = 8;
                  break;
                }
                throw new SolanaJSONRPCError(res.error, "failed to get stake minimum delegation");
              case 8:
                return _context86.abrupt("return", res.result);
              case 9:
              case "end":
                return _context86.stop();
            }
        }, _callee85, this);
      }));
      function getStakeMinimumDelegation(_x125) {
        return _getStakeMinimumDelegation.apply(this, arguments);
      }
      return getStakeMinimumDelegation;
    }()
    /**
     * Simulate a transaction
     *
     * @deprecated Instead, call {@link simulateTransaction} with {@link
     * VersionedTransaction} and {@link SimulateTransactionConfig} parameters
     */
  }, {
    key: "simulateTransaction",
    value: (
      /**
       * Simulate a transaction
       */
      // eslint-disable-next-line no-dupe-class-members
      function() {
        var _simulateTransaction = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee86(transactionOrMessage, configOrSigners, includeAccounts) {
          var versionedTx, _wireTransaction, _encodedTransaction, _config2, _args87, _unsafeRes, _res5, transaction, originalTx, signers, _transaction, disableCache, _transaction2, latestBlockhash, _signature, message, signData, wireTransaction, encodedTransaction, config, addresses, args, unsafeRes, res, _logs, traceIndent, logTrace;
          return import_regenerator.default.wrap(function _callee86$(_context87) {
            while (1)
              switch (_context87.prev = _context87.next) {
                case 0:
                  if (!("message" in transactionOrMessage)) {
                    _context87.next = 17;
                    break;
                  }
                  versionedTx = transactionOrMessage;
                  _wireTransaction = versionedTx.serialize();
                  _encodedTransaction = import_buffer.Buffer.from(_wireTransaction).toString("base64");
                  if (!(Array.isArray(configOrSigners) || includeAccounts !== void 0)) {
                    _context87.next = 6;
                    break;
                  }
                  throw new Error("Invalid arguments");
                case 6:
                  _config2 = configOrSigners || {};
                  _config2.encoding = "base64";
                  if (!("commitment" in _config2)) {
                    _config2.commitment = this.commitment;
                  }
                  _args87 = [_encodedTransaction, _config2];
                  _context87.next = 12;
                  return this._rpcRequest("simulateTransaction", _args87);
                case 12:
                  _unsafeRes = _context87.sent;
                  _res5 = create(_unsafeRes, SimulatedTransactionResponseStruct);
                  if (!("error" in _res5)) {
                    _context87.next = 16;
                    break;
                  }
                  throw new Error("failed to simulate transaction: " + _res5.error.message);
                case 16:
                  return _context87.abrupt("return", _res5.result);
                case 17:
                  if (transactionOrMessage instanceof Transaction) {
                    originalTx = transactionOrMessage;
                    transaction = new Transaction();
                    transaction.feePayer = originalTx.feePayer;
                    transaction.instructions = transactionOrMessage.instructions;
                    transaction.nonceInfo = originalTx.nonceInfo;
                    transaction.signatures = originalTx.signatures;
                  } else {
                    transaction = Transaction.populate(transactionOrMessage);
                    transaction._message = transaction._json = void 0;
                  }
                  if (!(configOrSigners !== void 0 && !Array.isArray(configOrSigners))) {
                    _context87.next = 20;
                    break;
                  }
                  throw new Error("Invalid arguments");
                case 20:
                  signers = configOrSigners;
                  if (!(transaction.nonceInfo && signers)) {
                    _context87.next = 25;
                    break;
                  }
                  (_transaction = transaction).sign.apply(_transaction, _toConsumableArray(signers));
                  _context87.next = 45;
                  break;
                case 25:
                  disableCache = this._disableBlockhashCaching;
                case 26:
                  _context87.next = 28;
                  return this._blockhashWithExpiryBlockHeight(disableCache);
                case 28:
                  latestBlockhash = _context87.sent;
                  transaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
                  transaction.recentBlockhash = latestBlockhash.blockhash;
                  if (signers) {
                    _context87.next = 33;
                    break;
                  }
                  return _context87.abrupt("break", 45);
                case 33:
                  (_transaction2 = transaction).sign.apply(_transaction2, _toConsumableArray(signers));
                  if (transaction.signature) {
                    _context87.next = 36;
                    break;
                  }
                  throw new Error("!signature");
                case 36:
                  _signature = transaction.signature.toString("base64");
                  if (!(!this._blockhashInfo.simulatedSignatures.includes(_signature) && !this._blockhashInfo.transactionSignatures.includes(_signature))) {
                    _context87.next = 42;
                    break;
                  }
                  this._blockhashInfo.simulatedSignatures.push(_signature);
                  return _context87.abrupt("break", 45);
                case 42:
                  disableCache = true;
                case 43:
                  _context87.next = 26;
                  break;
                case 45:
                  message = transaction._compile();
                  signData = message.serialize();
                  wireTransaction = transaction._serialize(signData);
                  encodedTransaction = wireTransaction.toString("base64");
                  config = {
                    encoding: "base64",
                    commitment: this.commitment
                  };
                  if (includeAccounts) {
                    addresses = (Array.isArray(includeAccounts) ? includeAccounts : message.nonProgramIds()).map(function(key) {
                      return key.toBase58();
                    });
                    config["accounts"] = {
                      encoding: "base64",
                      addresses
                    };
                  }
                  if (signers) {
                    config.sigVerify = true;
                  }
                  args = [encodedTransaction, config];
                  _context87.next = 55;
                  return this._rpcRequest("simulateTransaction", args);
                case 55:
                  unsafeRes = _context87.sent;
                  res = create(unsafeRes, SimulatedTransactionResponseStruct);
                  if (!("error" in res)) {
                    _context87.next = 60;
                    break;
                  }
                  if ("data" in res.error) {
                    _logs = res.error.data.logs;
                    if (_logs && Array.isArray(_logs)) {
                      traceIndent = "\n    ";
                      logTrace = traceIndent + _logs.join(traceIndent);
                      console.error(res.error.message, logTrace);
                    }
                  }
                  throw new SendTransactionError("failed to simulate transaction: " + res.error.message, _logs);
                case 60:
                  return _context87.abrupt("return", res.result);
                case 61:
                case "end":
                  return _context87.stop();
              }
          }, _callee86, this);
        }));
        function simulateTransaction(_x126, _x127, _x128) {
          return _simulateTransaction.apply(this, arguments);
        }
        return simulateTransaction;
      }()
    )
    /**
     * Sign and send a transaction
     *
     * @deprecated Instead, call {@link sendTransaction} with a {@link
     * VersionedTransaction}
     */
  }, {
    key: "sendTransaction",
    value: (
      /**
       * Sign and send a transaction
       */
      // eslint-disable-next-line no-dupe-class-members
      function() {
        var _sendTransaction = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee87(transaction, signersOrOptions, options) {
          var _wireTransaction2, signers, disableCache, latestBlockhash, _signature2, wireTransaction;
          return import_regenerator.default.wrap(function _callee87$(_context88) {
            while (1)
              switch (_context88.prev = _context88.next) {
                case 0:
                  if (!("version" in transaction)) {
                    _context88.next = 7;
                    break;
                  }
                  if (!(signersOrOptions && Array.isArray(signersOrOptions))) {
                    _context88.next = 3;
                    break;
                  }
                  throw new Error("Invalid arguments");
                case 3:
                  _wireTransaction2 = transaction.serialize();
                  _context88.next = 6;
                  return this.sendRawTransaction(_wireTransaction2, signersOrOptions);
                case 6:
                  return _context88.abrupt("return", _context88.sent);
                case 7:
                  if (!(signersOrOptions === void 0 || !Array.isArray(signersOrOptions))) {
                    _context88.next = 9;
                    break;
                  }
                  throw new Error("Invalid arguments");
                case 9:
                  signers = signersOrOptions;
                  if (!transaction.nonceInfo) {
                    _context88.next = 14;
                    break;
                  }
                  transaction.sign.apply(transaction, _toConsumableArray(signers));
                  _context88.next = 32;
                  break;
                case 14:
                  disableCache = this._disableBlockhashCaching;
                case 15:
                  _context88.next = 17;
                  return this._blockhashWithExpiryBlockHeight(disableCache);
                case 17:
                  latestBlockhash = _context88.sent;
                  transaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
                  transaction.recentBlockhash = latestBlockhash.blockhash;
                  transaction.sign.apply(transaction, _toConsumableArray(signers));
                  if (transaction.signature) {
                    _context88.next = 23;
                    break;
                  }
                  throw new Error("!signature");
                case 23:
                  _signature2 = transaction.signature.toString("base64");
                  if (this._blockhashInfo.transactionSignatures.includes(_signature2)) {
                    _context88.next = 29;
                    break;
                  }
                  this._blockhashInfo.transactionSignatures.push(_signature2);
                  return _context88.abrupt("break", 32);
                case 29:
                  disableCache = true;
                case 30:
                  _context88.next = 15;
                  break;
                case 32:
                  wireTransaction = transaction.serialize();
                  _context88.next = 35;
                  return this.sendRawTransaction(wireTransaction, options);
                case 35:
                  return _context88.abrupt("return", _context88.sent);
                case 36:
                case "end":
                  return _context88.stop();
              }
          }, _callee87, this);
        }));
        function sendTransaction(_x129, _x130, _x131) {
          return _sendTransaction.apply(this, arguments);
        }
        return sendTransaction;
      }()
    )
    /**
     * Send a transaction that has already been signed and serialized into the
     * wire format
     */
  }, {
    key: "sendRawTransaction",
    value: function() {
      var _sendRawTransaction = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee88(rawTransaction, options) {
        var encodedTransaction, result;
        return import_regenerator.default.wrap(function _callee88$(_context89) {
          while (1)
            switch (_context89.prev = _context89.next) {
              case 0:
                encodedTransaction = toBuffer(rawTransaction).toString("base64");
                _context89.next = 3;
                return this.sendEncodedTransaction(encodedTransaction, options);
              case 3:
                result = _context89.sent;
                return _context89.abrupt("return", result);
              case 5:
              case "end":
                return _context89.stop();
            }
        }, _callee88, this);
      }));
      function sendRawTransaction(_x132, _x133) {
        return _sendRawTransaction.apply(this, arguments);
      }
      return sendRawTransaction;
    }()
    /**
     * Send a transaction that has already been signed, serialized into the
     * wire format, and encoded as a base64 string
     */
  }, {
    key: "sendEncodedTransaction",
    value: function() {
      var _sendEncodedTransaction = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee89(encodedTransaction, options) {
        var config, skipPreflight, preflightCommitment, args, unsafeRes, res, _logs2;
        return import_regenerator.default.wrap(function _callee89$(_context90) {
          while (1)
            switch (_context90.prev = _context90.next) {
              case 0:
                config = {
                  encoding: "base64"
                };
                skipPreflight = options && options.skipPreflight;
                preflightCommitment = options && options.preflightCommitment || this.commitment;
                if (options && options.maxRetries != null) {
                  config.maxRetries = options.maxRetries;
                }
                if (options && options.minContextSlot != null) {
                  config.minContextSlot = options.minContextSlot;
                }
                if (skipPreflight) {
                  config.skipPreflight = skipPreflight;
                }
                if (preflightCommitment) {
                  config.preflightCommitment = preflightCommitment;
                }
                args = [encodedTransaction, config];
                _context90.next = 10;
                return this._rpcRequest("sendTransaction", args);
              case 10:
                unsafeRes = _context90.sent;
                res = create(unsafeRes, SendTransactionRpcResult);
                if (!("error" in res)) {
                  _context90.next = 15;
                  break;
                }
                if ("data" in res.error) {
                  _logs2 = res.error.data.logs;
                }
                throw new SendTransactionError("failed to send transaction: " + res.error.message, _logs2);
              case 15:
                return _context90.abrupt("return", res.result);
              case 16:
              case "end":
                return _context90.stop();
            }
        }, _callee89, this);
      }));
      function sendEncodedTransaction(_x134, _x135) {
        return _sendEncodedTransaction.apply(this, arguments);
      }
      return sendEncodedTransaction;
    }()
    /**
     * @internal
     */
  }, {
    key: "_wsOnOpen",
    value: function _wsOnOpen() {
      var _this9 = this;
      this._rpcWebSocketConnected = true;
      this._rpcWebSocketHeartbeat = setInterval(function() {
        _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee90() {
          return import_regenerator.default.wrap(function _callee90$(_context91) {
            while (1)
              switch (_context91.prev = _context91.next) {
                case 0:
                  _context91.prev = 0;
                  _context91.next = 3;
                  return _this9._rpcWebSocket.notify("ping");
                case 3:
                  _context91.next = 7;
                  break;
                case 5:
                  _context91.prev = 5;
                  _context91.t0 = _context91["catch"](0);
                case 7:
                case "end":
                  return _context91.stop();
              }
          }, _callee90, null, [[0, 5]]);
        }))();
      }, 5e3);
      this._updateSubscriptions();
    }
    /**
     * @internal
     */
  }, {
    key: "_wsOnError",
    value: function _wsOnError(err) {
      this._rpcWebSocketConnected = false;
      console.error("ws error:", err.message);
    }
    /**
     * @internal
     */
  }, {
    key: "_wsOnClose",
    value: function _wsOnClose(code) {
      var _this10 = this;
      this._rpcWebSocketConnected = false;
      this._rpcWebSocketGeneration = (this._rpcWebSocketGeneration + 1) % Number.MAX_SAFE_INTEGER;
      if (this._rpcWebSocketIdleTimeout) {
        clearTimeout(this._rpcWebSocketIdleTimeout);
        this._rpcWebSocketIdleTimeout = null;
      }
      if (this._rpcWebSocketHeartbeat) {
        clearInterval(this._rpcWebSocketHeartbeat);
        this._rpcWebSocketHeartbeat = null;
      }
      if (code === 1e3) {
        this._updateSubscriptions();
        return;
      }
      this._subscriptionCallbacksByServerSubscriptionId = {};
      Object.entries(this._subscriptionsByHash).forEach(function(_ref19) {
        var _ref20 = _slicedToArray(_ref19, 2), hash2 = _ref20[0], subscription = _ref20[1];
        _this10._setSubscription(hash2, _objectSpread(_objectSpread({}, subscription), {}, {
          state: "pending"
        }));
      });
    }
    /**
     * @internal
     */
  }, {
    key: "_setSubscription",
    value: function _setSubscription(hash2, nextSubscription) {
      var _this$_subscriptionsB;
      var prevState = (_this$_subscriptionsB = this._subscriptionsByHash[hash2]) === null || _this$_subscriptionsB === void 0 ? void 0 : _this$_subscriptionsB.state;
      this._subscriptionsByHash[hash2] = nextSubscription;
      if (prevState !== nextSubscription.state) {
        var stateChangeCallbacks = this._subscriptionStateChangeCallbacksByHash[hash2];
        if (stateChangeCallbacks) {
          stateChangeCallbacks.forEach(function(cb) {
            try {
              cb(nextSubscription.state);
            } catch (_unused2) {
            }
          });
        }
      }
    }
    /**
     * @internal
     */
  }, {
    key: "_onSubscriptionStateChange",
    value: function _onSubscriptionStateChange(clientSubscriptionId, callback) {
      var _this$_subscriptionSt, _this11 = this;
      var hash2 = this._subscriptionHashByClientSubscriptionId[clientSubscriptionId];
      if (hash2 == null) {
        return function() {
        };
      }
      var stateChangeCallbacks = (_this$_subscriptionSt = this._subscriptionStateChangeCallbacksByHash)[hash2] || (_this$_subscriptionSt[hash2] = /* @__PURE__ */ new Set());
      stateChangeCallbacks.add(callback);
      return function() {
        stateChangeCallbacks["delete"](callback);
        if (stateChangeCallbacks.size === 0) {
          delete _this11._subscriptionStateChangeCallbacksByHash[hash2];
        }
      };
    }
    /**
     * @internal
     */
  }, {
    key: "_updateSubscriptions",
    value: function() {
      var _updateSubscriptions2 = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee94() {
        var _this12 = this;
        var activeWebSocketGeneration, isCurrentConnectionStillActive;
        return import_regenerator.default.wrap(function _callee94$(_context95) {
          while (1)
            switch (_context95.prev = _context95.next) {
              case 0:
                if (!(Object.keys(this._subscriptionsByHash).length === 0)) {
                  _context95.next = 3;
                  break;
                }
                if (this._rpcWebSocketConnected) {
                  this._rpcWebSocketConnected = false;
                  this._rpcWebSocketIdleTimeout = setTimeout(function() {
                    _this12._rpcWebSocketIdleTimeout = null;
                    try {
                      _this12._rpcWebSocket.close();
                    } catch (err) {
                      if (err instanceof Error) {
                        console.log("Error when closing socket connection: ".concat(err.message));
                      }
                    }
                  }, 500);
                }
                return _context95.abrupt("return");
              case 3:
                if (this._rpcWebSocketIdleTimeout !== null) {
                  clearTimeout(this._rpcWebSocketIdleTimeout);
                  this._rpcWebSocketIdleTimeout = null;
                  this._rpcWebSocketConnected = true;
                }
                if (this._rpcWebSocketConnected) {
                  _context95.next = 7;
                  break;
                }
                this._rpcWebSocket.connect();
                return _context95.abrupt("return");
              case 7:
                activeWebSocketGeneration = this._rpcWebSocketGeneration;
                isCurrentConnectionStillActive = function isCurrentConnectionStillActive2() {
                  return activeWebSocketGeneration === _this12._rpcWebSocketGeneration;
                };
                _context95.next = 11;
                return Promise.all(
                  // Don't be tempted to change this to `Object.entries`. We call
                  // `_updateSubscriptions` recursively when processing the state,
                  // so it's important that we look up the *current* version of
                  // each subscription, every time we process a hash.
                  Object.keys(this._subscriptionsByHash).map(/* @__PURE__ */ function() {
                    var _ref21 = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee93(hash2) {
                      var subscription;
                      return import_regenerator.default.wrap(function _callee93$(_context94) {
                        while (1)
                          switch (_context94.prev = _context94.next) {
                            case 0:
                              subscription = _this12._subscriptionsByHash[hash2];
                              if (!(subscription === void 0)) {
                                _context94.next = 3;
                                break;
                              }
                              return _context94.abrupt("return");
                            case 3:
                              _context94.t0 = subscription.state;
                              _context94.next = _context94.t0 === "pending" ? 6 : _context94.t0 === "unsubscribed" ? 6 : _context94.t0 === "subscribed" ? 15 : _context94.t0 === "subscribing" ? 19 : _context94.t0 === "unsubscribing" ? 19 : 20;
                              break;
                            case 6:
                              if (!(subscription.callbacks.size === 0)) {
                                _context94.next = 12;
                                break;
                              }
                              delete _this12._subscriptionsByHash[hash2];
                              if (subscription.state === "unsubscribed") {
                                delete _this12._subscriptionCallbacksByServerSubscriptionId[subscription.serverSubscriptionId];
                              }
                              _context94.next = 11;
                              return _this12._updateSubscriptions();
                            case 11:
                              return _context94.abrupt("return");
                            case 12:
                              _context94.next = 14;
                              return _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee91() {
                                var args, method, _serverSubscriptionId;
                                return import_regenerator.default.wrap(function _callee91$(_context92) {
                                  while (1)
                                    switch (_context92.prev = _context92.next) {
                                      case 0:
                                        args = subscription.args, method = subscription.method;
                                        _context92.prev = 1;
                                        _this12._setSubscription(hash2, _objectSpread(_objectSpread({}, subscription), {}, {
                                          state: "subscribing"
                                        }));
                                        _context92.next = 5;
                                        return _this12._rpcWebSocket.call(method, args);
                                      case 5:
                                        _serverSubscriptionId = _context92.sent;
                                        _this12._setSubscription(hash2, _objectSpread(_objectSpread({}, subscription), {}, {
                                          serverSubscriptionId: _serverSubscriptionId,
                                          state: "subscribed"
                                        }));
                                        _this12._subscriptionCallbacksByServerSubscriptionId[_serverSubscriptionId] = subscription.callbacks;
                                        _context92.next = 10;
                                        return _this12._updateSubscriptions();
                                      case 10:
                                        _context92.next = 20;
                                        break;
                                      case 12:
                                        _context92.prev = 12;
                                        _context92.t0 = _context92["catch"](1);
                                        if (_context92.t0 instanceof Error) {
                                          console.error("".concat(method, " error for argument"), args, _context92.t0.message);
                                        }
                                        if (isCurrentConnectionStillActive()) {
                                          _context92.next = 17;
                                          break;
                                        }
                                        return _context92.abrupt("return");
                                      case 17:
                                        _this12._setSubscription(hash2, _objectSpread(_objectSpread({}, subscription), {}, {
                                          state: "pending"
                                        }));
                                        _context92.next = 20;
                                        return _this12._updateSubscriptions();
                                      case 20:
                                      case "end":
                                        return _context92.stop();
                                    }
                                }, _callee91, null, [[1, 12]]);
                              }))();
                            case 14:
                              return _context94.abrupt("break", 20);
                            case 15:
                              if (!(subscription.callbacks.size === 0)) {
                                _context94.next = 18;
                                break;
                              }
                              _context94.next = 18;
                              return _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee92() {
                                var serverSubscriptionId, unsubscribeMethod;
                                return import_regenerator.default.wrap(function _callee92$(_context93) {
                                  while (1)
                                    switch (_context93.prev = _context93.next) {
                                      case 0:
                                        serverSubscriptionId = subscription.serverSubscriptionId, unsubscribeMethod = subscription.unsubscribeMethod;
                                        if (!_this12._subscriptionsAutoDisposedByRpc.has(serverSubscriptionId)) {
                                          _context93.next = 5;
                                          break;
                                        }
                                        _this12._subscriptionsAutoDisposedByRpc["delete"](serverSubscriptionId);
                                        _context93.next = 21;
                                        break;
                                      case 5:
                                        _this12._setSubscription(hash2, _objectSpread(_objectSpread({}, subscription), {}, {
                                          state: "unsubscribing"
                                        }));
                                        _this12._setSubscription(hash2, _objectSpread(_objectSpread({}, subscription), {}, {
                                          state: "unsubscribing"
                                        }));
                                        _context93.prev = 7;
                                        _context93.next = 10;
                                        return _this12._rpcWebSocket.call(unsubscribeMethod, [serverSubscriptionId]);
                                      case 10:
                                        _context93.next = 21;
                                        break;
                                      case 12:
                                        _context93.prev = 12;
                                        _context93.t0 = _context93["catch"](7);
                                        if (_context93.t0 instanceof Error) {
                                          console.error("".concat(unsubscribeMethod, " error:"), _context93.t0.message);
                                        }
                                        if (isCurrentConnectionStillActive()) {
                                          _context93.next = 17;
                                          break;
                                        }
                                        return _context93.abrupt("return");
                                      case 17:
                                        _this12._setSubscription(hash2, _objectSpread(_objectSpread({}, subscription), {}, {
                                          state: "subscribed"
                                        }));
                                        _context93.next = 20;
                                        return _this12._updateSubscriptions();
                                      case 20:
                                        return _context93.abrupt("return");
                                      case 21:
                                        _this12._setSubscription(hash2, _objectSpread(_objectSpread({}, subscription), {}, {
                                          state: "unsubscribed"
                                        }));
                                        _context93.next = 24;
                                        return _this12._updateSubscriptions();
                                      case 24:
                                      case "end":
                                        return _context93.stop();
                                    }
                                }, _callee92, null, [[7, 12]]);
                              }))();
                            case 18:
                              return _context94.abrupt("break", 20);
                            case 19:
                              return _context94.abrupt("break", 20);
                            case 20:
                            case "end":
                              return _context94.stop();
                          }
                      }, _callee93);
                    }));
                    return function(_x136) {
                      return _ref21.apply(this, arguments);
                    };
                  }())
                );
              case 11:
              case "end":
                return _context95.stop();
            }
        }, _callee94, this);
      }));
      function _updateSubscriptions() {
        return _updateSubscriptions2.apply(this, arguments);
      }
      return _updateSubscriptions;
    }()
    /**
     * @internal
     */
  }, {
    key: "_handleServerNotification",
    value: function _handleServerNotification(serverSubscriptionId, callbackArgs) {
      var callbacks = this._subscriptionCallbacksByServerSubscriptionId[serverSubscriptionId];
      if (callbacks === void 0) {
        return;
      }
      callbacks.forEach(function(cb) {
        try {
          cb.apply(void 0, _toConsumableArray(callbackArgs));
        } catch (e) {
          console.error(e);
        }
      });
    }
    /**
     * @internal
     */
  }, {
    key: "_wsOnAccountNotification",
    value: function _wsOnAccountNotification(notification) {
      var _create = create(notification, AccountNotificationResult), result = _create.result, subscription = _create.subscription;
      this._handleServerNotification(subscription, [result.value, result.context]);
    }
    /**
     * @internal
     */
  }, {
    key: "_makeSubscription",
    value: function _makeSubscription(subscriptionConfig, args) {
      var _this13 = this;
      var clientSubscriptionId = this._nextClientSubscriptionId++;
      var hash2 = fastStableStringify$1(
        [subscriptionConfig.method, args],
        true
        /* isArrayProp */
      );
      var existingSubscription = this._subscriptionsByHash[hash2];
      if (existingSubscription === void 0) {
        this._subscriptionsByHash[hash2] = _objectSpread(_objectSpread({}, subscriptionConfig), {}, {
          args,
          callbacks: /* @__PURE__ */ new Set([subscriptionConfig.callback]),
          state: "pending"
        });
      } else {
        existingSubscription.callbacks.add(subscriptionConfig.callback);
      }
      this._subscriptionHashByClientSubscriptionId[clientSubscriptionId] = hash2;
      this._subscriptionDisposeFunctionsByClientSubscriptionId[clientSubscriptionId] = /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee95() {
        var subscription;
        return import_regenerator.default.wrap(function _callee95$(_context96) {
          while (1)
            switch (_context96.prev = _context96.next) {
              case 0:
                delete _this13._subscriptionDisposeFunctionsByClientSubscriptionId[clientSubscriptionId];
                delete _this13._subscriptionHashByClientSubscriptionId[clientSubscriptionId];
                subscription = _this13._subscriptionsByHash[hash2];
                assert2(subscription !== void 0, "Could not find a `Subscription` when tearing down client subscription #".concat(clientSubscriptionId));
                subscription.callbacks["delete"](subscriptionConfig.callback);
                _context96.next = 7;
                return _this13._updateSubscriptions();
              case 7:
              case "end":
                return _context96.stop();
            }
        }, _callee95);
      }));
      this._updateSubscriptions();
      return clientSubscriptionId;
    }
    /**
     * Register a callback to be invoked whenever the specified account changes
     *
     * @param publicKey Public key of the account to monitor
     * @param callback Function to invoke whenever the account is changed
     * @param commitment Specify the commitment level account changes must reach before notification
     * @return subscription id
     */
  }, {
    key: "onAccountChange",
    value: function onAccountChange(publicKey3, callback, commitment) {
      var args = this._buildArgs(
        [publicKey3.toBase58()],
        commitment || this._commitment || "finalized",
        // Apply connection/server default.
        "base64"
      );
      return this._makeSubscription({
        callback,
        method: "accountSubscribe",
        unsubscribeMethod: "accountUnsubscribe"
      }, args);
    }
    /**
     * Deregister an account notification callback
     *
     * @param id client subscription id to deregister
     */
  }, {
    key: "removeAccountChangeListener",
    value: function() {
      var _removeAccountChangeListener = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee96(clientSubscriptionId) {
        return import_regenerator.default.wrap(function _callee96$(_context97) {
          while (1)
            switch (_context97.prev = _context97.next) {
              case 0:
                _context97.next = 2;
                return this._unsubscribeClientSubscription(clientSubscriptionId, "account change");
              case 2:
              case "end":
                return _context97.stop();
            }
        }, _callee96, this);
      }));
      function removeAccountChangeListener(_x137) {
        return _removeAccountChangeListener.apply(this, arguments);
      }
      return removeAccountChangeListener;
    }()
    /**
     * @internal
     */
  }, {
    key: "_wsOnProgramAccountNotification",
    value: function _wsOnProgramAccountNotification(notification) {
      var _create2 = create(notification, ProgramAccountNotificationResult), result = _create2.result, subscription = _create2.subscription;
      this._handleServerNotification(subscription, [{
        accountId: result.value.pubkey,
        accountInfo: result.value.account
      }, result.context]);
    }
    /**
     * Register a callback to be invoked whenever accounts owned by the
     * specified program change
     *
     * @param programId Public key of the program to monitor
     * @param callback Function to invoke whenever the account is changed
     * @param commitment Specify the commitment level account changes must reach before notification
     * @param filters The program account filters to pass into the RPC method
     * @return subscription id
     */
  }, {
    key: "onProgramAccountChange",
    value: function onProgramAccountChange(programId, callback, commitment, filters) {
      var args = this._buildArgs(
        [programId.toBase58()],
        commitment || this._commitment || "finalized",
        // Apply connection/server default.
        "base64",
        filters ? {
          filters
        } : void 0
        /* extra */
      );
      return this._makeSubscription({
        callback,
        method: "programSubscribe",
        unsubscribeMethod: "programUnsubscribe"
      }, args);
    }
    /**
     * Deregister an account notification callback
     *
     * @param id client subscription id to deregister
     */
  }, {
    key: "removeProgramAccountChangeListener",
    value: function() {
      var _removeProgramAccountChangeListener = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee97(clientSubscriptionId) {
        return import_regenerator.default.wrap(function _callee97$(_context98) {
          while (1)
            switch (_context98.prev = _context98.next) {
              case 0:
                _context98.next = 2;
                return this._unsubscribeClientSubscription(clientSubscriptionId, "program account change");
              case 2:
              case "end":
                return _context98.stop();
            }
        }, _callee97, this);
      }));
      function removeProgramAccountChangeListener(_x138) {
        return _removeProgramAccountChangeListener.apply(this, arguments);
      }
      return removeProgramAccountChangeListener;
    }()
    /**
     * Registers a callback to be invoked whenever logs are emitted.
     */
  }, {
    key: "onLogs",
    value: function onLogs(filter, callback, commitment) {
      var args = this._buildArgs(
        [_typeof(filter) === "object" ? {
          mentions: [filter.toString()]
        } : filter],
        commitment || this._commitment || "finalized"
        // Apply connection/server default.
      );
      return this._makeSubscription({
        callback,
        method: "logsSubscribe",
        unsubscribeMethod: "logsUnsubscribe"
      }, args);
    }
    /**
     * Deregister a logs callback.
     *
     * @param id client subscription id to deregister.
     */
  }, {
    key: "removeOnLogsListener",
    value: function() {
      var _removeOnLogsListener = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee98(clientSubscriptionId) {
        return import_regenerator.default.wrap(function _callee98$(_context99) {
          while (1)
            switch (_context99.prev = _context99.next) {
              case 0:
                _context99.next = 2;
                return this._unsubscribeClientSubscription(clientSubscriptionId, "logs");
              case 2:
              case "end":
                return _context99.stop();
            }
        }, _callee98, this);
      }));
      function removeOnLogsListener(_x139) {
        return _removeOnLogsListener.apply(this, arguments);
      }
      return removeOnLogsListener;
    }()
    /**
     * @internal
     */
  }, {
    key: "_wsOnLogsNotification",
    value: function _wsOnLogsNotification(notification) {
      var _create3 = create(notification, LogsNotificationResult), result = _create3.result, subscription = _create3.subscription;
      this._handleServerNotification(subscription, [result.value, result.context]);
    }
    /**
     * @internal
     */
  }, {
    key: "_wsOnSlotNotification",
    value: function _wsOnSlotNotification(notification) {
      var _create4 = create(notification, SlotNotificationResult), result = _create4.result, subscription = _create4.subscription;
      this._handleServerNotification(subscription, [result]);
    }
    /**
     * Register a callback to be invoked upon slot changes
     *
     * @param callback Function to invoke whenever the slot changes
     * @return subscription id
     */
  }, {
    key: "onSlotChange",
    value: function onSlotChange(callback) {
      return this._makeSubscription(
        {
          callback,
          method: "slotSubscribe",
          unsubscribeMethod: "slotUnsubscribe"
        },
        []
        /* args */
      );
    }
    /**
     * Deregister a slot notification callback
     *
     * @param id client subscription id to deregister
     */
  }, {
    key: "removeSlotChangeListener",
    value: function() {
      var _removeSlotChangeListener = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee99(clientSubscriptionId) {
        return import_regenerator.default.wrap(function _callee99$(_context100) {
          while (1)
            switch (_context100.prev = _context100.next) {
              case 0:
                _context100.next = 2;
                return this._unsubscribeClientSubscription(clientSubscriptionId, "slot change");
              case 2:
              case "end":
                return _context100.stop();
            }
        }, _callee99, this);
      }));
      function removeSlotChangeListener(_x140) {
        return _removeSlotChangeListener.apply(this, arguments);
      }
      return removeSlotChangeListener;
    }()
    /**
     * @internal
     */
  }, {
    key: "_wsOnSlotUpdatesNotification",
    value: function _wsOnSlotUpdatesNotification(notification) {
      var _create5 = create(notification, SlotUpdateNotificationResult), result = _create5.result, subscription = _create5.subscription;
      this._handleServerNotification(subscription, [result]);
    }
    /**
     * Register a callback to be invoked upon slot updates. {@link SlotUpdate}'s
     * may be useful to track live progress of a cluster.
     *
     * @param callback Function to invoke whenever the slot updates
     * @return subscription id
     */
  }, {
    key: "onSlotUpdate",
    value: function onSlotUpdate(callback) {
      return this._makeSubscription(
        {
          callback,
          method: "slotsUpdatesSubscribe",
          unsubscribeMethod: "slotsUpdatesUnsubscribe"
        },
        []
        /* args */
      );
    }
    /**
     * Deregister a slot update notification callback
     *
     * @param id client subscription id to deregister
     */
  }, {
    key: "removeSlotUpdateListener",
    value: function() {
      var _removeSlotUpdateListener = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee100(clientSubscriptionId) {
        return import_regenerator.default.wrap(function _callee100$(_context101) {
          while (1)
            switch (_context101.prev = _context101.next) {
              case 0:
                _context101.next = 2;
                return this._unsubscribeClientSubscription(clientSubscriptionId, "slot update");
              case 2:
              case "end":
                return _context101.stop();
            }
        }, _callee100, this);
      }));
      function removeSlotUpdateListener(_x141) {
        return _removeSlotUpdateListener.apply(this, arguments);
      }
      return removeSlotUpdateListener;
    }()
    /**
     * @internal
     */
  }, {
    key: "_unsubscribeClientSubscription",
    value: function() {
      var _unsubscribeClientSubscription2 = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee101(clientSubscriptionId, subscriptionName) {
        var dispose;
        return import_regenerator.default.wrap(function _callee101$(_context102) {
          while (1)
            switch (_context102.prev = _context102.next) {
              case 0:
                dispose = this._subscriptionDisposeFunctionsByClientSubscriptionId[clientSubscriptionId];
                if (!dispose) {
                  _context102.next = 6;
                  break;
                }
                _context102.next = 4;
                return dispose();
              case 4:
                _context102.next = 7;
                break;
              case 6:
                console.warn("Ignored unsubscribe request because an active subscription with id " + "`".concat(clientSubscriptionId, "` for '").concat(subscriptionName, "' events ") + "could not be found.");
              case 7:
              case "end":
                return _context102.stop();
            }
        }, _callee101, this);
      }));
      function _unsubscribeClientSubscription(_x142, _x143) {
        return _unsubscribeClientSubscription2.apply(this, arguments);
      }
      return _unsubscribeClientSubscription;
    }()
  }, {
    key: "_buildArgs",
    value: function _buildArgs(args, override, encoding, extra) {
      var commitment = override || this._commitment;
      if (commitment || encoding || extra) {
        var _options = {};
        if (encoding) {
          _options.encoding = encoding;
        }
        if (commitment) {
          _options.commitment = commitment;
        }
        if (extra) {
          _options = Object.assign(_options, extra);
        }
        args.push(_options);
      }
      return args;
    }
    /**
     * @internal
     */
  }, {
    key: "_buildArgsAtLeastConfirmed",
    value: function _buildArgsAtLeastConfirmed(args, override, encoding, extra) {
      var commitment = override || this._commitment;
      if (commitment && !["confirmed", "finalized"].includes(commitment)) {
        throw new Error("Using Connection with default commitment: `" + this._commitment + "`, but method requires at least `confirmed`");
      }
      return this._buildArgs(args, override, encoding, extra);
    }
    /**
     * @internal
     */
  }, {
    key: "_wsOnSignatureNotification",
    value: function _wsOnSignatureNotification(notification) {
      var _create6 = create(notification, SignatureNotificationResult), result = _create6.result, subscription = _create6.subscription;
      if (result.value !== "receivedSignature") {
        this._subscriptionsAutoDisposedByRpc.add(subscription);
      }
      this._handleServerNotification(subscription, result.value === "receivedSignature" ? [{
        type: "received"
      }, result.context] : [{
        type: "status",
        result: result.value
      }, result.context]);
    }
    /**
     * Register a callback to be invoked upon signature updates
     *
     * @param signature Transaction signature string in base 58
     * @param callback Function to invoke on signature notifications
     * @param commitment Specify the commitment level signature must reach before notification
     * @return subscription id
     */
  }, {
    key: "onSignature",
    value: function onSignature(signature, _callback, commitment) {
      var _this14 = this;
      var args = this._buildArgs(
        [signature],
        commitment || this._commitment || "finalized"
        // Apply connection/server default.
      );
      var clientSubscriptionId = this._makeSubscription({
        callback: function callback(notification, context) {
          if (notification.type === "status") {
            _callback(notification.result, context);
            try {
              _this14.removeSignatureListener(clientSubscriptionId);
            } catch (_err) {
            }
          }
        },
        method: "signatureSubscribe",
        unsubscribeMethod: "signatureUnsubscribe"
      }, args);
      return clientSubscriptionId;
    }
    /**
     * Register a callback to be invoked when a transaction is
     * received and/or processed.
     *
     * @param signature Transaction signature string in base 58
     * @param callback Function to invoke on signature notifications
     * @param options Enable received notifications and set the commitment
     *   level that signature must reach before notification
     * @return subscription id
     */
  }, {
    key: "onSignatureWithOptions",
    value: function onSignatureWithOptions(signature, _callback2, options) {
      var _this15 = this;
      var _options$commitment = _objectSpread(_objectSpread({}, options), {}, {
        commitment: options && options.commitment || this._commitment || "finalized"
        // Apply connection/server default.
      }), commitment = _options$commitment.commitment, extra = _objectWithoutProperties(_options$commitment, _excluded4);
      var args = this._buildArgs([signature], commitment, void 0, extra);
      var clientSubscriptionId = this._makeSubscription({
        callback: function callback(notification, context) {
          _callback2(notification, context);
          try {
            _this15.removeSignatureListener(clientSubscriptionId);
          } catch (_err) {
          }
        },
        method: "signatureSubscribe",
        unsubscribeMethod: "signatureUnsubscribe"
      }, args);
      return clientSubscriptionId;
    }
    /**
     * Deregister a signature notification callback
     *
     * @param id client subscription id to deregister
     */
  }, {
    key: "removeSignatureListener",
    value: function() {
      var _removeSignatureListener = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee102(clientSubscriptionId) {
        return import_regenerator.default.wrap(function _callee102$(_context103) {
          while (1)
            switch (_context103.prev = _context103.next) {
              case 0:
                _context103.next = 2;
                return this._unsubscribeClientSubscription(clientSubscriptionId, "signature result");
              case 2:
              case "end":
                return _context103.stop();
            }
        }, _callee102, this);
      }));
      function removeSignatureListener(_x144) {
        return _removeSignatureListener.apply(this, arguments);
      }
      return removeSignatureListener;
    }()
    /**
     * @internal
     */
  }, {
    key: "_wsOnRootNotification",
    value: function _wsOnRootNotification(notification) {
      var _create7 = create(notification, RootNotificationResult), result = _create7.result, subscription = _create7.subscription;
      this._handleServerNotification(subscription, [result]);
    }
    /**
     * Register a callback to be invoked upon root changes
     *
     * @param callback Function to invoke whenever the root changes
     * @return subscription id
     */
  }, {
    key: "onRootChange",
    value: function onRootChange(callback) {
      return this._makeSubscription(
        {
          callback,
          method: "rootSubscribe",
          unsubscribeMethod: "rootUnsubscribe"
        },
        []
        /* args */
      );
    }
    /**
     * Deregister a root notification callback
     *
     * @param id client subscription id to deregister
     */
  }, {
    key: "removeRootChangeListener",
    value: function() {
      var _removeRootChangeListener = _asyncToGenerator(/* @__PURE__ */ import_regenerator.default.mark(function _callee103(clientSubscriptionId) {
        return import_regenerator.default.wrap(function _callee103$(_context104) {
          while (1)
            switch (_context104.prev = _context104.next) {
              case 0:
                _context104.next = 2;
                return this._unsubscribeClientSubscription(clientSubscriptionId, "root change");
              case 2:
              case "end":
                return _context104.stop();
            }
        }, _callee103, this);
      }));
      function removeRootChangeListener(_x145) {
        return _removeRootChangeListener.apply(this, arguments);
      }
      return removeRootChangeListener;
    }()
  }]);
  return Connection2;
}();
var Keypair = /* @__PURE__ */ function() {
  function Keypair2(keypair) {
    _classCallCheck(this, Keypair2);
    this._keypair = void 0;
    this._keypair = keypair !== null && keypair !== void 0 ? keypair : generateKeypair();
  }
  _createClass(Keypair2, [{
    key: "publicKey",
    get: (
      /**
       * The public key for this keypair
       *
       * @returns {PublicKey} PublicKey
       */
      function get() {
        return new PublicKey(this._keypair.publicKey);
      }
    )
    /**
     * The raw secret key for this keypair
     * @returns {Uint8Array} Secret key in an array of Uint8 bytes
     */
  }, {
    key: "secretKey",
    get: function get() {
      return new Uint8Array(this._keypair.secretKey);
    }
  }], [{
    key: "generate",
    value: function generate() {
      return new Keypair2(generateKeypair());
    }
    /**
     * Create a keypair from a raw secret key byte array.
     *
     * This method should only be used to recreate a keypair from a previously
     * generated secret key. Generating keypairs from a random seed should be done
     * with the {@link Keypair.fromSeed} method.
     *
     * @throws error if the provided secret key is invalid and validation is not skipped.
     *
     * @param secretKey secret key byte array
     * @param options skip secret key validation
     *
     * @returns {Keypair} Keypair
     */
  }, {
    key: "fromSecretKey",
    value: function fromSecretKey(secretKey, options) {
      if (secretKey.byteLength !== 64) {
        throw new Error("bad secret key size");
      }
      var publicKey3 = secretKey.slice(32, 64);
      if (!options || !options.skipValidation) {
        var privateScalar = secretKey.slice(0, 32);
        var computedPublicKey = getPublicKey(privateScalar);
        for (var ii = 0; ii < 32; ii++) {
          if (publicKey3[ii] !== computedPublicKey[ii]) {
            throw new Error("provided secretKey is invalid");
          }
        }
      }
      return new Keypair2({
        publicKey: publicKey3,
        secretKey
      });
    }
    /**
     * Generate a keypair from a 32 byte seed.
     *
     * @param seed seed byte array
     *
     * @returns {Keypair} Keypair
     */
  }, {
    key: "fromSeed",
    value: function fromSeed(seed) {
      var publicKey3 = getPublicKey(seed);
      var secretKey = new Uint8Array(64);
      secretKey.set(seed);
      secretKey.set(publicKey3, 32);
      return new Keypair2({
        publicKey: publicKey3,
        secretKey
      });
    }
  }]);
  return Keypair2;
}();
var LOOKUP_TABLE_INSTRUCTION_LAYOUTS = Object.freeze({
  CreateLookupTable: {
    index: 0,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), u642("recentSlot"), BufferLayout.u8("bumpSeed")])
  },
  FreezeLookupTable: {
    index: 1,
    layout: BufferLayout.struct([BufferLayout.u32("instruction")])
  },
  ExtendLookupTable: {
    index: 2,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), u642(), BufferLayout.seq(publicKey(), BufferLayout.offset(BufferLayout.u32(), -8), "addresses")])
  },
  DeactivateLookupTable: {
    index: 3,
    layout: BufferLayout.struct([BufferLayout.u32("instruction")])
  },
  CloseLookupTable: {
    index: 4,
    layout: BufferLayout.struct([BufferLayout.u32("instruction")])
  }
});
var AddressLookupTableProgram = /* @__PURE__ */ function() {
  function AddressLookupTableProgram2() {
    _classCallCheck(this, AddressLookupTableProgram2);
  }
  _createClass(AddressLookupTableProgram2, null, [{
    key: "createLookupTable",
    value: function createLookupTable(params) {
      var _PublicKey$findProgra = PublicKey.findProgramAddressSync([params.authority.toBuffer(), (0, import_bigint_buffer.toBufferLE)(BigInt(params.recentSlot), 8)], this.programId), _PublicKey$findProgra2 = _slicedToArray(_PublicKey$findProgra, 2), lookupTableAddress = _PublicKey$findProgra2[0], bumpSeed = _PublicKey$findProgra2[1];
      var type2 = LOOKUP_TABLE_INSTRUCTION_LAYOUTS.CreateLookupTable;
      var data = encodeData(type2, {
        recentSlot: BigInt(params.recentSlot),
        bumpSeed
      });
      var keys = [{
        pubkey: lookupTableAddress,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: params.authority,
        isSigner: true,
        isWritable: false
      }, {
        pubkey: params.payer,
        isSigner: true,
        isWritable: true
      }, {
        pubkey: SystemProgram.programId,
        isSigner: false,
        isWritable: false
      }];
      return [new TransactionInstruction({
        programId: this.programId,
        keys,
        data
      }), lookupTableAddress];
    }
  }, {
    key: "freezeLookupTable",
    value: function freezeLookupTable(params) {
      var type2 = LOOKUP_TABLE_INSTRUCTION_LAYOUTS.FreezeLookupTable;
      var data = encodeData(type2);
      var keys = [{
        pubkey: params.lookupTable,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: params.authority,
        isSigner: true,
        isWritable: false
      }];
      return new TransactionInstruction({
        programId: this.programId,
        keys,
        data
      });
    }
  }, {
    key: "extendLookupTable",
    value: function extendLookupTable(params) {
      var type2 = LOOKUP_TABLE_INSTRUCTION_LAYOUTS.ExtendLookupTable;
      var data = encodeData(type2, {
        addresses: params.addresses.map(function(addr) {
          return addr.toBytes();
        })
      });
      var keys = [{
        pubkey: params.lookupTable,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: params.authority,
        isSigner: true,
        isWritable: false
      }];
      if (params.payer) {
        keys.push({
          pubkey: params.payer,
          isSigner: true,
          isWritable: true
        }, {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: false
        });
      }
      return new TransactionInstruction({
        programId: this.programId,
        keys,
        data
      });
    }
  }, {
    key: "deactivateLookupTable",
    value: function deactivateLookupTable(params) {
      var type2 = LOOKUP_TABLE_INSTRUCTION_LAYOUTS.DeactivateLookupTable;
      var data = encodeData(type2);
      var keys = [{
        pubkey: params.lookupTable,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: params.authority,
        isSigner: true,
        isWritable: false
      }];
      return new TransactionInstruction({
        programId: this.programId,
        keys,
        data
      });
    }
  }, {
    key: "closeLookupTable",
    value: function closeLookupTable(params) {
      var type2 = LOOKUP_TABLE_INSTRUCTION_LAYOUTS.CloseLookupTable;
      var data = encodeData(type2);
      var keys = [{
        pubkey: params.lookupTable,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: params.authority,
        isSigner: true,
        isWritable: false
      }, {
        pubkey: params.recipient,
        isSigner: false,
        isWritable: true
      }];
      return new TransactionInstruction({
        programId: this.programId,
        keys,
        data
      });
    }
  }]);
  return AddressLookupTableProgram2;
}();
AddressLookupTableProgram.programId = new PublicKey("AddressLookupTab1e1111111111111111111111111");
var COMPUTE_BUDGET_INSTRUCTION_LAYOUTS = Object.freeze({
  RequestUnits: {
    index: 0,
    layout: BufferLayout.struct([BufferLayout.u8("instruction"), BufferLayout.u32("units"), BufferLayout.u32("additionalFee")])
  },
  RequestHeapFrame: {
    index: 1,
    layout: BufferLayout.struct([BufferLayout.u8("instruction"), BufferLayout.u32("bytes")])
  },
  SetComputeUnitLimit: {
    index: 2,
    layout: BufferLayout.struct([BufferLayout.u8("instruction"), BufferLayout.u32("units")])
  },
  SetComputeUnitPrice: {
    index: 3,
    layout: BufferLayout.struct([BufferLayout.u8("instruction"), u642("microLamports")])
  }
});
var ComputeBudgetProgram = /* @__PURE__ */ function() {
  function ComputeBudgetProgram2() {
    _classCallCheck(this, ComputeBudgetProgram2);
  }
  _createClass(ComputeBudgetProgram2, null, [{
    key: "requestUnits",
    value: (
      /**
       * @deprecated Instead, call {@link setComputeUnitLimit} and/or {@link setComputeUnitPrice}
       */
      function requestUnits(params) {
        var type2 = COMPUTE_BUDGET_INSTRUCTION_LAYOUTS.RequestUnits;
        var data = encodeData(type2, params);
        return new TransactionInstruction({
          keys: [],
          programId: this.programId,
          data
        });
      }
    )
  }, {
    key: "requestHeapFrame",
    value: function requestHeapFrame(params) {
      var type2 = COMPUTE_BUDGET_INSTRUCTION_LAYOUTS.RequestHeapFrame;
      var data = encodeData(type2, params);
      return new TransactionInstruction({
        keys: [],
        programId: this.programId,
        data
      });
    }
  }, {
    key: "setComputeUnitLimit",
    value: function setComputeUnitLimit(params) {
      var type2 = COMPUTE_BUDGET_INSTRUCTION_LAYOUTS.SetComputeUnitLimit;
      var data = encodeData(type2, params);
      return new TransactionInstruction({
        keys: [],
        programId: this.programId,
        data
      });
    }
  }, {
    key: "setComputeUnitPrice",
    value: function setComputeUnitPrice(params) {
      var type2 = COMPUTE_BUDGET_INSTRUCTION_LAYOUTS.SetComputeUnitPrice;
      var data = encodeData(type2, {
        microLamports: BigInt(params.microLamports)
      });
      return new TransactionInstruction({
        keys: [],
        programId: this.programId,
        data
      });
    }
  }]);
  return ComputeBudgetProgram2;
}();
ComputeBudgetProgram.programId = new PublicKey("ComputeBudget111111111111111111111111111111");
var PRIVATE_KEY_BYTES$1 = 64;
var PUBLIC_KEY_BYTES$1 = 32;
var SIGNATURE_BYTES = 64;
var ED25519_INSTRUCTION_LAYOUT = BufferLayout.struct([BufferLayout.u8("numSignatures"), BufferLayout.u8("padding"), BufferLayout.u16("signatureOffset"), BufferLayout.u16("signatureInstructionIndex"), BufferLayout.u16("publicKeyOffset"), BufferLayout.u16("publicKeyInstructionIndex"), BufferLayout.u16("messageDataOffset"), BufferLayout.u16("messageDataSize"), BufferLayout.u16("messageInstructionIndex")]);
var Ed25519Program = /* @__PURE__ */ function() {
  function Ed25519Program2() {
    _classCallCheck(this, Ed25519Program2);
  }
  _createClass(Ed25519Program2, null, [{
    key: "createInstructionWithPublicKey",
    value: (
      /**
       * Create an ed25519 instruction with a public key and signature. The
       * public key must be a buffer that is 32 bytes long, and the signature
       * must be a buffer of 64 bytes.
       */
      function createInstructionWithPublicKey(params) {
        var publicKey3 = params.publicKey, message = params.message, signature = params.signature, instructionIndex = params.instructionIndex;
        assert2(publicKey3.length === PUBLIC_KEY_BYTES$1, "Public Key must be ".concat(PUBLIC_KEY_BYTES$1, " bytes but received ").concat(publicKey3.length, " bytes"));
        assert2(signature.length === SIGNATURE_BYTES, "Signature must be ".concat(SIGNATURE_BYTES, " bytes but received ").concat(signature.length, " bytes"));
        var publicKeyOffset = ED25519_INSTRUCTION_LAYOUT.span;
        var signatureOffset = publicKeyOffset + publicKey3.length;
        var messageDataOffset = signatureOffset + signature.length;
        var numSignatures = 1;
        var instructionData = import_buffer.Buffer.alloc(messageDataOffset + message.length);
        var index = instructionIndex == null ? 65535 : instructionIndex;
        ED25519_INSTRUCTION_LAYOUT.encode({
          numSignatures,
          padding: 0,
          signatureOffset,
          signatureInstructionIndex: index,
          publicKeyOffset,
          publicKeyInstructionIndex: index,
          messageDataOffset,
          messageDataSize: message.length,
          messageInstructionIndex: index
        }, instructionData);
        instructionData.fill(publicKey3, publicKeyOffset);
        instructionData.fill(signature, signatureOffset);
        instructionData.fill(message, messageDataOffset);
        return new TransactionInstruction({
          keys: [],
          programId: Ed25519Program2.programId,
          data: instructionData
        });
      }
    )
    /**
     * Create an ed25519 instruction with a private key. The private key
     * must be a buffer that is 64 bytes long.
     */
  }, {
    key: "createInstructionWithPrivateKey",
    value: function createInstructionWithPrivateKey(params) {
      var privateKey = params.privateKey, message = params.message, instructionIndex = params.instructionIndex;
      assert2(privateKey.length === PRIVATE_KEY_BYTES$1, "Private key must be ".concat(PRIVATE_KEY_BYTES$1, " bytes but received ").concat(privateKey.length, " bytes"));
      try {
        var keypair = Keypair.fromSecretKey(privateKey);
        var publicKey3 = keypair.publicKey.toBytes();
        var signature = sign(message, keypair.secretKey);
        return this.createInstructionWithPublicKey({
          publicKey: publicKey3,
          message,
          signature,
          instructionIndex
        });
      } catch (error) {
        throw new Error("Error creating instruction; ".concat(error));
      }
    }
  }]);
  return Ed25519Program2;
}();
Ed25519Program.programId = new PublicKey("Ed25519SigVerify111111111111111111111111111");
var ecdsaSign = function ecdsaSign2(msgHash, privKey) {
  var signature = secp256k1.sign(msgHash, privKey);
  return [signature.toCompactRawBytes(), signature.recovery];
};
secp256k1.utils.isValidPrivateKey;
var publicKeyCreate = secp256k1.getPublicKey;
var PRIVATE_KEY_BYTES = 32;
var ETHEREUM_ADDRESS_BYTES = 20;
var PUBLIC_KEY_BYTES = 64;
var SIGNATURE_OFFSETS_SERIALIZED_SIZE = 11;
var SECP256K1_INSTRUCTION_LAYOUT = BufferLayout.struct([BufferLayout.u8("numSignatures"), BufferLayout.u16("signatureOffset"), BufferLayout.u8("signatureInstructionIndex"), BufferLayout.u16("ethAddressOffset"), BufferLayout.u8("ethAddressInstructionIndex"), BufferLayout.u16("messageDataOffset"), BufferLayout.u16("messageDataSize"), BufferLayout.u8("messageInstructionIndex"), BufferLayout.blob(20, "ethAddress"), BufferLayout.blob(64, "signature"), BufferLayout.u8("recoveryId")]);
var Secp256k1Program = /* @__PURE__ */ function() {
  function Secp256k1Program2() {
    _classCallCheck(this, Secp256k1Program2);
  }
  _createClass(Secp256k1Program2, null, [{
    key: "publicKeyToEthAddress",
    value: (
      /**
       * Construct an Ethereum address from a secp256k1 public key buffer.
       * @param {Buffer} publicKey a 64 byte secp256k1 public key buffer
       */
      function publicKeyToEthAddress(publicKey3) {
        assert2(publicKey3.length === PUBLIC_KEY_BYTES, "Public key must be ".concat(PUBLIC_KEY_BYTES, " bytes but received ").concat(publicKey3.length, " bytes"));
        try {
          return import_buffer.Buffer.from(keccak_256(toBuffer(publicKey3))).slice(-ETHEREUM_ADDRESS_BYTES);
        } catch (error) {
          throw new Error("Error constructing Ethereum address: ".concat(error));
        }
      }
    )
    /**
     * Create an secp256k1 instruction with a public key. The public key
     * must be a buffer that is 64 bytes long.
     */
  }, {
    key: "createInstructionWithPublicKey",
    value: function createInstructionWithPublicKey(params) {
      var publicKey3 = params.publicKey, message = params.message, signature = params.signature, recoveryId = params.recoveryId, instructionIndex = params.instructionIndex;
      return Secp256k1Program2.createInstructionWithEthAddress({
        ethAddress: Secp256k1Program2.publicKeyToEthAddress(publicKey3),
        message,
        signature,
        recoveryId,
        instructionIndex
      });
    }
    /**
     * Create an secp256k1 instruction with an Ethereum address. The address
     * must be a hex string or a buffer that is 20 bytes long.
     */
  }, {
    key: "createInstructionWithEthAddress",
    value: function createInstructionWithEthAddress(params) {
      var rawAddress = params.ethAddress, message = params.message, signature = params.signature, recoveryId = params.recoveryId, _params$instructionIn = params.instructionIndex, instructionIndex = _params$instructionIn === void 0 ? 0 : _params$instructionIn;
      var ethAddress;
      if (typeof rawAddress === "string") {
        if (rawAddress.startsWith("0x")) {
          ethAddress = import_buffer.Buffer.from(rawAddress.substr(2), "hex");
        } else {
          ethAddress = import_buffer.Buffer.from(rawAddress, "hex");
        }
      } else {
        ethAddress = rawAddress;
      }
      assert2(ethAddress.length === ETHEREUM_ADDRESS_BYTES, "Address must be ".concat(ETHEREUM_ADDRESS_BYTES, " bytes but received ").concat(ethAddress.length, " bytes"));
      var dataStart = 1 + SIGNATURE_OFFSETS_SERIALIZED_SIZE;
      var ethAddressOffset = dataStart;
      var signatureOffset = dataStart + ethAddress.length;
      var messageDataOffset = signatureOffset + signature.length + 1;
      var numSignatures = 1;
      var instructionData = import_buffer.Buffer.alloc(SECP256K1_INSTRUCTION_LAYOUT.span + message.length);
      SECP256K1_INSTRUCTION_LAYOUT.encode({
        numSignatures,
        signatureOffset,
        signatureInstructionIndex: instructionIndex,
        ethAddressOffset,
        ethAddressInstructionIndex: instructionIndex,
        messageDataOffset,
        messageDataSize: message.length,
        messageInstructionIndex: instructionIndex,
        signature: toBuffer(signature),
        ethAddress: toBuffer(ethAddress),
        recoveryId
      }, instructionData);
      instructionData.fill(toBuffer(message), SECP256K1_INSTRUCTION_LAYOUT.span);
      return new TransactionInstruction({
        keys: [],
        programId: Secp256k1Program2.programId,
        data: instructionData
      });
    }
    /**
     * Create an secp256k1 instruction with a private key. The private key
     * must be a buffer that is 32 bytes long.
     */
  }, {
    key: "createInstructionWithPrivateKey",
    value: function createInstructionWithPrivateKey(params) {
      var pkey = params.privateKey, message = params.message, instructionIndex = params.instructionIndex;
      assert2(pkey.length === PRIVATE_KEY_BYTES, "Private key must be ".concat(PRIVATE_KEY_BYTES, " bytes but received ").concat(pkey.length, " bytes"));
      try {
        var privateKey = toBuffer(pkey);
        var publicKey3 = publicKeyCreate(
          privateKey,
          false
          /* isCompressed */
        ).slice(1);
        var messageHash = import_buffer.Buffer.from(keccak_256(toBuffer(message)));
        var _ecdsaSign = ecdsaSign(messageHash, privateKey), _ecdsaSign2 = _slicedToArray(_ecdsaSign, 2), signature = _ecdsaSign2[0], recoveryId = _ecdsaSign2[1];
        return this.createInstructionWithPublicKey({
          publicKey: publicKey3,
          message,
          signature,
          recoveryId,
          instructionIndex
        });
      } catch (error) {
        throw new Error("Error creating instruction; ".concat(error));
      }
    }
  }]);
  return Secp256k1Program2;
}();
Secp256k1Program.programId = new PublicKey("KeccakSecp256k11111111111111111111111111111");
var STAKE_CONFIG_ID = new PublicKey("StakeConfig11111111111111111111111111111111");
var Lockup = /* @__PURE__ */ _createClass(
  /**
   * Create a new Lockup object
   */
  function Lockup2(unixTimestamp, epoch, custodian) {
    _classCallCheck(this, Lockup2);
    this.unixTimestamp = void 0;
    this.epoch = void 0;
    this.custodian = void 0;
    this.unixTimestamp = unixTimestamp;
    this.epoch = epoch;
    this.custodian = custodian;
  }
  /**
   * Default, inactive Lockup value
   */
);
Lockup["default"] = new Lockup(0, 0, PublicKey["default"]);
var STAKE_INSTRUCTION_LAYOUTS = Object.freeze({
  Initialize: {
    index: 0,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), authorized(), lockup()])
  },
  Authorize: {
    index: 1,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("newAuthorized"), BufferLayout.u32("stakeAuthorizationType")])
  },
  Delegate: {
    index: 2,
    layout: BufferLayout.struct([BufferLayout.u32("instruction")])
  },
  Split: {
    index: 3,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("lamports")])
  },
  Withdraw: {
    index: 4,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("lamports")])
  },
  Deactivate: {
    index: 5,
    layout: BufferLayout.struct([BufferLayout.u32("instruction")])
  },
  Merge: {
    index: 7,
    layout: BufferLayout.struct([BufferLayout.u32("instruction")])
  },
  AuthorizeWithSeed: {
    index: 8,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("newAuthorized"), BufferLayout.u32("stakeAuthorizationType"), rustString("authoritySeed"), publicKey("authorityOwner")])
  }
});
var StakeAuthorizationLayout = Object.freeze({
  Staker: {
    index: 0
  },
  Withdrawer: {
    index: 1
  }
});
var StakeProgram = /* @__PURE__ */ function() {
  function StakeProgram2() {
    _classCallCheck(this, StakeProgram2);
  }
  _createClass(StakeProgram2, null, [{
    key: "initialize",
    value: (
      /**
       * Generate an Initialize instruction to add to a Stake Create transaction
       */
      function initialize(params) {
        var stakePubkey = params.stakePubkey, authorized3 = params.authorized, maybeLockup = params.lockup;
        var lockup3 = maybeLockup || Lockup["default"];
        var type2 = STAKE_INSTRUCTION_LAYOUTS.Initialize;
        var data = encodeData(type2, {
          authorized: {
            staker: toBuffer(authorized3.staker.toBuffer()),
            withdrawer: toBuffer(authorized3.withdrawer.toBuffer())
          },
          lockup: {
            unixTimestamp: lockup3.unixTimestamp,
            epoch: lockup3.epoch,
            custodian: toBuffer(lockup3.custodian.toBuffer())
          }
        });
        var instructionData = {
          keys: [{
            pubkey: stakePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false
          }],
          programId: this.programId,
          data
        };
        return new TransactionInstruction(instructionData);
      }
    )
    /**
     * Generate a Transaction that creates a new Stake account at
     *   an address generated with `from`, a seed, and the Stake programId
     */
  }, {
    key: "createAccountWithSeed",
    value: function createAccountWithSeed(params) {
      var transaction = new Transaction();
      transaction.add(SystemProgram.createAccountWithSeed({
        fromPubkey: params.fromPubkey,
        newAccountPubkey: params.stakePubkey,
        basePubkey: params.basePubkey,
        seed: params.seed,
        lamports: params.lamports,
        space: this.space,
        programId: this.programId
      }));
      var stakePubkey = params.stakePubkey, authorized3 = params.authorized, lockup3 = params.lockup;
      return transaction.add(this.initialize({
        stakePubkey,
        authorized: authorized3,
        lockup: lockup3
      }));
    }
    /**
     * Generate a Transaction that creates a new Stake account
     */
  }, {
    key: "createAccount",
    value: function createAccount(params) {
      var transaction = new Transaction();
      transaction.add(SystemProgram.createAccount({
        fromPubkey: params.fromPubkey,
        newAccountPubkey: params.stakePubkey,
        lamports: params.lamports,
        space: this.space,
        programId: this.programId
      }));
      var stakePubkey = params.stakePubkey, authorized3 = params.authorized, lockup3 = params.lockup;
      return transaction.add(this.initialize({
        stakePubkey,
        authorized: authorized3,
        lockup: lockup3
      }));
    }
    /**
     * Generate a Transaction that delegates Stake tokens to a validator
     * Vote PublicKey. This transaction can also be used to redelegate Stake
     * to a new validator Vote PublicKey.
     */
  }, {
    key: "delegate",
    value: function delegate(params) {
      var stakePubkey = params.stakePubkey, authorizedPubkey = params.authorizedPubkey, votePubkey = params.votePubkey;
      var type2 = STAKE_INSTRUCTION_LAYOUTS.Delegate;
      var data = encodeData(type2);
      return new Transaction().add({
        keys: [{
          pubkey: stakePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: votePubkey,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: SYSVAR_CLOCK_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: SYSVAR_STAKE_HISTORY_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: STAKE_CONFIG_ID,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: authorizedPubkey,
          isSigner: true,
          isWritable: false
        }],
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a Transaction that authorizes a new PublicKey as Staker
     * or Withdrawer on the Stake account.
     */
  }, {
    key: "authorize",
    value: function authorize(params) {
      var stakePubkey = params.stakePubkey, authorizedPubkey = params.authorizedPubkey, newAuthorizedPubkey = params.newAuthorizedPubkey, stakeAuthorizationType = params.stakeAuthorizationType, custodianPubkey = params.custodianPubkey;
      var type2 = STAKE_INSTRUCTION_LAYOUTS.Authorize;
      var data = encodeData(type2, {
        newAuthorized: toBuffer(newAuthorizedPubkey.toBuffer()),
        stakeAuthorizationType: stakeAuthorizationType.index
      });
      var keys = [{
        pubkey: stakePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: SYSVAR_CLOCK_PUBKEY,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: authorizedPubkey,
        isSigner: true,
        isWritable: false
      }];
      if (custodianPubkey) {
        keys.push({
          pubkey: custodianPubkey,
          isSigner: false,
          isWritable: false
        });
      }
      return new Transaction().add({
        keys,
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a Transaction that authorizes a new PublicKey as Staker
     * or Withdrawer on the Stake account.
     */
  }, {
    key: "authorizeWithSeed",
    value: function authorizeWithSeed(params) {
      var stakePubkey = params.stakePubkey, authorityBase = params.authorityBase, authoritySeed = params.authoritySeed, authorityOwner = params.authorityOwner, newAuthorizedPubkey = params.newAuthorizedPubkey, stakeAuthorizationType = params.stakeAuthorizationType, custodianPubkey = params.custodianPubkey;
      var type2 = STAKE_INSTRUCTION_LAYOUTS.AuthorizeWithSeed;
      var data = encodeData(type2, {
        newAuthorized: toBuffer(newAuthorizedPubkey.toBuffer()),
        stakeAuthorizationType: stakeAuthorizationType.index,
        authoritySeed,
        authorityOwner: toBuffer(authorityOwner.toBuffer())
      });
      var keys = [{
        pubkey: stakePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: authorityBase,
        isSigner: true,
        isWritable: false
      }, {
        pubkey: SYSVAR_CLOCK_PUBKEY,
        isSigner: false,
        isWritable: false
      }];
      if (custodianPubkey) {
        keys.push({
          pubkey: custodianPubkey,
          isSigner: false,
          isWritable: false
        });
      }
      return new Transaction().add({
        keys,
        programId: this.programId,
        data
      });
    }
    /**
     * @internal
     */
  }, {
    key: "splitInstruction",
    value: function splitInstruction(params) {
      var stakePubkey = params.stakePubkey, authorizedPubkey = params.authorizedPubkey, splitStakePubkey = params.splitStakePubkey, lamports = params.lamports;
      var type2 = STAKE_INSTRUCTION_LAYOUTS.Split;
      var data = encodeData(type2, {
        lamports
      });
      return new TransactionInstruction({
        keys: [{
          pubkey: stakePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: splitStakePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: authorizedPubkey,
          isSigner: true,
          isWritable: false
        }],
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a Transaction that splits Stake tokens into another stake account
     */
  }, {
    key: "split",
    value: function split2(params) {
      var transaction = new Transaction();
      transaction.add(SystemProgram.createAccount({
        fromPubkey: params.authorizedPubkey,
        newAccountPubkey: params.splitStakePubkey,
        lamports: 0,
        space: this.space,
        programId: this.programId
      }));
      return transaction.add(this.splitInstruction(params));
    }
    /**
     * Generate a Transaction that splits Stake tokens into another account
     * derived from a base public key and seed
     */
  }, {
    key: "splitWithSeed",
    value: function splitWithSeed(params) {
      var stakePubkey = params.stakePubkey, authorizedPubkey = params.authorizedPubkey, splitStakePubkey = params.splitStakePubkey, basePubkey = params.basePubkey, seed = params.seed, lamports = params.lamports;
      var transaction = new Transaction();
      transaction.add(SystemProgram.allocate({
        accountPubkey: splitStakePubkey,
        basePubkey,
        seed,
        space: this.space,
        programId: this.programId
      }));
      return transaction.add(this.splitInstruction({
        stakePubkey,
        authorizedPubkey,
        splitStakePubkey,
        lamports
      }));
    }
    /**
     * Generate a Transaction that merges Stake accounts.
     */
  }, {
    key: "merge",
    value: function merge(params) {
      var stakePubkey = params.stakePubkey, sourceStakePubKey = params.sourceStakePubKey, authorizedPubkey = params.authorizedPubkey;
      var type2 = STAKE_INSTRUCTION_LAYOUTS.Merge;
      var data = encodeData(type2);
      return new Transaction().add({
        keys: [{
          pubkey: stakePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: sourceStakePubKey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: SYSVAR_CLOCK_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: SYSVAR_STAKE_HISTORY_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: authorizedPubkey,
          isSigner: true,
          isWritable: false
        }],
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a Transaction that withdraws deactivated Stake tokens.
     */
  }, {
    key: "withdraw",
    value: function withdraw(params) {
      var stakePubkey = params.stakePubkey, authorizedPubkey = params.authorizedPubkey, toPubkey = params.toPubkey, lamports = params.lamports, custodianPubkey = params.custodianPubkey;
      var type2 = STAKE_INSTRUCTION_LAYOUTS.Withdraw;
      var data = encodeData(type2, {
        lamports
      });
      var keys = [{
        pubkey: stakePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: toPubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: SYSVAR_CLOCK_PUBKEY,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: SYSVAR_STAKE_HISTORY_PUBKEY,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: authorizedPubkey,
        isSigner: true,
        isWritable: false
      }];
      if (custodianPubkey) {
        keys.push({
          pubkey: custodianPubkey,
          isSigner: false,
          isWritable: false
        });
      }
      return new Transaction().add({
        keys,
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a Transaction that deactivates Stake tokens.
     */
  }, {
    key: "deactivate",
    value: function deactivate(params) {
      var stakePubkey = params.stakePubkey, authorizedPubkey = params.authorizedPubkey;
      var type2 = STAKE_INSTRUCTION_LAYOUTS.Deactivate;
      var data = encodeData(type2);
      return new Transaction().add({
        keys: [{
          pubkey: stakePubkey,
          isSigner: false,
          isWritable: true
        }, {
          pubkey: SYSVAR_CLOCK_PUBKEY,
          isSigner: false,
          isWritable: false
        }, {
          pubkey: authorizedPubkey,
          isSigner: true,
          isWritable: false
        }],
        programId: this.programId,
        data
      });
    }
  }]);
  return StakeProgram2;
}();
StakeProgram.programId = new PublicKey("Stake11111111111111111111111111111111111111");
StakeProgram.space = 200;
var VOTE_INSTRUCTION_LAYOUTS = Object.freeze({
  InitializeAccount: {
    index: 0,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), voteInit()])
  },
  Authorize: {
    index: 1,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), publicKey("newAuthorized"), BufferLayout.u32("voteAuthorizationType")])
  },
  Withdraw: {
    index: 3,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), BufferLayout.ns64("lamports")])
  },
  AuthorizeWithSeed: {
    index: 10,
    layout: BufferLayout.struct([BufferLayout.u32("instruction"), voteAuthorizeWithSeedArgs()])
  }
});
var VoteAuthorizationLayout = Object.freeze({
  Voter: {
    index: 0
  },
  Withdrawer: {
    index: 1
  }
});
var VoteProgram = /* @__PURE__ */ function() {
  function VoteProgram2() {
    _classCallCheck(this, VoteProgram2);
  }
  _createClass(VoteProgram2, null, [{
    key: "initializeAccount",
    value: (
      /**
       * Generate an Initialize instruction.
       */
      function initializeAccount(params) {
        var votePubkey = params.votePubkey, nodePubkey = params.nodePubkey, voteInit3 = params.voteInit;
        var type2 = VOTE_INSTRUCTION_LAYOUTS.InitializeAccount;
        var data = encodeData(type2, {
          voteInit: {
            nodePubkey: toBuffer(voteInit3.nodePubkey.toBuffer()),
            authorizedVoter: toBuffer(voteInit3.authorizedVoter.toBuffer()),
            authorizedWithdrawer: toBuffer(voteInit3.authorizedWithdrawer.toBuffer()),
            commission: voteInit3.commission
          }
        });
        var instructionData = {
          keys: [{
            pubkey: votePubkey,
            isSigner: false,
            isWritable: true
          }, {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: SYSVAR_CLOCK_PUBKEY,
            isSigner: false,
            isWritable: false
          }, {
            pubkey: nodePubkey,
            isSigner: true,
            isWritable: false
          }],
          programId: this.programId,
          data
        };
        return new TransactionInstruction(instructionData);
      }
    )
    /**
     * Generate a transaction that creates a new Vote account.
     */
  }, {
    key: "createAccount",
    value: function createAccount(params) {
      var transaction = new Transaction();
      transaction.add(SystemProgram.createAccount({
        fromPubkey: params.fromPubkey,
        newAccountPubkey: params.votePubkey,
        lamports: params.lamports,
        space: this.space,
        programId: this.programId
      }));
      return transaction.add(this.initializeAccount({
        votePubkey: params.votePubkey,
        nodePubkey: params.voteInit.nodePubkey,
        voteInit: params.voteInit
      }));
    }
    /**
     * Generate a transaction that authorizes a new Voter or Withdrawer on the Vote account.
     */
  }, {
    key: "authorize",
    value: function authorize(params) {
      var votePubkey = params.votePubkey, authorizedPubkey = params.authorizedPubkey, newAuthorizedPubkey = params.newAuthorizedPubkey, voteAuthorizationType = params.voteAuthorizationType;
      var type2 = VOTE_INSTRUCTION_LAYOUTS.Authorize;
      var data = encodeData(type2, {
        newAuthorized: toBuffer(newAuthorizedPubkey.toBuffer()),
        voteAuthorizationType: voteAuthorizationType.index
      });
      var keys = [{
        pubkey: votePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: SYSVAR_CLOCK_PUBKEY,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: authorizedPubkey,
        isSigner: true,
        isWritable: false
      }];
      return new Transaction().add({
        keys,
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a transaction that authorizes a new Voter or Withdrawer on the Vote account
     * where the current Voter or Withdrawer authority is a derived key.
     */
  }, {
    key: "authorizeWithSeed",
    value: function authorizeWithSeed(params) {
      var currentAuthorityDerivedKeyBasePubkey = params.currentAuthorityDerivedKeyBasePubkey, currentAuthorityDerivedKeyOwnerPubkey = params.currentAuthorityDerivedKeyOwnerPubkey, currentAuthorityDerivedKeySeed = params.currentAuthorityDerivedKeySeed, newAuthorizedPubkey = params.newAuthorizedPubkey, voteAuthorizationType = params.voteAuthorizationType, votePubkey = params.votePubkey;
      var type2 = VOTE_INSTRUCTION_LAYOUTS.AuthorizeWithSeed;
      var data = encodeData(type2, {
        voteAuthorizeWithSeedArgs: {
          currentAuthorityDerivedKeyOwnerPubkey: toBuffer(currentAuthorityDerivedKeyOwnerPubkey.toBuffer()),
          currentAuthorityDerivedKeySeed,
          newAuthorized: toBuffer(newAuthorizedPubkey.toBuffer()),
          voteAuthorizationType: voteAuthorizationType.index
        }
      });
      var keys = [{
        pubkey: votePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: SYSVAR_CLOCK_PUBKEY,
        isSigner: false,
        isWritable: false
      }, {
        pubkey: currentAuthorityDerivedKeyBasePubkey,
        isSigner: true,
        isWritable: false
      }];
      return new Transaction().add({
        keys,
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a transaction to withdraw from a Vote account.
     */
  }, {
    key: "withdraw",
    value: function withdraw(params) {
      var votePubkey = params.votePubkey, authorizedWithdrawerPubkey = params.authorizedWithdrawerPubkey, lamports = params.lamports, toPubkey = params.toPubkey;
      var type2 = VOTE_INSTRUCTION_LAYOUTS.Withdraw;
      var data = encodeData(type2, {
        lamports
      });
      var keys = [{
        pubkey: votePubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: toPubkey,
        isSigner: false,
        isWritable: true
      }, {
        pubkey: authorizedWithdrawerPubkey,
        isSigner: true,
        isWritable: false
      }];
      return new Transaction().add({
        keys,
        programId: this.programId,
        data
      });
    }
    /**
     * Generate a transaction to withdraw safely from a Vote account.
     *
     * This function was created as a safeguard for vote accounts running validators, `safeWithdraw`
     * checks that the withdraw amount will not exceed the specified balance while leaving enough left
     * to cover rent. If you wish to close the vote account by withdrawing the full amount, call the
     * `withdraw` method directly.
     */
  }, {
    key: "safeWithdraw",
    value: function safeWithdraw(params, currentVoteAccountBalance, rentExemptMinimum) {
      if (params.lamports > currentVoteAccountBalance - rentExemptMinimum) {
        throw new Error("Withdraw will leave vote account with insuffcient funds.");
      }
      return VoteProgram2.withdraw(params);
    }
  }]);
  return VoteProgram2;
}();
VoteProgram.programId = new PublicKey("Vote111111111111111111111111111111111111111");
VoteProgram.space = 3731;
var VALIDATOR_INFO_KEY = new PublicKey("Va1idator1nfo111111111111111111111111111111");
var InfoString = type({
  name: string(),
  website: optional(string()),
  details: optional(string()),
  keybaseUsername: optional(string())
});
var VOTE_PROGRAM_ID = new PublicKey("Vote111111111111111111111111111111111111111");
var VoteAccountLayout = BufferLayout.struct([
  publicKey("nodePubkey"),
  publicKey("authorizedWithdrawer"),
  BufferLayout.u8("commission"),
  BufferLayout.nu64(),
  // votes.length
  BufferLayout.seq(BufferLayout.struct([BufferLayout.nu64("slot"), BufferLayout.u32("confirmationCount")]), BufferLayout.offset(BufferLayout.u32(), -8), "votes"),
  BufferLayout.u8("rootSlotValid"),
  BufferLayout.nu64("rootSlot"),
  BufferLayout.nu64(),
  // authorizedVoters.length
  BufferLayout.seq(BufferLayout.struct([BufferLayout.nu64("epoch"), publicKey("authorizedVoter")]), BufferLayout.offset(BufferLayout.u32(), -8), "authorizedVoters"),
  BufferLayout.struct([BufferLayout.seq(BufferLayout.struct([publicKey("authorizedPubkey"), BufferLayout.nu64("epochOfLastAuthorizedSwitch"), BufferLayout.nu64("targetEpoch")]), 32, "buf"), BufferLayout.nu64("idx"), BufferLayout.u8("isEmpty")], "priorVoters"),
  BufferLayout.nu64(),
  // epochCredits.length
  BufferLayout.seq(BufferLayout.struct([BufferLayout.nu64("epoch"), BufferLayout.nu64("credits"), BufferLayout.nu64("prevCredits")]), BufferLayout.offset(BufferLayout.u32(), -8), "epochCredits"),
  BufferLayout.struct([BufferLayout.nu64("slot"), BufferLayout.nu64("timestamp")], "lastTimestamp")
]);

// chains/solana/solflare.js
var import_bs582 = __toESM(require_bs583());
var BufferFill = require_buffer().Buffer;
var SolflareWallet = class {
  constructor(rpc) {
    if (typeof Buffer == "undefined") {
      window.Buffer = BufferFill;
    }
    this.provider = window.solflare;
    this.connection = new Connection(rpc);
  }
  async connect() {
    if (!this.provider.isConnected) {
      try {
        const resp = await this.provider.connect();
        return true;
      } catch (e) {
        return false;
      }
    } else {
      return true;
    }
  }
  async signature(data) {
    const encodedMessage = new TextEncoder().encode(data);
    const signedMessage = await this.provider.signMessage(
      encodedMessage,
      "utf8"
    );
    return import_bs582.default.encode(signedMessage.signature);
  }
  async sign(transaction) {
    const signedTransaction = await this.provider.signTransaction(transaction);
    return signedTransaction;
  }
  async send(signedTransaction, options) {
    const signature = await this.connection.sendRawTransaction(
      signedTransaction.serialize(),
      options
    );
    if (options.waitForFinality) {
      await this.waitForFinality(signature);
    }
    return signature;
  }
  async signAndSend(transaction, options) {
    const signedTransaction = await this.provider.signTransaction(transaction);
    const signature = await this.connection.sendRawTransaction(
      signedTransaction.serialize(),
      options
    );
    if (options.waitForFinality) {
      await this.waitForFinality(signature);
    }
    return signature;
  }
  async sendCoins(from, to, amount, options) {
    let fromPub = new PublicKey(from);
    let toPub = new PublicKey(to);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromPub,
        toPubkey: toPub,
        lamports: BigInt(amount)
      })
    );
    transaction.feePayer = fromPub;
    const anyTransaction = transaction;
    anyTransaction.recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash;
    const signedTransaction = await this.provider.signTransaction(transaction);
    const signature = await this.connection.sendRawTransaction(
      signedTransaction.serialize(),
      options
    );
    if (options.waitForFinality) {
      await this.waitForFinality(signature);
    }
    return signature;
  }
  async waitForFinality(transactionHash) {
    try {
      await this.connection.confirmTransaction(
        { signature: transactionHash },
        "finalized"
      );
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  async getActiveAddress() {
    return this.provider.publicKey.toString();
  }
  isConnected() {
    return this.provider.isConnected;
  }
};
export {
  SolflareWallet as default
};
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

@babel/runtime/helpers/regeneratorRuntime.js:
  (*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

@solana/buffer-layout/lib/Layout.js:
  (**
   * Support for translating between Uint8Array instances and JavaScript
   * native types.
   *
   * {@link module:Layout~Layout|Layout} is the basis of a class
   * hierarchy that associates property names with sequences of encoded
   * bytes.
   *
   * Layouts are supported for these scalar (numeric) types:
   * * {@link module:Layout~UInt|Unsigned integers in little-endian
   *   format} with {@link module:Layout.u8|8-bit}, {@link
   *   module:Layout.u16|16-bit}, {@link module:Layout.u24|24-bit},
   *   {@link module:Layout.u32|32-bit}, {@link
   *   module:Layout.u40|40-bit}, and {@link module:Layout.u48|48-bit}
   *   representation ranges;
   * * {@link module:Layout~UIntBE|Unsigned integers in big-endian
   *   format} with {@link module:Layout.u16be|16-bit}, {@link
   *   module:Layout.u24be|24-bit}, {@link module:Layout.u32be|32-bit},
   *   {@link module:Layout.u40be|40-bit}, and {@link
   *   module:Layout.u48be|48-bit} representation ranges;
   * * {@link module:Layout~Int|Signed integers in little-endian
   *   format} with {@link module:Layout.s8|8-bit}, {@link
   *   module:Layout.s16|16-bit}, {@link module:Layout.s24|24-bit},
   *   {@link module:Layout.s32|32-bit}, {@link
   *   module:Layout.s40|40-bit}, and {@link module:Layout.s48|48-bit}
   *   representation ranges;
   * * {@link module:Layout~IntBE|Signed integers in big-endian format}
   *   with {@link module:Layout.s16be|16-bit}, {@link
   *   module:Layout.s24be|24-bit}, {@link module:Layout.s32be|32-bit},
   *   {@link module:Layout.s40be|40-bit}, and {@link
   *   module:Layout.s48be|48-bit} representation ranges;
   * * 64-bit integral values that decode to an exact (if magnitude is
   *   less than 2^53) or nearby integral Number in {@link
   *   module:Layout.nu64|unsigned little-endian}, {@link
   *   module:Layout.nu64be|unsigned big-endian}, {@link
   *   module:Layout.ns64|signed little-endian}, and {@link
   *   module:Layout.ns64be|unsigned big-endian} encodings;
   * * 32-bit floating point values with {@link
   *   module:Layout.f32|little-endian} and {@link
   *   module:Layout.f32be|big-endian} representations;
   * * 64-bit floating point values with {@link
   *   module:Layout.f64|little-endian} and {@link
   *   module:Layout.f64be|big-endian} representations;
   * * {@link module:Layout.const|Constants} that take no space in the
   *   encoded expression.
   *
   * and for these aggregate types:
   * * {@link module:Layout.seq|Sequence}s of instances of a {@link
   *   module:Layout~Layout|Layout}, with JavaScript representation as
   *   an Array and constant or data-dependent {@link
   *   module:Layout~Sequence#count|length};
   * * {@link module:Layout.struct|Structure}s that aggregate a
   *   heterogeneous sequence of {@link module:Layout~Layout|Layout}
   *   instances, with JavaScript representation as an Object;
   * * {@link module:Layout.union|Union}s that support multiple {@link
   *   module:Layout~VariantLayout|variant layouts} over a fixed
   *   (padded) or variable (not padded) span of bytes, using an
   *   unsigned integer at the start of the data or a separate {@link
   *   module:Layout.unionLayoutDiscriminator|layout element} to
   *   determine which layout to use when interpreting the buffer
   *   contents;
   * * {@link module:Layout.bits|BitStructure}s that contain a sequence
   *   of individual {@link
   *   module:Layout~BitStructure#addField|BitField}s packed into an 8,
   *   16, 24, or 32-bit unsigned integer starting at the least- or
   *   most-significant bit;
   * * {@link module:Layout.cstr|C strings} of varying length;
   * * {@link module:Layout.blob|Blobs} of fixed- or variable-{@link
   *   module:Layout~Blob#length|length} raw data.
   *
   * All {@link module:Layout~Layout|Layout} instances are immutable
   * after construction, to prevent internal state from becoming
   * inconsistent.
   *
   * @local Layout
   * @local ExternalLayout
   * @local GreedyCount
   * @local OffsetLayout
   * @local UInt
   * @local UIntBE
   * @local Int
   * @local IntBE
   * @local NearUInt64
   * @local NearUInt64BE
   * @local NearInt64
   * @local NearInt64BE
   * @local Float
   * @local FloatBE
   * @local Double
   * @local DoubleBE
   * @local Sequence
   * @local Structure
   * @local UnionDiscriminator
   * @local UnionLayoutDiscriminator
   * @local Union
   * @local VariantLayout
   * @local BitStructure
   * @local BitField
   * @local Boolean
   * @local Blob
   * @local CString
   * @local Constant
   * @local bindConstructorLayout
   * @module Layout
   * @license MIT
   * @author Peter A. Bigot
   * @see {@link https://github.com/pabigot/buffer-layout|buffer-layout on GitHub}
   *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/modular.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/curve.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/edwards.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/ed25519.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/weierstrass.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/_shortw_utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/secp256k1.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
