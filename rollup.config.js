import {readFileSync} from 'fs'
import {resolve, dirname} from 'path'
import {fileURLToPath} from 'url'
import chalk from 'chalk'
import {sync as copySync} from 'cp-file'
import gzipSize from 'gzip-size'
import prettyBytes from 'pretty-bytes'
import babel from 'rollup-plugin-babel'
import localResolve from 'rollup-plugin-local-resolve'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pkg = JSON.parse(readFileSync('./package.json'))
const dependencies = Object.keys(pkg.dependencies || {}).concat(['path'])

function filesize() {
  return {
    writeBundle(options, bundle) {
      const file = options.file
      const code = Object.values(bundle)[0].code
      const size = gzipSize.sync(code)
      const prettySize = prettyBytes(size)
      const color = size < 5000 ? 'green' : size > 40000 ? 'red' : 'yellow'
      const report = chalk.white(file) + ': ' + chalk[color](prettySize)

      console.log(report)
    }
  }
}

function copy(files) {
  return {
    writeBundle() {
      Object.entries(files).forEach(([src, dest]) => {
        try {
          copySync(resolve(__dirname, src), resolve(__dirname, dest))
          const report = chalk.green(src + ' -> ' + dest)
          console.log(report)
        } catch (err) {
          const report = chalk.red('error on copy file: ' + src + ' to ' + dest)
          console.log(report)
        }
      })
    }
  }
}

export default {
  input: './src/index.js',
  plugins: [
    babel({
      babelrc: false,
      presets: [
        [
          'env',
          {
            targets: {
              node: 4
            },
            modules: false
          }
        ],
        'stage-0'
      ],
      plugins: ['external-helpers', 'transform-object-rest-spread']
    }),
    localResolve(),
    copy({
      './src/bradesco/fonts/roboto-bold.ttf': 'dist/fonts/roboto-bold.ttf',
      './src/bradesco/fonts/roboto-regular.ttf':
        'dist/fonts/roboto-regular.ttf',
      './src/bradesco/logos/logo-bradesco.jpg': 'dist/logos/logo-bradesco.jpg',
      './src/omni/logos/logo-omni.jpg': 'dist/logos/logo-omni.jpg',
      './src/bb/fonts/roboto-regular.ttf': 'dist/fonts/roboto-regular.ttf',
      './src/bb/logos/logo-bb.png': 'dist/logos/logo-bb.png',
      './src/caixa/fonts/roboto-regular.ttf': 'dist/fonts/roboto-regular.ttf',
      './src/caixa/logos/logo-caixa.jpg': 'dist/logos/logo-caixa.jpg',
      './src/itau/fonts/roboto-regular.ttf': 'dist/fonts/roboto-regular.ttf',
      './src/itau/logos/logo-itau.jpg': 'dist/logos/logo-itau.jpg',
      './src/santander/fonts/roboto-regular.ttf':
        'dist/fonts/roboto-regular.ttf',
      './src/santander/fonts/roboto-bold.ttf': 'dist/fonts/roboto-bold.ttf',
      './src/santander/logos/logo-santander.jpg':
        'dist/logos/logo-santander.jpg',
      './src/safra/fonts/roboto-regular.ttf': 'dist/fonts/roboto-regular.ttf',
      './src/safra/logos/logo-safra.jpg': 'dist/logos/logo-safra.jpg',
      './src/sicoob/fonts/roboto-regular.ttf': 'dist/fonts/roboto-regular.ttf',
      './src/sicoob/fonts/roboto-bold.ttf': 'dist/fonts/roboto-bold.ttf',
      './src/sicoob/logos/logo-sicoob.png': 'dist/logos/logo-sicoob.png'
    }),
    filesize()
  ],
  external: dependencies,
  output: {
    format: 'cjs',
    file: 'dist/index.js'
  }
}
