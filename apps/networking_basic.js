/* eslint-disable no-unused-vars */

/**
 * @Author Nikola Lukic
 * @Description Matrix Engine Api Example.
 */

/* globals world App world */
import App from "../program/manifest";
import * as matrixEngine from "../index.js";

export var runThis = world => {

  world.Add("square", 1, "MyColoredSquare1");

  // Must be activate
  matrixEngine.Engine.activateNet();

  // Must be activate for scene objects also.
  // This is only to force avoid unnecessary networking emit!
  App.scene.MyColoredSquare1.net.enable = true;
  App.scene.MyColoredSquare1.net.activate();
};