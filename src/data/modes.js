import 'codemirror/mode/clike/clike';
import 'codemirror/mode/clojure/clojure';
import 'codemirror/mode/cmake/cmake';
import 'codemirror/mode/coffeescript/coffeescript';
import 'codemirror/mode/commonlisp/commonlisp';
import 'codemirror/mode/crystal/crystal';
import 'codemirror/mode/css/css';
import 'codemirror/mode/dart/dart';
import 'codemirror/mode/diff/diff';
import 'codemirror/mode/dockerfile/dockerfile';
import 'codemirror/mode/erlang/erlang';
import 'codemirror/mode/go/go';
import 'codemirror/mode/groovy/groovy';
import 'codemirror/mode/haskell/haskell';
import 'codemirror/mode/htmlembedded/htmlembedded';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/lua/lua';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/mathematica/mathematica';
import 'codemirror/mode/mllike/mllike';
import 'codemirror/mode/perl/perl';
import 'codemirror/mode/php/php';
import 'codemirror/mode/protobuf/protobuf';
import 'codemirror/mode/python/python';
import 'codemirror/mode/r/r';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/rust/rust';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/swift/swift';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/yaml/yaml';

export const languages = [
  ['dart', 'Dart', 'application/dart'],
  ['javascript', 'JavaScript', 'application/javascript'],
  ['clojure', 'Clojure', 'text/x-clojure'],
  ['json', 'JSON', 'application/x-json'],
  ['typescript', 'TypeScript', 'text/typescript'],
  ['coffeescript', 'CoffeeScript', 'text/coffeescript'],
  ['php', 'PHP', 'application/x-httpd-php'],
  ['shell', 'Shell', 'text/x-sh'],
  ['xml', 'XML', 'application/xml'],
  ['css', 'CSS', 'text/css'],
  ['markdown', 'Markdown', 'text/markdown'],
  ['text', 'Plain Text', 'text/plain'],
  ['rust', 'Rust', 'text/rust'],
  ['c', 'C', 'text/x-c'],
  ['commonlisp', 'CommonLISP', 'text/x-common-lisp'],
  ['crystal', 'Crystal', 'text/x-crystal'],
  ['python', 'Python', 'text/x-python'],
  ['diff', 'Diff', 'text/x-diff'],
  ['dockerfile', 'Docker File', 'text/x-dockerfile'],
  ['erlang', 'Erlang', 'text/x-erlang'],
  ['sql', 'SQL', 'text/x-sql'],
  ['go', 'Go', 'text/x-go'],
  ['groovy', 'Groovy', 'text/x-groovy'],
  ['java', 'Java', 'text/x-java'],
  ['protobuf', 'Protobuf', 'text/x-protobuf'],
  ['r', 'R', 'text/x-rsrc'],
  ['rust', 'Rust', 'ext/x-ruby'],
  ['swift', 'Swift', 'text/x-swift'],
  ['yaml', 'YAML', 'text/yaml'],
  ['xml', 'XML', 'text/xml']
].sort((a, b) => a[0] - b[0]);

export const getCodeMirrorMode = value =>
  languages.find(item => item[0] === value);

export const langDropdownOptions = languages.map(item => ({
  value: item[0],
  label: item[1]
}));

console.log(`support ${languages.map(i => i[0]).join('|')}`);

export const getSelectedDropdownOption = value => {
  const mode = getCodeMirrorMode(value);
  return {
    value: mode[0],
    label: mode[1]
  };
};
