import React from 'react'
import {Grid} from 'react-bootstrap'
import {connect} from 'react-redux'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import {LocalizationProvider} from '../LocalizationProvider'

import {LiveScore} from './LiveScore'
import {Slider} from '../Slider'
import {Tournament} from './Tournament'

import {fetchLiveScores} from '../../actions/livescores'
import {getSchedulesByTournament} from '../../selectors/schedule'
import {getTournaments} from '../../selectors/tournament'

export class LiveTopBar extends React.Component {
    componentDidMount() {
        const { fetchLiveScores, schedules } = this.props

        if (schedules.length > 0) {
            fetchLiveScores()
        }
    }

    render() {
        const {schedules} = this.props

        return (
            <LocalizationProvider lang={'en'}>
                <Grid className={'top-bar-container'}>
                    <Slider className={'top-bar-slick-slider'}>
                        {schedules.map(({tournamentid, schedule}) => {
                            if (schedule.length === 0) {
                                return null
                            }

                            return ([
                                <Tournament id={tournamentid} key={tournamentid}/>,
                                ...schedule.map((game) => (
                                    <LiveScore
                                        game={game}
                                        key={game.id}
                                    />
                                )),
                            ])
                        })}
                    </Slider>
                </Grid>
            </LocalizationProvider>
        );
    }
}

const mapStateToProps = state => ({
    schedules: getSchedulesByTournament(state),
    tournaments: getTournaments(state)
})

export const test = connect(mapStateToProps, {fetchLiveScores})(LiveTopBar)
