# Protection Against Profiling with Random Multilingual Search

## random_search_tool
This folder contains two subfolders needed in order to run the
random searching tool. One of them being the implementation itself (puppeteer_tool)
and the other contains the wordlists, which are used to create the random queries
(wordlists).

## queries
This folder contains the queries used as the profiling queries (queries which
represent interests). The subfolder input holds three files, representing the queries
sorted into three categories. The final query sets for each day are stored in the
subfolder by_days.

## results
The subfolder main_experiment holds results from each day for the main
experiment, sorted into 10 folders by the experiment day. In each of the folder,
there is .json file containing the search results and PDF file with exported interests
named accordingly to the VM. Also all the random searches are included in the
folder tool_results. The results from the additional experiments are stored in the
additional_experiments folder with the same strucutre as for the main experiment
results.
