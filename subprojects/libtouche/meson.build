project(
  'libtouche',
  'c',
  version: '1.0.0',
  meson_version: '>= 0.49.0'
)

gnome = import('gnome')

inc = include_directories('.')

headers = [
  'touche.h'
]

sources = [
  'touche.c'
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
