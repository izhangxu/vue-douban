export default {
    getParams (key, strURL) {
        strURL = strURL || window.location.search;
        return new RegExp("(^|\\?|&)" + key + "=([^&]*)(\\s|&|$)", "i").test(strURL) ?
            decodeURIComponent(RegExp.$2.replace(/\+/g, " ")) : "";
    }

}