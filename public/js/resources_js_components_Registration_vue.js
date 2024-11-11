"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Registration_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Registration.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Registration.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Registration",
  data: function data() {
    return {
      fio: null,
      login: null,
      initiator: null,
      department: null,
      password: null,
      password_confirmation: null,
      initiators: [],
      departments: []
    };
  },
  watch: {
    initiator: function initiator(val) {
      this.getDepartment(val.id);
    }
  },
  methods: {
    getInitiator: function getInitiator() {
      var _this = this;

      axios.get('/api/initiator').then(function (response) {
        _this.initiators = response.data;
      });
    },
    getDepartment: function getDepartment() {
      var _this2 = this;

      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      axios.get("/api/initiator/".concat(id)).then(function (response) {
        _this2.departments = response.data;
      });
    },
    register: function register() {
      var _this3 = this;

      axios.get('/sanctum/csrf-cookie').then(function (res) {
        axios.post('/register', {
          login: _this3.login,
          fio: _this3.fio,
          initiator: _this3.initiator.name,
          department: _this3.department,
          password: _this3.password,
          password_confirmation: _this3.password_confirmation
        }).then(function (response) {
          localStorage.setItem("x_xsrf", response.config.headers["X-XSRF-TOKEN"]);

          _this3.$router.push({
            name: 'user.personal'
          });
        })["catch"](function (error) {
          var message = Object.values(error.data.errors).reduce(function (i, item) {
            return i += item + '\n';
          }, '');
          alert(message);
        });
      });
    }
  },
  mounted: function mounted() {
    this.getInitiator();
    this.getDepartment();
  }
});

/***/ }),

/***/ "./resources/js/components/Registration.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/Registration.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Registration_vue_vue_type_template_id_70725824_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Registration.vue?vue&type=template&id=70725824&scoped=true& */ "./resources/js/components/Registration.vue?vue&type=template&id=70725824&scoped=true&");
/* harmony import */ var _Registration_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Registration.vue?vue&type=script&lang=js& */ "./resources/js/components/Registration.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Registration_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Registration_vue_vue_type_template_id_70725824_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _Registration_vue_vue_type_template_id_70725824_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "70725824",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Registration.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Registration.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/Registration.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Registration_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Registration.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Registration.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Registration_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Registration.vue?vue&type=template&id=70725824&scoped=true&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/Registration.vue?vue&type=template&id=70725824&scoped=true& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Registration_vue_vue_type_template_id_70725824_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Registration_vue_vue_type_template_id_70725824_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Registration_vue_vue_type_template_id_70725824_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Registration.vue?vue&type=template&id=70725824&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Registration.vue?vue&type=template&id=70725824&scoped=true&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Registration.vue?vue&type=template&id=70725824&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Registration.vue?vue&type=template&id=70725824&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "d-flex justify-content-center align-items-center h-100" },
    [
      _c("div", { staticClass: "card w-25" }, [
        _vm._m(0),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "card-body" },
          [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.fio,
                  expression: "fio",
                },
              ],
              staticClass: "form-control mb-3",
              attrs: { type: "text", placeholder: "ФИО" },
              domProps: { value: _vm.fio },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.fio = $event.target.value
                },
              },
            }),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.login,
                  expression: "login",
                },
              ],
              staticClass: "form-control mb-3",
              attrs: { type: "text", placeholder: "Логин" },
              domProps: { value: _vm.login },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.login = $event.target.value
                },
              },
            }),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.password,
                  expression: "password",
                },
              ],
              staticClass: "form-control mb-3",
              attrs: { type: "password", placeholder: "Пароль" },
              domProps: { value: _vm.password },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.password = $event.target.value
                },
              },
            }),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.password_confirmation,
                  expression: "password_confirmation",
                },
              ],
              staticClass: "form-control mb-3",
              attrs: { type: "password", placeholder: "Потверждение" },
              domProps: { value: _vm.password_confirmation },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.password_confirmation = $event.target.value
                },
              },
            }),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.initiator,
                    expression: "initiator",
                  },
                ],
                staticClass: "form-select mb-3",
                on: {
                  change: function ($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function (o) {
                        return o.selected
                      })
                      .map(function (o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.initiator = $event.target.multiple
                      ? $$selectedVal
                      : $$selectedVal[0]
                  },
                },
              },
              [
                _c("option", { attrs: { value: "null", selected: "" } }, [
                  _vm._v("Выберитие инициатора заявок (ИЗ)"),
                ]),
                _vm._v(" "),
                _vm._l(_vm.initiators, function (init) {
                  return _c("option", { domProps: { value: init } }, [
                    _vm._v(_vm._s(init.name)),
                  ])
                }),
              ],
              2
            ),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.department,
                    expression: "department",
                  },
                ],
                staticClass: "form-select mb-3",
                on: {
                  change: function ($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function (o) {
                        return o.selected
                      })
                      .map(function (o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.department = $event.target.multiple
                      ? $$selectedVal
                      : $$selectedVal[0]
                  },
                },
              },
              [
                _c("option", { attrs: { value: "null" } }, [
                  _vm._v("Выберитие подразделение ИЗ"),
                ]),
                _vm._v(" "),
                _vm._l(_vm.departments, function (dept) {
                  return _c("option", { domProps: { value: dept.name } }, [
                    _vm._v(_vm._s(dept.name)),
                  ])
                }),
              ],
              2
            ),
            _vm._v(" "),
            _c(
              "vs-button",
              {
                staticClass: "btn btn-success w-100",
                attrs: { type: "submit" },
                on: {
                  click: function ($event) {
                    $event.preventDefault()
                    return _vm.register.apply(null, arguments)
                  },
                },
              },
              [_vm._v("Регистрация")]
            ),
          ],
          1
        ),
      ]),
    ]
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header" }, [
      _c("h3", [_vm._v("Регистрация")]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);