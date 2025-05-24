# Compilation

Before you start coding, you will need to install some dependencies:

```bash
# Ubuntu, Debian and derivatives:
$ sudo apt-get install build-essential git tar flatpak-builder \
  meson nodejs npm gjs gettext appstream appstream-util libglib2.0-dev-bin libgirepository1.0-dev gobject-introspection \
  libgtk-4-dev libglib2.0-dev libx11-dev

# RHEL, Fedora, CentOS and derivatives:
$ sudo yum groupinstall "Development Tools"
$ sudo yum install git tar rpm-build flatpak-builder \
  meson nodejs npm gjs gettext libappstream-glib gobject-introspection gobject-introspection-devel \
  gtk4-devel glib2-devel libX11-devel
```

Now clone the source and install dependencies from npm:

```bash
$ git clone https://github.com/JoseExposito/touche.git
$ cd touche
$ npm install
```

# Installation

The `build` npm script executes all the required steps:

```bash
$ npm install
$ npm run build
```

It uses meson under the hood, so it is equivalent to:

```bash
$ npm install
$ meson build --prefix=/usr
$ ninja -C build
$ sudo ninja -C build install
```

## Flatpak

Flatpak is the recommended way to distribute and install the application.

First, install the required npm dependencies and the GNOME runtime and SDK:

```bash
$ npm install
$ flatpak install flathub org.gnome.Platform//48 org.gnome.Sdk//48
```

Finally, install Touché using:

```bash
$ npm run flatpak
```

Updates to the application available on Flathub are managed from:
https://github.com/flathub/com.github.joseexposito.touche

## Debian package

In addition to Flatpak, you can generate a Debian package and install it:

```bash
$ dpkg-buildpackage -rfakeroot -us -uc -tc
$ sudo apt install ../touche_*.deb # Install the package
```

## RPM package

Or an RPM package:

```bash
$ mkdir -p ~/rpmbuild/{BUILD,RPMS,SOURCES,SPECS,SRPMS}
$ tar --exclude='.flatpak-builder' --exclude='.git' --exclude='build' --exclude='com.github.joseexposito.touche.yml' -czvf ~/rpmbuild/SOURCES/touche.tar.gz -C .. touche
$ rpmbuild -ba rpm/touche.spec
$ sudo dnf install ~/rpmbuild/RPMS/x86_64/touchegg-?.?.?-?.x86_64.rpm
```

## Running your local changes

Touché is written mainly in JavaScript (`./src`) but it uses a little bit of C++
(`./subprojects/libtouche`) when something can not be done in JavaScript.

Before you start coding, make sure to install the C++ library at the system level:

```bash
$ git clone https://github.com/JoseExposito/touche.git
$ cd touche
$ npm install
$ npm run build
$ npm run clean
```

If you make any change to the C++ code, make sure to run `npm run build`.

Now, you can test your JavaScript changes by running:

```
$ npm start
```
