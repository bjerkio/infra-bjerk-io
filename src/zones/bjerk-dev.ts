import * as gcp from '@pulumi/gcp';

export const managedZone = new gcp.dns.ManagedZone(
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

