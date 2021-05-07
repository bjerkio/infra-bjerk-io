import * as pulumi from '@pulumi/pulumi';
import * as github from '@pulumi/github';
import * as gcp from '@pulumi/gcp';
import { githubProvider } from './github';

const serviceAccount = new gcp.serviceaccount.Account('deploy-sa', {
  accountId: 'frontend-deploy',
});

const saKey = new gcp.serviceaccount.Key('sa-key', {
  serviceAccountId: serviceAccount.accountId,
});

new gcp.projects.IAMMember('deploy-firebase-iam', {
  member: pulumi.interpolate`serviceAccount:${serviceAccount.email}`,
  role: 'roles/firebasehosting.admin',
});

new github.ActionsSecret(
  'deploy-url',
  {
    secretName: 'GOOGLE_PROJECT_SA_KEY',
    plaintextValue: saKey.privateKey,
    repository: 'website',
  },
  { provider: githubProvider },
);
