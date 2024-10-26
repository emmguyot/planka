import ActionTypes from '../constants/ActionTypes';

const fetchActivities = (cardId) => ({
  type: ActionTypes.ACTIVITIES_FETCH,
  payload: {
    cardId,
  },
});

fetchActivities.success = (cardId, activities, users) => ({
  type: ActionTypes.ACTIVITIES_FETCH__SUCCESS,
  payload: {
    cardId,
    activities,
    users,
  },
});

fetchActivities.failure = (cardId, error) => ({
  type: ActionTypes.ACTIVITIES_FETCH__FAILURE,
  payload: {
    cardId,
    error,
  },
});

const fetchActivitiesFromBoard = (boardId) => ({
  type: ActionTypes.ACTIVITIES_FROM_BOARD_FETCH,
  payload: {
    boardId,
  },
});

fetchActivitiesFromBoard.success = (boardId, activities, users) => ({
  type: ActionTypes.ACTIVITIES_FROM_BOARD_FETCH__SUCCESS,
  payload: {
    boardId,
    activities,
    users,
  },
});

fetchActivitiesFromBoard.failure = (boardId, error) => ({
  type: ActionTypes.ACTIVITIES_FROM_BOARD_FETCH__FAILURE,
  payload: {
    boardId,
    error,
  },
});

const toggleActivitiesDetails = (cardId, isVisible) => ({
  type: ActionTypes.ACTIVITIES_DETAILS_TOGGLE,
  payload: {
    cardId,
    isVisible,
  },
});

toggleActivitiesDetails.success = (cardId, activities, users) => ({
  type: ActionTypes.ACTIVITIES_DETAILS_TOGGLE__SUCCESS,
  payload: {
    cardId,
    activities,
    users,
  },
});

toggleActivitiesDetails.failure = (cardId, error) => ({
  type: ActionTypes.ACTIVITIES_DETAILS_TOGGLE__FAILURE,
  payload: {
    cardId,
    error,
  },
});

const handleActivityCreate = (activity) => ({
  type: ActionTypes.ACTIVITY_CREATE_HANDLE,
  payload: {
    activity,
  },
});

const handleActivityUpdate = (activity) => ({
  type: ActionTypes.ACTIVITY_UPDATE_HANDLE,
  payload: {
    activity,
  },
});

const handleActivityDelete = (activity) => ({
  type: ActionTypes.ACTIVITY_DELETE_HANDLE,
  payload: {
    activity,
  },
});

export default {
  fetchActivities,
  fetchActivitiesFromBoard,
  toggleActivitiesDetails,
  handleActivityCreate,
  handleActivityUpdate,
  handleActivityDelete,
};
