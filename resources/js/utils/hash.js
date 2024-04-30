export function parseLocationHash() {
  const hash = window.location.hash;
  return hash.split('&').reduce(function (res, item) {
    const parts = decodeURIComponent(item).split('=');
    if (parts[0].length) {
      res[parts[0].replace('#', '')] = parts[1];
    }
    return res;
  }, {});
}

function generateState(hashUrl) {
  const currentUrl = window.state?.url || window.location.pathname || "";

  // Replace hash URL in the current URL
  const newUrl = currentUrl.replace(/#.*$/, '') + hashUrl;
  return {...(history.state || {}), url: newUrl}
}

export function updateLocationHash(data) {
  const out = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      out.push(key + '=' + encodeURIComponent(data[key]));
    }
  }

  const hashUrl = '#' + out.join('&')
  const newState = generateState(hashUrl);
  history.pushState(newState, '', newState.url);
}
