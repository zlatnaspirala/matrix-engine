/**
 * @license MIT Licence Nikola Lukic 
 * maximumroulette.com
 * @param {[width, height]}
 * Standard Size of map
 * @returns 
 * Prepared visual DOM Map fileds.
 * COPIED FROM ME-STARTER
 * @version 1.0.0
 */

var byId = (id) => {
	return document.getElementById(id)
}

var mapCreator = {
	isMousePressed: false,
	getLiteral: {},
	clear: () => {
		location.reload()
	},
	map: {
		staticCubes: [],
		staticFloors: [],
		staticObjs: [],
		staticObjsGroup: [],
		noPhysics: {
			cubes: []
		}
	},
	lastItem: [],
	inputParamsSaved: [],
	lastUpdate: (typeItem) => {
		mapCreator.lastItem.push(typeItem);
	},
	isSameScale: true,
	checkSameScale: (e) => {
		console.log("e.checked:", e.checked)
		mapCreator.isSameScale = e.checked;
	},
	checkScale: (e) => {
		if(mapCreator.isSameScale == false) return;
		if(e.id == "scaleX") {
			byId('scaleColliderX').value = e.value;
			console.log("CHECK X")
		} else if(e.id == "scaleY") {
			byId('scaleColliderY').value = e.value;
			console.log("CHECK Y")
		} else if(e.id == "scaleZ") {
			byId('scaleColliderZ').value = e.value;
			console.log("CHECK Z")
		}
	},
	undo: () => {
		var __ = mapCreator.map[mapCreator.lastItem[mapCreator.lastItem.length - 1]];
		if(__.cubes) {
			var lastItem = mapCreator.map[mapCreator.lastItem[mapCreator.lastItem.length - 1]].cubes[__.cubes.length - 1];
			mapCreator.map[mapCreator.lastItem[mapCreator.lastItem.length - 1]].cubes.pop()
		} else {
			var lastItem = mapCreator.map[mapCreator.lastItem[mapCreator.lastItem.length - 1]][__.length - 1];
			mapCreator.map[mapCreator.lastItem[mapCreator.lastItem.length - 1]].pop()
		}
		console.log("Last item is : " + lastItem)
		byId(lastItem.targetDom.id).removeAttribute('data-status')
		byId(lastItem.targetDom.id).style.background = `unset`;

		mapCreator.copyToStorage()
	},
	copyToStorage: () => {
		localStorage.setItem('map', JSON.stringify(mapCreator.map))
	},
	saveInputParams: () => {
		// save current inputs
		mapCreator.inputParamsSaved.push({
			name: byId('newNameForSavedInputParams').value,
			levelY: byId('levelY').value,
			scaleX: byId('scaleX').value,
			scaleY: byId('scaleY').value,
			scaleZ: byId('scaleZ').value,
			scaleColliderX: byId('scaleColliderX').value,
			scaleColliderY: byId('scaleColliderY').value,
			scaleColliderZ: byId('scaleColliderZ').value,
			rotX: byId('rotX').value,
			rotY: byId('rotY').value,
			rotZ: byId('rotZ').value,
			arotX: byId('arotX').value,
			arotY: byId('arotY').value,
			arotZ: byId('arotZ').value,
			tinput: byId('tinput').selectedOptions[0].value,
			texinput: byId('texinput').selectedOptions[0].value
		})
		localStorage.setItem('inputParamsSaved', JSON.stringify(mapCreator.inputParamsSaved))
		mapCreator.getNamesOfInputParams()
	},
	onSelectSavedInputParams: (e) => {
		if(mapCreator.inputParamsSaved) mapCreator.inputParamsSaved.forEach((item) => {
			if(e.selectedOptions[0].value == item.name) {
				console.log("SETUP FROM SAVED INPUT PARAMS", e.selectedOptions[0].value)
				byId('levelY').value = item.levelY
				byId('scaleX').value = item.scaleX
				byId('scaleY').value = item.scaleY
				byId('scaleZ').value = item.scaleZ
				byId('scaleColliderX').value = item.scaleColliderX
				byId('scaleColliderY').value = item.scaleColliderY
				byId('scaleColliderZ').value = item.scaleColliderZ
				byId('rotX').value = item.rotX
				byId('rotY').value = item.rotY
				byId('rotZ').value = item.rotZ
				byId('arotX').value = item.arotX
				byId('arotY').value = item.arotY
				byId('arotZ').value = item.arotZ
				byId('tinput').selectedOptions[0].value = item.tinput
				byId('texinput').selectedOptions[0].value = item.texinput
			}
		})
	},
	getNamesOfInputParams: () => {
		byId('savedInputParams').innerHTML = ``;
		var getFromStorage = JSON.parse(localStorage.getItem('inputParamsSaved'))
		console.log('getFromStorage -', getFromStorage)
		mapCreator.inputParamsSaved = getFromStorage;
		if(mapCreator.inputParamsSaved) mapCreator.inputParamsSaved.forEach((i) => {
			var newOption = document.createElement('option')
			newOption.classList.add("btnOpt")
			newOption.innerText = i.name;
			byId('savedInputParams').appendChild(newOption)
		})
	},
	download: (name, type) => {
		var a = document.getElementById("saveMap");
		let __ = JSON.stringify(mapCreator.map)
		__ = "export let map = " + __;
		var file = new Blob([__], {type: type});
		a.href = URL.createObjectURL(file);
		a.download = name;
	},
	createMap: function(size) {
		window.addEventListener('contextmenu', (event) => {
			event.preventDefault()
		})
		//
		mapCreator.getNamesOfInputParams()

		var root = document.getElementById('root');
		for(var j = 0;j < size[0];j++) {
			var vertical = document.createElement('div');
			vertical.style = `width:90%;height:${innerHeight / size[1]}px;`;
			vertical.id = 'vertical' + j;
			vertical.classList.add('vertical')
			for(var i = 0;i < size[1];i++) {
				var field = document.createElement('div');
				field.style = `width:${innerWidth / size[0]}`;
				// field.classList.add('field')

				if(j == size[0] / 2 || (j > (size[0] + 1) / 2 && j < (size[0] + 2) / 2)) {
					// fieldMid
					field.classList.add('fieldMid')
				} else {
					field.classList.add('field')
				}

				field.id = 'field' + i + j;
				field.setAttribute("data-z", j)
				field.setAttribute("data-x", i)
				field.setAttribute("data-levelY", parseFloat(byId('levelY').value))

				const _add = (e) => {mapCreator.isMousePressed = true}
				field.addEventListener("mousedown", _add)
				field.addEventListener("mouseup", () => {mapCreator.isMousePressed = false})
				// mousemove
				const _add_OnHover = (e) => {
					if(mapCreator.isMousePressed == false ||
						e.target.getAttribute('data-status') == 'used'
					) return;
					e.target.setAttribute('data-status', 'used')
					e.target.style.background = `url(${'../' + byId('texinput').selectedOptions[0].value})`
					var X = 4.2 * parseFloat(e.target.getAttribute('data-x'));
					var Z = 4.2 * parseFloat(e.target.getAttribute('data-z'));
					X = parseFloat(X.toFixed(2))
					Z = parseFloat(Z.toFixed(2))
					var Y = parseFloat(byId('levelY').value);

					if(byId('tinput').selectedOptions[0].value == "ME Cube") {
						this.lastUpdate('staticCubes')
						console.log('e.target.id SAVE PROCEDURE ', e.target.id)
						this.map.staticCubes.push(
							{
								name: "wall_gen" + parseFloat(e.target.getAttribute('data-x')) + "_" + parseFloat(e.target.getAttribute('data-z')),
								position: {x: X, y: Y, z: Z},
								scale: [parseFloat(byId('scaleX').value), parseFloat(byId('scaleY').value), parseFloat(byId('scaleZ').value)],
								scaleCollider: [parseFloat(byId('scaleColliderX').value), parseFloat(byId('scaleColliderY').value), parseFloat(byId('scaleColliderZ').value)],
								rotation: {rotx: parseFloat(byId('rotX').value), roty: parseFloat(byId('rotY').value), rotz: parseFloat(byId('rotZ').value)},
								activeRotation: [parseFloat(byId('arotX').value), parseFloat(byId('arotY').value), parseFloat(byId('arotZ').value)],
								texture: {
									source: [byId('texinput').selectedOptions[0].value],
									mix_operation: "multiply"
								},
								targetDom: {
									id: e.target.id,
									x: parseFloat(e.target.getAttribute('data-x')),
									y: parseFloat(e.target.getAttribute('data-z')),
								}
							})
					} else if(byId('tinput').selectedOptions[0].value == "Static Floor") {
						this.lastUpdate('staticFloors')
						this.map.staticFloors.push(
							{
								name: "sf_gen" + parseFloat(e.target.getAttribute('data-x')) + "_" + parseFloat(e.target.getAttribute('data-z')),
								position: {x: X, y: Y, z: Z},
								scale: [parseFloat(byId('scaleX').value), parseFloat(byId('scaleY').value), parseFloat(byId('scaleZ').value)],
								scaleCollider: [parseFloat(byId('scaleColliderX').value), parseFloat(byId('scaleColliderY').value), parseFloat(byId('scaleColliderZ').value)],
								rotation: {rotx: parseFloat(byId('rotX').value), roty: parseFloat(byId('rotY').value), rotz: parseFloat(byId('rotZ').value)},
								// activeRotation: [parseFloat(byId('arotX').value), parseFloat(byId('arotY').value), parseFloat(byId('arotZ').value)],
								texture: {
									source: [byId('texinput').selectedOptions[0].value],
									mix_operation: "multiply"
								},
								targetDom: {
									id: e.target.id,
									x: parseFloat(e.target.getAttribute('data-x')),
									y: parseFloat(e.target.getAttribute('data-z')),
								}
							})
					} else if(byId('tinput').selectedOptions[0].value == "NOPHYSICS Cube") {
						this.lastUpdate('noPhysics')
						this.map.noPhysics.cubes.push(
							{
								name: "wall_gen" + parseFloat(e.target.getAttribute('data-x')) + "_" + parseFloat(e.target.getAttribute('data-z')),
								position: {x: X, y: Y, z: Z},
								scale: [parseFloat(byId('scaleX').value), parseFloat(byId('scaleY').value), parseFloat(byId('scaleZ').value)],
								scaleCollider: [parseFloat(byId('scaleColliderX').value), parseFloat(byId('scaleColliderY').value), parseFloat(byId('scaleColliderZ').value)],
								rotation: {rotx: parseFloat(byId('rotX').value), roty: parseFloat(byId('rotY').value), rotz: parseFloat(byId('rotZ').value)},
								activeRotation: [parseFloat(byId('arotX').value), parseFloat(byId('arotY').value), parseFloat(byId('arotZ').value)],
								texture: {
									source: [byId('texinput').selectedOptions[0].value],
									mix_operation: "multiply"
								},
								targetDom: {
									id: e.target.id,
									x: parseFloat(e.target.getAttribute('data-x')),
									y: parseFloat(e.target.getAttribute('data-z')),
								}
							})
					} else if(byId('tinput').selectedOptions[0].value.toString().indexOf("Obj group") != -1) {
						this.lastUpdate('staticObjsGroup')
						// path
						var p = byId('tinput').selectedOptions[0].value.toString().split(":")[1]
						p = "res/3d-objects/env/" + p + ".obj";
						this.map.staticObjsGroup.push(
							{
								name: "mapobjsgroup_" + parseFloat(e.target.getAttribute('data-x')) + "_" + parseFloat(e.target.getAttribute('data-z')),
								path: p,
								position: {x: X, y: Y, z: Z},
								rotation: {rotx: parseFloat(byId('rotX').value), roty: parseFloat(byId('rotY').value), rotz: parseFloat(byId('rotZ').value)},
								activeRotation: [parseFloat(byId('arotX').value), parseFloat(byId('arotY').value), parseFloat(byId('arotZ').value)],
								scale: [parseFloat(byId('scaleX').value), parseFloat(byId('scaleY').value), parseFloat(byId('scaleZ').value)],
								scaleCollider: [parseFloat(byId('scaleColliderX').value), parseFloat(byId('scaleColliderY').value), parseFloat(byId('scaleColliderZ').value)],
								texture: {
									source: [byId('texinput').selectedOptions[0].value],
									mix_operation: "multiply"
								},
								targetDom: {
									id: e.target.id,
									x: parseFloat(e.target.getAttribute('data-x')),
									y: parseFloat(e.target.getAttribute('data-z')),
								}
							})
					} else {
						this.lastUpdate('staticObjs')
						this.map.staticObjs.push(
							{
								name: "mapobjs_" + parseFloat(e.target.getAttribute('data-x')) + "_" + parseFloat(e.target.getAttribute('data-z')),
								path: byId('tinput').selectedOptions[0].value,
								position: {x: X, y: Y, z: Z},
								rotation: {rotx: parseFloat(byId('rotX').value), roty: parseFloat(byId('rotY').value), rotz: parseFloat(byId('rotZ').value)},
								activeRotation: [parseFloat(byId('arotX').value), parseFloat(byId('arotY').value), parseFloat(byId('arotZ').value)],
								scale: [parseFloat(byId('scaleX').value), parseFloat(byId('scaleY').value), parseFloat(byId('scaleZ').value)],
								scaleCollider: [parseFloat(byId('scaleColliderX').value), parseFloat(byId('scaleColliderY').value), parseFloat(byId('scaleColliderZ').value)],
								texture: {
									source: [byId('texinput').selectedOptions[0].value],
									mix_operation: "multiply"
								},
								targetDom: {
									id: e.target.id,
									x: parseFloat(e.target.getAttribute('data-x')),
									y: parseFloat(e.target.getAttribute('data-z')),
								}
							})
					}
					this.copyToStorage()
				}
				field.addEventListener("mousemove", _add_OnHover)

				vertical.appendChild(field)
			}
			root.appendChild(vertical);
		}
	},
	run: () => {
		mapCreator.createMap([byId('sizeX').value, byId('sizeY').value])

		byId('createMapDom').style.display = 'none';
		byId('mapDom').style.display = 'block';
	},
	copyMap: () => {
		navigator.clipboard.writeText(
			localStorage.getItem('map')
		);
	},
	loadMap: (arg) => {
		// make inverse - load map from file. wip
		console.log('MatrixEngine load map:', arg)
		if(byId('mapForLoad').files.length == 1) {
			var reader = new FileReader();
			reader.readAsText(byId('mapForLoad').files[0], "UTF-8");
			reader.onload = function(evt) {
				let mapCode;
				let getLiteral = evt.target.result.toString().split('=')[1];
				getLiteral = getLiteral.replace(';', '')
				if(getLiteral) {
					mapCode = eval("(" + getLiteral + ")");
				}

				mapCode.staticCubes.forEach((item) => {
					console.log("Field is" + item.targetDom.id)
					console.log("Field pos x is" + item.targetDom.x)
					console.log("Field pos y/z is" + item.targetDom.y)
					console.log("Field tex source is" + item.texture.source)
					var targetField = byId(item.targetDom.id)
					// PROCEDURE INVERT
					targetField.setAttribute('data-status', 'used')
					targetField.style.background = `url(${'../' + item.texture.source[0]})`
					var X = 4.2 * parseFloat(item.targetDom.x);
					var Z = 4.2 * parseFloat(item.targetDom.y);
					var Y = item.position.y;
					mapCreator.map.staticCubes.push(
						{
							name: "wall_gen" + parseFloat(item.targetDom.x) + "_" + parseFloat(item.targetDom.y),
							position: {x: X, y: Y, z: Z},
							scale: item.scale,
							rotation: item.rotation,
							activeRotation: item.activeRotation,
							texture: item.texture,
							targetDom: {
								id: item.targetDom.id,
								x: parseFloat(item.targetDom.x),
								y: parseFloat(item.targetDom.y),
							}
						})
				})

				mapCode.staticFloors.forEach((item) => {
					var targetField = byId(item.targetDom.id)
					// PROCEDURE INVERT
					targetField.setAttribute('data-status', 'used')
					targetField.style.background = `url(${'../' + item.texture.source[0]})`
					var X = 4.2 * parseFloat(item.targetDom.x);
					var Z = 4.2 * parseFloat(item.targetDom.y);
					var Y = item.position.y;
					mapCreator.map.staticFloors.push(
						{
							name: "sf_gen" + parseFloat(item.targetDom.x) + "_" + parseFloat(item.targetDom.y),
							position: {x: X, y: Y, z: Z},
							scale: item.scale,
							rotation: item.rotation,
							activeRotation: item.activeRotation,
							texture: item.texture,
							targetDom: {
								id: item.targetDom.id,
								x: parseFloat(item.targetDom.x),
								y: parseFloat(item.targetDom.y),
							}
						})
				})

				mapCode.noPhysics.cubes.forEach((item) => {
					var targetField = byId(item.targetDom.id)
					// PROCEDURE INVERT
					targetField.setAttribute('data-status', 'used')
					targetField.style.background = `url(${'../' + item.texture.source[0]})`
					var X = 4.2 * parseFloat(item.targetDom.x);
					var Z = 4.2 * parseFloat(item.targetDom.y);
					var Y = item.position.y;
					mapCreator.map.noPhysics.cubes.push(
						{
							name: "noPCube_gen" + parseFloat(item.targetDom.x) + "_" + parseFloat(item.targetDom.y),
							position: {x: X, y: Y, z: Z},
							scale: item.scale,
							rotation: item.rotation,
							activeRotation: item.activeRotation,
							texture: item.texture,
							targetDom: {
								id: item.targetDom.id,
								x: parseFloat(item.targetDom.x),
								y: parseFloat(item.targetDom.y),
							}
						})
				})

				mapCode.staticObjs.forEach((item) => {
					var targetField = byId(item.targetDom.id)
					// PROCEDURE INVERT
					targetField.setAttribute('data-status', 'used')
					targetField.style.background = `url(${'../' + item.texture.source[0]})`
					var X = 4.2 * parseFloat(item.targetDom.x);
					var Z = 4.2 * parseFloat(item.targetDom.y);
					var Y = item.position.y;
					mapCreator.map.staticObjs.push(
						{
							name: "mapobjs_" + parseFloat(item.targetDom.x) + "_" + parseFloat(item.targetDom.y),
							position: {x: X, y: Y, z: Z},
							scale: item.scale,
							rotation: item.rotation,
							activeRotation: item.activeRotation,
							texture: item.texture,
							targetDom: {
								id: item.targetDom.id,
								x: parseFloat(item.targetDom.x),
								y: parseFloat(item.targetDom.y),
							}
						})
				})

				mapCode.staticObjsGroup.forEach((item) => {
					var targetField = byId(item.targetDom.id)
					// PROCEDURE INVERT
					targetField.setAttribute('data-status', 'used')
					targetField.style.background = `url(${'../' + item.texture.source[0]})`
					var X = 4.2 * parseFloat(item.targetDom.x);
					var Z = 4.2 * parseFloat(item.targetDom.y);
					var Y = item.position.y;
					mapCreator.map.staticObjsGroup.push(
						{
							name: "mapobjsgroup_" + parseFloat(item.targetDom.x) + "_" + parseFloat(item.targetDom.y),
							position: {x: X, y: Y, z: Z},
							scale: item.scale,
							rotation: item.rotation,
							activeRotation: item.activeRotation,
							texture: item.texture,
							targetDom: {
								id: item.targetDom.id,
								x: parseFloat(item.targetDom.x),
								y: parseFloat(item.targetDom.y),
							}
						})
				})
			}
			reader.onerror = function(err) {console.log(err)}
		}
	}
};
window.mapCreator = mapCreator;