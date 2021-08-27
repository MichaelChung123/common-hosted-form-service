import baseEditForm from 'formiojs/components/_classes/component/Component.form';

import EditData from './editForm/Map.edit.data';
import EditDisplay from './editForm/Map.edit.display';
import EditValidation from './editForm/Map.edit.validation';

export default function(...extend) {
    return baseEditForm([
        {
            key: 'display',
            components: EditDisplay
        },
        {
            key: 'data',
            ignore: true
        },
        {
            key: 'validation',
            ignore: true
        },
        {
          label: 'Data',
          key: 'customData',
          weight: 10,
          components: EditData
        },
    ], ...extend);
}
