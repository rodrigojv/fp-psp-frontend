import BackboneRadio from 'backbone.radio';
import $ from 'jquery';

const SPINNER_TPL = '<i class="fa fa-circle-o-notch fa-spin"></i>';
const SPINNER_OVERLAY =
  '<div class="loading-overlay"><img src="/static/images/xsmall-spinner.gif"></div>';

export const APP_MESSAGE_CHANNEL = BackboneRadio.channel('global');

export function getLoadingButton(elem) {
  //const previous = window.$(elem).html();
  return {
    loading: () => {
      $(elem).attr('disabled', true);
      $(elem).before(SPINNER_OVERLAY);
    },
    reset: () => {
      $(elem).removeAttr('disabled');

      $(elem)
        .prev('.loading-overlay')
        .remove();
    }
  };
}

export default {
  getLoadingButton
};
