function check() {
  // 表示されている全てのメモを取得する
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load","true");
    // メモをクリックした場合に実行する処理を定義
    post.addEventListener("click", () => {
      // どのメモをクリックしたのか、カスタムデータを利用して取得
      const postId = post.getAttribute("data-id");
      // Ajaxに必要なオブジェクトを生成
      const XHR = new XMLHttpRequest();
      // openでリクエストを初期化
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスタイプを指定（json）
      XHR.responseType = "json";
      // sendでリクエストを送信
      XHR.send();
      // レスポンスを受け取った時の処理
      XHR.onload = () => {
        if (XHR.status != 200){
          // レスポンスのHTTPステータスを解析し、該当するエラーメッセージをアラートで表示
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // 処理を終了
          return null;
        }
        // レスポンスされたデータを変数itemに代入
        const item = XHR.response.post;
        if(item.checked == true){
        // 既読状態であれば灰色に変わるcssを適用するためのカスタムデータを追加
          post.setAttribute("data-check","true");
        }else if(item.checked == false){
          // 未読状態であればカスタムデータを削除
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);