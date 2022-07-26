import * as gcp from '@pulumi/gcp';

export const zone = new gcp.dns.ManagedZone(
  'bjerk-dev-zone',
  {
    name: 'bjerk-dev',
    description: '',
    dnsName: 'bjerk.dev.',
    dnssecConfig: { state: 'on' },
    forceDestroy: false,
    visibility: 'public',
  },
  { protect: true },
);


const managedZone = zone.name;
const ttl = 300;
const opts = { protect: true };

new gcp.dns.RecordSet(
  'k8s01-bjerk-dev-a',
  {
    managedZone,
    name: 'k8s01.bjerk.io.',
    rrdatas: ['185.243.218.58'],
    ttl,
    type: 'A',
  },
  opts,
);

new gcp.dns.RecordSet(
  'k8s01-bjerk-dev-aaaa',
  {
    managedZone,
    name: 'k8s01.bjerk.io.',
    rrdatas: ['2a03:94e0:ffff:185:243:218::58'],
    ttl,
    type: 'AAAA',
  },
  opts,
);
