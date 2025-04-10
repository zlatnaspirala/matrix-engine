/**
 *@Author Nikola Lukic
 *@Description Matrix Engine Api Example
 */

/* globals world App world */
import App from "../program/manifest";

export var runThis = world => {
  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.webp"],
    mix_operation: "multiply",
  };

  world.Add("squareTex", 1, "MySquareTexure1", textuteImageSamplers);

  App.scene.MySquareTexure1.rotation.rotationSpeed.x = 10;

	canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });

	addEventListener("ray.hit.event", function(e) {
		console.info("HIT: " + e.detail.hitObject.rotation.rotx);
	});
};
