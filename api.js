import moment from 'moment';
import { Constants } from 'expo';
import uuid from 'uuid';

const { manifest } = Constants;
const api = manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(':').shift().concat(':3000')
    : 'productionurl.com'

export const url = `http://${api}/events`;
console.log('request url', url)

export function getEvents() {
    return fetch(url)
        .then(response => response.json())
        .then(events => events.map(e => ({ ...e, date: new Date(e.date) })));
}

export function saveEvent({ title, date}) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      title,
      date,
      id: uuid(),
    }),
    headers: new Headers({
      'Content-Type': 'application/json',
    })
  })
  .then(res => res.json())
  .catch(err => console.log(err));
}

export function formatDateTime(dateString) {
    const parsed = moment(new Date(dateString));

    if (!parsed.isValid()) {
        return dateString;
    }
    return parsed.format('H A on D MMM YYYY');
}

export function formatDate(dateString) {
    const parsed = moment(new Date(dateString));

    if (!parsed.isValid()) {
        return dateString;
    }

    return parsed.format('D MMM YYYY');
}

export function getCountdownParts(eventDate) {
    const duration = moment.duration(moment(new Date(eventDate)).diff(new Date()));
    return {
        days: parseInt(duration.as('days')),
        hours: duration.get('hours'),
        minutes: duration.get('minutes'),
        seconds: duration.get('seconds'),
    };
}