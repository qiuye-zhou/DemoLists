import {
  DATA_DIR,
  STATIC_FILE_DIR,
  USER_ASSET_DIR,
} from '../constants/path.constants';
import { mkdirSync } from 'fs';
import { Logger } from '@nestjs/common';

function mkdirs() {
  mkdirSync(DATA_DIR, { recursive: true });
  Logger.log(`数据目录已经建好: ${DATA_DIR}`);
  mkdirSync(USER_ASSET_DIR, { recursive: true });
  Logger.log(`资源目录已经建好: ${USER_ASSET_DIR}`);
  mkdirSync(STATIC_FILE_DIR, { recursive: true });
  Logger.log(`文件存放目录已经建好: ${STATIC_FILE_DIR}`);
}

export function register() {
  mkdirs();
}
