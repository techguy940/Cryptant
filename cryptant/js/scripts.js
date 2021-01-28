(function ($) {
    "use strict";

    function heroContentSlider() {
        var heroContSlider = $('.hero-content-slider'),
            autoplay = heroContSlider.data('autoplay'),
            autoplaySpeed = heroContSlider.data('speed');
        if ($(window).width() > 992) {
            heroContSlider.owlCarousel({
                animateOut: 'bounceOut',
                animateIn: 'bounceIn',
                autoplay: autoplay,
                autoplayTimeout: autoplaySpeed,
                items: 1,
                dots: false,
                mouseDrag: false,
                touchDrag: false,
                loop: true
            });
        } else {
            heroContSlider.owlCarousel({
                autoplay: false,
                items: 1,
                dots: false,
                mouseDrag: true,
                touchDrag: true,
                loop: true,
                autoHeight: true
            });
        }
    }
    function heroContentSliderFade() {
        $('.hero-content-slider').css({ 'opacity': '1' })
    }

    function heroSliderOwl() {
        var heroOwlSlider = $(".hero-slider"),
            autoplay = heroOwlSlider.data('autoplay'),
            autoplaySpeed = heroOwlSlider.data('speed'),
            touchSlide = heroOwlSlider.data('touch-drag');
        heroOwlSlider.owlCarousel({
            autoplay: autoplay,
            autoplayTimeout: autoplaySpeed,
            items: 1,
            mouseDrag: touchSlide,
            touchDrag: touchSlide,
            dots: false,
            nav: true,
            navSpeed: 500,
            loop: true,
            autoHeight : true,
            navText: ["<img src='img/assets/slider-left-thin-arrow.png'>", "<img src='img/assets/slider-right-thin-arrow.png'>"]
        });
        if ($('.hero-fullscreen>div').hasClass('hero-slider')) {
            $('.hero-fullscreen').css({'padding': '0'});
        }
    }

    function sliderOwl() {
        var owlSlider = $(".carousel"),
            autoplay = owlSlider.data('autoplay'),
            autoplaySpeed = owlSlider.data('speed'),
            touchSlide = owlSlider.data('touch-drag'),
            loopSlides = owlSlider.data('loop');
        owlSlider.owlCarousel({
            autoplay: autoplay,
            autoplayTimeout: autoplaySpeed,
            items: 1,
            mouseDrag: touchSlide,
            touchDrag: touchSlide,
            dots: true,
            nav: true,
            loop: loopSlides,
            autoHeight : true,
            navText: ["<img src='img/assets/slider-left-thin-arrow.png'>", "<img src='img/assets/slider-right-thin-arrow.png'>"],
            navRewind: true,
            slideBy : 'page'
        });
    }

    function progressBars() {
        function progressBar() {
            $('.progress').each(function () {
                $(this).find('.progress-bar').animate({
                    width: $(this).attr('data-percent')
                }, 800);
            });
        }
        if ($('.progress-bars').data('animate-on-scroll') === 'on') {
            $('.progress-bars').waypoint(function () {
                progressBar();
            }, { offset: '100%', triggerOnce: true });
        } else {
            progressBar();
        }
    }

    function progressCircles() {
        function progressCircle() {
            var totalProgress, progress, circles;
            circles = document.querySelectorAll('.progress-svg');
            for(var i = 0; i < circles.length; i++) {
                totalProgress = circles[i].querySelector('circle').getAttribute('stroke-dasharray');
                progress = circles[i].parentElement.getAttribute('data-circle-percent');
                circles[i].querySelector('.bar').style['stroke-dashoffset'] = totalProgress * progress / 100;
            }
        };
        if ($('.progress-circles').data('animate-on-scroll') === 'on') {
            $('.progress-circle').waypoint(function () {
                progressCircle();
            }, {
                offset: '70%',
                triggerOnce: true
            });
        } else {
            progressCircle();
        };
    }

    function vossenIframes() {
        $('.video-container').click(function(){
            $(this).addClass('reveal');
            var videoImg = $(this).find('img'),
                videoIframe = $(this).find('iframe'),
                videoAttr = videoIframe.attr('data-video-embed'),
                videoPlay = videoAttr + "?autoplay=1&autoplay=true";
            videoImg.animate({'opacity': 0}, 300);
            videoIframe.css('visibility', 'visible').attr('src', videoPlay);
            videoIframe[0].setAttribute('allowFullScreen', '');
        });
    }

    function teamSlider() {
        $(".team-slider").owlCarousel({
            autoplay : false,
            items: 3,
            dots: true,
            responsiveRefreshRate: 200,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1200: {
                    items: 3
                }
            }
        });
    }

    function quoteSlider() {
        var quoteOwl = $('.quote-slider');
        quoteOwl.owlCarousel({
            autoplay: false,
            autoplayTimeout: 3000,
            items: 1,
            dots: false,
            loop: true,
            nav: true,
            navText: ["<img src='img/assets/slider-left-thin-arrow.png'>", "<img src='img/assets/slider-right-thin-arrow.png'>"]
        });
    }

    function vossenPortfolio() {
        var vosPortfolio = $('.vossen-portfolio'),
            initFilter = $('.vossen-portfolio-filters'),
            vossenFilters = $('.vossen-portfolio-filters li'),
            portfolioItems = $('.vossen-portfolio > div'),
            initialCat;

        initFilter.each(function () {
            var dataOption = $(this).attr('data-initial-filter');
            $(this).attr('data-initial-filter', '.' + dataOption);
            if ($(initFilter).data('initial-filter') === '.*') {
                $(this).attr('data-initial-filter', '*');
            }
        });
        vossenFilters.not(':first').each(function () {
            var dataOption = $(this).attr('data-filter');
            $(this).attr('data-filter', "." + dataOption);
        });
        portfolioItems.each(function () {
            var dataOption = $(this).attr('data-filter');
            $(this).addClass(dataOption);
        });
        portfolioItems.waypoint(function () {
            portfolioItems.each(function (i) {
                var eachItem = $(this);
                setTimeout(function () { eachItem.addClass('reveal'); }, (i * 3) * 60);
            });
        }, { offset: '100%', triggerOnce: true });
        initialCat = $('.vossen-portfolio-filters').attr('data-initial-filter');
        $('.vossen-portfolio-filters li[data-filter="' + initialCat + '"]').addClass('active');
        vossenFilters.on('click', function () {
            $('.vossen-portfolio-filters li.active').removeClass('active');
            $(this).addClass('active');
            var filterValue = $(this).attr('data-filter');
            vosPortfolio.isotope({
                filter: filterValue
            });
        });
        var $grid = vosPortfolio.isotope({
            itemSelector: '.vossen-portfolio > div',
            percentPosition: true,
            filter: initialCat,
            masonry: {
                columnWidth: '.vossen-portfolio > div'
            }
        });
        $grid.imagesLoaded().progress( function() {
            $grid.isotope('layout');
        });
    }

    $(window).resize(function () {
        setTimeout(function(){
            $('.vossen-portfolio-filters .active').trigger('click');
        }, 600);
    });

    function vossenPortfolio2() {

        var vosPortfolio = $('.portfolio-grid'),
            initFilter = $('.portfolio-filters'),
            vossenFilters = $('.portfolio-filters li'),
            portfolioItems = $('.work-item'),
            initialCat;

        initFilter.each(function () {
            var dataOption = $(this).attr('data-initial-filter');
            $(this).attr('data-initial-filter', '.' + dataOption);
            if ($(initFilter).data('initial-filter') === '.*') {
                $(this).attr('data-initial-filter', '*');
            }
        });
        vossenFilters.not(':first').each(function () {
            var dataOption = $(this).attr('data-filter');
            $(this).attr('data-filter', "." + dataOption);
        });
        portfolioItems.each(function () {
            var dataOption = $(this).attr('data-filter');
            $(this).addClass(dataOption);
        });

        $('.portfolio-filters li[data-filter="' + initialCat + '"]').addClass('active');

        vossenFilters.on('click', function () {
            $('.portfolio-filters li.active').removeClass('active');
            $(this).addClass('active');
            var filterValue = $(this).attr('data-filter');
            vosPortfolio.isotope({
                filter: filterValue
            });
        });


        var worksgrid = $('#works-grid'),
            filters = $('.portfolio-filters');

        $(window).on('resize', function() {

            var windowWidth    = Math.max($(window).width(), window.innerWidth),
                itemWidht      = $('.grid-sizer').width(),
                itemHeight     = Math.floor(itemWidht * 0.95),
                itemTallHeight = itemHeight * 2;

            if (windowWidth > 500) {
                $('.work-item', worksgrid).each(function() {
                    if ($(this).hasClass('tall')) {
                        $(this).css({
                            height : itemTallHeight
                        });
                    } else if ($(this).hasClass('wide')) {
                        $(this).css({
                            height : itemHeight
                        });
                    } else if ($(this).hasClass('wide-tall')) {
                        $(this).css({
                            height : itemTallHeight
                        });
                    } else {
                        $(this).css({
                            height : itemHeight
                        });
                    }
                });
            } else {
                $('.work-item', worksgrid).each(function() {
                    if ($(this).hasClass('tall')) {
                        $(this).css({
                            height : itemTallHeight
                        });
                    } else if ($(this).hasClass('wide')) {
                        $(this).css({
                            height : itemHeight / 2
                        });
                    } else if ($(this).hasClass('wide-tall')) {
                        $(this).css({
                            height : itemHeight
                        });
                    } else {
                        $(this).css({
                            height : itemHeight
                        });
                    }
                });
            }

            worksgrid.imagesLoaded(function() {
                worksgrid.isotope({
                    layoutMode: 'packery',
                    itemSelector: '.work-item',
                    transitionDuration: '0.3s',
                    packery: {
                        columnWidth: '.grid-sizer',
                    },
                });
            });

        }).resize();

        worksgrid.isotope({}).imagesLoaded().progress( function() {
            vosPortfolio.addClass('reveal');
        });

    }

    function vossenPortfolioAjax() {

        var pageNumber = 0,
            workNumberToload = 5;

        var doneText    = 'No More Works',
            loadText    = 'Show More',
            loadingText = 'Loading...',
            errorText   = 'Error! --- This feature will work only when site is on the server ---';

        $('#show-more').on('click', function() {
            $(this).text(loadingText);

            setTimeout(function() {
                ajaxLoad(workNumberToload, pageNumber);
            }, 300);

            pageNumber++;
            return false;
        });


        function ajaxLoad(workNumberToload, pageNumber) {
            var $loadButton = $('#show-more');
            var dataString = 'numPosts=' + workNumberToload + '&pageNumber=' + pageNumber;

            $.ajax({
                type: 'GET',
                data: dataString,
                dataType: 'html',
                url: $('.vossen-portfolio, .works-grid').data('more-items-location'),
                success: function(data) {
                    var $data = $(data);
                    var start_index = (pageNumber - 1) * workNumberToload;
                    var end_index = + start_index + workNumberToload;

                    if ($data.find('.vossen-portfolio > div, .work-item').slice(start_index).length) {
                        var work = $data.find('.vossen-portfolio > div, .work-item').slice(start_index, end_index).addClass('reveal');

                        $('.vossen-portfolio, .works-grid').append(work).isotope('appended', work).resize();

                        setTimeout(function() {
                            $loadButton.text(loadText);
                        }, 300);

                    } else {
                        setTimeout(function() {
                            $loadButton.text(doneText);
                        }, 300);

                        setTimeout(function () {
                            $( "#show-more" ).animate({
                                opacity: 0
                            }, 400 ).css({"cursor": "default"});
                        }, 1500);
                    }
                },

                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR + " :: " + textStatus + " :: " + errorThrown);

                    setTimeout(function() {
                        $loadButton.removeClass('ss-loading');
                        $loadButton.text(errorText);
                    }, 300);

                }
            });
        }
    }

    function testimonialSlider() {
        var testimonialsOwl = $('.testimonials'),
            autoplay = testimonialsOwl.data('autoplay'),
            autoplaySpeed = testimonialsOwl.data('speed');
        testimonialsOwl.owlCarousel({
            autoplay : autoplay,
            autoplayTimeout: autoplaySpeed,
            autoplaySpeed: 700,
            loop: true,
            items: 1,
            dots: true,
            dotsSpeed: 400
        });
    }

    function clientsSlider() {
        var clientSlider = $(".clients-slider"),
            autoplay = clientSlider.data('autoplay'),
            autoplaySpeed = clientSlider.data('speed');
        clientSlider.owlCarousel({
            autoplay : autoplay,
            autoplayTimeout: autoplaySpeed,
            loop: false,
            dots: false,
            nav: false,
            responsiveRefreshRate: 200,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 5
                },
                1200: {
                    items: 6
                }
            }
        });
    }

    function contactForm() {
        $('#contactform').submit(function () {
            var action = 'php/contact-form.php';
            $("#message-info").slideUp(250, function () {
                $('#message-info').hide();
                $('#submit')
                    .after('<div class="loader"><div></div></div>')
                    .attr('disabled', 'disabled');
                $.post(action, {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val(),
                    message: $('#message').val()
                },
                    function (data) {
                        document.getElementById('message-info').innerHTML = data;
                        $('#message-info').slideDown(250);
                        $('#contactform .loader div').fadeOut('slow', function() {
                            $(this).remove();
                        });
                        $('#submit').removeAttr('disabled');
                        if (data.match('success') !== null) {
                            $('#contactform').slideUp(850, 'easeInOutExpo');
                        }
                    });
            });
            return false;
        });
    }

    function subscribeForm() {
        $('#subscribe-form,#subscribe-form-2').on('submit', function (e) {
            e.preventDefault();
            var $el = $(this),
                $alert = $el.find('.form-validation'),
                $submit = $el.find('button'),
                action = $el.attr('action');
            $submit.button('loading');
            $alert.removeClass('alert-danger alert-success');
            $alert.html('');
            $.ajax({
                type     : 'POST',
                url      : action,
                data     : $el.serialize() + '&ajax=1',
                dataType : 'JSON',
                success  : function (response) {
                    if (response.status === 'error') {
                        $alert.html(response.message);
                        $alert.addClass('alert-danger').fadeIn(500);
                    } else {
                        $el.trigger('reset');
                        $alert.html(response.message);
                        $alert.addClass('alert-success').fadeIn(500);
                    }
                    $submit.button('reset');
                }
            });
        });
    }

    function vosMap() {
        $('#vossen-map').waypoint(function () {
            initVossenMaps()
        }, { offset: '100%', triggerOnce: true });
    }

    function vossenHeader() {
        $('.nav li.dropdown>a, .dropdown-submenu>a').on('click', function () {
            $(this).closest('.dropdown').siblings().removeClass('open');
            $(this).closest('.dropdown').toggleClass('open');
            return false;
        });
        $('.nav li a, .btn-scroll').on('click', function () {
            var $anchor = $(this);
            function scrollToAnchor() {
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top - offsetVar
                }, 1000, 'easeInOutExpo');
                event.preventDefault();
            }
            if ($(window).width() > 992) {
                var offsetVar = '59';
                scrollToAnchor();
            } else {
                var offsetVar = '0';
                scrollToAnchor();
            }
        });
        function navSmall() {
            $(window).scroll(function (){
                if ($(window).scrollTop() > 70) {
                $('nav').addClass("nav-small");
                } else {
                    $('nav').removeClass("nav-small");
                }
            });
        }
        if ($('nav').data('animation') === 'hiding') {
            var vosWindow = $(window);
            var navPosition = vosWindow.scrollTop();
            vosWindow.scroll(function() {
                if(vosWindow.scrollTop() > navPosition) {
                    $('nav').removeClass('nav-down').addClass('nav-up');
                } else {
                    $('nav').removeClass('nav-up').addClass('nav-down');
                }
                navPosition = vosWindow.scrollTop();
             });
            navSmall();
        } else {
            navSmall();
        }
        $('.scroll-top').on('click', function () {
            $('html, body').stop().animate({ scrollTop: 0 }, 2000, 'easeInOutExpo');
            return false;
        });
        function elementsAnchor() {
            var hash = window.location.hash;
            if (hash != '') {
                setTimeout(function() {
                    $('html, body').stop().animate({
                        scrollTop: $(hash).offset().top - 59
                    }, 1000, 'easeInOutExpo');
                    history.pushState('', document.title, window.location.pathname);
                }, 500);
            }
        } elementsAnchor();
    }

    function bootstrapTools() {
        $('#accordion,#accordion2').on('show.bs.collapse', function () {
            $('#accordion .in').collapse('hide');
        });
        $("[data-toggle='tooltip']").tooltip();
        $('#buttonTabs a,#iconTabs a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
    }

    function twitterFeedSlider() {
        if ($('#twitter-feed-slider').length) {
            var twitterUser, twitterNumber, twitterFeedSlider;
            twitterUser = $('#twitter-feed-slider').attr('data-twitter-widget-id');
            twitterNumber = $('#twitter-feed-slider').attr('data-max-tweets');
            twitterFeedSlider = {
                "id": twitterUser,
                "domId": 'twitter-feed-slider',
                "maxTweets": twitterNumber,
                "enableLinks": true,
                "showImages": false
            };
            twitterFetcher.fetch(twitterFeedSlider);
        }
    }

    function twitterFeedSliderInit() {
        if ($('#twitter-feed-slider').length) {
            $('#twitter-feed-slider ul').addClass('twitter-feed-slider navigation-thin');
             var twitterAutoSpeed = $('#twitter-feed-slider').attr('data-slider-speed');
            $('.twitter-feed-slider').owlCarousel({
                autoplay: true,
                autoplayTimeout: twitterAutoSpeed,
                items: 1,
                dots: false,
                mouseDrag: true,
                touchDrag: true,
                loop: true
            });
        }
    }

    function twitterFeedList() {
        if ($('#twitter-feed-list').length) {
            var twitterUser, twitterNumber, twitterFeedList;
            twitterUser = $('#twitter-feed-list').attr('data-twitter-widget-id');
            twitterNumber = $('#twitter-feed-list').attr('data-max-tweets');
            twitterFeedList = {
                "id": twitterUser,
                "domId": 'twitter-feed-list',
                "maxTweets": twitterNumber,
                "enableLinks": true,
                "showImages": false
            };
            twitterFetcher.fetch(twitterFeedList);
        }
    }

    function countUp() {
        $('#fun-facts').waypoint(function () {
            $('.counter h1').each(function() {
            var $this = $(this),
                countTo = $this.attr('data-count');
                $({ countNum: $this.text()}).animate({
                    countNum: countTo
                }, {
                    duration: 1700,
                    easing:'linear',
                    step: function() {
                      $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                      $this.text(this.countNum);
                    }
                });
            });
        }, { offset: '100%', triggerOnce: true });
    }

    function countdown() {
        var dateUser = $("#countdown-timer").attr('data-date'),
            deadline = new Date(dateUser);
        function updateClock() {
            var today = Date(),
                diff = Date.parse(deadline) - Date.parse(today);
            if (diff <= 0) {
                clearInterval(interval);
            } else {
                var seconds = Math.floor((diff / 1000) % 60),
                    minutes = Math.floor((diff / 1000 / 60) % 60),
                    hours = Math.floor((diff / 1000 / 60 / 60) % 24),
                    days = Math.floor(diff / (1000 * 60 * 60 * 24) % 30.5),
                    months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.5) % 12);
                $("#months").text( ('0' + months).slice(-2) + " ," );
                $("#days").text(('0' + days).slice(-2));
                $("#hours").text(('0' + hours).slice(-2));
                $("#minutes").text(('0' + minutes).slice(-2));
                $("#seconds").text(('0' + seconds).slice(-2));
            }
        }
        var interval = setInterval(updateClock, 1000);
    }

    function vossenBlogGrid() {
        var vosPortfolio = $('.vossen-blog-grid'),
            portfolioItems = $('.vossen-blog-grid > div');
        portfolioItems.each(function () {
            var dataOption = $(this).attr('data-filter');
            $(this).addClass(dataOption);
        });
        portfolioItems.waypoint(function () {
            portfolioItems.each(function (i) {
                var eachItem = $(this);
                setTimeout(function () { eachItem.addClass('reveal'); }, (i * 3) * 60);
            });
        }, { offset: '100%', triggerOnce: true });
        vosPortfolio.isotope({
            itemSelector: '.vossen-blog-grid > div',
            percentPosition: true,
            masonry: {
                columnWidth: '.vossen-blog-grid > div'
            }
        });
        var $bloggrid = vosPortfolio.isotope({
            itemSelector: '.vossen-blog-grid > div',
            percentPosition: true,
            masonry: {
                columnWidth: '.vossen-blog-grid > div'
            }
        });
        $bloggrid.imagesLoaded().progress( function() {
            $bloggrid.isotope('layout');
        });
    }

    function lightbox() {
        $('.lightbox').magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery:{
                enabled:true,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"><img src="img/assets/slider-left-thin-arrow.png"></button>',
            },
            mainClass: 'mfp-zoom-in',
            removalDelay: 500, 
            callbacks: {
                beforeOpen: function() {
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                }
            },
            closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
            midClick: true
        });
    }

    $(document).ready(function () {
        $.when(heroContentSlider()).then(heroContentSliderFade());
        heroSliderOwl();
        progressBars();
        progressCircles();
        teamSlider();
        countUp();
        vossenIframes();
        quoteSlider();
        parallaxVossen();
        vossenPortfolio();
        vossenPortfolio2();
        vossenPortfolioAjax();
        testimonialSlider();
        clientsSlider();
        contactForm();
        subscribeForm();
        vosMap();
        sliderOwl();
        vossenHeader();
        bootstrapTools();
        twitterFeedSlider();
        twitterFeedList();
        countdown();
        vossenBlogGrid();
        lightbox();
    });

    $(window).load(function () {
        twitterFeedSliderInit();
    });

    $(window).on('scroll', function () {

    });

}(jQuery));
