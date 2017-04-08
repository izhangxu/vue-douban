<template>
    <div class="wrap y_bg01">
        <footer-Box :footer-cur="footerCur"></footer-box>
    </div>
</template>
<script type="text/javascript">
import FooterBox from './FooterBox'
export default {
    data() {
            return {
                footerCur: '我的'
            }
        },
        components: {
            FooterBox
        }
}
</script>
