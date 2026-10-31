import * as migration_20261017_105823_initial from './20261017_105823_initial';
import * as migration_20261017_115003_kurse_und_anmeldungen from './20261017_115003_kurse_und_anmeldungen';
import * as migration_20261017_121359_cms_verschlanken from './20261017_121359_cms_verschlanken';
import * as migration_20261017_142156_veranstaltung_text from './20261017_142156_veranstaltung_text';
import * as migration_20261017_151620_downloads_bildposition from './20261017_151620_downloads_bildposition';
import * as migration_20261017_153858_verfasst_von from './20261017_153858_verfasst_von';
import * as migration_20261017_155447_plaetze_von_hand from './20261017_155447_plaetze_von_hand';
import * as migration_20261031_121905_kurse from './20261031_121905_kurse';
import * as migration_20261031_160000_kurs_alter from './20261031_160000_kurs_alter';
import * as migration_20261031_170000_kurse_quellen from './20261031_170000_kurse_quellen';

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
    name: '20261017_151620_downloads_bildposition',
  },
  {
    up: migration_20261017_153858_verfasst_von.up,
    down: migration_20261017_153858_verfasst_von.down,
    name: '20261017_153858_verfasst_von',
  },
  {
    up: migration_20261017_155447_plaetze_von_hand.up,
    down: migration_20261017_155447_plaetze_von_hand.down,
    name: '20261017_155447_plaetze_von_hand',
  },
  {
    up: migration_20261031_121905_kurse.up,
    down: migration_20261031_121905_kurse.down,
    name: '20261031_121905_kurse'
  },
  {
    up: migration_20261031_160000_kurs_alter.up,
    down: migration_20261031_160000_kurs_alter.down,
    name: '20261031_160000_kurs_alter',
  },
  {
    up: migration_20261031_170000_kurse_quellen.up,
    down: migration_20261031_170000_kurse_quellen.down,
    name: '20261031_170000_kurse_quellen',
  },
];
