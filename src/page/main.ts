import '../elements/elements';
import '../elements/tree';

import '@scss/main.scss';


import storeInit from '@scripts/init/store';
import {reloadPageSameLink,} from '@scripts/base/listeners';
//console.log("main init")
storeInit();
reloadPageSameLink();

