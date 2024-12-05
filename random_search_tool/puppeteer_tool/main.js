// Imports
const scenarios = require('./scenarios.js');
const config = require('./config.js');
const {parse_arguments} = require('./arguments.js');

(async () => {
  const argv = parse_arguments();
  if (argv.mode === 'tool') {
    let number = config.number_of_words;
    if (config.number_of_words === 0){
      number = "random";
    }

    console.log(`Running the tool with languages: ${config.languages}; words per query: ${number}, total searches: ${config.number_of_tool_querries}`);
    scenarios.the_tool()
  } else if (argv.mode === 'queries') {
    console.log('Running the queries');
    scenarios.queries()
  }
})();
