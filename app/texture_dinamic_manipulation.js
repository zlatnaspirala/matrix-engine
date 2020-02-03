/*
  Nikola Lukic
  webGl2GLmatrix2 api example
*/
/* globals world App */
// LOAD MESH FROM OBJ FILES...
// if you dont use obj or complex mesh you no need for this func

var textuteImageSamplers = {
  source : [    "res/images/complex_texture_1/diffuse.png"   ] ,
  mix_operation : "multiply" , // ENUM : multiply , divide ,
};

world.Add("squareTex", 1 , "MySquareTexure1" ,  textuteImageSamplers );

// ROTATING
// Stop
App.scene.MySquareTexure1.rotValue = 0;
App.scene.MySquareTexure1.rotation.rotationSpeed.z = 0;

App.scene.MySquareTexure1.custom.gl_texture = function ( object , t ) {

  world.GL.gl.bindTexture(world.GL.gl.TEXTURE_2D, object.textures[t] );
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MAG_FILTER, world.GL.gl.LINEAR);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_MIN_FILTER, world.GL.gl.LINEAR);
  //  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.MIRRORED_REPEAT);
  //  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.MIRRORED_REPEAT);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_S, world.GL.gl.REPEAT);
  world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_WRAP_T, world.GL.gl.REPEAT);
  //   world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_SWIZZLE_R, world.GL.gl.ZERO);
  //   world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_SWIZZLE_G, world.GL.gl.RED);
  //   world.GL.gl.texParameteri(world.GL.gl.TEXTURE_2D, world.GL.gl.TEXTURE_SWIZZLE_B, world.GL.gl.ZERO);

  world.GL.gl.texImage2D(
    world.GL.gl.TEXTURE_2D,
    0, // Level of details
    world.GL.gl.RGBA, // Format
    world.GL.gl.RGBA,
    world.GL.gl.UNSIGNED_BYTE, // Size of each channel
    object.textures[t].image
  );

  world.GL.gl.generateMipmap(world.GL.gl.TEXTURE_2D);

};

App.scene.MySquareTexure1.geometry.setScale(2.3);
App.scene.MySquareTexure1.geometry.texCoordsPoints.right_top.y = 1.4;
App.scene.MySquareTexure1.geometry.texCoordsPoints.right_top.x = 1.4;
App.scene.MySquareTexure1.geometry.texCoordsPoints.left_bottom.x = -0.4;
App.scene.MySquareTexure1.geometry.texCoordsPoints.left_bottom.y = -0.4;
App.scene.MySquareTexure1.geometry.texCoordsPoints.left_top.x = -0.4;
App.scene.MySquareTexure1.geometry.texCoordsPoints.left_top.y = 1.4;
App.scene.MySquareTexure1.geometry.texCoordsPoints.right_bottom.x =  1.4;
App.scene.MySquareTexure1.geometry.texCoordsPoints.right_bottom.y = -0.4;

setInterval(function(){

  App.scene.MySquareTexure1.geometry.texCoordsPoints.right_top.x += 0.001;
  App.scene.MySquareTexure1.geometry.texCoordsPoints.left_bottom.x += 0.001;
  App.scene.MySquareTexure1.geometry.texCoordsPoints.left_top.x += 0.001;
  App.scene.MySquareTexure1.geometry.texCoordsPoints.right_bottom.x +=  0.001;

},20);
