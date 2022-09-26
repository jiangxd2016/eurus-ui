import type { PropType } from 'vue';
import { defineComponent, computed, reactive, watch } from 'vue';

import { EInput } from '@/packages/input';
import { ESelect } from '@/packages/select';
import './style.scss';
import { getPrefixCls } from '@/packages/_hooks/use-global-config';

const EPaginationProps = {
  current: { default: 1 },
  total: { type: Number, default: 0 },
  pageSize: { default: 20 },
  showJumper: { type: Boolean },
  pagerCount: { default: 5 },
  pageSizes: { type: Array as PropType<number[]>, default: () => [] },
  showTotal: { type: Boolean },
  hideSinglePage: { type: Boolean },
  format: { type: Boolean }
};
// showJumper?: boolean // 显示快速切换到某一页
// pagerCount?: number // 点击折叠向前或向后跳多少页
// pageSizes?: number[]
// showTotal?: boolean
// hideSinglePage?: boolean // 当只有一页时，是否隐藏分页
// format?: boolean // 总记录数值转成千分制
// const emits = defineEmits<{
//   (e: 'update:current', page: number): void
//   (e: 'change', page: number): void
//   (e: 'changePageSizes', page: number): void
// }>()
export default defineComponent({
  name: 'EPagination',
  props: EPaginationProps,
  emits: ['update:current', 'change', 'changePageSizes'],
  setup(props, { emit: emits }) {
    const prefixCls = getPrefixCls('page');

    const state = reactive({
      active: props.current, // 当前页
      goToPage: props.current, // 快速跳到第几页
      selectChange: props.pageSize
    });
    const pageCount = computed(() => {
      return Math.ceil(props.total / state.selectChange);
    });
    const hidePage = computed(() => {
      return props.hideSinglePage && pageCount.value <= 1;
    });
    const pages = computed<[number[], number, number]>(() => {
      let start = 0;
      let end = pageCount.value - 1;
      const pagerCount2 = Number.parseInt((props.pagerCount / 2).toString());
      if (state.active + pagerCount2 < pageCount.value) {
        end = state.active + pagerCount2;
      }

      if (state.active >= props.pagerCount) {
        start = state.active - pagerCount2;
      } else {
        // 当前页小于pagerCount时
        end
          = props.pagerCount > pageCount.value ? pageCount.value : props.pagerCount;
      }
      // 接近尾页时
      if (pageCount.value - state.active < props.pagerCount) {
        const fixedStart = pageCount.value - props.pagerCount + 1;
        start = fixedStart > start ? start : fixedStart;
      }
      if (start < 2) {
        start = 2;
      }
      if (end >= pageCount.value - 1) {
        end = pageCount.value - 1;
      }
      // 如果只有一页时
      const showPages = [];
      let forStart = start;
      while (forStart <= end) {
        showPages.push(forStart);
        forStart++;
      }
      return [showPages, start, end];
    });
    const pageEnd = computed(() => {
      return Number.parseInt(pages.value[2].toString());
    });
    const pageStart = computed(() => {
      // 页码循环开始和结束，用来判断前后的三个点链接显示
      return Number.parseInt(pages.value[1].toString());
    });
    const selectOptions = computed(() => {
      const options: any = [];
      props.pageSizes.forEach((item) => {
        options.push({ label: `每页${item}条`, value: item });
      });
      return options;
    });
    const formatValue = computed(() => {
      let val = props.total.toString();
      if (props.format) {
        val = props.total
          .toString()
          .replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
      }
      return val;
    });
    watch(
      () => state.selectChange,
      (val: number) => {
        // 改变每页显示条数后，更新当前页
        if (state.active > pageCount.value) {
          state.active = pageCount.value;
        }
        emits('changePageSizes', val);
      }
    );
    const goTo = (page: number, disabled?: boolean) => {
      if (disabled) {
        return;
      }
      let goToPage = page;
      if (page > pageCount.value) {
        goToPage = pageCount.value;
      }
      if (page < 1) {
        goToPage = 1;
      }
      state.active = goToPage;
      state.goToPage = goToPage;
      emits('update:current', state.active);
      // this.$emit('update:pagerCount', this.selectChange)
      emits('change', state.active);
    };
    const blur = () => {
      const toPage = state.goToPage;
      goTo(toPage);
    };
    return () => (
      <div v-show={!hidePage.value} class={[prefixCls]}>
        {
          props.showTotal && <div class="total">共<span>{ formatValue.value }</span>条</div>
        }
        {
          props.pageSizes.length > 0 && <ESelect v-model={state.selectChange} options={selectOptions.value} />
        }
        <div class="page-list">
          <ul>
            <li>
              <a
                title="上一页"
                class={{ prev: true, disabled: state.active === 1 }}
                onClick={() => goTo(state.active - 1, state.active === 1)}>&lt;</a>
            </li>
            <li>
              <a
                title="1"
                class={{ active: state.active === 1 }}
                onClick={() => goTo(1, state.active === 1)}>1</a>
            </li>
            {
            pageStart.value > 2 && <li>
              <a
                title={`向前${props.pagerCount}页`}
                class="jump-prev"
                onClick={() => goTo(state.active - props.pagerCount)}
              ></a>
            </li>
            }
            {
            pages.value[0].map((page: number, index: number) => {
              return (
                <li key={index}>
                  <a
                    title={page.toString()}
                    class={{ active: page === state.active }}
                    onClick={() => goTo(page, page === state.active)}
                  >{page}</a>
                </li>
              );
            })}
            {
              pageCount.value > pageEnd.value + 1 && <li>
                <a
                  title={`向后${props.pagerCount}页`}
                  class="jump-next"
                  onClick={() => goTo(state.active + props.pagerCount)}
                ></a>
              </li>
            }

            {pageCount.value > 1 && <li>
              <a
                title={pageCount.value + ''}
                class={{ active: state.active === pageCount.value }}
                onClick={() => goTo(pageCount.value, state.active === pageCount.value)}
              >{pageCount.value}</a >
            </li>}

            <li>
              <a
                title="下一页"
                class={{ next: true, disabled: pageCount.value <= state.active }}
                onClick={() => goTo(state.active + 1, pageCount.value <= state.active)}
              >&gt;</a >
            </li>
          </ul>
        </div>
        {
          props.showJumper && <div class="show-jumper">
            前往
            <EInput v-model={state.goToPage} maxlength={5} onBlur={blur} />
            页
          </div>
        }
      </div>
    );
  }
});
