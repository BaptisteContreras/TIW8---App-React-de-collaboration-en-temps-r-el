export function parseBoard(url) {
  const match = url.match('#/[\\w]*/board/([\\w|-]*)');
  return match ? match[1] : null;
}

export function parsePostit(url) {
  const match = url.match('#/[\\w]*/board/[\\w]*/postit/([\\w|-]*)');
  return match ? match[1] : null;
}

export function parseDevice(url) {
  const match = url.match('#/([\\w]*)');
  return match ? match[1] : null;
}
