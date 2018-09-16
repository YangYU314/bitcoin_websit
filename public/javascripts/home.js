$(document).ready(function(){
    // var product_id = document.getElementById("preference").value;
    // alert(product_id);
    var candle_timer;
    var worldmap_timer;
    var askbid_timer;
    var news_list   ;

    $("#news").click(function(){
        $.ajax({
            url: "/news",
            type: "GET",
            async: false,
            success: function (data) {
                if (data != null ){
                    for (var i=0; i<data.length; i++){
                        var temp= [];
                        //console.log(data[i]);
                        news_list= data;
                        //need modify
                        // temp[i].push(data[i].articleTitle);
                        // temp[i].push(data[i].articleDescrption);
                        // temp[i].push(data[i].articleImage);
                        // temp[i].push(data[i].articleUrl);
                    }
                    // console.log(temp);
                }
            }
        })
        console.log(news_list);
    });
    $('#logout').click(function(){
        click_logout();
    });
    $('#candle_chart').click(function () {
        clearTimeout(worldmap_timer);
        candle_timer = setTimeout("candlestick_chart()",3000);
    });
    $('#map_chart').click(function () {
        clearTimeout(candle_timer);
        worldmap_timer = setTimeout("map_exchange_distribution()",3000);

    });
    $('#ask_bid_chart').click(function () {

    });

    //alert(last_price);
})
//logout
function click_logout(){
    $.ajax({
        url: "/logout",
        type: "GET",
        success: function (data) {
            if (data.result == 0){
                window.location.href = "/";
            }
        },
        error: function () {
            alert("Connection failed!");
        }
    })
}
function candle_chart_generate() {
    clearTimeout(worldmap_timer);
    candle_timer = setTimeout("candlestick_chart()",3000);
}
function world_chart_generate() {
    clearTimeout(candle_timer);
    worldmap_timer = setTimeout("map_exchange_distribution()",3000);
}
function candlestick_chart(product_id){
    //var t1 = window.setInterval("candlestick_chart('BTC-USD')",30000);
    $.ajax({
        url: "/candle_stick",
        type: "POST",
        data:{product_id: product_id},
        success: function (data) {
            if (data != null ){
                //data[0].low
                // format：(open)，(close)，(lowest)，(highest)
                //alert(data[0].time)
                //var data0 = splitData(data.result);
                product_id = data[0].product_id;
                var myChart = echarts.init(document.getElementById('map'));
                var upColor = '#ec0000';
                var upBorderColor = '#8A0000';
                var downColor = '#00da3c';
                var downBorderColor = '#008F28';
                var downColor='#6cc091';
                var time = [];
                var values = [];
                var last_price_collection = [];
                for (var i=0; i<data.length; i++){

                    time.push(unixtime_exchange(data[i].time));
                    var temp= [];

                    //need modify
                    last_price_collection.push(data[i].close);
                    temp.push(data[i].open);
                    temp.push(data[i].close);
                    temp.push(data[i].low);
                    temp.push(data[i].high);
                    values.push(temp);
                }
                //last price
                 last_price = data[data.length-1].close;
                //alert("last price:"+last_price);
                var last_price_show = document.getElementById("price");
                last_price_show.innerText = last_price;
                //mini line chart of each coin
                mini_last_price_collection = last_price_collection.slice(0,1000);
                //alert(mini_last_price_collection);
                var my_miniChart = echarts.init(document.getElementById('volume'));
                var mini_option = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            params = params[0];
                            var date = new Date(params.name);
                            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                        },
                        axisPointer: {
                            animation: false
                        }
                    },
                    xAxis: {
                        type: 'category',
                        show: false,
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        max:6600,
                        min:6100,
                        show:false,
                        boundaryGap: [0, '100%'],
                        splitLine: {
                            show: false
                        }
                    },
                    series: [{
                        name: '模拟数据',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        data: mini_last_price_collection
                    }]

                }
                // setInterval(function () {
                //
                //     for (var i = 0; i < 5; i++) {
                //         data.shift();
                //         data.push(candlestick_chart('BTC-USD'));
                //     }
                //
                //     myChart.setOption({
                //         series: [{
                //             data: data
                //         }]
                //     });
                // }, 10000);
                my_miniChart.setOption(mini_option);
                function unixtime_exchange(time){
                    var unixTimestamp = new Date(time*1000);
                    var commonTime = unixTimestamp.toLocaleString()

                    return commonTime;
                }
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
                var option = {
                    backgroundColor: '#2f323c',
                    legend: {
                        data: ['Daily', 'MA5', 'MA10', 'MA20', 'MA30'],
                        inactiveColor: '#777',
                        textStyle: {
                            color: '#777'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            animation: false,
                            type: 'cross',
                            lineStyle: {
                                color: '#',
                                width: 2,
                                opacity: 1
                            }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: time,
                        axisLine: { lineStyle: { color: '#8392A5' } }
                    },
                    yAxis: {
                        scale: true,
                        axisLine: { lineStyle: { color: '#8392A5' } },
                        splitLine: { show: false }
                    },
                    grid: {
                        bottom: 80
                    },
                    dataZoom: [{
                        textStyle: {
                            color: '#8392A5'
                        },
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '80%',
                        dataBackground: {
                            areaStyle: {
                                color: '#777'
                            },
                            lineStyle: {
                                opacity: 0.8,
                                color: '#777'
                            }
                        },
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }, {
                        type: 'inside'
                    }],
                    animation: false,
                    series: [
                        {
                            type: 'candlestick',
                            name: 'Daily',
                            data: values,
                            itemStyle: {
                                normal: {
                                    color: '#FD1050',
                                    color0: '#6cc091',
                                    borderColor: '#FD1050',
                                    borderColor0: '#0CF49B'
                                }
                            }
                        },
                        {
                            name: 'MA5',
                            type: 'line',
                            data: calculateMA(5, data),
                            smooth: true,
                            showSymbol: false,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            }
                        },
                        {
                            name: 'MA10',
                            type: 'line',
                            data: calculateMA(10, data),
                            smooth: true,
                            showSymbol: false,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            }
                        },
                        {
                            name: 'MA20',
                            type: 'line',
                            data: calculateMA(20, data),
                            smooth: true,
                            showSymbol: false,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            }
                        },
                        {
                            name: 'MA30',
                            type: 'line',
                            data: calculateMA(30, data),
                            smooth: true,
                            showSymbol: false,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            }
                        }
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
    var t2 = window.setInterval("map_exchange_distribution()",30000);
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

                option = {
                    backgroundColor: '#404a59',
                    title: {
                        text: 'Cocurrency-exhange Distribution',
                        x:'center',
                        textStyle: {
                            color: '#fff'
                        }
                    },
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
//259.96 2个order
function bid_ask_chart(){
    var t3 = window.setInterval("bid_ask_chart()",30000);
    $.ajax({
            url: "/ask_bid",
            type: "GET",
            success: function (data) {
                var time = ["01/09/2018","09/09/201"]
                var ask = [];
                var bid = [];
                var spread = [];
                for (var i=0; i<data.length; i++){
                    time.push(data[i].time);
                    //need modify
                    ask.push(data[i].ask);
                    bid.push(data[i].bid);
                    spread.push(Number(data[i].ask)-Number(data[i].bid));
                }
                var colors = ['#5793f3', '#d14a61', '#675bba'];


                option = {
                    color: colors,

                    tooltip: {
                        trigger: 'none',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    legend: {
                        data:['ask', 'bid','spread']
                    },
                    grid: {
                        top: 70,
                        bottom: 50
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine: {
                                onZero: false,
                                lineStyle: {
                                    color: colors[1]
                                }
                            },
                            axisPointer: {
                                label: {
                                    formatter: function (params) {
                                        return 'ask  ' + params.value
                                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                    }
                                }
                            },
                            data: time,
                        },
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine: {
                                onZero: false,
                                lineStyle: {
                                    color: colors[0]
                                }
                            },
                            axisPointer: {
                                label: {
                                    formatter: function (params) {
                                        return 'bid  ' + params.value
                                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                    }
                                }
                            },
                            data: time,
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name:'ask',
                            type:'line',
                            xAxisIndex: 1,
                            smooth: true,
                            data: ask,
                        },
                        {
                            name:'bid',
                            type:'line',
                            smooth: true,
                            data: bid,
                        },
                        {
                            name:'spread',
                            type: 'bar',
                            xAxisIndex: 1,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data: spread,

                        }
                    ]
                };
                var myChart = echarts.init(document.getElementById('map'));
                myChart.setOption(option);

            },
            error: function () {
                alert("Fail to get firstChart data!");
            }
        }
    )
}

function news_request(){

}