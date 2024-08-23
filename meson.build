project(
  'com.github.joseexposito.touche',
  version: '2.0.14',
  license: 'GPL-3.0-or-later',
  meson_version: '>= 0.56.0',
  default_options: [ 'warning_level=2' ],
)


i18n = import('i18n')


# Check for build dependencies
gjs_bin = find_program('gjs')
npm_bin = find_program('npm')
node_bin = find_program('node')
g_ir_scanner = find_program('g-ir-scanner')
desktop_utils_bin = find_program('desktop-file-validate', required: false)
appstream_util_bin = find_program('appstream-util', required: false)
compile_schemas_bin = find_program('glib-compile-schemas', required: false)
xgettext_bin = find_program('xgettext', required: false)


subproject('libtouche')
subdir('data')
subdir('bundle')
subdir('po')

meson.add_install_script('bundle/scripts/postinstall.py')
