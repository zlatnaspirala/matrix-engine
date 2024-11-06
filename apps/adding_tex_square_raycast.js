/**
 *@Author Nikola Lukic
 *@Description Matrix Engine Api Example
 */

import App from "../program/manifest";

export var runThis = (world) => {

  var textuteImageSamplers = {
    source: ["res/images/complex_texture_1/diffuse.webp"],
    mix_operation: "multiply",
  };

  world.Add("squareTex", 1, "MyColoredSquareRayObject",textuteImageSamplers);
  App.scene.MyColoredSquareRayObject.position.SetX(0);

};
