/*jshint browser:true */
/*global require, $ */

'use strict';

var Game = require('./lib/game');

$(document).ready(function() {
  var game = new Game();

  game.initialize();
  game.addCube();
});
