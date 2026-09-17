import * as migration_20260917_201109_initial_poc from './20260917_201109_initial_poc';

export const migrations = [
  {
    up: migration_20260917_201109_initial_poc.up,
    down: migration_20260917_201109_initial_poc.down,
    name: '20260917_201109_initial_poc'
  },
];
