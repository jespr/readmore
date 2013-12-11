# readmore


Readmore is a jQuery plugin that truncates text given a limit, adds a 
'Read more' link which will show the full text when clicked. The expanded text 
will have a 'Read less' link at the end, which will hide the expanded text when 
clicked.


## Example

```html
<div class="comment">
  Now, this is a story all about how. My life got flipped-turned upside down. 
  And I'd like to take a minute. Just sit right there. I'll tell you how I became 
  the prince of a town called Bel Air
</div>
```

```javascript
$('.comment').readmore({ limit: 50 });
```
