document.querySelectorAll('.source-tabs-nav').forEach(nav => {
  const buttons = nav.querySelectorAll('.source-tab-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      const section = nav.closest('.source-tabs-section');

      section.querySelectorAll('.source-tab-btn').forEach(b => b.classList.remove('active'));
      section.querySelectorAll('.source-tab-panel').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = section.querySelector('#tab-' + tabId);
      if (panel) panel.classList.add('active');
    });
  });
});
