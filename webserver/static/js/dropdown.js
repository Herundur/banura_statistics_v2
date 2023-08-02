$(document).ready(function () {
    let searchTimeout; // Variable to store the search timeout ID

    // Function to perform the search
    function performSearch(query) {
      $.ajax({
        url: '/search',
        data: { 'q': query },
        dataType: 'json',
        success: function (data) {
          // Clear the previous suggestions
          $('#autocomplete-suggestions').empty();
          // Populate the dropdown with the new suggestions
          let i = 0
          for (let i = 0; i < 15; i++) {
            let suggestion;
            let user = data[i]
            if (user.nickname) {
              suggestion = `<a class="dropdown-item" href="#">${user.username} | ${user.nickname}</a>`;
            } else {
              suggestion = `<a class="dropdown-item" href="#">${user.username}</a>`;
            }
            $('#autocomplete-suggestions').append(suggestion);
          };

          // Show the dropdown
          $('.dropdown').addClass('show');
        }
      });
    }

    // When the user types in the search bar
    $('#search-bar').on('input', function () {
      const query = $(this).val().trim();

      // Clear the previous search timeout
      clearTimeout(searchTimeout);

      // If the search query is not empty, set a new timeout to perform the search
      if (query !== '') {
        searchTimeout = setTimeout(function () {
          performSearch(query);
        }, 300); // Adjust the timeout value (in milliseconds) as needed
      } else {
        // If the search query is empty, hide the dropdown
        $('#autocomplete-suggestions').empty();
        $('.dropdown').removeClass('show');
      }
    });

    // When the user hits Enter in the search bar
    $('#search-bar').on('keypress', function (e) {
      if (e.which === 13) { // Check if the Enter key is pressed (key code 13)
        e.preventDefault(); // Prevent form submission
        const query = $(this).val().trim();
        performSearch(query);
      }
    });

    // Function to handle form submission and click event on dropdown items
    function handleSearch(event) {
        event.preventDefault(); // Prevent default form submission or link behavior
  
        const query = $(this).text().trim() || $('#search-bar').val().trim(); // Get the clicked name or input value
        if (query !== '') {
          //console.dir(query)
          window.location.href = `/nutzerprofil?q=${encodeURIComponent(query)}`;
        }
      }
  
      // Handle form submission when the user hits Enter
      $('#search-bar').on('keyup', function (event) {
        if (event.keyCode === 13) { // Enter key has key code 13
          handleSearch.call(this, event);
        }
      });
  
      // Handle click event on dropdown items
      $(document).on('click', '.dropdown-item', handleSearch);
  });