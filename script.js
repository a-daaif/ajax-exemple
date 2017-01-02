(function(x){
    var lib = {}
    lib.getQS = function(data){
        var qs = []
        for(k in data) qs.push(k + '=' + data[k])
        return qs.join('&')
    }

    lib.get = function (url, data, success, error, progress) {
        var _this = this
        return new Promise(function(resolve, reject){
            data = data || {}
            success = success || function(){}
            error = error || function(){}
            progress = progress || function(){}
            progress(true)
            var xhr = new XMLHttpRequest()

            console.log(1, xhr.readyState)

            url = url + '?' + _this.getQS(data)

            xhr.open('get', url)

            console.log(2, xhr.readyState)
            xhr.onreadystatechange = function(evt) {
                console.log('x', xhr.readyState)
                if(xhr.readyState == 4) {
                    if(xhr.status >= 200 && xhr.status<300) {
                        success(xhr.responseText)
                        resolve(xhr.responseText)
                        progress(false)
                        console.log(xhr)
                    } else {
                        reject(xhr.status)
                        error(xhr.status, xhr.statusText, xhr)
                    }
                }
            }

            xhr.send()
        })


    }
    lib.post = function (url, data, success, error) {

        var xhr = new XMLHttpRequest()

        xhr.open('post', url)
        //xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.onreadystatechange = function(evt) {
            if(xhr.readyState == 4) {
                if(xhr.status >= 200 && xhr.status<300) {
                    success(xhr.responseText)
                } else {
                    error(xhr.status, xhr.statusText, xhr)
                }
            }
        }

        xhr.send(this.getQS(data))


    }

    lib.post2 = function (url, form, success, error) {

        var xhr = new XMLHttpRequest()

        xhr.open('post', url)
        //xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.onreadystatechange = function(evt) {
            if(xhr.readyState == 4) {
                if(xhr.status >= 200 && xhr.status<300) {
                    success(xhr.responseText)
                } else {
                    error(xhr.status, xhr.statusText, xhr)
                }
            }
        }

        xhr.send(new FormData(form))


    }

    window[x] = lib

})('ajax')