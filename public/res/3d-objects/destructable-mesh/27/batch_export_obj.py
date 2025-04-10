# exports each selected object into its own file

import bpy
import os

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

    bpy.ops.wm.obj_export(filepath=fn + ".obj", export_selected_objects=True, export_triangulated_mesh =True)
    obj.select_set(False)
    print("written:", fn)


view_layer.objects.active = obj_active

for obj in selection:
    obj.select_set(True)