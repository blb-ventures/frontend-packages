import { Config as Configuration } from 'bili';

const configuration: Configuration = {
  input: 'src/index.ts',
  output: {
    format: ['es', 'esm', 'cjs', 'commonjs'],
    moduleName: 'library',
  },
  externals: ['date-fns', 'dayjs', '@blb-ventures/react-components'],
  // plugins: {
  //   typescript2: {
  //     clean: true,
  //     tsconfig: './tsconfig.build.json',
  //     useTsconfigDeclarationDir: true,
  //   },
  // },
};

export default configuration;
