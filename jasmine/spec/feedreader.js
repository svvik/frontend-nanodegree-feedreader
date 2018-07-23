/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*
         * Test ensures that allFeeds object has a URL defined
         * and that the URL is not empty.
         */
        it('Feed URL not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).not.toBeUndefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        /*
         * Test ensures that allFeeds object has a name defined
         * and that the name is not empty.
         */
        it('Feed name not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).not.toBeUndefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });

    });

    /**
     * This test suit checks the behavior of menu
     */
    describe('The menu', function () {
        /**
         * This test determins if hidden class is set on the menu
         * and in addition verifies its behavior (ensure that menu position is out of visible area)
         */
        it('menu is hidden by default', function () {
            expect($('.menu-hidden')).not.toBeUndefined();
            expect($('.slide-menu').position().left).toBeLessThan(0);
        });

        /**
         * This test ensures that by clicking on the menu control element, menu is hiding/showing
         */
        it('menu is hidden/showing on click', function () {
            $('.menu-icon-link').click();
            expect($('.menu-hidden').length).toBe(0);

            $('.menu-icon-link').click();
            expect($('.menu-hidden').length).toBe(1);
        });


    });

    /**
     * Suit checks the initial behavior for entries on the page
     */
    describe('Initial Entries', function () {

        /**
         * Before executing tests, setting loadFeed entries to the initial state
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /**
         * Selecting all feed entries on the page and ensuring that its count is greater than one
         */
        it('there is at least a single .entry element within the .feed container', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });


    /**
     * Suit checks the behavior of feed selection
     */
    describe('New Feed Selection', function () {
        /**
         * Before executing tests, setting loadFeed entries to the initial state
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /**
         * Test verifies that when switching from initial feed content to the first one will result in content change.
         * It's done by saving all entries for the initial one and then ensuring that new loaded content
         * doesn't have such ones from the initial set
         */
        it('ensures when a new feed is loaded then the content actually changes', function (done) {
            expect(allFeeds.length).toBeGreaterThan(1);
            //saving initial content
            const initElements = $('.feed .entry > h2').map(function () {
                return this.innerHTML;
            }).get();
            loadFeed(1, function () {
                const currentElements = $('.feed .entry > h2').map(function () {
                    return this.innerHTML;
                }).get();
                //going through the initial set of elements and ensuring that the current set of entries doesn't have
                //same ones from previous load
                initElements.forEach(function (elem) {
                    currentElements.forEach(function (celem) {
                        expect(celem).not.toBe(elem);
                    });
                });
                done();
            });
        });

    });
}());
