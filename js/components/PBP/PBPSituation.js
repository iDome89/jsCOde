import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, shallowEqual } from 'react-redux'
import { Row, Col, Glyphicon } from 'react-bootstrap'

import { Situation, Inning } from '../Situation'

import { getPbp } from '../../selectors/pbp'
import { useBoxScoreContext } from '../../containers/BoxScore/context'

const TeamLabel = ({ team, score }) => (
  <div className={'team-label center-vertically-xs center-vertically-md'}>
    <p>
      <strong>
        {team}
      </strong>
    </p>

    <p>
      <strong>
        {score}
      </strong>
    </p>
  </div>
)

TeamLabel.propTypes = {
  team: PropTypes.string.isRequired,
  score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

const scrollToScoreBox = () => {
  document.getElementById('opponents').scrollIntoView({
    behavior: 'smooth'
  })
}

export const PBPSituation = () => {
  const { currentPlay } = useSelector(getPbp, shallowEqual)
  const { setSelectedTab } = useBoxScoreContext()

  if(!currentPlay) {
    return null
  }

  const { situation, eventhome, eventaway, linescore } = currentPlay
  const { inning } = situation

  const inningIsTop = inning - Math.floor(inning) === 0

  return (
    <div className={'scores'}>
      <Row
        className={'scores-row'}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setSelectedTab('box-score')
          scrollToScoreBox()
        }}
      >
        <Inning
          className={'pbp-inning'}
          inning={inning}
          frame={inningIsTop ? 'top' : 'bot'}
        />

        <Col xs={5}>
          <TeamLabel team={eventaway} score={linescore.awaytotals.R}/>
          <TeamLabel team={eventhome} score={linescore.hometotals.R}/>
        </Col>

        <Col xs={6}>
          <Situation situation={situation}/>
        </Col>
      </Row>
    </div>
  )
}