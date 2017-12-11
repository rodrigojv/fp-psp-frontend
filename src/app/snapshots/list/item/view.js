import Mn from 'backbone.marionette';
import Template from './template.hbs';
import _ from 'lodash';
import moment from 'moment';

export default Mn.View.extend({
  template: Template,

  initialize(options) {
    this.props = Object.assign({}, options);
    this.model = this.props.model;
  },

  serializeData() {
    const snapshot = [];
    const header = this.createHeaderRepresentation();
    const indicators = this.createIndicatorRepresentation(
      this.model.attributes.indicators_survey_data
    );

    header.forEach(function(v) {
      snapshot.push(v);
    });
    indicators.forEach(function(v) {
      snapshot.push(v);
    });

    return {
      snapshots: snapshot
    };
  },

  createIndicatorRepresentation(indicators) {
    var snapshotView = [];
    snapshotView.push('<div class="indicators-snapshot" >');
    if (indicators !== undefined && Array.isArray(indicators)) {
      indicators.forEach(element => {
        snapshotView.push(
          `<div class="indicator-circle-snapshot ">
            <div class="circle-content ${element['value'].toLowerCase()}" />
            <p>${element['name']}</p>
        </div> `
        );
      });
    }
    snapshotView.push('</div>');
    return snapshotView;
  },

  createHeaderRepresentation() {
    var headerView = [];
    headerView.push(
      `<div class="header-indicators-snapshot">
          <h3 class="pull-left"> SNAPSHOT  ${this.getCreatedAt()} </h3>
          <div class="pull-right header-resume">
            <p>${this.model.attributes.count_red_indicators}</p>
            <div class="circle-header red " />
            <p>${this.model.attributes.count_yellow_indicators}</p>
            <div class="circle-header yellow " />
            <p>${this.model.attributes.count_green_indicators}</p>
            <div class="circle-header green " />
          </div>
      </div>`
    );

    const keysToPick = _.keys(this.model.attributes.family_data);
    _.forOwn(
      _.forEach(this.model.attributes.family_data, keysToPick),
      (value, key) => {
        headerView.push(`<label>${key}:</label> ${value}`);
      }
    );
    headerView.push('<hr></hr>');

    return headerView;
  },

  getCreatedAt() {
    const createdAt = this.model.attributes.created_at;
    if (!createdAt) {
      return null;
    }
    return moment(createdAt).format('D/M/YYYY hh:mm:ss');
  }
});
