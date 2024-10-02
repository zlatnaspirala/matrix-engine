/**
 * @Author Nikola Lukic
 * @Description New version networking2 - Matrix Engine Api Example.
 * @note This example use you and better solution for webRTC signaling.
 * In new version i use kurento/openVidu service and library.
 * Kurento will handle much better session leaved by host/initator
 */

/* globals world App world */
import App from "../program/manifest.js";
import * as matrixEngine from "../index.js";

export var runThis = world => {

  world.Add("square", 1, "MyColoredSquare1");

  // Must be activate - Use client default config file
  matrixEngine.Engine.activateNet2(undefined,
		{
			sessionName: 'matrix-engine-shared-object',
			resolution: ''
		});

  App.scene.MyColoredSquare1.net.enable = true;
  // App.scene.MyColoredSquare1.net.activate();
};