<template>
    <div>
        <!--search-->
        <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img :src="locationIcon" width="80%" class="location-icon" alt="">
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5">
                    <van-button size="mini" class="search-btn">查找</van-button>
                </van-col>
            </van-row>
        </div> 
        <!--banner-->
        <div class="swiper-area">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                    <img v-lazy="banner.image" width="100%" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!--bar-->
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" alt="" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <!--adbanner-->
        <div>
            <img v-lazy="adbanner" width="100%" alt="">
        </div>
        <!--Commodity recommendation-->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" width="80%" alt="">
                            <div>{{item.goodsName}}</div>
                            <div>¥{{item.price | moneyFilter}}(¥{{item.mallPrice | moneyFilter}})</div>
                        </div>
                    </swiper-slide>    
                </swiper>  
            </div>
        </div>
        <!--floor-->
        <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
        <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
        <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
        <!--hot-->
        <div class="hot-area">
            <div class="hot-title">商品热卖</div>
            <div class="hot-goods">
                <van-list>
                    <van-row class="hot-con" gutter="20">
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                            <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import "swiper/dist/css/swiper.css"
    import {swiper,swiperSlide} from "vue-awesome-swiper"
    import floorComponent from '../component/floorComponent.vue'
    import {toMoney} from "@/filter/moneyFilter.js"
    import goodsInfo from '../component/goodsinfoComponent.vue'
    import url from "@/serviceAPI.config.js"
    export default {
        data() {
            return {
                swiperOption:{
                    slidesPerView:3
                },
                locationIcon:require("../../assets/images/location.png"),
                adbanner:"",        //banner
                bannerPicArray:[],  //nav
                category:[],        //ad
                recommendGoods:[],
                floor1:[],
                floor2:[],
                floor3:[],
                floorName:{},       //楼层名称
                hotGoods:[]
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        components:{swiper,swiperSlide,floorComponent,goodsInfo},
        created(){
            axios({
                url:url.getShopingMallInfo,
                method:"get",
            })
            .then(response=>{
                console.log(response)
                if(response.status == 200){
                    this.category = response.data.data.category;
                    this.adbanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
                    this.bannerPicArray = response.data.data.slides;
                    this.recommendGoods = response.data.data.recommend;
                    this.floor1 = response.data.data.floor1;
                    this.floor2 = response.data.data.floor2;
                    this.floor3 = response.data.data.floor3;
                    this.floorName = response.data.data.floorName;
                    this.hotGoods = response.data.data.hotGoods;
                }
            })
            .catch(error=>{
                console.log(error)
            })
        }
    }
</script>

<style scoped>
    .search-bar{
        height:2.2rem;
        background:#f3207f;
        line-height: 2.2rem;
        overflow:hidden;
    }
    .location-icon{
        padding-top:.2rem;
        padding-left:.2rem;
    }
    .search-input{
        width:100%;
        height:1.3rem;
        border-top:0px;
        border-left:0px;
        border-right:0px;
        border-bottom: 1px solid #fff;
        background-color: #f3207f;
        color:#fff;
    }
    .swiper-area{
        clear: both;
        max-height: 10rem;
        overflow: hidden;
    }
    .type-bar{
        background-color: #fff;
        margin:0 .3rem .3rem;
        border-radius: .3rem;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .type-bar div{
          width:20%;
        padding:.3rem;
        font-size: 12px;
        text-align: center;
    }
    .recommend-area{
        background-color: #fff;
        margin-top:.3rem;
    }
    .recommend-title{
        border-bottom: 1px solid #ccc;
        font-size: 14px;
        padding:.2rem;
        color:#f3207f;
    }
    .recommend-body{
        border-bottom: 1px solid #eee;
    }
    .recommend-item{
        width:99%;
        border-right: 1px solid #eee;
        font-size:12px;
        text-align: center;
    }
    .hot-area{
        text-align: center;
        font-size: 14px;
        height:1.8rem;
        line-height: 1.8rem;
    }
    .hot-con{
        background-color: #fff;
        width: 100%
    }
    .hot-goods{
        height:130rem;
        overflow: hidden;
    }
</style>