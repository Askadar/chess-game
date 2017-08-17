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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _utils = __webpack_require__(2);

var _Cell = __webpack_require__(8);

var _Cell2 = _interopRequireDefault(_Cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const game = require('./game');
var k = 0;
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var numbers = [8, 7, 6, 5, 4, 3, 2, 1];
var pieces = [].concat(Array.from(document.getElementById('black').children).map(_utils.toPiece), Array.from(document.getElementById('white').children).map(_utils.toPiece));

var board = new Proxy(numbers.reverse().map(function (number) {
	k++;
	return letters.map(function (letter, j) {
		var y = (9 - number) * 5;
		var x = (j + 1) * 5;
		var piece = pieces.find(function (p) {
			return p.pos.x === x && p.pos.y === y;
		});
		return new _Cell2.default({
			cell: k++ % 2 === 0 ? 'Dunkel' : 'Hell',
			pos: { x: x, y: y },
			piece: piece,
			id: letter + number,
			svgElem: document.getElementById(letter + number)
		});
	});
}), {
	get: function get(target, name) {
		var commaSplit = name.split(',');
		target.pendingCleanup = target.pendingCleanup || [];
		if (!isNaN(commaSplit[0]) && !isNaN(commaSplit[1])) {
			var i = 8 - commaSplit[1] / 5;
			var j = commaSplit[0] / 5 - 1;
			if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
				var returnee = target[i][j];
				target.pendingCleanup.push(returnee);
				return returnee;
			}
			return;
		}
		if ( /* typeof name === 'string' && Math.abs(name) !== 1 && */!isNaN(name[1])) {
			var point = (0, _utils.boardIndexFromId)(name);
			return target[point.i][point.j];
		}
		return target[name];
	}
});
board.cleanUp = function () {
	board.pendingCleanup = board.pendingCleanup.filter(function (cell) {
		if (cell) cell.elem.classList.remove('possible-move') || cell.elem.classList.remove('consumable');
		return false;
	});
};

exports.default = board;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _board2 = __webpack_require__(0);

var _board3 = _interopRequireDefault(_board2);

var _moving = __webpack_require__(3);

var _domBinding = __webpack_require__(4);

var _utils = __webpack_require__(2);

var _locale = __webpack_require__(7);

var _locale2 = _interopRequireDefault(_locale);

var _regeneratorRuntime = __webpack_require__(14);

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var kingIconsSVG = function kingIconsSVG(kingValue) {
	return '<span class="icon">\n<svg preserveAspectRatio="xMidYMid meet"  viewBox="0 0 5 5">\n\t<use xlink:href="#' + (+kingValue === 1 ? 'koenigSchwarz_v' : 'koenigWeiss_v') + '"></use>\n</svg>\n</span>';
};
// const kingIconsSVG = {
// 	'-1': `<span class="icon">
// 	<svg preserveAspectRatio="xMidYMid meet"  viewBox="0 0 5 5">
// 		<use xlink:href="#koenigSchwarz_v"></use>
// 	</svg>
// </span>`,
// 	'1': `<span class="icon">
// 			<svg preserveAspectRatio="xMidYMid meet"  viewBox="0 0 5 5">
// 				<use xlink:href="#koenigSchwarz_v"></use>
// 			</svg>
// 		</span>`
// };

var game = {
	turn: 1,
	subscribers: [],
	kings: {},
	locale: _locale2.default.localized.kingMoves,
	get currentTurnColor() {
		return this.nMoves % 2 === 0 ? 1 : -1;
	},
	get enemyKingCell() {
		return _board3.default[this.enemyKing.pos.x + ', ' + this.enemyKing.pos.y];
	},
	get enemyKing() {
		return this.kings[-this.currentTurnColor];
	},
	get currentKingCell() {
		return _board3.default[this.currentKing.pos.x + ', ' + this.currentKing.pos.y];
	},
	get currentKing() {
		return this.kings[this.currentTurnColor];
	},
	set check(king) {
		if (king.inDanger) _domBinding.checkmateLabel.innerHTML = this.locale.check[king.color] + ' \u043A\u043E\u0440\u043E\u043B\u044C \u043F\u043E\u0434 \u0443\u0433\u0440\u043E\u0437\u043E\u0439';else _domBinding.checkmateLabel.innerHTML = this.locale.check[king.color] + ' \u043A\u043E\u0440\u043E\u043B\u044C \u0432 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438';
	},
	set mate(king) {
		console.warn(king.value, 'mated');
		if (king.inDanger) _domBinding.checkmateLabel.innerHTML = this.locale.mate[king.color] + ' \u043A\u043E\u0440\u043E\u043B\u044E \u043F\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D \u043C\u0430\u0442';else _domBinding.checkmateLabel.innerHTML = this.locale.check[king.color] + ' \u043A\u043E\u0440\u043E\u043B\u044C \u0432 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438';
	},
	checkKings: function checkKings() {
		var currentTurnColor = this.currentTurnColor,
		    currentKing = this.currentKing,
		    currentKingCell = this.currentKingCell;

		var beatableBy = currentKingCell.beatable(currentTurnColor);
		// console.log(beatableBy);
		// beatable === inDangerIfSideIs()
		currentKing.mated = false;
		currentKing.checked = beatableBy.length > 0;
		if (!currentKing.checked) return this.check = currentKing;
		var dangerousCellCanBeBeatean = beatableBy[0].beatable(-currentTurnColor).filter(function (cell) {
			return cell.piece.value !== 9;
		}).length > 0;
		var kingCanMoveElsewhere = _moving.getMovableCells[9](currentKing.pos, currentTurnColor).length > 0;
		var kingCanBeProtected = function kingCanBeProtected(_board, king) {
			return _board.map(function (boardRow) {
				return boardRow.filter(function (c) {
					return c.piece && c.piece.color === king.color && c.piece.value !== 9;
				});
			})
			// get cells with pieces matching king in question color
			.reduce(function (pieces, row) {
				return pieces.concat(row);
			}, [])
			// flatten array
			.some(function (_ref) {
				var piece = _ref.piece;
				return _moving.getMovableCells[piece.value](piece.pos, king.color).length > 0;
			});
		};
		// console.log(['t1', performance.now()]);
		// console.log(kingCanBeProtected(board, currentKing));
		// console.log(['t2', performance.now()]);
		// TODO test and get lag oopinion on slower devices
		// 6ms at 4GHz
		// around 60-120ms at 4GHz/10x chrome slowdown, lag feeled
		// around 30ms at 800MHz/5x chrome slowdown, lag feeled slightly
		// Lags only when king is really in danger, so not that bad (that's cause first grabbed piece usually can move and we drop checking others)
		if (beatableBy.length === 1) {
			this.check = currentKing;
			if (dangerousCellCanBeBeatean) return this.check = currentKing;else if (!kingCanMoveElsewhere && !dangerousCellCanBeBeatean && !kingCanBeProtected(_board3.default, currentKing)) return currentKing.mated = currentKing.color, this.mate = currentKing;
		} else if (beatableBy.length >= 2 && !kingCanMoveElsewhere) {
			currentKing.checked = true;
			return currentKing.mated = currentKing.color, this.mate = currentKing;
		} else if (beatableBy.length >= 2) return this.check = currentKing;
		return this.check = currentKing;
	},

	get nMoves() {
		return this._nMoves;
	},
	set nMoves(val) {
		var _this = this;

		this._nMoves = val;
		this.turn = (this._nMoves + 1) % 2 ? 1 : -1;

		var _checkKings = this.checkKings(),
		    checked = _checkKings.checked,
		    mated = _checkKings.mated;

		if (checked) {
			game.history.current.checkMove = true;
			if (mated) game.history.current.mateMove = true;
		}
		if (checked || mated) game.history.updateHistoryView();
		this.subscribers.forEach(function (sub) {
			return sub.callback(_this._nMoves, sub.el);
		});
		// TODO test binding turn to moves count
	},
	subscribe: function subscribe(el, callback) {
		this.subscribers.push({ el: el, callback: callback });
	},
	unsubscribe: function unsubscribe(el) {
		this.subscribers = this.subscribers.filter(function (entry) {
			return entry.el.id !== el.id;
		});
	},
	loadBoard: function loadBoard() {
		// TODO board loading;

		var board = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	},
	reset: function reset() {
		this.nMoves = 0;
		game.loadBoard();
	},

	history: {
		subscribers: [],
		subscribe: function subscribe(el, callback) {
			this.subscribers.push({ el: el, callback: callback });
		},

		before: [],
		current: null,
		after: [],
		updateHistoryView: function updateHistoryView() {
			var updatePacket = this.before.concat(this.current);
			this.subscribers.forEach(function (sub) {
				return sub.callback(updatePacket, sub.el);
			});
		},
		appendMove: function appendMove(from, to) {
			var _this2 = this;

			return _asyncToGenerator(_regeneratorRuntime2.default.mark(function _callee() {
				return _regeneratorRuntime2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								// TODO test moar, but it kinda working
								if (_this2.current) _this2.before.push(_this2.current);
								_this2.after = [];
								_context.next = 4;
								return _this2._move({ from: from, to: to });

							case 4:
								_this2.current = _context.sent;

								// console.log(this.current.transofrmed);
								game.nMoves += 1;
								_this2.updateHistoryView();

							case 7:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this2);
			}))();
		},
		forward: function forward() {
			var _this3 = this;

			var nMoves = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
			return _asyncToGenerator(_regeneratorRuntime2.default.mark(function _callee2() {
				return _regeneratorRuntime2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								if (!(_this3.after.length === 0)) {
									_context2.next = 2;
									break;
								}

								return _context2.abrupt('return', 'Illeagal time traveling!');

							case 2:
								nMoves = Math.min(_this3.after.length, nMoves);

							case 3:
								if (!(nMoves > 0)) {
									_context2.next = 12;
									break;
								}

								_this3.current && _this3.before.push(_this3.current);
								_this3.current = _this3.after.pop();
								_context2.next = 8;
								return _this3._move(_this3.current);

							case 8:
								game.nMoves += 1;
								nMoves--;
								_context2.next = 3;
								break;

							case 12:
								_this3.updateHistoryView();
								return _context2.abrupt('return', game.nMoves);

							case 14:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, _this3);
			}))();
		},
		_move: function _move(_ref2) {
			var _this4 = this;

			var from = _ref2.from,
			    to = _ref2.to,
			    transformed = _ref2.transformed;
			return _asyncToGenerator(_regeneratorRuntime2.default.mark(function _callee3() {
				var _to$pos, x, y, rook, fromValue, toValue, consumed, consumedPiece, prevMove, rooked, pipirka, selectionGroup;

				return _regeneratorRuntime2.default.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_to$pos = to.pos, x = _to$pos.x, y = _to$pos.y;
								rook = to.rook;
								fromValue = from.piece.value;
								toValue = to.piece ? to.piece.value : null;
								consumed = null;
								consumedPiece = null;
								prevMove = from.piece.lastMove;
								rooked = void 0;
								pipirka = void 0;


								from.piece.elem.animate(100).move(x, y);
								from.piece.lastMove = 'white';
								if (rook && from.piece && from.piece.value === 9) {
									if (rook.pos.x === 5) rooked = { from: rook, to: _board3.default['20, ' + rook.pos.y] };
									if (rook.pos.x === 40) rooked = { from: rook, to: _board3.default['30, ' + rook.pos.y] };
									rooked.from.piece.elem.animate(100).move(rooked.to.pos.x, rooked.to.pos.y);
									rooked.to.piece = rooked.from.piece;
									rooked.from.piece = null;
								}
								if (from.piece.value === 1) if (y === 40 || y === 5 && !transformed) {
									selectionGroup = _domBinding.transformingWheel[from.piece.color];

									selectionGroup.style.visibility = 'visible';
									_domBinding.transformingWheel.s.show();
									_domBinding.transformingWheel.s.move(x - 2.5, y - 2.5);
									_domBinding.transformingWheel[-from.piece.color].style.visibility = 'hidden';
									// transformingWheel[from.piece.color].style.visibility = 'visible';
									game.selecting = true;
									pipirka = new Promise(function (resolve, reject) {
										Array.from(selectionGroup.children).forEach(function (node) {
											node.onclick = function (event) {
												return resolve({ to: {
														piece: event.target.dataset.piece,
														val: event.target.href.baseVal
													}
												});
											};
										});
									});

									// console.log('Have to be transformed', transformingWheel[from.piece.color]);
								} else if ((y === 25 || y === 20) && Math.abs(from.pos.y - y) === 10) to.rapeableAt = game.nMoves + 1;
								if (to.toRape && from.piece.value === 1) {
									consumed = to.toRape;
									consumedPiece = to.toRape.piece;
									consumed.raped = true;
								}
								if (to.piece) {
									consumed = to;
									consumedPiece = to.piece;
								}
								if (consumed) {
									consumed.piece.elem.hide();
									consumed.piece = null;
									from.piece.lastMove = 'eat';
								}
								to.piece = from.piece;

								if (transformed) {
									_context3.next = 21;
									break;
								}

								_context3.next = 20;
								return pipirka;

							case 20:
								transformed = _context3.sent;

							case 21:
								if (transformed) {
									_domBinding.transformingWheel.s.hide();
									transformed.from = {
										piece: to.piece.value,
										val: to.piece.elem.node.href.baseVal
									};
									to.piece.value = transformed.to.piece;
									to.piece.elem.node.href.baseVal = transformed.to.val;
									game.selecting = false;
								}
								to.piece.pos = to.pos;
								from.piece = null;
								// const { currentTurnColor, enemyKingCell } = game;
								// const beatableBy = enemyKingCell.beatable(-currentTurnColor);
								// const checkMove = beatableBy.length > 0;
								// const checkMove = game.enemyKingCell.beatable(-game.currentTurnColor).length > 0;
								// let mateMove = false;
								// works only on debug, cause it skips checking otherwise
								// if (checkMove) {
								// 	debugger;
								// 	const dangerousCellCanBeBeatean = beatableBy[0].beatable(currentTurnColor).filter(cell => cell.piece.value !== 9).length > 0;
								// 	const kingCanMoveElsewhere = getMovableCells[9](enemyKingCell, -currentTurnColor).length > 0;
								// 	if (beatableBy.length === 1) {
								// 		if (!kingCanMoveElsewhere && !dangerousCellCanBeBeatean)
								// 			mateMove = true;
								// 	}
								// 	else if (beatableBy.length >= 2 && !kingCanMoveElsewhere)
								// 		mateMove = true;
								// }
								return _context3.abrupt('return', { from: from, to: to, consumed: consumed, consumedPiece: consumedPiece, prevMove: prevMove, rooked: rooked, fromValue: fromValue, toValue: toValue, transformed: transformed });

							case 25:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, _this4);
			}))();
		},
		_reverse: function _reverse() {
			var _current = this.current,
			    from = _current.from,
			    to = _current.to,
			    consumed = _current.consumed,
			    consumedPiece = _current.consumedPiece,
			    prevMove = _current.prevMove,
			    rooked = _current.rooked,
			    transformed = _current.transformed;
			var _from$pos = from.pos,
			    x = _from$pos.x,
			    y = _from$pos.y;

			to.piece.elem.animate(100).move(x, y);
			from.piece = to.piece;
			from.piece.lastMove = prevMove;
			if (transformed) {
				from.piece.value = transformed.from.piece;
				from.piece.elem.node.href.baseVal = transformed.from.val;
			}
			if (to.piece.value === 1 && _board3.default[x + ', ' + (y - 5 * to.piece.color)].toRape) _board3.default[x + ', ' + (y - 5 * to.piece.color)].toRape = null;
			if (rooked) {
				rooked.to.piece.elem.animate(100).move(rooked.from.pos.x, rooked.from.pos.y);
				rooked.from.piece = rooked.to.piece;
				rooked.to.piece = null;
			}
			from.piece.pos = from.pos;
			if (consumed) {
				if (consumed.raped) {
					consumed.piece = consumedPiece;
					consumed.piece.elem.show();
					to.piece = null;
				} else {
					to.piece = consumedPiece;
					to.piece.elem.show();
				}
			} else to.piece = null;
		},
		backward: function backward() {
			var nMoves = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

			if (!this.current) return 'Illeagal time traveling!';
			nMoves = Math.min(game.nMoves, nMoves);
			while (nMoves > 0) {
				this._reverse();
				this.after.push(this.current);
				this.current = this.before.pop();
				nMoves--;
				game.nMoves -= 1;
			}
			this.updateHistoryView();
			return game.nMoves;
		}
	}
};

_domBinding.undoButton.addEventListener('click', function () {
	return game.history.backward();
});
_domBinding.redoButton.addEventListener('click', function () {
	return game.history.forward();
});

(0, _utils.bind)(game, _domBinding.movesLabel, function (movesValue) {
	return _domBinding.movesLabel.innerHTML = _locale2.default.localized.moves[movesValue % 2];
} /* `Ход ${movesValue % 2 === 1 ? 'черных' : 'белых'}`*/);
(0, _utils.bind)(game, _domBinding.undoButton, function (movesValue, elem) {
	return elem.disabled = movesValue === 0;
});
(0, _utils.bind)(game, _domBinding.redoButton, function (movesValue, elem) {
	return elem.disabled = game.history.after.length === 0;
});

var piecesDict = function piecesDict(piece) {
	var absValue = Math.abs(piece);
	return absValue ? _locale2.default.localized.piecesTranscriptions[absValue] : '';
};
var listingFunction = function listingFunction(turn) {
	if (turn) {
		var from = turn.from,
		    to = turn.to,
		    fromValue = turn.fromValue,
		    toValue = turn.toValue,
		    consumed = turn.consumed,
		    checkMove = turn.checkMove,
		    mateMove = turn.mateMove;
		// console.log(game.enemyKingCell, game.currentTurnColor, game.enemyKingCell.beatable(-game.currentTurnColor));

		return '' + piecesDict(fromValue) + from.id + ' ' + (consumed ? 'x' : '-') + ' ' + piecesDict(toValue) + to.id + (mateMove ? ' #' + kingIconsSVG(mateMove) : checkMove ? ' x' : '');
	}
	return '';
};

var historyStringConstructor = function historyStringConstructor(currentMovesArr, elem) {
	var splitSize = 2;
	var finalStrings = currentMovesArr.filter(function (a) {
		return a;
	}).map(function (move, i) {
		return '<span class="' + (i++ % 2 === 1 ? 'black' : 'white') + '">' + listingFunction(move) + '</span>';
	})
	// contribution of https://stackoverflow.com/a/37826698/4567690, '
	// abimelex' and 'Andrei R'
	.reduce(function (array, item, index) {
		var chunkIndex = Math.floor(index / splitSize);
		if (!array[chunkIndex]) array[chunkIndex] = [];
		array[chunkIndex].push(item);
		return array;
	}, []).map(function (chunk) {
		return '<li>' + chunk.join('') + '</li>';
	});
	elem.innerHTML = finalStrings.join('');
};

(0, _utils.bind)(game.history, _domBinding.history, historyStringConstructor);

exports.default = game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.posEqual = posEqual;
exports.normalize = normalize;
exports.boardIndexFromId = boardIndexFromId;
exports.arrayFilledWithFilledCells = arrayFilledWithFilledCells;
exports.bind = bind;
exports.toPiece = toPiece;

var _Piece = __webpack_require__(11);

var _Piece2 = _interopRequireDefault(_Piece);

var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function posEqual(from, to) {
	return +from.x === +to.x && +from.y === +to.y;
}

function normalize(_ref) {
	var x = _ref.x,
	    y = _ref.y;

	var cellSize = 5;
	var returnPoint = { x: x, y: y };
	returnPoint.x = Math.floor((returnPoint.x + cellSize / 2) / cellSize);
	returnPoint.y = Math.floor((returnPoint.y + cellSize / 2) / cellSize);
	returnPoint[0] = -1 + returnPoint.x;
	returnPoint[1] = 9 - returnPoint.y;
	returnPoint.x *= 5;
	returnPoint.y *= 5;
	returnPoint.id = alphabet[returnPoint[0]] + returnPoint[1];
	return returnPoint;
}

function boardIndexFromId(id) {
	var index = {};
	var ids = id.slice('');
	index.i = ids[1] - 1;
	index.j = alphabet.findIndex(function (l) {
		return l === ids[0];
	});
	return index;
}

function arrayFilledWithFilledCells() {
	var returnee = [];
	for (var i = 0; i < arguments.length; i++) {
		if (arguments[i]) returnee.push(arguments[i]);
	}return returnee;
}

function bind() {
	var binder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _game2.default;
	var elem = arguments[1];
	var callback = arguments[2];

	if (elem)
		// setTimeout(() =>
		binder.subscribe(elem, callback);
	// , 5);
}
function toPiece(element) {
	return new _Piece2.default(element);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getMovableCells = exports.diagonalSides = exports.crossSides = undefined;

var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

var _board = __webpack_require__(0);

var _board2 = _interopRequireDefault(_board);

var _utils = __webpack_require__(2);

var _Cell = __webpack_require__(8);

var _Cell2 = _interopRequireDefault(_Cell);

var _Settings = __webpack_require__(6);

var _Settings2 = _interopRequireDefault(_Settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var canMove = function canMove(color) {
	if (_Settings2.default.teacherMode === true && !_game2.default.selecting) return true;
	return color === _game2.default.turn && !_game2.default.selecting;
};

var capsul = function capsul(_ref, side, i) {
	var sides = _ref.sides,
	    offsetMultiplier = _ref.offsetMultiplier,
	    color = _ref.color,
	    x = _ref.x,
	    y = _ref.y;

	var offset = sides[i];
	// debugger;
	if (side) side = _board2.default[x - offset[0] * offsetMultiplier + ', ' + (y - offset[1] * offsetMultiplier)];
	if (side) {
		var prevSide = _board2.default[x - offset[0] * (offsetMultiplier - 1) + ', ' + (y - offset[1] * (offsetMultiplier - 1))];
		if (side.piece && side.piece.color === color || prevSide.piece && prevSide.piece.color === -color) return null;
	}
	if (side && side instanceof _Cell2.default) return side;
};

var realBadKingFilterFunctionWithStupidName = function realBadKingFilterFunctionWithStupidName(_ref2, cell) {
	var color = _ref2.color,
	    x = _ref2.x,
	    y = _ref2.y;

	// TODO make it sound not so stupid
	// So. if king can be beaten by 1 piece, we can protect him by moving any piece anywhere on beater's path OR beating the beater OR we can relocate king
	// BUT if we can't relocate king AND that single piece can't be beatean by any piece (!? other that king, it's checkmate)
	//  if king can be beaten by 2 or more piece, we can only protect him by relocating king, if king don't have moves - it checkmate.
	var storedKingPiece = _game2.default.currentKingCell.piece;
	_game2.default.currentKingCell.piece = 0;
	if (cell && cell.beatable(color).length === 0) {
		_game2.default.currentKingCell.piece = storedKingPiece;
		if (cell.piece) return cell.piece.color !== color;
		return true;
	}
	_game2.default.currentKingCell.piece = storedKingPiece;
};

// check to see if we can protect our king while moving
function kingSavedMoves(returnee, _ref3, color) {
	var x = _ref3.x,
	    y = _ref3.y;

	var ourKing = _game2.default.kings[color];
	var ourCell = _board2.default[x + ', ' + y];
	var kingCell = _board2.default[ourKing.pos.x + ', ' + ourKing.pos.y];
	var ourPiece = ourCell.piece;
	if (!ourPiece || ourPiece.color === -color) return returnee;
	return returnee.filter(function (cell) {
		if (ourCell === kingCell) return true;
		// calculate if we could save king by beating piece at available cell
		var beatingSaves = void 0;
		var movingSaves = void 0;
		if (cell.piece && cell.piece.color === -color) {
			// TODO check to see if accessing value instead of _value won't break everything
			var storedEnemyPieceValue = cell.piece._value;
			// const storedOurPieceValue = ourCell.piece._value;
			var storedOurPiece = ourCell.piece;
			cell.piece._value = ourCell.piece._value;
			ourCell.piece = null;
			var beatable = kingCell.beatable(color);
			ourCell.piece = storedOurPiece;
			cell.piece.value = storedEnemyPieceValue;
			beatingSaves = beatable.length === 0;
		}
		// check if we can protect king by moving to empty cell
		if (!cell.piece) {
			cell.piece = ourPiece;
			ourCell.piece = null;
			var _beatable = kingCell.beatable(color);
			cell.piece = null;
			ourCell.piece = ourPiece;
			movingSaves = _beatable.length === 0;
		}
		if (ourCell === kingCell && !cell.piece) {
			cell.piece = ourPiece;
			ourCell.piece = null;
			var _beatable2 = cell.beatable(color);
			cell.piece = null;
			ourCell.piece = ourPiece;
			movingSaves = _beatable2.length === 0;
		}
		// ourCell.piece = null;
		// const beatable = kingCell.beatable(color);
		// ourCell.piece = ourPiece;
		return beatingSaves || movingSaves;
	});
}
var crossSides = exports.crossSides = [[-5, 0], [5, 0], [0, -5], [0, 5]];
var diagonalSides = exports.diagonalSides = [[-5, -5], [5, -5], [-5, 5], [5, 5]];
var getMovableCells = exports.getMovableCells = {
	1: function _(_ref4, color) {
		var x = _ref4.x,
		    y = _ref4.y;

		if (!canMove(color)) return [];
		var left = _board2.default[x - 5 + ', ' + (y - color * 5)];
		var right = _board2.default[x + 5 + ', ' + (y - color * 5)];
		var returnee = [];
		var rapeable = (0, _utils.arrayFilledWithFilledCells)(_board2.default[x + 5 + ', ' + y], _board2.default[x - 5 + ', ' + y]).map(function (cell) {
			var movableCell = null;
			if (cell.rapeableAt === _game2.default.nMoves && cell.piece) {
				movableCell = _board2.default[cell.pos.x + ', ' + (cell.pos.y + 5 * cell.piece.color)];
				movableCell.toRape = cell;
			}
			return movableCell;
		}).filter(function (a) {
			return a;
		});
		returnee = returnee.concat(rapeable);
		// faito
		if (left && left.piece || right && right.piece) returnee = returnee.concat((0, _utils.arrayFilledWithFilledCells)(left, right).filter(function (cell) {
			return cell.piece && cell.piece.color !== color;
		}));
		// double move
		if (y === 10 || y === 35) returnee = returnee.concat((0, _utils.arrayFilledWithFilledCells)(_board2.default[x + ', ' + (y - color * 5)], _board2.default[x + ', ' + (y - color * 10)]).filter(function (cell, i, arr) {
			return !cell.piece && !arr[0].piece;
		}));
		// single move
		returnee = returnee.concat((0, _utils.arrayFilledWithFilledCells)(_board2.default[x + ', ' + (y - color * 5)]).filter(function (cell) {
			return !cell.piece;
		}));

		return kingSavedMoves(returnee, { x: x, y: y }, color);
	},
	3: function _(_ref5, color) {
		var x = _ref5.x,
		    y = _ref5.y;

		if (!canMove(color)) return [];

		//  TODO bad code, bad!
		//  hacky code for beatable checks, we place enemy piece here (from beatable code) to check if we can beat it
		var target = _board2.default[x + ', ' + y].piece;
		var storedValue = void 0;
		if (target) {
			storedValue = target._value || 0;
			target.value = 3 * color;
		}

		var offsetMultiplier = 1;
		var returnee = [];
		var sides = diagonalSides;
		var results = [1, 1, 1, 1];
		while (offsetMultiplier) {
			results = results.map(capsul.bind(undefined, { sides: sides, offsetMultiplier: offsetMultiplier, color: color, x: x, y: y }));
			if (results.some(function (a) {
				return a;
			})) returnee = returnee.concat(_utils.arrayFilledWithFilledCells.apply(undefined, _toConsumableArray(results)));else break;
			offsetMultiplier += 1;
		}
		if (target) target.value = storedValue;
		return kingSavedMoves(returnee, { x: x, y: y }, color);
	},
	4: function _(_ref6, color) {
		var x = _ref6.x,
		    y = _ref6.y;

		if (!canMove(color)) return [];
		//  TODO bad code, bad!
		var target = _board2.default[x + ', ' + y].piece;
		var storedValue = void 0;
		if (target) {
			storedValue = target._value || 0;
			target.value = 4 * color;
		}

		var offsetMultiplier = 1;
		var returnee = [];
		var sides = crossSides;
		var results = [1, 1, 1, 1];
		while (offsetMultiplier) {
			results = results.map(capsul.bind(undefined, { sides: sides, offsetMultiplier: offsetMultiplier, color: color, x: x, y: y }));
			if (results.some(function (a) {
				return a;
			})) returnee = returnee.concat(_utils.arrayFilledWithFilledCells.apply(undefined, _toConsumableArray(results)));else break;
			offsetMultiplier += 1;
		}

		if (target) target.value = storedValue;
		return kingSavedMoves(returnee, { x: x, y: y }, color);
	},
	7: function _(_ref7, color) {
		var x = _ref7.x,
		    y = _ref7.y;

		if (!canMove(color)) return [];

		//  TODO bad code, bad!
		var target = _board2.default[x + ', ' + y].piece;
		var storedValue = void 0;
		if (target) {
			storedValue = target._value || 0;
			target.value = 7 * color;
		}

		var sides = [[-10, -5], [10, -5], [-10, 5], [10, 5], [-5, -10], [5, -10], [-5, 10], [5, 10]];
		var returnee = _utils.arrayFilledWithFilledCells.apply(undefined, _toConsumableArray(sides.map(capsul.bind(undefined, { sides: sides, offsetMultiplier: 1, color: color, x: x, y: y }))));
		if (target) target.value = storedValue;
		return kingSavedMoves(returnee, { x: x, y: y }, color);
	},
	8: function _(_ref8, color) {
		var x = _ref8.x,
		    y = _ref8.y;

		if (!canMove(color)) return [];

		//  TODO bad code, bad!
		var target = _board2.default[x + ', ' + y].piece;
		var storedValue = void 0;
		if (target) {
			storedValue = target._value || 0;
			target.value = 8 * color;
		}

		var offsetMultiplier = 1;
		var returnee = [];
		var sides = [].concat(diagonalSides, crossSides);
		var results = [1, 1, 1, 1, 1, 1, 1, 1];
		while (offsetMultiplier) {
			results = results.map(capsul.bind(undefined, { sides: sides, offsetMultiplier: offsetMultiplier, color: color, x: x, y: y }));
			if (results.some(function (a) {
				return a;
			})) returnee = returnee.concat(_utils.arrayFilledWithFilledCells.apply(undefined, _toConsumableArray(results)));else break;
			offsetMultiplier += 1;
		}

		if (target) target.value = storedValue;
		return kingSavedMoves(returnee, { x: x, y: y }, color);
	},
	9: function _(_ref9, color) {
		var x = _ref9.x,
		    y = _ref9.y;

		if (!canMove(color)) return [];

		//  TODO bad code, bad!
		var target = _board2.default[x + ', ' + y].piece;
		var storedValue = void 0;
		if (target) {
			storedValue = target._value || 0;
			target.value = 9 * color;
		}

		var sides = [].concat(diagonalSides, crossSides);
		var returnee = sides.map(capsul.bind(undefined, { sides: sides, offsetMultiplier: 1, color: color, x: x, y: y })).filter(realBadKingFilterFunctionWithStupidName.bind(undefined, { color: color, x: x, y: y }));

		// Рокировка
		if (!_game2.default.currentKing.lastMove) {
			var availableTowers = (0, _utils.arrayFilledWithFilledCells)(_board2.default[5 + ', ' + y], _board2.default[40 + ', ' + y])
			// Filter out towers that can't protect king
			.filter(function (towerCell) {
				if (towerCell.piece && towerCell.piece.value === 4 && !towerCell.piece.lastMove) {
					var path = getMovableCells[towerCell.piece.value](towerCell.pos, towerCell.piece.color);
					return path.filter(function (pathCell) {
						return pathCell.pos.x !== 5 && pathCell.pos.x !== 40;
					}).every(function (pathCell) {
						return pathCell.beatable(color).length === 0 && !pathCell.piece;
					}) && path.some(function (pathCell) {
						return pathCell.pos.x === 20 || pathCell.pos.x === 30;
					});
				}
			});
			if (availableTowers.length > 0) returnee = returnee.concat(availableTowers.map(function (tower) {
				var rookableCell = _board2.default[(tower.pos.x === 5 ? 15 : 35) + ', ' + tower.pos.y];
				rookableCell.rook = tower;
				return rookableCell;
			}));
		}

		if (target) target.value = storedValue;
		return kingSavedMoves(returnee, { x: x, y: y }, color, true);
	}
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.transformingWheel = exports.historyButtons = exports.debugInfo = exports.history = exports.checkmateLabel = exports.movesLabel = exports.redoButton = exports.undoButton = exports.teachSwitch = undefined;

var _svgjs = __webpack_require__(5);

var _svgjs2 = _interopRequireDefault(_svgjs);

var _gsapTimeline = __webpack_require__(16);

var _gsapTimeline2 = _interopRequireDefault(_gsapTimeline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var teachSwitch = exports.teachSwitch = document.getElementById('teacherMode');
var print = document.getElementById('print');
print.addEventListener('click', function () {
	return window.print();
});
var undoButton = exports.undoButton = document.getElementById('undo');
var redoButton = exports.redoButton = document.getElementById('redo');
var movesLabel = exports.movesLabel = document.getElementById('moves');
var checkmateLabel = exports.checkmateLabel = document.getElementById('checkmate');
var history = exports.history = document.getElementById('history');
var debugInfo = exports.debugInfo = document.getElementById('debug');
// const historyBlack = history.children[1];
// const historyWhite = history.children[0];
var historyButtons = exports.historyButtons = [undoButton, redoButton];
historyButtons.tween = new _gsapTimeline2.default({ paused: true });
historyButtons.tween.fromTo(historyButtons, 0.2, { opacity: 1 }, { opacity: 0 }).fromTo(historyButtons, 0.2, { width: '2.4rem' }, { width: 0 });
// .fromTo(historyButtons, 0.01, { display: 'inline-block' }, { display: 'none' });

var wheel = _svgjs2.default.get('transformer');

var transformingWheel = exports.transformingWheel = {
	s: wheel,
	n: wheel.node,
	'-1': wheel.node.children[1],
	'1': wheel.node.children[2]
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = SVG;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _domBinding = __webpack_require__(4);

var Settings = {
	settingsUpdated: function settingsUpdated() {
		var _this = this;

		var settings = Object.keys(this).filter(function (key) {
			return key[0] !== '_' && typeof _this[key] !== 'function' && key !== 'undefined';
		}).map(function (key) {
			return { value: _this[key], key: key };
		});
		localStorage.setItem('settings', JSON.stringify(settings));

		_domBinding.teachSwitch.checked = this.teacherMode;
		if (this.teacherMode) {

			_domBinding.historyButtons.tween.reverse();
			_domBinding.debugInfo.style.display = 'block';
		} else {

			_domBinding.historyButtons.tween.restart();
			_domBinding.debugInfo.style.display = 'none';
		}
	},
	loadSettings: function loadSettings() {
		var _this2 = this;

		var settings = JSON.parse(localStorage.getItem('settings'));
		if (settings) settings.forEach(function (setting) {
			return _this2[setting.key] = setting.value;
		});else Settings.teacherMode = _domBinding.teachSwitch.checked;
		console.log('settings loaded');
		Settings.teacherMode ? _domBinding.historyButtons.tween.time(0) : _domBinding.historyButtons.tween.time(0.5);
		_domBinding.debugInfo.style.display = Settings.teacherMode ? 'display' : 'none';

		this.settingsUpdated();
	},

	get teacherMode() {
		return this._teacher;
	},
	set teacherMode(val) {
		this._teacher = val;
		this.settingsUpdated();
	}
};
Settings.loadSettings();
// Settings.teacherMode = teachSwitch.checked;
_domBinding.teachSwitch.addEventListener('change', function (e) {
	var checked = e.target.checked;
	Settings.teacherMode = checked;
});

exports.default = Settings;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var currentLocale = window.navigator.languages && window.navigator.languages[0].slice(0, 2) || window.navigator.language.slice(0, 2) || 'en';

var resources = [{
	key: 'piecesTranscriptions',
	de: {
		9: 'K',
		8: 'D',
		7: 'S',
		4: 'T',
		3: 'L',
		1: ''
	},
	en: {
		9: 'K',
		8: 'Q',
		7: 'N',
		4: 'R',
		3: 'B',
		1: 'P'
	}
}, {
	key: 'moves',
	en: {
		'0': 'White\'s move',
		'1': 'Black\'s move'
	},
	ru: {
		'0': 'Ход белых',
		'1': 'Ход черных'
	},
	de: {
		'0': 'Weiß am Zug',
		'1': 'Schwarz am Zug'
	}
}, {
	key: 'kingMoves',
	ru: {
		check: { 1: 'Белый', '-1': 'Черный' },
		mate: { 1: 'Белому', '-1': 'Черному' }
	},
	en: {
		check: { 1: 'White', '-1': 'Black' },
		mate: { 1: 'White\'s', '-1': 'Black\'s' }
	},
	de: {
		check: { 1: 't', '-1': 't' },
		mate: { 1: 't\'s', '-1': 't\'s' }
	}
}];

var availableLocales = resources.reduce(function (localeKeys, resource) {
	return localeKeys.concat(Object.keys(resource));
}, []).filter(function (a) {
	return a !== 'key';
});
var _locale = resources.reduce(function (locale, resource, i) {
	var resourceKey = resource.key;
	return Object.keys(locale).reduce(function (total, localeKey) {
		if (resource[localeKey]) total[localeKey][resourceKey] = resource[localeKey];else total[localeKey][resourceKey] = resource.en;
		return total;
	}, locale);
}, availableLocales.reduce(function (a, b) {
	a[b] = {};return a;
}, {}));

var Locale = function () {
	function Locale() {
		_classCallCheck(this, Locale);
	}

	_createClass(Locale, null, [{
		key: 'currentLocale',
		get: function get() {
			return currentLocale;
		},
		set: function set(value) {
			currentLocale = value;
		}
	}, {
		key: 'localized',
		get: function get() {
			return _locale[currentLocale];
		}
	}]);

	return Locale;
}();

exports.default = Locale;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moving = __webpack_require__(3);

var _dragHandlers = __webpack_require__(12);

var _utils = __webpack_require__(2);

var _board = __webpack_require__(0);

var _board2 = _interopRequireDefault(_board);

var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

var _svgDraggable = __webpack_require__(5);

var _svgDraggable2 = _interopRequireDefault(_svgDraggable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function () {
	function Cell(_ref) {
		var cell = _ref.cell,
		    _ref$pos = _ref.pos,
		    x = _ref$pos.x,
		    y = _ref$pos.y,
		    piece = _ref.piece,
		    id = _ref.id,
		    svgElem = _ref.svgElem;

		_classCallCheck(this, Cell);

		this.color = cell;
		this.pos = { x: x, y: y };
		this.piece = piece;
		this.id = id;
		this.elem = svgElem;
		if (this.piece) {
			this.piece.elem.draggable({ minX: 5, minY: 5, maxX: 45, maxY: 45 });
			this.piece.elem.on('dragstart', _dragHandlers.pieceDragStart);
			this.piece.elem.on('dragend', _dragHandlers.pieceDragEnd);
		}
	}

	_createClass(Cell, [{
		key: 'beatable',
		value: function beatable(color) {
			// TODO fix color ambiguity
			var filterator = function filterator(value, dangerousCell) {
				return dangerousCell && dangerousCell.piece && dangerousCell.piece.value === value && dangerousCell.piece.color === -color;
			};
			var customKingMoves = function customKingMoves(_ref2, color) {
				var x = _ref2.x,
				    y = _ref2.y;

				var sides = [].concat(_moving.diagonalSides, _moving.crossSides);
				var returnee = sides.map(function (side) {
					if (side) side = _board2.default[x - side[0] + ', ' + (y - side[1])];
					if (side && side.piece && side.piece.color === color) return null;
					if (side && side instanceof Cell) return side;
				});
				return returnee;
			};
			var beaters = [].concat(_moving.getMovableCells[1](this.pos, color).filter(filterator.bind(this, 1)), _moving.getMovableCells[3](this.pos, color).filter(filterator.bind(this, 3)), _moving.getMovableCells[4](this.pos, color).filter(filterator.bind(this, 4)), _moving.getMovableCells[7](this.pos, color).filter(filterator.bind(this, 7)), customKingMoves(this.pos, color).filter(filterator.bind(this, 9)),
			// TODO we had to separate king moves searcher to not include rooking and all other excess stuff, and just use moves, otherwise we probably could just hack damsel moves and make offset behave, buuut
			_moving.getMovableCells[8](this.pos, color).filter(filterator.bind(this, 8)));
			// console.log(this.id, beaters);
			return beaters;
		}
	}, {
		key: 'movePieceTo',
		value: function movePieceTo(target) {
			var id = target.id;

			if (!this.piece) console.warn('Tyring to move from undefined piece cell');else {
				var targetCell = _board2.default[id];
				if (!this.history && ((0, _utils.posEqual)(this.pos, target) || !targetCell.elem.classList.contains('possible-move'))) return this.piece.elem.animate(100).move(this.pos.x, this.pos.y);
				_game2.default.history.appendMove(this, targetCell);
			}
		}
	}]);

	return Cell;
}();

exports.default = Cell;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _svgjs = __webpack_require__(5);

var _svgjs2 = _interopRequireDefault(_svgjs);

var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Piece = function () {
	function Piece(element) {
		_classCallCheck(this, Piece);

		this.elem = _svgjs2.default.get(element.id);
		this.pos = { x: +element.getAttribute('x'), y: +element.getAttribute('y') };
		this._value = element.dataset.piece;
		if (this.value === 9) _game2.default.kings[this.color] = this;
	}

	_createClass(Piece, [{
		key: 'toString',
		value: function toString() {
			return this._value;
		}
	}, {
		key: 'color',
		get: function get() {
			return this._value > 0 ? 1 : -1;
		}
	}, {
		key: 'value',
		get: function get() {
			return Math.abs(this._value);
		},
		set: function set(val) {
			this._value = val;
		}
	}]);

	return Piece;
}();

exports.default = Piece;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.pieceDragEnd = exports.pieceDragStart = undefined;

var _board = __webpack_require__(0);

var _board2 = _interopRequireDefault(_board);

var _moving = __webpack_require__(3);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pieceDragStart = exports.pieceDragStart = function pieceDragStart(event) {
	event.target.parentNode.appendChild(event.target);
	var _pos = { x: event.target.x.baseVal.value, y: event.target.y.baseVal.value };
	var pos = (0, _utils.normalize)(_pos);
	// event.target.dataset.x = pos.x;
	// event.target.dataset.y = pos.y;
	event.target.setAttribute('data-x', pos.x);
	event.target.setAttribute('data-y', pos.y);
	var piece = _board2.default[pos.x + ', ' + pos.y].piece;
	if (!piece) return;
	_moving.getMovableCells[piece.value](pos, piece.color).forEach(function (cell) {
		return cell.piece && cell.piece.value === 9 ? cell.elem.classList.add('consumable') : cell.elem.classList.add('possible-move');
	});
	event.target.parentNode.parentNode.appendChild(event.target.parentNode);
};

var pieceDragEnd = exports.pieceDragEnd = function pieceDragEnd(event) {
	var pos = event.target.dataset;
	var _pos = { x: event.target.x.baseVal.value, y: event.target.y.baseVal.value };
	var target = (0, _utils.normalize)(_pos);
	_board2.default[pos.x + ', ' + pos.y].movePieceTo(target);
	_board2.default.cleanUp();
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _board = __webpack_require__(0);

var _board2 = _interopRequireDefault(_board);

var _main = __webpack_require__(10);

var _main2 = _interopRequireDefault(_main);

var _domBinding = __webpack_require__(4);

var binding = _interopRequireWildcard(_domBinding);

var _locale = __webpack_require__(7);

var _locale2 = _interopRequireDefault(_locale);

var _moving = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = __webpack_require__(1).default;

// TODO cleanup dev imports
var Settings = __webpack_require__(6).default;

// TODO disable debugging mode;
var DEV = true;
if (DEV) {
	window.board = _board2.default;
	window._locale = _locale2.default;
	// window.pieces = pieces;
	window.game = game;
	window.moves = _moving.getMovableCells;
	window.settings = Settings;
	window.bindings = binding;
	game.reset();
	console.warn('dev mode is on, consider truning it off before publishing');
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(15);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = TimelineLite;

/***/ })
/******/ ]);