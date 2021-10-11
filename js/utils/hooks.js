const allowedLanguages = ['en', 'es', 'ja', 'ko', 'zh', 'it']

export const useLang = (defaultLang = 'en') => {
    var lang = window.location.pathname.split('/');

    lang = lang.filter(Boolean);

    if (lang){
        lang = lang[0] ? lang[0] : false;
    }

    if(lang && allowedLanguages.includes(lang)) {
        return lang
    }

    return defaultLang
}
