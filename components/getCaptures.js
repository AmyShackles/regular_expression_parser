const { NON_CAPTURE, NAMED_CAPTURE, CAPTURE,     UNICODE_REGEX_IN_UNICODE_MODE, 
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
    UNICODE_PROPERTY_ESCAPE,
    NEGATED_UNICODE_PROPERTY_ESCAPE,
    POSITIVE_LOOKAHEAD,
    NEGATIVE_LOOKAHEAD,
    POSITIVE_LOOKBEHIND,
    NEGATIVE_LOOKBEHIND,
    WORD_BOUNDARY,
    NON_WORD_BOUNDARY,
    NAMED_BACKREFERENCE,
    NUMERICAL_BACKREFERENCE,
    LITERAL,
    NON_GREEDY_KLEENE_PLUS, NON_GREEDY_KLEENE_STAR, NON_GREEDY_OPTIONAL, NON_GREEDY_RANGE_QUANTIFIER, GREEDY_KLEENE_PLUS, GREEDY_KLEENE_STAR, GREEDY_OPTIONAL, GREEDY_RANGE_QUANTIFIER, ALTERNATION} = require('../utils/regexes');
const { getParenStack } = require("../utils/getParenStack.js");

module.exports = {
    getCaptures: (string) => {
        let captures = {};
        let capturesForBackreference = {}
        getParenStack(string).forEach(({group, startingIndex, lastIndex}) => {
            const named_capture = group.match(NAMED_CAPTURE);
            const non_capture = group.match(NON_CAPTURE);
            const capture = group.match(CAPTURE);
            const unicode_regex_in_unicode_mode = group.match(UNICODE_REGEX_IN_UNICODE_MODE);
            const digit = group.match(DIGIT);
            const non_digit = group.match(NON_DIGIT);
            const alpha = group.match(ALPHANUMERIC);
            const non_alpha = group.match(NON_ALPHANUMERIC);
            const whitespace = group.match(WHITESPACE);
            const non_whitespace = group.match(NON_WHITESPACE);
            const horizontal_tab= group.match(HORIZONTAL_TAB);
            const carriage_return = group.match(CARRIAGE_RETURN);
            const linefeed = group.match(LINEFEED);
            const vertical_tab = group.match(VERTICAL_TAB);
            const form_feed = group.match(FORM_FEED);
            const backspace = group.match(BACKSPACE);
            const nul = group.match(NUL);
            const control_character = group.match(CONTROL_CHARACTER);
            const hex = group.match(HEX);
            const dotall = group.match(DOTALL);
            const dot = group.match(DOT);
            const negated_character_set = group.match(NEGATED_CHARACTER_SET);
            const character_set = group.match(CHARACTER_SET);
            const unicode_property_escape = group.match(UNICODE_PROPERTY_ESCAPE);
            const negated_unicode_property_escape = group.match(NEGATED_UNICODE_PROPERTY_ESCAPE);
            const positive_lookahead = group.match(POSITIVE_LOOKAHEAD);
            const positive_lookbehind = group.match(POSITIVE_LOOKBEHIND);
            const negative_lookahead = group.match(NEGATIVE_LOOKAHEAD);
            const negative_lookbehind = group.match(NEGATIVE_LOOKBEHIND);
            const word_boundary = group.match(WORD_BOUNDARY);
            const non_word_boundary = group.match(NON_WORD_BOUNDARY);
            const named_backreference = group.match(NAMED_BACKREFERENCE);
            const numerical_backreference = group.match(NUMERICAL_BACKREFERENCE);
            const literal = group.match(LITERAL);
            const non_greedy_kleene_plus = group.match(NON_GREEDY_KLEENE_PLUS);
            const greedy_kleene_plus = group.match(GREEDY_KLEENE_PLUS);
            const non_greedy_kleene_star = group.match(NON_GREEDY_KLEENE_STAR);
            const greedy_kleene_star = group.match(GREEDY_KLEENE_STAR);
            const non_greedy_optional = group.match(NON_GREEDY_OPTIONAL);
            const non_greedy_range_quantifier = group.match(NON_GREEDY_RANGE_QUANTIFIER);
            const greedy_optional = group.match(GREEDY_OPTIONAL);
            const greedy_range_quantifier = group.match(GREEDY_RANGE_QUANTIFIER);
            const alternation = group.match(ALTERNATION);
            console.log("capture", capture)

            let hexadecimal = "";
            if (unicode_regex_in_unicode_mode && unicode_regex_in_unicode_mode['groups']) {
                hexadecimal = unicode_regex_in_unicode_mode['groups']['hexadecimal'];
                const codepoint = parseInt(hex, 16);
                console.log("CODEPOINT", codepoint, '!isNaN(codepoint)', !isNaN(codepoint))
                if (!isNaN(codepoint)) {
                    hexadecimal = String.fromCodePoint(codepoint);
                }
            }

    
            if (named_capture || non_capture || capture) {
                if (named_capture || capture) {
                    capturesForBackreference[startingIndex] = {
                        ...(named_capture ? { type: 'named_capture_group', group: named_capture['groups']['named_capture_group'], match: named_capture['groups']['named_capture'], startingIndex, lastIndex, name: named_capture['groups']['name'] } : {}),
                        ...(capture ? { type: 'capture_group', group: capture['groups']['capture_group'], match: capture['groups']['capture'], startingIndex, lastIndex } : {}),
                        ...(digit ? { type: 'digit', group: digit['groups']['digit'], match: digit['groups']['capture'], startingIndex, lastIndex } : {}),
                        ...(non_digit ? { type: 'non_digit', group: non_digit['groups']['non_digit'], match: non_digit['groups']['non_digit'], startingIndex, lastIndex } : {}),
                        ...(alpha ? { type: 'alphanumeric', group: alpha['groups']['alphanumeric'], match: alpha['groups']['alphanumeric'], startingIndex, lastIndex } : {}),
                        ...(non_alpha ? { type: 'non_alphanumeric', group: non_alpha['groups']['non_alphanumeric'], match: non_alpha['groups']['non_alphanumeric'], startingIndex, lastIndex } : {}),
                        ...(whitespace ? { type: 'whitespace', group: whitespace['groups']['whitespace'], match: whitespace['groups']['whitespace'], startingIndex, lastIndex } : {}),
                        ...(non_whitespace ? { type: 'non_whitespace', group: non_whitespace['groups']['non_whitespace'], match: non_whitespace['groups']['non_whitespace'], startingIndex, lastIndex } : {}),
                        ...(horizontal_tab ? { type: 'horizontal_tab', group: horizontal_tab['groups']['horizontal_tab'], match: horizontal_tab['groups']['horizontal_tab'], startingIndex, lastIndex } : {}),
                        ...(carriage_return ? { type: 'carriage_return', group: carriage_return['groups']['carriage_return'], match: carriage_return['groups']['carriage_return'], startingIndex, lastIndex } : {}),
                        ...(linefeed ? { type: 'linefeed', group: linefeed['groups']['linefeed'], match: linefeed['groups']['linefeed'], startingIndex, lastIndex } : {}),
                        ...(vertical_tab ? { type: 'vertical_tab', group: vertical_tab['groups']['vertical_tab'], match: vertical_tab['groups']['vertical_tab'], startingIndex, lastIndex } : {}),
                        ...(form_feed ? { type: 'form_feed', group: form_feed['groups']['form_feed'], match: form_feed['groups']['form_feed'], startingIndex, lastIndex } : {}),
                        ...(backspace ? { type: 'backspace', group: backspace['groups']['backspace'], match: backspace['groups']['backspace'], startingIndex, lastIndex } : {}),
                        ...(nul ? { type: 'NUL', group: nul['groups']['NUL'], match: nul['groups']['NUL'], startingIndex, lastIndex } : {}),
                        ...(control_character ? { type: 'control_character', group: control_character['groups']['control_character'], match: control_character['groups']['control_character'], startingIndex, lastIndex } : {}),
                        ...(hex ? { type: 'hex', group: hex['groups']['hex'], match: hex['groups']['hex'], startingIndex, lastIndex } : {}),
                        ...(dotall ? { type: 'dotAll', group: dotall['groups']['dotAll'], match: dotall['groups']['dotAll'], startingIndex, lastIndex } : {}),
                        ...(dot ? { type: 'dot', group: dot['groups']['dot'], match: dot['groups']['dot'], startingIndex, lastIndex } : {}),
                        ...(negated_character_set ? { type: 'negated_character_set', group: negated_character_set['groups']['negated_character_set'], match: negated_character_set['groups']['negated_character_set'], startingIndex, lastIndex } : {}),
                        ...(character_set ? { type: 'character_set', group: character_set['groups']['set'], match: character_set['groups']['set'], startingIndex, lastIndex } : {}),
                        ...(unicode_property_escape ? { type: 'unicode_property_escape', group: unicode_property_escape['groups']['unicode_property_escape'], match: unicode_property_escape['groups']['unicode_property_escape'], startingIndex, lastIndex} : {}),
                        ...(negated_unicode_property_escape ? { type: 'negated_unicode_property_escape', group: negated_unicode_property_escape['groups']['negated_unicode_property_escape'], match: negated_unicode_property_escape['groups']['negated_unicode_property_escape'], startingIndex, lastIndex } : {}),
                        ...(positive_lookahead ? { type: 'positive_lookahead', group: positive_lookahead['groups']['positive_lookahead'], match: positive_lookahead['groups']['positive_lookahead'], startingIndex, lastIndex } : {}),
                        ...(positive_lookbehind ? { type: 'positive_lookbehind', group: positive_lookbehind['groups']['positive_lookbehind'], match: positive_lookbehind['groups']['positive_lookbehind'], startingIndex, lastIndex } : {}),
                        ...(negative_lookahead ? { type: 'negative_lookahead', group: negative_lookahead['groups']['negative_lookahead'], match: negative_lookahead['groups']['negative_lookahead'], startingIndex, lastIndex } : {}),
                        ...(negative_lookbehind ? { type: 'negative_lookbehind', group: negative_lookbehind['groups']['negative_lookbehind'], match: negative_lookbehind['groups']['negative_lookbehind'], startingIndex, lastIndex } : {}),
                        ...(word_boundary ? { type: 'word_boundary', group: word_boundary['groups']['word_boundary'], match: word_boundary['groups']['word_boundary'], startingIndex, lastIndex} : {}),
                        ...(non_word_boundary ? { type: 'non_word_boundary', group: non_word_boundary['groups']['non_word_boundary'], match: non_word_boundary['groups']['non_word_boundary'], startingIndex, lastIndex }: {}),
                        ...(named_backreference ? { type: 'named_backreference', group: named_backreference['groups']['named_backreferences'], match: named_backreference['groups']['named_backreferences'], startingIndex, lastIndex } : {}),
                        ...(numerical_backreference ? { type: 'numerical_backreference', group: numerical_backreference['groups']['numerical_backreference'], match: numerical_backreference['groups']['numerical_backreference'], startingIndex, lastIndex } : {}),
                        ...(literal ? { type: 'literal', group: literal['groups']['literal'], match: literal['groups']['literal'], startingIndex, lastIndex} : {}),
                        ...(non_greedy_kleene_plus ? { type: 'non_greedy_kleene_plus', group: non_greedy_kleene_plus['groups']['non_greedy_kleene_plus'], match: non_greedy_kleene_plus['groups']['non_greedy_kleene_plus'], startingIndex, lastIndex } : {}),
                        ...(non_greedy_kleene_star ? { type: 'non_greedy_kleene_star', group: non_greedy_kleene_star['groups']['non_greedy_kleene_star'], match: non_greedy_kleene_star['groups']['non_greedy_kleene_star'], startingIndex, lastIndex } : {}),
                        ...(non_greedy_optional ? { type: 'non_greedy_optional', group: non_greedy_optional['groups']['non_greedy_optional'], match: non_greedy_optional['groups']['non_greedy_optional'], startingIndex, lastIndex } : {}),
                        ...(greedy_kleene_plus ? { type: 'greedy_kleene_plus', group: greedy_kleene_plus['groups']['greedy_kleene_plus'], match: greedy_kleene_plus['groups']['greedy_kleene_plus'], startingIndex, lastIndex } : {}),
                        ...(greedy_kleene_star ? { type: 'greedy_kleene_star', group: greedy_kleene_star['groups']['greedy_kleene_star'], match: greedy_kleene_star['groups']['greedy_kleene_star'], startingIndex, lastIndex } : {}),
                        ...(greedy_optional ? { type: 'greedy_optional', group: greedy_optional['groups']['greedy_optional'], match: greedy_optional['groups']['greedy_optional'], startingIndex, lastIndex } : {}),
                        ...(greedy_range_quantifier ? { type: 'greedy_range_quantifier', group: greedy_range_quantifier['groups']['greedy_range_quantifier'], match: greedy_range_quantifier['groups']['greedy_range_quantifier'], startingIndex, lastIndex } : {}),
                        ...(non_greedy_range_quantifier ? { type: 'non_greedy_range_quantifier', group: non_greedy_range_quantifier['groups']['non_greedy_range_quantifier'], match: non_greedy_range_quantifier['groups']['non_greedy_range_quantifier'], startingIndex, lastIndex } : {}),
                        ...(alternation ? { type: 'alternation', group: alternation['groups']['alternation'], match: alternation['groups']['alternation'], startingIndex, lastIndex } : {}),
                        ...(unicode_regex_in_unicode_mode ? { type: 'unicode', group: unicode_regex_in_unicode_mode['groups']['unicode'], match: hexadecimal, startingIndex, lastIndex } : {})
                    }
                }
                captures[startingIndex] = {
                    ...(named_capture ? { type: 'named_capture_group', group: named_capture['groups']['named_capture_group'], match: named_capture['groups']['named_capture'], startingIndex, lastIndex, name: named_capture['groups']['name'] } : {}),
                    ...(non_capture ? { type: 'non_capture_group', group: non_capture['groups']['non_capture_group'], match: non_capture['groups']['non_capture'], startingIndex, lastIndex} : {}),
                    ...(capture ? { type: 'capture_group', group: capture['groups']['capture_group'], match: capture['groups']['capture'], startingIndex, lastIndex } : {}),
                    ...(digit ? { type: 'digit', group: digit['groups']['digit'], match: digit['groups']['capture'], startingIndex, lastIndex } : {}),
                    ...(non_digit ? { type: 'non_digit', group: non_digit['groups']['non_digit'], match: non_digit['groups']['non_digit'], startingIndex, lastIndex } : {}),
                    ...(alpha ? { type: 'alphanumeric', group: alpha['groups']['alphanumeric'], match: alpha['groups']['alphanumeric'], startingIndex, lastIndex } : {}),
                    ...(non_alpha ? { type: 'non_alphanumeric', group: non_alpha['groups']['non_alphanumeric'], match: non_alpha['groups']['non_alphanumeric'], startingIndex, lastIndex } : {}),
                    ...(whitespace ? { type: 'whitespace', group: whitespace['groups']['whitespace'], match: whitespace['groups']['whitespace'], startingIndex, lastIndex } : {}),
                    ...(non_whitespace ? { type: 'non_whitespace', group: non_whitespace['groups']['non_whitespace'], match: non_whitespace['groups']['non_whitespace'], startingIndex, lastIndex } : {}),
                    ...(horizontal_tab ? { type: 'horizontal_tab', group: horizontal_tab['groups']['horizontal_tab'], match: horizontal_tab['groups']['horizontal_tab'], startingIndex, lastIndex } : {}),
                    ...(carriage_return ? { type: 'carriage_return', group: carriage_return['groups']['carriage_return'], match: carriage_return['groups']['carriage_return'], startingIndex, lastIndex } : {}),
                    ...(linefeed ? { type: 'linefeed', group: linefeed['groups']['linefeed'], match: linefeed['groups']['linefeed'], startingIndex, lastIndex } : {}),
                    ...(vertical_tab ? { type: 'vertical_tab', group: vertical_tab['groups']['vertical_tab'], match: vertical_tab['groups']['vertical_tab'], startingIndex, lastIndex } : {}),
                    ...(form_feed ? { type: 'form_feed', group: form_feed['groups']['form_feed'], match: form_feed['groups']['form_feed'], startingIndex, lastIndex } : {}),
                    ...(backspace ? { type: 'backspace', group: backspace['groups']['backspace'], match: backspace['groups']['backspace'], startingIndex, lastIndex } : {}),
                    ...(nul ? { type: 'NUL', group: nul['groups']['NUL'], match: nul['groups']['NUL'], startingIndex, lastIndex } : {}),
                    ...(control_character ? { type: 'control_character', group: control_character['groups']['control_character'], match: control_character['groups']['control_character'], startingIndex, lastIndex } : {}),
                    ...(hex ? { type: 'hex', group: hex['groups']['hex'], match: hex['groups']['hex'], startingIndex, lastIndex } : {}),
                    ...(dotall ? { type: 'dotAll', group: dotall['groups']['dotAll'], match: dotall['groups']['dotAll'], startingIndex, lastIndex } : {}),
                    ...(dot ? { type: 'dot', group: dot['groups']['dot'], match: dot['groups']['dot'], startingIndex, lastIndex } : {}),
                    ...(negated_character_set ? { type: 'negated_character_set', group: negated_character_set['groups']['negated_character_set'], match: negated_character_set['groups']['negated_character_set'], startingIndex, lastIndex } : {}),
                    ...(character_set ? { type: 'character_set', group: character_set['groups']['set'], match: character_set['groups']['set'], startingIndex, lastIndex } : {}),
                    ...(unicode_property_escape ? { type: 'unicode_property_escape', group: unicode_property_escape['groups']['unicode_property_escape'], match: unicode_property_escape['groups']['unicode_property_escape'], startingIndex, lastIndex} : {}),
                    ...(negated_unicode_property_escape ? { type: 'negated_unicode_property_escape', group: negated_unicode_property_escape['groups']['negated_unicode_property_escape'], match: negated_unicode_property_escape['groups']['negated_unicode_property_escape'], startingIndex, lastIndex } : {}),
                    ...(positive_lookahead ? { type: 'positive_lookahead', group: positive_lookahead['groups']['positive_lookahead'], match: positive_lookahead['groups']['positive_lookahead'], startingIndex, lastIndex } : {}),
                    ...(positive_lookbehind ? { type: 'positive_lookbehind', group: positive_lookbehind['groups']['positive_lookbehind'], match: positive_lookbehind['groups']['positive_lookbehind'], startingIndex, lastIndex } : {}),
                    ...(negative_lookahead ? { type: 'negative_lookahead', group: negative_lookahead['groups']['negative_lookahead'], match: negative_lookahead['groups']['negative_lookahead'], startingIndex, lastIndex } : {}),
                    ...(negative_lookbehind ? { type: 'negative_lookbehind', group: negative_lookbehind['groups']['negative_lookbehind'], match: negative_lookbehind['groups']['negative_lookbehind'], startingIndex, lastIndex } : {}),
                    ...(word_boundary ? { type: 'word_boundary', group: word_boundary['groups']['word_boundary'], match: word_boundary['groups']['word_boundary'], startingIndex, lastIndex} : {}),
                    ...(non_word_boundary ? { type: 'non_word_boundary', group: non_word_boundary['groups']['non_word_boundary'], match: non_word_boundary['groups']['non_word_boundary'], startingIndex, lastIndex }: {}),
                    ...(named_backreference ? { type: 'named_backreference', group: named_backreference['groups']['named_backreferences'], match: named_backreference['groups']['named_backreferences'], startingIndex, lastIndex } : {}),
                    ...(numerical_backreference ? { type: 'numerical_backreference', group: numerical_backreference['groups']['numerical_backreference'], match: numerical_backreference['groups']['numerical_backreference'], startingIndex, lastIndex } : {}),
                    ...(literal ? { type: 'literal', group: literal['groups']['literal'], match: literal['groups']['literal'], startingIndex, lastIndex} : {}),
                    ...(non_greedy_kleene_plus ? { type: 'non_greedy_kleene_plus', group: non_greedy_kleene_plus['groups']['non_greedy_kleene_plus'], match: non_greedy_kleene_plus['groups']['non_greedy_kleene_plus'], startingIndex, lastIndex } : {}),
                    ...(non_greedy_kleene_star ? { type: 'non_greedy_kleene_star', group: non_greedy_kleene_star['groups']['non_greedy_kleene_star'], match: non_greedy_kleene_star['groups']['non_greedy_kleene_star'], startingIndex, lastIndex } : {}),
                    ...(non_greedy_optional ? { type: 'non_greedy_optional', group: non_greedy_optional['groups']['non_greedy_optional'], match: non_greedy_optional['groups']['non_greedy_optional'], startingIndex, lastIndex } : {}),
                    ...(greedy_kleene_plus ? { type: 'greedy_kleene_plus', group: greedy_kleene_plus['groups']['greedy_kleene_plus'], match: greedy_kleene_plus['groups']['greedy_kleene_plus'], startingIndex, lastIndex } : {}),
                    ...(greedy_kleene_star ? { type: 'greedy_kleene_star', group: greedy_kleene_star['groups']['greedy_kleene_star'], match: greedy_kleene_star['groups']['greedy_kleene_star'], startingIndex, lastIndex } : {}),
                    ...(greedy_optional ? { type: 'greedy_optional', group: greedy_optional['groups']['greedy_optional'], match: greedy_optional['groups']['greedy_optional'], startingIndex, lastIndex } : {}),
                    ...(greedy_range_quantifier ? { type: 'greedy_range_quantifier', group: greedy_range_quantifier['groups']['greedy_range_quantifier'], match: greedy_range_quantifier['groups']['greedy_range_quantifier'], startingIndex, lastIndex } : {}),
                    ...(non_greedy_range_quantifier ? { type: 'non_greedy_range_quantifier', group: non_greedy_range_quantifier['groups']['non_greedy_range_quantifier'], match: non_greedy_range_quantifier['groups']['non_greedy_range_quantifier'], startingIndex, lastIndex } : {}),
                    ...(alternation ? { type: 'alternation', group: alternation['groups']['alternation'], match: alternation['groups']['alternation'], startingIndex, lastIndex } : {}),
                    ...(unicode_regex_in_unicode_mode ? { type: 'unicode', group: unicode_regex_in_unicode_mode['groups']['unicode'], match: hexadecimal, startingIndex, lastIndex } : {})
                }
            }
        });
        return captures;
    },

}