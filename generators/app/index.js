const Generator = require('yeoman-generator')
const chalk = require('chalk')
const _ = require('lodash')

const STRELKA_LOGO = `
  . . . . . . . . . . . . . . . . . . . .
  .                  .              ..  .
  .                  .           ..     .
  .                  .        ..        .
  .                  .     ..           .
  .                  .  ..              .
  . . . . . . . . . . . . . . . . . . . .
`

module.exports = class extends Generator {
  prompting () {
    this.log(chalk.red(STRELKA_LOGO))

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the project\'s name?',
        default: 'Strelka Project'
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: 'Give this project description?',
        default: ''
      },
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
      this.answers.projectKebabName = _.kebabCase(answers.projectName)
    })
  }

  writing () {
    this._copyPaste('screenshot.png')
    this._copyPasteTpl('README.md')
    this._copyPasteTpl('package.json')
  }

  install () {
    this.npmInstall('husky', () => this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    }))
  }

  _copyPaste (path) {
    this.fs.copy(
      this.templatePath(path),
      this.destinationPath(path)
    )
  }

  _copyPasteTpl (path) {
    this.fs.copyTpl(
      this.templatePath(path),
      this.destinationPath(path),
      this.answers
    )
  }
}
