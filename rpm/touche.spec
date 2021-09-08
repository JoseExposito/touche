Name:           touche
Summary:        The desktop application to configure Touchégg
Url:            https://github.com/JoseExposito/touche
Version:        1.0.7
Release:        1
License:        GPLv3+
Group:          Applications/Productivity
Vendor:         José Expósito <jose.exposito89@gmail.com>
Packager:       José Expósito <jose.exposito89@gmail.com>

Autoreq:        1
Prefix:         %{_prefix}
Source0:        touche.tar.gz

%description
Easily configure your touchpad and touchscreen multi-touch gestures with this GTK graphical user interface.


%prep
%setup -n touche


%build
%meson -Dflatpak=false -Dtarget-de=gnome
%meson_build


%install
%meson_install


%check


%clean


%post -p /sbin/ldconfig
%postun -p /sbin/ldconfig


%pre


%preun


%files
%{_bindir}/com.github.joseexposito.touche
%{_includedir}/touche.h
%{_libdir}/libtouche.so*
%{_libdir}/girepository-1.0/Touche-1.0.0.typelib
%{_datadir}/appdata/com.github.joseexposito.touche.appdata.xml
%{_datadir}/applications/com.github.joseexposito.touche.desktop
%{_datadir}/com.github.joseexposito.touche/com.github.joseexposito.touche.data.gresource
%{_datadir}/com.github.joseexposito.touche/com.github.joseexposito.touche.src.gresource
%{_datadir}/gir-1.0/Touche-1.0.0.gir
%{_datadir}/glib-2.0/schemas/com.github.joseexposito.touche.gschema.xml
%{_datadir}/icons/hicolor/128x128/apps/com.github.joseexposito.touche.svg
%{_datadir}/icons/hicolor/128x128@2/apps/com.github.joseexposito.touche.svg
%{_datadir}/icons/hicolor/16x16/apps/com.github.joseexposito.touche.svg
%{_datadir}/icons/hicolor/16x16@2/apps/com.github.joseexposito.touche.svg
%{_datadir}/icons/hicolor/24x24/apps/com.github.joseexposito.touche.svg
%{_datadir}/icons/hicolor/24x24@2/apps/com.github.joseexposito.touche.svg
%{_datadir}/icons/hicolor/32x32/apps/com.github.joseexposito.touche.svg
%{_datadir}/icons/hicolor/32x32@2/apps/com.github.joseexposito.touche.svg
%{_datadir}/icons/hicolor/48x48/apps/com.github.joseexposito.touche.svg
%{_datadir}/icons/hicolor/48x48@2/apps/com.github.joseexposito.touche.svg
%{_datadir}/icons/hicolor/64x64/apps/com.github.joseexposito.touche.svg
%{_datadir}/icons/hicolor/64x64@2/apps/com.github.joseexposito.touche.svg
%{_datadir}/locale/es/LC_MESSAGES/com.github.joseexposito.touche.mo
%{_datadir}/locale/fr/LC_MESSAGES/com.github.joseexposito.touche.mo
%{_datadir}/locale/it/LC_MESSAGES/com.github.joseexposito.touche.mo


%changelog

* Wed Sep 08 2021 José Expósito <jose.exposito89@gmail.com> - 1.0.7-1
- Configure your keyboard shortcuts easily
- Update Flatpak runtime to GNOME 40
- Update Italian translations
- Update French translations
- Fix a bug making some keyboard shortcuts options disappear

* Tue Jul 06 2021 José Expósito <jose.exposito89@gmail.com> - 1.0.6-1
- Allow to display a custom animation on keyboard shortcut and execute command actions
- Smaller default window size
- French translation improvements
- RPM packaging support
