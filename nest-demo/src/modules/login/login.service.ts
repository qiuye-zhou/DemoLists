import { Injectable } from '@nestjs/common';
import { msg } from 'src/shared/interface/msg.interface';
import { UserList } from 'src/shared/interface/userlist.interface';

@Injectable()
export class LoginService {
  private UserList: UserList[] = [];

  add(user: UserList): msg {
    this.UserList.push(user);
    return {
      msg: '增加成功',
    };
  }

  findone(user: UserList): msg {
    let result = false;
    this.UserList.forEach((e) => {
      if (e.username == user.username && e.password == user.password)
        result = true;
    });
    return result
      ? {
          msg: '登入成功',
        }
      : {
          msg: '登入失败',
        };
  }
}
