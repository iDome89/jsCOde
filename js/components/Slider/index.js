import React from 'react'
import PropTypes from 'prop-types'
import { Glyphicon } from 'react-bootstrap'
import SlickSlider from 'react-slick'
import classNames from 'classnames'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Arrow = ({ direction, onClick }) => (
  <Glyphicon
    glyph={`chevron-${direction}`}
    className={classNames(
      'arrow',
      direction
    )}
    onClick={onClick}
  />
)

Arrow.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired
}

const getSlickSettings = (count = []) => ({
  dots: false,
  infinite: count.length > 6,
  slidesToScroll: 3,
  initialSlide: 0,
  speed: 300,
  cssEase: 'linear',
  prevArrow: <Arrow direction={'left'}/>,
  nextArrow: <Arrow direction={'right'}/>,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToScroll: 1,
        arrows: false,
        infinite: count.length > 3
      }
    },
    {
      breakpoint: 769,
      settings: {
        slidesToScroll: 2,
        infinite: count.length > 4
      }
    }
  ]
})

export const Slider = ({ className, children, ...props }) => (
  <SlickSlider
    className={classNames(
      'slider',
      className
    )}
    {...getSlickSettings(children)}
    {...props}
  >
    {children}
  </SlickSlider>
)
