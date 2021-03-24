import { FC, Fragment } from 'react';

interface NewlineToBRProps {
  text: string;
}
export const NewlineToBR: FC<NewlineToBRProps> = ({ text }) => {
  return (
    <>
      {text.split('\n').map((it, idx, arr) => (
        <Fragment key={idx}>
          {it}
          {idx !== arr.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
};
