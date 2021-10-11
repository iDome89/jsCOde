import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import classNames from 'classnames'

import { getNarrativeColor } from '../../selectors/pbp'

export const Plate = ({ count, gameStartDate, plays, gameStatus }) => {
  if(!count) {
    if(plays && plays.length === 1) {
      return (
        <span dangerouslySetInnerHTML={{ __html: plays }}/>
      )
    }

    if(gameStatus === 1) {
      return null
    }

    return (
      <span>
        This game has not started
        <br/>
        <strong>Start date: </strong>
        {gameStartDate}
      </span>
    )
  }

  return (
    <div className={'plates'}>
      {count.map(({ id, label, type, pitchCount }) => (
        <Row className={'plate'} key={id}>
          <Col xs={1} md={2}>
            {type !== 0 && (
              <div className={classNames(
                'circle',
                getNarrativeColor(type)
              )}>
                {pitchCount}
              </div>
            )}
          </Col>
          <Col xs={11} md={10}>
            <div className={'plate-label'}>
              <p dangerouslySetInnerHTML={{ __html: label }}/>
            </div>
          </Col>
        </Row>
      ))}
    </div>
  )
}

Plate.propTypes = {
  count: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    pitch: PropTypes.string,
    type: PropTypes.number
  })),
  gameStartDate: PropTypes.string,
  plays: PropTypes.arrayOf(PropTypes.string)
}