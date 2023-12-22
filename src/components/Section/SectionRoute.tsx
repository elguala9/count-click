import React from 'react';
import { RouteComponentProps } from 'react-router';
import SectionPage from './SectionPage';

interface SectionRouteInput
  extends RouteComponentProps<{
    id: string;
  }> {}
// The componenet is used when rounting to the section page
const SectionRoute: React.FC<SectionRouteInput> = ({match}) => {


  return (
    <SectionPage sectionCode={match.params.id}/>
  );
};

export default SectionRoute;
