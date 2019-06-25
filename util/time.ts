import moment from 'moment';

export default {
  wait: (ms: number) => {
    return new Promise((reslove, reject) => {
      setTimeout(reslove, ms);
    });
  },
  dateMonth(date: string) {
    return moment(date).format('YYYY.MM');
  },
  dateDay(date: string) {
    return moment(date).format('YYYY.MM.DD');
  }

};
