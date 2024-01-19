import React, { useCallback } from 'react';
import { useSectionFunctions } from '../../hooks/HooksSection';
import { SectionCode } from '../../types/SectionType';
import ButtonDelete from '../Button/ButtonDelete';
import { OnDelete } from '../Counter/DeleteCounterButton';

type DeleteSectionButtonInput = {
  sectionCode: SectionCode;
  label: string;
  onDelete: OnDelete;
}

// Button that can be used to delete a section
const DeleteSectionButton: React.FC<DeleteSectionButtonInput> = ({sectionCode, label, onDelete}) => {

  const { removeSection } = useSectionFunctions()

  const _onDelete = useCallback(async ()=>{
    await removeSection(sectionCode);
    onDelete();
  }, [onDelete, removeSection, sectionCode]);

  return (
    <ButtonDelete onClick={_onDelete} label={label}/>
  );
};

export default DeleteSectionButton;
