import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import { getPrefixCls } from '@/packages/_utils/global-config';
import './style.scss';

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

const EBreadcrumbProps = {
  data: {
    type: Array as PropType<BreadcrumbItem[]>,
    default: ()=>[],
  },
  separator: {
    type: String,
    default: '/',
  },
};

export default defineComponent({
  name: 'EBreadcrumb',
  props: EBreadcrumbProps,
  setup(props) {
    const prefixCls = getPrefixCls('breadcrumb');

    return () => (
      <div class={[prefixCls]}>
        {
          props.data.map((item, index) => {
            return [item.href
              ? <router-link
                key={index}
                class={{ [prefixCls + '-item']: true, 'last-child': props.data.length === index + 1 }}
                to={item.href}
                v-text={item.title}
              />
              : <span class={{ [prefixCls + '__item']: true }} key={`span${index}`} v-text={item.title}></span>,

            props.data.length > index + 1
            && <span
              key={index + 100}
              class="separator"
            >{props.separator}</span >
            ];
          })
        }
      </div>

    );
  },
});
