# TechSelection
This document includes three sections, technology selection and rationale, technology analysis and team analysis.

##Technology Selection and Rationale

###Deployment Platform
**Heroku** 

###Back Tier

**Node.js with express.js**

**PostgreSQL**

###Front Tier
**HTML5**, **CSS** and **JavaScript** are basic and standard web stacks. Each web application will use them.

**AngularJS**: In AngularJS, declarative paradigm is used for creating patterns, which makes code more lightweight, as well as easier to read and iterate. As we have many iterations during the entire SE Project, we should use AngularJS instead of JQuery. More advantages are in the "technology analysis" section.


**Bootstrap** 
is a free front-end framework for faster and easier web development. In Bootstrap 3, mobile-first styles are part of the core framework. Bootstrap is compatible with all modern browsers (Chrome, Firefox, Internet Explorer, Safari, and Opera). As mentioned in the use cases, the user interface will be accessed from a standard browser, including mobile browsers. So we choose this framework in our front tier.

###Communication Between the Two Tiers

**Socket.io**



##Technology Analysis

###Heroku

**Strength**:

* As a PaaS, you can migrate and start your apps relatively quickly
* No worries of configuring load balancer, database cluster, deployment system and log aggregation; Heroku has already done these jobs in advance
* Deployment is very easy by simply Pushing your code into git repo provided by Heroku
* Easy to install multiple horizontal app instances on Heroku.

**Weakness**:

* Lack of flexibility to modify the underlying infrastructure; however, you can do such thing on AWS
* Limited by the range of languages, databases and environments
* Files stored on Heroku’s proprietary filesystem will disappear after the server is shut down
* No way to increase RAM, storage, or CPU performance. Additional storage must be hosted separately through a service such as Amazon S3. Application performance can only be improved by increasing the number of running dynos.
* Heroku only runs on AWS instances in us-east and eu-west
* Slightly more expensive compared to AWS and Google App

**Gap**:

* Heroku is very easy to onboard through its official HelloWorld tutorial. We choose this tutorial to get ourselves onboarded
* It's a fully managed black-box solution with excellent documentation, and they are consistently improving it with an eye to usability.

**Reference**:

* <http://stackoverflow.com/a/9803182/4570372>
* <https://www.upguard.com/articles/heroku-ec2>
* <http://stackoverflow.com/a/13965061/4570372>

###PostgreSQL

**Strength**:

* It is well integrated with Heroku
* It is open source, so it doesn’t bring extra costs.
* It has a strong community which provides knowledge bases and Q&A for free.
* It runs on all major operating systems, such as Linux, UNIX (e.g. Mac OS X, * Solaris) and Windows
* It supports storage of a variety of binary large objects, including pictures, sounds, or video
* It has data types such as arrays and key/value pairs which are not supported by MySQL
* PostgreSQL supports analytic functions similar as Oracle (not open source), while MySQL does not.
* It has complete support for reliable transactions, which guarantees Atomicity, Consistency, Isolation and Durability (ACID).
* Standardization. Its SQL follows standard (ANSI-SQL:2008)

**Weakness**:

* It is not read optimized. Heavy read operations can make it slow compared to counterparts like MySQL
* It is hard to do replication with PostgreSQL (for people who don’t have lots of database and system administration experience) compared to MySQL
* Not as popular as MySQL, therefore may get less to reference when we meet problems

**Gap**:

* The team needs to learn how to setup a PostgreSQL database on Heroku.
* The team needs to learn how to connect to and query PostgreSQL database using Javascript

**Reference**:

* <https://www.postgresql.org/about/>
* <https://www.heroku.com/postgres>
* <https://www.digitalocean.com/community/tutorials/sqlite-vs-mysql-vs-postgresql-a-comparison-of-relational-database-management-systems>
* <https://www.wikivs.com/wiki/MySQL_vs_PostgreSQL>

###Node.js with express.js

**Strength**:

* Use Javascript in both front-end and server-end
* Unlike its competitors like Rails and Django, which have an opinionated way of building applications, express has no "best way" do something. It is very flexible and pluggable.
* Fit for real-time, multi-user web application.
* It's Fast. V8 compiles and executes JavaScript at lightning speeds mainly due to the fact that V8 compiles JavaScript into native machine code.

**Weakness**:

* JavaScript's semantics
* Hard to make things fault-tolerant
* Reliance on stringly-typed programming

**Gap**:

* asynchronous I/O

**Reference**:

* <http://www.infoworld.com/article/2975233/javascript/why-node-js-beats-java-net-for-web-mobile-iot-apps.html>
* <https://www.quora.com/What-are-the-disadvantages-of-using-Node-js>
* <http://blog.modulus.io/top-10-reasons-to-use-node>
* <http://www.tutorialspoint.com/nodejs/>
* <http://www.tutorialspoint.com/nodejs/>




###AngularJS

**Strength**:

* Modular development
* Two-way data-binding
* AngularJS Allows Developers to Express UI Declaratively and Reduce Side Effects
* Angular modifies the page DOM directly instead of adding inner HTML code. That is faster.

**Weakness**:

* Angular is big and complicated. With multiple ways to do the same thing it is hard to tell which way is better for particular task. 
* The lifecycle of Angular application is complex, and to master it you really need to read the code.
* More than 2000 watchers can severely lag the UI. That limits the complexity of your Angular forms, especially big data grids and lists.

**Gap**:

* Though we all want to learn it, we are not very familiar with it.
* The AngularJS version of Bootstrap is different from the original one 

**Reference**:

* <http://devcenter.wintellect.com/jlikness/10-reasons-web-developers-should-learn-angularjs>
* <http://blog.softelegance.com/angularjs/angularjs-advantages-and-limitations/>
* <https://www.quora.com/What-are-the-advantages-of-using-AngularJS-over-JQuery>



###Bootstrap

**Strength**:

* Easy to use: Anybody with just basic knowledge of HTML and CSS can start using Bootstrap.
* Responsive features: Bootstrap's responsive CSS adjusts to phones, tablets, and desktops
* Mobile-first approach: In Bootstrap 3, mobile-first styles are part of the core framework
* Browser compatibility: Bootstrap is compatible with all modern browsers (Chrome, Firefox, Internet Explorer, Safari, and Opera)

**Weakness**:

* Weak when it comes to complex data entry screens. 
* It's very customizable, but inevitably many sites start looking alike (just like Wordpress—consider how many blog sites look the same).
* Javascript is tied to jQuery (it's by the far the most common javascript library though and the plugins can just as easily be left unused).

**Gap**：

* We are familiar with the original Bootstrap, but as we want to use AngularJS, the Bootstrap designed for that version is relatively new to us.

**Reference**：

* <http://www.w3schools.com/bootstrap/bootstrap_get_started.asp>
* <http://stackoverflow.com/questions/14227000/pros-cons-of-switching-to-twitter-bootstrap>
* <https://www.quora.com/What-are-the-pros-and-cons-of-using-Bootstrap-in-web-development>




##Team Analysis

###Strength
Through the FSE Chat Room, all of us are adept at NodeJS, ExpressJS, HTML5, CSS, Javascript, Socket.io and at least one database. We are all good at back tier development.

###Weakness
Though we have used Bootstrap before, we are not familiar with the AngularJS version of Bootstrap. We don't have much experience in frot end development.

###Gap
We haven't used AngularJS in our previous projects. We know little about Heroku and PostgreSQL.

###Plan
Learn those technologies we are not familiar with. Each of us makes a demo independently, using all the development stacks selected, and deploys it to the heroku.








