
/**
 * @author Nikola Lukic c 2021
 * @email zlatnaspirala@gmail.com
 * @description Gl Program writen in ECMA6.
 * Used glmatrix2 library.
 */

import App from "./program/manifest";
import * as matrixWorld from "./lib/matrix-world";
import * as matrixGeometry from "./lib/matrix-geometry";
import * as matrixRender from "./lib/matrix-render";
import * as Engine from "./lib/engine";
import * as Events from "./lib/events";
import OBJ from "./lib/loader-obj";
import operation from "./lib/matrix-buffers";
// import MATRIX_DRAWS from "./lib/matrix-draws";
import texTools from "./lib/matrix-textures";
import * as UTILITY from "./lib/utility";

export {
  App,
  Engine,
  Events,
  matrixWorld,
  matrixGeometry,
  matrixRender,
  texTools,
  UTILITY,
  operation,
  OBJ,
};
