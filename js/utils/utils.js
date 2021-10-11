export const defaultDomain = (domain) => {
    const _default = `${window.location.protocol}//${window.location.host}`;
    return domain || _default;
}

export const localDate = (date, tz = null) => {
    const $date = moment.tz(date, tz);
    return $date;
}
