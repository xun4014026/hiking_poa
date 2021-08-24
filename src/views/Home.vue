<template>
  <v-container class="pa-0" fluid >
  <v-layout class="ma-0 pb-0" style="height: 89vh">
  <!-- <hello-world /> -->
  

  <!-- <google-trend/> -->
    <v-flex xs6 sm6 md6 class="ma-0 pb-0">
      <v-card class="mx-10 pb-0">
        <mountain-map style="height: 89vh" v-on:MountainRow="MountainRow" :SearchMountainId="searchInput" :ShowMountainData="show_mountain_data"/>
      </v-card>
    </v-flex>

    <v-flex xs6 sm6 md6 class='ma-0 pb-0' style="height: 89vh; overflow: auto">
      <v-card class="mr-10 pb-0 elevation-0" >
      <!-- v-model="values" -->
      <v-card class="elevation-0" >
      <v-layout>
      <v-flex xs2 sm2 md2 class='ma-1 pb-0'>
        <v-select
          v-model="filter_grade"
          :items="grade"
          hide-details
          outlined
          label='百岳等級'
          dense
          @change="grade_onChange"
        ></v-select>
      </v-flex>
      <!-- chips -->
          <!-- small-chips -->
      <v-flex xs3 sm3 md3 class='ma-1 pb-0'>
        <v-autocomplete
          v-model="filter_mountain"
          :items="show_mountain_data"
          hide-details
          outlined
          dense
          label="山名"
          item-value="id"
          item-text="mountain_name"
          @change="mountain_onChange"
        ></v-autocomplete>
      
      </v-flex>
      <!-- <v-flex xs3 sm3 md3 class='ma-1 pb-0'>
        <h2>{{filter_mountain}}</h2>
      </v-flex> -->
      </v-layout>
      </v-card>
    <!-- <h1>{{searchInput}}</h1> -->
    <!-- <h1>山名:{{mountain_info.mountain_name}}</h1> -->
    <!-- <div v-for="item in mountain_info.wordcloud"> -->
    <!-- :color="([, weight]) => weight > 0.5 ? 'DeepPink' : weight > 0.1 ? 'RoyalBlue' : 'Indigo'" -->
    

    <v-tabs v-model="tab" grow color="#42865F" v-if="!filter">
      <v-tab v-for="item in category" :key="item.title">
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <!-- <v-divider class="justify-center mt-3 mb-3"></v-divider> -->

    <v-card  v-if="!filter" class="elevation-0 ma-0 mt-5 pt-0" style="height: 50vh;">
      <v-card-title class="ma-0 pb-0">
        聲量趨勢
      </v-card-title>
      <line-chart :Grade="filter_grade" :Tab="tab"/>
    </v-card>
    <v-card  v-if="filter | filter_grade!='all'" class="elevation-0 ma-0 pt-0" style="height: 40vh;">
      <v-card-title class="ma-0 pb-0">
        熱門話題
      </v-card-title>
      <!-- <v-card-subtitle v-if="!filter" class="ma-0 pb-0 elevation-0">
        請先選擇一座山
      </v-card-subtitle> -->
      <v-layout>
      <v-flex xs1 sm1 md1>
        <v-avatar color="#9BD9CE" size="24" class="ma-2">
          <v-icon class="ma-3" color="white" small>mdi-emoticon-happy-outline</v-icon>
        </v-avatar>
        <v-avatar color="#A8BAD0" size="24" class="ma-2">
          <v-icon class="ma-3" color="white" small>mdi-emoticon-neutral-outline</v-icon>
        </v-avatar>
        <v-avatar color="#414263" size="24" class="ma-2">
          <v-icon class="ma-3" color="white" small>mdi-emoticon-sad-outline</v-icon>
        </v-avatar>
      </v-flex>

      <v-flex xs11 sm11 md11>
      <vue-word-cloud
      :words="mountain_info.wordcloud"
      font-family="Roboto"
      v-if="filter"
      >
        <template slot-scope="{text, weight, word}">
          
          <div :title="weight" style="cursor: pointer; " @click="onMountainWordClick(word)" hover="background:red;">
            {{ text }}
          </div>
        </template>
      </vue-word-cloud>

      <vue-word-cloud
      :words="grade_info.wordcloud"
      font-family="Roboto"
      v-else
      >
        <template slot-scope="{text, weight, word}">
          <div :title="weight" style="cursor: pointer;" @click="onGradeWordClick(word)">
            {{ text }}
          </div>
        </template>
      </vue-word-cloud>
      
      </v-flex>
      </v-layout>
    </v-card>

<!-- class="elevation-3" -->
    <!-- <v-divider class="justify-center mt-3 mb-3"></v-divider> -->
    <v-card v-if="filter | filter_grade!='all'" class="elevation-0 ma-0 pb-0" >
    <v-card-title class="ma-0 pb-0">
      相關文章
    </v-card-title>
    <!--  -->
    <!-- 特定山 -->
    <!--  -->
    <v-layout>
      <v-chip small class="mr-1" v-if="filter">{{ mountain_info.mountain_name }}</v-chip>
      <v-chip small class="mr-1" v-if="clickword != ''">{{ clickword }}<v-icon class="ml-1" @click="closeword()">mdi-close</v-icon></v-chip>
      <h4 v-if="filter">相關討論數:{{mountain_related_articles.length}}</h4>
      <h4 v-else>相關討論數:{{grade_related_articles.length}}</h4>      
      <!-- <v-flex xs1 sm1 md1 class="ma-0 pb-0"><v-chip>{{ filter_mountain }}</v-chip></v-flex>
      <v-flex xs1 sm1 md1 class="ma-0 pb-0"><v-chip>{{ filter_mountain }}</v-chip></v-flex>
      <v-flex xs1 sm1 md2 class="ma-0 pb-0"><h5>相關討論數:{{mountain_info.doc_num}}</h5></v-flex>   -->
    </v-layout>
    <v-layout v-if="filter" column style="height: 40vh" >   
      <v-flex style="overflow: auto"> 
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                標題
              </th>
              <th class="text-left">
                摘要
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in mountain_related_articles"
              :key="index"
              v-on:click="go(item)"
            >
              <td>{{ item.title }}</td>
              <td>{{ item.snippet }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      </v-flex>
    </v-layout>
    <!--  -->
    <!-- grade -->
    <!--  -->
    <v-layout v-else column style="height: 40vh" > 
      <v-flex style="overflow: auto"> 
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                標題
              </th>
              <th class="text-left">
                摘要
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in grade_related_articles"
              :key="index"
              v-on:click="go(item)"
            >
              <td>{{ item.title }}</td>
              <td>{{ item.snippet }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      </v-flex>
    </v-layout>
    </v-card>
    </v-card>
    <!-- </div> -->
    </v-flex>
  </v-layout>
  </v-container>

  
  

</template>

<script>
import GoogleTrend from '../components/GoogleTrend'
import HelloWorld from '../components/HelloWorld'
import DateInputPicker from "../components/DateInputPicker.vue"
import VueWordCloud from 'vuewordcloud'
import MountainMap from '../components/MountainMap.vue'
import LineChart from '../components/LineChart.vue'


  export default {
    name: 'Home',

    components: {
      HelloWorld,
      GoogleTrend,
      DateInputPicker,
      [VueWordCloud.name]: VueWordCloud,
      MountainMap,
      LineChart  
    },
    data () {
      return {
        filter: false,
        filter_grade : 'all',
        filter_mountain:'',
        grade:["all","A","B","C","C+","小百岳"],
        mountain_info:{},
        // mountain_label:'山名',
        wordcloud_content:'',
        searchInput:-1,
        clickword:'',
        mountain_top100_data:{},
        mountain_sm100_data:{},
        all_mountain_data:{},
        show_mountain_data:{},
        mountain_related_articles:[],
        grade_related_articles:[],
        grade_wordcloud:{},
        grade_new_wordcloud:{},
        grade_info:{},
        tab: 0,
        category: {
          hot:{ title: "熱門"
          },
          accident:{ title: "山域事故"
          },
        },
      }
    },
    methods: {
      MountainRow: function (MountainInfo) {
        console.log(MountainInfo)
        this.filter = true
        this.mountain_info = MountainInfo
        this.mountain_related_articles = this.mountain_info.related_articles
        this.filter_grade = this.mountain_info.grade
        this.show_mountain_data = this.all_mountain_data.filter(searchResult => searchResult.grade == this.filter_grade)
        this.filter_mountain = this.mountain_info.id
        this.searchInput = this.mountain_info.id
        this.clickword=''
      },
      mountain_onChange: function (e) {
        let temp = this.all_mountain_data.filter(searchResult => searchResult.id == e)
        this.filter = true
        this.searchInput = temp[0].id
        this.mountain_info = temp[0]
        this.mountain_related_articles = this.mountain_info.related_articles
        this.filter_mountain = this.mountain_info.id
        this.clickword=''
        // {"id":e, "mountain_name": this.mountain_top100_data[e].mountain_name, "doc_num":0, "wordcloud":[]}
        // console.log(this.mountain_info)
      },
      grade_onChange: function (e) {
        this.filter = false
        this.filter_mountain = ''
        this.searchInput = -1
        this.filter_grade = e
        this.clickword=''
        this.mountain_related_articles = []
        if(e=='all'){
          this.show_mountain_data = this.all_mountain_data
        }else{
          // console.log(e)
          let temp = {}
          if (this.tab==0){
            temp = this.grade_wordcloud.filter(searchResult => searchResult.grade == e)
          }else{
            temp = this.grade_new_wordcloud.filter(searchResult => searchResult.grade == e)
            console.log(temp)
          }
          this.grade_info = temp[0]
          console.log(this.grade_info.wordcloud)
          this.grade_related_articles = this.grade_info.related_articles
          this.show_mountain_data = this.all_mountain_data.filter(searchResult => searchResult.grade == e)
        }
        
      },
      go(item){
        // window.location.href=item.article_url
        window.open(item.article_url);
      },
      closeword(){
        this.clickword=''
        if (this.filter){
          this.mountain_related_articles = this.mountain_info.related_articles
        }else{
          this.grade_related_articles = this.grade_info.related_articles
        }
      },
      onMountainWordClick(w){
        // console.log(w.text)
        this.clickword = w.text
        this.mountain_related_articles = this.mountain_info.related_articles.filter(searchResult => searchResult.content.includes(w.text))
        // console.log(this.related_articles)
        // const result = words.filter(word => word.name.includes('a'));
      },
      onGradeWordClick(w){
        // console.log(w.text)
        this.clickword = w.text
        this.grade_related_articles = this.grade_info.related_articles.filter(searchResult => searchResult.content.includes(w.text))
        // console.log(this.related_articles)
        // const result = words.filter(word => word.name.includes('a'));
      }
      // WordcloudContent: function () {
      //   this.wordcloud_content = []
      //   // for (w in this.mountain_info.wordcloud)
      //   this.mountain_info.wordcloud.ForEach((item, index) => {
      //     this.wordcloud_content.push( [item.word,item.tfidf])
      //   };
      //   // console.log(this.wordcloud_content)
      //   // this.wordcloud_content = this.wordcloud_content + ']';
      // },
    },
    mounted(){
      axios.get('json/mountain_100.json',{}).then((response) => {
        this.mountain_top100_data = response.data.mountain_top100_data;
        axios.get('json/mountain_100sm.json',{}).then((response) => {
          this.mountain_sm100_data = response.data.mountain_sm100_data;
          this.all_mountain_data = this.mountain_top100_data.concat(this.mountain_sm100_data)
          this.show_mountain_data = this.all_mountain_data
          this.filter_grade = 'all'
          });
      });
     
      axios.get('json/grade_wordcloud.json',{}).then((response) => {
      this.grade_wordcloud = response.data.grade_wordcloud;
      });

      axios.get('json/grade_new_wordcloud.json',{}).then((response) => {
      this.grade_new_wordcloud = response.data.grade_new_wordcloud;
      // console.log(this.grade_new_wordcloud)
      });

      console.log(this.show_mountain_data)
    },
    watch:{
        tab: function(){
            this.filter = false
            this.filter_mountain = ''
            this.searchInput = -1
            this.mountain_related_articles = []
            if(this.filter_grade=='all'){
              this.show_mountain_data = this.mountain_top100_data.concat(this.mountain_sm100_data)
            }else{
              // console.log(e)
              let temp = {}
              if (this.tab==0){
                temp = this.grade_wordcloud.filter(searchResult => searchResult.grade == this.filter_grade)
              }else{
                temp = this.grade_new_wordcloud.filter(searchResult => searchResult.grade == this.filter_grade)
                console.log(temp)
              }
              this.grade_info = temp[0]
              console.log(this.grade_info.wordcloud)
              this.grade_related_articles = this.grade_info.related_articles
              this.show_mountain_data = this.all_mountain_data.filter(searchResult => searchResult.grade == this.filter_grade)
            }
            }
    },
  }
</script>

<style scoped lang="scss">
// .info {
//   background-color:red;
// }

html {
  overflow: hidden !important;
}

.v-card {
  display: flex !important;
  flex-direction: column;
}

.v-card__title {
    padding: 0px;
}
</style>