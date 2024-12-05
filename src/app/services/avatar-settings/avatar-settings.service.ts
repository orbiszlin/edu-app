import {Injectable} from '@angular/core';
import {Avatar, User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AvatarSettingsService {

  private user: User;

  constructor() {
    this.user = {
      id: 0,
      username: "lojza",
      email: "neco@orbiszlin.cz",
      password: "string",
      avatar: {
        bodyName: "avatar",
        hatId: 0,
        alias: "avatar.svg",
      }
    }
  }

  getAvatarCopy(): Avatar {
    return this.user.avatar;
  }
}
