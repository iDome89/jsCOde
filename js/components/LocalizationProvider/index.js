import React from 'react';
import { IntlProvider } from "react-intl";

import en from '../../translations/en'
import es from '../../translations/es'
import fr from '../../translations/fr'
import ja from '../../translations/ja'
import ko from '../../translations/ko'
import zh from '../../translations/zh'
import it from '../../translations/it'

const messages = {
	en,
	es,
	fr,
	ja,
	ko,
	zh,
	it
}

export const LocalizationProvider = ({ children, lang }) => (
	<IntlProvider locale={lang} messages={messages[lang]}>
		{children}
	</IntlProvider>
);
