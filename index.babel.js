const config = {
  authBase: null,
  authNamespace: null,
};

export const configurePoprocks = options => (Object.assign(config, options));

const getUrl = provider => `${config.authBase}/${config.authNamespace}/${provider.toLowerCase()}`;

const getName = provider => `Authenticating with ${provider.toLowerCase()}`;

const getSettings = (provider, settings) => {
  const base = {
    scrollbars: 'no',
    toolbar: 'no',
    location: 'no',
    titlebar: 'no',
    directories: 'no',
    status: 'no',
    menubar: 'no',
    top: '100',
    left: '100',
    width: '600',
    height: '500',
  };
  return settings ? Object.assign({}, base, settings) : base;
};

const getEventUtils = () => {
  if (window.addEventListener) {
    return {
      addListener: window.addEventListener,
      message: 'message',
    };
  }
  return {
    addListener: window.attachEvent,
    message: 'onmessage',
  };
};

export default (provider, url, name, settings) => (
  new Promise((resolve, reject) => {
    const popup = window.open(
      url || getUrl(provider),
      name || getName(provider),
      getSettings(provider, settings),
    );

    const {
      addListener,
      message,
    } = getEventUtils();

    addListener(message, ({ origin, data }) => {
      if (origin !== config.authBase) {
        reject('Unknown message origin');
      }
      popup.close();
      resolve(data);
    });
  })
);
