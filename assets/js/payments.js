/* ============================================================
   Qinglan 支付配置文件 — 你唯一需要编辑的文件
   ------------------------------------------------------------
   填好后无需改其他代码。两个通道都填可双开；只填一个也行。
   ============================================================ */

window.QL_PAYMENTS = {

  /* ① Stripe Payment Links（必填项之一）
     获取方式：app.stripe.com → Payment links → New
     为每个商品创建一个 Payment Link（价格=页面售价，币种 USD），
     然后把每个商品的链接粘到对应 id 后面的引号里。
     id 必须与 index.html 中 PRODUCTS 数组里的 id 完全一致。 */
  stripeLinks: {
    // "p1": "https://buy.stripe.com/xxxxxxxx",
    // "p2": "https://buy.stripe.com/xxxxxxxx",
    // ... 其余商品同理
  },

  /* ② PayPal Business（必填项之一）
     developer.paypal.com → My apps & credentials → Live →
     Create App → 复制 Client ID 粘到下面引号里。
     币种默认 USD，在 PayPal 后台 Account settings 里确认。 */
  paypalClientId: "", // 例: "AeXXXXXXXXXXXXXXXXXXXXXXXX"

  paypalCurrency: "USD",

  /* 免邮门槛（与页面 FREE_SHIP 保持一致） */
  freeShipThreshold: 49,
  flatShipping: 5.90
};
