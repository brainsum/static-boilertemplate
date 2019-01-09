/**
 * @file
 * Custom scripts
 */

(function jquery($) {
  // Declare all variables.
  var $window = $(window);
  var $body = $('body');
  var $main = $('#main');
  var $nav = $('#navigation');
  var $navLink = $nav.find('a');

  // Play initial animations on page load.
  $window.on('load', function windowLoaded() {
    window.setTimeout(function preloadRemover() {
      $body.removeClass('is-preload');
    }, 100);
  });

  // Nav.
  if ($nav.length > 0) {
    // Shrink effect.
    $main
      .scrollex({
        mode: 'top',

        enter: function beginAltNav() {
          $nav.addClass('c-navigation--alt');
        },

        leave: function endAltNav() {
          $nav.removeClass('c-navigation--alt');
        }
      });

    // Links.
    $navLink
      .scrolly({
        speed: 1000,
        offset: function navHeight() {
          return $nav.height();
        }
      })

      .on('click', function navClick() {
        var $this = $(this);

        // External link? Bail.
        if ($this.attr('href').charAt(0) !== '#') {
          return;
        }

        // Deactivate all links.
        $navLink
          .removeClass('is-active')
          .removeClass('is-active-locked');

        /* Activate link *and* lock it (so Scrollex doesn't try to activate
         * other links as we're scrolling to this one's section).
         */
        $this
          .addClass('is-active')
          .addClass('is-active-locked');
      })

      .each(function getUrlFragment() {
        var $this = $(this);
        var id = $this.attr('href');
        var $section = $(id);

        // No section for this link? Bail.
        if ($section.length < 1) {
          return;
        }

        // Scrollex.
        $section.scrollex({
          mode: 'middle',

          enter: function scrollexFired() {
            // Activate section.
            $section.removeClass('is-inactive');

            // No locked links? Deactivate all links and activate this section's one.
            if ($navLink.filter('.is-active-locked').length === 0) {
              $navLink.removeClass('is-active');
              $this.addClass('is-active');
            }

            // Otherwise, if this section's link is the one that's locked, unlock it.
            else if ($this.hasClass('is-active-locked')) {
              $this.removeClass('is-active-locked');
            }
          }
        });
      });
  }
}(jQuery));
