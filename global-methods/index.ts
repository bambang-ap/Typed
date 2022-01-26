/// <reference path="index.d.ts" />

import {
  Platform,
  UIManager,
  LayoutAnimation,
  Alert as AlertRN,
} from 'react-native';
import { cloneElement, isValidElement } from 'react';

export enum _STATUS_CODE {
  SUCCESS = 200,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  INTERNAL_ERROR = 500,
}

globalThis.STATUS_CODE = _STATUS_CODE

globalThis.prettyConsole = (...objects) => {
  objects.map(d =>
    typeof d === 'object'
      ? console.log(JSON.stringify(d, null, 4))
      : console.log(d),
  );
};

globalThis.BGMap = props => {
  const { backgroundColors, backgroundColor: dColor } = props;
  return (
    backgroundColors && dColor ? backgroundColors[dColor] || dColor : dColor
  ) as string;
};

globalThis.SizeMap = props => {
  const { sizes, size: dSize } = props;
  return (sizes && dSize ? sizes[dSize as string] || dSize : dSize) as number;
};

globalThis.FontMap = props => {
  const { fonts, font: dFont } = props;
  return (fonts && dFont ? fonts[dFont] || dFont : dFont) as string;
};

globalThis.animate = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

globalThis.ColorMap = props => {
  const { colors, color: dColor } = props;
  return (colors && dColor ? colors[dColor] || dColor : dColor) as string;
};

globalThis.BGMap = props => {
  const { backgroundColors, backgroundColor: dColor } = props;
  return (
    backgroundColors && dColor ? backgroundColors[dColor] || dColor : dColor
  ) as string;
};

globalThis.SizeMap = props => {
  const { sizes, size: dSize } = props;
  return (sizes && dSize ? sizes[dSize as string] || dSize : dSize) as number;
};

globalThis.FontMap = props => {
  const { fonts, font: dFont } = props;
  return (fonts && dFont ? fonts[dFont] || dFont : dFont) as string;
};

globalThis.noop = function () {
  return null;
};

globalThis.noopVoid = function () { };

globalThis.Alert = function (message, optionsOrTitle = 'Alert') {
  if (typeof optionsOrTitle === 'string') {
    AlertRN.alert(optionsOrTitle, message);
  } else {
    const {
      buttons = [['Ok']],
      title = 'Alert',
      cancelable,
      onDismiss,
    } = optionsOrTitle;
    AlertRN.alert(
      title,
      message,
      buttons.map(btn => {
        const [text, onPress, style] = btn || [];
        return { onPress, style, text };
      }),
      { cancelable, onDismiss },
    );
  }
};

Array.prototype.kMap = function (callback) {
  const arr = this;
  return arr.map(function (data, index) {
    const isLast = index + 1 === arr.length;
    let cb = callback(data, index, isLast);
    if (isValidElement(cb)) {
      cb = cloneElement(cb, { key: index.toString() });
    }
    return cb as JSX.Element;
  });
};

Array.prototype.toRnStyle = function () {
  const styles = this.reduce((styles, style) => {
    const keys = Object.keys(style || {});
    if (keys.includes('0')) {
      return (styles = [...styles, ...keys.map(key => style[key], {})]);
    } else {
      styles.push(style);
    }
    return styles;
  }, []);
  return styles;
};

Number.prototype.humanFileSize = function (si = false, dp = 1) {
  let bytes = this as number;
  const thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) return bytes + ' B';
  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;
  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );
  return bytes.toFixed(dp) + ' ' + units[u];
};

Number.prototype.getPercentage = function calculate(total = 0, dp = 2) {
  const current = this as number;
  return parseInt(((total / current) * 100).toFixed(3));
};

Number.prototype.ratio = function (ratio) {
  ratio = ratio.replace(/\:/g, '/');
  const height = eval(this.toString());
  const width = height * eval(ratio);
  return { height, width };
};

Number.prototype.toAlphabet = function () {
  let s = '',
    n = (this as number) - 1;
  const ordA = 'a'.charCodeAt(0);
  const ordZ = 'z'.charCodeAt(0);
  const len = ordZ - ordA + 1;
  while (n >= 0) {
    s = String.fromCharCode((n % len) + ordA) + s;
    n = Math.floor(n / len) - 1;
  }
  return s;
};

Number.prototype.toRoman = function () {
  const roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let number = this as number,
    result = '';
  if (number > 0 && number < 4000) {
    let key: keyof typeof roman;
    for (key in roman) {
      const h = roman[key];
      while (h <= number) {
        result += key;
        number -= h;
      }
    }
    return result;
  } else {
    throw new Error(
      'Error. Number should be greater than 0 and less than 4000.',
    );
  }
};

const caseReplacer = (str: string, separator: '_' | '-') => {
  const arr = str.split(separator);
  const capital = arr.map((item, index) =>
    index
      ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
      : item.toLowerCase(),
  );
  const toCase = capital.join('');
  return toCase;
};

const caseReplacerFromPascal = function (str: string, separator: string) {
  return str.split(/(?=[A-Z])/).join(separator);
};

const caseReplacerFromCamel = function (str: string, separator: '-' | '_') {
  return str
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, `$1${separator}$2`)
    .toLowerCase();
};

String.prototype.extractNumber = function () {
  const str = this.toString()
  try {
    const matches = str.match(/(-?|-\s+?)\d+/g) || [];
    if (matches.length > 0) {
      const num = matches.join('').replace(/\s/g, '')
      return parseInt(num)
    }
  } catch (e) {
    return 0
  }
  return 0
}

String.prototype.pascalToSpace = function () {
  return caseReplacerFromPascal(this as string, ' ');
};

String.prototype.kebabToCamel = function () {
  const camelCase = caseReplacer(this as string, '-');
  return camelCase;
};

String.prototype.snakeToCamel = function () {
  const camelCase = caseReplacer(this as string, '_');
  return camelCase;
};

String.prototype.camelToSnake = function () {
  const snakeCase = caseReplacerFromCamel(this as string, '_');
  return snakeCase;
};

String.prototype.camelToKebab = function () {
  const kebabCase = caseReplacerFromCamel(this as string, '-');
  return kebabCase;
};

String.prototype.uuid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : r & (0x3 | 0x8);
    return v.toString(16);
  });
};

String.prototype.ucfirst = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.lcfirst = function () {
  return this.charAt(0).toLowerCase() + this.slice(1);
};

String.prototype.ucwords = function () {
  return this.replace(/\b[a-z]/g, function (letter) {
    return letter.toUpperCase();
  });
};

String.prototype.trimSpaces = function () {
  return this.trim().replace(/[\s]{2,}/gi, ' ');
};

String.prototype.removeSpecialChar = function () {
  return this.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
};

Math.randomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { };
