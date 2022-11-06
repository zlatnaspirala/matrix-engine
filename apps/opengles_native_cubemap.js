/**
 *@Author Nikola Lukic zlatnaspirala@
 *@Description Matrix Engine Api Example
 * WORKSHOP SCRIPT
 * Current theme : SceneController and 
 * physics (cannon.js) implementation.
 */

import App from "../program/manifest";
import * as CANNON from 'cannon';

window.CANNON = CANNON;

export var runThis = (world) => {

  /**
   * @description
   * What ever you want!
   * It is 2dCanvas context draw func.
   */
  function myFace(args
    /*ctx, faceColor, textColor, txtSizeCoeficient, text*/) {
    const {width, height} = this.cubeMap2dCtx.canvas;
    this.cubeMap2dCtx.fillStyle = args[0];
    this.cubeMap2dCtx.fillRect(0, 0, width, height);
    this.cubeMap2dCtx.font = `${width * args[2]}px sans-serif`;
    this.cubeMap2dCtx.textAlign = 'center';
    this.cubeMap2dCtx.textBaseline = 'middle';
    this.cubeMap2dCtx.fillStyle = args[1];
    this.cubeMap2dCtx.fillText(args[3], width / 2, height / 2);
  }

  App.camera.SceneController = true;

  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

  window.addEventListener('ray.hit.event', (ev) => {
    console.log("You shoot the object! Nice!", ev.detail.hitObject.name)

    /**
     * Physics force apply
     */
    if(ev.detail.hitObject.physics.enabled == true) {
      ev.detail.hitObject.physics.currentBody.force.set(-330, 0, 1000)
    }
  });

  var groundTex = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };

  var tex = {
    source: [],
    mix_operation: "multiply",
    cubeMap: {
      type: '2dcanvas',
      drawFunc: myFace,
      sides: [
        // This is custom access you can edit but only must have
        // nice relation with your draw function !
        // This is example for render 2d text in middle-center manir.
        // Nice for 3d button object!
        {faceColor: '#F00', textColor: '#28F', txtSizeCoeficient: 0.8, text: 'm'},
        {faceColor: '#FF0', textColor: '#82F', txtSizeCoeficient: 0.5, text: 'a'},
        {faceColor: '#0F0', textColor: '#82F', txtSizeCoeficient: 0.5, text: 't'},
        {faceColor: '#0FF', textColor: '#802', txtSizeCoeficient: 0.5, text: 'r'},
        {faceColor: '#00F', textColor: '#8F2', txtSizeCoeficient: 0.5, text: 'i'},
        {faceColor: '#F0F', textColor: '#2F8', txtSizeCoeficient: 0.5, text: 'x'}
      ]
    }
  };

  // Load Physics world !
  let gravityVector = [0, 0, -9.82];
  let physics = world.loadPhysics(gravityVector);
  // Add ground
  var groundMaterial = new CANNON.Material();
  physics.addGround(App, world, groundTex, groundMaterial);
  // physics.world.solver.iterations = 17;

  world.Add("cubeMap", 1, "myCubeMapObj", tex);
  var b = new CANNON.Body({
    mass: 5,
    position: new CANNON.Vec3(0, -14, 3),
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
  });
  physics.world.addBody(b);
  // Physics
  App.scene.myCubeMapObj.physics.currentBody = b;
  App.scene.myCubeMapObj.physics.enabled = true;

};
