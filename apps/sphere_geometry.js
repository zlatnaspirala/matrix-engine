/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

/* globals world App world */
import App from "../program/manifest";

export var runThis = world => {
  /* globals App world */
  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.webp"],
    mix_operation: "multiply", // ENUM : multiply , divide
  };

  world.Add("sphereLightTex", 2, "MySphere", textuteImageSamplers);

  App.scene.MySphere.position.z = -10;
};
