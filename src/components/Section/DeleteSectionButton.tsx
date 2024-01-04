import React from 'react';
import { useSectionFunctions } from '../../hooks/HooksSection';
import { SectionCode } from '../../types/SectionType';
import ButtonDelete from '../Button/ButtonDelete';

type DeleteSectionButtonInput = {
  sectionCode: SectionCode;
}

// Button that can be used to delete a section
const DeleteSectionButton: React.FC<DeleteSectionButtonInput> = ({sectionCode}) => {

  const { removeSection } = useSectionFunctions()

  return (
    <ButtonDelete onClick={()=>removeSection(sectionCode)}/>
  );
};

export default DeleteSectionButton;
