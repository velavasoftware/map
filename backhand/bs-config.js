module.exports = {
    proxy: "http://djcorporateservices.com:3004/",
    files: ["**/*.css", "**/*.html", "**/*.js"],
    ignore: ["node_modules"],
    reloadDelay: 10,
    ui: false,
    notify: false,
    port: 3004,
  };