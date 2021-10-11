import React, {useCallback, useMemo} from 'react'
import {useSelector} from 'react-redux'

import {Situation} from './Situation'
import {GameButton} from './GameButton'

import {getTournamentById} from '../../selectors/tournament'
import {getLiveScoresByGameId} from '../../selectors/livescores'

import {useLang} from '../../utils/hooks'
import {defaultDomain, localDate} from '../../utils/utils'

const Team = ({team, score}) => {
	const {ioc, flag} = team;

	return (
		<div>
			{flag && (
				<img
					className={'flag-icon'}
					src={`${flag}`}
					title={ioc}
					alt={`${ioc} flag`}
				/>
			)}

			<p className={'team'}>{ioc || 'TBD'}</p>

			{ioc && <p className={'score'}>{score}</p>}
		</div>
	)
}

export const LiveScore = ({game}) => {
	const lang = useLang()
	const tournament = useSelector(state => getTournamentById(state, parseInt(game.tournamentid)))
	const liveScore = useSelector(state => getLiveScoresByGameId(state, game.id.toString()))

	const getScoreValue = useCallback((liveScoreValue, scoreValue) => {
		if (liveScore.gameIsLive) {
			return liveScoreValue
		}

		return scoreValue
	}, [liveScore]);

	const getTeamIoc = useCallback((ioc) => {
		if (ioc && ioc.length > 0) {
			return ioc;
		}

		return null;
	}, []);

	const getTeamFlag = useCallback((team) => {
		if (!team || !team.federation) {
			return null;
		} else if (team.federation.type === 2) {
			return `https://static.wbsc.org/assets/flags/ioc/${team.federation.ioc}.svg`
		} else {
			return team.federation.flag;
		}
	}, []);

	const teams = {
		homeTeam: {
			ioc: getTeamIoc(game.homeioc),
			flag: getTeamFlag(game.home_team),
		},
		awayTeam: {
			ioc: getTeamIoc(game.awayioc),
			flag: getTeamFlag(game.away_team),
		},
	}

	const Local = useMemo(() => {
		const time = localDate(game.start, game.start_tz);

		if (game.start_tz) {
			const utc = localDate(game.start, 'utc');
			const difference = utc.diff(time,'hours');

			return `${time.format('DD/MM, HH:mm')} (UTC ${difference})`;
		} else {
			return time;
		}
	}, [game.start, game.start_tz]);

	return (
        (liveScore.gameIsLive || (game.gamestatus > 1 && game.gamestatus < 4)) ?
			(
				<a
					href={`${defaultDomain(tournament.domain)}/${lang}/events/${tournament.tournamentkey}/schedule-and-results/box-score/${game.id}`}
					target={'_blank'}
					rel={'noreferrer noopener'}
				>
					<div className={'top-bar-score'}>
						<div className={'teams'}>
							{!liveScore.gameIsLive && (
								<p className={'title'}>{Local}</p>
							)}

							<Team team={teams.awayTeam} score={getScoreValue(liveScore.awayruns, game.awayruns)}/>

							<Team team={teams.homeTeam} score={getScoreValue(liveScore.homeruns, game.homeruns)}/>

						</div>

						{liveScore.status === '1' && (
							<Situation situation={liveScore}/>
						)}

						<GameButton score={getScoreValue(liveScore, game)}/>
					</div>
				</a>
			) : (
				<span>
					<div className={'top-bar-score'}>
						<div className={'teams'}>
							{!liveScore.gameIsLive && (
								<p className={'title'}>{Local}</p>
							)}

							<Team team={teams.awayTeam} score={getScoreValue(liveScore.awayruns, game.awayruns)}/>

							<Team team={teams.homeTeam} score={getScoreValue(liveScore.homeruns, game.homeruns)}/>

						</div>

						{liveScore.status === '1' && (
							<Situation situation={liveScore}/>
						)}

						<GameButton score={getScoreValue(liveScore, game)}/>
					</div>
				</span>
			)
	)
}
