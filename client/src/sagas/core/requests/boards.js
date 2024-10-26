import { call, select } from 'redux-saga/effects';

import request from '../request';
import selectors from '../../../selectors';
import api from '../../../api';
import Paths from '../../../constants/Paths';
import mergeRecords from '../../../utils/merge-records';

export function* fetchBoardByCurrentPath() {
  const pathsMatch = yield select(selectors.selectPathsMatch);

  let board;
  let card;
  let users;
  let projects;
  let boardMemberships;
  let labels;
  let lists;
  let cards;
  let cardMemberships;
  let cardLabels;
  let tasks;
  let attachments;
  let actionHistory;

  if (pathsMatch) {
    let boardId;
    if (pathsMatch.pattern.path === Paths.BOARDS) {
      boardId = pathsMatch.params.id;
    } else if (pathsMatch.pattern.path === Paths.CARDS) {
      ({
        item: card,
        item: { boardId },
      } = yield call(request, api.getCard, pathsMatch.params.id));
    }

    if (boardId) {
      ({
        item: board,
        included: {
          users,
          projects,
          boardMemberships,
          labels,
          lists,
          cards,
          cardMemberships,
          cardLabels,
          tasks,
          attachments,
        },
      } = yield call(request, api.getBoard, boardId, true));

      const bodyHistory = yield call(request, api.getActionHistory, boardId);

      const {
        items: actionHistory2,
        included: { users: users2, cards: cards2 },
      } = bodyHistory;

      actionHistory = actionHistory2;
      users = mergeRecords(users, users2);
      cards = mergeRecords(cards, cards2);
    } else {
      actionHistory = null;
    }
  }

  return {
    board,
    card,
    users,
    boardMemberships,
    labels,
    lists,
    cards,
    cardMemberships,
    cardLabels,
    tasks,
    attachments,
    actionHistory,
    project: projects ? projects[0] : null,
  };
}

export default {
  fetchBoardByCurrentPath,
};
