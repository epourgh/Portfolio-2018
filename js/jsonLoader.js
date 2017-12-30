var header = document.querySelector('header');
var section = document.querySelector('section');
var requestURL = 'https://raw.githubusercontent.com/ampourgh/Portfolio-2018/master/js/webContent.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  var profileInfo = request.response;
  populateHeader(profileInfo);
  showInfo(profileInfo);
  populatenavbar(profileInfo);
}

function populatenavbar(jsonObj) {
  var info = jsonObj['members'];
    for(var i = 0; i < info.length; i++) {
      var link = document.createElement("a");
      var myNavbar = document.getElementById('projectsNavbar');
      var text = document.createTextNode(" " + info[i].projectName);
      link.setAttribute("href", "#" + info[i].projectName.replace(" ", ""));
      link.appendChild(text);
      myNavbar.appendChild(link);

      $(link).on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 320, 'linear');
      });
    }

    for(var i = 0; i < info.length; i++) {
      var link2 = document.createElement("a");
      var myMobileNavbar = document.getElementById('mobileNavbar' + [i]);
      var text2 = document.createTextNode(" " + info[i].projectName);
      link2.setAttribute("href", "#" + info[i].projectName.replace(" ", ""));
      link2.appendChild(text2);
      myMobileNavbar.appendChild(link2);

      $(link2).on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 320, 'linear');
      });
    }
}

function populateHeader(jsonObj) {
  var myH1 = document.createElement('h1');
  myH1.textContent = jsonObj['Name'];
  header.appendChild(myH1);

  socialMedia = ['gitHub', 'linkedIn', 'CodePen', 'reddit', 'twitter', 'gmail']

  String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
  }

  for (i = 0; i < socialMedia.length; i++) {
    var link = document.createElement("a");

    link.href = jsonObj[socialMedia[i]];
    link.alt = socialMedia[i].capitalize();
    link.id = socialMedia[i].capitalize();
    link.class = socialMedia[i].capitalize();
    link.title = socialMedia[i].capitalize();

    var img = document.createElement("img");
    img.src = 'img/' + socialMedia[i] + '.svg';
    link.appendChild(img);

    header.appendChild(link);
}

  var resume = document.createElement("a");
  var myPara = document.createElement("h5");
  resume.href = jsonObj['resume'];
  resume.class = 'resume'
  myPara.textContent = ' Download Resume';
  resume.appendChild(myPara);
  header.appendChild(resume);
}

function showInfo(jsonObj) {
  var info = jsonObj['members'];
  for(var i = 0; i < info.length; i++) {
    var myArticle = document.createElement('article');
    var gitHub = document.createElement("a");
    // var webPage = document.createElement("a");
    var myH2 = document.createElement('h2');
    var myPara1 = document.createElement('p');
    var myPara2 = document.createElement('p');
    var myPara3 = document.createElement('p');
    var myList = document.createElement('ul');

    // Project name
    myH2.textContent = info[i].name;
    myPara1.textContent = 'Project: ' + info[i].projectName;
    myPara1.id = info[i].projectName.replace(" ", "");

    // Project image
    var image = document.createElement("img");
    image.src = 'img/' + info[i].projectName.replace(" ", "") + '.jpg';
    image.class = 'image';
    image.id = 'image';

    // GitHub to project
    gitHub.href = info[i].gitHub;
    gitHub.alt = info[i].projectName.capitalize();
    gitHub.id = info[i].projectName.capitalize();
    gitHub.class = info[i].projectName.capitalize();
    gitHub.title = info[i].projectName.capitalize();

    var imgGitHub = document.createElement("img");
    imgGitHub.src = 'img/gitHub.svg';
    gitHub.appendChild(imgGitHub);

    // About project
    myPara3.textContent = 'Info:';
    var aboutProjects = info[i].aboutProject;
    for(var j = 0; j < aboutProjects.length; j++) {
      var listItem = document.createElement('li');
      listItem.textContent = aboutProjects[j];
      myList.appendChild(listItem);
    }

    // Append to article
    myArticle.appendChild(myH2);
    myArticle.appendChild(myPara1);
    myArticle.appendChild(image);
    myArticle.appendChild(gitHub);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myList);
    section.appendChild(myArticle);
  }
}
