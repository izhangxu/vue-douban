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
    formatNumber (n) {
	    n = n.toString();
	    return n[1] ? n : '0' + n;
	},
    trim (str) {
        return str.replace(/^\s*(.+[^\s])\s*$/, '$1');
    }
}
