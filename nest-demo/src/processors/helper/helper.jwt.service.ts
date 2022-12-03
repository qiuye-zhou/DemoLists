import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { Logger } from 'src/utils/loger.utile';

@Injectable()
export class JWTService {
  private secret = 'qiuye-demo';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async verify(token = ' ') {
    try {
      const res = verify(token.toString().slice(7), this.secret);
      console.log(res);
      return res;
    } catch (er) {
      Logger.error(er, token.toString().slice(7));
      return false;
    }
  }

  sign(id: string, roles?: string) {
    const token = sign({ id, roles }, this.secret, {
      expiresIn: `10d`,
    });
    return token;
  }
}
