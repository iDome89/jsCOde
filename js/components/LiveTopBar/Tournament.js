import React from 'react'
import { useSelector } from 'react-redux'

import { useLang } from '../../utils/hooks'
import { defaultDomain } from '../../utils/utils'

import { getTournamentById } from '../../selectors/tournament'

const getTournamentLogo = logo => {
  if(logo && logo.length) {
    return `https://static.wbsc.org/assets/images/${logo.slice(logo.lastIndexOf('/') + 1)}`
  }
}

export const Tournament = ({ id }) => {
  const lang = useLang()
	const data = useSelector((state) => getTournamentById(state, id))

	if (!data) {
		return null
	}

  return (
    <div className={'top-bar-tournament-logo'}>
      <a
        href={`${defaultDomain(data.domain)}/${lang}/events/${data.tournamentkey}/schedule-and-results`}
      >
        <img src={getTournamentLogo(data.logo)} alt={`${data.name} tournament logo`}/>
      </a>
    </div>
  )
}
