<template>
    <div class="select">
        <span>{{selected}}</span>
        <select name="make" v-model="selected">
            <option :value="item" v-for="item in options">{{item}}</option>
        </select>
    </div>
</template>
<script>
export default {
    props: ['typeOptions'],
    data() {
        return {
            selected: this.typeOptions.default,
            options: this.typeOptions.options
        }
    },
    watch: {
        selected: function(val) {
            console.log(val)
        }
    }
}
</script>
<style type="text/css">
.select {
    height: 30px;
    line-height: 30px;
    display: inline-block;
    /* 1 */
    position: relative;
    /* 2 */
    vertical-align: middle;
    /* 3 */
    padding: 0;
    /* 4 */
    overflow: hidden;
    /* 5 */
    background: #fff;
    color: #555;
    /*border: 1px solid #aaa;*/
    text-shadow: none;
    width: 100%;
    text-align: center
    /*-moz-border-radius: 4px;*/
    /*-webkit-border-radius: 4px;*/
    /*border-radius: 4px;*/
    /*-moz-transition: box-shadow 0.25s ease;*/
    /*-o-transition: box-shadow 0.25s ease;*/
    /*-webkit-transition: box-shadow 0.25s ease;*/
    /*transition: box-shadow 0.25s ease;*/
    /* 6 */
    /* 6 */
}

.select:before {
    position: absolute;
    /* 7 */
    /* 7 */
    right: 0.5em;
    /* 7 */
    pointer-events: none;
    /* 8 */
}

.select select {
    position: absolute;
    opacity: 0;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    cursor: pointer;
    /* 9 */
    padding: 0.5em;
    /* 11 */
    width: 100%;
    /* 12 */
    border: none;
    /* 13 */
    background: transparent;
    /* 13 */
    background-image: none;
    /* 13 */
    -webkit-appearance: none;
    /* 13 */
    -moz-appearance: none;
    /* 13 */
    appearance: none;
    /* 13 */
    text-indent: 0.01px;
    /* 14 */
    text-overflow: '';
    /* 14 */
    width: 160% \9;
    /* 15 */
}

.select select:focus {
    outline: none;
    /* 16 */
}


/****************************
 ****************************
 ****************************
 * Helpers
 */

.select:before {
    font-family: "icons";
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.icon--down:before,
.select:before {
    content: "\e600";
}

@font-face {
    font-family: 'icons';
    src: url(data:application/font-woff;charset=utf-8;base64,d09GRk9UVE8AAARgAAoAAAAABBgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAAA9AAAANgAAADYZbVvCE9TLzIAAAHMAAAAYAAAAGAIIvy2Y21hcAAAAiwAAABMAAAATBpVzFdnYXNwAAACeAAAAAgAAAAIAAAAEGhlYWQAAAKAAAAANgAAADYAl8viaGhlYQAAArgAAAAkAAAAJANuAeZobXR4AAAC3AAAABQAAAAUAwAAdG1heHAAAALwAAAABgAAAAYABVAAbmFtZQAAAvgAAAFFAAABRVcZpu5wb3N0AAAEQAAAACAAAAAgAAMAAAEABAQAAQEBCGljb21vb24AAQIAAQA6+BwC+BsD+BgEHgoAGVP/i4seCgAZU/+LiwwHi2v4lPh0BR0AAAB2Dx0AAAB7ER0AAAAJHQAAAM8SAAYBAQgPERMWG2ljb21vb25pY29tb29udTB1MXUyMHVFNjAwAAACAYkAAwAFAQEEBwoNTPyUDvyUDvyUDvuUDvgg958VgYD7AiOLi4aFg4iEi4SLg46GkYuL+wLzgZaAloqel5eWlpqMmX8I7yvv6wWZl5qKloCXf4p4gIAIDviUFPiUFYsMCgADAgABkAAFAAABTAFmAAAARwFMAWYAAAD1ABkAhAAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAEAAAOYAAeD/4P/gAeAAIAAAAAEAAAAAAAAAAAAAACAAAAAAAAIAAAADAAAAFAADAAEAAAAUAAQAOAAAAAoACAACAAIAAQAg5gD//f//AAAAAAAg5gD//f//AAH/4xoEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAQAAss1nQF8PPPUACwIAAAAAAM/2xdgAAAAAz/bF2AAAAAABjAE1AAAACAACAAAAAAAAAAEAAAHg/+AAAAIAAAAAAAGMAAEAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAQAAAAIAAHQAAFAAAAUAAAAAAA4ArgABAAAAAAABAA4AAAABAAAAAAACAA4ARwABAAAAAAADAA4AJAABAAAAAAAEAA4AVQABAAAAAAAFABYADgABAAAAAAAGAAcAMgABAAAAAAAKADQAYwADAAEECQABAA4AAAADAAEECQACAA4ARwADAAEECQADAA4AJAADAAEECQAEAA4AVQADAAEECQAFABYADgADAAEECQAGAA4AOQADAAEECQAKADQAYwBpAGMAbwBtAG8AbwBuAFYAZQByAHMAaQBvAG4AIAAxAC4AMABpAGMAbwBtAG8AbwBuaWNvbW9vbgBpAGMAbwBtAG8AbwBuAFIAZQBnAHUAbABhAHIAaQBjAG8AbQBvAG8AbgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==) format("woff");
    font-weight: normal;
    font-style: normal;
}
</style>
