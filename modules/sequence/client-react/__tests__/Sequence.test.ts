import { expect } from 'chai';

import { updateContent, Renderer } from '@gqlapp/testing-client-react';

describe('Sequence UI works', () => {
  const renderer = new Renderer({});
  const app = renderer.mount();
  renderer.history.push('/Sequence');
  const content = updateContent(app.container);

  it('Sequence page renders on mount', () => {
    // tslint:disable:no-unused-expression
    expect(content).to.not.be.empty;
  });

  it('Sequence page has title', async () => {
    expect(content.textContent).to.include('Hello, This is the Sequence module');
  });
});
