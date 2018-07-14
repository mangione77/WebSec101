# Hacker101 Sessions

## [XSS And Authorization](https://www.hacker101.com/sessions/xss)  

#### XSS Review

__Types__:   

1. Reflected XSS: Input from user is directly returned to the browser, permitting injection of arbitrary content. 
1. Stored XSS: Input from user is stored on the server and returned later withour proper escaping.  
1. DOM XSS: Input from the user is inserted into the page without proper handling, enabling injection of arbitrary DOM nodes.  

__Recognition__:  

For each input:

1. Where does the data go? Is it embedded in a tag attr like "_value_"? Is it embeded into a string in a script tag?  
1. How is it handled?  
1. How are special character handled? Something useful is to input something like ```<>:;```.  

If the input controls an attribute of the tag and it allows double-quotes, almost for sure they have an XSS vulnerability.  

__Explotation Case 1__:





