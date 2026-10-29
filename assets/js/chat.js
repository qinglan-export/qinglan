/* ============================================================
   Lueur 线上客服 —— Tawk.to 免费实时聊天
   开通步骤（约 5 分钟，全程免费）：
   1. 打开 https://www.tawk.to 注册免费账号（选 Free 套餐即可）
   2. 添加 Property：填网站名 Lueur + 网址
   3. 进入 Administration → Chat Widget，复制两串字符：
      - Property ID（形如 65a1b2c3d4e5f6a7b8c9d0e1）
      - Widget ID  （形如 1i0abc123，一般只有 8 位左右）
   4. 把两串字符填到下面引号里，保存并重新发布即可。
   5. 顾客在网站右下角发起聊天，你在 Tawk.to 网页版或手机 App
      （Web/Messenger/iOS/Android 都有）实时回复，可设自动欢迎语。
   未填 ID 时：客服窗口不显示，站点其余功能不受影响。
   ============================================================ */
window.QL_CHAT = {
  tawkPropertyId: "",   /* ← 填 Property ID */
  tawkWidgetId: ""      /* ← 填 Widget ID */
};
(function () {
  var cfg = window.QL_CHAT || {};
  if (!cfg.tawkPropertyId || !cfg.tawkWidgetId) {
    console.log("[Lueur] Live chat not configured yet — add your Tawk.to Property ID and Widget ID in assets/js/chat.js");
    return;
  }
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://embed.tawk.to/" + encodeURIComponent(cfg.tawkPropertyId) + "/" + encodeURIComponent(cfg.tawkWidgetId);
  s.charset = "UTF-8";
  s.setAttribute("crossorigin", "*");
  document.body.appendChild(s);
})();
