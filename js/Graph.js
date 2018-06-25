(function($) {
  Drupal.behaviors.myBehavior = {
    attach: function (context, settings) {
      Graph = document.getElementById('graph');
      $('[name="attempt"]').on('change', function() {
        var content_id = $('[name="content_id"]').val().trim();
        var username = $('[name="username"]').val().trim();
        var attempt = $('[name="attempt"]').val().trim();
        if(content_id != '' && username != '' && attempt != ''){
          var obj = {};
          obj['content_id'] = content_id;
          obj['username'] = username;
          obj['attempt'] = attempt;
          obj = JSON.stringify(obj);
          $.ajax({
            type: "POST",
            url: "getjson" ,
            data: obj,
            contentType: "application/json",
            success: function(data){
            	console.log(data);
            }
          });
        }
      });
    }    
  }
})(jQuery);