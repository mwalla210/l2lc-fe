#!/usr/bin/env node
// Morgan Wallace

let program = require('commander')
let fs = require('fs')
const chalk = require('chalk')

const folderre = /^(components|models|store|src)$/i

let validateInput = function(arg, re, msg, command){
  if(!re.test(arg)){
    console.log(chalk.red(`${msg} ${arg}, must match ${re}`))
    program.outputHelp()
    if (command != null) command.outputHelp()
    process.exit(1)
  }
}

let validateFile = function(fn){
  if (fs.existsSync(fn)){
    console.log(chalk.red(`File already exists: ${fn}`))
    process.exit(1)
  }
}

// Package (& optional upload) of a test bundle
program
  .command('new <testfolder> <testname>')
  .description('create a new test')
  .action(function(testfolder, testname){
    validateInput(testfolder, folderre, 'Bad test folder name:')
    let filepath = `${testfolder}/${testname}.test.js`
    validateFile(filepath)
    let title = testname.charAt(0).toUpperCase() + testname.slice(1)
    // Process for imports and injects
    let imports = []
    let libImports = []
    let bracketImports = []
    let importRE = /'.*'/g
    let injects = []
    let injectRE = /'\w*'/g
    let contents = fs.readFileSync(`../${testfolder}/${testname}.js`, 'utf8').split('\n')
    contents.forEach(line => {
      // Our custom file imports, or pur npm-modules imports (not React, MobX-related, Prop-Types) (not consts file)
      if (line.startsWith('import') && (line.includes('./') || (!line.includes('from \'react\'') && !line.includes('mobx') && !line.includes('prop-types'))) && !line.includes('consts')){
        // Bracketed imports
        if (line.includes('{')){
          bracketImports.push({
            lib: line.match(importRE)[0].replace(/'/gi, ''),
            items: line.match(/{.*}/g)[0].replace('{','').replace('}','').split(',').map(item => item.trim())
          })
        }
        // Our custom file imports
        else if (line.includes('./')){
          let initialFP = line.match(importRE)[0].replace(/'/g,'')
          // If already referencing a folder away, add another layer
          if (initialFP.includes('..'))
            initialFP = `../${initialFP}`
          // Otherwise, get folder specified for this test and use
          else{
            initialFP = `../../${testfolder}/${initialFP.replace('./','')}`
          }
          imports.push(initialFP)
        }
        // Non-bracket, non custom file imports
        else{
          libImports.push({
            lib: line.match(importRE)[0].replace(/'/gi, ''),
            name: line.match(/import.*from/g)[0].replace('import','').replace('from','').trim()
          })
        }
      }
      else if (line.startsWith('@inject')){
        let matches = line.match(injectRE)
        matches.forEach(match => injects.push(match.replace(/'/gi, '')))
      }
    })
    let importsStr = ''
    imports.forEach(item => importsStr+=`jest.mock('${item}')\n`)
    let libImportsStr = ''
    libImports.forEach(item => libImportsStr+=`jest.mock('${item.lib}', () => '${item.name}')\n`)
    let bracketImportsStr = ''
    bracketImports.forEach(item => {
      bracketImportsStr+=`jest.mock('${item.lib}', () => ({\n`
      item.items.forEach(name => bracketImportsStr+=`  ${name}: '${name}',\n`)
      bracketImportsStr+=`}))\n`
    })
    let fileContent = `import React from 'react'
import renderer from 'react-test-renderer'
import ${title} from '../../${testfolder}/${testname}'
${libImportsStr}${bracketImportsStr}${importsStr}
describe('${title}', () => {
  it ('Does something', () => {
    let options = {${injects.length > 0 ? `\n      ${injects.join().replace(',',': {},\n      ')}: {}\n    ` : ''}}
    const component = renderer.create(
      <${title} {...options}/>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})`
    console.log(fileContent)
    fs.writeFile(filepath, fileContent, (err) => {
        if (err) throw err
        console.log(chalk.green(`Template file successfully saved: ${filepath}`))
    })
  })

program.parse(process.argv)
