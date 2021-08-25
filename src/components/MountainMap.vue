<template>
<!-- <v-button @click="reset">
Reset
</v-button> -->
<l-map
      ref="myMap"
      :zoom.sync="zoom"
      :center.sync="center"
      :options="options"
      style="height: 100vh;">
      <!-- 載入圖資 -->
      <l-tile-layer :url="url" :attribution="attribution" />
      
      <!-- 自己所在位置 -->
      <!-- <l-marker ref="location" :lat-lng="center">
        <l-popup>
          你的位置
        </l-popup>
      </l-marker> -->
      <!-- 創建標記點 -->
      <v-marker-cluster>
        <!-- ShowMountainData -->
      <l-marker :lat-lng="[item.lat,item.lng]" v-for="item in ShowMountainData" :key="item.id" v-on:click="mountain_click(item.id)">

        <!-- 標記點樣式判斷 -->
        <l-icon
          :icon-url="icon.type.black"
          :shadow-url="icon.shadowUrl"
          :icon-size="icon.iconSize"
          :icon-anchor="icon.iconAnchor"
          :popup-anchor="icon.popupAnchor"
          :shadow-size="icon.shadowSize"
        />
        <!-- 彈出視窗 -->
        <l-tooltip>
          {{ item.mountain_name }}
        </l-tooltip>
      </l-marker>
      </v-marker-cluster>
    </l-map>

</template>

<script>


  export default {
    name: 'Home',
    props: {
      SearchMountainId: Number,
      ShowMountainData: Object,
    },
    data() {
    return {
      // 模擬資料
      mountain_top100_data:{},
      weather_station:{},
      zoom: 7.5,
      center: [23.873875, 120.982024],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: `© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
      options: {
        zoomControl: false
      },
      icon: {
        type: {
          black:
            "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
          gold:
            "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png"
        },
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }
    };
  },
  mounted() {
    // 等地圖創建後執行
    // this.$nextTick(() => {
    //   // 獲得目前位置
    //   navigator.geolocation.getCurrentPosition(position => {
    //     const p = position.coords;
    //     // 將中心點設為目前的位置
    //     this.center = [p.latitude, p.longitude];
    //     // 將目前的位置的標記點彈跳視窗打開
    //     this.$refs.location.mapObject.openPopup();
    //   });
    // })
    ;
    axios.get('json/weather_station.json',{}).then((response) => {
      this.weather_station = response.data.weather_station;
      // console.log(this.weather_station)
      
    });
  },
  watch:{
    SearchMountainId: function(){
      console.log(this.SearchMountainId)
      if(this.SearchMountainId==-1){
        this.zoom =  7.5,
        this.center = [23.873875, 120.982024]
      }else{
        let temp = this.ShowMountainData.filter(searchResult => searchResult.id == this.SearchMountainId)
        console.log(temp[0].mountain_name)
        this.center = [temp[0].lat,temp[0].lng]
        setTimeout(() => {
          this.zoom = 12
        }, 500)
      }

    }
  },
  methods: {
    mountain_click(mountain_id){
      let temp = this.ShowMountainData.filter(searchResult => searchResult.id == mountain_id)
      console.log('mountain_click')
      console.log(temp[0].id)
      this.$emit('MountainRow', temp[0])
    },
    
  }
  }
  
</script>
