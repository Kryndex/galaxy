/** Change password view */
define( [ 'mvc/form/form-view', 'mvc/ui/ui-misc' ], function( Form, Ui ) {
    return Backbone.View.extend({
        initialize: function ( options ) {
            var self = this;
            this.model = options && options.model || new Backbone.Model( options );
            this.form = new Form({
                title: 'Change Password',
                icon: 'fa-key',
                inputs: options.inputs,
                operations: {
                    'back': new Ui.ButtonIcon({
                        icon: 'fa-caret-left',
                        tooltip: 'Return to user preferences',
                        title: 'Preferences',
                        onclick: function() { self.remove(); options.onclose(); }
                    })
                },
                buttons: {
                    'save': new Ui.Button({
                        icon: 'fa-save',
                        tooltip: 'Save settings',
                        title: 'Save password',
                        cls: 'ui-button btn btn-primary',
                        floating: 'clear',
                        onclick: function() { self._save() }
                    })
                }
            });
            this.setElement( this.form.$el );
        },

        /** Saves the changed password */
        _save: function() {
            var self = this;
            $.ajax({
                url      : Galaxy.root + 'api/user_preferences/' + Galaxy.user.id + '/password',
                type     : 'PUT',
                data     : self.form.data.create(),
            }).done( function( response ) {
                self.form.message.update( { message: response.message, status: 'success' } );
            }).fail( function( response ) {
                self.form.message.update( { message: response.responseJSON.err_msg, status: 'danger' } );
            });
        }
    });
});