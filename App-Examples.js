import * as matrixEngine from "./index";

import {runThis as adding_color_cube} from "./app/adding_color_cube";
import {runThis as adding_color_piramyde} from "./app/adding_color_piramyde";
import {runThis as adding_color_triangle} from "./app/adding_color_triangle";
import {runThis as adding_geometry} from "./app/adding_geometry";
import {runThis as adding_more_texture_samplers} from "./app/adding_more_texture_samplers";
import {runThis as adding_square_texture} from "./app/adding_square_texture";
import {runThis as all_variant_of_blending} from "./app/all_variant_of_blending";
import {runThis as audio_manipulation} from "./app/audio_manipulation";
import {runThis as camera_texture} from "./app/camera_texture";
import {runThis as cube_experimental} from "./app/cube_experimental";
import {runThis as cube_geometry} from "./app/cube_geometry";
import {runThis as cube_light_and_texture} from "./app/cube_light_and_texture";
import {runThis as cube_light_dinamic} from "./app/cube_light_dinamic";
import {runThis as custom_texture} from "./app/custom_texture";
import {runThis as first_person_controller} from "./app/first_person_controller";
import {runThis as load_obj_file} from "./app/load_obj_file";
import {runThis as my_world} from "./app/my_world";
import {runThis as obj_animation} from "./app/obj_animation";
import {runThis as obj_animation_build_mesh_effect} from "./app/obj_animation_build_mesh_effect";
import {runThis as one_kilo} from "./app/one-kilo";
import {runThis as porting2d} from "./app/porting2d";
import {runThis as porting2d_particle} from "./app/porting2d_particle";
import {runThis as porting2d_text} from "./app/porting2d_text";
import {runThis as sphere_geometry} from "./app/sphere_geometry";
import {runThis as texture_dinamic_manipulation} from "./app/texture_dinamic_manipulation";
import {runThis as video_texture} from "./app/video_texture";
import {runThis as adding_color_square } from "./app/adding_color_square";

var Examples = {
  adding_color_cube: adding_color_cube,
  adding_color_piramyde: adding_color_piramyde,
  adding_color_triangle: adding_color_triangle,
  adding_color_square : adding_color_square ,
  adding_geometry: adding_geometry,
  adding_more_texture_samplers: adding_more_texture_samplers,
  adding_square_texture: adding_square_texture,
  all_variant_of_blending: all_variant_of_blending,
  audio_manipulation: audio_manipulation,
  camera_texture: camera_texture,
  cube_experimental: cube_experimental,
  cube_geometry: cube_geometry,
  cube_light_and_texture: cube_light_and_texture,
  cube_light_dinamic: cube_light_dinamic,
  custom_texture: custom_texture,
  first_person_controller: first_person_controller,
  load_obj_file: load_obj_file,
  my_world: my_world,
  obj_animation: obj_animation,
  obj_animation_build_mesh_effect: obj_animation_build_mesh_effect,
  one_kilo: one_kilo,
  porting2d: porting2d,
  porting2d_particle: porting2d_particle,
  porting2d_text: porting2d_text,
  sphere_geometry: sphere_geometry,
  texture_dinamic_manipulation: texture_dinamic_manipulation,
  video_texture: video_texture,
};

/**
 * @description
 * Little help func.
 */
const QueryString = matrixEngine.utility.QueryString;
const scriptManager = matrixEngine.utility.scriptManager;

var world;
var App = matrixEngine.App;

function webGLStart() {
  world = matrixEngine.matrixWorld.defineworld(canvas);

  if (world) {
    world.callReDraw();
    if (typeof QueryString.u != "undefined") {

      Examples[QueryString.u](world);

    } else {

      Examples["adding_color_cube"](world);

    }
  } else {

    console.error(
      " Canvas has not been initialized, contact your programmer... "
    );

  }

  // Make it global for console easy access.
  window.App = App;
}

window.Start = function () {
  matrixEngine.Engine.drawFPS();
  webGLStart();
};

matrixEngine.Engine.load_shaders("shaders/shaders.html");

// Make it global for console easy access.
window.matrixEngine = matrixEngine;

setTimeout(() => {
  matrixEngine.Engine.initApp();
}, 200);

var App = matrixEngine.App;

export default App;
