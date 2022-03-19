import emptyState from '@mapstore/components/misc/enhancers/emptyState';
import WidgetEmptyMessage from '@mapstore/components/widgets/widget/WidgetEmptyMessage';

export default emptyState(
    ({text} = {}) => !text,
    () => ({
        glyph: 'sheet',
        messageId: 'widgets.errors.notext'
    }),
    WidgetEmptyMessage
);
