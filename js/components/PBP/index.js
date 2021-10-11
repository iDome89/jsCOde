import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image } from 'react-bootstrap'

import { getBoxScoreGame } from "../../selectors/game";
import { getTournamentFromBoxScore } from '../../selectors/tournament'
import { startPBPDataFetch } from '../../actions/pbp'
import { getPbp } from '../../selectors/pbp'

import { Players } from './Players'
import { PBPSituation } from './PBPSituation'
import { Runners } from './Runners'
import { Plate } from './Plate'

class PBP extends Component {
  componentDidMount() {
    this.fetchPBP()
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if(prevProps.liveScores !== this.props.liveScores) {
      this.fetchPBP()
    }
  }

  fetchPBP() {
    const { gameId, gameStatus, startPBPDataFetch } = this.props

    if(gameStatus < 2) {
      startPBPDataFetch({gameId})
    }
  }

  render() {
    const { pbp, tournament, gameStatus, gameStartDate, game } = this.props

    if(gameStatus >= 2) return null

    return (
      <div className={'pbp'}>
        <PBPSituation/>

        <div className={'field'}>
          <div className={'field-wrapper'}>
            <Image
              src={`https://game.wbsc.org/images/${tournament.tournamentkey}-field.jpg`}
              alt={'field'}
              className={`lazyload`}
              responsive
            />

            <Runners game={game.gameData} situation={pbp && pbp.situation}/>
          </div>
        </div>

        <div className={'match-box'}>
          {pbp && (
            <Players
							game={game.gameData}
              boxScore={pbp.boxscore}
              situation={pbp.situation}
            />
          )}

          <div className={'info'}>
            <Plate
              count={pbp && pbp.platecount}
              plays={pbp && pbp.plays}
              gameStartDate={gameStartDate}
              gameStatus={gameStatus}
            />
          </div>
        </div>
      </div>
    )
  }
}

PBP.propTypes = {
  gameId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  gameStatus: PropTypes.number.isRequired,
  gameStartDate: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
	game: getBoxScoreGame(state),
  pbp: getPbp(state).currentPlay,
  tournament: getTournamentFromBoxScore(state)
})

export default connect(mapStateToProps, { startPBPDataFetch })(PBP)
