import { Config as Configuration } from 'bili';

const configuration: Configuration = {
  input: 'src/index.ts',
  output: {
    format: ['es', 'esm', 'cjs', 'commonjs'],
    moduleName: 'react-components',
  },
  externals: [
    '@blb-ventures/library',
    '@date-io/core',
    /@material-ui*/,
    'brazilian-values',
    'dayjs',
    'event-emitter',
    'jspdf',
    'material-table',
    'moment',
    /next*/,
    'react',
    'react-beautiful-dnd',
    'react-dom',
    'react-is',
    'react-lazyload',
    'react-scrollspy',
    '@emotion/styled',
  ],
  // plugins: {
  //   typescript2: {
  //     clean: true,
  //     tsconfig: './tsconfig.build.json',
  //     useTsconfigDeclarationDir: true,
  //   },
  // },
};

export default configuration;
