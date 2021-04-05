import * as gcp from '@pulumi/gcp';

export const gcpProvider = new gcp.Provider('google-provider', {
  project: 'bjerk-io',
});
