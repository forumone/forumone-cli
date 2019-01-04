import { networkInterfaces } from 'os';

// When running Xdebug in a container, the 'connect_back' setting finds the Docker network
// gateway address, which is fine on Linux but can cause issues on Mac and other platforms.
// What we do here is find a non-loopback IPv4 address and force Xdebug to use that in an
// environment variable.
//
// Some users alias their loopback devices to have a specific address, but we can't guarantee
// that this is an option (especially in corporate/gov't networks where the user lacks admin
// rights). Some testing has revealed that as long as we pick an interface with an address as found
// by os.networkInterfaces(), we can use it -- even if it's a virtual device such as a `vboxnet'
// driver.
//
// Further reading:
// * https://gist.github.com/chadrien/c90927ec2d160ffea9c4
// * https://forums.docker.com/t/ip-address-for-xdebug/10460
function findNetworkAddress(): string | undefined {
  const iface = Object.values(networkInterfaces())
    .reduce((list, info) => [...list, ...info])
    .find(info => info.family === 'IPv4' && info.address !== '127.0.0.1');

  return iface && iface.address;
}

export default findNetworkAddress;
