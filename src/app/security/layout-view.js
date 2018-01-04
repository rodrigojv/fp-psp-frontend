import Mn from 'backbone.marionette';
import Template from './layout-template.hbs';
import utils from '../utils';
import FamiliesColecction from './collection';
import OrganizationsModel from '../organizations/model';
import CitiesModel from '../cities/model';
import CountiesModel from '../countries/model';
import $ from 'jquery';
import session from '../../common/session';
import ModalService from '../modal/service';
import FlashesService from '../flashes/service';
import ItemView from './item/view';


export default Mn.View.extend({
  template: Template,
  collection:  new Backbone.Collection(),
  citiesCollection: new CitiesModel(),
  countiesCollection: new CountiesModel(),
  organizationsCollection: new OrganizationsModel(),
  regions: {
    list: '#family-list'
  },
  events: {
    'click #submit': 'handleSubmit',
    'keypress #search': 'handleSubmit'
  },
  initialize(options) {
    const { add } = options;
    this.collection = new Backbone.Collection();
    this.collection.on('sync', this.render);
    this.collection.on('remove', this.render);
    this.props = {};
    this.props.add = add;
  },
  onRender() {
    setTimeout(() => {
      this.$el.find('#search').focus();
    }, 0);
    this.showList();
    var self = this;

    this.citiesCollection.fetch({
      success(response) {
        self.citiesCollection = response.toJSON();
        $.each(self.citiesCollection, (index, element) => {
          $('#city').append(
            $('<option></option>')
              .attr('value', element.id)
              .text(element.city)
          );
        });
      }
    });

    this.countiesCollection.fetch({
      success(response) {
        self.countiesCollection = response.toJSON();
        $.each(self.countiesCollection, (index, element) => {
          $('#country').append(
            $('<option></option>')
              .attr('value', element.id)
              .text(element.country)
          );
        });
      }
    });

    this.organizationsCollection.fetch({
      success(response) {
        self.organizationsCollection = response.get('list');
        $.each(self.organizationsCollection, (index, element) => {
          $('#organization').append(
            $('<option></option>')
              .attr('value', element.id)
              .text(element.name)
          );
        });

        if (!(session.userHasRole('ROLE_ROOT') || session.userHasRole('ROLE_HUB_ADMIN'))) {
          $('#organization').attr('disabled', 'true');
          $('#organization').val(session.get('user').organization.id);
        }
      }
    });
  },
  showList() {

    // this.getRegion('list').show(
    //   new CollectionView({collection: this.collection})
    // );

    var element = this.$el.find('#family-list');
    element.empty();

    this.collection.forEach(item => {
      item.bind('remove', function() {
        this.destroy();
      });

      var itemView = new ItemView({
        model: item,
        deleteSurvey: this.deleteSurvey.bind(this),
        itemViewOptions: {
          className: "col-md-4 col-xs-6"
        },
      });

      // Render the view, and append its element
      // to the list/table
      element.append(itemView.render().el);
    });

  },
  handleSubmit(event) {
    if (event.which == 13 || event.which == 1) {
      var organization_id = $('#organization').val();
      var country_id = $('#country').val();
      var city_id = $('#city').val();
      var free_text = $('#search').val();
      var self = this;
      let container = this.$el.find('.list-container').eq(0);
      const section = utils.getLoadingSection(container);

      //  if(organization_id != null && country_id != null && city_id != null ){
      self.collection.reset();
      this.getRegion('list').empty();
      section.loading();

      var params = {
        organization_id: $('#organization').val(),
        country_id: $('#country').val(),
        city_id: $('#city').val(),
        free_text: $('#search').val()
      };

      var elements = new FamiliesColecction();
      elements.fetch({
        data: params,
        success(response) {
          self.collection = response;
          self.showList();
          section.reset();
        }
      });

      //  }else{
      //    alert("Choose an option")
      //  }
    }
  },

  deleteSurvey(model) {
    ModalService.request('confirm', {
      title: 'Confirm Deletion',
      text: `Are you sure you want to delete all the information about the "${model.get('code')}" family?\n\n
       Once you have deleted you will not able to go Cancel`
    }).then(confirmed => {
      if (!confirmed) {
        return;
      }
      this.collection.remove(model);
      return this.handleDestroySuccess(model);
    });
  },
  handleDestroySuccess(model) {
    return FlashesService.request('add', {
      timeout: 5000,
      type: 'info',
      body: 'The survey has been deleted!'
    });
  }


});
