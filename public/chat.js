//Make connection, 接続するsocketを区別したいときはargに固定の値を入力する
var socket = io.connect();

//'https://1d4dfd9d.ngrok.io/'
//http://localhost:3000/

//Query DOM
var message = document.getElementById('message');
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    count = 0,
    canvas = document.getElementById('bargraph')

var mydata = {
    labels: ["会場"],
    datasets: [{
        label: '熱量',
        data: [0],
        }]
    };

var chart = new Chart(canvas,{
    type: 'bar',
    data: mydata,
    options:{
        scales:{
            yAxes:[{
                ticks:{
                    beginAtAero: true,
                    min: 0,
                    max: 10
                }
            }]
        }
        
    }
})

//Emit events
countup.addEventListener('click',function(){
    count += 1;
    socket.emit('tc2server',count);    //tc = tell count
})

countdown.addEventListener('click',function(){
    count -= 1;
    socket.emit('tc2server',count);
})

//Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('tc2front', function(data){
    count = data;
    chart.data.datasets[0].data[0] = count; //棒グラフの値にcountを代入
    chart.update(); //グラフを再描画
});





// btn.addEventListener('click', function(){
//     console.log('click')
//     socket.emit('chat',{
//         message: message.value,
//         handle: handle.value
//     });
//     message.value = "";//送信後にmessageを空に
// });

// handle.addEventListener('keypress',function(){
//     socket.emit('typing',handle.value);
// })

// socket.on('typing',function(data){
//     if (data == ""){
//     feedback.innerHTML = data;
//     } else {
//         feedback.innerHTML = '<p><em>'+data+' is typing a messsage...</em></p>';
//     }
// })