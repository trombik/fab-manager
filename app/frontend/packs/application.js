import 'core-js/stable';
import 'regenerator-runtime/runtime';

import 'jquery';
import {} from 'jquery-ujs';
import 'bootstrap-sass';
import '../src/javascript/lib/polyfill';
import 'angular';
import 'angular-cookies';
import 'angular-resource';
import 'angular-sanitize';
import 'angular-touch';
import '@uirouter/angularjs';
import 'angular-ui-bootstrap';
import 'ui-select';
import 'moment';
import 'moment-timezone';
import 'angular-ui-calendar';
import 'fullcalendar';
import 'angular-moment';
import 'ngUpload';
import 'jasny-bootstrap/js/fileinput';
import 'holderjs';
import 'AngularDevise';
import '../src/javascript/lib/devise-modal';
import 'angular-growl-v2';
import 'angular-xeditable';
import 'checklist-model/checklist-model';
import 'angular-unsavedchanges/lib/unsavedChanges';
import 'angular-loading-bar/src/loading-bar';
import 'angular-scroll/angular-scroll';
import 'angular-google-analytics/dist/angular-google-analytics';
import '../src/javascript/lib/dirDisqus';
import '../src/javascript/lib/humanize';
import 'underscore/underscore';
import 'elasticsearch-browser/elasticsearch.angular';
import 'd3/d3';
import 'nvd3/build/nv.d3.js';
import 'twitter-fetcher';
import 'medium-editor/dist/js/medium-editor';
import 'angular-medium-editor/dist/angular-medium-editor';
import 'bootstrap-switch/dist/js/bootstrap-switch.min';
import 'angular-bootstrap-switch/dist/angular-bootstrap-switch.min';
import 'angular-base64-upload/dist/angular-base64-upload.min';
import 'summernote';
import 'angular-summernote/dist/angular-summernote';
import '../src/javascript/lib/summernote-ext-nugget';
import 'jquery-minicolors/jquery.minicolors.js';
import 'angular-minicolors/angular-minicolors.js';
import 'angular-translate/dist/angular-translate';
import 'angular-translate-loader-partial/angular-translate-loader-partial';
import 'messageformat/messageformat';
import 'angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat';
import 'ng-fittext/dist/ng-FitText.min';
import 'angular-aside/dist/js/angular-aside';
import 'ng-caps-lock/ng-caps-lock';
import 'angular-recaptcha';
import 'codemirror/lib/codemirror';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/mode/css/css';
import 'codemirror/mode/sass/sass';
import 'angular-ui-codemirror/src/ui-codemirror';
import 'angular-hotkeys/build/hotkeys';
import 'hone/dist/hone';
import 'tether/dist/js/tether';
import 'angular-bind-html-compile/angular-bind-html-compile';
import 'angular-ui-tour/app/angular-ui-tour';

import '../src/javascript/app.js';
import '../src/javascript/router.js.erb';
import '../src/javascript/plugins.js.erb';

require.context('../src/javascript/controllers/', true, /.*/);
require.context('../src/javascript/services/', true, /.*/);
require.context('../src/javascript/directives/', true, /.*/);
require.context('../src/javascript/filters/', true, /.*/);

require.context('../images', true);
require.context('../templates', true);
