/*jshint browser:true */
/*global module, require, THREE, $ */

'use strict';

var _ = require('lodash');

module.exports = Game;

function Game() {
  this.viewport = $('.viewport');

  this.width = this.viewport.width();
  this.height = this.viewport.height();
  this.aspect = this.width / this.height;

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(75, this.aspect, 0.1, 1000);
  this.renderer = new THREE.WebGLRenderer();

  _.bindAll(this, ['render']);
}

Game.prototype.initialize = function() {
  this.renderer.setSize(this.width, this.height);
  this.viewport.append(this.renderer.domElement);

  this.render();
};

Game.prototype.render = function() {
  window.requestAnimationFrame(this.render);

  this.renderer.render(this.scene, this.camera);
};

Game.prototype.addCube = function() {
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  var cube = new THREE.Mesh(geometry, material);

  this.scene.add(cube);
  this.camera.position.z = 5;
};
