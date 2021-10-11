import React  from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Image, Glyphicon } from 'react-bootstrap'
import classNames from 'classnames'

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

  return `https://game.wbsc.org/images/loaded${runnersCombination}${variant}.png`
}

const getBallsImages = (image = 'ball', amount, totalBalls, variant = '') => {
  return Array.from({ length: totalBalls }).map((_, index) => {
    let ballImage

    if(parseInt(amount, 10) >= index + 1) {
      ballImage = `https://game.wbsc.org/images/${image}${variant}.png`
    } else {
      ballImage = `https://game.wbsc.org/images/empty${variant}.png`
    }

    return <img width={16} className={'lazyload'} src={ballImage} alt={'ball'} key={index}/>
  })
}

const BallStrikeOut = ({ letter, amount, total, image, variant = '' }) => (
  <p style={{ fontFamily: 'monospace' }}>
    <strong>
      {letter} {getBallsImages(image, parseInt(amount, 10), total, variant)}
    </strong>
  </p>
)

BallStrikeOut.propTypes = {
  letter: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  total: PropTypes.number.isRequired,
  variant: PropTypes.string
}

const frames = {
  'top': 'up',
  'bot': 'down'
}

export const Inning = ({ inning, frame, className, ...props }) => (
  <Col
    xs={1}
    className={classNames(
      'inning-indicator center-vertically-xs center-vertically-md text-center',
      className
    )}
    {...props}
  >
    <p>
      <strong>
        {Math.floor(inning)}
      </strong>
    </p>
    <Glyphicon
      className={classNames(
        'icon',
        frame
      )}
      glyph={`chevron-${frames[frame]}`}
    />
  </Col>
)

Inning.propTypes = {
  inning: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  frame: PropTypes.oneOf(['top', 'bot']).isRequired
}

export const Situation = ({ situation, variant, children, ...props }) => {
  const { balls, strikes, outs, runner1, runner2, runner3 } = situation

  return (
    <Row className={'situation'} {...props}>
      <Col xs={7} className={'ball-strike-out center-vertically-xs center-vertically-md'}>
        <div>
          <BallStrikeOut
            letter={'B'}
            amount={balls}
            total={3}
            image={'ball'}
            variant={variant}
          />
          <BallStrikeOut
            letter={'S'}
            amount={strikes}
            total={2}
            image={'strike'}
            variant={variant}
          />
          <BallStrikeOut
            letter={'O'}
            amount={outs}
            total={2}
            image={'out'}
            variant={variant}
          />
        </div>
      </Col>

      <Col xs={5} className={'runners center-vertically-xs center-vertically-md'}>
        <img className={'lazyload'} src={getRunnersSituationImage([ runner1, runner2, runner3 ], variant)} alt={'Runners situation'}/>
      </Col>
    </Row>
  )
}

Situation.propTypes = {
  situation: PropTypes.shape({
    balls: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    strikes: PropTypes.number.isRequired,
    outs: PropTypes.number.isRequired,
    runner1: PropTypes.number.isRequired,
    runner2: PropTypes.number.isRequired,
    runner3: PropTypes.number.isRequired
  }).isRequired,
  variant: PropTypes.string
}
