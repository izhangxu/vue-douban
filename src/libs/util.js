export default {
  getParams(key, strURL) {
    strURL = strURL || window.location.search;
    /* eslint-disable-next-line */
    return new RegExp(`(^|\\?|&)${  key  }=([^&]*)(\\s|&|$)`, 'i').test(strURL) ?
      decodeURIComponent(RegExp.$2.replace(/\+/g, ' ')) : '';
  },
  formatTime(date) {
    date = new Date(parseInt(date));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `${[year, month, day].map(this.formatNumber).join('/')} ${[hour, minute, second].map(this.formatNumber).join(':')}`;
  },
  formatNumber(n) {
    n = n.toString();
    return n[1] ? n : `0${n}`;
  },
  trim(str) {
    return str.replace(/^\s*(.+[^\s])\s*$/, '$1');
  },
  debounce(func, wait, immediate) {
    // immediate默认为false
    /* eslint-disable */
    let timeout,
      args,
      context,
      timestamp,
      result;
    let later = function () {
      // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
      const last = Date.now() - timestamp;
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };
    return function () {
      context = this;
      args = arguments;
      timestamp = Date.now();
      // 第一次调用该方法时，且immediate为true，则调用func函数
      const callNow = immediate && !timeout;
      // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }
      return result;
    };
    /* eslint-enable */
  },
};
