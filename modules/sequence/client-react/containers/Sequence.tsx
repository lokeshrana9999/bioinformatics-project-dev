import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import SequenceView from '../components/SequenceView';

interface SequenceProps {
  t: TranslateFunction;
}

class Sequence extends React.Component<SequenceProps> {
  public render() {
    return <SequenceView {...this.props} />;
  }
}

export default translate('sequence')(Sequence);
