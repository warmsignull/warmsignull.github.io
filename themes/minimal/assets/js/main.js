(function () {
  var storageKey = 'theme-preference';
  var root = document.documentElement;

  function getCurrentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(storageKey, theme);
    } catch (err) {
      // Ignore storage errors (e.g., private mode)
    }
    updateToggleState(theme);
  }

  function updateToggleState(theme) {
    var label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    var icon = theme === 'dark' ? '🌙' : '☀️';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      var iconNode = btn.querySelector('.theme-toggle__icon');
      if (iconNode) {
        iconNode.textContent = icon;
      }
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var stored;
    try {
      stored = localStorage.getItem(storageKey);
    } catch (err) {
      stored = null;
    }
    if (stored && (stored === 'dark' || stored === 'light')) {
      setTheme(stored);
    } else {
      updateToggleState(getCurrentTheme());
    }

    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
        setTheme(next);
      });
      btn.addEventListener('keyup', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          btn.click();
        }
      });
    });

    initTopicsFilter();
  });

  function initTopicsFilter() {
    var container = document.querySelector('[data-topics]');
    if (!container) {
      return;
    }

    var searchField = container.querySelector('[data-tag-search]');
    var tagButtons = Array.from(container.querySelectorAll('[data-tag-list] .tag-pill'));
    var cards = Array.from(container.querySelectorAll('[data-tag-results] .post-card'));
    var emptyMessage = container.querySelector('[data-topics-empty]');

    function getActiveTag() {
      var active = container.querySelector('.tag-pill.is-active');
      return active ? active.getAttribute('data-tag') : 'all';
    }

    function applyFilters() {
      var activeTag = getActiveTag();
      var query = (searchField && searchField.value ? searchField.value : '').trim().toLowerCase();
      var allButton = container.querySelector('[data-tag="all"]');

      tagButtons.forEach(function (btn) {
        if (btn.getAttribute('data-tag') === 'all') {
          btn.style.display = '';
          return;
        }
        var text = btn.textContent || '';
        var matches = !query || text.toLowerCase().indexOf(query) !== -1;
        btn.style.display = matches ? '' : 'none';
      });

      var activeButton = container.querySelector('.tag-pill.is-active');
      if (activeButton && activeButton !== allButton && activeButton.style.display === 'none') {
        tagButtons.forEach(function (btn) {
          btn.classList.toggle('is-active', btn === allButton);
        });
        activeTag = getActiveTag();
      }

      var visibleCount = 0;

      cards.forEach(function (card) {
        var tagAttr = card.getAttribute('data-tags') || '';
        var labelAttr = card.getAttribute('data-tag-labels') || '';
        var tags = tagAttr.split(',').filter(Boolean);
        var labels = labelAttr.split(',').filter(Boolean);
        var matchesQuery = !query || labels.some(function (label) {
          return label.indexOf(query) !== -1;
        });
        var matchesTag = activeTag === 'all' || tags.indexOf(activeTag) !== -1;
        var visible = matchesQuery && matchesTag;
        card.style.display = visible ? '' : 'none';
        if (visible) {
          visibleCount += 1;
        }
      });

      if (emptyMessage) {
        emptyMessage.hidden = visibleCount !== 0;
      }
    }

    tagButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tagButtons.forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });
        applyFilters();
      });
    });

    if (searchField) {
      searchField.addEventListener('input', applyFilters);
    }

    applyFilters();
  }
})();
