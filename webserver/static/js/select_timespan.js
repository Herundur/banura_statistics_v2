const select = document.getElementById("timespanSelect")
select.addEventListener('change', function() {
    var selectedOption = this.value;
    window.location.href = '/dashboard?zeitspanne=' + encodeURIComponent(selectedOption);
  });