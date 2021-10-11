import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Glyphicon } from 'react-bootstrap'
import classNames from 'classnames'

const getInningIndicator = (inning) => {
  if(inning.startsWith('T')) {
    return 'up'
  }

  return 'down'
}

const getRunnersSituationImage = (runners, variant = '') => {
  const runnersCombination = runners.reduce((accumulator, runner, index) => {
    if (runner > 0) {
      // this happens only at the first occurrence of runner > 1 so we can just set the accumulator to an empty string to remove the first '0'
      if(accumulator.charAt(0) === '0') {
        accumulator = ''
      }

      return accumulator + (index + 1).toString(10)
    }

    return accumulator
  }, '0')

  return `http://game.wbsc.org/images/loaded${runnersCombination}${variant}.png`
}

const getBallsImages = (image = 'ball', amount, totalBalls, variant = '') => {
  return Array.from({ length: totalBalls }).map((_, index) => {
    let ballImage

    if(parseInt(amount, 10) >= index + 1) {
      ballImage = `http://game.wbsc.org/images/${image}${variant}.png`
    } else {
      ballImage = `http://game.wbsc.org/images/empty${variant}.png`
    }

    return (
      <img
        width={12}
        src={ballImage}
        alt={'ball'}
        key={index}
        style={{ display: 'inline' }}
      />
    )
  })
}

const BallStrikeOut = ({ letter, amount, total, image, variant = '' }) => (
  <div className={'bso-row'}>
    <p>
      <strong>
        {letter}
      </strong>
    </p>

    {getBallsImages(image, parseInt(amount, 10), total, variant)}
  </div>
)

BallStrikeOut.propTypes = {
  letter: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  total: PropTypes.number.isRequired,
  variant: PropTypes.string
}

export const Situation = ({ situation }) => {
  const { balls, strikes, outs, runner1, runner2, runner3, inning } = situation

  return (
    <div className={'situation'}>
      <div className={'inning'}>
        {inning.match(/\d+/)}

        <Glyphicon
          glyph={`chevron-${getInningIndicator(inning)}`}
          className={classNames(
            'icon'
          )}
        />
      </div>

      <img
        className={'runners'}
        src={getRunnersSituationImage([ runner1, runner2, runner3 ], 'b')}
        alt={'Runners situation'}
      />

      <div className={'bso-container'}>
        <BallStrikeOut
          letter={'B'}
          amount={balls}
          total={3}
          image={'ball'}
          variant={'b'}
        />
        <BallStrikeOut
          letter={'S'}
          amount={strikes}
          total={2}
          image={'strike'}
          variant={'b'}
        />
        <BallStrikeOut
          letter={'O'}
          amount={outs}
          total={2}
          image={'out'}
          variant={'b'}
        />
      </div>
    </div>
  )
}

Situation.propTypes = {
  situation: PropTypes.shape({
    balls: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    strikes: PropTypes.string.isRequired,
    outs: PropTypes.string.isRequired,
    runner1: PropTypes.string.isRequired,
    runner2: PropTypes.string.isRequired,
    runner3: PropTypes.string.isRequired,
    inning: PropTypes.string.isRequired
  }).isRequired
}