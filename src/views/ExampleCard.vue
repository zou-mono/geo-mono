<template>
<div class="example-list-item">
    <a target="_blank" class="example-link" :href="exampleLink">
        <img class="chart-area" src="../assets/placeholder.jpg" :data-src="screenshotURL" />
        <h4 class="example-title">{{title}}</h4>
        <h5 class="example-subtitle" v-if="showSubtitle">{{subtitle}}</h5>
    </a>
</div>
</template>

<script>

// import {store} from '../common/store';
import {SUPPORT_WEBP, URL_PARAMS} from '../store/config';
import store from '@/store'

export default {
    name: 'example-card',

    props: ['example'],

    computed: {

        title() {
            return (this.$store.state.locale === 'zh' ? this.example.titleCN : this.example.title)
                || this.example.title || '';
        },

        showSubtitle() {
            return this.$store.state.locale === 'zh';
        },

        subtitle() {
            return this.example.title || '';
        },

        exampleTheme() {
            const example = this.example;
            return example.theme || (this.$store.state.darkMode ? 'dark' : '');
        },

        exampleLink() {
            const example = this.example;
            const hash = ['c=' + example.id];
            const exampleTheme = this.exampleTheme;
            if (example.isGL) {
                hash.push('gl=1');
            }
            if (exampleTheme) {
                hash.push('theme=' + exampleTheme);
            }
            if ('local' in URL_PARAMS) {
                hash.push('local');
            }
            if ('useDirtyRect' in URL_PARAMS) {
                hash.push('useDirtyRect');
            }
            let locale =  store.state.locale
            // return `./${locale}/editor.html?` + hash.join('&');
            // return `./editor.html?` + hash.join('&');
            return `./editor/${locale}/`
        },

        screenshotURL() {
            const example = this.example;
            const themePostfix = this.exampleTheme ? ('-' + this.exampleTheme) : '';
            const ext = SUPPORT_WEBP ? 'webp' : 'png';
            const folder = example.isGL ? 'data-gl' : 'data';
            return `${this.$store.state.cdnRoot}/img/${folder}/thumb${themePostfix}/${example.id}.${ext}?_v_=${this.$store.state.version}`;
        }
    }
}
</script>

<style lang="scss">

@import "../style/color.scss";

.example-list-item {
    width: 100%;
    max-width: 350px;
    margin-bottom: 30px;

    border-radius: 2px;

    .example-link {
        position: relative;
        display: block;

        .chart-area {
            width: 100%;
            height: 100%;
            border-radius: 5px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
            margin-top: 10px;
        }

        .example-title {
            color: $clr-primary;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            padding: 10px 10px 2px 10px;
            margin: 0;
            font-weight: normal;
            font-size: 14px;
            text-align: center;
        }

        .example-subtitle {
            font-size: 12px;
            text-align: center;
            color: #aaa;
            font-weight: normal;
            // font-weight: 200;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin: 3px 0 0 0;
        }
    }

    .example-info {
        padding: 5px 0;

        font-weight: bold;

        .chart-icon {
            float: right;

            .chart-delete {
                display: none;

                transition: 1s;
            }
        }
    }

    &:hover .example-info .chart-icon .chart-delete {
        display: block;

        text-decoration: none;
    }
}
</style>