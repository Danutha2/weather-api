import type { AWS } from '@serverless/typescript';

import weather from '@functions/weather';

const serverlessConfiguration: AWS = {
  service: 'weather-api',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild','serverless-domain-manager'],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      OWM_API_KEY: '59431ff6f23df46b0e2ab5c55f2aef51'

    },
  },
  // import the function via paths
  functions: { weather },
  package: { individually: true },
  
  custom: {
    customDomain :{
    domainName: 'weather.danuthaimbulpitiya.online',
    certificateName: '*.danuthaimbulpitiya.online',
    createRoute53Record: true,
    endpointType: 'REGIONAL',
    autoDomain: false
    },

    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node20',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
