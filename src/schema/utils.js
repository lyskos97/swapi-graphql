const fetch = require('node-fetch').default;

export async function loadData(url) {
  const res = await fetch(url);
  const data = await res.json();
  if (data && data.count && data.results) {
    return data.results;
  }
  return data;
}

export async function loadBulk(urls) {
  return Promise.all(urls.map(u => loadData(u)));
}
