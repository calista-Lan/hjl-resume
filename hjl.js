const sendEmailBtn = document.getElementById('sendEmailBtn');

if (sendEmailBtn) {
  sendEmailBtn.addEventListener('click', () => {
    alert('Hello Lan');

    // 如果以后要真正发邮件，可以改成：
    // window.location.href = 'mailto:mdusbsssb@qq.com?subject=关于简历的沟通';
  });
}