<template>
  <BaseSecure :idp="IDP.IDIR">
    <FormDesigner
      class="mt-6"
      :draftId="d"
      :formId="f"
      :saved="sv"
      :versionId="v"
    />
  </BaseSecure>
</template>

<script>
import { mapGetters } from 'vuex';

import FormDesigner from '@/components/designer/FormDesigner.vue';
import { IdentityProviders } from '@/utils/constants';

export default {
  name: 'FormDesign',
  components: {
    FormDesigner,
  },
  props: {
    d: String,
    f: String,
    sv: Boolean,
    v: String,
  },
  computed: {
    ...mapGetters('form', ['form']),
    IDP: () => IdentityProviders,
  },
  beforeRouteLeave(_to, _from, next) {
    this.form.isDirty
      ? next(
        window.confirm(
          'Do you really want to leave this page? Changes you made will not be saved.'
        )
      )
      : next();
  },
};
</script>
