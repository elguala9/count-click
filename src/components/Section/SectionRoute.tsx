import React from 'react';
import { RouteComponentProps } from 'react-router';

interface SectionRouteInput
  extends RouteComponentProps<{
    id: string;
  }> {}
// The componenet that retrive the section from the data
const SectionRoute: React.FC<SectionRouteInput> = ({match}) => {


  return (
    <>{match.params.id}</>
  );
};

export default SectionRoute;
