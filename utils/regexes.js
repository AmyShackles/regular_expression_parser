const NON_CAPTURE = "\\(\\?:.+?\\)";
const NAMED_CAPTURE = "\\(\\?<(?<name>.+?)>.+?\\)";
const CAPTURE = "(?<!\\?:)\\([^\\?].*?\\)";
const UNICODE_REGEX_IN_UNICODE_MODE = /(?:\\u{)(?<unicode>[\da-fA-F]{4,5})(?:\})/g;
const UNICODE_REGEX_NOT_IN_UNICODE_MODE = /(?:\\u)(?<unicode>[\da-fA-F]{4})/g;
const DIGIT = "(?<digit>\\\\d)";
const NON_DIGIT = "(?<non_digit>\\\\D)";
const ALPHANUMERIC = "(?<alphanumeric>\\\\w)";
const NON_ALPHANUMERIC = "(?<non_alphanumeric>\\\\W)";
const WHITESPACE = "(?<whitespace>\\\\s)";
const NON_WHITESPACE = "(?<non_whitespace>\\\\S)";
const HORIZONTAL_TAB = "(?<horizontal_tab>\\\\t)";
const CARRIAGE_RETURN = "(?<carriage_return>\\\\r)";
const LINEFEED = "(?<linefeed>\\\\n)";
const VERTICAL_TAB = "(?<vertical_tab>\\\\v)";
const FORM_FEED = "(?<form_feed>\\\\f)";
const BACKSPACE = "(?<=\\[)(?<backspace>\\\\b.*?)(?:\\])";
const NUL = "(?<NUL>\\\\0)";
const CONTROL_CHARACTER = "(?<control_character>\\\\c[A-Z])";
const HEX = "(?:\\\\x)(?<hex>[\\\\dA-Fa-f]{2})";
const DOTALL = "(?<!\\\\)(?<dotAll>\\.)";
const DOT = "(?<!\\\\)(?<dot>\\.)";
const NEGATED_CHARACTER_SET = "(?:\\[\\^)(?<negated_character_set>.*?)(?:\\])";
const CHARACTER_SET = "(?:\\[)(?<character_set>.*?)(?:\\])";
const NON_GREEDY_QUANTIFIER = "(?<!\\\\u)(?:\\{)(?<nongreedy_quantifier>\\d*,?\\d*)(?:\\}\\?)";
const GREEDY_QUANTIFIER = "(?<!\\\\u)(?:\\{)(?<greedy_quantifier>\\d*,?\\d*)(?:\\}[^\\?])";
const UNICODE_NAME = "(?<unicode_name>.*?)";
const UNICODE_VALUE = "(?:\\=)(?<unicode_value>.*?)";
const NEGATED_UNICODE_NAME = "(?<negated_unicode_name>.*?)";
const NEGATED_UNICODE_VALUE = "(?:\\=)(?<negated_unicode_value>.*?)";
const UNICODE_PROPERTY_ESCAPE = "(?:\\\\\\p\\{)(?<unicode_property_escape>(" + UNICODE_NAME + UNICODE_VALUE + "))";
const NEGATED_UNICODE_PROPERTY_ESCAPE = "(?:\\\\\\P\\{)(?<negated_unicode_property_escape>(" + NEGATED_UNICODE_NAME + NEGATED_UNICODE_VALUE + "))";

module.exports = {
    NON_CAPTURE,
    NAMED_CAPTURE,
    CAPTURE,
    UNICODE_REGEX_IN_UNICODE_MODE,
    UNICODE_REGEX_NOT_IN_UNICODE_MODE,
    DIGIT,
    NON_DIGIT,
    ALPHANUMERIC,
    NON_ALPHANUMERIC,
    WHITESPACE,
    NON_WHITESPACE,
    HORIZONTAL_TAB,
    CARRIAGE_RETURN,
    LINEFEED,
    VERTICAL_TAB,
    FORM_FEED,
    BACKSPACE,
    NUL,
    CONTROL_CHARACTER,
    HEX,
    DOTALL,
    DOT,
    NEGATED_CHARACTER_SET,
    CHARACTER_SET,
    NON_GREEDY_QUANTIFIER,
    GREEDY_QUANTIFIER,
    UNICODE_NAME,
    UNICODE_VALUE,
    NEGATED_UNICODE_NAME,
    NEGATED_UNICODE_VALUE,
    UNICODE_PROPERTY_ESCAPE,
    NEGATED_UNICODE_PROPERTY_ESCAPE
}