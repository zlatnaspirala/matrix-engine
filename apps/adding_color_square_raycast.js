/**
 *@Author Nikola Lukic
 *@Description Matrix Engine Api Example
 */

export var runThis = (matrixEngine) => {

  let world = matrixEngine.matrixWorld.world;
  window.world = world;
  let App = matrixEngine.App;

  world.Add("square", 1, "MyColoredSquareRayObject");
  App.scene.MyColoredSquareRayObject.position.SetX(0);

  canvas.addEventListener('mousedown', (ev) => {
    matrixEngine.raycaster.checkingProcedure(ev);
  });
  // App.scene.MyColoredSquare1.rotation.rotationSpeed.x = 15;

};
