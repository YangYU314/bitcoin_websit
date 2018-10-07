$(document).ready(function(){
    var candle_timer;
    var worldmap_timer;
    var askbid_timer;
    var news_list;
    var t1 = window.setInterval("mini_chart(\"BTC-USD\",\"price1\",\"volume1\")",60000);
    var t2 = window.setInterval("mini_chart(\"BTC-GBP\",\"price2\",\"volume2\")",60000);
    var t3 = window.setInterval("mini_chart(\"BTC-EUR\",\"price3\",\"volume3\")",60000);
    var t4 = window.setInterval("mini_chart(\"ETC-EUR\",\"price4\",\"volume4\")",60000);
    var t5 = window.setInterval("mini_chart(\"BCH-USD\",\"price5\",\"volume5\")",60000);
    var t6 = window.setInterval("mini_chart(\"ETH-BTC\",\"price6\",\"volume6\")",60000);

    mini_chart("BTC-USD","price1","volume1");
    mini_chart("BTC-GBP","price2","volume2");
    mini_chart("BTC-EUR","price3","volume3");
    mini_chart("ETC-EUR","price4","volume4");
    mini_chart("BCH-USD","price5","volume5");
    mini_chart("ETH-BTC","price6","volume6");
    //mini_price();
    candlestick_chart();
    $.ajaxSetup({ async :false});

    $("#preference").change(function(){
        var selected=$(this).children('option:selected').val();
        document.getElementById("hidden_preference").value = selected;
        
        candlestick_chart();
    });
    $("#news").click(function(){
        $.ajax({
            url: "/news",
            type: "GET",
            async: false,
            success: function (data) {
                if (data != null ){
                    news_list= data;
                }
            }
        })

        $('#title0').append(news_list[0].articleTitle);
        $('#title0').attr('href', news_list[0].articleUrl);
        var image0 = document.getElementById("image0");
        image0.src = news_list[0].articleImage;
        var description0 = document.getElementById("description0");
        description0.innerText = news_list[0].articleDescrption;

        $('#title1').append(news_list[1].articleTitle);
        $('#title1').attr('href', news_list[1].articleUrl);
        var image1 = document.getElementById("image1");
        image1.src = news_list[1].articleImage;
        var description1 = document.getElementById("description1");
        description1.innerText = news_list[1].articleDescrption;

        $('#title2').append(news_list[2].articleTitle);
        $('#title2').attr('href', news_list[2].articleUrl);
        var image2 = document.getElementById("image2");
        image2.src = news_list[2].articleImage;
        var description2 = document.getElementById("description2");
        description2.innerText = news_list[2].articleDescrption;

        $('#title3').append(news_list[3].articleTitle);
        $('#title3').attr('href', news_list[3].articleUrl);
        var image3 = document.getElementById("image3");
        image3.src = news_list[3].articleImage;
        var description3 = document.getElementById("description3");
        description3.innerText = news_list[3].articleDescrption;

        $('#title4').append(news_list[4].articleTitle);
        $('#title4').attr('href', news_list[4].articleUrl);
        var image4 = document.getElementById("image4");
        image4.src = news_list[4].articleImage;
        var description4 = document.getElementById("description4");
        description4.innerText = news_list[4].articleDescrption;


    });
    $('#logout').click(function(){
        click_logout();
    });
    $("#setting").click(function () {
        click_setting();
    })
    $('#candle_chart').click(function () {
        clearTimeout(worldmap_timer);
        clearTimeout(candle_timer);
        clearTimeout(askbid_timer);
        candlestick_chart();
});
    $('#map_chart').click(function () {
        clearTimeout(candle_timer);
        clearTimeout(askbid_timer);
        clearTimeout(worldmap_timer);
        // worldmap_timer = setTimeout("map_exchange_distribution()",3000);
        map_exchange_distribution();
    });
    $('#ask_bid_chart').click(function () {
        clearTimeout(candle_timer);
        clearTimeout(worldmap_timer);
        clearTimeout(askbid_timer);
        // askbid_timer = setTimeout("bid_ask_chart()",3000);
        bid_ask_chart();
    });
    $("#orderbook_chart").click(function () {
        order_chart();
    });
    // $("#test_chart").click(function(){
    //     $.ajax({
    //         url: "/candle_stick",
    //         type: "POST",
    //         data:{product_id: "BTC-USD"},
    //         success: function (data) {
    //             //console.log(id);
    //             if (data != null ){
    //                 //need modify
    //                 last_price = data[data.length-1].close;
    //                 //mini line chart of each type cryptocurrency
    //                 var last_price_collection = [];
    //                 for (var i=0; i<data.length; i++){
    //                     last_price_collection.push(data[i].close);
    //                 }
    //                 mini_last_price_collection = last_price_collection.slice(last_price_collection.length-1000,last_price_collection.length-1);
    //
    //                 var my_miniChart = echarts.init(document.getElementById("map"));
    //                 var mini_option = {
    //                     xAxis: {
    //                         type: 'category',
    //                         show: false,
    //                         splitLine: {
    //                             show: false
    //                         }
    //                     },
    //                     yAxis: {
    //                         axisLine:{
    //                             lineStyle:{
    //                                 color:'#4A5675',
    //                                 // width:2  
    //                             }
    //                         },
    //                         name: '百分比',
    //                         type: 'value',
    //                         splitLine: {
    //                             show: false
    //                         },
    //                         show: false,
    //                         scale:true,
    //                     },
    //                     series: [{
    //                         name: 'Last Price',
    //                         type: 'line',
    //                         showSymbol: false,
    //                         hoverAnimation: false,
    //                         data: mini_last_price_collection
    //                     }]
    //
    //                 }
    //                 my_miniChart.clear();
    //                 my_miniChart.setOption(mini_option);
    //             }
    //         },
    //         error: function () {
    //             alert("Fail to get firstChart data!");
    //         }
    //     })
    // });
})
//logout
function click_setting(){
    $.ajax({
        url: "/setting",
        type: "GET",
        success: function () {
            window.location.href = "/setting";
        },
        error: function () {
            alert ("redirect to setting error, try again later");
        }
    })
}
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
function candlestick_chart(){
    //var t1 = window.setInterval("candlestick_chart('BTC-USD')",3000);
    var preference = document.getElementById("hidden_preference").value;
    var home_head_h1_show= document.getElementById("home_head_h1");
    home_head_h1_show.innerText = preference;
    var myChart = echarts.init(document.getElementById('map'));
    myChart.clear();
    myChart.showLoading();
    $.ajax({
        url: "/candle_stick",
        type: "POST",
        data:{product_id: preference},
        success: function (data) {
            if (data != null ){
                var myChart = echarts.init(document.getElementById('map'));
                myChart.clear();
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
                //get haed last_price and 24h volume
                var last_price_show_head = document.getElementById("LastPrice");
                var hvolume_show_head = document.getElementById("24hrVolume");
                //console.log(last_price_show_head);
                //last price and volume of preference
                last_price = data[data.length-1].close;
                volume_24h = (data[data.length-1].volume).toString().substring(0,7);
                //alert("last price of preference:"+last_price);
                //preference price
                last_price_show_head.innerText= "Last Price: "+last_price+preference.toString().substring(4,7);
                hvolume_show_head.innerText = "24Hr Volume: "+volume_24h+preference.toString().substring(0,3);

                function unixtime_exchange(time) {
                    let unixtime = time
                    let unixTimestamp = new Date(unixtime * 1000)
                    let Y = unixTimestamp.getFullYear()
                    let M = ((unixTimestamp.getMonth() + 1) > 10 ? (unixTimestamp.getMonth() + 1) : '0' + (unixTimestamp.getMonth() + 1))
                    let D = (unixTimestamp.getDate() > 10 ? unixTimestamp.getDate() : '0' + unixTimestamp.getDate())
                    let T = (unixTimestamp.getHours())
                    let Min = (unixTimestamp.getMinutes())
                    //let Sec = (unixTimestamp.getSeconds())
                    let toDay = Y + '-' + M + '-' + D + '-' + T +":"+Min
                    //console.log(toDay)
                    return toDay
                }

                var data_MA = values;
                function calculateMA(dayCount,data) {
                    var result = [];
                    for (var i = 0, len = data.length; i < len; i++) {
                        if (i < dayCount) {
                            result.push('-');
                            continue;
                        }
                        var sum = 0;
                        for (var j = 0; j < dayCount; j++) {
                            sum += data[i - j][1];
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
                        splitLine: { show: false },
                        splitNumber:10
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
                            data: calculateMA(5, data_MA),
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
                            data: calculateMA(10, data_MA),
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
                            data: calculateMA(20, data_MA),
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
                            data: calculateMA(30, data_MA),
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
                myChart.hideLoading();
                myChart.setOption(option);

            }
        },
        error: function () {
            alert("Fail to get firstChart data!");
        }
    })
}
function map_exchange_distribution(){
    var myChart = echarts.init(document.getElementById('map'));
    myChart.clear();
    myChart.showLoading();
    //var t2 = window.setInterval("map_exchange_distribution()",30000);
    $.ajax({
        url: "/world_map",
        type: "GET",
        success: function (data) {
            var myChart = echarts.init(document.getElementById('map'));
            myChart.clear();
            var coord = [];
            for (var i=0; i<data.length; i++){
                var temp= [];

                //need modify
                temp.push(data[i].longitude);
                temp.push(data[i].latitude);
                coord.push(temp);
            }
                //var data = [[116.4,39.9],[]];

                option = {
                    backgroundColor: '#404a59',
                    tooltip: {
                        /*返回需要的信息*/
                        formatter: function() {
                            return name;
                        }
                    },
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
            setTimeout( "window.opener=null;window.close() ",5000);
            myChart.hideLoading();
            myChart.setOption(option);

        },
            error: function () {
                alert("Fail to get firstChart data!");
            }
    }
    )
}
function bid_ask_chart(){
    var preference = document.getElementById("hidden_preference").value;
    $.ajax({
            url: "/order_book",
            type: "POST",
            data: {product_id: preference},
            success: function (data) {
                //console.log(data)
                var myChart = echarts.init(document.getElementById('map'));
                myChart.clear();
                var time = []
                var ask = [];
                var bid = [];
                var spread = [];
                for (var i=0; i<data.length; i++){
                    var asks = data[i].asks;
                    var bids = data[i].bids;
                    for(var j=0;j<asks.length;){
                        ask.push(asks[j][0]);
                        bid.push(bids[j][0]);
                        spread.push(asks[j][0]-bids[j][0]);
                        j=j+3;
                    };
                }
                console.log("ask:"+ask);
                console.log("bid"+bid);
                console.log("spread"+spread);
                var colors = ['#5793f3', '#d14a61', '#675bba'];
                option = {
                    color: colors,
                    title: {
                        text:"ask/bid price of "+preference,
                    },
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
                            show:false,
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

                    yAxis: {
                        axisLine:{
                            lineStyle:{
                                color:'#4A5675',
                                // width:2  
                            }
                        },
                        name: preference.substring(4,7),
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        scale:true,
                    },
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
function order_chart(){
    var preference = document.getElementById("hidden_preference").value;
    $.ajax({
        url:"/order_book",
        type:"POST",
        data:{product_id:preference},
        success: function (data) {
            console.log(data);
            var myChart = echarts.init(document.getElementById('map'));
            myChart.clear();
            var price = [];

            var volume = [];
            // var strike_price;
            // var bid_price = [];
            // var bid_order_number =[];
            // var ask_price = [];
            // var ask_order_volume = [];

            // for(var i=0;i<data[0].bids.length;i++){
            //     bid_price.push((data[0].bids[i])[0]);
            //     bid_order_number.push((data[0].bids[i])[1]);
            // }
            // for(var j=0;j<data[0].asks.length;j++){
            //     ask_price.push((data[0].asks[j])[0]);
            //     ask_order_volume.push((data[0].asks[j])[1]);
            // }
            // console.log(bid_price.length);
            for(var i=0;i<50;i++){
                price.push(data[0].asks[i][0]);
                price.push(data[0].bids[i][0]);
                volume.push(data[0].asks[i][1]);
                volume.push(data[0].bids[i][1]);
            }
            option = {
                title:{
                    text: "order_book of "+preference,
                    x:'center',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend:{

                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: price,
                    name:'Order Price',
                    nameLocation:'middle',
                    nameTextStyle:{
                        color:"black",
                        fontSize:16,
                        padding:10
                    }
                },
                yAxis: {
                    type: 'value',
                    name:'Order Volume',
                    nameLocation:'middle',
                    nameTextStyle:{
                        color:"black",
                        fontSize:16,
                        padding:10
                    }
                },
                visualMap: {
                    show: false,
                    dimension: 0,
                    pieces: [],  //pieces的值由动态数据决定
                    outOfRange: {
                        color: 'green'
                    }
                },
                series: [{
                    data: volume,
                    type: 'line',
                    barCategoryGap:"1%",
                    barGap: 1,
                    areaStyle: {}
                }]
            };
            for(let i = 0; i < 50; i++) {
                option.visualMap.pieces[i] =  {gte:i,lte:i+1,color:'red'};
            }
            myChart.setOption(option);
        }

    })
}
function mini_chart(id,element_price_id,element_mini_chart_id){
        $.ajax({
            url: "/candle_stick",
            type: "POST",
            data:{product_id: id},
            success: function (data) {
                //console.log(id);
                if (data != null ){
                    //need modify
                    last_price = data[data.length-1].close;
                    var last_price_show = ((document.getElementById(element_price_id)));
                    last_price_show.innerText = last_price+ id.substring(4,7);
                    //mini line chart of each type cryptocurrency
                    var last_price_collection = [];
                    for (var i=0; i<data.length; i++){
                        last_price_collection.push(data[i].close);
                    }
                    mini_last_price_collection = last_price_collection.slice(last_price_collection.length-1000,last_price_collection.length-1);
                    //console.log((document.getElementsByName(element_mini_chart_id))[0]);
                    // var my_miniChart = echarts.init((document.getElementsByName(element_mini_chart_id))[0]);
                    var my_miniChart = echarts.init(document.getElementById(element_mini_chart_id));
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
                            axisLine:{
                                lineStyle:{
                                    color:'#4A5675',
                                    // width:2  
                                }
                            },
                            name: '百分比',
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            show: false,
                            scale:true,
                        },
                        series: [{
                            name: '模拟数据',
                            type: 'line',
                            showSymbol: false,
                            hoverAnimation: false,
                            data: mini_last_price_collection
                        }]

                    }
                    my_miniChart.setOption(mini_option);
                }
            },
            error: function () {
                alert("Fail to get firstChart data!");
            }
        })
    }
