import { join } from 'path';
import { cwd } from '../global/env.global';

export const DATA_DIR = join(cwd, '/tmp');

export const USER_ASSET_DIR = join(DATA_DIR, 'assets');

export const STATIC_FILE_DIR = join(DATA_DIR, 'static');
