import moment from 'moment';

export default {
  wait: (ms: number) => {
    return new Promise((reslove, reject) => {
      setTimeout(reslove, ms);
    });
  },
  dateMonth(date: string | number) {
    return moment(date).format('YYYY.MM');
  },
  dateDay(date: string | number) {
    return moment(date).format('YYYY.MM.DD');
  },
  dateFormat(date: string | number, format: string) {
    return moment(date).format(format);
  }

};
