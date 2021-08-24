<template>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="chartLine" class="line-wrap"></div>
</template>

<script>
    import * as echarts from 'echarts';
    require('echarts/theme/shine');//引入主题

    export default {
    name: 'lineChart',
    props: {
      Grade: String,
      Tab:Number,
    },
    data() {
      return {
        chartLine: null,
        grade_data:[],
        grade_new_data:[],
        monitor_data:[],
        grade_info:{},
      }
    },
    mounted() {
        axios.get('json/grade_data.json',{}).then((response) => {
        this.grade_data = response.data.grade_data; 
        if (this.Tab==0){
            let temp = this.grade_data.filter(searchResult => searchResult.grade==this.Grade)
            this.grade_info = temp[0]
            this.drawLineChart();
        }
        });

        axios.get('json/grade_new_data.json',{}).then((response) => {
        this.grade_new_data = response.data.grade_new_data;
        if (this.Tab==1){
            let temp = this.grade_new_data.filter(searchResult => searchResult.grade==this.Grade)
            this.grade_info = temp[0]
            this.drawLineChart();
        }
        
        });

        axios.get('json/monitor.json',{}).then((response) => {
        this.monitor_data= response.data.monitor_data;
        if (this.Tab==3 | this.Tab==4){
            let temp = this.monitor_data.filter(searchResult => searchResult.grade==this.Grade)
            this.grade_info = temp[0]
            // console.log(this.grade_info)
            this.drawLineChart();
        }        
        });
        
    },
    watch:{
        Grade: function(){
            let temp = {}
            if (this.Tab==0){
                temp = this.grade_data.filter(searchResult => searchResult.grade==this.Grade)
            }else if (this.Tab==1){
                temp = this.grade_new_data.filter(searchResult => searchResult.grade==this.Grade)
            }
            this.grade_info = temp[0]

            this.drawLineChart();
        },
        Tab: function(){
            // console.log('in-line-chart')
            // console.log(this.Tab)
            // console.log(this.Grade)
            let temp = {}
            if (this.Tab==0){
                temp = this.grade_data.filter(searchResult => searchResult.grade==this.Grade)
            }else if(this.Tab==1){

                temp = this.grade_new_data.filter(searchResult => searchResult.grade==this.Grade)
            }
            this.grade_info = temp[0]
            this.drawLineChart();
        }
    },
    methods: {
      drawLineChart() {
        // console.log(this.grade_info.columns.length)
        var series_data = []; // main object

        // add 100 sub-object values
        for(var i = 0; i < this.grade_info.columns.length; i++) {
            series_data.push( {
                    name: this.grade_info.columns[i],
                    type:'line',
                    data:this.grade_info.data[i]
                }); 
        }

        // console.log(series_data)
        this.chartLine = echarts.init(this.$el,'shine');// 基于准备好的dom，初始化echarts实例
        let option = {
            tooltip : {
                trigger: 'item',
                position: 'bottom',
                textStyle:{
                            color: 'rgb(232,232,232)'//字体颜色
                        },
            },
            legend: {
                data:this.grade_info.columns,
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    axisTick: {
                        show: false
                    },
                    data : this.grade_info.index
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisTick: {
                        show: false
                    },
                    name: 'df'
                }
            ],
            series : series_data
        };
        // 使用刚指定的配置项和数据显示图表
        this.chartLine.setOption(option);
      }
    }
  }
</script>

<style scope>
    .line-wrap{
        width:100%;
        height:50vh;
    }
</style>