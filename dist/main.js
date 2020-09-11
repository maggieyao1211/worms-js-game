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

/***/ "./src/banana.js":
/*!***********************!*\
  !*** ./src/banana.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nclass Banana {\n    constructor(img, minion, dirMultiplier) {\n        this.dirMultiplier = dirMultiplier;\n        this.posX = dirMultiplier === 1 ? minion.posX - 50 : minion.posX + 80;\n        this.posY = minion.posY - 30;\n        this.releaseTime = new Date().getTime() / 1000;\n        this.releaseVel = 30;\n        this.img = img;\n        this.width = 70;\n        this.height = 60;\n    }\n\n    draw(ctx) {\n        const currentTime = new Date().getTime() / 1000;\n        const timeDiff = currentTime - this.releaseTime;\n        this.posX -= 7.5 * timeDiff * this.dirMultiplier;\n        const currentVel = this.releaseVel - 26 * timeDiff;\n        this.posY -= currentVel * timeDiff;\n        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Banana);\n\n//# sourceURL=webpack:///./src/banana.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _minion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./minion */ \"./src/minion.js\");\n/* harmony import */ var _banana__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./banana */ \"./src/banana.js\");\n/* harmony import */ var _worm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./worm */ \"./src/worm.js\");\n\n\n\n\nclass Game {\n  constructor(canvas) {\n    this.canvas = canvas;\n    this.ctx = canvas.getContext('2d');\n    this.score = 0;\n    this.kills = 0;\n\n    const minionImg = new Image();\n    minionImg.src = './dist/assets/minion.png';\n    this.minion = new _minion__WEBPACK_IMPORTED_MODULE_0__[\"default\"](minionImg);\n\n    this.bananas = [];\n\n    this.worms = [];\n\n    this.lastWormBornTime = new Date().getTime() / 1000;\n    this.lastWormWithGolfBornTime = new Date().getTime() / 1000;\n\n    document.addEventListener('keydown', e => this.keyDownHandler(e), false);\n\n    this.animate = this.animate.bind(this)\n    requestAnimationFrame(this.animate);\n  }\n\n  keyDownHandler(e) {\n    e.preventDefault();\n    const keyCode = e.keyCode;\n    switch (keyCode) {\n        case 74: // 'J'\n        case 75: // 'K'\n          const img = new Image();\n          img.src = './dist/assets/banana.png';\n          const banana = new _banana__WEBPACK_IMPORTED_MODULE_1__[\"default\"](img, this.minion, keyCode === 74 ? 1 : -1);\n          this.bananas.push(banana);\n          break;\n        default:\n          break;\n    }\n  } \n\n  animate(time) {\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    this.minion.draw(this.ctx);\n\n    this.ctx.fillStyle = \"Yellow\";\n    this.ctx.font = \"20px 'Grandstander', cursive\";\n    this.ctx.fillRect(50, 50, this.minion.health, 30);\n    this.ctx.fillText(\"Minion Health\", 50, 35);\n\n    this.ctx.fillText(\"Score:\", 50, 115);\n    this.ctx.fillText(this.score, 115, 115);\n\n    this.ctx.fillText(\"Kills:\", 50, 150);\n    this.ctx.fillText(this.kills, 115, 150);\n\n    // clear outdated bananas\n    const currentTime = new Date().getTime() / 1000;\n    while (this.bananas.length > 0 && (currentTime - this.bananas[0].releaseTime) >= 20) {\n      this.bananas.shift();\n    }\n\n    this.bananas.forEach(banana => banana.draw(this.ctx, time));\n\n    // clear outdated worms\n    while (this.worms.length > 0 && (currentTime - this.worms[0].bornTime) >= 60) {\n      this.worms.shift();\n    }\n\n    if (currentTime - this.lastWormBornTime >= 5) {\n      this.lastWormBornTime = currentTime;\n      const wormImg = new Image();\n      wormImg.src = './dist/assets/worm.png';\n      this.worms.push(new _worm__WEBPACK_IMPORTED_MODULE_2__[\"default\"](wormImg, 2400, 810, 100, 80, 50, 1));\n    }\n    if (currentTime - this.lastWormWithGolfBornTime >= 4) {\n      this.lastWormWithGolfBornTime = currentTime;\n      const wormImg = new Image();\n      wormImg.src = './dist/assets/worm_with_golf.png';\n      this.worms.push(new _worm__WEBPACK_IMPORTED_MODULE_2__[\"default\"](wormImg, 0, 820, 140, 120, 40, -1));\n    }\n\n    this.deadWorms = [];\n    this.worms.forEach((worm, i) => {\n      this.bananas.forEach(banana => {\n        if (worm.collideWithBanana(banana)) {\n          this.deadWorms.push(i);\n          this.score += worm.score;\n        }\n      });\n      if (this.minion.collideWithWorm(worm)) {\n        this.deadWorms.push(i);\n        this.minion.health -= 100;\n      }\n    });\n\n    const filteredWorms = this.worms.filter((_worm, i) => !this.deadWorms.includes(i));\n    this.kills += this.worms.length - filteredWorms.length;\n    this.worms = filteredWorms;\n    this.deadWorms = [];\n\n    this.worms.forEach(worm => worm.draw(this.ctx));\n\n\n\n    requestAnimationFrame(this.animate);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n\nclass Minion {\n    constructor(img) {\n        this.posX = 1100;\n        this.posY = 770;\n        this.horizVel = 0;\n        this.vertVel = 0;\n        this.falling = false;\n        this.keyDownHandler = this.keyDownHandler.bind(this);\n        this.keyUpHandler = this.keyUpHandler.bind(this);\n        this.health = 500;\n        this.width = 140;\n        this.height = 120;\n        this.img = img;\n        \n        document.addEventListener('keydown', e => this.keyDownHandler(e), false);\n        document.addEventListener('keyup', e => this.keyUpHandler(e), false);\n    }\n\n    draw(ctx) {\n        if (this.isInMinionMoveRange()) {\n            this.posX += this.horizVel;\n        }\n        if (this.vertVel != 0 && this.posY > this.destPosY && !this.falling) {\n            this.posY -= 0.5 * this.vertVel;\n        } \n        if (this.vertVel != 0 && this.posY === this.destPosY || this.falling) {\n            this.posY += 0.5 * this.vertVel;\n            if (this.onGround()) {\n                this.falling = false;\n                this.vertVel = 0;\n            } else {\n                this.falling = true;\n            }\n        }\n        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);\n    }\n\n    keyDownHandler(e) {\n        e.preventDefault();\n        const keyCode = e.keyCode;\n        switch (keyCode) {\n            case 65: // 'A'\n            case 68: // 'D'\n                this.horizVel = 10 * (keyCode === 65 ? -1 : 1);\n                break;\n            case 87: // 'W\n                if (this.vertVel === 0) {\n                    this.vertVel = 10;\n                    this.destPosY = this.posY - 150; \n                }\n                break;\n            default:\n                break;\n        }\n    }\n\n    keyUpHandler(e) {\n        e.preventDefault();\n        const keyCode = e.keyCode;\n        switch (keyCode) {\n            case 65: // 'A'\n            case 68: // 'D'\n                this.horizVel = 0;\n                break;\n            default:\n                break;\n        }\n    }\n\n    isInMinionMoveRange() {\n        return this.horizVel < 0 ? this.posX >= 780 : this.posX <= 1380;\n    }\n\n    onGround() {\n        return this.posY === 780;\n    }\n\n    collideWithWorm(worm) {\n        return worm.posX < this.posX + this.width && worm.posX + worm.width > this.posX && \n            worm.posY < this.posY + this.height && worm.posY + worm.height > this.posY;\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Minion);\n\n//# sourceURL=webpack:///./src/minion.js?");

/***/ }),

/***/ "./src/worm.js":
/*!*********************!*\
  !*** ./src/worm.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nclass Worm {\n    constructor(img, posX, posY, width, height, score, dirMultiplier) {\n        this.posX = posX;\n        this.posY = posY;\n        this.dirMultiplier = dirMultiplier;\n        this.img = img;\n        this.bornTime = new Date().getTime() / 1000;\n        this.width = width;\n        this.height = height;\n        this.score = score;\n    }\n\n    draw(ctx) {\n        this.posX -= 1 * this.dirMultiplier;\n        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);\n    }\n\n    collideWithBanana(banana) {\n        return banana.posX < this.posX + this.width && banana.posX + banana.width > this.posX && \n            banana.posY < this.posY + this.height && banana.posY + banana.height > this.posY;\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Worm);\n\n//# sourceURL=webpack:///./src/worm.js?");

/***/ })

/******/ });