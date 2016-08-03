$(document).ready(function() {
  // call the tablesorter plugin
  $('.table').tablesorter({
    // Sort on the second column, in ascending order
    sortList: [[1,0]]
  });
});
