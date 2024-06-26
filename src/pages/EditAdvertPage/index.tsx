import React, { useEffect } from 'react';
import HeaderLayout from '../../layouts/HeaderLayout';
import { EditForm } from '../../features/EditAdvert';

interface IEditAdvertPageProps {
  isEditing?: boolean;
}

const EditAdvertPage = (props: IEditAdvertPageProps) => {
  return (
    <HeaderLayout menuType='profile'>
      <EditForm isEditing={props.isEditing} />
    </HeaderLayout>
  );
};

export default React.memo(EditAdvertPage);
