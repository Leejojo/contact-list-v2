$(document).ready(function() {


//This will iterate through the json data and make html list
  $.ajax({
    url: "/api/v1/contacts",
    type: "GET"
  }).then(function(data) {
    var contactHtml = "";

    data.forEach(function(contact) {
      contactHtml += "<li class='contact'>" 
        + "<p class='name'>" + contact.firstname + " " + contact.lastname + "</p>" 
        + "<p class='info'>" + contact.email
          + "<br>" + contact.address
          + "<br>" + contact.phonenumber
          + "<br>" + "<button class='delete' data-client-id='" + contact.id + "'> Delete </button>"
        + "</p>"
      + "</li>";
    });

    $("div#contacts > ul").append(contactHtml);

//This will hide contact info once page is loaded
    $(".info").hide();
//This will toggle contact info by the click handler
    $(document).on('click', '.name', function(e) {
      $(this).siblings('.info').toggle();
    })

    $(".delete").click(function() {
      var $button = $(this);
      $.ajax({
        url: "/api/v1/contacts/" + $button.data("client-id"),
        type: "DELETE"
      }).then(function() {
        $button.closest('.contact').remove()
      });
    });
  });

  $("#searchForm").submit(function(ev) {
    ev.preventDefault();

    $.ajax({
      url: "/api/v1/contacts/search",
      type: "GET",
      data: $(this).serialize()
    }).then(function(res) {

      $.each( res, function( name, value ) {
       var contactHtml = "<li class='contact'>" 
        + "<p class='name'>" + value.firstname + " " + value.lastname + "</p>" 
        + "<p class='info'>" + value.email
          + "<br>" + value.address
          + "<br>" + value.phonenumber
          + "<br>" + "<button class='delete' data-client-id='" + value.id + "'> Delete </button>"
        + "</p>"
      + "</li>"; 
      
      $('#result').append(contactHtml);
      });
    });
  });


//This will allow user to add a new contact 
  $("#newContactForm").submit(function(ev) {
    ev.preventDefault();
    var $form = $(this);
    var url = $form.attr('action');
    
    $.ajax({
      url: url,
      type: 'POST',
      data: $form.serialize()
    }).then(function(contact) {
      var contactHtml = "<li class='contact'>" 
        + "<p class='name'>" + contact.firstname + " " + contact.lastname + "</p>" 
        + "<p class='info'>" + contact.email
          + "<br>" + contact.address
          + "<br>" + contact.phonenumber
          + "<br>" + "<button class='delete' data-client-id='" + contact.id + "'> Delete </button>"
        + "</p>"
      + "</li>";

      $("div#contacts > ul").append(contactHtml);

      $form.trigger("reset");
      
      $(".info").hide();
      
      $(".delete").click(function() {
        var $button = $(this);
        $.ajax({
          url: "/api/v1/contacts/" + $button.data("client-id"),
          type: "DELETE"
        }).then(function() {
          $button.closest('.contact').remove()
        });
      });
    });
  });

});


