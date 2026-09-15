
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
const input = document.getElementById('testInput');

// yanzheng
// ========== 第一部分：你之前的基础练习（保留） ==========
var char = 'A'
console.log(char)
console.log(typeof(char))
var str = 'hello world'
console.log(str)
console.log(typeof(str))
// 数值数据类型
var num = 100
console.log(num)
console.log(typeof(num))

// ========== 第二部分：项目实战（简历按钮交互） ==========
// 等待 HTML 页面加载完毕后再执行（因为你用了 defer，其实这里也可以直接写，但用这个更保险）
document.addEventListener("DOMContentLoaded", function() {
    // 1. 获取按钮元素
    var sendBtn = document.getElementById('sendEmailBtn');
    
    // 2. 如果找到了这个按钮，就给它绑定点击事件
    if (sendBtn) {
        sendBtn.onclick = function() {
            // 使用 prompt 获取用户名字
            var userName = prompt('请输入您的名字，以便我更好地回复您：');
            
            // 如果用户点了取消，或者没输入名字，就直接结束
            if (!userName) {
                alert('您取消了发送，输入不能为空哦！');
                return;
            }
            
            // 使用 confirm 二次确认
            var isSend = confirm('您好 ' + userName + '，确定要发送邮件吗？');
            
            if (isSend) {
                // 使用 alert 提示
                alert('准备跳转到邮件应用...');
                // 核心：拼接邮件内容并跳转
                var emailUrl = "mailto:mdusbsssb@qq.com?subject=来自简历的沟通&body=你好，我是" + encodeURIComponent(userName);
                window.location.href = emailUrl;
            } else {
                alert('已取消发送');
            }
        };
    }
});