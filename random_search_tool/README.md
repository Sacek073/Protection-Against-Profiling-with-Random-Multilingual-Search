# DP_klusacek

## Installation
1) To install and run the tool, you need to install following requirements:
- node.js (v20.8.0)

- Reccomended way to install node.js is via nvm (node version manager):

```curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash```

- After running the command above you need to restart the terminal, so you can run the `nvm` command.

- Then install the node.js version 20.8.0:

```nvm install v20.8.0```

2) After node.js is installed, you need to install the required packages:
- Navigate to the folder `puppeteer_tool` and run the following command:

```npm install```

3) After the installation is finished, fill your credentials into the config.js file in the `puppeteer_tool` folder.
- Set your email into the variable `const email` without the "@seznam.cz" part.
- Set your password into the variable `const password` in plaintext.

4) you can run the tool by running the following command:

```node main.js --help```

## Usage
The tool supports two modes of operation:
- **Queries mode** (`-m queries`)
    - This mode is used to perform predefined queries. You have to specify the `.txt` file with the queries with the `-p path_to_file`. The queries are separated by a newline character.
- **Tool mode** (`-m tool`)
    - This mode performs the random search queries, which are generated from the wordlists. You can specify the languages by `-l`, the length of the query by `-n` (when left out the search query length is random between 1 and 3).
    - By defualt settings (can be changed in the config.js), the tool mode performs 90 queries with sleep time of 320 seconds between the searches and all languages are used (Czech, English, French, Italian, Slovak, Spanish, Turkish, Ukrainian).

### The usage of config.js
- During the testing some parameters were found by experimenting to perform best results. Therefore these settings are stored in config.js file, as it is not advised to change them manually. Other settings, which cannot interfere with the performance of the searches can be set via the command line arguments.


### Wordlists
- For the use of the random searching tool, the wordlists, which contain words from forign languages are needed. All of those are store in the `wordlists` folder. The wordlists are stored in the `.txt` files, where each word is separated by a newline character.

### Output
- The application outputs the results into the `results` folder inside the `puppeteer_tool` folder. The results are stored in the `.json` files. The name of the file is specified by the parameter enrterd by `-o output_name.json`, when left out, the default name is `results.json`.
- The debug information can be turned on in the config.js file by setting the `const debug` variable to `true` and is printed to the stdout.
- The tool also log errors to the stderr. The suggested usage is to redirect the stderr to the file by using the `2>` redirect, see example:

```node main.js -m queries -p path_to_file 2> error.log```

## Example usage:
- To run the tool in the queries mode with the queries from the file `../folder/queries.txt` and store the results into the file `output.json`:
```node main.js -m queries -p ../folder/queries.txt -o output.json```
- To run the tool in the tool mode with the queries of fix length 2 in the languages english, french and czech and store the results into the file `output.json`:
```node main.js -m tool -l english french czech -n 2 -o output.json```

## Sources
Wordlists are used from:
- https://wiki.korpus.cz/doku.php/seznamy:abc_seznamy
- https://github.com/dwyl/english-words
- https://github.com/Taknok/French-Wordlist/blob/master/francais.txt
- https://github.com/kkrypt0nn/wordlists/blob/main/wordlists/languages/italian.txt
- https://p.brm.sk/sk_wordlist/
- https://github.com/ManiacDC/TypingAid/blob/master/Wordlists/Wordlist\%20Spanish.txt
- https://github.com/mertemin/turkish-word-list/blob/master/words.txt
- https://github.com/titoBouzout/Dictionaries/blob/master/Ukrainian_uk_UA.dic
