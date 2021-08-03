(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_screens_AuthenticatedApp_js"],{

/***/ "./resources/js/screens/AuthenticatedApp.js":
/*!**************************************************!*\
  !*** ./resources/js/screens/AuthenticatedApp.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _context_AuthProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/AuthProvider */ "./resources/js/context/AuthProvider.js");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components */ "./resources/js/components/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");






function AuthenticatedApp() {
  var _useAuth = (0,_context_AuthProvider__WEBPACK_IMPORTED_MODULE_1__.useAuth)(),
      logout = _useAuth.logout;

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_components__WEBPACK_IMPORTED_MODULE_2__.Box, {
    backgroundColor: "darkerGrey",
    height: "100vh",
    flexDirection: "column",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_2__.Typography, {
      color: "white",
      type: "H1",
      children: "Authenticated!"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      maxWidth: "20%",
      onClick: logout,
      children: "Logout"
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthenticatedApp);

/***/ })

}]);