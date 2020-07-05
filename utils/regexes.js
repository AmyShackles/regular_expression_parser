const NAME = "(?<name>.+?)"
const NON_CAPTURE = "\\(\\?:.+?\\)";
const NAMED_CAPTURE = "\\(\\?<" + NAME + ">.+?\\)";
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
const HEX = "(?:\\\\x)(?<hex>[\\dA-Fa-f]{2})";
const DOTALL = "(?<!\\\\)(?<dotAll>\\.)";
const DOT = "(?<!\\\\)(?<dot>\\.)";
const NEGATED_CHARACTER_SET = "\\[\\^(?<negated_character_set>.+?)\\]";
const CHARACTER_SET = "\\[(?<character_set>[^^].*?)\\]";
const NON_GREEDY_RANGE_QUANTIFIER = "(?<!\\\\u)(?<non_greedy_range_quantifier>\\{\\d*,?\\d*\\}\\?)";
const GREEDY_RANGE_QUANTIFIER = "(?<!\\\\u)(?<greedy_range_quantifier>\\{\\d*,?\\d*\\}(?!\\?))";
const UNICODE_NAME = "(?<unicode_name>\\w*)";
const UNICODE_VALUE = "(?:\\=?)(?<unicode_value>\\w*?)?";
const NEGATED_UNICODE_NAME = "(?<negated_unicode_name>\\w*)";
const NEGATED_UNICODE_VALUE = "(?:\\=?)(?<negated_unicode_value>\\w*?)?";
const UNICODE_PROPERTY_ESCAPE = "(?<unicode_property_escape>\\\\p\\{" + UNICODE_NAME + UNICODE_VALUE + "\\})";
const NEGATED_UNICODE_PROPERTY_ESCAPE = "(?<negated_unicode_property_escape>\\\\P\\{" + NEGATED_UNICODE_NAME + NEGATED_UNICODE_VALUE + "\\})";
const POSITIVE_LOOKAHEAD = "(?:\\(\\?=)(?<positive_lookahead>.*?)(?=\\))";
const NEGATIVE_LOOKAHEAD = "(?:\\(\\?\\!)(?<negative_lookahead>.*?)(?=\\))";
const POSITIVE_LOOKBEHIND = "(?:\\(\\?\\<\\=)(?<positive_lookbehind>.*?)(?=\\))";
const NEGATIVE_LOOKBEHIND = "(?:\\(\\?\\<\\!)(?<negative_lookbehind>.*?)(?=\\))";
const START_OF_LINE = "(?<start_of_line>^\\^)";
const START_OF_STRING = "(?<start_of_string>^\\^)";
const END_OF_LINE = "(?<end_of_line>\\$$)";
const END_OF_STRING = "(?<end_of_string>\\$$)";
const WORD_BOUNDARY = "(?<word_boundary>(?<!\\[)\\\\b(?!\\]))";
const NON_WORD_BOUNDARY = "(?<non_word_boundary>\\\\B)";
const GREEDY_OPTIONAL = "(?<!\\{\\d*,?\\d*\\}|\\+|\\?|\\*|[^\\\\]\\()(?<greedy_optional>\\?)(?!\\?)";
const NON_GREEDY_OPTIONAL = "(?<non_greedy_optional>\\?\\?)";
const GREEDY_KLEENE_STAR = "(?<greedy_kleene_star>\\*)(?!\\?)";
const NON_GREEDY_KLEENE_STAR = "(?<non_greedy_kleene_star>\\*\\?)";
const GREEDY_KLEENE_PLUS = "(?<greedy_kleene_plus>\\+)(?!\\?)";
const NON_GREEDY_KLEENE_PLUS = "(?<non_greedy_kleene_plus>\\+\\?)";
const ALTERNATION = "(?<!\\\\)(?<alternation>\\|)";
const NAMED_BACKREFERENCE = "(?<!\\\\)(?<named_backreference>\\\\k<" + NAME + ">)";
const NUMERICAL_BACKREFERENCE = "(?<!\\\\)(?<numerical_backreference>\\\\\\d+)"
const RANGE = "(?<=\\[.*?)(?<range>.\\-.)(?=.*?\\])"

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
    NON_GREEDY_RANGE_QUANTIFIER,
    GREEDY_RANGE_QUANTIFIER,
    UNICODE_NAME,
    UNICODE_VALUE,
    NEGATED_UNICODE_NAME,
    NEGATED_UNICODE_VALUE,
    UNICODE_PROPERTY_ESCAPE,
    NEGATED_UNICODE_PROPERTY_ESCAPE,
    NON_WORD_BOUNDARY,
    POSITIVE_LOOKAHEAD,
    NEGATIVE_LOOKAHEAD,
    POSITIVE_LOOKBEHIND,
    NEGATIVE_LOOKBEHIND,
    GREEDY_OPTIONAL,
    NON_GREEDY_OPTIONAL,
    GREEDY_KLEENE_STAR,
    NON_GREEDY_KLEENE_STAR,
    GREEDY_KLEENE_PLUS,
    NON_GREEDY_KLEENE_PLUS,
    START_OF_LINE,
    START_OF_STRING,
    END_OF_LINE,
    END_OF_STRING,
    WORD_BOUNDARY,
    ALTERNATION,
    NAMED_BACKREFERENCE,
    NUMERICAL_BACKREFERENCE,
    RANGE
}