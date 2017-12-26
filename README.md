# Webpack Internal Module Caching Demonstration

## Description

This repo attempts to offer a simple model that demonstrates how Webpack
module caching works as well as the problems that can arise due to
module id collision.

### Problems that this repo demonstrates

In traditional full page reload application lifecycles, module id
collision would not be a problem. However, in the TSheets application
lifecycles, modules are loaded in on the fly. That is, within a single
application lifecycle a module could be loaded into Webpack's internal
cache and attempted to be reloaded multiple times.

Under the covers, Webpack's module loading system has a cache. You can
get a taste of this by looking for `__webpack_require__` in your
compiled javascript assets.

```
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
...
```

Here you can see that internally Webpack has a cache is implemented as a
map keyed by module id to the compiled module implementation. This is
known internally as `installedChunks`.

With the above snippet of code, it is possible that a module of name
`foo` if already loaded, would not override the pre-existing module
if it was attempted to be loaded again.

## Steps

First start up the application:

```
npm run build
npm run dev-server
```

Then check out the application at `localhost:8080`.

Open the dev tools and run the following in the dev console:
```
a.testAlert();
```

You should see the alert pop up as `a1`. Now you would intuitively
expect that if you change `a1` to `a2` and bring the script into
the app runtime (_without refreshing the page_), that the script would
be updated and if you ran `a.testAlert()` the alert would show you
`a2`. This is not the case, let's demonstrate that with the following.

While the dev server is still running, run

```
npm run repro-steps
```

This will update `a1` to `a2` and rebuild the bundle for you.

Now open the dev console in the same page that you had originally opened
up the browser in. Make sure the network tab is open before you run
the following command.

```
common.loadScript('./build/a/a.min.js');
```

This will load the new version of the script. Basic browser cache
busting is done with the current time in UTC added as a query string.
