/* eslint-disable no-unused-vars */

/*
  Nikola Lukic
  webGl2GLmatrix2 api example
  app/canvas2d/build.html is visual-js 2d part program instance
*/

/* globals world App ENUMERATORS SWITCHER OSCILLATOR */

// ACTIVATE FPController
App.camera.FirstPersonController = true;

// FLOOR
var textuteImageSamplers = {
    source : [    "res/images/complex_texture_1/diffuse.png"   ] ,
    mix_operation : "multiply" , // ENUM : multiply , divide ,
};

world.Add("squareTex", 12 , "floor" ,  textuteImageSamplers );
App.scene.floor.position.z = 0

// only for texture
var coeficientSizeOfTex = 1.9;
App.scene.floor.geometry.texCoordsPoints.right_top.y = 1 + coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.right_top.x = 1  + coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.left_bottom.x = 0 - coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.left_bottom.y = 0 -   coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.left_top.x = 0 - coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.left_top.y = 1  + coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.right_bottom.x =  1 + coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.right_bottom.y = 0 - coeficientSizeOfTex;


 App.scene.floor.custom.gl_texture = function ( object , t ) {

  world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t] );
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.LINEAR);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR);

  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.REPEAT);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.REPEAT);

  world.GL.gl.texImage2D(
                          world.GL.gl.TEXTURE_2D,
                          0, // Level of details
                          world.GL.gl.RGBA, // Format
                          world.GL.gl.RGBA,
                          world.GL.gl.UNSIGNED_BYTE, // Size of each channel
                          object.textures[t].image
                          );

  world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);

}

App.scene.floor.position.y = -2;
App.scene.floor.rotValue = 90;

world.Add("cubeLightTex", 1 , "zid" ,  textuteImageSamplers );

App.scene.zid.position.y = 1;
App.scene.zid.position.x = 0;

world.Add("pyramid",1 , "MyPyramid1");
world.Add("pyramid",1 , "MyPyramid2");
world.Add("pyramid",1 , "MyPyramid3");
world.Add("pyramid",1 , "MyPyramid4");

// SET POSITION
App.scene.MyPyramid1.geometry.spitz = 10
App.scene.MyPyramid2.geometry.spitz = 10
App.scene.MyPyramid3.geometry.spitz = 10
App.scene.MyPyramid4.geometry.spitz = 10

App.scene.MyPyramid1.position.SetX(-10);
App.scene.MyPyramid1.position.SetZ(-10);

App.scene.MyPyramid2.position.SetX(10);
App.scene.MyPyramid2.position.SetZ(10);

App.scene.MyPyramid3.position.SetX(10);
App.scene.MyPyramid3.position.SetZ(-10);

App.scene.MyPyramid4.position.SetX(-10);
App.scene.MyPyramid4.position.SetZ(10);

App.scene.MyPyramid1.position.SetY(-1);
App.scene.MyPyramid2.position.SetY(-1);
App.scene.MyPyramid3.position.SetY(-1);
App.scene.MyPyramid4.position.SetY(-1);

// ROTATING
// Stop
App.scene.MyPyramid2.rotation.rotationSpeed.z = 0;
// SET POSITION
delete textuteImageSamplers;
