
# CREDITS

## OBJECT LOADER
```js
/**
 * @Source http://math.hws.edu/graphicsbook/source/webgl/cube-camera.html
 * @description Creates a model of an annulus or disk lying in the xy plane,
 * centered at the origin.  (This is not a great representation,
 * since all the normals are the same.)
 * @param innerRadius the radius of the hole in the radius; a value of
 *  zero will give a disk rather than a ring.  If not present,
 *  the default value is 0.25.
 * @param outerRadius the radius of the ring, from the center to teh
 *  outer edge.  Must be greater than innerRadius.  If not provided,
 *  the default value is 2*innerRadius or is 0.5 if innerRadius is 0.
 * @slices the number of radial subdivisions in the circular approximation
 *  of an annulus.  If not provided, the value will be 32.
 */

export class customVertex_1 {
  createGeoData( root ) {
    if ( arguments.length == 0 ) {
      // console.log( "test this ?? " );
    }

    var innerRadius = 0.25;
    var outerRadius = outerRadius || innerRadius * 2 || 0.5;
    var slices = slices || 32;

    var vertexCount, vertices, normals, texCoords, indices, i;
    vertexCount = innerRadius == 0 ? slices + 1 : slices * 2;
    vertices = new Float32Array( 3 * vertexCount );
    normals = new Float32Array( 3 * vertexCount );
    texCoords = new Float32Array( 2 * vertexCount );
    indices = new Uint16Array( innerRadius == 0 ? 3 * slices : 3 * 2 * slices );
    var d = ( 2 * Math.PI ) / slices;
    var k = 0;
    var t = 0;
    var n = 0;
    if ( innerRadius == 0 ) {
      for ( i = 0; i < slices; i++ ) {
        var c = Math.cos( d * i );
        var s = Math.sin( d * i );
        vertices[k++] = c * outerRadius;
        vertices[k++] = s * outerRadius;
        vertices[k++] = 0;
        texCoords[t++] = 0.5 + 0.5 * c;
        texCoords[t++] = 0.5 + 0.5 * s;
        indices[n++] = slices;
        indices[n++] = i;
        indices[n++] = i == slices - 1 ? 0 : i + 1;
      }
      vertices[k++] = vertices[k++] = vertices[k++] = 0;
      texCoords[t++] = texCoords[t++] = 0;
    } else {
      var r = innerRadius / outerRadius;
      for ( i = 0; i < slices; i++ ) {
        var c = Math.cos( d * i );
        var s = Math.sin( d * i );
        vertices[k++] = c * innerRadius;
        vertices[k++] = s * innerRadius;
        vertices[k++] = 0;
        texCoords[t++] = 0.5 + 0.5 * c * r;
        texCoords[t++] = 0.5 + 0.5 * s * r;
        vertices[k++] = c * outerRadius;
        vertices[k++] = s * outerRadius;
        vertices[k++] = 0;
        texCoords[t++] = 0.5 + 0.5 * c;
        texCoords[t++] = 0.5 + 0.5 * s;
      }
      for ( i = 0; i < slices - 1; i++ ) {
        indices[n++] = 2 * i;
        indices[n++] = 2 * i + 1;
        indices[n++] = 2 * i + 3;
        indices[n++] = 2 * i;
        indices[n++] = 2 * i + 3;
        indices[n++] = 2 * i + 2;
      }
      indices[n++] = 2 * i;
      indices[n++] = 2 * i + 1;
      indices[n++] = 1;
      indices[n++] = 2 * i;
      indices[n++] = 1;
      indices[n++] = 0;
    }
    for ( i = 0; i < vertexCount; i++ ) {
      normals[3 * i] = normals[3 * i + 1] = 0;
      normals[3 * i + 2] = 1;
    }

    /*
    return {
    vertexPositions: vertices,
    vertexNormals: normals,
    vertexTextureCoords: texCoords,
    indices: indices
    };
  */
  }

```

## Raycast based on:
https://www.npmjs.com/package/raycaster
but adapted special for matrix-engine.

## Bvh Loader:
Converted from python to javascript:
Original source: https://github.com/dabeschte/npybvh

## Bvh Resources folder in resources:
Special thanks to the CMU Graphics Lab Motion Capture Database which provided the data http://mocap.cs.cmu.edu/

## Cannon.js used for physics:
https://schteppe.github.io/cannon.js/

## Shadows vs Lights
https://webglfundamentals.org/webgl/lessons/webgl-3d-lighting-spot.html
