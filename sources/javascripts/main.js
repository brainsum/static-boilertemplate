/**
 * @file
 * CUSTOM SCRIPTS
 */




(function ($) {

    var $window = $(window),
        $body = $('body'),
        $main = $('#main');


    // Play initial animations on page load.
    $window.on('load', function () {
        window.setTimeout(function () {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Nav.
    var $nav = $('#navigation');

    if ($nav.length > 0) {

        // Shrink effect.
        $main
            .scrollex({
                mode: 'top',
                enter: function () {
                    $nav.addClass('c-navigation--alt');
                },
                leave: function () {
                    $nav.removeClass("c-navigation--alt");
                },
            });

        // Links.
        var $nav_a = $nav.find('a');

        $nav_a
            .scrolly({
                speed: 1000,
                offset: function () { return $nav.height(); }
            })
            .on('click', function () {

                var $this = $(this);

                // External link? Bail.
                if ($this.attr('href').charAt(0) != '#')
                    return;

                // Deactivate all links.
                $nav_a
                    .removeClass('is-active')
                    .removeClass('is-active-locked');

                // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
                $this
                    .addClass('is-active')
                    .addClass('is-active-locked');

            })
            .each(function () {

                var $this = $(this),
                    id = $this.attr('href'),
                    $section = $(id);

                // No section for this link? Bail.
                if ($section.length < 1)
                    return;

                // Scrollex.
                $section.scrollex({
                    mode: 'middle',
                    enter: function () {

                        // Activate section.
                        $section.removeClass('is-inactive');

                        // No locked links? Deactivate all links and activate this section's one.
                        if ($nav_a.filter('.is-active-locked').length == 0) {

                            $nav_a.removeClass('is-active');
                            $this.addClass('is-active');

                        }

                        // Otherwise, if this section's link is the one that's locked, unlock it.
                        else if ($this.hasClass('is-active-locked'))
                            $this.removeClass('is-active-locked');

                    }
                });

            });

    }

})(jQuery);
