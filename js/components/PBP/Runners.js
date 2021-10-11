import React, {useMemo} from 'react'
import PropTypes from 'prop-types'

const getBattersHand = bats => {
  const hand = {
    'R': 'right',
    'L': 'left',
    'S': 'left'
  }

  if(bats && bats.length) {
    return hand[bats]
  }

  return hand['L']
}

const Runner = ({ show, number, uniform }) => {
  if(!show || parseInt(show) === 0) return null

  return (
    <img
      className={`runner${number} lazyload`}
      src={`https://game.wbsc.org/images/teams/wbsc-${uniform}-runner${number}.png`}
      alt={'1st base runner'}
    />
  )
}

Runner.propTypes = {
  show: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  number: PropTypes.oneOf([1, 2, 3]).isRequired,
  uniform: PropTypes.string.isRequired
}

/*
const parsePlayerAttributes = attribute => {
  if(!attribute) {
    return ''
  }

  if(attribute.length === 0 || attribute.charAt(0) === '-') {
    return attribute
  }

  return `-${attribute}`
}
*/

export const Runners = ({ game, situation }) => {
  if(!situation) {
    return null
  }

  const { bats, gender, runner1, runner2, runner3, uniform } = situation
  const battersHand = getBattersHand(bats)

	/*
	const uniform = useMemo(() => {
		if (situation.inning - Math.floor(situation.inning) === 0) {
			return `${game.uniform_away}-away`.toLowerCase();
		}

		return `${game.uniform_home}-home`.toLowerCase();
	}, [game, situation.inning])
	*/

  return (
    <div className={'field-players'}>
      <img
        className={`${battersHand}-batter-shadow lazyload`}
        src={`https://game.wbsc.org/images/teams/wbsc-batter-${battersHand}-shadow.png`}
        alt={'Batter shadow'}
      />
      <img
        className={`${battersHand}-batter lazyload`}
        src={`https://game.wbsc.org/images/teams/wbsc-${uniform}${gender}-batter-${battersHand}.png`}
        alt={'Batter'}
      />

      <Runner show={runner1} number={1} uniform={uniform}/>
      <Runner show={runner2} number={2} uniform={uniform}/>
      <Runner show={runner3} number={3} uniform={uniform}/>
    </div>
  )
}

Runners.propTypes = {
  situation: PropTypes.shape({
    uniform: PropTypes.string,
    bats: PropTypes.oneOf(['R', 'L', '']),
    gender: PropTypes.string.isRequired,
    runner1: PropTypes.number.isRequired,
    runner2: PropTypes.number.isRequired,
    runner3: PropTypes.number.isRequired
  })
}
