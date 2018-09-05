$(document).ready(function(){
    $('#logout').click(function(){
        click_logout();
    });

    //chart_generate();
    map_exchange_distribution();
})

//logout
function click_logout(){
    $.ajax({
        url: "/logout",
        type: "GET",
        success: function (data) {
            if (data.result == 0){
                window.location.href = "login";
            }
        },
        error: function () {
            alert("Connection failed!");
        }
    })
}

function chart_generate() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('map'));
    var upColor = '#ec0000';
    var upBorderColor = '#8A0000';
    var downColor = '#00da3c';
    var downBorderColor = '#008F28';
    firstChart();
}

//data
function firstChart(){
    $.ajax({
        url: "/candle_stick",
        type: "POST",
        data:{product_id: 'BTC-USD'},
        success: function (data) {
            if (data != null ){
                //data[0].low
                // format：(open)，(close)，(lowest)，(highest)
                //alert(data[0].time)
                //var data0 = splitData(data.result);

                var myChart = echarts.init(document.getElementById('map'));

                //var myChart = echarts.init(document.getElementById('map'));
                var upColor = '#ec0000';
                var upBorderColor = '#8A0000';
                var downColor = '#00da3c';
                var downBorderColor = '#008F28';
                var time = [];
                var values = [];
                for (var i=0; i<data.length; i++){
                    time.push(data[i].time);
                    var temp= [];

                    //need modify
                    temp.push(data[i].open);
                    temp.push(data[i].close);
                    temp.push(data[i].low);
                    temp.push(data[i].high);
                    values.push(temp);
                }
                //alert(values[0]);
                    // var date = new Date(data[i].time);
                    // Date.prototype.Format = function(fmt){
                    //     //author:wangweizhen
                    //     var o = {
                    //         "M+" : this.getMonth()+1,                 //月份
                    //         "d+" : this.getDate(),                    //日
                    //         "h+" : this.getHours(),                   //小时
                    //         "m+" : this.getMinutes(),                 //分
                    //         "s+" : this.getSeconds(),                 //秒
                    //         "q+" : Math.floor((this.getMonth()+3)/3), //季度
                    //         "S"  : this.getMilliseconds()             //毫秒
                    //     };
                    //     if(/(y+)/.test(fmt))
                    //         fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
                    //     for(var k in o)
                    //         if(new RegExp("("+ k +")").test(fmt))
                    //             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                    //     return fmt;
                    // };
                    // date.format("yyyy-MM-dd hh:mm:ss");
                    //time.push(data[i].time);
                    //alert(data[i].time)；
                //     data0[i] = [data[i].time,data[i].open,data[i].close,data[i].low,data[i].high]
                // }
                // data1 = splitData(data0);
                // //alert(values.length)
                // function splitData(rawData) {
                //     var categoryData = [];
                //     var values = []
                //     for (var i = 0; i < rawData.length; i++) {
                //         categoryData.push(rawData[i].splice(0, 1)[0]);
                //         values.push(values.push(rawData[i]))
                //     }
                //     return {
                //         categoryData: categoryData,
                //         values: values
                //     };
                // }

                function calculateMA(dayCount) {
                    var result = [];
                    for (var i = 0, len = data.values.length; i < len; i++) {
                        if (i < dayCount) {
                            result.push('-');
                            continue;
                        }
                        var sum = 0;
                        for (var j = 0; j < dayCount; j++) {
                            sum += data0.values[i - j][1];
                        }
                        result.push(sum / dayCount);
                    }
                    return result;
                }



                option = {
                    title: {
                        text: 'Candle-Stick',
                        left: 0
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    legend: {
                        data: ['DailyK', 'MA5', 'MA10', 'MA20', 'MA30']
                    },
                    grid: {
                        left: '10%',
                        right: '10%',
                        bottom: '15%'
                    },
                    xAxis: {
                        type: 'category',
                        data: time ,
                        scale: true,
                        boundaryGap : false,
                        axisLine: {onZero: false},
                        splitLine: {show: false},
                        splitNumber: 20,
                        min: 'dataMin',
                        max: 'dataMax'
                    },
                    yAxis: {
                        scale: true,
                        splitArea: {
                            show: true
                        }
                    },
                    dataZoom: [
                        {
                            type: 'inside',
                            start: 50,
                            end: 100
                        },
                        {
                            show: true,
                            type: 'slider',
                            y: '90%',
                            start: 50,
                            end: 100
                        }
                    ],
                    series: [
                        {
                            name: 'DailyK',
                            type: 'candlestick',
                            data: values,
                            itemStyle: {
                                normal: {
                                    color: upColor,
                                    color0: downColor,
                                    borderColor: upBorderColor,
                                    borderColor0: downBorderColor
                                }
                            },
                            markPoint: {
                                label: {
                                    normal: {
                                        formatter: function (param) {
                                            return param != null ? Math.round(param.value) : '';
                                        }
                                    }
                                },
                                data: [
                                    {
                                        name: 'XX标点',
                                        coord: ['2013/5/31', 2300],
                                        value: 2300,
                                        itemStyle: {
                                            normal: {color: 'rgb(41,60,85)'}
                                        }
                                    },
                                    {
                                        name: 'highest value',
                                        type: 'max',
                                        valueDim: 'highest'
                                    },
                                    {
                                        name: 'lowest value',
                                        type: 'min',
                                        valueDim: 'lowest'
                                    },
                                    {
                                        name: 'average value on close',
                                        type: 'average',
                                        valueDim: 'close'
                                    }
                                ],
                                tooltip: {
                                    formatter: function (param) {
                                        return param.name + '<br>' + (param.data.coord || '');
                                    }
                                }
                            },
                            markLine: {
                                symbol: ['none', 'none'],
                                data: [
                                    [
                                        {
                                            name: 'from lowest to highest',
                                            type: 'min',
                                            valueDim: 'lowest',
                                            symbol: 'circle',
                                            symbolSize: 10,
                                            label: {
                                                normal: {show: false},
                                                emphasis: {show: false}
                                            }
                                        },
                                        {
                                            type: 'max',
                                            valueDim: 'highest',
                                            symbol: 'circle',
                                            symbolSize: 10,
                                            label: {
                                                normal: {show: false},
                                                emphasis: {show: false}
                                            }
                                        }
                                    ],
                                    {
                                        name: 'min line on close',
                                        type: 'min',
                                        valueDim: 'close'
                                    },
                                    {
                                        name: 'max line on close',
                                        type: 'max',
                                        valueDim: 'close'
                                    }
                                ]
                            }
                        },
                        {
                            name: 'MA5',
                            type: 'line',
                            data: calculateMA(5),
                            smooth: true,
                            lineStyle: {
                                normal: {opacity: 0.5}
                            }
                        },
                        {
                            name: 'MA10',
                            type: 'line',
                            data: calculateMA(10),
                            smooth: true,
                            lineStyle: {
                                normal: {opacity: 0.5}
                            }
                        },
                        {
                            name: 'MA20',
                            type: 'line',
                            data: calculateMA(20),
                            smooth: true,
                            lineStyle: {
                                normal: {opacity: 0.5}
                            }
                        },
                        {
                            name: 'MA30',
                            type: 'line',
                            data: calculateMA(30),
                            smooth: true,
                            lineStyle: {
                                normal: {opacity: 0.5}
                            }
                        },

                    ]
                };
                myChart.setOption(option);

            }
        },
        error: function () {
            alert("Fail to get firstChart data!");
        }
    })
}



function map_exchange_distribution(){
    $.ajax({
        url: "/world_map",
        type: "GET",
        success: function (data) {
            var coord = [];
            for (var i=0; i<data.length; i++){
                var temp= [];

                //need modify
                temp.push(data[i].longitude);
                temp.push(data[i].latitude);
                coord.push(temp);
            }
                //var data = [[116.4,39.9],[]];
                var myChart = echarts.init(document.getElementById('map'));
// var convertData = function (data) {
//     var res = [];
//     for (var i = 0; i < data.length; i++) {
//         var geoCoord = geoCoordMap[data[i].name];
//         if (geoCoord) {
//             res.push({
//                 name: data[i].name,
//                 value: geoCoord.concat(data[i].value)
//             });
//         }
//     }
//     return res;
// };

                option = {
                    backgroundColor: '#404a59',
                    title: {
                        text: 'Cocurrency-exhange Distribution',
                        x:'center',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    // tooltip: {
                    //     trigger: 'item',
                    //     formatter: function (params) {
                    //         return params.name + ' : ' + params.value[2];
                    //     }
                    // },
                    // legend: {
                    //     orient: 'vertical',
                    //     y: 'bottom',
                    //     x:'right',
                    //     data:['pm2.5'],
                    //     textStyle: {
                    //         color: '#fff'
                    //     }
                    // },
                    // visualMap: {
                    //     min: 0,
                    //     max: 200,
                    //     calculable: true,
                    //     inRange: {
                    //         color: ['#50a3ba', '#eac736', '#d94e5d']
                    //     },
                    //     textStyle: {
                    //         color: '#fff'
                    //     }
                    // },
                    geo: {
                        map: 'world',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#323c48',
                                borderColor: '#111'
                            },
                            emphasis: {
                                color: 'gold',
                                areaColor: '#2a333d'
                            }
                        }
                    },
                    series: [
                        {
                            name: 'pm2.5',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: coord,
                            symbolSize: 3,
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                color: 'gold',
                                emphasis: {

                                    borderColor: 'gold',
                                    borderWidth: 1
                                }
                            }
                        }
                    ]

                };
                myChart.setOption(option);

        },
            error: function () {
                alert("Fail to get firstChart data!");
            }
    }
    )
}
