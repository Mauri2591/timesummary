"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var books = [{
  id: 1000,
  title: 'La Insoportabilidad de Leer Esto',
  year: 1981
}, {
  id: 2000,
  title: 'La Conjura de los Recios',
  year: 1978
}, {
  id: 3000,
  title: 'El Señor de los Ruidillos',
  year: 2008
}, {
  id: 4000,
  title: 'El Almuerzo Vestido',
  year: 2001
}];
var result = books.reduce(function (accumulator, element, index) {
  return _objectSpread({}, accumulator, _defineProperty({}, element.id, element));
}, {});
console.log(result);