export const getBaseUrl = () => {
  const { hostname, protocol, port } = window.location;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${protocol}//${hostname}:${port}`;
  }

  return `${protocol}//${hostname}`;
};