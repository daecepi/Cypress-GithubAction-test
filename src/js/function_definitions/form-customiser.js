// Set Marketo cookie
$.ajax({
  url: '//munchkin.marketo.net/munchkin.js',
  dataType: 'script',
  cache: true,
  success: function () {
    Munchkin.init('763-DVL-293');
  }
});

// Get lead info based on marketo cookie
function getMarketoLead(getData) {
  var url = encodeURIComponent(Cookies.get('_mkto_trk'));

  if (url === undefined) {
    getData([]);
  }

  $.ajax({
    type: "GET",
    url: '/proxy/get-lead.php?cookieValue=' + url,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (result) {
      var mktoLeadFields = result.result[0] || {};
      var data =  {
        "Email": mktoLeadFields.email,
        "FirstName": mktoLeadFields.firstName,
        "LastName": mktoLeadFields.lastName,
        "Phone" : mktoLeadFields.phone,
        "companySize": mktoLeadFields.companySize,
        "currentCRM_account" : mktoLeadFields.currentCRM_account,
        "emailProvider" : mktoLeadFields.emailProvider,
        "Industry": mktoLeadFields.industry,
        "Company" : mktoLeadFields.company
      };
      getData(data);
    },
    error: function () {
      getData([]);
    }
  });

}
