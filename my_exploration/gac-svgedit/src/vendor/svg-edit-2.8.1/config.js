
if (window.svgEditor) {
	// EXTENSION CONFIG
    svgEditor.setConfig({
        /**
         To override the ability for URLs to set their own extensions,
         uncomment the following (note that if setConfig() is used in
         extension code, it will still be additive to extensions,
         however):
         */
        lockExtensions: true,
        /** Extension configuration */
        extensions: [
            'ext-connector.js', 'ext-eyedropper.js', 'ext-grid.js', 'ext-markers.js',
            'ext-overview_window.js', 'ext-polygon.js', 'ext-server_opensave.js', 'ext-shapes.js',
            'ext-star.js', 'ext-storage.js'
            // Foreign Object seems useful to insert special characters but, it wasn't working
            // for me.  'ext-foreignobject.js',
            // The image library seems quite useful but, the editing rectangle and grips are drawn in the wrong place.
            // 'ext-imagelib.js',
        ],
        // , noDefaultExtensions: false, // noDefaultExtensions can only be meaningfully used in config.js or in the URL

        canvasName: 'default',
        initFill: {
            opacity: 0
        },
        initStroke: {
            width: 4,
        },

        /*
        Uncomment the following to allow at least same domain (embedded) access,
        including file:// access.
        Setting as `['*']` would allow any domain to access but would be unsafe to
        data privacy and integrity.
        */
        // May be 'null' (as a string) when used as a file:// URL
        allowedOrigins: [window.location.origin || 'null'],
        dimensions: [800, 600],
        gridSnapping: true,
        showRulers: false,
        wireframe: false

    }, {allowInitialUserOverride: false});

} else {
	alert("The SVG-Editor is not available.")
}
