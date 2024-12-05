const config = require('./config');
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

async function load_file_contents(filePath) {
  try {
    const data = await readFileAsync(filePath, 'utf8');
    return data.split('\n');
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
}

async function random_wait(log=true){
  // Waits for random time from interval <min_wait_time, max_wait_time> (from config.js)
  let wait_time = Math.floor(Math.random() * (config.max_wait_time - config.min_wait_time + 1)) + config.min_wait_time;
  if(config.debug && log){
    console.log(`Waiting for ${wait_time} ms`)
  }
  await new Promise(resolve => setTimeout(resolve, wait_time));
}

async function sleep(seconds){
  if(config.debug){
    console.log(`Sleeping for ${seconds} s`)
  }
  await new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function create_empty_json(filename){
  const json_string = JSON.stringify([], null, 2);
  if(!fs.existsSync('./results')){
    fs.mkdirSync('./results');
  }
  if (!fs.existsSync('./results/' + filename)){
    fs.writeFileSync(`./results/${filename}`, json_string);
  }
}

function read_and_update_json(filename, object, index){
  // The index is used only for queries mode
  // where it is needed to keep track of position in wordlist
  // for other modes, it is not used and simple 1 is passed.
  const json_file = fs.readFileSync(`./results/${filename}`);
  let json_data = JSON.parse(json_file);

  json_data.push(object);
  const json_string = JSON.stringify(json_data, null, 2);

  fs.writeFileSync(`./results/${filename}`, json_string);
  global.wordlist_index = index;
}

module.exports = {
  load_file_contents: load_file_contents,
  random_wait: random_wait,
  sleep: sleep,
  create_empty_json: create_empty_json,
  read_and_update_json: read_and_update_json
};
