import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Col} from 'react-bootstrap'
import {FormattedMessage} from 'react-intl'

const GroupTeam = ({game, team}) => {
	if (!team.groups) {
		return null;
	}

	const matches = team.groups.find((item) => {
		return item.wbsc_tournament_round_id === game.wbsc_tournament_round_id;
	})

	return (matches ? matches.name : null)
}

export const Team = ({label, team, game, ...props}) => (
	<Col xs={4} className={'text-center'} {...props}>
		<p className="home-away-label">
			<FormattedMessage id={label}/>
		</p>
		{(team.id > 0 && team.federation && team.federation.flag) ? (
			<Fragment>
				<img
					className={'flag-icon lazyload'}
					src={team.federation.flag}
					title={team.teamcode}
					alt={`${team.teamcode} flag`}
				/>

				<p className={'team-ioc'}>
					{team.federation.ioc}
				</p>
				<p className={'team-name'}>
					{team.teamlabel}
				</p>
				<p className={'team-name'}>
					<GroupTeam game={game} team={team}/>
				</p>
			</Fragment>
		) : (
			<Fragment>
				<br/>
				<p>{team.teamcode}</p>
				<p className={'team-name'}>{team.name}</p>
			</Fragment>
		)}
	</Col>
)

Team.propTypes = {
	label: PropTypes.string.isRequired,
	team: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string,
		teamcode: PropTypes.string,
		federation: PropTypes.shape({
			ioc: PropTypes.string,
			flag: PropTypes.string,
			name: PropTypes.string,
		})
	}).isRequired
}
