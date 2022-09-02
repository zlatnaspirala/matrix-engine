/**
 *@Author Nikola Lukic
 *@Description Matrix Engine Api Example
 * Adding default color cube.
 */

/* globals world App */
import App from "../program/manifest";

export var runThis = (world) => {

  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.png"],
    mix_operation: "multiply",
  };


  world.Add("cube", 1, "MyColoredCube1");

  world.Add("cubeLightTex", 1, "MyColoredCube2", textuteImageSamplers);

  // canvas.addEventListener('mousedown', (ev) => {
  //   matrixEngine.raycaster.checkingProcedure(ev);
  // });
  // addEventListener("ray.hit.event", function(e) {
  //   console.info(e.detail);
  // });
    App.scene.MyColoredCube1.position.SetX(-3);
    App.scene.MyColoredCube1.position.SetZ(-11);
    App.scene.MyColoredCube1.rotation.rotx = 45;


    App.scene.MyColoredCube2.position.SetX(0);
    App.scene.MyColoredCube2.position.SetZ(-11);
    App.scene.MyColoredCube2.rotation.rotx = 45;

};
