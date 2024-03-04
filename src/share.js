document.addEventListener('DOMContentLoaded', function () {
    const createShareHtml = function (shareData) {
      let anchorList = [];
      const anchorTemplate = function (item) {
        return '<a href="' + item.href + '" target="_blank" rel="noopener" class="item">' + item.img + '</a>';
      }
      const wrapperTemplate = function (anchorList) {
        return anchorList.join('');
      }
      shareData.forEach(function (item) {
        anchorList.push(anchorTemplate(item));
      })
      return wrapperTemplate(anchorList);
    }
    const $socialShare = document.querySelector('.share .items');
    if ($socialShare) {
      const url = encodeURIComponent(location.protocol + '//' + location.host + location.pathname);
      const shareData = [{
          img: '<img src="../src/assets/vk.svg" alt="vk">',
          href: 'https://vk.com/share.php?url=' + url,
        },
        {
          img: '<img src="../src/assets/okru.svg" alt="ok">',
          href: 'https://connect.ok.ru/offer?url=' + url,
        },
        {
          img: '<img src="../src/assets/moymir.svg" alt="moymir">',
          href: 'https://connect.mail.ru/share?url=' + url,
        },
        {
          img: '<img src="../src/assets/twitter.svg" alt="twitter">',
          href: 'https://twitter.com/intent/tweet?url=' + url,
        },
        {
          img: '<img src="../src/assets/viber.svg" alt="viber">',
          href: 'viber://pa?chatURI=' + url,
        },
        {
          img: '<img src="../src/assets/tg.svg" alt="tg">',
          href: 'https://t.me/share/url?url=' + url,
        }
      ];
      const $html = createShareHtml(shareData);
      $socialShare.innerHTML = $html;
    }
  });
