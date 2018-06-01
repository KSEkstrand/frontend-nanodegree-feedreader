/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /*
     * Test RSS feeds
     */
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         it('each have a url', function(){
           $.each(allFeeds,function(index, value){
             expect(value.url).toBeDefined();
             expect(value.url.length).not.toBe(0);
           });
         });

         it('each have a name', function(){
           $.each(allFeeds,function(index, value){
             expect(value.name).toBeDefined();
             expect(value.name.length).not.toBe(0);
           });
         });
    });
    /*
     * Test Menu functionality
     */
      describe('The menu', function() {
         it('should be hidden by default', function(){
           expect($('body').hasClass('menu-hidden')).toBe(true);
         });
          it('should be visible after first click and invisible on second click', function(){
            var performClick = function(){
              $(".menu-icon-link").trigger('click');
            };

             performClick();
             expect($('body').hasClass('menu-hidden')).toBe(false);

             performClick();
             expect($('body').hasClass('menu-hidden')).toBe(true);
          });

        });

      describe('Initial entries', function(){
        beforeEach(function(done){
          loadFeed(0,done);
        });
         it('should have at least one entry in the feed container', function(){
           expect($('.feed .entry').length).toBeGreaterThan(0);
         });
      });

      /*
       * Test feed loading functionality
       */
    describe('New Feed', function(){
         var initialContent;
         var newContent;
         beforeEach(function (done) {
             loadFeed(0, function () {
               initialContent = $('.feed').text();
               loadFeed(1, function () {
                   newContent = $('.feed').text();
                   done();
               });
             });
           });
         it('should be loading new content', function(){
           expect(initialContent).toBeDefined();
           expect(newContent).toBeDefined();
           expect(initialContent).not.toEqual(newContent);
         });
    });

}());
