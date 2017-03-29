'use strict';

const TARGET = process.env.npm_lifecycle_event;
let env = 'development';

switch (TARGET) {
  case 'start':
  case 'ios':
  case 'android':
    env = 'development';
}

module.exports = env;
