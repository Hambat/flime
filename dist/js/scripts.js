"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

document.addEventListener('DOMContentLoaded', function () {
  (function () {
    function getClassName(name) {
      return document.getElementsByClassName(name)[0];
    }

    var cookiesBox = getClassName('cookies-box');
    var cookiesBoxClose = getClassName('cookies-box__close');
    var cookiesBoxAccept = getClassName('cookies-box__accept');

    function closeBoxFn() {
      cookiesBox.style.display = 'none';
    }

    var cookiesAccepted = localStorage.getItem('cookiesAccepted');

    if (!cookiesAccepted) {
      cookiesBox.classList.add('show');
    }

    cookiesBoxClose.onclick = closeBoxFn;

    cookiesBoxAccept.onclick = function () {
      localStorage.setItem('cookiesAccepted', JSON.stringify(true));
      closeBoxFn();
    };

    var burgerBtn = getClassName('hamburger');
    var naviCollapse = getClassName('navi-collapse');

    if (burgerBtn) {
      burgerBtn.onclick = function () {
        this.classList.toggle('active');
        naviCollapse.classList.toggle('open');
      };
    }

    var navFor = getClassName('navi-for');

    function setNavForItem() {
      var pathName = location.pathname;

      if (pathName === '/' || pathName.includes('/flime.html')) {
        sessionStorage.setItem('naviFor', JSON.stringify({
          parentPath: pathName
        }));
      } else if (pathName.includes('/for_freelancers.html')) {
        sessionStorage.setItem('naviFor', JSON.stringify({
          parentPath: pathName
        }));
      } else {
        var navi = JSON.parse(sessionStorage.getItem('naviFor'));
        var data = {};

        if (navi && navi.parentPath) {
          data = {
            parentPath: navi.parentPath,
            childPath: pathName
          };
        } else {
          if (pathName.includes('freelancers')) {
            data = {
              parentPath: '/for_freelancers.html',
              childPath: pathName
            };
          } else {
            data = {
              parentPath: '/flime.html',
              childPath: pathName
            };
          }
        }

        sessionStorage.setItem('naviFor', JSON.stringify(data));
      }
    }

    setNavForItem();

    var navInitClass =
    /*#__PURE__*/
    function () {
      function navInitClass(navi) {
        _classCallCheck(this, navInitClass);

        this.naviChilds = _toConsumableArray(navi.children);
        this.naviForLocalItems = JSON.parse(sessionStorage.getItem('naviFor'));
        this.activeClassName = 'active';
        this.indexPage = '/flime.html';
        this.paths = this.pathsMap;
        this.removeActiveClass();
        this.isParentPath();
        this.isChildPath();
      }

      _createClass(navInitClass, [{
        key: "removeActiveClass",
        value: function removeActiveClass() {
          var _this = this;

          this.naviChilds.map(function (item) {
            return item.classList.remove(_this.activeClassName);
          });
        }
      }, {
        key: "navActivate",
        value: function navActivate(path) {
          var _this2 = this;

          this.naviChilds.map(function (it) {
            if (it.href.includes(path) || !it.href.includes('.html')) {
              it.classList.add(_this2.activeClassName);
            }
          });
        }
      }, {
        key: "isParentPath",
        value: function isParentPath() {
          var _this3 = this;

          if (this.naviForLocalItems.parentPath) {
            this.paths.forEach(function (it) {
              if (_this3.naviForLocalItems.parentPath.includes(it)) {
                _this3.navActivate(_this3.naviForLocalItems.parentPath);
              } else if (_this3.naviForLocalItems.parentPath === '/') {
                _this3.navActivate(_this3.indexPage);
              }
            });
          }
        }
      }, {
        key: "isChildPath",
        value: function isChildPath() {
          var _this4 = this;

          if (this.naviForLocalItems.childPath) {
            this.paths.forEach(function (it) {
              if (_this4.naviForLocalItems.childPath.includes(it)) {
                _this4.navActivate(_this4.naviForLocalItems.childPath);
              }
            });
          }
        }
      }, {
        key: "pathsMap",
        get: function get() {
          return this.naviChilds.map(function (it) {
            return it.attributes[0].nodeValue;
          });
        }
      }]);

      return navInitClass;
    }();

    new navInitClass(navFor);
    new navInitClass(naviCollapse);
    var slider = document.querySelector('.slider');

    var initSlider =
    /*#__PURE__*/
    function () {
      function initSlider(slider) {
        _classCallCheck(this, initSlider);

        this.sliderOptions = {};
        this.carousel = slider;
        this.showSliderBlock();

        if (window.innerWidth > 767) {
          this.sliderOptions.perPage = 2;
        } else {
          this.sliderOptions.perPage = 1;
        }

        var teamSlider = new Siema(this.sliderOptions);
        document.querySelector('.siema-prev').addEventListener('click', function () {
          return teamSlider.prev();
        });
        document.querySelector('.siema-next').addEventListener('click', function () {
          return teamSlider.next();
        });
      }

      _createClass(initSlider, [{
        key: "showSliderBlock",
        value: function showSliderBlock() {
          this.carousel.classList.add('show');
        }
      }]);

      return initSlider;
    }();

    if (slider) {
      new initSlider(slider);
    }
  })();
});