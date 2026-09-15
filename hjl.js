document.addEventListener('DOMContentLoaded', function () {
  var EMAIL = 'mdusbsssb@qq.com';

  /* ---------- 发送邮件：唤起本地邮件客户端 ---------- */
  var mailBtn = document.getElementById('sendEmailBtn');
  var tip = document.getElementById('sendEmailTip');

  if (mailBtn) {
    mailBtn.addEventListener('click', function () {
      var url = 'mailto:' + EMAIL +
        '?subject=' + encodeURIComponent('来自简历页面的联系') +
        '&body=' + encodeURIComponent('你好，黄锦澜：\n\n');

      // 用隐藏 <a> 触发，比直接赋值 location.href 更稳
      var a = document.createElement('a');
      a.href = url;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      var copied = false;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).catch(function () {});
        copied = true;
      }
      if (tip) {
        tip.textContent = copied
          ? '若未自动打开邮件客户端，邮箱 ' + EMAIL + ' 已复制，可粘贴到任意邮箱发送'
          : '若未自动打开邮件客户端，请手动发送至 ' + EMAIL;
      }
    });
  }

  /* ---------- 打印 / 存为 PDF ---------- */
  var printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', function () {
      window.print();
    });
  }

  console.log('hjl.js 已加载');
});
