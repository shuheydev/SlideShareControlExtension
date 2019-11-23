$(async function () {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl('https://signalrcorepractice20191006060526.azurewebsites.net/chathub')
        .withAutomaticReconnect({
            nextRetryDelayInMilliseconds: retryContext => {
                return Math.random() * 10000;
            }
        })
        .build();

    connection.onclose(function (message) {

    });

    connection.onreconnecting(function (message) {
        console.log("connecting");
    });

    connection.onreconnected(function (message) {
        console.log("connected");
    });

    let btnNext = $('#btnNext');
    let btnPrev = $('#btnPrevious');

    //サーバーからのメッセージ受信時の処理
    connection.on('receive', function (message, from) { //サーバー側からこのreceiveが呼び出されたときに実行されるfunctionを登録する
        console.log(message);

        document.body.style.background = message;

        if (message.match(/next/)) {
            btnNext.click();
        }
        else if (message.match(/prev/)) {
            btnPrev.click();
        }
    });

    // //サーバーにメッセージを送る処理
    // //Sendボタンが押されたときの処理.Clickイベントにイベントハンドラを設定している.
    // document.getElementById('send').addEventListener('click', async function () { //サーバー側のメソッド名を文字列で
    //     //テキストボックス内の文字列を取得
    //     var value = document.getElementById('message').value;

    //     //サーバー側のSendメソッドにvalue(= message)を渡して実行する.
    //     //文字列でサーバー側のsendメソッドを指定する
    //     await connection.invoke('send', value, "Browser"); //サーバー側のメソッド名を文字列で

    //     var textBox = document.getElementById('message');
    //     textBox.value = "";
    //     textBox.focus();
    // });

    //接続開始
    await connection.start();

    // //切断
    // document.getElementById('close').addEventListener('click', async function () {
    //     connection.stop();
    // });


    function composeMedia(message, from) {
        var div1 = document.createElement('div');
        div1.classList.add('media');
        var a1 = document.createElement('a');
        a1.href = "#";
        a1.classList.add('mr-3');
        var img1 = document.createElement('img');
        img1.src = "";
        var div2 = document.createElement('div');
        var h5 = document.createElement('h5');
        h5.classList.add('mt-0');
        h5.classList.add('text-danger');
        h5.innerText = from;
        div2.innerText = message;

        a1.insertAdjacentElement('afterbegin', img1);
        div2.insertAdjacentElement('afterbegin', h5);
        div1.insertAdjacentElement('afterbegin', div2);
        div1.insertAdjacentElement('afterbegin', a1);

        return div1;
    }
});