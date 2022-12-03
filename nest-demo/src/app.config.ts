import { isDEV } from './global/env.global';

export const API_VERSION = 1;

export const MYSQL = {
  host: isDEV ? 'localhost' : 'xxx',
  port: 3306,
  username: 'root',
  password: 'root',
  database: isDEV ? 'qiuye-space_demo' : 'qiuye-space',
};
