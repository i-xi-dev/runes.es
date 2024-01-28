import {
  BufferUtils,
  ByteOrder,
  CodePoint,
  NumberEx,
  Rune,
  SafeInteger,
  StringEx,
  Uint8,
  Utf16,
  Utf32,
} from "../deps.ts";

type _Utf8Encoded = BufferSource | Iterable<number>;
type _Utf16Encoded = BufferSource | Iterable<number>;
type _Utf32Encoded = BufferSource | Iterable<number>;

let _utf8Decoder: TextDecoder;
function _utf8Decode(bytes: BufferSource): string {
  if (!_utf8Decoder) {
    _utf8Decoder = new TextDecoder("utf-8", { fatal: true });
  }
  return _utf8Decoder.decode(bytes);
}

let _utf8Encoder: TextEncoder;
function _utf8Encode(str: string): Uint8Array {
  if (!_utf8Encoder) {
    _utf8Encoder = new TextEncoder();
  }
  return _utf8Encoder.encode(str);
}

let _utf16beDecoder: TextDecoder;
function _utf16beDecode(bytes: BufferSource): string {
  if (!_utf16beDecoder) {
    _utf16beDecoder = new TextDecoder("utf-16be", { fatal: true });
  }
  return _utf16beDecoder.decode(bytes);
}

let _utf16leDecoder: TextDecoder;
function _utf16leDecode(bytes: BufferSource): string {
  if (!_utf16leDecoder) {
    _utf16leDecoder = new TextDecoder("utf-16le", { fatal: true });
  }
  return _utf16leDecoder.decode(bytes);
}

let _utf16beEncoder: Utf16.Be.Encoder;
function _utf16beEncode(str: string): Uint8Array {
  if (!_utf16beEncoder) {
    _utf16beEncoder = new Utf16.Be.Encoder({ fatal: true });
  }
  return _utf16beEncoder.encode(str);
}

let _utf16leEncoder: Utf16.Le.Encoder;
function _utf16leEncode(str: string): Uint8Array {
  if (!_utf16leEncoder) {
    _utf16leEncoder = new Utf16.Le.Encoder({ fatal: true });
  }
  return _utf16leEncoder.encode(str);
}

let _utf32beDecoder: Utf32.Be.Decoder;
function _utf32beDecode(bytes: BufferSource): string {
  if (!_utf32beDecoder) {
    _utf32beDecoder = new Utf32.Be.Decoder({ fatal: true });
  }
  return _utf32beDecoder.decode(bytes);
}

let _utf32leDecoder: Utf32.Be.Decoder;
function _utf32leDecode(bytes: BufferSource): string {
  if (!_utf32leDecoder) {
    _utf32leDecoder = new Utf32.Le.Decoder({ fatal: true });
  }
  return _utf32leDecoder.decode(bytes);
}

let _utf32beEncoder: Utf32.Be.Encoder;
function _utf32beEncode(str: string): Uint8Array {
  if (!_utf32beEncoder) {
    _utf32beEncoder = new Utf32.Be.Encoder({ fatal: true });
  }
  return _utf32beEncoder.encode(str);
}

let _utf32leEncoder: Utf32.Le.Encoder;
function _utf32leEncode(str: string): Uint8Array {
  if (!_utf32leEncoder) {
    _utf32leEncoder = new Utf32.Le.Encoder({ fatal: true });
  }
  return _utf32leEncoder.encode(str);
}

export class RuneSequence {
  readonly #runes: Array<Rune>;

  private constructor(source: string) {
    this.#runes = [...source];
    Object.freeze(this);
  }

  get runeCount(): SafeInteger {
    return this.#runes.length;
  }

  get charCount(): SafeInteger {
    let count = 0;
    for (const rune of this.#runes) {
      count = count + rune.length;
    }
    return count;
  }

  static fromString(source: string): RuneSequence {
    if (StringEx.isString(source)) {
      return new RuneSequence(source);
    }
    throw new TypeError("source");
  }

  toString(): string {
    return this.#runes.join("");
  }

  toJSON(): string {
    return this.toString();
  }

  //TODO options discardBom
  static fromUtf8Encoded(source: _Utf8Encoded): RuneSequence {
    if ((source instanceof ArrayBuffer) || ArrayBuffer.isView(source)) {
      return this.fromString(_utf8Decode(source));
    } else if (source) {
      const bytes = BufferUtils.fromUint8Iterable(source);
      return this.fromString(_utf8Decode(bytes));
    }
    throw new TypeError("source");
  }

  //TODO options discardBom
  toUtf8Encoded(): Uint8Array {
    return _utf8Encode(this.toString());
  }

  //TODO options discardBom
  static fromUtf16beEncoded(source: _Utf16Encoded): RuneSequence {
    if ((source instanceof ArrayBuffer) || ArrayBuffer.isView(source)) {
      return this.fromString(_utf16beDecode(source));
    } else if (source) {
      const bytes = BufferUtils.fromUint16Iterable(
        source,
        ByteOrder.BIG_ENDIAN,
      );
      return this.fromString(_utf16beDecode(bytes));
    }
    throw new TypeError("source");
  }

  //TODO options discardBom
  static fromUtf16leEncoded(source: _Utf16Encoded): RuneSequence {
    if ((source instanceof ArrayBuffer) || ArrayBuffer.isView(source)) {
      return this.fromString(_utf16leDecode(source));
    } else if (source) {
      const bytes = BufferUtils.fromUint16Iterable(
        source,
        ByteOrder.LITTLE_ENDIAN,
      );
      return this.fromString(_utf16leDecode(bytes));
    }
    throw new TypeError("source");
  }

  //TODO fromUtf16Encoded

  //TODO options discardBom
  toUtf16beEncoded(): Uint8Array {
    return _utf16beEncode(this.toString());
  }

  //TODO options discardBom
  toUtf16leEncoded(): Uint8Array {
    return _utf16leEncode(this.toString());
  }

  //TODO toUtf16Encoded

  //TODO options discardBom
  static fromUtf32beEncoded(source: _Utf32Encoded): RuneSequence {
    if ((source instanceof ArrayBuffer) || ArrayBuffer.isView(source)) {
      return this.fromString(_utf32beDecode(source));
    } else if (source) {
      const bytes = BufferUtils.fromUint32Iterable(
        source,
        ByteOrder.BIG_ENDIAN,
      );
      return this.fromString(_utf32beDecode(bytes));
    }
    throw new TypeError("source");
  }

  //TODO options discardBom
  static fromUtf32leEncoded(source: _Utf32Encoded): RuneSequence {
    if ((source instanceof ArrayBuffer) || ArrayBuffer.isView(source)) {
      return this.fromString(_utf32leDecode(source));
    } else if (source) {
      const bytes = BufferUtils.fromUint32Iterable(
        source,
        ByteOrder.LITTLE_ENDIAN,
      );
      return this.fromString(_utf32leDecode(bytes));
    }
    throw new TypeError("source");
  }

  //TODO fromUtf32Encoded

  //TODO options discardBom
  toUtf32beEncoded(): Uint8Array {
    return _utf32beEncode(this.toString());
  }

  //TODO options discardBom
  toUtf32leEncoded(): Uint8Array {
    return _utf32leEncode(this.toString());
  }

  //TODO toUtf32Encoded

  /*










  */

  //XXX fromxxxArray

  //XXX decodeFrom

  //XXX toCharCodesArray

  toCodePoints(): Iterable<CodePoint> {
    return (function* (runes: Array<Rune>) {
      for (const rune of runes) {
        yield rune.codePointAt(0) as number;
      }
    })([...this.#runes]);
  }

  toCodePointArray(): Array<number> {
    return this.#runes.map((rune) => rune.codePointAt(0) as number);
  }

  //XXX fromStream

  //XXX duplicate

  //XXX subsequence

  //XXX equals

  //XXX startsWith

  at(index: number): Rune | undefined {
    return this.#runes.at(index);
  }

  [Symbol.iterator](): IterableIterator<Rune> {
    return this.#runes[Symbol.iterator]();
  }
}

//   //TODO
//   // export function isRuneSequence(test: unknown): test is RuneSequence {
//   //   if (StringEx.isString(test)) {
//   //     return test.isWellFormed();
//   //   }
//   //   return false;
//   // }

//   export function* segment(
//     input: RuneSequence,
//     runeCount: SafeInteger,
//     paddingRune?: Rune,
//   ): Generator<RuneSequence, void, void> {
//     if (StringEx.isString(input) !== true) {
//       throw new TypeError("input");
//     }
//     if (SafeInteger.isPositiveSafeInteger(runeCount) !== true) {
//       throw new TypeError("runeCount");
//     }
//     const paddingIsString = StringEx.isString(paddingRune);
//     if (paddingIsString === true) {
//       if (Rune.isRune(paddingRune) !== true) {
//         throw new TypeError("paddingRune");
//       }
//     }

//     const runes = [...input];
//     for (let i = 0; i < runes.length; i = i + runeCount) {
//       const s = runes.slice(i, i + runeCount);
//       const d = runeCount - s.length;

//       let r = s.join("");
//       if ((d > 0) && (paddingIsString === true)) {
//         r = r + (paddingRune as string).repeat(d);
//       }
//       yield new RuneSequence(r);
//     }
//   }
