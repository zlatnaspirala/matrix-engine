
import * as matrixEngine from './index';

import {runThis as cube_tex_arrays} from './apps/cube_tex_arrays';
import {runThis as adding_color_cube} from './apps/adding_color_cube';
import {runThis as adding_color_piramyde} from './apps/adding_color_piramyde';
import {runThis as adding_color_triangle} from './apps/adding_color_triangle';
import {runThis as adding_tex_square_raycast} from './apps/adding_tex_square_raycast';
import {runThis as adding_more_texture_samplers} from './apps/adding_more_texture_samplers';
import {runThis as adding_square_texture} from './apps/adding_square_texture';
import {runThis as all_variant_of_blending} from './apps/all_variant_of_blending';
import {runThis as audio_manipulation} from './apps/audio_manipulation';
import {runThis as audio_manipulation2} from './apps/audio_manipulation2';
import {runThis as camera_texture} from './apps/camera_texture';
import {runThis as cube_experimental} from './apps/cube_experimental';
import {runThis as cube_geometry} from './apps/cube_geometry';
import {runThis as cube_light_and_texture} from './apps/cube_light_and_texture';
import {runThis as cube_light_dinamic} from './apps/cube_light_dinamic';
import {runThis as custom_texture} from './apps/custom_texture';
import {runThis as first_person_controller} from './apps/first_person_controller';
import {runThis as load_obj_file} from './apps/load_obj_file';
import {runThis as my_world} from './apps/my_world';
import {runThis as obj_animation} from './apps/obj_animation';
import {runThis as obj_animation_build_mesh_effect} from './apps/obj_animation_build_mesh_effect';
import {runThis as one_kilo} from './apps/one-kilo';
import {runThis as porting2d} from './apps/porting2d';
import {runThis as porting2d_particle} from './apps/porting2d_particle';
import {runThis as porting2d_text} from './apps/porting2d_text';
import {runThis as sphere_geometry} from './apps/sphere_geometry';
import {runThis as texture_dinamic_manipulation} from './apps/texture_dinamic_manipulation';
import {runThis as video_texture} from './apps/video_texture';
import {runThis as adding_color_square} from './apps/adding_color_square';
import {runThis as bvh_loader} from './apps/bvh-loader';
import {runThis as bvh_animation_class} from './apps/bvh-animation-class';
import {runThis as active_editor } from './apps/active_editor';
import {runThis as porting2d_micro_draw } from './apps/porting2d_micro_draw';
import {runThis as physics_cube } from './apps/physics_cube';
import {runThis as physics_sphere } from './apps/physics_sphere';
import {runThis as spot_light_basic } from './apps/spot_light_basic';
import {runThis as networking_basic } from './apps/networking_basic';
import {runThis as load_obj_sequence } from './apps/load_obj_sequence';
import {runThis as opengles_native_cubemap } from './apps/opengles_native_cubemap';
import {runThis as opengles_native_cubemap_images } from './apps/opengles_native_cubemap_images';
import {runThis as lens_effect } from './apps/lens_effect';
import {runThis as fps_player_controller } from './apps/fps_player_controller';
import {runThis as basic_fbo } from './apps/basic_fbo';
import {runThis as video_texture_lava} from './apps/video_texture_lava';
import {runThis as matrix_chat_room} from './apps/matrix_chat_room';
import { runThis as torus_geometry } from './apps/torus_geometry';
import { runThis as physics_cube_active_textures } from './apps/physics_cube_active_textures';
import { runThis as fbo_manipulation } from './apps/fbo_manipulation';
import { runThis as welcome_gui_editor } from './apps/welcome-gui-editor';
import { runThis as rolling_the_dice } from './apps/rolling_the_dice';

/**
 * @description
 * All examples instances.
 * This schema can be used for any website.
 * It is good for switching big independent parts of app.
 * @example for query-build.html?u=NAME_OF_EXAMPLE
 * public/query-build.html?u=spot_light_shadows
 */
var Examples = {
  rolling_the_dice: rolling_the_dice,
  fbo_manipulation: fbo_manipulation,
  physics_cube_active_textures: physics_cube_active_textures,
  torus_geometry: torus_geometry,
  matrix_chat_room: matrix_chat_room,
  video_texture_lava: video_texture_lava,
  basic_fbo: basic_fbo,
  fps_player_controller:fps_player_controller,
  lens_effect: lens_effect,
  opengles_native_cubemap_images: opengles_native_cubemap_images,
  opengles_native_cubemap: opengles_native_cubemap,
  load_obj_sequence: load_obj_sequence,
  networking_basic: networking_basic,
  spot_light_basic: spot_light_basic,
  physics_sphere: physics_sphere,
  physics_cube: physics_cube,
  porting2d_micro_draw: porting2d_micro_draw,
  active_editor: active_editor,
  bvh_animation_class: bvh_animation_class,
  bvh_loader: bvh_loader,
  adding_tex_square_raycast: adding_tex_square_raycast,
  cube_tex_arrays: cube_tex_arrays,
  adding_color_cube: adding_color_cube,
  adding_color_piramyde: adding_color_piramyde,
  adding_color_triangle: adding_color_triangle,
  adding_color_square: adding_color_square,
  adding_more_texture_samplers: adding_more_texture_samplers,
  adding_square_texture: adding_square_texture,
  all_variant_of_blending: all_variant_of_blending,
  audio_manipulation: audio_manipulation,
  audio_manipulation2: audio_manipulation2,
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
  welcome_gui_editor: welcome_gui_editor
};

/**
 * @description
 * Little help func.
 */
const QueryString = matrixEngine.utility.QueryString;
const scriptManager = matrixEngine.utility.scriptManager;

var world;
var App = matrixEngine.App;

if ('serviceWorker' in navigator) {
  // navigator.serviceWorker.register('worker.js');
} else {
  console.warn('Matrix Engine: No support for web workers in this browser.');
}

window.addEventListener('load', function () {
  setTimeout( () => { matrixEngine.Engine.initApp(webGLStart); }, 1000)
});

function webGLStart() {
  world = matrixEngine.matrixWorld.defineworld(canvas);

  if (world) {
    world.callReDraw();
    if (typeof QueryString.u != 'undefined' &&
        typeof Examples[QueryString.u] != 'undefined') {
      setTimeout(() => {
        try {
          Examples[QueryString.u](world);
        } catch(err) {
          // Examples['adding_color_cube'](world);
        }
      }, 100);
    } else {
      setTimeout(() => {
        Examples['adding_color_cube'](world);
      }, 100);
    }
  } else {
    console.error(' Canvas has not been initialized, contact your programmer... ');
  }

  // Make it global for console easy access.
  // Remove this line for final prodc.
  window.App = App;
}

// Make it global for console easy access.
// Remove this line for final prodc.
window.matrixEngine = matrixEngine;

var App = matrixEngine.App;
export default App;
