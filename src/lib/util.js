export default {
    getParams(key, strURL) {
        strURL = strURL || window.location.search;
        return new RegExp("(^|\\?|&)" + key + "=([^&]*)(\\s|&|$)", "i").test(strURL) ?
            decodeURIComponent(RegExp.$2.replace(/\+/g, " ")) : "";
    },
    formatTime(date) {
        date = new Date(parseInt(date));
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':');
    },
    formatNumber(n) {
        n = n.toString();
        return n[1] ? n : '0' + n;
    },
    trim(str) {
        return str.replace(/^\s*(.+[^\s])\s*$/, '$1');
    },
    debounce(func, wait, immediate) {
        // immediate默认为false
        var timeout, args, context, timestamp, result;
        var later = function() {
            // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
            var last = Date.now() - timestamp;
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
        return function() {
            context = this;
            args = arguments;
            timestamp = Date.now();
            // 第一次调用该方法时，且immediate为true，则调用func函数
            var callNow = immediate && !timeout;
            // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };
    }
}
