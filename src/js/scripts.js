document.addEventListener('DOMContentLoaded', function () {
    (function () {
        function getClassName(name) {
            return document.getElementsByClassName(name)[0];
        }

        const cookiesBox = getClassName('cookies-box');
        const cookiesBoxClose = getClassName('cookies-box__close');
        const cookiesBoxAccept = getClassName('cookies-box__accept');

        function closeBoxFn() {
            cookiesBox.style.display = 'none';
        }

        const cookiesAccepted = localStorage.getItem('cookiesAccepted');

        if (!cookiesAccepted) {
            cookiesBox.classList.add('show');
        }

        cookiesBoxClose.onclick = closeBoxFn;
        cookiesBoxAccept.onclick = function () {
            localStorage.setItem('cookiesAccepted', JSON.stringify(true));
            closeBoxFn();
        };

        const burgerBtn = getClassName('hamburger');
        const naviCollapse = getClassName('navi-collapse');

        if (burgerBtn) {
            burgerBtn.onclick = function () {
                this.classList.toggle('active');
                naviCollapse.classList.toggle('open');
            }
        }

        const navFor = getClassName('navi-for');

        function setNavForItem() {
            const pathName = location.pathname;

            if (pathName === '/' || pathName.includes('/flime.html')) {
                sessionStorage.setItem('naviFor', JSON.stringify({parentPath: pathName}));
            } else if (pathName.includes('/for_freelancers.html')) {
                sessionStorage.setItem('naviFor', JSON.stringify({parentPath: pathName}));
            } else {
                const navi = JSON.parse(sessionStorage.getItem('naviFor'));
                var data = {};

                if (navi && navi.parentPath) {
                    data = {
                        parentPath: navi.parentPath,
                        childPath: pathName
                    }
                } else {
                    if (pathName.includes('freelancers')) {
                        data = {
                            parentPath: '/for_freelancers.html',
                            childPath: pathName
                        }
                    } else {
                        data = {
                            parentPath: '/flime.html',
                            childPath: pathName
                        }
                    }

                }

                sessionStorage.setItem('naviFor', JSON.stringify(data));
            }
        }

        setNavForItem();

        class navInitClass {
            constructor(navi) {
                this.naviChilds = [...navi.children];
                this.naviForLocalItems = JSON.parse(sessionStorage.getItem('naviFor'));
                this.activeClassName = 'active';
                this.indexPage = '/flime.html';
                this.paths = this.pathsMap;


                this.removeActiveClass();
                this.isParentPath();
                this.isChildPath();
            }

            get pathsMap() {
                return this.naviChilds.map(it => it.attributes[0].nodeValue);
            }

            removeActiveClass() {
                this.naviChilds.map(item => item.classList.remove(this.activeClassName));
            }

            navActivate(path) {
                this.naviChilds.map(it => {
                    if (it.href.includes(path) || !it.href.includes('.html')) {
                        it.classList.add(this.activeClassName)
                    }
                });
            }

            isParentPath() {
                if (this.naviForLocalItems.parentPath) {
                    this.paths.forEach(it => {
                        if (this.naviForLocalItems.parentPath.includes(it)) {
                            this.navActivate(this.naviForLocalItems.parentPath);
                        } else if (this.naviForLocalItems.parentPath === '/') {
                            this.navActivate(this.indexPage);
                        }
                    });
                }
            }

            isChildPath() {
                if (this.naviForLocalItems.childPath) {
                    this.paths.forEach(it => {
                        if (this.naviForLocalItems.childPath.includes(it)) {
                            this.navActivate(this.naviForLocalItems.childPath);
                        }
                    });
                }
            }
        }

        new navInitClass(navFor);
        new navInitClass(naviCollapse);

        const slider = document.querySelector('.slider');

        class initSlider {
            constructor(slider) {
                this.sliderOptions = {};
                this.carousel = slider;

                this.showSliderBlock();

                if (window.innerWidth > 767) {
                    this.sliderOptions.perPage = 2;
                } else {
                    this.sliderOptions.perPage = 1;
                }

                const teamSlider = new Siema(this.sliderOptions);

                document.querySelector('.siema-prev').addEventListener('click', () => teamSlider.prev());
                document.querySelector('.siema-next').addEventListener('click', () => teamSlider.next());
            }

            showSliderBlock() {
                this.carousel.classList.add('show');
            }
        }

        if (slider) {
            new initSlider(slider);
        }
    }());
});