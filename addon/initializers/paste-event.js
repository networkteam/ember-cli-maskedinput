export function initialize(application) {
  let customEvents = application.get('customEvents') || {};
  customEvents.paste = 'paste';
  application.set('customEvents', customEvents);
}

export default {
  name: 'paste-event',
  initialize
};
