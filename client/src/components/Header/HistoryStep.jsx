import truncate from 'lodash/truncate';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Popup } from '../../lib/custom-ui';

import Paths from '../../constants/Paths';
import { ActivityTypes } from '../../constants/Enums';
import User from '../User';

import styles from './HistoryStep.module.scss';

const HistoryStep = React.memo(({ items, onClose }) => {
  const [t] = useTranslation();

  const renderItemContent = useCallback(
    (activity, card) => {
      switch (activity.type) {
        case ActivityTypes.MOVE_CARD:
          return (
            <Trans
              i18nKey="common.userMovedCardFromListToList"
              values={{
                user: activity.user.name,
                card: card.name,
                fromList: activity.data.fromList.name,
                toList: activity.data.toList.name,
              }}
            >
              {activity.user.name}
              {' moved '}
              <Link to={Paths.CARDS.replace(':id', card.id)} onClick={onClose}>
                {card.name}
              </Link>
              {' from '}
              {activity.data.fromList.name}
              {' to '}
              {activity.data.toList.name}
            </Trans>
          );
        case ActivityTypes.COMMENT_CARD: {
          const commentText = truncate(activity.data.text);

          return (
            <Trans
              i18nKey="common.userLeftNewCommentToCard"
              values={{
                user: activity.user.name,
                comment: commentText,
                card: card.name,
              }}
            >
              {activity.user.name}
              {` left a new comment «${commentText}» to `}
              <Link to={Paths.CARDS.replace(':id', card.id)} onClick={onClose}>
                {card.name}
              </Link>
            </Trans>
          );
        }
        default:
      }

      return null;
    },
    [onClose],
  );

  return (
    <>
      <Popup.Header>
        {t('common.history', {
          context: 'title',
        })}
      </Popup.Header>
      <Popup.Content>
        {items.length > 0 ? (
          <div className={styles.wrapper}>
            {items.map((item) => (
              <div key={item.id} className={styles.item}>
                {item.card && item.user ? (
                  <>
                    <User name={item.user.name} avatarUrl={item.user.avatarUrl} size="large" />
                    <span className={styles.itemContent}>{renderItemContent(item, item.card)}</span>
                  </>
                ) : (
                  <div className={styles.itemDeleted}>{t('common.cardOrActionAreDeleted')}</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          t('common.noHistory')
        )}
      </Popup.Content>
    </>
  );
});

HistoryStep.propTypes = {
  items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onClose: PropTypes.func.isRequired,
};

export default HistoryStep;
