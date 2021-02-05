# BAM (Brand & Marketing) Style Guide

---

**NOTE: Under Construction please excuse the ugliness**

---

Welcome to our style guide, we are buidling it out as we write our codebase because it helps us with the following:
1. How we  organise our code
2. Naming conventions 
3. Guidence for new devs/contractors 
4. Inventory of our components 


### Marketo Prefill Functionailty 

Use the code below to enable prefill functionality, simply replace FORMID with the id of the form you want to point to. 


```html
<script>
  getMarketoLead(function (leadData) {
    MktoForms2.loadForm("//app-sj17.marketo.com", "763-DVL-293", FORMID)
    .whenReady(function (form) {
      form.vals(leadData);

      form.onSuccess(function(x, y) {
        form.getFormElem().css({
          "display": "none"
        });
        $(".js-form-success").css({
          "display": "block"
        });
        return false;
      });  
    });
  });
</script>
```



We are currently tracking the following fields: 

Email
FirstName
LastName
Phone
companySize
currentCRM_account
emailProvider
Industry
company

To track a new field the rest API name (that can be found on Marketo) of the field must be given to a dev and they need to add it to src/js/function_definitions/form-customiser.js & web/proxy/get-lead.php