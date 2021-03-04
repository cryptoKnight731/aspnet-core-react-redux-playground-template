import { Fragment } from 'react';
import styled from 'styled-components';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ToastMessage = styled.span`
  font-size: 1.075rem;
`;

const ToastIcon = styled(FontAwesomeIcon)`
  font-size: 1.25rem;
  margin: 0 .75rem 0 .5rem;
`;

const renderToastifyContent = (message: string, icon?: IconProp) => (
  <Fragment>
    {icon && <ToastIcon icon={icon} />}
    <ToastMessage>{message}</ToastMessage>
  </Fragment>
);

export default renderToastifyContent;