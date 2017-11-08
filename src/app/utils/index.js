import BackboneRadio from 'backbone.radio';

const SPINNER_TPL = '<i class="fa fa-circle-o-notch fa-spin"></i>';

export const APP_MESSAGE_CHANNEL = BackboneRadio.channel('global');

export function getLoadingButton(elem, text) {
  const previous = window.$(elem).html();
  return {
    loading: () => {
      window.$(elem).attr('data-loading-text', `${SPINNER_TPL}${text}`);
      window.$(elem).button('loading');
    },
    reset: () => {
      window
        .$(elem)
        .children('i')
        .remove();
      window.$(elem).removeAttr('data-loading-text');
      window.$(elem).button('reset');
    }
  };
}

export default {
  getLoadingButton
};
