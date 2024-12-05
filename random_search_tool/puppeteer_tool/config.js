// Wait time in ms for tools.random_wait()
// To remove random wait, set both values to 0
const min_wait_time = 2000;
const max_wait_time = 3000;

// Sleep time between searches in seconds
const sleep_time = 960; // 16 minutes -> 30 querries in 8 hours

const tool_sleep_time = 320; // One third of query sleep time -> 1:3 (one quarter represnets real querries)
const number_of_tool_querries = 90;

// User
const email = 'username' // without @seznam.cz
const password = 'password'

const debug = true;

// Browser settings
const browser_settings = {
  headless: true,
  // defaultViewport: { width: 1920, height: 1200 },
  slowMo: 100,
  protocolTimeout: 1200000
}

const max_length_of_random_query = 3;

// Can be set via command line arguments
let wordlist_path = '../wordlists/queries.txt';
let number_of_words = 0;
let output_file = 'results.json';
let languages = ['czech', 'english', 'french', 'italian', 'slovak', 'spanish', 'turkish', 'ukrainian'];

module.exports = {
  min_wait_time: min_wait_time,
  max_wait_time: max_wait_time,
  sleep_time: sleep_time,
  tool_sleep_time: tool_sleep_time,
  number_of_tool_querries: number_of_tool_querries,
  email: email,
  password: password,
  debug: debug,
  browser_settings: browser_settings,
  max_length_of_random_query: max_length_of_random_query,
  wordlist_path: wordlist_path,
  number_of_words: number_of_words,
  output_file: output_file,
  languages: languages
};
