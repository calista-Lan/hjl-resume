
(function () {
  'use strict';

 
  var EMAIL = 'mdusbsssb@qq.com';
  var SUBJECT = '来自简历页面的联系';
  var BODY = '你好，黄锦澜：\n\n';

  
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return legacyCopy(text); }
      );
    }
    // 以本地文件（file://）直接打开时，剪贴板 API 常不可用，走旧方案
    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-1000px;left:-1000px;opacity:0;';
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }

  /* ---------- 触发 mailto：用离屏 <a> 比直接改 location.href 更稳 ---------- */
  function openMailClient(url) {
    var a = document.createElement('a');
    a.href = url;
    a.style.cssText = 'position:fixed;top:-1000px;left:-1000px;';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  /* ---------- 初始化 ---------- */
  function init() {
    var btn = document.getElementById('sendEmailBtn');
    if (!btn) {
      console.warn('[简历] 未找到 #sendEmailBtn，发送邮件功能未启用');
      return;
    }

    var tip = document.getElementById('sendEmailTip');

    btn.addEventListener('click', function () {
      openMailClient(
        'mailto:' + EMAIL +
        '?subject=' + encodeURIComponent(SUBJECT) +
        '&body=' + encodeURIComponent(BODY)
      );

      // 兜底提示：无法探测客户端是否真的打开，因此先复制好地址再告知
      copyText(EMAIL).then(function (ok) {
        if (!tip) return;
        tip.textContent = ok
          ? '若未自动打开邮件客户端，邮箱 ' + EMAIL + ' 已复制，可粘贴到任意邮箱发送'
          : '若未自动打开邮件客户端，请手动发送至 ' + EMAIL;
      });
    });
  }

  // 脚本带 defer，正常情况 DOM 已就绪；此处兼容被内联引入的场景
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
