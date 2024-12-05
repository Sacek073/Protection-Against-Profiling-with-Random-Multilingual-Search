const yargs = require('yargs');
const config = require('./config.js');

function parse_arguments() {
  const argv = yargs
  .option('m', {
    alias: 'mode',
    describe: 'Mode of the tool:\n\"tool\"\twill run the random searches\n\"queries\"\twill searach all the queries from the wordlist.',
    type: 'string',
    choices: ['tool', 'queries'],
    demandOption: true
  })
  .option('l', {
    alias: 'language',
    describe: `Languages of the random search.\nDefault: ${config.languages}\nIf mode is set to \"queries\", this option is ignored.`,
    type: 'array',
    choices: config.languages,
    demandOption: false
  })
  .option('n', {
    alias: 'number',
    describe: 'The lenght of the query i.e. number of words in the query.\nDefault: 0 -- which means that random number of words will be selected from 1 to 3\nIf mode is set to \"queries\", this option is ignored.',
    type: 'number',
    demandOption: false
  })
  .option('p', {
    alias: 'path',
    describe: 'Path to the wordlist file.\nDefault: \"../wordlists.words.txt\"\nNeeded for \"queries\" mode, if mode is set to \"tool\", this option is ignored.',
    type: 'string',
    demandOption: false
  })
  .option('o', {
    alias: 'output',
    describe: 'Output file for the queries mode. File is stored in the results subfolder. The stored file is json.\nDefault: \"results.json\"',
    type: 'string',
    demandOption: false
  })
  .argv;

  // Languages
  if(argv.mode === 'queries' && argv.language !== undefined){
    console.log('Warning: Mode is set to \"queries\" and languages are specified. Languages will be ignored.')
  }
  if(argv.mode === 'tool' && argv.language !== undefined){
    config.languages = argv.language;
  }

  // Number
  if(argv.mode === 'queries' && argv.number !== undefined){
    console.log('Warning: Mode is set to \"queries\" and number is specified. Number will be ignored.')
  }
  if(argv.mode === 'tool' && argv.number !== undefined){
    config.number_of_words = argv.number;
  }

  // Path
  if(argv.mode === 'tool' && argv.path !== undefined){
    console.log('Warning: Mode is set to \"tool\" and path is specified. Path will be ignored.')
  }
  if(argv.mode === 'queries' && argv.path !== undefined){
    config.wordlist_path = argv.path;
  }

  // Output
  if((argv.mode === 'tool' || argv.mode === 'queries') && argv.output !== undefined){
    config.output_file = argv.output;
  }

  return argv;
}

module.exports = {
  parse_arguments: parse_arguments
};