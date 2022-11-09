
  world.GL.gl.activeTexture(world.GL.gl['TEXTURE' + t]);

  if(t == 0) {

    var gl = world.GL.gl;
    if(!object.tex) object.tex = gl.createTexture();
    // var tex = gl.createTexture();
    // world.GL.gl.bindTexture(world.GL.gl.TEXTURE_CUBE_MAP, object.textures[t]);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, object.tex);

    // Get A 2D context
    /** @type {Canvas2DRenderingContext} */
    if(typeof window.TEST == 'undefined') {
      window.TEST = null;
      var T = document.createElement("canvas");
      T.id = 'blabla';
      document.body.append(T);

    } else {
      var T = document.getElementById("blabla");
    }

    const ctx = T.getContext("2d");

    ctx.canvas.width = 128;
    ctx.canvas.height = 128;

    const faceInfos = [
      {target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, faceColor: '#F00', textColor: '#0FF', text: '+X'},
      {target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, faceColor: '#FF0', textColor: '#00F', text: '-X'},
      {target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, faceColor: '#0F0', textColor: '#F0F', text: '+Y'},
      {target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, faceColor: '#0FF', textColor: '#F00', text: '-Y'},
      {target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, faceColor: '#00F', textColor: '#FF0', text: '+Z'},
      {target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, faceColor: '#F0F', textColor: '#0F0', text: 'CUBEMAP'},
    ];
    faceInfos.forEach((faceInfo) => {
      const {target, faceColor, textColor, text} = faceInfo;
      gen2DTextFace(ctx, faceColor, textColor, text);

      // Upload the canvas to the cubemap face.
      const level = 0;
      const internalFormat = gl.RGBA;
      const format = gl.RGBA;
      const type = gl.UNSIGNED_BYTE;
      gl.texImage2D(target, level, internalFormat, format, type, ctx.canvas);
    });
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    world.GL.gl.uniform1i(object.shaderProgram.uCubeMapSampler, 0);

--- PHYSICS

              var height = 5;
  var damping = 0.01;
  // world.Add("sphereLightTex", 1, "BALL", tex);
  // var mass = 1;
  // var sphereShape = new CANNON.Sphere(1);
  // var mat1 = new CANNON.Material();
  // var shapeBody1 = new CANNON.Body({
  //     mass: mass,
  //     material: mat1,
  //     position: new CANNON.Vec3(3*1, -7, height)
  // });
  // shapeBody1.addShape(sphereShape);
  // shapeBody1.linearDamping = damping;
  // physics.world.addBody(shapeBody1);
  // // Physics
  // App.scene.BALL.physics.currentBody = shapeBody1;
  // App.scene.BALL.physics.enabled = true;

  // var mm = new CANNON.ContactMaterial(groundMaterial, mat1, { friction: 0.01, restitution: 0.9 });
  // physics.world.addContactMaterial(mm);




  ---------------------------------------------------------------

    // uniform sampler2D uSampler[${numTextures}];
    // uniform float uMixAmount[${numTextures}];
    /*
    void main() {
        vec4 color = vec4(0);
        for (int i = 0; i < ${numTextures}; ++i) {
            vec4 texColor = texture2D(uSampler[i], vTextureCoord);
            color = mix(color, texColor, uMixAmount[i]);
        }
        gl_FragColor = color;
    }
    */
