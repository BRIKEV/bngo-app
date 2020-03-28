import { storiesOf } from '@storybook/vue';

import BkButton from './BkButton.vue';

storiesOf('Components/BkButton', module)
  .add('default', () => ({
    components: { BkButton },
    template: `
      <BkButton :isLoading="false">Login</BkButton>
        `,
  }));
