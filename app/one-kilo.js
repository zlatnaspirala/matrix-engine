/*
  Nikola Lukic
  webGl2GLmatrix2 api example
*/
/* globals world App ENUMERATORS E CANVAS2d_SURFACE_TEXTURE */
/* eslint-disable no-unused-vars */

var tex = new CANVAS2d_SURFACE_TEXTURE( "app/2d1kilo/example1.html" , "starter/text.js");

App.camera.FirstPersonController = true;

var textuteImageSamplers = {
  source : [    "res/images/complex_texture_1/diffuse.png"],
  mix_operation : "multiply"
};

world.Add("squareTex", 12 , "floor" ,  textuteImageSamplers );
App.scene.floor.position.z = 0;
App.scene.floor.position.y = -1;

var coeficientSizeOfTex = 20;
App.scene.floor.geometry.texCoordsPoints.right_top.y = 1 + coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.right_top.x = 1  + coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.left_bottom.x = 0 - coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.left_bottom.y = 0 -   coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.left_top.x = 0 - coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.left_top.y = 1  + coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.right_bottom.x =  1 + coeficientSizeOfTex;
App.scene.floor.geometry.texCoordsPoints.right_bottom.y = 0 - coeficientSizeOfTex;

App.scene.floor.geometry.size = 50;

App.scene.floor.custom.gl_texture = function ( object , t ) {

  try {

    world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t] );
    world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.LINEAR);
    world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR);

    world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.REPEAT);
    world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.REPEAT);

    world.GL.gl.texImage2D(
      world.GL.gl.TEXTURE_2D,
      0,
      world.GL.gl.RGBA,
      world.GL.gl.RGBA,
      world.GL.gl.UNSIGNED_BYTE,
      object.textures[t].image
    );

    world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
  } catch(e) {
    //
  }
};

App.scene.floor.rotation.rotateX(90);

/**
 * Test for scale texCoords for CubeVertex;
 *
 */

world.Add("cubeLightTex", 1, "test", {
  source: ["res/images/complex_texture_1/diffuse.png"],
  mix_operation: "multiply"
});
App.scene.test.position.y = 1;
App.scene.test.position.x = 0;
App.scene.test.position.z = 0;
// App.scene.zid.geometry.setScaleByX(60);
// App.scene.zid.geometry.setScaleByY(10);

App.scene.test.custom.gl_texture = function(object, t) {

  try {

    world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t] );
    world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.LINEAR);
    world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR);

    world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.REPEAT);
    world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.REPEAT);

    world.GL.gl.texImage2D(
      world.GL.gl.TEXTURE_2D,
      0,
      world.GL.gl.RGBA,
      world.GL.gl.RGBA,
      world.GL.gl.UNSIGNED_BYTE,
      object.textures[t].image
    );

    world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);
  } catch(e) {
    //
  }
};

world.Add("cubeLightTex", 1, "zid",  {
  source: ["res/images/texture_metalic1.jpg"],
  mix_operation: "multiply"
});
App.scene.zid.position.y = 7;
App.scene.zid.position.x = 0;
App.scene.zid.position.z = 50;
App.scene.zid.geometry.setScaleByX(60);
App.scene.zid.geometry.setScaleByY(10);

App.scene.zid.custom.gl_texture = App.scene.test.custom.gl_texture;

world.Add("cubeLightTex", 1, "zid2",  {
  source: ["res/images/texture_metalic1.jpg"],
  mix_operation: "multiply"
});
App.scene.zid2.position.y = 8;
App.scene.zid2.position.x = 0;
App.scene.zid2.position.z = -50;
App.scene.zid2.geometry.setScaleByX(60);
App.scene.zid2.geometry.setScaleByY(10);

world.Add("cubeLightTex", 1, "zid3",  {
  source: ["res/images/texture_metalic1.jpg"],
  mix_operation: "multiply"
});
App.scene.zid3.position.y = 7;
App.scene.zid3.position.x = 50;
App.scene.zid3.position.z = 0;
App.scene.zid3.geometry.setScaleByZ(60);
App.scene.zid3.geometry.setScaleByY(10);

world.Add("cubeLightTex", 1, "zid4", {
  source: ["res/images/texture_metalic1.jpg"],
  mix_operation: "multiply"
});

App.scene.zid4.position.y = 8;
App.scene.zid4.position.x = -50;
App.scene.zid4.position.z = 0;
App.scene.zid4.geometry.setScaleByZ(60);
App.scene.zid4.geometry.setScaleByY(10);

for (var hor = -40;hor < 50;hor=hor+10) {

  var name = "zid_" + hor;

  world.Add(
    "cubeLightTex",
    1,
    name,
    {
      source: ["res/images/texture_metalic1.jpg"],
      mix_operation: "multiply"
    });
  App.scene[name].position.y = 8;
  App.scene[name].position.x = hor;
  App.scene[name].position.z = 48;
  // App.scene[name].glBlend.blendEnabled = true;
  // App.scene[name].glBlend.blendParamSrc =  ENUMERATORS.glBlend.param[4];
  // App.scene[name].glBlend.blendParamDest =  ENUMERATORS.glBlend.param[4];
  App.scene[name].geometry.setScaleByY(10);

  name = "zid_2_" + hor;

  world.Add(
    "cubeLightTex",
    1,
    name,
    {
      source: ["res/images/texture_metalic1.jpg"],
      mix_operation: "multiply"
    });
  App.scene[name].position.y = 8;
  App.scene[name].position.x = hor;
  App.scene[name].position.z = -48;
  // App.scene[name].glBlend.blendEnabled = true;
  // App.scene[name].glBlend.blendParamSrc =  ENUMERATORS.glBlend.param[4];
  // App.scene[name].glBlend.blendParamDest =  ENUMERATORS.glBlend.param[4];
  App.scene[name].geometry.setScaleByY(10);

}

world.Add("pyramid",1 , "MyPyramid1");
world.Add("pyramid",1 , "MyPyramid2");
world.Add("pyramid",1 , "MyPyramid3");
world.Add("pyramid",1 , "MyPyramid4");

// SET POSITION
App.scene.MyPyramid1.geometry.spitz = 10;
App.scene.MyPyramid2.geometry.spitz = 10;
App.scene.MyPyramid3.geometry.spitz = 10;
App.scene.MyPyramid4.geometry.spitz = 10;

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
App.scene.MyPyramid2.rotation.rotationSpeed.z = 0;

world.Add("squareTex", 5, "outsideBox", textuteImageSamplers);
App.scene.outsideBox.position.y = 4;
App.scene.outsideBox.position.x = 0;
App.scene.outsideBox.position.z = -45;
// App.scene.outsideBox.rotation.rotationSpeed.z = 50;
// App.scene.outsideBox.rotValue = 90;
App.scene.outsideBox.LightsData.ambientLight.set(1,1,1);
App.scene.outsideBox.glBlend.blendEnabled = true;
App.scene.outsideBox.glBlend.blendParamSrc =  ENUMERATORS.glBlend.param[4];
App.scene.outsideBox.glBlend.blendParamDest =  ENUMERATORS.glBlend.param[4];

App.scene.outsideBox.rotation.SetDirection(1,1,0);

// CANVAS2D_SURFACE - IS TEXTURE EDITOR
E("HOLDER_STREAMS").style.display = "block";
App.scene.outsideBox.streamTextures = tex;

setTimeout(function() {
  // App.scene.outsideBox.streamTextures.showTextureEditor();
}, 1000);
