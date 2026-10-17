import * as migration_20261017_105823_initial from './20261017_105823_initial';
import * as migration_20261017_115003_kurse_und_anmeldungen from './20261017_115003_kurse_und_anmeldungen';
import * as migration_20261017_121359_cms_verschlanken from './20261017_121359_cms_verschlanken';

export const migrations = [
  {
    up: migration_20261017_105823_initial.up,
    down: migration_20261017_105823_initial.down,
    name: '20261017_105823_initial',
  },
  {
    up: migration_20261017_115003_kurse_und_anmeldungen.up,
    down: migration_20261017_115003_kurse_und_anmeldungen.down,
    name: '20261017_115003_kurse_und_anmeldungen',
  },
  {
    up: migration_20261017_121359_cms_verschlanken.up,
    down: migration_20261017_121359_cms_verschlanken.down,
    name: '20261017_121359_cms_verschlanken'
  },
];
