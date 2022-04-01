import React, { FC } from 'react';
import './App.css';
import { caseEnum } from '@monorepo/common';

interface ICaseProps {
  state: caseEnum;
  onClick: () => void;
}

const Case: FC<ICaseProps> = ({ state, onClick }) => {
  return (
    <button
      style={{
        border: '1px solid',
        height: 100,
        width: 100,
        fontSize: '30px',
        cursor: state === caseEnum.EMPTY ? 'pointer' : '',
      }}
      type={'button'}
      onClick={onClick}
    >
      {state === caseEnum.CROSS && 'X'}
      {state === caseEnum.ROUND && 'O'}
    </button>
  );
};

export default Case;
