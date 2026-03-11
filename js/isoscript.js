// init Isotope
var $grid = $('.iso-grid').isotope({
  itemSelector: '.item',
  layoutMode: 'masonry',
  masonry: {
    columnWidth: 20,
    gutter: 1,
    fitWidth: true
  },
  getSortData: {
    name: function(elem) {
      return $(elem).find('.iso-name').text().toLowerCase().trim();
    },
    date: '[data-date] parseInt'
  },
  sortBy: 'original-order'
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.isotope('layout');
});

// STATE
var filters = [];
var filterMode = 'and';
var currentSort = null;
var currentDirection = null;

// UPDATE PARENT URL
function updateParentURL() {

  const parentURL = new URL(window.parent.location.href);
  const params = parentURL.searchParams;

  // SORT
  if (currentSort) {
    params.set('sort', currentSort);
    params.set('direction', currentDirection ? 'asc' : 'desc');
  } else {
    params.delete('sort');
    params.delete('direction');
  }

  // MODE
  params.set('mode', filterMode);

  // FILTERS
  if (filters.length) {
    params.set('filters', filters.join('|'));
  } else {
    params.delete('filters');
  }

  window.parent.history.replaceState({}, '', parentURL);
}


// RESTORE STATE FROM PARENT URL
function restoreFromParentURL() {

  const params = new URLSearchParams(window.parent.location.search);

  // restore filter mode
  const mode = params.get('mode');
  if (mode === 'and' || mode === 'or') {
    filterMode = mode;
    $('#modeToggle').text('Mode: ' + filterMode.toUpperCase());
  }

  // restore filters
  const filterParam = params.get('filters');
  if (filterParam) {
    filters = filterParam.split('|');

    // update filter buttons
    $('.filters button').each(function() {
      const filter = $(this).attr('data-filter');
      if (filters.includes(filter)) {
        $(this).addClass('is-checked');
      }
    });
  }
  applyFilters();

  // restore sorting
  const sort = params.get('sort');
  const direction = params.get('direction');

  if (sort) {
    currentSort = sort;
    currentDirection = direction === 'desc' ? false : true;

    $('.sorts button').removeClass('asc desc');

    var $btn = $('.sorts button[data-sort="' + currentSort + '"]');
    $btn.addClass(currentDirection ? 'asc' : 'desc');

    $grid.isotope({
      sortBy: currentSort,
      sortAscending: currentDirection
    });
  }
}

// FILTERING
function applyFilters() {

  if (filters.length === 0) {
    $grid.isotope({ filter: '*' });
    updateParentURL();
    return;
  }

  var filterValue;

  if (filterMode === 'or') {
    filterValue = filters.join(',');
  } else {
    filterValue = filters.join('');
  }

  $grid.isotope({
    filter: filterValue
  });
  updateParentURL();
}

// FILTER BUTTON CLICK
$('.filters').on('click', 'button', function (event) {

  var $target = $(event.currentTarget);
  $target.toggleClass('is-checked');

  var filter = $target.attr('data-filter');
  var index = filters.indexOf(filter);

  if (index === -1) {
    filters.push(filter);
  } else {
    filters.splice(index, 1);
  }

  applyFilters();
});

// MODE TOGGLE
$('#modeToggle').on('click', function () {

  filterMode = (filterMode === 'or') ? 'and' : 'or';
  $(this).text('Mode: ' + filterMode.toUpperCase());

  applyFilters();
});

// TRI-TOGGLE SORTING
$('.sorts').on('click', 'button', function () {

  var sortByValue = $(this).attr('data-sort');

  if (currentSort !== sortByValue) {
    currentSort = sortByValue;
    currentDirection = true;
  } else {

    if (currentDirection === true) {
      currentDirection = false;
    } else {
      // third click reset
      currentSort = null;
      currentDirection = null;

      $('.sorts button').removeClass('asc desc');

      $grid.isotope({
        sortBy: 'original-order',
        sortAscending: true
      });

      updateParentURL();
      return;
    }
  }
  $('.sorts button').removeClass('asc desc');

  var $btn = $('.sorts button[data-sort="' + currentSort + '"]');
  $btn.addClass(currentDirection ? 'asc' : 'desc');

  $grid.isotope({
    sortBy: currentSort,
    sortAscending: currentDirection
  });
  updateParentURL();
});
restoreFromParentURL()