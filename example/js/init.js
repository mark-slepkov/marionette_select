/**
 * Created by mark on 24.12.15.
 */
require('script!nunjucks');
var $ = require('jquery');
var Marionette = require('marionette');
var _ = require('underscore');

console.log(nunjucks);
nunjucks.configure('/dist', {autoescape: true});
Marionette.TemplateCache.prototype.loadTemplate =
    function(templatePath, options) {
        return nunjucks.render(templatePath, options);
    };

Marionette.Renderer.render =
    function(templatePath, options){
        return nunjucks.render(templatePath, options);
    };

Marionette.View.prototype.generate_template =
    function(options){
        if (!options){
            options = {};
        }
        var module_name = options.__module__ || this.__module__;
        var app_name = options.__application__ || this.__application__;
        var template_name = options.__template__ || this.__template__ || 'default';
        var template_url = module_name + '/tmpl/' + app_name + '/' + template_name + '/template.html';
        this.template = template_url;
        var attributes = {
            'data-module': module_name,
            'data-application': app_name,
            'data-template': template_name
        };
        if (!this.attributes){
            this.attributes = {}
        }
        _.extend(this.attributes, attributes);
        this.$el.attr(attributes);
        // console.log(this.attributes)
        return template_url;
    };
var MarionetteSelect = require('select/select');
var loading = function(){
    var items = [
        {key: "Mark", value: 1},
        {key: "Vasya", value: 2},
        {key: "Artem", value: 3},
        {key: "John Connor", value: 4},
        {key: "T-800", value: 5},
        {key: "Gandalf", value: 6}
    ];
    var select = new MarionetteSelect(items);
    $('body').append(select.$el);
    select.render()
};
$(document).on('ready', loading);
