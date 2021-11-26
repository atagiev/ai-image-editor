import Vue from 'vue';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import 'element-ui/packages/theme-chalk/lib/index.css';
import {
  Dialog,
  Loading,
  Icon,
  Button,
  Upload,
  Image
} from 'element-ui';

const elements = [Dialog,
  Loading,
  Icon,
  Button,
  Upload,
  Image
];

locale.use(lang);

elements.forEach(El => Vue.use(El, { locale }));