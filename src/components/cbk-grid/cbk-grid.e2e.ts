import { newE2EPage } from '@stencil/core/testing';

describe('cbk-grid', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<cbk-grid></cbk-grid>');
    const element = await page.find('cbk-grid');
    expect(element).toHaveClass('hydrated');
  });

  it('renders not configured', async () => {
    const page = await newE2EPage();

    await page.setContent('<cbk-grid></cbk-grid>');
    const component = await page.find('cbk-grid');
    const element = await page.find('cbk-grid >>> div');
    expect(element.textContent).toEqual(`Not configured!`);

    component.setProperty('config', {
      multiSelect: false,
      columns: [{
        key: 'col1',
        type: 'text'
    }]});
    await page.waitForChanges();
    const table = await page.find('cbk-grid >>> table');
    expect(table).not.toBeNull;

  });
});
