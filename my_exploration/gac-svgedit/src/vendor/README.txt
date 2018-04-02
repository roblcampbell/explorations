This is an unmodified version of SVG-Edit that was packaged with:
	.../svgedit$ make release
	cd ../gac-svgedit
	mkdir src/vendor
    cp -rup build/svg-edit-2.8.1/ src/vendor

The following files were then edited:
	svg-editor.html was split. The <html><head> contents are copied to svg-editor-head-content.html and included from
	index.html. The <html><body> contents are copied to svg-editor-head-content and included from app.component.html.
	Misc. files has minor changes:
		lang.lv.js: FIX: Lines were joined where they were incorrectly wrapped.
