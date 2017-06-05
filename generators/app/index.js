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
        name: 'isDocker',
        message: 'Would you like to add Dockerfile?',
        default: false
      },
      {
        type: 'confirm',
        name: 'isConfig',
        message: 'Would you like to add config folder?',
        default: false
      }
    ]

    return this.prompt(prompts).then(answers => {
      // To access answers later use `this.answers.someAnswer`
      this.answers = answers
      this.answers.projectKebabName = _.kebabCase(answers.projectName)
    })
  }

  configuring () {
    this._copyPaste('.gitignore')
    this._copyPaste('.eslintignore')
    this._copyPaste('.editorconfig')
    this._copyPaste('.npmrc')
    this._copyPaste('.yarnrc')
    this._copyPaste('screenshot.png')
    this._copyPasteTpl('README.md')
    this._copyPasteTpl('package.json')

    if (this.answers.isConfig) {
      this._copyPaste('config')
    }

    if (this.answers.isDocker) {
      this._copyPaste('Dockerfile')
      this._copyPaste('.dockerignore')
    }

    this.spawnCommandSync('git', [ 'init', '--quiet' ])
  }

  install () {
    const devPackages = [
      'cross-env',
      'rimraf',
      'eslint',
      'eslint-config-standard',
      'eslint-config-strelka',
      'eslint-plugin-html',
      'eslint-plugin-import',
      'eslint-plugin-node',
      'eslint-plugin-promise',
      'eslint-plugin-standard',
      'husky',
      'lint-staged'
    ]
    const packages = []

    if (this.answers.isConfig) {
      packages.push('config')
    }

    this.npmInstall('husky', { 'save-dev': true })
    this.yarnInstall(devPackages, { dev: true })
    this.yarnInstall(packages)
  }

  end () {
    this.spawnCommandSync('git', [ 'add', '.' ])
    this.spawnCommandSync('git', [ 'commit', '-m', '.' ])
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
