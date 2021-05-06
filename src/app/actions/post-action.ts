import {Post} from '../models/post';
import {Comment} from '../models/post';

export const POST_LIST_REQUEST = 'post list request';
export const POST_LIST_SUCCESS = 'post list success';
export const POST_DELETE = 'post delete';
export const POST_UPDATE = 'post update';
export const POST_ADD = 'post add';
export const POST_LIST_ERROR = 'post list error';
export const COMMENT_ADD_ACTION = 'add comment';
export const COMMENT_REMOVE_ACTION = 'remove comment';
export const COMMENT_UPDATE_ACTION = 'update comment';

export class PostListRequestAction {
  readonly type = POST_LIST_REQUEST;
}

export class CommentAddAction {
  readonly type = COMMENT_ADD_ACTION;

  constructor(public payload: { data: Comment, postId: number }) {
  }
}

export class CommentUpdateAction {
  readonly type = COMMENT_UPDATE_ACTION;

  constructor(public payload: { data: Comment, postId: number }) {
  }
}

export class CommentDeleteAction {
  readonly type = COMMENT_REMOVE_ACTION;

  constructor(public payload: { id: number, postId: number }) {
  }
}

export class PostDeleteAction {
  readonly type = POST_DELETE;

  constructor(public payload?: { id: number }) {
  }
}

export class PostUpdateAction {
  readonly type = POST_UPDATE;

  constructor(public payload?: { data: Post }) {
  }
}

export class PostAddAction {
  readonly type = POST_ADD;

  constructor(public payload?: { data: Post }) {
  }
}

export class PostListErrorAction {
  readonly type = POST_LIST_ERROR;
}

export class PostListSuccessAction {
  readonly type = POST_LIST_SUCCESS;

  constructor(public payload?: { data: Post[] }) {
  }
}
