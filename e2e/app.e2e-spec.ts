import { JustCodedPage } from './app.po';

describe('just-coded App', function() {
  let page: JustCodedPage;

  beforeEach(() => {
    page = new JustCodedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
