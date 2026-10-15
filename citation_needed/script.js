$(document).ready(function() {

    var citationNeededView = Backbone.View.extend({
        el: '#citation_needed',

        appTemplate: _.template(
            '<div id="cit_need-header">' +
                '<h3>We need your support ...</h3>' +
            '</div>' +
            '<div id="cit_need-body">' +
            'If Galaxy helped with the analysis of your data, please do not forget to <b>cite</b>:' +
            '<div id="cit_need-citation">'+
            'The Galaxy platform for accessible, reproducible, and collaborative data analyses: 2024 update<br>'+
            'Nucleic Acids Research, gkae410<br>'+
            'doi:10.1093/nar/gkae410'+
            '</div>' +
            'And please <b>acknowledge</b> the European Galaxy server:' +
            '<div id="cit_need-citation">'+
            'The Galaxy server that was used for your calculations is in part funded by the German Federal Ministry of Education and Research '+
            '(BMBF grants 031 A538A/A538C RBC, 031L0101B/031L0101C de.NBI-epi, 031L0106 de.STAIR (de.NBI)) and ' +
            'the Ministry of Science, Research and the Arts Baden-Württemberg (MWK) within the framework of LIBIS/de.NBI Freiburg.'
            '</div>' +
            '</div>'
        ),


        initialize: function() {
            var me = this;
            this.render();
        },

        render: function() {
            this.$el.html(this.appTemplate());
            return this;
        }

    });

    var citNeedApp = new citationNeededView;

});
