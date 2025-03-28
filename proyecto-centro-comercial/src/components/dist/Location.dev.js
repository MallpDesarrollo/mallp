"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Location;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Location(_ref) {
  var onLocationUpdate = _ref.onLocationUpdate;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      coords = _useState2[0],
      setCoords = _useState2[1]; // console.log(`Location: ${onLocationUpdate}`);


  (0, _react.useEffect)(function () {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(function (position) {
        var _position$coords = position.coords,
            latitude = _position$coords.latitude,
            longitude = _position$coords.longitude;
        console.log("Obtenida ubicaci\xF3n: ".concat(latitude, ", ").concat(longitude));
        setCoords({
          lat: latitude,
          lng: longitude
        });

        if (onLocationUpdate) {
          onLocationUpdate({
            lat: latitude,
            lng: longitude
          });
        }
      }, function (error) {
        return console.error("Error obteniendo ubicación:", error);
      }, {
        enableHighAccuracy: true,
        maximumAge: 10000
      });
    } else {
      console.error("Geolocalización no disponible");
    }
  }, []);
  return null; // No renderiza nada, solo obtiene ubicación
}