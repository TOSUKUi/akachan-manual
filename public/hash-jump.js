// ハッシュジャンプ（SSG + 水合対策）：初期レイアウト後と水合後に各 1 回。
// index.html のインラインスクリプトだったもの（CSP の script-src 'self' を通すため外部化）。
;(function () {
  function jump() {
    if (!location.hash) return
    var id = decodeURIComponent(location.hash.slice(1))
    if (id === 'top') {
      window.scrollTo(0, 0)
      return
    }
    var el = document.getElementById(id)
    if (el) el.scrollIntoView()
  }
  requestAnimationFrame(jump)
  setTimeout(jump, 600)
})()
