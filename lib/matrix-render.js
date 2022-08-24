/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import App from '../program/manifest';
import {reDraw, world} from './matrix-world';
import {looper, modifyLooper, updateFPS, totalTime, lastTime} from './engine';
import * as raycaster from './raycast';
import {radToDeg} from './utility';

export var animate = function(sceneObject) {
  var timeNow = new Date().getTime();
  if(lastTime != 0) {
    var elapsed = timeNow - lastTime;
    sceneObject.rotation.rotx += (sceneObject.rotation.rotSpeedX * elapsed) / 1000.0;
    sceneObject.rotation.roty += (sceneObject.rotation.rotSpeedY * elapsed) / 1000.0;
    sceneObject.rotation.rotz += (sceneObject.rotation.rotSpeedZ * elapsed) / 1000.0;
    sceneObject.position.update();
  }
};

export var reDrawID = 0;

var secondPass = 0;

var physicsLooper = 0, lt = 0;

App.operation.reDrawGlobal = function(time) {
  modifyLooper(0);

  reDrawID = requestAnimationFrame(reDraw);

  world.renderPerspective();

  for(var t = 0;t < App.updateBeforeDraw.length;t++) {
    App.updateBeforeDraw[t].UPDATE();
  }

  if(world.physics !== null) {
    var dt = (time - lt) / 1000;
    world.physics.world.step((1.0 / 60.0), dt, 3);
    lt = time;
    while(physicsLooper <= world.contentList.length - 1) {
      if(world.contentList[physicsLooper].physics.enabled) {
        var local = world.contentList[physicsLooper];
        local.position.SetX(local.physics.currentBody.position.x)
        local.position.SetZ(local.physics.currentBody.position.y)
        local.position.SetY(local.physics.currentBody.position.z)
        world.contentList[physicsLooper].rotation.rotx = radToDeg(local.physics.currentBody.quaternion.toAxisAngle()[1])
        world.contentList[physicsLooper].rotation.roty = radToDeg(local.physics.currentBody.quaternion.toAxisAngle()[1])
        world.contentList[physicsLooper].rotation.rotz = radToDeg(local.physics.currentBody.quaternion.toAxisAngle()[1])
        world.contentList[physicsLooper].rotation.x = (local.physics.currentBody.quaternion.toAxisAngle()[0].x)
        world.contentList[physicsLooper].rotation.y = (local.physics.currentBody.quaternion.toAxisAngle()[0].z)
        world.contentList[physicsLooper].rotation.z = (local.physics.currentBody.quaternion.toAxisAngle()[0].y)
      }
      physicsLooper++;
    }
  }

  while(looper <= world.contentList.length - 1) {
    if('triangle' == world.contentList[looper].type) {
      world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
      world.drawTriangle(world.contentList[looper]);
      world.animate(world.contentList[looper]);
    } else if('square' == world.contentList[looper].type) {
      world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
      world.drawSquare(world.contentList[looper]);
      world.animate(world.contentList[looper]);
    } else if('cube' == world.contentList[looper].type || 'cubeTex' == world.contentList[looper].type || 'cubeLightTex' == world.contentList[looper].type) {
      world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
      world.drawCube(world.contentList[looper]);
      world.animate(world.contentList[looper]);
    } else if('pyramid' == world.contentList[looper].type) {
      world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
      world.drawPyramid(world.contentList[looper]);
      world.animate(world.contentList[looper]);
    } else if('obj' == world.contentList[looper].type) {
      world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
      world.drawObj(world.contentList[looper]);
      world.animate(world.contentList[looper]);
    } else if('squareTex' == world.contentList[looper].type) {
      world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
      world.drawSquareTex(world.contentList[looper]);
      world.animate(world.contentList[looper]);
    } else if('sphereLightTex' == world.contentList[looper].type || 'sphere' == world.contentList[looper].type || 'generatorLightTex' == world.contentList[looper].type) {
      world.GL.gl.useProgram(world.contentList[looper].shaderProgram);
      world.drawSphere(world.contentList[looper]);
      world.animate(world.contentList[looper]);
    }
    modifyLooper(looper + 1);
  }

  if(App.raycast) {
    if(secondPass <= 2) {
      raycaster.touchCoordinate.enabled = false;
      secondPass = 0;
    }
  }

  secondPass++;
  physicsLooper = 0;
  updateFPS(1);
};

/* Field of view, Width height ratio, min distance of viewpoint, max distance of viewpoint, */
App.operation.CameraPerspective = function() {
  this.GL.gl.viewport(0, 0, canvas.width, canvas.height);
  this.GL.gl.clear(this.GL.gl.COLOR_BUFFER_BIT | this.GL.gl.DEPTH_BUFFER_BIT);
  mat4.perspective(this.pMatrix, degToRad(App.camera.viewAngle), this.GL.gl.viewportWidth / this.GL.gl.viewportHeight, App.camera.nearViewpoint, App.camera.farViewpoint);
};

export var callReDraw_ = function() {
  requestAnimationFrame(reDraw);
};
