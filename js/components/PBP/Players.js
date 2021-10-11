import React from 'react'
import PropTypes from 'prop-types'
import { Media } from 'react-bootstrap'

const getPlayer = (boxScore, playerId) => {
  return Object.values(boxScore).find(score => score.playerid === playerId)
}

const Player = ({ name, label, image, stats }) => (
  <Media className={'player'}>
    {image && (
      <Media.Left>
        <img className={'lazyload'} className={'player-image'} width={45} src={image} alt={`Player ${name}`}/>
      </Media.Left>
    )}

    <Media.Body>
      <p className={'player-label'}>{label}</p>
      <Media.Heading className={'player-name'}>
        {name}
      </Media.Heading>

      <p className={'player-stats'}>{stats}</p>
    </Media.Body>
  </Media>
)

export const Players = ({
  boxScore,
  situation
}) => {
  if(typeof boxScore === 'string') {
    return null
  }

  const player = getPlayer(boxScore, situation.pitcherid);
  const batter = getPlayer(boxScore, situation.batterid)

  return (
    <div className={'players'}>
      <Player
        label={'Pitching'}
        name={situation.pitcher}
        image={player && player.image}
        stats={`${situation.pitcherera} ERA, ${situation.pitcherip} IP`}
      />
      <Player
        label={'At bat'}
        name={situation.batter}
        image={batter && batter.image}
        stats={`${situation.batting} ${situation.avg} AVG`}
      />
    </div>
  )
}

Players.propTypes = {
  boxScore: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  situation: PropTypes.object.isRequired
}
