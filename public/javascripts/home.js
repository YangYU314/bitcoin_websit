$(document).ready(function() {
    var myChart;
    var candle_timer;
    var worldmap_timer;
    var askbid_timer;
    var news_list;
    var chart_id = 1;
    check_preference_appear();
    var t1 = window.setInterval("mini_chart(\"BTC-USD\",\"price1\",\"volume1\")", 60000);
    var t2 = window.setInterval("mini_chart(\"BTC-GBP\",\"price2\",\"volume2\")", 60000);
    var t3 = window.setInterval("mini_chart(\"BTC-EUR\",\"price3\",\"volume3\")", 60000);
    var t4 = window.setInterval("mini_chart(\"ETC-USD\",\"price4\",\"volume4\")", 60000);
    var t5 = window.setInterval("mini_chart(\"ETC-GBP\",\"price5\",\"volume5\")", 60000);
    var t6 = window.setInterval("mini_chart(\"ETC-EUR\",\"price6\",\"volume6\")", 60000);

    mini_chart("BTC-USD", "price1", "volume1");
    mini_chart("BTC-GBP", "price2", "volume2");
    mini_chart("BTC-EUR", "price3", "volume3");
    mini_chart("ETC-USD", "price4", "volume4");
    mini_chart("ETC-GBP", "price5", "volume5");
    mini_chart("ETC-EUR", "price6", "volume6");

    candlestick_chart();
    refresh_controller(chart_id);

    var controller_timer = window.setInterval(function () {
        refresh_controller(chart_id);
    }, 60000);
    $.ajaxSetup({async: false});
    $("#preference").change(function () {
        var selected = $(this).children('option:selected').val();
        document.getElementById("hidden_preference").value = selected;
        head_price_volume();
        if (chart_id == 1) {
            console.log("now is candle");
            candlestick_chart();
        }
        if (chart_id == 2) {
            console.log('now is map');
            new_worldmap_node();
        }
        if (chart_id == 3) {
            console.log("now is bid&ask");
            bid_ask_chart();
        }
        if (chart_id == 4) {
            console.log("now is orderbook")
            order_chart();
        }
        if (chart_id == 5) {
            console.log("now is compare")
            compare_price_chart();
        }
    });
    $("#news").click(function () {
        $.ajax({
            url: "/news",
            type: "GET",
            async: false,
            success: function (data) {
                if (data != null) {
                    news_list = data;
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
    $('#logout').click(function () {
        click_logout();
    });
    $("#setting").click(function () {
        click_setting();
    })
    $('#candle_chart').click(function () {
        chart_id = 1;
        candlestick_chart();
    });
    $('#map_chart').click(function () {
        chart_id = 2;
        new_worldmap_node();
    });
    $("#orderbook_chart").click(function () {
        chart_id = 4;
        order_chart();
    });
    $("#test_world").click(function () {
        chart_id = 5;
        //world_map_draw();
        //node_draw();
        //bitcoin_network();
        //test_draw();
        compare_price_chart();
    })
})
function head_price_volume() {
    var preference = document.getElementById("hidden_preference").value;
    $.ajax({
            url: "/candle_stick",
            type: "POST",
            data: {product_id: preference},
            success: function (data) {
                if (data != null) {

                    var home_head_h1_show= document.getElementById("home_head_h1");
                    home_head_h1_show.innerText = preference;
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
                }
                }
            })
        }
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
                    let M = ((unixTimestamp.getMonth() + 1) > 10 ? (unixTimestamp.getMonth() + 1) : + (unixTimestamp.getMonth() + 1))
                    let D = (unixTimestamp.getDate() > 10 ? unixTimestamp.getDate() :  + unixTimestamp.getDate())
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
                        data: ['1min', 'MA5', 'MA10', 'MA20', 'MA30'],
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
                            name: '1min',
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
    $.ajax({
        url: "/world_map",
        type: "GET",
        success: function (data) {
            //console.log("map data:"+data[0].city)
            var myChart = echarts.init(document.getElementById('map'));
            myChart.clear();
            var resultList = [];
            for (var i in data) {
                var city = data[i].city;
                var coord = [];
                coord.push(data[i].longitude);
                coord.push(data[i].latitude);
                var item = {
                    name: city,
                    value: coord,
                };
                resultList.push(item);
            }
            console.log('world_map_1list:'+resultList[0].name+resultList[0].value)
            // for (var i=0; i<data.length; i++){
            //     var temp= [];
            //     //need modify
            //     temp.push(data[i].longitude);
            //     temp.push(data[i].latitude);
            //     temp.push(data[i].city);
            //     coord.push(temp);
            //
            // }
                //console.log(coord);
                option = {
                    tooltip:{
                        trigger:'item',
                        formatter: '{c}'+resultList.name,
                    },
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
                                show:false,
                            }
                        }
                    },
                    series: [
                        {
                            name: 'node',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: resultList.value,
                            symbolSize: 3,
                            label: {
                                normal: {
                                    show:false,
                                },
                                emphasis: {
                                    show:false,
                                }
                            },
                            itemStyle: {
                                color: 'gold',
                                emphasis: {
                                    color:'red',
                                    borderColor: 'gold',
                                    borderWidth: 0.5
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
                    backgroundColor: '#2f323c',
                    color: colors,
                    title: {
                        text:"ask/bid price of "+preference,
                        textStyle:{
                            color:"#ffffff",
                        },
                    },
                    tooltip: {
                        trigger: 'none',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    legend: {
                        textStyle:{//图例文字的样式
                            color:'#ffffff',
                            fontSize:16
                        },
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
            console.log(data[0]);
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
            var order_length = 0;
            if(data[0].asks.length<data[0].bids.length){
                order_length = data[0].bids.length;
            }else{
                order_length = data[0].asks.length;
            }
            for(var i=0;i<order_length;i++){
                price.push(data[0].asks[i][0]);
                price.push(data[0].bids[i][0]);
                volume.push(data[0].asks[i][1]);
                volume.push(data[0].bids[i][1]);
            }
            option = {
                backgroundColor: '#2f323c',
                title:{
                    text: "Order Book of "+preference,
                    x:'center',
                    textStyle:{
                        color:"#ffffff",
                    },
                },

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: price,
                    name:'Order Price/'+preference.substring(4,7),
                    nameLocation:'middle',
                    nameTextStyle:{
                        color:"#ffffff",
                        fontSize:16,
                        padding:10
                    }
                },
                yAxis: {
                    type: 'value',
                    name:'Order Volume/'+preference.substring(0,3),
                    nameLocation:'middle',
                    nameTextStyle:{
                        color:"#ffffff",
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
                    name:'Volume',
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
function refresh_controller(chart_id){
    console.log("chartid:"+chart_id);
    if(chart_id==1){
        console.log("now is candle refresh");
        candlestick_chart();
    }
    if(chart_id == 2){
        console.log('now is map refresh');
        new_worldmap_node();
    }
    // if(chart_id == 3){
    //     console.log("now is bid&ask refresh");
    //     bid_ask_chart();
    // }
    if(chart_id == 4){
        console.log("now is order book refresh")
        order_chart();
    }
    if(chart_id == 5){
        console.log("now is network refresh")
        //bitcoin_network();
        //test_draw();

    }

}
function bitcoin_network() {
    var myChart = echarts.init(document.getElementById('map'));
    myChart.clear();
    option = {
        title: {
            text: "bitcoin network",
        },
        geo: {
            map: "world",
        },
    }
    myChart.setOption(option);
    setTimeout(network(),2000);
    function network() {
        var ws = new WebSocket("wss://bitnodes.earn.com/ws-nodes/nodes");
        ws.onmessage = evt =>{
            let str = eval("("+evt.data+")");
            var coord = [];
            var info;
            for(var i=0;i<1;i++){

                var temp = [];
                temp.push(str[i][6]);
                temp.push(str[i][5])
                coord.push(temp);
                info =  str[i][1]+":"+str[i][2]+ "|"+str[i][3];
                options = {
                    tooltip: {
                        formatter:'{c}'+ info,
                    },
                    series: [
                        {
                            name: 'node',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: coord,
                            symbolSize: 10,
                            label: {
                                normal: {
                                    show: false,
                                },
                                emphasis: {
                                    show: false,
                                }
                            },
                            itemStyle: {
                                color: 'red',
                                emphasis: {
                                    color: 'red',
                                    borderColor: 'red',
                                    borderWidth: 0.5,
                                    normal: {label : {show: true}}
                                }
                            }
                        }
                    ],
                }

                myChart.setOption(options);
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex:0 ,//第几条series
                    dataIndex: 0,//第几个tooltip
                });

            }
            ws.close();



            // myChart.dispatchAction({
            //     type: 'showTip',
            //     seriesIndex:1 ,//第几条series
            //     dataIndex: 1,//第几个tooltip
            // });
            }
        }
        // ws.onmessage = function (data) {
        //     var fuck_data = data.data;
        //     var raw_data = fuck_data.toString();
        //     console.log(raw_data);
        //     raw_data = raw_data.replace(/\[|]/g,"");
        //     raw_data = raw_data.replace(/\"/g,"");
        //     var raw_data_collection = raw_data.split(",");
        //     console.log(raw_data_collection);
        //     var coord = [];
        //     for (var i=5; i<raw_data_collection.length; i+=7){
        //         var temp= [];
        //         //need modify
        //         temp.push(parseFloat(raw_data_collection[i+1]));
        //         console.log(parseFloat(raw_data_collection[i+1]));
        //         temp.push(parseFloat(raw_data_collection[i]));
        //         console.log(parseFloat(raw_data_collection[i]));
        //         coord.push(temp);
        //     }
        //     console.log("coord:"+coord);
        //     for (var i=5; i<raw_data_collection.length; i+=7) {
        //         options = {
        //
        //             tooltip: {
        //                 formatter: '{c}'+raw_data_collection[i-2],
        //                 hideDelay: 20000,
        //             },
        //             series: [
        //                 {
        //                     name: 'node',
        //                     type: 'scatter',
        //                     coordinateSystem: 'geo',
        //                     data: coord,
        //                     symbolSize: 10,
        //                     label: {
        //                         normal: {
        //                             show: false,
        //                         },
        //                         emphasis: {
        //                             show: false,
        //                         }
        //                     },
        //                     itemStyle: {
        //                         color: 'red',
        //                         emphasis: {
        //                             color: 'red',
        //                             borderColor: 'red',
        //                             borderWidth: 0.5
        //                         }
        //                     }
        //                 }
        //             ],
        //         }
        //     }
        //     setInterval(function () {
        //
        //         myChart.dispatchAction({
        //             type: 'showTip',
        //             seriesIndex:0 ,//第几条series
        //             dataIndex: 0,//第几个tooltip
        //         });
        //     },500);
        //     myChart.setOption(options);
        //
        //
        // }
    //}
}
function world_map_draw(){
    myChart = echarts.init(document.getElementById('map'));
    myChart.clear();
    option = {
        title: {
            text: "bitcoin network",
        },
        geo: {
            map: "world",
        }
    }
    myChart.setOption(option);
}
function node_draw(){
    var ws = new WebSocket("wss://bitnodes.earn.com/ws-nodes/nodes");
    ws.onmessage = evt => {
        let str = eval("(" + evt.data + ")");
        var coord = [];
        var info;
        for (var i = 0; i < 1; i++) {
            var temp = [];
            temp.push(str[i][6]);
            temp.push(str[i][5])
            coord.push(temp);
            info = str[i][1]+":"+str[i][2]+"["+str[i][3]+"-"+str[i][4]+"]";
            console.log("coord:"+coord);
            console.log("info:"+info);
            option = {
                tooltip:{
                    show:true,
                    formatter:str[i][1]+":"+str[i][2]+"["+str[i][3]+"-"+str[i][4]+"]",
                },
                series: [
                    {
                        name: info,
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: coord,
                        symbolSize: 10,
                        itemStyle: {
                            color: 'red',
                        }
                    }
                ],
            }
            myChart = echarts.init(document.getElementById('map'));
            myChart.setOption(option);
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex:1 ,//第几条series
                dataIndex: 1,//第几个tooltip
            });
        }
        ws.close();
    }

}
function bitcoin_node_data_getter() {
    var ws = new WebSocket("wss://bitnodes.earn.com/ws-nodes/nodes");
    ws.onmessage = evt => {
        let str = eval("(" + evt.data + ")");

        var coord = [];
        for (var i = 0; i < 1; i++) {
            var temp = [];
            let info = str[i][1]+":"+str[i][2]+"["+str[i][3]+"-"+str[i][4]+"]";
            temp.push(str[i][6]);
            temp.push(str[i][5])
            coord.push(temp);
            var myData=[{name:info,value:coord}]
        }

        return myData;
    }
}
function new_worldmap_node(){
    var myChart = echarts.init(document.getElementById('map'));
    myChart.clear();
    $.ajax({
            url: "/world_map",
            type: "GET",
            success: function (data) {
                console.log("mapdata:"+data[0].IP);
                var world_node_timer = window.setInterval(function () {
                    draw_world_node();
                }, 3000);

                function draw_world_node() {
                    var myChart = echarts.init(document.getElementById('map'));
                    myChart.clear();
                    var resultList = [];
                    var randomList = [];
                    //devide into 10 parts to display
                    for(var k=0;k<((data.length)*0.001);k++){
                        var random_num = Math.floor(Math.random()*(data.length-0+1)+0);

                        randomList.push(random_num);
                    }
                    console.log(randomList);
                    for (var i=0;i<randomList.length;i++) {
                        console.log("i=="+randomList[i]);
                        var index=randomList[i];
                        var city = data[index].IP+">"+data[index].city;
                        var coord = [];
                        coord.push(data[index].longitude);
                        coord.push(data[index].latitude);
                        var item = {
                            name: city,
                            value: coord,
                        };
                        resultList.push(item);
                    }
                    var option = {
                        tooltip:{

                            formatter:'{b}:{c}',
                            itemStyle : { normal: {label : {show: true, position: 'top'}}},
                        },

                        geo:{
                            map:"world",
                        },

                        series: [
                            {
                                name: '',
                                type: 'scatter',
                                coordinateSystem: "geo",
                                data: resultList,
                                symbolSize: 3,
                                itemStyle : {
                                    normal: {
                                        label : {
                                            fontSize: 8,
                                            show: true,
                                            position: 'top',
                                            formatter:'{b}:{c}',
                                }}},
                            }
                        ],

                    }
                    myChart = echarts.init(document.getElementById('map'));
                    myChart.clear();
                    myChart.setOption(option);
                }
            },
            error: function () {
                alert("Fail to get firstChart data!");
            }
        }
    )


}
function compare_price_chart(){
    $.ajax({
        url:"/compare_price",
        type:"GET",
        success:function (data) {
            myChart = echarts.init(document.getElementById('map'));
            myChart.clear();
            myChart.showLoading();
            var gdax_time_scale=[];
            var gemini_time_scale=[];
            var bitfinex_time_scale=[];
            var kraken_time_scale=[];
            var gdax_data=[];
            var gemini_data=[];
            var bitfinex_data=[];
            var kraken_data=[];
            for(var i in data){
                //console.log("compare time:"+data[i].timestamp)
                //console.log("compare data:"+data[i].exchange+data[i].quote+data[i].price+data[i].timestamp);
                if(data[i].exchange == "gdax"){
                    gdax_time_scale.push(data[i].timestamp);
                    gdax_data.push(data[i].price);
                }
                if(data[i].exchange == "bitfinex"){
                    bitfinex_time_scale.push(data[i].timestamp);
                    bitfinex_data.push(data[i].price);
                }
                if(data[i].exchange == "gemini"){
                    gemini_time_scale.push(data[i].timestamp);
                    gemini_data.push(data[i].price);
                }
                if(data[i].exchange == "kraken"){
                    kraken_data.push(data[i].price);
                    kraken_time_scale.push(data[i].timestamp);
                }
            }


            var colors = ['#5793f3', '#000000', '#ba1c94','#00FF00'];


            option = {
                color: colors,

                tooltip: {
                    trigger: 'item',

                },
                legend: {
                    data:['gdax', 'bitfinex','gemini','kraken']
                },
                grid: {
                    top: 70,
                    bottom: 50
                },
                xAxis: [
                    {
                        name: "TIME",
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
                                    return 'gdax price  ' + params.value
                                        + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                }
                            }
                        },
                        data: gdax_time_scale,
                    },
                    {
                        type: 'category',
                        show: false,
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
                                    return 'bitfinex price  ' + params.value
                                        + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                }
                            }
                        },
                        data:bitfinex_time_scale,
                    },
                    {
                        type: 'category',
                        show: false,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: colors[2]
                            }
                        },
                        axisPointer: {
                            label: {
                                formatter: function (params) {
                                    return 'gemini price  ' + params.value
                                        + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                }
                            }
                        },
                        data:gemini_time_scale,
                    },
                    {
                        type: 'category',
                        show: false,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: colors[3],
                            }
                        },
                        axisPointer: {
                            label: {
                                formatter: function (params) {
                                    return 'kraken price  ' + params.value
                                        + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                                }
                            }
                        },
                        data:kraken_time_scale,
                    },
                ],
                yAxis: [
                    {
                        name: "LAST_PRICE",
                        type: 'value',
                        scale:true,
                    }
                ],
                series: [
                    {
                        name:'gdax',
                        type:'line',
                        smooth: true,
                        data: gdax_data,
                    },
                    {
                        name:'bitfinex',
                        type:'line',
                        smooth: true,
                        data: bitfinex_data,
                    },
                    {
                        name:'gemini',
                        type:'line',
                        smooth: true,
                        data: gemini_data,
                    },
                    {
                        name:'kraken',
                        type:'line',
                        smooth: true,
                        data: kraken_data,
                    },

                ],
                dataZoom:[{
                     　type:"inside",
            　　}],
            };
            myChart.hideLoading();
            myChart.setOption(option);
        }
    })
}
function check_preference_appear() {
    var preference = document.getElementById("hidden_preference").value;
    document.getElementById('preference').value = preference;
}