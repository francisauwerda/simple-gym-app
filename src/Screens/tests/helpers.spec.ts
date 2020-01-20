/* eslint-disable no-undef */
import moment from 'moment';
import { mocked } from 'ts-jest/utils';

import DateWrapper from '../../wrappers/dateWrapper';
import { getLastModifiedText } from '../helpers';

jest.mock('../../wrappers/dateWrapper');

describe('helpers', () => {
  describe('getLastModifiedText()', () => {
    const TODAY_AT_9_30 = '2020-01-15 09:30:00';

    beforeAll(() => {
      mocked(DateWrapper.createDate).mockImplementation(
        () => new Date(TODAY_AT_9_30),
      );
    });

    afterAll(() => {
      jest.resetAllMocks();
    });

    it('should return Today if the date is from the same day', () => {
      const todayAt0730 = moment(DateWrapper.createDate()).clone().subtract(2, 'hours');
      const lastModifiedText = getLastModifiedText(todayAt0730);

      expect(lastModifiedText).toEqual('Today');
    });

    it('should return 1 day ago if the date is from yesterday', () => {
      const yesterdayAt2330 = moment(DateWrapper.createDate()).clone().subtract(10, 'hours');
      const lastModifiedText = getLastModifiedText(yesterdayAt2330);

      expect(lastModifiedText).toEqual('1 day ago');
    });

    it('should return 7 days ago if the date is from 7 days and 2 hours ago', () => {
      const sevenDaysAndTwoHoursAgo = moment(DateWrapper.createDate())
        .clone()
        .subtract(7, 'days')
        .subtract(2, 'hours');
      const lastModifiedText = getLastModifiedText(sevenDaysAndTwoHoursAgo);

      expect(lastModifiedText).toEqual('7 days ago');
    });

    it('should return 7 days ago if the date is from 7 days ago plus 2 hours', () => {
      const sevenDaysAndTwoHoursAgo = moment(DateWrapper.createDate())
        .clone()
        .subtract(7, 'days')
        .add(2, 'hours');
      const lastModifiedText = getLastModifiedText(sevenDaysAndTwoHoursAgo);

      expect(lastModifiedText).toEqual('7 days ago');
    });

    it('should return an empty string when no date is given', () => {
      expect(getLastModifiedText(null)).toEqual('');
    });
  });
});
