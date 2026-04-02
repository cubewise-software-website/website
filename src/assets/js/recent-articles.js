(function () {
  var grid = document.getElementById('recentArticlesGrid')
  if (!grid) return

  fetch('/assets/blog-index.json')
    .then(function (r) { return r.json() })
    .then(function (posts) {
      if (!posts.length) {
        grid.closest('.recent-articles').hidden = true
        return
      }
      grid.innerHTML = posts.slice(0, 6).map(function (p) {
        var imgHtml = p.image
          ? '<div class="article-card-image"><img src="' + p.image + '" alt="' + p.title + '"></div>'
          : ''
        return '<a class="article-card" href="/' + p.path + '/">'
          + imgHtml
          + '<div class="article-card-body">'
          + '<h3 class="article-card-title">' + p.title + '</h3>'
          + '<p class="article-card-excerpt">' + p.excerpt + '</p>'
          + '</div>'
          + '</a>'
      }).join('')
    })
    .catch(function () {
      var section = grid.closest('.recent-articles')
      if (section) section.hidden = true
    })
})()
