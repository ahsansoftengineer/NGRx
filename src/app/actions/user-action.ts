import {User} from '../models/user';

export const USER_LIST_REQUEST = 'user list request';
export const USER_LIST_SUCCESS = 'user list success';
export const USER_DELETE = 'user delete';
export const USER_UPDATE = 'user update';
export const USER_ADD = 'user add';
export const USER_LIST_ERROR = 'user list error';

export class UserListRequestAction {
  readonly type = USER_LIST_REQUEST;
}

export class UserDeleteAction {
  readonly type = USER_DELETE;

  constructor(public payload?: { id: number }) {
  }
}

export class UserUpdateAction {
  readonly type = USER_UPDATE;

  constructor(public payload?: { data: User }) {
  }
}

export class UserAddAction {
  readonly type = USER_ADD;

  constructor(public payload?: { data: User }) {
  }
}

export class UserListErrorAction {
  readonly type = USER_LIST_ERROR;
}

export class UserListSuccessAction {
  readonly type = USER_LIST_SUCCESS;

  constructor(public payload?: { data: User[] }) {
  }
}
