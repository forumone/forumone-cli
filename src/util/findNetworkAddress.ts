import { networkInterfaces } from 'os';

function findNetworkAddress(): string | undefined {
  const iface = Object.values(networkInterfaces())
    .reduce((list, info) => [...list, ...info])
    .find(info => info.family === 'IPv4' && info.address !== '127.0.0.1');

  return iface && iface.address;
}

export default findNetworkAddress;
