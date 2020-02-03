/* eslint-disable no-unused-vars */

/*
  Nikola Lukic
  webGl2GLmatrix2 api example
  app/canvas2d/build.html is visual-js 2d part program instance
*/

/* globals world App ENUMERATORS SWITCHER OSCILLATOR */

var textuteImageSamplers = {
  source : [    "res/images/complex_texture_1/diffuse.png"   ] ,
  mix_operation : "multiply"
};

world.Add("squareTex", 1 , "MySquareTexure1" ,  textuteImageSamplers );

App.scene.MySquareTexure1.rotValue = 0;
App.scene.MySquareTexure1.rotation.rotationSpeed.z = 0;

App.scene.MySquareTexure1.custom.gl_texture = function ( object , t ) {

  world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t] );
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.LINEAR);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR);

  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.CLAMP_TO_EDGE);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.CLAMP_TO_EDGE);

  world.GL.gl.texImage2D(
    world.GL.gl.TEXTURE_2D,
    0, // Level of details
    world.GL.gl.RGBA,
    world.GL.gl.RGBA,
    world.GL.gl.UNSIGNED_BYTE,
    object.textures[t].image
  );

  world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);

};

App.scene.MySquareTexure1.geometry.texCoordsPoints.right_top.y = 1.1;
App.scene.MySquareTexure1.geometry.texCoordsPoints.right_top.x = 1.1;
App.scene.MySquareTexure1.geometry.texCoordsPoints.left_bottom.x = -0.1;
App.scene.MySquareTexure1.geometry.texCoordsPoints.left_bottom.y = -0.1;
App.scene.MySquareTexure1.geometry.texCoordsPoints.left_top.x = -0.1;
App.scene.MySquareTexure1.geometry.texCoordsPoints.left_top.y = 1.1;
App.scene.MySquareTexure1.geometry.texCoordsPoints.right_bottom.x =  1.1;
App.scene.MySquareTexure1.geometry.texCoordsPoints.right_bottom.y = -0.1;
