
import {ORBIT_FROM_ARRAY, OSCILLATOR} from './utility';
import App from '../program/manifest';
/**
 * @description MatrixShadowSpot
 * Holder for locallight data
 * with basic animation values features.
 */
export class MatrixShadowSpot {

  constructor() {
    this.type = 'spot';
    this.lightPosition = [0, 0, 2];
    this.shininess = 150;
    this.lightRotationX = 0;
    this.lightRotationY = 0;
    // this is computed in updateScene
    this.lightDirection = [0, 0, -1];
    this.innerLimit = degToRad(0);
    this.outerLimit = degToRad(20)

    this.idUpdater = null;
    this.r = null;
    this.ir = null;
    this.p = null;
    this.posX = null;
    this.posY = null;
    this.posZ = null;
    this.o = null;
    this.flyArroundByIndexs = [1, 2];
    this.centerX = 0;
    this.centerY = 0;

    this.activeUpdate = () => {
      this.idUpdater = App.updateBeforeDraw.length;
      App.updateBeforeDraw.push(this);
    }

    this.deactivateUpdate = () => {
      App.updateBeforeDraw.splice(this.idUpdater, 1);
      this.UPDATE = function() {};
    }

    this.UPDATE = function() {};

    this.animateRadius = function(option) {
      if(typeof option === 'undefined') var option = {from: 0, to: 120, step: 1};
      this.r = new OSCILLATOR(option.from, option.to, option.step);
      this.UPDATE = this.lightRadius;
    };

    this.animateInnerRadius = function(option) {
      if(typeof option === 'undefined') var option = {from: 0, to: 120, step: 1};
      this.ir = new OSCILLATOR(option.from, option.to, option.step);
      this.UPDATE = this.lightInnerRadius;
    };

    this.animatePositionX = function(option) {
      if(typeof option === 'undefined') var option = {from: -2, to: 2, step: 0.1};
      this.posX = new OSCILLATOR(option.from, option.to, option.step);
      this.UPDATE = this.positionXLight;
    };

    this.animatePositionY = function(option) {
      if(typeof option === 'undefined') var option = {from: -2, to: 2, step: 0.1};
      this.posY = new matrixEngine.utility.OSCILLATOR(option.from, option.to, option.step);
      this.UPDATE = this.positionYLight;
    };

    this.animatePositionZ = function(option) {
      if(typeof option === 'undefined') var option = {from: -2, to: 2, step: 0.1};
      this.posZ = new matrixEngine.utility.OSCILLATOR(option.from, option.to, option.step);
      this.UPDATE = this.positionZLight;
    };

    this.flyArround = function(option) {
      if(typeof option === 'undefined') {
        var option = {
          from: 0.1, to: 0.2, step: 0.01,
          centerX: 0, centerY: 0,
          flyArroundByIndexs: [1, 2]
        };
      }
      this.flyArroundByIndexs = option.flyArroundByIndexs;
      if(option.centerX) this.centerX = option.centerX;
      if(option.centerY) this.centerY = option.centerY;
      this.o = new OSCILLATOR(option.from, option.to, option.step);
      this.UPDATE = this.makeFlyArround;
    };

  }

  makeFlyArround() {
    this.lightPosition = ORBIT_FROM_ARRAY(this.centerX, this.centerY, this.o.UPDATE(), this.lightPosition, this.flyArroundByIndexs);
  }

  lightRadius() {
    this.outerLimit = degToRad(this.r.UPDATE());
  }

  lightInnerRadius() {
    this.innerLimit = degToRad(this.ir.UPDATE());
  }

  positionXLight() {
    this.lightPosition[0] = this.posX.UPDATE();
  }

  positionYLight() {
    this.lightPosition[1] = this.posY.UPDATE();
  }

  positionZLight() {
    this.lightPosition[2] = this.posZ.UPDATE();
  }

}

export class MatrixShadowSpecular {

  constructor() {
    this.type = 'spec';
    this.uLightPosition = new Float32Array([0.0, 0.0, 0.0]);
    this.specularDATA = new Float32Array([0.0, 0.0, 0.0]);
    this.uFogColor = new Float32Array([1.0, 0.0, 0.0, 0.2])
    this.uFogDist = new Float32Array([10, 10])
    // console.log('SPECULAR LIGHT')
    this.UPDATE = function() {};
    this.activeUpdate = () => {
      this.idUpdater = App.updateBeforeDraw.length;
      App.updateBeforeDraw.push(this);
    }
  }
}

export class MatrixEffectLens {

  constructor() {
    this.type = 'lens';
    this.uLightPosition = new Float32Array([0.0, 0.0, 0.0]);
    this.uResolution = new Float32Array([window.innerWidth, window.innerHeight, 0.0]);
    this.uControl = new Float32Array([100.05, 100.15, 100.55]);
    this.UPDATE = function() {};
    this.activeUpdate = () => {
      this.idUpdater = App.updateBeforeDraw.length;
      App.updateBeforeDraw.push(this);
    }

    this.animateCenterX = function(option) {
      if(typeof option === 'undefined') var option = {from: 0, to: 1200, step: 5};
      this.rx = new OSCILLATOR(option.from, option.to, option.step);
      this.UPDATE = this.centerX;
    };

    this.animateCenterY = function(option) {
      if(typeof option === 'undefined') var option = {from: 0, to: 1200, step: 5};
      this.ry = new OSCILLATOR(option.from, option.to, option.step);
      this.UPDATE = this.centerX;
    };
  }

  centerX() {
    if(this.rx) this.uControl[0] = this.rx.UPDATE();
    if(this.ry) this.uControl[1] = this.ry.UPDATE();
  }
}

export class MatrixShadowSpotShadowTest {

	constructor() {
		this.type = 'spot-shadow';

		this.FBO_IN_DRAW_PASS = false;

		this.lightPosition = [0, 3, -1];
		this.lightTarget = [0, 0, 0];
		this.orientation = [0, -1, 0];
		this.angleOfView = 90;
		this.projW = 50;
		this.projH = 1;
		this.projNear = 0.1;
		this.projFar = 20;
		this.bias = -0.01;
		this.updateLPM = () => {
			this.lightProjectionMatrix = m4.perspective(degToRad(this.angleOfView), this.projW / this.projH , this.projNear, this.projFar);
		}
		this.updateLPM();

		this.idUpdater = null;
		this.r = null;
		this.ir = null;
		this.p = null;
		this.posX = null;
		this.posY = null;
		this.posZ = null;
		this.o = null;
		this.flyArroundByIndexs = [1, 2];
		this.centerX = 0;
		this.centerY = 0;

		this.activeUpdate = () => {
			this.idUpdater = App.updateBeforeDraw.length;
			App.updateBeforeDraw.push(this);
		}

		this.deactivateUpdate = () => {
			App.updateBeforeDraw.splice(this.idUpdater, 1);
			this.UPDATE = function() {};
		}

		this.UPDATE = function() {};

		this.animateRadius = function(option) {
			if(typeof option === 'undefined') var option = {from: 0, to: 120, step: 1};
			this.r = new OSCILLATOR(option.from, option.to, option.step);
			this.UPDATE = this.lightRadius;
		};

		this.animateProjW = function(option) {
			if(typeof option === 'undefined') var option = {from: 50, to: 100, step: 1};
			this.ir = new OSCILLATOR(option.from, option.to, option.step);
			this.UPDATE = this.projWFunc;
		};

		this.animatePositionX = function(option) {
			if(typeof option === 'undefined') var option = {from: -2, to: 2, step: 0.1};
			this.posX = new OSCILLATOR(option.from, option.to, option.step);
			this.UPDATE = this.positionXLight;
		};

		this.animatePositionY = function(option) {
			if(typeof option === 'undefined') var option = {from: -2, to: 2, step: 0.1};
			this.posY = new matrixEngine.utility.OSCILLATOR(option.from, option.to, option.step);
			this.UPDATE = this.positionYLight;
		};

		this.animatePositionZ = function(option) {
			if(typeof option === 'undefined') var option = {from: -2, to: 2, step: 0.1};
			this.posZ = new matrixEngine.utility.OSCILLATOR(option.from, option.to, option.step);
			this.UPDATE = this.positionZLight;
		};

		this.flyArround = function(option) {
			if(typeof option === 'undefined') {
				var option = {
					from: 0.1, to: 0.2, step: 0.01,
					centerX: 0, centerY: 0,
					flyArroundByIndexs: [1, 2]
				};
			}
			this.flyArroundByIndexs = option.flyArroundByIndexs;
			if(option.centerX) this.centerX = option.centerX;
			if(option.centerY) this.centerY = option.centerY;
			this.o = new OSCILLATOR(option.from, option.to, option.step);
			this.UPDATE = this.makeFlyArround;
		};
	}

	makeFlyArround() {
		this.lightPosition = ORBIT_FROM_ARRAY(this.centerX, this.centerY, this.o.UPDATE(), this.lightPosition, this.flyArroundByIndexs);
	}

	lightRadius() {
		this.angleOfView = this.r.UPDATE();
		this.updateLPM();
	}

	projWFunc() {
		this.projW = this.ir.UPDATE();
		this.updateLPM();
	}

	positionXLight() {
		this.lightPosition[0] = this.posX.UPDATE();
	}

	positionYLight() {
		this.lightPosition[1] = this.posY.UPDATE();
	}

	positionZLight() {
		this.lightPosition[2] = this.posZ.UPDATE();
	}
}