async function domain(url) {
  return url.split('/')[2].split('.')[0];
}

module.exports = { domain: domain };
