
'use strict'



 class Menu{
    constructor(switchWidth){
        this.wrapper = $('.header__wrapper');
        this.container = $('.header__container');
        this.list = $('.header__menu');

  
        /*----- hamburger -----*/
        this.hamburger = $('.header__hamburger');
        this.hamburgerCloseElements = $('.header__hamburger__item__close');
        this.hamburgerItem = $('.header__hamburger__item');
        this.colorHamburger = this.hamburgerItem.css('background-color');

        this.isMenuOpen = false;


        this.switchWidth = switchWidth || 768;


        self = this;


    }



    initialize() {
            

            self.hamburger.on('click', self.menuClick);
        
        if (window.innerWidth < self.switchWidth) {

            self.isMenuOpen = false;
            /*self.scrollHigh = self.menuContainer.outerHeight();
            self.isMenuFixed = false;
            self.isFixedCalling = false;*/

            self.closedMenuStyles();

            /*self.windowResize();*/

            self.scrollPrev = 0;



            $(window).on('scroll', () => {
                self.hideOpenedMenuOnWindowScroll();
                self.showOnScrollTop();
            });
        } else {
            self.clearStylesforHighScreen();
        }
    }

    hideOpenedMenuOnWindowScroll(event) {
        if ($(window).scrollTop() > self.container.outerHeight() && window.innerWidth < self.switchWidth) {
            self.closedMenuStyles();
        } else if (window.innerWidth >= self.switchWidth) {
            self.clearStylesforHighScreen();
        }
    }

    showOnScrollTop() {
        if (window.innerWidth < self.switchWidth) {
            let scrolled = $(window).scrollTop(); // Высота скролла в px
            let firstScrollUp = false; // Параметр начала сколла вверх
            let firstScrollDown = false; // Параметр начала сколла вниз
            
            // Если скроллим
            if ( scrolled > 0 ) {
                // Если текущее значение скролла > предыдущего, т.е. скроллим вниз
                if ( scrolled > self.scrollPrev ) {
                    firstScrollUp = false;            



                    if ( scrolled <= self.wrapper.offset().top ) {

                        if (firstScrollDown == false) {
                            firstScrollDown = true;

                            self.wrapper.css('position', 'absolute');

                            self.wrapper.addClass('scrollDown');
                            self.wrapper.removeClass('scrollUp');


                        }
                    } 


                } else {
                    firstScrollDown = false;

                    if ( scrolled > self.wrapper.offset().top ) {

                        if (firstScrollUp == false) {
                            firstScrollUp = true;

                            self.wrapper.css('position', 'fixed');

                        }
                    } 
                }
                self.scrollPrev = scrolled;
            }  

        }
 
    }


    menuClick() {
        self.list.css({'transition': 'transform 0.5s'});
        self.hamburgerCloseElements.css({'transition': 'transform 0.5s'});

        if (self.isMenuOpen) {
            self.openMenuStyles();
        } else {
            self.closedMenuStyles();
        }
    }

    openMenuStyles() {
        self.list.css('transform', 'translateY(0)');
        self.hamburgerCloseElements.eq(1).css('transform', 'rotate(-45deg)');
        self.hamburgerCloseElements.eq(0).css('transform', 'rotate(45deg)');
        self.hamburgerItem.css('background-color', 'transparent');

        self.isMenuOpen = false;
    }

    closedMenuStyles() {
        self.list.css({
            'transform': 'translateY(-' + self.list.height() + 'px)',
            'visibility': 'visible'
        });
        self.hamburgerCloseElements.css('transform', 'rotate(0deg)');
        self.hamburgerItem.css({
            'color': '1',
            'background-color': self.colorHamburger
        });

        self.isMenuOpen = true;
    }

    clearStylesforHighScreen() {
        self.list.css({
            'transform': 'translateY(0)',
            'transition': 'none'
        });
        self.hamburgerCloseElements.css('transform', 'rotate(0deg)');
        self.wrapper.css({
            'position': 'relative'
        });
    }

    /*windowResize(){
        window.addEventListener('resize', self.initialize);
    }*/

 }




$(document).ready(function () {
    /*menuOpen();*/

     const openMenu = new Menu();
     openMenu.initialize();
     window.addEventListener('resize', openMenu.initialize);
});
