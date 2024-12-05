const config = require('./config')
const elements = require('./elements')
const tools = require('./tools')

/*
 * This file contains functions for navigation in the browser.
 * These functions have parameter "page" in common, which
 * represents the page in the browser.
 * Since these functions manipulate with the page displayed,
 * they are gathered in this module.
 */

async function click_by_xpath(page, xpath){
  await page.click(`xpath=${xpath}`)
}

async function click_by_css_selector(page, css_selector){
  await page.click(`${css_selector}`)
}

async function fill_by_selector_enter(page, identifier, text, enter=true){
  // Also works for both ID and CSS Selector

  // Clear the input and fill it with text

  // await page.$eval(identifier, el => el.value = '');
  // ^ does not work with Seznam, for some reason,
  // but this soulution represents more user like behavior
  await page.focus(identifier);
  await page.keyboard.down('Control'); // 'Meta' on MacOS
  await page.keyboard.press('A');
  await page.keyboard.up('Control'); // 'Meta' on MacOS
  await page.keyboard.press('Backspace');
  await page.type(identifier, text)

  if(enter){
    await page.keyboard.press('Enter').then(() => page.waitForNavigation({waitUntil: 'load'}));
  }

  // Could be replaced with waitForSelector
  await tools.random_wait()
}

async function seznam_login(page){
  await page.goto(elements.seznam_webpage);

  await fill_by_selector_enter(page, elements.login_email_identifier_css_selector, config.email, enter=false);

  await click_by_css_selector(page, elements.login_continue_button_css_selector);

  await fill_by_selector_enter(page, elements.login_password_identifier_css_selector, config.password, enter=false);

  await click_by_css_selector(page, elements.login_submit_button_css_selector)

  // Wait until the search bar is visible
  await page.waitForSelector(elements.initial_search_query_identifier_css_selector);
}

async function do_search(page, query, index){
  // This function is here just to make code more readable
  if(index === 0){
    await fill_by_selector_enter(page, elements.initial_search_query_identifier_css_selector, query)
  }
  else{
    await fill_by_selector_enter(page, elements.search_query_consequential_identifier_css_selector, query)
  }
}

async function check_if_search_result_is_real_result(result){
  // Some results, are "pointers" to Images, Maps, etc. - we mark those as false
  // False: Mapy, Služby, Zboží, Obrázky, Sdovolená, Videa
  const classes = await result.evaluate(element => {
      let allClasses = [];
      // Add root classes
      allClasses.push(...element.classList);
      // Gather all classes from children
      element.querySelectorAll('*').forEach(child => {
          allClasses.push(...child.classList);
      });
      // Remove duplicity
      allClasses = [...new Set(allClasses)];

      return allClasses;
  });

  return classes.includes(elements.real_search_results_css_classs);
}

async function get_results_object(page, query, language){
  // Main object
  const results_object = {
    query : query,
    language: language,
    results: [],
    user: config.email,
    timestamp: new Date().toISOString()
  }

  // Try to get 10 results
  let left_side = await page.$$(`[class="${elements.layout_left_css_class}"]`)
  const results = await left_side[0].$$(`[class="${elements.search_results_css_classs}"]`);

  if (config.debug){
    console.log(`Query: \"${query}\"; Results count: ${results.length}`);
  }

  let results_count = 0;
  let i = 0;
  // Go through all the results, Seznam has 10 results on the page, and sometimes pointers to other services
  while (results_count < results.length){
    const result = results[i];
    // Not all results have title and href
    // We skip those
    try{
      const title = await result.$eval(elements.search_result_title_selector, node => node.textContent);
      // If the engine thinks that we eanted to search something else, he asks,
      // but it has the same class as search result, so we ignore it.
      if (title.includes(elements.wrong_search_string) || title.includes(elements.we_tried_to_search)){
        i++;
        continue;
      }
      // href is in the first <a>, therefore simple $eval is working
      const href = await result.$eval('a', a => a.getAttribute('href'));

      const real_result = await check_if_search_result_is_real_result(result);

      // One result
      const result_object = {
        title: title,
        href: href,
        real_result: real_result
      }
      // Description is very hard to get, decided to skip
      results_object.results.push(result_object);
      results_count++;
    }
    catch (error){
      console.error(`Timestamp: ${new Date().toISOString()}; Query: \"${query}\"; ${error}`);
      // It is possible that we are at the end of the results
      if (i == results.length - 1){
        break;
      }
      if (error instanceof TypeError && error.message.includes('Cannot read properties of undefined')){
        break;
      }
    }
    i++;
  }
  return results_object;
}

module.exports = {
    click_by_xpath: click_by_xpath,
    click_by_css_selector: click_by_css_selector,
    fill_by_selector_enter: fill_by_selector_enter,
    seznam_login: seznam_login,
    do_search: do_search,
    get_results_object: get_results_object
};