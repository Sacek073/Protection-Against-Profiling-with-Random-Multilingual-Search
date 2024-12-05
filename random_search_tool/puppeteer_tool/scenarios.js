// Imports
const navigation = require('./navigation.js');
const config = require('./config.js');
const puppeteer = require('puppeteer-extra');
const tools = require('./tools.js');
const elements = require('./elements.js');

// Is used for keeping track of current posisiton in wordlist,
// from which we are searchin sequentially.
// Since the test is long and can be interrupted, we need to keep track of it,
// so we can continue from the same position.
global.wordlist_index = 0;
global.language_index = 0;
global.tool_index = 0;

async function queries(){

  // Browser settings
  const StealthPlugin = require('puppeteer-extra-plugin-stealth');
  puppeteer.use(StealthPlugin());
  let browser;

  (async () => {

    try{
      browser = await puppeteer.launch(config.browser_settings);
      const page = await browser.newPage();

      // Seznam login
      await navigation.seznam_login(page);

      const file_path = config.wordlist_path;
      const words = await tools.load_file_contents(file_path);

      for (let i = global.wordlist_index; i < words.length; i++){
        // Create empty json file only if it does not exist
        tools.create_empty_json(config.output_file);

        // Enter a search query and search
        await navigation.do_search(page, words[i], i);

        // Create results object
        let results_object = await navigation.get_results_object(page, words[i], "queries");

        // Update results file
        tools.read_and_update_json(config.output_file, results_object, i);

        console.log(results_object);

        await tools.sleep(config.sleep_time);
      }
      await browser.close();

    } catch (error){
      await browser.close()
      console.error(`Timestamp: ${new Date().toISOString()}; Error in test queries(): ${error}`);
      if (error.code === 'ENOENT'){
        process.exit(1);
      }
      if(config.debug){
        console.log('Restarting queries()');
      }
      queries();
    }
  })();
}

async function the_tool(){
  // This function works as the main tool
  // designed to prevent seznam.cz profiling by random search

  const StealthPlugin = require('puppeteer-extra-plugin-stealth');
  puppeteer.use(StealthPlugin());
  let browser;

  (async () => {

    try{
      browser = await puppeteer.launch(config.browser_settings);
      const page = await browser.newPage();

      await navigation.seznam_login(page);

      // Open desired wordlists based on given languages
      let wordlists = []
      for (let i = 0; i < config.languages.length; i++){
        let file_path = `../wordlists/${config.languages[i]}.txt`;
        let words = await tools.load_file_contents(file_path);
        wordlists.push(words);
      }

      while(global.tool_index < config.number_of_tool_querries){
        // Randomly select word from the worlists
        // The lanuaage is selected based on the global index in Round Robin fashion
        let query = "";

        let query_length = config.number_of_words;
        // If the number of words is set to 0, we select random number of words from 1 to 3
        if (config.number_of_words === 0){
          query_length = Math.floor(Math.random() * config.max_length_of_random_query) + 1;
          if (config.debug){
            console.log(`Query length: ${query_length}`);
          }
        }

        for (let i = 0; i < query_length; i++){
          let word = wordlists[global.language_index][Math.floor(Math.random() * wordlists[global.language_index].length)];
          if(i === query_length-1){
            query += word;
            break;
          }
          else{
            query += word + " ";
          }
        }

        // Create empty json file only if it does not exist
        tools.create_empty_json(config.output_file);

        // Enter a search query and search
        await navigation.do_search(page, query);

        // Create results object
        let results_object = await navigation.get_results_object(page, query, config.languages[global.language_index]);

        // Update results file (not necessary here, but we keep it for the record)
        tools.read_and_update_json(config.output_file, results_object, 1);

        console.log(results_object);

        global.tool_index += 1;

        await tools.sleep(config.tool_sleep_time);

        // Update language index
        global.language_index += 1;

        // If we are at the end of the languages, reset the index
        if (global.language_index === config.languages.length){
          global.language_index = 0;
        }
      }
      await browser.close();

    } catch (error){
      await browser.close();
      console.error(`Timestamp: ${new Date().toISOString()}; Error in the_tool(): ${error}`);
      if (error.code === 'ENOENT'){
        process.exit(1);
      }
      if(config.debug){
        console.log('Restarting the_tool()');
      }
      the_tool();
    }
  })();
}

module.exports = {
  queries: queries,
  the_tool: the_tool
}