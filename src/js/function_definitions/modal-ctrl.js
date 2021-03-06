function openLeadershipModal(leader) {

  var leaderTitle = {
    "CEO" : {
        "profileImage"  :   "/imgs/about/dennis-ceo-1.jpg",
        "leaderName"    :   "Dennis Fois",
        "leaderBio"     :   "Dennis is enjoying a broad international career spanning over 25 years in various countries across Europe and the US. During this time, he’s had the privilege of developing and leading high-performing multicultural teams at both startups and public companies in the technology and financial services sector. (It’s a good thing he loves traveling.)\
                            <br><br>Most recently, Dennis was the CEO At Newvoicemedia where he led the company to accelerate international growth and ultimately an acquisition by Vonage. Before Newvoicemedia, Dennis was the CEO at Rant & Rave. He’s also held senior leadership positions at eGain, Barclays, Solera and ADP.\
                            <br><br>Dennis advises and mentors a number of technology startups and VC teams at various stages of growth and scale.\
                            <br><br>In his free-ish time, Dennis enjoys spending time with his family, keeping fit, and reading—he has developed a keen interest in (read: slight obsession with) anything that relates to leadership and behavioral science, so send any book recos his way!",
        "leaderTitle"   :   "CEO",
        "socialLinks"  :   {
                              "linkedin"  : "https://www.linkedin.com/in/dennisfois",
                              "twitter"   : "https://twitter.com/dennisfois?lang=en"
                            }
    },
    "CFO" : {
        "profileImage" :   "/imgs/about/MG.jpg",
        "leaderName"   :   "M.G. Thibaut",
        "leaderBio"    :   "After spending her formative years in banking, M.G. devoted 6 years to Yahoo in business operations and strategy. She then moved over to the startup world, where she’s been ever since – leading Finance & Operations teams at Revision3 (acquired by Discovery Communications), Strava, and Ruby Ribbon.\
                            <br><br>M.G. obtained her BA from Stanford, and went on to receive an MBA from Tuck School of Business at Dartmouth. She now resides in Burlingame with her husband, her 2 girls, and a dog named Roux. While numbers may be her game at work, she’s also a pro in the kitchen - she did a brief stint in culinary school, and loves to try out new recipes on her family.",
        "leaderTitle"  :   "Chief Financial Officer",
        "socialLinks"  :   {
                              "linkedin"  : "https://www.linkedin.com/in/mgthibaut/",
                              "twitter"   : ""
                            }
    },
    "counsel" : {
        "profileImage" :   "/imgs/about/ben.jpg",
        "leaderName"   :   "Ben Hance",
        "leaderBio"    :   "Ben has represented industry-leading companies for over 15 years.  He has worked on a wide range of corporate transactions, including numerous private and public fundraisings, corporate acquisitions and partnerships.  Ben also advises on data privacy and legal compliance initiatives at Copper.  Before moving to the San Francisco Bay Area, Ben worked at leading law firms in New York, London and Houston.  Ben holds a JD from Yale Law School and a BA from St. John’s College in Santa Fe.",
        "leaderTitle"  :   "General Counsel",
        "socialLinks"  :   {
                              "linkedin"  : "https://www.linkedin.com/in/ben-hance-b838a254/",
                              "twitter"   : ""
                            }
    },
    "CTO" : {
        "profileImage" :   "/imgs/about/Kelly.jpg",
        "leaderName"   :   "Kelly Cheng",
        "leaderBio"    :   "As CTO and co-founder of Copper, Kelly Cheng guides infrastructure and feature development. Kelly started his career in 2002 after receiving his EECS degree from UC Berkeley. He then joined eBay where he made contributions on the search front-end team and internal tools team for 6 years. Kelly also worked at 23andMe as a full-stack developer before joining Jon at DNA Games as their first server engineer.\
        <br><br>\
        Kelly lives in the South Bay with his wife and two kids. He is an avid knitter and prefers cooked vegetables over raw.",
        "leaderTitle"  :   "CTO and Co-founder",
        "socialLinks"  :   {
                              "linkedin"  : "https://www.linkedin.com/in/chriskcheng/",
                              "twitter"   : ""
                            }
    },
    "CPO" : {
        "profileImage" :   "/imgs/about/jon-CPO.jpeg",
        "leaderName"   :   "Jon Aniano",
        "leaderBio"    :   "As CPO, Jon is responsible for the Product Management and UX teams at Copper. Jon brings over 15 years of experience building SaaS products in both startups and large software companies. Before joining Copper, Jon spent 7 years leading various product and UX teams at Salesforce, most recently running the Product Management team for the Service Cloud.\
                            <br><br>Jon lives in San Mateo with his family. He enjoys great food, karaoke, retro gaming, classic sci-fi and is a connoisseur of fine enterprise software.",
        "leaderTitle"  :   "Chief Product Officer",
        "socialLinks"  :   {
                              "linkedin"  : "",
                              "twitter"   : ""
                            }
    },
    "CPPLO" : {
      "profileImage" :   "/imgs/about/Charles.jpg",
      "leaderName"   :   "Charles Ashworth",
      "leaderBio"    :   "Charles is the Chief People Officer at Copper, leading the Human Resources organization. With over 25 years as a technology executive in prominent people-oriented companies like Riverbed, PeopleSoft, FinancialForce, and eBay, Charles brings thought provoking views in areas of driving innovative, high performance cultures designed to encourage employee success.\
                          <br><br>In his spare time, Charles is active in the transformation of human resources in business, publishing and speaking on the changing landscape of the profession. He also spends his time working with non profit organizations focused on creating a better life for developmentally disabled adults.",
      "leaderTitle"  :   "Chief People Officer",
      "socialLinks"  :   {
                            "linkedin"  : "https://www.linkedin.com/in/charlesashworth/",
                            "twitter"   : "https://twitter.com/CIAshworth"
                          }
    },
    "VPP" : {
      "profileImage" :   "/imgs/about/Wyndham_Bio.jpg",
      "leaderName"   :   "Wyndham Hudson",
      "leaderBio"    :   "Wyndham has spent over 10 years (despite his young looks) creating products that have been used by thousands of people around the world. He's passionate about bringing people together to build products that users love, and at Copper he saw an opportunity to bring that to the CRM market. Most recently, he led the Contact Centre solution from NewVoiceMedia—he joined the company when there were just a handful of employees and saw it through global expansion and an acquisition by Vonage.\
                          <br><br>A UK native, he's relocated to San Francisco and in his spare time loves to spend it outdoors, whether it's cycling, hiking, snowboarding or another new hobby he's picked up. He now spends as much time reading about psychology, culture and team building as he does about product—so if you have any good book recommendations, let him know!",
      "leaderTitle"  :   "VP Product",
      "socialLinks"  :   {
                            "linkedin"  : "https://www.linkedin.com/in/wyndhamhudson/"
                          }
    },
    "VPG" : {
      "profileImage" :   "/imgs/about/Olga_Bio.jpg",
      "leaderName"   :   "Olga Lykova",
      "leaderBio"    :   "She spent 7+ years in the Salesforce ecosystem focusing on growing partnerships across Salesforce, GSIs, RSIs and ISVs. Then, at Apttus, she focused on working on key enterprise accounts with Salesforce, Deloitte and Accenture. At NewVoiceMedia, Olga tackled enterprise and focused on growing mid-market and general business accounts. Most recently, she's joined Copper to focus on the SMB space where innovation happens much more quickly.\
                          <br><br>Before tech, Olga was in the world of finance working at Morgan Stanley. Olga has an MBA in Finance and Marketing from Quinlan School of Business, Loyola University. This was in Chicago, where she could only spend one winter—before speeding up her graduation date due to Chiberia weather conditions. During her MBA program, she participated in Google's Global Challenge, where a team of MBA students collaborated with a local small business to help them grow by using a tech stack and Google AdWords, so being at Copper now is 100% full circle.\
                          <br><br>In her spare time, Olga launched a Women in Industries network in 2015, which is now an annual C-level panel hosted in San Francisco where the network is exposed to multiple non-profits including Breast Cancer Fund, San Francisco Fire Department, La Casa De las Madres and more. Coming from a big Ukrainian family, Olga loves to cook and have guests over—she is constantly experimenting with new recipes. A random fact about Olga: she's a professional badminton player.",
      "leaderTitle"  :   "VP Global Alliances",
      "socialLinks"  :   {
                            "linkedin"  : "https://www.linkedin.com/in/olgalykova/"
                          }
    },
    "HO" : {
      "profileImage" :   "/imgs/about/eugen-ilie-HO.jpg",
      "leaderName"   :   "Eugen Ilie",
      "leaderBio"    :   "Eugen Ilie, Head of Growth at Copper, is responsible for the strategy and implementation of various tactics that will help Copper's growth across various business areas, including on-boarding, product retention and product expansion. Eugen has over 15 years of experience in the space, with a broad knowledge of product development and digital marketing across various verticals such as FinTech, online lead marketplaces and SaaS for small businesses.\
                          <br><br>\
                          His recent tenure includes companies like LendUp and most recently GoDaddy where he managed a multitude of marketing channels and products. Most of his passion is growth hacking, analytics and solving big problems in a sustainable and scalable manner.\
                          <br><br>\
                          When he is not at work, Eugen enjoys being up in the mountains with his wife and growing family, especially during the winter months where he can be found snowboarding. As a Romanian native, he still has an accent, and enjoys reminding people of his origins in Transylvania, home of Dracula’s Castle.",
      "leaderTitle"  :   "Head of Growth",
      "socialLinks"  :   {
                            "linkedin"  : "https://www.linkedin.com/in/eugenilie/"
                          }
    },
    "VPS" : {
      "profileImage" :   "/imgs/about/kent.jpg",
      "leaderName"   :   "Kent Holland",
      "leaderBio"    :   "Kent leads Copper's global sales organization and has deep go-to-market experience. Prior to Copper, Kent was a business development leader at Box, helped drive new product launches and sales strategy at LinkedIn, and started his career in the strategy and operations consulting practice at Deloitte. He holds a BA in Business Economics from Brown, and an MBA from Stanford’s Graduate School of Business.",
      "leaderTitle"  :   "VP Sales",
      "socialLinks"  :   {
                            "linkedin"  : "https://www.linkedin.com/in/kentwholland/"
                          }
    },
    "VCS" : {
      "profileImage" :   "/imgs/about/emilia.jpg",
      "leaderName"   :   "Emilia D’Anzica",
      "leaderBio"    :   "Emilia D’Anzica has dedicated the past 20 years to customer experience. Before joining Copper as Chief Customer Officer, she was a Partner at a Silicon Valley Management Consulting firm, Winning by Design. She also led customer success and customer marketing teams as VP of Customer Engagement at WalkMe and as Director of Customer Operations at BrightEdge. As the 9th employee and first full-time Customer Success hire for Jobvite she was critical to growing the customer base from 5 to 1500 over the course of six years. She has worked for global companies in Denmark, Canada, France, Italy, and the USA. She has been named one of the topmost influential leaders in Customer Success.\
                          <br><br>\
                          Emilia obtained her BA from The University of British Columbia and went on to receive an MBA from St. Mary's College of California. She also holds PMP and Scrum certification. She now resides in Sonoma County with her husband, her three children, and a rescue dog named Bear.",
      "leaderTitle"  :   "Chief Customer Officer",
      "socialLinks"  :   {
                            "linkedin"  : "https://www.linkedin.com/in/emiliadanzica/"
                          }
    },
    "VPE" : {
      "profileImage" :   "/imgs/about/cory.jpg",
      "leaderName"   :   "Cory Thomas",
      "leaderBio"    :   "Cory has spent over 20 years building SaaS applications and engineering teams; well before “SaaS” was a well-known term. He’s worked across many verticals including enterprise information management, custom web applications, health care, edtech, and digital product design. As well as various sized organizations ranging from scrappy startups to large-scale multinationals.\
                          <br><br>\
                          Before Copper, he was Director of Engineering at InVision where he led teams delivering InVision’s Cloud, Freehand, DSM and Studio products along with partner integrations. Prior to that, Cory held the VP Engineering role at Xello growing the team four-fold while shaping engineering culture and best practices.\
                          <br><br>\
                          Beyond the office, Cory volunteers his time mentoring current and future engineering leaders. He also loves spending time doing outdoor activities. Anything from snowboarding to long, relaxing walks listening to an audiobook.",
      "leaderTitle"  :   "VP Engineering",
      "socialLinks"  :   {
                            "linkedin"  : "https://www.linkedin.com/in/corythomas"
                          }
    },
    "CMO" : {
      "profileImage"  :   "/imgs/about/cs.png",
      "leaderName"    :   "Carrie Shaw",
      "leaderBio"     :   "Carrie is a seasoned marketing executive with deep roots in product management. Most recently she was CMO of Quandl, a fintech startup acquired by Nasdaq in 2018. Prior to that she helped the venture capital arm of Rogers Communications incubate several startups in Canada. She began her career as a product manager at Microsoft, where she helped build and launch such classics as Encarta Encyclopedia, Microsoft Money, and MSN services for some of the earliest mobile devices. Before transitioning into marketing, she consulted for several organizations as a product manager, including Sony, This Tech (acquired by Comcast), Digitas, and Time Warner Cable.\
                          <br><br>\
                          Carrie is a long-time volunteer for Progress Place, a non-profit organization providing support to people with severe and persistent mental illness. She currently serves as board chair.\
                          <br><br>\
                          She holds an undergraduate degree from the University of Waterloo, and a Masters from Rensselaer Polytechnic Institute.\
                          <br><br>\
                          Carrie lives in Toronto with her husband, her daughter, and their two dogs. She is a golfer (working on it), a runner (getting slower, but still loves it), and a water skier (when the water is warm).",
      "leaderTitle"   :   "CMO",
      "socialLinks"  :   {
                            "linkedin"  : "https://www.linkedin.com/in/carriepascal"
                          }
    },
    "VPOP" : {
      "profileImage"  :   "/imgs/about/LD.png",
      "leaderName"    :   "Lorraine Dorrow",
      "leaderBio"     :   "Lorraine has worked in Human Resources for over 15 years and her expertise was honed by working in industries ranging from Media to Venture Capital to Fitness.  She has helped high growth startups starting with anywhere from 15-200 employees scale fast to obtain their business goals. Additionally, she has been a part of larger companies such as Equinox and Time Inc. Lorraine obtained her SHRM-SCP certification from the Society of Human Resource Management and holds a BA in Psychology from University of Michigan (Go Blue!).\
                          <br><br>\
                          Lorraine has lived in Washington DC, New York City, London and now San Francisco. And SF wins as the best city for nature (not weather though). Outside of work you'll find her hiking and reading books on anything people - how to new build habits, leadership, and motivation.\
                          ",
      "leaderTitle"   :   "VP of People",
      "socialLinks"  :   {
                            "linkedin"  : "https://www.linkedin.com/in/lorrainedorrow"
                          }
    },
  } 

  var actualLeader = leaderTitle[leader];
  
  $("#leader-name").text(actualLeader.leaderName);
  $("#leader-image").attr("src", actualLeader.profileImage);
  // <sl:translate>
  $("#leader-title").text(actualLeader.leaderTitle);
  $("#leader-bio").html(actualLeader.leaderBio);
  if( actualLeader.socialLinks.linkedin ){
    $(".social-links .s-linkedin").attr("href",actualLeader.socialLinks.linkedin).css("display","block");
  }else{
    $(".social-links .s-linkedin").css("display","none");
  }
  if( actualLeader.socialLinks.twitter ){
    $(".social-links .s-twitter").attr("href",actualLeader.socialLinks.twitter).css("display","block");
  }else{
    $(".social-links .s-twitter").css("display","none");
  }
  
  
  // </sl:translate>
 
  document.getElementById("l-modal--overlay").style.display = "flex";

}

function openToolModal(toolId, toolName, toolDescription, toolCategory, toolPrice, toolRecomendation, appImage) {
      $("#tool-name").text(toolName);

      $("#tool-description").children().remove();
      $("#tool-description").append(toolDescription);

      $("#tool-category").text(toolCategory);
      $("#tool-price-text").text(toolPrice);
      $("#tool-recomendation-text").text($.parseHTML(toolRecomendation)[0].innerText);
      $(".tool--app-image img").attr("src",""+appImage+"");
      
      document.getElementById("l-modal--overlay").style.display = "flex";
}

function closeModal() {
  document.getElementById("l-modal--overlay").style.display = "none";
}

