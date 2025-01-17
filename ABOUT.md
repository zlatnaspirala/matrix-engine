
## Mobile browsers support list:

- Android chrome `NOT ALL EXAMPLES WORKS`
  camera_texture demo works with optimisation code
  Cant use video texture on objects on cube works.
  Probally exist some limitation for vetrex size...

## Hybrid mobile platforms

- Hybrid Android
  Light ambient too mush amp values [keep it from 0 - 1]
  Audio is on camera on but no textures/black
  Video textures bliking diff solid colors...


## Blender export multi obj script  <4

- https://docs.blender.org/api/current/bpy.ops.wm.html

```py
# exports each selected object into its own file

import bpy
import os

# export to blend file location
basedir = os.path.dirname(bpy.data.filepath)

if not basedir:
    raise Exception("Blend file is not saved")

view_layer = bpy.context.view_layer

obj_active = view_layer.objects.active
selection = bpy.context.selected_objects

bpy.ops.object.select_all(action='DESELECT')

for obj in selection:

    obj.select_set(True)

    # some exporters only use the active object
    view_layer.objects.active = obj

    name = bpy.path.clean_name(obj.name)
    fn = os.path.join(basedir, name)

    bpy.ops.export_scene.obj(filepath=fn + ".obj", use_selection=True)

    # Can be used for multiple formats
    # bpy.ops.export_scene.x3d(filepath=fn + ".x3d", use_selection=True)

    obj.select_set(False)

    print("written:", fn)


view_layer.objects.active = obj_active

for obj in selection:
    obj.select_set(True)
```