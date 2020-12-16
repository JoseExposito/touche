gnome = import('gnome')

# Build the application entry point "/<prefix>/bin" from the template
message('Building the application entry point: ' + join_paths(get_option('bindir'), meson.project_name()))

bin_conf = configuration_data()
bin_conf.set('GJS', gjs_bin.path())
bin_conf.set('PACKAGE_VERSION', meson.project_version())
bin_conf.set('PROJECT_NAME', meson.project_name())
bin_conf.set('prefix', get_option('prefix'))
bin_conf.set('libdir', join_paths(get_option('prefix'), get_option('libdir')))
bin_conf.set('datadir', join_paths(get_option('prefix'), get_option('datadir')))

configure_file(
  input: join_paths('templates', 'bin-entry-point.in'),
  output: meson.project_name(),
  configuration: bin_conf,
  install: true,
  install_dir: get_option('bindir'),
)


# Build the application JavaScript bundle
message('Building the application JavaScript bundle with Webpack...')

app_bundle = custom_target(
  'build-application-bundle',
  build_by_default: true,
  build_always_stale: true,
  command: [
    node_bin,
    join_paths(meson.source_root(), 'bundle', 'scripts', 'build.js'),
    meson.source_root(),
    join_paths(meson.build_root(), '@OUTDIR@'),
    get_option('buildtype'),
    meson.project_name()
  ],
  capture: false,
  output: meson.project_name() + '.js',
)


# Compile the application JavaScript bundle to a GResource
src_conf = configuration_data()
src_conf.set('PROJECT_NAME', meson.project_name())
src_conf.set('GRESOURCENAME', '/'.join([''] + meson.project_name().split('.') + ['js']))

src_xml = configure_file(
  input: join_paths('templates', 'src.gresource.xml.in'),
  output: 'src.gresource.xml',
  configuration: src_conf,
)

gnome.compile_resources(
  meson.project_name() + '.src',
  src_xml,
  dependencies: app_bundle,
  gresource_bundle: true,
  install: true,
  install_dir: join_paths(get_option('datadir'), meson.project_name()),
)
