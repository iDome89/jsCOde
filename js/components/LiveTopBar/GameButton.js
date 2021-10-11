import React from 'react'
import {Glyphicon} from 'react-bootstrap'
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames'

const getGameStatusLabel = (score) => {
	const status = score.status || score.gamestatus.toString()

	switch (status) {
		case '0':
			return 'scheduleAndResults.gamePreview';
		case '1':
			return 'scheduleAndResults.gameLive';
		case '-1':
			return 'scheduleAndResults.gameToRecouperate';
		case '-2':
			return 'scheduleAndResults.gameToResume';
		case '-3':
			return 'scheduleAndResults.gameCanceled';
		case '2':
		case '3':
			return (score.inning || score.innings) === 'FINAL'
				? 'scheduleAndResults.gameFinalScore'
				: `F/${(score.inning || score.innings)}`
		case '4':
			return 'scheduleAndResults.gameForfeit';
		default:
			return null;
	}
}

export const GameButton = ({score}) => {
	const status = (score.status && parseInt(score.status)) || score.gamestatus;

	return (
		<div className={'game-button'}>
            {status !== 0 && (
                <strong
				className={classNames(
					'game-status-label',
					status < 2 && status !== 1 && 'preview',
					status > 0 && 'final-green',
					status === 4 && 'forfeit',
				)}
			>
				<FormattedMessage id={getGameStatusLabel(score)}/>
			</strong>
            )}

			{score.status > 0 && (
				<Glyphicon
					glyph={'menu-right'}
					style={{fontSize: '2em', color: 'rgba(0, 0, 0, 0.3)'}}
				/>
			)}
		</div>
	)
}
