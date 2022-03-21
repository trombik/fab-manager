// this script loads the google tag manager, used by Google Analytics V4

((trackingId) => {
  window.dataLayer = window.dataLayer || [];
  function gtag () { window.dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', trackingId);

  const node = document.createElement('script');
  const firstScript = document.getElementsByTagName('script')[0];
  node.async = true;
  node.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  firstScript.parentNode.insertBefore(node, firstScript);
})();
