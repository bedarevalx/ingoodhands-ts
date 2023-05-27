import React from 'react';

interface IAdminPanelProps {
  classNames?: string[];
}

export const HistoryList = (props: IAdminPanelProps) => {
  return (
    <div className='history-list'>
      <h3 className='pending-list__title'>История проверок</h3>
    </div>
  );
};
