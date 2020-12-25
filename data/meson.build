gnome = import('gnome')

data_conf = configuration_data()
data_conf.set('PROJECT_NAME', meson.project_name())
data_conf.set('PROJECT_NAME_PATH', '/' + '/'.join(meson.project_name().split('.')))
data_conf.set('PROJECT_LICENSE', meson.project_license().get(0))


# Generate the desktop file
# https://specifications.freedesktop.org/desktop-entry-spec/latest/index.html

desktop_in_file = configure_file(
  input: 'desktop.in.in',
  output: 'desktop.in',
  configuration: data_conf,
)

desktop_file = i18n.merge_file(
  input: desktop_in_file,
  output: meson.project_name() + '.desktop',
  type: 'desktop',
  po_dir: join_paths('..', 'po'),
  install: true,
  install_dir: join_paths(get_option('datadir'), 'applications'),
)

if desktop_utils_bin.found()
  test('Validate desktop file', desktop_utils_bin, args: [desktop_file])
endif


# Generate the appdata.xml file
# https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html

appstream_in_file = configure_file(
  input: 'app.appdata.xml.in.in',
  output: 'app.appdata.xml.in',
  configuration: data_conf,
)

appstream_file = i18n.merge_file(
  input: appstream_in_file,
  output: meson.project_name() + '.appdata.xml',
  po_dir: join_paths('..', 'po'),
  install: true,
  install_dir: join_paths(get_option('datadir'), 'appdata'),
)

if appstream_util_bin.found()
  test('Validate appstream file', appstream_util_bin, args: ['validate', appstream_file])
endif


# Generate the gschema.xml file (GSettings)
# https://developer.gnome.org/GSettings/

configure_file(
  input: 'gschema.xml.in',
  output: meson.project_name() + '.gschema.xml',
  configuration: data_conf,
  install: true,
  install_dir: join_paths(get_option('datadir'), 'glib-2.0', 'schemas'),
)

if compile_schemas_bin.found()
  test('Validate schema file', compile_schemas_bin, args: ['--strict', '--dry-run', meson.current_source_dir()])
endif


# Generate the assets GResource

data_xml = configure_file(
  input: 'data.gresource.xml.in',
  output: 'data.gresource.xml',
  configuration: data_conf,
)

gnome.compile_resources(
  meson.project_name() + '.data',
  data_xml,
  gresource_bundle: true,
  install: true,
  install_dir: join_paths(get_option('datadir'), meson.project_name()),
)