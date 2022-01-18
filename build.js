const esbuild = require("esbuild");

const nativeNodeModulesPlugin = {
    name: "native-node-modules",
    setup(build) {
        build.onResolve({ filter: /\.node$/, namespace: "file" }, (args) => ({
            path: require.resolve(args.path, { paths: [args.resolveDir] }),
            namespace: "node-file",
        }));

        build.onLoad({ filter: /.*/, namespace: "node-file" }, (args) => ({
            contents: `
          import path from ${JSON.stringify(args.path)}
          try { module.exports = require(path) }
          catch {}
        `,
        }));

        build.onResolve(
            { filter: /\.node$/, namespace: "node-file" },
            (args) => ({
                path: args.path,
                namespace: "file",
            })
        );

        let opts = build.initialOptions;
        opts.loader = opts.loader || {};
        opts.loader[".node"] = "file";
    },
};

(async() => {
    try {
        await esbuild.build({
            entryPoints: ["./src/index.ts"],
            outfile: "./dist/index.js",
            minify: true,
            bundle: true,
            format: "iife",
            platform: "node",
            target: ["node17"],
            loader: {
                ".png": "file",
                ".jpg": "file",
                ".jpeg": "file",
                ".svg": "file",
                ".gif": "file",
            },
            plugins: [nativeNodeModulesPlugin],
        });
    
        console.log("Success!");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
