import { useLocale, useI18n } from '..';

describe('Locale', () => {
  test('should be use zh-cn', async () => {
    const { t } = useI18n();
    expect(t('datePicker.today')).toMatchInlineSnapshot('"今天"');
  });
});
