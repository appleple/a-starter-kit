const notifier = require('node-notifier');
const CLIEngine = require("eslint").CLIEngine;
const pkg = require('./../package.json');
const cli = new CLIEngine({
  useEslintrc: true,
  fix: false
});
const report = cli.executeOnFiles([`themes/${pkg.config.theme}/src/js/`]);
const formatter = cli.getFormatter();
console.log(formatter(report.results));
if (report.errorCount !== 0) {
  notifier.notify('eslint failed');
}
