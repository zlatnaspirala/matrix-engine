/**
 *@Author Nikola Lukic
 *@Description
 * Matrix Engine Api Example
 * Adding default color cube.
 */

/* globals world App */
import App from "../program/manifest";

export var runThis = (world) => {

  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.webp"],
    mix_operation: "multiply",
  };

for (var j = -4; j < 4; j++) {
  for (var x =-4; x < 4; x++) {
    for (var z =2; z < 5; z++) {
      world.Add("square", 1, "cube_" + j);
      App.scene['cube_' + j].position.SetX(x * 1);
      App.scene['cube_' + j].position.SetY(-j * 1);
      App.scene['cube_' + j].position.SetZ(-z * 1);
      App.scene['cube_' + j].rotation.rotationSpeed.x = 10;
      App.scene['cube_' + j].geometry.setScale(0.4)
    }
  }
}

};
