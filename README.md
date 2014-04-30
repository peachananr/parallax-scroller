#Parallax Scroller by Pete R.
A jQuery plugin that let you scroll through lists with a smooth parallax effect
Created by [Pete R.](http://www.thepetedesign.com), Founder of [Travelistly](http://www.travelistly.com) and [BucketListly](http://www.bucketlistly.com)

License: [Attribution-ShareAlike 4.0 International](http://creativecommons.org/licenses/by-sa/4.0/deed.en_US)

[![Parallax Scroller](http://www.thepetedesign.com/images/parallax-scroller_image.png "Parallax Scroller")](http://www.thepetedesign.com/demos/parallax-scroller_demo.html)


## Demo
[View demo](http://www.thepetedesign.com/demos/parallax-scroller_demo.html)

## Compatibility
Modern browsers such as Chrome, Firefox, and Safari on both desktop and iOS have been tested. Unfortunately, Android has a `touchmove` event bug that prevents me from supporting parallax effect. Not tested on IE. Parallax can be disabled on mobile if you see a performance drop.

## Basic Usage
To use this plugin, simply include the latest jQuery library (preferably version 2.0.0 or higher) together with `jquery.parallax-scroll.js` and `parallax-scroll.css` into your document's `<head>` follow by an HTML markup as follows:

````html
<body>
  ..
  <div class="list">
    <div class="list-item" data-ps-bg="images/1.jpg">
      ...
    </div>
    <div class="list-item" data-ps-bg="images/2.jpg">
      ...
    </div>
  ..
</body>

````

The `data-ps-bg` attribute must reflect the location of the image you want to use as the parallax background of that item. For example, if your image is in the images folder and is called "1.jpg", change the attribute to "images/1.jpg".

Once you got your list setup, call the function as follows:

Note: All the elements directly under the selector you called the script on, will be considered as a parallax item.

````javascript
 $(".list").parallaxScroll({
   parallaxSpeed: 3,            // You can set the speed of the parallax when scroll. Values can goes from 1 - 10. The default value is 3
   tilt: false,                 // You can define how much you want the list to tilt. Values can be negative (tilt to the left) or positive (tilt to the right). For example: -1, -2, -3 or 1, 2, 3. The default value is false.
   parallaxOnMobile: true,              // You can choose NOT to make the list parallax on mobile by toggling this to false. The default value is true
   startPosition: "0%",         // Since the plugin is using background CSS style, you can define the initial point of the background so that it is centered the way you like. This option on excepts percentage. The default value is "0%"
   retainNativeScroll: true     // This option will let you override native scroll, and add the effect onto a scrollable container instead of the whole page. Simply toggle this to false, and div container "list" will be scrollable. The default value is true.
 });
````

By default, the plugin uses the native scrolling mechanism of the whole page to reflect the parallax effect onto items' background that come into view. If you want to make a container scrollable and also retain this parallax effect, simply toggle `retainNativeScroll` to false and the plugin will do it all for you.

Now you will have a beautiful list with individual parallax effect with almost no hassle.

If you want to see more of my plugins, visit [The Pete Design](http://www.thepetedesign.com/#plugins), or follow me on [Twitter](http://www.twitter.com/peachananr) and [Github](http://www.github.com/peachananr).

## Other Resources
- Tutorial (Coming Soon)