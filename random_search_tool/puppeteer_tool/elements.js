const seznam_webpage = 'https://login.szn.cz/?service=homepage&return_url=https%3A%2F%2Fwww.seznam.cz%2F';

const login_continue_button_css_selector = 'form.login:nth-child(3) > button:nth-child(4)';

const login_submit_button_css_selector = 'form.login:nth-child(3) > button:nth-child(4)';

const login_email_identifier_css_selector = '#login-username';
const login_password_identifier_css_selector = '#login-password';

// The one on the seznam.cz page
const initial_search_query_identifier_css_selector = '.search-form__input';

// The one after some search have been conducted (above results)
const search_query_consequential_identifier_css_selector = '.szn-input-with-suggest-list';

// Results
const search_results_css_classs = 'f2c528';
const real_search_results_css_classs = 'cfb4f6';
const layout_left_css_class = 'Layout--left';
const search_result_title_selector = 'h3';
const wrong_search_string = 'Nechtěli jste hledat';
const we_tried_to_search = 'Hledali jsme';

module.exports = {
    seznam_webpage: seznam_webpage,
    login_continue_button_css_selector: login_continue_button_css_selector,
    login_submit_button_css_selector: login_submit_button_css_selector,
    login_email_identifier_css_selector: login_email_identifier_css_selector,
    login_password_identifier_css_selector: login_password_identifier_css_selector,
    initial_search_query_identifier_css_selector: initial_search_query_identifier_css_selector,
    search_query_consequential_identifier_css_selector: search_query_consequential_identifier_css_selector,
    search_results_css_classs: search_results_css_classs,
    real_search_results_css_classs: real_search_results_css_classs,
    layout_left_css_class: layout_left_css_class,
    search_result_title_selector: search_result_title_selector,
    wrong_search_string: wrong_search_string,
    we_tried_to_search: we_tried_to_search
};
