# Sliderify

Sliderify is a simple jQuery image slider plugin.

You can see it in action on this [demo page](http://yuraloginoff.com/sliderify/)


## How to install

1. Add CSS to the `<head>`

	<link rel="stylesheet" href="css/jquery.sliderify.css">
	<link rel="stylesheet" href="css/theme.css">

2. Add JavaScript before the "</body>"

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
	<script src="js/jquery.sliderify.js"></script>
	<script>
		$(".slider").sliderify();
	</script>

## Markup

The following type of markup structure is needed to make the plugin work:

	<div class="slider">
		<ul>
			<li><img src="img/01.jpg" alt="Image"></li>
		</ul>
	</div>


## CSS
Sliderify plugin is provided with 2 css files: `jquery.sliderify.css` and `theme.css`. You can edit `theme.css` to change default styling. `jquery.sliderify.css` contains some kind of plugin's core so edit it at your own risk.

You should specify image container width. It equals images width.
	.slider { width: 500px; }

You can redefine CSS class names. See below.


## JavaScript
Running this script will apply the Sliderify plugin DOM element with a .slider className.
```javascript
$(".slider").sliderify();
```

You can pass an object to sliderify function to redefine default settings. F.i.:
```javascript
$(".slider").sliderify({
	speed : 500,
	transitionEffect : "fade"
});
```

Here is a list of all settings that you can redefine.

Setting | Default | Description
--- | --- | ---
navigationClass | "sliderify-navigation" | CSS class of navigation elements container.
navigationElements | "button" | Navigation element itself. You can change it f.i. to "a" to get `<a href="#">`.
navigationElementsClass | "sliderify-navigation-element" | CSS class of navigation elements.
buttonBackText | "Prev" | Text of "backward" navigation element.
buttonForwardText | "Next" | Text of "forward" navigation element.
addPagination | true | Set to `false` if don't want the pagination element.
paginationClass | "sliderify-paginator" | CSS class of pagination element.
speed | 400 | Animation speed.
easing | "swing" | Easing effect for sliding animation effect. You can change it f.i. to "linear".
transitionEffect | "slide" | Visual animation effect. Another available option is **"fade"**.
showStatus | true | Displays status textual element like "1 of 4" to indicate current image and total amount. Change to `false` if you don't want that.
statusText | " of "| Text for status. You can change it f.i. to " / ".
statusClass | "sliderify-status" | CSS class of status element.


## Credits
Initially written by [Yura Loginov](http://yuraloginoff.com).

If you have any quetion about this plugin please contact me on twitter - [@yuraloginoff](https://twitter.com/yuraloginoff)

## Legal

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>