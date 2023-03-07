import Mock from './mock';

import './db/auth';
import './db/notification';

Mock.onAny().passThrough();
