
/**
 * @description Usage of world global timeline/animationline.
 */

import App from '../program/manifest';
import {bvhAnimations} from './animations-list';

export var runThis = (world) => {

	// Camera
	App.camera.SceneController = true;

	// TEST ANIMATIONLINE
	matrixEngine.matrixWorld.world.useAnimationLine({sequenceSize: 200, totalSequence: 10});

	// need to be removed from bvh-loader npm package!
	var logHTML = document.createElement('div');
	logHTML.id = 'log';
	// logHTML.style.position = 'absolute';
	document.body.appendChild(logHTML);

	const createAnimation = (index) => {
		const options = {
			boneNameBasePrefix: 'firstAnim' + index,
			world: world,                   // [Required]
			autoPlay: true,                 // [Optimal]
			showOnLoad: false,              // [Optimal] if autoPLay is true then showOnLoad is inactive.
			type: 'ANIMATION',              // [Optimal] 'ANIMATION' | "TPOSE'
			loop: 'playInverse',            // [Optimal] true | 'stopOnEnd' | 'playInverse' | 'stopAndReset'
			globalOffset: [0, -220, -220],    // [Optimal]
			skeletalBoneScale: 3,           // [Optimal]
			/*skeletalBlend: {             // [Optimal] remove arg for no blend
				paramDest: 4,
				paramSrc: 4
			},*/
			speed: 5,
			boneTex: {
				source: [
					"res/images/sky/blue.jpg",
				],
				mix_operation: "multiply",
			},
			drawTypeBone: "triangle" // pyramid | triangle | cube | square | squareTex | cubeLightTex | sphereLightTex
		};
		// window.bvhAnimations = bvhAnimations;
		// console.log(" @!!!!bvhAnimations[0] 2>>> ",  bvhAnimations);
		return new matrixEngine.MEBvhAnimation(bvhAnimations[index], options);
	};

	window.createAnimation = createAnimation;

	canvas.addEventListener('mousedown', (ev) => {
		matrixEngine.raycaster.checkingProcedure(ev);
	});

	addEventListener('ray.hit.event', function(e) {
		console.info(e.detail.hitObject);
		e.detail.hitObject.glBlend.blendParamSrc = matrixEngine.utility.ENUMERATORS.glBlend.param[2];
		e.detail.hitObject.glBlend.blendParamDest = matrixEngine.utility.ENUMERATORS.glBlend.param[7];
	});

	console.log("<GLOBALS>")
	let character1 = createAnimation(1);
	window.character1 = character1
	window.App = App;
	window.matrixEngine = matrixEngine;
	console.log(character1 + "<")

	matrixEngine.matrixWorld.world.addCommandAtSeqIndex(
		function() {
			console.log("WHAT EVER HERE 5")
		} , 5
	)

	matrixEngine.matrixWorld.world.addCommandAtSeqIndex(
		function () {
			console.log("WHAT EVER HERE 10 ")
		} , 10
	)

	matrixEngine.matrixWorld.world.addSubCommand(
		function () {
			console.log("do it for only 100 frame on 3 seq FRAMEID!")
		} , 100 , 3
	) 

};
