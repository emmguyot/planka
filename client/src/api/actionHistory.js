import socket from './socket';
import { transformUser } from './users';
import { transformCard } from './cards';

/* Transformers */

export const transformAction = (action) => ({
  ...action,
  activityId: action.id,
});

/* Actions */

const getActionHistory = (boardId, headers) =>
  socket.get(`/board/${boardId}/actions`, undefined, headers).then((body) => ({
    ...body,
    items: body.items.map(transformAction),
    included: {
      users: body.included.users.map(transformUser),
      cards: body.included.cards.map(transformCard),
    },
  }));

// TODO KO, à revoir/supprimer...
const updateActionHistory = (ids, data, headers) =>
  socket.patch(`/get-all/${ids.join(',')}`, data, headers).then((body) => ({
    ...body,
    items: body.items.map(transformAction),
  }));

/* Event handlers */

const makeHandleActionCreate = (next) => (body) => {
  next({
    ...body,
    item: transformAction(body.item),
  });
};

const makeHandleActionUpdate = makeHandleActionCreate;

export default {
  getActionHistory,
  updateActionHistory,
  makeHandleActionCreate,
  makeHandleActionUpdate,
};
