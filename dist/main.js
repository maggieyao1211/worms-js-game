/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _minion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./minion */ \"./src/minion.js\");\n\n\nclass Game {\n    constructor(canvas) {\n        this.canvas = canvas;\n        const minionImg = new Image();\n        minionImg.src = './dist/assets/minions.png';\n        this.minion = new _minion__WEBPACK_IMPORTED_MODULE_0__[\"default\"](minionImg);\n        this.animate = this.animate.bind(this)\n        requestAnimationFrame(this.animate.bind(this));\n    }\n\n  animate(time) {\n    const ctx = this.canvas.getContext('2d');\n    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    this.minion.draw(ctx, time);\n    requestAnimationFrame(this.animate);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const canvas = document.getElementById('battlefield');\n    const game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/minion.js":
/*!***********************!*\
  !*** ./src/minion.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nclass Minion {\n    constructor(img) {\n        this.posX = 1080;\n        this.posY = 780;\n        this.horizVel = 0;\n        this.vertVel = 0;\n        this.falling = false;\n        this.keyDownHandler = this.keyDownHandler.bind(this);\n        this.keyUpHandler = this.keyUpHandler.bind(this);\n        this.img = img;\n        // this.onGround = this.onGround.bind(this);\n        // this.minion = document.getElementById('minion');\n        // this.minionStyle = this.minion.style;\n        // this.minionStyle.left = '1800px';\n        // this.minionStyle.top = '600px';\n        \n        document.addEventListener('keydown', e => this.keyDownHandler(e), false);\n        document.addEventListener('keyup', e => this.keyUpHandler(e), false);\n    }\n\n    draw(ctx) {\n        if (this.destPosX && this.posX != this.destPosX && this.isInMinionMoveRange()) {\n            this.posX += 0.5 * this.horizVel;\n        }\n        if (this.vertVel != 0 && this.posY > this.destPosY && !this.falling) {\n            this.posY -= 0.5 * this.vertVel;\n        } \n        if (this.vertVel != 0 && this.posY === this.destPosY || this.falling) {\n            this.posY += 0.5 * this.vertVel;\n            if (this.onGround()) {\n                this.falling = false;\n                this.vertVel = 0;\n            } else {\n                this.falling = true;\n            }\n        }\n        ctx.drawImage(this.img, this.posX, this.posY, 140, 120);\n    }\n\n    keyDownHandler(e) {\n        e.preventDefault();\n        const keyCode = e.keyCode;\n        switch (keyCode) {\n            case 65: // 'A'\n            case 68: // 'D'\n                    this.horizVel = 10 * (keyCode === 65 ? -1 : 1);\n                    this.destPosX = this.posX + 100 * (keyCode === 65 ? -1 : 1);\n                break;\n            case 87: // 'W\n                if (this.vertVel === 0) {\n                    this.vertVel = 10;\n                    this.destPosY = this.posY - 150; \n                }\n                break;\n            default:\n                break;\n        }\n    }\n\n    keyUpHandler(e) {\n        e.preventDefault();\n    }\n\n    isInMinionMoveRange() {\n        return this.horizVel < 0 ? this.posX >= 780 : this.posX <= 1380;\n    }\n\n    onGround() {\n        return this.posY === 780;\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Minion);\n\n//# sourceURL=webpack:///./src/minion.js?");

/***/ })

/******/ });