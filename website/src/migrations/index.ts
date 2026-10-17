import * as migration_20261017_105823_initial from './20261017_105823_initial';
import * as migration_20261017_115003_kurse_und_anmeldungen from './20261017_115003_kurse_und_anmeldungen';
import * as migration_20261017_121359_cms_verschlanken from './20261017_121359_cms_verschlanken';
import * as migration_20261017_142156_veranstaltung_text from './20261017_142156_veranstaltung_text';
import * as migration_20261017_151620_downloads_bildposition from './20261017_151620_downloads_bildposition';

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
    name: '20261017_121359_cms_verschlanken',
  },
  {
    up: migration_20261017_142156_veranstaltung_text.up,
    down: migration_20261017_142156_veranstaltung_text.down,
    name: '20261017_142156_veranstaltung_text',
  },
  {
    up: migration_20261017_151620_downloads_bildposition.up,
    down: migration_20261017_151620_downloads_bildposition.down,
    name: '20261017_151620_downloads_bildposition'
  },
];
