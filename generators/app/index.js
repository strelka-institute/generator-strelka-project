const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

module.exports = class extends Generator {
  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the extraordinary ' + chalk.red('generator-strelka-frontend') + ' generator!'
    ))

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ]

    return this.prompt(prompts).then(answers => {
      // To access answers later use `this.answers.someAnswer`
      this.answers = answers
    })
  }

  writing () {
    this._copyPasteTpl('README.md')
  }

  install () {
    this.yarnInstall()
  }

  _copyPasteTpl (path) {
    this.fs.copyTpl(
      this.templatePath(path),
      this.destinationPath(path),
      this.answers
    )
  }
}
