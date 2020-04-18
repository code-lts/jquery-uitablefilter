$(function () {
  var theTable = $('table.food_planner')

  theTable.find("tbody > tr").find("td:eq(1)").mousedown(function () {
    $(this).prev().find(":checkbox").click()
  });

  $("#filter").keyup(function () {
    $.uiTableFilter(theTable, this.value);
  })

  $('#filter-form').submit(function () {
    theTable.find("tbody > tr:visible > td:eq(1)").mousedown();
    return false;
  }).focus(); //Give focus to input field
});
