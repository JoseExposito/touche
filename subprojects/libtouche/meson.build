project(
  'libtouche',
  'cpp',
  version: '2.0.0', # Warning: If you increase this version remember to change src/pkg-init.js
  meson_version: '>= 0.56.0'
)

gnome = import('gnome')

inc = include_directories('.')

headers = [
  'touche.h'
]

sources = [
  'touche.cpp'
]

dependencies = [
  dependency('glib-2.0', required: true),
  dependency('gobject-2.0', required: true),
  dependency('x11', required: true),
]

install_headers(headers)

libtouche = shared_library(
  'touche',
  include_directories : inc,
  sources: sources,
  dependencies: dependencies,
  soversion: '0',
  install: true
)

gnome.generate_gir(
  libtouche,
  sources: headers + sources,
  namespace: 'Touche',
  nsversion: meson.project_version(),
  export_packages: meson.project_name(),
  includes: ['GObject-2.0'],
  install: true
)

libtouche_dep = declare_dependency(
  include_directories: inc,
  link_with: libtouche
)
