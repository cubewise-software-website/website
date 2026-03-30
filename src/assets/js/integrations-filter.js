document.querySelectorAll('.integrations-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    document.querySelectorAll('.integrations-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.integration-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
