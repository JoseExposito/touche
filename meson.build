project(
  'com.github.joseexposito.touche',
  version: '1.0.0',
  license: 'GPL-3.0-or-later',
  meson_version: '>= 0.50.0',
  default_options: [ 'warning_level=2' ],
)


i18n = import('i18n')


# Check for build dependencies
gjs_bin = find_program('gjs')
npm_bin = find_program('npm')
node_bin = find_program('node')
desktop_utils_bin = find_program('desktop-file-validate', required: false)
appstream_util_bin = find_program('appstream-util', required: false)
compile_schemas_bin = find_program('glib-compile-schemas', required: false)
xgettext_bin = find_program('xgettext', required: false)


message('Installing npm dependencies...')
npm_install = run_command(npm_bin, 'install')
if npm_install.returncode() != 0
  error('Error installing npm dependencies')
endif


subdir('data')
subdir('bundle')
subdir('po')

meson.add_install_script('bundle/scripts/postinstall.py')
