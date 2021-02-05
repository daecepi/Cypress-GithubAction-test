 
// Check for validate
$('#consentBox').change(function(){ 
  cb = $(this);
  cb.val(cb.prop('checked'));
});

// Save url utms
// if(window.localStorage.getItem("sourceUtms")){
//   $("a[href='/demos']").attr("href","/demos" + window.localStorage.getItem("sourceUtms"));
// };

// var sourceUrl = window.location.href;
// // console.log(sourceUrl);
// if(sourceUrl.indexOf("utm_expid") >= 0){
// } else if (sourceUrl.indexOf("?utm") >= 0) {
//   var utmsSource = sourceUrl.indexOf("?");
//   var utms = sourceUrl.substr(utmsSource);
//   window.localStorage.setItem("sourceUtms",utms);
//   $("a[href='/demos']").attr("href","/demos"+utms);
// };

// $('#newsletter-contact').on('input', function() { 
//   var val = $(this).val() // get the current value of the input field.
//   $("#Email").val(val);
// });
  
  