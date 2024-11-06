import {byId} from "../../lib/utility.js";

export var REDLOG = "background:black;color: lime;font-size:25px;text-shadow: 1px 1px 15px red, -4px -4px 15px orangered";

export function createPauseScreen () {
	var root = document.createElement('div')
	root.id = 'pauseScreen';
	// root.style = '';
	function hidePauseScreen () {
		byId('pauseScreen').style.display = 'none';
	}
	root.innerHTML = `
	  <h2 class="pauseScreenText">
			Hang3d Matrix
			<button id="pauseGame" class='btn'>PLAY</button>
			<div style="font-size:15px;">Powered by matrix-engine</div>
			<div style="display: grid;font-size:15px;">Source code: <a href="https://github.com/zlatnaspirala">github/zlatnaspirala</a></div>
		</h2>
	`;
	document.body.appendChild(root)

	byId('pauseGame').addEventListener('click', hidePauseScreen, {passive: true})
}

/**
 * @description Hang3d reborn
 * @author Nikola Lukic
 * @email zlatnaspirala@gmail.com
 */

export var ROCK_RANK = {
	getRank : (points) => {
		points = parseInt(points);
		if (points < 1001) {
			return "junior";
		} else if (points < 2000) {
			return "senior";
		} else if (points < 3000) {
			return "captain";
		} else if (points < 5000) {
			return "general";
		} else {
			return "ultimate-killer";
		}
	},
	getRankMedalImg: (rank) => {
		if (rank == 'junior') {
			return `<img style="height: 60px" src="./res/icons/medals/1.png" />`;
		} else if (points == 'senior') {
			return `<img style="height: 60px" src="./res/icons/medals/2.png" />`;
		} else if (points == 'captain') {
			return `<img style="height: 60px" src="./res/icons/medals/3.png" />`;
		} else if (points == 'general') {
			return `<img style="height: 60px" src="./res/icons/medals/4.png" />`;
		} else {
			return `<img style="height: 60px" src="./res/icons/medals/5.png" />`;
		}
	}
};


