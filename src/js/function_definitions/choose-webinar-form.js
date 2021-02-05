var selectedWebinar = "";
var selectedWebinarMarketo = "";
var webinarValues = "";
var submittedVals = "";
var skipOptionPage = false;
var sndleveldomain = window.location.hostname;

// (1) Load Marketo form with onSuccess function 
// (2) Get webinar values from form
// (3) Set webinar values & display up to 4 dates
// (4) return array of possible webinar values
// (5) Save user inputed data when form is submitted and show next stage
function loadWebinarForm(){
  // // (1)
  MktoForms2.loadForm("//app-sj17.marketo.com", "763-DVL-293", 1734, function(form){
    form.onSubmit(
      function(){
        var vals = form.vals();
        var cBcompanymetricsemployees = document.getElementsByName('cBcompanymetricsemployees')[0];
        if (cBcompanymetricsemployees) {
          if (cBcompanymetricsemployees.value <= 1) {
            vals.companySize = '1';
          }
          else if (cBcompanymetricsemployees.value <= 5) {
            vals.companySize = '2-5';
          } 
          else if (cBcompanymetricsemployees.value <= 20) {
            vals.companySize = '6-20';
          }
          else if (cBcompanymetricsemployees.value <= 50) { 
            vals.companySize = '21-50';
          }
          else if (cBcompanymetricsemployees.value <= 100) { 
            vals.companySize = '51-100';
          }
          else if (cBcompanymetricsemployees.value <= 500) { 
            vals.companySize = '101-500';
          } 
          else {
            vals.companySize = '500+';
          }
        }
    });
    form.onSuccess(function() {
      submittedVals = form.vals();
      if (submittedVals!== "" && submittedVals.prosperWorks101Date === ""){
        window.scrollTo(0,0);
        form.getFormElem().remove(); 
        Cookies.set('demo_gate_form', JSON.stringify(submittedVals), { domain:  sndleveldomain });
        if(!skipOptionPage){
          switch (submittedVals.companySize){
            case '1':
            case '2-5':
              $("#choose-webinar-section1").addClass('d-none');
              $("#choose-webinar-option1").removeClass('d-none');
              viewDemosPage()
              break;
            //  case '2-5':
            //    $("#choose-webinar-section1").addClass('d-none');
            //    $("#choose-webinar-section2").removeClass('d-none');
            //    $("#choose-webinar-confrimation-medium").removeClass('d-none');
            //    break;
            default:
              $("#choose-webinar-section1").addClass('d-none');
              $("#choose-webinar-section2").addClass('d-none');
              $("#choose-webinar-confrimation-large").removeClass('d-none');
              $("#choose-webinar-confrimation").removeClass('d-none');
          }
        } else {
          $("#choose-webinar-section1").addClass('d-none');
          $("#choose-webinar-option1").removeClass('d-none');
        }
        runCapterra();          
      }
      return false;
    }); 
  });
  MktoForms2.whenReady(function(form){
    if(form.getId() === 1734){
      // (2)
      $('#mktoForm_1734').removeClass('mktoLayoutAbove');
      $('.c-footer--simple').removeClass('d-none');
      window.scrollTo(0,0);
      var count = 0;
      var getUserInfo = Cookies.get('demo_gate_form', { domain:  sndleveldomain }) ? JSON.parse(Cookies.get('demo_gate_form', { domain:  sndleveldomain })) : undefined;
      if (getUserInfo) {
        $("#FirstName").val(getUserInfo.FirstName);
        $("#LastName").val(getUserInfo.LastName);
        $("#Email").val(getUserInfo.Email);
        $("#Company").val(getUserInfo.Company);
        // console.log(getUserInfo.companySize);
        $("#companySize").val(getUserInfo.companySize);
        $("#Phone").val(getUserInfo.Phone);
      }
      webinarValues = $("select#prosperWorks101Date option").filter(function(index){
        var now = new Date();
        var current = new Date($(this).text().split(' ')[1]);
        return $(this).val() !== "" && current > now;
      }).map(function(index) {
        // (3)
        count ++;
        if(index < 9){
          var month = $(this).text().split(' ')[1].split('/')[0];
          switch(month){
            case'1':
              month = 'January';
              break;
            case'2':
              month = 'February';
              break;
            case'3':
              month = 'March';
              break;
            case'4':
              month = 'April';
              break;
            case'5':
              month = 'May';
              break;
            case'6':
              month = 'June';
              break;
            case'7':
              month = 'July';
              break;
            case'8':
              month = 'August';
              break;
            case'9':
              month = 'September';
              break;
            case'10':
              month = 'October';
              break;
            case'11':
              month = 'November';
              break;
            case'12':
              month = 'December';
              break;
          }
          var date = $(this).text().split(' ')[1].split('/')[1];
          var day = $(this).text().split(' ')[0].slice(0, 3);
          // If space is added e.g. 2 pm instead of 2pm us this instead
          //var time = $(this).text().split(' ')[2] + ' ' + $(this).text().split(' ')[3] + ' ' +  $(this).text().split(' ')[4];
          var time = $(this).text().split(' ')[2] + ' ' + $(this).text().split(' ')[3];
          $('#c-select-options__item-'+index)
          .css(
            {"display":"inline-flex"}
          );
          $('#c-select-options__item-'+index+ ' .month')
          .text(
            month
          );
          $('#c-select-options__item-'+index+ ' .date')
          .text(
            date
          );
          $('#c-select-options__item-'+index+ ' .time')
          .text(
            day + ', ' +time
          );
        }
        // (4)
        return $(this).val();
      }).get();

      // count set to 1 to always ask for what section to show
      count = 1;
      
      if(count === 0){
        skipOptionPage = true;
      }

    } 
  });
}

// Add selected class to selected time
// Update user inputed data (submittedVals) with chosen webinar 
function selectWebinarTime(option){
  $("#no-webinar-selected").addClass('d-none');
  if(selectedWebinar !== ""){
    $("#c-select-options__item-"+selectedWebinar).removeClass("selected");
  }
  selectedWebinar = option;
  $("#c-select-options__item-"+option).addClass("selected");
  if (webinarValues !== ""){
    selectedWebinarMarketo = webinarValues[selectedWebinar];
  }
}
function runCapterra() { 
  var capterra_vkey = 'bdf9d93f2565930e2fb6cb6b3c348d8c',
    capterra_vid = '2100282',
    capterra_prefix = (('https:' == document.location.protocol) ? 'https://ct.capterra.com' : 'http://ct.capterra.com'); 
    var ct = document.createElement('script');
    ct.type = 'text/javascript';
    ct.async = true;
    ct.src = capterra_prefix + '/capterra_tracker.js?vid=' + capterra_vid + '&vkey=' + capterra_vkey; var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ct, s); 
};


function submitWebinarForm(){
  if(selectedWebinar === ""){
    $("#no-webinar-selected").removeClass('d-none');
    return false;
  }


  MktoForms2.loadForm("//app-sj17.marketo.com", "763-DVL-293", 1734, function(form){
    form.onSuccess(function() {
      submittedVals = form.vals();
      $("#choose-webinar-section1").addClass('d-none');
      $("#choose-webinar-section2").addClass('d-none');
      $("#choose-webinar-confrimation").removeClass('d-none');
      return false;
    });
  });

  MktoForms2.whenReady(function (form) {
    if(form && form.getId() === 1734){
      var formValues = JSON.parse(Cookies.get('demo_gate_form', { domain:  sndleveldomain }));
      formValues.prosperWorks101Date = selectedWebinarMarketo;
      form.setValues(formValues);
      form.submit();
    }  
  });
}

function viewDemosPage(){
  window.scrollTo(0,0);

  // Update footer
  $('.c-footer--simple').addClass('d-none');
  $('.c-footer').removeClass('d-none');
  $('.c-footer__legal').removeClass('d-none');

  // Append wistia scripts to the page
  var mainWistiaScript = document.createElement("script");
    mainWistiaScript.type = "text/javascript";
    mainWistiaScript.src = 'https://fast.wistia.com/assets/external/E-v1.js';
    mainWistiaScript.setAttribute('async', 'async');
    $('#wistia-script').append(mainWistiaScript);

  $.each($('.c-demo-video-script'), function() {
    var videoId = $(this).attr('id').split('videoScript-')[1];
    var src = "https://fast.wistia.com/embed/medias/" + videoId + ".jsonp";
    var wistiaVideoScript = document.createElement("script");
    wistiaVideoScript.type = "text/javascript";
    wistiaVideoScript.src = src;
    wistiaVideoScript.setAttribute('async', 'async');
    $(this).append(wistiaVideoScript);
  });
  $("#choose-webinar-section2").addClass('d-none');
  $("#choose-webinar-option1").removeClass('d-none');
  $("#choose-webinar-confrimation").addClass('d-none');

}
