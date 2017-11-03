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
      },
      {
        type: 'confirm',
        name: 'isScreenshot',
        message: 'Would you like to add default screenshot to README?',
        default: true
      },
      {
        type: 'confirm',
        name: 'isGit',
        message: 'Create GIT repository?',
        default: true
      }
    ]

    return this.prompt(prompts).then(answers => {
      // To access answers later use `this.answers.someAnswer`
      this.answers = answers
      this.answers.projectKebabName = _.kebabCase(answers.projectName)
    })
  }

  configuring () {
    this._copyPaste('.eslintignore')
    this._copyPaste('.editorconfig')
    this._copyPaste('gitignore', '.')
    this._copyPaste('npmrc', '.')
    this._copyPaste('yarnrc', '.')
    this._copyPasteTpl('README.md')
    this._copyPasteTpl('package.json')

    if (this.answers.isScreenshot) {
      this._copyPaste('screenshot.png')
    }

    if (this.answers.isConfig) {
      this._copyPaste('config')
    }

    if (this.answers.isDocker) {
      this._copyPaste('Dockerfile')
      this._copyPaste('.dockerignore')
    }

    if (this.answers.isGit) {
      this.spawnCommandSync('git', [ 'init', '--quiet' ])
    }
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

    this.npmInstall('husky', { 'save-dev': true, 'no-shrinkwrap': true })
    this.yarnInstall(devPackages, { dev: true })
    this.yarnInstall(packages)
  }

  end () {
    if (this.answers.isGit) {
      this.spawnCommandSync('git', [ 'add', '.' ])
      this.spawnCommandSync('git', [ 'commit', '-m', '.' ])
    }
  }

  _copyPaste (path, prefix = '') {
    try {
      this.fs.copy(
        this.templatePath(path),
        this.destinationPath(prefix + path)
      )
    } catch (error) {
      console.error(error)
    }
  }

  _copyPasteTpl (path) {
    this.fs.copyTpl(
      this.templatePath(path),
      this.destinationPath(path),
      this.answers
    )
  }
}
