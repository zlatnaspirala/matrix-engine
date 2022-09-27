/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
"use strict";

import App from "../program/manifest";
import {OSCILLATOR} from "./utility";
import {net} from "./engine";

export class Scale {
  constructor() {
    this.x = 1;
    this.y = 1;
    this.z = 1;
  }

  LinearScale(scale_) {
    this.x = scale_;
    this.y = scale_;
    this.z = scale_;
  }
}

export class Point {
  constructor(x, y, z) {
    if(typeof z == "undefined") {
      z = 0;
    }

    this.x = x;
    this.y = y;
    this.z = z;
    this.scale = new Scale();
  }

  get X() {
    return parseFloat(this.x * this.scale.x);
  }
  get Y() {
    return parseFloat(this.y * this.scale.y);
  }
  get Z() {
    return parseFloat(this.z * this.scale.z);
  }
}

export class RotationVector {
  constructor(x, y, z, rotx, roty, rotz) {
    if(typeof x == "undefined") {
      x = 0;
    }
    if(typeof y == "undefined") {
      y = 0;
    }
    if(typeof z == "undefined") {
      z = 0;
    }

    if(typeof rotx == "undefined") {
      rotx = 0;
    }
    if(typeof roty == "undefined") {
      roty = 0;
    }
    if(typeof rotz == "undefined") {
      rotz = 0;
    }

    this.nameUniq = null;

    this.x = x;
    this.y = y;
    this.z = z;

    this.rotx = rotx;
    this.roty = roty;
    this.rotz = rotz;

    /**
     * Active rotation without writing code from
     * top level. Just sutup values > 0
     */
    this.rotationSpeed = {
      emit: false,
      x: 0,
      y: 0,
      z: 0
    };

    return this;
  }

  get rotSpeedX() {
    return this.rotationSpeed.x;
  }

  get rotSpeedY() {
    return this.rotationSpeed.y;
  }

  get rotSpeedZ() {
    return this.rotationSpeed.z;
  }

  get X() {
    return this.x;
  }
  get Y() {
    return this.y;
  }
  get Z() {
    return this.z;
  }

  get RotationVector() {
    return [this.x, this.y, this.z];
  }

  SetDirection(x_, y_, z_) {
    this.x = x_;
    this.y = y_;
    this.z = z_;
    return [this.x, this.y, this.z];
  }

  getRotDirX() {
    return [1, 0, 0];
  }

  getRotDirY() {
    return [0, 1, 0];
  }

  getRotDirZ() {
    return [0, 0, 1];
  }

  SetDirectionX() {
    this.x = 1;
    this.y = 0;
    this.z = 0;
  }

  SetDirectionY() {
    this.x = 0;
    this.y = 1;
    this.z = 0;
  }

  SetDirectionZ() {
    this.x = 0;
    this.y = 0;
    this.z = 1;
  }

  SetDirectionXY() {
    this.x = 1;
    this.y = 1;
    this.z = 0;
  }

  SetDirectionXZ() {
    this.x = 1;
    this.y = 0;
    this.z = 1;
  }

  SetDirectionYZ() {
    this.x = 0;
    this.y = 1;
    this.z = 1;
  }

  rotateX(x, em) {
    this.rotx = x;
    if (net.connection && typeof em === 'undefined') net.connection.send({
      netRot: {x: this.rotx},
      netObjId: this.nameUniq,
    });
  }

  rotateY(y, em) {
    this.roty = y;
    if (net.connection && typeof em === 'undefined') net.connection.send({
      netRot: {y: this.roty},
      netObjId: this.nameUniq,
    });
  }

  rotateZ(z, em) {
    this.rotz = z;
    if (net.connection && typeof em === 'undefined') net.connection.send({
      netRot: {z: this.rotz},
      netObjId: this.nameUniq,
    });
  }

  get rx() {
    return this.rotx;
  }

  get ry() {
    return this.roty;
  }

  get rz() {
    return this.rotz;
  }
}

/**
 * @description Base class
 * Powered for multiplayer feature:
 * - position ref to x,y,z
 */
export class Position {
  constructor(x, y, z) {
    this.nameUniq = null;
    if(typeof x == 'undefined') {
      x = 0;
    }
    if(typeof y == 'undefined') {
      y = 0;
    }
    if(typeof z == 'undefined') {
      z = 0;
    }
    this.x = x;
    this.y = y;
    this.z = z;

    this.velY = 0;
    this.velX = 0;
    this.velZ = 0;
    this.inMove = false;
    this.targetX = x;
    this.targetY = y;
    this.targetZ = z;
    this.thrust = 0.01;

    return this;
  }

  setSpeed(n) {
    if(typeof n === 'number') {
      this.thrust = n;
    } else {
      SYS.DEBUG.WARNING('Description: arguments (w, h) must be type of number.');
    }
  }

  translateByX = function(x) {
    this.inMove = true;
    this.targetX = x;
  };

  translateByY(y) {
    this.inMove = true;
    this.targetY = y;
  }

  translateByZ(z) {
    this.inMove = true;
    this.targetZ = z;
  }

  translateByXY(x, y) {
    this.inMove = true;
    this.targetX = x;
    this.targetY = y;
  }

  translateByXZ(x, z) {
    this.inMove = true;
    this.targetX = x;
    this.targetZ = z;
  }

  translateByYZ(y, z) {
    this.inMove = true;
    this.targetY = y;
    this.targetZ = z;
  }

  onTargetPositionReach() {}

  update() {
    var tx = this.targetX - this.x,
        ty = this.targetY - this.y,
        tz = this.targetZ - this.z,
        dist = Math.sqrt(tx * tx + ty * ty + tz * tz);
    this.velX = (tx / dist) * this.thrust;
    this.velY = (ty / dist) * this.thrust;
    this.velZ = (tz / dist) * this.thrust;
    if(this.inMove == true) {
      if(dist > this.thrust) {
        this.x += this.velX;
        this.y += this.velY;
        this.z += this.velZ;

        if (net.connection && typeof em === 'undefined') net.connection.send({
          netPos: {x: this.x , y : this.y, z: this.z},
          netObjId: this.nameUniq,
        });

      } else {
        this.x = this.targetX;
        this.y = this.targetY;
        this.z = this.targetZ;
        this.inMove = false;
        this.onTargetPositionReach();

        if (net.connection && typeof em === 'undefined') net.connection.send({
          netPos: {x: this.x , y : this.y, z: this.z},
          netObjId: this.nameUniq,
        });
      }
    }
  }

  get worldLocation() {
    return [this.x, this.y, this.z];
  }

  SetX(newx, em) {
    this.x = newx;
    this.targetX = newx;
    this.inMove = false;
    
    if (net.connection && typeof em === 'undefined') {
        net.connection.send({
          netPos: {x: this.x , y : this.y, z: this.z},
          netObjId: this.nameUniq,
      });
    } else {
      console.log("TEST PREVENT EMIT")
    }
  }

  SetY(newy, em) {
    this.y = newy;
    this.targetY = newy;
    this.inMove = false;
    if (net.connection && typeof em === 'undefined') net.connection.send({
      netPos: {x: this.x , y : this.y, z: this.z},
      netObjId: this.nameUniq,
    });
  }

  SetZ(newz, em) {
    this.z = newz;
    this.targetZ = newz;
    this.inMove = false;
    if (net.connection && typeof em === 'undefined') net.connection.send({
      netPos: {x: this.x , y : this.y, z: this.z},
      netObjId: this.nameUniq,
    });
  }

  setPosition(newx, newy, newz) {
    this.x = newx;
    this.y = newy;
    this.z = newz;
    this.targetX = newx;
    this.targetY = newy;
    this.targetZ = newz;
    this.inMove = false;
    if (net.connection && typeof em === 'undefined') net.connection.send({
      netPos: {x: this.x , y : this.y, z: this.z},
      netObjId: this.nameUniq,
    });
  }
}

export class TriangleVertex {
  constructor(root) {
    this.root = root;
    this.size = root.size;
    this.dynamicBuffer = App.dynamicBuffer;
    this.pointA = new Point(0.0, 1, 0.0);
    this.pointB = new Point(-1, -1, 0);
    this.pointC = new Point(1, -1, 0);
  }

  get vertices() {
    return new Float32Array([
      this.pointA.X,
      this.pointA.Y * this.root.size,
      this.pointA.Z,

      this.pointB.X * this.root.size,
      this.pointB.Y * this.root.size,
      this.pointB.Z,

      this.pointC.X * this.root.size,
      this.pointC.Y * this.root.size,
      this.pointC.Z
    ]);
  }

  get indices() {
    return [0, 1, 2]
  }

  setScale(scale) {
    this.size = scale;

    if(this.dynamicBuffer == true) return;
    App.operation.triangle_buffer_procedure(this.root);
    return "dynamicBuffer is false but i will update vertex array prototypical.";
  }
}

export class SquareVertex {
  constructor(root) {
    this.root = root;
    this.size = root.size;
    this.pointA = new Point(1, 1, 0);
    this.pointB = new Point(-1, 1, 0);
    this.pointC = new Point(1, -1, 0);
    this.pointD = new Point(-1, -1, 0);
    this.dynamicBuffer = true;

    this.texCoordsPoints = {
      right_top: new Point(1.0, 1.0, 0),
      left_top: new Point(0.0, 1.0, 0),
      right_bottom: new Point(1.0, 0.0, 0),
      left_bottom: new Point(0.0, 0.0, 0)
    };

    this.colorData = {};
    this.colorData.parent = this.root;
    // default
    this.colorData.color = [new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0), new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
    new COLOR_ALPHA(0.5, 0.0, 1.0, 1.0), new COLOR_ALPHA(0.5, 0.5, 1.0, 1.0)];
  }

  get vertices() {
    return new Float32Array([
      this.pointA.X * this.size,
      this.pointA.Y * this.size,
      this.pointA.Z,

      this.pointB.X * this.size,
      this.pointB.Y * this.size,
      this.pointB.Z,

      this.pointC.X * this.size,
      this.pointC.Y * this.size,
      this.pointC.Z,

      this.pointD.X * this.size,
      this.pointD.Y * this.size,
      this.pointD.Z
    ]);
  }

  get texCoords() {
    return new Float32Array([
      this.texCoordsPoints.right_top.X,
      this.texCoordsPoints.right_top.Y,
      this.texCoordsPoints.left_top.X,
      this.texCoordsPoints.left_top.Y,
      this.texCoordsPoints.right_bottom.X,
      this.texCoordsPoints.right_bottom.Y,
      this.texCoordsPoints.left_bottom.X,
      this.texCoordsPoints.left_bottom.Y
    ]);
  }

  get indices() {
    return [
      0,
      1,
      2,
      3,
      2,
      1 // F
    ];
  }

  // Setters
  setTexCoordScaleFactor(newScaleFactror) {
    this.texCoordsPoints.right_top.y = 1 + newScaleFactror;
    this.texCoordsPoints.right_top.x = 1 + newScaleFactror;
    this.texCoordsPoints.left_bottom.x = 0 - newScaleFactror;
    this.texCoordsPoints.left_bottom.y = 0 - newScaleFactror;
    this.texCoordsPoints.left_top.x = 0 - newScaleFactror;
    this.texCoordsPoints.left_top.y = 1 + newScaleFactror;
    this.texCoordsPoints.right_bottom.x = 1 + newScaleFactror;
    this.texCoordsPoints.right_bottom.y = 0 - newScaleFactror;
  }

  setScaleByX(scale) {
    this.pointA.x = scale;
    this.pointB.x = -scale;
    this.pointC.x = scale;
    this.pointD.x = -scale;

    if(this.dynamicBuffer == true) return;
    App.operation.square_buffer_procedure(this.root);
    return 'dynamicBuffer is false but i will update vertex array prototypical.';
  }

  setScaleByY(scale) {
    this.pointA.y = scale;
    this.pointB.y = scale;
    this.pointC.y = -scale;
    this.pointD.y = -scale;

    if(this.dynamicBuffer == true) return;
    App.operation.square_buffer_procedure(this.root);
    return 'dynamicBuffer is false but i will update vertex array prototypical.';
  }

  setScale(scale) {
    this.size = scale;

    if(this.dynamicBuffer == true) return;
    App.operation.square_buffer_procedure(this.root);
    return 'DynamicBuffer is false but i will update vertex array prototypical.';
  }

  get color() {
    var local = [];
    this.colorData.color.forEach((point) => {
      local.push(point.r);
      local.push(point.g);
      local.push(point.b);
      local.push(point.ALPHA());
    });
    return new Float32Array(local);
  }

  setColorSolid(red, green, blue, a) {
    if(typeof a === 'undefined') {
      var a = 1;
    }
    this.colorData.color.forEach((point, index, arr) => {
      arr[index].r = red;
      arr[index].g = green;
      arr[index].b = blue;
      arr[index].a = a;
    });
    App.operation.square_buffer_procedure(this.root);
  }

  setColorComponentRed(red) {
    this.colorData.color.forEach((point, index, arr) => {
      arr[index].r = red;
    });
    App.operation.square_buffer_procedure(this.root);
  }

  setColorComponentGreen(green) {
    this.colorData.color.forEach((point, index, arr) => {
      arr[index].g = green;
    });
    App.operation.square_buffer_procedure(this.root);
  }

  setColorComponentBlue(blue) {
    this.colorData.color.forEach((point, index, arr) => {
      arr[index].b = blue;
    });
    App.operation.square_buffer_procedure(this.root);
  }

}

export class CubeVertex {
  constructor(root) {
    this.root = root;
    this.size = root.size;
    this.basePoint = 1.0 * this.size;
    this.basePointNeg = -1.0 * this.size;
    this.dynamicBuffer = true;

    this.osciTest = new OSCILLATOR(0, 2, 0.002);

    this.texCoordsPoints = {
      front: {
        right_top: new Point(0.0, 0.0, 0),
        left_top: new Point(0.0, 1.0, 0),
        right_bottom: new Point(1.0, 1.0, 0),
        left_bottom: new Point(1.0, 0.0, 0)
      },
      back: {
        right_top: new Point(1.0, 1.0, 0),
        left_top: new Point(1.0, 0.0, 0),
        right_bottom: new Point(0.0, 0.0, 0),
        left_bottom: new Point(0.0, 1.0, 0)
      },
      top: {
        right_top: new Point(1.0, 0.0, 0),
        left_top: new Point(0.0, 0.0, 0),
        right_bottom: new Point(0.0, 1.0, 0),
        left_bottom: new Point(1.0, 1.0, 0)
      },
      bottom: {
        right_top: new Point(0.0, 0.0, 0),
        left_top: new Point(0.0, 1.0, 0),
        right_bottom: new Point(1.0, 1.0, 0),
        left_bottom: new Point(1.0, 0.0, 0)
      },
      right: {
        right_top: new Point(0.0, 0.0, 0),
        left_top: new Point(0.0, 1.0, 0),
        right_bottom: new Point(1.0, 1.0, 0),
        left_bottom: new Point(1.0, 0.0, 0)
      },
      left: {
        right_top: new Point(0.0, 0.0, 0),
        left_top: new Point(0.0, 1.0, 0),
        right_bottom: new Point(1.0, 1.0, 0),
        left_bottom: new Point(1.0, 0.0, 0)
      }
    };

    // for scale by ori
    this.Front = {
      pointA: new Point(0, 0, 0),
      pointB: new Point(0, 0, 0),
      pointC: new Point(0, 0, 0),
      pointD: new Point(0, 0, 0)
    };
    this.Back = {
      pointA: new Point(0, 0, 0),
      pointB: new Point(0, 0, 0),
      pointC: new Point(0, 0, 0),
      pointD: new Point(0, 0, 0)
    };
    this.Top = {
      pointA: new Point(0, 0, 0),
      pointB: new Point(0, 0, 0),
      pointC: new Point(0, 0, 0),
      pointD: new Point(0, 0, 0)
    };
    this.Bottom = {
      pointA: new Point(0, 0, 0),
      pointB: new Point(0, 0, 0),
      pointC: new Point(0, 0, 0),
      pointD: new Point(0, 0, 0)
    };
    this.Right = {
      pointA: new Point(0, 0, 0),
      pointB: new Point(0, 0, 0),
      pointC: new Point(0, 0, 0),
      pointD: new Point(0, 0, 0)
    };
    this.Left = {
      pointA: new Point(0, 0, 0),
      pointB: new Point(0, 0, 0),
      pointC: new Point(0, 0, 0),
      pointD: new Point(0, 0, 0)
    };

    this.colorData = {};
    this.colorData.parent = this.root;
    this.colorData.Front = {
      pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
      pointD: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0)
    };
    this.colorData.Back = {
      pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
      pointD: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0)
    };
    this.colorData.Top = {
      pointA: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
      pointD: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0)
    };
    this.colorData.Bottom = {
      pointA: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointD: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0)
    };
    this.colorData.Right = {
      pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointD: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0)
    };
    this.colorData.Left = {
      pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointD: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0)
    };

    this.colorData.SetRedForAll = function(red_) {
      this.Front.pointA.r = red_;
      this.Front.pointB.r = red_;
      this.Front.pointC.r = red_;
      this.Front.pointD.r = red_;
      this.Right.pointA.r = red_;
      this.Right.pointB.r = red_;
      this.Right.pointC.r = red_;
      this.Right.pointD.r = red_;
      this.Back.pointA.r = red_;
      this.Back.pointB.r = red_;
      this.Back.pointC.r = red_;
      this.Back.pointD.r = red_;
      this.Left.pointA.r = red_;
      this.Left.pointB.r = red_;
      this.Left.pointC.r = red_;
      this.Left.pointD.r = red_;
      this.Bottom.pointA.r = red_;
      this.Bottom.pointB.r = red_;
      this.Bottom.pointC.r = red_;
      this.Bottom.pointD.r = red_;
      this.Top.pointA.r = red_;
      this.Top.pointB.r = red_;
      this.Top.pointC.r = red_;
      this.Top.pointD.r = red_;
      App.operation.cube_buffer_procedure(this.parent);
    };

    this.colorData.SetGreenForAll = function(color_) {
      this.Front.pointA.g = color_;
      this.Front.pointB.g = color_;
      this.Front.pointC.g = color_;
      this.Front.pointD.g = color_;
      this.Right.pointA.g = color_;
      this.Right.pointB.g = color_;
      this.Right.pointC.g = color_;
      this.Right.pointD.g = color_;
      this.Back.pointA.g = color_;
      this.Back.pointB.g = color_;
      this.Back.pointC.g = color_;
      this.Back.pointD.g = color_;
      this.Left.pointA.g = color_;
      this.Left.pointB.g = color_;
      this.Left.pointC.g = color_;
      this.Left.pointD.g = color_;
      this.Bottom.pointA.g = color_;
      this.Bottom.pointB.g = color_;
      this.Bottom.pointC.g = color_;
      this.Bottom.pointD.g = color_;
      this.Top.pointA.g = color_;
      this.Top.pointB.g = color_;
      this.Top.pointC.g = color_;
      this.Top.pointD.g = color_;
      App.operation.cube_buffer_procedure(this.parent);
    };

    this.colorData.SetBlueForAll = function(color_) {
      this.Front.pointA.b = color_;
      this.Front.pointB.b = color_;
      this.Front.pointC.b = color_;
      this.Front.pointD.b = color_;
      this.Right.pointA.b = color_;
      this.Right.pointB.b = color_;
      this.Right.pointC.b = color_;
      this.Right.pointD.b = color_;
      this.Back.pointA.b = color_;
      this.Back.pointB.b = color_;
      this.Back.pointC.b = color_;
      this.Back.pointD.b = color_;
      this.Left.pointA.b = color_;
      this.Left.pointB.b = color_;
      this.Left.pointC.b = color_;
      this.Left.pointD.b = color_;
      this.Bottom.pointA.b = color_;
      this.Bottom.pointB.b = color_;
      this.Bottom.pointC.b = color_;
      this.Bottom.pointD.b = color_;
      this.Top.pointA.b = color_;
      this.Top.pointB.b = color_;
      this.Top.pointC.b = color_;
      this.Top.pointD.b = color_;
      App.operation.cube_buffer_procedure(this.parent);
    };

    this.colorData.SetFrontSolidColor = function(red, green, blue, a) {
      if(typeof a === 'undefined') {var a = 1;}
      this.Front.pointA.r = red;
      this.Front.pointA.g = green;
      this.Front.pointA.b = blue;
      this.Front.pointA.a = a;
      this.Front.pointB.r = red;
      this.Front.pointB.g = green;
      this.Front.pointB.b = blue;
      this.Front.pointB.a = a;
      this.Front.pointC.r = red;
      this.Front.pointC.g = green;
      this.Front.pointC.b = blue;
      this.Front.pointC.a = a;
      this.Front.pointD.r = red;
      this.Front.pointD.g = green;
      this.Front.pointD.b = blue;
      this.Front.pointD.a = a;
      App.operation.cube_buffer_procedure(this.parent);
    };

    this.colorData.SetRightSolidColor = function(red, green, blue, a) {
      if(typeof a === 'undefined') {var a = 1;}
      this.Right.pointA.r = red;
      this.Right.pointA.g = green;
      this.Right.pointA.b = blue;
      this.Right.pointA.a = a;
      this.Right.pointB.r = red;
      this.Right.pointB.g = green;
      this.Right.pointB.b = blue;
      this.Right.pointB.a = a;
      this.Right.pointC.r = red;
      this.Right.pointC.g = green;
      this.Right.pointC.b = blue;
      this.Right.pointC.a = a;
      this.Right.pointD.r = red;
      this.Right.pointD.g = green;
      this.Right.pointD.b = blue;
      this.Right.pointD.a = a;
      App.operation.cube_buffer_procedure(this.parent);
    };

    this.colorData.SetBackSolidColor = function(red, green, blue, a) {
      if(typeof a === 'undefined') {var a = 1;}
      this.Back.pointA.r = red;
      this.Back.pointA.g = green;
      this.Back.pointA.b = blue;
      this.Back.pointA.a = a;
      this.Back.pointB.r = red;
      this.Back.pointB.g = green;
      this.Back.pointB.b = blue;
      this.Back.pointB.a = a;
      this.Back.pointC.r = red;
      this.Back.pointC.g = green;
      this.Back.pointC.b = blue;
      this.Back.pointC.a = a;
      this.Back.pointD.r = red;
      this.Back.pointD.g = green;
      this.Back.pointD.b = blue;
      this.Back.pointD.a = a;
      App.operation.cube_buffer_procedure(this.parent);
    };

    this.colorData.SetLeftSolidColor = function(red, green, blue, a) {
      if(typeof a === 'undefined') {var a = 1;}
      this.Left.pointA.r = red;
      this.Left.pointA.g = green;
      this.Left.pointA.b = blue;
      this.Left.pointA.a = a;
      this.Left.pointB.r = red;
      this.Left.pointB.g = green;
      this.Left.pointB.b = blue;
      this.Left.pointB.a = a;
      this.Left.pointC.r = red;
      this.Left.pointC.g = green;
      this.Left.pointC.b = blue;
      this.Left.pointC.a = a;
      this.Left.pointD.r = red;
      this.Left.pointD.g = green;
      this.Left.pointD.b = blue;
      this.Left.pointD.a = a;
      App.operation.cube_buffer_procedure(this.parent);
    };

    this.colorData.SetBottomSolidColor = function(red, green, blue, a) {
      if(typeof a === 'undefined') {var a = 1;}
      this.Bottom.pointA.r = red;
      this.Bottom.pointA.g = green;
      this.Bottom.pointA.b = blue;
      this.Bottom.pointA.a = a;
      this.Bottom.pointB.r = red;
      this.Bottom.pointB.g = green;
      this.Bottom.pointB.b = blue;
      this.Bottom.pointB.a = a;
      this.Bottom.pointC.r = red;
      this.Bottom.pointC.g = green;
      this.Bottom.pointC.b = blue;
      this.Bottom.pointC.a = a;
      this.Bottom.pointD.r = red;
      this.Bottom.pointD.g = green;
      this.Bottom.pointD.b = blue;
      this.Bottom.pointD.a = a;
      App.operation.cube_buffer_procedure(this.parent);
    };

    this.colorData.SetTopSolidColor = function(red, green, blue, a) {
      if(typeof a === 'undefined') {var a = 1;}
      this.Top.pointA.r = red;
      this.Top.pointA.g = green;
      this.Top.pointA.b = blue;
      this.Top.pointA.a = a;
      this.Top.pointB.r = red;
      this.Top.pointB.g = green;
      this.Top.pointB.b = blue;
      this.Top.pointB.a = a;
      this.Top.pointC.r = red;
      this.Top.pointC.g = green;
      this.Top.pointC.b = blue;
      this.Top.pointC.a = a;
      this.Top.pointD.r = red;
      this.Top.pointD.g = green;
      this.Top.pointD.b = blue;
      this.Top.pointD.a = a;
      App.operation.cube_buffer_procedure(this.parent);
    };

    this.colorData.SetSolidColor = function(red, green, blue, a) {
      this.SetBottomSolidColor(red, green, blue, a);
      this.SetLeftSolidColor(red, green, blue, a);
      this.SetBackSolidColor(red, green, blue, a);
      this.SetRightSolidColor(red, green, blue, a);
      this.SetFrontSolidColor(red, green, blue, a);
      this.SetTopSolidColor(red, green, blue, a);
    }
  }

  setScaleByX(scale) {
    //for scale
    this.Left.pointA.x = -scale;
    this.Left.pointB.x = -scale;
    this.Left.pointC.x = -scale;
    this.Left.pointD.x = -scale;
    this.Right.pointA.x = scale;
    this.Right.pointB.x = scale;
    this.Right.pointC.x = scale;
    this.Right.pointD.x = scale;
    this.Top.pointA.x = -scale;
    this.Top.pointB.x = -scale;
    this.Top.pointC.x = scale;
    this.Top.pointD.x = scale;
    this.Bottom.pointA.x = -scale;
    this.Bottom.pointB.x = scale;
    this.Bottom.pointC.x = scale;
    this.Bottom.pointD.x = -scale;
    this.Front.pointA.x = -scale;
    this.Front.pointB.x = scale;
    this.Front.pointC.x = scale;
    this.Front.pointD.x = -scale;
    this.Back.pointA.x = -scale;
    this.Back.pointB.x = -scale;
    this.Back.pointC.x = scale;
    this.Back.pointD.x = scale;

    if(this.dynamicBuffer == true) return;
    App.operation.cube_buffer_procedure(this.root);
    return "dynamicBuffer is false but i will update vertex array prototypical.";
  }

  setScaleByY(scale) {
    //for scale
    this.Left.pointA.y = -scale;
    this.Left.pointB.y = -scale;
    this.Left.pointC.y = scale;
    this.Left.pointD.y = scale;

    this.Right.pointA.y = -scale;
    this.Right.pointB.y = scale;
    this.Right.pointC.y = scale;
    this.Right.pointD.y = -scale;

    this.Top.pointA.y = scale;
    this.Top.pointB.y = scale;
    this.Top.pointC.y = scale;
    this.Top.pointD.y = scale;

    this.Bottom.pointA.y = -scale;
    this.Bottom.pointB.y = -scale;
    this.Bottom.pointC.y = -scale;
    this.Bottom.pointD.y = -scale;

    this.Front.pointA.y = -scale;
    this.Front.pointB.y = -scale;
    this.Front.pointC.y = scale;
    this.Front.pointD.y = scale;

    this.Back.pointA.y = -scale;
    this.Back.pointB.y = scale;
    this.Back.pointC.y = scale;
    this.Back.pointD.y = -scale;

    if(this.dynamicBuffer == true) return;

    App.operation.cube_buffer_procedure(this.root);
    return "dynamicBuffer is false but i will update vertex array prototypical.";
  }

  setScaleByZ(scale) {
    this.Left.pointA.z = -scale;
    this.Left.pointB.z = scale;
    this.Left.pointC.z = scale;
    this.Left.pointD.z = -scale;

    this.Right.pointA.z = -scale;
    this.Right.pointB.z = -scale;
    this.Right.pointC.z = scale;
    this.Right.pointD.z = scale;

    this.Top.pointA.z = scale;
    this.Top.pointB.z = scale;
    this.Top.pointC.z = scale;
    this.Top.pointD.z = scale;

    this.Bottom.pointA.z = -scale;
    this.Bottom.pointB.z = -scale;
    this.Bottom.pointC.z = -scale;
    this.Bottom.pointD.z = -scale;

    this.Front.pointA.z = scale;
    this.Front.pointB.z = scale;
    this.Front.pointC.z = scale;
    this.Front.pointD.z = scale;

    this.Back.pointA.z = -scale;
    this.Back.pointB.z = -scale;
    this.Back.pointC.z = -scale;
    this.Back.pointD.z = -scale;

    if(this.dynamicBuffer == true) return;
    App.operation.cube_buffer_procedure(this.root);
    return "dynamicBuffer is false but i will update vertex array prototypical.";
  }

  setScale(scale) {
    this.size = scale;
    this.basePoint = 1.0 * this.size;
    this.basePointNeg = -1.0 * this.size;
    if(this.dynamicBuffer == true) return;

    App.operation.cube_buffer_procedure(this.root);
    return "dynamicBuffer is false but i will update vertex array prototypical.";
  }

  // Setters
  setTexCoordScaleFactor(newScaleFactror) {
    function calculate(checkValue) {
      if(checkValue <= 0) {
        return -1;
      } else {
        return 1;
      }
    }

    for(var key in this.texCoordsPoints) {
      this.texCoordsPoints[key].right_top.y =
        this.texCoordsPoints[key].right_top.y +
        newScaleFactror * calculate(this.texCoordsPoints[key].right_top.y);
      this.texCoordsPoints[key].right_top.x =
        this.texCoordsPoints[key].right_top.x +
        newScaleFactror * calculate(this.texCoordsPoints[key].right_top.x);
      this.texCoordsPoints[key].left_bottom.x =
        this.texCoordsPoints[key].left_bottom.x +
        newScaleFactror * calculate(this.texCoordsPoints[key].left_bottom.x);
      this.texCoordsPoints[key].left_bottom.y =
        this.texCoordsPoints[key].left_bottom.y +
        newScaleFactror * calculate(this.texCoordsPoints[key].left_bottom.y);
      this.texCoordsPoints[key].left_top.x =
        this.texCoordsPoints[key].left_top.x +
        newScaleFactror * calculate(this.texCoordsPoints[key].left_top.x);
      this.texCoordsPoints[key].left_top.y =
        this.texCoordsPoints[key].left_top.y +
        newScaleFactror * calculate(this.texCoordsPoints[key].left_top.y);
      this.texCoordsPoints[key].right_bottom.x =
        this.texCoordsPoints[key].right_bottom.x +
        newScaleFactror * calculate(this.texCoordsPoints[key].right_bottom.x);
      this.texCoordsPoints[key].right_bottom.y =
        this.texCoordsPoints[key].right_bottom.y +
        newScaleFactror * calculate(this.texCoordsPoints[key].right_bottom.y);
    }
  }

  get vertices() {
    return new Float32Array([
      // Front face
      this.basePointNeg + this.Front.pointA.X,
      this.basePointNeg + this.Front.pointA.Y,
      this.basePoint + this.Front.pointA.Z,
      this.basePoint + this.Front.pointB.X,
      this.basePointNeg + this.Front.pointB.Y,
      this.basePoint + this.Front.pointB.Z,
      this.basePoint + this.Front.pointC.X,
      this.basePoint + this.Front.pointC.Y,
      this.basePoint + this.Front.pointC.Z,
      this.basePointNeg + this.Front.pointD.X,
      this.basePoint + this.Front.pointD.Y,
      this.basePoint + this.Front.pointD.Z,
      // Back face
      this.basePointNeg + this.Back.pointA.X,
      this.basePointNeg + this.Back.pointA.Y,
      this.basePointNeg + this.Back.pointA.Z,
      this.basePointNeg + this.Back.pointB.X,
      this.basePoint + this.Back.pointB.Y,
      this.basePointNeg + this.Back.pointB.Z,
      this.basePoint + this.Back.pointC.X,
      this.basePoint + this.Back.pointC.Y,
      this.basePointNeg + this.Back.pointC.Z,
      this.basePoint + this.Back.pointD.X,
      this.basePointNeg + this.Back.pointD.Y,
      this.basePointNeg + this.Back.pointD.Z,
      // Top face
      this.basePointNeg + this.Top.pointA.X,
      this.basePoint + this.Top.pointA.Y,
      this.basePointNeg + this.Top.pointA.Z,
      this.basePointNeg + this.Top.pointB.X,
      this.basePoint + this.Top.pointB.Y,
      this.basePoint + this.Top.pointA.Z,
      this.basePoint + this.Top.pointC.X,
      this.basePoint + this.Top.pointC.Y,
      this.basePoint + this.Top.pointA.Z,
      this.basePoint + this.Top.pointD.X,
      this.basePoint + this.Top.pointD.Y,
      this.basePointNeg + this.Top.pointA.Z,
      // Bottom face
      this.basePointNeg + this.Bottom.pointA.X,
      this.basePointNeg + this.Bottom.pointA.Y,
      this.basePointNeg + this.Bottom.pointA.Z,
      this.basePoint + this.Bottom.pointB.X,
      this.basePointNeg + this.Bottom.pointB.Y,
      this.basePointNeg + this.Bottom.pointB.Z,
      this.basePoint + this.Bottom.pointC.X,
      this.basePointNeg + this.Bottom.pointC.Y,
      this.basePoint + this.Bottom.pointC.Z,
      this.basePointNeg + this.Bottom.pointD.X,
      this.basePointNeg + this.Bottom.pointD.Y,
      this.basePoint + this.Bottom.pointD.Z,
      // Right face
      this.basePoint + this.Right.pointA.X,
      this.basePointNeg + this.Right.pointA.Y,
      this.basePointNeg + this.Right.pointA.Z,
      this.basePoint + this.Right.pointB.X,
      this.basePoint + this.Right.pointB.Y,
      this.basePointNeg + this.Right.pointB.Z,
      this.basePoint + this.Right.pointC.X,
      this.basePoint + this.Right.pointC.Y,
      this.basePoint + this.Right.pointC.Z,
      this.basePoint + this.Right.pointD.X,
      this.basePointNeg + this.Right.pointD.Y,
      this.basePoint + this.Right.pointD.Z,
      // Left face
      this.basePointNeg + this.Left.pointA.X,
      this.basePointNeg + this.Left.pointA.Y,
      this.basePointNeg + this.Left.pointA.Z,
      this.basePointNeg + this.Left.pointB.X,
      this.basePointNeg + this.Left.pointB.Y,
      this.basePoint + this.Left.pointB.Z,
      this.basePointNeg + this.Left.pointC.X,
      this.basePoint + this.Left.pointC.Y,
      this.basePoint + this.Left.pointC.Z,
      this.basePointNeg + this.Left.pointD.X,
      this.basePoint + this.Left.pointD.Y,
      this.basePointNeg + this.Left.pointD.Z
    ]);
  }

  get texCoords() {
    return new Float32Array([
      // Front face
      this.texCoordsPoints.front.right_top.X,
      this.texCoordsPoints.front.right_top.Y,
      this.texCoordsPoints.front.left_top.X,
      this.texCoordsPoints.front.left_top.Y,
      this.texCoordsPoints.front.right_bottom.X,
      this.texCoordsPoints.front.right_bottom.Y,
      this.texCoordsPoints.front.left_bottom.X,
      this.texCoordsPoints.front.left_bottom.Y,
      // Back face
      this.texCoordsPoints.back.right_top.X,
      this.texCoordsPoints.back.right_top.Y,
      this.texCoordsPoints.back.left_top.X,
      this.texCoordsPoints.back.left_top.Y,
      this.texCoordsPoints.back.right_bottom.X,
      this.texCoordsPoints.back.right_bottom.Y,
      this.texCoordsPoints.back.left_bottom.X,
      this.texCoordsPoints.back.left_bottom.Y,
      // Top face
      this.texCoordsPoints.top.right_top.X,
      this.texCoordsPoints.top.right_top.Y,
      this.texCoordsPoints.top.left_top.X,
      this.texCoordsPoints.top.left_top.Y,
      this.texCoordsPoints.top.right_bottom.X,
      this.texCoordsPoints.top.right_bottom.Y,
      this.texCoordsPoints.top.left_bottom.X,
      this.texCoordsPoints.top.left_bottom.Y,
      // Bottom face
      this.texCoordsPoints.bottom.right_top.X,
      this.texCoordsPoints.bottom.right_top.Y,
      this.texCoordsPoints.bottom.left_top.X,
      this.texCoordsPoints.bottom.left_top.Y,
      this.texCoordsPoints.bottom.right_bottom.X,
      this.texCoordsPoints.bottom.right_bottom.Y,
      this.texCoordsPoints.bottom.left_bottom.X,
      this.texCoordsPoints.bottom.left_bottom.Y,
      // Right face
      this.texCoordsPoints.right.right_top.X,
      this.texCoordsPoints.right.right_top.Y,
      this.texCoordsPoints.right.left_top.X,
      this.texCoordsPoints.right.left_top.Y,
      this.texCoordsPoints.right.right_bottom.X,
      this.texCoordsPoints.right.right_bottom.Y,
      this.texCoordsPoints.right.left_bottom.X,
      this.texCoordsPoints.right.left_bottom.Y,
      // Left face
      this.texCoordsPoints.left.right_top.X,
      this.texCoordsPoints.left.right_top.Y,
      this.texCoordsPoints.left.left_top.X,
      this.texCoordsPoints.left.left_top.Y,
      this.texCoordsPoints.left.right_bottom.X,
      this.texCoordsPoints.left.right_bottom.Y,
      this.texCoordsPoints.left.left_bottom.X,
      this.texCoordsPoints.left.left_bottom.Y
    ]);
  }

  get indices() {
    return [
      0, 1, 2, 0, 2, 3, // front
      4, 5, 6, 4, 6, 7, // back
      8, 9, 10, 8, 10, 11, // top
      12, 13, 14, 12, 14, 15, // bottom
      16, 17, 18, 16, 18, 19, // right
      20, 21, 22, 20, 22, 23 // left
    ];
  }

  get color() {
    return new Float32Array([
      // Front face
      this.colorData.Front.pointA.r,
      this.colorData.Front.pointA.g,
      this.colorData.Front.pointA.b,
      this.colorData.Front.pointA.ALPHA(),
      this.colorData.Front.pointB.r,
      this.colorData.Front.pointB.g,
      this.colorData.Front.pointB.b,
      this.colorData.Front.pointB.ALPHA(),
      this.colorData.Front.pointC.r,
      this.colorData.Front.pointC.g,
      this.colorData.Front.pointC.b,
      this.colorData.Front.pointC.ALPHA(),
      this.colorData.Front.pointD.r,
      this.colorData.Front.pointD.g,
      this.colorData.Front.pointD.b,
      this.colorData.Front.pointD.ALPHA(),
      // Right face
      this.colorData.Right.pointA.r,
      this.colorData.Right.pointA.g,
      this.colorData.Right.pointA.b,
      this.colorData.Right.pointA.ALPHA(),
      this.colorData.Right.pointB.r,
      this.colorData.Right.pointB.g,
      this.colorData.Right.pointB.b,
      this.colorData.Right.pointB.ALPHA(),
      this.colorData.Right.pointC.r,
      this.colorData.Right.pointC.g,
      this.colorData.Right.pointC.b,
      this.colorData.Right.pointC.ALPHA(),
      this.colorData.Right.pointD.r,
      this.colorData.Right.pointD.g,
      this.colorData.Right.pointD.b,
      this.colorData.Right.pointD.ALPHA(),
      // Back face
      this.colorData.Back.pointA.r,
      this.colorData.Back.pointA.g,
      this.colorData.Back.pointA.b,
      this.colorData.Back.pointA.ALPHA(),
      this.colorData.Back.pointB.r,
      this.colorData.Back.pointB.g,
      this.colorData.Back.pointB.b,
      this.colorData.Back.pointB.ALPHA(),
      this.colorData.Back.pointC.r,
      this.colorData.Back.pointC.g,
      this.colorData.Back.pointC.b,
      this.colorData.Back.pointC.ALPHA(),
      this.colorData.Back.pointD.r,
      this.colorData.Back.pointD.g,
      this.colorData.Back.pointD.b,
      this.colorData.Back.pointD.ALPHA(),
      // Left face
      this.colorData.Left.pointA.r,
      this.colorData.Left.pointA.g,
      this.colorData.Left.pointA.b,
      this.colorData.Left.pointA.ALPHA(),
      this.colorData.Left.pointB.r,
      this.colorData.Left.pointB.g,
      this.colorData.Left.pointB.b,
      this.colorData.Left.pointB.ALPHA(),
      this.colorData.Left.pointC.r,
      this.colorData.Left.pointC.g,
      this.colorData.Left.pointC.b,
      this.colorData.Left.pointC.ALPHA(),
      this.colorData.Left.pointD.r,
      this.colorData.Left.pointD.g,
      this.colorData.Left.pointD.b,
      this.colorData.Left.pointD.ALPHA(),
      // Bottom left
      this.colorData.Bottom.pointA.r,
      this.colorData.Bottom.pointA.g,
      this.colorData.Bottom.pointA.b,
      this.colorData.Bottom.pointA.ALPHA(),
      this.colorData.Bottom.pointB.r,
      this.colorData.Bottom.pointB.g,
      this.colorData.Bottom.pointB.b,
      this.colorData.Bottom.pointB.ALPHA(),
      this.colorData.Bottom.pointC.r,
      this.colorData.Bottom.pointC.g,
      this.colorData.Bottom.pointC.b,
      this.colorData.Bottom.pointC.ALPHA(),
      this.colorData.Bottom.pointD.r,
      this.colorData.Bottom.pointD.g,
      this.colorData.Bottom.pointD.b,
      this.colorData.Bottom.pointD.ALPHA(),
      // Bottom right BottomRight
      this.colorData.Top.pointA.r,
      this.colorData.Top.pointA.g,
      this.colorData.Top.pointA.b,
      this.colorData.Top.pointA.ALPHA(),
      this.colorData.Top.pointB.r,
      this.colorData.Top.pointB.g,
      this.colorData.Top.pointB.b,
      this.colorData.Top.pointB.ALPHA(),
      this.colorData.Top.pointC.r,
      this.colorData.Top.pointC.g,
      this.colorData.Top.pointC.b,
      this.colorData.Top.pointC.ALPHA(),
      this.colorData.Top.pointD.r,
      this.colorData.Top.pointD.g,
      this.colorData.Top.pointD.b,
      this.colorData.Top.pointD.ALPHA()
    ]);
  }
}

export class GeoOfColor {
  constructor(type_) {
    if(typeof type_ != "undefined") {
      if(type_ == "4x4" || type_ == "square") {
        return new Float32Array([
          1.0, 0.0, 0.0, 1.0, //Top right
          0.0, 1.0, 0.0, 1.0, //Top left
          0.0, 0.0, 1.0, 1.0, //Bottom right
          0.5, 1.0, 0.5, 1.0 //Bottom left
        ]);
      } else if(type_ == "triangle") {
        return [
          1.0, 0.0, 0.0, 1.0, // Top
          0.0, 1.0, 0.0, 1.0, // Right
          0.0, 0.0, 1.0, 1.0 // Bottom
        ];
      } else if(type_ == "Piramide4") {
        this.front = "test";
        return new Float32Array([
          // Front face
          1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
          // Right face
          1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0,
          // Back face
          1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
          // Left face
          1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0,
          // Bottom left
          0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0,
          // Bottom right
          0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0
        ]);
      } else if(type_ == "cube") {
        return [
          [1.0, 1.0, 1.0, 1.0], // Front
          [1.0, 1.0, 0.0, 1.0], // Back
          [0.0, 1.0, 0.0, 1.0], // Top
          [1.0, 0.5, 0.5, 1.0], // Bottom
          [1.0, 0.0, 1.0, 1.0], // Right
          [0.0, 0.0, 1.0, 1.0]  // Left
        ];
      } else if(type_ == "cubelight" || type_ == "cube light") {
        return new Float32Array([
          // F
          0, 0, 1,
          0, 0, 1,
          0, 0, 1,
          0, 0, 1,
          // B
          0, 0, -1,
          0, 0, -1,
          0, 0, -1,
          0, 0, -1,
          // T
          0, 1, 0,
          0, 1, 0,
          0, 1, 0,
          0, 1, 0,
          // Bo
          0, -1, 0,
          0, -1, 0,
          0, -1, 0,
          0, -1, 0,
          // R
          1, 0, 0,
          1, 0, 0,
          1, 0, 0,
          1, 0, 0,
          // L
          -1, 0, 0,
          -1, 0, 0,
          -1, 0, 0,
          -1, 0, 0,
        ]);
        // org
        // return new Float32Array( [
        //   // Front face
        //   0.0, 0.0, 1.0, 1, 0.0, 0.0, 1.0, 1, 0.0, 0.0, 1.0, 1, 0.0, 0.0, 1.0, 1,
        //   // Back face
        //   0.0, 0.0, -1.0, 1, 0.0, 0.0, -1.0, 1, 0.0, 0.0, -1.0, 1, 0.0, 0.0, -1.0, 1,
        //   // Top face
        //   0.0, 1.0, 0.0, 1, 0.0, 1.0, 0.0, 1, 0.0, 1.0, 0.0, 1, 0.0, 1.0, 0.0, 1,
        //   // Bottom face
        //   0.0, -1.0, 0.0, 1, 0.0, -1.0, 0.0, 1, 0.0, -1.0, 0.0, 1, 0.0, -1.0, 0.0, 1,
        //   // Right face
        //   1.0, 0.0, 0.0, 1, 1.0, 0.0, 0.0, 1, 1.0, 0.0, 0.0, 1, 1.0, 0.0, 0.0, 1,
        //   // Left face
        //   -1.0, 0.0, 0.0, 1, -1.0, 0.0, 0.0, 1, -1.0, 0.0, 0.0, 1, -1.0, 0.0, 0.0, 1
        // ]);
      }
    } else {
      return [
        1.0, 0.0, 0.0, 1.0, // Top right
        0.0, 1.0, 0.0, 1.0, // Top left
        0.0, 0.0, 1.0, 1.0, // Bottom right
        0.5, 1.0, 0.5, 1.0  // Bottom left
      ];
    }
  }
}

export class PiramideVertex {
  constructor(root) {
    this.root = root;
    this.size = root.size;

    this.dynamicBuffer = true;
    this.spitz = 0;
    this.basePoint = 1.0 * this.size;
    this.basePointNeg = -1.0 * this.size;

    this.colorData = {};
    this.colorData.parent = this.root;

    this.colorData.Front = {
      pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0)
    };
    this.colorData.Back = {
      pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0)
    };
    this.colorData.BottomRight = {
      pointA: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0)
    };
    this.colorData.Bottom = {
      pointA: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0)
    };
    this.colorData.Right = {
      pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0)
    };
    this.colorData.Left = {
      pointA: new COLOR_ALPHA(1.0, 0.0, 0.0, 1.0),
      pointB: new COLOR_ALPHA(0.0, 0.0, 1.0, 1.0),
      pointC: new COLOR_ALPHA(0.0, 1.0, 0.0, 1.0)
    };

    this.colorData.SetRedForAll = function(red_) {
      // Front
      this.Front.pointA.r = red_;
      this.Front.pointB.r = red_;
      this.Front.pointC.r = red_;
      // Right
      this.Right.pointA.r = red_;
      this.Right.pointB.r = red_;
      this.Right.pointC.r = red_;
      // Back
      this.Back.pointA.r = red_;
      this.Back.pointB.r = red_;
      this.Back.pointC.r = red_;
      // Left
      this.Left.pointA.r = red_;
      this.Left.pointB.r = red_;
      this.Left.pointC.r = red_;
      // Bottom left
      this.Bottom.pointA.r = red_;
      this.Bottom.pointB.r = red_;
      this.Bottom.pointC.r = red_;
      // Bottom right
      this.BottomRight.pointA.r = red_;
      this.BottomRight.pointB.r = red_;
      this.BottomRight.pointC.r = red_;

      App.operation.piramide_buffer_procedure(this.parent);
    };

    this.colorData.SetGreenForAll = function(color_) {
      // Front face
      this.Front.pointA.g = color_;
      this.Front.pointB.g = color_;
      this.Front.pointC.g = color_;
      // Right face
      this.Right.pointA.g = color_;
      this.Right.pointB.g = color_;
      this.Right.pointC.g = color_;
      // Back face
      this.Back.pointA.g = color_;
      this.Back.pointB.g = color_;
      this.Back.pointC.g = color_;
      // Left face
      this.Left.pointA.g = color_;
      this.Left.pointB.g = color_;
      this.Left.pointC.g = color_;
      // Bottom left
      this.Bottom.pointA.g = color_;
      this.Bottom.pointB.g = color_;
      this.Bottom.pointC.g = color_;
      // Bottom right BottomRight
      this.BottomRight.pointA.g = color_;
      this.BottomRight.pointB.g = color_;
      this.BottomRight.pointC.g = color_;

      App.operation.piramide_buffer_procedure(this.parent);
    };

    this.colorData.SetBlueForAll = function(color_) {
      // Front face
      this.Front.pointA.b = color_;
      this.Front.pointB.b = color_;
      this.Front.pointC.b = color_;
      // Right face
      this.Right.pointA.b = color_;
      this.Right.pointB.b = color_;
      this.Right.pointC.b = color_;
      // Back face
      this.Back.pointA.b = color_;
      this.Back.pointB.b = color_;
      this.Back.pointC.b = color_;
      // Left face
      this.Left.pointA.b = color_;
      this.Left.pointB.b = color_;
      this.Left.pointC.b = color_;
      // Bottom left
      this.Bottom.pointA.b = color_;
      this.Bottom.pointB.b = color_;
      this.Bottom.pointC.b = color_;
      // Bottom right BottomRight
      this.BottomRight.pointA.b = color_;
      this.BottomRight.pointB.b = color_;
      this.BottomRight.pointC.b = color_;
      App.operation.piramide_buffer_procedure(this.parent);
    };
  }

  setScale(scale) {
    this.size = scale;

    this.basePoint = 1.0 * this.size;
    this.basePointNeg = -1.0 * this.size;

    if(this.dynamicBuffer == true) return;
    App.operation.piramide_buffer_procedure(this.root);
    return "dynamicBuffer is false but i will update vertex array prototypical.";
  }

  setSpitz(newValueFloat) {
    this.spitz = newValueFloat;

    if(this.dynamicBuffer == true) return;
    App.operation.piramide_buffer_procedure(this.root);
  }
  //from cube
  get verticesC() {
    return new Float32Array([
      // Front face
      -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 0.0, 15.0, 0.0, 0.0, 15.0, 0.0,
      // Back face
      -1.0, -1.0, -1.0, 0.0, 15.0, 0.0, 0.0, 15.0, 0.0, 1.0, -1.0, -1.0,
      // Top face
      0.0, 15.0, 0.0, 0.0, 15.0, 0.0, 0.0, 15.0, 0.0, 0.0, 15.0, 0.0,
      // Bottom face
      -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
      // Right face
      1.0, -1.0, -1.0, 0.0, 15.0, 0.0, 0.0, 15.0, 0.0, 1.0, -1.0, 1.0,
      // Left face
      -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 0.0, 15.0, 0.0, 0.0, 15.0, 0.0
    ]);
  }

  get normals() {
    // from cube
    return new Float32Array([
      // Front face
      0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
      // Back face
      0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,
      // Top face
      0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
      // Bottom face
      0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
      // Right face
      1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
      // Left face
      -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0
    ]);
  }
  // from cube
  get texCoords() {
    return new Float32Array([
      // Front face
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
      // Back face
      1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
      // Top face
      0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
      // Bottom face
      1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
      // Right face
      1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
      // Left face
      0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0
    ]);
  }

  get indices() {
    return [
      0, 1, 2, 0, 2, 3, // Front face
      4, 5, 6, 4, 6, 7, // Back face
      8, 9, 10, 8, 10, 11, // Top face
      12, 13, 14, 12, 14, 15, // Bottom face
      16, 17, 18, 16, 18, 19, // Right face
      20, 21, 22, 20, 22, 23  // Left face
    ];
  }

  get color() {
    return new Float32Array([
      // Front face
      this.colorData.Front.pointA.r,
      this.colorData.Front.pointA.g,
      this.colorData.Front.pointA.b,
      this.colorData.Front.pointA.ALPHA(),
      this.colorData.Front.pointB.r,
      this.colorData.Front.pointB.g,
      this.colorData.Front.pointB.b,
      this.colorData.Front.pointB.ALPHA(),
      this.colorData.Front.pointC.r,
      this.colorData.Front.pointC.g,
      this.colorData.Front.pointC.b,
      this.colorData.Front.pointC.ALPHA(),
      // Right face
      this.colorData.Right.pointA.r,
      this.colorData.Right.pointA.g,
      this.colorData.Right.pointA.b,
      this.colorData.Right.pointA.ALPHA(),
      this.colorData.Right.pointB.r,
      this.colorData.Right.pointB.g,
      this.colorData.Right.pointB.b,
      this.colorData.Right.pointB.ALPHA(),
      this.colorData.Right.pointC.r,
      this.colorData.Right.pointC.g,
      this.colorData.Right.pointC.b,
      this.colorData.Right.pointC.ALPHA(),
      // Back face
      this.colorData.Back.pointA.r,
      this.colorData.Back.pointA.g,
      this.colorData.Back.pointA.b,
      this.colorData.Back.pointA.ALPHA(),
      this.colorData.Back.pointB.r,
      this.colorData.Back.pointB.g,
      this.colorData.Back.pointB.b,
      this.colorData.Back.pointB.ALPHA(),
      this.colorData.Back.pointC.r,
      this.colorData.Back.pointC.g,
      this.colorData.Back.pointC.b,
      this.colorData.Back.pointC.ALPHA(),
      // Left face
      this.colorData.Left.pointA.r,
      this.colorData.Left.pointA.g,
      this.colorData.Left.pointA.b,
      this.colorData.Left.pointA.ALPHA(),
      this.colorData.Left.pointB.r,
      this.colorData.Left.pointB.g,
      this.colorData.Left.pointB.b,
      this.colorData.Left.pointB.ALPHA(),
      this.colorData.Left.pointC.r,
      this.colorData.Left.pointC.g,
      this.colorData.Left.pointC.b,
      this.colorData.Left.pointC.ALPHA(),
      // Bottom left
      this.colorData.Bottom.pointA.r,
      this.colorData.Bottom.pointA.g,
      this.colorData.Bottom.pointA.b,
      this.colorData.Bottom.pointA.ALPHA(),
      this.colorData.Bottom.pointB.r,
      this.colorData.Bottom.pointB.g,
      this.colorData.Bottom.pointB.b,
      this.colorData.Bottom.pointB.ALPHA(),
      this.colorData.Bottom.pointC.r,
      this.colorData.Bottom.pointC.g,
      this.colorData.Bottom.pointC.b,
      this.colorData.Bottom.pointC.ALPHA(),
      // Bottom right
      this.colorData.BottomRight.pointA.r,
      this.colorData.BottomRight.pointA.g,
      this.colorData.BottomRight.pointA.b,
      this.colorData.BottomRight.pointA.ALPHA(),
      this.colorData.BottomRight.pointB.r,
      this.colorData.BottomRight.pointB.g,
      this.colorData.BottomRight.pointB.b,
      this.colorData.BottomRight.pointB.ALPHA(),
      this.colorData.BottomRight.pointC.r,
      this.colorData.BottomRight.pointC.g,
      this.colorData.BottomRight.pointC.b,
      this.colorData.BottomRight.pointC.ALPHA()
    ]);
  }
  get vertices() {
    return new Float32Array([
      0.0,
      this.basePoint + this.spitz,
      0.0,
      this.basePointNeg,
      this.basePointNeg,
      this.basePoint,
      this.basePoint,
      this.basePointNeg,
      this.basePoint,

      // Right face
      0.0,
      this.basePoint + this.spitz,
      0.0,
      this.basePoint,
      this.basePointNeg,
      this.basePoint,
      this.basePoint,
      this.basePointNeg,
      this.basePointNeg,

      // Back face
      0.0,
      this.basePoint + this.spitz,
      0.0,
      this.basePoint,
      this.basePointNeg,
      this.basePointNeg,
      this.basePointNeg,
      this.basePointNeg,
      this.basePointNeg,

      // Left face
      0.0,
      this.basePoint + this.spitz,
      0.0,
      this.basePointNeg,
      this.basePointNeg,
      this.basePointNeg,
      this.basePointNeg,
      this.basePointNeg,
      this.basePoint,

      //Bottom left
      this.basePointNeg,
      this.basePointNeg,
      this.basePoint,
      this.basePoint,
      this.basePointNeg,
      this.basePoint,
      this.basePoint,
      this.basePointNeg,
      this.basePointNeg,

      //Bottom right
      this.basePointNeg,
      this.basePointNeg,
      this.basePoint,
      this.basePoint,
      this.basePointNeg,
      this.basePointNeg,
      this.basePointNeg,
      this.basePointNeg,
      this.basePointNeg
    ]);
  }
}

export class sphereVertex {
  createGeoData(root) {

    this.size = root.size;
    this.basePoint = 1.0 * this.size;
    this.basePointNeg = -1.0 * this.size;
    this.dynamicBuffer = true;
    this.latitudeBands = root.latitudeBands;
    this.longitudeBands = root.longitudeBands;
    this.radius = root.radius;

    this.vertexPositionData = [];
    this.normalData = [];
    this.textureCoordData = [];

    for(var latNumber = 0;latNumber <= this.latitudeBands;latNumber++) {
      var theta = (latNumber * Math.PI) / this.latitudeBands;
      var sinTheta = Math.sin(theta);
      var cosTheta = Math.cos(theta);

      for(
        var longNumber = 0;
        longNumber <= this.longitudeBands;
        longNumber++
      ) {
        var phi = (longNumber * 2 * Math.PI) / this.longitudeBands;
        var sinPhi = Math.sin(phi);
        var cosPhi = Math.cos(phi);

        var x = cosPhi * sinTheta;
        var y = cosTheta;
        var z = sinPhi * sinTheta;
        var u = 1 - longNumber / this.longitudeBands;
        var v = 1 - latNumber / this.latitudeBands;

        this.normalData.push(x);
        this.normalData.push(y);
        this.normalData.push(z);
        this.textureCoordData.push(u);
        this.textureCoordData.push(v);
        this.vertexPositionData.push(this.radius * x);
        this.vertexPositionData.push(this.radius * y);
        this.vertexPositionData.push(this.radius * z);
      }
    }

    this.indexData = [];
    for(var latNumber = 0;latNumber < this.latitudeBands;latNumber++) {
      for(var longNumber = 0;longNumber < this.longitudeBands;longNumber++) {
        var first = latNumber * (this.longitudeBands + 1) + longNumber;
        var second = first + this.longitudeBands + 1;
        this.indexData.push(first);
        this.indexData.push(second);
        this.indexData.push(first + 1);

        this.indexData.push(second);
        this.indexData.push(second + 1);
        this.indexData.push(first + 1);
      }
    }
  }

  constructor(root) {
    this.root = root;
    this.createGeoData(this.root);
  }

  setRadius(scale) {
    this.radius = scale;
    this.root.radius = scale;

    if(this.dynamicBuffer == true) {
      this.createGeoData(this.root);
      App.operation.sphere_buffer_procedure(this.root);
      return;
    }

    //App.operation.sphere_buffer_procedure(this.root)
    //return 'dynamicBuffer is false but i will update vertex array prototypical.';
  }

  get vertices() {
    return new Float32Array(this.vertexPositionData);
  }

  get texCoords() {
    return new Float32Array(this.textureCoordData);
  }

  get normals() {
    return new Float32Array(this.normalData);
  }

  get indices() {
    return this.indexData;
  }
}

export class customVertex {
  createGeoData(root) {
    this.size = root.size;
    this.basePoint = 1.0 * this.size;
    this.basePointNeg = -1.0 * this.size;
    this.dynamicBuffer = true;

    this.latitudeBands = root.latitudeBands;
    this.longitudeBands = root.longitudeBands;
    this.radius = root.radius;

    this.vertexPositionData = [];
    this.normalData = [];
    this.textureCoordData = [];

    if(this.root.custom_type == "spiral") {
      for(var latNumber = 0;latNumber <= this.latitudeBands;latNumber++) {
        var theta = (latNumber * Math.PI) / this.latitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        for(
          var longNumber = 0;
          longNumber <= this.longitudeBands;
          longNumber++
        ) {
          var phi = (longNumber * 2 * Math.PI) / this.longitudeBands;
          var sinPhi = Math.sin(phi);
          var cosPhi = Math.cos(phi);

          var x = latNumber * cosPhi;
          var y = longNumber * sinPhi;
          var z = longNumber * cosPhi;

          var u = 1 - longNumber / this.longitudeBands;
          var v = 1 - latNumber / this.latitudeBands;

          this.normalData.push(x);
          this.normalData.push(y);
          this.normalData.push(z);
          this.textureCoordData.push(u);
          this.textureCoordData.push(v);
          this.vertexPositionData.push(this.radius * x);
          this.vertexPositionData.push(this.radius * y);
          this.vertexPositionData.push(this.radius * z);
        }
      }

      this.indexData = [];
      for(var latNumber = 0;latNumber < this.latitudeBands;latNumber++) {
        for(
          var longNumber = 0;
          longNumber < this.longitudeBands;
          longNumber++
        ) {
          var first = latNumber * (this.longitudeBands + 1) + longNumber;
          var second = first + this.longitudeBands + 1;
          this.indexData.push(first);
          this.indexData.push(second);
          this.indexData.push(first + 1);
          this.indexData.push(second);
          this.indexData.push(second + 1);
          this.indexData.push(first + 1);
        }
      }
    } else if(this.root.custom_type == "cubic") {
      for(var j = 0;j < 8;j++) {
        var x = j + 1 * S1.GET();
        var y = 1;
        var z = j + 1;

        this.normalData.push(x);
        this.normalData.push(y);
        this.normalData.push(z);
        this.textureCoordData.push(u);
        this.textureCoordData.push(v);
        this.vertexPositionData.push(this.radius * x);
        this.vertexPositionData.push(this.radius * y);
        this.vertexPositionData.push(this.radius * z);
      }

      this.indexData = [];
      for(var j = 0;j < 8;j++) {
        var first = 4 * (2 + 1) + j;
        var second = first + 2 + 1;
        this.indexData.push(first);
        this.indexData.push(second);
        this.indexData.push(first + 1);

        this.indexData.push(second);
        this.indexData.push(second + 1);
        this.indexData.push(first + 1);
      }
    }
  }

  constructor(root) {
    this.root = root;
    this.createGeoData(this.root);
  }

  setRadius(scale) {
    this.radius = scale;
    this.root.radius = scale;

    if(this.dynamicBuffer == true) {
      this.createGeoData(this.root);
      App.operation.sphere_buffer_procedure(this.root);
      this.root.glDrawElements.numberOfIndicesRender = this.indices.length;
      return;
    }

    App.operation.sphere_buffer_procedure(this.root);
    this.root.glDrawElements.numberOfIndicesRender = this.indices.length;
    return "dynamicBuffer is false but i will update vertex array prototypical.";
  }

  get vertices() {
    return new Float32Array(this.vertexPositionData);
  }

  get texCoords() {
    return new Float32Array(this.textureCoordData);
  }

  get normals() {
    return new Float32Array(this.normalData);
  }

  get indices() {
    return this.indexData;
  }
}

export function COLOR(r_, g_, b_) {
  var ROOT = this;
  ROOT.r = parseFloat(r_);
  ROOT.g = parseFloat(g_);
  ROOT.b = parseFloat(b_);

  ROOT.R = function() {
    return parseFloat(ROOT.r);
  };
  ROOT.G = function() {
    return parseFloat(ROOT.g);
  };
  ROOT.B = function() {
    return parseFloat(ROOT.b);
  };

  ROOT.set = function(r_, g_, b_) {
    ROOT.r = parseFloat(r_);
    ROOT.g = parseFloat(g_);
    ROOT.b = parseFloat(b_);
  };

  ROOT.print = function() {
    console.log(
      "color data RGB format : R:" + ROOT.r + "  G:" + ROOT.g + "  B:" + ROOT.b
    );
  };
}

export function COLOR_ALPHA(r_, g_, b_, a_) {
  var ROOT = this;
  ROOT.r = parseFloat(r_);
  ROOT.g = parseFloat(g_);
  ROOT.b = parseFloat(b_);

  if(typeof a_ == "undefined") {
    var a_ = 1.0;
  }

  ROOT.a = parseFloat(a_);

  ROOT.R = function() {
    return parseFloat(ROOT.r);
  };
  ROOT.G = function() {
    return parseFloat(ROOT.g);
  };
  ROOT.B = function() {
    return parseFloat(ROOT.b);
  };
  ROOT.ALPHA = function() {
    return parseFloat(ROOT.a);
  };

  ROOT.set = function(r_, g_, b_, a_) {
    ROOT.r = parseFloat(r_);
    ROOT.g = parseFloat(g_);
    ROOT.b = parseFloat(b_);
    ROOT.a = parseFloat(a_);
  };

  ROOT.print = function() {
    console.log("color data RGB format : R:" +
      ROOT.r + "  G:" + ROOT.g + "  B:" + ROOT.b + "  ALPHA:" + ROOT.ALPHA);
  };
}

export class customVertex_1 {
  createGeoData(root) {
    if(arguments.length == 0) {
      // console.log( "test this ?? " );
    }

    var innerRadius = 0.25;
    var outerRadius = outerRadius || innerRadius * 2 || 0.5;
    var slices = slices || 32;

    var vertexCount, vertices, normals, texCoords, indices, i;
    vertexCount = innerRadius == 0 ? slices + 1 : slices * 2;
    vertices = new Float32Array(3 * vertexCount);
    normals = new Float32Array(3 * vertexCount);
    texCoords = new Float32Array(2 * vertexCount);
    indices = new Uint16Array(innerRadius == 0 ? 3 * slices : 3 * 2 * slices);
    var d = (2 * Math.PI) / slices;
    var k = 0;
    var t = 0;
    var n = 0;
    if(innerRadius == 0) {
      for(i = 0;i < slices;i++) {
        var c = Math.cos(d * i);
        var s = Math.sin(d * i);
        vertices[k++] = c * outerRadius;
        vertices[k++] = s * outerRadius;
        vertices[k++] = 0;
        texCoords[t++] = 0.5 + 0.5 * c;
        texCoords[t++] = 0.5 + 0.5 * s;
        indices[n++] = slices;
        indices[n++] = i;
        indices[n++] = i == slices - 1 ? 0 : i + 1;
      }
      vertices[k++] = vertices[k++] = vertices[k++] = 0;
      texCoords[t++] = texCoords[t++] = 0;
    } else {
      var r = innerRadius / outerRadius;
      for(i = 0;i < slices;i++) {
        var c = Math.cos(d * i);
        var s = Math.sin(d * i);
        vertices[k++] = c * innerRadius;
        vertices[k++] = s * innerRadius;
        vertices[k++] = 0;
        texCoords[t++] = 0.5 + 0.5 * c * r;
        texCoords[t++] = 0.5 + 0.5 * s * r;
        vertices[k++] = c * outerRadius;
        vertices[k++] = s * outerRadius;
        vertices[k++] = 0;
        texCoords[t++] = 0.5 + 0.5 * c;
        texCoords[t++] = 0.5 + 0.5 * s;
      }
      for(i = 0;i < slices - 1;i++) {
        indices[n++] = 2 * i;
        indices[n++] = 2 * i + 1;
        indices[n++] = 2 * i + 3;
        indices[n++] = 2 * i;
        indices[n++] = 2 * i + 3;
        indices[n++] = 2 * i + 2;
      }
      indices[n++] = 2 * i;
      indices[n++] = 2 * i + 1;
      indices[n++] = 1;
      indices[n++] = 2 * i;
      indices[n++] = 1;
      indices[n++] = 0;
    }
    for(i = 0;i < vertexCount;i++) {
      normals[3 * i] = normals[3 * i + 1] = 0;
      normals[3 * i + 2] = 1;
    }

    /*
    return {
    vertexPositions: vertices,
    vertexNormals: normals,
    vertexTextureCoords: texCoords,
    indices: indices
    };
  */
  }
}

export function ring(innerRadius, outerRadius, slices) {}
